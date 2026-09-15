<?php

declare(strict_types=1);

namespace Grav\Plugin\MawBuilder;

/** A global section was saved by someone else after the editor loaded it. */
class SectionConflict extends \RuntimeException
{
    public function __construct(public readonly array $current)
    {
        parent::__construct(sprintf(
            'This global section was changed by %s at %s after you opened it.',
            $current['updated_by'] ?: 'someone else',
            date('H:i', (int) $current['updated'])
        ));
    }
}
