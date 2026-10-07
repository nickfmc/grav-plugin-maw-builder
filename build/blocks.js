var cc = Object.defineProperty;
var sl = (t) => {
  throw TypeError(t);
};
var uc = (t, e, n) => e in t ? cc(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var vt = (t, e, n) => uc(t, typeof e != "symbol" ? e + "" : e, n), Za = (t, e, n) => e.has(t) || sl("Cannot " + n);
var c = (t, e, n) => (Za(t, e, "read from private field"), n ? n.call(t) : e.get(t)), H = (t, e, n) => e.has(t) ? sl("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), re = (t, e, n, r) => (Za(t, e, "write to private field"), r ? r.call(t, n) : e.set(t, n), n), pe = (t, e, n) => (Za(t, e, "access private method"), n);
var sa = Array.isArray, dc = Array.prototype.indexOf, Ta = Array.prototype.includes, Ua = Array.from, Il = Object.defineProperty, Ss = Object.getOwnPropertyDescriptor, vc = Object.getOwnPropertyDescriptors, jl = Object.prototype, fc = Array.prototype, zi = Object.getPrototypeOf, rl = Object.isExtensible;
const ql = () => {
};
function hc(t) {
  for (var e = 0; e < t.length; e++)
    t[e]();
}
function Fl() {
  var t, e, n = new Promise((r, a) => {
    t = r, e = a;
  });
  return { promise: n, resolve: t, reject: e };
}
function Ha(t, e) {
  if (Array.isArray(t))
    return t;
  if (e === void 0 || !(Symbol.iterator in t))
    return Array.from(t);
  const n = [];
  for (const r of t)
    if (n.push(r), n.length === e) break;
  return n;
}
const yt = 2, Hs = 4, Ka = 8, Bl = 1 << 24, sn = 16, Yt = 32, An = 64, ci = 128, Di = 256, Vt = 512, bt = 1024, mt = 2048, an = 4096, Ot = 8192, Lt = 16384, Ws = 32768, Aa = 1 << 25, cs = 65536, Ca = 1 << 17, pc = 1 << 18, Xs = 1 << 19, gc = 1 << 20, vn = 1 << 25, us = 65536, Oa = 1 << 21, Es = 1 << 22, Bn = 1 << 23, is = Symbol("$state"), Ul = Symbol("component"), bc = Symbol("legacy props"), mc = Symbol(""), ba = Symbol("attributes"), ui = Symbol("class"), di = Symbol("style"), nr = Symbol("text"), ma = Symbol("form reset"), ra = new class extends Error {
  constructor() {
    super(...arguments);
    vt(this, "name", "StaleReactionError");
    vt(this, "message", "The reaction that called `getAbortSignal()` was re-run or destroyed");
  }
}();
var Nl;
const _c = (
  // We gotta write it like this because after downleveling the pure comment may end up in the wrong location
  !!((Nl = globalThis.document) != null && Nl.contentType) && /* @__PURE__ */ globalThis.document.contentType.includes("xml")
), yc = 1, kc = 2, Hl = 4, wc = 8, xc = 16, Sc = 1, Ec = 4, Mc = 8, Tc = 16, Ac = 1, Cc = 2, gt = Symbol("uninitialized"), Oc = "http://www.w3.org/1999/xhtml";
function Pc() {
  console.warn("https://svelte.dev/e/derived_inert");
}
function zc() {
  console.warn("https://svelte.dev/e/select_multiple_invalid_value");
}
function Dc() {
  console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
function Kl(t) {
  return t === this.v;
}
function Nc(t, e) {
  return t != t ? e == e : t !== e || t !== null && typeof t == "object" || typeof t == "function";
}
function Gl(t) {
  return !Nc(t, this.v);
}
function Lc(t) {
  throw new Error("https://svelte.dev/e/lifecycle_outside_component");
}
function Rc() {
  throw new Error("https://svelte.dev/e/async_derived_orphan");
}
function Ic(t, e, n) {
  throw new Error("https://svelte.dev/e/each_key_duplicate");
}
function jc(t) {
  throw new Error("https://svelte.dev/e/effect_in_teardown");
}
function qc() {
  throw new Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function Fc(t) {
  throw new Error("https://svelte.dev/e/effect_orphan");
}
function Bc() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function Uc(t) {
  throw new Error("https://svelte.dev/e/props_invalid_value");
}
function Hc() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function Kc() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function Gc() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
function Vc() {
  throw new Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
const Yc = [];
function Vn(t, e = !1, n = !1) {
  return _a(t, /* @__PURE__ */ new Map(), "", Yc, null, n);
}
function _a(t, e, n, r, a = null, i = !1) {
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
    if (sa(t)) {
      var o = (
        /** @type {Snapshot<any>} */
        Array(t.length)
      );
      e.set(t, o), a !== null && e.set(a, o);
      for (var u = 0; u < t.length; u += 1) {
        var v = t[u];
        u in t && (o[u] = _a(v, e, n, r, null, i));
      }
      return o;
    }
    if (zi(t) === jl) {
      o = {}, e.set(t, o), a !== null && e.set(a, o);
      for (var _ of Object.keys(t))
        o[_] = _a(
          // @ts-expect-error
          t[_],
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
      return _a(
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
let xt = null;
function Ks(t) {
  xt = t;
}
function ot(t, e = !1, n) {
  xt = {
    p: xt,
    i: !1,
    c: null,
    e: null,
    s: t,
    x: null,
    r: (
      /** @type {Effect} */
      Fe
    ),
    l: null
  };
}
function ct(t) {
  var e = (
    /** @type {ComponentContext} */
    xt
  ), n = e.e;
  if (n !== null) {
    e.e = null;
    for (var r of n)
      ho(r);
  }
  return t !== void 0 && (e.x = t), e.i = !0, xt = e.p, Ni(t);
}
function Ni(t = {}) {
  return Il(t, Ul, { value: !0 }), t;
}
function Vl() {
  return !0;
}
let Yn = [];
function Yl() {
  var t = Yn;
  Yn = [], hc(t);
}
function fn(t) {
  if (Yn.length === 0 && !ur) {
    var e = Yn;
    queueMicrotask(() => {
      e === Yn && Yl();
    });
  }
  Yn.push(t);
}
function Jc() {
  for (; Yn.length > 0; )
    Yl();
}
const Wc = -7169;
function lt(t, e) {
  t.f = t.f & Wc | e;
}
function Li(t) {
  (t.f & Vt) !== 0 || t.deps === null ? lt(t, bt) : lt(t, an);
}
function Jl(t) {
  if (t !== null)
    for (const e of t)
      (e.f & yt) === 0 || (e.f & us) === 0 || (e.f ^= us, Jl(
        /** @type {Derived} */
        e.deps
      ));
}
function Wl(t, e, n) {
  (t.f & mt) !== 0 ? e.add(t) : (t.f & an) !== 0 && n.add(t), Jl(t.deps), lt(t, bt);
}
let fa = !1;
function Xc(t) {
  var e = fa;
  try {
    return fa = !1, [t(), fa];
  } finally {
    fa = e;
  }
}
function Xl(t, e) {
  {
    const n = document.body;
    t.autofocus = !0, fn(() => {
      document.activeElement === n && t.focus();
    });
  }
}
let al = !1;
function Zc() {
  al || (al = !0, document.addEventListener(
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
            (e = n[ma]) == null || e.call(n);
      });
    },
    // In the capture phase to guarantee we get noticed of it (no possibility of stopPropagation)
    { capture: !0 }
  ));
}
function Zs(t) {
  var e = je, n = Fe;
  Jt(null), gn(null);
  try {
    return t();
  } finally {
    Jt(e), gn(n);
  }
}
function Ri(t, e, n, r = n) {
  t.addEventListener(e, () => Zs(n));
  const a = (
    /** @type {any} */
    t[ma]
  );
  a ? t[ma] = () => {
    a(), r(!0);
  } : t[ma] = () => r(!0), Zc();
}
function Qc(t, e, n, r) {
  const a = vr;
  var i = t.filter((p) => !p.settled), l = e.map(a);
  if (n.length === 0 && i.length === 0) {
    r(l);
    return;
  }
  var o = (
    /** @type {Effect} */
    Fe
  ), u = $c(), v = i.length === 1 ? i[0].promise : i.length > 1 ? Promise.all(i.map((p) => p.promise)) : null;
  function _(p) {
    if ((o.f & Lt) === 0) {
      u();
      try {
        r([...l, ...p]);
      } catch (b) {
        dn(b, o);
      }
      Pa();
    }
  }
  var S = Zl();
  if (n.length === 0) {
    v.then(() => _([])).finally(S);
    return;
  }
  function g() {
    Promise.all(n.map((p) => /* @__PURE__ */ eu(p))).then(_).catch((p) => dn(p, o)).finally(S);
  }
  v ? v.then(() => {
    u(), g(), Pa();
  }) : g();
}
function $c() {
  var t = (
    /** @type {Effect} */
    Fe
  ), e = je, n = xt, r = (
    /** @type {Batch} */
    _e
  );
  return function(i = !0) {
    gn(t), Jt(e), Ks(n), i && (t.f & Lt) === 0 && (r == null || r.activate(), r == null || r.apply());
  };
}
function Pa(t = !0) {
  gn(null), Jt(null), Ks(null), t && (_e == null || _e.deactivate());
}
function Zl() {
  var t = (
    /** @type {Effect} */
    Fe
  ), e = t.b, n = (
    /** @type {Batch} */
    _e
  ), r = !!(e != null && e.is_rendered());
  return e == null || e.update_pending_count(1, n), n.increment(r, t), () => {
    e == null || e.update_pending_count(-1, n), n.decrement(r, t);
  };
}
// @__NO_SIDE_EFFECTS__
function vr(t) {
  var e = yt | mt;
  return Fe !== null && (Fe.f |= Xs), {
    ctx: xt,
    deps: null,
    effects: null,
    equals: Kl,
    f: e,
    fn: t,
    reactions: null,
    rv: 0,
    v: (
      /** @type {V} */
      gt
    ),
    wv: 0,
    parent: Fe,
    ac: null
  };
}
const sr = Symbol("obsolete");
// @__NO_SIDE_EFFECTS__
function eu(t, e, n) {
  let r = (
    /** @type {Effect | null} */
    Fe
  );
  r === null && Rc();
  var a = (
    /** @type {Promise<V>} */
    /** @type {unknown} */
    void 0
  ), i = vs(
    /** @type {V} */
    gt
  ), l = !je, o = /* @__PURE__ */ new Set();
  return gu(() => {
    var p, b;
    var u = (
      /** @type {Effect} */
      Fe
    ), v = Fl();
    a = v.promise;
    try {
      Promise.resolve(t()).then(v.resolve, (M) => {
        M !== ra && v.reject(M);
      }).finally(Pa);
    } catch (M) {
      v.reject(M), Pa();
    }
    var _ = (
      /** @type {Batch} */
      _e
    );
    if (l) {
      if ((u.f & Ws) !== 0)
        var S = Zl();
      if (
        // boundary can be null if the async derived is inside an $effect.root not connected to the component render tree
        (p = r.b) != null && p.is_rendered()
      )
        (b = _.async_deriveds.get(u)) == null || b.reject(sr);
      else
        for (const M of o.values())
          M.reject(sr);
      o.add(v), _.async_deriveds.set(u, v);
    }
    const g = (M, k = void 0) => {
      S == null || S(), o.delete(v), k !== sr && (_.activate(), k ? (i.f |= Bn, Gs(i, k)) : ((i.f & Bn) !== 0 && (i.f ^= Bn), Gs(i, M)), _.deactivate());
    };
    v.promise.then(g, (M) => g(null, M || "unknown"));
  }), Bi(() => {
    for (const u of o)
      u.reject(sr);
  }), new Promise((u) => {
    function v(_) {
      function S() {
        _ === a ? u(i) : v(a);
      }
      _.then(S, S);
    }
    v(a);
  });
}
// @__NO_SIDE_EFFECTS__
function se(t) {
  const e = /* @__PURE__ */ vr(t);
  return _o(e), e;
}
// @__NO_SIDE_EFFECTS__
function Ql(t) {
  const e = /* @__PURE__ */ vr(t);
  return e.equals = Gl, e;
}
function tu(t) {
  var e = t.effects;
  if (e !== null) {
    t.effects = null;
    for (var n = 0; n < e.length; n += 1)
      Rt(
        /** @type {Effect} */
        e[n]
      );
  }
}
function Ii(t) {
  var e, n = Fe, r = t.parent;
  if (!Cn && r !== null && t.v !== gt && // if it was never evaluated before, it's guaranteed to fail downstream, so we try to execute instead
  (r.f & (Lt | Ot)) !== 0)
    return Pc(), t.v;
  gn(r);
  try {
    t.f &= ~us, tu(t), e = xo(t);
  } finally {
    gn(n);
  }
  return e;
}
function $l(t) {
  var e = Ii(t);
  if (!t.equals(e) && (t.wv = ko(), (!(_e != null && _e.is_fork) || t.deps === null) && (_e !== null ? (_e.capture(t, e, !0), cr == null || cr.capture(t, e, !0)) : t.v = e, t.deps === null))) {
    lt(t, bt);
    return;
  }
  Cn || (kt !== null ? (Fi() || _e != null && _e.is_fork) && kt.set(t, e) : Li(t));
}
function nu(t) {
  var e;
  if (t.effects !== null)
    for (const n of t.effects)
      (n.teardown || n.ac) && ((e = n.teardown) == null || e.call(n), n.ac !== null && Zs(() => {
        n.ac.abort(ra), n.ac = null;
      }), n.fn !== null && (n.teardown = ql), fr(n, 0), Hi(n));
}
function eo(t) {
  if (t.effects !== null)
    for (const e of t.effects)
      e.teardown && e.fn !== null && Vs(e);
}
let Qa = null, ys = null, _e = null, cr = null, kt = null, vi = null, ur = !1, $a = !1, xs = null, ya = null;
var il = 0;
let su = 1;
var Cs, Rn, Zn, Os, Ps, zs, kn, Ds, Dt, br, wn, $t, ln, Ns, Qn, Ve, fi, rr, hi, to, no, ks, ru, ar;
const Ia = class Ia {
  constructor() {
    H(this, Ve);
    vt(this, "id", su++);
    /** True as soon as `#process` was called */
    H(this, Cs, !1);
    vt(this, "linked", !0);
    /** @type {Batch | null} */
    H(this, Rn, null);
    /** @type {Batch | null} */
    H(this, Zn, null);
    /** @type {Map<Effect, ReturnType<typeof deferred<any>>>} */
    vt(this, "async_deriveds", /* @__PURE__ */ new Map());
    /**
     * The current values of any signals that are updated in this batch.
     * Tuple format: [value, is_derived] (note: is_derived is false for deriveds, too, if they were overridden via assignment)
     * They keys of this map are identical to `this.#previous`
     * @type {Map<Value, [any, boolean]>}
     */
    vt(this, "current", /* @__PURE__ */ new Map());
    /**
     * The values of any signals (sources and deriveds) that are updated in this batch _before_ those updates took place.
     * They keys of this map are identical to `this.#current`
     * @type {Map<Value, any>}
     */
    vt(this, "previous", /* @__PURE__ */ new Map());
    /**
     * When the batch is committed (and the DOM is updated), we need to remove old branches
     * and append new ones by calling the functions added inside (if/each/key/etc) blocks
     * @type {Set<(batch: Batch) => void>}
     */
    H(this, Os, /* @__PURE__ */ new Set());
    /**
     * If a fork is discarded, we need to destroy any effects that are no longer needed
     * @type {Set<(batch: Batch) => void>}
     */
    H(this, Ps, /* @__PURE__ */ new Set());
    /**
     * The number of async effects that are currently in flight
     */
    H(this, zs, 0);
    /**
     * Async effects that are currently in flight, _not_ inside a pending boundary
     * @type {Map<Effect, number>}
     */
    H(this, kn, /* @__PURE__ */ new Map());
    /**
     * A deferred that resolves when the batch is committed, used with `settled()`
     * TODO replace with Promise.withResolvers once supported widely enough
     * @type {{ promise: Promise<void>, resolve: (value?: any) => void, reject: (reason: unknown) => void } | null}
     */
    H(this, Ds, null);
    /**
     * The root effects that need to be flushed
     * @type {Effect[]}
     */
    H(this, Dt, []);
    /**
     * Effects created while this batch was active.
     * @type {Effect[]}
     */
    H(this, br, []);
    /**
     * Deferred effects (which run after async work has completed) that are DIRTY
     * @type {Set<Effect>}
     */
    H(this, wn, /* @__PURE__ */ new Set());
    /**
     * Deferred effects that are MAYBE_DIRTY
     * @type {Set<Effect>}
     */
    H(this, $t, /* @__PURE__ */ new Set());
    /**
     * A map of branches that still exist, but will be destroyed when this batch
     * is committed — we skip over these during `process`.
     * The value contains child effects that were dirty/maybe_dirty before being reset,
     * so they can be rescheduled if the branch survives.
     * @type {Map<Effect, { d: Effect[], m: Effect[] }>}
     */
    H(this, ln, /* @__PURE__ */ new Map());
    /**
     * Inverse of #skipped_branches which we need to tell prior batches to unskip them when committing
     * @type {Set<Effect>}
     */
    H(this, Ns, /* @__PURE__ */ new Set());
    vt(this, "is_fork", !1);
    H(this, Qn, !1);
    ys === null ? Qa = ys = this : (re(ys, Zn, this), re(this, Rn, ys)), ys = this;
  }
  /**
   * Add an effect to the #skipped_branches map and reset its children
   * @param {Effect} effect
   */
  skip_effect(e) {
    c(this, ln).has(e) || c(this, ln).set(e, { d: [], m: [] }), c(this, Ns).delete(e);
  }
  /**
   * Remove an effect from the #skipped_branches map and reschedule
   * any tracked dirty/maybe_dirty child effects
   * @param {Effect} effect
   * @param {(e: Effect) => void} callback
   */
  unskip_effect(e, n = (r) => this.schedule(r)) {
    var r = c(this, ln).get(e);
    if (r) {
      c(this, ln).delete(e);
      for (var a of r.d)
        lt(a, mt), n(a);
      for (a of r.m)
        lt(a, an), n(a);
    }
    c(this, Ns).add(e);
  }
  /**
   * Associate a change to a given source with the current
   * batch, noting its previous and current values
   * @param {Value} source
   * @param {any} value
   * @param {boolean} [is_derived]
   */
  capture(e, n, r = !1) {
    e.v !== gt && !this.previous.has(e) && this.previous.set(e, e.v), (e.f & Bn) === 0 && (this.current.set(e, [n, r]), kt == null || kt.set(e, n)), this.is_fork || (e.v = n);
  }
  activate() {
    _e = this;
  }
  deactivate() {
    _e = null, kt = null;
  }
  flush() {
    try {
      $a = !0, _e = this, pe(this, Ve, rr).call(this);
    } finally {
      il = 0, vi = null, xs = null, ya = null, $a = !1, _e = null, kt = null, hn.clear();
    }
  }
  discard() {
    var e;
    for (const n of c(this, Ps)) n(this);
    c(this, Ps).clear();
    for (const n of this.async_deriveds.values())
      n.reject(sr);
    pe(this, Ve, ar).call(this), (e = c(this, Ds)) == null || e.resolve();
  }
  /**
   * @param {Effect} effect
   */
  register_created_effect(e) {
    c(this, br).push(e);
  }
  /**
   * @param {boolean} blocking
   * @param {Effect} effect
   */
  increment(e, n) {
    if (re(this, zs, c(this, zs) + 1), e) {
      let r = c(this, kn).get(n) ?? 0;
      c(this, kn).set(n, r + 1);
    }
  }
  /**
   * @param {boolean} blocking
   * @param {Effect} effect
   */
  decrement(e, n) {
    if (re(this, zs, c(this, zs) - 1), e) {
      let r = c(this, kn).get(n) ?? 0;
      r === 1 ? c(this, kn).delete(n) : c(this, kn).set(n, r - 1);
    }
    c(this, Qn) || (re(this, Qn, !0), fn(() => {
      re(this, Qn, !1), this.linked && this.flush();
    }));
  }
  /**
   * @param {Set<Effect>} dirty_effects
   * @param {Set<Effect>} maybe_dirty_effects
   */
  transfer_effects(e, n) {
    for (const r of e)
      c(this, wn).add(r);
    for (const r of n)
      c(this, $t).add(r);
    e.clear(), n.clear();
  }
  /** @param {(batch: Batch) => void} fn */
  oncommit(e) {
    c(this, Os).add(e);
  }
  /** @param {(batch: Batch) => void} fn */
  ondiscard(e) {
    c(this, Ps).add(e);
  }
  settled() {
    return (c(this, Ds) ?? re(this, Ds, Fl())).promise;
  }
  static ensure() {
    if (_e === null) {
      const e = _e = new Ia();
      !$a && !ur && fn(() => {
        c(e, Cs) || e.flush();
      });
    }
    return _e;
  }
  apply() {
    {
      kt = null;
      return;
    }
  }
  /**
   *
   * @param {Effect} effect
   */
  schedule(e) {
    var a;
    if (vi = e, (a = e.b) != null && a.is_pending && (e.f & (Hs | Ka | Bl)) !== 0 && (e.f & Ws) === 0) {
      e.b.defer_effect(e);
      return;
    }
    for (var n = e; n.parent !== null; ) {
      n = n.parent;
      var r = n.f;
      if (xs !== null && n === Fe && (je === null || (je.f & yt) === 0))
        return;
      if ((r & (An | Yt)) !== 0) {
        if ((r & bt) === 0)
          return;
        n.f ^= bt;
      }
    }
    c(this, Dt).push(n);
  }
};
Cs = new WeakMap(), Rn = new WeakMap(), Zn = new WeakMap(), Os = new WeakMap(), Ps = new WeakMap(), zs = new WeakMap(), kn = new WeakMap(), Ds = new WeakMap(), Dt = new WeakMap(), br = new WeakMap(), wn = new WeakMap(), $t = new WeakMap(), ln = new WeakMap(), Ns = new WeakMap(), Qn = new WeakMap(), Ve = new WeakSet(), fi = function() {
  if (this.is_fork) return !0;
  for (const r of c(this, kn).keys()) {
    for (var e = r, n = !1; e.parent !== null; ) {
      if (c(this, ln).has(e)) {
        n = !0;
        break;
      }
      e = e.parent;
    }
    if (!n)
      return !0;
  }
  return !1;
}, rr = function() {
  var u, v, _, S;
  re(this, Cs, !0), il++ > 1e3 && (pe(this, Ve, ar).call(this), iu());
  for (const g of c(this, wn))
    c(this, $t).delete(g), lt(g, mt), this.schedule(g);
  for (const g of c(this, $t))
    lt(g, an), this.schedule(g);
  const e = c(this, Dt);
  re(this, Dt, []), this.apply();
  var n = xs = [], r = [], a = ya = [];
  for (const g of e)
    try {
      pe(this, Ve, hi).call(this, g, n, r);
    } catch (p) {
      throw ao(g), pe(this, Ve, fi).call(this) || this.discard(), p;
    }
  if (_e = null, a.length > 0) {
    var i = Ia.ensure();
    for (const g of a)
      i.schedule(g);
  }
  if (xs = null, ya = null, pe(this, Ve, fi).call(this)) {
    pe(this, Ve, ks).call(this, r), pe(this, Ve, ks).call(this, n);
    for (const [g, p] of c(this, ln))
      ro(g, p);
    a.length > 0 && /** @type {unknown} */
    pe(u = _e, Ve, rr).call(u);
    return;
  }
  const l = pe(this, Ve, to).call(this);
  if (l) {
    pe(this, Ve, ks).call(this, r), pe(this, Ve, ks).call(this, n), pe(v = l, Ve, no).call(v, this);
    return;
  }
  c(this, wn).clear(), c(this, $t).clear();
  for (const g of c(this, Os)) g(this);
  c(this, Os).clear(), cr = this, ll(r), ll(n), cr = null, (_ = c(this, Ds)) == null || _.resolve();
  var o = (
    /** @type {Batch | null} */
    /** @type {unknown} */
    _e
  );
  if (c(this, zs) === 0 && (c(this, Dt).length === 0 || o !== null) && pe(this, Ve, ar).call(this), c(this, Dt).length > 0)
    if (o !== null) {
      const g = o;
      c(g, Dt).push(...c(this, Dt).filter((p) => !c(g, Dt).includes(p)));
    } else
      o = this;
  o !== null && (hn.clear(), pe(S = o, Ve, rr).call(S));
}, /**
 * Traverse the effect tree, executing effects or stashing
 * them for later execution as appropriate
 * @param {Effect} root
 * @param {Effect[]} effects
 * @param {Effect[]} render_effects
 */
hi = function(e, n, r) {
  e.f ^= bt;
  for (var a = e.first; a !== null; ) {
    var i = a.f, l = (i & (Yt | An)) !== 0, o = l && (i & bt) !== 0, u = o || (i & Ot) !== 0 || c(this, ln).has(a);
    if (!u && a.fn !== null) {
      l ? a.f ^= bt : (i & Hs) !== 0 ? n.push(a) : la(a) && ((i & sn) !== 0 && c(this, $t).add(a), Vs(a));
      var v = a.first;
      if (v !== null) {
        a = v;
        continue;
      }
    }
    for (; a !== null; ) {
      var _ = a.next;
      if (_ !== null) {
        a = _;
        break;
      }
      a = a.parent;
    }
  }
}, to = function() {
  for (var e = c(this, Rn); e !== null; ) {
    if (!e.is_fork) {
      for (const [n, [, r]] of this.current)
        if (e.current.has(n) && !r)
          return e;
    }
    e = c(e, Rn);
  }
  return null;
}, /**
 * @param {Batch} batch
 */
no = function(e) {
  var r;
  for (const [a, i] of e.current)
    !this.previous.has(a) && e.previous.has(a) && this.previous.set(a, e.previous.get(a)), this.current.set(a, i);
  for (const [a, i] of e.async_deriveds) {
    const l = this.async_deriveds.get(a);
    l && i.promise.then(l.resolve).catch(l.reject);
  }
  e.async_deriveds.clear(), this.transfer_effects(c(e, wn), c(e, $t));
  const n = (a) => {
    var i = a.reactions;
    if (i !== null && !((a.f & yt) !== 0 && (a.f & (mt | an)) === 0))
      for (const u of i) {
        var l = u.f;
        if ((l & yt) !== 0)
          n(
            /** @type {Derived} */
            u
          );
        else {
          var o = (
            /** @type {Effect} */
            u
          );
          l & (Es | sn) && !this.async_deriveds.has(o) && (c(this, $t).delete(o), lt(o, mt), this.schedule(o));
        }
      }
  };
  for (const a of this.current.keys())
    n(a);
  this.oncommit(() => e.discard()), pe(r = e, Ve, ar).call(r), _e = this, pe(this, Ve, rr).call(this);
}, /**
 * @param {Effect[]} effects
 */
ks = function(e) {
  for (var n = 0; n < e.length; n += 1)
    Wl(e[n], c(this, wn), c(this, $t));
}, ru = function() {
  var S;
  for (let g = Qa; g !== null; g = c(g, Zn)) {
    var e = g.id < this.id, n = [];
    for (const [p, [b, M]] of this.current) {
      if (g.current.has(p)) {
        var r = (
          /** @type {[any, boolean]} */
          g.current.get(p)[0]
        );
        if (e && b !== r)
          g.current.set(p, [b, M]);
        else
          continue;
      }
      n.push(p);
    }
    if (e)
      for (const [p, b] of this.async_deriveds) {
        const M = g.async_deriveds.get(p);
        M && b.promise.then(M.resolve).catch(M.reject);
      }
    var a = [...g.current.keys()].filter(
      (p) => !/** @type {[any, boolean]} */
      g.current.get(p)[1]
    );
    if (!(!c(g, Cs) || a.length === 0)) {
      var i = a.filter((p) => !this.current.has(p));
      if (i.length === 0)
        e && g.discard();
      else if (n.length > 0) {
        if (e)
          for (const p of c(this, Ns))
            g.unskip_effect(p, (b) => {
              var M;
              (b.f & (sn | Es)) !== 0 ? g.schedule(b) : pe(M = g, Ve, ks).call(M, [b]);
            });
        g.activate();
        var l = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Map();
        for (var u of n)
          so(u, i, l, o);
        o = /* @__PURE__ */ new Map();
        var v = [...g.current].filter(([p, b]) => {
          const M = this.current.get(p);
          return M ? M[0] !== b[0] || M[1] !== b[1] : !0;
        }).map(([p]) => p);
        if (v.length > 0)
          for (const p of c(this, br))
            (p.f & (Lt | Ot | Ca)) === 0 && ji(p, v, o) && ((p.f & (Es | sn)) !== 0 ? (lt(p, mt), g.schedule(p)) : c(g, wn).add(p));
        if (c(g, Dt).length > 0 && !c(g, Qn)) {
          g.apply();
          for (var _ of c(g, Dt))
            pe(S = g, Ve, hi).call(S, _, [], []);
          re(g, Dt, []);
        }
        g.deactivate();
      }
    }
  }
}, ar = function() {
  if (this.linked) {
    var e = c(this, Rn), n = c(this, Zn);
    e === null ? Qa = n : re(e, Zn, n), n === null ? ys = e : re(n, Rn, e), this.linked = !1;
  }
};
let ds = Ia;
function au(t) {
  var e = ur;
  ur = !0;
  try {
    for (var n; ; ) {
      if (Jc(), _e === null)
        return (
          /** @type {T} */
          n
        );
      _e.flush();
    }
  } finally {
    ur = e;
  }
}
function iu() {
  try {
    Bc();
  } catch (t) {
    dn(t, vi);
  }
}
let Qt = null;
function ll(t) {
  var e = t.length;
  if (e !== 0) {
    for (var n = 0; n < e; ) {
      var r = t[n++];
      if ((r.f & (Lt | Ot)) === 0 && la(r) && (Qt = /* @__PURE__ */ new Set(), Vs(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && go(r), (Qt == null ? void 0 : Qt.size) > 0)) {
        hn.clear();
        for (const a of Qt) {
          if ((a.f & (Lt | Ot)) !== 0) continue;
          const i = [a];
          let l = a.parent;
          for (; l !== null; )
            Qt.has(l) && (Qt.delete(l), i.push(l)), l = l.parent;
          for (let o = i.length - 1; o >= 0; o--) {
            const u = i[o];
            (u.f & (Lt | Ot)) === 0 && Vs(u);
          }
        }
        Qt.clear();
      }
    }
    Qt = null;
  }
}
function so(t, e, n, r) {
  if (!n.has(t) && (n.add(t), t.reactions !== null))
    for (const a of t.reactions) {
      const i = a.f;
      (i & yt) !== 0 ? so(
        /** @type {Derived} */
        a,
        e,
        n,
        r
      ) : (i & (Es | sn)) !== 0 && (i & mt) === 0 && ji(a, e, r) && (lt(a, mt), qi(
        /** @type {Effect} */
        a
      ));
    }
}
function ji(t, e, n) {
  const r = n.get(t);
  if (r !== void 0) return r;
  if (t.deps !== null)
    for (const a of t.deps) {
      if (Ta.call(e, a))
        return !0;
      if ((a.f & yt) !== 0 && ji(
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
function qi(t) {
  _e.schedule(t);
}
function ro(t, e) {
  if (!((t.f & Yt) !== 0 && (t.f & bt) !== 0)) {
    (t.f & mt) !== 0 ? e.d.push(t) : (t.f & an) !== 0 && e.m.push(t), lt(t, bt);
    for (var n = t.first; n !== null; )
      ro(n, e), n = n.next;
  }
}
function ao(t) {
  lt(t, bt);
  for (var e = t.first; e !== null; )
    ao(e), e = e.next;
}
let za = /* @__PURE__ */ new Set();
const hn = /* @__PURE__ */ new Map();
let io = !1;
function vs(t, e) {
  var n = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: t,
    reactions: null,
    equals: Kl,
    rv: 0,
    wv: 0
  };
  return n;
}
// @__NO_SIDE_EFFECTS__
function q(t, e) {
  const n = vs(t);
  return _o(n), n;
}
// @__NO_SIDE_EFFECTS__
function lu(t, e = !1, n = !0) {
  const r = vs(t);
  return e || (r.equals = Gl), r;
}
function m(t, e, n = !1) {
  je !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!rn || (je.f & Ca) !== 0) && Vl() && (je.f & (yt | sn | Es | Ca)) !== 0 && (pn === null || !pn.has(t)) && Gc();
  let r = n ? et(e) : e;
  return Gs(t, r, ya);
}
function Gs(t, e, n = null) {
  if (!t.equals(e)) {
    Cn ? hn.set(t, e) : hn.has(t) || hn.set(t, t.v);
    var r = ds.ensure();
    if (r.capture(t, e), (t.f & yt) !== 0) {
      const a = (
        /** @type {Derived} */
        t
      );
      (t.f & mt) !== 0 && Ii(a), kt === null && Li(a);
    }
    t.wv = ko(), lo(t, mt, n), Fe !== null && (Fe.f & bt) !== 0 && (Fe.f & (Yt | An)) === 0 && (Ut === null ? _u([t]) : Ut.push(t)), !r.is_fork && za.size > 0 && !io && ou();
  }
  return e;
}
function ou() {
  io = !1;
  for (const t of za) {
    (t.f & bt) !== 0 && lt(t, an);
    let e;
    try {
      e = la(t);
    } catch {
      e = !0;
    }
    e && Vs(t);
  }
  za.clear();
}
function dr(t) {
  m(t, t.v + 1);
}
function lo(t, e, n) {
  var r = t.reactions;
  if (r !== null)
    for (var a = r.length, i = 0; i < a; i++) {
      var l = r[i], o = l.f, u = (o & mt) === 0;
      if (u && lt(l, e), (o & Ca) !== 0)
        za.add(
          /** @type {Effect} */
          l
        );
      else if ((o & yt) !== 0) {
        var v = (
          /** @type {Derived} */
          l
        );
        kt == null || kt.delete(v), (o & us) === 0 && (o & Vt && (Fe === null || (Fe.f & Oa) === 0) && (l.f |= us), lo(v, an, n));
      } else if (u) {
        var _ = (
          /** @type {Effect} */
          l
        );
        (o & sn) !== 0 && Qt !== null && Qt.add(_), n !== null ? n.push(_) : qi(_);
      }
    }
}
function et(t) {
  if (typeof t != "object" || t === null || is in t || Ul in t)
    return t;
  const e = zi(t);
  if (e !== jl && e !== fc)
    return t;
  var n = /* @__PURE__ */ new Map(), r = sa(t), a = /* @__PURE__ */ q(0), i = os, l = (o) => {
    if (os === i)
      return o();
    var u = je, v = os;
    Jt(null), dl(i);
    var _ = o();
    return Jt(u), dl(v), _;
  };
  return r && n.set("length", /* @__PURE__ */ q(
    /** @type {any[]} */
    t.length
  )), new Proxy(
    /** @type {any} */
    t,
    {
      defineProperty(o, u, v) {
        (!("value" in v) || v.configurable === !1 || v.enumerable === !1 || v.writable === !1) && Hc();
        var _ = n.get(u);
        return _ === void 0 ? l(() => {
          var S = /* @__PURE__ */ q(v.value);
          return n.set(u, S), S;
        }) : m(_, v.value, !0), !0;
      },
      deleteProperty(o, u) {
        var v = n.get(u);
        if (v === void 0) {
          if (u in o) {
            const _ = l(() => /* @__PURE__ */ q(gt));
            n.set(u, _), dr(a);
          }
        } else
          m(v, gt), dr(a);
        return !0;
      },
      get(o, u, v) {
        var p;
        if (u === is)
          return t;
        var _ = n.get(u), S = u in o;
        if (_ === void 0 && (!S || (p = Ss(o, u)) != null && p.writable) && (_ = l(() => {
          var b = et(S ? o[u] : gt), M = /* @__PURE__ */ q(b);
          return M;
        }), n.set(u, _)), _ !== void 0) {
          var g = s(_);
          return g === gt ? void 0 : g;
        }
        return Reflect.get(o, u, v);
      },
      getOwnPropertyDescriptor(o, u) {
        var v = Reflect.getOwnPropertyDescriptor(o, u);
        if (v && "value" in v) {
          var _ = n.get(u);
          _ && (v.value = s(_));
        } else if (v === void 0) {
          var S = n.get(u), g = S == null ? void 0 : S.v;
          if (S !== void 0 && g !== gt)
            return {
              enumerable: !0,
              configurable: !0,
              value: g,
              writable: !0
            };
        }
        return v;
      },
      has(o, u) {
        var g;
        if (u === is)
          return !0;
        var v = n.get(u), _ = v !== void 0 && v.v !== gt || Reflect.has(o, u);
        if (v !== void 0 || Fe !== null && (!_ || (g = Ss(o, u)) != null && g.writable)) {
          v === void 0 && (v = l(() => {
            var p = _ ? et(o[u]) : gt, b = /* @__PURE__ */ q(p);
            return b;
          }), n.set(u, v));
          var S = s(v);
          if (S === gt)
            return !1;
        }
        return _;
      },
      set(o, u, v, _) {
        var D;
        var S = n.get(u), g = u in o;
        if (r && u === "length")
          for (var p = v; p < /** @type {Source<number>} */
          S.v; p += 1) {
            var b = n.get(p + "");
            b !== void 0 ? m(b, gt) : p in o && (b = l(() => /* @__PURE__ */ q(gt)), n.set(p + "", b));
          }
        if (S === void 0)
          (!g || (D = Ss(o, u)) != null && D.writable) && (S = l(() => /* @__PURE__ */ q(void 0)), m(S, et(v)), n.set(u, S));
        else {
          g = S.v !== gt;
          var M = l(() => et(v));
          m(S, M);
        }
        var k = Reflect.getOwnPropertyDescriptor(o, u);
        if (k != null && k.set && k.set.call(_, v), !g) {
          if (r && typeof u == "string") {
            var C = (
              /** @type {Source<number>} */
              n.get("length")
            ), O = Number(u);
            Number.isInteger(O) && O >= C.v && m(C, O + 1);
          }
          dr(a);
        }
        return !0;
      },
      ownKeys(o) {
        s(a);
        var u = Reflect.ownKeys(o).filter((S) => {
          var g = n.get(S);
          return g === void 0 || g.v !== gt;
        });
        for (var [v, _] of n)
          _.v !== gt && !(v in o) && u.push(v);
        return u;
      },
      setPrototypeOf() {
        Kc();
      }
    }
  );
}
function ol(t) {
  try {
    if (t !== null && typeof t == "object" && is in t)
      return t[is];
  } catch {
  }
  return t;
}
function oo(t, e) {
  return Object.is(ol(t), ol(e));
}
var cl, co, uo, vo;
function cu() {
  if (cl === void 0) {
    cl = window, co = /Firefox/.test(navigator.userAgent);
    var t = Element.prototype, e = Node.prototype, n = Text.prototype;
    uo = Ss(e, "firstChild").get, vo = Ss(e, "nextSibling").get, rl(t) && (t[ui] = void 0, t[ba] = null, t[di] = void 0, t.__e = void 0), rl(n) && (n[nr] = void 0);
  }
}
function Tn(t = "") {
  return document.createTextNode(t);
}
// @__NO_SIDE_EFFECTS__
function fs(t) {
  return (
    /** @type {TemplateNode | null} */
    uo.call(t)
  );
}
// @__NO_SIDE_EFFECTS__
function aa(t) {
  return (
    /** @type {TemplateNode | null} */
    vo.call(t)
  );
}
function h(t, e) {
  return /* @__PURE__ */ fs(t);
}
function Te(t, e = !1) {
  {
    var n = /* @__PURE__ */ fs(t);
    return n instanceof Comment && n.data === "" ? /* @__PURE__ */ aa(n) : n;
  }
}
function $(t, e = !1) {
  return /* @__PURE__ */ fs(t);
}
function d(t, e = 1, n = !1) {
  let r = t;
  for (; e--; )
    r = /** @type {TemplateNode} */
    /* @__PURE__ */ aa(r);
  return r;
}
function uu(t) {
  t.textContent = "";
}
function fo() {
  return !1;
}
function du(t, e, n) {
  return (
    /** @type {T extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[T] : Element} */
    n ? document.createElement(t, { is: n }) : document.createElement(t)
  );
}
function vu(t) {
  var e = Fe;
  if (e === null)
    return je.f |= Bn, t;
  if ((e.f & Ws) === 0 && (e.f & Hs) === 0)
    throw t;
  dn(t, e);
}
function dn(t, e) {
  if (!(e !== null && (e.f & Lt) !== 0)) {
    for (; e !== null; ) {
      if ((e.f & ci) !== 0 && (e.f & (Lt | Aa)) === 0) {
        if ((e.f & Ws) === 0)
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
function fu(t) {
  Fe === null && (je === null && Fc(), qc()), Cn && jc();
}
function hu(t, e) {
  var n = e.last;
  n === null ? e.last = e.first = t : (n.next = t, t.prev = n, e.last = t);
}
function Pn(t, e) {
  var n = Fe;
  n !== null && (n.f & Ot) !== 0 && (t |= Ot);
  var r = {
    ctx: xt,
    deps: null,
    nodes: null,
    f: t | mt | Vt,
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
  _e == null || _e.register_created_effect(r);
  var a = r;
  if ((t & Hs) !== 0)
    xs !== null ? xs.push(r) : ds.ensure().schedule(r);
  else if (e !== null) {
    try {
      Vs(r);
    } catch (l) {
      throw Rt(r), l;
    }
    a.deps === null && a.teardown === null && a.nodes === null && a.first === a.last && // either `null`, or a singular child
    (a.f & Xs) === 0 && (a = a.first, (t & sn) !== 0 && (t & cs) !== 0 && a !== null && (a.f |= cs));
  }
  if (a !== null && (a.parent = n, n !== null && hu(a, n), je !== null && (je.f & yt) !== 0 && (t & An) === 0)) {
    var i = (
      /** @type {Derived} */
      je
    );
    (i.effects ?? (i.effects = [])).push(a);
  }
  return r;
}
function Fi() {
  return je !== null && !rn;
}
function Bi(t) {
  const e = Pn(Ka, null);
  return lt(e, bt), e.teardown = t, e;
}
function _t(t) {
  fu();
  var e = (
    /** @type {Effect} */
    Fe.f
  ), n = !je && (e & Yt) !== 0 && xt !== null && !xt.i;
  if (n) {
    var r = (
      /** @type {ComponentContext} */
      xt
    );
    (r.e ?? (r.e = [])).push(t);
  } else
    return ho(t);
}
function ho(t) {
  return Pn(Hs | gc, t);
}
function pu(t) {
  ds.ensure();
  const e = Pn(An | Xs, t);
  return (n = {}) => new Promise((r) => {
    n.outro ? ls(e, () => {
      Rt(e), r(void 0);
    }) : (Rt(e), r(void 0));
  });
}
function Ui(t) {
  return Pn(Hs, t);
}
function gu(t) {
  return Pn(Es | Xs, t);
}
function Ga(t, e = 0) {
  return Pn(Ka | e, t);
}
function z(t, e = [], n = [], r = []) {
  Qc(r, e, n, (a) => {
    Pn(Ka, () => {
      t(...a.map(s));
    });
  });
}
function ia(t, e = 0) {
  var n = Pn(sn | e, t);
  return n;
}
function Gt(t) {
  return Pn(Yt | Xs, t);
}
function po(t) {
  var e = t.teardown;
  if (e !== null) {
    const n = Cn, r = je;
    ul(!0), Jt(null);
    try {
      e.call(null);
    } catch (a) {
      dn(a, t.parent);
    } finally {
      ul(n), Jt(r);
    }
  }
}
function Hi(t, e = !1) {
  var n = t.first;
  for (t.first = t.last = null; n !== null; ) {
    const a = n.ac;
    a !== null && Zs(() => {
      a.abort(ra);
    });
    var r = n.next;
    (n.f & An) !== 0 ? n.parent = null : Rt(n, e), n = r;
  }
}
function bu(t) {
  for (var e = t.first; e !== null; ) {
    var n = e.next;
    (e.f & Yt) === 0 && Rt(e), e = n;
  }
}
function Rt(t, e = !0) {
  var n = !1;
  (e || (t.f & pc) !== 0) && t.nodes !== null && t.nodes.end !== null && (mu(
    t.nodes.start,
    /** @type {TemplateNode} */
    t.nodes.end
  ), n = !0), t.f |= Aa, Hi(t, e && !n), fr(t, 0);
  var r = t.nodes && t.nodes.t;
  if (r !== null)
    for (const i of r)
      i.stop();
  po(t), t.f ^= Aa, t.f |= Lt;
  var a = t.parent;
  a !== null && a.first !== null && go(t), t.next = t.prev = t.teardown = t.ctx = t.deps = t.fn = t.nodes = t.ac = t.b = null;
}
function mu(t, e) {
  for (; t !== null; ) {
    var n = t === e ? null : /* @__PURE__ */ aa(t);
    t.remove(), t = n;
  }
}
function go(t) {
  var e = t.parent, n = t.prev, r = t.next;
  n !== null && (n.next = r), r !== null && (r.prev = n), e !== null && (e.first === t && (e.first = r), e.last === t && (e.last = n));
}
function ls(t, e, n = !0) {
  var r = [];
  t.f |= Di, bo(t, r, !0);
  var a = () => {
    n && Rt(t), e && e();
  }, i = r.length;
  if (i > 0) {
    var l = () => --i || a();
    for (var o of r)
      o.out(l);
  } else
    a();
}
function bo(t, e, n) {
  if ((t.f & Ot) === 0) {
    t.f ^= Ot;
    var r = t.nodes && t.nodes.t;
    if (r !== null)
      for (const o of r)
        (o.is_global || n) && e.push(o);
    for (var a = t.first; a !== null; ) {
      var i = a.next;
      if ((a.f & An) === 0) {
        var l = (a.f & cs) !== 0 || // If this is a branch effect without a block effect parent,
        // it means the parent block effect was pruned. In that case,
        // transparency information was transferred to the branch effect.
        (a.f & Yt) !== 0 && (t.f & sn) !== 0;
        bo(a, e, l ? n : !1);
      }
      a = i;
    }
  }
}
function Da(t) {
  t.f &= ~Di, mo(t, !0);
}
function mo(t, e) {
  if ((t.f & Di) === 0 && (t.f & Ot) !== 0) {
    t.f ^= Ot, (t.f & bt) === 0 && (lt(t, mt), ds.ensure().schedule(t));
    for (var n = t.first; n !== null; ) {
      var r = n.next, a = (n.f & cs) !== 0 || (n.f & Yt) !== 0;
      mo(n, a ? e : !1), n = r;
    }
    var i = t.nodes && t.nodes.t;
    if (i !== null)
      for (const l of i)
        (l.is_global || e) && l.in();
  }
}
function Ki(t, e) {
  if (t.nodes)
    for (var n = t.nodes.start, r = t.nodes.end; n !== null; ) {
      var a = n === r ? null : /* @__PURE__ */ aa(n);
      e.append(n), n = a;
    }
}
let ka = !1, Cn = !1;
function ul(t) {
  Cn = t;
}
let je = null, rn = !1;
function Jt(t) {
  je = t;
}
let Fe = null;
function gn(t) {
  Fe = t;
}
let pn = null;
function _o(t) {
  je !== null && (pn ?? (pn = /* @__PURE__ */ new Set())).add(t);
}
let Nt = null, Bt = 0, Ut = null;
function _u(t) {
  Ut = t;
}
let yo = 1, Jn = 0, os = Jn;
function dl(t) {
  os = t;
}
function ko() {
  return ++yo;
}
function la(t) {
  var e = t.f;
  if ((e & mt) !== 0)
    return !0;
  if (e & yt && (t.f &= ~us), (e & an) !== 0) {
    for (var n = (
      /** @type {Value[]} */
      t.deps
    ), r = n.length, a = 0; a < r; a++) {
      var i = n[a];
      if (la(
        /** @type {Derived} */
        i
      ) && $l(
        /** @type {Derived} */
        i
      ), i.wv > t.wv)
        return !0;
    }
    (e & Vt) !== 0 && // During time traveling we don't want to reset the status so that
    // traversal of the graph in the other batches still happens
    kt === null && lt(t, bt);
  }
  return !1;
}
function wo(t, e, n = !0) {
  var r = t.reactions;
  if (r !== null && !(pn !== null && pn.has(t)))
    for (var a = 0; a < r.length; a++) {
      var i = r[a];
      (i.f & yt) !== 0 ? wo(
        /** @type {Derived} */
        i,
        e,
        !1
      ) : e === i && (n ? lt(i, mt) : (i.f & bt) !== 0 && lt(i, an), qi(
        /** @type {Effect} */
        i
      ));
    }
}
function xo(t) {
  var e = Nt, n = Bt, r = Ut, a = je, i = pn, l = xt, o = rn, u = os, v = t.f;
  Nt = /** @type {null | Value[]} */
  null, Bt = 0, Ut = null, je = (v & (Yt | An)) === 0 ? t : null, pn = null, Ks(t.ctx), rn = !1, os = ++Jn, t.ac !== null && (Zs(() => {
    t.ac.abort(ra);
  }), t.ac = null);
  try {
    t.f |= Oa;
    var _ = (
      /** @type {Function} */
      t.fn
    ), S = _();
    t.f |= Ws;
    var g = vl(t);
    if (Vl() && Ut !== null && !rn && g !== null && (t.f & (yt | an | mt)) === 0)
      for (var p = 0; p < /** @type {Source[]} */
      Ut.length; p++)
        wo(
          Ut[p],
          /** @type {Effect} */
          t
        );
    if (a !== null && a !== t) {
      if (Jn++, a.deps !== null)
        for (let b = 0; b < n; b += 1)
          a.deps[b].rv = Jn;
      if (e !== null)
        for (const b of e)
          b.rv = Jn;
      Ut !== null && (r === null ? r = Ut : r.push(.../** @type {Source[]} */
      Ut));
    }
    return (t.f & Bn) !== 0 && (t.f ^= Bn), S;
  } catch (b) {
    return vl(t), vu(b);
  } finally {
    t.f ^= Oa, Nt = e, Bt = n, Ut = r, je = a, pn = i, Ks(l), rn = o, os = u;
  }
}
function vl(t) {
  var a;
  var e = t.deps, n = _e == null ? void 0 : _e.is_fork;
  if (Nt !== null) {
    var r;
    if (n || fr(t, Bt), e !== null && Bt > 0)
      for (e.length = Bt + Nt.length, r = 0; r < Nt.length; r++)
        e[Bt + r] = Nt[r];
    else
      t.deps = e = Nt;
    if (Fi() && (t.f & Vt) !== 0)
      for (r = Bt; r < e.length; r++)
        ((a = e[r]).reactions ?? (a.reactions = [])).push(t);
  } else !n && e !== null && Bt < e.length && (fr(t, Bt), e.length = Bt);
  return e;
}
function yu(t, e) {
  let n = e.reactions;
  if (n !== null) {
    var r = dc.call(n, t);
    if (r !== -1) {
      var a = n.length - 1;
      a === 0 ? n = e.reactions = null : (n[r] = n[a], n.pop());
    }
  }
  if (n === null && (e.f & yt) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (Nt === null || !Ta.call(Nt, e))) {
    var i = (
      /** @type {Derived} */
      e
    );
    (i.f & Vt) !== 0 && (i.f ^= Vt, i.f &= ~us), i.v !== gt && Li(i), i.ac !== null && Zs(() => {
      i.ac.abort(ra), i.ac = null, lt(i, mt);
    }), nu(i), fr(i, 0);
  }
}
function fr(t, e) {
  var n = t.deps;
  if (n !== null)
    for (var r = e; r < n.length; r++)
      yu(t, n[r]);
}
function Vs(t) {
  var e = t.f;
  if ((e & Lt) === 0) {
    lt(t, bt);
    var n = Fe, r = ka;
    Fe = t, ka = (e & (Yt | An)) === 0;
    try {
      (e & (sn | Bl)) !== 0 ? bu(t) : Hi(t), po(t);
      var a = xo(t);
      t.teardown = typeof a == "function" ? a : null, t.wv = yo;
      var i;
    } finally {
      ka = r, Fe = n;
    }
  }
}
async function ku() {
  await Promise.resolve(), au();
}
function s(t) {
  var e = t.f, n = (e & yt) !== 0;
  if (je !== null && !rn) {
    var r = Fe !== null && (Fe.f & Lt) !== 0;
    if (!r && (pn === null || !pn.has(t))) {
      var a = je.deps;
      if ((je.f & Oa) !== 0)
        t.rv < Jn && (t.rv = Jn, Nt === null && a !== null && a[Bt] === t ? Bt++ : Nt === null ? Nt = [t] : Nt.push(t));
      else {
        je.deps ?? (je.deps = []), Ta.call(je.deps, t) || je.deps.push(t);
        var i = t.reactions;
        i === null ? t.reactions = [je] : Ta.call(i, je) || i.push(je);
      }
    }
  }
  if (Cn && hn.has(t))
    return hn.get(t);
  if (n) {
    var l = (
      /** @type {Derived} */
      t
    );
    if (Cn) {
      var o = l.v;
      return ((l.f & bt) === 0 && l.reactions !== null || Eo(l)) && (o = Ii(l)), hn.set(l, o), o;
    }
    var u = (l.f & Vt) === 0 && !rn && je !== null && (ka || (je.f & Vt) !== 0), v = (l.f & Ws) === 0;
    la(l) && (u && (l.f |= Vt), $l(l)), u && !v && (eo(l), So(l));
  }
  if (kt != null && kt.has(t))
    return kt.get(t);
  if ((t.f & Bn) !== 0)
    throw t.v;
  return t.v;
}
function So(t) {
  if (t.f |= Vt, t.deps !== null)
    for (const e of t.deps)
      (e.reactions ?? (e.reactions = [])).push(t), (e.f & yt) !== 0 && (e.f & Vt) === 0 && (eo(
        /** @type {Derived} */
        e
      ), So(
        /** @type {Derived} */
        e
      ));
}
function Eo(t) {
  if (t.v === gt) return !0;
  if (t.deps === null) return !1;
  for (const e of t.deps)
    if (hn.has(e) || (e.f & yt) !== 0 && Eo(
      /** @type {Derived} */
      e
    ))
      return !0;
  return !1;
}
function hs(t) {
  var e = rn;
  try {
    return rn = !0, t();
  } finally {
    rn = e;
  }
}
const wu = ["touchstart", "touchmove"];
function xu(t) {
  return wu.includes(t);
}
const Wn = Symbol("events"), Mo = /* @__PURE__ */ new Set(), pi = /* @__PURE__ */ new Set();
function Su(t, e, n, r = {}) {
  function a(i) {
    if (r.capture || gi.call(e, i), !i.cancelBubble)
      return Zs(() => n == null ? void 0 : n.call(this, i));
  }
  return t.startsWith("pointer") || t.startsWith("touch") || t === "wheel" ? fn(() => {
    e.addEventListener(t, a, r);
  }) : e.addEventListener(t, a, r), a;
}
function st(t, e, n, r, a) {
  var i = { capture: r, passive: a }, l = Su(t, e, n, i);
  (e === document.body || // @ts-ignore
  e === window || // @ts-ignore
  e === document || // Firefox has quirky behavior, it can happen that we still get "canplay" events when the element is already removed
  e instanceof HTMLMediaElement) && Bi(() => {
    e.removeEventListener(t, l, i);
  });
}
function P(t, e, n) {
  (e[Wn] ?? (e[Wn] = {}))[t] = n;
}
function ht(t) {
  for (var e = 0; e < t.length; e++)
    Mo.add(t[e]);
  for (var n of pi)
    n(t);
}
let ei = null, ti = !1;
function gi(t) {
  var M, k;
  var e = this, n = (
    /** @type {Node} */
    e.ownerDocument
  ), r = t.type, a = ((M = t.composedPath) == null ? void 0 : M.call(t)) || [], i = (
    /** @type {null | Element} */
    a[0] || t.target
  );
  ei = t, ti || (ti = !0, setTimeout(() => {
    ti = !1, ei = null;
  }));
  var l = 0, o = ei === t && t[Wn];
  if (o) {
    var u = a.indexOf(o);
    if (u !== -1 && (e === document || e === /** @type {any} */
    window)) {
      t[Wn] = e;
      return;
    }
    var v = a.indexOf(e);
    if (v === -1)
      return;
    u <= v && (l = u);
  }
  if (i = /** @type {Element} */
  a[l] || t.target, i !== e) {
    Il(t, "currentTarget", {
      configurable: !0,
      get() {
        return i || n;
      }
    });
    var _ = je, S = Fe;
    Jt(null), gn(null);
    try {
      for (var g, p = []; i !== null && i !== e; ) {
        try {
          var b = (k = i[Wn]) == null ? void 0 : k[r];
          b != null && (!/** @type {any} */
          i.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          t.target === i) && b.call(i, t);
        } catch (C) {
          g ? p.push(C) : g = C;
        }
        if (t.cancelBubble) break;
        l++, i = l < a.length ? (
          /** @type {Element} */
          a[l]
        ) : null;
      }
      if (g) {
        for (let C of p)
          queueMicrotask(() => {
            throw C;
          });
        throw g;
      }
    } finally {
      t[Wn] = e, delete t.currentTarget, Jt(_), gn(S);
    }
  }
}
var Ll;
const ni = (
  // We gotta write it like this because after downleveling the pure comment may end up in the wrong location
  ((Ll = globalThis == null ? void 0 : globalThis.window) == null ? void 0 : Ll.trustedTypes) && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", {
    /** @param {string} html */
    createHTML: (t) => t
  })
);
function Eu(t) {
  return (
    /** @type {string} */
    (ni == null ? void 0 : ni.createHTML(t)) ?? t
  );
}
function To(t) {
  var e = du("template");
  return e.innerHTML = Eu(t.replaceAll("<!>", "<!---->")), e.content;
}
function hr(t, e) {
  var n = (
    /** @type {Effect} */
    Fe
  );
  n.nodes === null && (n.nodes = { start: t, end: e, a: null, t: null });
}
// @__NO_SIDE_EFFECTS__
function x(t, e) {
  var n = (e & Ac) !== 0, r = (e & Cc) !== 0, a, i = !t.startsWith("<!>");
  return () => {
    a === void 0 && (a = To(i ? t : "<!>" + t), n || (a = /** @type {TemplateNode} */
    /* @__PURE__ */ fs(a)));
    var l = (
      /** @type {TemplateNode} */
      r || co ? document.importNode(a, !0) : a.cloneNode(!0)
    );
    if (n) {
      var o = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ fs(l)
      ), u = (
        /** @type {TemplateNode} */
        l.lastChild
      );
      hr(o, u);
    } else
      hr(l, l);
    return l;
  };
}
// @__NO_SIDE_EFFECTS__
function Mu(t, e, n = "svg") {
  var r = !t.startsWith("<!>"), a = `<${n}>${r ? t : "<!>" + t}</${n}>`, i;
  return () => {
    if (!i) {
      var l = (
        /** @type {DocumentFragment} */
        To(a)
      ), o = (
        /** @type {Element} */
        /* @__PURE__ */ fs(l)
      );
      i = /** @type {Element} */
      /* @__PURE__ */ fs(o);
    }
    var u = (
      /** @type {TemplateNode} */
      i.cloneNode(!0)
    );
    return hr(u, u), u;
  };
}
// @__NO_SIDE_EFFECTS__
function Tu(t, e) {
  return /* @__PURE__ */ Mu(t, e, "svg");
}
function nn(t = "") {
  {
    var e = Tn(t + "");
    return hr(e, e), e;
  }
}
function Ct() {
  var t = document.createDocumentFragment(), e = document.createComment(""), n = Tn();
  return t.append(e, n), hr(e, n), t;
}
function y(t, e) {
  t !== null && t.before(
    /** @type {Node} */
    e
  );
}
function Au(t) {
  let e = 0, n = vs(0), r;
  return () => {
    Fi() && (s(n), Ga(() => (e === 0 && (r = hs(() => t(() => dr(n)))), e += 1, () => {
      fn(() => {
        e -= 1, e === 0 && (r == null || r(), r = void 0, dr(n));
      });
    })));
  };
}
var Cu = cs | Xs;
function Ou(t, e, n, r) {
  new Pu(t, e, n, r);
}
var Ht, Pi, Kt, $n, Mt, It, Tt, jt, on, es, In, Ls, mr, _r, xn, ja, Ze, zu, Du, bi, Nu, mi, ir, wa, _i, yi;
class Pu {
  /**
   * @param {TemplateNode} node
   * @param {BoundaryProps} props
   * @param {((anchor: Node) => void)} children
   * @param {((error: unknown) => unknown) | undefined} [transform_error]
   */
  constructor(e, n, r, a) {
    H(this, Ze);
    /** @type {Boundary | null} */
    vt(this, "parent");
    vt(this, "is_pending", !1);
    /**
     * API-level transformError transform function. Transforms errors before they reach the `failed` snippet.
     * Inherited from parent boundary, or defaults to identity.
     * @type {(error: unknown) => unknown}
     */
    vt(this, "transform_error");
    /** @type {TemplateNode} */
    H(this, Ht);
    /** @type {TemplateNode | null} */
    H(this, Pi, null);
    /** @type {BoundaryProps} */
    H(this, Kt);
    /** @type {((anchor: Node) => void)} */
    H(this, $n);
    /** @type {Effect} */
    H(this, Mt);
    /** @type {Effect | null} */
    H(this, It, null);
    /** @type {Effect | null} */
    H(this, Tt, null);
    /** @type {Effect | null} */
    H(this, jt, null);
    /** @type {DocumentFragment | null} */
    H(this, on, null);
    H(this, es, 0);
    H(this, In, 0);
    H(this, Ls, !1);
    /** @type {Set<Effect>} */
    H(this, mr, /* @__PURE__ */ new Set());
    /** @type {Set<Effect>} */
    H(this, _r, /* @__PURE__ */ new Set());
    /**
     * A source containing the number of pending async deriveds/expressions.
     * Only created if `$effect.pending()` is used inside the boundary,
     * otherwise updating the source results in needless `Batch.ensure()`
     * calls followed by no-op flushes
     * @type {Source<number> | null}
     */
    H(this, xn, null);
    H(this, ja, Au(() => (re(this, xn, vs(c(this, es))), () => {
      re(this, xn, null);
    })));
    var i;
    re(this, Ht, e), re(this, Kt, n), re(this, $n, (l) => {
      var o = (
        /** @type {Effect} */
        Fe
      );
      o.b = this, o.f |= ci, r(l);
    }), this.parent = /** @type {Effect} */
    Fe.b, this.transform_error = a ?? ((i = this.parent) == null ? void 0 : i.transform_error) ?? ((l) => l), re(this, Mt, ia(() => {
      pe(this, Ze, mi).call(this);
    }, Cu));
  }
  /**
   * Defer an effect inside a pending boundary until the boundary resolves
   * @param {Effect} effect
   */
  defer_effect(e) {
    Wl(e, c(this, mr), c(this, _r));
  }
  /**
   * Returns `false` if the effect exists inside a boundary whose pending snippet is shown
   * @returns {boolean}
   */
  is_rendered() {
    return !this.is_pending && (!this.parent || this.parent.is_rendered());
  }
  has_pending_snippet() {
    return !!c(this, Kt).pending;
  }
  /**
   * Update the source that powers `$effect.pending()` inside this boundary,
   * and controls when the current `pending` snippet (if any) is removed.
   * Do not call from inside the class
   * @param {1 | -1} d
   * @param {Batch} batch
   */
  update_pending_count(e, n) {
    pe(this, Ze, _i).call(this, e, n), re(this, es, c(this, es) + e), !(!c(this, xn) || c(this, Ls)) && (re(this, Ls, !0), fn(() => {
      re(this, Ls, !1), c(this, xn) && Gs(c(this, xn), c(this, es));
    }));
  }
  get_effect_pending() {
    return c(this, ja).call(this), s(
      /** @type {Source<number>} */
      c(this, xn)
    );
  }
  /** @param {unknown} error */
  error(e) {
    if (!c(this, Kt).onerror && !c(this, Kt).failed)
      throw e;
    _e != null && _e.is_fork ? (c(this, It) && _e.skip_effect(c(this, It)), c(this, Tt) && _e.skip_effect(c(this, Tt)), c(this, jt) && _e.skip_effect(c(this, jt)), _e.oncommit(() => {
      pe(this, Ze, yi).call(this, e);
    })) : pe(this, Ze, yi).call(this, e);
  }
}
Ht = new WeakMap(), Pi = new WeakMap(), Kt = new WeakMap(), $n = new WeakMap(), Mt = new WeakMap(), It = new WeakMap(), Tt = new WeakMap(), jt = new WeakMap(), on = new WeakMap(), es = new WeakMap(), In = new WeakMap(), Ls = new WeakMap(), mr = new WeakMap(), _r = new WeakMap(), xn = new WeakMap(), ja = new WeakMap(), Ze = new WeakSet(), zu = function() {
  try {
    re(this, It, Gt(() => c(this, $n).call(this, c(this, Ht))));
  } catch (e) {
    this.error(e);
  }
}, /**
 * @param {unknown} error The deserialized error from the server's hydration comment
 */
Du = function(e) {
  const n = c(this, Kt).failed, { reset: r, invoke_onerror: a } = pe(this, Ze, bi).call(this, e);
  fn(a), n && re(this, jt, Gt(() => {
    n(
      c(this, Ht),
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
bi = function(e) {
  var n = !1, r = !1;
  const a = () => {
    if (n) {
      Dc();
      return;
    }
    n = !0, r && Vc(), c(this, jt) !== null && ls(c(this, jt), () => {
      re(this, jt, null);
    }), pe(this, Ze, wa).call(this, () => {
      pe(this, Ze, mi).call(this);
    });
  };
  return { reset: a, invoke_onerror: () => {
    var l, o;
    try {
      r = !0, (o = (l = c(this, Kt)).onerror) == null || o.call(l, e, a), r = !1;
    } catch (u) {
      dn(u, c(this, Mt) && c(this, Mt).parent);
    }
  } };
}, Nu = function() {
  const e = c(this, Kt).pending;
  e && (this.is_pending = !0, re(this, Tt, Gt(() => e(c(this, Ht)))), fn(() => {
    var n = re(this, on, document.createDocumentFragment()), r = Tn(), a = !1;
    if (n.append(r), re(this, It, pe(this, Ze, wa).call(this, () => {
      try {
        return Gt(() => c(this, $n).call(this, r));
      } catch (i) {
        try {
          this.error(i), a = !0;
        } catch (l) {
          dn(l, c(this, Mt).parent);
        }
        return null;
      }
    })), c(this, It) === null) {
      re(this, on, null), a && pe(this, Ze, ir).call(
        this,
        /** @type {Batch} */
        _e
      );
      return;
    }
    c(this, In) === 0 && (c(this, Ht).before(n), re(this, on, null), ls(
      /** @type {Effect} */
      c(this, Tt),
      () => {
        re(this, Tt, null);
      }
    ), pe(this, Ze, ir).call(
      this,
      /** @type {Batch} */
      _e
    ));
  }));
}, mi = function() {
  try {
    if (this.is_pending = this.has_pending_snippet(), re(this, In, 0), re(this, es, 0), re(this, It, Gt(() => {
      c(this, $n).call(this, c(this, Ht));
    })), c(this, In) > 0) {
      var e = re(this, on, document.createDocumentFragment());
      Ki(c(this, It), e);
      const n = (
        /** @type {(anchor: Node) => void} */
        c(this, Kt).pending
      );
      re(this, Tt, Gt(() => n(c(this, Ht))));
    } else
      pe(this, Ze, ir).call(
        this,
        /** @type {Batch} */
        _e
      );
  } catch (n) {
    this.error(n);
  }
}, /**
 * @param {Batch} batch
 */
ir = function(e) {
  this.is_pending = !1, e.transfer_effects(c(this, mr), c(this, _r));
}, /**
 * @template T
 * @param {() => T} fn
 */
wa = function(e) {
  var n = Fe, r = je, a = xt;
  gn(c(this, Mt)), Jt(c(this, Mt)), Ks(c(this, Mt).ctx);
  try {
    return ds.ensure(), e();
  } finally {
    gn(n), Jt(r), Ks(a);
  }
}, /**
 * Updates the pending count associated with the currently visible pending snippet,
 * if any, such that we can replace the snippet with content once work is done
 * @param {1 | -1} d
 * @param {Batch} batch
 */
_i = function(e, n) {
  var r;
  if (!this.has_pending_snippet()) {
    this.parent && pe(r = this.parent, Ze, _i).call(r, e, n);
    return;
  }
  re(this, In, c(this, In) + e), c(this, In) === 0 && (pe(this, Ze, ir).call(this, n), c(this, Tt) && ls(c(this, Tt), () => {
    re(this, Tt, null);
  }), c(this, on) && (c(this, Ht).before(c(this, on)), re(this, on, null)));
}, /**
 * @param {unknown} error
 */
yi = function(e) {
  c(this, It) && (Rt(c(this, It)), re(this, It, null)), c(this, Tt) && (Rt(c(this, Tt)), re(this, Tt, null)), c(this, jt) && (Rt(c(this, jt)), re(this, jt, null));
  let n = c(this, Kt).failed;
  const r = (a) => {
    const { reset: i, invoke_onerror: l } = pe(this, Ze, bi).call(this, a);
    l(), n && re(this, jt, pe(this, Ze, wa).call(this, () => {
      try {
        return Gt(() => {
          var o = (
            /** @type {Effect} */
            Fe
          );
          o.b = this, o.f |= ci, n(
            c(this, Ht),
            () => a,
            () => i
          );
        });
      } catch (o) {
        return dn(
          o,
          /** @type {Effect} */
          c(this, Mt).parent
        ), null;
      }
    }));
  };
  fn(() => {
    var a;
    try {
      a = this.transform_error(e);
    } catch (i) {
      dn(i, c(this, Mt) && c(this, Mt).parent);
      return;
    }
    a !== null && typeof a == "object" && typeof /** @type {any} */
    a.then == "function" ? a.then(
      r,
      /** @param {unknown} e */
      (i) => dn(i, c(this, Mt) && c(this, Mt).parent)
    ) : r(a);
  });
};
function F(t, e) {
  var n = e == null ? "" : typeof e == "object" ? `${e}` : e;
  n !== /** @type {any} */
  (t[nr] ?? (t[nr] = t.nodeValue)) && (t[nr] = n, t.nodeValue = `${n}`);
}
function fl(t, e) {
  return Lu(t, e);
}
const ha = /* @__PURE__ */ new Map();
function Lu(t, { target: e, anchor: n, props: r = {}, events: a, context: i, intro: l = !0, transformError: o }) {
  cu();
  var u = void 0, v = pu(() => {
    var _ = n ?? e.appendChild(Tn());
    Ou(
      /** @type {TemplateNode} */
      _,
      {
        pending: () => {
        }
      },
      (p) => {
        ot({});
        var b = (
          /** @type {ComponentContext} */
          xt
        );
        i && (b.c = i), a && (r.$$events = a), u = t(p, r) || Ni(), ct();
      },
      o
    );
    var S = /* @__PURE__ */ new Set(), g = (p) => {
      for (var b = 0; b < p.length; b++) {
        var M = p[b];
        if (!S.has(M)) {
          S.add(M);
          var k = xu(M);
          for (const D of [e, document]) {
            var C = ha.get(D);
            C === void 0 && (C = /* @__PURE__ */ new Map(), ha.set(D, C));
            var O = C.get(M);
            O === void 0 ? (D.addEventListener(M, gi, { passive: k }), C.set(M, 1)) : C.set(M, O + 1);
          }
        }
      }
    };
    return g(Ua(Mo)), pi.add(g), () => {
      var k;
      for (var p of S)
        for (const C of [e, document]) {
          var b = (
            /** @type {Map<string, number>} */
            ha.get(C)
          ), M = (
            /** @type {number} */
            b.get(p)
          );
          --M == 0 ? (C.removeEventListener(p, gi), b.delete(p), b.size === 0 && ha.delete(C)) : b.set(p, M);
        }
      pi.delete(g), _ !== n && ((k = _.parentNode) == null || k.removeChild(_));
    };
  });
  return ki.set(u, v), u;
}
let ki = /* @__PURE__ */ new WeakMap();
function hl(t, e) {
  const n = ki.get(t);
  return n ? (ki.delete(t), n(e)) : Promise.resolve();
}
var en, cn, qt, ts, yr, kr, qa;
class Gi {
  /**
   * @param {TemplateNode} anchor
   * @param {boolean} transition
   */
  constructor(e, n = !0) {
    /** @type {TemplateNode} */
    vt(this, "anchor");
    /** @type {Map<Batch, Key>} */
    H(this, en, /* @__PURE__ */ new Map());
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
    H(this, cn, /* @__PURE__ */ new Map());
    /**
     * Similar to #onscreen with respect to the keys, but contains branches that are not yet
     * in the DOM, because their insertion is deferred.
     * @type {Map<Key, Branch>}
     */
    H(this, qt, /* @__PURE__ */ new Map());
    /**
     * Keys of effects that are currently outroing
     * @type {Set<Key>}
     */
    H(this, ts, /* @__PURE__ */ new Set());
    /**
     * Whether to pause (i.e. outro) on change, or destroy immediately.
     * This is necessary for `<svelte:element>`
     */
    H(this, yr, !0);
    /**
     * @param {Batch} batch
     */
    H(this, kr, (e) => {
      if (c(this, en).has(e)) {
        var n = (
          /** @type {Key} */
          c(this, en).get(e)
        ), r = c(this, cn).get(n);
        if (r)
          Da(r), c(this, ts).delete(n);
        else {
          var a = c(this, qt).get(n);
          a && (Da(a.effect), c(this, cn).set(n, a.effect), c(this, qt).delete(n), a.fragment.lastChild.remove(), this.anchor.before(a.fragment), r = a.effect);
        }
        for (const [i, l] of c(this, en)) {
          if (c(this, en).delete(i), i === e)
            break;
          const o = c(this, qt).get(l);
          o && (Rt(o.effect), c(this, qt).delete(l));
        }
        for (const [i, l] of c(this, cn)) {
          if (i === n || c(this, ts).has(i)) continue;
          const o = () => {
            if (Array.from(c(this, en).values()).includes(i)) {
              var v = document.createDocumentFragment();
              Ki(l, v), v.append(Tn()), c(this, qt).set(i, { effect: l, fragment: v });
            } else
              Rt(l);
            c(this, ts).delete(i), c(this, cn).delete(i);
          };
          c(this, yr) || !r ? (c(this, ts).add(i), ls(l, o, !1)) : o();
        }
      }
    });
    /**
     * @param {Batch} batch
     */
    H(this, qa, (e) => {
      c(this, en).delete(e);
      const n = Array.from(c(this, en).values());
      for (const [r, a] of c(this, qt))
        n.includes(r) || (Rt(a.effect), c(this, qt).delete(r));
    });
    this.anchor = e, re(this, yr, n);
  }
  /**
   *
   * @param {any} key
   * @param {null | ((target: TemplateNode) => void)} fn
   */
  ensure(e, n) {
    var r = (
      /** @type {Batch} */
      _e
    ), a = fo();
    if (n && !c(this, cn).has(e) && !c(this, qt).has(e))
      if (a) {
        var i = document.createDocumentFragment(), l = Tn();
        i.append(l), c(this, qt).set(e, {
          effect: Gt(() => n(l)),
          fragment: i
        });
      } else
        c(this, cn).set(
          e,
          Gt(() => n(this.anchor))
        );
    if (c(this, en).set(r, e), a) {
      for (const [o, u] of c(this, cn))
        o === e ? r.unskip_effect(u) : r.skip_effect(u);
      for (const [o, u] of c(this, qt))
        o === e ? r.unskip_effect(u.effect) : r.skip_effect(u.effect);
      r.oncommit(c(this, kr)), r.ondiscard(c(this, qa));
    } else
      c(this, kr).call(this, r);
  }
}
en = new WeakMap(), cn = new WeakMap(), qt = new WeakMap(), ts = new WeakMap(), yr = new WeakMap(), kr = new WeakMap(), qa = new WeakMap();
function B(t, e, n = !1) {
  var r = new Gi(t), a = n ? cs : 0;
  function i(l, o) {
    r.ensure(l, o);
  }
  ia(() => {
    var l = !1;
    e((o, u = 0) => {
      l = !0, i(u, o);
    }), l || i(-1, null);
  }, a);
}
const Ru = Symbol("NaN");
function pl(t, e, n) {
  var r = new Gi(t);
  ia(() => {
    var a = e();
    a !== a && (a = /** @type {any} */
    Ru), r.ensure(a, n);
  });
}
function wt(t, e) {
  return e;
}
function Iu(t, e, n) {
  for (var r = [], a = e.length, i, l = e.length, o = 0; o < a; o++) {
    let S = e[o];
    ls(
      S,
      () => {
        if (i) {
          if (i.pending.delete(S), i.done.add(S), i.pending.size === 0) {
            var g = (
              /** @type {Set<EachOutroGroup>} */
              t.outrogroups
            );
            wi(t, Ua(i.done)), g.delete(i), g.size === 0 && (t.outrogroups = null);
          }
        } else
          l -= 1;
      },
      !1
    );
  }
  if (l === 0) {
    var u = r.length === 0 && n !== null && t.pending.size === 0;
    if (u) {
      var v = (
        /** @type {Element} */
        n
      ), _ = (
        /** @type {Element} */
        v.parentNode
      );
      uu(_), _.append(v), t.items.clear();
    }
    wi(t, e, !u);
  } else
    i = {
      pending: new Set(e),
      done: /* @__PURE__ */ new Set()
    }, (t.outrogroups ?? (t.outrogroups = /* @__PURE__ */ new Set())).add(i);
}
function wi(t, e, n = !0) {
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
      i.f |= vn;
      const l = document.createDocumentFragment();
      Ki(i, l);
    } else
      Rt(e[a], n);
  }
}
var gl;
function qe(t, e, n, r, a, i = null) {
  var l = t, o = /* @__PURE__ */ new Map(), u = (e & Hl) !== 0;
  if (u) {
    var v = (
      /** @type {Element} */
      t
    );
    l = v.appendChild(Tn());
  }
  var _ = null, S = /* @__PURE__ */ Ql(() => {
    var D = n();
    return (
      /** @type {V[]} */
      sa(D) ? D : D == null ? [] : Ua(D)
    );
  }), g, p = /* @__PURE__ */ new Map(), b = !0;
  function M(D) {
    (O.effect.f & Lt) === 0 && (O.pending.delete(D), O.fallback = _, ju(O, g, l, e, r), _ !== null && (g.length === 0 ? (_.f & vn) === 0 ? Da(_) : (_.f ^= vn, lr(_, null, l)) : ls(_, () => {
      _ = null;
    })));
  }
  function k(D) {
    O.pending.delete(D);
  }
  var C = ia(() => {
    g = /** @type {V[]} */
    s(S);
    for (var D = g.length, G = /* @__PURE__ */ new Set(), R = (
      /** @type {Batch} */
      _e
    ), V = fo(), I = 0; I < D; I += 1) {
      var T = g[I], L = r(T, I), f = b ? null : o.get(L);
      f ? (f.v && Gs(f.v, T), f.i && Gs(f.i, I), V && R.unskip_effect(f.e)) : (f = qu(
        o,
        b ? l : gl ?? (gl = Tn()),
        T,
        L,
        I,
        a,
        e,
        n
      ), b || (f.e.f |= vn), o.set(L, f)), G.add(L);
    }
    if (D === 0 && i && !_ && (b ? _ = Gt(() => i(l)) : (_ = Gt(() => i(gl ?? (gl = Tn()))), _.f |= vn)), D > G.size && Ic(), !b)
      if (p.set(R, G), V) {
        for (const [w, j] of o)
          G.has(w) || R.skip_effect(j.e);
        R.oncommit(M), R.ondiscard(k);
      } else
        M(R);
    s(S);
  }), O = { effect: C, items: o, pending: p, outrogroups: null, fallback: _ };
  b = !1;
}
function tr(t) {
  for (; t !== null && (t.f & Yt) === 0; )
    t = t.next;
  return t;
}
function ju(t, e, n, r, a) {
  var f, w, j, he, ie, ce, A, N, ee;
  var i = (r & wc) !== 0, l = e.length, o = t.items, u = tr(t.effect.first), v, _ = null, S, g = [], p = [], b, M, k, C;
  if (i)
    for (C = 0; C < l; C += 1)
      b = e[C], M = a(b, C), k = /** @type {EachItem} */
      o.get(M).e, (k.f & vn) === 0 && ((w = (f = k.nodes) == null ? void 0 : f.a) == null || w.measure(), (S ?? (S = /* @__PURE__ */ new Set())).add(k));
  for (C = 0; C < l; C += 1) {
    if (b = e[C], M = a(b, C), k = /** @type {EachItem} */
    o.get(M).e, t.outrogroups !== null)
      for (const Z of t.outrogroups)
        Z.pending.delete(k), Z.done.delete(k);
    if ((k.f & Ot) !== 0 && (Da(k), i && ((he = (j = k.nodes) == null ? void 0 : j.a) == null || he.unfix(), (S ?? (S = /* @__PURE__ */ new Set())).delete(k))), (k.f & vn) !== 0)
      if (k.f ^= vn, k === u)
        lr(k, null, n);
      else {
        var O = _ ? _.next : u;
        k === t.effect.last && (t.effect.last = k.prev), k.prev && (k.prev.next = k.next), k.next && (k.next.prev = k.prev), Ln(t, _, k), Ln(t, k, O), lr(k, O, n), _ = k, g = [], p = [], u = tr(_.next);
        continue;
      }
    if (k !== u) {
      if (v !== void 0 && v.has(k)) {
        if (g.length < p.length) {
          var D = p[0], G;
          _ = D.prev;
          var R = g[0], V = g[g.length - 1];
          for (G = 0; G < g.length; G += 1)
            lr(g[G], D, n);
          for (G = 0; G < p.length; G += 1)
            v.delete(p[G]);
          Ln(t, R.prev, V.next), Ln(t, _, R), Ln(t, V, D), u = D, _ = V, C -= 1, g = [], p = [];
        } else
          v.delete(k), lr(k, u, n), Ln(t, k.prev, k.next), Ln(t, k, _ === null ? t.effect.first : _.next), Ln(t, _, k), _ = k;
        continue;
      }
      for (g = [], p = []; u !== null && u !== k; )
        (v ?? (v = /* @__PURE__ */ new Set())).add(u), p.push(u), u = tr(u.next);
      if (u === null)
        continue;
    }
    (k.f & vn) === 0 && g.push(k), _ = k, u = tr(k.next);
  }
  if (t.outrogroups !== null) {
    for (const Z of t.outrogroups)
      Z.pending.size === 0 && (wi(t, Ua(Z.done)), (ie = t.outrogroups) == null || ie.delete(Z));
    t.outrogroups.size === 0 && (t.outrogroups = null);
  }
  if (u !== null || v !== void 0) {
    var I = [];
    if (v !== void 0)
      for (k of v)
        (k.f & Ot) === 0 && I.push(k);
    for (; u !== null; )
      (u.f & Ot) === 0 && u !== t.fallback && I.push(u), u = tr(u.next);
    var T = I.length;
    if (T > 0) {
      var L = (r & Hl) !== 0 && l === 0 ? n : null;
      if (i) {
        for (C = 0; C < T; C += 1)
          (A = (ce = I[C].nodes) == null ? void 0 : ce.a) == null || A.measure();
        for (C = 0; C < T; C += 1)
          (ee = (N = I[C].nodes) == null ? void 0 : N.a) == null || ee.fix();
      }
      Iu(t, I, L);
    }
  }
  i && fn(() => {
    var Z, te;
    if (S !== void 0)
      for (k of S)
        (te = (Z = k.nodes) == null ? void 0 : Z.a) == null || te.apply();
  });
}
function qu(t, e, n, r, a, i, l, o) {
  var u = (l & yc) !== 0 ? (l & xc) === 0 ? /* @__PURE__ */ lu(n, !1, !1) : vs(n) : null, v = (l & kc) !== 0 ? vs(a) : null;
  return {
    v: u,
    i: v,
    e: Gt(() => (i(e, u ?? n, v ?? a, o), () => {
      t.delete(r);
    }))
  };
}
function lr(t, e, n) {
  if (t.nodes)
    for (var r = t.nodes.start, a = t.nodes.end, i = e && (e.f & vn) === 0 ? (
      /** @type {EffectNodes} */
      e.nodes.start
    ) : n; r !== null; ) {
      var l = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ aa(r)
      );
      if (i.before(r), r === a)
        return;
      r = l;
    }
}
function Ln(t, e, n) {
  e === null ? t.effect.first = n : e.next = n, n === null ? t.effect.last = e : n.prev = e;
}
function bl(t, e, ...n) {
  var r = new Gi(t);
  ia(() => {
    const a = e() ?? null;
    r.ensure(a, a && ((i) => a(i, ...n)));
  }, cs);
}
function Ao(t) {
  var e, n, r = "";
  if (typeof t == "string" || typeof t == "number") r += t;
  else if (typeof t == "object") if (Array.isArray(t)) {
    var a = t.length;
    for (e = 0; e < a; e++) t[e] && (n = Ao(t[e])) && (r && (r += " "), r += n);
  } else for (n in t) t[n] && (r && (r += " "), r += n);
  return r;
}
function Fu() {
  for (var t, e, n = 0, r = "", a = arguments.length; n < a; n++) (t = arguments[n]) && (e = Ao(t)) && (r && (r += " "), r += e);
  return r;
}
function xi(t) {
  return typeof t == "object" ? Fu(t) : t ?? "";
}
const ml = [...` 	
\r\f \v\uFEFF`];
function Bu(t, e, n) {
  var r = t == null ? "" : "" + t;
  if (e && (r = r ? r + " " + e : e), n) {
    for (var a of Object.keys(n))
      if (n[a])
        r = r ? r + " " + a : a;
      else if (r.length)
        for (var i = a.length, l = 0; (l = r.indexOf(a, l)) >= 0; ) {
          var o = l + i;
          (l === 0 || ml.includes(r[l - 1])) && (o === r.length || ml.includes(r[o])) ? r = (l === 0 ? "" : r.substring(0, l)) + r.substring(o + 1) : l = o;
        }
  }
  return r === "" ? null : r;
}
function _l(t, e = !1) {
  var n = e ? " !important;" : ";", r = "";
  for (var a of Object.keys(t)) {
    var i = t[a];
    i != null && i !== "" && (r += " " + a + ": " + i + n);
  }
  return r;
}
function Uu(t, e) {
  if (e) {
    var n = "", r, a;
    return Array.isArray(e) ? (r = e[0], a = e[1]) : r = e, r && (n += _l(r)), a && (n += _l(a, !0)), n = n.trim(), n === "" ? null : n;
  }
  return String(t);
}
function Le(t, e, n, r, a, i) {
  var l = (
    /** @type {any} */
    t[ui]
  );
  if (l !== n || l === void 0) {
    var o = Bu(n, r, i);
    o == null ? t.removeAttribute("class") : t.className = o, t[ui] = n;
  } else if (i && a !== i)
    for (var u in i) {
      var v = !!i[u];
      (a == null || v !== !!a[u]) && t.classList.toggle(u, v);
    }
  return i;
}
function si(t, e = {}, n, r) {
  for (var a in n) {
    var i = n[a];
    e[a] !== i && (n[a] == null ? t.style.removeProperty(a) : t.style.setProperty(a, i, r));
  }
}
function At(t, e, n, r) {
  var a = (
    /** @type {any} */
    t[di]
  );
  if (a !== e) {
    var i = Uu(e, r);
    i == null ? t.removeAttribute("style") : t.style.cssText = i, t[di] = e;
  } else r && (Array.isArray(r) ? (si(t, n == null ? void 0 : n[0], r[0]), si(t, n == null ? void 0 : n[1], r[1], "important")) : si(t, n, r));
  return r;
}
function Hu(t, e) {
  e ? t.hasAttribute("selected") || t.setAttribute("selected", "") : t.removeAttribute("selected");
}
function Ku(t, e) {
  var n = t.__defaultValue, r = t.multiple, a = r ? n ?? [] : null;
  if (!(r && !sa(a))) {
    t.selectedIndex;
    for (var i of t.options) {
      var l = Ms(i);
      Hu(
        i,
        r ? (
          /** @type {any[]} */
          a.includes(l)
        ) : oo(l, n)
      );
    }
  }
}
function oa(t, e, n = !1) {
  if (t.multiple) {
    if (e == null)
      return;
    if (!sa(e))
      return zc();
    for (var r of t.options)
      r.selected = e.includes(Ms(r));
    return;
  }
  for (r of t.options) {
    var a = Ms(r);
    if (oo(a, e)) {
      r.selected = !0;
      return;
    }
  }
  (!n || e !== void 0) && (t.selectedIndex = -1);
}
function pr(t) {
  var e = new MutationObserver((n) => {
    n.every(Gu) || ("__defaultValue" in t && Ku(t), "__value" in t && oa(t, t.__value));
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
  }), Bi(() => {
    e.disconnect();
  });
}
function yl(t, e, n = e) {
  var r = /* @__PURE__ */ new WeakSet(), a = !0;
  Ri(t, "change", (i) => {
    var l = i ? "[selected]" : ":checked", o;
    if (t.multiple)
      o = [].map.call(t.querySelectorAll(l), Ms);
    else {
      var u = t.querySelector(l) ?? // will fall back to first non-disabled option if no option is selected
      t.querySelector("option:not([disabled])");
      o = u && Ms(u);
    }
    n(o), t.__value = o, _e !== null && r.add(_e);
  }), Ui(() => {
    var i = e();
    if (t === document.activeElement) {
      var l = (
        /** @type {Batch} */
        _e
      );
      if (r.has(l))
        return;
    }
    if (oa(t, i, a), a && i === void 0) {
      var o = t.querySelector(":checked");
      o !== null && (i = Ms(o), n(i));
    }
    t.__value = i, a = !1;
  });
}
function Ms(t) {
  return "__value" in t ? t.__value : t.value;
}
function Gu(t) {
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
const Vu = Symbol("is custom element"), Yu = Symbol("is html"), Ju = _c ? "progress" : "PROGRESS";
function Xn(t, e) {
  var n = Vi(t);
  n.value === (n.value = // treat null and undefined the same for the initial value
  e ?? void 0) || // @ts-expect-error
  // `progress` elements always need their value set when it's `0`
  t.value === e && (e !== 0 || t.nodeName !== Ju) || (t.value = e ?? "");
}
function kl(t, e) {
  var n = Vi(t);
  n.checked !== (n.checked = // treat null and undefined the same for the initial value
  e ?? void 0) && (t.checked = e);
}
function ve(t, e, n, r) {
  var a = Vi(t);
  a[e] !== (a[e] = n) && (e === "loading" && (t[mc] = n), n == null ? t.removeAttribute(e) : typeof n != "string" && Wu(t).has(e) ? t[e] = n : t.setAttribute(e, n));
}
function Vi(t) {
  return (
    /** @type {Record<string | symbol, unknown>} **/
    /** @type {any} */
    t[ba] ?? (t[ba] = {
      [Vu]: t.nodeName.includes("-"),
      [Yu]: t.namespaceURI === Oc
    })
  );
}
var wl = /* @__PURE__ */ new Map();
function Wu(t) {
  var e = t.getAttribute("is") || t.nodeName, n = wl.get(e);
  if (n) return n;
  wl.set(e, n = /* @__PURE__ */ new Set());
  for (var r, a = t, i = Element.prototype; i !== a; ) {
    r = vc(a);
    for (var l in r)
      r[l].set && // better safe than sorry, we don't want spread attributes to mess with HTML content
      l !== "innerHTML" && l !== "textContent" && l !== "innerText" && n.add(l);
    a = zi(a);
  }
  return n;
}
function bn(t, e, n = e) {
  var r = /* @__PURE__ */ new WeakSet();
  Ri(t, "input", async (a) => {
    var i = a ? t.defaultValue : t.value;
    if (i = ri(t) ? ai(i) : i, n(i), _e !== null && r.add(_e), await ku(), i !== (i = e())) {
      var l = t.selectionStart, o = t.selectionEnd, u = t.value.length;
      if (t.value = i ?? "", o !== null) {
        var v = t.value.length;
        l === o && o === u && v > u ? (t.selectionStart = v, t.selectionEnd = v) : (t.selectionStart = l, t.selectionEnd = Math.min(o, v));
      }
    }
  }), // If we are hydrating and the value has since changed,
  // then use the updated value from the input instead.
  // If defaultValue is set, then value == defaultValue
  // TODO Svelte 6: remove input.value check and set to empty string?
  hs(e) == null && t.value && (n(ri(t) ? ai(t.value) : t.value), _e !== null && r.add(_e)), Ga(() => {
    var a = e();
    if (t === document.activeElement) {
      var i = (
        /** @type {Batch} */
        _e
      );
      if (r.has(i))
        return;
    }
    ri(t) && a === ai(t.value) || t.type === "date" && !a && !t.value || a !== t.value && (t.value = a ?? "");
  });
}
function Xu(t, e, n = e) {
  Ri(t, "change", (r) => {
    var a = r ? t.defaultChecked : t.checked;
    n(a);
  }), // If we are hydrating and the value has since changed,
  // then use the update value from the input instead.
  // If defaultChecked is set, then checked == defaultChecked
  hs(e) == null && n(t.checked), Ga(() => {
    var r = e();
    t.checked = !!r;
  });
}
function ri(t) {
  var e = t.type;
  return e === "number" || e === "range";
}
function ai(t) {
  return t === "" ? null : +t;
}
var jn, Rs, wr, Fa, Co;
const Ba = class Ba {
  /** @param {ResizeObserverOptions} options */
  constructor(e) {
    H(this, Fa);
    /** */
    H(this, jn, /* @__PURE__ */ new WeakMap());
    /** @type {ResizeObserver | undefined} */
    H(this, Rs);
    /** @type {ResizeObserverOptions} */
    H(this, wr);
    re(this, wr, e);
  }
  /**
   * @param {Element} element
   * @param {(entry: ResizeObserverEntry) => any} listener
   */
  observe(e, n) {
    var r = c(this, jn).get(e) || /* @__PURE__ */ new Set();
    return r.add(n), c(this, jn).set(e, r), pe(this, Fa, Co).call(this).observe(e, c(this, wr)), () => {
      var a = c(this, jn).get(e);
      a.delete(n), a.size === 0 && (c(this, jn).delete(e), c(this, Rs).unobserve(e));
    };
  }
};
jn = new WeakMap(), Rs = new WeakMap(), wr = new WeakMap(), Fa = new WeakSet(), Co = function() {
  return c(this, Rs) ?? re(this, Rs, new ResizeObserver(
    /** @param {any} entries */
    (e) => {
      for (var n of e) {
        Ba.entries.set(n.target, n);
        for (var r of c(this, jn).get(n.target) || [])
          r(n);
      }
    }
  ));
}, /** @static */
vt(Ba, "entries", /* @__PURE__ */ new WeakMap());
let Si = Ba;
var Zu = /* @__PURE__ */ new Si({
  box: "border-box"
});
function Qu(t, e, n) {
  var r = Zu.observe(t, () => n(t[e]));
  Ui(() => (hs(() => n(t[e])), r));
}
function ii(t, e) {
  return t === e || (t == null ? void 0 : t[is]) === e;
}
function On(t = Ni(), e, n, r) {
  var a = (
    /** @type {ComponentContext} */
    xt.r
  ), i = (
    /** @type {Effect} */
    Fe
  );
  return Ui(() => {
    var l, o;
    return Ga(() => {
      l = o, o = (r == null ? void 0 : r()) || [], hs(() => {
        ii(n(...o), t) || (e(t, ...o), l && ii(n(...l), t) && e(null, ...l));
      });
    }), () => {
      let u = i;
      for (; u !== a && u.parent !== null && u.parent.f & Aa; )
        u = u.parent;
      const v = () => {
        o && ii(n(...o), t) && e(null, ...o);
      }, _ = u.teardown;
      u.teardown = () => {
        v(), _ == null || _();
      };
    };
  }), t;
}
function Ye(t, e, n, r) {
  var G;
  var a = !0, i = (n & Mc) !== 0, l = (n & Tc) !== 0, o = (
    /** @type {V} */
    r
  ), u = !0, v = (
    /** @type {Derived<V> | undefined} */
    void 0
  ), _ = () => l && a ? (v ?? (v = /* @__PURE__ */ vr(
    /** @type {() => V} */
    r
  )), s(v)) : (u && (u = !1, o = l ? hs(
    /** @type {() => V} */
    r
  ) : (
    /** @type {V} */
    r
  )), o);
  let S;
  if (i) {
    var g = is in t || bc in t;
    S = ((G = Ss(t, e)) == null ? void 0 : G.set) ?? (g && e in t ? (R) => t[e] = R : void 0);
  }
  var p, b = !1;
  i ? [p, b] = Xc(() => (
    /** @type {V} */
    t[e]
  )) : p = /** @type {V} */
  t[e], p === void 0 && r !== void 0 && (p = _(), S && (Uc(), S(p)));
  var M;
  if (M = () => {
    var R = (
      /** @type {V} */
      t[e]
    );
    return R === void 0 ? _() : (u = !0, R);
  }, (n & Ec) === 0)
    return M;
  if (S) {
    var k = t.$$legacy;
    return (
      /** @type {() => V} */
      (function(R, V) {
        return arguments.length > 0 ? ((!V || k || b) && S(V ? M() : R), R) : M();
      })
    );
  }
  var C = !1, O = ((n & Sc) !== 0 ? vr : Ql)(() => (C = !1, M()));
  i && s(O);
  var D = (
    /** @type {Effect} */
    Fe
  );
  return (
    /** @type {() => V} */
    (function(R, V) {
      if (arguments.length > 0) {
        const I = V ? s(O) : i ? et(R) : R;
        return m(O, I), C = !0, o !== void 0 && (o = I), R;
      }
      return Cn && C || (D.f & Lt) !== 0 ? O.v : s(O);
    })
  );
}
function ps(t) {
  xt === null && Lc(), _t(() => {
    const e = hs(t);
    if (typeof e == "function") return (
      /** @type {() => void} */
      e
    );
  });
}
const $u = "5";
var Rl;
typeof window < "u" && ((Rl = window.__svelte ?? (window.__svelte = {})).v ?? (Rl.v = /* @__PURE__ */ new Set())).add($u);
var ed = /* @__PURE__ */ Tu('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="svelte-13so817"><path></path></svg>');
function K(t, e) {
  let n = Ye(e, "name", 3, "blocks"), r = Ye(e, "size", 3, 16), a = Ye(e, "fa", 3, "");
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
    refresh: "M21 12a9 9 0 1 1-2.6-6.4L21 8M21 3v5h-5",
    globe: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20",
    history: "M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5M12 7v5l3 2",
    unlink: "M9 17H7A5 5 0 0 1 7 7h2M15 7h2a5 5 0 0 1 4 8M8 12h3M2 2l20 20",
    edit: "M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z",
    back: "M19 12H5M12 19l-7-7 7-7",
    "panel-left": "M3 4h18v16H3zM9 4v16",
    "panel-right": "M3 4h18v16H3zM15 4v16",
    clipboard: "M9 2h6v4H9zM16 4h3v18H5V4h3",
    lock: "M5 11h14v11H5zM8 11V7a4 4 0 0 1 8 0v4",
    users: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8",
    select: "M3 3h18v18H3zM8 12l3 3 5-6"
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
    "fa-square": "blocks",
    "fa-globe": "globe"
  }, o = /* @__PURE__ */ se(() => i[a() ? l[a()] || "blocks" : n()] || i.blocks);
  var u = ed(), v = $(u);
  z(() => {
    ve(u, "width", r()), ve(u, "height", r()), ve(v, "d", s(o));
  }), y(t, u);
}
const Oo = ["anchor", "background", "bg_color", "text_color", "spacing", "width", "align", "class", "reveal", "hidden", "hide_on"], td = ["mobile", "tablet", "desktop"], nd = ["text", "textarea", "markdown"], gr = (t) => !!t && nd.includes(t.type || "text"), sd = (t) => !!t && (t.type || "text") === "text" && !/(^|_)url$/.test(t.name || "");
function Ts(t) {
  let e = t == null ? void 0 : t.hide_on;
  if (typeof e == "string" ? e = e.split(",") : e && typeof e == "object" && !Array.isArray(e) && (e = Object.keys(e).filter((r) => e[r])), !Array.isArray(e)) return [];
  const n = new Set(e.map((r) => String(r).trim().toLowerCase()));
  return td.filter((r) => n.has(r));
}
const Ys = (t) => t === void 0 ? void 0 : JSON.parse(JSON.stringify(t));
function Po(t, e = Oo) {
  if (!t || typeof t != "object" || typeof t.type != "string") return null;
  const { type: n } = t, r = t[n], a = r !== null && typeof r == "object" && !Array.isArray(r);
  if (!a && e === null) return Ys(t);
  const i = { type: n }, l = {};
  for (const [o, u] of Object.entries(t))
    o === "type" || o === n || (a || (e || []).includes(o) ? i[o] = u : l[o] = u);
  return i[n] = a ? r : l, i;
}
function _n(t, e) {
  return Array.isArray(t) ? t.map((n) => Po(n, e)).filter(Boolean) : [];
}
function zo(t) {
  if (t.default !== void 0)
    return Do(t) ? t.default === !0 || t.default === 1 || t.default === "1" : Ys(t.default);
  if (t.type === "list") return [];
  if (t.type === "toggle") return !1;
}
const Do = (t) => {
  var e;
  return (t == null ? void 0 : t.type) === "toggle" || ((e = t == null ? void 0 : t.validate) == null ? void 0 : e.type) === "bool";
}, rd = (t) => {
  var e;
  return (t == null ? void 0 : t.type) === "number" || ((e = t == null ? void 0 : t.validate) == null ? void 0 : e.type) === "int";
}, Va = (t) => t === "" || t === null || t === void 0 || Array.isArray(t) && t.length === 0;
function xa(t, e, n) {
  return Va(n) ? e in t ? (delete t[e], !0) : !1 : t[e] === n ? !1 : (t[e] = n, !0);
}
function No(t, e = "item") {
  const n = {}, r = (t == null ? void 0 : t.fields) || [];
  for (const i of r) {
    const l = zo(i);
    Va(l) || (n[i.name] = l);
  }
  t != null && t.new_item && typeof t.new_item == "object" && !Array.isArray(t.new_item) && Object.assign(n, Ys(t.new_item));
  let a = !0;
  for (const i of r) {
    if (n[i.name] !== void 0) {
      gr(i) && (a = !1);
      continue;
    }
    if (/(^|_)url$/.test(i.name)) {
      n[i.name] = "#";
      continue;
    }
    gr(i) && (n[i.name] = a ? `New ${e}` : String(i.label || i.name).replace(/\s*\(.*\)\s*$/, ""), a = !1);
  }
  return n;
}
function xl(t, e = !0) {
  const n = {}, r = e && t.example && typeof t.example == "object" ? Po(t.example) : null;
  r && Object.assign(n, Ys(r[t.type]));
  for (const i of t.fields || [])
    if (n[i.name] === void 0) {
      const l = zo(i);
      Va(l) || (n[i.name] = l);
    }
  const a = { type: t.type };
  if (r)
    for (const [i, l] of Object.entries(r)) i !== "type" && i !== t.type && (a[i] = Ys(l));
  return a[t.type] = n, a;
}
const Ei = (t) => String(t).replace(/[*_`#>]/g, "").trim();
function Yi(t, e = null) {
  const n = t && t[t.type] || {};
  if (e != null && e.fields)
    for (const i of e.fields) {
      const l = n[i.name];
      if (gr(i) && typeof l == "string" && l.trim()) return Ei(l).slice(0, 70);
    }
  const r = n.heading || n.title || n.name || n.eyebrow || n.text || n.question || n.url || "";
  if (r) return Ei(r).slice(0, 70);
  const a = Array.isArray(n.items) && n.items[0];
  return a ? String(a.title || a.name || a.question || "").slice(0, 70) : "";
}
function ad(t, e, n) {
  if (t && typeof t == "object")
    for (const r of e || []) {
      const a = t[r.name];
      if (typeof a == "string" && a.trim() && gr(r)) return Ei(a).slice(0, 60);
    }
  return `Item ${n + 1}`;
}
function Sl(t) {
  return Ys(t);
}
function id(t = window.location.pathname) {
  const e = decodeURIComponent(t);
  let n = e.match(/\/pages\/edit\/(.+?)\/?$/);
  return n ? { kind: "page", route: "/" + n[1] } : (n = e.match(/\/flex-objects\/([^/]+)\/([^/]+)\/?$/), n ? { kind: "flex", type: n[1], key: n[2] === "new" ? null : n[2] } : { kind: "unknown" });
}
const El = {
  hero: "Hero",
  content: "Content",
  media: "Media",
  "social-proof": "Social proof",
  commerce: "Commerce",
  dynamic: "Dynamic",
  forms: "Forms",
  layout: "Layout"
};
function ld() {
  const t = (window.__GRAV_API_SERVER_URL || "").replace(/\/$/, ""), e = window.__GRAV_API_PREFIX || "/api/v1";
  return t + e;
}
function od(t = {}) {
  const e = { Accept: "application/json", ...t };
  return window.__GRAV_API_TOKEN && (e["X-API-Token"] = window.__GRAV_API_TOKEN), window.__GRAV_ENVIRONMENT && (e["X-Grav-Environment"] = window.__GRAV_ENVIRONMENT), e;
}
async function ft(t, e, n, r = {}) {
  var o;
  const a = { method: t, headers: od(), credentials: "same-origin", ...r };
  n instanceof FormData ? a.body = n : n !== void 0 && (a.headers["Content-Type"] = "application/json", a.body = JSON.stringify(n));
  const i = await fetch(ld() + e, a);
  if (i.status === 204) return null;
  const l = await i.json().catch(() => ({}));
  if (!i.ok) {
    const u = ((o = l == null ? void 0 : l.error) == null ? void 0 : o.message) || (l == null ? void 0 : l.message) || (l == null ? void 0 : l.detail) || `Request failed (${i.status})`, v = new Error(u);
    throw v.status = i.status, v;
  }
  return l && typeof l == "object" && "data" in l ? l.data : l;
}
function cd(t) {
  return String(t || "").replace(/^\/+/, "").split("/").map(encodeURIComponent).join("/");
}
function yn(t) {
  return t.kind === "flex" ? { context: "flex", type: t.type, key: t.key } : t.kind === "section" ? { context: "section", id: t.id } : { context: "page", route: t.route };
}
function Ml(t) {
  return t.kind === "flex" ? `/flex-objects/${encodeURIComponent(t.type)}/${encodeURIComponent(t.key)}/media` : `/pages/${cd(t.route)}/media`;
}
const Xe = {
  blocks: () => ft("GET", "/maw-builder/blocks"),
  patterns: () => ft("GET", "/maw-builder/patterns"),
  savePattern: (t) => ft("POST", "/maw-builder/patterns", t),
  deletePattern: (t) => ft("DELETE", "/maw-builder/patterns/" + encodeURIComponent(t)),
  /** ctx: {kind:'page', route} | {kind:'flex', type, key} | {kind:'section', id} */
  preview: (t, e, n) => ft("POST", "/maw-builder/preview", { ...yn(t), blocks: e, field: n }),
  /** Media stored with the page or Flex object being edited (global sections have none: they use the site library). */
  ownMedia: (t) => t.kind === "section" ? Promise.resolve([]) : ft("GET", Ml(t)),
  /** What's saved on the server: {modified, matches (when blocks are given), saved_by}. */
  state: (t, e, n) => ft("POST", "/maw-builder/state", { ...yn(t), field: e, ...n ? { blocks: n } : {} }),
  /** Presence heartbeat: {you, editors: [other sessions], modified, saved_by}. */
  presence: (t, e, n) => ft("POST", "/maw-builder/presence", { ...yn(t), session: e, editing: n }),
  /** Sent while the page may be unloading: keepalive lets it finish. */
  releasePresence: (t, e) => ft("DELETE", "/maw-builder/presence?" + new URLSearchParams({ ...yn(t), session: e }), void 0, { keepalive: !0 }),
  /** Copy media files referenced by pasted blocks: {copied, skipped, missing, refused}. */
  copyMedia: (t, e, n) => ft("POST", "/maw-builder/media/copy", { from: t, to: yn(e), files: n }),
  revisions: (t) => ft("GET", "/maw-builder/revisions?" + new URLSearchParams(yn(t))),
  revision: (t, e) => ft("GET", `/maw-builder/revisions/${encodeURIComponent(e)}?` + new URLSearchParams(yn(t))),
  sections: () => ft("GET", "/maw-builder/sections"),
  section: (t) => ft("GET", `/maw-builder/sections/${encodeURIComponent(t)}`),
  createSection: (t, e) => ft("POST", "/maw-builder/sections", { title: t, blocks: e }),
  updateSection: (t, e, n = !1) => ft("PATCH", `/maw-builder/sections/${encodeURIComponent(t)}${n ? "?force=1" : ""}`, e),
  deleteSection: (t, e = !1) => ft("DELETE", `/maw-builder/sections/${encodeURIComponent(t)}${e ? "?force=1" : ""}`),
  uploadOwnMedia: (t, e) => {
    const n = new FormData();
    return [...e].forEach((r) => n.append("files[]", r)), ft("POST", Ml(t), n);
  },
  siteMedia: (t = "", e = "") => {
    const n = new URLSearchParams({ per_page: "200" });
    return t && n.set("path", t), e && n.set("search", e), ft("GET", `/media?${n}`);
  },
  uploadSiteMedia: (t, e = "") => {
    const n = new FormData();
    return [...t].forEach((r) => n.append("files[]", r)), ft("POST", `/media${e ? "?path=" + encodeURIComponent(e) : ""}`, n);
  }
}, ud = 15e3, dd = () => crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).slice(2, 12);
var xr, Sr, Er, Mr, ns, Sn, Is, js, Tr, qs, Sa;
class vd {
  constructor(e) {
    H(this, qs);
    H(this, xr, /* @__PURE__ */ q(et(
      []
      // other live sessions [{session, user, fullname, since, editing}]
    )));
    H(this, Sr, /* @__PURE__ */ q(null));
    H(this, Er, /* @__PURE__ */ q(null));
    vt(this, "me", "");
    H(this, Mr, dd());
    H(this, ns, 0);
    H(this, Sn, null);
    H(this, Is, /* @__PURE__ */ new Set());
    H(this, js, !1);
    H(this, Tr, () => pe(this, qs, Sa).call(this));
    this.store = e;
  }
  get others() {
    return s(c(this, xr));
  }
  set others(e) {
    m(c(this, xr), e, !0);
  }
  get joined() {
    return s(c(this, Sr));
  }
  set joined(e) {
    m(c(this, Sr), e, !0);
  }
  get stale() {
    return s(c(this, Er));
  }
  set stale(e) {
    m(c(this, Er), e, !0);
  }
  get editors() {
    return this.others.filter((e) => e.editing);
  }
  get editing() {
    return this.store.open && !this.store.readOnly && !c(this, js);
  }
  start() {
    c(this, ns) || (this.beat(), re(this, ns, setInterval(() => this.beat(), ud)), window.addEventListener("pagehide", c(this, Tr)));
  }
  stop() {
    clearInterval(c(this, ns)), re(this, ns, 0), window.removeEventListener("pagehide", c(this, Tr)), pe(this, qs, Sa).call(this);
  }
  async beat() {
    const e = this.store;
    if (!e.canPreview) return;
    const n = e.ownerKey, r = Vn(e.context);
    c(this, Sn) && c(this, Sn).key !== n && (pe(this, qs, Sa).call(this), c(this, Is).clear(), this.others = [], this.stale = null), re(this, Sn, { key: n, ctx: r });
    let a;
    try {
      a = await Xe.presence(r, c(this, Mr), this.editing);
    } catch {
      return;
    }
    if (n !== e.ownerKey) return;
    this.me = a.you || "";
    const i = a.editors || [];
    if (this.editing) {
      const l = i.find((o) => o.editing && !c(this, Is).has(o.session));
      l && (this.joined = l);
    }
    re(this, Is, new Set(i.filter((l) => l.editing).map((l) => l.session))), this.others = i, e.open && !e.saving && a.modified && e.baseModified && a.modified > e.baseModified && !(this.stale && this.stale.modified === a.modified) && (this.stale = {
      by: a.saved_by && a.saved_by !== this.me ? a.saved_by : "",
      modified: a.modified
    });
  }
  /** Builder opened: start read-only when someone else is already editing. */
  async claim() {
    re(this, js, !0), this.joined = null, await this.beat(), re(this, js, !1), this.store.readOnly = this.editors.length > 0, this.store.readOnly || await this.beat();
  }
  /** Take over editing despite another editor. */
  async editAnyway() {
    this.store.readOnly = !1, await this.beat();
  }
  /** Builder closed: back to viewing. */
  async leave() {
    this.store.readOnly = !1, this.joined = null, this.stale = null, await this.beat();
  }
  /** Accept the newer server version as the base (after reloading it, or deciding to keep ours). */
  acknowledgeStale() {
    this.stale && (this.store.baseModified = this.stale.modified), this.stale = null;
  }
}
xr = new WeakMap(), Sr = new WeakMap(), Er = new WeakMap(), Mr = new WeakMap(), ns = new WeakMap(), Sn = new WeakMap(), Is = new WeakMap(), js = new WeakMap(), Tr = new WeakMap(), qs = new WeakSet(), Sa = function() {
  c(this, Sn) && Xe.releasePresence(c(this, Sn).ctx, c(this, Mr)).catch(() => {
  }), re(this, Sn, null);
};
function As(t) {
  const e = String((t == null ? void 0 : t.fullname) || (t == null ? void 0 : t.user) || "?"), n = e.split(/\s+/).filter(Boolean).slice(0, 2).map((a) => a[0].toUpperCase()).join("") || "?";
  let r = 0;
  for (const a of String((t == null ? void 0 : t.user) || e)) r = r * 31 + a.charCodeAt(0) | 0;
  return { initials: n, color: `hsl(${Math.abs(r) % 360} 60% 42%)`, name: e };
}
var fd = /* @__PURE__ */ x('<span class="err svelte-1uadtto"> </span>'), hd = /* @__PURE__ */ x('<span class="avatar svelte-1uadtto"> </span>'), pd = /* @__PURE__ */ x('<p><!> <span class="svelte-1uadtto"><!></span></p>'), gd = /* @__PURE__ */ x('<p class="warn svelte-1uadtto"> </p>'), bd = /* @__PURE__ */ x('<span class="badge svelte-1uadtto">Hidden</span>'), md = /* @__PURE__ */ x('<span class="badge svelte-1uadtto"> </span>'), _d = /* @__PURE__ */ x('<li draggable="true"><span class="grip svelte-1uadtto"><!></span> <span class="ico svelte-1uadtto"><!></span> <button type="button" class="row svelte-1uadtto"><strong class="svelte-1uadtto"> </strong> <span class="text svelte-1uadtto"> </span></button> <!></li>'), yd = /* @__PURE__ */ x('<ol class="svelte-1uadtto"></ol>'), kd = /* @__PURE__ */ x('<button type="button" class="empty svelte-1uadtto"><!> <span>Start building. Add your first section in the visual builder.</span></button>'), wd = /* @__PURE__ */ x('<div class="summary svelte-1uadtto"><header class="svelte-1uadtto"><div><div class="title svelte-1uadtto"> </div> <div class="sub svelte-1uadtto"><!></div></div> <button type="button" class="mb-btn primary"><!> Open Visual Builder</button></header> <!> <!> <!></div>');
function xd(t, e) {
  ot(e, !0);
  let n = /* @__PURE__ */ q(-1), r = /* @__PURE__ */ q(-1);
  const a = /* @__PURE__ */ se(() => {
    var T;
    return ((T = e.field) == null ? void 0 : T.label) || "Blocks";
  });
  function i(T) {
    s(n) >= 0 && T !== s(n) && e.store.move(s(n), T), m(n, -1), m(r, -1);
  }
  var l = wd(), o = h(l), u = h(o), v = h(u), _ = $(v, !0), S = d(v, 2), g = h(S);
  {
    var p = (T) => {
      var L = fd(), f = $(L, !0);
      z(() => F(f, e.store.loadError)), y(T, L);
    }, b = (T) => {
      var L = nn();
      z(() => F(L, `${e.store.blocks.length ?? ""} ${e.store.blocks.length === 1 ? "section" : "sections"} · drag to reorder, click to edit`)), y(T, L);
    };
    B(g, (T) => {
      e.store.loadError ? T(p) : T(b, -1);
    });
  }
  var M = d(u, 2), k = h(M);
  K(k, { name: "maximize", size: 15 });
  var C = d(o, 2);
  {
    var O = (T) => {
      const L = /* @__PURE__ */ se(() => e.store.presence.editors);
      var f = pd();
      let w;
      var j = h(f);
      qe(j, 17, () => e.store.presence.others.slice(0, 5), (N) => N.session, (N, ee) => {
        const Z = /* @__PURE__ */ se(() => As(s(ee)));
        var te = hd();
        let Se;
        var ye = $(te, !0);
        z(() => {
          ve(te, "title", s(Z).name), Se = At(te, "", Se, { background: s(Z).color }), F(ye, s(Z).initials);
        }), y(N, te);
      });
      var he = d(j, 2), ie = h(he);
      {
        var ce = (N) => {
          var ee = nn();
          z((Z) => F(ee, `${Z ?? ""} ${s(L).length === 1 ? "is" : "are"} editing in the visual builder. Opening it starts read-only.`), [() => s(L).map((Z) => As(Z).name).join(", ")]), y(N, ee);
        }, A = (N) => {
          var ee = nn();
          z((Z) => F(ee, `${Z ?? ""} also ${e.store.presence.others.length === 1 ? "has" : "have"} this open.`), [
            () => e.store.presence.others.map((Z) => As(Z).name).join(", ")
          ]), y(N, ee);
        };
        B(ie, (N) => {
          s(L).length ? N(ce) : N(A, -1);
        });
      }
      z(() => w = Le(f, 1, "presence svelte-1uadtto", null, w, { editing: s(L).length })), y(T, f);
    };
    B(C, (T) => {
      var L;
      (L = e.store.presence) != null && L.others.length && T(O);
    });
  }
  var D = d(C, 2);
  {
    var G = (T) => {
      var L = gd(), f = $(L, !0);
      z(() => F(f, e.store.isFlex ? "Save this item first. The visual builder previews saved items." : "Save the page first. The visual builder needs a page URL to preview.")), y(T, L);
    };
    B(D, (T) => {
      e.store.canPreview || T(G);
    });
  }
  var R = d(D, 2);
  {
    var V = (T) => {
      var L = yd();
      qe(L, 23, () => e.store.blocks, (f, w) => w + ":" + f.type, (f, w, j) => {
        const he = /* @__PURE__ */ se(() => e.store.defFor(s(w).type));
        var ie = _d();
        let ce;
        var A = h(ie), N = h(A);
        K(N, { name: "grip", size: 14 });
        var ee = d(A, 2), Z = h(ee);
        {
          let fe = /* @__PURE__ */ se(() => {
            var ae;
            return ((ae = s(he)) == null ? void 0 : ae.icon) || "fa-square";
          });
          K(Z, {
            get fa() {
              return s(fe);
            },
            size: 15
          });
        }
        var te = d(ee, 2), Se = h(te), ye = $(Se, !0), oe = d(Se, 2), me = $(oe, !0), De = d(te, 2);
        {
          var W = (fe) => {
            var ae = bd();
            y(fe, ae);
          }, Y = (fe) => {
            var ae = md(), ue = $(ae);
            z((de) => F(ue, `Hidden on ${de ?? ""}`), [() => Ts(s(w)).join(", ")]), y(fe, ae);
          }, ge = /* @__PURE__ */ se(() => Ts(s(w)).length);
          B(De, (fe) => {
            s(w).hidden ? fe(W) : s(ge) && fe(Y, 1);
          });
        }
        z(
          (fe) => {
            var ae;
            ce = Le(ie, 1, "svelte-1uadtto", null, ce, {
              over: s(r) === s(j),
              "hidden-block": s(w).hidden
            }), F(ye, ((ae = s(he)) == null ? void 0 : ae.title) || s(w).type), F(me, fe);
          },
          [
            () => {
              var fe;
              return s(w).type === "global" ? e.store.sectionTitle((fe = s(w).global) == null ? void 0 : fe.section) : Yi(s(w));
            }
          ]
        ), st("dragstart", ie, () => m(n, s(j), !0)), st("dragover", ie, (fe) => {
          fe.preventDefault(), m(r, s(j), !0);
        }), st("dragleave", ie, () => m(r, -1)), st("drop", ie, () => i(s(j))), st("dragend", ie, () => {
          m(n, -1), m(r, -1);
        }), P("click", te, () => e.openBuilder(s(j))), y(f, ie);
      }), y(T, L);
    }, I = (T) => {
      var L = kd(), f = h(L);
      K(f, { name: "plus", size: 18 }), z(() => L.disabled = !e.store.canPreview), P("click", L, () => e.openBuilder(-1)), y(T, L);
    };
    B(R, (T) => {
      e.store.blocks.length ? T(V) : T(I, -1);
    });
  }
  z(() => {
    F(_, s(a)), M.disabled = !e.store.canPreview;
  }), P("click", M, () => e.openBuilder(-1)), y(t, l), ct();
}
ht(["click"]);
var Sd = /* @__PURE__ */ x('<button type="button" class="card svelte-1cvfiky" draggable="true"><span class="ico svelte-1cvfiky"><!></span> <span class="name svelte-1cvfiky"> </span></button>'), Ed = /* @__PURE__ */ x('<section class="svelte-1cvfiky"><h3 class="svelte-1cvfiky"> </h3> <div class="grid svelte-1cvfiky"></div></section>'), Md = /* @__PURE__ */ x('<p class="hint svelte-1cvfiky"> </p>'), Td = /* @__PURE__ */ x('<div class="search svelte-1cvfiky"><!> <input type="search" placeholder="Search blocks" aria-label="Search blocks" class="svelte-1cvfiky"/></div> <p class="hint svelte-1cvfiky"> </p> <!>', 1);
function Ad(t, e) {
  ot(e, !0);
  let n = Ye(e, "store", 7), r = /* @__PURE__ */ q("");
  const a = /* @__PURE__ */ se(() => {
    var O;
    const b = s(r).trim().toLowerCase(), M = (((O = n().catalog) == null ? void 0 : O.blocks) || []).filter((D) => !D.virtual).filter((D) => !b || D.title.toLowerCase().includes(b) || D.type.includes(b) || (D.description || "").toLowerCase().includes(b)), k = Object.keys(El), C = /* @__PURE__ */ new Map();
    for (const D of M)
      C.has(D.category) || C.set(D.category, []), C.get(D.category).push(D);
    return [...C.entries()].sort((D, G) => {
      const R = k.indexOf(D[0]), V = k.indexOf(G[0]);
      return (R < 0 ? 99 : R) - (V < 0 ? 99 : V);
    });
  });
  function i(b, M) {
    b.dataTransfer.setData("application/x-maw-block", M), b.dataTransfer.setData("text/plain", M), b.dataTransfer.effectAllowed = "copy", requestAnimationFrame(() => n().dragType = M);
  }
  function l() {
    n().dragType = "";
  }
  var o = Td(), u = Te(o), v = h(u);
  K(v, { name: "search", size: 14 });
  var _ = d(v, 2), S = d(u, 2), g = $(S), p = d(S, 2);
  qe(
    p,
    17,
    () => s(a),
    ([b, M]) => b,
    (b, M) => {
      var k = /* @__PURE__ */ se(() => Ha(s(M), 2));
      let C = () => s(k)[0], O = () => s(k)[1];
      var D = Ed(), G = h(D), R = $(G, !0), V = d(G, 2);
      qe(V, 21, O, (I) => I.type, (I, T) => {
        var L = Sd(), f = h(L), w = h(f);
        K(w, {
          get fa() {
            return s(T).icon;
          },
          size: 18
        });
        var j = d(f, 2), he = $(j, !0);
        z(() => {
          ve(L, "title", s(T).description), F(he, s(T).title);
        }), st("dragstart", L, (ie) => i(ie, s(T).type)), st("dragend", L, l), P("click", L, () => n().insert(s(T).type)), y(I, L);
      }), z(() => F(R, El[C()] || C())), y(b, D);
    },
    (b) => {
      var M = Md(), k = $(M);
      z(() => F(k, `No blocks match “${s(r) ?? ""}”.`)), y(b, M);
    }
  ), z(() => F(g, `${n().selected >= 0 ? `Inserts after block ${n().selected + 1}` : "Inserts at the end of the page"} · or drag onto the page`)), bn(_, () => s(r), (b) => m(r, b)), y(t, o), ct();
}
ht(["click"]);
var Cd = /* @__PURE__ */ x('<button type="button"><!> </button>'), Od = /* @__PURE__ */ x('<div role="group"></div>');
function Js(t, e) {
  ot(e, !0);
  let n = Ye(e, "options", 19, () => []), r = Ye(e, "label", 3, ""), a = Ye(e, "size", 3, "");
  var i = Od();
  let l;
  qe(i, 21, n, (o) => o.value, (o, u) => {
    var v = Cd();
    let _;
    var S = h(v);
    {
      var g = (b) => {
        K(b, {
          get name() {
            return s(u).icon;
          },
          size: 12
        });
      };
      B(S, (b) => {
        s(u).icon && b(g);
      });
    }
    var p = d(S, 1, !0);
    z(() => {
      ve(v, "aria-pressed", e.value === s(u).value), v.disabled = s(u).disabled, ve(v, "title", s(u).title || null), _ = Le(v, 1, "", null, _, { active: e.value === s(u).value }), F(p, s(u).label);
    }), P("click", v, () => {
      var b;
      return e.value !== s(u).value && ((b = e.onchange) == null ? void 0 : b.call(e, s(u).value));
    }), y(o, v);
  }), z(() => {
    l = Le(i, 1, "mb-seg", null, l, { sm: a() === "sm" }), ve(i, "aria-label", r());
  }), y(t, i), ct();
}
ht(["click"]);
var Pd = /* @__PURE__ */ x('<div class="global svelte-k3gmal"><span class="gico svelte-k3gmal"><!></span> <div class="meta svelte-k3gmal"><strong class="svelte-k3gmal"> </strong> <span class="svelte-k3gmal"> </span></div> <div class="acts svelte-k3gmal"><button type="button" class="mb-btn sm primary" title="Insert on this page"><!> Insert</button> <button type="button" class="mb-btn sm" title="Edit this global section"><!></button></div></div>'), zd = /* @__PURE__ */ x('<p class="empty svelte-k3gmal">No global sections yet. Select a block, open its <strong>Advanced</strong> tab and click <strong>Make global section</strong>.</p>'), Dd = /* @__PURE__ */ x('<p class="hint svelte-k3gmal">Global sections are edited once and update on every page that uses them. Inserting one places a live reference, not a copy.</p> <!>', 1), Nd = /* @__PURE__ */ x("<span></span>"), Ld = /* @__PURE__ */ x('<button type="button" class="mb-btn ghost icon sm del svelte-k3gmal" title="Delete pattern"><!></button>'), Rd = /* @__PURE__ */ x('<div><button type="button" class="preview svelte-k3gmal"><div class="mini svelte-k3gmal"></div> <div class="pmeta svelte-k3gmal"><strong class="svelte-k3gmal"> </strong> <span class="svelte-k3gmal"> </span></div></button> <!></div>'), Id = /* @__PURE__ */ x('<p class="empty svelte-k3gmal"> </p>'), jd = /* @__PURE__ */ x('<div class="filter svelte-k3gmal"><!></div> <!>', 1);
function qd(t, e) {
  ot(e, !0);
  let n = /* @__PURE__ */ q("section");
  const r = /* @__PURE__ */ se(() => e.store.patterns.filter((b) => b.category === s(n)));
  async function a(b) {
    if (b.category === "page" && e.store.blocks.length) {
      const M = await e.askConfirm({
        title: `Use “${b.title}”`,
        message: `This layout has ${b.blocks.length} sections. Replace the current page content or add it to the end?`,
        choices: [
          { label: "Cancel", value: null },
          { label: "Add to end", value: "append" },
          { label: "Replace page", value: "replace", primary: !0 }
        ]
      });
      if (!M) return;
      e.store.insertMany(b.blocks, M === "append" ? e.store.blocks.length : null, M === "replace");
    } else
      e.store.insertMany(b.blocks);
    e.store.flash(`Inserted “${b.title}”`);
  }
  async function i(b) {
    if (await e.askConfirm({
      title: "Delete pattern",
      message: `Delete “${b.title}”? Pages that already use it are not affected.`,
      choices: [
        { label: "Cancel", value: !1 },
        { label: "Delete", value: !0, primary: !0 }
      ]
    }))
      try {
        await e.store.deletePattern(b.id);
      } catch (k) {
        e.store.flash(k.message);
      }
  }
  async function l(b) {
    try {
      await e.store.openSection(b.id);
    } catch (M) {
      e.store.flash(M.message);
    }
  }
  function o(b) {
    var M;
    return ((M = e.store.defFor(b)) == null ? void 0 : M.title) || b;
  }
  var u = jd(), v = Te(u), _ = h(v);
  {
    let b = /* @__PURE__ */ se(() => [
      { value: "section", label: "Sections" },
      { value: "page", label: "Layouts" },
      ...e.store.isSection ? [] : [{ value: "global", label: "Global", icon: "globe" }]
    ]);
    Js(_, {
      label: "Pattern kind",
      get value() {
        return s(n);
      },
      onchange: (M) => {
        m(n, M, !0), M === "global" && e.store.refreshSections();
      },
      get options() {
        return s(b);
      }
    });
  }
  var S = d(v, 2);
  {
    var g = (b) => {
      var M = Dd(), k = d(Te(M), 2);
      qe(
        k,
        17,
        () => e.store.sections,
        (C) => C.id,
        (C, O) => {
          var D = Pd(), G = h(D), R = h(G);
          K(R, { name: "globe", size: 16 });
          var V = d(G, 2), I = h(V), T = $(I, !0), L = d(I, 2), f = $(L), w = d(V, 2), j = h(w), he = h(j);
          K(he, { name: "plus", size: 12 });
          var ie = d(j, 2), ce = h(ie);
          K(ce, { name: "edit", size: 12 }), z(() => {
            F(T, s(O).title), F(f, `${s(O).count ?? ""} ${s(O).count === 1 ? "block" : "blocks"}${s(O).updated_by ? ` · edited by ${s(O).updated_by}` : ""}`);
          }), P("click", j, () => e.store.insertGlobal(s(O).id)), P("click", ie, () => l(s(O))), y(C, D);
        },
        (C) => {
          var O = zd();
          y(C, O);
        }
      ), y(b, M);
    }, p = (b) => {
      var M = Ct(), k = Te(M);
      qe(
        k,
        17,
        () => s(r),
        (C) => C.id,
        (C, O) => {
          const D = /* @__PURE__ */ se(() => {
            var ce;
            return ((ce = s(O).unknown) == null ? void 0 : ce.length) > 0;
          });
          var G = Rd();
          let R;
          var V = h(G), I = h(V);
          qe(I, 21, () => s(O).blocks.slice(0, 6), wt, (ce, A) => {
            var N = Nd();
            let ee;
            z(() => ee = Le(N, 1, `bar ${s(A).type ?? ""}`, "svelte-k3gmal", ee, {
              accent: s(A).background === "accent" || s(A).type === "cta",
              alt: s(A).background === "alt" || s(A).background === "soft",
              dark: s(A).background === "dark"
            })), y(ce, N);
          });
          var T = d(I, 2), L = h(T), f = $(L, !0), w = d(L, 2), j = $(w, !0), he = d(V, 2);
          {
            var ie = (ce) => {
              var A = Ld(), N = h(A);
              K(N, { name: "trash", size: 13 }), P("click", A, () => i(s(O))), y(ce, A);
            };
            B(he, (ce) => {
              s(O).source === "user" && ce(ie);
            });
          }
          z(
            (ce, A) => {
              R = Le(G, 1, "pattern svelte-k3gmal", null, R, { unusable: s(D) }), V.disabled = s(D), ve(V, "title", ce), F(f, s(O).title), F(j, A);
            },
            [
              () => s(D) ? `Uses block types this theme does not have: ${s(O).unknown.join(", ")}` : "Insert pattern",
              () => s(D) ? `Needs block types this theme lacks: ${s(O).unknown.join(", ")}` : s(O).description || s(O).blocks.map((ce) => o(ce.type)).join(" · ")
            ]
          ), P("click", V, () => a(s(O))), y(C, G);
        },
        (C) => {
          var O = Id(), D = $(O);
          z(() => F(D, `No ${s(n) === "page" ? "page layouts" : "sections"} yet. Select blocks and click “Save as pattern” to create one.`)), y(C, O);
        }
      ), y(b, M);
    };
    B(S, (b) => {
      s(n) === "global" ? b(g) : b(p, -1);
    });
  }
  y(t, u), ct();
}
ht(["click"]);
var Fd = /* @__PURE__ */ x('<p class="empty svelte-1jf4jiu">This page has no blocks yet. Add one from the Blocks tab.</p>'), Bd = /* @__PURE__ */ x('<span class="count svelte-1jf4jiu"> </span>'), Ud = /* @__PURE__ */ x('<div class="tools svelte-1jf4jiu"><button type="button" class="mb-btn sm ghost" title="Select all (Ctrl+A)"><!> Select all</button> <!> <span class="spacer svelte-1jf4jiu"></span> <button type="button" class="mb-btn sm ghost" title="Copy (Ctrl+C)"><!> Copy</button> <button type="button" class="mb-btn sm ghost" title="Paste after the selection (Ctrl+V)"><!> Paste</button></div>'), Hd = /* @__PURE__ */ x('<span class="dev-off svelte-1jf4jiu"></span>'), Kd = /* @__PURE__ */ x('<li><span class="grip svelte-1jf4jiu"><!></span> <button type="button" class="row svelte-1jf4jiu" title="Click to select · Shift+click for a range · Ctrl/Cmd+click to add"><!> <span class="t svelte-1jf4jiu"> </span> <span class="s svelte-1jf4jiu"> </span> <!></button> <span class="actions svelte-1jf4jiu"><button type="button" class="mb-btn ghost icon sm"><!></button> <button type="button" class="mb-btn ghost icon sm" title="Duplicate"><!></button> <button type="button" class="mb-btn ghost icon sm danger" title="Delete"><!></button></span></li>'), Gd = /* @__PURE__ */ x('<!> <ol class="svelte-1jf4jiu"></ol>', 1);
function Vd(t, e) {
  ot(e, !0);
  const n = { mobile: "phone", tablet: "tablet", desktop: "monitor" };
  let r = /* @__PURE__ */ q(-1), a = /* @__PURE__ */ q(-1);
  function i(g, p) {
    g.shiftKey ? e.store.rangeSelect(p) : g.ctrlKey || g.metaKey ? e.store.toggleSelect(p) : e.store.select(p);
  }
  function l(g) {
    s(r) >= 0 && e.store.move(s(r), g), m(r, m(a, -1), !0);
  }
  var o = Gd(), u = Te(o);
  {
    var v = (g) => {
      var p = Fd();
      y(g, p);
    }, _ = (g) => {
      var p = Ud(), b = h(p), M = h(b);
      K(M, { name: "select", size: 12 });
      var k = d(b, 2);
      {
        var C = (V) => {
          var I = Bd(), T = $(I);
          z(() => F(T, `${e.store.selection.length ?? ""} selected`)), y(V, I);
        };
        B(k, (V) => {
          e.store.selection.length > 1 && V(C);
        });
      }
      var O = d(k, 4), D = h(O);
      K(D, { name: "copy", size: 12 });
      var G = d(O, 2), R = h(G);
      K(R, { name: "clipboard", size: 12 }), z(() => {
        O.disabled = e.store.selected < 0, G.disabled = !e.store.clipboardAvailable || e.store.readOnly;
      }), P("click", b, () => e.store.selectAll()), P("click", O, () => e.store.copyBlocks()), P("click", G, () => e.store.pasteBlocks()), y(g, p);
    };
    B(u, (g) => {
      e.store.blocks.length ? g(_, -1) : g(v);
    });
  }
  var S = d(u, 2);
  qe(S, 23, () => e.store.blocks, (g, p) => p + g.type, (g, p, b) => {
    const M = /* @__PURE__ */ se(() => e.store.defFor(s(p).type));
    var k = Kd();
    let C;
    var O = h(k), D = h(O);
    K(D, { name: "grip", size: 13 });
    var G = d(O, 2), R = h(G);
    {
      let te = /* @__PURE__ */ se(() => {
        var Se;
        return (Se = s(M)) == null ? void 0 : Se.icon;
      });
      K(R, {
        get fa() {
          return s(te);
        },
        size: 14
      });
    }
    var V = d(R, 2), I = $(V, !0), T = d(V, 2), L = $(T, !0), f = d(T, 2);
    {
      var w = (te) => {
        var Se = Hd();
        qe(Se, 21, () => Ts(s(p)), wt, (ye, oe) => {
          K(ye, {
            get name() {
              return n[s(oe)];
            },
            size: 11
          });
        }), z((ye) => ve(Se, "title", `Hidden on ${ye ?? ""}`), [() => Ts(s(p)).join(", ")]), y(te, Se);
      }, j = /* @__PURE__ */ se(() => !s(p).hidden && Ts(s(p)).length);
      B(f, (te) => {
        s(j) && te(w);
      });
    }
    var he = d(G, 2), ie = h(he), ce = h(ie);
    {
      let te = /* @__PURE__ */ se(() => s(p).hidden ? "eye-off" : "eye");
      K(ce, {
        get name() {
          return s(te);
        },
        size: 13
      });
    }
    var A = d(ie, 2), N = h(A);
    K(N, { name: "copy", size: 13 });
    var ee = d(A, 2), Z = h(ee);
    K(Z, { name: "trash", size: 13 }), z(
      (te, Se) => {
        var ye;
        ve(k, "draggable", !e.store.readOnly), C = Le(k, 1, "svelte-1jf4jiu", null, C, {
          selected: te,
          over: s(a) === s(b),
          dim: s(p).hidden
        }), F(I, ((ye = s(M)) == null ? void 0 : ye.title) || s(p).type), F(L, Se), ve(ie, "title", s(p).hidden ? "Show" : "Hide");
      },
      [
        () => e.store.selection.includes(s(b)),
        () => {
          var te;
          return s(p).type === "global" ? e.store.sectionTitle((te = s(p).global) == null ? void 0 : te.section) : Yi(s(p));
        }
      ]
    ), st("dragstart", k, () => m(r, s(b), !0)), st("dragover", k, (te) => {
      te.preventDefault(), m(a, s(b), !0);
    }), st("dragleave", k, () => m(a, -1)), st("drop", k, () => l(s(b))), st("dragend", k, () => m(r, m(a, -1), !0)), P("click", G, (te) => i(te, s(b))), P("click", ie, () => e.store.toggleHidden(s(b))), P("click", A, () => e.store.duplicate(s(b))), P("click", ee, () => e.store.remove(s(b))), y(g, k);
  }), y(t, o), ct();
}
ht(["click"]);
var Yd = /* @__PURE__ */ x('<button type="button" role="option"><span class="ico svelte-18xya39"><!></span> <span class="txt svelte-18xya39"><strong class="svelte-18xya39"> </strong><span class="svelte-18xya39"> </span></span></button>'), Jd = /* @__PURE__ */ x('<p class="none svelte-18xya39">No blocks match.</p>'), Wd = /* @__PURE__ */ x('<div class="qi svelte-18xya39" role="dialog" aria-label="Add block"><div class="search svelte-18xya39"><!> <input placeholder="Search blocks…" aria-label="Search blocks" class="svelte-18xya39"/></div> <div class="list mb-scroll svelte-18xya39" role="listbox"></div></div>');
function Xd(t, e) {
  ot(e, !0);
  let n = Ye(e, "top", 3, 0), r = /* @__PURE__ */ q(""), a = /* @__PURE__ */ q(0), i = /* @__PURE__ */ q(void 0), l = /* @__PURE__ */ q(void 0);
  const o = /* @__PURE__ */ se(() => {
    var C;
    const k = s(r).trim().toLowerCase();
    return (((C = e.store.catalog) == null ? void 0 : C.blocks) || []).filter((O) => !k || O.title.toLowerCase().includes(k) || O.type.includes(k) || (O.description || "").toLowerCase().includes(k));
  });
  _t(() => {
    s(r), m(a, 0);
  });
  function u(k) {
    e.store.insert(k.type, e.index), e.onclose();
  }
  function v(k) {
    k.key === "ArrowDown" ? (k.preventDefault(), m(a, Math.min(s(a) + 1, s(o).length - 1), !0)) : k.key === "ArrowUp" ? (k.preventDefault(), m(a, Math.max(s(a) - 1, 0), !0)) : k.key === "Enter" && s(o)[s(a)] ? (k.preventDefault(), u(s(o)[s(a)])) : k.key === "Escape" && (k.preventDefault(), k.stopPropagation(), e.onclose());
  }
  ps(() => {
    var O;
    (O = s(i)) == null || O.focus();
    const k = (D) => {
      D.composedPath().includes(s(l)) || e.onclose();
    }, C = setTimeout(() => document.addEventListener("pointerdown", k, !0));
    return () => {
      clearTimeout(C), document.removeEventListener("pointerdown", k, !0);
    };
  });
  var _ = Wd();
  let S;
  var g = h(_), p = h(g);
  K(p, { name: "search", size: 14 });
  var b = d(p, 2);
  On(b, (k) => m(i, k), () => s(i));
  var M = d(g, 2);
  qe(
    M,
    23,
    () => s(o),
    (k) => k.type,
    (k, C, O) => {
      var D = Yd();
      let G;
      var R = h(D), V = h(R);
      K(V, {
        get fa() {
          return s(C).icon;
        },
        size: 16
      });
      var I = d(R, 2), T = h(I), L = $(T, !0), f = d(T), w = $(f, !0);
      z(() => {
        ve(D, "aria-selected", s(O) === s(a)), G = Le(D, 1, "svelte-18xya39", null, G, { active: s(O) === s(a) }), F(L, s(C).title), F(w, s(C).description);
      }), st("mouseenter", D, () => m(a, s(O), !0)), P("click", D, () => u(s(C))), y(k, D);
    },
    (k) => {
      var C = Jd();
      y(k, C);
    }
  ), On(_, (k) => m(l, k), () => s(l)), z(() => S = At(_, "", S, { top: `${n() ?? ""}px` })), P("keydown", b, v), bn(b, () => s(r), (k) => m(r, k)), y(t, _), ct();
}
ht(["keydown", "click"]);
var Zd = /* @__PURE__ */ x('<iframe title="Page preview" sandbox="allow-scripts"></iframe>'), Qd = /* @__PURE__ */ x('<div class="hover-box svelte-dfb6jk"><span class="tag svelte-dfb6jk"> </span></div>'), $d = /* @__PURE__ */ x('<button type="button" title="Move up (Alt+↑)" class="svelte-dfb6jk"><!></button> <button type="button" title="Move down (Alt+↓)" class="svelte-dfb6jk"><!></button> <button type="button" title="Duplicate (Ctrl+D)" class="svelte-dfb6jk"><!></button>', 1), ev = /* @__PURE__ */ x('<button type="button" title="Delete (Del)" class="danger svelte-dfb6jk"><!></button>'), tv = /* @__PURE__ */ x('<button type="button" class="add-gap svelte-dfb6jk" title="Add block below"><!><span class="svelte-dfb6jk">Add block</span></button>'), nv = /* @__PURE__ */ x('<div class="toolbar svelte-dfb6jk"><span class="name svelte-dfb6jk"> </span> <!> <button type="button" title="Copy (Ctrl+C)" class="svelte-dfb6jk"><!></button> <!></div> <!>', 1), sv = /* @__PURE__ */ x('<div class="quick-line svelte-dfb6jk"></div> <!>', 1), rv = /* @__PURE__ */ x('<div class="insert-line svelte-dfb6jk"></div>'), av = /* @__PURE__ */ x('<div class="drop-line svelte-dfb6jk"><span class="svelte-dfb6jk">Drop to insert here</span></div>'), iv = /* @__PURE__ */ x('<div class="drop-catcher svelte-dfb6jk" role="presentation"></div> <!>', 1), lv = /* @__PURE__ */ x('<div class="blank svelte-dfb6jk"><!> <strong class="svelte-dfb6jk">Your page is empty</strong> <span class="svelte-dfb6jk">Pick a block or a page layout from the left panel, or drag one here.</span></div>'), ov = /* @__PURE__ */ x('<div class="error svelte-dfb6jk"> </div>'), cv = /* @__PURE__ */ x('<div class="viewport svelte-dfb6jk"><div><div class="stage svelte-dfb6jk"><!> <div class="overlay svelte-dfb6jk"><!> <!> <!> <!> <!></div> <!> <!></div></div></div> <div role="status" aria-live="polite"><span class="spinner svelte-dfb6jk"></span> <span class="svelte-dfb6jk"> </span></div>', 1);
function uv(t, e) {
  ot(e, !0);
  let n = Ye(e, "store", 7), r = Ye(e, "width", 3, null), a = et([
    { src: "about:blank", key: 0 },
    { src: "about:blank", key: 1 }
  ]), i = /* @__PURE__ */ q(
    0
    // index of the visible frame
  ), l = [], o = /* @__PURE__ */ q(!0), u = /* @__PURE__ */ q(""), v = /* @__PURE__ */ q(et([])), _ = /* @__PURE__ */ q(-1), S = 0, g = /* @__PURE__ */ q(
    -1
    // insertion index while dragging a block from the inserter
  ), p = /* @__PURE__ */ q(void 0), b = 0, M = 0, k = "", C = /* @__PURE__ */ q(
    null
    // {index, top} while the canvas block picker is open
  ), O = /* @__PURE__ */ q(600), D = !1;
  const G = (Q, X) => Q == null ? void 0 : Q.postMessage({ source: "maw-builder", ...X }, "*"), R = /* @__PURE__ */ se(() => s(o) || !!n().busy);
  let V = /* @__PURE__ */ q(!1), I = /* @__PURE__ */ q("Updating preview…"), T = 0;
  _t(() => {
    s(R) ? (n().busy ? m(I, n().busy, !0) : s(o) && !n().blocks.length && m(I, "Loading preview…"), clearTimeout(T), s(V) || (T = setTimeout(() => m(V, !0), 250))) : (clearTimeout(T), m(V, !1));
  });
  function L() {
    m(o, !1), n().busy = "", n().pendingInsert = null;
  }
  function f() {
    k = "", w(0);
  }
  function w(Q = 450) {
    clearTimeout(b), b = setTimeout(j, Q);
  }
  async function j() {
    if (!n().canPreview) return;
    const Q = n().snapshot(), X = JSON.stringify(Q);
    if (X === n().renderedPayload) {
      k = X, s(o) || L();
      return;
    }
    if (X === k) {
      s(o) || L();
      return;
    }
    k = X;
    const be = ++M;
    m(o, !0), m(u, "");
    try {
      const J = await Xe.preview(n().context, Q, n().fieldName);
      if (be !== M) return;
      const Ie = s(i) === 0 ? 1 : 0;
      a[Ie] = { src: J.url + "&_t=" + be, key: a[Ie].key };
    } catch (J) {
      be === M && (m(u, J.message, !0), L());
    }
  }
  _t(() => {
    JSON.stringify(n().blocks), n().catalog && w();
  });
  let he = -1;
  _t(() => {
    var J;
    const Q = n().selected, X = [...n().multi], be = Q !== he;
    if (he = Q, s(R)) {
      be && (D = !0);
      return;
    }
    G((J = l[s(i)]) == null ? void 0 : J.contentWindow, { type: "select", index: Q, multi: X, scroll: be });
  }), _t(() => {
    var X;
    const Q = n().readOnly;
    s(R) || G((X = l[s(i)]) == null ? void 0 : X.contentWindow, { type: "readonly", value: Q });
  }), ps(() => {
    const Q = (X) => {
      var Ie;
      const be = l.findIndex((Ue) => Ue && Ue.contentWindow === X.source);
      if (be < 0 || X.origin !== "null" || ((Ie = X.data) == null ? void 0 : Ie.source) !== "maw-preview") return;
      const J = X.data;
      if (J.type === "hello") {
        G(X.source, { type: "hello" });
        return;
      }
      if (J.type === "ready") {
        if (be !== s(i)) {
          G(X.source, { type: "scrollTo", y: S }), G(X.source, {
            type: "select",
            index: n().selected,
            multi: [...n().multi],
            scroll: D,
            behavior: "smooth"
          }), G(X.source, { type: "readonly", value: n().readOnly }), D = !1;
          const Ue = n().pendingFocus;
          n().pendingFocus = null, requestAnimationFrame(() => {
            m(i, be, !0), L(), Ue && G(X.source, { type: "focus-edit", index: Ue.index, path: Ue.path });
          });
        } else
          L();
        m(v, J.rects || [], !0), J.palette && J.palette.none && (n().palette = J.palette);
        return;
      }
      if (be === s(i))
        if (J.type === "rects")
          m(v, J.rects, !0), S = J.scrollY || 0;
        else if (J.type === "hover") m(_, J.index, !0);
        else if (J.type === "select")
          J.range ? n().rangeSelect(J.index) : J.toggle ? n().toggleSelect(J.index) : n().select(J.index);
        else if (J.type === "key") window.dispatchEvent(new KeyboardEvent("keydown", {
          key: J.key,
          code: J.code,
          ctrlKey: J.ctrlKey,
          metaKey: J.metaKey,
          shiftKey: J.shiftKey,
          altKey: J.altKey,
          bubbles: !0,
          cancelable: !0
        }));
        else if (J.type === "paste") document.dispatchEvent(new CustomEvent("maw-paste-text", { detail: String(J.text || "") }));
        else if (J.type === "inline") n().inlineSet(J.index, J.path, String(J.value ?? ""));
        else if (J.type === "inline-md") n().inlineSetMarkdown(J.index, J.path, String(J.value ?? ""));
        else if (J.type === "list-op") n().listOp(J);
        else if (J.type === "image-pick")
          n().select(J.index), n().imagePick = { index: J.index, path: J.path };
        else if (J.type === "md-request") {
          const Ue = n().getPath(J.index, J.path);
          G(X.source, {
            type: "md-value",
            req: J.req,
            value: typeof Ue == "string" ? Ue : ""
          });
        } else J.type === "inline-start" ? (n().inlineEditing = !0, (n().selected !== J.index || n().selection.length > 1) && n().select(J.index)) : J.type === "inline-end" && (n().inlineEditing = !1);
    };
    return window.addEventListener("message", Q), w(0), () => {
      window.removeEventListener("message", Q), clearTimeout(b);
    };
  });
  const ie = /* @__PURE__ */ se(() => s(R) || n().inlineEditing ? null : s(v).find((Q) => Q.index === n().selected)), ce = /* @__PURE__ */ se(() => s(ie) ? Math.min(s(ie).top + s(ie).height, s(O) - 24) : 0), A = /* @__PURE__ */ se(() => s(_) !== n().selected ? s(v).find((Q) => Q.index === s(_)) : null);
  function N(Q) {
    const X = s(p).getBoundingClientRect(), be = Q - X.top;
    if (!s(v).length) return n().blocks.length;
    let J = n().blocks.length, Ie = 1 / 0;
    const Ue = [...s(v)].sort((Qe, St) => Qe.top - St.top);
    return Ue.forEach((Qe, St) => {
      var zn;
      const Et = Math.abs(be - Qe.top);
      Et < Ie && (Ie = Et, J = Qe.index);
      const Pt = Math.abs(be - (Qe.top + Qe.height));
      Pt < Ie && (Ie = Pt, J = ((zn = Ue[St + 1]) == null ? void 0 : zn.index) ?? Qe.index + 1);
    }), J;
  }
  function ee(Q) {
    const X = s(v).find((J) => J.index === Q);
    if (X) return X.top;
    const be = s(v).reduce((J, Ie) => Ie.index > ((J == null ? void 0 : J.index) ?? -1) ? Ie : J, null);
    return be ? be.top + be.height : 0;
  }
  const Z = /* @__PURE__ */ se(() => !!n().dragType);
  function te(Q) {
    Q.preventDefault(), Q.dataTransfer.dropEffect = "copy", m(g, N(Q.clientY), !0);
  }
  function Se(Q) {
    Q.preventDefault();
    const X = n().dragType || Q.dataTransfer.getData("application/x-maw-block") || Q.dataTransfer.getData("text/plain"), be = s(g) >= 0 ? s(g) : N(Q.clientY);
    n().dragType = "", m(g, -1), X && n().defFor(X) && n().insert(X, be);
  }
  _t(() => {
    n().dragType || m(g, -1);
  });
  const ye = (Q) => {
    var be, J;
    const X = n().blocks[Q];
    return (X == null ? void 0 : X.type) === "global" ? "Global · " + n().sectionTitle((be = X.global) == null ? void 0 : be.section) : ((J = n().defFor(X == null ? void 0 : X.type)) == null ? void 0 : J.title) || (X == null ? void 0 : X.type) || "";
  };
  var oe = { refresh: f }, me = cv(), De = Te(me), W = h(De);
  let Y, ge;
  var fe = h(W), ae = h(fe);
  qe(ae, 19, () => a, (Q) => Q.key, (Q, X, be) => {
    var J = Zd();
    let Ie;
    On(J, (Ue, Qe) => l[Qe] = Ue, (Ue) => l == null ? void 0 : l[Ue], () => [s(be)]), z(() => {
      ve(J, "src", s(X).src), Ie = Le(J, 1, "svelte-dfb6jk", null, Ie, { hidden: s(be) !== s(i) });
    }), y(Q, J);
  });
  var ue = d(ae, 2), de = h(ue);
  {
    var le = (Q) => {
      var X = Qd();
      let be;
      var J = h(X), Ie = $(J, !0);
      z(
        (Ue) => {
          be = At(X, "", be, {
            top: `${s(A).top ?? ""}px`,
            height: `${s(A).height ?? ""}px`
          }), F(Ie, Ue);
        },
        [() => ye(s(A).index)]
      ), y(Q, X);
    };
    B(de, (Q) => {
      s(A) && !s(Z) && Q(le);
    });
  }
  var ke = d(de, 2);
  {
    var Ne = (Q) => {
      const X = /* @__PURE__ */ se(() => n().selection);
      var be = nv(), J = Te(be);
      let Ie;
      var Ue = h(J), Qe = $(Ue, !0), St = d(Ue, 2);
      {
        var Et = (We) => {
          var nt = $d(), pt = Te(nt), Nn = h(pt);
          K(Nn, { name: "up", size: 14 });
          var Un = d(pt, 2), bs = h(Un);
          K(bs, { name: "down", size: 14 });
          var ca = d(Un, 2), ms = h(ca);
          K(ms, { name: "copy", size: 14 }), z(
            (Ya) => {
              pt.disabled = s(X)[0] === 0, Un.disabled = Ya;
            },
            [() => s(X).at(-1) === n().blocks.length - 1]
          ), P("click", pt, () => n().moveSelection(-1)), P("click", Un, () => n().moveSelection(1)), P("click", ca, () => n().duplicateMany(s(X))), y(We, nt);
        };
        B(St, (We) => {
          n().readOnly || We(Et);
        });
      }
      var Pt = d(St, 2), zn = h(Pt);
      K(zn, { name: "clipboard", size: 14 });
      var gs = d(Pt, 2);
      {
        var Qs = (We) => {
          var nt = ev(), pt = h(nt);
          K(pt, { name: "trash", size: 14 }), P("click", nt, () => n().removeMany(s(X))), y(We, nt);
        };
        B(gs, (We) => {
          n().readOnly || We(Qs);
        });
      }
      var $s = d(J, 2);
      {
        var Dn = (We) => {
          var nt = tv();
          let pt;
          var Nn = h(nt);
          K(Nn, { name: "plus", size: 16 }), z(() => pt = At(nt, "", pt, { top: `${s(ce) ?? ""}px` })), P("click", nt, () => m(C, { index: n().selected + 1, top: s(ce) + 18 }, !0)), y(We, nt);
        };
        B($s, (We) => {
          !s(C) && !n().readOnly && s(X).length === 1 && We(Dn);
        });
      }
      z(
        (We, nt) => {
          Ie = At(J, "", Ie, { top: We }), F(Qe, nt);
        },
        [
          () => `${Math.max(6, s(ie).top + 6)}px`,
          () => s(X).length > 1 ? `${s(X).length} blocks selected` : ye(n().selected)
        ]
      ), P("click", Pt, () => n().copyBlocks(s(X))), y(Q, be);
    };
    B(ke, (Q) => {
      s(ie) && !s(Z) && Q(Ne);
    });
  }
  var Re = d(ke, 2);
  {
    var Ke = (Q) => {
      var X = sv(), be = Te(X);
      let J;
      var Ie = d(be, 2);
      {
        let Ue = /* @__PURE__ */ se(() => Math.min(s(C).top, s(O) - 380));
        Xd(Ie, {
          get store() {
            return n();
          },
          get index() {
            return s(C).index;
          },
          get top() {
            return s(Ue);
          },
          onclose: () => m(C, null)
        });
      }
      z(() => J = At(be, "", J, { top: `${s(C).top - 18}px` })), y(Q, X);
    };
    B(Re, (Q) => {
      s(C) && Q(Ke);
    });
  }
  var xe = d(Re, 2);
  {
    var we = (Q) => {
      var X = rv();
      let be;
      z((J) => be = At(X, "", be, { top: J }), [() => `${ee(n().pendingInsert.index) ?? ""}px`]), y(Q, X);
    };
    B(xe, (Q) => {
      n().pendingInsert && s(R) && Q(we);
    });
  }
  var Ae = d(xe, 2);
  {
    var Ee = (Q) => {
      var X = iv(), be = Te(X), J = d(be, 2);
      {
        var Ie = (Ue) => {
          var Qe = av();
          let St;
          z((Et) => St = At(Qe, "", St, { top: Et }), [() => `${ee(s(g)) ?? ""}px`]), y(Ue, Qe);
        };
        B(J, (Ue) => {
          s(g) >= 0 && Ue(Ie);
        });
      }
      st("dragover", be, te), st("drop", be, Se), st("dragleave", be, () => m(g, -1)), y(Q, X);
    };
    B(Ae, (Q) => {
      s(Z) && Q(Ee);
    });
  }
  var ze = d(ue, 2);
  {
    var Je = (Q) => {
      var X = lv(), be = h(X);
      K(be, { name: "sparkles", size: 28 }), y(Q, X);
    };
    B(ze, (Q) => {
      !n().blocks.length && !s(o) && Q(Je);
    });
  }
  var at = d(ze, 2);
  {
    var ut = (Q) => {
      var X = ov(), be = $(X);
      z(() => F(be, `Preview failed: ${s(u) ?? ""}`)), y(Q, X);
    };
    B(at, (Q) => {
      s(u) && Q(ut);
    });
  }
  On(fe, (Q) => m(p, Q), () => s(p));
  var Be = d(De, 2);
  let Xt;
  var mn = d(h(Be), 2), dt = $(mn, !0);
  return z(() => {
    Y = Le(W, 1, "device svelte-dfb6jk", null, Y, { framed: !!r() }), ge = At(W, "", ge, { width: r() ? r() + "px" : "100%" }), Xt = Le(Be, 1, "busy svelte-dfb6jk", null, Xt, { on: s(V) }), F(dt, s(I));
  }), Qu(fe, "clientHeight", (Q) => m(O, Q)), y(t, me), ct(oe);
}
ht(["click"]);
const Lo = (t) => /^\d+$/.test(t), dv = /* @__PURE__ */ new Set(["__proto__", "constructor", "prototype"]), vv = (t) => {
  if (dv.has(t)) throw new Error(`Refusing path segment "${t}"`);
  return Lo(t) ? Number(t) : t;
}, Ji = (t) => String(t).split(".").map(vv);
function Ro(t) {
  return (!t[t.type] || typeof t[t.type] != "object" || Array.isArray(t[t.type])) && (t[t.type] = {}), t[t.type];
}
function Tl(t, e) {
  let n = t && t[t.type];
  for (const r of Ji(e)) {
    if (n == null) return;
    n = n[r];
  }
  return n;
}
function fv(t, e, n) {
  const r = Ji(e);
  let a = Ro(t);
  for (let l = 0; l < r.length - 1; l++) {
    const o = r[l];
    (a[o] == null || typeof a[o] != "object") && (a[o] = typeof r[l + 1] == "number" ? [] : {}), a = a[o];
  }
  const i = r.at(-1);
  return Va(n) ? i in a ? (Array.isArray(a) ? a[i] = void 0 : delete a[i], !0) : !1 : a[i] === n ? !1 : (a[i] = n, !0);
}
function pa(t, e) {
  const n = Ji(e);
  let r = Ro(t);
  for (let i = 0; i < n.length - 1; i++) {
    const l = n[i];
    (r[l] == null || typeof r[l] != "object") && (r[l] = {}), r = r[l];
  }
  const a = n.at(-1);
  return Array.isArray(r[a]) || (r[a] = []), r[a];
}
const hv = (t) => JSON.parse(JSON.stringify(t)), Fn = {
  add(t, e) {
    return t.push(e), t.length - 1;
  },
  duplicate(t, e) {
    return t[e] === void 0 ? -1 : (t.splice(e + 1, 0, hv(t[e])), e + 1);
  },
  remove(t, e) {
    return t[e] === void 0 ? -1 : (t.splice(e, 1), Math.min(e, t.length - 1));
  },
  move(t, e, n) {
    if (n < 0 || n >= t.length || t[e] === void 0 || e === n) return -1;
    const [r] = t.splice(e, 1);
    return t.splice(n, 0, r), n;
  }
};
function Io(t, e) {
  let n = t || [], r = null;
  for (const a of String(e).split("."))
    if (!Lo(a)) {
      if (r = n.find((i) => i.name === a) || null, !r) return null;
      n = r.fields || [];
    }
  return r;
}
function pv(t, e, n) {
  const r = [...new Set(e)].filter((o) => o >= 0 && o < t.length).sort((o, u) => o - u);
  if (!r.length || !n || r[0] + n < 0 || r.at(-1) + n >= t.length) return r;
  const a = r.map((o) => t[o]), i = t.filter((o, u) => !r.includes(u)), l = Math.max(0, Math.min(i.length, r[0] + n));
  return i.splice(l, 0, ...a), t.splice(0, t.length, ...i), a.map((o, u) => l + u);
}
var gv = /* @__PURE__ */ x('<div class="inner svelte-hzx6i5"></div>'), bv = /* @__PURE__ */ x('<div role="listitem"><div class="bar svelte-hzx6i5"><span class="grip svelte-hzx6i5" draggable="true" role="presentation" aria-hidden="true"><!></span> <button type="button" class="title svelte-hzx6i5"><span><!></span> <span class="t svelte-hzx6i5"> </span></button> <button type="button" class="mb-btn ghost icon sm" title="Move up" aria-label="Move up"><!></button> <button type="button" class="mb-btn ghost icon sm" title="Move down" aria-label="Move down"><!></button> <button type="button" class="mb-btn ghost icon sm" title="Duplicate" aria-label="Duplicate"><!></button> <button type="button" class="mb-btn ghost icon sm danger" title="Remove" aria-label="Remove"><!></button></div> <!></div>'), mv = /* @__PURE__ */ x('<div class="list svelte-hzx6i5"><div class="head svelte-hzx6i5"><span class="mb-label"> <span class="count svelte-hzx6i5"> </span></span></div> <div role="list"></div> <button type="button" class="mb-btn add svelte-hzx6i5"><!> </button></div>');
function _v(t, e) {
  ot(e, !0);
  let n = Ye(e, "target", 7);
  const r = /* @__PURE__ */ se(() => Array.isArray(n()[e.field.name]) ? n()[e.field.name] : []);
  let a = /* @__PURE__ */ q(-1), i = /* @__PURE__ */ q(-1), l = /* @__PURE__ */ q(-1);
  function o() {
    return Array.isArray(n()[e.field.name]) || (n()[e.field.name] = []), n()[e.field.name];
  }
  function u() {
    const V = String(e.field.label || "item").replace(/s$/i, "").toLowerCase();
    let I = -1;
    e.store.mutate(
      () => {
        I = Fn.add(o(), No(e.field, V));
      },
      "Adding item…"
    ), m(a, I, !0);
  }
  function v(V) {
    e.store.mutate(() => Fn.remove(o(), V)), s(a) === V ? m(a, -1) : s(a) > V && m(a, s(a) - 1);
  }
  function _(V) {
    let I = -1;
    e.store.mutate(() => {
      I = Fn.duplicate(o(), V);
    }), I >= 0 && m(a, I, !0);
  }
  function S(V, I) {
    let T = -1;
    e.store.mutate(() => {
      T = Fn.move(o(), V, I);
    }), T >= 0 && m(a, T, !0);
  }
  var g = mv(), p = h(g), b = h(p), M = h(b), k = d(M), C = $(k, !0), O = d(p, 2);
  qe(O, 21, () => s(r), wt, (V, I, T) => {
    var L = bv();
    let f;
    var w = h(L), j = h(w), he = h(j);
    K(he, { name: "grip", size: 13 });
    var ie = d(j, 2), ce = h(ie);
    let A;
    var N = h(ce);
    K(N, { name: "chevron", size: 12 });
    var ee = d(ce, 2), Z = $(ee, !0), te = d(ie, 2);
    te.disabled = T === 0;
    var Se = h(te);
    K(Se, { name: "up", size: 12 });
    var ye = d(te, 2), oe = h(ye);
    K(oe, { name: "down", size: 12 });
    var me = d(ye, 2), De = h(me);
    K(De, { name: "copy", size: 12 });
    var W = d(me, 2), Y = h(W);
    K(Y, { name: "trash", size: 12 });
    var ge = d(w, 2);
    {
      var fe = (ae) => {
        var ue = gv();
        qe(ue, 21, () => e.field.fields || [], (de) => de.name, (de, le) => {
          La(de, {
            get field() {
              return s(le);
            },
            get target() {
              return s(I);
            },
            get store() {
              return e.store;
            },
            compact: !0
          });
        }), y(ae, ue);
      };
      B(ge, (ae) => {
        s(a) === T && ae(fe);
      });
    }
    z(
      (ae) => {
        f = Le(L, 1, "item svelte-hzx6i5", null, f, { open: s(a) === T, over: s(l) === T }), ve(ie, "aria-expanded", s(a) === T), A = Le(ce, 1, "chev svelte-hzx6i5", null, A, { rot: s(a) === T }), F(Z, ae), ye.disabled = T === s(r).length - 1;
      },
      [() => ad(s(I), e.field.fields, T)]
    ), st("dragover", L, (ae) => {
      s(i) >= 0 && (ae.preventDefault(), m(l, T, !0));
    }), st("drop", L, () => {
      S(s(i), T), m(i, m(l, -1), !0);
    }), st("dragstart", j, (ae) => {
      m(i, T, !0), ae.dataTransfer.effectAllowed = "move";
    }), st("dragend", j, () => m(i, m(l, -1), !0)), P("click", ie, () => m(a, s(a) === T ? -1 : T, !0)), P("click", te, () => S(T, T - 1)), P("click", ye, () => S(T, T + 1)), P("click", me, () => _(T)), P("click", W, () => v(T)), y(V, L);
  });
  var D = d(O, 2), G = h(D);
  K(G, { name: "plus", size: 13 });
  var R = d(G);
  z(() => {
    F(M, `${(e.field.label || e.field.name) ?? ""} `), F(C, s(r).length), F(R, ` ${(e.field.btnLabel || "Add item") ?? ""}`);
  }), P("click", D, u), y(t, g), ct();
}
ht(["click"]);
var yv = /* @__PURE__ */ x('<footer class="svelte-1kwbck4"><!></footer>'), kv = /* @__PURE__ */ x('<div class="backdrop svelte-1kwbck4" role="presentation"><div tabindex="-1" role="dialog" aria-modal="true"><header class="svelte-1kwbck4"><h2 class="svelte-1kwbck4"> </h2> <button type="button" class="mb-btn ghost icon sm" aria-label="Close"><!></button></header> <div class="content mb-scroll svelte-1kwbck4"><!></div> <!></div></div>');
function Na(t, e) {
  ot(e, !0);
  let n = Ye(e, "title", 3, ""), r = Ye(e, "wide", 3, !1), a = /* @__PURE__ */ q(void 0);
  const i = 'input:not([type=hidden]):not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])', l = () => [...s(a).querySelectorAll(i)], o = () => s(a).getRootNode().activeElement || document.activeElement;
  ps(() => {
    const R = o();
    return (s(a).querySelector("[autofocus]") || l().find((I) => !I.closest("header")) || s(a)).focus(), () => {
      R && typeof R.focus == "function" && R.isConnected && R.focus();
    };
  });
  function u(R) {
    if (R.key !== "Tab") return;
    const V = l();
    if (!V.length) {
      R.preventDefault();
      return;
    }
    const I = o();
    R.shiftKey && (I === V[0] || I === s(a)) ? (R.preventDefault(), V.at(-1).focus()) : !R.shiftKey && I === V.at(-1) && (R.preventDefault(), V[0].focus());
  }
  var v = kv(), _ = h(v);
  let S;
  var g = h(_), p = h(g), b = $(p, !0), M = d(p, 2), k = h(M);
  K(k, { name: "x", size: 14 });
  var C = d(g, 2), O = h(C);
  bl(O, () => e.children ?? ql);
  var D = d(C, 2);
  {
    var G = (R) => {
      var V = yv(), I = h(V);
      bl(I, () => e.actions), y(R, V);
    };
    B(D, (R) => {
      e.actions && R(G);
    });
  }
  On(_, (R) => m(a, R), () => s(a)), z(() => {
    S = Le(_, 1, "dialog svelte-1kwbck4", null, S, { wide: r() }), ve(_, "aria-label", n()), F(b, n());
  }), P("click", v, (R) => {
    var V;
    return R.target === R.currentTarget && ((V = e.onclose) == null ? void 0 : V.call(e));
  }), P("keydown", _, u), P("click", M, () => {
    var R;
    return (R = e.onclose) == null ? void 0 : R.call(e);
  }), y(t, v), ct();
}
ht(["click", "keydown"]);
var wv = /* @__PURE__ */ x('<input class="mb-input search svelte-hd7o5x" placeholder="Filter by name"/> <input type="file" accept="image/*" multiple="" hidden=""/> <button type="button" class="mb-btn primary"><!> </button>', 1), xv = /* @__PURE__ */ x('<p class="error svelte-hd7o5x"> </p>'), Sv = /* @__PURE__ */ x('<img class="url-preview svelte-hd7o5x" alt=""/>'), Ev = /* @__PURE__ */ x('<div class="url svelte-hd7o5x"><label class="mb-label" for="mb-media-url">Image URL</label> <input id="mb-media-url" class="mb-input" placeholder="https://…"/> <!> <button type="button" class="mb-btn primary">Use this URL</button></div>'), Mv = /* @__PURE__ */ x('<span>/</span> <button type="button" class="link svelte-hd7o5x"> </button>', 1), Tv = /* @__PURE__ */ x('<div class="crumbs svelte-hd7o5x"><button type="button" class="link svelte-hd7o5x">user/media</button> <!></div>'), Av = /* @__PURE__ */ x('<button type="button" class="tile folder svelte-hd7o5x"><!><span class="svelte-hd7o5x"> </span></button>'), Cv = /* @__PURE__ */ x('<button type="button"><img alt="" loading="lazy" class="svelte-hd7o5x"/> <span class="svelte-hd7o5x"> </span></button>'), Ov = /* @__PURE__ */ x('<div class="empty svelte-hd7o5x"><!> <strong class="svelte-hd7o5x"> </strong> <span>Drop image files here, or click Upload.</span></div>'), Pv = /* @__PURE__ */ x('<p class="muted svelte-hd7o5x">Loading…</p>'), zv = /* @__PURE__ */ x('<!> <div class="grid mb-scroll svelte-hd7o5x"><!> <!></div> <!>', 1), Dv = /* @__PURE__ */ x('<div role="presentation"><div class="bar svelte-hd7o5x"><!> <!></div> <!> <!></div>');
function jo(t, e) {
  ot(e, !0);
  let n = Ye(e, "current", 3, ""), r = /* @__PURE__ */ q(et(e.store.isSection || n() && String(n()).startsWith("user://media") ? "site" : "page")), a = /* @__PURE__ */ q(et([])), i = /* @__PURE__ */ q(et([])), l = /* @__PURE__ */ q(et([])), o = /* @__PURE__ */ q(""), u = /* @__PURE__ */ q(!1), v = /* @__PURE__ */ q(!1), _ = /* @__PURE__ */ q(""), S = /* @__PURE__ */ q(et(/^https?:\/\//.test(n()) ? n() : "")), g = /* @__PURE__ */ q(""), p = /* @__PURE__ */ q(!1), b = /* @__PURE__ */ q(void 0);
  const M = (f) => String(f.type || f.mime || "").startsWith("image/") || /\.(jpe?g|png|gif|webp|avif|svg)$/i.test(f.filename || "");
  async function k() {
    m(u, !0), m(_, "");
    try {
      m(a, (await e.store.loadOwnMedia()).filter(M), !0);
    } catch (f) {
      m(_, f.message, !0);
    }
    m(u, !1);
  }
  async function C() {
    m(u, !0), m(_, "");
    try {
      const f = await Xe.siteMedia(s(o)), w = Array.isArray(f) ? f : (f == null ? void 0 : f.files) || (f == null ? void 0 : f.items) || [];
      m(i, w.filter(M), !0), m(l, (f == null ? void 0 : f.folders) || [], !0);
    } catch (f) {
      m(_, f.message, !0);
    }
    m(u, !1);
  }
  ps(() => {
    s(r) === "site" ? C() : k();
  });
  function O(f) {
    m(r, f, !0), f === "page" && !s(a).length && k(), f === "site" && C();
  }
  const D = /\.(jpe?g|png|gif|webp|avif|svg)$/i, G = (f) => [...f || []].filter((w) => w.type.startsWith("image/") || D.test(w.name));
  async function R(f) {
    const w = G(f);
    if (s(
      b
      // so the same file can be picked again after a failure
    ) && (s(b).value = ""), !w.length) {
      f != null && f.length && m(_, "Only image files can be uploaded here.");
      return;
    }
    m(v, !0), m(_, "");
    try {
      s(r) === "site" ? (await Xe.uploadSiteMedia(w, s(o)), await C()) : (await Xe.uploadOwnMedia(e.store.context, w), await k()), e.store.flash(`${w.length} file${w.length > 1 ? "s" : ""} uploaded`);
    } catch (j) {
      m(_, j.message, !0);
    }
    m(v, !1);
  }
  function V(f) {
    return "user://media/" + (f.path ? f.path.replace(/^\/|\/$/g, "") + "/" : s(o) ? s(o) + "/" : "") + f.filename;
  }
  const I = /* @__PURE__ */ se(() => {
    const f = s(r) === "site" ? s(i) : s(a), w = s(g).trim().toLowerCase();
    return w ? f.filter((j) => j.filename.toLowerCase().includes(w)) : f;
  });
  function T(f) {
    return typeof f == "string" ? f : f.name || f.path;
  }
  function L(f) {
    const w = typeof f == "string" ? f : f.path || f.name;
    m(o, w.includes("/") || !s(o) ? w : s(o) + "/" + w, !0), C();
  }
  Na(t, {
    title: "Media library",
    wide: !0,
    get onclose() {
      return e.onclose;
    },
    children: (f, w) => {
      var j = Dv();
      let he;
      var ie = h(j), ce = h(ie);
      {
        let oe = /* @__PURE__ */ se(() => [
          ...e.store.isSection ? [] : [
            {
              value: "page",
              label: e.store.isFlex ? "This item" : "This page"
            }
          ],
          { value: "site", label: "Site library" },
          { value: "url", label: "From URL" }
        ]);
        Js(ce, {
          label: "Source",
          get value() {
            return s(r);
          },
          onchange: (me) => me === "url" ? m(r, "url") : O(me),
          get options() {
            return s(oe);
          }
        });
      }
      var A = d(ce, 2);
      {
        var N = (oe) => {
          var me = wv(), De = Te(me), W = d(De, 2);
          On(W, (ae) => m(b, ae), () => s(b));
          var Y = d(W, 2), ge = h(Y);
          K(ge, { name: "upload", size: 14 });
          var fe = d(ge);
          z(() => {
            Y.disabled = s(v), F(fe, ` ${s(v) ? "Uploading…" : "Upload"}`);
          }), bn(De, () => s(g), (ae) => m(g, ae)), P("change", W, (ae) => R(ae.currentTarget.files)), P("click", Y, () => s(b).click()), y(oe, me);
        };
        B(A, (oe) => {
          s(r) !== "url" && oe(N);
        });
      }
      var ee = d(ie, 2);
      {
        var Z = (oe) => {
          var me = xv(), De = $(me, !0);
          z(() => F(De, s(_))), y(oe, me);
        };
        B(ee, (oe) => {
          s(_) && oe(Z);
        });
      }
      var te = d(ee, 2);
      {
        var Se = (oe) => {
          var me = Ev(), De = d(h(me), 2), W = d(De, 2);
          {
            var Y = (ae) => {
              var ue = Sv();
              z(() => ve(ue, "src", s(S))), y(ae, ue);
            }, ge = /* @__PURE__ */ se(() => /^https?:\/\//.test(s(S)));
            B(W, (ae) => {
              s(ge) && ae(Y);
            });
          }
          var fe = d(W, 2);
          z((ae) => fe.disabled = ae, [() => !/^https?:\/\//.test(s(S))]), bn(De, () => s(S), (ae) => m(S, ae)), P("click", fe, () => e.onselect(s(S))), y(oe, me);
        }, ye = (oe) => {
          var me = zv(), De = Te(me);
          {
            var W = (le) => {
              var ke = Tv(), Ne = h(ke), Re = d(Ne, 2);
              qe(Re, 17, () => s(o).split("/").filter(Boolean), wt, (Ke, xe, we) => {
                var Ae = Mv(), Ee = d(Te(Ae), 2), ze = $(Ee, !0);
                z(() => F(ze, s(xe))), P("click", Ee, () => {
                  m(o, s(o).split("/").slice(0, we + 1).join("/"), !0), C();
                }), y(Ke, Ae);
              }), P("click", Ne, () => {
                m(o, ""), C();
              }), y(le, ke);
            };
            B(De, (le) => {
              s(r) === "site" && le(W);
            });
          }
          var Y = d(De, 2), ge = h(Y);
          {
            var fe = (le) => {
              var ke = Ct(), Ne = Te(ke);
              qe(Ne, 17, () => s(l), wt, (Re, Ke) => {
                var xe = Av(), we = h(xe);
                K(we, { name: "layers", size: 22 });
                var Ae = d(we), Ee = $(Ae, !0);
                z((ze) => F(Ee, ze), [() => T(s(Ke))]), P("click", xe, () => L(s(Ke))), y(Re, xe);
              }), y(le, ke);
            };
            B(ge, (le) => {
              s(r) === "site" && le(fe);
            });
          }
          var ae = d(ge, 2);
          qe(
            ae,
            17,
            () => s(I),
            (le) => le.filename + (le.path || ""),
            (le, ke) => {
              const Ne = /* @__PURE__ */ se(() => s(r) === "site" ? V(s(ke)) : s(ke).filename);
              var Re = Cv();
              let Ke;
              var xe = h(Re), we = d(xe, 2), Ae = $(we, !0);
              z(() => {
                Ke = Le(Re, 1, "tile svelte-hd7o5x", null, Ke, { active: s(Ne) === n() }), ve(Re, "title", s(ke).filename), ve(xe, "src", s(ke).url), F(Ae, s(ke).filename);
              }), P("click", Re, () => e.onselect(s(Ne))), y(le, Re);
            },
            (le) => {
              var ke = Ct(), Ne = Te(ke);
              {
                var Re = (Ke) => {
                  var xe = Ov(), we = h(xe);
                  K(we, { name: "upload", size: 26 });
                  var Ae = d(we, 2), Ee = $(Ae);
                  z(() => F(Ee, `No images ${s(r) === "page" ? e.store.isFlex ? "on this item" : "on this page" : "here"} yet`)), y(Ke, xe);
                };
                B(Ne, (Ke) => {
                  s(u) || Ke(Re);
                });
              }
              y(le, ke);
            }
          );
          var ue = d(Y, 2);
          {
            var de = (le) => {
              var ke = Pv();
              y(le, ke);
            };
            B(ue, (le) => {
              s(u) && le(de);
            });
          }
          y(oe, me);
        };
        B(te, (oe) => {
          s(r) === "url" ? oe(Se) : oe(ye, -1);
        });
      }
      z(() => he = Le(j, 1, "lib svelte-hd7o5x", null, he, { drag: s(p) })), st("dragover", j, (oe) => {
        var me, De;
        (De = (me = oe.dataTransfer) == null ? void 0 : me.types) != null && De.includes("Files") && (oe.preventDefault(), m(p, !0));
      }), st("dragleave", j, () => m(p, !1)), st("drop", j, (oe) => {
        oe.preventDefault(), m(p, !1), R(oe.dataTransfer.files);
      }), y(f, j);
    },
    $$slots: { default: !0 }
  }), ct();
}
ht(["change", "click"]);
var Nv = /* @__PURE__ */ x('<img alt="" class="svelte-x4wd27"/>'), Lv = /* @__PURE__ */ x('<button type="button" class="mb-btn sm ghost danger">Remove</button>'), Rv = /* @__PURE__ */ x('<div class="media svelte-x4wd27"><button type="button" class="thumb svelte-x4wd27" title="Choose image" aria-label="Choose image"><!></button> <div class="side svelte-x4wd27"><div class="name svelte-x4wd27"> </div> <div class="btns svelte-x4wd27"><button type="button" class="mb-btn sm"><!> </button> <!></div></div></div> <!>', 1);
function Iv(t, e) {
  ot(e, !0);
  let n = Ye(e, "value", 3, ""), r = Ye(e, "store", 7), a = /* @__PURE__ */ q(!1), i = /* @__PURE__ */ q(!1);
  _t(() => {
    if (s(a))
      return r().modal = { close: () => m(a, !1) }, () => {
        r().modal = null;
      };
  });
  const l = /* @__PURE__ */ se(() => {
    var L;
    const T = String(n() || "");
    return T ? /^(https?:)?\/\//.test(T) || T.startsWith("/") ? T : T.startsWith("user://") ? "/" + T.replace("user://", "user/") : T.startsWith("theme://") ? `/user/themes/${((L = r().catalog) == null ? void 0 : L.theme) || ""}/${T.replace("theme://", "")}` : r().pageMediaUrl(T) : "";
  });
  _t(() => {
    s(l), m(i, !1);
  });
  var o = Rv(), u = Te(o), v = h(u), _ = h(v);
  {
    var S = (T) => {
      var L = Nv();
      z(() => ve(L, "src", s(l))), st("error", L, () => m(i, !0)), y(T, L);
    }, g = (T) => {
      K(T, { name: "image", size: 22 });
    };
    B(_, (T) => {
      s(l) && !s(i) ? T(S) : T(g, -1);
    });
  }
  var p = d(v, 2), b = h(p), M = $(b, !0), k = d(b, 2), C = h(k), O = h(C);
  K(O, { name: "image", size: 13 });
  var D = d(O), G = d(C, 2);
  {
    var R = (T) => {
      var L = Lv();
      P("click", L, () => e.onchange("")), y(T, L);
    };
    B(G, (T) => {
      n() && T(R);
    });
  }
  var V = d(u, 2);
  {
    var I = (T) => {
      jo(T, {
        get store() {
          return r();
        },
        get current() {
          return n();
        },
        onselect: (L) => {
          e.onchange(L), m(a, !1);
        },
        onclose: () => m(a, !1)
      });
    };
    B(V, (T) => {
      s(a) && T(I);
    });
  }
  z(() => {
    ve(b, "title", n()), F(M, n() || "No image"), F(D, ` ${n() ? "Replace" : "Choose"}`);
  }), P("click", v, () => m(a, !0)), P("click", C, () => m(a, !0)), y(t, o), ct();
}
ht(["click"]);
var jv = /* @__PURE__ */ x("<i></i>"), qv = /* @__PURE__ */ x('<button type="button" class="mb-btn ghost icon sm" title="Clear"><!></button>'), Fv = /* @__PURE__ */ x('<button type="button"><i></i></button>'), Bv = /* @__PURE__ */ x('<div class="pop svelte-168bgjg"><input class="mb-input" placeholder="Search icons" aria-label="Search icons"/> <div class="grid mb-scroll svelte-168bgjg"></div></div>'), Uv = /* @__PURE__ */ x('<div class="icon-control"><div class="row svelte-168bgjg"><button type="button" class="current svelte-168bgjg" title="Choose icon" aria-label="Choose icon"><!></button> <input class="mb-input" placeholder="fa-bolt"/> <!></div> <!></div>');
function Hv(t, e) {
  ot(e, !0);
  let n = Ye(e, "value", 3, ""), r = /* @__PURE__ */ q(!1), a = /* @__PURE__ */ q(""), i = /* @__PURE__ */ q(void 0);
  const l = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css", o = "sha384-rWj9FmWWt3OMqd9vBkWRhFavvVUYalYqGPoMdL1brs/qvvqz88gvLShYa4hKNyqb", u = "mb-icons-" + Math.random().toString(36).slice(2, 8), v = "bolt rocket star heart check circle-check shield-halved lock key user users user-tie handshake briefcase building chart-line chart-simple chart-pie bullseye trophy medal award gem crown lightbulb brain robot microchip code terminal laptop mobile-screen desktop server cloud database wifi globe earth-americas map-location-dot location-dot compass envelope phone comments comment-dots headset bell calendar clock hourglass stopwatch cart-shopping bag-shopping credit-card money-bill wallet tags tag receipt truck box gift percent palette paintbrush pen-nib wand-magic-sparkles image images camera video film music microphone book book-open graduation-cap school newspaper file file-lines folder clipboard-list list-check gear gears wrench screwdriver-wrench hammer toolbox sliders filter magnifying-glass leaf seedling tree mountain sun moon cloud-sun water fire snowflake recycle house hotel utensils mug-hot pizza-slice burger wine-glass dumbbell heart-pulse stethoscope hospital paw plane car bicycle ship anchor route road thumbs-up face-smile hand-holding-heart people-group universal-access infinity arrows-rotate arrow-right link share-nodes".split(" ").map((f) => "fa-" + f), _ = "github facebook instagram x-twitter linkedin youtube tiktok whatsapp pinterest discord slack wordpress google apple".split(" ").map((f) => "fa-brands fa-" + f), S = /* @__PURE__ */ se(() => {
    const f = s(a).trim().toLowerCase().replace(/^fa-/, "");
    return [...v, ..._].filter((w) => !f || w.includes(f));
  }), g = (f) => {
    const w = String(f || "").trim();
    return w ? /\bfa-(brands|solid|regular)\b|\bfa[brs]\b/.test(w) ? w : "fa-solid " + (w.startsWith("fa-") ? w : "fa-" + w) : "";
  };
  function p() {
    const f = document.createElement("link");
    return f.rel = "stylesheet", f.href = l, f.integrity = o, f.crossOrigin = "anonymous", f.dataset.mawFa = "1", f;
  }
  ps(() => {
    document.head.querySelector("link[data-maw-fa]") || document.head.appendChild(p());
    const f = s(i).getRootNode();
    f instanceof ShadowRoot && !f.querySelector("link[data-maw-fa]") && f.prepend(p());
    const w = (j) => {
      s(r) && !j.composedPath().includes(s(i)) && m(r, !1);
    };
    return document.addEventListener("pointerdown", w, !0), () => document.removeEventListener("pointerdown", w, !0);
  });
  function b(f) {
    f.key === "Escape" && s(r) && (f.preventDefault(), f.stopPropagation(), m(r, !1));
  }
  var M = Uv(), k = h(M), C = h(k), O = h(C);
  {
    var D = (f) => {
      var w = jv();
      z((j) => Le(w, 1, j, "svelte-168bgjg"), [() => xi(g(n()))]), y(f, w);
    }, G = (f) => {
      K(f, { name: "plus", size: 14 });
    };
    B(O, (f) => {
      n() ? f(D) : f(G, -1);
    });
  }
  var R = d(C, 2), V = d(R, 2);
  {
    var I = (f) => {
      var w = qv(), j = h(w);
      K(j, { name: "x", size: 12 }), P("click", w, () => e.onchange("")), y(f, w);
    };
    B(V, (f) => {
      n() && f(I);
    });
  }
  var T = d(k, 2);
  {
    var L = (f) => {
      var w = Bv(), j = h(w);
      Xl(j);
      var he = d(j, 2);
      qe(he, 20, () => s(S), (ie) => ie, (ie, ce) => {
        var A = Fv();
        let N;
        var ee = $(A);
        z(
          (Z, te, Se) => {
            ve(A, "aria-pressed", n() === ce), ve(A, "title", Z), ve(A, "aria-label", te), N = Le(A, 1, "svelte-168bgjg", null, N, { active: n() === ce }), Le(ee, 1, Se, "svelte-168bgjg");
          },
          [
            () => ce.replace("fa-brands ", ""),
            () => ce.replace("fa-brands ", ""),
            () => xi(g(ce))
          ]
        ), P("click", A, () => {
          e.onchange(ce), m(r, !1);
        }), y(ie, A);
      }), z(() => ve(w, "id", u)), bn(j, () => s(a), (ie) => m(a, ie)), y(f, w);
    };
    B(T, (f) => {
      s(r) && f(L);
    });
  }
  On(M, (f) => m(i, f), () => s(i)), z(() => {
    ve(C, "aria-expanded", s(r)), ve(C, "aria-controls", u), Xn(R, n());
  }), P("keydown", M, b), P("click", C, () => m(r, !s(r))), P("input", R, (f) => e.onchange(f.currentTarget.value)), y(t, M), ct();
}
ht(["keydown", "click", "input"]);
var Kv = /* @__PURE__ */ x('<div class="tools svelte-gx0hvo"><button type="button" title="Bold" class="svelte-gx0hvo"><!></button> <button type="button" title="Italic" class="svelte-gx0hvo"><!></button> <button type="button" title="Link" class="svelte-gx0hvo"><!></button> <button type="button" title="Bulleted list" class="svelte-gx0hvo"><!></button> <span class="hint svelte-gx0hvo">Markdown</span></div>'), Gv = /* @__PURE__ */ x('<div><!> <textarea class="mb-input svelte-gx0hvo"></textarea></div>');
function Vv(t, e) {
  ot(e, !0);
  let n = Ye(e, "value", 3, ""), r = Ye(e, "rows", 3, 4), a = Ye(e, "plain", 3, !1), i = /* @__PURE__ */ q(void 0);
  function l(p, b = p, M = "text") {
    const k = s(i).selectionStart, C = s(i).selectionEnd, O = n().slice(k, C) || M, D = n().slice(0, k) + p + O + b + n().slice(C);
    e.onchange(D), requestAnimationFrame(() => {
      s(i).focus(), s(i).setSelectionRange(k + p.length, k + p.length + O.length);
    });
  }
  function o() {
    const p = n().lastIndexOf(`
`, s(i).selectionStart - 1) + 1, b = n().slice(0, p) + "- " + n().slice(p);
    e.onchange(b);
  }
  var u = Gv();
  let v;
  var _ = h(u);
  {
    var S = (p) => {
      var b = Kv(), M = h(b), k = h(M);
      K(k, { name: "bold", size: 13 });
      var C = d(M, 2), O = h(C);
      K(O, { name: "italic", size: 13 });
      var D = d(C, 2), G = h(D);
      K(G, { name: "link", size: 13 });
      var R = d(D, 2), V = h(R);
      K(V, { name: "list", size: 13 }), P("click", M, () => l("**")), P("click", C, () => l("_")), P("click", D, () => l("[", "](https://)", "link text")), P("click", R, o), y(p, b);
    };
    B(_, (p) => {
      a() || p(S);
    });
  }
  var g = d(_, 2);
  On(g, (p) => m(i, p), () => s(i)), z(() => {
    v = Le(u, 1, "md svelte-gx0hvo", null, v, { plain: a() }), ve(g, "id", e.id), ve(g, "rows", r()), Xn(g, n());
  }), P("input", g, (p) => e.onchange(p.currentTarget.value)), y(t, u), ct();
}
ht(["click", "input"]);
var Yv = /* @__PURE__ */ x('<label class="toggle svelte-2ufken"><input type="checkbox" class="svelte-2ufken"/> <span class="track svelte-2ufken"><span class="thumb svelte-2ufken"></span></span> <span class="tl"> </span></label>'), Jv = /* @__PURE__ */ x("<option>—</option>"), Wv = /* @__PURE__ */ x("<option> </option>"), Xv = /* @__PURE__ */ x('<select class="mb-input"><!><!></select>'), Zv = /* @__PURE__ */ x('<label class="check svelte-2ufken"><input type="checkbox"/> </label>'), Qv = /* @__PURE__ */ x('<div class="checks svelte-2ufken" role="group"></div>'), $v = /* @__PURE__ */ x('<input class="mb-input" type="number"/>'), ef = /* @__PURE__ */ x('<div class="color svelte-2ufken"><input type="color" class="svelte-2ufken"/><input class="mb-input"/></div>'), tf = /* @__PURE__ */ x('<input class="mb-input" type="text"/>'), nf = /* @__PURE__ */ x('<textarea class="mb-input mono svelte-2ufken" rows="4"></textarea> <div class="mb-help"> </div>', 1), sf = /* @__PURE__ */ x('<label class="mb-label"> </label> <!>', 1), rf = /* @__PURE__ */ x('<div class="mb-help"> </div>'), af = /* @__PURE__ */ x("<div><!> <!></div>");
function La(t, e) {
  ot(e, !0);
  let n = Ye(e, "compact", 3, !1);
  const r = [
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
    "date",
    "checkboxes"
  ], a = "mb-" + Math.random().toString(36).slice(2, 9), i = /* @__PURE__ */ se(() => e.field.label || e.field.title || e.field.name), l = /* @__PURE__ */ se(() => e.field.type || "text"), o = /* @__PURE__ */ se(() => Do(e.field)), u = /* @__PURE__ */ se(() => rd(e.field)), v = /* @__PURE__ */ se(() => r.includes(s(l))), _ = /* @__PURE__ */ se(() => s(l) === "markdown" || !!e.field.markdown || /markdown/i.test(s(i))), S = /* @__PURE__ */ se(() => e.target[e.field.name] ?? (s(o) ? !1 : "")), g = /* @__PURE__ */ se(() => s(S) === !0 || s(S) === 1 || s(S) === "1"), p = /* @__PURE__ */ se(() => {
    var f, w, j;
    return {
      min: ((f = e.field.validate) == null ? void 0 : f.min) ?? e.field.min,
      max: ((w = e.field.validate) == null ? void 0 : w.max) ?? e.field.max,
      step: ((j = e.field.validate) == null ? void 0 : j.step) ?? e.field.step
    };
  });
  function b(f) {
    e.store.beginEdit(), xa(e.target, e.field.name, f), e.store.endEdit();
  }
  function M(f) {
    if (f === "") return b(void 0);
    const w = Number(f);
    b(Number.isFinite(w) ? w : f);
  }
  function k(f, w) {
    const j = Array.isArray(s(S)) ? s(S).filter((he) => he !== f) : [];
    b(w ? [...j, f] : j);
  }
  let C = /* @__PURE__ */ q("");
  _t(() => {
    s(v) || m(C, JSON.stringify(e.target[e.field.name] ?? null, null, 2), !0);
  });
  var O = af();
  let D;
  var G = h(O);
  {
    var R = (f) => {
      _v(f, {
        get field() {
          return e.field;
        },
        get target() {
          return e.target;
        },
        get store() {
          return e.store;
        }
      });
    }, V = (f) => {
      var w = Yv(), j = h(w), he = d(j, 4), ie = $(he, !0);
      z(() => {
        kl(j, s(g)), F(ie, s(i));
      }), P("change", j, (ce) => b(ce.currentTarget.checked)), y(f, w);
    }, I = (f) => {
      var w = sf(), j = Te(w), he = $(j, !0), ie = d(j, 2);
      {
        var ce = (W) => {
          {
            let Y = /* @__PURE__ */ se(() => String(s(S)));
            Js(W, {
              get label() {
                return s(i);
              },
              get value() {
                return s(Y);
              },
              get options() {
                return e.field.options;
              },
              onchange: (ge) => b(s(u) ? Number(ge) : ge)
            });
          }
        }, A = /* @__PURE__ */ se(() => {
          var W;
          return s(l) === "select" && ((W = e.field.options) == null ? void 0 : W.length) <= 4 && e.field.options.every((Y) => String(Y.label).length < 14);
        }), N = (W) => {
          var Y = Xv(), ge = h(Y);
          {
            var fe = (de) => {
              var le = Jv();
              le.value = le.__value = "", y(de, le);
            };
            B(ge, (de) => {
              s(S) === "" && de(fe);
            });
          }
          var ae = d(ge);
          qe(ae, 17, () => e.field.options || [], wt, (de, le) => {
            var ke = Wv(), Ne = $(ke, !0), Re = {};
            z(() => {
              F(Ne, s(le).label), Re !== (Re = s(le).value) && (ke.value = (ke.__value = Re) ?? "");
            }), y(de, ke);
          });
          var ue;
          pr(Y), z(
            (de) => {
              ve(Y, "id", a), ue !== (ue = de) && (Y.value = (Y.__value = ue) ?? "", oa(Y, ue));
            },
            [() => String(s(S))]
          ), P("change", Y, (de) => b(s(u) ? Number(de.currentTarget.value) : de.currentTarget.value)), y(W, Y);
        }, ee = (W) => {
          var Y = Qv();
          qe(Y, 21, () => e.field.options || [], wt, (ge, fe) => {
            var ae = Zv(), ue = h(ae), de = d(ue);
            z(
              (le) => {
                kl(ue, le), F(de, ` ${s(fe).label ?? ""}`);
              },
              [
                () => Array.isArray(s(S)) && s(S).includes(s(fe).value)
              ]
            ), P("change", ue, (le) => k(s(fe).value, le.currentTarget.checked)), y(ge, ae);
          }), z(() => ve(Y, "aria-label", s(i))), y(W, Y);
        }, Z = (W) => {
          {
            let Y = /* @__PURE__ */ se(() => s(S) || ""), ge = /* @__PURE__ */ se(() => e.field.rows || (s(l) === "markdown" ? 6 : 3)), fe = /* @__PURE__ */ se(() => !s(_));
            Vv(W, {
              get id() {
                return a;
              },
              get value() {
                return s(Y);
              },
              onchange: b,
              get rows() {
                return s(ge);
              },
              get plain() {
                return s(fe);
              }
            });
          }
        }, te = (W) => {
          Iv(W, {
            get value() {
              return s(S);
            },
            onchange: b,
            get store() {
              return e.store;
            }
          });
        }, Se = (W) => {
          Hv(W, {
            get value() {
              return s(S);
            },
            onchange: b
          });
        }, ye = (W) => {
          var Y = $v();
          z(() => {
            ve(Y, "id", a), Xn(Y, s(S)), ve(Y, "min", s(p).min), ve(Y, "max", s(p).max), ve(Y, "step", s(p).step);
          }), P("input", Y, (ge) => M(ge.currentTarget.value)), y(W, Y);
        }, oe = (W) => {
          var Y = ef(), ge = h(Y), fe = d(ge);
          z(() => {
            Xn(ge, s(S) || "#000000"), ve(ge, "aria-label", `${s(i) ?? ""} swatch`), ve(fe, "id", a), Xn(fe, s(S));
          }), P("input", ge, (ae) => b(ae.currentTarget.value)), P("input", fe, (ae) => b(ae.currentTarget.value)), y(W, Y);
        }, me = (W) => {
          var Y = tf();
          z(() => {
            ve(Y, "id", a), Xn(Y, s(S)), ve(Y, "placeholder", e.field.placeholder || "");
          }), P("input", Y, (ge) => b(ge.currentTarget.value)), y(W, Y);
        }, De = (W) => {
          var Y = nf(), ge = Te(Y), fe = d(ge, 2), ae = $(fe);
          z(() => {
            ve(ge, "id", a), F(ae, `No control for field type “${s(l) ?? ""}” yet: edited as JSON.`);
          }), P("change", ge, () => {
            try {
              b(JSON.parse(s(
                C
                /* keep editing */
              )));
            } catch {
            }
          }), bn(ge, () => s(C), (ue) => m(C, ue)), y(W, Y);
        };
        B(ie, (W) => {
          s(A) ? W(ce) : s(l) === "select" ? W(N, 1) : s(l) === "checkboxes" ? W(ee, 2) : s(l) === "markdown" || s(l) === "textarea" ? W(Z, 3) : s(l) === "filepicker" || s(l) === "media" || s(l) === "file" ? W(te, 4) : s(l) === "iconpicker" ? W(Se, 5) : s(u) ? W(ye, 6) : s(l) === "colorpicker" ? W(oe, 7) : s(l) === "text" || s(l) === "date" ? W(me, 8) : W(De, -1);
        });
      }
      z(() => {
        ve(j, "for", a), F(he, s(i));
      }), y(f, w);
    };
    B(G, (f) => {
      s(l) === "list" ? f(R) : s(o) ? f(V, 1) : f(I, -1);
    });
  }
  var T = d(G, 2);
  {
    var L = (f) => {
      var w = rf(), j = $(w, !0);
      z(() => F(j, e.field.help)), y(f, w);
    };
    B(T, (f) => {
      e.field.help && s(l) !== "list" && f(L);
    });
  }
  z(() => D = Le(O, 1, "field svelte-2ufken", null, D, { compact: n(), inline: s(o) })), y(t, O), ct();
}
ht(["change", "input"]);
var lf = /* @__PURE__ */ x('<button type="button"><span class="aa svelte-uthihf">Aa</span></button>'), of = /* @__PURE__ */ x('<span class="aa svelte-uthihf">Aa</span>'), cf = /* @__PURE__ */ x('<label title="Custom color"><input type="color" aria-label="Custom background color" class="svelte-uthihf"/> <!></label>'), uf = /* @__PURE__ */ x('<span class="live svelte-uthihf"> </span>'), df = /* @__PURE__ */ x('<button type="button" class="mb-btn sm ghost">Clear</button>'), vf = /* @__PURE__ */ x('<button type="button" class="dot svelte-uthihf"></button>'), ff = /* @__PURE__ */ x('<span class="mb-label sub svelte-uthihf">Text color</span> <!>', 1), hf = /* @__PURE__ */ x('<div class="group custom-row svelte-uthihf"><span class="mb-label">Custom color</span> <div class="hex svelte-uthihf"><span class="chip svelte-uthihf"></span> <input class="mb-input svelte-uthihf" placeholder="#hex e.g. #0f766e" spellcheck="false"/> <!></div> <div class="suggest svelte-uthihf"></div> <!></div>'), pf = /* @__PURE__ */ x('<div class="group svelte-uthihf"><span class="mb-label">Background</span> <div class="swatches svelte-uthihf"><!> <!></div> <div class="mb-help"><!> <!></div></div> <!>', 1), gf = /* @__PURE__ */ x('<div class="group svelte-uthihf"><span class="mb-label"> </span> <!></div>'), bf = /* @__PURE__ */ x("<!> <!> <!>", 1), mf = /* @__PURE__ */ x('<button type="button"><!> </button>'), _f = /* @__PURE__ */ x(`<button type="button" title="Don't render this block anywhere"><!> Hide all</button>`), yf = /* @__PURE__ */ x('<div class="group svelte-uthihf"><span class="mb-label">Visibility</span> <div class="mb-seg svelte-uthihf"><!> <!></div> <div class="mb-help"><!></div></div>'), kf = /* @__PURE__ */ x("<!> <!>", 1);
function Ea(t, e) {
  ot(e, !0);
  let n = Ye(e, "block", 7), r = Ye(e, "settings", 19, () => []), a = Ye(e, "mode", 3, "style");
  const i = [
    "background",
    "bg_color",
    "text_color",
    "spacing",
    "width",
    "align",
    "reveal",
    "hidden",
    "hide_on"
  ], l = [
    ["mobile", "phone", "Mobile"],
    ["tablet", "tablet", "Tablet"],
    ["desktop", "monitor", "Desktop"]
  ], o = {
    none: "#ffffff",
    alt: "#f6f7f9",
    soft: "#e7edfd",
    accent: "#2563eb",
    dark: "#0b1120"
  }, u = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i, v = /* @__PURE__ */ se(() => Object.fromEntries(r().map((A) => [A.name, A]))), _ = /* @__PURE__ */ se(() => r().filter((A) => !i.includes(A.name))), S = /* @__PURE__ */ se(() => typeof n().bg_color == "string" && u.test(n().bg_color) ? n().bg_color : "");
  let g = /* @__PURE__ */ q("");
  _t(() => {
    m(g, s(S), !0);
  });
  function p(A, N, ee) {
    e.store.beginEdit(), xa(n(), A, N === ee ? void 0 : N), e.store.endEdit();
  }
  function b() {
    e.store.beginEdit(), xa(n(), "bg_color", void 0), xa(n(), "text_color", void 0), e.store.endEdit();
  }
  const M = (A) => {
    var N;
    return n()[A] ?? ((N = s(v)[A]) == null ? void 0 : N.default);
  }, k = /* @__PURE__ */ se(() => Ts(n()));
  function C(A) {
    const N = s(k).includes(A) ? s(k).filter((Z) => Z !== A) : [...s(k), A], ee = l.map(([Z]) => Z).filter((Z) => N.includes(Z));
    e.store.beginEdit(), ee.length ? n().hide_on = ee : delete n().hide_on, e.store.endEdit();
  }
  function O() {
    e.store.beginEdit(), n().hidden ? delete n().hidden : n().hidden = !0, e.store.endEdit();
  }
  function D(A) {
    var N;
    e.store.beginEdit(), delete n().bg_color, delete n().text_color, A === ((N = s(v).background) == null ? void 0 : N.default) ? delete n().background : n().background = A, e.store.endEdit();
  }
  function G(A) {
    u.test(A) && p("bg_color", A.toLowerCase());
  }
  function R() {
    let A = s(g).trim();
    A && !A.startsWith("#") && (A = "#" + A), A ? u.test(A) ? G(A) : m(g, s(S), !0) : b();
  }
  function V(A) {
    let N = A.replace("#", "");
    N.length === 3 && (N = N.split("").map((oe) => oe + oe).join(""));
    const ee = (oe) => (oe /= 255, oe <= 0.03928 ? oe / 12.92 : ((oe + 0.055) / 1.055) ** 2.4), [Z, te, Se] = [0, 2, 4].map((oe) => parseInt(N.slice(oe, oe + 2), 16)), ye = 0.2126 * ee(Z) + 0.7152 * ee(te) + 0.0722 * ee(Se);
    return 1.05 / (ye + 0.05) >= (ye + 0.05) / 0.0597 ? "light" : "dark";
  }
  const I = (A) => {
    var N, ee;
    return ((ee = (N = e.store.palette) == null ? void 0 : N[A]) == null ? void 0 : ee.bg) || o[A] || "var(--mb-muted)";
  }, T = (A) => {
    var N, ee;
    return ((ee = (N = e.store.palette) == null ? void 0 : N[A]) == null ? void 0 : ee.fg) || (A === "accent" || A === "dark" ? "#fff" : "#111");
  }, L = /* @__PURE__ */ se(() => {
    var A;
    return [
      (A = e.store.palette) == null ? void 0 : A._accent,
      "#0f766e",
      "#7c3aed",
      "#be123c",
      "#ea580c",
      "#111827",
      "#f5f5f4"
    ].filter((N) => N && u.test(N));
  });
  var f = kf(), w = Te(f);
  {
    var j = (A) => {
      var N = bf(), ee = Te(N);
      {
        var Z = (oe) => {
          var me = pf(), De = Te(me), W = d(h(De), 2), Y = h(W);
          qe(Y, 17, () => s(v).background.options || [], wt, (xe, we) => {
            const Ae = /* @__PURE__ */ se(() => !s(S) && M("background") === s(we).value);
            var Ee = lf();
            let ze, Je;
            z(
              (at, ut) => {
                ze = Le(Ee, 1, "sw svelte-uthihf", null, ze, { active: s(Ae) }), ve(Ee, "title", s(we).label), ve(Ee, "aria-label", s(we).label), ve(Ee, "aria-pressed", s(Ae)), Je = At(Ee, "", Je, { background: at, color: ut });
              },
              [
                () => I(s(we).value),
                () => T(s(we).value)
              ]
            ), P("click", Ee, () => D(s(we).value)), y(xe, Ee);
          });
          var ge = d(Y, 2);
          {
            var fe = (xe) => {
              var we = cf();
              let Ae, Ee;
              var ze = h(we), Je = d(ze, 2);
              {
                var at = (Be) => {
                  var Xt = of();
                  y(Be, Xt);
                }, ut = (Be) => {
                  K(Be, { name: "plus", size: 14 });
                };
                B(Je, (Be) => {
                  s(S) ? Be(at) : Be(ut, -1);
                });
              }
              z(
                (Be) => {
                  Ae = Le(we, 1, "sw custom svelte-uthihf", null, Ae, { active: !!s(S) }), Ee = At(we, "", Ee, {
                    background: s(S) || "conic-gradient(#ef4444, #f59e0b, #22c55e, #06b6d4, #6366f1, #d946ef, #ef4444)",
                    color: Be
                  }), Xn(ze, s(S) || "#2563eb");
                },
                [
                  () => s(S) ? V(s(S)) === "light" ? "#fff" : "#111" : "#fff"
                ]
              ), P("input", ze, (Be) => G(Be.currentTarget.value)), y(xe, we);
            };
            B(ge, (xe) => {
              s(v).bg_color && xe(fe);
            });
          }
          var ae = d(W, 2), ue = h(ae);
          {
            var de = (xe) => {
              var we = nn();
              z(() => F(we, `Custom ${s(S) ?? ""}`)), y(xe, we);
            }, le = (xe) => {
              var we = nn();
              z((Ae) => F(we, Ae), [
                () => {
                  var Ae;
                  return (Ae = (s(v).background.options || []).find((Ee) => Ee.value === M("background"))) == null ? void 0 : Ae.label;
                }
              ]), y(xe, we);
            };
            B(ue, (xe) => {
              s(S) ? xe(de) : xe(le, -1);
            });
          }
          var ke = d(ue, 2);
          {
            var Ne = (xe) => {
              var we = uf(), Ae = $(we);
              z(() => F(Ae, `· colors from your theme (${e.store.palette._mode ?? ""})`)), y(xe, we);
            };
            B(ke, (xe) => {
              e.store.palette && xe(Ne);
            });
          }
          var Re = d(De, 2);
          {
            var Ke = (xe) => {
              var we = hf(), Ae = d(h(we), 2), Ee = h(Ae);
              let ze;
              var Je = d(Ee, 2), at = d(Je, 2);
              {
                var ut = (dt) => {
                  var Q = df();
                  P("click", Q, b), y(dt, Q);
                };
                B(at, (dt) => {
                  s(S) && dt(ut);
                });
              }
              var Be = d(Ae, 2);
              qe(Be, 21, () => s(L), wt, (dt, Q) => {
                var X = vf();
                let be;
                z(() => {
                  ve(X, "title", s(Q)), ve(X, "aria-label", s(Q)), be = At(X, "", be, { background: s(Q) });
                }), P("click", X, () => G(s(Q))), y(dt, X);
              });
              var Xt = d(Be, 2);
              {
                var mn = (dt) => {
                  var Q = ff(), X = d(Te(Q), 2);
                  {
                    let be = /* @__PURE__ */ se(() => n().text_color || "auto"), J = /* @__PURE__ */ se(() => (s(v).text_color.options || []).map((Ie) => ({
                      value: Ie.value,
                      label: Ie.value === "auto" ? `${Ie.label} (${V(s(S))})` : Ie.label
                    })));
                    Js(X, {
                      label: "Text color",
                      get value() {
                        return s(be);
                      },
                      onchange: (Ie) => p("text_color", Ie, "auto"),
                      get options() {
                        return s(J);
                      }
                    });
                  }
                  y(dt, Q);
                };
                B(Xt, (dt) => {
                  s(S) && s(v).text_color && dt(mn);
                });
              }
              z(() => ze = At(Ee, "", ze, { background: s(S) || "transparent" })), P("change", Je, R), P("keydown", Je, (dt) => dt.key === "Enter" && R()), bn(Je, () => s(g), (dt) => m(g, dt)), y(xe, we);
            };
            B(Re, (xe) => {
              s(v).bg_color && xe(Ke);
            });
          }
          y(oe, me);
        };
        B(ee, (oe) => {
          s(v).background && oe(Z);
        });
      }
      var te = d(ee, 2);
      qe(te, 16, () => ["spacing", "width", "align"], wt, (oe, me) => {
        var De = Ct(), W = Te(De);
        {
          var Y = (ge) => {
            var fe = gf(), ae = h(fe), ue = $(ae, !0), de = d(ae, 2);
            {
              let le = /* @__PURE__ */ se(() => M(me));
              Js(de, {
                get label() {
                  return s(v)[me].label;
                },
                get value() {
                  return s(le);
                },
                get options() {
                  return s(v)[me].options;
                },
                onchange: (ke) => p(me, ke, s(v)[me].default)
              });
            }
            z(() => F(ue, s(v)[me].label)), y(ge, fe);
          };
          B(W, (ge) => {
            var fe;
            (fe = s(v)[me]) != null && fe.options && ge(Y);
          });
        }
        y(oe, De);
      });
      var Se = d(te, 2);
      {
        var ye = (oe) => {
          La(oe, {
            get field() {
              return s(v).reveal;
            },
            get target() {
              return n();
            },
            get store() {
              return e.store;
            }
          });
        };
        B(Se, (oe) => {
          s(v).reveal && oe(ye);
        });
      }
      y(A, N);
    };
    B(w, (A) => {
      a() === "style" && A(j);
    });
  }
  var he = d(w, 2);
  {
    var ie = (A) => {
      var N = Ct(), ee = Te(N);
      {
        var Z = (te) => {
          var Se = yf(), ye = d(h(Se), 2), oe = h(ye);
          {
            var me = (de) => {
              var le = Ct(), ke = Te(le);
              qe(ke, 17, () => l, wt, (Ne, Re) => {
                var Ke = /* @__PURE__ */ se(() => Ha(s(Re), 3));
                let xe = () => s(Ke)[0], we = () => s(Ke)[1], Ae = () => s(Ke)[2];
                const Ee = /* @__PURE__ */ se(() => s(k).includes(xe()));
                var ze = mf();
                let Je;
                var at = h(ze);
                {
                  let Be = /* @__PURE__ */ se(() => s(Ee) ? "eye-off" : we());
                  K(at, {
                    get name() {
                      return s(Be);
                    },
                    size: 13
                  });
                }
                var ut = d(at);
                z(
                  (Be) => {
                    Je = Le(ze, 1, "dev svelte-uthihf", null, Je, { off: s(Ee) }), ze.disabled = !!n().hidden, ve(ze, "aria-pressed", !s(Ee)), ve(ze, "title", Be), F(ut, ` ${Ae() ?? ""}`);
                  },
                  [
                    () => s(Ee) ? `Hidden on ${Ae().toLowerCase()}: click to show` : `Shown on ${Ae().toLowerCase()}: click to hide`
                  ]
                ), P("click", ze, () => C(xe())), y(Ne, ze);
              }), y(de, le);
            };
            B(oe, (de) => {
              s(v).hide_on && de(me);
            });
          }
          var De = d(oe, 2);
          {
            var W = (de) => {
              var le = _f();
              let ke;
              var Ne = h(le);
              K(Ne, { name: "eye-off", size: 13 }), z(() => {
                ke = Le(le, 1, "dev svelte-uthihf", null, ke, { off: !!n().hidden }), ve(le, "aria-pressed", !!n().hidden);
              }), P("click", le, O), y(de, le);
            };
            B(De, (de) => {
              s(v).hidden && de(W);
            });
          }
          var Y = d(ye, 2), ge = h(Y);
          {
            var fe = (de) => {
              var le = nn("Hidden everywhere. The block isn't rendered on the site.");
              y(de, le);
            }, ae = (de) => {
              var le = nn();
              z((ke) => F(le, `Hidden on ${ke ?? ""}. Still visible in this editor, striped.`), [() => s(k).join(", ")]), y(de, le);
            }, ue = (de) => {
              var le = nn("Shown on every screen size.");
              y(de, le);
            };
            B(ge, (de) => {
              n().hidden ? de(fe) : s(k).length ? de(ae, 1) : de(ue, -1);
            });
          }
          y(te, Se);
        };
        B(ee, (te) => {
          (s(v).hide_on || s(v).hidden) && te(Z);
        });
      }
      y(A, N);
    }, ce = (A) => {
      var N = Ct(), ee = Te(N);
      qe(ee, 17, () => s(_), (Z) => Z.name, (Z, te) => {
        La(Z, {
          get field() {
            return s(te);
          },
          get target() {
            return n();
          },
          get store() {
            return e.store;
          }
        });
      }), y(A, N);
    };
    B(he, (A) => {
      a() === "style" || a() === "visibility" ? A(ie) : a() === "advanced" && A(ce, 1);
    });
  }
  y(t, f), ct();
}
ht(["click", "input", "change", "keydown"]);
var wf = /* @__PURE__ */ x("<option>Choose…</option>"), Al = /* @__PURE__ */ x("<option> </option>"), xf = /* @__PURE__ */ x('<p class="muted svelte-1w5bgec">Checking…</p>'), Sf = /* @__PURE__ */ x('<li class="svelte-1w5bgec"> </li>'), Ef = /* @__PURE__ */ x('<ul class="svelte-1w5bgec"></ul>'), Mf = /* @__PURE__ */ x('<p class="muted svelte-1w5bgec">Not saved on any page yet.</p>'), Tf = /* @__PURE__ */ x('<div class="usage svelte-1w5bgec"><span class="mb-label">Used on</span> <!></div>'), Af = /* @__PURE__ */ x('<div class="global"><div class="banner svelte-1w5bgec"><!> <div class="svelte-1w5bgec"><strong> </strong> <span class="svelte-1w5bgec">Shared content. Edits apply on every page that uses it.</span></div></div> <label class="mb-label" for="mb-global-pick">Show this global section</label> <select id="mb-global-pick" class="mb-input"><!><!><!></select> <div class="actions svelte-1w5bgec"><button type="button" class="mb-btn primary"><!> Edit global section</button> <button type="button" class="mb-btn" title="Replace with an editable copy on this page"><!> Detach</button></div> <!> <!></div>');
function Cf(t, e) {
  ot(e, !0);
  let n = Ye(e, "block", 7), r = /* @__PURE__ */ q(null);
  const a = /* @__PURE__ */ se(() => {
    var A;
    return ((A = n().global) == null ? void 0 : A.section) || "";
  }), i = /* @__PURE__ */ se(() => e.store.sections.find((A) => A.id === s(a)));
  let l = 0;
  _t(() => {
    if (m(r, null), !s(a)) return;
    const A = ++l;
    Xe.section(s(a)).then((N) => {
      A === l && m(r, N.usage || [], !0);
    }).catch(() => {
      A === l && m(r, [], !0);
    });
  }), ps(() => e.store.refreshSections());
  function o(A) {
    const N = A.currentTarget.value;
    e.store.readOnly && (A.currentTarget.value = s(a)), e.store.mutate(
      () => {
        (!n().global || typeof n().global != "object") && (n().global = {}), n().global.section = N;
      },
      "Switching global section…"
    );
  }
  async function u() {
    e.store.dirty && e.store.flash("Your page changes are kept. Save the page when you come back.");
    try {
      await e.store.openSection(s(a));
    } catch (A) {
      e.store.flash(A.message);
    }
  }
  async function v() {
    if (await e.askConfirm({
      title: "Detach from global section?",
      message: "This page gets its own editable copy of the blocks. The global section and the other pages that use it are not changed. You can undo this.",
      choices: [
        { label: "Cancel", value: !1 },
        { label: "Detach", value: !0, primary: !0 }
      ]
    }))
      try {
        await e.store.detachGlobal(e.index);
      } catch (N) {
        e.store.flash(N.message);
      }
  }
  var _ = Af(), S = h(_), g = h(S);
  K(g, { name: "globe", size: 18 });
  var p = d(g, 2), b = h(p), M = $(b, !0), k = d(S, 4), C = h(k);
  {
    var O = (A) => {
      var N = wf();
      N.value = N.__value = "", y(A, N);
    };
    B(C, (A) => {
      s(a) || A(O);
    });
  }
  var D = d(C);
  qe(D, 17, () => e.store.sections, (A) => A.id, (A, N) => {
    var ee = Al(), Z = $(ee), te = {};
    z(() => {
      F(Z, `${s(N).title ?? ""} (${s(N).count ?? ""})`), te !== (te = s(N).id) && (ee.value = (ee.__value = te) ?? "");
    }), y(A, ee);
  });
  var G = d(D);
  {
    var R = (A) => {
      var N = Al(), ee = $(N), Z = {};
      z(() => {
        F(ee, `${s(a) ?? ""} (missing)`), Z !== (Z = s(a)) && (N.value = (N.__value = Z) ?? "");
      }), y(A, N);
    };
    B(G, (A) => {
      s(a) && !s(i) && A(R);
    });
  }
  var V;
  pr(k);
  var I = d(k, 2), T = h(I), L = h(T);
  K(L, { name: "edit", size: 14 });
  var f = d(T, 2), w = h(f);
  K(w, { name: "unlink", size: 14 });
  var j = d(I, 2);
  {
    var he = (A) => {
      Ea(A, {
        get block() {
          return n();
        },
        get store() {
          return e.store;
        },
        get settings() {
          return e.store.catalog.settings;
        },
        mode: "visibility"
      });
    };
    B(j, (A) => {
      var N;
      (N = e.store.catalog) != null && N.settings && A(he);
    });
  }
  var ie = d(j, 2);
  {
    var ce = (A) => {
      var N = Tf(), ee = d(h(N), 2);
      {
        var Z = (ye) => {
          var oe = xf();
          y(ye, oe);
        }, te = (ye) => {
          var oe = Ef();
          qe(oe, 21, () => s(r), wt, (me, De) => {
            var W = Sf(), Y = $(W, !0);
            z(() => F(Y, s(De))), y(me, W);
          }), y(ye, oe);
        }, Se = (ye) => {
          var oe = Mf();
          y(ye, oe);
        };
        B(ee, (ye) => {
          s(r) === null ? ye(Z) : s(r).length ? ye(te, 1) : ye(Se, -1);
        });
      }
      y(A, N);
    };
    B(ie, (A) => {
      s(a) && A(ce);
    });
  }
  z(() => {
    var A;
    F(M, ((A = s(i)) == null ? void 0 : A.title) || "Global section"), V !== (V = s(a)) && (k.value = (k.__value = V) ?? "", oa(k, V)), T.disabled = !s(i), f.disabled = !s(i);
  }), P("change", k, o), P("click", T, u), P("click", f, v), y(t, _), ct();
}
ht(["change", "click"]);
var Of = /* @__PURE__ */ x('<div class="make-global svelte-17w6cpd"><span class="mb-label">Make global section</span> <p class="mb-help svelte-17w6cpd"> </p> <div class="row svelte-17w6cpd"><input class="mb-input" placeholder="Name, e.g. Services band"/> <button type="button" class="mb-btn primary"><!> </button></div></div>'), Pf = /* @__PURE__ */ x(`<header class="svelte-17w6cpd"><span class="ico svelte-17w6cpd"><!></span> <div class="h svelte-17w6cpd"><strong class="svelte-17w6cpd"> </strong> <span class="svelte-17w6cpd"> </span></div> <button type="button" class="mb-btn ghost icon sm" title="Clear selection (Esc)"><!></button></header> <div class="body mb-scroll svelte-17w6cpd"><div class="multi-actions svelte-17w6cpd"><button type="button" class="mb-btn svelte-17w6cpd"><!> Move up</button> <button type="button" class="mb-btn svelte-17w6cpd"><!> Move down</button> <button type="button" class="mb-btn svelte-17w6cpd"><!> Duplicate</button> <button type="button" class="mb-btn svelte-17w6cpd"><!> Copy</button> <button type="button" class="mb-btn svelte-17w6cpd"><!> Save as pattern</button> <button type="button" class="mb-btn danger svelte-17w6cpd"><!> Delete</button></div> <p class="mb-help">Shift+click selects a range, Ctrl/Cmd+click adds or removes a block. Copy, then paste with Ctrl+V on any page's builder.</p> <!></div>`, 1), zf = /* @__PURE__ */ x('<div class="none svelte-17w6cpd"><!> <strong class="svelte-17w6cpd">No block selected</strong> <p class="svelte-17w6cpd">Click a section in the preview, or pick one in the Outline, to edit its content and style.</p> <p class="tip svelte-17w6cpd">Tip: click any heading, label or button text in the preview to type directly on the page.</p> <p class="keys svelte-17w6cpd"><span class="mb-kbd">Ctrl+Z</span> undo · <span class="mb-kbd">Ctrl+S</span> save · <span class="mb-kbd">Del</span> remove</p></div>'), Df = /* @__PURE__ */ x('<header class="svelte-17w6cpd"><span class="ico svelte-17w6cpd"><!></span> <div class="h svelte-17w6cpd"><strong class="svelte-17w6cpd"> </strong> <span class="svelte-17w6cpd">The active theme has no definition for this type. Its content is kept exactly as saved; the site renders nothing for it until the theme defines it.</span></div> <button type="button" class="mb-btn ghost icon sm" title="Deselect"><!></button></header> <div class="body mb-scroll svelte-17w6cpd"><!> <pre class="raw svelte-17w6cpd"> </pre></div>', 1), Nf = /* @__PURE__ */ x('<div class="body mb-scroll svelte-17w6cpd"><!></div>'), Lf = /* @__PURE__ */ x("<option> </option>"), Rf = /* @__PURE__ */ x('<div class="make-global svelte-17w6cpd"><span class="mb-label">Make global section</span> <p class="mb-help svelte-17w6cpd">Share this block across pages. Edit it once and every page that uses it updates.</p> <div class="row svelte-17w6cpd"><input class="mb-input" placeholder="Name, e.g. Footer call to action"/> <button type="button" class="mb-btn primary"><!> </button></div></div>'), If = /* @__PURE__ */ x('<!> <div class="field svelte-17w6cpd"><label class="mb-label" for="mb-type">Block type</label> <select id="mb-type" class="mb-input"></select></div> <!>', 1), jf = /* @__PURE__ */ x('<div class="mb-tabs tabs svelte-17w6cpd" role="group" aria-label="Block settings"><button type="button">Content</button> <button type="button">Style</button> <button type="button">Advanced</button></div> <div class="body mb-scroll svelte-17w6cpd"><!></div>', 1), qf = /* @__PURE__ */ x('<header class="svelte-17w6cpd"><span class="ico svelte-17w6cpd"><!></span> <div class="h svelte-17w6cpd"><strong class="svelte-17w6cpd"> </strong> <span class="svelte-17w6cpd"> </span></div> <button type="button" class="mb-btn ghost icon sm" title="Deselect"><!></button></header> <!>', 1);
function Ff(t, e) {
  ot(e, !0);
  let n = Ye(e, "savePattern", 3, () => {
  }), r = /* @__PURE__ */ q("content");
  const a = /* @__PURE__ */ se(() => e.store.selection);
  async function i() {
    await e.askConfirm({
      title: `Delete ${s(a).length} blocks?`,
      message: "You can undo this with Ctrl+Z.",
      choices: [
        { label: "Cancel", value: !1 },
        { label: "Delete", value: !0, primary: !0 }
      ]
    }) && e.store.removeMany(s(a));
  }
  const l = /* @__PURE__ */ se(() => e.store.selected >= 0 ? e.store.blocks[e.store.selected] : null), o = /* @__PURE__ */ se(() => s(l) ? e.store.defFor(s(l).type) : null);
  _t(() => {
    s(l) && s(o) && (typeof s(l)[s(l).type] != "object" || Array.isArray(s(l)[s(l).type])) && (s(l)[s(l).type] = {});
  });
  let u = /* @__PURE__ */ q(""), v = /* @__PURE__ */ q(!1);
  async function _(O = [e.store.selected]) {
    const D = s(u).trim();
    if (D) {
      m(v, !0);
      try {
        const G = await e.store.makeGlobal(O, D);
        m(u, ""), e.store.flash(`“${G.title}” is now a global section. Insert it on other pages from Patterns → Global.`);
      } catch (G) {
        e.store.flash(G.message);
      }
      m(v, !1);
    }
  }
  async function S(O) {
    const D = O.currentTarget.value;
    O.currentTarget.value = s(l).type, await e.askConfirm({
      title: "Change block type",
      message: "Content that doesn’t fit the new block type is removed. Style settings are kept. You can undo this.",
      choices: [
        { label: "Cancel", value: !1 },
        { label: "Change type", value: !0, primary: !0 }
      ]
    }) && e.store.changeType(e.store.selected, D);
  }
  var g = Ct(), p = Te(g);
  {
    var b = (O) => {
      var D = Pf(), G = Te(D), R = h(G), V = h(R);
      K(V, { name: "select", size: 16 });
      var I = d(R, 2), T = h(I), L = $(T), f = d(T, 2), w = $(f, !0), j = d(I, 2), he = h(j);
      K(he, { name: "x", size: 14 });
      var ie = d(G, 2), ce = h(ie), A = h(ce), N = h(A);
      K(N, { name: "up", size: 14 });
      var ee = d(A, 2), Z = h(ee);
      K(Z, { name: "down", size: 14 });
      var te = d(ee, 2), Se = h(te);
      K(Se, { name: "copy", size: 14 });
      var ye = d(te, 2), oe = h(ye);
      K(oe, { name: "clipboard", size: 14 });
      var me = d(ye, 2), De = h(me);
      K(De, { name: "template", size: 14 });
      var W = d(me, 2), Y = h(W);
      K(Y, { name: "trash", size: 14 });
      var ge = d(ce, 4);
      {
        var fe = (ae) => {
          const ue = /* @__PURE__ */ se(() => s(a).filter((Ae) => {
            var Ee;
            return ((Ee = e.store.blocks[Ae]) == null ? void 0 : Ee.type) !== "global";
          }));
          var de = Of(), le = d(h(de), 2), ke = $(le), Ne = d(le, 2), Re = h(Ne), Ke = d(Re, 2), xe = h(Ke);
          K(xe, { name: "globe", size: 14 });
          var we = d(xe);
          z(
            (Ae) => {
              F(ke, `Turn ${s(ue).length === s(a).length ? `these ${s(ue).length} blocks` : `the ${s(ue).length} regular blocks`} into one shared section, placed where the first one is.`), Ke.disabled = Ae, F(we, ` ${s(v) ? "Creating…" : "Create"}`);
            },
            [
              () => !s(u).trim() || s(v) || !s(ue).length
            ]
          ), P("keydown", Re, (Ae) => Ae.key === "Enter" && _(s(ue))), bn(Re, () => s(u), (Ae) => m(u, Ae)), P("click", Ke, () => _(s(ue))), y(ae, de);
        };
        B(ge, (ae) => {
          e.store.isSection || ae(fe);
        });
      }
      z(
        (ae, ue) => {
          F(L, `${s(a).length ?? ""} blocks selected`), F(w, ae), A.disabled = s(a)[0] === 0, ee.disabled = ue;
        },
        [
          () => s(a).map((ae) => {
            var ue, de, le;
            return ((de = e.store.defFor((ue = e.store.blocks[ae]) == null ? void 0 : ue.type)) == null ? void 0 : de.title) || ((le = e.store.blocks[ae]) == null ? void 0 : le.type);
          }).join(" · "),
          () => s(a).at(-1) === e.store.blocks.length - 1
        ]
      ), P("click", j, () => e.store.select(-1)), P("click", A, () => e.store.moveSelection(-1)), P("click", ee, () => e.store.moveSelection(1)), P("click", te, () => e.store.duplicateMany(s(a))), P("click", ye, () => e.store.copyBlocks(s(a))), P("click", me, function(...ae) {
        var ue;
        (ue = n()) == null || ue.apply(this, ae);
      }), P("click", W, i), y(O, D);
    }, M = (O) => {
      var D = zf(), G = h(D);
      K(G, { name: "settings", size: 26 }), y(O, D);
    }, k = (O) => {
      var D = Df(), G = Te(D), R = h(G), V = h(R);
      K(V, { name: "blocks", size: 16 });
      var I = d(R, 2), T = h(I), L = $(T), f = d(I, 2), w = h(f);
      K(w, { name: "x", size: 14 });
      var j = d(G, 2), he = h(j);
      {
        var ie = (N) => {
          Ea(N, {
            get block() {
              return s(l);
            },
            get store() {
              return e.store;
            },
            get settings() {
              return e.store.catalog.settings;
            },
            mode: "visibility"
          });
        };
        B(he, (N) => {
          var ee;
          (ee = e.store.catalog) != null && ee.settings && N(ie);
        });
      }
      var ce = d(he, 2), A = $(ce, !0);
      z(
        (N) => {
          F(L, `Unknown block “${s(l).type ?? ""}”`), F(A, N);
        },
        [
          () => JSON.stringify(s(l)[s(l).type] ?? null, null, 2)
        ]
      ), P("click", f, () => e.store.select(-1)), y(O, D);
    }, C = (O) => {
      var D = qf(), G = Te(D), R = h(G), V = h(R);
      K(V, {
        get fa() {
          return s(o).icon;
        },
        size: 16
      });
      var I = d(R, 2), T = h(I), L = $(T, !0), f = d(T, 2), w = $(f, !0), j = d(I, 2), he = h(j);
      K(he, { name: "x", size: 14 });
      var ie = d(G, 2);
      {
        var ce = (N) => {
          var ee = Nf(), Z = h(ee);
          pl(Z, () => e.store.selected, (te) => {
            Cf(te, {
              get store() {
                return e.store;
              },
              get block() {
                return s(l);
              },
              get index() {
                return e.store.selected;
              },
              get askConfirm() {
                return e.askConfirm;
              }
            });
          }), y(N, ee);
        }, A = (N) => {
          var ee = jf(), Z = Te(ee), te = h(Z), Se = d(te, 2), ye = d(Se, 2), oe = d(Z, 2), me = h(oe);
          pl(me, () => e.store.selected + ":" + s(l).type, (De) => {
            var W = Ct(), Y = Te(W);
            {
              var ge = (ue) => {
                var de = Ct(), le = Te(de);
                qe(le, 17, () => s(o).fields, (ke) => ke.name, (ke, Ne) => {
                  La(ke, {
                    get field() {
                      return s(Ne);
                    },
                    get target() {
                      return s(l)[s(l).type];
                    },
                    get store() {
                      return e.store;
                    }
                  });
                }), y(ue, de);
              }, fe = (ue) => {
                Ea(ue, {
                  get block() {
                    return s(l);
                  },
                  get store() {
                    return e.store;
                  },
                  get settings() {
                    return e.store.catalog.settings;
                  },
                  mode: "style"
                });
              }, ae = (ue) => {
                var de = If(), le = Te(de);
                Ea(le, {
                  get block() {
                    return s(l);
                  },
                  get store() {
                    return e.store;
                  },
                  get settings() {
                    return e.store.catalog.settings;
                  },
                  mode: "advanced"
                });
                var ke = d(le, 2), Ne = d(h(ke), 2);
                qe(Ne, 21, () => e.store.catalog.blocks.filter((we) => !we.virtual), wt, (we, Ae) => {
                  var Ee = Lf(), ze = $(Ee, !0), Je = {};
                  z(() => {
                    F(ze, s(Ae).title), Je !== (Je = s(Ae).type) && (Ee.value = (Ee.__value = Je) ?? "");
                  }), y(we, Ee);
                });
                var Re;
                pr(Ne);
                var Ke = d(ke, 2);
                {
                  var xe = (we) => {
                    var Ae = Rf(), Ee = d(h(Ae), 4), ze = h(Ee), Je = d(ze, 2), at = h(Je);
                    K(at, { name: "globe", size: 14 });
                    var ut = d(at);
                    z(
                      (Be) => {
                        Je.disabled = Be, F(ut, ` ${s(v) ? "Creating…" : "Create"}`);
                      },
                      [() => !s(u).trim() || s(v)]
                    ), P("keydown", ze, (Be) => Be.key === "Enter" && _()), bn(ze, () => s(u), (Be) => m(u, Be)), P("click", Je, () => _()), y(we, Ae);
                  };
                  B(Ke, (we) => {
                    e.store.isSection || we(xe);
                  });
                }
                z(() => {
                  Re !== (Re = s(l).type) && (Ne.value = (Ne.__value = Re) ?? "", oa(Ne, Re));
                }), P("change", Ne, S), y(ue, de);
              };
              B(Y, (ue) => {
                s(r) === "content" && s(l)[s(l).type] && typeof s(l)[s(l).type] == "object" ? ue(ge) : s(r) === "style" ? ue(fe, 1) : s(r) === "advanced" && ue(ae, 2);
              });
            }
            y(De, W);
          }), z(() => {
            ve(te, "aria-pressed", s(r) === "content"), ve(Se, "aria-pressed", s(r) === "style"), ve(ye, "aria-pressed", s(r) === "advanced");
          }), P("click", te, () => m(r, "content")), P("click", Se, () => m(r, "style")), P("click", ye, () => m(r, "advanced")), y(N, ee);
        };
        B(ie, (N) => {
          s(l).type === "global" ? N(ce) : N(A, -1);
        });
      }
      z(() => {
        F(L, s(o).title), F(w, s(o).description);
      }), P("click", j, () => e.store.select(-1)), y(O, D);
    };
    B(p, (O) => {
      s(a).length > 1 ? O(b) : s(l) ? s(o) ? O(C, -1) : O(k, 2) : O(M, 1);
    });
  }
  y(t, g), ct();
}
ht(["click", "keydown", "change"]);
const Cl = (t) => JSON.stringify(t ?? null);
function Ol(t, e) {
  const n = t.length, r = e.length, a = Array.from({ length: n + 1 }, () => new Uint16Array(r + 1));
  for (let l = n - 1; l >= 0; l--)
    for (let o = r - 1; o >= 0; o--)
      a[l][o] = t[l] === e[o] ? a[l + 1][o + 1] + 1 : Math.max(a[l + 1][o], a[l][o + 1]);
  const i = [];
  for (let l = 0, o = 0; l < n && o < r; )
    t[l] === e[o] ? (i.push([l, o]), l++, o++) : a[l + 1][o] >= a[l][o + 1] ? l++ : o++;
  return i;
}
function Ra(t, e = "", n = {}) {
  if (Array.isArray(t) && t.length && t.every((r) => r === null || typeof r != "object")) {
    const r = t.filter((a) => a !== null && a !== "").map(String).join(", ");
    r && (n[e] = r);
  } else if (Array.isArray(t))
    t.forEach((r, a) => Ra(r, e ? `${e}.${a}` : String(a), n));
  else if (t && typeof t == "object")
    for (const [r, a] of Object.entries(t)) Ra(a, e ? `${e}.${r}` : r, n);
  else t != null && t !== "" && (n[e] = typeof t == "boolean" ? t ? "Yes" : "No" : String(t));
  return n;
}
const ga = (t) => String(t).replace(/[_-]+/g, " ").replace(/^\w/, (e) => e.toUpperCase());
function Bf(t, e, { defFor: n, settings: r } = {}) {
  var u;
  const a = e.split(".");
  if (a[0] !== t.type) {
    const v = (r || []).find((_) => _.name === a[0]);
    return [(v == null ? void 0 : v.label) || ga(a[0]), ...a.slice(1).map((_) => /^\d+$/.test(_) ? String(Number(_) + 1) : ga(_))].join(" › ");
  }
  const i = ((u = n == null ? void 0 : n(t.type)) == null ? void 0 : u.fields) || [], l = [], o = [];
  for (const v of a.slice(1)) {
    if (o.push(v), /^\d+$/.test(v)) {
      l.push(String(Number(v) + 1));
      continue;
    }
    const _ = Io(i, o.join("."));
    l.push((_ == null ? void 0 : _.label) || ga(v));
  }
  return l.join(" › ") || ga(t.type);
}
function li(t, e, n) {
  const r = Ra(t), a = Ra(e);
  return [.../* @__PURE__ */ new Set([...Object.keys(r), ...Object.keys(a)])].filter((l) => l !== "type" && r[l] !== a[l]).map((l) => ({ path: l, label: Bf(e || t, l, n), before: r[l] ?? "", after: a[l] ?? "" }));
}
function Uf(t = [], e = [], n = {}) {
  const r = t.map(Cl), a = e.map(Cl), i = new Array(t.length).fill(-1), l = new Array(e.length).fill(-1), o = {}, u = (g, p, b) => {
    i[g] = p, l[p] = g, o[p] = b;
  };
  for (const [g, p] of Ol(r, a)) u(g, p, "same");
  for (let g = 0; g < e.length; g++) {
    if (l[g] >= 0) continue;
    const p = r.findIndex((b, M) => i[M] < 0 && b === a[g]);
    p >= 0 && u(p, g, "moved");
  }
  const v = t.map((g, p) => p).filter((g) => i[g] < 0), _ = e.map((g, p) => p).filter((g) => l[g] < 0);
  for (const [g, p] of Ol(v.map((b) => {
    var M;
    return (M = t[b]) == null ? void 0 : M.type;
  }), _.map((b) => {
    var M;
    return (M = e[b]) == null ? void 0 : M.type;
  })))
    u(v[g], _[p], "changed");
  const S = [];
  return e.forEach((g, p) => {
    const b = l[p];
    if (b < 0)
      S.push({ status: "added", type: g.type, before: null, after: g, from: -1, to: p, changes: li(null, g, n), sort: p });
    else {
      const M = o[p] === "changed" ? li(t[b], g, n) : [];
      S.push({ status: o[p], type: g.type, before: t[b], after: g, from: b, to: p, changes: M, sort: p });
    }
  }), t.forEach((g, p) => {
    if (i[p] >= 0) return;
    let b = -1;
    for (let M = p - 1; M >= 0; M--) if (i[M] >= 0) {
      b = i[M];
      break;
    }
    S.push({ status: "removed", type: g.type, before: g, after: null, from: p, to: -1, changes: li(g, null, n), sort: b + 0.5 + p / 1e6 });
  }), S.sort((g, p) => g.sort - p.sort), S.map(({ sort: g, ...p }) => p);
}
function Hf(t) {
  const e = { added: 0, removed: 0, changed: 0, moved: 0 };
  for (const n of t) n.status in e && e[n.status]++;
  return e;
}
var Kf = /* @__PURE__ */ x('<button type="button" class="mb-btn">Close</button> <button type="button" class="mb-btn primary"><!> </button>', 1), Gf = /* @__PURE__ */ x('<p class="error svelte-mmrwym"> </p>'), Vf = /* @__PURE__ */ x('<p class="muted svelte-mmrwym">Loading versions…</p>'), Yf = /* @__PURE__ */ x("<span> </span>"), Jf = /* @__PURE__ */ x('<span class="pos svelte-mmrwym"> </span>'), Wf = /* @__PURE__ */ x('<img alt="" class="svelte-mmrwym"/>'), Xf = /* @__PURE__ */ x('<em class="svelte-mmrwym">empty</em>'), Zf = /* @__PURE__ */ x('<span class="val svelte-mmrwym"> </span>'), Qf = /* @__PURE__ */ x("<td><!> <!></td>"), $f = /* @__PURE__ */ x('<tr><td class="svelte-mmrwym"></td><td colspan="2" class="svelte-mmrwym"><button type="button" class="link svelte-mmrwym"> </button></td></tr>'), eh = /* @__PURE__ */ x('<tr><td class="field svelte-mmrwym"> </td><!></tr> <!>', 1), th = /* @__PURE__ */ x('<table class="svelte-mmrwym"><thead><tr><th class="svelte-mmrwym">Field</th><th class="svelte-mmrwym">Before</th><th class="svelte-mmrwym">After</th></tr></thead><tbody></tbody></table>'), nh = /* @__PURE__ */ x('<li><header class="svelte-mmrwym"><span> </span> <strong class="svelte-mmrwym"> </strong> <span class="sum svelte-mmrwym"> </span> <!></header> <!></li>'), sh = /* @__PURE__ */ x('<li class="muted svelte-mmrwym">Nothing to show.</li>'), rh = /* @__PURE__ */ x('<p class="counts svelte-mmrwym"><!></p> <ol class="rows svelte-mmrwym"></ol>', 1), ah = /* @__PURE__ */ x('<div class="bar svelte-mmrwym"><!> <label class="same svelte-mmrwym"><input type="checkbox"/> Show unchanged</label></div> <!>', 1);
function ih(t, e) {
  ot(e, !0);
  let n = Ye(e, "previous", 3, null), r = /* @__PURE__ */ q(
    "current"
    // current | previous
  ), a = /* @__PURE__ */ q(null), i = /* @__PURE__ */ q(null), l = /* @__PURE__ */ q(""), o = /* @__PURE__ */ q(!1), u = et({}), v = 0;
  _t(() => {
    const I = ++v;
    m(l, ""), m(a, null), Xe.revision(e.store.context, e.rev.id).then((T) => {
      I === v && m(a, _n(T.blocks || [], e.store.settingKeys), !0);
    }).catch((T) => {
      I === v && m(l, T.message, !0);
    });
  });
  let _ = 0;
  _t(() => {
    var L;
    const I = (L = n()) == null ? void 0 : L.id;
    if (m(i, null), s(r) !== "previous" || !I) return;
    const T = ++_;
    Xe.revision(e.store.context, I).then((f) => {
      T === _ && m(i, _n(f.blocks || [], e.store.settingKeys), !0);
    }).catch((f) => {
      T === _ && m(l, f.message, !0);
    });
  });
  const S = /* @__PURE__ */ se(() => {
    var I;
    return {
      defFor: (T) => e.store.defFor(T),
      settings: ((I = e.store.catalog) == null ? void 0 : I.settings) || []
    };
  }), g = /* @__PURE__ */ se(() => s(r) === "previous" ? [s(i), s(a)] : [s(a), e.store.snapshot()]), p = /* @__PURE__ */ se(() => s(g)[0] && s(g)[1] ? Uf(s(g)[0], s(g)[1], s(S)) : null), b = /* @__PURE__ */ se(() => s(p) ? Hf(s(p)) : null), M = /* @__PURE__ */ se(() => s(p) ? s(p).filter((I) => s(o) || I.status !== "same") : []), k = {
    added: "Added",
    removed: "Removed",
    changed: "Edited",
    moved: "Moved",
    same: "Unchanged"
  }, C = /\.(jpe?g|png|gif|webp|avif|svg)$/i, O = 180;
  function D(I) {
    var L, f;
    const T = I.after || I.before;
    return T.type === "global" ? "Global · " + e.store.sectionTitle((L = T.global) == null ? void 0 : L.section) : ((f = e.store.defFor(T.type)) == null ? void 0 : f.title) || T.type;
  }
  function G(I) {
    return !C.test(I) || /^(https?:)?\/\//.test(I) || I.startsWith("user://") ? "" : e.store.pageMediaUrl(I);
  }
  const R = (I) => I.length > O, V = (I, T) => R(I) && !u[T] ? I.slice(0, O) + "…" : I;
  Na(t, {
    title: "Compare versions",
    wide: !0,
    get onclose() {
      return e.onclose;
    },
    actions: (T) => {
      var L = Kf(), f = Te(L), w = d(f, 2), j = h(w);
      K(j, { name: "history", size: 14 });
      var he = d(j);
      z((ie) => F(he, ` Restore ${ie ?? ""}`), [() => e.when(e.rev.time)]), P("click", f, function(...ie) {
        var ce;
        (ce = e.onclose) == null || ce.apply(this, ie);
      }), P("click", w, () => e.onrestore(e.rev)), y(T, L);
    },
    children: (T, L) => {
      var f = ah(), w = Te(f), j = h(w);
      {
        let Z = /* @__PURE__ */ se(() => [
          {
            value: "current",
            label: `${e.when(e.rev.time)} → current editor`
          },
          {
            value: "previous",
            label: n() ? `${e.when(n().time)} → ${e.when(e.rev.time)}` : "No earlier version",
            disabled: !n(),
            title: n() ? "" : "This is the oldest saved version"
          }
        ]);
        Js(j, {
          label: "Compare with",
          get value() {
            return s(r);
          },
          onchange: (te) => m(r, te, !0),
          get options() {
            return s(Z);
          }
        });
      }
      var he = d(j, 2), ie = h(he), ce = d(w, 2);
      {
        var A = (Z) => {
          var te = Gf(), Se = $(te, !0);
          z(() => F(Se, s(l))), y(Z, te);
        }, N = (Z) => {
          var te = Vf();
          y(Z, te);
        }, ee = (Z) => {
          var te = rh(), Se = Te(te), ye = h(Se);
          {
            var oe = (W) => {
              var Y = nn("No differences.");
              y(W, Y);
            }, me = (W) => {
              var Y = Ct(), ge = Te(Y);
              qe(
                ge,
                16,
                () => [
                  ["changed", "edited"],
                  ["added", "added"],
                  ["removed", "removed"],
                  ["moved", "moved"]
                ],
                wt,
                (fe, ae) => {
                  var ue = /* @__PURE__ */ se(() => Ha(ae, 2));
                  let de = () => s(ue)[0], le = () => s(ue)[1];
                  var ke = Ct(), Ne = Te(ke);
                  {
                    var Re = (Ke) => {
                      var xe = Yf(), we = $(xe);
                      z(() => {
                        Le(xe, 1, `pill ${de() ?? ""}`, "svelte-mmrwym"), F(we, `${s(b)[de()] ?? ""} ${le() ?? ""}`);
                      }), y(Ke, xe);
                    };
                    B(Ne, (Ke) => {
                      s(b)[de()] && Ke(Re);
                    });
                  }
                  y(fe, ke);
                }
              ), y(W, Y);
            };
            B(ye, (W) => {
              !s(b).added && !s(b).removed && !s(b).changed && !s(b).moved ? W(oe) : W(me, -1);
            });
          }
          var De = d(Se, 2);
          qe(
            De,
            23,
            () => s(M),
            (W, Y) => Y + W.status + W.from + ":" + W.to,
            (W, Y, ge) => {
              var fe = nh(), ae = h(fe), ue = h(ae), de = $(ue, !0), le = d(ue, 2), ke = $(le, !0), Ne = d(le, 2), Re = $(Ne, !0), Ke = d(Ne, 2);
              {
                var xe = (Ee) => {
                  var ze = Jf(), Je = $(ze);
                  z(() => F(Je, `position ${s(Y).from + 1} → ${s(Y).to + 1}`)), y(Ee, ze);
                };
                B(Ke, (Ee) => {
                  s(Y).status === "moved" && Ee(xe);
                });
              }
              var we = d(ae, 2);
              {
                var Ae = (Ee) => {
                  var ze = th(), Je = d(h(ze));
                  qe(Je, 21, () => s(Y).changes, (at) => at.path, (at, ut) => {
                    const Be = /* @__PURE__ */ se(() => s(ge) + s(ut).path);
                    var Xt = eh(), mn = Te(Xt), dt = h(mn), Q = $(dt, !0), X = d(dt);
                    qe(X, 17, () => [s(ut).before, s(ut).after], wt, (Ue, Qe, St) => {
                      var Et = Qf();
                      Le(Et, 1, xi(St ? "after" : "before"), "svelte-mmrwym");
                      var Pt = h(Et);
                      {
                        var zn = (We) => {
                          var nt = Wf();
                          z((pt) => ve(nt, "src", pt), [() => G(s(Qe))]), y(We, nt);
                        }, gs = /* @__PURE__ */ se(() => G(s(Qe)));
                        B(Pt, (We) => {
                          s(gs) && We(zn);
                        });
                      }
                      var Qs = d(Pt, 2);
                      {
                        var $s = (We) => {
                          var nt = Xf();
                          y(We, nt);
                        }, Dn = (We) => {
                          var nt = Zf(), pt = $(nt, !0);
                          z((Nn) => F(pt, Nn), [() => V(s(Qe), s(Be))]), y(We, nt);
                        };
                        B(Qs, (We) => {
                          s(Qe) === "" ? We($s) : We(Dn, -1);
                        });
                      }
                      y(Ue, Et);
                    });
                    var be = d(mn, 2);
                    {
                      var J = (Ue) => {
                        var Qe = $f(), St = d(h(Qe)), Et = h(St), Pt = $(Et, !0);
                        z(() => F(Pt, u[s(Be)] ? "Show less" : "Show full text")), P("click", Et, () => u[s(Be)] = !u[s(Be)]), y(Ue, Qe);
                      }, Ie = /* @__PURE__ */ se(() => R(s(ut).before) || R(s(ut).after));
                      B(be, (Ue) => {
                        s(Ie) && Ue(J);
                      });
                    }
                    z(() => F(Q, s(ut).label)), y(at, Xt);
                  }), y(Ee, ze);
                };
                B(we, (Ee) => {
                  s(Y).status === "changed" && Ee(Ae);
                });
              }
              z(
                (Ee, ze) => {
                  Le(fe, 1, `row ${s(Y).status ?? ""}`, "svelte-mmrwym"), Le(ue, 1, `pill ${s(Y).status ?? ""}`, "svelte-mmrwym"), F(de, k[s(Y).status]), F(ke, Ee), F(Re, ze);
                },
                [
                  () => D(s(Y)),
                  () => Yi(s(Y).after || s(Y).before)
                ]
              ), y(W, fe);
            },
            (W) => {
              var Y = sh();
              y(W, Y);
            }
          ), y(Z, te);
        };
        B(ce, (Z) => {
          s(l) ? Z(A) : s(p) ? Z(ee, -1) : Z(N, 1);
        });
      }
      Xu(ie, () => s(o), (Z) => m(o, Z)), y(T, f);
    },
    $$slots: { actions: !0, default: !0 }
  }), ct();
}
ht(["click"]);
var lh = /* @__PURE__ */ x('<p class="error svelte-19n2gxs"> </p>'), oh = /* @__PURE__ */ x('<p class="muted svelte-19n2gxs">Loading history…</p>'), ch = /* @__PURE__ */ x('<span class="time svelte-19n2gxs"> </span>'), uh = /* @__PURE__ */ x('<li><span class="dot svelte-19n2gxs"></span> <div class="body"><div class="row svelte-19n2gxs"><strong> </strong> <!></div> <div class="meta svelte-19n2gxs"> </div> <div class="types svelte-19n2gxs"> </div> <div class="btns svelte-19n2gxs"><button type="button" class="mb-btn sm" title="See what changed"><!> Compare</button> <button type="button" class="mb-btn sm"><!> </button></div></div></li>'), dh = /* @__PURE__ */ x('<p class="muted svelte-19n2gxs">No saved versions yet. Versions appear here after you save.</p>'), vh = /* @__PURE__ */ x('<div class="head svelte-19n2gxs"><p class="hint svelte-19n2gxs"> </p> <button type="button" class="mb-btn ghost icon sm" title="Refresh"><!></button></div> <!> <!> <ol class="timeline svelte-19n2gxs"></ol> <!>', 1);
function fh(t, e) {
  ot(e, !0);
  let n = Ye(e, "store", 7), r = /* @__PURE__ */ q(
    ""
    // revision id while the compare dialog is open
  );
  _t(() => {
    if (s(r))
      return n().modal = { close: () => m(r, "") }, () => {
        n().modal = null;
      };
  });
  let a = /* @__PURE__ */ q(et([])), i = /* @__PURE__ */ q(!1), l = /* @__PURE__ */ q(""), o = /* @__PURE__ */ q(""), u = 0;
  async function v() {
    if (!n().canPreview) return;
    const f = ++u;
    m(i, !0), m(l, "");
    try {
      const w = await Xe.revisions(n().context);
      if (f !== u) return;
      m(a, (w == null ? void 0 : w.items) || [], !0);
    } catch (w) {
      f === u && m(l, w.message, !0);
    }
    f === u && m(i, !1);
  }
  _t(() => {
    JSON.stringify(n().context), n().revisionTick, v();
  });
  function _(f) {
    const w = Math.round(Date.now() / 1e3 - f);
    return w < 45 ? "just now" : w < 3600 ? `${Math.round(w / 60)} min ago` : w < 86400 ? `${Math.round(w / 3600)} h ago` : new Date(f * 1e3).toLocaleString(void 0, { dateStyle: "medium", timeStyle: "short" });
  }
  function S(f) {
    const w = (f.types || []).map((j) => {
      var he;
      return j === "global" ? "Global" : ((he = n().defFor(j)) == null ? void 0 : he.title) || j;
    });
    return w.length > 4 ? w.slice(0, 4).join(" · ") + ` · +${w.length - 4}` : w.join(" · ");
  }
  async function g(f, w) {
    if (await e.askConfirm({
      title: "Restore this version?",
      message: `Loads the version from ${_(f.time)} into the editor. You can undo it, and nothing is saved until you click ${n().isSection ? "Save section" : "Update"}.`,
      choices: [
        { label: "Cancel", value: !1 },
        { label: "Restore", value: !0, primary: !0 }
      ]
    })) {
      m(o, f.id, !0);
      try {
        const he = await Xe.revision(n().context, f.id);
        n().insertMany(he.blocks || [], null, !0), n().busy = "Restoring version…", n().flash(w === 0 ? "Restored the last saved version" : `Restored version from ${_(f.time)}. Click ${n().isSection ? "Save section" : "Update"} to keep it.`);
      } catch (he) {
        n().flash(he.message);
      }
      m(o, "");
    }
  }
  var p = vh(), b = Te(p), M = h(b), k = $(M), C = d(M, 2), O = h(C);
  K(O, { name: "refresh", size: 13 });
  var D = d(b, 2);
  {
    var G = (f) => {
      var w = lh(), j = $(w, !0);
      z(() => F(j, s(l))), y(f, w);
    };
    B(D, (f) => {
      s(l) && f(G);
    });
  }
  var R = d(D, 2);
  {
    var V = (f) => {
      var w = oh();
      y(f, w);
    };
    B(R, (f) => {
      s(i) && !s(a).length && f(V);
    });
  }
  var I = d(R, 2);
  qe(
    I,
    23,
    () => s(a),
    (f) => f.id,
    (f, w, j) => {
      var he = uh();
      let ie;
      var ce = d(h(he), 2), A = h(ce), N = h(A), ee = $(N, !0), Z = d(N, 2);
      {
        var te = (ue) => {
          var de = ch(), le = $(de, !0);
          z((ke) => F(le, ke), [() => _(s(w).time)]), y(ue, de);
        };
        B(Z, (ue) => {
          s(j) === 0 && ue(te);
        });
      }
      var Se = d(A, 2), ye = $(Se), oe = d(Se, 2), me = $(oe, !0), De = d(oe, 2), W = h(De), Y = h(W);
      K(Y, { name: "layers", size: 12 });
      var ge = d(W, 2), fe = h(ge);
      K(fe, { name: "history", size: 12 });
      var ae = d(fe);
      z(
        (ue, de) => {
          ie = Le(he, 1, "svelte-19n2gxs", null, ie, { latest: s(j) === 0 }), F(ee, ue), F(ye, `${s(w).count ?? ""} ${s(w).count === 1 ? "block" : "blocks"}${s(w).user ? ` · ${s(w).user}` : ""}${s(w).label ? ` · ${s(w).label}` : ""}`), F(me, de), ge.disabled = s(o) === s(w).id || n().readOnly, F(ae, ` ${s(o) === s(w).id ? "Restoring…" : "Restore"}`);
        },
        [
          () => s(j) === 0 ? "Last saved" : _(s(w).time),
          () => S(s(w))
        ]
      ), P("click", W, () => m(r, s(w).id, !0)), P("click", ge, () => g(s(w), s(j))), y(f, he);
    },
    (f) => {
      var w = Ct(), j = Te(w);
      {
        var he = (ie) => {
          var ce = dh();
          y(ie, ce);
        };
        B(j, (ie) => {
          !s(i) && !s(l) && ie(he);
        });
      }
      y(f, w);
    }
  );
  var T = d(I, 2);
  {
    var L = (f) => {
      const w = /* @__PURE__ */ se(() => s(a).findIndex((ce) => ce.id === s(r)));
      var j = Ct(), he = Te(j);
      {
        var ie = (ce) => {
          {
            let A = /* @__PURE__ */ se(() => s(a)[s(w) + 1] || null);
            ih(ce, {
              get store() {
                return n();
              },
              when: _,
              get rev() {
                return s(a)[s(w)];
              },
              get previous() {
                return s(A);
              },
              onclose: () => m(r, ""),
              onrestore: (N) => {
                m(r, ""), g(N, s(w));
              }
            });
          }
        };
        B(he, (ce) => {
          s(w) >= 0 && ce(ie);
        });
      }
      y(f, j);
    };
    B(T, (f) => {
      s(r) && f(L);
    });
  }
  z(() => F(k, `Every save keeps a version${n().isSection ? " of this global section" : ""}. Restore any of them. You can undo, and nothing is saved until you choose to.`)), P("click", C, v), y(t, p), ct();
}
ht(["click"]);
var hh = /* @__PURE__ */ x('<button type="button"><!></button>'), ph = /* @__PURE__ */ x("<span> </span>"), gh = /* @__PURE__ */ x('<span class="avatar more svelte-1nqlp8n"> </span>'), bh = /* @__PURE__ */ x('<div class="avatars svelte-1nqlp8n" role="group" aria-label="Also open"><!> <!></div> <div class="sep svelte-1nqlp8n"></div>', 1), mh = /* @__PURE__ */ x('<span class="mini-spin svelte-1nqlp8n"></span> Saving…', 1), _h = /* @__PURE__ */ x("<!> Update", 1), yh = /* @__PURE__ */ x('<button type="button" class="mb-btn"><!> Save as pattern</button> <button type="button" class="mb-btn primary" title="Save page (Ctrl+S)"><!></button>', 1), kh = /* @__PURE__ */ x('<button type="button" class="mb-btn"><!> Back to page</button> <button type="button" class="mb-btn primary global-save svelte-1nqlp8n" title="Save global section (Ctrl+S)"><!> </button>', 1), wh = /* @__PURE__ */ x(`<div class="section-banner svelte-1nqlp8n" role="status"><!> <span class="svelte-1nqlp8n">Editing global section <strong> </strong>. Changes apply everywhere it's used<!>.</span> <button type="button" class="link svelte-1nqlp8n">Back to page</button></div>`), xh = /* @__PURE__ */ x("<strong> </strong> ", 1), Sh = /* @__PURE__ */ x('<div class="notice lock-notice svelte-1nqlp8n" role="status"><!> <span class="svelte-1nqlp8n"><!></span> <button type="button" class="link svelte-1nqlp8n"> </button></div>'), Eh = /* @__PURE__ */ x('<div class="notice lock-notice svelte-1nqlp8n" role="alert"><!> <span class="svelte-1nqlp8n"><strong> </strong> </span> <button type="button" class="link svelte-1nqlp8n">OK</button></div>'), Mh = /* @__PURE__ */ x('<div class="notice stale-notice svelte-1nqlp8n" role="alert"><!> <span class="svelte-1nqlp8n"> </span> <button type="button" class="link svelte-1nqlp8n">Load latest</button> <button type="button" class="link svelte-1nqlp8n">Keep mine</button></div>'), Th = /* @__PURE__ */ x('<div class="notice error-notice svelte-1nqlp8n" role="alert"><!> <span class="svelte-1nqlp8n"> </span> <button type="button" class="link svelte-1nqlp8n">Try again</button> <button type="button" class="link svelte-1nqlp8n">Dismiss</button></div>'), Ah = /* @__PURE__ */ x('<div class="notice recovery-notice svelte-1nqlp8n" role="status"><!> <span class="svelte-1nqlp8n"> </span> <button type="button" class="link svelte-1nqlp8n">Restore</button> <button type="button" class="link svelte-1nqlp8n">Discard</button></div>'), Ch = /* @__PURE__ */ x('<p class="error svelte-1nqlp8n"> </p>'), Oh = /* @__PURE__ */ x('<p class="muted svelte-1nqlp8n">Loading blocks…</p>'), Ph = /* @__PURE__ */ x('<button type="button" class="edge-tab left svelte-1nqlp8n" title="Show left panel"><!></button>'), zh = /* @__PURE__ */ x('<button type="button" class="edge-tab right svelte-1nqlp8n" title="Show settings panel"><!></button>'), Dh = /* @__PURE__ */ x('<button type="button" class="mb-btn svelte-1nqlp8n">Cancel</button> <button type="button" class="mb-btn primary svelte-1nqlp8n">Save pattern</button>', 1), Nh = /* @__PURE__ */ x("<option> </option>"), Lh = /* @__PURE__ */ x('<label class="mb-label" for="mb-pattern-title">Name</label> <input id="mb-pattern-title" class="mb-input" placeholder="e.g. Services intro"/> <div class="grid2 svelte-1nqlp8n"><div><span class="mb-label">Contains</span> <select class="mb-input"><!><option> </option></select></div> <div><span class="mb-label">Type</span> <select class="mb-input"><option>Section</option><option>Full page layout</option></select></div></div>', 1), Rh = /* @__PURE__ */ x('<button type="button"> </button>'), Ih = /* @__PURE__ */ x("<p> </p>"), jh = /* @__PURE__ */ x('<div><header class="top svelte-1nqlp8n"><div class="left svelte-1nqlp8n"><button type="button" class="mb-btn ghost icon" title="Close builder (Esc)"><!></button> <div class="brand svelte-1nqlp8n"><span class="logo svelte-1nqlp8n"><!></span> <div><div class="page svelte-1nqlp8n"> </div> <div class="route svelte-1nqlp8n"> </div></div></div> <div class="sep svelte-1nqlp8n"></div> <button type="button" class="mb-btn ghost icon" title="Undo (Ctrl+Z)"><!></button> <button type="button" class="mb-btn ghost icon" title="Redo (Ctrl+Shift+Z)"><!></button> <div class="sep svelte-1nqlp8n"></div> <button type="button"><!></button></div> <div class="devices svelte-1nqlp8n" role="group" aria-label="Preview width"></div> <div class="right svelte-1nqlp8n"><!> <button type="button" class="mb-btn ghost icon" title="Copy selected blocks (Ctrl+C)"><!></button> <button type="button" class="mb-btn ghost icon" title="Paste blocks (Ctrl+V)"><!></button> <button type="button" class="mb-btn ghost icon" title="Refresh preview"><!></button> <!> <div class="sep svelte-1nqlp8n"></div> <button type="button"><!></button></div></header> <!> <!> <!> <!> <div><aside><div class="mb-tabs tabs svelte-1nqlp8n" role="group" aria-label="Panel"><button type="button"><!> Blocks</button> <button type="button"><!> Patterns</button> <button type="button"><!> Outline</button> <button type="button" title="Saved versions"><!> History</button></div> <div class="panel-body mb-scroll svelte-1nqlp8n"><!></div></aside> <main class="canvas-wrap svelte-1nqlp8n"><!> <!> <!></main> <aside><div class="resize-handle svelte-1nqlp8n" role="separator" aria-orientation="vertical" aria-label="Resize settings panel" tabindex="0" title="Drag to resize · double-click to reset"></div> <div class="inspector-wrap svelte-1nqlp8n"><!></div></aside></div> <!> <div role="status" aria-live="polite"> </div> <!></div>');
function qh(t, e) {
  ot(e, !0);
  let n = Ye(e, "store", 7), r = /* @__PURE__ */ q(
    "blocks"
    // blocks | patterns | outline | history
  ), a = /* @__PURE__ */ q(
    "desktop"
    // desktop | tablet | mobile
  ), i = /* @__PURE__ */ q(
    null
    // {kind, ...}
  ), l = /* @__PURE__ */ q(void 0);
  const o = /Mac|iPhone|iPad/.test(navigator.platform);
  ps(() => {
    n().load();
    const E = (Ce) => _(Ce), U = () => m(r, "blocks"), ne = (Ce) => {
      var He;
      if (!n().open || s(i) || n().modal || n().imagePick || v(Ce)) return;
      const Pe = ((He = Ce.clipboardData) == null ? void 0 : He.getData("text/plain")) || "";
      n().pasteBlocks(Pe).then((Ge) => {
        Ge || n().flash("The clipboard has no blocks. Copy blocks in a builder first.");
      }), Ce.preventDefault();
    }, Me = (Ce) => {
      !s(i) && !n().imagePick && n().pasteBlocks(Ce.detail).then((Pe) => {
        Pe || n().flash("The clipboard has no blocks.");
      });
    }, Oe = () => n().refreshClipboard();
    return window.addEventListener("keydown", E, !0), document.addEventListener("paste", ne, !0), document.addEventListener("maw-paste-text", Me), document.addEventListener("maw-open-inserter", U), window.addEventListener("storage", Oe), window.addEventListener("focus", Oe), () => {
      window.removeEventListener("keydown", E, !0), document.removeEventListener("paste", ne, !0), document.removeEventListener("maw-paste-text", Me), document.removeEventListener("maw-open-inserter", U), window.removeEventListener("storage", Oe), window.removeEventListener("focus", Oe);
    };
  });
  const u = /* @__PURE__ */ se(() => n().presence);
  function v(E) {
    const U = E.composedPath()[0];
    return U && (U.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(U.tagName));
  }
  function _(E) {
    var Oe, Ce;
    if (!n().open) return;
    const U = o ? E.metaKey : E.ctrlKey, ne = E.key.toLowerCase();
    if (U && ne === "s") {
      E.preventDefault(), E.stopPropagation(), n().isSection ? p() : S();
      return;
    }
    if (U && ne === "z" && !v(E)) {
      E.preventDefault(), E.stopPropagation(), E.shiftKey ? n().redo() : n().undo();
      return;
    }
    if (U && ne === "y" && !v(E)) {
      E.preventDefault(), E.stopPropagation(), n().redo();
      return;
    }
    if (U && E.code === "Backslash") {
      E.preventDefault(), E.stopPropagation(), E.altKey ? m(f, !s(f)) : m(L, !s(L));
      return;
    }
    if (n().imagePick) {
      ne === "escape" && (n().imagePick = null, E.stopPropagation());
      return;
    }
    if (s(i)) {
      ne === "escape" && ((Ce = (Oe = s(i)).resolve) == null || Ce.call(Oe, null), m(i, null), E.stopPropagation());
      return;
    }
    if (n().modal) {
      ne === "escape" && (n().modal.close(), E.stopPropagation());
      return;
    }
    if (v(E)) return;
    if (ne === "escape") {
      E.stopPropagation(), n().selection.length > 1 ? n().select(n().selected) : n().selected >= 0 ? n().select(-1) : M();
      return;
    }
    if (U && ne === "a") {
      E.preventDefault(), E.stopPropagation(), n().selectAll();
      return;
    }
    if (n().selected < 0) return;
    const Me = n().selection;
    ne === "delete" || ne === "backspace" ? (E.preventDefault(), E.stopPropagation(), n().removeMany(Me)) : U && ne === "d" ? (E.preventDefault(), E.stopPropagation(), n().duplicateMany(Me)) : U && ne === "c" ? (E.preventDefault(), E.stopPropagation(), n().copyBlocks(Me)) : U && ne === "x" ? (E.preventDefault(), E.stopPropagation(), n().cutBlocks(Me)) : E.altKey && ne === "arrowup" ? (E.preventDefault(), n().moveSelection(-1)) : E.altKey && ne === "arrowdown" && (E.preventDefault(), n().moveSelection(1));
  }
  async function S() {
    var ne;
    if (n().isSection) return p();
    if (n().readOnly || n().saving) return;
    const E = n().snapshot(), U = n().dirty;
    if (window.dispatchEvent(new CustomEvent("grav:editor:save")), !U) {
      setTimeout(() => n().refreshBase(), 2500);
      return;
    }
    await n().confirmSaved(E) && ((ne = s(u)) == null || ne.acknowledgeStale(), n().flash("Saved"));
  }
  async function g() {
    var U;
    if (n().isSection) {
      await n().reloadSection(), (U = s(u)) == null || U.acknowledgeStale();
      return;
    }
    await O({
      title: "Load the latest version?",
      message: "The admin page reloads with the saved version. Your unsaved changes on this page are discarded.",
      choices: [
        { label: "Cancel", value: !1 },
        { label: "Reload page", value: !0, primary: !0 }
      ]
    }) && (n().clearBackup(), n().dirty = !1, location.reload());
  }
  async function p() {
    if (!n().readOnly) {
      try {
        await n().saveSection();
      } catch (E) {
        if (E.status !== 409)
          return n().flash(E.message), !1;
        const U = await O({
          title: "Global section changed meanwhile",
          message: `${E.message} Overwrite their changes with yours, or load their version (your edits are discarded)?`,
          choices: [
            { label: "Cancel", value: null },
            { label: "Load their version", value: "reload" },
            { label: "Overwrite", value: "force", primary: !0 }
          ]
        });
        try {
          if (U === "force") await n().saveSection(!0);
          else return U === "reload" && await n().reloadSection(), !1;
        } catch (ne) {
          return n().flash(ne.message), !1;
        }
      }
      return !0;
    }
  }
  async function b() {
    var E;
    if (n().sectionDirty) {
      const U = await O({
        title: "Unsaved global section changes",
        message: `Save changes to “${(E = n().editingSection) == null ? void 0 : E.title}” before going back to the page?`,
        choices: [
          { label: "Cancel", value: null },
          { label: "Discard", value: "discard" },
          { label: "Save & go back", value: "save", primary: !0 }
        ]
      });
      if (!U || U === "save" && !await p()) return;
      U === "discard" && n().clearBackup();
    }
    n().closeSection();
  }
  function M() {
    if (n().isSection) return b();
    e.close();
  }
  function k() {
    n().selected < 0 && !n().blocks.length || m(
      i,
      {
        kind: "pattern",
        title: "",
        category: "section",
        scope: n().selected >= 0 ? "selected" : "all",
        indexes: [...n().selection]
      },
      !0
    );
  }
  async function C() {
    const E = s(i);
    if (!E.title.trim()) return;
    const U = E.scope === "selected" ? E.indexes : n().blocks.map((ne, Me) => Me);
    try {
      await n().savePattern(E.title.trim(), E.category, U), n().flash(`Pattern “${E.title.trim()}” saved`), m(i, null), m(r, "patterns");
    } catch (ne) {
      n().flash(ne.message);
    }
  }
  function O(E) {
    return new Promise((U) => {
      m(i, { kind: "confirm", ...E, resolve: U }, !0);
    });
  }
  const D = "maw-builder:layout", G = 280, R = 640, V = 340, I = 300, T = (() => {
    try {
      return JSON.parse(localStorage.getItem(D) || "{}");
    } catch {
      return {};
    }
  })();
  let L = /* @__PURE__ */ q(et(T.leftOpen ?? !0)), f = /* @__PURE__ */ q(et(T.rightOpen ?? !0)), w = /* @__PURE__ */ q(et(Math.min(R, Math.max(G, Number(T.rightWidth) || V)))), j = /* @__PURE__ */ q(!1);
  _t(() => {
    const E = {
      leftOpen: s(L),
      rightOpen: s(f),
      rightWidth: s(w)
    };
    try {
      localStorage.setItem(D, JSON.stringify(E));
    } catch {
    }
  });
  const he = /* @__PURE__ */ se(() => `${s(L) ? I : 0}px minmax(0, 1fr) ${s(f) ? s(w) : 0}px`);
  function ie(E) {
    if (E.button !== 0) return;
    E.preventDefault();
    const U = E.currentTarget;
    try {
      U.setPointerCapture(E.pointerId);
    } catch {
    }
    const ne = E.clientX, Me = s(w), Oe = Math.min(R, Math.round(window.innerWidth * 0.5));
    m(j, !0);
    const Ce = (He) => {
      m(w, Math.min(Oe, Math.max(G, Me + (ne - He.clientX))), !0);
    }, Pe = () => {
      m(j, !1), window.removeEventListener("pointermove", Ce, !0), window.removeEventListener("pointerup", Pe, !0), window.removeEventListener("pointercancel", Pe, !0);
    };
    window.addEventListener("pointermove", Ce, !0), window.addEventListener("pointerup", Pe, !0), window.addEventListener("pointercancel", Pe, !0);
  }
  function ce(E) {
    const U = E.shiftKey ? 60 : 20;
    E.key === "ArrowLeft" ? (E.preventDefault(), m(w, Math.min(R, s(w) + U), !0)) : E.key === "ArrowRight" && (E.preventDefault(), m(w, Math.max(G, s(w) - U), !0));
  }
  const A = /* @__PURE__ */ se(() => {
    var E, U, ne, Me;
    return {
      desktop: null,
      tablet: ((U = (E = n().catalog) == null ? void 0 : E.devices) == null ? void 0 : U.tablet) || 820,
      mobile: ((Me = (ne = n().catalog) == null ? void 0 : ne.devices) == null ? void 0 : Me.mobile) || 390
    };
  });
  var N = jh();
  let ee;
  var Z = h(N), te = h(Z), Se = h(te), ye = h(Se);
  K(ye, { name: "x" });
  var oe = d(Se, 2), me = h(oe), De = h(me);
  K(De, { name: "blocks", size: 15 });
  var W = d(me, 2), Y = h(W), ge = $(Y, !0), fe = d(Y, 2), ae = $(fe, !0), ue = d(oe, 4), de = h(ue);
  K(de, { name: "undo" });
  var le = d(ue, 2), ke = h(le);
  K(ke, { name: "redo" });
  var Ne = d(le, 4);
  let Re;
  var Ke = h(Ne);
  K(Ke, { name: "panel-left", size: 16 });
  var xe = d(te, 2);
  qe(
    xe,
    20,
    () => [
      ["desktop", "monitor", "Desktop"],
      ["tablet", "tablet", "Tablet"],
      ["mobile", "phone", "Mobile"]
    ],
    wt,
    (E, U) => {
      var ne = /* @__PURE__ */ se(() => Ha(U, 3));
      let Me = () => s(ne)[0], Oe = () => s(ne)[1], Ce = () => s(ne)[2];
      var Pe = hh();
      let He;
      var Ge = h(Pe);
      K(Ge, {
        get name() {
          return Oe();
        },
        size: 15
      }), z(() => {
        ve(Pe, "title", Ce()), ve(Pe, "aria-pressed", s(a) === Me()), He = Le(Pe, 1, "svelte-1nqlp8n", null, He, { active: s(a) === Me() });
      }), P("click", Pe, () => m(a, Me(), !0)), y(E, Pe);
    }
  );
  var we = d(xe, 2), Ae = h(we);
  {
    var Ee = (E) => {
      var U = bh(), ne = Te(U), Me = h(ne);
      qe(Me, 17, () => s(u).others.slice(0, 4), (Pe) => Pe.session, (Pe, He) => {
        const Ge = /* @__PURE__ */ se(() => As(s(He)));
        var it = ph();
        let $e, zt;
        var _s = $(it, !0);
        z(() => {
          $e = Le(it, 1, "avatar svelte-1nqlp8n", null, $e, { editing: s(He).editing }), ve(it, "title", `${s(Ge).name ?? ""} ${s(He).editing ? "is editing" : "has this open"}`), zt = At(it, "", zt, { background: s(Ge).color }), F(_s, s(Ge).initials);
        }), y(Pe, it);
      });
      var Oe = d(Me, 2);
      {
        var Ce = (Pe) => {
          var He = gh(), Ge = $(He);
          z(() => F(Ge, `+${s(u).others.length - 4}`)), y(Pe, He);
        };
        B(Oe, (Pe) => {
          s(u).others.length > 4 && Pe(Ce);
        });
      }
      y(E, U);
    };
    B(Ae, (E) => {
      var U;
      (U = s(u)) != null && U.others.length && E(Ee);
    });
  }
  var ze = d(Ae, 2), Je = h(ze);
  K(Je, { name: "copy", size: 15 });
  var at = d(ze, 2), ut = h(at);
  K(ut, { name: "clipboard", size: 15 });
  var Be = d(at, 2), Xt = h(Be);
  K(Xt, { name: "refresh", size: 15 });
  var mn = d(Be, 2);
  {
    var dt = (E) => {
      var U = yh(), ne = Te(U), Me = h(ne);
      K(Me, { name: "template", size: 15 });
      var Oe = d(ne, 2), Ce = h(Oe);
      {
        var Pe = (Ge) => {
          var it = mh();
          y(Ge, it);
        }, He = (Ge) => {
          var it = _h(), $e = Te(it);
          K($e, { name: "save", size: 15 }), y(Ge, it);
        };
        B(Ce, (Ge) => {
          n().saving ? Ge(Pe) : Ge(He, -1);
        });
      }
      z(() => {
        ne.disabled = !n().blocks.length, Oe.disabled = n().saving || n().readOnly;
      }), P("click", ne, k), P("click", Oe, S), y(E, U);
    }, Q = (E) => {
      var U = kh(), ne = Te(U), Me = h(ne);
      K(Me, { name: "back", size: 15 });
      var Oe = d(ne, 2), Ce = h(Oe);
      K(Ce, { name: "globe", size: 15 });
      var Pe = d(Ce);
      z(() => {
        Oe.disabled = !n().sectionDirty, F(Pe, ` ${n().sectionDirty ? "Save section" : "Saved"}`);
      }), P("click", ne, b), P("click", Oe, p), y(E, U);
    };
    B(mn, (E) => {
      n().isSection ? E(Q, -1) : E(dt);
    });
  }
  var X = d(mn, 4);
  let be;
  var J = h(X);
  K(J, { name: "panel-right", size: 16 });
  var Ie = d(Z, 2);
  {
    var Ue = (E) => {
      var U = wh(), ne = h(U);
      K(ne, { name: "globe", size: 16 });
      var Me = d(ne, 2), Oe = d(h(Me)), Ce = $(Oe, !0), Pe = d(Oe, 2);
      {
        var He = (it) => {
          var $e = nn();
          z(() => F($e, `(${n().editingSection.usage.length ?? ""} ${n().editingSection.usage.length === 1 ? "place" : "places"})`)), y(it, $e);
        };
        B(Pe, (it) => {
          var $e, zt;
          (zt = ($e = n().editingSection) == null ? void 0 : $e.usage) != null && zt.length && it(He);
        });
      }
      var Ge = d(Me, 2);
      z(() => {
        var it;
        return F(Ce, (it = n().editingSection) == null ? void 0 : it.title);
      }), P("click", Ge, b), y(E, U);
    };
    B(Ie, (E) => {
      n().isSection && E(Ue);
    });
  }
  var Qe = d(Ie, 2);
  {
    var St = (E) => {
      const U = /* @__PURE__ */ se(() => {
        var $e;
        return (($e = s(u)) == null ? void 0 : $e.editors) || [];
      });
      var ne = Sh(), Me = h(ne);
      K(Me, { name: "lock", size: 15 });
      var Oe = d(Me, 2), Ce = h(Oe);
      {
        var Pe = ($e) => {
          var zt = xh(), _s = Te(zt), Xa = $(_s, !0), er = d(_s);
          z(
            (Kn) => {
              F(Xa, Kn), F(er, ` ${s(U).length === 1 ? "is" : "are"} editing this ${n().isSection ? "global section" : "page"}. You're viewing read-only so you don't overwrite each other.`);
            },
            [() => s(U).map((Kn) => As(Kn).name).join(", ")]
          ), y($e, zt);
        }, He = ($e) => {
          var zt = nn("The other editor has left. You can edit now.");
          y($e, zt);
        };
        B(Ce, ($e) => {
          s(U).length ? $e(Pe) : $e(He, -1);
        });
      }
      var Ge = d(Oe, 2), it = $(Ge, !0);
      z(() => F(it, s(U).length ? "Edit anyway" : "Start editing")), P("click", Ge, () => {
        var $e;
        return ($e = s(u)) == null ? void 0 : $e.editAnyway();
      }), y(E, ne);
    }, Et = (E) => {
      var U = Eh(), ne = h(U);
      K(ne, { name: "users", size: 15 });
      var Me = d(ne, 2), Oe = h(Me), Ce = $(Oe, !0), Pe = d(Oe), He = d(Me, 2);
      z(
        (Ge) => {
          F(Ce, Ge), F(Pe, ` started editing this ${n().isSection ? "global section" : "page"} too. Coordinate before saving, or one of you will overwrite the other.`);
        },
        [() => As(s(u).joined).name]
      ), P("click", He, () => s(u).joined = null), y(E, U);
    };
    B(Qe, (E) => {
      var U;
      n().readOnly ? E(St) : (U = s(u)) != null && U.joined && E(Et, 1);
    });
  }
  var Pt = d(Qe, 2);
  {
    var zn = (E) => {
      var U = Mh(), ne = h(U);
      K(ne, { name: "history", size: 15 });
      var Me = d(ne, 2), Oe = $(Me), Ce = d(Me, 2), Pe = d(Ce, 2);
      z(
        (He) => F(Oe, `${s(u).stale.by ? `${s(u).stale.by} saved` : "A newer version was saved"} at ${He ?? ""}, after you opened this. Saving now would replace their changes.`),
        [
          () => new Date(s(u).stale.modified * 1e3).toLocaleTimeString(void 0, { timeStyle: "short" })
        ]
      ), P("click", Ce, g), P("click", Pe, () => s(u).acknowledgeStale()), y(E, U);
    };
    B(Pt, (E) => {
      var U;
      (U = s(u)) != null && U.stale && !n().saving && E(zn);
    });
  }
  var gs = d(Pt, 2);
  {
    var Qs = (E) => {
      var U = Th(), ne = h(U);
      K(ne, { name: "x", size: 15 });
      var Me = d(ne, 2), Oe = $(Me, !0), Ce = d(Me, 2), Pe = d(Ce, 2);
      z(() => F(Oe, n().saveError)), P("click", Ce, S), P("click", Pe, () => n().saveError = ""), y(E, U);
    }, $s = (E) => {
      var U = Ah(), ne = h(U);
      K(ne, { name: "history", size: 15 });
      var Me = d(ne, 2), Oe = $(Me), Ce = d(Me, 2), Pe = d(Ce, 2);
      z((He) => F(Oe, `Unsaved changes from ${He ?? ""} were found in this browser.`), [
        () => new Date(n().recovery.time).toLocaleString(void 0, { dateStyle: "medium", timeStyle: "short" })
      ]), P("click", Ce, () => n().restoreRecovery()), P("click", Pe, () => n().clearBackup()), y(E, U);
    };
    B(gs, (E) => {
      n().saveError ? E(Qs) : n().recovery && E($s, 1);
    });
  }
  var Dn = d(gs, 2);
  let We, nt;
  var pt = h(Dn);
  let Nn;
  var Un = h(pt), bs = h(Un), ca = h(bs);
  K(ca, { name: "plus", size: 14 });
  var ms = d(bs, 2), Ya = h(ms);
  K(Ya, { name: "template", size: 14 });
  var ua = d(ms, 2), Ho = h(ua);
  K(Ho, { name: "layers", size: 14 });
  var Ja = d(ua, 2), Ko = h(Ja);
  K(Ko, { name: "history", size: 14 });
  var Go = d(Un, 2), Vo = h(Go);
  {
    var Yo = (E) => {
      var U = Ch(), ne = $(U, !0);
      z(() => F(ne, n().loadError)), y(E, U);
    }, Jo = (E) => {
      var U = Oh();
      y(E, U);
    }, Wo = (E) => {
      Ad(E, {
        get store() {
          return n();
        }
      });
    }, Xo = (E) => {
      qd(E, {
        get store() {
          return n();
        },
        askConfirm: O
      });
    }, Zo = (E) => {
      Vd(E, {
        get store() {
          return n();
        }
      });
    }, Qo = (E) => {
      fh(E, {
        get store() {
          return n();
        },
        askConfirm: O
      });
    };
    B(Vo, (E) => {
      n().loadError ? E(Yo) : n().catalog ? s(r) === "blocks" ? E(Wo, 2) : s(r) === "patterns" ? E(Xo, 3) : s(r) === "outline" ? E(Zo, 4) : E(Qo, -1) : E(Jo, 1);
    });
  }
  var Wi = d(pt, 2), Xi = h(Wi);
  On(
    uv(Xi, {
      get store() {
        return n();
      },
      get width() {
        return s(A)[s(a)];
      }
    }),
    (E) => m(l, E, !0),
    () => s(l)
  );
  var Zi = d(Xi, 2);
  {
    var $o = (E) => {
      var U = Ph(), ne = h(U);
      K(ne, { name: "chevron", size: 14 }), P("click", U, () => m(L, !0)), y(E, U);
    };
    B(Zi, (E) => {
      s(L) || E($o);
    });
  }
  var ec = d(Zi, 2);
  {
    var tc = (E) => {
      var U = zh(), ne = h(U);
      K(ne, { name: "chevron", size: 14 }), P("click", U, () => m(f, !0)), y(E, U);
    };
    B(ec, (E) => {
      s(f) || E(tc);
    });
  }
  var da = d(Wi, 2);
  let Qi;
  var Hn = h(da);
  ve(Hn, "aria-valuemin", G), ve(Hn, "aria-valuemax", R);
  var $i = d(Hn, 2), nc = h($i);
  Ff(nc, {
    get store() {
      return n();
    },
    askConfirm: O,
    savePattern: k
  });
  var el = d(Dn, 2);
  {
    var sc = (E) => {
      {
        let U = /* @__PURE__ */ se(() => n().getPath(n().imagePick.index, n().imagePick.path) || "");
        jo(E, {
          get store() {
            return n();
          },
          get current() {
            return s(U);
          },
          onselect: (ne) => n().replaceImage(ne),
          onclose: () => n().imagePick = null
        });
      }
    };
    B(el, (E) => {
      n().imagePick && E(sc);
    });
  }
  var Wa = d(el, 2);
  let tl;
  var rc = $(Wa, !0), ac = d(Wa, 2);
  {
    var ic = (E) => {
      Na(E, {
        title: "Save as pattern",
        onclose: () => m(i, null),
        actions: (ne) => {
          var Me = Dh(), Oe = Te(Me), Ce = d(Oe, 2);
          z((Pe) => Ce.disabled = Pe, [() => !s(i).title.trim()]), P("click", Oe, () => m(i, null)), P("click", Ce, C), y(ne, Me);
        },
        children: (ne, Me) => {
          var Oe = Lh(), Ce = d(Te(Oe), 2);
          Xl(Ce);
          var Pe = d(Ce, 2), He = h(Pe), Ge = d(h(He), 2), it = h(Ge);
          {
            var $e = (Zt) => {
              var va = Nh(), oc = $(va, !0);
              va.value = va.__value = "selected", z(() => F(oc, s(i).indexes.length > 1 ? `Selected blocks (${s(i).indexes.length})` : "Selected block only")), y(Zt, va);
            };
            B(it, (Zt) => {
              n().selected >= 0 && Zt($e);
            });
          }
          var zt = d(it), _s = $(zt);
          zt.value = zt.__value = "all", pr(Ge);
          var Xa = d(He, 2), er = d(h(Xa), 2), Kn = h(er);
          Kn.value = Kn.__value = "section";
          var nl = d(Kn);
          nl.value = nl.__value = "page", pr(er), z(() => F(_s, `All ${n().blocks.length ?? ""} blocks on this page`)), P("keydown", Ce, (Zt) => Zt.key === "Enter" && C()), bn(Ce, () => s(i).title, (Zt) => s(i).title = Zt), yl(Ge, () => s(i).scope, (Zt) => s(i).scope = Zt), yl(er, () => s(i).category, (Zt) => s(i).category = Zt), y(ne, Oe);
        },
        $$slots: { actions: !0, default: !0 }
      });
    }, lc = (E) => {
      Na(E, {
        get title() {
          return s(i).title;
        },
        onclose: () => {
          s(i).resolve(null), m(i, null);
        },
        actions: (ne) => {
          var Me = Ct(), Oe = Te(Me);
          qe(Oe, 17, () => s(i).choices, wt, (Ce, Pe) => {
            var He = Rh(), Ge = $(He, !0);
            z(() => {
              Le(He, 1, `mb-btn ${s(Pe).primary ? "primary" : ""}`, "svelte-1nqlp8n"), F(Ge, s(Pe).label);
            }), P("click", He, () => {
              s(i).resolve(s(Pe).value), m(i, null);
            }), y(Ce, He);
          }), y(ne, Me);
        },
        children: (ne, Me) => {
          var Oe = Ih(), Ce = $(Oe, !0);
          z(() => F(Ce, s(i).message)), y(ne, Oe);
        },
        $$slots: { actions: !0, default: !0 }
      });
    };
    B(ac, (E) => {
      var U, ne;
      ((U = s(i)) == null ? void 0 : U.kind) === "pattern" ? E(ic) : ((ne = s(i)) == null ? void 0 : ne.kind) === "confirm" && E(lc, 1);
    });
  }
  z(
    (E) => {
      ee = Le(N, 1, "builder svelte-1nqlp8n", null, ee, { "section-mode": n().isSection }), F(ge, E), F(ae, n().isSection ? "Global section" : n().isFlex ? `Flex · ${n().context.type}` : n().route), ue.disabled = !n().canUndo, le.disabled = !n().canRedo, Re = Le(Ne, 1, "mb-btn ghost icon svelte-1nqlp8n", null, Re, { on: s(L) }), ve(Ne, "title", s(L) ? "Hide left panel (Ctrl+)" : "Show left panel (Ctrl+)"), ve(Ne, "aria-pressed", s(L)), ze.disabled = n().selected < 0, at.disabled = !n().clipboardAvailable || n().readOnly, be = Le(X, 1, "mb-btn ghost icon svelte-1nqlp8n", null, be, { on: s(f) }), ve(X, "title", s(f) ? "Hide settings panel (Ctrl+Alt+)" : "Show settings panel (Ctrl+Alt+)"), ve(X, "aria-pressed", s(f)), We = Le(Dn, 1, "body svelte-1nqlp8n", null, We, { resizing: s(j) }), nt = At(Dn, "", nt, { "grid-template-columns": s(he) }), Nn = Le(pt, 1, "panel left-panel svelte-1nqlp8n", null, Nn, { collapsed: !s(L) }), pt.inert = !s(L), ve(pt, "aria-hidden", !s(L)), ve(bs, "aria-pressed", s(r) === "blocks"), ve(ms, "aria-pressed", s(r) === "patterns"), ve(ua, "aria-pressed", s(r) === "outline"), ve(Ja, "aria-pressed", s(r) === "history"), Qi = Le(da, 1, "panel right-panel svelte-1nqlp8n", null, Qi, { collapsed: !s(f) }), da.inert = !s(f), ve(da, "aria-hidden", !s(f)), ve(Hn, "aria-valuenow", s(w)), $i.inert = n().readOnly, tl = Le(Wa, 1, "toast svelte-1nqlp8n", null, tl, { on: !!n().toast }), F(rc, n().toast);
    },
    [
      () => {
        var E;
        return n().isSection ? (E = n().editingSection) == null ? void 0 : E.title : document.title.replace(/\s*[—|-]\s*Grav Admin.*$/, "") || "Page";
      }
    ]
  ), P("click", Se, M), P("click", ue, () => n().undo()), P("click", le, () => n().redo()), P("click", Ne, () => m(L, !s(L))), P("click", ze, () => n().copyBlocks()), P("click", at, () => n().pasteBlocks()), P("click", Be, () => {
    var E;
    return (E = s(l)) == null ? void 0 : E.refresh();
  }), P("click", X, () => m(f, !s(f))), P("click", bs, () => m(r, "blocks")), P("click", ms, () => m(r, "patterns")), P("click", ua, () => m(r, "outline")), P("click", Ja, () => m(r, "history")), P("pointerdown", Hn, ie), P("dblclick", Hn, () => m(w, V)), P("keydown", Hn, ce), y(t, N), ct();
}
ht(["click", "pointerdown", "dblclick", "keydown"]);
const oi = "maw-builder:clipboard", Mi = "maw-blocks", qo = 1, Fh = ["filepicker", "media", "file"], Bh = /\.(jpe?g|png|gif|webp|avif|svg|mp4|webm|pdf)$/i;
function Uh(t, { source: e = null, theme: n = "" } = {}) {
  return { [Mi]: qo, theme: n, source: e, copied: Date.now(), blocks: JSON.parse(JSON.stringify(t)) };
}
function Pl(t, { knownType: e = () => !0, inSection: n = !1 } = {}) {
  if (typeof t != "string" || !t.includes(Mi)) return null;
  let r;
  try {
    r = JSON.parse(t);
  } catch {
    return null;
  }
  if (!r || r[Mi] !== qo || !Array.isArray(r.blocks)) return null;
  const a = [], i = [];
  for (const l of r.blocks)
    !l || typeof l != "object" || typeof l.type != "string" || (!e(l.type) || n && l.type === "global" ? i.push(l.type) : a.push(l));
  return { blocks: a, skipped: i, source: r.source && typeof r.source == "object" ? r.source : null, theme: String(r.theme || "") };
}
const Hh = (t) => typeof t == "string" && Bh.test(t) && !/[/\\:]/.test(t);
function Kh(t, e) {
  var a;
  const n = /* @__PURE__ */ new Set(), r = (i, l) => {
    if (!(!l || typeof l != "object"))
      for (const o of i || []) {
        const u = l[o.name];
        o.type === "list" && Array.isArray(u) ? u.forEach((v) => r(o.fields, v)) : Fh.includes(o.type) && (Array.isArray(u) ? u : [u]).forEach((v) => Hh(v) && n.add(v));
      }
  };
  for (const i of t) r((a = e(i.type)) == null ? void 0 : a.fields, i[i.type]);
  return [...n];
}
function Gh(t, e) {
  return !t || !e || t.context !== e.context ? !1 : t.context === "page" ? String(t.route).replace(/\/$/, "") === String(e.route).replace(/\/$/, "") : t.context === "flex" ? t.type === e.type && t.key === e.key : t.id === e.id;
}
const Vh = 60, Yh = 700, Jh = 1e4, Gn = {
  get(t) {
    try {
      return JSON.parse(localStorage.getItem(t) || "null");
    } catch {
      return null;
    }
  },
  set(t, e) {
    try {
      localStorage.setItem(t, JSON.stringify(e));
    } catch {
    }
  },
  remove(t) {
    try {
      localStorage.removeItem(t);
    } catch {
    }
  }
};
var Ar, Cr, Or, Pr, zr, Dr, Nr, Lr, Rr, Ir, jr, Ft, tn, Fs, ss, qr, Fr, Br, Ur, Hr, Kr, Gr, Vr, Yr, Jr, Bs, Wr, Xr, Zr, Qr, $r, un, ea, Us, tt, Fo, Ti, Ai, ws, or, ta, Ma;
class Wh {
  constructor({ context: e, fieldName: n, onChange: r }) {
    H(this, tt);
    H(this, Ar, /* @__PURE__ */ q(et([])));
    H(this, Cr, /* @__PURE__ */ q(-1));
    H(this, Or, /* @__PURE__ */ q(null));
    H(this, Pr, /* @__PURE__ */ q(et([])));
    H(this, zr, /* @__PURE__ */ q(""));
    H(this, Dr, /* @__PURE__ */ q(!1));
    H(this, Nr, /* @__PURE__ */ q(!1));
    H(this, Lr, /* @__PURE__ */ q(""));
    H(this, Rr, /* @__PURE__ */ q(""));
    H(this, Ir, /* @__PURE__ */ q(""));
    H(this, jr, /* @__PURE__ */ q(null));
    H(this, Ft, []);
    H(this, tn, []);
    H(this, Fs, 0);
    H(this, ss, !1);
    H(this, qr, /* @__PURE__ */ q(!1));
    H(this, Fr, /* @__PURE__ */ q(!1));
    H(this, Br, /* @__PURE__ */ q(null));
    H(this, Ur, /* @__PURE__ */ q(et({})));
    H(this, Hr, /* @__PURE__ */ q(et({ kind: "unknown" })));
    H(this, Kr, /* @__PURE__ */ q(et([])));
    H(this, Gr, /* @__PURE__ */ q(null));
    H(this, Vr, /* @__PURE__ */ q(!1));
    H(this, Yr, /* @__PURE__ */ q(!1));
    H(this, Jr, /* @__PURE__ */ q(0));
    vt(this, "renderedPayload", "");
    H(this, Bs, null);
    H(this, Wr, /* @__PURE__ */ q(!1));
    H(this, Xr, /* @__PURE__ */ q(""));
    H(this, Zr, /* @__PURE__ */ q(null));
    vt(this, "baseModified", 0);
    H(this, Qr, /* @__PURE__ */ q(!1));
    vt(this, "presence", null);
    H(this, $r, /* @__PURE__ */ q(et([])));
    H(this, un, -1);
    H(this, ea, /* @__PURE__ */ q(!1));
    vt(this, "modal", null);
    H(this, Us, 0);
    /** After the next preview render, start inline editing this field: {index, path}. */
    vt(this, "pendingFocus", null);
    H(
      this,
      ta,
      /** Image clicked on the canvas: {index, path} while the media library is open for it. */
      /* @__PURE__ */ q(null)
    );
    this.context = e, this.fieldName = n, this.onChange = r;
  }
  get blocks() {
    return s(c(this, Ar));
  }
  set blocks(e) {
    m(c(this, Ar), e, !0);
  }
  get selected() {
    return s(c(this, Cr));
  }
  set selected(e) {
    m(c(this, Cr), e, !0);
  }
  get catalog() {
    return s(c(this, Or));
  }
  set catalog(e) {
    m(c(this, Or), e, !0);
  }
  get patterns() {
    return s(c(this, Pr));
  }
  set patterns(e) {
    m(c(this, Pr), e, !0);
  }
  get loadError() {
    return s(c(this, zr));
  }
  set loadError(e) {
    m(c(this, zr), e, !0);
  }
  get open() {
    return s(c(this, Dr));
  }
  set open(e) {
    m(c(this, Dr), e, !0);
  }
  get dirty() {
    return s(c(this, Nr));
  }
  set dirty(e) {
    m(c(this, Nr), e, !0);
  }
  get toast() {
    return s(c(this, Lr));
  }
  set toast(e) {
    m(c(this, Lr), e, !0);
  }
  get dragType() {
    return s(c(this, Rr));
  }
  set dragType(e) {
    m(c(this, Rr), e, !0);
  }
  get busy() {
    return s(c(this, Ir));
  }
  set busy(e) {
    m(c(this, Ir), e, !0);
  }
  get pendingInsert() {
    return s(c(this, jr));
  }
  set pendingInsert(e) {
    m(c(this, jr), e, !0);
  }
  get canUndo() {
    return s(c(this, qr));
  }
  set canUndo(e) {
    m(c(this, qr), e, !0);
  }
  get canRedo() {
    return s(c(this, Fr));
  }
  set canRedo(e) {
    m(c(this, Fr), e, !0);
  }
  get palette() {
    return s(c(this, Br));
  }
  set palette(e) {
    m(c(this, Br), e, !0);
  }
  get mediaUrls() {
    return s(c(this, Ur));
  }
  set mediaUrls(e) {
    m(c(this, Ur), e, !0);
  }
  get context() {
    return s(c(this, Hr));
  }
  set context(e) {
    m(c(this, Hr), e, !0);
  }
  get sections() {
    return s(c(this, Kr));
  }
  set sections(e) {
    m(c(this, Kr), e, !0);
  }
  get editingSection() {
    return s(c(this, Gr));
  }
  set editingSection(e) {
    m(c(this, Gr), e, !0);
  }
  get sectionDirty() {
    return s(c(this, Vr));
  }
  set sectionDirty(e) {
    m(c(this, Vr), e, !0);
  }
  get inlineEditing() {
    return s(c(this, Yr));
  }
  set inlineEditing(e) {
    m(c(this, Yr), e, !0);
  }
  get revisionTick() {
    return s(c(this, Jr));
  }
  set revisionTick(e) {
    m(c(this, Jr), e, !0);
  }
  get saving() {
    return s(c(this, Wr));
  }
  set saving(e) {
    m(c(this, Wr), e, !0);
  }
  get saveError() {
    return s(c(this, Xr));
  }
  set saveError(e) {
    m(c(this, Xr), e, !0);
  }
  get recovery() {
    return s(c(this, Zr));
  }
  set recovery(e) {
    m(c(this, Zr), e, !0);
  }
  get readOnly() {
    return s(c(this, Qr));
  }
  set readOnly(e) {
    m(c(this, Qr), e, !0);
  }
  get multi() {
    return s(c(this, $r));
  }
  set multi(e) {
    m(c(this, $r), e, !0);
  }
  get clipboardAvailable() {
    return s(c(this, ea));
  }
  set clipboardAvailable(e) {
    m(c(this, ea), e, !0);
  }
  get route() {
    return this.context.kind === "page" ? this.context.route : null;
  }
  get isFlex() {
    return this.context.kind === "flex";
  }
  get isSection() {
    return this.context.kind === "section";
  }
  /** The builder needs something saved to preview against: a page route, an existing Flex object, or a section. */
  get canPreview() {
    return this.context.kind === "page" ? !!this.route : this.context.kind === "flex" ? !!this.context.key : this.context.kind === "section";
  }
  get settingKeys() {
    var e;
    return ((e = this.catalog) == null ? void 0 : e.settingKeys) || Oo;
  }
  /** Stable id of what's being edited: page:/about · flex:case-studies/acme · section:footer-cta */
  get ownerKey() {
    const e = this.context;
    return e.kind === "page" ? `page:${e.route}` : e.kind === "flex" ? `flex:${e.type}/${e.key}` : e.kind === "section" ? `section:${e.id}` : "";
  }
  get backupKey() {
    return this.ownerKey ? `maw-builder:draft:${this.ownerKey}:${this.isSection ? "blocks" : this.fieldName}` : "";
  }
  clearBackup() {
    clearTimeout(c(this, Us)), this.backupKey && Gn.remove(this.backupKey), this.recovery = null;
  }
  /** Offer a backup that differs from what's loaded and was written after the last server save. */
  async checkRecovery() {
    const e = this.backupKey, n = e && Gn.get(e);
    if (!this.canPreview) return;
    try {
      const a = await Xe.state(this.context, this.fieldName);
      this.baseModified = (a == null ? void 0 : a.modified) || 0;
    } catch {
    }
    if (!n || !Array.isArray(n.blocks)) return;
    if (JSON.stringify(_n(n.blocks, this.settingKeys)) === JSON.stringify(this.snapshot()) || n.time <= this.baseModified * 1e3) {
      Gn.remove(e);
      return;
    }
    this.recovery = { blocks: n.blocks, time: n.time };
  }
  restoreRecovery() {
    const e = this.recovery;
    this.recovery = null, e && this.insertMany(e.blocks, null, !0);
  }
  /** Take the server's current `modified` as the base (nothing unsaved of ours is at stake). */
  async refreshBase() {
    try {
      const e = await Xe.state(this.context, this.fieldName);
      e != null && e.modified && (this.baseModified = e.modified);
    } catch {
    }
  }
  // ─── selection ───────────────────────────────────────────
  /** Selected block indexes (one or many), sorted. */
  get selection() {
    return this.selected < 0 ? [] : this.multi.length > 1 && this.multi.includes(this.selected) ? this.multi : [this.selected];
  }
  select(e) {
    this.selected = e, this.multi = e >= 0 ? [e] : [], re(this, un, e);
  }
  toggleSelect(e) {
    if (e < 0) return;
    const n = this.selection;
    if (n.includes(e)) {
      const r = n.filter((a) => a !== e);
      if (!r.length) return this.select(-1);
      this.multi = r, this.selected = r.at(-1);
    } else
      this.multi = [...n, e].sort((r, a) => r - a), this.selected = e;
    re(this, un, e);
  }
  rangeSelect(e) {
    if (e < 0) return;
    const n = c(this, un) >= 0 && c(this, un) < this.blocks.length ? c(this, un) : this.selected >= 0 ? this.selected : e, [r, a] = n < e ? [n, e] : [e, n];
    this.multi = Array.from({ length: a - r + 1 }, (i, l) => r + l), this.selected = e;
  }
  selectAll() {
    this.blocks.length && (this.multi = this.blocks.map((e, n) => n), this.selected = this.blocks.length - 1, re(this, un, 0));
  }
  // ─── group operations ────────────────────────────────────
  removeMany(e) {
    const n = [...new Set(e)].filter((r) => r >= 0 && r < this.blocks.length).sort((r, a) => a - r);
    if (n.length) {
      if (n.length === 1) return this.remove(n[0]);
      this.mutate((r) => n.forEach((a) => r.splice(a, 1)), `Removing ${n.length} blocks…`), this.select(Math.min(n.at(-1), this.blocks.length - 1)), this.flash(`${n.length} blocks removed. Ctrl+Z to undo.`);
    }
  }
  duplicateMany(e) {
    const n = [...new Set(e)].sort((i, l) => i - l);
    if (n.length <= 1) return n.length && this.duplicate(n[0]);
    const r = n.map((i) => Sl(Vn(this.blocks[i]))), a = n.at(-1) + 1;
    this.mutate((i) => i.splice(a, 0, ...r), `Duplicating ${r.length} blocks…`), pe(this, tt, Ti).call(this, a, r.length);
  }
  /** Move the current selection up (-1) or down (+1). */
  moveSelection(e) {
    const n = this.selection;
    if (n.length <= 1) return this.move(this.selected, this.selected + e);
    if (n[0] + e < 0 || n.at(-1) + e >= this.blocks.length) return;
    let r = n;
    this.mutate(
      (a) => {
        r = pv(a, n, e);
      },
      `Moving ${n.length} blocks…`
    ), this.multi = r, this.selected = r.at(-1);
  }
  // ─── copy / paste ────────────────────────────────────────
  refreshClipboard() {
    this.clipboardAvailable = !!Gn.get(oi);
  }
  /** Copy blocks to the system clipboard (JSON) and this browser's storage (for the Paste button). */
  async copyBlocks(e = this.selection) {
    var a, i;
    const n = [...e].sort((l, o) => l - o).map((l) => this.snapshot()[l]).filter(Boolean);
    if (!n.length) return !1;
    const r = Uh(n, {
      source: yn(this.context),
      theme: ((a = this.catalog) == null ? void 0 : a.theme) || ""
    });
    Gn.set(oi, r), this.clipboardAvailable = !0;
    try {
      await ((i = navigator.clipboard) == null ? void 0 : i.writeText(JSON.stringify(r)));
    } catch {
    }
    return this.flash(n.length === 1 ? "Block copied" : `${n.length} blocks copied`), !0;
  }
  async cutBlocks(e = this.selection) {
    this.readOnly || await this.copyBlocks(e) && this.removeMany(e);
  }
  /**
   * Paste blocks from clipboard text (or this browser's stored copy when text is empty/foreign).
   * Blocks from another page / object bring their media along; global sections can't hold page media.
   */
  async pasteBlocks(e = "") {
    var v;
    if (this.readOnly)
      return this.mutate(() => {
      }), !0;
    const n = {
      knownType: (_) => !!this.defFor(_),
      inSection: this.isSection
    }, r = Gn.get(oi), a = Pl(e, n) || (r ? Pl(JSON.stringify(r), n) : null);
    if (!a) return !1;
    if (!a.blocks.length)
      return this.flash(a.skipped.length ? `Nothing to paste: ${a.skipped.join(", ")} can't be used here.` : "Nothing to paste."), !0;
    const i = [];
    a.skipped.length && i.push(`skipped ${a.skipped.length} (${[...new Set(a.skipped)].join(", ")})`);
    const l = Kh(a.blocks, (_) => this.defFor(_));
    if (l.length && a.source && !Gh(a.source, yn(this.context)))
      if (this.isSection)
        i.push(`${l.length} image${l.length === 1 ? "" : "s"} must be re-picked from the site library`);
      else {
        this.busy = "Copying images…";
        try {
          const _ = await Xe.copyMedia(a.source, this.context, l);
          (v = _ == null ? void 0 : _.copied) != null && v.length && (i.push(`${_.copied.length} image${_.copied.length === 1 ? "" : "s"} copied`), await this.loadOwnMedia());
          const S = [...(_ == null ? void 0 : _.missing) || [], ...(_ == null ? void 0 : _.refused) || []];
          S.length && i.push(`${S.length} image${S.length === 1 ? "" : "s"} not found`);
        } catch (_) {
          i.push(`images not copied (${_.message})`);
        }
      }
    const o = this.selection.length ? this.selection.at(-1) + 1 : this.blocks.length, u = a.blocks.length;
    return this.insertMany(a.blocks, o), pe(this, tt, Ti).call(this, o, u), this.flash(`Pasted ${u} block${u === 1 ? "" : "s"}${i.length ? ": " + i.join(", ") : ""}`), !0;
  }
  // ─── save confirmation ───────────────────────────────────
  /**
   * After Admin2's save was triggered: poll until the server has exactly these blocks, or give up.
   * A failed validation or an expired session never writes the file, so a timeout means "not saved".
   */
  async confirmSaved(e) {
    this.saving = !0, this.saveError = "";
    const n = Date.now() + Jh;
    try {
      for (; Date.now() < n; ) {
        await new Promise((r) => setTimeout(r, Yh));
        try {
          const r = await Xe.state(this.context, this.fieldName, e);
          if (r != null && r.matches)
            return this.baseModified = r.modified || this.baseModified, JSON.stringify(this.snapshot()) === JSON.stringify(e) && (this.dirty = !1, this.clearBackup()), this.revisionTick++, !0;
        } catch (r) {
          if (r.status === 401)
            return this.saveError = "Your admin session has expired, so this save could not be confirmed. Sign in again in another tab, then click Try again: your edits are still here.", !1;
          if (r.status === 403)
            return this.saveError = "You don't have permission to edit this page. Ask an administrator, or copy your blocks (Ctrl+C) to keep them.", !1;
        }
      }
      return this.saveError = "The page wasn't saved. Check the admin message (a required field may be missing), then try again.", !1;
    } finally {
      this.saving = !1;
    }
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
      const e = await Xe.ownMedia(this.context), n = Array.isArray(e) ? e : (e == null ? void 0 : e.items) || (e == null ? void 0 : e.files) || [];
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
        const [e, n, r] = await Promise.all([
          Xe.blocks(),
          Xe.patterns().catch(() => []),
          Xe.sections().catch(() => [])
        ]);
        this.catalog = e, this.patterns = n || [], this.sections = r || [], this.blocks = _n(Vn(this.blocks), this.settingKeys), this.canPreview && this.loadOwnMedia(), this.checkRecovery();
      } catch (e) {
        this.loadError = e.message || String(e);
      }
    })(), this.loading);
  }
  /**
   * Value pushed in by Admin2. Ignored if it's the value we just emitted. Until the catalogue is loaded the setting
   * keys are unknown, so a flat block is kept as written rather than guessed at; load() normalises again.
   */
  setValue(e) {
    const n = _n(e, this.catalog ? this.settingKeys : null);
    JSON.stringify(n) !== JSON.stringify(Vn(this.blocks)) && (this.blocks = n, this.selected >= n.length && (this.selected = n.length - 1));
  }
  snapshot() {
    return Vn(this.blocks);
  }
  // ─── inline editing ──────────────────────────────────────
  /** Read a content field by path ("items.2.answer") from block[index]. */
  getPath(e, n) {
    return Tl(this.blocks[e], n);
  }
  /**
   * Markdown edited on the canvas. Unlike plain text, the rendered result can differ from what was typed
   * (lists, links…), so the preview re-renders to show exactly what will be saved.
   */
  inlineSetMarkdown(e, n, r, a = "Updating text…") {
    (this.getPath(e, n) ?? "") !== r && (this.inlineSet(e, n, r), this.renderedPayload = "", this.busy = a);
  }
  /**
   * Repeater actions from the canvas.
   * op: add (at end) | duplicate | remove | move (item → to)
   */
  listOp({ index: e, path: n, op: r, item: a, to: i, label: l = "item" }) {
    var S;
    const o = this.blocks[e];
    if (!o || this.readOnly) return;
    const u = Io((S = this.defFor(o.type)) == null ? void 0 : S.fields, n), v = l || "item", _ = v.charAt(0).toUpperCase() + v.slice(1);
    if (this.selected = e, r === "add") {
      const g = No(u, v), p = ((u == null ? void 0 : u.fields) || []).find(sd) || ((u == null ? void 0 : u.fields) || []).find(gr);
      let b = 0;
      this.mutate(
        () => {
          b = Fn.add(pa(o, n), g);
        },
        `Adding ${v}…`
      ), p && (this.pendingFocus = { index: e, path: `${n}.${b}.${p.name}` });
    } else r === "duplicate" ? this.mutate(() => Fn.duplicate(pa(o, n), a), `Duplicating ${v}…`) : r === "remove" ? (this.mutate(() => Fn.remove(pa(o, n), a), `Removing ${v}…`), this.flash(`${_} removed. Ctrl+Z to undo.`)) : r === "move" && this.mutate(() => Fn.move(pa(o, n), a, i), `Moving ${v}…`);
  }
  get imagePick() {
    return s(c(this, ta));
  }
  set imagePick(e) {
    m(c(this, ta), e, !0);
  }
  replaceImage(e) {
    const n = this.imagePick;
    this.imagePick = null, !(!n || !e) && (this.selected = n.index, this.inlineSetMarkdown(n.index, n.path, e, "Replacing image…"));
  }
  inlineSet(e, n, r) {
    const a = this.blocks[e];
    !a || typeof n != "string" || this.readOnly || (Tl(a, n) ?? "") !== r && (this.beginEdit(), fv(a, n, r), this.busy = "", this.renderedPayload = JSON.stringify(this.snapshot()), this.endEdit());
  }
  // ─── global sections ─────────────────────────────────────
  sectionTitle(e) {
    var n;
    return ((n = this.sections.find((r) => r.id === e)) == null ? void 0 : n.title) || e || "Global section";
  }
  async refreshSections() {
    this.sections = await Xe.sections().catch(() => this.sections) || [];
  }
  /** Insert a reference to an existing global section. */
  insertGlobal(e, n = null) {
    const r = n ?? (this.selected >= 0 ? this.selected + 1 : this.blocks.length);
    this.pendingInsert = { index: r, title: this.sectionTitle(e) }, this.mutate((a) => a.splice(r, 0, { type: "global", global: { section: e } }), `Adding ${this.sectionTitle(e)}…`), this.selected = r;
  }
  /** Turn blocks into a new global section and replace them with one reference. */
  async makeGlobal(e, n) {
    const r = [...e].sort((o, u) => o - u), a = r.map((o) => this.snapshot()[o]).filter((o) => o && o.type !== "global");
    if (!a.length) throw new Error("Pick at least one regular block.");
    const i = await Xe.createSection(n, a);
    await this.refreshSections();
    const l = r[0];
    return this.mutate(
      (o) => {
        for (const u of [...r].reverse()) o.splice(u, 1);
        o.splice(l, 0, { type: "global", global: { section: i.id } });
      },
      "Creating global section…"
    ), this.selected = l, i;
  }
  /** Replace a global reference with editable copies of its blocks (the section itself is untouched). */
  async detachGlobal(e) {
    var l;
    const n = this.blocks[e], r = (l = n == null ? void 0 : n.global) == null ? void 0 : l.section;
    if (!r) return;
    const a = await Xe.section(r), i = _n(JSON.parse(JSON.stringify(a.blocks || [])), this.settingKeys);
    this.mutate((o) => o.splice(e, 1, ...i), "Detaching section…"), this.selected = e;
  }
  /** Open a global section in the builder. The page's blocks, selection and undo history are restored on close. */
  async openSection(e) {
    this.isSection && await this.closeSection();
    const n = await Xe.section(e);
    re(this, Bs, {
      context: Vn(this.context),
      blocks: this.snapshot(),
      selected: this.selected,
      past: c(this, Ft),
      future: c(this, tn)
    }), re(this, Ft, []), re(this, tn, []), pe(this, tt, ws).call(this), this.renderedPayload = "", this.context = { kind: "section", id: e }, this.editingSection = {
      id: e,
      title: n.title,
      usage: n.usage || [],
      rev: n.rev
    }, this.blocks = _n(n.blocks || [], this.settingKeys), this.selected = -1, this.sectionDirty = !1, this.busy = `Opening ${n.title}…`, this.checkRecovery();
  }
  /** Throw away local section edits and load what's saved now (after a conflict). */
  async reloadSection() {
    if (!this.isSection) return;
    const e = this.context.id, n = await Xe.section(e);
    this.clearBackup(), this.renderedPayload = "", this.editingSection = {
      id: e,
      title: n.title,
      usage: n.usage || [],
      rev: n.rev
    }, this.blocks = _n(n.blocks || [], this.settingKeys), this.sectionDirty = !1, this.busy = "Loading latest version…";
  }
  closeSection() {
    const e = c(this, Bs);
    e && (re(this, Bs, null), this.renderedPayload = "", this.context = e.context, this.editingSection = null, this.sectionDirty = !1, this.blocks = e.blocks, this.selected = e.selected, re(this, Ft, e.past), re(this, tn, e.future), this.recovery = null, pe(this, tt, ws).call(this), this.busy = "Back to page…");
  }
  /** Save the open global section. Throws an Error with status 409 when someone else saved it first (retry with force). */
  async saveSection(e = !1) {
    var r;
    if (!this.isSection) return;
    const n = await Xe.updateSection(this.context.id, { blocks: this.snapshot(), base_rev: (r = this.editingSection) == null ? void 0 : r.rev }, e);
    this.sectionDirty = !1, this.clearBackup(), this.editingSection = { ...this.editingSection, title: n.title, rev: n.rev }, await this.refreshSections(), this.revisionTick++, this.flash(`Global section “${n.title}” saved. It updates everywhere it's used.`);
  }
  /** Structural change: record history immediately. */
  mutate(e, n = "Updating page…") {
    if (this.readOnly) {
      this.flash("Read-only: someone else is editing. Click “Edit anyway” to make changes.");
      return;
    }
    this.busy = n, pe(this, tt, Ma).call(this), pe(this, tt, Ai).call(this), this.multi = [], e(this.blocks), pe(this, tt, or).call(this);
  }
  /** Field edits: one history entry per burst of typing. Call BEFORE applying the change. */
  beginEdit() {
    this.busy = "Updating preview…", c(this, ss) || (pe(this, tt, Ai).call(this), re(this, ss, !0)), clearTimeout(c(this, Fs)), re(this, Fs, setTimeout(() => re(this, ss, !1), 700));
  }
  endEdit() {
    pe(this, tt, or).call(this);
  }
  undo() {
    pe(this, tt, Ma).call(this), c(this, Ft).length && (this.busy = "Undoing…", c(this, tn).push(JSON.stringify(this.snapshot())), this.blocks = JSON.parse(c(this, Ft).pop()), this.multi = [], this.selected >= this.blocks.length && (this.selected = this.blocks.length - 1), pe(this, tt, ws).call(this), pe(this, tt, or).call(this));
  }
  redo() {
    pe(this, tt, Ma).call(this), c(this, tn).length && (this.busy = "Redoing…", c(this, Ft).push(JSON.stringify(this.snapshot())), this.blocks = JSON.parse(c(this, tn).pop()), this.multi = [], this.selected >= this.blocks.length && (this.selected = this.blocks.length - 1), pe(this, tt, ws).call(this), pe(this, tt, or).call(this));
  }
  // ─── operations ──────────────────────────────────────────
  insert(e, n = null) {
    const r = this.defFor(e);
    if (!r) return;
    const a = n ?? (this.selected >= 0 ? this.selected + 1 : this.blocks.length);
    this.pendingInsert = { index: a, title: r.title }, this.mutate((i) => i.splice(a, 0, xl(r)), `Adding ${r.title}…`), this.selected = a;
  }
  insertMany(e, n = null, r = !1) {
    var l;
    const a = _n(JSON.parse(JSON.stringify(e)), this.settingKeys);
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
    n && (this.mutate((r) => r.splice(e + 1, 0, Sl(Vn(n))), "Duplicating block…"), this.selected = e + 1);
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
        const l = xl(r);
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
    const a = [...r].sort((l, o) => l - o).map((l) => this.snapshot()[l]).filter(Boolean), i = await Xe.savePattern({ title: e, category: n, blocks: a });
    return this.patterns = [...this.patterns, i], i;
  }
  async deletePattern(e) {
    await Xe.deletePattern(e), this.patterns = this.patterns.filter((n) => n.id !== e);
  }
}
Ar = new WeakMap(), Cr = new WeakMap(), Or = new WeakMap(), Pr = new WeakMap(), zr = new WeakMap(), Dr = new WeakMap(), Nr = new WeakMap(), Lr = new WeakMap(), Rr = new WeakMap(), Ir = new WeakMap(), jr = new WeakMap(), Ft = new WeakMap(), tn = new WeakMap(), Fs = new WeakMap(), ss = new WeakMap(), qr = new WeakMap(), Fr = new WeakMap(), Br = new WeakMap(), Ur = new WeakMap(), Hr = new WeakMap(), Kr = new WeakMap(), Gr = new WeakMap(), Vr = new WeakMap(), Yr = new WeakMap(), Jr = new WeakMap(), Bs = new WeakMap(), Wr = new WeakMap(), Xr = new WeakMap(), Zr = new WeakMap(), Qr = new WeakMap(), $r = new WeakMap(), un = new WeakMap(), ea = new WeakMap(), Us = new WeakMap(), tt = new WeakSet(), // ─── local backup of unsaved edits ───────────────────────
Fo = function() {
  clearTimeout(c(this, Us));
  const e = this.backupKey;
  e && re(this, Us, setTimeout(() => Gn.set(e, { blocks: this.snapshot(), time: Date.now() }), 1e3));
}, /** Select a contiguous range after a structural change. */
Ti = function(e, n) {
  this.multi = Array.from({ length: n }, (r, a) => e + a), this.selected = n ? e + n - 1 : -1, re(this, un, e);
}, // ─── history ─────────────────────────────────────────────
Ai = function() {
  c(this, Ft).push(JSON.stringify(this.snapshot())), c(this, Ft).length > Vh && c(this, Ft).shift(), re(this, tn, []), pe(this, tt, ws).call(this);
}, ws = function() {
  this.canUndo = c(this, Ft).length > 0, this.canRedo = c(this, tn).length > 0;
}, or = function() {
  var e;
  if (pe(this, tt, Fo).call(this), this.isSection) {
    this.sectionDirty = !0;
    return;
  }
  this.dirty = !0, this.saveError = "", (e = this.onChange) == null || e.call(this, this.snapshot());
}, ta = new WeakMap(), Ma = function() {
  clearTimeout(c(this, Fs)), re(this, ss, !1);
};
const Xh = "__MAW_CSS__", zl = window.__GRAV_FIELD_TAG || "grav-maw-builder--blocks";
function Dl() {
  const t = document.createElement("style");
  return t.textContent = Xh, t;
}
var rs, qn, na, rt, as, En, Mn, Wt, Ci, Bo, Uo, Oi;
class Zh extends HTMLElement {
  constructor() {
    super(...arguments);
    H(this, Wt);
    H(this, rs, null);
    H(this, qn, []);
    H(this, na, null);
    H(this, rt, null);
    H(this, as, null);
    H(this, En, null);
    H(this, Mn, null);
  }
  set field(n) {
    re(this, rs, n), c(this, rt) && (c(this, rt).fieldName = pe(this, Wt, Ci).call(this));
  }
  get field() {
    return c(this, rs);
  }
  set value(n) {
    var a;
    JSON.stringify(n ?? []) !== c(this, na) && (re(this, qn, Array.isArray(n) ? n : []), (a = c(this, rt)) == null || a.setValue(c(this, qn)));
  }
  get value() {
    return c(this, qn);
  }
  connectedCallback() {
    if (c(this, rt)) return;
    const n = this.shadowRoot || this.attachShadow({ mode: "open" });
    n.appendChild(Dl()), re(this, rt, new Wh({
      context: id(),
      fieldName: pe(this, Wt, Ci).call(this),
      onChange: (a) => pe(this, Wt, Bo).call(this, a)
    })), c(this, rt).setValue(c(this, qn)), c(this, rt).load(), c(this, rt).presence = new vd(c(this, rt)), c(this, rt).presence.start();
    const r = document.createElement("div");
    n.appendChild(r), re(this, as, fl(xd, {
      target: r,
      props: { store: c(this, rt), field: c(this, rs), openBuilder: (a) => pe(this, Wt, Uo).call(this, a) }
    }));
  }
  disconnectedCallback() {
    queueMicrotask(() => {
      var n, r;
      this.isConnected || (pe(this, Wt, Oi).call(this), (r = (n = c(this, rt)) == null ? void 0 : n.presence) == null || r.stop(), c(this, as) && hl(c(this, as)), re(this, as, null), re(this, rt, null), this.shadowRoot && (this.shadowRoot.innerHTML = ""));
    });
  }
}
rs = new WeakMap(), qn = new WeakMap(), na = new WeakMap(), rt = new WeakMap(), as = new WeakMap(), En = new WeakMap(), Mn = new WeakMap(), Wt = new WeakSet(), Ci = function() {
  var r;
  return String(((r = c(this, rs)) == null ? void 0 : r.name) || "header.blocks").replace(/^header\./, "") === "blocks_after" ? "blocks_after" : "blocks";
}, Bo = function(n) {
  re(this, qn, n), re(this, na, JSON.stringify(n)), this.dispatchEvent(new CustomEvent("change", { detail: n, bubbles: !0 }));
}, /** The builder mounts on <body> so no admin layout (overflow, transforms) can clip the full-screen overlay. */
Uo = function(n = -1) {
  if (c(this, Mn)) return;
  const r = c(this, rt);
  r.select(n), r.open = !0, re(this, En, document.createElement("maw-builder-host")), c(this, En).style.cssText = "position:fixed;inset:0;z-index:2147483000;display:block;";
  const a = c(this, En).attachShadow({ mode: "open" });
  a.appendChild(Dl());
  const i = document.createElement("div");
  i.className = "maw-root", a.appendChild(i), document.body.appendChild(c(this, En)), document.documentElement.style.overflow = "hidden", re(this, Mn, fl(qh, {
    target: i,
    props: { store: r, close: () => pe(this, Wt, Oi).call(this) }
  })), (r.dirty ? Promise.resolve() : r.refreshBase()).then(() => {
    var l;
    return (l = r.presence) == null ? void 0 : l.claim();
  }), r.refreshClipboard();
}, Oi = function() {
  var r, a;
  const n = !!c(this, Mn);
  c(this, Mn) && hl(c(this, Mn)), re(this, Mn, null), (r = c(this, En)) == null || r.remove(), re(this, En, null), document.documentElement.style.overflow = "", c(this, rt) && (c(this, rt).open = !1, c(this, rt).isSection && c(this, rt).closeSection(), c(this, rt).select(-1), n && ((a = c(this, rt).presence) == null || a.leave()));
};
customElements.get(zl) || customElements.define(zl, Zh);
