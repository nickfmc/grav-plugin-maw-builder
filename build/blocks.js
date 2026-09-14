var tl = Object.defineProperty;
var Ma = (t) => {
  throw TypeError(t);
};
var nl = (t, e, n) => e in t ? tl(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var ft = (t, e, n) => nl(t, typeof e != "symbol" ? e + "" : e, n), zs = (t, e, n) => e.has(t) || Ma("Cannot " + n);
var u = (t, e, n) => (zs(t, e, "read from private field"), n ? n.call(t) : e.get(t)), I = (t, e, n) => e.has(t) ? Ma("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), B = (t, e, n, r) => (zs(t, e, "write to private field"), r ? r.call(t, n) : e.set(t, n), n), J = (t, e, n) => (zs(t, e, "access private method"), n);
var Kr = Array.isArray, rl = Array.prototype.indexOf, us = Array.prototype.includes, Es = Array.from, ti = Object.defineProperty, Hn = Object.getOwnPropertyDescriptor, sl = Object.getOwnPropertyDescriptors, ni = Object.prototype, al = Array.prototype, ua = Object.getPrototypeOf, Ta = Object.isExtensible;
const ri = () => {
};
function il(t) {
  for (var e = 0; e < t.length; e++)
    t[e]();
}
function si() {
  var t, e, n = new Promise((r, a) => {
    t = r, e = a;
  });
  return { promise: n, resolve: t, reject: e };
}
function ai(t, e) {
  if (Array.isArray(t))
    return t;
  if (e === void 0 || !(Symbol.iterator in t))
    return Array.from(t);
  const n = [];
  for (const r of t)
    if (n.push(r), n.length === e) break;
  return n;
}
const Ye = 2, er = 4, Ss = 8, ii = 1 << 24, It = 16, Nt = 32, an = 64, Bs = 128, ca = 256, Ct = 512, Be = 1024, Ve = 2048, Ft = 4096, ot = 8192, pt = 16384, sr = 32768, cs = 1 << 25, Rn = 65536, fs = 1 << 17, ll = 1 << 18, ar = 1 << 19, ol = 1 << 20, Gt = 1 << 25, Ln = 65536, vs = 1 << 21, Bn = 1 << 22, _n = 1 << 23, On = Symbol("$state"), li = Symbol("component"), ul = Symbol("legacy props"), cl = Symbol(""), es = Symbol("attributes"), Vs = Symbol("class"), Gs = Symbol("style"), cr = Symbol("text"), ts = Symbol("form reset"), Yr = new class extends Error {
  constructor() {
    super(...arguments);
    ft(this, "name", "StaleReactionError");
    ft(this, "message", "The reaction that called `getAbortSignal()` was re-run or destroyed");
  }
}();
var Qa;
const fl = (
  // We gotta write it like this because after downleveling the pure comment may end up in the wrong location
  !!((Qa = globalThis.document) != null && Qa.contentType) && /* @__PURE__ */ globalThis.document.contentType.includes("xml")
), vl = 1, dl = 2, oi = 4, hl = 8, pl = 16, _l = 1, gl = 4, bl = 8, ml = 16, yl = 1, kl = 2, He = Symbol("uninitialized"), wl = "http://www.w3.org/1999/xhtml";
function xl() {
  console.warn("https://svelte.dev/e/derived_inert");
}
function El() {
  console.warn("https://svelte.dev/e/select_multiple_invalid_value");
}
function Sl() {
  console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
function ui(t) {
  return t === this.v;
}
function Ml(t, e) {
  return t != t ? e == e : t !== e || t !== null && typeof t == "object" || typeof t == "function";
}
function ci(t) {
  return !Ml(t, this.v);
}
function Tl(t) {
  throw new Error("https://svelte.dev/e/lifecycle_outside_component");
}
function Al() {
  throw new Error("https://svelte.dev/e/async_derived_orphan");
}
function Cl(t, e, n) {
  throw new Error("https://svelte.dev/e/each_key_duplicate");
}
function Nl(t) {
  throw new Error("https://svelte.dev/e/effect_in_teardown");
}
function Ol() {
  throw new Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function zl(t) {
  throw new Error("https://svelte.dev/e/effect_orphan");
}
function Pl() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function Rl(t) {
  throw new Error("https://svelte.dev/e/props_invalid_value");
}
function Ll() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function Dl() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function Il() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
function jl() {
  throw new Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
const Fl = [];
function fr(t, e = !1, n = !1) {
  return ns(t, /* @__PURE__ */ new Map(), "", Fl, null, n);
}
function ns(t, e, n, r, a = null, i = !1) {
  if (typeof t == "object" && t !== null) {
    var l = e.get(t);
    if (l !== void 0) return l;
    if (t instanceof Map) return (
      /** @type {Snapshot<T>} */
      new Map(t)
    );
    if (t instanceof Set) return (
      /** @type {Snapshot<T>} */
      new Set(t)
    );
    if (Kr(t)) {
      var o = (
        /** @type {Snapshot<any>} */
        Array(t.length)
      );
      e.set(t, o), a !== null && e.set(a, o);
      for (var c = 0; c < t.length; c += 1) {
        var d = t[c];
        c in t && (o[c] = ns(d, e, n, r, null, i));
      }
      return o;
    }
    if (ua(t) === ni) {
      o = {}, e.set(t, o), a !== null && e.set(a, o);
      for (var f of Object.keys(t))
        o[f] = ns(
          // @ts-expect-error
          t[f],
          e,
          n,
          r,
          null,
          i
        );
      return o;
    }
    if (t instanceof Date)
      return t.getTime(), /** @type {Snapshot<T>} */
      structuredClone(t);
    if (typeof /** @type {T & { toJSON?: any } } */
    t.toJSON == "function" && !i)
      return ns(
        /** @type {T & { toJSON(): any } } */
        t.toJSON(),
        e,
        n,
        r,
        // Associate the instance with the toJSON clone
        t
      );
  }
  if (t instanceof EventTarget)
    return (
      /** @type {Snapshot<T>} */
      t
    );
  try {
    return (
      /** @type {Snapshot<T>} */
      structuredClone(t)
    );
  } catch {
    return (
      /** @type {Snapshot<T>} */
      t
    );
  }
}
let nt = null;
function tr(t) {
  nt = t;
}
function Ze(t, e = !1, n) {
  nt = {
    p: nt,
    i: !1,
    c: null,
    e: null,
    s: t,
    x: null,
    r: (
      /** @type {Effect} */
      ge
    ),
    l: null
  };
}
function Qe(t) {
  var e = (
    /** @type {ComponentContext} */
    nt
  ), n = e.e;
  if (n !== null) {
    e.e = null;
    for (var r of n)
      zi(r);
  }
  return t !== void 0 && (e.x = t), e.i = !0, nt = e.p, fa(t);
}
function fa(t = {}) {
  return ti(t, li, { value: !0 }), t;
}
function fi() {
  return !0;
}
let mn = [];
function vi() {
  var t = mn;
  mn = [], il(t);
}
function Kt(t) {
  if (mn.length === 0 && !mr) {
    var e = mn;
    queueMicrotask(() => {
      e === mn && vi();
    });
  }
  mn.push(t);
}
function ql() {
  for (; mn.length > 0; )
    vi();
}
const Ul = -7169;
function qe(t, e) {
  t.f = t.f & Ul | e;
}
function va(t) {
  (t.f & Ct) !== 0 || t.deps === null ? qe(t, Be) : qe(t, Ft);
}
function di(t) {
  if (t !== null)
    for (const e of t)
      (e.f & Ye) === 0 || (e.f & Ln) === 0 || (e.f ^= Ln, di(
        /** @type {Derived} */
        e.deps
      ));
}
function hi(t, e, n) {
  (t.f & Ve) !== 0 ? e.add(t) : (t.f & Ft) !== 0 && n.add(t), di(t.deps), qe(t, Be);
}
let Qr = !1;
function Hl(t) {
  var e = Qr;
  try {
    return Qr = !1, [t(), Qr];
  } finally {
    Qr = e;
  }
}
function Bl(t, e) {
  {
    const n = document.body;
    t.autofocus = !0, Kt(() => {
      document.activeElement === n && t.focus();
    });
  }
}
let Aa = !1;
function Vl() {
  Aa || (Aa = !0, document.addEventListener(
    "reset",
    (t) => {
      Promise.resolve().then(() => {
        var e;
        if (!t.defaultPrevented)
          for (
            const n of
            /**@type {HTMLFormElement} */
            t.target.elements
          )
            (e = n[ts]) == null || e.call(n);
      });
    },
    // In the capture phase to guarantee we get noticed of it (no possibility of stopPropagation)
    { capture: !0 }
  ));
}
function ir(t) {
  var e = de, n = ge;
  Ot(null), Wt(null);
  try {
    return t();
  } finally {
    Ot(e), Wt(n);
  }
}
function pi(t, e, n, r = n) {
  t.addEventListener(e, () => ir(n));
  const a = (
    /** @type {any} */
    t[ts]
  );
  a ? t[ts] = () => {
    a(), r(!0);
  } : t[ts] = () => r(!0), Vl();
}
function Gl(t, e, n, r) {
  const a = kr;
  var i = t.filter((p) => !p.settled), l = e.map(a);
  if (n.length === 0 && i.length === 0) {
    r(l);
    return;
  }
  var o = (
    /** @type {Effect} */
    ge
  ), c = Kl(), d = i.length === 1 ? i[0].promise : i.length > 1 ? Promise.all(i.map((p) => p.promise)) : null;
  function f(p) {
    if ((o.f & pt) === 0) {
      c();
      try {
        r([...l, ...p]);
      } catch (_) {
        Vt(_, o);
      }
      ds();
    }
  }
  var x = _i();
  if (n.length === 0) {
    d.then(() => f([])).finally(x);
    return;
  }
  function v() {
    Promise.all(n.map((p) => /* @__PURE__ */ Yl(p))).then(f).catch((p) => Vt(p, o)).finally(x);
  }
  d ? d.then(() => {
    c(), v(), ds();
  }) : v();
}
function Kl() {
  var t = (
    /** @type {Effect} */
    ge
  ), e = de, n = nt, r = (
    /** @type {Batch} */
    X
  );
  return function(i = !0) {
    Wt(t), Ot(e), tr(n), i && (t.f & pt) === 0 && (r == null || r.activate(), r == null || r.apply());
  };
}
function ds(t = !0) {
  Wt(null), Ot(null), tr(null), t && (X == null || X.deactivate());
}
function _i() {
  var t = (
    /** @type {Effect} */
    ge
  ), e = t.b, n = (
    /** @type {Batch} */
    X
  ), r = !!(e != null && e.is_rendered());
  return e == null || e.update_pending_count(1, n), n.increment(r, t), () => {
    e == null || e.update_pending_count(-1, n), n.decrement(r, t);
  };
}
// @__NO_SIDE_EFFECTS__
function kr(t) {
  var e = Ye | Ve;
  return ge !== null && (ge.f |= ar), {
    ctx: nt,
    deps: null,
    effects: null,
    equals: ui,
    f: e,
    fn: t,
    reactions: null,
    rv: 0,
    v: (
      /** @type {V} */
      He
    ),
    wv: 0,
    parent: ge,
    ac: null
  };
}
const vr = Symbol("obsolete");
// @__NO_SIDE_EFFECTS__
function Yl(t, e, n) {
  let r = (
    /** @type {Effect | null} */
    ge
  );
  r === null && Al();
  var a = (
    /** @type {Promise<V>} */
    /** @type {unknown} */
    void 0
  ), i = In(
    /** @type {V} */
    He
  ), l = !de, o = /* @__PURE__ */ new Set();
  return uo(() => {
    var p, _;
    var c = (
      /** @type {Effect} */
      ge
    ), d = si();
    a = d.promise;
    try {
      Promise.resolve(t()).then(d.resolve, (k) => {
        k !== Yr && d.reject(k);
      }).finally(ds);
    } catch (k) {
      d.reject(k), ds();
    }
    var f = (
      /** @type {Batch} */
      X
    );
    if (l) {
      if ((c.f & sr) !== 0)
        var x = _i();
      if (
        // boundary can be null if the async derived is inside an $effect.root not connected to the component render tree
        (p = r.b) != null && p.is_rendered()
      )
        (_ = f.async_deriveds.get(c)) == null || _.reject(vr);
      else
        for (const k of o.values())
          k.reject(vr);
      o.add(d), f.async_deriveds.set(c, d);
    }
    const v = (k, h = void 0) => {
      x == null || x(), o.delete(d), h !== vr && (f.activate(), h ? (i.f |= _n, nr(i, h)) : ((i.f & _n) !== 0 && (i.f ^= _n), nr(i, k)), f.deactivate());
    };
    d.promise.then(v, (k) => v(null, k || "unknown"));
  }), ga(() => {
    for (const c of o)
      c.reject(vr);
  }), new Promise((c) => {
    function d(f) {
      function x() {
        f === a ? c(i) : d(a);
      }
      f.then(x, x);
    }
    d(a);
  });
}
// @__NO_SIDE_EFFECTS__
function le(t) {
  const e = /* @__PURE__ */ kr(t);
  return Ii(e), e;
}
// @__NO_SIDE_EFFECTS__
function gi(t) {
  const e = /* @__PURE__ */ kr(t);
  return e.equals = ci, e;
}
function Jl(t) {
  var e = t.effects;
  if (e !== null) {
    t.effects = null;
    for (var n = 0; n < e.length; n += 1)
      _t(
        /** @type {Effect} */
        e[n]
      );
  }
}
function da(t) {
  var e, n = ge, r = t.parent;
  if (!ln && r !== null && t.v !== He && // if it was never evaluated before, it's guaranteed to fail downstream, so we try to execute instead
  (r.f & (pt | ot)) !== 0)
    return xl(), t.v;
  Wt(r);
  try {
    t.f &= ~Ln, Jl(t), e = Ui(t);
  } finally {
    Wt(n);
  }
  return e;
}
function bi(t) {
  var e = da(t);
  if (!t.equals(e) && (t.wv = Fi(), (!(X != null && X.is_fork) || t.deps === null) && (X !== null ? (X.capture(t, e, !0), br == null || br.capture(t, e, !0)) : t.v = e, t.deps === null))) {
    qe(t, Be);
    return;
  }
  ln || (Xe !== null ? (_a() || X != null && X.is_fork) && Xe.set(t, e) : va(t));
}
function Wl(t) {
  var e;
  if (t.effects !== null)
    for (const n of t.effects)
      (n.teardown || n.ac) && ((e = n.teardown) == null || e.call(n), n.ac !== null && ir(() => {
        n.ac.abort(Yr), n.ac = null;
      }), n.fn !== null && (n.teardown = ri), wr(n, 0), ya(n));
}
function mi(t) {
  if (t.effects !== null)
    for (const e of t.effects)
      e.teardown && e.fn !== null && rr(e);
}
let Ps = null, Fn = null, X = null, br = null, Xe = null, Ks = null, mr = !1, Rs = !1, Un = null, rs = null;
var Ca = 0;
let Xl = 1;
var Gn, cn, xn, Kn, Yn, Jn, Zt, Wn, vt, Er, Qt, Lt, qt, Xn, En, Ae, Ys, dr, Js, yi, ki, qn, Zl, hr;
const ms = class ms {
  constructor() {
    I(this, Ae);
    ft(this, "id", Xl++);
    /** True as soon as `#process` was called */
    I(this, Gn, !1);
    ft(this, "linked", !0);
    /** @type {Batch | null} */
    I(this, cn, null);
    /** @type {Batch | null} */
    I(this, xn, null);
    /** @type {Map<Effect, ReturnType<typeof deferred<any>>>} */
    ft(this, "async_deriveds", /* @__PURE__ */ new Map());
    /**
     * The current values of any signals that are updated in this batch.
     * Tuple format: [value, is_derived] (note: is_derived is false for deriveds, too, if they were overridden via assignment)
     * They keys of this map are identical to `this.#previous`
     * @type {Map<Value, [any, boolean]>}
     */
    ft(this, "current", /* @__PURE__ */ new Map());
    /**
     * The values of any signals (sources and deriveds) that are updated in this batch _before_ those updates took place.
     * They keys of this map are identical to `this.#current`
     * @type {Map<Value, any>}
     */
    ft(this, "previous", /* @__PURE__ */ new Map());
    /**
     * When the batch is committed (and the DOM is updated), we need to remove old branches
     * and append new ones by calling the functions added inside (if/each/key/etc) blocks
     * @type {Set<(batch: Batch) => void>}
     */
    I(this, Kn, /* @__PURE__ */ new Set());
    /**
     * If a fork is discarded, we need to destroy any effects that are no longer needed
     * @type {Set<(batch: Batch) => void>}
     */
    I(this, Yn, /* @__PURE__ */ new Set());
    /**
     * The number of async effects that are currently in flight
     */
    I(this, Jn, 0);
    /**
     * Async effects that are currently in flight, _not_ inside a pending boundary
     * @type {Map<Effect, number>}
     */
    I(this, Zt, /* @__PURE__ */ new Map());
    /**
     * A deferred that resolves when the batch is committed, used with `settled()`
     * TODO replace with Promise.withResolvers once supported widely enough
     * @type {{ promise: Promise<void>, resolve: (value?: any) => void, reject: (reason: unknown) => void } | null}
     */
    I(this, Wn, null);
    /**
     * The root effects that need to be flushed
     * @type {Effect[]}
     */
    I(this, vt, []);
    /**
     * Effects created while this batch was active.
     * @type {Effect[]}
     */
    I(this, Er, []);
    /**
     * Deferred effects (which run after async work has completed) that are DIRTY
     * @type {Set<Effect>}
     */
    I(this, Qt, /* @__PURE__ */ new Set());
    /**
     * Deferred effects that are MAYBE_DIRTY
     * @type {Set<Effect>}
     */
    I(this, Lt, /* @__PURE__ */ new Set());
    /**
     * A map of branches that still exist, but will be destroyed when this batch
     * is committed — we skip over these during `process`.
     * The value contains child effects that were dirty/maybe_dirty before being reset,
     * so they can be rescheduled if the branch survives.
     * @type {Map<Effect, { d: Effect[], m: Effect[] }>}
     */
    I(this, qt, /* @__PURE__ */ new Map());
    /**
     * Inverse of #skipped_branches which we need to tell prior batches to unskip them when committing
     * @type {Set<Effect>}
     */
    I(this, Xn, /* @__PURE__ */ new Set());
    ft(this, "is_fork", !1);
    I(this, En, !1);
    Fn === null ? Ps = Fn = this : (B(Fn, xn, this), B(this, cn, Fn)), Fn = this;
  }
  /**
   * Add an effect to the #skipped_branches map and reset its children
   * @param {Effect} effect
   */
  skip_effect(e) {
    u(this, qt).has(e) || u(this, qt).set(e, { d: [], m: [] }), u(this, Xn).delete(e);
  }
  /**
   * Remove an effect from the #skipped_branches map and reschedule
   * any tracked dirty/maybe_dirty child effects
   * @param {Effect} effect
   * @param {(e: Effect) => void} callback
   */
  unskip_effect(e, n = (r) => this.schedule(r)) {
    var r = u(this, qt).get(e);
    if (r) {
      u(this, qt).delete(e);
      for (var a of r.d)
        qe(a, Ve), n(a);
      for (a of r.m)
        qe(a, Ft), n(a);
    }
    u(this, Xn).add(e);
  }
  /**
   * Associate a change to a given source with the current
   * batch, noting its previous and current values
   * @param {Value} source
   * @param {any} value
   * @param {boolean} [is_derived]
   */
  capture(e, n, r = !1) {
    e.v !== He && !this.previous.has(e) && this.previous.set(e, e.v), (e.f & _n) === 0 && (this.current.set(e, [n, r]), Xe == null || Xe.set(e, n)), this.is_fork || (e.v = n);
  }
  activate() {
    X = this;
  }
  deactivate() {
    X = null, Xe = null;
  }
  flush() {
    try {
      Rs = !0, X = this, J(this, Ae, dr).call(this);
    } finally {
      Ca = 0, Ks = null, Un = null, rs = null, Rs = !1, X = null, Xe = null, Yt.clear();
    }
  }
  discard() {
    var e;
    for (const n of u(this, Yn)) n(this);
    u(this, Yn).clear();
    for (const n of this.async_deriveds.values())
      n.reject(vr);
    J(this, Ae, hr).call(this), (e = u(this, Wn)) == null || e.resolve();
  }
  /**
   * @param {Effect} effect
   */
  register_created_effect(e) {
    u(this, Er).push(e);
  }
  /**
   * @param {boolean} blocking
   * @param {Effect} effect
   */
  increment(e, n) {
    if (B(this, Jn, u(this, Jn) + 1), e) {
      let r = u(this, Zt).get(n) ?? 0;
      u(this, Zt).set(n, r + 1);
    }
  }
  /**
   * @param {boolean} blocking
   * @param {Effect} effect
   */
  decrement(e, n) {
    if (B(this, Jn, u(this, Jn) - 1), e) {
      let r = u(this, Zt).get(n) ?? 0;
      r === 1 ? u(this, Zt).delete(n) : u(this, Zt).set(n, r - 1);
    }
    u(this, En) || (B(this, En, !0), Kt(() => {
      B(this, En, !1), this.linked && this.flush();
    }));
  }
  /**
   * @param {Set<Effect>} dirty_effects
   * @param {Set<Effect>} maybe_dirty_effects
   */
  transfer_effects(e, n) {
    for (const r of e)
      u(this, Qt).add(r);
    for (const r of n)
      u(this, Lt).add(r);
    e.clear(), n.clear();
  }
  /** @param {(batch: Batch) => void} fn */
  oncommit(e) {
    u(this, Kn).add(e);
  }
  /** @param {(batch: Batch) => void} fn */
  ondiscard(e) {
    u(this, Yn).add(e);
  }
  settled() {
    return (u(this, Wn) ?? B(this, Wn, si())).promise;
  }
  static ensure() {
    if (X === null) {
      const e = X = new ms();
      !Rs && !mr && Kt(() => {
        u(e, Gn) || e.flush();
      });
    }
    return X;
  }
  apply() {
    {
      Xe = null;
      return;
    }
  }
  /**
   *
   * @param {Effect} effect
   */
  schedule(e) {
    var a;
    if (Ks = e, (a = e.b) != null && a.is_pending && (e.f & (er | Ss | ii)) !== 0 && (e.f & sr) === 0) {
      e.b.defer_effect(e);
      return;
    }
    for (var n = e; n.parent !== null; ) {
      n = n.parent;
      var r = n.f;
      if (Un !== null && n === ge && (de === null || (de.f & Ye) === 0))
        return;
      if ((r & (an | Nt)) !== 0) {
        if ((r & Be) === 0)
          return;
        n.f ^= Be;
      }
    }
    u(this, vt).push(n);
  }
};
Gn = new WeakMap(), cn = new WeakMap(), xn = new WeakMap(), Kn = new WeakMap(), Yn = new WeakMap(), Jn = new WeakMap(), Zt = new WeakMap(), Wn = new WeakMap(), vt = new WeakMap(), Er = new WeakMap(), Qt = new WeakMap(), Lt = new WeakMap(), qt = new WeakMap(), Xn = new WeakMap(), En = new WeakMap(), Ae = new WeakSet(), Ys = function() {
  if (this.is_fork) return !0;
  for (const r of u(this, Zt).keys()) {
    for (var e = r, n = !1; e.parent !== null; ) {
      if (u(this, qt).has(e)) {
        n = !0;
        break;
      }
      e = e.parent;
    }
    if (!n)
      return !0;
  }
  return !1;
}, dr = function() {
  var c, d, f, x;
  B(this, Gn, !0), Ca++ > 1e3 && (J(this, Ae, hr).call(this), $l());
  for (const v of u(this, Qt))
    u(this, Lt).delete(v), qe(v, Ve), this.schedule(v);
  for (const v of u(this, Lt))
    qe(v, Ft), this.schedule(v);
  const e = u(this, vt);
  B(this, vt, []), this.apply();
  var n = Un = [], r = [], a = rs = [];
  for (const v of e)
    try {
      J(this, Ae, Js).call(this, v, n, r);
    } catch (p) {
      throw Ei(v), J(this, Ae, Ys).call(this) || this.discard(), p;
    }
  if (X = null, a.length > 0) {
    var i = ms.ensure();
    for (const v of a)
      i.schedule(v);
  }
  if (Un = null, rs = null, J(this, Ae, Ys).call(this)) {
    J(this, Ae, qn).call(this, r), J(this, Ae, qn).call(this, n);
    for (const [v, p] of u(this, qt))
      xi(v, p);
    a.length > 0 && /** @type {unknown} */
    J(c = X, Ae, dr).call(c);
    return;
  }
  const l = J(this, Ae, yi).call(this);
  if (l) {
    J(this, Ae, qn).call(this, r), J(this, Ae, qn).call(this, n), J(d = l, Ae, ki).call(d, this);
    return;
  }
  u(this, Qt).clear(), u(this, Lt).clear();
  for (const v of u(this, Kn)) v(this);
  u(this, Kn).clear(), br = this, Na(r), Na(n), br = null, (f = u(this, Wn)) == null || f.resolve();
  var o = (
    /** @type {Batch | null} */
    /** @type {unknown} */
    X
  );
  if (u(this, Jn) === 0 && (u(this, vt).length === 0 || o !== null) && J(this, Ae, hr).call(this), u(this, vt).length > 0)
    if (o !== null) {
      const v = o;
      u(v, vt).push(...u(this, vt).filter((p) => !u(v, vt).includes(p)));
    } else
      o = this;
  o !== null && (Yt.clear(), J(x = o, Ae, dr).call(x));
}, /**
 * Traverse the effect tree, executing effects or stashing
 * them for later execution as appropriate
 * @param {Effect} root
 * @param {Effect[]} effects
 * @param {Effect[]} render_effects
 */
Js = function(e, n, r) {
  e.f ^= Be;
  for (var a = e.first; a !== null; ) {
    var i = a.f, l = (i & (Nt | an)) !== 0, o = l && (i & Be) !== 0, c = o || (i & ot) !== 0 || u(this, qt).has(a);
    if (!c && a.fn !== null) {
      l ? a.f ^= Be : (i & er) !== 0 ? n.push(a) : Xr(a) && ((i & It) !== 0 && u(this, Lt).add(a), rr(a));
      var d = a.first;
      if (d !== null) {
        a = d;
        continue;
      }
    }
    for (; a !== null; ) {
      var f = a.next;
      if (f !== null) {
        a = f;
        break;
      }
      a = a.parent;
    }
  }
}, yi = function() {
  for (var e = u(this, cn); e !== null; ) {
    if (!e.is_fork) {
      for (const [n, [, r]] of this.current)
        if (e.current.has(n) && !r)
          return e;
    }
    e = u(e, cn);
  }
  return null;
}, /**
 * @param {Batch} batch
 */
ki = function(e) {
  var r;
  for (const [a, i] of e.current)
    !this.previous.has(a) && e.previous.has(a) && this.previous.set(a, e.previous.get(a)), this.current.set(a, i);
  for (const [a, i] of e.async_deriveds) {
    const l = this.async_deriveds.get(a);
    l && i.promise.then(l.resolve).catch(l.reject);
  }
  e.async_deriveds.clear(), this.transfer_effects(u(e, Qt), u(e, Lt));
  const n = (a) => {
    var i = a.reactions;
    if (i !== null && !((a.f & Ye) !== 0 && (a.f & (Ve | Ft)) === 0))
      for (const c of i) {
        var l = c.f;
        if ((l & Ye) !== 0)
          n(
            /** @type {Derived} */
            c
          );
        else {
          var o = (
            /** @type {Effect} */
            c
          );
          l & (Bn | It) && !this.async_deriveds.has(o) && (u(this, Lt).delete(o), qe(o, Ve), this.schedule(o));
        }
      }
  };
  for (const a of this.current.keys())
    n(a);
  this.oncommit(() => e.discard()), J(r = e, Ae, hr).call(r), X = this, J(this, Ae, dr).call(this);
}, /**
 * @param {Effect[]} effects
 */
qn = function(e) {
  for (var n = 0; n < e.length; n += 1)
    hi(e[n], u(this, Qt), u(this, Lt));
}, Zl = function() {
  var x;
  for (let v = Ps; v !== null; v = u(v, xn)) {
    var e = v.id < this.id, n = [];
    for (const [p, [_, k]] of this.current) {
      if (v.current.has(p)) {
        var r = (
          /** @type {[any, boolean]} */
          v.current.get(p)[0]
        );
        if (e && _ !== r)
          v.current.set(p, [_, k]);
        else
          continue;
      }
      n.push(p);
    }
    if (e)
      for (const [p, _] of this.async_deriveds) {
        const k = v.async_deriveds.get(p);
        k && _.promise.then(k.resolve).catch(k.reject);
      }
    var a = [...v.current.keys()].filter(
      (p) => !/** @type {[any, boolean]} */
      v.current.get(p)[1]
    );
    if (!(!u(v, Gn) || a.length === 0)) {
      var i = a.filter((p) => !this.current.has(p));
      if (i.length === 0)
        e && v.discard();
      else if (n.length > 0) {
        if (e)
          for (const p of u(this, Xn))
            v.unskip_effect(p, (_) => {
              var k;
              (_.f & (It | Bn)) !== 0 ? v.schedule(_) : J(k = v, Ae, qn).call(k, [_]);
            });
        v.activate();
        var l = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Map();
        for (var c of n)
          wi(c, i, l, o);
        o = /* @__PURE__ */ new Map();
        var d = [...v.current].filter(([p, _]) => {
          const k = this.current.get(p);
          return k ? k[0] !== _[0] || k[1] !== _[1] : !0;
        }).map(([p]) => p);
        if (d.length > 0)
          for (const p of u(this, Er))
            (p.f & (pt | ot | fs)) === 0 && ha(p, d, o) && ((p.f & (Bn | It)) !== 0 ? (qe(p, Ve), v.schedule(p)) : u(v, Qt).add(p));
        if (u(v, vt).length > 0 && !u(v, En)) {
          v.apply();
          for (var f of u(v, vt))
            J(x = v, Ae, Js).call(x, f, [], []);
          B(v, vt, []);
        }
        v.deactivate();
      }
    }
  }
}, hr = function() {
  if (this.linked) {
    var e = u(this, cn), n = u(this, xn);
    e === null ? Ps = n : B(e, xn, n), n === null ? Fn = e : B(n, cn, e), this.linked = !1;
  }
};
let Dn = ms;
function Ql(t) {
  var e = mr;
  mr = !0;
  try {
    for (var n; ; ) {
      if (ql(), X === null)
        return (
          /** @type {T} */
          n
        );
      X.flush();
    }
  } finally {
    mr = e;
  }
}
function $l() {
  try {
    Pl();
  } catch (t) {
    Vt(t, Ks);
  }
}
let Rt = null;
function Na(t) {
  var e = t.length;
  if (e !== 0) {
    for (var n = 0; n < e; ) {
      var r = t[n++];
      if ((r.f & (pt | ot)) === 0 && Xr(r) && (Rt = /* @__PURE__ */ new Set(), rr(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && Ri(r), (Rt == null ? void 0 : Rt.size) > 0)) {
        Yt.clear();
        for (const a of Rt) {
          if ((a.f & (pt | ot)) !== 0) continue;
          const i = [a];
          let l = a.parent;
          for (; l !== null; )
            Rt.has(l) && (Rt.delete(l), i.push(l)), l = l.parent;
          for (let o = i.length - 1; o >= 0; o--) {
            const c = i[o];
            (c.f & (pt | ot)) === 0 && rr(c);
          }
        }
        Rt.clear();
      }
    }
    Rt = null;
  }
}
function wi(t, e, n, r) {
  if (!n.has(t) && (n.add(t), t.reactions !== null))
    for (const a of t.reactions) {
      const i = a.f;
      (i & Ye) !== 0 ? wi(
        /** @type {Derived} */
        a,
        e,
        n,
        r
      ) : (i & (Bn | It)) !== 0 && (i & Ve) === 0 && ha(a, e, r) && (qe(a, Ve), pa(
        /** @type {Effect} */
        a
      ));
    }
}
function ha(t, e, n) {
  const r = n.get(t);
  if (r !== void 0) return r;
  if (t.deps !== null)
    for (const a of t.deps) {
      if (us.call(e, a))
        return !0;
      if ((a.f & Ye) !== 0 && ha(
        /** @type {Derived} */
        a,
        e,
        n
      ))
        return n.set(
          /** @type {Derived} */
          a,
          !0
        ), !0;
    }
  return n.set(t, !1), !1;
}
function pa(t) {
  X.schedule(t);
}
function xi(t, e) {
  if (!((t.f & Nt) !== 0 && (t.f & Be) !== 0)) {
    (t.f & Ve) !== 0 ? e.d.push(t) : (t.f & Ft) !== 0 && e.m.push(t), qe(t, Be);
    for (var n = t.first; n !== null; )
      xi(n, e), n = n.next;
  }
}
function Ei(t) {
  qe(t, Be);
  for (var e = t.first; e !== null; )
    Ei(e), e = e.next;
}
let hs = /* @__PURE__ */ new Set();
const Yt = /* @__PURE__ */ new Map();
let Si = !1;
function In(t, e) {
  var n = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: t,
    reactions: null,
    equals: ui,
    rv: 0,
    wv: 0
  };
  return n;
}
// @__NO_SIDE_EFFECTS__
function F(t, e) {
  const n = In(t);
  return Ii(n), n;
}
// @__NO_SIDE_EFFECTS__
function eo(t, e = !1, n = !0) {
  const r = In(t);
  return e || (r.equals = ci), r;
}
function m(t, e, n = !1) {
  de !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!jt || (de.f & fs) !== 0) && fi() && (de.f & (Ye | It | Bn | fs)) !== 0 && (Jt === null || !Jt.has(t)) && Il();
  let r = n ? tt(e) : e;
  return nr(t, r, rs);
}
function nr(t, e, n = null) {
  if (!t.equals(e)) {
    ln ? Yt.set(t, e) : Yt.has(t) || Yt.set(t, t.v);
    var r = Dn.ensure();
    if (r.capture(t, e), (t.f & Ye) !== 0) {
      const a = (
        /** @type {Derived} */
        t
      );
      (t.f & Ve) !== 0 && da(a), Xe === null && va(a);
    }
    t.wv = Fi(), Mi(t, Ve, n), ge !== null && (ge.f & Be) !== 0 && (ge.f & (Nt | an)) === 0 && (Et === null ? vo([t]) : Et.push(t)), !r.is_fork && hs.size > 0 && !Si && to();
  }
  return e;
}
function to() {
  Si = !1;
  for (const t of hs) {
    (t.f & Be) !== 0 && qe(t, Ft);
    let e;
    try {
      e = Xr(t);
    } catch {
      e = !0;
    }
    e && rr(t);
  }
  hs.clear();
}
function yr(t) {
  m(t, t.v + 1);
}
function Mi(t, e, n) {
  var r = t.reactions;
  if (r !== null)
    for (var a = r.length, i = 0; i < a; i++) {
      var l = r[i], o = l.f, c = (o & Ve) === 0;
      if (c && qe(l, e), (o & fs) !== 0)
        hs.add(
          /** @type {Effect} */
          l
        );
      else if ((o & Ye) !== 0) {
        var d = (
          /** @type {Derived} */
          l
        );
        Xe == null || Xe.delete(d), (o & Ln) === 0 && (o & Ct && (ge === null || (ge.f & vs) === 0) && (l.f |= Ln), Mi(d, Ft, n));
      } else if (c) {
        var f = (
          /** @type {Effect} */
          l
        );
        (o & It) !== 0 && Rt !== null && Rt.add(f), n !== null ? n.push(f) : pa(f);
      }
    }
}
function tt(t) {
  if (typeof t != "object" || t === null || On in t || li in t)
    return t;
  const e = ua(t);
  if (e !== ni && e !== al)
    return t;
  var n = /* @__PURE__ */ new Map(), r = Kr(t), a = /* @__PURE__ */ F(0), i = Pn, l = (o) => {
    if (Pn === i)
      return o();
    var c = de, d = Pn;
    Ot(null), Ra(i);
    var f = o();
    return Ot(c), Ra(d), f;
  };
  return r && n.set("length", /* @__PURE__ */ F(
    /** @type {any[]} */
    t.length
  )), new Proxy(
    /** @type {any} */
    t,
    {
      defineProperty(o, c, d) {
        (!("value" in d) || d.configurable === !1 || d.enumerable === !1 || d.writable === !1) && Ll();
        var f = n.get(c);
        return f === void 0 ? l(() => {
          var x = /* @__PURE__ */ F(d.value);
          return n.set(c, x), x;
        }) : m(f, d.value, !0), !0;
      },
      deleteProperty(o, c) {
        var d = n.get(c);
        if (d === void 0) {
          if (c in o) {
            const f = l(() => /* @__PURE__ */ F(He));
            n.set(c, f), yr(a);
          }
        } else
          m(d, He), yr(a);
        return !0;
      },
      get(o, c, d) {
        var p;
        if (c === On)
          return t;
        var f = n.get(c), x = c in o;
        if (f === void 0 && (!x || (p = Hn(o, c)) != null && p.writable) && (f = l(() => {
          var _ = tt(x ? o[c] : He), k = /* @__PURE__ */ F(_);
          return k;
        }), n.set(c, f)), f !== void 0) {
          var v = s(f);
          return v === He ? void 0 : v;
        }
        return Reflect.get(o, c, d);
      },
      getOwnPropertyDescriptor(o, c) {
        var d = Reflect.getOwnPropertyDescriptor(o, c);
        if (d && "value" in d) {
          var f = n.get(c);
          f && (d.value = s(f));
        } else if (d === void 0) {
          var x = n.get(c), v = x == null ? void 0 : x.v;
          if (x !== void 0 && v !== He)
            return {
              enumerable: !0,
              configurable: !0,
              value: v,
              writable: !0
            };
        }
        return d;
      },
      has(o, c) {
        var v;
        if (c === On)
          return !0;
        var d = n.get(c), f = d !== void 0 && d.v !== He || Reflect.has(o, c);
        if (d !== void 0 || ge !== null && (!f || (v = Hn(o, c)) != null && v.writable)) {
          d === void 0 && (d = l(() => {
            var p = f ? tt(o[c]) : He, _ = /* @__PURE__ */ F(p);
            return _;
          }), n.set(c, d));
          var x = s(d);
          if (x === He)
            return !1;
        }
        return f;
      },
      set(o, c, d, f) {
        var z;
        var x = n.get(c), v = c in o;
        if (r && c === "length")
          for (var p = d; p < /** @type {Source<number>} */
          x.v; p += 1) {
            var _ = n.get(p + "");
            _ !== void 0 ? m(_, He) : p in o && (_ = l(() => /* @__PURE__ */ F(He)), n.set(p + "", _));
          }
        if (x === void 0)
          (!v || (z = Hn(o, c)) != null && z.writable) && (x = l(() => /* @__PURE__ */ F(void 0)), m(x, tt(d)), n.set(c, x));
        else {
          v = x.v !== He;
          var k = l(() => tt(d));
          m(x, k);
        }
        var h = Reflect.getOwnPropertyDescriptor(o, c);
        if (h != null && h.set && h.set.call(f, d), !v) {
          if (r && typeof c == "string") {
            var E = (
              /** @type {Source<number>} */
              n.get("length")
            ), D = Number(c);
            Number.isInteger(D) && D >= E.v && m(E, D + 1);
          }
          yr(a);
        }
        return !0;
      },
      ownKeys(o) {
        s(a);
        var c = Reflect.ownKeys(o).filter((x) => {
          var v = n.get(x);
          return v === void 0 || v.v !== He;
        });
        for (var [d, f] of n)
          f.v !== He && !(d in o) && c.push(d);
        return c;
      },
      setPrototypeOf() {
        Dl();
      }
    }
  );
}
function Oa(t) {
  try {
    if (t !== null && typeof t == "object" && On in t)
      return t[On];
  } catch {
  }
  return t;
}
function Ti(t, e) {
  return Object.is(Oa(t), Oa(e));
}
var za, Ai, Ci, Ni;
function no() {
  if (za === void 0) {
    za = window, Ai = /Firefox/.test(navigator.userAgent);
    var t = Element.prototype, e = Node.prototype, n = Text.prototype;
    Ci = Hn(e, "firstChild").get, Ni = Hn(e, "nextSibling").get, Ta(t) && (t[Vs] = void 0, t[es] = null, t[Gs] = void 0, t.__e = void 0), Ta(n) && (n[cr] = void 0);
  }
}
function nn(t = "") {
  return document.createTextNode(t);
}
// @__NO_SIDE_EFFECTS__
function jn(t) {
  return (
    /** @type {TemplateNode | null} */
    Ci.call(t)
  );
}
// @__NO_SIDE_EFFECTS__
function Jr(t) {
  return (
    /** @type {TemplateNode | null} */
    Ni.call(t)
  );
}
function b(t, e) {
  return /* @__PURE__ */ jn(t);
}
function Te(t, e = !1) {
  {
    var n = /* @__PURE__ */ jn(t);
    return n instanceof Comment && n.data === "" ? /* @__PURE__ */ Jr(n) : n;
  }
}
function ee(t, e = !1) {
  return /* @__PURE__ */ jn(t);
}
function g(t, e = 1, n = !1) {
  let r = t;
  for (; e--; )
    r = /** @type {TemplateNode} */
    /* @__PURE__ */ Jr(r);
  return r;
}
function ro(t) {
  t.textContent = "";
}
function Oi() {
  return !1;
}
function so(t, e, n) {
  return (
    /** @type {T extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[T] : Element} */
    n ? document.createElement(t, { is: n }) : document.createElement(t)
  );
}
function ao(t) {
  var e = ge;
  if (e === null)
    return de.f |= _n, t;
  if ((e.f & sr) === 0 && (e.f & er) === 0)
    throw t;
  Vt(t, e);
}
function Vt(t, e) {
  if (!(e !== null && (e.f & pt) !== 0)) {
    for (; e !== null; ) {
      if ((e.f & Bs) !== 0 && (e.f & (pt | cs)) === 0) {
        if ((e.f & sr) === 0)
          throw t;
        try {
          e.b.error(t);
          return;
        } catch (n) {
          t = n;
        }
      }
      e = e.parent;
    }
    throw t;
  }
}
function io(t) {
  ge === null && (de === null && zl(), Ol()), ln && Nl();
}
function lo(t, e) {
  var n = e.last;
  n === null ? e.last = e.first = t : (n.next = t, t.prev = n, e.last = t);
}
function on(t, e) {
  var n = ge;
  n !== null && (n.f & ot) !== 0 && (t |= ot);
  var r = {
    ctx: nt,
    deps: null,
    nodes: null,
    f: t | Ve | Ct,
    first: null,
    fn: e,
    last: null,
    next: null,
    parent: n,
    b: n && n.b,
    prev: null,
    teardown: null,
    wv: 0,
    ac: null
  };
  X == null || X.register_created_effect(r);
  var a = r;
  if ((t & er) !== 0)
    Un !== null ? Un.push(r) : Dn.ensure().schedule(r);
  else if (e !== null) {
    try {
      rr(r);
    } catch (l) {
      throw _t(r), l;
    }
    a.deps === null && a.teardown === null && a.nodes === null && a.first === a.last && // either `null`, or a singular child
    (a.f & ar) === 0 && (a = a.first, (t & It) !== 0 && (t & Rn) !== 0 && a !== null && (a.f |= Rn));
  }
  if (a !== null && (a.parent = n, n !== null && lo(a, n), de !== null && (de.f & Ye) !== 0 && (t & an) === 0)) {
    var i = (
      /** @type {Derived} */
      de
    );
    (i.effects ?? (i.effects = [])).push(a);
  }
  return r;
}
function _a() {
  return de !== null && !jt;
}
function ga(t) {
  const e = on(Ss, null);
  return qe(e, Be), e.teardown = t, e;
}
function rn(t) {
  io();
  var e = (
    /** @type {Effect} */
    ge.f
  ), n = !de && (e & Nt) !== 0 && nt !== null && !nt.i;
  if (n) {
    var r = (
      /** @type {ComponentContext} */
      nt
    );
    (r.e ?? (r.e = [])).push(t);
  } else
    return zi(t);
}
function zi(t) {
  return on(er | ol, t);
}
function oo(t) {
  Dn.ensure();
  const e = on(an | ar, t);
  return (n = {}) => new Promise((r) => {
    n.outro ? zn(e, () => {
      _t(e), r(void 0);
    }) : (_t(e), r(void 0));
  });
}
function ba(t) {
  return on(er, t);
}
function uo(t) {
  return on(Bn | ar, t);
}
function ma(t, e = 0) {
  return on(Ss | e, t);
}
function L(t, e = [], n = [], r = []) {
  Gl(r, e, n, (a) => {
    on(Ss, () => {
      t(...a.map(s));
    });
  });
}
function Wr(t, e = 0) {
  var n = on(It | e, t);
  return n;
}
function Tt(t) {
  return on(Nt | ar, t);
}
function Pi(t) {
  var e = t.teardown;
  if (e !== null) {
    const n = ln, r = de;
    Pa(!0), Ot(null);
    try {
      e.call(null);
    } catch (a) {
      Vt(a, t.parent);
    } finally {
      Pa(n), Ot(r);
    }
  }
}
function ya(t, e = !1) {
  var n = t.first;
  for (t.first = t.last = null; n !== null; ) {
    const a = n.ac;
    a !== null && ir(() => {
      a.abort(Yr);
    });
    var r = n.next;
    (n.f & an) !== 0 ? n.parent = null : _t(n, e), n = r;
  }
}
function co(t) {
  for (var e = t.first; e !== null; ) {
    var n = e.next;
    (e.f & Nt) === 0 && _t(e), e = n;
  }
}
function _t(t, e = !0) {
  var n = !1;
  (e || (t.f & ll) !== 0) && t.nodes !== null && t.nodes.end !== null && (fo(
    t.nodes.start,
    /** @type {TemplateNode} */
    t.nodes.end
  ), n = !0), t.f |= cs, ya(t, e && !n), wr(t, 0);
  var r = t.nodes && t.nodes.t;
  if (r !== null)
    for (const i of r)
      i.stop();
  Pi(t), t.f ^= cs, t.f |= pt;
  var a = t.parent;
  a !== null && a.first !== null && Ri(t), t.next = t.prev = t.teardown = t.ctx = t.deps = t.fn = t.nodes = t.ac = t.b = null;
}
function fo(t, e) {
  for (; t !== null; ) {
    var n = t === e ? null : /* @__PURE__ */ Jr(t);
    t.remove(), t = n;
  }
}
function Ri(t) {
  var e = t.parent, n = t.prev, r = t.next;
  n !== null && (n.next = r), r !== null && (r.prev = n), e !== null && (e.first === t && (e.first = r), e.last === t && (e.last = n));
}
function zn(t, e, n = !0) {
  var r = [];
  t.f |= ca, Li(t, r, !0);
  var a = () => {
    n && _t(t), e && e();
  }, i = r.length;
  if (i > 0) {
    var l = () => --i || a();
    for (var o of r)
      o.out(l);
  } else
    a();
}
function Li(t, e, n) {
  if ((t.f & ot) === 0) {
    t.f ^= ot;
    var r = t.nodes && t.nodes.t;
    if (r !== null)
      for (const o of r)
        (o.is_global || n) && e.push(o);
    for (var a = t.first; a !== null; ) {
      var i = a.next;
      if ((a.f & an) === 0) {
        var l = (a.f & Rn) !== 0 || // If this is a branch effect without a block effect parent,
        // it means the parent block effect was pruned. In that case,
        // transparency information was transferred to the branch effect.
        (a.f & Nt) !== 0 && (t.f & It) !== 0;
        Li(a, e, l ? n : !1);
      }
      a = i;
    }
  }
}
function ps(t) {
  t.f &= ~ca, Di(t, !0);
}
function Di(t, e) {
  if ((t.f & ca) === 0 && (t.f & ot) !== 0) {
    t.f ^= ot, (t.f & Be) === 0 && (qe(t, Ve), Dn.ensure().schedule(t));
    for (var n = t.first; n !== null; ) {
      var r = n.next, a = (n.f & Rn) !== 0 || (n.f & Nt) !== 0;
      Di(n, a ? e : !1), n = r;
    }
    var i = t.nodes && t.nodes.t;
    if (i !== null)
      for (const l of i)
        (l.is_global || e) && l.in();
  }
}
function ka(t, e) {
  if (t.nodes)
    for (var n = t.nodes.start, r = t.nodes.end; n !== null; ) {
      var a = n === r ? null : /* @__PURE__ */ Jr(n);
      e.append(n), n = a;
    }
}
let ss = !1, ln = !1;
function Pa(t) {
  ln = t;
}
let de = null, jt = !1;
function Ot(t) {
  de = t;
}
let ge = null;
function Wt(t) {
  ge = t;
}
let Jt = null;
function Ii(t) {
  de !== null && (Jt ?? (Jt = /* @__PURE__ */ new Set())).add(t);
}
let dt = null, kt = 0, Et = null;
function vo(t) {
  Et = t;
}
let ji = 1, yn = 0, Pn = yn;
function Ra(t) {
  Pn = t;
}
function Fi() {
  return ++ji;
}
function Xr(t) {
  var e = t.f;
  if ((e & Ve) !== 0)
    return !0;
  if (e & Ye && (t.f &= ~Ln), (e & Ft) !== 0) {
    for (var n = (
      /** @type {Value[]} */
      t.deps
    ), r = n.length, a = 0; a < r; a++) {
      var i = n[a];
      if (Xr(
        /** @type {Derived} */
        i
      ) && bi(
        /** @type {Derived} */
        i
      ), i.wv > t.wv)
        return !0;
    }
    (e & Ct) !== 0 && // During time traveling we don't want to reset the status so that
    // traversal of the graph in the other batches still happens
    Xe === null && qe(t, Be);
  }
  return !1;
}
function qi(t, e, n = !0) {
  var r = t.reactions;
  if (r !== null && !(Jt !== null && Jt.has(t)))
    for (var a = 0; a < r.length; a++) {
      var i = r[a];
      (i.f & Ye) !== 0 ? qi(
        /** @type {Derived} */
        i,
        e,
        !1
      ) : e === i && (n ? qe(i, Ve) : (i.f & Be) !== 0 && qe(i, Ft), pa(
        /** @type {Effect} */
        i
      ));
    }
}
function Ui(t) {
  var e = dt, n = kt, r = Et, a = de, i = Jt, l = nt, o = jt, c = Pn, d = t.f;
  dt = /** @type {null | Value[]} */
  null, kt = 0, Et = null, de = (d & (Nt | an)) === 0 ? t : null, Jt = null, tr(t.ctx), jt = !1, Pn = ++yn, t.ac !== null && (ir(() => {
    t.ac.abort(Yr);
  }), t.ac = null);
  try {
    t.f |= vs;
    var f = (
      /** @type {Function} */
      t.fn
    ), x = f();
    t.f |= sr;
    var v = La(t);
    if (fi() && Et !== null && !jt && v !== null && (t.f & (Ye | Ft | Ve)) === 0)
      for (var p = 0; p < /** @type {Source[]} */
      Et.length; p++)
        qi(
          Et[p],
          /** @type {Effect} */
          t
        );
    if (a !== null && a !== t) {
      if (yn++, a.deps !== null)
        for (let _ = 0; _ < n; _ += 1)
          a.deps[_].rv = yn;
      if (e !== null)
        for (const _ of e)
          _.rv = yn;
      Et !== null && (r === null ? r = Et : r.push(.../** @type {Source[]} */
      Et));
    }
    return (t.f & _n) !== 0 && (t.f ^= _n), x;
  } catch (_) {
    return La(t), ao(_);
  } finally {
    t.f ^= vs, dt = e, kt = n, Et = r, de = a, Jt = i, tr(l), jt = o, Pn = c;
  }
}
function La(t) {
  var a;
  var e = t.deps, n = X == null ? void 0 : X.is_fork;
  if (dt !== null) {
    var r;
    if (n || wr(t, kt), e !== null && kt > 0)
      for (e.length = kt + dt.length, r = 0; r < dt.length; r++)
        e[kt + r] = dt[r];
    else
      t.deps = e = dt;
    if (_a() && (t.f & Ct) !== 0)
      for (r = kt; r < e.length; r++)
        ((a = e[r]).reactions ?? (a.reactions = [])).push(t);
  } else !n && e !== null && kt < e.length && (wr(t, kt), e.length = kt);
  return e;
}
function ho(t, e) {
  let n = e.reactions;
  if (n !== null) {
    var r = rl.call(n, t);
    if (r !== -1) {
      var a = n.length - 1;
      a === 0 ? n = e.reactions = null : (n[r] = n[a], n.pop());
    }
  }
  if (n === null && (e.f & Ye) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (dt === null || !us.call(dt, e))) {
    var i = (
      /** @type {Derived} */
      e
    );
    (i.f & Ct) !== 0 && (i.f ^= Ct, i.f &= ~Ln), i.v !== He && va(i), i.ac !== null && ir(() => {
      i.ac.abort(Yr), i.ac = null, qe(i, Ve);
    }), Wl(i), wr(i, 0);
  }
}
function wr(t, e) {
  var n = t.deps;
  if (n !== null)
    for (var r = e; r < n.length; r++)
      ho(t, n[r]);
}
function rr(t) {
  var e = t.f;
  if ((e & pt) === 0) {
    qe(t, Be);
    var n = ge, r = ss;
    ge = t, ss = (e & (Nt | an)) === 0;
    try {
      (e & (It | ii)) !== 0 ? co(t) : ya(t), Pi(t);
      var a = Ui(t);
      t.teardown = typeof a == "function" ? a : null, t.wv = ji;
      var i;
    } finally {
      ss = r, ge = n;
    }
  }
}
async function po() {
  await Promise.resolve(), Ql();
}
function s(t) {
  var e = t.f, n = (e & Ye) !== 0;
  if (de !== null && !jt) {
    var r = ge !== null && (ge.f & pt) !== 0;
    if (!r && (Jt === null || !Jt.has(t))) {
      var a = de.deps;
      if ((de.f & vs) !== 0)
        t.rv < yn && (t.rv = yn, dt === null && a !== null && a[kt] === t ? kt++ : dt === null ? dt = [t] : dt.push(t));
      else {
        de.deps ?? (de.deps = []), us.call(de.deps, t) || de.deps.push(t);
        var i = t.reactions;
        i === null ? t.reactions = [de] : us.call(i, de) || i.push(de);
      }
    }
  }
  if (ln && Yt.has(t))
    return Yt.get(t);
  if (n) {
    var l = (
      /** @type {Derived} */
      t
    );
    if (ln) {
      var o = l.v;
      return ((l.f & Be) === 0 && l.reactions !== null || Bi(l)) && (o = da(l)), Yt.set(l, o), o;
    }
    var c = (l.f & Ct) === 0 && !jt && de !== null && (ss || (de.f & Ct) !== 0), d = (l.f & sr) === 0;
    Xr(l) && (c && (l.f |= Ct), bi(l)), c && !d && (mi(l), Hi(l));
  }
  if (Xe != null && Xe.has(t))
    return Xe.get(t);
  if ((t.f & _n) !== 0)
    throw t.v;
  return t.v;
}
function Hi(t) {
  if (t.f |= Ct, t.deps !== null)
    for (const e of t.deps)
      (e.reactions ?? (e.reactions = [])).push(t), (e.f & Ye) !== 0 && (e.f & Ct) === 0 && (mi(
        /** @type {Derived} */
        e
      ), Hi(
        /** @type {Derived} */
        e
      ));
}
function Bi(t) {
  if (t.v === He) return !0;
  if (t.deps === null) return !1;
  for (const e of t.deps)
    if (Yt.has(e) || (e.f & Ye) !== 0 && Bi(
      /** @type {Derived} */
      e
    ))
      return !0;
  return !1;
}
function lr(t) {
  var e = jt;
  try {
    return jt = !0, t();
  } finally {
    jt = e;
  }
}
const _o = ["touchstart", "touchmove"];
function go(t) {
  return _o.includes(t);
}
const kn = Symbol("events"), Vi = /* @__PURE__ */ new Set(), Ws = /* @__PURE__ */ new Set();
function bo(t, e, n, r = {}) {
  function a(i) {
    if (r.capture || Xs.call(e, i), !i.cancelBubble)
      return ir(() => n == null ? void 0 : n.call(this, i));
  }
  return t.startsWith("pointer") || t.startsWith("touch") || t === "wheel" ? Kt(() => {
    e.addEventListener(t, a, r);
  }) : e.addEventListener(t, a, r), a;
}
function Ie(t, e, n, r, a) {
  var i = { capture: r, passive: a }, l = bo(t, e, n, i);
  (e === document.body || // @ts-ignore
  e === window || // @ts-ignore
  e === document || // Firefox has quirky behavior, it can happen that we still get "canplay" events when the element is already removed
  e instanceof HTMLMediaElement) && ga(() => {
    e.removeEventListener(t, l, i);
  });
}
function R(t, e, n) {
  (e[kn] ?? (e[kn] = {}))[t] = n;
}
function rt(t) {
  for (var e = 0; e < t.length; e++)
    Vi.add(t[e]);
  for (var n of Ws)
    n(t);
}
let Ls = null, Ds = !1;
function Xs(t) {
  var k, h;
  var e = this, n = (
    /** @type {Node} */
    e.ownerDocument
  ), r = t.type, a = ((k = t.composedPath) == null ? void 0 : k.call(t)) || [], i = (
    /** @type {null | Element} */
    a[0] || t.target
  );
  Ls = t, Ds || (Ds = !0, setTimeout(() => {
    Ds = !1, Ls = null;
  }));
  var l = 0, o = Ls === t && t[kn];
  if (o) {
    var c = a.indexOf(o);
    if (c !== -1 && (e === document || e === /** @type {any} */
    window)) {
      t[kn] = e;
      return;
    }
    var d = a.indexOf(e);
    if (d === -1)
      return;
    c <= d && (l = c);
  }
  if (i = /** @type {Element} */
  a[l] || t.target, i !== e) {
    ti(t, "currentTarget", {
      configurable: !0,
      get() {
        return i || n;
      }
    });
    var f = de, x = ge;
    Ot(null), Wt(null);
    try {
      for (var v, p = []; i !== null && i !== e; ) {
        try {
          var _ = (h = i[kn]) == null ? void 0 : h[r];
          _ != null && (!/** @type {any} */
          i.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          t.target === i) && _.call(i, t);
        } catch (E) {
          v ? p.push(E) : v = E;
        }
        if (t.cancelBubble) break;
        l++, i = l < a.length ? (
          /** @type {Element} */
          a[l]
        ) : null;
      }
      if (v) {
        for (let E of p)
          queueMicrotask(() => {
            throw E;
          });
        throw v;
      }
    } finally {
      t[kn] = e, delete t.currentTarget, Ot(f), Wt(x);
    }
  }
}
var $a;
const Is = (
  // We gotta write it like this because after downleveling the pure comment may end up in the wrong location
  (($a = globalThis == null ? void 0 : globalThis.window) == null ? void 0 : $a.trustedTypes) && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", {
    /** @param {string} html */
    createHTML: (t) => t
  })
);
function mo(t) {
  return (
    /** @type {string} */
    (Is == null ? void 0 : Is.createHTML(t)) ?? t
  );
}
function Gi(t) {
  var e = so("template");
  return e.innerHTML = mo(t.replaceAll("<!>", "<!---->")), e.content;
}
function xr(t, e) {
  var n = (
    /** @type {Effect} */
    ge
  );
  n.nodes === null && (n.nodes = { start: t, end: e, a: null, t: null });
}
// @__NO_SIDE_EFFECTS__
function A(t, e) {
  var n = (e & yl) !== 0, r = (e & kl) !== 0, a, i = !t.startsWith("<!>");
  return () => {
    a === void 0 && (a = Gi(i ? t : "<!>" + t), n || (a = /** @type {TemplateNode} */
    /* @__PURE__ */ jn(a)));
    var l = (
      /** @type {TemplateNode} */
      r || Ai ? document.importNode(a, !0) : a.cloneNode(!0)
    );
    if (n) {
      var o = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ jn(l)
      ), c = (
        /** @type {TemplateNode} */
        l.lastChild
      );
      xr(o, c);
    } else
      xr(l, l);
    return l;
  };
}
// @__NO_SIDE_EFFECTS__
function yo(t, e, n = "svg") {
  var r = !t.startsWith("<!>"), a = `<${n}>${r ? t : "<!>" + t}</${n}>`, i;
  return () => {
    if (!i) {
      var l = (
        /** @type {DocumentFragment} */
        Gi(a)
      ), o = (
        /** @type {Element} */
        /* @__PURE__ */ jn(l)
      );
      i = /** @type {Element} */
      /* @__PURE__ */ jn(o);
    }
    var c = (
      /** @type {TemplateNode} */
      i.cloneNode(!0)
    );
    return xr(c, c), c;
  };
}
// @__NO_SIDE_EFFECTS__
function ko(t, e) {
  return /* @__PURE__ */ yo(t, e, "svg");
}
function as(t = "") {
  {
    var e = nn(t + "");
    return xr(e, e), e;
  }
}
function sn() {
  var t = document.createDocumentFragment(), e = document.createComment(""), n = nn();
  return t.append(e, n), xr(e, n), t;
}
function M(t, e) {
  t !== null && t.before(
    /** @type {Node} */
    e
  );
}
function wo(t) {
  let e = 0, n = In(0), r;
  return () => {
    _a() && (s(n), ma(() => (e === 0 && (r = lr(() => t(() => yr(n)))), e += 1, () => {
      Kt(() => {
        e -= 1, e === 0 && (r == null || r(), r = void 0, yr(n));
      });
    })));
  };
}
var xo = Rn | ar;
function Eo(t, e, n, r) {
  new So(t, e, n, r);
}
var St, oa, Mt, Sn, at, bt, it, mt, Ut, Mn, fn, Zn, Sr, Mr, $t, ys, Le, Mo, To, Zs, Ao, Qs, pr, is, $s, ea;
class So {
  /**
   * @param {TemplateNode} node
   * @param {BoundaryProps} props
   * @param {((anchor: Node) => void)} children
   * @param {((error: unknown) => unknown) | undefined} [transform_error]
   */
  constructor(e, n, r, a) {
    I(this, Le);
    /** @type {Boundary | null} */
    ft(this, "parent");
    ft(this, "is_pending", !1);
    /**
     * API-level transformError transform function. Transforms errors before they reach the `failed` snippet.
     * Inherited from parent boundary, or defaults to identity.
     * @type {(error: unknown) => unknown}
     */
    ft(this, "transform_error");
    /** @type {TemplateNode} */
    I(this, St);
    /** @type {TemplateNode | null} */
    I(this, oa, null);
    /** @type {BoundaryProps} */
    I(this, Mt);
    /** @type {((anchor: Node) => void)} */
    I(this, Sn);
    /** @type {Effect} */
    I(this, at);
    /** @type {Effect | null} */
    I(this, bt, null);
    /** @type {Effect | null} */
    I(this, it, null);
    /** @type {Effect | null} */
    I(this, mt, null);
    /** @type {DocumentFragment | null} */
    I(this, Ut, null);
    I(this, Mn, 0);
    I(this, fn, 0);
    I(this, Zn, !1);
    /** @type {Set<Effect>} */
    I(this, Sr, /* @__PURE__ */ new Set());
    /** @type {Set<Effect>} */
    I(this, Mr, /* @__PURE__ */ new Set());
    /**
     * A source containing the number of pending async deriveds/expressions.
     * Only created if `$effect.pending()` is used inside the boundary,
     * otherwise updating the source results in needless `Batch.ensure()`
     * calls followed by no-op flushes
     * @type {Source<number> | null}
     */
    I(this, $t, null);
    I(this, ys, wo(() => (B(this, $t, In(u(this, Mn))), () => {
      B(this, $t, null);
    })));
    var i;
    B(this, St, e), B(this, Mt, n), B(this, Sn, (l) => {
      var o = (
        /** @type {Effect} */
        ge
      );
      o.b = this, o.f |= Bs, r(l);
    }), this.parent = /** @type {Effect} */
    ge.b, this.transform_error = a ?? ((i = this.parent) == null ? void 0 : i.transform_error) ?? ((l) => l), B(this, at, Wr(() => {
      J(this, Le, Qs).call(this);
    }, xo));
  }
  /**
   * Defer an effect inside a pending boundary until the boundary resolves
   * @param {Effect} effect
   */
  defer_effect(e) {
    hi(e, u(this, Sr), u(this, Mr));
  }
  /**
   * Returns `false` if the effect exists inside a boundary whose pending snippet is shown
   * @returns {boolean}
   */
  is_rendered() {
    return !this.is_pending && (!this.parent || this.parent.is_rendered());
  }
  has_pending_snippet() {
    return !!u(this, Mt).pending;
  }
  /**
   * Update the source that powers `$effect.pending()` inside this boundary,
   * and controls when the current `pending` snippet (if any) is removed.
   * Do not call from inside the class
   * @param {1 | -1} d
   * @param {Batch} batch
   */
  update_pending_count(e, n) {
    J(this, Le, $s).call(this, e, n), B(this, Mn, u(this, Mn) + e), !(!u(this, $t) || u(this, Zn)) && (B(this, Zn, !0), Kt(() => {
      B(this, Zn, !1), u(this, $t) && nr(u(this, $t), u(this, Mn));
    }));
  }
  get_effect_pending() {
    return u(this, ys).call(this), s(
      /** @type {Source<number>} */
      u(this, $t)
    );
  }
  /** @param {unknown} error */
  error(e) {
    if (!u(this, Mt).onerror && !u(this, Mt).failed)
      throw e;
    X != null && X.is_fork ? (u(this, bt) && X.skip_effect(u(this, bt)), u(this, it) && X.skip_effect(u(this, it)), u(this, mt) && X.skip_effect(u(this, mt)), X.oncommit(() => {
      J(this, Le, ea).call(this, e);
    })) : J(this, Le, ea).call(this, e);
  }
}
St = new WeakMap(), oa = new WeakMap(), Mt = new WeakMap(), Sn = new WeakMap(), at = new WeakMap(), bt = new WeakMap(), it = new WeakMap(), mt = new WeakMap(), Ut = new WeakMap(), Mn = new WeakMap(), fn = new WeakMap(), Zn = new WeakMap(), Sr = new WeakMap(), Mr = new WeakMap(), $t = new WeakMap(), ys = new WeakMap(), Le = new WeakSet(), Mo = function() {
  try {
    B(this, bt, Tt(() => u(this, Sn).call(this, u(this, St))));
  } catch (e) {
    this.error(e);
  }
}, /**
 * @param {unknown} error The deserialized error from the server's hydration comment
 */
To = function(e) {
  const n = u(this, Mt).failed, { reset: r, invoke_onerror: a } = J(this, Le, Zs).call(this, e);
  Kt(a), n && B(this, mt, Tt(() => {
    n(
      u(this, St),
      () => e,
      () => r
    );
  }));
}, /**
 * Creates the `reset` function for a failed boundary, along with a function
 * that invokes `onerror` with it (if provided)
 * @param {unknown} error
 * @returns {{ reset: () => void, invoke_onerror: () => void }}
 */
Zs = function(e) {
  var n = !1, r = !1;
  const a = () => {
    if (n) {
      Sl();
      return;
    }
    n = !0, r && jl(), u(this, mt) !== null && zn(u(this, mt), () => {
      B(this, mt, null);
    }), J(this, Le, is).call(this, () => {
      J(this, Le, Qs).call(this);
    });
  };
  return { reset: a, invoke_onerror: () => {
    var l, o;
    try {
      r = !0, (o = (l = u(this, Mt)).onerror) == null || o.call(l, e, a), r = !1;
    } catch (c) {
      Vt(c, u(this, at) && u(this, at).parent);
    }
  } };
}, Ao = function() {
  const e = u(this, Mt).pending;
  e && (this.is_pending = !0, B(this, it, Tt(() => e(u(this, St)))), Kt(() => {
    var n = B(this, Ut, document.createDocumentFragment()), r = nn(), a = !1;
    if (n.append(r), B(this, bt, J(this, Le, is).call(this, () => {
      try {
        return Tt(() => u(this, Sn).call(this, r));
      } catch (i) {
        try {
          this.error(i), a = !0;
        } catch (l) {
          Vt(l, u(this, at).parent);
        }
        return null;
      }
    })), u(this, bt) === null) {
      B(this, Ut, null), a && J(this, Le, pr).call(
        this,
        /** @type {Batch} */
        X
      );
      return;
    }
    u(this, fn) === 0 && (u(this, St).before(n), B(this, Ut, null), zn(
      /** @type {Effect} */
      u(this, it),
      () => {
        B(this, it, null);
      }
    ), J(this, Le, pr).call(
      this,
      /** @type {Batch} */
      X
    ));
  }));
}, Qs = function() {
  try {
    if (this.is_pending = this.has_pending_snippet(), B(this, fn, 0), B(this, Mn, 0), B(this, bt, Tt(() => {
      u(this, Sn).call(this, u(this, St));
    })), u(this, fn) > 0) {
      var e = B(this, Ut, document.createDocumentFragment());
      ka(u(this, bt), e);
      const n = (
        /** @type {(anchor: Node) => void} */
        u(this, Mt).pending
      );
      B(this, it, Tt(() => n(u(this, St))));
    } else
      J(this, Le, pr).call(
        this,
        /** @type {Batch} */
        X
      );
  } catch (n) {
    this.error(n);
  }
}, /**
 * @param {Batch} batch
 */
pr = function(e) {
  this.is_pending = !1, e.transfer_effects(u(this, Sr), u(this, Mr));
}, /**
 * @template T
 * @param {() => T} fn
 */
is = function(e) {
  var n = ge, r = de, a = nt;
  Wt(u(this, at)), Ot(u(this, at)), tr(u(this, at).ctx);
  try {
    return Dn.ensure(), e();
  } finally {
    Wt(n), Ot(r), tr(a);
  }
}, /**
 * Updates the pending count associated with the currently visible pending snippet,
 * if any, such that we can replace the snippet with content once work is done
 * @param {1 | -1} d
 * @param {Batch} batch
 */
$s = function(e, n) {
  var r;
  if (!this.has_pending_snippet()) {
    this.parent && J(r = this.parent, Le, $s).call(r, e, n);
    return;
  }
  B(this, fn, u(this, fn) + e), u(this, fn) === 0 && (J(this, Le, pr).call(this, n), u(this, it) && zn(u(this, it), () => {
    B(this, it, null);
  }), u(this, Ut) && (u(this, St).before(u(this, Ut)), B(this, Ut, null)));
}, /**
 * @param {unknown} error
 */
ea = function(e) {
  u(this, bt) && (_t(u(this, bt)), B(this, bt, null)), u(this, it) && (_t(u(this, it)), B(this, it, null)), u(this, mt) && (_t(u(this, mt)), B(this, mt, null));
  let n = u(this, Mt).failed;
  const r = (a) => {
    const { reset: i, invoke_onerror: l } = J(this, Le, Zs).call(this, a);
    l(), n && B(this, mt, J(this, Le, is).call(this, () => {
      try {
        return Tt(() => {
          var o = (
            /** @type {Effect} */
            ge
          );
          o.b = this, o.f |= Bs, n(
            u(this, St),
            () => a,
            () => i
          );
        });
      } catch (o) {
        return Vt(
          o,
          /** @type {Effect} */
          u(this, at).parent
        ), null;
      }
    }));
  };
  Kt(() => {
    var a;
    try {
      a = this.transform_error(e);
    } catch (i) {
      Vt(i, u(this, at) && u(this, at).parent);
      return;
    }
    a !== null && typeof a == "object" && typeof /** @type {any} */
    a.then == "function" ? a.then(
      r,
      /** @param {unknown} e */
      (i) => Vt(i, u(this, at) && u(this, at).parent)
    ) : r(a);
  });
};
function G(t, e) {
  var n = e == null ? "" : typeof e == "object" ? `${e}` : e;
  n !== /** @type {any} */
  (t[cr] ?? (t[cr] = t.nodeValue)) && (t[cr] = n, t.nodeValue = `${n}`);
}
function Da(t, e) {
  return Co(t, e);
}
const $r = /* @__PURE__ */ new Map();
function Co(t, { target: e, anchor: n, props: r = {}, events: a, context: i, intro: l = !0, transformError: o }) {
  no();
  var c = void 0, d = oo(() => {
    var f = n ?? e.appendChild(nn());
    Eo(
      /** @type {TemplateNode} */
      f,
      {
        pending: () => {
        }
      },
      (p) => {
        Ze({});
        var _ = (
          /** @type {ComponentContext} */
          nt
        );
        i && (_.c = i), a && (r.$$events = a), c = t(p, r) || fa(), Qe();
      },
      o
    );
    var x = /* @__PURE__ */ new Set(), v = (p) => {
      for (var _ = 0; _ < p.length; _++) {
        var k = p[_];
        if (!x.has(k)) {
          x.add(k);
          var h = go(k);
          for (const z of [e, document]) {
            var E = $r.get(z);
            E === void 0 && (E = /* @__PURE__ */ new Map(), $r.set(z, E));
            var D = E.get(k);
            D === void 0 ? (z.addEventListener(k, Xs, { passive: h }), E.set(k, 1)) : E.set(k, D + 1);
          }
        }
      }
    };
    return v(Es(Vi)), Ws.add(v), () => {
      var h;
      for (var p of x)
        for (const E of [e, document]) {
          var _ = (
            /** @type {Map<string, number>} */
            $r.get(E)
          ), k = (
            /** @type {number} */
            _.get(p)
          );
          --k == 0 ? (E.removeEventListener(p, Xs), _.delete(p), _.size === 0 && $r.delete(E)) : _.set(p, k);
        }
      Ws.delete(v), f !== n && ((h = f.parentNode) == null || h.removeChild(f));
    };
  });
  return ta.set(c, d), c;
}
let ta = /* @__PURE__ */ new WeakMap();
function Ia(t, e) {
  const n = ta.get(t);
  return n ? (ta.delete(t), n(e)) : Promise.resolve();
}
var Dt, Ht, yt, Tn, Tr, Ar, ks;
class wa {
  /**
   * @param {TemplateNode} anchor
   * @param {boolean} transition
   */
  constructor(e, n = !0) {
    /** @type {TemplateNode} */
    ft(this, "anchor");
    /** @type {Map<Batch, Key>} */
    I(this, Dt, /* @__PURE__ */ new Map());
    /**
     * Map of keys to effects that are currently rendered in the DOM.
     * These effects are visible and actively part of the document tree.
     * Example:
     * ```
     * {#if condition}
     * 	foo
     * {:else}
     * 	bar
     * {/if}
     * ```
     * Can result in the entries `true->Effect` and `false->Effect`
     * @type {Map<Key, Effect>}
     */
    I(this, Ht, /* @__PURE__ */ new Map());
    /**
     * Similar to #onscreen with respect to the keys, but contains branches that are not yet
     * in the DOM, because their insertion is deferred.
     * @type {Map<Key, Branch>}
     */
    I(this, yt, /* @__PURE__ */ new Map());
    /**
     * Keys of effects that are currently outroing
     * @type {Set<Key>}
     */
    I(this, Tn, /* @__PURE__ */ new Set());
    /**
     * Whether to pause (i.e. outro) on change, or destroy immediately.
     * This is necessary for `<svelte:element>`
     */
    I(this, Tr, !0);
    /**
     * @param {Batch} batch
     */
    I(this, Ar, (e) => {
      if (u(this, Dt).has(e)) {
        var n = (
          /** @type {Key} */
          u(this, Dt).get(e)
        ), r = u(this, Ht).get(n);
        if (r)
          ps(r), u(this, Tn).delete(n);
        else {
          var a = u(this, yt).get(n);
          a && (ps(a.effect), u(this, Ht).set(n, a.effect), u(this, yt).delete(n), a.fragment.lastChild.remove(), this.anchor.before(a.fragment), r = a.effect);
        }
        for (const [i, l] of u(this, Dt)) {
          if (u(this, Dt).delete(i), i === e)
            break;
          const o = u(this, yt).get(l);
          o && (_t(o.effect), u(this, yt).delete(l));
        }
        for (const [i, l] of u(this, Ht)) {
          if (i === n || u(this, Tn).has(i)) continue;
          const o = () => {
            if (Array.from(u(this, Dt).values()).includes(i)) {
              var d = document.createDocumentFragment();
              ka(l, d), d.append(nn()), u(this, yt).set(i, { effect: l, fragment: d });
            } else
              _t(l);
            u(this, Tn).delete(i), u(this, Ht).delete(i);
          };
          u(this, Tr) || !r ? (u(this, Tn).add(i), zn(l, o, !1)) : o();
        }
      }
    });
    /**
     * @param {Batch} batch
     */
    I(this, ks, (e) => {
      u(this, Dt).delete(e);
      const n = Array.from(u(this, Dt).values());
      for (const [r, a] of u(this, yt))
        n.includes(r) || (_t(a.effect), u(this, yt).delete(r));
    });
    this.anchor = e, B(this, Tr, n);
  }
  /**
   *
   * @param {any} key
   * @param {null | ((target: TemplateNode) => void)} fn
   */
  ensure(e, n) {
    var r = (
      /** @type {Batch} */
      X
    ), a = Oi();
    if (n && !u(this, Ht).has(e) && !u(this, yt).has(e))
      if (a) {
        var i = document.createDocumentFragment(), l = nn();
        i.append(l), u(this, yt).set(e, {
          effect: Tt(() => n(l)),
          fragment: i
        });
      } else
        u(this, Ht).set(
          e,
          Tt(() => n(this.anchor))
        );
    if (u(this, Dt).set(r, e), a) {
      for (const [o, c] of u(this, Ht))
        o === e ? r.unskip_effect(c) : r.skip_effect(c);
      for (const [o, c] of u(this, yt))
        o === e ? r.unskip_effect(c.effect) : r.skip_effect(c.effect);
      r.oncommit(u(this, Ar)), r.ondiscard(u(this, ks));
    } else
      u(this, Ar).call(this, r);
  }
}
Dt = new WeakMap(), Ht = new WeakMap(), yt = new WeakMap(), Tn = new WeakMap(), Tr = new WeakMap(), Ar = new WeakMap(), ks = new WeakMap();
function W(t, e, n = !1) {
  var r = new wa(t), a = n ? Rn : 0;
  function i(l, o) {
    r.ensure(l, o);
  }
  Wr(() => {
    var l = !1;
    e((o, c = 0) => {
      l = !0, i(c, o);
    }), l || i(-1, null);
  }, a);
}
const No = Symbol("NaN");
function Oo(t, e, n) {
  var r = new wa(t);
  Wr(() => {
    var a = e();
    a !== a && (a = /** @type {any} */
    No), r.ensure(a, n);
  });
}
function ht(t, e) {
  return e;
}
function zo(t, e, n) {
  for (var r = [], a = e.length, i, l = e.length, o = 0; o < a; o++) {
    let x = e[o];
    zn(
      x,
      () => {
        if (i) {
          if (i.pending.delete(x), i.done.add(x), i.pending.size === 0) {
            var v = (
              /** @type {Set<EachOutroGroup>} */
              t.outrogroups
            );
            na(t, Es(i.done)), v.delete(i), v.size === 0 && (t.outrogroups = null);
          }
        } else
          l -= 1;
      },
      !1
    );
  }
  if (l === 0) {
    var c = r.length === 0 && n !== null && t.pending.size === 0;
    if (c) {
      var d = (
        /** @type {Element} */
        n
      ), f = (
        /** @type {Element} */
        d.parentNode
      );
      ro(f), f.append(d), t.items.clear();
    }
    na(t, e, !c);
  } else
    i = {
      pending: new Set(e),
      done: /* @__PURE__ */ new Set()
    }, (t.outrogroups ?? (t.outrogroups = /* @__PURE__ */ new Set())).add(i);
}
function na(t, e, n = !0) {
  var r;
  if (t.pending.size > 0) {
    r = /* @__PURE__ */ new Set();
    for (const l of t.pending.values())
      for (const o of l)
        r.add(
          /** @type {EachItem} */
          t.items.get(o).e
        );
  }
  for (var a = 0; a < e.length; a++) {
    var i = e[a];
    if (r != null && r.has(i)) {
      i.f |= Gt;
      const l = document.createDocumentFragment();
      ka(i, l);
    } else
      _t(e[a], n);
  }
}
var ja;
function Re(t, e, n, r, a, i = null) {
  var l = t, o = /* @__PURE__ */ new Map(), c = (e & oi) !== 0;
  if (c) {
    var d = (
      /** @type {Element} */
      t
    );
    l = d.appendChild(nn());
  }
  var f = null, x = /* @__PURE__ */ gi(() => {
    var z = n();
    return (
      /** @type {V[]} */
      Kr(z) ? z : z == null ? [] : Es(z)
    );
  }), v, p = /* @__PURE__ */ new Map(), _ = !0;
  function k(z) {
    (D.effect.f & pt) === 0 && (D.pending.delete(z), D.fallback = f, Po(D, v, l, e, r), f !== null && (v.length === 0 ? (f.f & Gt) === 0 ? ps(f) : (f.f ^= Gt, _r(f, null, l)) : zn(f, () => {
      f = null;
    })));
  }
  function h(z) {
    D.pending.delete(z);
  }
  var E = Wr(() => {
    v = /** @type {V[]} */
    s(x);
    for (var z = v.length, K = /* @__PURE__ */ new Set(), P = (
      /** @type {Batch} */
      X
    ), S = Oi(), w = 0; w < z; w += 1) {
      var y = v[w], T = r(y, w), C = _ ? null : o.get(T);
      C ? (C.v && nr(C.v, y), C.i && nr(C.i, w), S && P.unskip_effect(C.e)) : (C = Ro(
        o,
        _ ? l : ja ?? (ja = nn()),
        y,
        T,
        w,
        a,
        e,
        n
      ), _ || (C.e.f |= Gt), o.set(T, C)), K.add(T);
    }
    if (z === 0 && i && !f && (_ ? f = Tt(() => i(l)) : (f = Tt(() => i(ja ?? (ja = nn()))), f.f |= Gt)), z > K.size && Cl(), !_)
      if (p.set(P, K), S) {
        for (const [H, V] of o)
          K.has(H) || P.skip_effect(V.e);
        P.oncommit(k), P.ondiscard(h);
      } else
        k(P);
    s(x);
  }), D = { effect: E, items: o, pending: p, outrogroups: null, fallback: f };
  _ = !1;
}
function ur(t) {
  for (; t !== null && (t.f & Nt) === 0; )
    t = t.next;
  return t;
}
function Po(t, e, n, r, a) {
  var C, H, V, fe, pe, _e, te, Ce, Ee;
  var i = (r & hl) !== 0, l = e.length, o = t.items, c = ur(t.effect.first), d, f = null, x, v = [], p = [], _, k, h, E;
  if (i)
    for (E = 0; E < l; E += 1)
      _ = e[E], k = a(_, E), h = /** @type {EachItem} */
      o.get(k).e, (h.f & Gt) === 0 && ((H = (C = h.nodes) == null ? void 0 : C.a) == null || H.measure(), (x ?? (x = /* @__PURE__ */ new Set())).add(h));
  for (E = 0; E < l; E += 1) {
    if (_ = e[E], k = a(_, E), h = /** @type {EachItem} */
    o.get(k).e, t.outrogroups !== null)
      for (const we of t.outrogroups)
        we.pending.delete(h), we.done.delete(h);
    if ((h.f & ot) !== 0 && (ps(h), i && ((fe = (V = h.nodes) == null ? void 0 : V.a) == null || fe.unfix(), (x ?? (x = /* @__PURE__ */ new Set())).delete(h))), (h.f & Gt) !== 0)
      if (h.f ^= Gt, h === c)
        _r(h, null, n);
      else {
        var D = f ? f.next : c;
        h === t.effect.last && (t.effect.last = h.prev), h.prev && (h.prev.next = h.next), h.next && (h.next.prev = h.prev), un(t, f, h), un(t, h, D), _r(h, D, n), f = h, v = [], p = [], c = ur(f.next);
        continue;
      }
    if (h !== c) {
      if (d !== void 0 && d.has(h)) {
        if (v.length < p.length) {
          var z = p[0], K;
          f = z.prev;
          var P = v[0], S = v[v.length - 1];
          for (K = 0; K < v.length; K += 1)
            _r(v[K], z, n);
          for (K = 0; K < p.length; K += 1)
            d.delete(p[K]);
          un(t, P.prev, S.next), un(t, f, P), un(t, S, z), c = z, f = S, E -= 1, v = [], p = [];
        } else
          d.delete(h), _r(h, c, n), un(t, h.prev, h.next), un(t, h, f === null ? t.effect.first : f.next), un(t, f, h), f = h;
        continue;
      }
      for (v = [], p = []; c !== null && c !== h; )
        (d ?? (d = /* @__PURE__ */ new Set())).add(c), p.push(c), c = ur(c.next);
      if (c === null)
        continue;
    }
    (h.f & Gt) === 0 && v.push(h), f = h, c = ur(h.next);
  }
  if (t.outrogroups !== null) {
    for (const we of t.outrogroups)
      we.pending.size === 0 && (na(t, Es(we.done)), (pe = t.outrogroups) == null || pe.delete(we));
    t.outrogroups.size === 0 && (t.outrogroups = null);
  }
  if (c !== null || d !== void 0) {
    var w = [];
    if (d !== void 0)
      for (h of d)
        (h.f & ot) === 0 && w.push(h);
    for (; c !== null; )
      (c.f & ot) === 0 && c !== t.fallback && w.push(c), c = ur(c.next);
    var y = w.length;
    if (y > 0) {
      var T = (r & oi) !== 0 && l === 0 ? n : null;
      if (i) {
        for (E = 0; E < y; E += 1)
          (te = (_e = w[E].nodes) == null ? void 0 : _e.a) == null || te.measure();
        for (E = 0; E < y; E += 1)
          (Ee = (Ce = w[E].nodes) == null ? void 0 : Ce.a) == null || Ee.fix();
      }
      zo(t, w, T);
    }
  }
  i && Kt(() => {
    var we, Ne;
    if (x !== void 0)
      for (h of x)
        (Ne = (we = h.nodes) == null ? void 0 : we.a) == null || Ne.apply();
  });
}
function Ro(t, e, n, r, a, i, l, o) {
  var c = (l & vl) !== 0 ? (l & pl) === 0 ? /* @__PURE__ */ eo(n, !1, !1) : In(n) : null, d = (l & dl) !== 0 ? In(a) : null;
  return {
    v: c,
    i: d,
    e: Tt(() => (i(e, c ?? n, d ?? a, o), () => {
      t.delete(r);
    }))
  };
}
function _r(t, e, n) {
  if (t.nodes)
    for (var r = t.nodes.start, a = t.nodes.end, i = e && (e.f & Gt) === 0 ? (
      /** @type {EffectNodes} */
      e.nodes.start
    ) : n; r !== null; ) {
      var l = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ Jr(r)
      );
      if (i.before(r), r === a)
        return;
      r = l;
    }
}
function un(t, e, n) {
  e === null ? t.effect.first = n : e.next = n, n === null ? t.effect.last = e : n.prev = e;
}
function Fa(t, e, ...n) {
  var r = new wa(t);
  Wr(() => {
    const a = e() ?? null;
    r.ensure(a, a && ((i) => a(i, ...n)));
  }, Rn);
}
function Ki(t) {
  var e, n, r = "";
  if (typeof t == "string" || typeof t == "number") r += t;
  else if (typeof t == "object") if (Array.isArray(t)) {
    var a = t.length;
    for (e = 0; e < a; e++) t[e] && (n = Ki(t[e])) && (r && (r += " "), r += n);
  } else for (n in t) t[n] && (r && (r += " "), r += n);
  return r;
}
function Lo() {
  for (var t, e, n = 0, r = "", a = arguments.length; n < a; n++) (t = arguments[n]) && (e = Ki(t)) && (r && (r += " "), r += e);
  return r;
}
function qa(t) {
  return typeof t == "object" ? Lo(t) : t ?? "";
}
const Ua = [...` 	
\r\f \v\uFEFF`];
function Do(t, e, n) {
  var r = t == null ? "" : "" + t;
  if (e && (r = r ? r + " " + e : e), n) {
    for (var a of Object.keys(n))
      if (n[a])
        r = r ? r + " " + a : a;
      else if (r.length)
        for (var i = a.length, l = 0; (l = r.indexOf(a, l)) >= 0; ) {
          var o = l + i;
          (l === 0 || Ua.includes(r[l - 1])) && (o === r.length || Ua.includes(r[o])) ? r = (l === 0 ? "" : r.substring(0, l)) + r.substring(o + 1) : l = o;
        }
  }
  return r === "" ? null : r;
}
function Ha(t, e = !1) {
  var n = e ? " !important;" : ";", r = "";
  for (var a of Object.keys(t)) {
    var i = t[a];
    i != null && i !== "" && (r += " " + a + ": " + i + n);
  }
  return r;
}
function Io(t, e) {
  if (e) {
    var n = "", r, a;
    return Array.isArray(e) ? (r = e[0], a = e[1]) : r = e, r && (n += Ha(r)), a && (n += Ha(a, !0)), n = n.trim(), n === "" ? null : n;
  }
  return String(t);
}
function ye(t, e, n, r, a, i) {
  var l = (
    /** @type {any} */
    t[Vs]
  );
  if (l !== n || l === void 0) {
    var o = Do(n, r, i);
    o == null ? t.removeAttribute("class") : t.className = o, t[Vs] = n;
  } else if (i && a !== i)
    for (var c in i) {
      var d = !!i[c];
      (a == null || d !== !!a[c]) && t.classList.toggle(c, d);
    }
  return i;
}
function js(t, e = {}, n, r) {
  for (var a in n) {
    var i = n[a];
    e[a] !== i && (n[a] == null ? t.style.removeProperty(a) : t.style.setProperty(a, i, r));
  }
}
function At(t, e, n, r) {
  var a = (
    /** @type {any} */
    t[Gs]
  );
  if (a !== e) {
    var i = Io(e, r);
    i == null ? t.removeAttribute("style") : t.style.cssText = i, t[Gs] = e;
  } else r && (Array.isArray(r) ? (js(t, n == null ? void 0 : n[0], r[0]), js(t, n == null ? void 0 : n[1], r[1], "important")) : js(t, n, r));
  return r;
}
function jo(t, e) {
  e ? t.hasAttribute("selected") || t.setAttribute("selected", "") : t.removeAttribute("selected");
}
function Fo(t, e) {
  var n = t.__defaultValue, r = t.multiple, a = r ? n ?? [] : null;
  if (!(r && !Kr(a))) {
    t.selectedIndex;
    for (var i of t.options) {
      var l = Vn(i);
      jo(
        i,
        r ? (
          /** @type {any[]} */
          a.includes(l)
        ) : Ti(l, n)
      );
    }
  }
}
function Ms(t, e, n = !1) {
  if (t.multiple) {
    if (e == null)
      return;
    if (!Kr(e))
      return El();
    for (var r of t.options)
      r.selected = e.includes(Vn(r));
    return;
  }
  for (r of t.options) {
    var a = Vn(r);
    if (Ti(a, e)) {
      r.selected = !0;
      return;
    }
  }
  (!n || e !== void 0) && (t.selectedIndex = -1);
}
function _s(t) {
  var e = new MutationObserver((n) => {
    n.every(qo) || ("__defaultValue" in t && Fo(t), "__value" in t && Ms(t, t.__value));
  });
  e.observe(t, {
    // Listen to option element changes
    childList: !0,
    subtree: !0,
    // because of <optgroup>
    // Listen to option element value attribute changes
    // (doesn't get notified of select value changes,
    // because that property is not reflected as an attribute)
    attributes: !0,
    attributeFilter: ["value"]
  }), ga(() => {
    e.disconnect();
  });
}
function Ba(t, e, n = e) {
  var r = /* @__PURE__ */ new WeakSet(), a = !0;
  pi(t, "change", (i) => {
    var l = i ? "[selected]" : ":checked", o;
    if (t.multiple)
      o = [].map.call(t.querySelectorAll(l), Vn);
    else {
      var c = t.querySelector(l) ?? // will fall back to first non-disabled option if no option is selected
      t.querySelector("option:not([disabled])");
      o = c && Vn(c);
    }
    n(o), t.__value = o, X !== null && r.add(X);
  }), ba(() => {
    var i = e();
    if (t === document.activeElement) {
      var l = (
        /** @type {Batch} */
        X
      );
      if (r.has(l))
        return;
    }
    if (Ms(t, i, a), a && i === void 0) {
      var o = t.querySelector(":checked");
      o !== null && (i = Vn(o), n(i));
    }
    t.__value = i, a = !1;
  });
}
function Vn(t) {
  return "__value" in t ? t.__value : t.value;
}
function qo(t) {
  if (
    /** @type {Element} */
    t.target.closest("selectedcontent") !== null
  )
    return !0;
  if (t.type === "childList") {
    var e = [...t.addedNodes, ...t.removedNodes];
    return e.length > 0 && e.every((n) => n.nodeName === "SELECTEDCONTENT");
  }
  return !1;
}
const Uo = Symbol("is custom element"), Ho = Symbol("is html"), Bo = fl ? "progress" : "PROGRESS";
function wn(t, e) {
  var n = xa(t);
  n.value === (n.value = // treat null and undefined the same for the initial value
  e ?? void 0) || // @ts-expect-error
  // `progress` elements always need their value set when it's `0`
  t.value === e && (e !== 0 || t.nodeName !== Bo) || (t.value = e ?? "");
}
function Vo(t, e) {
  var n = xa(t);
  n.checked !== (n.checked = // treat null and undefined the same for the initial value
  e ?? void 0) && (t.checked = e);
}
function he(t, e, n, r) {
  var a = xa(t);
  a[e] !== (a[e] = n) && (e === "loading" && (t[cl] = n), n == null ? t.removeAttribute(e) : typeof n != "string" && Go(t).has(e) ? t[e] = n : t.setAttribute(e, n));
}
function xa(t) {
  return (
    /** @type {Record<string | symbol, unknown>} **/
    /** @type {any} */
    t[es] ?? (t[es] = {
      [Uo]: t.nodeName.includes("-"),
      [Ho]: t.namespaceURI === wl
    })
  );
}
var Va = /* @__PURE__ */ new Map();
function Go(t) {
  var e = t.getAttribute("is") || t.nodeName, n = Va.get(e);
  if (n) return n;
  Va.set(e, n = /* @__PURE__ */ new Set());
  for (var r, a = t, i = Element.prototype; i !== a; ) {
    r = sl(a);
    for (var l in r)
      r[l].set && // better safe than sorry, we don't want spread attributes to mess with HTML content
      l !== "innerHTML" && l !== "textContent" && l !== "innerText" && n.add(l);
    a = ua(a);
  }
  return n;
}
function gn(t, e, n = e) {
  var r = /* @__PURE__ */ new WeakSet();
  pi(t, "input", async (a) => {
    var i = a ? t.defaultValue : t.value;
    if (i = Fs(t) ? qs(i) : i, n(i), X !== null && r.add(X), await po(), i !== (i = e())) {
      var l = t.selectionStart, o = t.selectionEnd, c = t.value.length;
      if (t.value = i ?? "", o !== null) {
        var d = t.value.length;
        l === o && o === c && d > c ? (t.selectionStart = d, t.selectionEnd = d) : (t.selectionStart = l, t.selectionEnd = Math.min(o, d));
      }
    }
  }), // If we are hydrating and the value has since changed,
  // then use the updated value from the input instead.
  // If defaultValue is set, then value == defaultValue
  // TODO Svelte 6: remove input.value check and set to empty string?
  lr(e) == null && t.value && (n(Fs(t) ? qs(t.value) : t.value), X !== null && r.add(X)), ma(() => {
    var a = e();
    if (t === document.activeElement) {
      var i = (
        /** @type {Batch} */
        X
      );
      if (r.has(i))
        return;
    }
    Fs(t) && a === qs(t.value) || t.type === "date" && !a && !t.value || a !== t.value && (t.value = a ?? "");
  });
}
function Fs(t) {
  var e = t.type;
  return e === "number" || e === "range";
}
function qs(t) {
  return t === "" ? null : +t;
}
var vn, Qn, Cr, ws, Yi;
const xs = class xs {
  /** @param {ResizeObserverOptions} options */
  constructor(e) {
    I(this, ws);
    /** */
    I(this, vn, /* @__PURE__ */ new WeakMap());
    /** @type {ResizeObserver | undefined} */
    I(this, Qn);
    /** @type {ResizeObserverOptions} */
    I(this, Cr);
    B(this, Cr, e);
  }
  /**
   * @param {Element} element
   * @param {(entry: ResizeObserverEntry) => any} listener
   */
  observe(e, n) {
    var r = u(this, vn).get(e) || /* @__PURE__ */ new Set();
    return r.add(n), u(this, vn).set(e, r), J(this, ws, Yi).call(this).observe(e, u(this, Cr)), () => {
      var a = u(this, vn).get(e);
      a.delete(n), a.size === 0 && (u(this, vn).delete(e), u(this, Qn).unobserve(e));
    };
  }
};
vn = new WeakMap(), Qn = new WeakMap(), Cr = new WeakMap(), ws = new WeakSet(), Yi = function() {
  return u(this, Qn) ?? B(this, Qn, new ResizeObserver(
    /** @param {any} entries */
    (e) => {
      for (var n of e) {
        xs.entries.set(n.target, n);
        for (var r of u(this, vn).get(n.target) || [])
          r(n);
      }
    }
  ));
}, /** @static */
ft(xs, "entries", /* @__PURE__ */ new WeakMap());
let ra = xs;
var Ko = /* @__PURE__ */ new ra({
  box: "border-box"
});
function Yo(t, e, n) {
  var r = Ko.observe(t, () => n(t[e]));
  ba(() => (lr(() => n(t[e])), r));
}
function Us(t, e) {
  return t === e || (t == null ? void 0 : t[On]) === e;
}
function bn(t = fa(), e, n, r) {
  var a = (
    /** @type {ComponentContext} */
    nt.r
  ), i = (
    /** @type {Effect} */
    ge
  );
  return ba(() => {
    var l, o;
    return ma(() => {
      l = o, o = (r == null ? void 0 : r()) || [], lr(() => {
        Us(n(...o), t) || (e(t, ...o), l && Us(n(...l), t) && e(null, ...l));
      });
    }), () => {
      let c = i;
      for (; c !== a && c.parent !== null && c.parent.f & cs; )
        c = c.parent;
      const d = () => {
        o && Us(n(...o), t) && e(null, ...o);
      }, f = c.teardown;
      c.teardown = () => {
        d(), f == null || f();
      };
    };
  }), t;
}
function je(t, e, n, r) {
  var K;
  var a = !0, i = (n & bl) !== 0, l = (n & ml) !== 0, o = (
    /** @type {V} */
    r
  ), c = !0, d = (
    /** @type {Derived<V> | undefined} */
    void 0
  ), f = () => l && a ? (d ?? (d = /* @__PURE__ */ kr(
    /** @type {() => V} */
    r
  )), s(d)) : (c && (c = !1, o = l ? lr(
    /** @type {() => V} */
    r
  ) : (
    /** @type {V} */
    r
  )), o);
  let x;
  if (i) {
    var v = On in t || ul in t;
    x = ((K = Hn(t, e)) == null ? void 0 : K.set) ?? (v && e in t ? (P) => t[e] = P : void 0);
  }
  var p, _ = !1;
  i ? [p, _] = Hl(() => (
    /** @type {V} */
    t[e]
  )) : p = /** @type {V} */
  t[e], p === void 0 && r !== void 0 && (p = f(), x && (Rl(), x(p)));
  var k;
  if (k = () => {
    var P = (
      /** @type {V} */
      t[e]
    );
    return P === void 0 ? f() : (c = !0, P);
  }, (n & gl) === 0)
    return k;
  if (x) {
    var h = t.$$legacy;
    return (
      /** @type {() => V} */
      (function(P, S) {
        return arguments.length > 0 ? ((!S || h || _) && x(S ? k() : P), P) : k();
      })
    );
  }
  var E = !1, D = ((n & _l) !== 0 ? kr : gi)(() => (E = !1, k()));
  i && s(D);
  var z = (
    /** @type {Effect} */
    ge
  );
  return (
    /** @type {() => V} */
    (function(P, S) {
      if (arguments.length > 0) {
        const w = S ? s(D) : i ? tt(P) : P;
        return m(D, w), E = !0, o !== void 0 && (o = w), P;
      }
      return ln && E || (z.f & pt) !== 0 ? D.v : s(D);
    })
  );
}
function Zr(t) {
  nt === null && Tl(), rn(() => {
    const e = lr(t);
    if (typeof e == "function") return (
      /** @type {() => void} */
      e
    );
  });
}
const Jo = "5";
var ei;
typeof window < "u" && ((ei = window.__svelte ?? (window.__svelte = {})).v ?? (ei.v = /* @__PURE__ */ new Set())).add(Jo);
var Wo = /* @__PURE__ */ ko('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="svelte-13so817"><path></path></svg>');
function $(t, e) {
  let n = je(e, "name", 3, "square"), r = je(e, "size", 3, 16), a = je(e, "fa", 3, "");
  const i = {
    plus: "M12 5v14M5 12h14",
    x: "M18 6 6 18M6 6l12 12",
    undo: "M9 14 4 9l5-5M4 9h10.5a5.5 5.5 0 0 1 0 11H11",
    redo: "m15 14 5-5-5-5M20 9H9.5a5.5 5.5 0 0 0 0 11H13",
    up: "m18 15-6-6-6 6",
    down: "m6 9 6 6 6-6",
    copy: "M8 8h12v12H8zM4 16V4h12",
    trash: "M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6",
    eye: "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
    "eye-off": "M3 3l18 18M10.6 10.6a3 3 0 0 0 4.2 4.2M9.9 5.2A10.4 10.4 0 0 1 12 5c6.5 0 10 7 10 7a17 17 0 0 1-3.2 4.2M6.6 6.6C3.9 8.4 2 12 2 12s3.5 7 10 7a9.7 9.7 0 0 0 5.4-1.6",
    grip: "M9 5h.01M9 12h.01M9 19h.01M15 5h.01M15 12h.01M15 19h.01",
    monitor: "M3 4h18v12H3zM8 20h8M12 16v4",
    tablet: "M6 2h12v20H6zM11 18h2",
    phone: "M8 2h8v20H8zM11 18h2",
    layers: "m12 2 10 5-10 5L2 7zM2 12l10 5 10-5M2 17l10 5 10-5",
    blocks: "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z",
    template: "M3 3h18v6H3zM3 13h8v8H3zM15 13h6v8h-6z",
    settings: "M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6",
    type: "M4 7V4h16v3M9 20h6M12 4v16",
    search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.3-4.3",
    image: "M3 3h18v18H3zM8.5 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM21 15l-5-5L5 21",
    upload: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12",
    check: "M20 6 9 17l-5-5",
    save: "M5 3h11l5 5v13H3V3zM7 3v5h8M7 21v-7h10v7",
    maximize: "M8 3H3v5M16 3h5v5M21 16v5h-5M3 16v5h5",
    chevron: "m9 18 6-6-6-6",
    bold: "M6 4h8a4 4 0 0 1 0 8H6zM6 12h9a4 4 0 0 1 0 8H6z",
    italic: "M19 4h-9M14 20H5M15 4 9 20",
    link: "M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7",
    list: "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01",
    star: "m12 2 3 7 7 .6-5.3 4.7 1.6 7.2L12 17.8 5.7 21.5l1.6-7.2L2 9.6 9 9z",
    sparkles: "M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9zM19 17l.8 2.2L22 20l-2.2.8L19 23l-.8-2.2L16 20l2.2-.8z",
    refresh: "M21 12a9 9 0 1 1-2.6-6.4L21 8M21 3v5h-5"
  }, l = {
    "fa-star": "star",
    "fa-align-left": "type",
    "fa-table-cells-large": "blocks",
    "fa-bullhorn": "sparkles",
    "fa-image": "image",
    "fa-clone": "copy",
    "fa-chart-simple": "list",
    "fa-quote-left": "type",
    "fa-circle-question": "list",
    "fa-tags": "template",
    "fa-building": "blocks",
    "fa-images": "image",
    "fa-list": "list",
    "fa-envelope": "type",
    "fa-play": "monitor",
    "fa-arrows-up-down": "grip",
    "fa-square": "blocks"
  }, o = /* @__PURE__ */ le(() => i[a() ? l[a()] || "blocks" : n()] || i.blocks);
  var c = Wo(), d = ee(c);
  L(() => {
    he(c, "width", r()), he(c, "height", r()), he(d, "d", s(o));
  }), M(t, c);
}
const Ji = ["anchor", "background", "spacing", "width", "align", "class", "reveal", "hidden"], gs = (t) => t === void 0 ? void 0 : JSON.parse(JSON.stringify(t));
function Wi(t, e = Ji) {
  if (!t || typeof t != "object" || typeof t.type != "string") return null;
  const { type: n } = t, r = { type: n }, a = {};
  for (const [l, o] of Object.entries(t))
    l === "type" || l === n || (e.includes(l) ? r[l] = o : a[l] = o);
  const i = t[n];
  return r[n] = i && typeof i == "object" && !Array.isArray(i) ? i : a, r;
}
function Hs(t, e) {
  return Array.isArray(t) ? t.map((n) => Wi(n, e)).filter(Boolean) : [];
}
function Ea(t) {
  if (t.default !== void 0)
    return t.validate === "bool" || t.type === "toggle" ? t.default === !0 || t.default === 1 || t.default === "1" : gs(t.default);
  if (t.type === "list") return [];
  if (t.type === "toggle") return !1;
}
function Ga(t, e = !0) {
  const n = {}, r = e && t.example && typeof t.example == "object" ? Wi(t.example) : null;
  r && Object.assign(n, gs(r[t.type]));
  for (const i of t.fields || [])
    if (n[i.name] === void 0) {
      const l = Ea(i);
      l !== void 0 && l !== "" && !(Array.isArray(l) && !l.length) && (n[i.name] = l);
    }
  const a = { type: t.type };
  if (r)
    for (const [i, l] of Object.entries(r)) i !== "type" && i !== t.type && (a[i] = gs(l));
  return a[t.type] = n, a;
}
function Xi(t) {
  const e = t && t[t.type] || {}, n = e.heading || e.title || e.name || e.eyebrow || e.text || e.question || e.url || "";
  if (n) return String(n).replace(/[*_`#>]/g, "").slice(0, 70);
  const r = Array.isArray(e.items) && e.items[0];
  return r ? String(r.title || r.name || r.question || "").slice(0, 70) : "";
}
function Xo(t, e, n) {
  if (t && typeof t == "object")
    for (const r of e || []) {
      const a = t[r.name];
      if (typeof a == "string" && a.trim() && ["text", "textarea", "markdown"].includes(r.type))
        return a.replace(/[*_`#>]/g, "").slice(0, 60);
    }
  return `Item ${n + 1}`;
}
function Zo(t) {
  return gs(t);
}
function Qo() {
  const t = decodeURIComponent(window.location.pathname);
  let e = t.match(/\/pages\/edit\/(.+?)\/?$/);
  return e ? { kind: "page", route: "/" + e[1] } : (e = t.match(/\/flex-objects\/([^/]+)\/([^/]+)\/?$/), e ? { kind: "flex", type: e[1], key: e[2] === "new" ? null : e[2] } : { kind: "unknown" });
}
const Ka = {
  hero: "Hero",
  content: "Content",
  media: "Media",
  "social-proof": "Social proof",
  commerce: "Commerce",
  dynamic: "Dynamic",
  forms: "Forms",
  layout: "Layout"
};
var $o = /* @__PURE__ */ A('<span class="err svelte-1uadtto"> </span>'), eu = /* @__PURE__ */ A('<p class="warn svelte-1uadtto"> </p>'), tu = /* @__PURE__ */ A('<span class="badge svelte-1uadtto">Hidden</span>'), nu = /* @__PURE__ */ A('<li draggable="true"><span class="grip svelte-1uadtto"><!></span> <span class="ico svelte-1uadtto"><!></span> <button type="button" class="row svelte-1uadtto"><strong class="svelte-1uadtto"> </strong> <span class="text svelte-1uadtto"> </span></button> <!></li>'), ru = /* @__PURE__ */ A('<ol class="svelte-1uadtto"></ol>'), su = /* @__PURE__ */ A('<button type="button" class="empty svelte-1uadtto"><!> <span>Start building. Add your first section in the visual builder.</span></button>'), au = /* @__PURE__ */ A('<div class="summary svelte-1uadtto"><header class="svelte-1uadtto"><div><div class="title svelte-1uadtto"> </div> <div class="sub svelte-1uadtto"><!></div></div> <button type="button" class="mb-btn primary"><!> Open Visual Builder</button></header> <!> <!></div>');
function iu(t, e) {
  Ze(e, !0);
  let n = /* @__PURE__ */ F(-1), r = /* @__PURE__ */ F(-1);
  const a = /* @__PURE__ */ le(() => {
    var S;
    return ((S = e.field) == null ? void 0 : S.label) || "Blocks";
  });
  function i(S) {
    s(n) >= 0 && S !== s(n) && e.store.move(s(n), S), m(n, -1), m(r, -1);
  }
  var l = au(), o = b(l), c = b(o), d = b(c), f = ee(d, !0), x = g(d, 2), v = b(x);
  {
    var p = (S) => {
      var w = $o(), y = ee(w, !0);
      L(() => G(y, e.store.loadError)), M(S, w);
    }, _ = (S) => {
      var w = as();
      L(() => G(w, `${e.store.blocks.length ?? ""} ${e.store.blocks.length === 1 ? "section" : "sections"} · drag to reorder, click to edit`)), M(S, w);
    };
    W(v, (S) => {
      e.store.loadError ? S(p) : S(_, -1);
    });
  }
  var k = g(c, 2), h = b(k);
  $(h, { name: "maximize", size: 15 });
  var E = g(o, 2);
  {
    var D = (S) => {
      var w = eu(), y = ee(w, !0);
      L(() => G(y, e.store.isFlex ? "Save this item first. The visual builder previews saved items." : "Save the page first. The visual builder needs a page URL to preview.")), M(S, w);
    };
    W(E, (S) => {
      e.store.canPreview || S(D);
    });
  }
  var z = g(E, 2);
  {
    var K = (S) => {
      var w = ru();
      Re(w, 23, () => e.store.blocks, (y, T) => T + ":" + y.type, (y, T, C) => {
        const H = /* @__PURE__ */ le(() => e.store.defFor(s(T).type));
        var V = nu();
        let fe;
        var pe = b(V), _e = b(pe);
        $(_e, { name: "grip", size: 14 });
        var te = g(pe, 2), Ce = b(te);
        {
          let ae = /* @__PURE__ */ le(() => {
            var re;
            return ((re = s(H)) == null ? void 0 : re.icon) || "fa-square";
          });
          $(Ce, {
            get fa() {
              return s(ae);
            },
            size: 15
          });
        }
        var Ee = g(te, 2), we = b(Ee), Ne = ee(we, !0), Z = g(we, 2), Y = ee(Z, !0), Q = g(Ee, 2);
        {
          var se = (ae) => {
            var re = tu();
            M(ae, re);
          };
          W(Q, (ae) => {
            s(T).hidden && ae(se);
          });
        }
        L(
          (ae) => {
            var re;
            fe = ye(V, 1, "svelte-1uadtto", null, fe, {
              over: s(r) === s(C),
              "hidden-block": s(T).hidden
            }), G(Ne, ((re = s(H)) == null ? void 0 : re.title) || s(T).type), G(Y, ae);
          },
          [() => Xi(s(T))]
        ), Ie("dragstart", V, () => m(n, s(C), !0)), Ie("dragover", V, (ae) => {
          ae.preventDefault(), m(r, s(C), !0);
        }), Ie("dragleave", V, () => m(r, -1)), Ie("drop", V, () => i(s(C))), Ie("dragend", V, () => {
          m(n, -1), m(r, -1);
        }), R("click", Ee, () => e.openBuilder(s(C))), M(y, V);
      }), M(S, w);
    }, P = (S) => {
      var w = su(), y = b(w);
      $(y, { name: "plus", size: 18 }), L(() => w.disabled = !e.store.canPreview), R("click", w, () => e.openBuilder(-1)), M(S, w);
    };
    W(z, (S) => {
      e.store.blocks.length ? S(K) : S(P, -1);
    });
  }
  L(() => {
    G(f, s(a)), k.disabled = !e.store.canPreview;
  }), R("click", k, () => e.openBuilder(-1)), M(t, l), Qe();
}
rt(["click"]);
var lu = /* @__PURE__ */ A('<button type="button" class="card svelte-1cvfiky" draggable="true"><span class="ico svelte-1cvfiky"><!></span> <span class="name svelte-1cvfiky"> </span></button>'), ou = /* @__PURE__ */ A('<section class="svelte-1cvfiky"><h3 class="svelte-1cvfiky"> </h3> <div class="grid svelte-1cvfiky"></div></section>'), uu = /* @__PURE__ */ A('<p class="hint svelte-1cvfiky"> </p>'), cu = /* @__PURE__ */ A('<div class="search svelte-1cvfiky"><!> <input type="search" placeholder="Search blocks" aria-label="Search blocks" class="svelte-1cvfiky"/></div> <p class="hint svelte-1cvfiky"> </p> <!>', 1);
function fu(t, e) {
  Ze(e, !0);
  let n = je(e, "store", 7), r = /* @__PURE__ */ F("");
  const a = /* @__PURE__ */ le(() => {
    var D;
    const _ = s(r).trim().toLowerCase(), k = (((D = n().catalog) == null ? void 0 : D.blocks) || []).filter((z) => !_ || z.title.toLowerCase().includes(_) || z.type.includes(_) || (z.description || "").toLowerCase().includes(_)), h = Object.keys(Ka), E = /* @__PURE__ */ new Map();
    for (const z of k)
      E.has(z.category) || E.set(z.category, []), E.get(z.category).push(z);
    return [...E.entries()].sort((z, K) => {
      const P = h.indexOf(z[0]), S = h.indexOf(K[0]);
      return (P < 0 ? 99 : P) - (S < 0 ? 99 : S);
    });
  });
  function i(_, k) {
    _.dataTransfer.setData("application/x-maw-block", k), _.dataTransfer.setData("text/plain", k), _.dataTransfer.effectAllowed = "copy", requestAnimationFrame(() => n().dragType = k);
  }
  function l() {
    n().dragType = "";
  }
  var o = cu(), c = Te(o), d = b(c);
  $(d, { name: "search", size: 14 });
  var f = g(d, 2), x = g(c, 2), v = ee(x), p = g(x, 2);
  Re(
    p,
    17,
    () => s(a),
    ([_, k]) => _,
    (_, k) => {
      var h = /* @__PURE__ */ le(() => ai(s(k), 2));
      let E = () => s(h)[0], D = () => s(h)[1];
      var z = ou(), K = b(z), P = ee(K, !0), S = g(K, 2);
      Re(S, 21, D, (w) => w.type, (w, y) => {
        var T = lu(), C = b(T), H = b(C);
        $(H, {
          get fa() {
            return s(y).icon;
          },
          size: 18
        });
        var V = g(C, 2), fe = ee(V, !0);
        L(() => {
          he(T, "title", s(y).description), G(fe, s(y).title);
        }), Ie("dragstart", T, (pe) => i(pe, s(y).type)), Ie("dragend", T, l), R("click", T, () => n().insert(s(y).type)), M(w, T);
      }), L(() => G(P, Ka[E()] || E())), M(_, z);
    },
    (_) => {
      var k = uu(), h = ee(k);
      L(() => G(h, `No blocks match “${s(r) ?? ""}”.`)), M(_, k);
    }
  ), L(() => G(v, `${n().selected >= 0 ? `Inserts after block ${n().selected + 1}` : "Inserts at the end of the page"} · or drag onto the page`)), gn(f, () => s(r), (_) => m(r, _)), M(t, o), Qe();
}
rt(["click"]);
var vu = /* @__PURE__ */ A("<span></span>"), du = /* @__PURE__ */ A('<button type="button" class="mb-btn ghost icon sm del svelte-k3gmal" title="Delete pattern"><!></button>'), hu = /* @__PURE__ */ A('<div class="pattern svelte-k3gmal"><button type="button" class="preview svelte-k3gmal" title="Insert pattern"><div class="mini svelte-k3gmal"></div> <div class="meta svelte-k3gmal"><strong class="svelte-k3gmal"> </strong> <span class="svelte-k3gmal"> </span></div></button> <!></div>'), pu = /* @__PURE__ */ A('<p class="empty svelte-k3gmal"> </p>'), _u = /* @__PURE__ */ A('<div class="seg svelte-k3gmal" role="tablist"><button type="button">Sections</button> <button type="button">Page layouts</button></div> <!>', 1);
function gu(t, e) {
  Ze(e, !0);
  let n = /* @__PURE__ */ F("section");
  const r = /* @__PURE__ */ le(() => e.store.patterns.filter((_) => _.category === s(n)));
  async function a(_) {
    if (_.category === "page" && e.store.blocks.length) {
      const k = await e.askConfirm({
        title: `Use “${_.title}”`,
        message: `This layout has ${_.blocks.length} sections. Replace the current page content or add it to the end?`,
        choices: [
          { label: "Cancel", value: null },
          { label: "Add to end", value: "append" },
          { label: "Replace page", value: "replace", primary: !0 }
        ]
      });
      if (!k) return;
      e.store.insertMany(_.blocks, k === "append" ? e.store.blocks.length : null, k === "replace");
    } else
      e.store.insertMany(_.blocks);
    e.store.flash(`Inserted “${_.title}”`);
  }
  async function i(_) {
    if (await e.askConfirm({
      title: "Delete pattern",
      message: `Delete “${_.title}”? Pages that already use it are not affected.`,
      choices: [
        { label: "Cancel", value: !1 },
        { label: "Delete", value: !0, primary: !0 }
      ]
    }))
      try {
        await e.store.deletePattern(_.id);
      } catch (h) {
        e.store.flash(h.message);
      }
  }
  function l(_) {
    var k;
    return ((k = e.store.defFor(_)) == null ? void 0 : k.title) || _;
  }
  var o = _u(), c = Te(o), d = b(c);
  let f;
  var x = g(d, 2);
  let v;
  var p = g(c, 2);
  Re(
    p,
    17,
    () => s(r),
    (_) => _.id,
    (_, k) => {
      var h = hu(), E = b(h), D = b(E);
      Re(D, 21, () => s(k).blocks.slice(0, 6), ht, (C, H) => {
        var V = vu();
        let fe;
        L(() => fe = ye(V, 1, `bar ${s(H).type ?? ""}`, "svelte-k3gmal", fe, {
          accent: s(H).background === "accent" || s(H).type === "cta",
          alt: s(H).background === "alt" || s(H).background === "soft",
          dark: s(H).background === "dark"
        })), M(C, V);
      });
      var z = g(D, 2), K = b(z), P = ee(K, !0), S = g(K, 2), w = ee(S, !0), y = g(E, 2);
      {
        var T = (C) => {
          var H = du(), V = b(H);
          $(V, { name: "trash", size: 13 }), R("click", H, () => i(s(k))), M(C, H);
        };
        W(y, (C) => {
          s(k).source === "user" && C(T);
        });
      }
      L(
        (C) => {
          G(P, s(k).title), G(w, C);
        },
        [
          () => s(k).description || s(k).blocks.map((C) => l(C.type)).join(" · ")
        ]
      ), R("click", E, () => a(s(k))), M(_, h);
    },
    (_) => {
      var k = pu(), h = ee(k);
      L(() => G(h, `No ${s(n) === "page" ? "page layouts" : "sections"} yet. Select blocks and click “Save as pattern” to create one.`)), M(_, k);
    }
  ), L(() => {
    f = ye(d, 1, "svelte-k3gmal", null, f, { active: s(n) === "section" }), v = ye(x, 1, "svelte-k3gmal", null, v, { active: s(n) === "page" });
  }), R("click", d, () => m(n, "section")), R("click", x, () => m(n, "page")), M(t, o), Qe();
}
rt(["click"]);
var bu = /* @__PURE__ */ A('<p class="empty svelte-1jf4jiu">This page has no blocks yet. Add one from the Blocks tab.</p>'), mu = /* @__PURE__ */ A('<li draggable="true"><span class="grip svelte-1jf4jiu"><!></span> <button type="button" class="row svelte-1jf4jiu"><!> <span class="t svelte-1jf4jiu"> </span> <span class="s svelte-1jf4jiu"> </span></button> <span class="actions svelte-1jf4jiu"><button type="button" class="mb-btn ghost icon sm"><!></button> <button type="button" class="mb-btn ghost icon sm" title="Duplicate"><!></button> <button type="button" class="mb-btn ghost icon sm danger" title="Delete"><!></button></span></li>'), yu = /* @__PURE__ */ A('<!> <ol class="svelte-1jf4jiu"></ol>', 1);
function ku(t, e) {
  Ze(e, !0);
  let n = je(e, "store", 7), r = /* @__PURE__ */ F(-1), a = /* @__PURE__ */ F(-1);
  function i(f) {
    s(r) >= 0 && n().move(s(r), (s(r) < f, f)), m(r, m(a, -1), !0);
  }
  var l = yu(), o = Te(l);
  {
    var c = (f) => {
      var x = bu();
      M(f, x);
    };
    W(o, (f) => {
      n().blocks.length || f(c);
    });
  }
  var d = g(o, 2);
  Re(d, 23, () => n().blocks, (f, x) => x + f.type, (f, x, v) => {
    const p = /* @__PURE__ */ le(() => n().defFor(s(x).type));
    var _ = mu();
    let k;
    var h = b(_), E = b(h);
    $(E, { name: "grip", size: 13 });
    var D = g(h, 2), z = b(D);
    {
      let _e = /* @__PURE__ */ le(() => {
        var te;
        return (te = s(p)) == null ? void 0 : te.icon;
      });
      $(z, {
        get fa() {
          return s(_e);
        },
        size: 14
      });
    }
    var K = g(z, 2), P = ee(K, !0), S = g(K, 2), w = ee(S, !0), y = g(D, 2), T = b(y), C = b(T);
    {
      let _e = /* @__PURE__ */ le(() => s(x).hidden ? "eye-off" : "eye");
      $(C, {
        get name() {
          return s(_e);
        },
        size: 13
      });
    }
    var H = g(T, 2), V = b(H);
    $(V, { name: "copy", size: 13 });
    var fe = g(H, 2), pe = b(fe);
    $(pe, { name: "trash", size: 13 }), L(
      (_e) => {
        var te;
        k = ye(_, 1, "svelte-1jf4jiu", null, k, {
          selected: n().selected === s(v),
          over: s(a) === s(v),
          dim: s(x).hidden
        }), G(P, ((te = s(p)) == null ? void 0 : te.title) || s(x).type), G(w, _e), he(T, "title", s(x).hidden ? "Show" : "Hide");
      },
      [() => Xi(s(x))]
    ), Ie("dragstart", _, () => m(r, s(v), !0)), Ie("dragover", _, (_e) => {
      _e.preventDefault(), m(a, s(v), !0);
    }), Ie("dragleave", _, () => m(a, -1)), Ie("drop", _, () => i(s(v))), Ie("dragend", _, () => m(r, m(a, -1), !0)), R("click", D, () => n().selected = s(v)), R("click", T, () => n().toggleHidden(s(v))), R("click", H, () => n().duplicate(s(v))), R("click", fe, () => n().remove(s(v))), M(f, _);
  }), M(t, l), Qe();
}
rt(["click"]);
var wu = /* @__PURE__ */ A('<button type="button" role="option"><span class="ico svelte-18xya39"><!></span> <span class="txt svelte-18xya39"><strong class="svelte-18xya39"> </strong><span class="svelte-18xya39"> </span></span></button>'), xu = /* @__PURE__ */ A('<p class="none svelte-18xya39">No blocks match.</p>'), Eu = /* @__PURE__ */ A('<div class="qi svelte-18xya39" role="dialog" aria-label="Add block"><div class="search svelte-18xya39"><!> <input placeholder="Search blocks…" aria-label="Search blocks" class="svelte-18xya39"/></div> <div class="list mb-scroll svelte-18xya39" role="listbox"></div></div>');
function Su(t, e) {
  Ze(e, !0);
  let n = je(e, "top", 3, 0), r = /* @__PURE__ */ F(""), a = /* @__PURE__ */ F(0), i = /* @__PURE__ */ F(void 0), l = /* @__PURE__ */ F(void 0);
  const o = /* @__PURE__ */ le(() => {
    var E;
    const h = s(r).trim().toLowerCase();
    return (((E = e.store.catalog) == null ? void 0 : E.blocks) || []).filter((D) => !h || D.title.toLowerCase().includes(h) || D.type.includes(h) || (D.description || "").toLowerCase().includes(h));
  });
  rn(() => {
    s(r), m(a, 0);
  });
  function c(h) {
    e.store.insert(h.type, e.index), e.onclose();
  }
  function d(h) {
    h.key === "ArrowDown" ? (h.preventDefault(), m(a, Math.min(s(a) + 1, s(o).length - 1), !0)) : h.key === "ArrowUp" ? (h.preventDefault(), m(a, Math.max(s(a) - 1, 0), !0)) : h.key === "Enter" && s(o)[s(a)] ? (h.preventDefault(), c(s(o)[s(a)])) : h.key === "Escape" && (h.preventDefault(), h.stopPropagation(), e.onclose());
  }
  Zr(() => {
    var E;
    (E = s(i)) == null || E.focus();
    const h = (D) => {
      D.composedPath().includes(s(l)) || e.onclose();
    };
    return setTimeout(() => document.addEventListener("pointerdown", h, !0)), () => document.removeEventListener("pointerdown", h, !0);
  });
  var f = Eu();
  let x;
  var v = b(f), p = b(v);
  $(p, { name: "search", size: 14 });
  var _ = g(p, 2);
  bn(_, (h) => m(i, h), () => s(i));
  var k = g(v, 2);
  Re(
    k,
    23,
    () => s(o),
    (h) => h.type,
    (h, E, D) => {
      var z = wu();
      let K;
      var P = b(z), S = b(P);
      $(S, {
        get fa() {
          return s(E).icon;
        },
        size: 16
      });
      var w = g(P, 2), y = b(w), T = ee(y, !0), C = g(y), H = ee(C, !0);
      L(() => {
        he(z, "aria-selected", s(D) === s(a)), K = ye(z, 1, "svelte-18xya39", null, K, { active: s(D) === s(a) }), G(T, s(E).title), G(H, s(E).description);
      }), Ie("mouseenter", z, () => m(a, s(D), !0)), R("click", z, () => c(s(E))), M(h, z);
    },
    (h) => {
      var E = xu();
      M(h, E);
    }
  ), bn(f, (h) => m(l, h), () => s(l)), L(() => x = At(f, "", x, { top: `${n() ?? ""}px` })), R("keydown", _, d), gn(_, () => s(r), (h) => m(r, h)), M(t, f), Qe();
}
rt(["keydown", "click"]);
function Mu() {
  const t = (window.__GRAV_API_SERVER_URL || "").replace(/\/$/, ""), e = window.__GRAV_API_PREFIX || "/api/v1";
  return t + e;
}
function Tu(t = {}) {
  const e = { Accept: "application/json", ...t };
  return window.__GRAV_API_TOKEN && (e["X-API-Token"] = window.__GRAV_API_TOKEN), window.__GRAV_ENVIRONMENT && (e["X-Grav-Environment"] = window.__GRAV_ENVIRONMENT), e;
}
async function Xt(t, e, n) {
  var l;
  const r = { method: t, headers: Tu(), credentials: "same-origin" };
  n instanceof FormData ? r.body = n : n !== void 0 && (r.headers["Content-Type"] = "application/json", r.body = JSON.stringify(n));
  const a = await fetch(Mu() + e, r);
  if (a.status === 204) return null;
  const i = await a.json().catch(() => ({}));
  if (!a.ok) {
    const o = ((l = i == null ? void 0 : i.error) == null ? void 0 : l.message) || (i == null ? void 0 : i.message) || (i == null ? void 0 : i.detail) || `Request failed (${a.status})`;
    throw new Error(o);
  }
  return i && typeof i == "object" && "data" in i ? i.data : i;
}
function Au(t) {
  return String(t || "").replace(/^\/+/, "").split("/").map(encodeURIComponent).join("/");
}
function Ya(t) {
  return t.kind === "flex" ? `/flex-objects/${encodeURIComponent(t.type)}/${encodeURIComponent(t.key)}/media` : `/pages/${Au(t.route)}/media`;
}
const tn = {
  blocks: () => Xt("GET", "/maw-builder/blocks"),
  patterns: () => Xt("GET", "/maw-builder/patterns"),
  savePattern: (t) => Xt("POST", "/maw-builder/patterns", t),
  deletePattern: (t) => Xt("DELETE", "/maw-builder/patterns/" + encodeURIComponent(t)),
  /** ctx: {kind:'page', route} | {kind:'flex', type, key} */
  preview: (t, e, n) => Xt(
    "POST",
    "/maw-builder/preview",
    t.kind === "flex" ? { context: "flex", type: t.type, key: t.key, blocks: e, field: n } : { route: t.route, blocks: e, field: n }
  ),
  /** Media stored with the page or Flex object being edited. */
  ownMedia: (t) => Xt("GET", Ya(t)),
  uploadOwnMedia: (t, e) => {
    const n = new FormData();
    return [...e].forEach((r) => n.append("files[]", r)), Xt("POST", Ya(t), n);
  },
  siteMedia: (t = "", e = "") => {
    const n = new URLSearchParams({ per_page: "200" });
    return t && n.set("path", t), e && n.set("search", e), Xt("GET", `/media?${n}`);
  },
  uploadSiteMedia: (t, e = "") => {
    const n = new FormData();
    return [...t].forEach((r) => n.append("files[]", r)), Xt("POST", `/media${e ? "?path=" + encodeURIComponent(e) : ""}`, n);
  }
};
var Cu = /* @__PURE__ */ A('<iframe title="Page preview" sandbox="allow-same-origin allow-scripts"></iframe>'), Nu = /* @__PURE__ */ A('<div class="hover-box svelte-dfb6jk"><span class="tag svelte-dfb6jk"> </span></div>'), Ou = /* @__PURE__ */ A('<button type="button" class="add-gap svelte-dfb6jk" title="Add block below"><!><span>Add block</span></button>'), zu = /* @__PURE__ */ A('<div class="toolbar svelte-dfb6jk"><span class="name svelte-dfb6jk"> </span> <button type="button" title="Move up (Alt+↑)" class="svelte-dfb6jk"><!></button> <button type="button" title="Move down (Alt+↓)" class="svelte-dfb6jk"><!></button> <button type="button" title="Duplicate (Ctrl+D)" class="svelte-dfb6jk"><!></button> <button type="button" title="Delete (Del)" class="danger svelte-dfb6jk"><!></button></div> <!>', 1), Pu = /* @__PURE__ */ A('<div class="quick-line svelte-dfb6jk"></div> <!>', 1), Ru = /* @__PURE__ */ A('<div class="ghost svelte-dfb6jk"><span class="spinner svelte-dfb6jk"></span> </div>'), Lu = /* @__PURE__ */ A('<div class="drop-line svelte-dfb6jk"><span class="svelte-dfb6jk">Drop to insert here</span></div>'), Du = /* @__PURE__ */ A('<div class="drop-catcher svelte-dfb6jk" role="presentation"></div> <!>', 1), Iu = /* @__PURE__ */ A('<div class="progress svelte-dfb6jk"></div> <div class="busy-pill svelte-dfb6jk" role="status" aria-live="polite"><span class="spinner svelte-dfb6jk"></span> </div>', 1), ju = /* @__PURE__ */ A('<div class="blank svelte-dfb6jk"><!> <strong class="svelte-dfb6jk">Your page is empty</strong> <span>Pick a block or a page layout from the left panel, or drag one here.</span></div>'), Fu = /* @__PURE__ */ A('<div class="error svelte-dfb6jk"> </div>'), qu = /* @__PURE__ */ A('<div class="viewport svelte-dfb6jk"><div><div class="stage svelte-dfb6jk"><!> <div class="overlay svelte-dfb6jk"><!> <!> <!> <!> <!></div> <!> <!> <!></div></div></div>');
function Uu(t, e) {
  Ze(e, !0);
  let n = je(e, "store", 7), r = je(e, "width", 3, null), a = tt([
    { src: "about:blank", key: 0 },
    { src: "about:blank", key: 1 }
  ]), i = /* @__PURE__ */ F(
    0
    // index of the visible frame
  ), l = [], o = /* @__PURE__ */ F(!0), c = /* @__PURE__ */ F(""), d = /* @__PURE__ */ F(tt([])), f = /* @__PURE__ */ F(-1), x = 0, v = /* @__PURE__ */ F(
    -1
    // insertion index while dragging a block from the inserter
  ), p = /* @__PURE__ */ F(void 0), _ = 0, k = 0, h = "", E = /* @__PURE__ */ F(
    null
    // {index, top} while the canvas block picker is open
  ), D = /* @__PURE__ */ F(600), z = !1;
  const K = /* @__PURE__ */ le(() => s(o) || !!n().busy);
  function P() {
    m(o, !1), n().busy = "", n().pendingInsert = null;
  }
  function S() {
    h = "", w(0);
  }
  function w(N = 450) {
    clearTimeout(_), _ = setTimeout(y, N);
  }
  async function y() {
    if (!n().canPreview) return;
    const N = n().snapshot(), j = JSON.stringify(N);
    if (j === h) {
      s(o) || P();
      return;
    }
    h = j;
    const q = ++k;
    m(o, !0), m(c, "");
    try {
      const U = await tn.preview(n().context, N, n().fieldName);
      if (q !== k) return;
      const ce = s(i) === 0 ? 1 : 0;
      a[ce] = { src: U.url + "&_t=" + q, key: a[ce].key };
    } catch (U) {
      q === k && (m(c, U.message, !0), P());
    }
  }
  rn(() => {
    JSON.stringify(n().blocks), n().catalog && w();
  });
  let T = -1;
  rn(() => {
    var q, U;
    const N = n().selected, j = N !== T;
    if (T = N, s(K)) {
      j && (z = !0);
      return;
    }
    (U = (q = l[s(i)]) == null ? void 0 : q.contentWindow) == null || U.postMessage(
      {
        source: "maw-builder",
        type: "select",
        index: N,
        scroll: j
      },
      location.origin
    );
  }), Zr(() => {
    const N = (j) => {
      var ce;
      if (j.origin !== location.origin || ((ce = j.data) == null ? void 0 : ce.source) !== "maw-preview") return;
      const q = l.findIndex((De) => De && De.contentWindow === j.source);
      if (q < 0) return;
      const U = j.data;
      if (U.type === "ready") {
        q !== s(i) ? (j.source.postMessage({ source: "maw-builder", type: "scrollTo", y: x }, location.origin), j.source.postMessage(
          {
            source: "maw-builder",
            type: "select",
            index: n().selected,
            scroll: z,
            behavior: "smooth"
          },
          location.origin
        ), z = !1, requestAnimationFrame(() => {
          m(i, q, !0), P();
        })) : P(), m(d, U.rects || [], !0), U.palette && U.palette.none && (n().palette = U.palette);
        return;
      }
      q === s(i) && (U.type === "rects" ? (m(d, U.rects, !0), x = U.scrollY || 0) : U.type === "hover" ? m(f, U.index, !0) : U.type === "select" && (n().selected = U.index));
    };
    return window.addEventListener("message", N), w(0), () => {
      window.removeEventListener("message", N), clearTimeout(_);
    };
  });
  const C = /* @__PURE__ */ le(() => s(K) ? null : s(d).find((N) => N.index === n().selected)), H = /* @__PURE__ */ le(() => s(C) ? Math.min(s(C).top + s(C).height, s(D) - 24) : 0), V = /* @__PURE__ */ le(() => s(f) !== n().selected ? s(d).find((N) => N.index === s(f)) : null);
  function fe(N) {
    const j = s(p).getBoundingClientRect(), q = N - j.top;
    if (!s(d).length) return n().blocks.length;
    let U = n().blocks.length, ce = 1 / 0;
    const De = [...s(d)].sort((Fe, xt) => Fe.top - xt.top);
    return De.forEach((Fe, xt) => {
      var ie;
      const gt = Math.abs(q - Fe.top);
      gt < ce && (ce = gt, U = Fe.index);
      const O = Math.abs(q - (Fe.top + Fe.height));
      O < ce && (ce = O, U = ((ie = De[xt + 1]) == null ? void 0 : ie.index) ?? Fe.index + 1);
    }), U;
  }
  function pe(N) {
    const j = s(d).find((U) => U.index === N);
    if (j) return j.top;
    const q = s(d).reduce((U, ce) => ce.index > ((U == null ? void 0 : U.index) ?? -1) ? ce : U, null);
    return q ? q.top + q.height : 0;
  }
  const _e = /* @__PURE__ */ le(() => !!n().dragType);
  function te(N) {
    N.preventDefault(), N.dataTransfer.dropEffect = "copy", m(v, fe(N.clientY), !0);
  }
  function Ce(N) {
    N.preventDefault();
    const j = n().dragType || N.dataTransfer.getData("application/x-maw-block") || N.dataTransfer.getData("text/plain"), q = s(v) >= 0 ? s(v) : fe(N.clientY);
    n().dragType = "", m(v, -1), j && n().defFor(j) && n().insert(j, q);
  }
  rn(() => {
    n().dragType || m(v, -1);
  });
  const Ee = (N) => {
    var j, q, U;
    return ((q = n().defFor((j = n().blocks[N]) == null ? void 0 : j.type)) == null ? void 0 : q.title) || ((U = n().blocks[N]) == null ? void 0 : U.type) || "";
  };
  var we = { refresh: S }, Ne = qu(), Z = b(Ne);
  let Y, Q;
  var se = b(Z), ae = b(se);
  Re(ae, 19, () => a, (N) => N.key, (N, j, q) => {
    var U = Cu();
    let ce;
    bn(U, (De, Fe) => l[Fe] = De, (De) => l == null ? void 0 : l[De], () => [s(q)]), L(() => {
      he(U, "src", s(j).src), ce = ye(U, 1, "svelte-dfb6jk", null, ce, {
        hidden: s(q) !== s(i),
        stale: s(q) === s(i) && s(K)
      });
    }), M(N, U);
  });
  var re = g(ae, 2), ke = b(re);
  {
    var ne = (N) => {
      var j = Nu();
      let q;
      var U = b(j), ce = ee(U, !0);
      L(
        (De) => {
          q = At(j, "", q, {
            top: `${s(V).top ?? ""}px`,
            height: `${s(V).height ?? ""}px`
          }), G(ce, De);
        },
        [() => Ee(s(V).index)]
      ), M(N, j);
    };
    W(ke, (N) => {
      s(V) && !s(_e) && N(ne);
    });
  }
  var xe = g(ke, 2);
  {
    var Oe = (N) => {
      var j = zu(), q = Te(j);
      let U;
      var ce = b(q), De = ee(ce, !0), Fe = g(ce, 2), xt = b(Fe);
      $(xt, { name: "up", size: 14 });
      var gt = g(Fe, 2), O = b(gt);
      $(O, { name: "down", size: 14 });
      var ie = g(gt, 2), ue = b(ie);
      $(ue, { name: "copy", size: 14 });
      var Ue = g(ie, 2), ut = b(Ue);
      $(ut, { name: "trash", size: 14 });
      var st = g(q, 2);
      {
        var $e = (et) => {
          var ct = Ou();
          let or;
          var Ts = b(ct);
          $(Ts, { name: "plus", size: 16 }), L(() => or = At(ct, "", or, { top: `${s(H) ?? ""}px` })), R("click", ct, () => m(E, { index: n().selected + 1, top: s(H) + 18 }, !0)), M(et, ct);
        };
        W(st, (et) => {
          s(E) || et($e);
        });
      }
      L(
        (et, ct) => {
          U = At(q, "", U, { top: et }), G(De, ct), Fe.disabled = n().selected === 0, gt.disabled = n().selected === n().blocks.length - 1;
        },
        [
          () => `${Math.max(6, s(C).top + 6)}px`,
          () => Ee(n().selected)
        ]
      ), R("click", Fe, () => n().move(n().selected, n().selected - 1)), R("click", gt, () => n().move(n().selected, n().selected + 1)), R("click", ie, () => n().duplicate(n().selected)), R("click", Ue, () => n().remove(n().selected)), M(N, j);
    };
    W(xe, (N) => {
      s(C) && !s(_e) && N(Oe);
    });
  }
  var oe = g(xe, 2);
  {
    var ve = (N) => {
      var j = Pu(), q = Te(j);
      let U;
      var ce = g(q, 2);
      {
        let De = /* @__PURE__ */ le(() => Math.min(s(E).top, s(D) - 380));
        Su(ce, {
          get store() {
            return n();
          },
          get index() {
            return s(E).index;
          },
          get top() {
            return s(De);
          },
          onclose: () => m(E, null)
        });
      }
      L(() => U = At(q, "", U, { top: `${s(E).top - 18}px` })), M(N, j);
    };
    W(oe, (N) => {
      s(E) && N(ve);
    });
  }
  var be = g(oe, 2);
  {
    var Pe = (N) => {
      var j = Ru();
      let q;
      var U = g(b(j));
      L(
        (ce) => {
          q = At(j, "", q, { top: ce }), G(U, ` Adding ${n().pendingInsert.title ?? ""}…`);
        },
        [() => `${pe(n().pendingInsert.index) ?? ""}px`]
      ), M(N, j);
    };
    W(be, (N) => {
      n().pendingInsert && s(K) && N(Pe);
    });
  }
  var Se = g(be, 2);
  {
    var Ge = (N) => {
      var j = Du(), q = Te(j), U = g(q, 2);
      {
        var ce = (De) => {
          var Fe = Lu();
          let xt;
          L((gt) => xt = At(Fe, "", xt, { top: gt }), [() => `${pe(s(v)) ?? ""}px`]), M(De, Fe);
        };
        W(U, (De) => {
          s(v) >= 0 && De(ce);
        });
      }
      Ie("dragover", q, te), Ie("drop", q, Ce), Ie("dragleave", q, () => m(v, -1)), M(N, j);
    };
    W(Se, (N) => {
      s(_e) && N(Ge);
    });
  }
  var wt = g(re, 2);
  {
    var ze = (N) => {
      var j = Iu(), q = g(Te(j), 2), U = g(b(q), 1, !0);
      L(() => G(U, n().busy || "Updating preview…")), M(N, j);
    };
    W(wt, (N) => {
      s(K) && N(ze);
    });
  }
  var me = g(wt, 2);
  {
    var Je = (N) => {
      var j = ju(), q = b(j);
      $(q, { name: "sparkles", size: 28 }), M(N, j);
    };
    W(me, (N) => {
      !n().blocks.length && !s(o) && N(Je);
    });
  }
  var We = g(me, 2);
  {
    var Me = (N) => {
      var j = Fu(), q = ee(j);
      L(() => G(q, `Preview failed: ${s(c) ?? ""}`)), M(N, j);
    };
    W(We, (N) => {
      s(c) && N(Me);
    });
  }
  return bn(se, (N) => m(p, N), () => s(p)), L(() => {
    Y = ye(Z, 1, "device svelte-dfb6jk", null, Y, { framed: !!r() }), Q = At(Z, "", Q, { width: r() ? r() + "px" : "100%" });
  }), Yo(se, "clientHeight", (N) => m(D, N)), M(t, Ne), Qe(we);
}
rt(["click"]);
var Hu = /* @__PURE__ */ A('<div class="inner svelte-hzx6i5"></div>'), Bu = /* @__PURE__ */ A('<div role="listitem"><div class="bar svelte-hzx6i5"><span class="grip svelte-hzx6i5" draggable="true" role="button" tabindex="-1" aria-label="Drag to reorder"><!></span> <button type="button" class="title svelte-hzx6i5"><span><!></span> <span class="t svelte-hzx6i5"> </span></button> <button type="button" class="mb-btn ghost icon sm" title="Duplicate"><!></button> <button type="button" class="mb-btn ghost icon sm danger" title="Remove"><!></button></div> <!></div>'), Vu = /* @__PURE__ */ A('<div class="list svelte-hzx6i5"><div class="head svelte-hzx6i5"><span class="mb-label"> <span class="count svelte-hzx6i5"> </span></span></div> <!> <button type="button" class="mb-btn add svelte-hzx6i5"><!> </button></div>');
function Gu(t, e) {
  Ze(e, !0);
  let n = je(e, "target", 7);
  const r = /* @__PURE__ */ le(() => Array.isArray(n()[e.field.name]) ? n()[e.field.name] : []);
  let a = /* @__PURE__ */ F(-1), i = /* @__PURE__ */ F(-1), l = /* @__PURE__ */ F(-1);
  function o() {
    return Array.isArray(n()[e.field.name]) || (n()[e.field.name] = []), n()[e.field.name];
  }
  function c() {
    e.store.mutate(() => {
      const S = {};
      for (const w of e.field.fields || []) {
        const y = Ea(w);
        y !== void 0 && y !== "" && (S[w.name] = y);
      }
      o().push(S);
    }), m(a, s(r).length - 1);
  }
  function d(S) {
    e.store.mutate(() => o().splice(S, 1)), s(a) === S && m(a, -1);
  }
  function f(S) {
    e.store.mutate(() => o().splice(S + 1, 0, JSON.parse(JSON.stringify(fr(s(r)[S]))))), m(a, S + 1);
  }
  function x(S, w) {
    w < 0 || w >= s(r).length || S === w || (e.store.mutate(() => {
      const y = o(), [T] = y.splice(S, 1);
      y.splice(w, 0, T);
    }), m(a, w, !0));
  }
  var v = Vu(), p = b(v), _ = b(p), k = b(_), h = g(k), E = ee(h, !0), D = g(p, 2);
  Re(D, 17, () => s(r), ht, (S, w, y) => {
    var T = Bu();
    let C;
    var H = b(T), V = b(H), fe = b(V);
    $(fe, { name: "grip", size: 13 });
    var pe = g(V, 2), _e = b(pe);
    let te;
    var Ce = b(_e);
    $(Ce, { name: "chevron", size: 12 });
    var Ee = g(_e, 2), we = ee(Ee, !0), Ne = g(pe, 2), Z = b(Ne);
    $(Z, { name: "copy", size: 12 });
    var Y = g(Ne, 2), Q = b(Y);
    $(Q, { name: "trash", size: 12 });
    var se = g(H, 2);
    {
      var ae = (re) => {
        var ke = Hu();
        Re(ke, 21, () => e.field.fields || [], (ne) => ne.name, (ne, xe) => {
          bs(ne, {
            get field() {
              return s(xe);
            },
            get target() {
              return s(w);
            },
            get store() {
              return e.store;
            },
            compact: !0
          });
        }), M(re, ke);
      };
      W(se, (re) => {
        s(a) === y && re(ae);
      });
    }
    L(
      (re) => {
        C = ye(T, 1, "item svelte-hzx6i5", null, C, { open: s(a) === y, over: s(l) === y }), te = ye(_e, 1, "chev svelte-hzx6i5", null, te, { rot: s(a) === y }), G(we, re);
      },
      [() => Xo(s(w), e.field.fields, y)]
    ), Ie("dragover", T, (re) => {
      s(i) >= 0 && (re.preventDefault(), m(l, y, !0));
    }), Ie("drop", T, () => {
      x(s(i), y), m(i, m(l, -1), !0);
    }), Ie("dragstart", V, (re) => {
      m(i, y, !0), re.dataTransfer.effectAllowed = "move";
    }), Ie("dragend", V, () => m(i, m(l, -1), !0)), R("click", pe, () => m(a, s(a) === y ? -1 : y, !0)), R("click", Ne, () => f(y)), R("click", Y, () => d(y)), M(S, T);
  });
  var z = g(D, 2), K = b(z);
  $(K, { name: "plus", size: 13 });
  var P = g(K);
  L(() => {
    G(k, `${(e.field.label || e.field.name) ?? ""} `), G(E, s(r).length), G(P, ` ${(e.field.btnLabel || "Add item") ?? ""}`);
  }), R("click", z, c), M(t, v), Qe();
}
rt(["click"]);
var Ku = /* @__PURE__ */ A('<footer class="svelte-1kwbck4"><!></footer>'), Yu = /* @__PURE__ */ A('<div class="backdrop svelte-1kwbck4" role="presentation"><div role="dialog" aria-modal="true"><header class="svelte-1kwbck4"><h2 class="svelte-1kwbck4"> </h2> <button type="button" class="mb-btn ghost icon sm" aria-label="Close"><!></button></header> <div class="content mb-scroll svelte-1kwbck4"><!></div> <!></div></div>');
function sa(t, e) {
  Ze(e, !0);
  let n = je(e, "title", 3, ""), r = je(e, "wide", 3, !1);
  var a = Yu(), i = b(a);
  let l;
  var o = b(i), c = b(o), d = ee(c, !0), f = g(c, 2), x = b(f);
  $(x, { name: "x", size: 14 });
  var v = g(o, 2), p = b(v);
  Fa(p, () => e.children ?? ri);
  var _ = g(v, 2);
  {
    var k = (h) => {
      var E = Ku(), D = b(E);
      Fa(D, () => e.actions), M(h, E);
    };
    W(_, (h) => {
      e.actions && h(k);
    });
  }
  L(() => {
    l = ye(i, 1, "dialog svelte-1kwbck4", null, l, { wide: r() }), he(i, "aria-label", n()), G(d, n());
  }), R("click", a, (h) => {
    var E;
    return h.target === h.currentTarget && ((E = e.onclose) == null ? void 0 : E.call(e));
  }), R("click", f, () => {
    var h;
    return (h = e.onclose) == null ? void 0 : h.call(e);
  }), M(t, a), Qe();
}
rt(["click"]);
var Ju = /* @__PURE__ */ A('<input class="mb-input search svelte-hd7o5x" placeholder="Filter by name"/> <input type="file" accept="image/*" multiple="" hidden=""/> <button type="button" class="mb-btn primary"><!> </button>', 1), Wu = /* @__PURE__ */ A('<p class="error svelte-hd7o5x"> </p>'), Xu = /* @__PURE__ */ A('<img class="url-preview svelte-hd7o5x" alt=""/>'), Zu = /* @__PURE__ */ A('<div class="url svelte-hd7o5x"><label class="mb-label" for="mb-media-url">Image URL</label> <input id="mb-media-url" class="mb-input" placeholder="https://…"/> <!> <button type="button" class="mb-btn primary">Use this URL</button></div>'), Qu = /* @__PURE__ */ A('<span>/</span> <button type="button" class="link svelte-hd7o5x"> </button>', 1), $u = /* @__PURE__ */ A('<div class="crumbs svelte-hd7o5x"><button type="button" class="link svelte-hd7o5x">user/media</button> <!></div>'), ec = /* @__PURE__ */ A('<button type="button" class="tile folder svelte-hd7o5x"><!><span class="svelte-hd7o5x"> </span></button>'), tc = /* @__PURE__ */ A('<button type="button"><img alt="" loading="lazy" class="svelte-hd7o5x"/> <span class="svelte-hd7o5x"> </span></button>'), nc = /* @__PURE__ */ A('<div class="empty svelte-hd7o5x"><!> <strong class="svelte-hd7o5x"> </strong> <span>Drop image files here, or click Upload.</span></div>'), rc = /* @__PURE__ */ A('<p class="muted svelte-hd7o5x">Loading…</p>'), sc = /* @__PURE__ */ A('<!> <div class="grid mb-scroll svelte-hd7o5x"><!> <!></div> <!>', 1), ac = /* @__PURE__ */ A('<div role="presentation"><div class="bar svelte-hd7o5x"><div class="seg svelte-hd7o5x"><button type="button"> </button> <button type="button">Site library</button> <button type="button">From URL</button></div> <!></div> <!> <!></div>');
function ic(t, e) {
  Ze(e, !0);
  let n = je(e, "current", 3, ""), r = /* @__PURE__ */ F(tt(n() && String(n()).startsWith("user://media") ? "site" : "page")), a = /* @__PURE__ */ F(tt([])), i = /* @__PURE__ */ F(tt([])), l = /* @__PURE__ */ F(tt([])), o = /* @__PURE__ */ F(""), c = /* @__PURE__ */ F(!1), d = /* @__PURE__ */ F(!1), f = /* @__PURE__ */ F(""), x = /* @__PURE__ */ F(tt(/^https?:\/\//.test(n()) ? n() : "")), v = /* @__PURE__ */ F(""), p = /* @__PURE__ */ F(!1), _ = /* @__PURE__ */ F(void 0);
  const k = (y) => String(y.type || y.mime || "").startsWith("image/") || /\.(jpe?g|png|gif|webp|avif|svg)$/i.test(y.filename || "");
  async function h() {
    m(c, !0), m(f, "");
    try {
      m(a, (await e.store.loadOwnMedia()).filter(k), !0);
    } catch (y) {
      m(f, y.message, !0);
    }
    m(c, !1);
  }
  async function E() {
    m(c, !0), m(f, "");
    try {
      const y = await tn.siteMedia(s(o)), T = Array.isArray(y) ? y : (y == null ? void 0 : y.files) || (y == null ? void 0 : y.items) || [];
      m(i, T.filter(k), !0), m(l, (y == null ? void 0 : y.folders) || [], !0);
    } catch (y) {
      m(f, y.message, !0);
    }
    m(c, !1);
  }
  Zr(() => {
    s(r) === "site" ? E() : h();
  });
  function D(y) {
    m(r, y, !0), y === "page" && !s(a).length && h(), y === "site" && E();
  }
  async function z(y) {
    if (y != null && y.length) {
      m(d, !0), m(f, "");
      try {
        s(r) === "site" ? (await tn.uploadSiteMedia(y, s(o)), await E()) : (await tn.uploadOwnMedia(e.store.context, y), await h()), e.store.flash(`${y.length} file${y.length > 1 ? "s" : ""} uploaded`);
      } catch (T) {
        m(f, T.message, !0);
      }
      m(d, !1);
    }
  }
  function K(y) {
    return "user://media/" + (y.path ? y.path.replace(/^\/|\/$/g, "") + "/" : s(o) ? s(o) + "/" : "") + y.filename;
  }
  const P = /* @__PURE__ */ le(() => {
    const y = s(r) === "site" ? s(i) : s(a), T = s(v).trim().toLowerCase();
    return T ? y.filter((C) => C.filename.toLowerCase().includes(T)) : y;
  });
  function S(y) {
    return typeof y == "string" ? y : y.name || y.path;
  }
  function w(y) {
    const T = typeof y == "string" ? y : y.path || y.name;
    m(o, T.includes("/") || !s(o) ? T : s(o) + "/" + T, !0), E();
  }
  sa(t, {
    title: "Media library",
    wide: !0,
    get onclose() {
      return e.onclose;
    },
    children: (y, T) => {
      var C = ac();
      let H;
      var V = b(C), fe = b(V), pe = b(fe);
      let _e;
      var te = ee(pe, !0), Ce = g(pe, 2);
      let Ee;
      var we = g(Ce, 2);
      let Ne;
      var Z = g(fe, 2);
      {
        var Y = (ne) => {
          var xe = Ju(), Oe = Te(xe), oe = g(Oe, 2);
          bn(oe, (Se) => m(_, Se), () => s(_));
          var ve = g(oe, 2), be = b(ve);
          $(be, { name: "upload", size: 14 });
          var Pe = g(be);
          L(() => {
            ve.disabled = s(d), G(Pe, ` ${s(d) ? "Uploading…" : "Upload"}`);
          }), gn(Oe, () => s(v), (Se) => m(v, Se)), R("change", oe, (Se) => z(Se.currentTarget.files)), R("click", ve, () => s(_).click()), M(ne, xe);
        };
        W(Z, (ne) => {
          s(r) !== "url" && ne(Y);
        });
      }
      var Q = g(V, 2);
      {
        var se = (ne) => {
          var xe = Wu(), Oe = ee(xe, !0);
          L(() => G(Oe, s(f))), M(ne, xe);
        };
        W(Q, (ne) => {
          s(f) && ne(se);
        });
      }
      var ae = g(Q, 2);
      {
        var re = (ne) => {
          var xe = Zu(), Oe = g(b(xe), 2), oe = g(Oe, 2);
          {
            var ve = (Se) => {
              var Ge = Xu();
              L(() => he(Ge, "src", s(x))), M(Se, Ge);
            }, be = /* @__PURE__ */ le(() => /^https?:\/\//.test(s(x)));
            W(oe, (Se) => {
              s(be) && Se(ve);
            });
          }
          var Pe = g(oe, 2);
          L((Se) => Pe.disabled = Se, [() => !/^https?:\/\//.test(s(x))]), gn(Oe, () => s(x), (Se) => m(x, Se)), R("click", Pe, () => e.onselect(s(x))), M(ne, xe);
        }, ke = (ne) => {
          var xe = sc(), Oe = Te(xe);
          {
            var oe = (ze) => {
              var me = $u(), Je = b(me), We = g(Je, 2);
              Re(We, 17, () => s(o).split("/").filter(Boolean), ht, (Me, N, j) => {
                var q = Qu(), U = g(Te(q), 2), ce = ee(U, !0);
                L(() => G(ce, s(N))), R("click", U, () => {
                  m(o, s(o).split("/").slice(0, j + 1).join("/"), !0), E();
                }), M(Me, q);
              }), R("click", Je, () => {
                m(o, ""), E();
              }), M(ze, me);
            };
            W(Oe, (ze) => {
              s(r) === "site" && ze(oe);
            });
          }
          var ve = g(Oe, 2), be = b(ve);
          {
            var Pe = (ze) => {
              var me = sn(), Je = Te(me);
              Re(Je, 17, () => s(l), ht, (We, Me) => {
                var N = ec(), j = b(N);
                $(j, { name: "layers", size: 22 });
                var q = g(j), U = ee(q, !0);
                L((ce) => G(U, ce), [() => S(s(Me))]), R("click", N, () => w(s(Me))), M(We, N);
              }), M(ze, me);
            };
            W(be, (ze) => {
              s(r) === "site" && ze(Pe);
            });
          }
          var Se = g(be, 2);
          Re(
            Se,
            17,
            () => s(P),
            (ze) => ze.filename + (ze.path || ""),
            (ze, me) => {
              const Je = /* @__PURE__ */ le(() => s(r) === "site" ? K(s(me)) : s(me).filename);
              var We = tc();
              let Me;
              var N = b(We), j = g(N, 2), q = ee(j, !0);
              L(() => {
                Me = ye(We, 1, "tile svelte-hd7o5x", null, Me, { active: s(Je) === n() }), he(We, "title", s(me).filename), he(N, "src", s(me).url), G(q, s(me).filename);
              }), R("click", We, () => e.onselect(s(Je))), M(ze, We);
            },
            (ze) => {
              var me = sn(), Je = Te(me);
              {
                var We = (Me) => {
                  var N = nc(), j = b(N);
                  $(j, { name: "upload", size: 26 });
                  var q = g(j, 2), U = ee(q);
                  L(() => G(U, `No images ${s(r) === "page" ? e.store.isFlex ? "on this item" : "on this page" : "here"} yet`)), M(Me, N);
                };
                W(Je, (Me) => {
                  s(c) || Me(We);
                });
              }
              M(ze, me);
            }
          );
          var Ge = g(ve, 2);
          {
            var wt = (ze) => {
              var me = rc();
              M(ze, me);
            };
            W(Ge, (ze) => {
              s(c) && ze(wt);
            });
          }
          M(ne, xe);
        };
        W(ae, (ne) => {
          s(r) === "url" ? ne(re) : ne(ke, -1);
        });
      }
      L(() => {
        H = ye(C, 1, "lib svelte-hd7o5x", null, H, { drag: s(p) }), _e = ye(pe, 1, "svelte-hd7o5x", null, _e, { active: s(r) === "page" }), G(te, e.store.isFlex ? "This item" : "This page"), Ee = ye(Ce, 1, "svelte-hd7o5x", null, Ee, { active: s(r) === "site" }), Ne = ye(we, 1, "svelte-hd7o5x", null, Ne, { active: s(r) === "url" });
      }), Ie("dragover", C, (ne) => {
        var xe, Oe;
        (Oe = (xe = ne.dataTransfer) == null ? void 0 : xe.types) != null && Oe.includes("Files") && (ne.preventDefault(), m(p, !0));
      }), Ie("dragleave", C, () => m(p, !1)), Ie("drop", C, (ne) => {
        ne.preventDefault(), m(p, !1), z(ne.dataTransfer.files);
      }), R("click", pe, () => D("page")), R("click", Ce, () => D("site")), R("click", we, () => m(r, "url")), M(y, C);
    },
    $$slots: { default: !0 }
  }), Qe();
}
rt(["click", "change"]);
var lc = /* @__PURE__ */ A('<img alt="" class="svelte-x4wd27"/>'), oc = /* @__PURE__ */ A('<button type="button" class="mb-btn sm ghost danger">Remove</button>'), uc = /* @__PURE__ */ A('<div class="media svelte-x4wd27"><button type="button" class="thumb svelte-x4wd27" title="Choose image"><!></button> <div class="side svelte-x4wd27"><div class="name svelte-x4wd27"> </div> <div class="btns svelte-x4wd27"><button type="button" class="mb-btn sm"><!> </button> <!></div></div></div> <!>', 1);
function cc(t, e) {
  Ze(e, !0);
  let n = je(e, "value", 3, ""), r = /* @__PURE__ */ F(!1), a = /* @__PURE__ */ F(!1);
  const i = /* @__PURE__ */ le(() => {
    var y;
    const w = String(n() || "");
    return w ? /^(https?:)?\/\//.test(w) || w.startsWith("/") ? w : w.startsWith("user://") ? "/" + w.replace("user://", "user/") : w.startsWith("theme://") ? `/user/themes/${((y = e.store.catalog) == null ? void 0 : y.theme) || ""}/${w.replace("theme://", "")}` : e.store.pageMediaUrl(w) : "";
  });
  rn(() => {
    s(i), m(a, !1);
  });
  var l = uc(), o = Te(l), c = b(o), d = b(c);
  {
    var f = (w) => {
      var y = lc();
      L(() => he(y, "src", s(i))), Ie("error", y, () => m(a, !0)), M(w, y);
    }, x = (w) => {
      $(w, { name: "image", size: 22 });
    };
    W(d, (w) => {
      s(i) && !s(a) ? w(f) : w(x, -1);
    });
  }
  var v = g(c, 2), p = b(v), _ = ee(p, !0), k = g(p, 2), h = b(k), E = b(h);
  $(E, { name: "image", size: 13 });
  var D = g(E), z = g(h, 2);
  {
    var K = (w) => {
      var y = oc();
      R("click", y, () => e.onchange("")), M(w, y);
    };
    W(z, (w) => {
      n() && w(K);
    });
  }
  var P = g(o, 2);
  {
    var S = (w) => {
      ic(w, {
        get store() {
          return e.store;
        },
        get current() {
          return n();
        },
        onselect: (y) => {
          e.onchange(y), m(r, !1);
        },
        onclose: () => m(r, !1)
      });
    };
    W(P, (w) => {
      s(r) && w(S);
    });
  }
  L(() => {
    he(p, "title", n()), G(_, n() || "No image"), G(D, ` ${n() ? "Replace" : "Choose"}`);
  }), R("click", c, () => m(r, !0)), R("click", h, () => m(r, !0)), M(t, l), Qe();
}
rt(["click"]);
var fc = /* @__PURE__ */ A("<i></i>"), vc = /* @__PURE__ */ A('<button type="button" class="mb-btn ghost icon sm" title="Clear"><!></button>'), dc = /* @__PURE__ */ A('<button type="button"><i></i></button>'), hc = /* @__PURE__ */ A('<div class="pop svelte-168bgjg"><input class="mb-input" placeholder="Search icons"/> <div class="grid mb-scroll svelte-168bgjg"></div></div>'), pc = /* @__PURE__ */ A('<div class="icon-control"><div class="row svelte-168bgjg"><button type="button" class="current svelte-168bgjg" title="Choose icon"><!></button> <input class="mb-input" placeholder="fa-bolt"/> <!></div> <!></div>');
function _c(t, e) {
  Ze(e, !0);
  let n = je(e, "value", 3, ""), r = /* @__PURE__ */ F(!1), a = /* @__PURE__ */ F(""), i = /* @__PURE__ */ F(void 0);
  const l = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css", o = "bolt rocket star heart check circle-check shield-halved lock key user users user-tie handshake briefcase building chart-line chart-simple chart-pie bullseye trophy medal award gem crown lightbulb brain robot microchip code terminal laptop mobile-screen desktop server cloud database wifi globe earth-americas map-location-dot location-dot compass envelope phone comments comment-dots headset bell calendar clock hourglass stopwatch cart-shopping bag-shopping credit-card money-bill wallet tags tag receipt truck box gift percent palette paintbrush pen-nib wand-magic-sparkles image images camera video film music microphone book book-open graduation-cap school newspaper file file-lines folder clipboard-list list-check gear gears wrench screwdriver-wrench hammer toolbox sliders filter magnifying-glass leaf seedling tree mountain sun moon cloud-sun water fire snowflake recycle house hotel utensils mug-hot pizza-slice burger wine-glass dumbbell heart-pulse stethoscope hospital paw plane car bicycle ship anchor route road thumbs-up face-smile hand-holding-heart people-group universal-access infinity arrows-rotate arrow-right link share-nodes".split(" ").map((S) => "fa-" + S), c = "github facebook instagram x-twitter linkedin youtube tiktok whatsapp pinterest discord slack wordpress google apple".split(" ").map((S) => "fa-brands fa-" + S), d = /* @__PURE__ */ le(() => {
    const S = s(a).trim().toLowerCase().replace(/^fa-/, "");
    return [...o, ...c].filter((w) => !S || w.includes(S));
  }), f = (S) => {
    const w = String(S || "").trim();
    return w ? /\bfa-(brands|solid|regular)\b|\bfa[brs]\b/.test(w) ? w : "fa-solid " + (w.startsWith("fa-") ? w : "fa-" + w) : "";
  };
  Zr(() => {
    if (!document.head.querySelector("link[data-maw-fa]")) {
      const w = document.createElement("link");
      w.rel = "stylesheet", w.href = l, w.dataset.mawFa = "1", document.head.appendChild(w);
    }
    const S = s(i).getRootNode();
    if (S instanceof ShadowRoot && !S.querySelector("link[data-fa]")) {
      const w = document.createElement("link");
      w.rel = "stylesheet", w.href = l, w.dataset.fa = "1", S.prepend(w);
    }
  });
  var x = pc(), v = b(x), p = b(v), _ = b(p);
  {
    var k = (S) => {
      var w = fc();
      L((y) => ye(w, 1, y, "svelte-168bgjg"), [() => qa(f(n()))]), M(S, w);
    }, h = (S) => {
      $(S, { name: "plus", size: 14 });
    };
    W(_, (S) => {
      n() ? S(k) : S(h, -1);
    });
  }
  var E = g(p, 2), D = g(E, 2);
  {
    var z = (S) => {
      var w = vc(), y = b(w);
      $(y, { name: "x", size: 12 }), R("click", w, () => e.onchange("")), M(S, w);
    };
    W(D, (S) => {
      n() && S(z);
    });
  }
  var K = g(v, 2);
  {
    var P = (S) => {
      var w = hc(), y = b(w), T = g(y, 2);
      Re(T, 20, () => s(d), (C) => C, (C, H) => {
        var V = dc();
        let fe;
        var pe = ee(V);
        L(
          (_e, te) => {
            he(V, "title", _e), fe = ye(V, 1, "svelte-168bgjg", null, fe, { active: n() === H }), ye(pe, 1, te, "svelte-168bgjg");
          },
          [
            () => H.replace("fa-brands ", ""),
            () => qa(f(H))
          ]
        ), R("click", V, () => {
          e.onchange(H), m(r, !1);
        }), M(C, V);
      }), gn(y, () => s(a), (C) => m(a, C)), M(S, w);
    };
    W(K, (S) => {
      s(r) && S(P);
    });
  }
  bn(x, (S) => m(i, S), () => s(i)), L(() => {
    he(p, "aria-expanded", s(r)), wn(E, n());
  }), R("click", p, () => m(r, !s(r))), R("input", E, (S) => e.onchange(S.currentTarget.value)), M(t, x), Qe();
}
rt(["click", "input"]);
var gc = /* @__PURE__ */ A('<div class="tools svelte-gx0hvo"><button type="button" title="Bold" class="svelte-gx0hvo"><!></button> <button type="button" title="Italic" class="svelte-gx0hvo"><!></button> <button type="button" title="Link" class="svelte-gx0hvo"><!></button> <button type="button" title="Bulleted list" class="svelte-gx0hvo"><!></button> <span class="hint svelte-gx0hvo">Markdown</span></div>'), bc = /* @__PURE__ */ A('<div><!> <textarea class="mb-input svelte-gx0hvo"></textarea></div>');
function Ja(t, e) {
  Ze(e, !0);
  let n = je(e, "value", 3, ""), r = je(e, "rows", 3, 4), a = je(e, "plain", 3, !1), i = /* @__PURE__ */ F(void 0);
  function l(p, _ = p, k = "text") {
    const h = s(i).selectionStart, E = s(i).selectionEnd, D = n().slice(h, E) || k, z = n().slice(0, h) + p + D + _ + n().slice(E);
    e.onchange(z), requestAnimationFrame(() => {
      s(i).focus(), s(i).setSelectionRange(h + p.length, h + p.length + D.length);
    });
  }
  function o() {
    const p = n().lastIndexOf(`
`, s(i).selectionStart - 1) + 1, _ = n().slice(0, p) + "- " + n().slice(p);
    e.onchange(_);
  }
  var c = bc();
  let d;
  var f = b(c);
  {
    var x = (p) => {
      var _ = gc(), k = b(_), h = b(k);
      $(h, { name: "bold", size: 13 });
      var E = g(k, 2), D = b(E);
      $(D, { name: "italic", size: 13 });
      var z = g(E, 2), K = b(z);
      $(K, { name: "link", size: 13 });
      var P = g(z, 2), S = b(P);
      $(S, { name: "list", size: 13 }), R("click", k, () => l("**")), R("click", E, () => l("_")), R("click", z, () => l("[", "](https://)", "link text")), R("click", P, o), M(p, _);
    };
    W(f, (p) => {
      a() || p(x);
    });
  }
  var v = g(f, 2);
  bn(v, (p) => m(i, p), () => s(i)), L(() => {
    d = ye(c, 1, "md svelte-gx0hvo", null, d, { plain: a() }), he(v, "id", e.id), he(v, "rows", r()), wn(v, n());
  }), R("input", v, (p) => e.onchange(p.currentTarget.value)), M(t, c), Qe();
}
rt(["click", "input"]);
var mc = /* @__PURE__ */ A('<label class="toggle svelte-2ufken"><input type="checkbox" class="svelte-2ufken"/> <span class="track svelte-2ufken"><span class="thumb svelte-2ufken"></span></span> <span class="tl"> </span></label>'), yc = /* @__PURE__ */ A('<button type="button" role="radio"> </button>'), kc = /* @__PURE__ */ A('<div class="seg svelte-2ufken" role="radiogroup"></div>'), wc = /* @__PURE__ */ A("<option> </option>"), xc = /* @__PURE__ */ A('<select class="mb-input"></select>'), Ec = /* @__PURE__ */ A('<input class="mb-input" type="number"/>'), Sc = /* @__PURE__ */ A('<div class="color svelte-2ufken"><input type="color" class="svelte-2ufken"/><input class="mb-input"/></div>'), Mc = /* @__PURE__ */ A('<input class="mb-input" type="text"/>'), Tc = /* @__PURE__ */ A('<textarea class="mb-input mono svelte-2ufken" rows="4"></textarea> <div class="mb-help"> </div>', 1), Ac = /* @__PURE__ */ A('<label class="mb-label"> </label> <!>', 1), Cc = /* @__PURE__ */ A('<div class="mb-help"> </div>'), Nc = /* @__PURE__ */ A("<div><!> <!></div>");
function bs(t, e) {
  Ze(e, !0);
  let n = je(e, "target", 7), r = je(e, "compact", 3, !1);
  const a = "mb-" + Math.random().toString(36).slice(2, 9), i = /* @__PURE__ */ le(() => e.field.label || e.field.title || e.field.name), l = /* @__PURE__ */ le(() => e.field.type || "text"), o = /* @__PURE__ */ le(() => s(l) === "toggle" || e.field.validate === "bool"), c = /* @__PURE__ */ le(() => s(l) === "number" || e.field.validate === "int"), d = /* @__PURE__ */ le(() => n()[e.field.name] ?? Ea(e.field) ?? (s(o) ? !1 : ""));
  function f(P) {
    e.store.beginEdit(), P === "" || P === null || P === void 0 ? delete n()[e.field.name] : n()[e.field.name] = P, e.store.endEdit();
  }
  function x(P) {
    if (P === "") return f(void 0);
    const S = Number(P);
    f(Number.isFinite(S) ? S : P);
  }
  let v = /* @__PURE__ */ F("");
  rn(() => {
    [
      "text",
      "textarea",
      "markdown",
      "select",
      "toggle",
      "number",
      "list",
      "filepicker",
      "media",
      "file",
      "iconpicker",
      "colorpicker",
      "date"
    ].includes(s(l)) || m(v, JSON.stringify(n()[e.field.name] ?? null, null, 2), !0);
  });
  var p = Nc();
  let _;
  var k = b(p);
  {
    var h = (P) => {
      Gu(P, {
        get field() {
          return e.field;
        },
        get target() {
          return n();
        },
        get store() {
          return e.store;
        }
      });
    }, E = (P) => {
      var S = mc(), w = b(S), y = g(w, 4), T = ee(y, !0);
      L(() => {
        Vo(w, s(d) === !0 || s(d) === 1 || s(d) === "1"), G(T, s(i));
      }), R("change", w, (C) => f(!!C.currentTarget.checked)), M(P, S);
    }, D = (P) => {
      var S = Ac(), w = Te(S), y = ee(w, !0), T = g(w, 2);
      {
        var C = (Z) => {
          var Y = kc();
          Re(Y, 21, () => e.field.options, ht, (Q, se) => {
            var ae = yc();
            let re;
            var ke = ee(ae, !0);
            L(
              (ne, xe) => {
                he(ae, "aria-checked", ne), re = ye(ae, 1, "svelte-2ufken", null, re, { active: xe }), G(ke, s(se).label);
              },
              [
                () => String(s(d)) === s(se).value,
                () => String(s(d)) === s(se).value
              ]
            ), R("click", ae, () => f(s(c) ? Number(s(se).value) : s(se).value)), M(Q, ae);
          }), L(() => he(Y, "aria-label", s(i))), M(Z, Y);
        }, H = /* @__PURE__ */ le(() => {
          var Z;
          return s(l) === "select" && ((Z = e.field.options) == null ? void 0 : Z.length) <= 4 && e.field.options.every((Y) => String(Y.label).length < 14);
        }), V = (Z) => {
          var Y = xc();
          Re(Y, 21, () => e.field.options || [], ht, (se, ae) => {
            var re = wc(), ke = ee(re, !0), ne = {};
            L(() => {
              G(ke, s(ae).label), ne !== (ne = s(ae).value) && (re.value = (re.__value = ne) ?? "");
            }), M(se, re);
          });
          var Q;
          _s(Y), L(
            (se) => {
              he(Y, "id", a), Q !== (Q = se) && (Y.value = (Y.__value = Q) ?? "", Ms(Y, Q));
            },
            [() => String(s(d))]
          ), R("change", Y, (se) => f(s(c) ? Number(se.currentTarget.value) : se.currentTarget.value)), M(Z, Y);
        }, fe = (Z) => {
          {
            let Y = /* @__PURE__ */ le(() => s(d) || ""), Q = /* @__PURE__ */ le(() => e.field.rows || 6);
            Ja(Z, {
              get id() {
                return a;
              },
              get value() {
                return s(Y);
              },
              onchange: f,
              get rows() {
                return s(Q);
              }
            });
          }
        }, pe = (Z) => {
          {
            let Y = /* @__PURE__ */ le(() => s(d) || ""), Q = /* @__PURE__ */ le(() => e.field.rows || 3), se = /* @__PURE__ */ le(() => !/markdown/i.test(s(i)));
            Ja(Z, {
              get id() {
                return a;
              },
              get value() {
                return s(Y);
              },
              onchange: f,
              get rows() {
                return s(Q);
              },
              get plain() {
                return s(se);
              }
            });
          }
        }, _e = (Z) => {
          cc(Z, {
            get value() {
              return s(d);
            },
            onchange: f,
            get store() {
              return e.store;
            }
          });
        }, te = (Z) => {
          _c(Z, {
            get value() {
              return s(d);
            },
            onchange: f
          });
        }, Ce = (Z) => {
          var Y = Ec();
          L(() => {
            var Q;
            he(Y, "id", a), wn(Y, s(d)), he(Y, "min", (Q = e.field.validate) == null ? void 0 : Q.min);
          }), R("input", Y, (Q) => x(Q.currentTarget.value)), M(Z, Y);
        }, Ee = (Z) => {
          var Y = Sc(), Q = b(Y), se = g(Q);
          L(() => {
            wn(Q, s(d) || "#000000"), he(se, "id", a), wn(se, s(d));
          }), R("input", Q, (ae) => f(ae.currentTarget.value)), R("input", se, (ae) => f(ae.currentTarget.value)), M(Z, Y);
        }, we = (Z) => {
          var Y = Mc();
          L(() => {
            he(Y, "id", a), wn(Y, s(d)), he(Y, "placeholder", e.field.placeholder || "");
          }), R("input", Y, (Q) => f(Q.currentTarget.value)), M(Z, Y);
        }, Ne = (Z) => {
          var Y = Tc(), Q = Te(Y), se = g(Q, 2), ae = ee(se);
          L(() => {
            he(Q, "id", a), G(ae, `Edited as JSON (field type “${s(l) ?? ""}”).`);
          }), R("change", Q, () => {
            try {
              f(JSON.parse(s(
                v
                /* keep editing */
              )));
            } catch {
            }
          }), gn(Q, () => s(v), (re) => m(v, re)), M(Z, Y);
        };
        W(T, (Z) => {
          s(H) ? Z(C) : s(l) === "select" ? Z(V, 1) : s(l) === "markdown" ? Z(fe, 2) : s(l) === "textarea" ? Z(pe, 3) : s(l) === "filepicker" || s(l) === "media" || s(l) === "file" ? Z(_e, 4) : s(l) === "iconpicker" ? Z(te, 5) : s(c) ? Z(Ce, 6) : s(l) === "colorpicker" ? Z(Ee, 7) : s(l) === "text" || s(l) === "date" ? Z(we, 8) : Z(Ne, -1);
        });
      }
      L(() => {
        he(w, "for", a), G(y, s(i));
      }), M(P, S);
    };
    W(k, (P) => {
      s(l) === "list" ? P(h) : s(o) ? P(E, 1) : P(D, -1);
    });
  }
  var z = g(k, 2);
  {
    var K = (P) => {
      var S = Cc(), w = ee(S, !0);
      L(() => G(w, e.field.help)), M(P, S);
    };
    W(z, (P) => {
      e.field.help && s(l) !== "list" && P(K);
    });
  }
  L(() => _ = ye(p, 1, "field svelte-2ufken", null, _, { compact: r(), inline: s(o) })), M(t, p), Qe();
}
rt(["change", "click", "input"]);
var Oc = /* @__PURE__ */ A('<button type="button"><span class="aa svelte-uthihf">Aa</span></button>'), zc = /* @__PURE__ */ A('<span class="aa svelte-uthihf">Aa</span>'), Pc = /* @__PURE__ */ A('<label title="Custom color"><input type="color" aria-label="Custom background color" class="svelte-uthihf"/> <!></label>'), Rc = /* @__PURE__ */ A('<span class="live svelte-uthihf"> </span>'), Lc = /* @__PURE__ */ A('<button type="button" class="mb-btn sm ghost">Clear</button>'), Dc = /* @__PURE__ */ A('<button type="button" class="dot svelte-uthihf"></button>'), Ic = /* @__PURE__ */ A('<button type="button"> <!></button>'), jc = /* @__PURE__ */ A('<span class="mb-label sub svelte-uthihf">Text color</span> <div class="seg svelte-uthihf"></div>', 1), Fc = /* @__PURE__ */ A('<div class="group custom-row svelte-uthihf"><span class="mb-label">Custom color</span> <div class="hex svelte-uthihf"><span class="chip svelte-uthihf"></span> <input class="mb-input svelte-uthihf" placeholder="#hex e.g. #0f766e" spellcheck="false"/> <!></div> <div class="suggest svelte-uthihf"></div> <!></div>'), qc = /* @__PURE__ */ A('<div class="group svelte-uthihf"><span class="mb-label">Background</span> <div class="swatches svelte-uthihf"><!> <!></div> <div class="mb-help"><!> <!></div></div> <!>', 1), Uc = /* @__PURE__ */ A('<button type="button"> </button>'), Hc = /* @__PURE__ */ A('<div class="group svelte-uthihf"><span class="mb-label"> </span> <div class="seg svelte-uthihf"></div></div>'), Bc = /* @__PURE__ */ A("<!> <!> <!>", 1);
function Wa(t, e) {
  Ze(e, !0);
  let n = je(e, "block", 7), r = je(e, "settings", 19, () => []), a = je(e, "mode", 3, "style");
  const i = [
    "background",
    "bg_color",
    "text_color",
    "spacing",
    "width",
    "align",
    "reveal"
  ], l = {
    none: "#ffffff",
    alt: "#f6f7f9",
    soft: "#e7edfd",
    accent: "#2563eb",
    dark: "#0b1120"
  }, o = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i, c = /* @__PURE__ */ le(() => Object.fromEntries(r().map((T) => [T.name, T]))), d = /* @__PURE__ */ le(() => r().filter((T) => !i.includes(T.name))), f = /* @__PURE__ */ le(() => typeof n().bg_color == "string" && o.test(n().bg_color) ? n().bg_color : "");
  let x = /* @__PURE__ */ F("");
  rn(() => {
    m(x, s(f), !0);
  });
  function v(T, C, H) {
    e.store.beginEdit(), C === void 0 || C === "" || C === null || C === H ? delete n()[T] : n()[T] = C, e.store.endEdit();
  }
  const p = (T) => {
    var C;
    return n()[T] ?? ((C = s(c)[T]) == null ? void 0 : C.default);
  };
  function _(T) {
    var C;
    e.store.beginEdit(), delete n().bg_color, delete n().text_color, T === ((C = s(c).background) == null ? void 0 : C.default) ? delete n().background : n().background = T, e.store.endEdit();
  }
  function k(T) {
    o.test(T) && v("bg_color", T.toLowerCase());
  }
  function h() {
    let T = s(x).trim();
    T && !T.startsWith("#") && (T = "#" + T), T ? o.test(T) ? k(T) : m(x, s(f), !0) : v("bg_color", void 0);
  }
  function E(T) {
    let C = T.replace("#", "");
    C.length === 3 && (C = C.split("").map((te) => te + te).join(""));
    const H = (te) => (te /= 255, te <= 0.03928 ? te / 12.92 : ((te + 0.055) / 1.055) ** 2.4), [V, fe, pe] = [0, 2, 4].map((te) => parseInt(C.slice(te, te + 2), 16)), _e = 0.2126 * H(V) + 0.7152 * H(fe) + 0.0722 * H(pe);
    return 1.05 / (_e + 0.05) >= (_e + 0.05) / 0.0597 ? "light" : "dark";
  }
  const D = (T) => {
    var C, H;
    return ((H = (C = e.store.palette) == null ? void 0 : C[T]) == null ? void 0 : H.bg) || l[T] || "var(--mb-muted)";
  }, z = (T) => {
    var C, H;
    return ((H = (C = e.store.palette) == null ? void 0 : C[T]) == null ? void 0 : H.fg) || (T === "accent" || T === "dark" ? "#fff" : "#111");
  }, K = /* @__PURE__ */ le(() => {
    var T;
    return [
      (T = e.store.palette) == null ? void 0 : T._accent,
      "#0f766e",
      "#7c3aed",
      "#be123c",
      "#ea580c",
      "#111827",
      "#f5f5f4"
    ].filter((C) => C && o.test(C));
  });
  var P = sn(), S = Te(P);
  {
    var w = (T) => {
      var C = Bc(), H = Te(C);
      {
        var V = (te) => {
          var Ce = qc(), Ee = Te(Ce), we = g(b(Ee), 2), Ne = b(we);
          Re(Ne, 17, () => s(c).background.options, ht, (oe, ve) => {
            const be = /* @__PURE__ */ le(() => !s(f) && p("background") === s(ve).value);
            var Pe = Oc();
            let Se, Ge;
            L(
              (wt, ze) => {
                Se = ye(Pe, 1, "sw svelte-uthihf", null, Se, { active: s(be) }), he(Pe, "title", s(ve).label), he(Pe, "aria-label", s(ve).label), he(Pe, "aria-pressed", s(be)), Ge = At(Pe, "", Ge, { background: wt, color: ze });
              },
              [
                () => D(s(ve).value),
                () => z(s(ve).value)
              ]
            ), R("click", Pe, () => _(s(ve).value)), M(oe, Pe);
          });
          var Z = g(Ne, 2);
          {
            var Y = (oe) => {
              var ve = Pc();
              let be, Pe;
              var Se = b(ve), Ge = g(Se, 2);
              {
                var wt = (me) => {
                  var Je = zc();
                  M(me, Je);
                }, ze = (me) => {
                  $(me, { name: "plus", size: 14 });
                };
                W(Ge, (me) => {
                  s(f) ? me(wt) : me(ze, -1);
                });
              }
              L(
                (me) => {
                  be = ye(ve, 1, "sw custom svelte-uthihf", null, be, { active: !!s(f) }), Pe = At(ve, "", Pe, {
                    background: s(f) || "conic-gradient(#ef4444, #f59e0b, #22c55e, #06b6d4, #6366f1, #d946ef, #ef4444)",
                    color: me
                  }), wn(Se, s(f) || "#2563eb");
                },
                [
                  () => s(f) ? E(s(f)) === "light" ? "#fff" : "#111" : "#fff"
                ]
              ), R("input", Se, (me) => k(me.currentTarget.value)), M(oe, ve);
            };
            W(Z, (oe) => {
              s(c).bg_color && oe(Y);
            });
          }
          var Q = g(we, 2), se = b(Q);
          {
            var ae = (oe) => {
              var ve = as();
              L(() => G(ve, `Custom ${s(f) ?? ""}`)), M(oe, ve);
            }, re = (oe) => {
              var ve = as();
              L((be) => G(ve, be), [
                () => {
                  var be;
                  return (be = s(c).background.options.find((Pe) => Pe.value === p("background"))) == null ? void 0 : be.label;
                }
              ]), M(oe, ve);
            };
            W(se, (oe) => {
              s(f) ? oe(ae) : oe(re, -1);
            });
          }
          var ke = g(se, 2);
          {
            var ne = (oe) => {
              var ve = Rc(), be = ee(ve);
              L(() => G(be, `· colors from your theme (${e.store.palette._mode ?? ""})`)), M(oe, ve);
            };
            W(ke, (oe) => {
              e.store.palette && oe(ne);
            });
          }
          var xe = g(Ee, 2);
          {
            var Oe = (oe) => {
              var ve = Fc(), be = g(b(ve), 2), Pe = b(be);
              let Se;
              var Ge = g(Pe, 2), wt = g(Ge, 2);
              {
                var ze = (Me) => {
                  var N = Lc();
                  R("click", N, () => v("bg_color", void 0)), M(Me, N);
                };
                W(wt, (Me) => {
                  s(f) && Me(ze);
                });
              }
              var me = g(be, 2);
              Re(me, 21, () => s(K), ht, (Me, N) => {
                var j = Dc();
                let q;
                L(() => {
                  he(j, "title", s(N)), he(j, "aria-label", s(N)), q = At(j, "", q, { background: s(N) });
                }), R("click", j, () => k(s(N))), M(Me, j);
              });
              var Je = g(me, 2);
              {
                var We = (Me) => {
                  var N = jc(), j = g(Te(N), 2);
                  Re(j, 21, () => s(c).text_color.options, ht, (q, U) => {
                    var ce = Ic();
                    let De;
                    var Fe = b(ce), xt = g(Fe);
                    {
                      var gt = (O) => {
                        var ie = as();
                        L((ue) => G(ie, `(${ue ?? ""})`), [() => E(s(f))]), M(O, ie);
                      };
                      W(xt, (O) => {
                        s(U).value === "auto" && O(gt);
                      });
                    }
                    L(() => {
                      De = ye(ce, 1, "svelte-uthihf", null, De, { active: (n().text_color || "auto") === s(U).value }), G(Fe, s(U).label);
                    }), R("click", ce, () => v("text_color", s(U).value, "auto")), M(q, ce);
                  }), M(Me, N);
                };
                W(Je, (Me) => {
                  s(f) && s(c).text_color && Me(We);
                });
              }
              L(() => Se = At(Pe, "", Se, { background: s(f) || "transparent" })), R("change", Ge, h), R("keydown", Ge, (Me) => Me.key === "Enter" && h()), gn(Ge, () => s(x), (Me) => m(x, Me)), M(oe, ve);
            };
            W(xe, (oe) => {
              s(c).bg_color && oe(Oe);
            });
          }
          M(te, Ce);
        };
        W(H, (te) => {
          s(c).background && te(V);
        });
      }
      var fe = g(H, 2);
      Re(fe, 16, () => ["spacing", "width", "align"], ht, (te, Ce) => {
        var Ee = sn(), we = Te(Ee);
        {
          var Ne = (Z) => {
            var Y = Hc(), Q = b(Y), se = ee(Q, !0), ae = g(Q, 2);
            Re(ae, 21, () => s(c)[Ce].options, ht, (re, ke) => {
              var ne = Uc();
              let xe;
              var Oe = ee(ne, !0);
              L(
                (oe) => {
                  xe = ye(ne, 1, "svelte-uthihf", null, xe, { active: oe }), G(Oe, s(ke).label);
                },
                [() => p(Ce) === s(ke).value]
              ), R("click", ne, () => v(Ce, s(ke).value, s(c)[Ce].default)), M(re, ne);
            }), L(() => G(se, s(c)[Ce].label)), M(Z, Y);
          };
          W(we, (Z) => {
            s(c)[Ce] && Z(Ne);
          });
        }
        M(te, Ee);
      });
      var pe = g(fe, 2);
      {
        var _e = (te) => {
          bs(te, {
            get field() {
              return s(c).reveal;
            },
            get target() {
              return n();
            },
            get store() {
              return e.store;
            }
          });
        };
        W(pe, (te) => {
          s(c).reveal && te(_e);
        });
      }
      M(T, C);
    }, y = (T) => {
      var C = sn(), H = Te(C);
      Re(H, 17, () => s(d), (V) => V.name, (V, fe) => {
        bs(V, {
          get field() {
            return s(fe);
          },
          get target() {
            return n();
          },
          get store() {
            return e.store;
          }
        });
      }), M(T, C);
    };
    W(S, (T) => {
      a() === "style" ? T(w) : T(y, -1);
    });
  }
  M(t, P), Qe();
}
rt(["click", "input", "change", "keydown"]);
var Vc = /* @__PURE__ */ A('<div class="none svelte-17w6cpd"><!> <strong class="svelte-17w6cpd">No block selected</strong> <p class="svelte-17w6cpd">Click a section in the preview, or pick one in the Outline, to edit its content and style.</p> <p class="keys svelte-17w6cpd"><span class="mb-kbd">Ctrl+Z</span> undo · <span class="mb-kbd">Ctrl+S</span> save · <span class="mb-kbd">Del</span> remove</p></div>'), Gc = /* @__PURE__ */ A('<div class="none svelte-17w6cpd"><strong class="svelte-17w6cpd"> </strong><p class="svelte-17w6cpd">The active theme has no schema for this type.</p></div>'), Kc = /* @__PURE__ */ A("<option> </option>"), Yc = /* @__PURE__ */ A('<!> <div class="field svelte-17w6cpd"><label class="mb-label" for="mb-type">Block type</label> <select id="mb-type" class="mb-input"></select></div>', 1), Jc = /* @__PURE__ */ A('<header class="svelte-17w6cpd"><span class="ico svelte-17w6cpd"><!></span> <div class="h svelte-17w6cpd"><strong class="svelte-17w6cpd"> </strong> <span class="svelte-17w6cpd"> </span></div> <button type="button" class="mb-btn ghost icon sm" title="Deselect"><!></button></header> <div class="tabs svelte-17w6cpd"><button type="button">Content</button> <button type="button">Style</button> <button type="button">Advanced</button></div> <div class="body mb-scroll svelte-17w6cpd"><!></div>', 1);
function Wc(t, e) {
  Ze(e, !0);
  let n = je(e, "store", 7), r = /* @__PURE__ */ F("content");
  const a = /* @__PURE__ */ le(() => n().selected >= 0 ? n().blocks[n().selected] : null), i = /* @__PURE__ */ le(() => s(a) ? n().defFor(s(a).type) : null);
  rn(() => {
    s(a) && s(i) && (typeof s(a)[s(a).type] != "object" || Array.isArray(s(a)[s(a).type])) && (s(a)[s(a).type] = {});
  });
  async function l(v) {
    const p = v.currentTarget.value;
    v.currentTarget.value = s(a).type, await e.askConfirm({
      title: "Change block type",
      message: "Content that doesn’t fit the new block type is removed. Style settings are kept. You can undo this.",
      choices: [
        { label: "Cancel", value: !1 },
        { label: "Change type", value: !0, primary: !0 }
      ]
    }) && n().changeType(n().selected, p);
  }
  var o = sn(), c = Te(o);
  {
    var d = (v) => {
      var p = Vc(), _ = b(p);
      $(_, { name: "settings", size: 26 }), M(v, p);
    }, f = (v) => {
      var p = Gc(), _ = b(p), k = ee(_);
      L(() => G(k, `Unknown block “${s(a).type ?? ""}”`)), M(v, p);
    }, x = (v) => {
      var p = Jc(), _ = Te(p), k = b(_), h = b(k);
      $(h, {
        get fa() {
          return s(i).icon;
        },
        size: 16
      });
      var E = g(k, 2), D = b(E), z = ee(D, !0), K = g(D, 2), P = ee(K, !0), S = g(E, 2), w = b(S);
      $(w, { name: "x", size: 14 });
      var y = g(_, 2), T = b(y);
      let C;
      var H = g(T, 2);
      let V;
      var fe = g(H, 2);
      let pe;
      var _e = g(y, 2), te = b(_e);
      Oo(te, () => n().selected + ":" + s(a).type, (Ce) => {
        var Ee = sn(), we = Te(Ee);
        {
          var Ne = (Q) => {
            var se = sn(), ae = Te(se);
            Re(ae, 17, () => s(i).fields, (re) => re.name, (re, ke) => {
              bs(re, {
                get field() {
                  return s(ke);
                },
                get target() {
                  return s(a)[s(a).type];
                },
                get store() {
                  return n();
                }
              });
            }), M(Q, se);
          }, Z = (Q) => {
            Wa(Q, {
              get block() {
                return s(a);
              },
              get store() {
                return n();
              },
              get settings() {
                return n().catalog.settings;
              },
              mode: "style"
            });
          }, Y = (Q) => {
            var se = Yc(), ae = Te(se);
            Wa(ae, {
              get block() {
                return s(a);
              },
              get store() {
                return n();
              },
              get settings() {
                return n().catalog.settings;
              },
              mode: "advanced"
            });
            var re = g(ae, 2), ke = g(b(re), 2);
            Re(ke, 21, () => n().catalog.blocks, ht, (xe, Oe) => {
              var oe = Kc(), ve = ee(oe, !0), be = {};
              L(() => {
                G(ve, s(Oe).title), be !== (be = s(Oe).type) && (oe.value = (oe.__value = be) ?? "");
              }), M(xe, oe);
            });
            var ne;
            _s(ke), L(() => {
              ne !== (ne = s(a).type) && (ke.value = (ke.__value = ne) ?? "", Ms(ke, ne));
            }), R("change", ke, l), M(Q, se);
          };
          W(we, (Q) => {
            s(r) === "content" && s(a)[s(a).type] && typeof s(a)[s(a).type] == "object" ? Q(Ne) : s(r) === "style" ? Q(Z, 1) : s(r) === "advanced" && Q(Y, 2);
          });
        }
        M(Ce, Ee);
      }), L(() => {
        G(z, s(i).title), G(P, s(i).description), C = ye(T, 1, "svelte-17w6cpd", null, C, { active: s(r) === "content" }), V = ye(H, 1, "svelte-17w6cpd", null, V, { active: s(r) === "style" }), pe = ye(fe, 1, "svelte-17w6cpd", null, pe, { active: s(r) === "advanced" });
      }), R("click", S, () => n().selected = -1), R("click", T, () => m(r, "content")), R("click", H, () => m(r, "style")), R("click", fe, () => m(r, "advanced")), M(v, p);
    };
    W(c, (v) => {
      s(a) ? s(i) ? v(x, -1) : v(f, 1) : v(d);
    });
  }
  M(t, o), Qe();
}
rt(["click", "change"]);
var Xc = /* @__PURE__ */ A('<button type="button"><!></button>'), Zc = /* @__PURE__ */ A('<p class="error svelte-1nqlp8n"> </p>'), Qc = /* @__PURE__ */ A('<p class="muted svelte-1nqlp8n">Loading blocks…</p>'), $c = /* @__PURE__ */ A('<div class="toast svelte-1nqlp8n" role="status"> </div>'), ef = /* @__PURE__ */ A('<button type="button" class="mb-btn svelte-1nqlp8n">Cancel</button> <button type="button" class="mb-btn primary svelte-1nqlp8n">Save pattern</button>', 1), tf = /* @__PURE__ */ A("<option>Selected block only</option>"), nf = /* @__PURE__ */ A('<label class="mb-label" for="mb-pattern-title">Name</label> <input id="mb-pattern-title" class="mb-input" placeholder="e.g. Services intro"/> <div class="grid2 svelte-1nqlp8n"><div><span class="mb-label">Contains</span> <select class="mb-input"><!><option> </option></select></div> <div><span class="mb-label">Type</span> <select class="mb-input"><option>Section</option><option>Full page layout</option></select></div></div>', 1), rf = /* @__PURE__ */ A('<button type="button"> </button>'), sf = /* @__PURE__ */ A("<p> </p>"), af = /* @__PURE__ */ A('<div class="builder svelte-1nqlp8n"><header class="top svelte-1nqlp8n"><div class="left svelte-1nqlp8n"><button type="button" class="mb-btn ghost icon" title="Close builder (Esc)"><!></button> <div class="brand svelte-1nqlp8n"><span class="logo svelte-1nqlp8n"><!></span> <div><div class="page svelte-1nqlp8n"></div> <div class="route svelte-1nqlp8n"> </div></div></div> <div class="sep svelte-1nqlp8n"></div> <button type="button" class="mb-btn ghost icon" title="Undo (Ctrl+Z)"><!></button> <button type="button" class="mb-btn ghost icon" title="Redo (Ctrl+Shift+Z)"><!></button></div> <div class="devices svelte-1nqlp8n" role="group" aria-label="Preview width"></div> <div class="right svelte-1nqlp8n"><button type="button" class="mb-btn ghost icon" title="Refresh preview"><!></button> <button type="button" class="mb-btn"><!> Save as pattern</button> <button type="button" class="mb-btn primary" title="Save page (Ctrl+S)"><!> Update</button></div></header> <div class="body svelte-1nqlp8n"><aside class="panel left-panel svelte-1nqlp8n"><div class="tabs svelte-1nqlp8n" role="tablist"><button type="button" role="tab"><!> Blocks</button> <button type="button" role="tab"><!> Patterns</button> <button type="button" role="tab"><!> Outline</button></div> <div class="panel-body mb-scroll svelte-1nqlp8n"><!></div></aside> <main class="canvas-wrap svelte-1nqlp8n"><!></main> <aside class="panel right-panel svelte-1nqlp8n"><!></aside></div> <!> <!></div>');
function lf(t, e) {
  Ze(e, !0);
  let n = je(e, "store", 7), r = /* @__PURE__ */ F(
    "blocks"
    // blocks | patterns | outline
  ), a = /* @__PURE__ */ F(
    "desktop"
    // desktop | tablet | mobile
  ), i = /* @__PURE__ */ F(
    null
    // {kind, ...}
  ), l = /* @__PURE__ */ F(void 0);
  const o = /Mac|iPhone|iPad/.test(navigator.platform);
  Zr(() => {
    n().load();
    const O = (ue) => d(ue), ie = () => m(r, "blocks");
    return window.addEventListener("keydown", O, !0), document.addEventListener("maw-open-inserter", ie), () => {
      window.removeEventListener("keydown", O, !0), document.removeEventListener("maw-open-inserter", ie);
    };
  });
  function c(O) {
    const ie = O.composedPath()[0];
    return ie && (ie.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(ie.tagName));
  }
  function d(O) {
    if (!n().open || O.__mawSave) return;
    const ie = o ? O.metaKey : O.ctrlKey, ue = O.key.toLowerCase();
    if (ie && ue === "s") {
      O.preventDefault(), O.stopPropagation(), f();
      return;
    }
    if (ie && ue === "z" && !c(O)) {
      O.preventDefault(), O.stopPropagation(), O.shiftKey ? n().redo() : n().undo();
      return;
    }
    if (ie && ue === "y" && !c(O)) {
      O.preventDefault(), O.stopPropagation(), n().redo();
      return;
    }
    if (s(i)) {
      ue === "escape" && (m(i, null), O.stopPropagation());
      return;
    }
    if (!c(O)) {
      if (ue === "escape") {
        O.stopPropagation(), n().selected >= 0 ? n().selected = -1 : x();
        return;
      }
      n().selected < 0 || (ue === "delete" || ue === "backspace" ? (O.preventDefault(), O.stopPropagation(), n().remove(n().selected)) : ie && ue === "d" ? (O.preventDefault(), O.stopPropagation(), n().duplicate(n().selected)) : O.altKey && ue === "arrowup" ? (O.preventDefault(), n().move(n().selected, n().selected - 1)) : O.altKey && ue === "arrowdown" && (O.preventDefault(), n().move(n().selected, n().selected + 1)));
    }
  }
  function f() {
    const O = new KeyboardEvent("keydown", {
      key: "s",
      code: "KeyS",
      ctrlKey: !o,
      metaKey: o,
      bubbles: !0,
      cancelable: !0
    });
    O.__mawSave = !0, window.dispatchEvent(O), n().dirty = !1, n().flash("Saving page…");
  }
  function x() {
    e.close();
  }
  function v() {
    n().selected < 0 && !n().blocks.length || m(
      i,
      {
        kind: "pattern",
        title: "",
        category: "section",
        scope: n().selected >= 0 ? "selected" : "all"
      },
      !0
    );
  }
  async function p() {
    const O = s(i);
    if (!O.title.trim()) return;
    const ie = O.scope === "selected" ? [n().selected] : n().blocks.map((ue, Ue) => Ue);
    try {
      await n().savePattern(O.title.trim(), O.category, ie), n().flash(`Pattern “${O.title.trim()}” saved`), m(i, null), m(r, "patterns");
    } catch (ue) {
      n().flash(ue.message);
    }
  }
  function _(O) {
    return new Promise((ie) => {
      m(i, { kind: "confirm", ...O, resolve: ie }, !0);
    });
  }
  const k = /* @__PURE__ */ le(() => {
    var O, ie, ue, Ue;
    return {
      desktop: null,
      tablet: ((ie = (O = n().catalog) == null ? void 0 : O.devices) == null ? void 0 : ie.tablet) || 820,
      mobile: ((Ue = (ue = n().catalog) == null ? void 0 : ue.devices) == null ? void 0 : Ue.mobile) || 390
    };
  });
  var h = af(), E = b(h), D = b(E), z = b(D), K = b(z);
  $(K, { name: "x" });
  var P = g(z, 2), S = b(P), w = b(S);
  $(w, { name: "blocks", size: 15 });
  var y = g(S, 2), T = b(y);
  T.textContent = document.title.replace(/\s*[—|-]\s*Grav Admin.*$/, "") || "Page";
  var C = g(T, 2), H = ee(C, !0), V = g(P, 4), fe = b(V);
  $(fe, { name: "undo" });
  var pe = g(V, 2), _e = b(pe);
  $(_e, { name: "redo" });
  var te = g(D, 2);
  Re(
    te,
    20,
    () => [
      ["desktop", "monitor", "Desktop"],
      ["tablet", "tablet", "Tablet"],
      ["mobile", "phone", "Mobile"]
    ],
    ht,
    (O, ie) => {
      var ue = /* @__PURE__ */ le(() => ai(ie, 3));
      let Ue = () => s(ue)[0], ut = () => s(ue)[1], st = () => s(ue)[2];
      var $e = Xc();
      let et;
      var ct = b($e);
      $(ct, {
        get name() {
          return ut();
        },
        size: 15
      }), L(() => {
        he($e, "title", st()), he($e, "aria-pressed", s(a) === Ue()), et = ye($e, 1, "svelte-1nqlp8n", null, et, { active: s(a) === Ue() });
      }), R("click", $e, () => m(a, Ue(), !0)), M(O, $e);
    }
  );
  var Ce = g(te, 2), Ee = b(Ce), we = b(Ee);
  $(we, { name: "refresh", size: 15 });
  var Ne = g(Ee, 2), Z = b(Ne);
  $(Z, { name: "template", size: 15 });
  var Y = g(Ne, 2), Q = b(Y);
  $(Q, { name: "save", size: 15 });
  var se = g(E, 2), ae = b(se), re = b(ae), ke = b(re);
  let ne;
  var xe = b(ke);
  $(xe, { name: "plus", size: 14 });
  var Oe = g(ke, 2);
  let oe;
  var ve = b(Oe);
  $(ve, { name: "template", size: 14 });
  var be = g(Oe, 2);
  let Pe;
  var Se = b(be);
  $(Se, { name: "layers", size: 14 });
  var Ge = g(re, 2), wt = b(Ge);
  {
    var ze = (O) => {
      var ie = Zc(), ue = ee(ie, !0);
      L(() => G(ue, n().loadError)), M(O, ie);
    }, me = (O) => {
      var ie = Qc();
      M(O, ie);
    }, Je = (O) => {
      fu(O, {
        get store() {
          return n();
        }
      });
    }, We = (O) => {
      gu(O, {
        get store() {
          return n();
        },
        askConfirm: _
      });
    }, Me = (O) => {
      ku(O, {
        get store() {
          return n();
        }
      });
    };
    W(wt, (O) => {
      n().loadError ? O(ze) : n().catalog ? s(r) === "blocks" ? O(Je, 2) : s(r) === "patterns" ? O(We, 3) : O(Me, -1) : O(me, 1);
    });
  }
  var N = g(ae, 2), j = b(N);
  bn(
    Uu(j, {
      get store() {
        return n();
      },
      get width() {
        return s(k)[s(a)];
      }
    }),
    (O) => m(l, O, !0),
    () => s(l)
  );
  var q = g(N, 2), U = b(q);
  Wc(U, {
    get store() {
      return n();
    },
    askConfirm: _
  });
  var ce = g(se, 2);
  {
    var De = (O) => {
      var ie = $c(), ue = ee(ie, !0);
      L(() => G(ue, n().toast)), M(O, ie);
    };
    W(ce, (O) => {
      n().toast && O(De);
    });
  }
  var Fe = g(ce, 2);
  {
    var xt = (O) => {
      sa(O, {
        title: "Save as pattern",
        onclose: () => m(i, null),
        actions: (ue) => {
          var Ue = ef(), ut = Te(Ue), st = g(ut, 2);
          L(($e) => st.disabled = $e, [() => !s(i).title.trim()]), R("click", ut, () => m(i, null)), R("click", st, p), M(ue, Ue);
        },
        children: (ue, Ue) => {
          var ut = nf(), st = g(Te(ut), 2);
          Bl(st);
          var $e = g(st, 2), et = b($e), ct = g(b(et), 2), or = b(ct);
          {
            var Ts = (Pt) => {
              var Os = tf();
              Os.value = Os.__value = "selected", M(Pt, Os);
            };
            W(or, (Pt) => {
              n().selected >= 0 && Pt(Ts);
            });
          }
          var As = g(or), $i = ee(As);
          As.value = As.__value = "all", _s(ct);
          var el = g(et, 2), Cs = g(b(el), 2), Ns = b(Cs);
          Ns.value = Ns.__value = "section";
          var Sa = g(Ns);
          Sa.value = Sa.__value = "page", _s(Cs), L(() => G($i, `All ${n().blocks.length ?? ""} blocks on this page`)), R("keydown", st, (Pt) => Pt.key === "Enter" && p()), gn(st, () => s(i).title, (Pt) => s(i).title = Pt), Ba(ct, () => s(i).scope, (Pt) => s(i).scope = Pt), Ba(Cs, () => s(i).category, (Pt) => s(i).category = Pt), M(ue, ut);
        },
        $$slots: { actions: !0, default: !0 }
      });
    }, gt = (O) => {
      sa(O, {
        get title() {
          return s(i).title;
        },
        onclose: () => {
          s(i).resolve(null), m(i, null);
        },
        actions: (ue) => {
          var Ue = sn(), ut = Te(Ue);
          Re(ut, 17, () => s(i).choices, ht, (st, $e) => {
            var et = rf(), ct = ee(et, !0);
            L(() => {
              ye(et, 1, `mb-btn ${s($e).primary ? "primary" : ""}`, "svelte-1nqlp8n"), G(ct, s($e).label);
            }), R("click", et, () => {
              s(i).resolve(s($e).value), m(i, null);
            }), M(st, et);
          }), M(ue, Ue);
        },
        children: (ue, Ue) => {
          var ut = sf(), st = ee(ut, !0);
          L(() => G(st, s(i).message)), M(ue, ut);
        },
        $$slots: { actions: !0, default: !0 }
      });
    };
    W(Fe, (O) => {
      var ie, ue;
      ((ie = s(i)) == null ? void 0 : ie.kind) === "pattern" ? O(xt) : ((ue = s(i)) == null ? void 0 : ue.kind) === "confirm" && O(gt, 1);
    });
  }
  L(() => {
    G(H, n().isFlex ? `Flex · ${n().context.type}` : n().route), V.disabled = !n().canUndo, pe.disabled = !n().canRedo, Ne.disabled = !n().blocks.length, he(ke, "aria-selected", s(r) === "blocks"), ne = ye(ke, 1, "svelte-1nqlp8n", null, ne, { active: s(r) === "blocks" }), he(Oe, "aria-selected", s(r) === "patterns"), oe = ye(Oe, 1, "svelte-1nqlp8n", null, oe, { active: s(r) === "patterns" }), he(be, "aria-selected", s(r) === "outline"), Pe = ye(be, 1, "svelte-1nqlp8n", null, Pe, { active: s(r) === "outline" });
  }), R("click", z, x), R("click", V, () => n().undo()), R("click", pe, () => n().redo()), R("click", Ee, () => {
    var O;
    return (O = s(l)) == null ? void 0 : O.refresh();
  }), R("click", Ne, v), R("click", Y, f), R("click", ke, () => m(r, "blocks")), R("click", Oe, () => m(r, "patterns")), R("click", be, () => m(r, "outline")), M(t, h), Qe();
}
rt(["click", "keydown"]);
const of = 60;
var Nr, Or, zr, Pr, Rr, Lr, Dr, Ir, jr, Fr, qr, Bt, dn, $n, An, Ur, Hr, Br, Vr, Ke, aa, ls, gr, os;
class uf {
  constructor({ context: e, fieldName: n, onChange: r }) {
    I(this, Ke);
    I(this, Nr, /* @__PURE__ */ F(tt([])));
    I(this, Or, /* @__PURE__ */ F(-1));
    I(this, zr, /* @__PURE__ */ F(null));
    I(this, Pr, /* @__PURE__ */ F(tt([])));
    I(this, Rr, /* @__PURE__ */ F(""));
    I(this, Lr, /* @__PURE__ */ F(!1));
    I(this, Dr, /* @__PURE__ */ F(!1));
    I(this, Ir, /* @__PURE__ */ F(""));
    I(this, jr, /* @__PURE__ */ F(""));
    I(this, Fr, /* @__PURE__ */ F(""));
    I(this, qr, /* @__PURE__ */ F(null));
    I(this, Bt, []);
    I(this, dn, []);
    I(this, $n, 0);
    I(this, An, !1);
    I(this, Ur, /* @__PURE__ */ F(!1));
    I(this, Hr, /* @__PURE__ */ F(!1));
    I(this, Br, /* @__PURE__ */ F(null));
    I(this, Vr, /* @__PURE__ */ F(tt({})));
    this.context = e, this.route = e.kind === "page" ? e.route : null, this.fieldName = n, this.onChange = r;
  }
  get blocks() {
    return s(u(this, Nr));
  }
  set blocks(e) {
    m(u(this, Nr), e, !0);
  }
  get selected() {
    return s(u(this, Or));
  }
  set selected(e) {
    m(u(this, Or), e, !0);
  }
  get catalog() {
    return s(u(this, zr));
  }
  set catalog(e) {
    m(u(this, zr), e, !0);
  }
  get patterns() {
    return s(u(this, Pr));
  }
  set patterns(e) {
    m(u(this, Pr), e, !0);
  }
  get loadError() {
    return s(u(this, Rr));
  }
  set loadError(e) {
    m(u(this, Rr), e, !0);
  }
  get open() {
    return s(u(this, Lr));
  }
  set open(e) {
    m(u(this, Lr), e, !0);
  }
  get dirty() {
    return s(u(this, Dr));
  }
  set dirty(e) {
    m(u(this, Dr), e, !0);
  }
  get toast() {
    return s(u(this, Ir));
  }
  set toast(e) {
    m(u(this, Ir), e, !0);
  }
  get dragType() {
    return s(u(this, jr));
  }
  set dragType(e) {
    m(u(this, jr), e, !0);
  }
  get busy() {
    return s(u(this, Fr));
  }
  set busy(e) {
    m(u(this, Fr), e, !0);
  }
  get pendingInsert() {
    return s(u(this, qr));
  }
  set pendingInsert(e) {
    m(u(this, qr), e, !0);
  }
  get canUndo() {
    return s(u(this, Ur));
  }
  set canUndo(e) {
    m(u(this, Ur), e, !0);
  }
  get canRedo() {
    return s(u(this, Hr));
  }
  set canRedo(e) {
    m(u(this, Hr), e, !0);
  }
  get palette() {
    return s(u(this, Br));
  }
  set palette(e) {
    m(u(this, Br), e, !0);
  }
  get mediaUrls() {
    return s(u(this, Vr));
  }
  set mediaUrls(e) {
    m(u(this, Vr), e, !0);
  }
  get isFlex() {
    return this.context.kind === "flex";
  }
  /** The builder needs something saved to preview against: a page route, or an existing Flex object. */
  get canPreview() {
    return this.context.kind === "page" ? !!this.route : this.context.kind === "flex" && !!this.context.key;
  }
  get settingKeys() {
    var e;
    return ((e = this.catalog) == null ? void 0 : e.settingKeys) || Ji;
  }
  /** Display URL for a bare filename in this page's / object's folder. */
  pageMediaUrl(e) {
    return this.mediaUrls[e] ? this.mediaUrls[e] : this.isFlex ? "" : `${(this.route || "").replace(/\/$/, "")}/${encodeURIComponent(e)}`;
  }
  rememberMedia(e) {
    const n = { ...this.mediaUrls };
    for (const r of e || []) r != null && r.filename && r.url && (n[r.filename] = r.url);
    this.mediaUrls = n;
  }
  async loadOwnMedia() {
    try {
      const e = await tn.ownMedia(this.context), n = Array.isArray(e) ? e : (e == null ? void 0 : e.items) || (e == null ? void 0 : e.files) || [];
      return this.rememberMedia(n), n;
    } catch {
      return [];
    }
  }
  defFor(e) {
    var n;
    return ((n = this.catalog) == null ? void 0 : n.blocks.find((r) => r.type === e)) || null;
  }
  async load() {
    return this.catalog || this.loading ? this.loading : (this.loading = (async () => {
      try {
        const [e, n] = await Promise.all([tn.blocks(), tn.patterns().catch(() => [])]);
        this.catalog = e, this.patterns = n || [], this.blocks = Hs(fr(this.blocks), this.settingKeys), this.canPreview && this.loadOwnMedia();
      } catch (e) {
        this.loadError = e.message || String(e);
      }
    })(), this.loading);
  }
  /** Value pushed in by Admin2. Ignored if it's the value we just emitted. */
  setValue(e) {
    const n = Hs(e, this.settingKeys);
    JSON.stringify(n) !== JSON.stringify(fr(this.blocks)) && (this.blocks = n, this.selected >= n.length && (this.selected = n.length - 1));
  }
  snapshot() {
    return fr(this.blocks);
  }
  /** Structural change: record history immediately. */
  mutate(e, n = "Updating page…") {
    this.busy = n, J(this, Ke, os).call(this), J(this, Ke, aa).call(this), e(this.blocks), J(this, Ke, gr).call(this);
  }
  /** Field edits: one history entry per burst of typing. Call BEFORE applying the change. */
  beginEdit() {
    this.busy = "Updating preview…", u(this, An) || (J(this, Ke, aa).call(this), B(this, An, !0)), clearTimeout(u(this, $n)), B(this, $n, setTimeout(() => B(this, An, !1), 700));
  }
  endEdit() {
    J(this, Ke, gr).call(this);
  }
  undo() {
    J(this, Ke, os).call(this), u(this, Bt).length && (this.busy = "Undoing…", u(this, dn).push(JSON.stringify(this.snapshot())), this.blocks = JSON.parse(u(this, Bt).pop()), this.selected >= this.blocks.length && (this.selected = this.blocks.length - 1), J(this, Ke, ls).call(this), J(this, Ke, gr).call(this));
  }
  redo() {
    J(this, Ke, os).call(this), u(this, dn).length && (this.busy = "Redoing…", u(this, Bt).push(JSON.stringify(this.snapshot())), this.blocks = JSON.parse(u(this, dn).pop()), this.selected >= this.blocks.length && (this.selected = this.blocks.length - 1), J(this, Ke, ls).call(this), J(this, Ke, gr).call(this));
  }
  // ─── operations ──────────────────────────────────────────
  insert(e, n = null) {
    const r = this.defFor(e);
    if (!r) return;
    const a = n ?? (this.selected >= 0 ? this.selected + 1 : this.blocks.length);
    this.pendingInsert = { index: a, title: r.title }, this.mutate((i) => i.splice(a, 0, Ga(r)), `Adding ${r.title}…`), this.selected = a;
  }
  insertMany(e, n = null, r = !1) {
    var l;
    const a = Hs(JSON.parse(JSON.stringify(e)), this.settingKeys).filter((o) => this.defFor(o.type));
    if (!a.length) return;
    if (r) {
      this.mutate((o) => o.splice(0, o.length, ...a), "Building page layout…"), this.selected = 0;
      return;
    }
    const i = n ?? (this.selected >= 0 ? this.selected + 1 : this.blocks.length);
    this.pendingInsert = {
      index: i,
      title: a.length > 1 ? `${a.length} sections` : (l = this.defFor(a[0].type)) == null ? void 0 : l.title
    }, this.mutate((o) => o.splice(i, 0, ...a), `Adding ${a.length > 1 ? a.length + " sections" : "pattern"}…`), this.selected = i;
  }
  remove(e) {
    e < 0 || e >= this.blocks.length || (this.mutate((n) => n.splice(e, 1), "Removing block…"), this.selected = Math.min(e, this.blocks.length - 1));
  }
  duplicate(e) {
    const n = this.blocks[e];
    n && (this.mutate((r) => r.splice(e + 1, 0, Zo(fr(n))), "Duplicating block…"), this.selected = e + 1);
  }
  move(e, n) {
    n < 0 || n >= this.blocks.length || e === n || (this.mutate(
      (r) => {
        const [a] = r.splice(e, 1);
        r.splice(n, 0, a);
      },
      "Moving block…"
    ), this.selected = n);
  }
  toggleHidden(e) {
    const n = this.blocks[e];
    n && this.mutate(
      () => {
        n.hidden ? delete n.hidden : n.hidden = !0;
      },
      n.hidden ? "Showing block…" : "Hiding block…"
    );
  }
  changeType(e, n) {
    const r = this.defFor(n), a = this.blocks[e];
    !r || !a || a.type === n || this.mutate(
      (i) => {
        const l = Ga(r);
        for (const o of this.settingKeys) a[o] !== void 0 && (l[o] = a[o]);
        i[e] = l;
      },
      `Changing to ${r.title}…`
    );
  }
  flash(e) {
    this.toast = e, clearTimeout(this.toastTimer), this.toastTimer = setTimeout(() => this.toast = "", 2600);
  }
  async savePattern(e, n, r) {
    const a = r.map((l) => this.snapshot()[l]).filter(Boolean), i = await tn.savePattern({ title: e, category: n, blocks: a });
    return this.patterns = [...this.patterns, i], i;
  }
  async deletePattern(e) {
    await tn.deletePattern(e), this.patterns = this.patterns.filter((n) => n.id !== e);
  }
}
Nr = new WeakMap(), Or = new WeakMap(), zr = new WeakMap(), Pr = new WeakMap(), Rr = new WeakMap(), Lr = new WeakMap(), Dr = new WeakMap(), Ir = new WeakMap(), jr = new WeakMap(), Fr = new WeakMap(), qr = new WeakMap(), Bt = new WeakMap(), dn = new WeakMap(), $n = new WeakMap(), An = new WeakMap(), Ur = new WeakMap(), Hr = new WeakMap(), Br = new WeakMap(), Vr = new WeakMap(), Ke = new WeakSet(), // ─── history ─────────────────────────────────────────────
aa = function() {
  u(this, Bt).push(JSON.stringify(this.snapshot())), u(this, Bt).length > of && u(this, Bt).shift(), B(this, dn, []), J(this, Ke, ls).call(this);
}, ls = function() {
  this.canUndo = u(this, Bt).length > 0, this.canRedo = u(this, dn).length > 0;
}, gr = function() {
  var e;
  this.dirty = !0, (e = this.onChange) == null || e.call(this, this.snapshot());
}, os = function() {
  clearTimeout(u(this, $n)), B(this, An, !1);
};
const cf = "__MAW_CSS__", Xa = window.__GRAV_FIELD_TAG || "grav-maw-builder--blocks";
function Za() {
  const t = document.createElement("style");
  return t.textContent = cf, t;
}
var Cn, hn, Gr, lt, Nn, en, pn, zt, ia, Zi, Qi, la;
class ff extends HTMLElement {
  constructor() {
    super(...arguments);
    I(this, zt);
    I(this, Cn, null);
    I(this, hn, []);
    I(this, Gr, null);
    I(this, lt, null);
    I(this, Nn, null);
    I(this, en, null);
    I(this, pn, null);
  }
  set field(n) {
    B(this, Cn, n), u(this, lt) && (u(this, lt).fieldName = J(this, zt, ia).call(this));
  }
  get field() {
    return u(this, Cn);
  }
  set value(n) {
    var a;
    JSON.stringify(n ?? []) !== u(this, Gr) && (B(this, hn, Array.isArray(n) ? n : []), (a = u(this, lt)) == null || a.setValue(u(this, hn)));
  }
  get value() {
    return u(this, hn);
  }
  connectedCallback() {
    if (u(this, lt)) return;
    const n = this.shadowRoot || this.attachShadow({ mode: "open" });
    n.appendChild(Za()), B(this, lt, new uf({
      context: Qo(),
      fieldName: J(this, zt, ia).call(this),
      onChange: (a) => J(this, zt, Zi).call(this, a)
    })), u(this, lt).setValue(u(this, hn)), u(this, lt).load();
    const r = document.createElement("div");
    n.appendChild(r), B(this, Nn, Da(iu, {
      target: r,
      props: { store: u(this, lt), field: u(this, Cn), openBuilder: (a) => J(this, zt, Qi).call(this, a) }
    }));
  }
  disconnectedCallback() {
    queueMicrotask(() => {
      this.isConnected || (J(this, zt, la).call(this), u(this, Nn) && Ia(u(this, Nn)), B(this, Nn, null), B(this, lt, null), this.shadowRoot && (this.shadowRoot.innerHTML = ""));
    });
  }
}
Cn = new WeakMap(), hn = new WeakMap(), Gr = new WeakMap(), lt = new WeakMap(), Nn = new WeakMap(), en = new WeakMap(), pn = new WeakMap(), zt = new WeakSet(), ia = function() {
  var r;
  return String(((r = u(this, Cn)) == null ? void 0 : r.name) || "header.blocks").replace(/^header\./, "") === "blocks_after" ? "blocks_after" : "blocks";
}, Zi = function(n) {
  B(this, hn, n), B(this, Gr, JSON.stringify(n)), this.dispatchEvent(new CustomEvent("change", { detail: n, bubbles: !0 }));
}, /** The builder mounts on <body> so no admin layout (overflow, transforms) can clip the full-screen overlay. */
Qi = function(n = -1) {
  if (u(this, pn)) return;
  const r = u(this, lt);
  r.selected = n, r.open = !0, B(this, en, document.createElement("maw-builder-host")), u(this, en).style.cssText = "position:fixed;inset:0;z-index:2147483000;display:block;";
  const a = u(this, en).attachShadow({ mode: "open" });
  a.appendChild(Za());
  const i = document.createElement("div");
  i.className = "maw-root", a.appendChild(i), document.body.appendChild(u(this, en)), document.documentElement.style.overflow = "hidden", B(this, pn, Da(lf, {
    target: i,
    props: { store: r, close: () => J(this, zt, la).call(this) }
  }));
}, la = function() {
  var n;
  u(this, pn) && Ia(u(this, pn)), B(this, pn, null), (n = u(this, en)) == null || n.remove(), B(this, en, null), document.documentElement.style.overflow = "", u(this, lt) && (u(this, lt).open = !1);
};
customElements.get(Xa) || customElements.define(Xa, ff);
