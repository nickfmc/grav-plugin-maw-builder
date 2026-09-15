<?php

declare(strict_types=1);

namespace Grav\Plugin\MawBuilder;

use Grav\Common\Grav;

/**
 * Who has the builder open for a page / Flex object / global section. Sessions heartbeat every ~15 s
 * and are forgotten after TTL seconds, so a crashed browser clears itself (a closed tab releases immediately).
 *
 * Storage: cache://maw-builder/presence/<sha1(owner)>.json (clearcache wipes it; that's harmless).
 */
class PresenceStore
{
    /**
     * Browsers throttle timers in background tabs to about once a minute, so stay above that. Also keep it short:
     * a crashed tab (no release request) holds the soft lock this long. Editors can always "Edit anyway".
     */
    public const TTL = 90;

    public function __construct(private readonly Grav $grav, private readonly ?string $baseDir = null)
    {
    }

    public static function validSession(string $session): bool
    {
        return preg_match('/^[a-zA-Z0-9-]{8,64}$/', $session) === 1;
    }

    /**
     * Record a heartbeat and return the OTHER live sessions.
     * @return list<array{session:string, user:string, fullname:string, since:int, seen:int, editing:bool}>
     */
    public function touch(string $owner, string $session, string $user, string $fullname, bool $editing, ?int $now = null): array
    {
        $now ??= time();

        return $this->update($owner, function (array $sessions) use ($session, $user, $fullname, $editing, $now) {
            $sessions[$session] = [
                'session' => $session,
                'user' => $user,
                'fullname' => $fullname,
                'since' => $sessions[$session]['since'] ?? $now,
                'seen' => $now,
                'editing' => $editing,
            ];

            return $sessions;
        }, $session);
    }

    public function release(string $owner, string $session): void
    {
        $this->update($owner, function (array $sessions) use ($session) {
            unset($sessions[$session]);

            return $sessions;
        }, $session);
    }

    /** @return list<array> live sessions other than $session */
    public function others(string $owner, string $session): array
    {
        return $this->update($owner, null, $session);
    }

    private function update(string $owner, ?callable $change, string $self): array
    {
        $file = $this->dir() . '/' . sha1($owner) . '.json';
        $handle = fopen($file, 'c+');
        if (!$handle) {
            return [];
        }
        try {
            flock($handle, $change ? LOCK_EX : LOCK_SH);
            $sessions = json_decode((string) stream_get_contents($handle), true);
            $sessions = is_array($sessions) ? $sessions : [];
            $cutoff = time() - self::TTL;
            $sessions = array_filter($sessions, fn ($s) => is_array($s) && ($s['seen'] ?? 0) >= $cutoff);
            if ($change) {
                $sessions = $change($sessions);
                ftruncate($handle, 0);
                rewind($handle);
                fwrite($handle, (string) json_encode($sessions));
                fflush($handle);
            }
        } finally {
            flock($handle, LOCK_UN);
            fclose($handle);
        }
        $others = array_values(array_filter($sessions, fn ($s) => $s['session'] !== $self));
        usort($others, fn ($a, $b) => $a['since'] <=> $b['since']);

        return $others;
    }

    private function dir(): string
    {
        $dir = $this->baseDir ?? (string) $this->grav['locator']->findResource('cache://', true, true) . '/maw-builder/presence';
        if (!is_dir($dir)) {
            mkdir($dir, 0775, true);
        }

        return $dir;
    }
}
