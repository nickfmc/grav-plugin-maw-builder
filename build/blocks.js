var uc = Object.defineProperty;
var rl = (t) => {
  throw TypeError(t);
};
var dc = (t, e, n) => e in t ? uc(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var ft = (t, e, n) => dc(t, typeof e != "symbol" ? e + "" : e, n), Qi = (t, e, n) => e.has(t) || rl("Cannot " + n);
var c = (t, e, n) => (Qi(t, e, "read from private field"), n ? n.call(t) : e.get(t)), U = (t, e, n) => e.has(t) ? rl("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), se = (t, e, n, r) => (Qi(t, e, "write to private field"), r ? r.call(t, n) : e.set(t, n), n), ge = (t, e, n) => (Qi(t, e, "access private method"), n);
var ri = Array.isArray, vc = Array.prototype.indexOf, Ai = Array.prototype.includes, Hi = Array.from, Il = Object.defineProperty, ws = Object.getOwnPropertyDescriptor, fc = Object.getOwnPropertyDescriptors, jl = Object.prototype, hc = Array.prototype, Da = Object.getPrototypeOf, il = Object.isExtensible;
const ql = () => {
};
function pc(t) {
  for (var e = 0; e < t.length; e++)
    t[e]();
}
function Fl() {
  var t, e, n = new Promise((r, i) => {
    t = r, e = i;
  });
  return { promise: n, resolve: t, reject: e };
}
function Ki(t, e) {
  if (Array.isArray(t))
    return t;
  if (e === void 0 || !(Symbol.iterator in t))
    return Array.from(t);
  const n = [];
  for (const r of t)
    if (n.push(r), n.length === e) break;
  return n;
}
const yt = 2, Bs = 4, Gi = 8, Bl = 1 << 24, sn = 16, Wt = 32, On = 64, da = 128, Na = 256, Yt = 512, bt = 1024, mt = 2048, an = 4096, Ct = 8192, Nt = 16384, Js = 32768, Ci = 1 << 25, os = 65536, Oi = 1 << 17, gc = 1 << 18, Ys = 1 << 19, bc = 1 << 20, fn = 1 << 25, cs = 65536, Pi = 1 << 21, xs = 1 << 22, Bn = 1 << 23, is = Symbol("$state"), Ul = Symbol("component"), mc = Symbol("legacy props"), _c = Symbol(""), mi = Symbol("attributes"), va = Symbol("class"), fa = Symbol("style"), tr = Symbol("text"), _i = Symbol("form reset"), ii = new class extends Error {
  constructor() {
    super(...arguments);
    ft(this, "name", "StaleReactionError");
    ft(this, "message", "The reaction that called `getAbortSignal()` was re-run or destroyed");
  }
}();
var Nl;
const yc = (
  // We gotta write it like this because after downleveling the pure comment may end up in the wrong location
  !!((Nl = globalThis.document) != null && Nl.contentType) && /* @__PURE__ */ globalThis.document.contentType.includes("xml")
), kc = 1, wc = 2, Hl = 4, xc = 8, Sc = 16, Ec = 1, Mc = 4, Tc = 8, Ac = 16, Cc = 1, Oc = 2, gt = Symbol("uninitialized"), Pc = "http://www.w3.org/1999/xhtml";
function zc() {
  console.warn("https://svelte.dev/e/derived_inert");
}
function Dc() {
  console.warn("https://svelte.dev/e/select_multiple_invalid_value");
}
function Nc() {
  console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
function Kl(t) {
  return t === this.v;
}
function Lc(t, e) {
  return t != t ? e == e : t !== e || t !== null && typeof t == "object" || typeof t == "function";
}
function Gl(t) {
  return !Lc(t, this.v);
}
function Rc(t) {
  throw new Error("https://svelte.dev/e/lifecycle_outside_component");
}
function Ic() {
  throw new Error("https://svelte.dev/e/async_derived_orphan");
}
function jc(t, e, n) {
  throw new Error("https://svelte.dev/e/each_key_duplicate");
}
function qc(t) {
  throw new Error("https://svelte.dev/e/effect_in_teardown");
}
function Fc() {
  throw new Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function Bc(t) {
  throw new Error("https://svelte.dev/e/effect_orphan");
}
function Uc() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function Hc(t) {
  throw new Error("https://svelte.dev/e/props_invalid_value");
}
function Kc() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function Gc() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function Vc() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
function Jc() {
  throw new Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
const Yc = [];
function Vn(t, e = !1, n = !1) {
  return yi(t, /* @__PURE__ */ new Map(), "", Yc, null, n);
}
function yi(t, e, n, r, i = null, a = !1) {
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
    if (ri(t)) {
      var o = (
        /** @type {Snapshot<any>} */
        Array(t.length)
      );
      e.set(t, o), i !== null && e.set(i, o);
      for (var u = 0; u < t.length; u += 1) {
        var f = t[u];
        u in t && (o[u] = yi(f, e, n, r, null, a));
      }
      return o;
    }
    if (Da(t) === jl) {
      o = {}, e.set(t, o), i !== null && e.set(i, o);
      for (var _ of Object.keys(t))
        o[_] = yi(
          // @ts-expect-error
          t[_],
          e,
          n,
          r,
          null,
          a
        );
      return o;
    }
    if (t instanceof Date)
      return t.getTime(), /** @type {Snapshot<T>} */
      structuredClone(t);
    if (typeof /** @type {T & { toJSON?: any } } */
    t.toJSON == "function" && !a)
      return yi(
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
function Us(t) {
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
  return t !== void 0 && (e.x = t), e.i = !0, xt = e.p, La(t);
}
function La(t = {}) {
  return Il(t, Ul, { value: !0 }), t;
}
function Vl() {
  return !0;
}
let Jn = [];
function Jl() {
  var t = Jn;
  Jn = [], pc(t);
}
function hn(t) {
  if (Jn.length === 0 && !ur) {
    var e = Jn;
    queueMicrotask(() => {
      e === Jn && Jl();
    });
  }
  Jn.push(t);
}
function Wc() {
  for (; Jn.length > 0; )
    Jl();
}
const Xc = -7169;
function at(t, e) {
  t.f = t.f & Xc | e;
}
function Ra(t) {
  (t.f & Yt) !== 0 || t.deps === null ? at(t, bt) : at(t, an);
}
function Yl(t) {
  if (t !== null)
    for (const e of t)
      (e.f & yt) === 0 || (e.f & cs) === 0 || (e.f ^= cs, Yl(
        /** @type {Derived} */
        e.deps
      ));
}
function Wl(t, e, n) {
  (t.f & mt) !== 0 ? e.add(t) : (t.f & an) !== 0 && n.add(t), Yl(t.deps), at(t, bt);
}
let hi = !1;
function Zc(t) {
  var e = hi;
  try {
    return hi = !1, [t(), hi];
  } finally {
    hi = e;
  }
}
function Xl(t, e) {
  {
    const n = document.body;
    t.autofocus = !0, hn(() => {
      document.activeElement === n && t.focus();
    });
  }
}
let al = !1;
function Qc() {
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
            (e = n[_i]) == null || e.call(n);
      });
    },
    // In the capture phase to guarantee we get noticed of it (no possibility of stopPropagation)
    { capture: !0 }
  ));
}
function Ws(t) {
  var e = je, n = Fe;
  Xt(null), bn(null);
  try {
    return t();
  } finally {
    Xt(e), bn(n);
  }
}
function Ia(t, e, n, r = n) {
  t.addEventListener(e, () => Ws(n));
  const i = (
    /** @type {any} */
    t[_i]
  );
  i ? t[_i] = () => {
    i(), r(!0);
  } : t[_i] = () => r(!0), Qc();
}
function $c(t, e, n, r) {
  const i = vr;
  var a = t.filter((p) => !p.settled), l = e.map(i);
  if (n.length === 0 && a.length === 0) {
    r(l);
    return;
  }
  var o = (
    /** @type {Effect} */
    Fe
  ), u = eu(), f = a.length === 1 ? a[0].promise : a.length > 1 ? Promise.all(a.map((p) => p.promise)) : null;
  function _(p) {
    if ((o.f & Nt) === 0) {
      u();
      try {
        r([...l, ...p]);
      } catch (b) {
        vn(b, o);
      }
      zi();
    }
  }
  var S = Zl();
  if (n.length === 0) {
    f.then(() => _([])).finally(S);
    return;
  }
  function g() {
    Promise.all(n.map((p) => /* @__PURE__ */ tu(p))).then(_).catch((p) => vn(p, o)).finally(S);
  }
  f ? f.then(() => {
    u(), g(), zi();
  }) : g();
}
function eu() {
  var t = (
    /** @type {Effect} */
    Fe
  ), e = je, n = xt, r = (
    /** @type {Batch} */
    _e
  );
  return function(a = !0) {
    bn(t), Xt(e), Us(n), a && (t.f & Nt) === 0 && (r == null || r.activate(), r == null || r.apply());
  };
}
function zi(t = !0) {
  bn(null), Xt(null), Us(null), t && (_e == null || _e.deactivate());
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
  return Fe !== null && (Fe.f |= Ys), {
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
const nr = Symbol("obsolete");
// @__NO_SIDE_EFFECTS__
function tu(t, e, n) {
  let r = (
    /** @type {Effect | null} */
    Fe
  );
  r === null && Ic();
  var i = (
    /** @type {Promise<V>} */
    /** @type {unknown} */
    void 0
  ), a = ds(
    /** @type {V} */
    gt
  ), l = !je, o = /* @__PURE__ */ new Set();
  return bu(() => {
    var p, b;
    var u = (
      /** @type {Effect} */
      Fe
    ), f = Fl();
    i = f.promise;
    try {
      Promise.resolve(t()).then(f.resolve, (M) => {
        M !== ii && f.reject(M);
      }).finally(zi);
    } catch (M) {
      f.reject(M), zi();
    }
    var _ = (
      /** @type {Batch} */
      _e
    );
    if (l) {
      if ((u.f & Js) !== 0)
        var S = Zl();
      if (
        // boundary can be null if the async derived is inside an $effect.root not connected to the component render tree
        (p = r.b) != null && p.is_rendered()
      )
        (b = _.async_deriveds.get(u)) == null || b.reject(nr);
      else
        for (const M of o.values())
          M.reject(nr);
      o.add(f), _.async_deriveds.set(u, f);
    }
    const g = (M, k = void 0) => {
      S == null || S(), o.delete(f), k !== nr && (_.activate(), k ? (a.f |= Bn, Hs(a, k)) : ((a.f & Bn) !== 0 && (a.f ^= Bn), Hs(a, M)), _.deactivate());
    };
    f.promise.then(g, (M) => g(null, M || "unknown"));
  }), Ua(() => {
    for (const u of o)
      u.reject(nr);
  }), new Promise((u) => {
    function f(_) {
      function S() {
        _ === i ? u(a) : f(i);
      }
      _.then(S, S);
    }
    f(i);
  });
}
// @__NO_SIDE_EFFECTS__
function re(t) {
  const e = /* @__PURE__ */ vr(t);
  return _o(e), e;
}
// @__NO_SIDE_EFFECTS__
function Ql(t) {
  const e = /* @__PURE__ */ vr(t);
  return e.equals = Gl, e;
}
function nu(t) {
  var e = t.effects;
  if (e !== null) {
    t.effects = null;
    for (var n = 0; n < e.length; n += 1)
      Lt(
        /** @type {Effect} */
        e[n]
      );
  }
}
function ja(t) {
  var e, n = Fe, r = t.parent;
  if (!Pn && r !== null && t.v !== gt && // if it was never evaluated before, it's guaranteed to fail downstream, so we try to execute instead
  (r.f & (Nt | Ct)) !== 0)
    return zc(), t.v;
  bn(r);
  try {
    t.f &= ~cs, nu(t), e = xo(t);
  } finally {
    bn(n);
  }
  return e;
}
function $l(t) {
  var e = ja(t);
  if (!t.equals(e) && (t.wv = ko(), (!(_e != null && _e.is_fork) || t.deps === null) && (_e !== null ? (_e.capture(t, e, !0), cr == null || cr.capture(t, e, !0)) : t.v = e, t.deps === null))) {
    at(t, bt);
    return;
  }
  Pn || (kt !== null ? (Ba() || _e != null && _e.is_fork) && kt.set(t, e) : Ra(t));
}
function su(t) {
  var e;
  if (t.effects !== null)
    for (const n of t.effects)
      (n.teardown || n.ac) && ((e = n.teardown) == null || e.call(n), n.ac !== null && Ws(() => {
        n.ac.abort(ii), n.ac = null;
      }), n.fn !== null && (n.teardown = ql), fr(n, 0), Ka(n));
}
function eo(t) {
  if (t.effects !== null)
    for (const e of t.effects)
      e.teardown && e.fn !== null && Ks(e);
}
let $i = null, ms = null, _e = null, cr = null, kt = null, ha = null, ur = !1, ea = !1, ks = null, ki = null;
var ll = 0;
let ru = 1;
var Ts, Ln, Zn, As, Cs, Os, xn, Ps, Pt, br, Sn, $t, on, zs, Qn, Ve, pa, sr, ga, to, no, _s, iu, rr;
const ji = class ji {
  constructor() {
    U(this, Ve);
    ft(this, "id", ru++);
    /** True as soon as `#process` was called */
    U(this, Ts, !1);
    ft(this, "linked", !0);
    /** @type {Batch | null} */
    U(this, Ln, null);
    /** @type {Batch | null} */
    U(this, Zn, null);
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
    U(this, As, /* @__PURE__ */ new Set());
    /**
     * If a fork is discarded, we need to destroy any effects that are no longer needed
     * @type {Set<(batch: Batch) => void>}
     */
    U(this, Cs, /* @__PURE__ */ new Set());
    /**
     * The number of async effects that are currently in flight
     */
    U(this, Os, 0);
    /**
     * Async effects that are currently in flight, _not_ inside a pending boundary
     * @type {Map<Effect, number>}
     */
    U(this, xn, /* @__PURE__ */ new Map());
    /**
     * A deferred that resolves when the batch is committed, used with `settled()`
     * TODO replace with Promise.withResolvers once supported widely enough
     * @type {{ promise: Promise<void>, resolve: (value?: any) => void, reject: (reason: unknown) => void } | null}
     */
    U(this, Ps, null);
    /**
     * The root effects that need to be flushed
     * @type {Effect[]}
     */
    U(this, Pt, []);
    /**
     * Effects created while this batch was active.
     * @type {Effect[]}
     */
    U(this, br, []);
    /**
     * Deferred effects (which run after async work has completed) that are DIRTY
     * @type {Set<Effect>}
     */
    U(this, Sn, /* @__PURE__ */ new Set());
    /**
     * Deferred effects that are MAYBE_DIRTY
     * @type {Set<Effect>}
     */
    U(this, $t, /* @__PURE__ */ new Set());
    /**
     * A map of branches that still exist, but will be destroyed when this batch
     * is committed — we skip over these during `process`.
     * The value contains child effects that were dirty/maybe_dirty before being reset,
     * so they can be rescheduled if the branch survives.
     * @type {Map<Effect, { d: Effect[], m: Effect[] }>}
     */
    U(this, on, /* @__PURE__ */ new Map());
    /**
     * Inverse of #skipped_branches which we need to tell prior batches to unskip them when committing
     * @type {Set<Effect>}
     */
    U(this, zs, /* @__PURE__ */ new Set());
    ft(this, "is_fork", !1);
    U(this, Qn, !1);
    ms === null ? $i = ms = this : (se(ms, Zn, this), se(this, Ln, ms)), ms = this;
  }
  /**
   * Add an effect to the #skipped_branches map and reset its children
   * @param {Effect} effect
   */
  skip_effect(e) {
    c(this, on).has(e) || c(this, on).set(e, { d: [], m: [] }), c(this, zs).delete(e);
  }
  /**
   * Remove an effect from the #skipped_branches map and reschedule
   * any tracked dirty/maybe_dirty child effects
   * @param {Effect} effect
   * @param {(e: Effect) => void} callback
   */
  unskip_effect(e, n = (r) => this.schedule(r)) {
    var r = c(this, on).get(e);
    if (r) {
      c(this, on).delete(e);
      for (var i of r.d)
        at(i, mt), n(i);
      for (i of r.m)
        at(i, an), n(i);
    }
    c(this, zs).add(e);
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
      ea = !0, _e = this, ge(this, Ve, sr).call(this);
    } finally {
      ll = 0, ha = null, ks = null, ki = null, ea = !1, _e = null, kt = null, pn.clear();
    }
  }
  discard() {
    var e;
    for (const n of c(this, Cs)) n(this);
    c(this, Cs).clear();
    for (const n of this.async_deriveds.values())
      n.reject(nr);
    ge(this, Ve, rr).call(this), (e = c(this, Ps)) == null || e.resolve();
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
    if (se(this, Os, c(this, Os) + 1), e) {
      let r = c(this, xn).get(n) ?? 0;
      c(this, xn).set(n, r + 1);
    }
  }
  /**
   * @param {boolean} blocking
   * @param {Effect} effect
   */
  decrement(e, n) {
    if (se(this, Os, c(this, Os) - 1), e) {
      let r = c(this, xn).get(n) ?? 0;
      r === 1 ? c(this, xn).delete(n) : c(this, xn).set(n, r - 1);
    }
    c(this, Qn) || (se(this, Qn, !0), hn(() => {
      se(this, Qn, !1), this.linked && this.flush();
    }));
  }
  /**
   * @param {Set<Effect>} dirty_effects
   * @param {Set<Effect>} maybe_dirty_effects
   */
  transfer_effects(e, n) {
    for (const r of e)
      c(this, Sn).add(r);
    for (const r of n)
      c(this, $t).add(r);
    e.clear(), n.clear();
  }
  /** @param {(batch: Batch) => void} fn */
  oncommit(e) {
    c(this, As).add(e);
  }
  /** @param {(batch: Batch) => void} fn */
  ondiscard(e) {
    c(this, Cs).add(e);
  }
  settled() {
    return (c(this, Ps) ?? se(this, Ps, Fl())).promise;
  }
  static ensure() {
    if (_e === null) {
      const e = _e = new ji();
      !ea && !ur && hn(() => {
        c(e, Ts) || e.flush();
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
    var i;
    if (ha = e, (i = e.b) != null && i.is_pending && (e.f & (Bs | Gi | Bl)) !== 0 && (e.f & Js) === 0) {
      e.b.defer_effect(e);
      return;
    }
    for (var n = e; n.parent !== null; ) {
      n = n.parent;
      var r = n.f;
      if (ks !== null && n === Fe && (je === null || (je.f & yt) === 0))
        return;
      if ((r & (On | Wt)) !== 0) {
        if ((r & bt) === 0)
          return;
        n.f ^= bt;
      }
    }
    c(this, Pt).push(n);
  }
};
Ts = new WeakMap(), Ln = new WeakMap(), Zn = new WeakMap(), As = new WeakMap(), Cs = new WeakMap(), Os = new WeakMap(), xn = new WeakMap(), Ps = new WeakMap(), Pt = new WeakMap(), br = new WeakMap(), Sn = new WeakMap(), $t = new WeakMap(), on = new WeakMap(), zs = new WeakMap(), Qn = new WeakMap(), Ve = new WeakSet(), pa = function() {
  if (this.is_fork) return !0;
  for (const r of c(this, xn).keys()) {
    for (var e = r, n = !1; e.parent !== null; ) {
      if (c(this, on).has(e)) {
        n = !0;
        break;
      }
      e = e.parent;
    }
    if (!n)
      return !0;
  }
  return !1;
}, sr = function() {
  var u, f, _, S;
  se(this, Ts, !0), ll++ > 1e3 && (ge(this, Ve, rr).call(this), lu());
  for (const g of c(this, Sn))
    c(this, $t).delete(g), at(g, mt), this.schedule(g);
  for (const g of c(this, $t))
    at(g, an), this.schedule(g);
  const e = c(this, Pt);
  se(this, Pt, []), this.apply();
  var n = ks = [], r = [], i = ki = [];
  for (const g of e)
    try {
      ge(this, Ve, ga).call(this, g, n, r);
    } catch (p) {
      throw io(g), ge(this, Ve, pa).call(this) || this.discard(), p;
    }
  if (_e = null, i.length > 0) {
    var a = ji.ensure();
    for (const g of i)
      a.schedule(g);
  }
  if (ks = null, ki = null, ge(this, Ve, pa).call(this)) {
    ge(this, Ve, _s).call(this, r), ge(this, Ve, _s).call(this, n);
    for (const [g, p] of c(this, on))
      ro(g, p);
    i.length > 0 && /** @type {unknown} */
    ge(u = _e, Ve, sr).call(u);
    return;
  }
  const l = ge(this, Ve, to).call(this);
  if (l) {
    ge(this, Ve, _s).call(this, r), ge(this, Ve, _s).call(this, n), ge(f = l, Ve, no).call(f, this);
    return;
  }
  c(this, Sn).clear(), c(this, $t).clear();
  for (const g of c(this, As)) g(this);
  c(this, As).clear(), cr = this, ol(r), ol(n), cr = null, (_ = c(this, Ps)) == null || _.resolve();
  var o = (
    /** @type {Batch | null} */
    /** @type {unknown} */
    _e
  );
  if (c(this, Os) === 0 && (c(this, Pt).length === 0 || o !== null) && ge(this, Ve, rr).call(this), c(this, Pt).length > 0)
    if (o !== null) {
      const g = o;
      c(g, Pt).push(...c(this, Pt).filter((p) => !c(g, Pt).includes(p)));
    } else
      o = this;
  o !== null && (pn.clear(), ge(S = o, Ve, sr).call(S));
}, /**
 * Traverse the effect tree, executing effects or stashing
 * them for later execution as appropriate
 * @param {Effect} root
 * @param {Effect[]} effects
 * @param {Effect[]} render_effects
 */
ga = function(e, n, r) {
  e.f ^= bt;
  for (var i = e.first; i !== null; ) {
    var a = i.f, l = (a & (Wt | On)) !== 0, o = l && (a & bt) !== 0, u = o || (a & Ct) !== 0 || c(this, on).has(i);
    if (!u && i.fn !== null) {
      l ? i.f ^= bt : (a & Bs) !== 0 ? n.push(i) : oi(i) && ((a & sn) !== 0 && c(this, $t).add(i), Ks(i));
      var f = i.first;
      if (f !== null) {
        i = f;
        continue;
      }
    }
    for (; i !== null; ) {
      var _ = i.next;
      if (_ !== null) {
        i = _;
        break;
      }
      i = i.parent;
    }
  }
}, to = function() {
  for (var e = c(this, Ln); e !== null; ) {
    if (!e.is_fork) {
      for (const [n, [, r]] of this.current)
        if (e.current.has(n) && !r)
          return e;
    }
    e = c(e, Ln);
  }
  return null;
}, /**
 * @param {Batch} batch
 */
no = function(e) {
  var r;
  for (const [i, a] of e.current)
    !this.previous.has(i) && e.previous.has(i) && this.previous.set(i, e.previous.get(i)), this.current.set(i, a);
  for (const [i, a] of e.async_deriveds) {
    const l = this.async_deriveds.get(i);
    l && a.promise.then(l.resolve).catch(l.reject);
  }
  e.async_deriveds.clear(), this.transfer_effects(c(e, Sn), c(e, $t));
  const n = (i) => {
    var a = i.reactions;
    if (a !== null && !((i.f & yt) !== 0 && (i.f & (mt | an)) === 0))
      for (const u of a) {
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
          l & (xs | sn) && !this.async_deriveds.has(o) && (c(this, $t).delete(o), at(o, mt), this.schedule(o));
        }
      }
  };
  for (const i of this.current.keys())
    n(i);
  this.oncommit(() => e.discard()), ge(r = e, Ve, rr).call(r), _e = this, ge(this, Ve, sr).call(this);
}, /**
 * @param {Effect[]} effects
 */
_s = function(e) {
  for (var n = 0; n < e.length; n += 1)
    Wl(e[n], c(this, Sn), c(this, $t));
}, iu = function() {
  var S;
  for (let g = $i; g !== null; g = c(g, Zn)) {
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
    var i = [...g.current.keys()].filter(
      (p) => !/** @type {[any, boolean]} */
      g.current.get(p)[1]
    );
    if (!(!c(g, Ts) || i.length === 0)) {
      var a = i.filter((p) => !this.current.has(p));
      if (a.length === 0)
        e && g.discard();
      else if (n.length > 0) {
        if (e)
          for (const p of c(this, zs))
            g.unskip_effect(p, (b) => {
              var M;
              (b.f & (sn | xs)) !== 0 ? g.schedule(b) : ge(M = g, Ve, _s).call(M, [b]);
            });
        g.activate();
        var l = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Map();
        for (var u of n)
          so(u, a, l, o);
        o = /* @__PURE__ */ new Map();
        var f = [...g.current].filter(([p, b]) => {
          const M = this.current.get(p);
          return M ? M[0] !== b[0] || M[1] !== b[1] : !0;
        }).map(([p]) => p);
        if (f.length > 0)
          for (const p of c(this, br))
            (p.f & (Nt | Ct | Oi)) === 0 && qa(p, f, o) && ((p.f & (xs | sn)) !== 0 ? (at(p, mt), g.schedule(p)) : c(g, Sn).add(p));
        if (c(g, Pt).length > 0 && !c(g, Qn)) {
          g.apply();
          for (var _ of c(g, Pt))
            ge(S = g, Ve, ga).call(S, _, [], []);
          se(g, Pt, []);
        }
        g.deactivate();
      }
    }
  }
}, rr = function() {
  if (this.linked) {
    var e = c(this, Ln), n = c(this, Zn);
    e === null ? $i = n : se(e, Zn, n), n === null ? ms = e : se(n, Ln, e), this.linked = !1;
  }
};
let us = ji;
function au(t) {
  var e = ur;
  ur = !0;
  try {
    for (var n; ; ) {
      if (Wc(), _e === null)
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
function lu() {
  try {
    Uc();
  } catch (t) {
    vn(t, ha);
  }
}
let Qt = null;
function ol(t) {
  var e = t.length;
  if (e !== 0) {
    for (var n = 0; n < e; ) {
      var r = t[n++];
      if ((r.f & (Nt | Ct)) === 0 && oi(r) && (Qt = /* @__PURE__ */ new Set(), Ks(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && go(r), (Qt == null ? void 0 : Qt.size) > 0)) {
        pn.clear();
        for (const i of Qt) {
          if ((i.f & (Nt | Ct)) !== 0) continue;
          const a = [i];
          let l = i.parent;
          for (; l !== null; )
            Qt.has(l) && (Qt.delete(l), a.push(l)), l = l.parent;
          for (let o = a.length - 1; o >= 0; o--) {
            const u = a[o];
            (u.f & (Nt | Ct)) === 0 && Ks(u);
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
    for (const i of t.reactions) {
      const a = i.f;
      (a & yt) !== 0 ? so(
        /** @type {Derived} */
        i,
        e,
        n,
        r
      ) : (a & (xs | sn)) !== 0 && (a & mt) === 0 && qa(i, e, r) && (at(i, mt), Fa(
        /** @type {Effect} */
        i
      ));
    }
}
function qa(t, e, n) {
  const r = n.get(t);
  if (r !== void 0) return r;
  if (t.deps !== null)
    for (const i of t.deps) {
      if (Ai.call(e, i))
        return !0;
      if ((i.f & yt) !== 0 && qa(
        /** @type {Derived} */
        i,
        e,
        n
      ))
        return n.set(
          /** @type {Derived} */
          i,
          !0
        ), !0;
    }
  return n.set(t, !1), !1;
}
function Fa(t) {
  _e.schedule(t);
}
function ro(t, e) {
  if (!((t.f & Wt) !== 0 && (t.f & bt) !== 0)) {
    (t.f & mt) !== 0 ? e.d.push(t) : (t.f & an) !== 0 && e.m.push(t), at(t, bt);
    for (var n = t.first; n !== null; )
      ro(n, e), n = n.next;
  }
}
function io(t) {
  at(t, bt);
  for (var e = t.first; e !== null; )
    io(e), e = e.next;
}
let Di = /* @__PURE__ */ new Set();
const pn = /* @__PURE__ */ new Map();
let ao = !1;
function ds(t, e) {
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
  const n = ds(t);
  return _o(n), n;
}
// @__NO_SIDE_EFFECTS__
function ou(t, e = !1, n = !0) {
  const r = ds(t);
  return e || (r.equals = Gl), r;
}
function m(t, e, n = !1) {
  je !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!rn || (je.f & Oi) !== 0) && Vl() && (je.f & (yt | sn | xs | Oi)) !== 0 && (gn === null || !gn.has(t)) && Vc();
  let r = n ? $e(e) : e;
  return Hs(t, r, ki);
}
function Hs(t, e, n = null) {
  if (!t.equals(e)) {
    Pn ? pn.set(t, e) : pn.has(t) || pn.set(t, t.v);
    var r = us.ensure();
    if (r.capture(t, e), (t.f & yt) !== 0) {
      const i = (
        /** @type {Derived} */
        t
      );
      (t.f & mt) !== 0 && ja(i), kt === null && Ra(i);
    }
    t.wv = ko(), lo(t, mt, n), Fe !== null && (Fe.f & bt) !== 0 && (Fe.f & (Wt | On)) === 0 && (Kt === null ? yu([t]) : Kt.push(t)), !r.is_fork && Di.size > 0 && !ao && cu();
  }
  return e;
}
function cu() {
  ao = !1;
  for (const t of Di) {
    (t.f & bt) !== 0 && at(t, an);
    let e;
    try {
      e = oi(t);
    } catch {
      e = !0;
    }
    e && Ks(t);
  }
  Di.clear();
}
function dr(t) {
  m(t, t.v + 1);
}
function lo(t, e, n) {
  var r = t.reactions;
  if (r !== null)
    for (var i = r.length, a = 0; a < i; a++) {
      var l = r[a], o = l.f, u = (o & mt) === 0;
      if (u && at(l, e), (o & Oi) !== 0)
        Di.add(
          /** @type {Effect} */
          l
        );
      else if ((o & yt) !== 0) {
        var f = (
          /** @type {Derived} */
          l
        );
        kt == null || kt.delete(f), (o & cs) === 0 && (o & Yt && (Fe === null || (Fe.f & Pi) === 0) && (l.f |= cs), lo(f, an, n));
      } else if (u) {
        var _ = (
          /** @type {Effect} */
          l
        );
        (o & sn) !== 0 && Qt !== null && Qt.add(_), n !== null ? n.push(_) : Fa(_);
      }
    }
}
function $e(t) {
  if (typeof t != "object" || t === null || is in t || Ul in t)
    return t;
  const e = Da(t);
  if (e !== jl && e !== hc)
    return t;
  var n = /* @__PURE__ */ new Map(), r = ri(t), i = /* @__PURE__ */ q(0), a = ls, l = (o) => {
    if (ls === a)
      return o();
    var u = je, f = ls;
    Xt(null), vl(a);
    var _ = o();
    return Xt(u), vl(f), _;
  };
  return r && n.set("length", /* @__PURE__ */ q(
    /** @type {any[]} */
    t.length
  )), new Proxy(
    /** @type {any} */
    t,
    {
      defineProperty(o, u, f) {
        (!("value" in f) || f.configurable === !1 || f.enumerable === !1 || f.writable === !1) && Kc();
        var _ = n.get(u);
        return _ === void 0 ? l(() => {
          var S = /* @__PURE__ */ q(f.value);
          return n.set(u, S), S;
        }) : m(_, f.value, !0), !0;
      },
      deleteProperty(o, u) {
        var f = n.get(u);
        if (f === void 0) {
          if (u in o) {
            const _ = l(() => /* @__PURE__ */ q(gt));
            n.set(u, _), dr(i);
          }
        } else
          m(f, gt), dr(i);
        return !0;
      },
      get(o, u, f) {
        var p;
        if (u === is)
          return t;
        var _ = n.get(u), S = u in o;
        if (_ === void 0 && (!S || (p = ws(o, u)) != null && p.writable) && (_ = l(() => {
          var b = $e(S ? o[u] : gt), M = /* @__PURE__ */ q(b);
          return M;
        }), n.set(u, _)), _ !== void 0) {
          var g = s(_);
          return g === gt ? void 0 : g;
        }
        return Reflect.get(o, u, f);
      },
      getOwnPropertyDescriptor(o, u) {
        var f = Reflect.getOwnPropertyDescriptor(o, u);
        if (f && "value" in f) {
          var _ = n.get(u);
          _ && (f.value = s(_));
        } else if (f === void 0) {
          var S = n.get(u), g = S == null ? void 0 : S.v;
          if (S !== void 0 && g !== gt)
            return {
              enumerable: !0,
              configurable: !0,
              value: g,
              writable: !0
            };
        }
        return f;
      },
      has(o, u) {
        var g;
        if (u === is)
          return !0;
        var f = n.get(u), _ = f !== void 0 && f.v !== gt || Reflect.has(o, u);
        if (f !== void 0 || Fe !== null && (!_ || (g = ws(o, u)) != null && g.writable)) {
          f === void 0 && (f = l(() => {
            var p = _ ? $e(o[u]) : gt, b = /* @__PURE__ */ q(p);
            return b;
          }), n.set(u, f));
          var S = s(f);
          if (S === gt)
            return !1;
        }
        return _;
      },
      set(o, u, f, _) {
        var D;
        var S = n.get(u), g = u in o;
        if (r && u === "length")
          for (var p = f; p < /** @type {Source<number>} */
          S.v; p += 1) {
            var b = n.get(p + "");
            b !== void 0 ? m(b, gt) : p in o && (b = l(() => /* @__PURE__ */ q(gt)), n.set(p + "", b));
          }
        if (S === void 0)
          (!g || (D = ws(o, u)) != null && D.writable) && (S = l(() => /* @__PURE__ */ q(void 0)), m(S, $e(f)), n.set(u, S));
        else {
          g = S.v !== gt;
          var M = l(() => $e(f));
          m(S, M);
        }
        var k = Reflect.getOwnPropertyDescriptor(o, u);
        if (k != null && k.set && k.set.call(_, f), !g) {
          if (r && typeof u == "string") {
            var C = (
              /** @type {Source<number>} */
              n.get("length")
            ), O = Number(u);
            Number.isInteger(O) && O >= C.v && m(C, O + 1);
          }
          dr(i);
        }
        return !0;
      },
      ownKeys(o) {
        s(i);
        var u = Reflect.ownKeys(o).filter((S) => {
          var g = n.get(S);
          return g === void 0 || g.v !== gt;
        });
        for (var [f, _] of n)
          _.v !== gt && !(f in o) && u.push(f);
        return u;
      },
      setPrototypeOf() {
        Gc();
      }
    }
  );
}
function cl(t) {
  try {
    if (t !== null && typeof t == "object" && is in t)
      return t[is];
  } catch {
  }
  return t;
}
function oo(t, e) {
  return Object.is(cl(t), cl(e));
}
var ul, co, uo, vo;
function uu() {
  if (ul === void 0) {
    ul = window, co = /Firefox/.test(navigator.userAgent);
    var t = Element.prototype, e = Node.prototype, n = Text.prototype;
    uo = ws(e, "firstChild").get, vo = ws(e, "nextSibling").get, il(t) && (t[va] = void 0, t[mi] = null, t[fa] = void 0, t.__e = void 0), il(n) && (n[tr] = void 0);
  }
}
function Cn(t = "") {
  return document.createTextNode(t);
}
// @__NO_SIDE_EFFECTS__
function vs(t) {
  return (
    /** @type {TemplateNode | null} */
    uo.call(t)
  );
}
// @__NO_SIDE_EFFECTS__
function ai(t) {
  return (
    /** @type {TemplateNode | null} */
    vo.call(t)
  );
}
function h(t, e) {
  return /* @__PURE__ */ vs(t);
}
function Te(t, e = !1) {
  {
    var n = /* @__PURE__ */ vs(t);
    return n instanceof Comment && n.data === "" ? /* @__PURE__ */ ai(n) : n;
  }
}
function Z(t, e = !1) {
  return /* @__PURE__ */ vs(t);
}
function d(t, e = 1, n = !1) {
  let r = t;
  for (; e--; )
    r = /** @type {TemplateNode} */
    /* @__PURE__ */ ai(r);
  return r;
}
function du(t) {
  t.textContent = "";
}
function fo() {
  return !1;
}
function vu(t, e, n) {
  return (
    /** @type {T extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[T] : Element} */
    n ? document.createElement(t, { is: n }) : document.createElement(t)
  );
}
function fu(t) {
  var e = Fe;
  if (e === null)
    return je.f |= Bn, t;
  if ((e.f & Js) === 0 && (e.f & Bs) === 0)
    throw t;
  vn(t, e);
}
function vn(t, e) {
  if (!(e !== null && (e.f & Nt) !== 0)) {
    for (; e !== null; ) {
      if ((e.f & da) !== 0 && (e.f & (Nt | Ci)) === 0) {
        if ((e.f & Js) === 0)
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
function hu(t) {
  Fe === null && (je === null && Bc(), Fc()), Pn && qc();
}
function pu(t, e) {
  var n = e.last;
  n === null ? e.last = e.first = t : (n.next = t, t.prev = n, e.last = t);
}
function Dn(t, e) {
  var n = Fe;
  n !== null && (n.f & Ct) !== 0 && (t |= Ct);
  var r = {
    ctx: xt,
    deps: null,
    nodes: null,
    f: t | mt | Yt,
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
  var i = r;
  if ((t & Bs) !== 0)
    ks !== null ? ks.push(r) : us.ensure().schedule(r);
  else if (e !== null) {
    try {
      Ks(r);
    } catch (l) {
      throw Lt(r), l;
    }
    i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && // either `null`, or a singular child
    (i.f & Ys) === 0 && (i = i.first, (t & sn) !== 0 && (t & os) !== 0 && i !== null && (i.f |= os));
  }
  if (i !== null && (i.parent = n, n !== null && pu(i, n), je !== null && (je.f & yt) !== 0 && (t & On) === 0)) {
    var a = (
      /** @type {Derived} */
      je
    );
    (a.effects ?? (a.effects = [])).push(i);
  }
  return r;
}
function Ba() {
  return je !== null && !rn;
}
function Ua(t) {
  const e = Dn(Gi, null);
  return at(e, bt), e.teardown = t, e;
}
function _t(t) {
  hu();
  var e = (
    /** @type {Effect} */
    Fe.f
  ), n = !je && (e & Wt) !== 0 && xt !== null && !xt.i;
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
  return Dn(Bs | bc, t);
}
function gu(t) {
  us.ensure();
  const e = Dn(On | Ys, t);
  return (n = {}) => new Promise((r) => {
    n.outro ? as(e, () => {
      Lt(e), r(void 0);
    }) : (Lt(e), r(void 0));
  });
}
function Ha(t) {
  return Dn(Bs, t);
}
function bu(t) {
  return Dn(xs | Ys, t);
}
function Vi(t, e = 0) {
  return Dn(Gi | e, t);
}
function z(t, e = [], n = [], r = []) {
  $c(r, e, n, (i) => {
    Dn(Gi, () => {
      t(...i.map(s));
    });
  });
}
function li(t, e = 0) {
  var n = Dn(sn | e, t);
  return n;
}
function Jt(t) {
  return Dn(Wt | Ys, t);
}
function po(t) {
  var e = t.teardown;
  if (e !== null) {
    const n = Pn, r = je;
    dl(!0), Xt(null);
    try {
      e.call(null);
    } catch (i) {
      vn(i, t.parent);
    } finally {
      dl(n), Xt(r);
    }
  }
}
function Ka(t, e = !1) {
  var n = t.first;
  for (t.first = t.last = null; n !== null; ) {
    const i = n.ac;
    i !== null && Ws(() => {
      i.abort(ii);
    });
    var r = n.next;
    (n.f & On) !== 0 ? n.parent = null : Lt(n, e), n = r;
  }
}
function mu(t) {
  for (var e = t.first; e !== null; ) {
    var n = e.next;
    (e.f & Wt) === 0 && Lt(e), e = n;
  }
}
function Lt(t, e = !0) {
  var n = !1;
  (e || (t.f & gc) !== 0) && t.nodes !== null && t.nodes.end !== null && (_u(
    t.nodes.start,
    /** @type {TemplateNode} */
    t.nodes.end
  ), n = !0), t.f |= Ci, Ka(t, e && !n), fr(t, 0);
  var r = t.nodes && t.nodes.t;
  if (r !== null)
    for (const a of r)
      a.stop();
  po(t), t.f ^= Ci, t.f |= Nt;
  var i = t.parent;
  i !== null && i.first !== null && go(t), t.next = t.prev = t.teardown = t.ctx = t.deps = t.fn = t.nodes = t.ac = t.b = null;
}
function _u(t, e) {
  for (; t !== null; ) {
    var n = t === e ? null : /* @__PURE__ */ ai(t);
    t.remove(), t = n;
  }
}
function go(t) {
  var e = t.parent, n = t.prev, r = t.next;
  n !== null && (n.next = r), r !== null && (r.prev = n), e !== null && (e.first === t && (e.first = r), e.last === t && (e.last = n));
}
function as(t, e, n = !0) {
  var r = [];
  t.f |= Na, bo(t, r, !0);
  var i = () => {
    n && Lt(t), e && e();
  }, a = r.length;
  if (a > 0) {
    var l = () => --a || i();
    for (var o of r)
      o.out(l);
  } else
    i();
}
function bo(t, e, n) {
  if ((t.f & Ct) === 0) {
    t.f ^= Ct;
    var r = t.nodes && t.nodes.t;
    if (r !== null)
      for (const o of r)
        (o.is_global || n) && e.push(o);
    for (var i = t.first; i !== null; ) {
      var a = i.next;
      if ((i.f & On) === 0) {
        var l = (i.f & os) !== 0 || // If this is a branch effect without a block effect parent,
        // it means the parent block effect was pruned. In that case,
        // transparency information was transferred to the branch effect.
        (i.f & Wt) !== 0 && (t.f & sn) !== 0;
        bo(i, e, l ? n : !1);
      }
      i = a;
    }
  }
}
function Ni(t) {
  t.f &= ~Na, mo(t, !0);
}
function mo(t, e) {
  if ((t.f & Na) === 0 && (t.f & Ct) !== 0) {
    t.f ^= Ct, (t.f & bt) === 0 && (at(t, mt), us.ensure().schedule(t));
    for (var n = t.first; n !== null; ) {
      var r = n.next, i = (n.f & os) !== 0 || (n.f & Wt) !== 0;
      mo(n, i ? e : !1), n = r;
    }
    var a = t.nodes && t.nodes.t;
    if (a !== null)
      for (const l of a)
        (l.is_global || e) && l.in();
  }
}
function Ga(t, e) {
  if (t.nodes)
    for (var n = t.nodes.start, r = t.nodes.end; n !== null; ) {
      var i = n === r ? null : /* @__PURE__ */ ai(n);
      e.append(n), n = i;
    }
}
let wi = !1, Pn = !1;
function dl(t) {
  Pn = t;
}
let je = null, rn = !1;
function Xt(t) {
  je = t;
}
let Fe = null;
function bn(t) {
  Fe = t;
}
let gn = null;
function _o(t) {
  je !== null && (gn ?? (gn = /* @__PURE__ */ new Set())).add(t);
}
let zt = null, Bt = 0, Kt = null;
function yu(t) {
  Kt = t;
}
let yo = 1, Yn = 0, ls = Yn;
function vl(t) {
  ls = t;
}
function ko() {
  return ++yo;
}
function oi(t) {
  var e = t.f;
  if ((e & mt) !== 0)
    return !0;
  if (e & yt && (t.f &= ~cs), (e & an) !== 0) {
    for (var n = (
      /** @type {Value[]} */
      t.deps
    ), r = n.length, i = 0; i < r; i++) {
      var a = n[i];
      if (oi(
        /** @type {Derived} */
        a
      ) && $l(
        /** @type {Derived} */
        a
      ), a.wv > t.wv)
        return !0;
    }
    (e & Yt) !== 0 && // During time traveling we don't want to reset the status so that
    // traversal of the graph in the other batches still happens
    kt === null && at(t, bt);
  }
  return !1;
}
function wo(t, e, n = !0) {
  var r = t.reactions;
  if (r !== null && !(gn !== null && gn.has(t)))
    for (var i = 0; i < r.length; i++) {
      var a = r[i];
      (a.f & yt) !== 0 ? wo(
        /** @type {Derived} */
        a,
        e,
        !1
      ) : e === a && (n ? at(a, mt) : (a.f & bt) !== 0 && at(a, an), Fa(
        /** @type {Effect} */
        a
      ));
    }
}
function xo(t) {
  var e = zt, n = Bt, r = Kt, i = je, a = gn, l = xt, o = rn, u = ls, f = t.f;
  zt = /** @type {null | Value[]} */
  null, Bt = 0, Kt = null, je = (f & (Wt | On)) === 0 ? t : null, gn = null, Us(t.ctx), rn = !1, ls = ++Yn, t.ac !== null && (Ws(() => {
    t.ac.abort(ii);
  }), t.ac = null);
  try {
    t.f |= Pi;
    var _ = (
      /** @type {Function} */
      t.fn
    ), S = _();
    t.f |= Js;
    var g = fl(t);
    if (Vl() && Kt !== null && !rn && g !== null && (t.f & (yt | an | mt)) === 0)
      for (var p = 0; p < /** @type {Source[]} */
      Kt.length; p++)
        wo(
          Kt[p],
          /** @type {Effect} */
          t
        );
    if (i !== null && i !== t) {
      if (Yn++, i.deps !== null)
        for (let b = 0; b < n; b += 1)
          i.deps[b].rv = Yn;
      if (e !== null)
        for (const b of e)
          b.rv = Yn;
      Kt !== null && (r === null ? r = Kt : r.push(.../** @type {Source[]} */
      Kt));
    }
    return (t.f & Bn) !== 0 && (t.f ^= Bn), S;
  } catch (b) {
    return fl(t), fu(b);
  } finally {
    t.f ^= Pi, zt = e, Bt = n, Kt = r, je = i, gn = a, Us(l), rn = o, ls = u;
  }
}
function fl(t) {
  var i;
  var e = t.deps, n = _e == null ? void 0 : _e.is_fork;
  if (zt !== null) {
    var r;
    if (n || fr(t, Bt), e !== null && Bt > 0)
      for (e.length = Bt + zt.length, r = 0; r < zt.length; r++)
        e[Bt + r] = zt[r];
    else
      t.deps = e = zt;
    if (Ba() && (t.f & Yt) !== 0)
      for (r = Bt; r < e.length; r++)
        ((i = e[r]).reactions ?? (i.reactions = [])).push(t);
  } else !n && e !== null && Bt < e.length && (fr(t, Bt), e.length = Bt);
  return e;
}
function ku(t, e) {
  let n = e.reactions;
  if (n !== null) {
    var r = vc.call(n, t);
    if (r !== -1) {
      var i = n.length - 1;
      i === 0 ? n = e.reactions = null : (n[r] = n[i], n.pop());
    }
  }
  if (n === null && (e.f & yt) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (zt === null || !Ai.call(zt, e))) {
    var a = (
      /** @type {Derived} */
      e
    );
    (a.f & Yt) !== 0 && (a.f ^= Yt, a.f &= ~cs), a.v !== gt && Ra(a), a.ac !== null && Ws(() => {
      a.ac.abort(ii), a.ac = null, at(a, mt);
    }), su(a), fr(a, 0);
  }
}
function fr(t, e) {
  var n = t.deps;
  if (n !== null)
    for (var r = e; r < n.length; r++)
      ku(t, n[r]);
}
function Ks(t) {
  var e = t.f;
  if ((e & Nt) === 0) {
    at(t, bt);
    var n = Fe, r = wi;
    Fe = t, wi = (e & (Wt | On)) === 0;
    try {
      (e & (sn | Bl)) !== 0 ? mu(t) : Ka(t), po(t);
      var i = xo(t);
      t.teardown = typeof i == "function" ? i : null, t.wv = yo;
      var a;
    } finally {
      wi = r, Fe = n;
    }
  }
}
async function wu() {
  await Promise.resolve(), au();
}
function s(t) {
  var e = t.f, n = (e & yt) !== 0;
  if (je !== null && !rn) {
    var r = Fe !== null && (Fe.f & Nt) !== 0;
    if (!r && (gn === null || !gn.has(t))) {
      var i = je.deps;
      if ((je.f & Pi) !== 0)
        t.rv < Yn && (t.rv = Yn, zt === null && i !== null && i[Bt] === t ? Bt++ : zt === null ? zt = [t] : zt.push(t));
      else {
        je.deps ?? (je.deps = []), Ai.call(je.deps, t) || je.deps.push(t);
        var a = t.reactions;
        a === null ? t.reactions = [je] : Ai.call(a, je) || a.push(je);
      }
    }
  }
  if (Pn && pn.has(t))
    return pn.get(t);
  if (n) {
    var l = (
      /** @type {Derived} */
      t
    );
    if (Pn) {
      var o = l.v;
      return ((l.f & bt) === 0 && l.reactions !== null || Eo(l)) && (o = ja(l)), pn.set(l, o), o;
    }
    var u = (l.f & Yt) === 0 && !rn && je !== null && (wi || (je.f & Yt) !== 0), f = (l.f & Js) === 0;
    oi(l) && (u && (l.f |= Yt), $l(l)), u && !f && (eo(l), So(l));
  }
  if (kt != null && kt.has(t))
    return kt.get(t);
  if ((t.f & Bn) !== 0)
    throw t.v;
  return t.v;
}
function So(t) {
  if (t.f |= Yt, t.deps !== null)
    for (const e of t.deps)
      (e.reactions ?? (e.reactions = [])).push(t), (e.f & yt) !== 0 && (e.f & Yt) === 0 && (eo(
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
    if (pn.has(e) || (e.f & yt) !== 0 && Eo(
      /** @type {Derived} */
      e
    ))
      return !0;
  return !1;
}
function fs(t) {
  var e = rn;
  try {
    return rn = !0, t();
  } finally {
    rn = e;
  }
}
const xu = ["touchstart", "touchmove"];
function Su(t) {
  return xu.includes(t);
}
const Wn = Symbol("events"), Mo = /* @__PURE__ */ new Set(), ba = /* @__PURE__ */ new Set();
function Eu(t, e, n, r = {}) {
  function i(a) {
    if (r.capture || ma.call(e, a), !a.cancelBubble)
      return Ws(() => n == null ? void 0 : n.call(this, a));
  }
  return t.startsWith("pointer") || t.startsWith("touch") || t === "wheel" ? hn(() => {
    e.addEventListener(t, i, r);
  }) : e.addEventListener(t, i, r), i;
}
function tt(t, e, n, r, i) {
  var a = { capture: r, passive: i }, l = Eu(t, e, n, a);
  (e === document.body || // @ts-ignore
  e === window || // @ts-ignore
  e === document || // Firefox has quirky behavior, it can happen that we still get "canplay" events when the element is already removed
  e instanceof HTMLMediaElement) && Ua(() => {
    e.removeEventListener(t, l, a);
  });
}
function P(t, e, n) {
  (e[Wn] ?? (e[Wn] = {}))[t] = n;
}
function pt(t) {
  for (var e = 0; e < t.length; e++)
    Mo.add(t[e]);
  for (var n of ba)
    n(t);
}
let ta = null, na = !1;
function ma(t) {
  var M, k;
  var e = this, n = (
    /** @type {Node} */
    e.ownerDocument
  ), r = t.type, i = ((M = t.composedPath) == null ? void 0 : M.call(t)) || [], a = (
    /** @type {null | Element} */
    i[0] || t.target
  );
  ta = t, na || (na = !0, setTimeout(() => {
    na = !1, ta = null;
  }));
  var l = 0, o = ta === t && t[Wn];
  if (o) {
    var u = i.indexOf(o);
    if (u !== -1 && (e === document || e === /** @type {any} */
    window)) {
      t[Wn] = e;
      return;
    }
    var f = i.indexOf(e);
    if (f === -1)
      return;
    u <= f && (l = u);
  }
  if (a = /** @type {Element} */
  i[l] || t.target, a !== e) {
    Il(t, "currentTarget", {
      configurable: !0,
      get() {
        return a || n;
      }
    });
    var _ = je, S = Fe;
    Xt(null), bn(null);
    try {
      for (var g, p = []; a !== null && a !== e; ) {
        try {
          var b = (k = a[Wn]) == null ? void 0 : k[r];
          b != null && (!/** @type {any} */
          a.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          t.target === a) && b.call(a, t);
        } catch (C) {
          g ? p.push(C) : g = C;
        }
        if (t.cancelBubble) break;
        l++, a = l < i.length ? (
          /** @type {Element} */
          i[l]
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
      t[Wn] = e, delete t.currentTarget, Xt(_), bn(S);
    }
  }
}
var Ll;
const sa = (
  // We gotta write it like this because after downleveling the pure comment may end up in the wrong location
  ((Ll = globalThis == null ? void 0 : globalThis.window) == null ? void 0 : Ll.trustedTypes) && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", {
    /** @param {string} html */
    createHTML: (t) => t
  })
);
function Mu(t) {
  return (
    /** @type {string} */
    (sa == null ? void 0 : sa.createHTML(t)) ?? t
  );
}
function To(t) {
  var e = vu("template");
  return e.innerHTML = Mu(t.replaceAll("<!>", "<!---->")), e.content;
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
  var n = (e & Cc) !== 0, r = (e & Oc) !== 0, i, a = !t.startsWith("<!>");
  return () => {
    i === void 0 && (i = To(a ? t : "<!>" + t), n || (i = /** @type {TemplateNode} */
    /* @__PURE__ */ vs(i)));
    var l = (
      /** @type {TemplateNode} */
      r || co ? document.importNode(i, !0) : i.cloneNode(!0)
    );
    if (n) {
      var o = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ vs(l)
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
function Tu(t, e, n = "svg") {
  var r = !t.startsWith("<!>"), i = `<${n}>${r ? t : "<!>" + t}</${n}>`, a;
  return () => {
    if (!a) {
      var l = (
        /** @type {DocumentFragment} */
        To(i)
      ), o = (
        /** @type {Element} */
        /* @__PURE__ */ vs(l)
      );
      a = /** @type {Element} */
      /* @__PURE__ */ vs(o);
    }
    var u = (
      /** @type {TemplateNode} */
      a.cloneNode(!0)
    );
    return hr(u, u), u;
  };
}
// @__NO_SIDE_EFFECTS__
function Au(t, e) {
  return /* @__PURE__ */ Tu(t, e, "svg");
}
function nn(t = "") {
  {
    var e = Cn(t + "");
    return hr(e, e), e;
  }
}
function At() {
  var t = document.createDocumentFragment(), e = document.createComment(""), n = Cn();
  return t.append(e, n), hr(e, n), t;
}
function y(t, e) {
  t !== null && t.before(
    /** @type {Node} */
    e
  );
}
function Cu(t) {
  let e = 0, n = ds(0), r;
  return () => {
    Ba() && (s(n), Vi(() => (e === 0 && (r = fs(() => t(() => dr(n)))), e += 1, () => {
      hn(() => {
        e -= 1, e === 0 && (r == null || r(), r = void 0, dr(n));
      });
    })));
  };
}
var Ou = os | Ys;
function Pu(t, e, n, r) {
  new zu(t, e, n, r);
}
var Gt, za, Vt, $n, Et, It, Mt, jt, cn, es, Rn, Ds, mr, _r, En, qi, Ze, Du, Nu, _a, Lu, ya, ir, xi, ka, wa;
class zu {
  /**
   * @param {TemplateNode} node
   * @param {BoundaryProps} props
   * @param {((anchor: Node) => void)} children
   * @param {((error: unknown) => unknown) | undefined} [transform_error]
   */
  constructor(e, n, r, i) {
    U(this, Ze);
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
    U(this, Gt);
    /** @type {TemplateNode | null} */
    U(this, za, null);
    /** @type {BoundaryProps} */
    U(this, Vt);
    /** @type {((anchor: Node) => void)} */
    U(this, $n);
    /** @type {Effect} */
    U(this, Et);
    /** @type {Effect | null} */
    U(this, It, null);
    /** @type {Effect | null} */
    U(this, Mt, null);
    /** @type {Effect | null} */
    U(this, jt, null);
    /** @type {DocumentFragment | null} */
    U(this, cn, null);
    U(this, es, 0);
    U(this, Rn, 0);
    U(this, Ds, !1);
    /** @type {Set<Effect>} */
    U(this, mr, /* @__PURE__ */ new Set());
    /** @type {Set<Effect>} */
    U(this, _r, /* @__PURE__ */ new Set());
    /**
     * A source containing the number of pending async deriveds/expressions.
     * Only created if `$effect.pending()` is used inside the boundary,
     * otherwise updating the source results in needless `Batch.ensure()`
     * calls followed by no-op flushes
     * @type {Source<number> | null}
     */
    U(this, En, null);
    U(this, qi, Cu(() => (se(this, En, ds(c(this, es))), () => {
      se(this, En, null);
    })));
    var a;
    se(this, Gt, e), se(this, Vt, n), se(this, $n, (l) => {
      var o = (
        /** @type {Effect} */
        Fe
      );
      o.b = this, o.f |= da, r(l);
    }), this.parent = /** @type {Effect} */
    Fe.b, this.transform_error = i ?? ((a = this.parent) == null ? void 0 : a.transform_error) ?? ((l) => l), se(this, Et, li(() => {
      ge(this, Ze, ya).call(this);
    }, Ou));
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
    return !!c(this, Vt).pending;
  }
  /**
   * Update the source that powers `$effect.pending()` inside this boundary,
   * and controls when the current `pending` snippet (if any) is removed.
   * Do not call from inside the class
   * @param {1 | -1} d
   * @param {Batch} batch
   */
  update_pending_count(e, n) {
    ge(this, Ze, ka).call(this, e, n), se(this, es, c(this, es) + e), !(!c(this, En) || c(this, Ds)) && (se(this, Ds, !0), hn(() => {
      se(this, Ds, !1), c(this, En) && Hs(c(this, En), c(this, es));
    }));
  }
  get_effect_pending() {
    return c(this, qi).call(this), s(
      /** @type {Source<number>} */
      c(this, En)
    );
  }
  /** @param {unknown} error */
  error(e) {
    if (!c(this, Vt).onerror && !c(this, Vt).failed)
      throw e;
    _e != null && _e.is_fork ? (c(this, It) && _e.skip_effect(c(this, It)), c(this, Mt) && _e.skip_effect(c(this, Mt)), c(this, jt) && _e.skip_effect(c(this, jt)), _e.oncommit(() => {
      ge(this, Ze, wa).call(this, e);
    })) : ge(this, Ze, wa).call(this, e);
  }
}
Gt = new WeakMap(), za = new WeakMap(), Vt = new WeakMap(), $n = new WeakMap(), Et = new WeakMap(), It = new WeakMap(), Mt = new WeakMap(), jt = new WeakMap(), cn = new WeakMap(), es = new WeakMap(), Rn = new WeakMap(), Ds = new WeakMap(), mr = new WeakMap(), _r = new WeakMap(), En = new WeakMap(), qi = new WeakMap(), Ze = new WeakSet(), Du = function() {
  try {
    se(this, It, Jt(() => c(this, $n).call(this, c(this, Gt))));
  } catch (e) {
    this.error(e);
  }
}, /**
 * @param {unknown} error The deserialized error from the server's hydration comment
 */
Nu = function(e) {
  const n = c(this, Vt).failed, { reset: r, invoke_onerror: i } = ge(this, Ze, _a).call(this, e);
  hn(i), n && se(this, jt, Jt(() => {
    n(
      c(this, Gt),
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
_a = function(e) {
  var n = !1, r = !1;
  const i = () => {
    if (n) {
      Nc();
      return;
    }
    n = !0, r && Jc(), c(this, jt) !== null && as(c(this, jt), () => {
      se(this, jt, null);
    }), ge(this, Ze, xi).call(this, () => {
      ge(this, Ze, ya).call(this);
    });
  };
  return { reset: i, invoke_onerror: () => {
    var l, o;
    try {
      r = !0, (o = (l = c(this, Vt)).onerror) == null || o.call(l, e, i), r = !1;
    } catch (u) {
      vn(u, c(this, Et) && c(this, Et).parent);
    }
  } };
}, Lu = function() {
  const e = c(this, Vt).pending;
  e && (this.is_pending = !0, se(this, Mt, Jt(() => e(c(this, Gt)))), hn(() => {
    var n = se(this, cn, document.createDocumentFragment()), r = Cn(), i = !1;
    if (n.append(r), se(this, It, ge(this, Ze, xi).call(this, () => {
      try {
        return Jt(() => c(this, $n).call(this, r));
      } catch (a) {
        try {
          this.error(a), i = !0;
        } catch (l) {
          vn(l, c(this, Et).parent);
        }
        return null;
      }
    })), c(this, It) === null) {
      se(this, cn, null), i && ge(this, Ze, ir).call(
        this,
        /** @type {Batch} */
        _e
      );
      return;
    }
    c(this, Rn) === 0 && (c(this, Gt).before(n), se(this, cn, null), as(
      /** @type {Effect} */
      c(this, Mt),
      () => {
        se(this, Mt, null);
      }
    ), ge(this, Ze, ir).call(
      this,
      /** @type {Batch} */
      _e
    ));
  }));
}, ya = function() {
  try {
    if (this.is_pending = this.has_pending_snippet(), se(this, Rn, 0), se(this, es, 0), se(this, It, Jt(() => {
      c(this, $n).call(this, c(this, Gt));
    })), c(this, Rn) > 0) {
      var e = se(this, cn, document.createDocumentFragment());
      Ga(c(this, It), e);
      const n = (
        /** @type {(anchor: Node) => void} */
        c(this, Vt).pending
      );
      se(this, Mt, Jt(() => n(c(this, Gt))));
    } else
      ge(this, Ze, ir).call(
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
xi = function(e) {
  var n = Fe, r = je, i = xt;
  bn(c(this, Et)), Xt(c(this, Et)), Us(c(this, Et).ctx);
  try {
    return us.ensure(), e();
  } finally {
    bn(n), Xt(r), Us(i);
  }
}, /**
 * Updates the pending count associated with the currently visible pending snippet,
 * if any, such that we can replace the snippet with content once work is done
 * @param {1 | -1} d
 * @param {Batch} batch
 */
ka = function(e, n) {
  var r;
  if (!this.has_pending_snippet()) {
    this.parent && ge(r = this.parent, Ze, ka).call(r, e, n);
    return;
  }
  se(this, Rn, c(this, Rn) + e), c(this, Rn) === 0 && (ge(this, Ze, ir).call(this, n), c(this, Mt) && as(c(this, Mt), () => {
    se(this, Mt, null);
  }), c(this, cn) && (c(this, Gt).before(c(this, cn)), se(this, cn, null)));
}, /**
 * @param {unknown} error
 */
wa = function(e) {
  c(this, It) && (Lt(c(this, It)), se(this, It, null)), c(this, Mt) && (Lt(c(this, Mt)), se(this, Mt, null)), c(this, jt) && (Lt(c(this, jt)), se(this, jt, null));
  let n = c(this, Vt).failed;
  const r = (i) => {
    const { reset: a, invoke_onerror: l } = ge(this, Ze, _a).call(this, i);
    l(), n && se(this, jt, ge(this, Ze, xi).call(this, () => {
      try {
        return Jt(() => {
          var o = (
            /** @type {Effect} */
            Fe
          );
          o.b = this, o.f |= da, n(
            c(this, Gt),
            () => i,
            () => a
          );
        });
      } catch (o) {
        return vn(
          o,
          /** @type {Effect} */
          c(this, Et).parent
        ), null;
      }
    }));
  };
  hn(() => {
    var i;
    try {
      i = this.transform_error(e);
    } catch (a) {
      vn(a, c(this, Et) && c(this, Et).parent);
      return;
    }
    i !== null && typeof i == "object" && typeof /** @type {any} */
    i.then == "function" ? i.then(
      r,
      /** @param {unknown} e */
      (a) => vn(a, c(this, Et) && c(this, Et).parent)
    ) : r(i);
  });
};
function F(t, e) {
  var n = e == null ? "" : typeof e == "object" ? `${e}` : e;
  n !== /** @type {any} */
  (t[tr] ?? (t[tr] = t.nodeValue)) && (t[tr] = n, t.nodeValue = `${n}`);
}
function hl(t, e) {
  return Ru(t, e);
}
const pi = /* @__PURE__ */ new Map();
function Ru(t, { target: e, anchor: n, props: r = {}, events: i, context: a, intro: l = !0, transformError: o }) {
  uu();
  var u = void 0, f = gu(() => {
    var _ = n ?? e.appendChild(Cn());
    Pu(
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
        a && (b.c = a), i && (r.$$events = i), u = t(p, r) || La(), ct();
      },
      o
    );
    var S = /* @__PURE__ */ new Set(), g = (p) => {
      for (var b = 0; b < p.length; b++) {
        var M = p[b];
        if (!S.has(M)) {
          S.add(M);
          var k = Su(M);
          for (const D of [e, document]) {
            var C = pi.get(D);
            C === void 0 && (C = /* @__PURE__ */ new Map(), pi.set(D, C));
            var O = C.get(M);
            O === void 0 ? (D.addEventListener(M, ma, { passive: k }), C.set(M, 1)) : C.set(M, O + 1);
          }
        }
      }
    };
    return g(Hi(Mo)), ba.add(g), () => {
      var k;
      for (var p of S)
        for (const C of [e, document]) {
          var b = (
            /** @type {Map<string, number>} */
            pi.get(C)
          ), M = (
            /** @type {number} */
            b.get(p)
          );
          --M == 0 ? (C.removeEventListener(p, ma), b.delete(p), b.size === 0 && pi.delete(C)) : b.set(p, M);
        }
      ba.delete(g), _ !== n && ((k = _.parentNode) == null || k.removeChild(_));
    };
  });
  return xa.set(u, f), u;
}
let xa = /* @__PURE__ */ new WeakMap();
function pl(t, e) {
  const n = xa.get(t);
  return n ? (xa.delete(t), n(e)) : Promise.resolve();
}
var en, un, qt, ts, yr, kr, Fi;
class Va {
  /**
   * @param {TemplateNode} anchor
   * @param {boolean} transition
   */
  constructor(e, n = !0) {
    /** @type {TemplateNode} */
    ft(this, "anchor");
    /** @type {Map<Batch, Key>} */
    U(this, en, /* @__PURE__ */ new Map());
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
    U(this, un, /* @__PURE__ */ new Map());
    /**
     * Similar to #onscreen with respect to the keys, but contains branches that are not yet
     * in the DOM, because their insertion is deferred.
     * @type {Map<Key, Branch>}
     */
    U(this, qt, /* @__PURE__ */ new Map());
    /**
     * Keys of effects that are currently outroing
     * @type {Set<Key>}
     */
    U(this, ts, /* @__PURE__ */ new Set());
    /**
     * Whether to pause (i.e. outro) on change, or destroy immediately.
     * This is necessary for `<svelte:element>`
     */
    U(this, yr, !0);
    /**
     * @param {Batch} batch
     */
    U(this, kr, (e) => {
      if (c(this, en).has(e)) {
        var n = (
          /** @type {Key} */
          c(this, en).get(e)
        ), r = c(this, un).get(n);
        if (r)
          Ni(r), c(this, ts).delete(n);
        else {
          var i = c(this, qt).get(n);
          i && (Ni(i.effect), c(this, un).set(n, i.effect), c(this, qt).delete(n), i.fragment.lastChild.remove(), this.anchor.before(i.fragment), r = i.effect);
        }
        for (const [a, l] of c(this, en)) {
          if (c(this, en).delete(a), a === e)
            break;
          const o = c(this, qt).get(l);
          o && (Lt(o.effect), c(this, qt).delete(l));
        }
        for (const [a, l] of c(this, un)) {
          if (a === n || c(this, ts).has(a)) continue;
          const o = () => {
            if (Array.from(c(this, en).values()).includes(a)) {
              var f = document.createDocumentFragment();
              Ga(l, f), f.append(Cn()), c(this, qt).set(a, { effect: l, fragment: f });
            } else
              Lt(l);
            c(this, ts).delete(a), c(this, un).delete(a);
          };
          c(this, yr) || !r ? (c(this, ts).add(a), as(l, o, !1)) : o();
        }
      }
    });
    /**
     * @param {Batch} batch
     */
    U(this, Fi, (e) => {
      c(this, en).delete(e);
      const n = Array.from(c(this, en).values());
      for (const [r, i] of c(this, qt))
        n.includes(r) || (Lt(i.effect), c(this, qt).delete(r));
    });
    this.anchor = e, se(this, yr, n);
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
    ), i = fo();
    if (n && !c(this, un).has(e) && !c(this, qt).has(e))
      if (i) {
        var a = document.createDocumentFragment(), l = Cn();
        a.append(l), c(this, qt).set(e, {
          effect: Jt(() => n(l)),
          fragment: a
        });
      } else
        c(this, un).set(
          e,
          Jt(() => n(this.anchor))
        );
    if (c(this, en).set(r, e), i) {
      for (const [o, u] of c(this, un))
        o === e ? r.unskip_effect(u) : r.skip_effect(u);
      for (const [o, u] of c(this, qt))
        o === e ? r.unskip_effect(u.effect) : r.skip_effect(u.effect);
      r.oncommit(c(this, kr)), r.ondiscard(c(this, Fi));
    } else
      c(this, kr).call(this, r);
  }
}
en = new WeakMap(), un = new WeakMap(), qt = new WeakMap(), ts = new WeakMap(), yr = new WeakMap(), kr = new WeakMap(), Fi = new WeakMap();
function B(t, e, n = !1) {
  var r = new Va(t), i = n ? os : 0;
  function a(l, o) {
    r.ensure(l, o);
  }
  li(() => {
    var l = !1;
    e((o, u = 0) => {
      l = !0, a(u, o);
    }), l || a(-1, null);
  }, i);
}
const Iu = Symbol("NaN");
function gl(t, e, n) {
  var r = new Va(t);
  li(() => {
    var i = e();
    i !== i && (i = /** @type {any} */
    Iu), r.ensure(i, n);
  });
}
function wt(t, e) {
  return e;
}
function ju(t, e, n) {
  for (var r = [], i = e.length, a, l = e.length, o = 0; o < i; o++) {
    let S = e[o];
    as(
      S,
      () => {
        if (a) {
          if (a.pending.delete(S), a.done.add(S), a.pending.size === 0) {
            var g = (
              /** @type {Set<EachOutroGroup>} */
              t.outrogroups
            );
            Sa(t, Hi(a.done)), g.delete(a), g.size === 0 && (t.outrogroups = null);
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
      var f = (
        /** @type {Element} */
        n
      ), _ = (
        /** @type {Element} */
        f.parentNode
      );
      du(_), _.append(f), t.items.clear();
    }
    Sa(t, e, !u);
  } else
    a = {
      pending: new Set(e),
      done: /* @__PURE__ */ new Set()
    }, (t.outrogroups ?? (t.outrogroups = /* @__PURE__ */ new Set())).add(a);
}
function Sa(t, e, n = !0) {
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
  for (var i = 0; i < e.length; i++) {
    var a = e[i];
    if (r != null && r.has(a)) {
      a.f |= fn;
      const l = document.createDocumentFragment();
      Ga(a, l);
    } else
      Lt(e[i], n);
  }
}
var bl;
function qe(t, e, n, r, i, a = null) {
  var l = t, o = /* @__PURE__ */ new Map(), u = (e & Hl) !== 0;
  if (u) {
    var f = (
      /** @type {Element} */
      t
    );
    l = f.appendChild(Cn());
  }
  var _ = null, S = /* @__PURE__ */ Ql(() => {
    var D = n();
    return (
      /** @type {V[]} */
      ri(D) ? D : D == null ? [] : Hi(D)
    );
  }), g, p = /* @__PURE__ */ new Map(), b = !0;
  function M(D) {
    (O.effect.f & Nt) === 0 && (O.pending.delete(D), O.fallback = _, qu(O, g, l, e, r), _ !== null && (g.length === 0 ? (_.f & fn) === 0 ? Ni(_) : (_.f ^= fn, ar(_, null, l)) : as(_, () => {
      _ = null;
    })));
  }
  function k(D) {
    O.pending.delete(D);
  }
  var C = li(() => {
    g = /** @type {V[]} */
    s(S);
    for (var D = g.length, J = /* @__PURE__ */ new Set(), L = (
      /** @type {Batch} */
      _e
    ), G = fo(), R = 0; R < D; R += 1) {
      var T = g[R], I = r(T, R), v = b ? null : o.get(I);
      v ? (v.v && Hs(v.v, T), v.i && Hs(v.i, R), G && L.unskip_effect(v.e)) : (v = Fu(
        o,
        b ? l : bl ?? (bl = Cn()),
        T,
        I,
        R,
        i,
        e,
        n
      ), b || (v.e.f |= fn), o.set(I, v)), J.add(I);
    }
    if (D === 0 && a && !_ && (b ? _ = Jt(() => a(l)) : (_ = Jt(() => a(bl ?? (bl = Cn()))), _.f |= fn)), D > J.size && jc(), !b)
      if (p.set(L, J), G) {
        for (const [w, j] of o)
          J.has(w) || L.skip_effect(j.e);
        L.oncommit(M), L.ondiscard(k);
      } else
        M(L);
    s(S);
  }), O = { effect: C, items: o, pending: p, outrogroups: null, fallback: _ };
  b = !1;
}
function er(t) {
  for (; t !== null && (t.f & Wt) === 0; )
    t = t.next;
  return t;
}
function qu(t, e, n, r, i) {
  var v, w, j, fe, ce, oe, A, N, $;
  var a = (r & xc) !== 0, l = e.length, o = t.items, u = er(t.effect.first), f, _ = null, S, g = [], p = [], b, M, k, C;
  if (a)
    for (C = 0; C < l; C += 1)
      b = e[C], M = i(b, C), k = /** @type {EachItem} */
      o.get(M).e, (k.f & fn) === 0 && ((w = (v = k.nodes) == null ? void 0 : v.a) == null || w.measure(), (S ?? (S = /* @__PURE__ */ new Set())).add(k));
  for (C = 0; C < l; C += 1) {
    if (b = e[C], M = i(b, C), k = /** @type {EachItem} */
    o.get(M).e, t.outrogroups !== null)
      for (const Q of t.outrogroups)
        Q.pending.delete(k), Q.done.delete(k);
    if ((k.f & Ct) !== 0 && (Ni(k), a && ((fe = (j = k.nodes) == null ? void 0 : j.a) == null || fe.unfix(), (S ?? (S = /* @__PURE__ */ new Set())).delete(k))), (k.f & fn) !== 0)
      if (k.f ^= fn, k === u)
        ar(k, null, n);
      else {
        var O = _ ? _.next : u;
        k === t.effect.last && (t.effect.last = k.prev), k.prev && (k.prev.next = k.next), k.next && (k.next.prev = k.prev), Nn(t, _, k), Nn(t, k, O), ar(k, O, n), _ = k, g = [], p = [], u = er(_.next);
        continue;
      }
    if (k !== u) {
      if (f !== void 0 && f.has(k)) {
        if (g.length < p.length) {
          var D = p[0], J;
          _ = D.prev;
          var L = g[0], G = g[g.length - 1];
          for (J = 0; J < g.length; J += 1)
            ar(g[J], D, n);
          for (J = 0; J < p.length; J += 1)
            f.delete(p[J]);
          Nn(t, L.prev, G.next), Nn(t, _, L), Nn(t, G, D), u = D, _ = G, C -= 1, g = [], p = [];
        } else
          f.delete(k), ar(k, u, n), Nn(t, k.prev, k.next), Nn(t, k, _ === null ? t.effect.first : _.next), Nn(t, _, k), _ = k;
        continue;
      }
      for (g = [], p = []; u !== null && u !== k; )
        (f ?? (f = /* @__PURE__ */ new Set())).add(u), p.push(u), u = er(u.next);
      if (u === null)
        continue;
    }
    (k.f & fn) === 0 && g.push(k), _ = k, u = er(k.next);
  }
  if (t.outrogroups !== null) {
    for (const Q of t.outrogroups)
      Q.pending.size === 0 && (Sa(t, Hi(Q.done)), (ce = t.outrogroups) == null || ce.delete(Q));
    t.outrogroups.size === 0 && (t.outrogroups = null);
  }
  if (u !== null || f !== void 0) {
    var R = [];
    if (f !== void 0)
      for (k of f)
        (k.f & Ct) === 0 && R.push(k);
    for (; u !== null; )
      (u.f & Ct) === 0 && u !== t.fallback && R.push(u), u = er(u.next);
    var T = R.length;
    if (T > 0) {
      var I = (r & Hl) !== 0 && l === 0 ? n : null;
      if (a) {
        for (C = 0; C < T; C += 1)
          (A = (oe = R[C].nodes) == null ? void 0 : oe.a) == null || A.measure();
        for (C = 0; C < T; C += 1)
          ($ = (N = R[C].nodes) == null ? void 0 : N.a) == null || $.fix();
      }
      ju(t, R, I);
    }
  }
  a && hn(() => {
    var Q, te;
    if (S !== void 0)
      for (k of S)
        (te = (Q = k.nodes) == null ? void 0 : Q.a) == null || te.apply();
  });
}
function Fu(t, e, n, r, i, a, l, o) {
  var u = (l & kc) !== 0 ? (l & Sc) === 0 ? /* @__PURE__ */ ou(n, !1, !1) : ds(n) : null, f = (l & wc) !== 0 ? ds(i) : null;
  return {
    v: u,
    i: f,
    e: Jt(() => (a(e, u ?? n, f ?? i, o), () => {
      t.delete(r);
    }))
  };
}
function ar(t, e, n) {
  if (t.nodes)
    for (var r = t.nodes.start, i = t.nodes.end, a = e && (e.f & fn) === 0 ? (
      /** @type {EffectNodes} */
      e.nodes.start
    ) : n; r !== null; ) {
      var l = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ ai(r)
      );
      if (a.before(r), r === i)
        return;
      r = l;
    }
}
function Nn(t, e, n) {
  e === null ? t.effect.first = n : e.next = n, n === null ? t.effect.last = e : n.prev = e;
}
function ml(t, e, ...n) {
  var r = new Va(t);
  li(() => {
    const i = e() ?? null;
    r.ensure(i, i && ((a) => i(a, ...n)));
  }, os);
}
function Ao(t) {
  var e, n, r = "";
  if (typeof t == "string" || typeof t == "number") r += t;
  else if (typeof t == "object") if (Array.isArray(t)) {
    var i = t.length;
    for (e = 0; e < i; e++) t[e] && (n = Ao(t[e])) && (r && (r += " "), r += n);
  } else for (n in t) t[n] && (r && (r += " "), r += n);
  return r;
}
function Bu() {
  for (var t, e, n = 0, r = "", i = arguments.length; n < i; n++) (t = arguments[n]) && (e = Ao(t)) && (r && (r += " "), r += e);
  return r;
}
function Ea(t) {
  return typeof t == "object" ? Bu(t) : t ?? "";
}
const _l = [...` 	
\r\f \v\uFEFF`];
function Uu(t, e, n) {
  var r = t == null ? "" : "" + t;
  if (e && (r = r ? r + " " + e : e), n) {
    for (var i of Object.keys(n))
      if (n[i])
        r = r ? r + " " + i : i;
      else if (r.length)
        for (var a = i.length, l = 0; (l = r.indexOf(i, l)) >= 0; ) {
          var o = l + a;
          (l === 0 || _l.includes(r[l - 1])) && (o === r.length || _l.includes(r[o])) ? r = (l === 0 ? "" : r.substring(0, l)) + r.substring(o + 1) : l = o;
        }
  }
  return r === "" ? null : r;
}
function yl(t, e = !1) {
  var n = e ? " !important;" : ";", r = "";
  for (var i of Object.keys(t)) {
    var a = t[i];
    a != null && a !== "" && (r += " " + i + ": " + a + n);
  }
  return r;
}
function Hu(t, e) {
  if (e) {
    var n = "", r, i;
    return Array.isArray(e) ? (r = e[0], i = e[1]) : r = e, r && (n += yl(r)), i && (n += yl(i, !0)), n = n.trim(), n === "" ? null : n;
  }
  return String(t);
}
function Le(t, e, n, r, i, a) {
  var l = (
    /** @type {any} */
    t[va]
  );
  if (l !== n || l === void 0) {
    var o = Uu(n, r, a);
    o == null ? t.removeAttribute("class") : t.className = o, t[va] = n;
  } else if (a && i !== a)
    for (var u in a) {
      var f = !!a[u];
      (i == null || f !== !!i[u]) && t.classList.toggle(u, f);
    }
  return a;
}
function ra(t, e = {}, n, r) {
  for (var i in n) {
    var a = n[i];
    e[i] !== a && (n[i] == null ? t.style.removeProperty(i) : t.style.setProperty(i, a, r));
  }
}
function Tt(t, e, n, r) {
  var i = (
    /** @type {any} */
    t[fa]
  );
  if (i !== e) {
    var a = Hu(e, r);
    a == null ? t.removeAttribute("style") : t.style.cssText = a, t[fa] = e;
  } else r && (Array.isArray(r) ? (ra(t, n == null ? void 0 : n[0], r[0]), ra(t, n == null ? void 0 : n[1], r[1], "important")) : ra(t, n, r));
  return r;
}
function Ku(t, e) {
  e ? t.hasAttribute("selected") || t.setAttribute("selected", "") : t.removeAttribute("selected");
}
function Gu(t, e) {
  var n = t.__defaultValue, r = t.multiple, i = r ? n ?? [] : null;
  if (!(r && !ri(i))) {
    t.selectedIndex;
    for (var a of t.options) {
      var l = Ss(a);
      Ku(
        a,
        r ? (
          /** @type {any[]} */
          i.includes(l)
        ) : oo(l, n)
      );
    }
  }
}
function ci(t, e, n = !1) {
  if (t.multiple) {
    if (e == null)
      return;
    if (!ri(e))
      return Dc();
    for (var r of t.options)
      r.selected = e.includes(Ss(r));
    return;
  }
  for (r of t.options) {
    var i = Ss(r);
    if (oo(i, e)) {
      r.selected = !0;
      return;
    }
  }
  (!n || e !== void 0) && (t.selectedIndex = -1);
}
function pr(t) {
  var e = new MutationObserver((n) => {
    n.every(Vu) || ("__defaultValue" in t && Gu(t), "__value" in t && ci(t, t.__value));
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
  }), Ua(() => {
    e.disconnect();
  });
}
function kl(t, e, n = e) {
  var r = /* @__PURE__ */ new WeakSet(), i = !0;
  Ia(t, "change", (a) => {
    var l = a ? "[selected]" : ":checked", o;
    if (t.multiple)
      o = [].map.call(t.querySelectorAll(l), Ss);
    else {
      var u = t.querySelector(l) ?? // will fall back to first non-disabled option if no option is selected
      t.querySelector("option:not([disabled])");
      o = u && Ss(u);
    }
    n(o), t.__value = o, _e !== null && r.add(_e);
  }), Ha(() => {
    var a = e();
    if (t === document.activeElement) {
      var l = (
        /** @type {Batch} */
        _e
      );
      if (r.has(l))
        return;
    }
    if (ci(t, a, i), i && a === void 0) {
      var o = t.querySelector(":checked");
      o !== null && (a = Ss(o), n(a));
    }
    t.__value = a, i = !1;
  });
}
function Ss(t) {
  return "__value" in t ? t.__value : t.value;
}
function Vu(t) {
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
const Ju = Symbol("is custom element"), Yu = Symbol("is html"), Wu = yc ? "progress" : "PROGRESS";
function Xn(t, e) {
  var n = Ja(t);
  n.value === (n.value = // treat null and undefined the same for the initial value
  e ?? void 0) || // @ts-expect-error
  // `progress` elements always need their value set when it's `0`
  t.value === e && (e !== 0 || t.nodeName !== Wu) || (t.value = e ?? "");
}
function wl(t, e) {
  var n = Ja(t);
  n.checked !== (n.checked = // treat null and undefined the same for the initial value
  e ?? void 0) && (t.checked = e);
}
function ve(t, e, n, r) {
  var i = Ja(t);
  i[e] !== (i[e] = n) && (e === "loading" && (t[_c] = n), n == null ? t.removeAttribute(e) : typeof n != "string" && Xu(t).has(e) ? t[e] = n : t.setAttribute(e, n));
}
function Ja(t) {
  return (
    /** @type {Record<string | symbol, unknown>} **/
    /** @type {any} */
    t[mi] ?? (t[mi] = {
      [Ju]: t.nodeName.includes("-"),
      [Yu]: t.namespaceURI === Pc
    })
  );
}
var xl = /* @__PURE__ */ new Map();
function Xu(t) {
  var e = t.getAttribute("is") || t.nodeName, n = xl.get(e);
  if (n) return n;
  xl.set(e, n = /* @__PURE__ */ new Set());
  for (var r, i = t, a = Element.prototype; a !== i; ) {
    r = fc(i);
    for (var l in r)
      r[l].set && // better safe than sorry, we don't want spread attributes to mess with HTML content
      l !== "innerHTML" && l !== "textContent" && l !== "innerText" && n.add(l);
    i = Da(i);
  }
  return n;
}
function mn(t, e, n = e) {
  var r = /* @__PURE__ */ new WeakSet();
  Ia(t, "input", async (i) => {
    var a = i ? t.defaultValue : t.value;
    if (a = ia(t) ? aa(a) : a, n(a), _e !== null && r.add(_e), await wu(), a !== (a = e())) {
      var l = t.selectionStart, o = t.selectionEnd, u = t.value.length;
      if (t.value = a ?? "", o !== null) {
        var f = t.value.length;
        l === o && o === u && f > u ? (t.selectionStart = f, t.selectionEnd = f) : (t.selectionStart = l, t.selectionEnd = Math.min(o, f));
      }
    }
  }), // If we are hydrating and the value has since changed,
  // then use the updated value from the input instead.
  // If defaultValue is set, then value == defaultValue
  // TODO Svelte 6: remove input.value check and set to empty string?
  fs(e) == null && t.value && (n(ia(t) ? aa(t.value) : t.value), _e !== null && r.add(_e)), Vi(() => {
    var i = e();
    if (t === document.activeElement) {
      var a = (
        /** @type {Batch} */
        _e
      );
      if (r.has(a))
        return;
    }
    ia(t) && i === aa(t.value) || t.type === "date" && !i && !t.value || i !== t.value && (t.value = i ?? "");
  });
}
function Zu(t, e, n = e) {
  Ia(t, "change", (r) => {
    var i = r ? t.defaultChecked : t.checked;
    n(i);
  }), // If we are hydrating and the value has since changed,
  // then use the update value from the input instead.
  // If defaultChecked is set, then checked == defaultChecked
  fs(e) == null && n(t.checked), Vi(() => {
    var r = e();
    t.checked = !!r;
  });
}
function ia(t) {
  var e = t.type;
  return e === "number" || e === "range";
}
function aa(t) {
  return t === "" ? null : +t;
}
var In, Ns, wr, Bi, Co;
const Ui = class Ui {
  /** @param {ResizeObserverOptions} options */
  constructor(e) {
    U(this, Bi);
    /** */
    U(this, In, /* @__PURE__ */ new WeakMap());
    /** @type {ResizeObserver | undefined} */
    U(this, Ns);
    /** @type {ResizeObserverOptions} */
    U(this, wr);
    se(this, wr, e);
  }
  /**
   * @param {Element} element
   * @param {(entry: ResizeObserverEntry) => any} listener
   */
  observe(e, n) {
    var r = c(this, In).get(e) || /* @__PURE__ */ new Set();
    return r.add(n), c(this, In).set(e, r), ge(this, Bi, Co).call(this).observe(e, c(this, wr)), () => {
      var i = c(this, In).get(e);
      i.delete(n), i.size === 0 && (c(this, In).delete(e), c(this, Ns).unobserve(e));
    };
  }
};
In = new WeakMap(), Ns = new WeakMap(), wr = new WeakMap(), Bi = new WeakSet(), Co = function() {
  return c(this, Ns) ?? se(this, Ns, new ResizeObserver(
    /** @param {any} entries */
    (e) => {
      for (var n of e) {
        Ui.entries.set(n.target, n);
        for (var r of c(this, In).get(n.target) || [])
          r(n);
      }
    }
  ));
}, /** @static */
ft(Ui, "entries", /* @__PURE__ */ new WeakMap());
let Ma = Ui;
var Qu = /* @__PURE__ */ new Ma({
  box: "border-box"
});
function $u(t, e, n) {
  var r = Qu.observe(t, () => n(t[e]));
  Ha(() => (fs(() => n(t[e])), r));
}
function la(t, e) {
  return t === e || (t == null ? void 0 : t[is]) === e;
}
function zn(t = La(), e, n, r) {
  var i = (
    /** @type {ComponentContext} */
    xt.r
  ), a = (
    /** @type {Effect} */
    Fe
  );
  return Ha(() => {
    var l, o;
    return Vi(() => {
      l = o, o = (r == null ? void 0 : r()) || [], fs(() => {
        la(n(...o), t) || (e(t, ...o), l && la(n(...l), t) && e(null, ...l));
      });
    }), () => {
      let u = a;
      for (; u !== i && u.parent !== null && u.parent.f & Ci; )
        u = u.parent;
      const f = () => {
        o && la(n(...o), t) && e(null, ...o);
      }, _ = u.teardown;
      u.teardown = () => {
        f(), _ == null || _();
      };
    };
  }), t;
}
function Je(t, e, n, r) {
  var J;
  var i = !0, a = (n & Tc) !== 0, l = (n & Ac) !== 0, o = (
    /** @type {V} */
    r
  ), u = !0, f = (
    /** @type {Derived<V> | undefined} */
    void 0
  ), _ = () => l && i ? (f ?? (f = /* @__PURE__ */ vr(
    /** @type {() => V} */
    r
  )), s(f)) : (u && (u = !1, o = l ? fs(
    /** @type {() => V} */
    r
  ) : (
    /** @type {V} */
    r
  )), o);
  let S;
  if (a) {
    var g = is in t || mc in t;
    S = ((J = ws(t, e)) == null ? void 0 : J.set) ?? (g && e in t ? (L) => t[e] = L : void 0);
  }
  var p, b = !1;
  a ? [p, b] = Zc(() => (
    /** @type {V} */
    t[e]
  )) : p = /** @type {V} */
  t[e], p === void 0 && r !== void 0 && (p = _(), S && (Hc(), S(p)));
  var M;
  if (M = () => {
    var L = (
      /** @type {V} */
      t[e]
    );
    return L === void 0 ? _() : (u = !0, L);
  }, (n & Mc) === 0)
    return M;
  if (S) {
    var k = t.$$legacy;
    return (
      /** @type {() => V} */
      (function(L, G) {
        return arguments.length > 0 ? ((!G || k || b) && S(G ? M() : L), L) : M();
      })
    );
  }
  var C = !1, O = ((n & Ec) !== 0 ? vr : Ql)(() => (C = !1, M()));
  a && s(O);
  var D = (
    /** @type {Effect} */
    Fe
  );
  return (
    /** @type {() => V} */
    (function(L, G) {
      if (arguments.length > 0) {
        const R = G ? s(O) : a ? $e(L) : L;
        return m(O, R), C = !0, o !== void 0 && (o = R), L;
      }
      return Pn && C || (D.f & Nt) !== 0 ? O.v : s(O);
    })
  );
}
function hs(t) {
  xt === null && Rc(), _t(() => {
    const e = fs(t);
    if (typeof e == "function") return (
      /** @type {() => void} */
      e
    );
  });
}
const ed = "5";
var Rl;
typeof window < "u" && ((Rl = window.__svelte ?? (window.__svelte = {})).v ?? (Rl.v = /* @__PURE__ */ new Set())).add(ed);
var td = /* @__PURE__ */ Au('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="svelte-13so817"><path></path></svg>');
function K(t, e) {
  let n = Je(e, "name", 3, "blocks"), r = Je(e, "size", 3, 16), i = Je(e, "fa", 3, "");
  const a = {
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
  }, o = /* @__PURE__ */ re(() => a[i() ? l[i()] || "blocks" : n()] || a.blocks);
  var u = td(), f = Z(u);
  z(() => {
    ve(u, "width", r()), ve(u, "height", r()), ve(f, "d", s(o));
  }), y(t, u);
}
const Oo = ["anchor", "background", "bg_color", "text_color", "spacing", "width", "align", "class", "reveal", "hidden", "hide_on"], nd = ["mobile", "tablet", "desktop"], sd = ["text", "textarea", "markdown"], gr = (t) => !!t && sd.includes(t.type || "text"), rd = (t) => !!t && (t.type || "text") === "text" && !/(^|_)url$/.test(t.name || "");
function Es(t) {
  let e = t == null ? void 0 : t.hide_on;
  if (typeof e == "string" ? e = e.split(",") : e && typeof e == "object" && !Array.isArray(e) && (e = Object.keys(e).filter((r) => e[r])), !Array.isArray(e)) return [];
  const n = new Set(e.map((r) => String(r).trim().toLowerCase()));
  return nd.filter((r) => n.has(r));
}
const Gs = (t) => t === void 0 ? void 0 : JSON.parse(JSON.stringify(t));
function Po(t, e = Oo) {
  if (!t || typeof t != "object" || typeof t.type != "string") return null;
  const { type: n } = t, r = t[n], i = r !== null && typeof r == "object" && !Array.isArray(r);
  if (!i && e === null) return Gs(t);
  const a = { type: n }, l = {};
  for (const [o, u] of Object.entries(t))
    o === "type" || o === n || (i || (e || []).includes(o) ? a[o] = u : l[o] = u);
  return a[n] = i ? r : l, a;
}
function kn(t, e) {
  return Array.isArray(t) ? t.map((n) => Po(n, e)).filter(Boolean) : [];
}
function zo(t) {
  if (t.default !== void 0)
    return Do(t) ? t.default === !0 || t.default === 1 || t.default === "1" : Gs(t.default);
  if (t.type === "list") return [];
  if (t.type === "toggle") return !1;
}
const Do = (t) => {
  var e;
  return (t == null ? void 0 : t.type) === "toggle" || ((e = t == null ? void 0 : t.validate) == null ? void 0 : e.type) === "bool";
}, id = (t) => {
  var e;
  return (t == null ? void 0 : t.type) === "number" || ((e = t == null ? void 0 : t.validate) == null ? void 0 : e.type) === "int";
}, Ji = (t) => t === "" || t === null || t === void 0 || Array.isArray(t) && t.length === 0;
function Si(t, e, n) {
  return Ji(n) ? e in t ? (delete t[e], !0) : !1 : t[e] === n ? !1 : (t[e] = n, !0);
}
function No(t, e = "item") {
  const n = {}, r = (t == null ? void 0 : t.fields) || [];
  for (const a of r) {
    const l = zo(a);
    Ji(l) || (n[a.name] = l);
  }
  t != null && t.new_item && typeof t.new_item == "object" && !Array.isArray(t.new_item) && Object.assign(n, Gs(t.new_item));
  let i = !0;
  for (const a of r) {
    if (n[a.name] !== void 0) {
      gr(a) && (i = !1);
      continue;
    }
    if (/(^|_)url$/.test(a.name)) {
      n[a.name] = "#";
      continue;
    }
    gr(a) && (n[a.name] = i ? `New ${e}` : String(a.label || a.name).replace(/\s*\(.*\)\s*$/, ""), i = !1);
  }
  return n;
}
function Sl(t, e = !0) {
  const n = {}, r = e && t.example && typeof t.example == "object" ? Po(t.example) : null;
  r && Object.assign(n, Gs(r[t.type]));
  for (const a of t.fields || [])
    if (n[a.name] === void 0) {
      const l = zo(a);
      Ji(l) || (n[a.name] = l);
    }
  const i = { type: t.type };
  if (r)
    for (const [a, l] of Object.entries(r)) a !== "type" && a !== t.type && (i[a] = Gs(l));
  return i[t.type] = n, i;
}
const Ta = (t) => String(t).replace(/[*_`#>]/g, "").trim();
function Ya(t, e = null) {
  const n = t && t[t.type] || {};
  if (e != null && e.fields)
    for (const a of e.fields) {
      const l = n[a.name];
      if (gr(a) && typeof l == "string" && l.trim()) return Ta(l).slice(0, 70);
    }
  const r = n.heading || n.title || n.name || n.eyebrow || n.text || n.question || n.url || "";
  if (r) return Ta(r).slice(0, 70);
  const i = Array.isArray(n.items) && n.items[0];
  return i ? String(i.title || i.name || i.question || "").slice(0, 70) : "";
}
function ad(t, e, n) {
  if (t && typeof t == "object")
    for (const r of e || []) {
      const i = t[r.name];
      if (typeof i == "string" && i.trim() && gr(r)) return Ta(i).slice(0, 60);
    }
  return `Item ${n + 1}`;
}
function El(t) {
  return Gs(t);
}
function ld(t = window.location.pathname) {
  const e = decodeURIComponent(t);
  let n = e.match(/\/pages\/edit\/(.+?)\/?$/);
  return n ? { kind: "page", route: "/" + n[1] } : (n = e.match(/\/flex-objects\/([^/]+)\/([^/]+)\/?$/), n ? { kind: "flex", type: n[1], key: n[2] === "new" ? null : n[2] } : { kind: "unknown" });
}
const Ml = {
  hero: "Hero",
  content: "Content",
  media: "Media",
  "social-proof": "Social proof",
  commerce: "Commerce",
  dynamic: "Dynamic",
  forms: "Forms",
  layout: "Layout"
};
function od() {
  const t = (window.__GRAV_API_SERVER_URL || "").replace(/\/$/, ""), e = window.__GRAV_API_PREFIX || "/api/v1";
  return t + e;
}
function cd(t = {}) {
  const e = { Accept: "application/json", ...t };
  return window.__GRAV_API_TOKEN && (e["X-API-Token"] = window.__GRAV_API_TOKEN), window.__GRAV_ENVIRONMENT && (e["X-Grav-Environment"] = window.__GRAV_ENVIRONMENT), e;
}
async function ht(t, e, n, r = {}) {
  var o;
  const i = { method: t, headers: cd(), credentials: "same-origin", ...r };
  n instanceof FormData ? i.body = n : n !== void 0 && (i.headers["Content-Type"] = "application/json", i.body = JSON.stringify(n));
  const a = await fetch(od() + e, i);
  if (a.status === 204) return null;
  const l = await a.json().catch(() => ({}));
  if (!a.ok) {
    const u = ((o = l == null ? void 0 : l.error) == null ? void 0 : o.message) || (l == null ? void 0 : l.message) || (l == null ? void 0 : l.detail) || `Request failed (${a.status})`, f = new Error(u);
    throw f.status = a.status, f;
  }
  return l && typeof l == "object" && "data" in l ? l.data : l;
}
function ud(t) {
  return String(t || "").replace(/^\/+/, "").split("/").map(encodeURIComponent).join("/");
}
function wn(t) {
  return t.kind === "flex" ? { context: "flex", type: t.type, key: t.key } : t.kind === "section" ? { context: "section", id: t.id } : { context: "page", route: t.route };
}
function Tl(t) {
  return t.kind === "flex" ? `/flex-objects/${encodeURIComponent(t.type)}/${encodeURIComponent(t.key)}/media` : `/pages/${ud(t.route)}/media`;
}
const We = {
  blocks: () => ht("GET", "/maw-builder/blocks"),
  patterns: () => ht("GET", "/maw-builder/patterns"),
  savePattern: (t) => ht("POST", "/maw-builder/patterns", t),
  deletePattern: (t) => ht("DELETE", "/maw-builder/patterns/" + encodeURIComponent(t)),
  /** ctx: {kind:'page', route} | {kind:'flex', type, key} | {kind:'section', id} */
  preview: (t, e, n) => ht("POST", "/maw-builder/preview", { ...wn(t), blocks: e, field: n }),
  /** Media stored with the page or Flex object being edited (global sections have none: they use the site library). */
  ownMedia: (t) => t.kind === "section" ? Promise.resolve([]) : ht("GET", Tl(t)),
  /** What's saved on the server: {modified, matches (when blocks are given), saved_by}. */
  state: (t, e, n) => ht("POST", "/maw-builder/state", { ...wn(t), field: e, ...n ? { blocks: n } : {} }),
  /** Presence heartbeat: {you, editors: [other sessions], modified, saved_by}. */
  presence: (t, e, n) => ht("POST", "/maw-builder/presence", { ...wn(t), session: e, editing: n }),
  /** Sent while the page may be unloading: keepalive lets it finish. */
  releasePresence: (t, e) => ht("DELETE", "/maw-builder/presence?" + new URLSearchParams({ ...wn(t), session: e }), void 0, { keepalive: !0 }),
  /** Copy media files referenced by pasted blocks: {copied, skipped, missing, refused}. */
  copyMedia: (t, e, n) => ht("POST", "/maw-builder/media/copy", { from: t, to: wn(e), files: n }),
  revisions: (t) => ht("GET", "/maw-builder/revisions?" + new URLSearchParams(wn(t))),
  revision: (t, e) => ht("GET", `/maw-builder/revisions/${encodeURIComponent(e)}?` + new URLSearchParams(wn(t))),
  sections: () => ht("GET", "/maw-builder/sections"),
  section: (t) => ht("GET", `/maw-builder/sections/${encodeURIComponent(t)}`),
  createSection: (t, e) => ht("POST", "/maw-builder/sections", { title: t, blocks: e }),
  updateSection: (t, e, n = !1) => ht("PATCH", `/maw-builder/sections/${encodeURIComponent(t)}${n ? "?force=1" : ""}`, e),
  deleteSection: (t, e = !1) => ht("DELETE", `/maw-builder/sections/${encodeURIComponent(t)}${e ? "?force=1" : ""}`),
  uploadOwnMedia: (t, e) => {
    const n = new FormData();
    return [...e].forEach((r) => n.append("files[]", r)), ht("POST", Tl(t), n);
  },
  siteMedia: (t = "", e = "") => {
    const n = new URLSearchParams({ per_page: "200" });
    return t && n.set("path", t), e && n.set("search", e), ht("GET", `/media?${n}`);
  },
  uploadSiteMedia: (t, e = "") => {
    const n = new FormData();
    return [...t].forEach((r) => n.append("files[]", r)), ht("POST", `/media${e ? "?path=" + encodeURIComponent(e) : ""}`, n);
  }
}, dd = 15e3, vd = () => crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).slice(2, 12);
var xr, Sr, Er, Mr, ns, Mn, Ls, Rs, Tr, Ar, Is, Ei;
class fd {
  constructor(e) {
    U(this, Is);
    U(this, xr, /* @__PURE__ */ q($e(
      []
      // other live sessions [{session, user, fullname, since, editing}]
    )));
    U(this, Sr, /* @__PURE__ */ q(null));
    U(this, Er, /* @__PURE__ */ q(null));
    ft(this, "me", "");
    U(this, Mr, vd());
    U(this, ns, 0);
    U(this, Mn, null);
    U(this, Ls, /* @__PURE__ */ new Set());
    U(this, Rs, !1);
    U(this, Tr, "");
    U(this, Ar, () => ge(this, Is, Ei).call(this));
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
    return this.store.open && !this.store.readOnly && !c(this, Rs);
  }
  start() {
    c(this, ns) || (this.beat(), se(this, ns, setInterval(() => this.beat(), dd)), window.addEventListener("pagehide", c(this, Ar)));
  }
  stop() {
    clearInterval(c(this, ns)), se(this, ns, 0), window.removeEventListener("pagehide", c(this, Ar)), ge(this, Is, Ei).call(this);
  }
  async beat() {
    const e = this.store;
    if (!e.canPreview) return;
    const n = e.ownerKey, r = Vn(e.context);
    c(this, Mn) && c(this, Mn).key !== n && (ge(this, Is, Ei).call(this), c(this, Ls).clear(), this.others = [], this.stale = null), se(this, Mn, { key: n, ctx: r });
    let i;
    try {
      i = await We.presence(r, c(this, Mr), this.editing);
    } catch {
      return;
    }
    if (n !== e.ownerKey) return;
    this.me = i.you || "";
    const a = i.editors || [];
    if (this.editing) {
      const o = a.find((u) => u.editing && !c(this, Ls).has(u.session));
      o && (this.joined = o);
    }
    if (se(this, Ls, new Set(a.filter((o) => o.editing).map((o) => o.session))), this.others = a, e.saving || !i.modified || !e.baseModified || i.modified <= e.baseModified) return;
    const l = i.modified + ":" + JSON.stringify(e.snapshot());
    if (l !== c(this, Tr)) {
      if (se(this, Tr, l), await e.adoptSaved()) {
        this.stale && this.stale.modified <= e.baseModified && (this.stale = null);
        return;
      }
      if (n !== e.ownerKey) return;
    }
    e.open && !(this.stale && this.stale.modified === i.modified) && (this.stale = {
      by: i.saved_by && i.saved_by !== this.me ? i.saved_by : "",
      modified: i.modified
    });
  }
  /** Builder opened: start read-only when someone else is already editing. */
  async claim() {
    se(this, Rs, !0), this.joined = null, await this.beat(), se(this, Rs, !1), this.store.readOnly = this.editors.length > 0, this.store.readOnly || await this.beat();
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
xr = new WeakMap(), Sr = new WeakMap(), Er = new WeakMap(), Mr = new WeakMap(), ns = new WeakMap(), Mn = new WeakMap(), Ls = new WeakMap(), Rs = new WeakMap(), Tr = new WeakMap(), Ar = new WeakMap(), Is = new WeakSet(), Ei = function() {
  c(this, Mn) && We.releasePresence(c(this, Mn).ctx, c(this, Mr)).catch(() => {
  }), se(this, Mn, null);
};
function Ms(t) {
  const e = String((t == null ? void 0 : t.fullname) || (t == null ? void 0 : t.user) || "?"), n = e.split(/\s+/).filter(Boolean).slice(0, 2).map((i) => i[0].toUpperCase()).join("") || "?";
  let r = 0;
  for (const i of String((t == null ? void 0 : t.user) || e)) r = r * 31 + i.charCodeAt(0) | 0;
  return { initials: n, color: `hsl(${Math.abs(r) % 360} 60% 42%)`, name: e };
}
var hd = /* @__PURE__ */ x('<span class="err svelte-1uadtto"> </span>'), pd = /* @__PURE__ */ x('<span class="avatar svelte-1uadtto"> </span>'), gd = /* @__PURE__ */ x('<p><!> <span class="svelte-1uadtto"><!></span></p>'), bd = /* @__PURE__ */ x('<p class="warn svelte-1uadtto"> </p>'), md = /* @__PURE__ */ x('<span class="badge svelte-1uadtto">Hidden</span>'), _d = /* @__PURE__ */ x('<span class="badge svelte-1uadtto"> </span>'), yd = /* @__PURE__ */ x('<li draggable="true"><span class="grip svelte-1uadtto"><!></span> <span class="ico svelte-1uadtto"><!></span> <button type="button" class="row svelte-1uadtto"><strong class="svelte-1uadtto"> </strong> <span class="text svelte-1uadtto"> </span></button> <!></li>'), kd = /* @__PURE__ */ x('<ol class="svelte-1uadtto"></ol>'), wd = /* @__PURE__ */ x('<button type="button" class="empty svelte-1uadtto"><!> <span>Start building. Add your first section in the visual builder.</span></button>'), xd = /* @__PURE__ */ x('<div class="summary svelte-1uadtto"><header class="svelte-1uadtto"><div><div class="title svelte-1uadtto"> </div> <div class="sub svelte-1uadtto"><!></div></div> <button type="button" class="mb-btn primary"><!> Open Visual Builder</button></header> <!> <!> <!></div>');
function Sd(t, e) {
  ot(e, !0);
  let n = /* @__PURE__ */ q(-1), r = /* @__PURE__ */ q(-1);
  const i = /* @__PURE__ */ re(() => {
    var T;
    return ((T = e.field) == null ? void 0 : T.label) || "Blocks";
  });
  function a(T) {
    s(n) >= 0 && T !== s(n) && e.store.move(s(n), T), m(n, -1), m(r, -1);
  }
  var l = xd(), o = h(l), u = h(o), f = h(u), _ = Z(f, !0), S = d(f, 2), g = h(S);
  {
    var p = (T) => {
      var I = hd(), v = Z(I, !0);
      z(() => F(v, e.store.loadError)), y(T, I);
    }, b = (T) => {
      var I = nn();
      z(() => F(I, `${e.store.blocks.length ?? ""} ${e.store.blocks.length === 1 ? "section" : "sections"} · drag to reorder, click to edit`)), y(T, I);
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
      const I = /* @__PURE__ */ re(() => e.store.presence.editors);
      var v = gd();
      let w;
      var j = h(v);
      qe(j, 17, () => e.store.presence.others.slice(0, 5), (N) => N.session, (N, $) => {
        const Q = /* @__PURE__ */ re(() => Ms(s($)));
        var te = pd();
        let ke;
        var we = Z(te, !0);
        z(() => {
          ve(te, "title", s(Q).name), ke = Tt(te, "", ke, { background: s(Q).color }), F(we, s(Q).initials);
        }), y(N, te);
      });
      var fe = d(j, 2), ce = h(fe);
      {
        var oe = (N) => {
          var $ = nn();
          z((Q) => F($, `${Q ?? ""} ${s(I).length === 1 ? "is" : "are"} editing in the visual builder. Opening it starts read-only.`), [() => s(I).map((Q) => Ms(Q).name).join(", ")]), y(N, $);
        }, A = (N) => {
          var $ = nn();
          z((Q) => F($, `${Q ?? ""} also ${e.store.presence.others.length === 1 ? "has" : "have"} this open.`), [
            () => e.store.presence.others.map((Q) => Ms(Q).name).join(", ")
          ]), y(N, $);
        };
        B(ce, (N) => {
          s(I).length ? N(oe) : N(A, -1);
        });
      }
      z(() => w = Le(v, 1, "presence svelte-1uadtto", null, w, { editing: s(I).length })), y(T, v);
    };
    B(C, (T) => {
      var I;
      (I = e.store.presence) != null && I.others.length && T(O);
    });
  }
  var D = d(C, 2);
  {
    var J = (T) => {
      var I = bd(), v = Z(I, !0);
      z(() => F(v, e.store.isFlex ? "Save this item first. The visual builder previews saved items." : "Save the page first. The visual builder needs a page URL to preview.")), y(T, I);
    };
    B(D, (T) => {
      e.store.canPreview || T(J);
    });
  }
  var L = d(D, 2);
  {
    var G = (T) => {
      var I = kd();
      qe(I, 23, () => e.store.blocks, (v, w) => w + ":" + v.type, (v, w, j) => {
        const fe = /* @__PURE__ */ re(() => e.store.defFor(s(w).type));
        var ce = yd();
        let oe;
        var A = h(ce), N = h(A);
        K(N, { name: "grip", size: 14 });
        var $ = d(A, 2), Q = h($);
        {
          let he = /* @__PURE__ */ re(() => {
            var ie;
            return ((ie = s(fe)) == null ? void 0 : ie.icon) || "fa-square";
          });
          K(Q, {
            get fa() {
              return s(he);
            },
            size: 15
          });
        }
        var te = d($, 2), ke = h(te), we = Z(ke, !0), le = d(ke, 2), me = Z(le, !0), ze = d(te, 2);
        {
          var W = (he) => {
            var ie = md();
            y(he, ie);
          }, Y = (he) => {
            var ie = _d(), ue = Z(ie);
            z((de) => F(ue, `Hidden on ${de ?? ""}`), [() => Es(s(w)).join(", ")]), y(he, ie);
          }, be = /* @__PURE__ */ re(() => Es(s(w)).length);
          B(ze, (he) => {
            s(w).hidden ? he(W) : s(be) && he(Y, 1);
          });
        }
        z(
          (he) => {
            var ie;
            oe = Le(ce, 1, "svelte-1uadtto", null, oe, {
              over: s(r) === s(j),
              "hidden-block": s(w).hidden
            }), F(we, ((ie = s(fe)) == null ? void 0 : ie.title) || s(w).type), F(me, he);
          },
          [
            () => {
              var he;
              return s(w).type === "global" ? e.store.sectionTitle((he = s(w).global) == null ? void 0 : he.section) : Ya(s(w));
            }
          ]
        ), tt("dragstart", ce, () => m(n, s(j), !0)), tt("dragover", ce, (he) => {
          he.preventDefault(), m(r, s(j), !0);
        }), tt("dragleave", ce, () => m(r, -1)), tt("drop", ce, () => a(s(j))), tt("dragend", ce, () => {
          m(n, -1), m(r, -1);
        }), P("click", te, () => e.openBuilder(s(j))), y(v, ce);
      }), y(T, I);
    }, R = (T) => {
      var I = wd(), v = h(I);
      K(v, { name: "plus", size: 18 }), z(() => I.disabled = !e.store.canPreview), P("click", I, () => e.openBuilder(-1)), y(T, I);
    };
    B(L, (T) => {
      e.store.blocks.length ? T(G) : T(R, -1);
    });
  }
  z(() => {
    F(_, s(i)), M.disabled = !e.store.canPreview;
  }), P("click", M, () => e.openBuilder(-1)), y(t, l), ct();
}
pt(["click"]);
var Ed = /* @__PURE__ */ x('<button type="button" class="card svelte-1cvfiky" draggable="true"><span class="ico svelte-1cvfiky"><!></span> <span class="name svelte-1cvfiky"> </span></button>'), Md = /* @__PURE__ */ x('<section class="svelte-1cvfiky"><h3 class="svelte-1cvfiky"> </h3> <div class="grid svelte-1cvfiky"></div></section>'), Td = /* @__PURE__ */ x('<p class="hint svelte-1cvfiky"> </p>'), Ad = /* @__PURE__ */ x('<div class="search svelte-1cvfiky"><!> <input type="search" placeholder="Search blocks" aria-label="Search blocks" class="svelte-1cvfiky"/></div> <p class="hint svelte-1cvfiky"> </p> <!>', 1);
function Cd(t, e) {
  ot(e, !0);
  let n = Je(e, "store", 7), r = /* @__PURE__ */ q("");
  const i = /* @__PURE__ */ re(() => {
    var O;
    const b = s(r).trim().toLowerCase(), M = (((O = n().catalog) == null ? void 0 : O.blocks) || []).filter((D) => !D.virtual).filter((D) => !b || D.title.toLowerCase().includes(b) || D.type.includes(b) || (D.description || "").toLowerCase().includes(b)), k = Object.keys(Ml), C = /* @__PURE__ */ new Map();
    for (const D of M)
      C.has(D.category) || C.set(D.category, []), C.get(D.category).push(D);
    return [...C.entries()].sort((D, J) => {
      const L = k.indexOf(D[0]), G = k.indexOf(J[0]);
      return (L < 0 ? 99 : L) - (G < 0 ? 99 : G);
    });
  });
  function a(b, M) {
    b.dataTransfer.setData("application/x-maw-block", M), b.dataTransfer.setData("text/plain", M), b.dataTransfer.effectAllowed = "copy", requestAnimationFrame(() => n().dragType = M);
  }
  function l() {
    n().dragType = "";
  }
  var o = Ad(), u = Te(o), f = h(u);
  K(f, { name: "search", size: 14 });
  var _ = d(f, 2), S = d(u, 2), g = Z(S), p = d(S, 2);
  qe(
    p,
    17,
    () => s(i),
    ([b, M]) => b,
    (b, M) => {
      var k = /* @__PURE__ */ re(() => Ki(s(M), 2));
      let C = () => s(k)[0], O = () => s(k)[1];
      var D = Md(), J = h(D), L = Z(J, !0), G = d(J, 2);
      qe(G, 21, O, (R) => R.type, (R, T) => {
        var I = Ed(), v = h(I), w = h(v);
        K(w, {
          get fa() {
            return s(T).icon;
          },
          size: 18
        });
        var j = d(v, 2), fe = Z(j, !0);
        z(() => {
          ve(I, "title", s(T).description), F(fe, s(T).title);
        }), tt("dragstart", I, (ce) => a(ce, s(T).type)), tt("dragend", I, l), P("click", I, () => n().insert(s(T).type)), y(R, I);
      }), z(() => F(L, Ml[C()] || C())), y(b, D);
    },
    (b) => {
      var M = Td(), k = Z(M);
      z(() => F(k, `No blocks match “${s(r) ?? ""}”.`)), y(b, M);
    }
  ), z(() => F(g, `${n().selected >= 0 ? `Inserts after block ${n().selected + 1}` : "Inserts at the end of the page"} · or drag onto the page`)), mn(_, () => s(r), (b) => m(r, b)), y(t, o), ct();
}
pt(["click"]);
var Od = /* @__PURE__ */ x('<button type="button"><!> </button>'), Pd = /* @__PURE__ */ x('<div role="group"></div>');
function Vs(t, e) {
  ot(e, !0);
  let n = Je(e, "options", 19, () => []), r = Je(e, "label", 3, ""), i = Je(e, "size", 3, "");
  var a = Pd();
  let l;
  qe(a, 21, n, (o) => o.value, (o, u) => {
    var f = Od();
    let _;
    var S = h(f);
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
      ve(f, "aria-pressed", e.value === s(u).value), f.disabled = s(u).disabled, ve(f, "title", s(u).title || null), _ = Le(f, 1, "", null, _, { active: e.value === s(u).value }), F(p, s(u).label);
    }), P("click", f, () => {
      var b;
      return e.value !== s(u).value && ((b = e.onchange) == null ? void 0 : b.call(e, s(u).value));
    }), y(o, f);
  }), z(() => {
    l = Le(a, 1, "mb-seg", null, l, { sm: i() === "sm" }), ve(a, "aria-label", r());
  }), y(t, a), ct();
}
pt(["click"]);
var zd = /* @__PURE__ */ x('<div class="global svelte-k3gmal"><span class="gico svelte-k3gmal"><!></span> <div class="meta svelte-k3gmal"><strong class="svelte-k3gmal"> </strong> <span class="svelte-k3gmal"> </span></div> <div class="acts svelte-k3gmal"><button type="button" class="mb-btn sm primary" title="Insert on this page"><!> Insert</button> <button type="button" class="mb-btn sm" title="Edit this global section"><!></button></div></div>'), Dd = /* @__PURE__ */ x('<p class="empty svelte-k3gmal">No global sections yet. Select a block, open its <strong>Advanced</strong> tab and click <strong>Make global section</strong>.</p>'), Nd = /* @__PURE__ */ x('<p class="hint svelte-k3gmal">Global sections are edited once and update on every page that uses them. Inserting one places a live reference, not a copy.</p> <!>', 1), Ld = /* @__PURE__ */ x("<span></span>"), Rd = /* @__PURE__ */ x('<button type="button" class="mb-btn ghost icon sm del svelte-k3gmal" title="Delete pattern"><!></button>'), Id = /* @__PURE__ */ x('<div><button type="button" class="preview svelte-k3gmal"><div class="mini svelte-k3gmal"></div> <div class="pmeta svelte-k3gmal"><strong class="svelte-k3gmal"> </strong> <span class="svelte-k3gmal"> </span></div></button> <!></div>'), jd = /* @__PURE__ */ x('<p class="empty svelte-k3gmal"> </p>'), qd = /* @__PURE__ */ x('<div class="filter svelte-k3gmal"><!></div> <!>', 1);
function Fd(t, e) {
  ot(e, !0);
  let n = /* @__PURE__ */ q("section");
  const r = /* @__PURE__ */ re(() => e.store.patterns.filter((b) => b.category === s(n)));
  async function i(b) {
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
  async function a(b) {
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
  var u = qd(), f = Te(u), _ = h(f);
  {
    let b = /* @__PURE__ */ re(() => [
      { value: "section", label: "Sections" },
      { value: "page", label: "Layouts" },
      ...e.store.isSection ? [] : [{ value: "global", label: "Global", icon: "globe" }]
    ]);
    Vs(_, {
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
  var S = d(f, 2);
  {
    var g = (b) => {
      var M = Nd(), k = d(Te(M), 2);
      qe(
        k,
        17,
        () => e.store.sections,
        (C) => C.id,
        (C, O) => {
          var D = zd(), J = h(D), L = h(J);
          K(L, { name: "globe", size: 16 });
          var G = d(J, 2), R = h(G), T = Z(R, !0), I = d(R, 2), v = Z(I), w = d(G, 2), j = h(w), fe = h(j);
          K(fe, { name: "plus", size: 12 });
          var ce = d(j, 2), oe = h(ce);
          K(oe, { name: "edit", size: 12 }), z(() => {
            F(T, s(O).title), F(v, `${s(O).count ?? ""} ${s(O).count === 1 ? "block" : "blocks"}${s(O).updated_by ? ` · edited by ${s(O).updated_by}` : ""}`);
          }), P("click", j, () => e.store.insertGlobal(s(O).id)), P("click", ce, () => l(s(O))), y(C, D);
        },
        (C) => {
          var O = Dd();
          y(C, O);
        }
      ), y(b, M);
    }, p = (b) => {
      var M = At(), k = Te(M);
      qe(
        k,
        17,
        () => s(r),
        (C) => C.id,
        (C, O) => {
          const D = /* @__PURE__ */ re(() => {
            var oe;
            return ((oe = s(O).unknown) == null ? void 0 : oe.length) > 0;
          });
          var J = Id();
          let L;
          var G = h(J), R = h(G);
          qe(R, 21, () => s(O).blocks.slice(0, 6), wt, (oe, A) => {
            var N = Ld();
            let $;
            z(() => $ = Le(N, 1, `bar ${s(A).type ?? ""}`, "svelte-k3gmal", $, {
              accent: s(A).background === "accent" || s(A).type === "cta",
              alt: s(A).background === "alt" || s(A).background === "soft",
              dark: s(A).background === "dark"
            })), y(oe, N);
          });
          var T = d(R, 2), I = h(T), v = Z(I, !0), w = d(I, 2), j = Z(w, !0), fe = d(G, 2);
          {
            var ce = (oe) => {
              var A = Rd(), N = h(A);
              K(N, { name: "trash", size: 13 }), P("click", A, () => a(s(O))), y(oe, A);
            };
            B(fe, (oe) => {
              s(O).source === "user" && oe(ce);
            });
          }
          z(
            (oe, A) => {
              L = Le(J, 1, "pattern svelte-k3gmal", null, L, { unusable: s(D) }), G.disabled = s(D), ve(G, "title", oe), F(v, s(O).title), F(j, A);
            },
            [
              () => s(D) ? `Uses block types this theme does not have: ${s(O).unknown.join(", ")}` : "Insert pattern",
              () => s(D) ? `Needs block types this theme lacks: ${s(O).unknown.join(", ")}` : s(O).description || s(O).blocks.map((oe) => o(oe.type)).join(" · ")
            ]
          ), P("click", G, () => i(s(O))), y(C, J);
        },
        (C) => {
          var O = jd(), D = Z(O);
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
pt(["click"]);
var Bd = /* @__PURE__ */ x('<p class="empty svelte-1jf4jiu">This page has no blocks yet. Add one from the Blocks tab.</p>'), Ud = /* @__PURE__ */ x('<span class="count svelte-1jf4jiu"> </span>'), Hd = /* @__PURE__ */ x('<div class="tools svelte-1jf4jiu"><button type="button" class="mb-btn sm ghost" title="Select all (Ctrl+A)"><!> Select all</button> <!> <span class="spacer svelte-1jf4jiu"></span> <button type="button" class="mb-btn sm ghost" title="Copy (Ctrl+C)"><!> Copy</button> <button type="button" class="mb-btn sm ghost" title="Paste after the selection (Ctrl+V)"><!> Paste</button></div>'), Kd = /* @__PURE__ */ x('<span class="dev-off svelte-1jf4jiu"></span>'), Gd = /* @__PURE__ */ x('<li><span class="grip svelte-1jf4jiu"><!></span> <button type="button" class="row svelte-1jf4jiu" title="Click to select · Shift+click for a range · Ctrl/Cmd+click to add"><!> <span class="t svelte-1jf4jiu"> </span> <span class="s svelte-1jf4jiu"> </span> <!></button> <span class="actions svelte-1jf4jiu"><button type="button" class="mb-btn ghost icon sm"><!></button> <button type="button" class="mb-btn ghost icon sm" title="Duplicate"><!></button> <button type="button" class="mb-btn ghost icon sm danger" title="Delete"><!></button></span></li>'), Vd = /* @__PURE__ */ x('<!> <ol class="svelte-1jf4jiu"></ol>', 1);
function Jd(t, e) {
  ot(e, !0);
  const n = { mobile: "phone", tablet: "tablet", desktop: "monitor" };
  let r = /* @__PURE__ */ q(-1), i = /* @__PURE__ */ q(-1);
  function a(g, p) {
    g.shiftKey ? e.store.rangeSelect(p) : g.ctrlKey || g.metaKey ? e.store.toggleSelect(p) : e.store.select(p);
  }
  function l(g) {
    s(r) >= 0 && e.store.move(s(r), g), m(r, m(i, -1), !0);
  }
  var o = Vd(), u = Te(o);
  {
    var f = (g) => {
      var p = Bd();
      y(g, p);
    }, _ = (g) => {
      var p = Hd(), b = h(p), M = h(b);
      K(M, { name: "select", size: 12 });
      var k = d(b, 2);
      {
        var C = (G) => {
          var R = Ud(), T = Z(R);
          z(() => F(T, `${e.store.selection.length ?? ""} selected`)), y(G, R);
        };
        B(k, (G) => {
          e.store.selection.length > 1 && G(C);
        });
      }
      var O = d(k, 4), D = h(O);
      K(D, { name: "copy", size: 12 });
      var J = d(O, 2), L = h(J);
      K(L, { name: "clipboard", size: 12 }), z(() => {
        O.disabled = e.store.selected < 0, J.disabled = !e.store.clipboardAvailable || e.store.readOnly;
      }), P("click", b, () => e.store.selectAll()), P("click", O, () => e.store.copyBlocks()), P("click", J, () => e.store.pasteBlocks()), y(g, p);
    };
    B(u, (g) => {
      e.store.blocks.length ? g(_, -1) : g(f);
    });
  }
  var S = d(u, 2);
  qe(S, 23, () => e.store.blocks, (g, p) => p + g.type, (g, p, b) => {
    const M = /* @__PURE__ */ re(() => e.store.defFor(s(p).type));
    var k = Gd();
    let C;
    var O = h(k), D = h(O);
    K(D, { name: "grip", size: 13 });
    var J = d(O, 2), L = h(J);
    {
      let te = /* @__PURE__ */ re(() => {
        var ke;
        return (ke = s(M)) == null ? void 0 : ke.icon;
      });
      K(L, {
        get fa() {
          return s(te);
        },
        size: 14
      });
    }
    var G = d(L, 2), R = Z(G, !0), T = d(G, 2), I = Z(T, !0), v = d(T, 2);
    {
      var w = (te) => {
        var ke = Kd();
        qe(ke, 21, () => Es(s(p)), wt, (we, le) => {
          K(we, {
            get name() {
              return n[s(le)];
            },
            size: 11
          });
        }), z((we) => ve(ke, "title", `Hidden on ${we ?? ""}`), [() => Es(s(p)).join(", ")]), y(te, ke);
      }, j = /* @__PURE__ */ re(() => !s(p).hidden && Es(s(p)).length);
      B(v, (te) => {
        s(j) && te(w);
      });
    }
    var fe = d(J, 2), ce = h(fe), oe = h(ce);
    {
      let te = /* @__PURE__ */ re(() => s(p).hidden ? "eye-off" : "eye");
      K(oe, {
        get name() {
          return s(te);
        },
        size: 13
      });
    }
    var A = d(ce, 2), N = h(A);
    K(N, { name: "copy", size: 13 });
    var $ = d(A, 2), Q = h($);
    K(Q, { name: "trash", size: 13 }), z(
      (te, ke) => {
        var we;
        ve(k, "draggable", !e.store.readOnly), C = Le(k, 1, "svelte-1jf4jiu", null, C, {
          selected: te,
          over: s(i) === s(b),
          dim: s(p).hidden
        }), F(R, ((we = s(M)) == null ? void 0 : we.title) || s(p).type), F(I, ke), ve(ce, "title", s(p).hidden ? "Show" : "Hide");
      },
      [
        () => e.store.selection.includes(s(b)),
        () => {
          var te;
          return s(p).type === "global" ? e.store.sectionTitle((te = s(p).global) == null ? void 0 : te.section) : Ya(s(p));
        }
      ]
    ), tt("dragstart", k, () => m(r, s(b), !0)), tt("dragover", k, (te) => {
      te.preventDefault(), m(i, s(b), !0);
    }), tt("dragleave", k, () => m(i, -1)), tt("drop", k, () => l(s(b))), tt("dragend", k, () => m(r, m(i, -1), !0)), P("click", J, (te) => a(te, s(b))), P("click", ce, () => e.store.toggleHidden(s(b))), P("click", A, () => e.store.duplicate(s(b))), P("click", $, () => e.store.remove(s(b))), y(g, k);
  }), y(t, o), ct();
}
pt(["click"]);
var Yd = /* @__PURE__ */ x('<button type="button" role="option"><span class="ico svelte-18xya39"><!></span> <span class="txt svelte-18xya39"><strong class="svelte-18xya39"> </strong><span class="svelte-18xya39"> </span></span></button>'), Wd = /* @__PURE__ */ x('<p class="none svelte-18xya39">No blocks match.</p>'), Xd = /* @__PURE__ */ x('<div class="qi svelte-18xya39" role="dialog" aria-label="Add block"><div class="search svelte-18xya39"><!> <input placeholder="Search blocks…" aria-label="Search blocks" class="svelte-18xya39"/></div> <div class="list mb-scroll svelte-18xya39" role="listbox"></div></div>');
function Zd(t, e) {
  ot(e, !0);
  let n = Je(e, "top", 3, 0), r = /* @__PURE__ */ q(""), i = /* @__PURE__ */ q(0), a = /* @__PURE__ */ q(void 0), l = /* @__PURE__ */ q(void 0);
  const o = /* @__PURE__ */ re(() => {
    var C;
    const k = s(r).trim().toLowerCase();
    return (((C = e.store.catalog) == null ? void 0 : C.blocks) || []).filter((O) => !k || O.title.toLowerCase().includes(k) || O.type.includes(k) || (O.description || "").toLowerCase().includes(k));
  });
  _t(() => {
    s(r), m(i, 0);
  });
  function u(k) {
    e.store.insert(k.type, e.index), e.onclose();
  }
  function f(k) {
    k.key === "ArrowDown" ? (k.preventDefault(), m(i, Math.min(s(i) + 1, s(o).length - 1), !0)) : k.key === "ArrowUp" ? (k.preventDefault(), m(i, Math.max(s(i) - 1, 0), !0)) : k.key === "Enter" && s(o)[s(i)] ? (k.preventDefault(), u(s(o)[s(i)])) : k.key === "Escape" && (k.preventDefault(), k.stopPropagation(), e.onclose());
  }
  hs(() => {
    var O;
    (O = s(a)) == null || O.focus();
    const k = (D) => {
      D.composedPath().includes(s(l)) || e.onclose();
    }, C = setTimeout(() => document.addEventListener("pointerdown", k, !0));
    return () => {
      clearTimeout(C), document.removeEventListener("pointerdown", k, !0);
    };
  });
  var _ = Xd();
  let S;
  var g = h(_), p = h(g);
  K(p, { name: "search", size: 14 });
  var b = d(p, 2);
  zn(b, (k) => m(a, k), () => s(a));
  var M = d(g, 2);
  qe(
    M,
    23,
    () => s(o),
    (k) => k.type,
    (k, C, O) => {
      var D = Yd();
      let J;
      var L = h(D), G = h(L);
      K(G, {
        get fa() {
          return s(C).icon;
        },
        size: 16
      });
      var R = d(L, 2), T = h(R), I = Z(T, !0), v = d(T), w = Z(v, !0);
      z(() => {
        ve(D, "aria-selected", s(O) === s(i)), J = Le(D, 1, "svelte-18xya39", null, J, { active: s(O) === s(i) }), F(I, s(C).title), F(w, s(C).description);
      }), tt("mouseenter", D, () => m(i, s(O), !0)), P("click", D, () => u(s(C))), y(k, D);
    },
    (k) => {
      var C = Wd();
      y(k, C);
    }
  ), zn(_, (k) => m(l, k), () => s(l)), z(() => S = Tt(_, "", S, { top: `${n() ?? ""}px` })), P("keydown", b, f), mn(b, () => s(r), (k) => m(r, k)), y(t, _), ct();
}
pt(["keydown", "click"]);
var Qd = /* @__PURE__ */ x('<iframe title="Page preview" sandbox="allow-same-origin allow-scripts"></iframe>'), $d = /* @__PURE__ */ x('<div class="hover-box svelte-dfb6jk"><span class="tag svelte-dfb6jk"> </span></div>'), ev = /* @__PURE__ */ x('<button type="button" title="Move up (Alt+↑)" class="svelte-dfb6jk"><!></button> <button type="button" title="Move down (Alt+↓)" class="svelte-dfb6jk"><!></button> <button type="button" title="Duplicate (Ctrl+D)" class="svelte-dfb6jk"><!></button>', 1), tv = /* @__PURE__ */ x('<button type="button" title="Delete (Del)" class="danger svelte-dfb6jk"><!></button>'), nv = /* @__PURE__ */ x('<button type="button" class="add-gap svelte-dfb6jk" title="Add block below"><!><span class="svelte-dfb6jk">Add block</span></button>'), sv = /* @__PURE__ */ x('<div class="toolbar svelte-dfb6jk"><span class="name svelte-dfb6jk"> </span> <!> <button type="button" title="Copy (Ctrl+C)" class="svelte-dfb6jk"><!></button> <!></div> <!>', 1), rv = /* @__PURE__ */ x('<div class="quick-line svelte-dfb6jk"></div> <!>', 1), iv = /* @__PURE__ */ x('<div class="insert-line svelte-dfb6jk"></div>'), av = /* @__PURE__ */ x('<div class="drop-line svelte-dfb6jk"><span class="svelte-dfb6jk">Drop to insert here</span></div>'), lv = /* @__PURE__ */ x('<div class="drop-catcher svelte-dfb6jk" role="presentation"></div> <!>', 1), ov = /* @__PURE__ */ x('<div class="blank svelte-dfb6jk"><!> <strong class="svelte-dfb6jk">Your page is empty</strong> <span class="svelte-dfb6jk">Pick a block or a page layout from the left panel, or drag one here.</span></div>'), cv = /* @__PURE__ */ x('<div class="error svelte-dfb6jk"> </div>'), uv = /* @__PURE__ */ x('<div class="viewport svelte-dfb6jk"><div><div class="stage svelte-dfb6jk"><!> <div class="overlay svelte-dfb6jk"><!> <!> <!> <!> <!></div> <!> <!></div></div></div> <div role="status" aria-live="polite"><span class="spinner svelte-dfb6jk"></span> <span class="svelte-dfb6jk"> </span></div>', 1);
function dv(t, e) {
  ot(e, !0);
  let n = Je(e, "store", 7), r = Je(e, "width", 3, null), i = $e([
    { src: "about:blank", key: 0 },
    { src: "about:blank", key: 1 }
  ]), a = /* @__PURE__ */ q(
    0
    // index of the visible frame
  ), l = [], o = /* @__PURE__ */ q(!0), u = /* @__PURE__ */ q(""), f = /* @__PURE__ */ q($e([])), _ = /* @__PURE__ */ q(-1), S = 0, g = /* @__PURE__ */ q(
    -1
    // insertion index while dragging a block from the inserter
  ), p = /* @__PURE__ */ q(void 0), b = 0, M = 0, k = "", C = /* @__PURE__ */ q(
    null
    // {index, top} while the canvas block picker is open
  ), O = /* @__PURE__ */ q(600), D = !1;
  const J = /* @__PURE__ */ re(() => s(o) || !!n().busy);
  let L = /* @__PURE__ */ q(!1), G = /* @__PURE__ */ q("Updating preview…"), R = 0;
  _t(() => {
    s(J) ? (n().busy ? m(G, n().busy, !0) : s(o) && !n().blocks.length && m(G, "Loading preview…"), clearTimeout(R), s(L) || (R = setTimeout(() => m(L, !0), 250))) : (clearTimeout(R), m(L, !1));
  });
  function T() {
    m(o, !1), n().busy = "", n().pendingInsert = null;
  }
  function I() {
    k = "", v(0);
  }
  function v(X = 450) {
    clearTimeout(b), b = setTimeout(w, X);
  }
  async function w() {
    if (!n().canPreview) return;
    const X = n().snapshot(), ee = JSON.stringify(X);
    if (ee === n().renderedPayload) {
      k = ee, s(o) || T();
      return;
    }
    if (ee === k) {
      s(o) || T();
      return;
    }
    k = ee;
    const pe = ++M;
    m(o, !0), m(u, "");
    try {
      const V = await We.preview(n().context, X, n().fieldName);
      if (pe !== M) return;
      const He = s(a) === 0 ? 1 : 0;
      i[He] = { src: V.url + "&_t=" + pe, key: i[He].key };
    } catch (V) {
      pe === M && (m(u, V.message, !0), T());
    }
  }
  _t(() => {
    JSON.stringify(n().blocks), n().catalog && v();
  });
  let j = -1;
  _t(() => {
    var V, He;
    const X = n().selected, ee = [...n().multi], pe = X !== j;
    if (j = X, s(J)) {
      pe && (D = !0);
      return;
    }
    (He = (V = l[s(a)]) == null ? void 0 : V.contentWindow) == null || He.postMessage(
      {
        source: "maw-builder",
        type: "select",
        index: X,
        multi: ee,
        scroll: pe
      },
      location.origin
    );
  }), _t(() => {
    var ee, pe;
    const X = n().readOnly;
    s(J) || (pe = (ee = l[s(a)]) == null ? void 0 : ee.contentWindow) == null || pe.postMessage({ source: "maw-builder", type: "readonly", value: X }, location.origin);
  }), hs(() => {
    const X = (ee) => {
      var He;
      if (ee.origin !== location.origin || ((He = ee.data) == null ? void 0 : He.source) !== "maw-preview") return;
      const pe = l.findIndex((Re) => Re && Re.contentWindow === ee.source);
      if (pe < 0) return;
      const V = ee.data;
      if (V.type === "ready") {
        if (pe !== s(a)) {
          ee.source.postMessage({ source: "maw-builder", type: "scrollTo", y: S }, location.origin), ee.source.postMessage(
            {
              source: "maw-builder",
              type: "select",
              index: n().selected,
              multi: [...n().multi],
              scroll: D,
              behavior: "smooth"
            },
            location.origin
          ), ee.source.postMessage(
            {
              source: "maw-builder",
              type: "readonly",
              value: n().readOnly
            },
            location.origin
          ), D = !1;
          const Re = n().pendingFocus;
          n().pendingFocus = null, requestAnimationFrame(() => {
            m(a, pe, !0), T(), Re && ee.source.postMessage(
              {
                source: "maw-builder",
                type: "focus-edit",
                index: Re.index,
                path: Re.path
              },
              location.origin
            );
          });
        } else
          T();
        m(f, V.rects || [], !0), V.palette && V.palette.none && (n().palette = V.palette);
        return;
      }
      if (pe === s(a))
        if (V.type === "rects")
          m(f, V.rects, !0), S = V.scrollY || 0;
        else if (V.type === "hover") m(_, V.index, !0);
        else if (V.type === "select")
          V.range ? n().rangeSelect(V.index) : V.toggle ? n().toggleSelect(V.index) : n().select(V.index);
        else if (V.type === "key") window.dispatchEvent(new KeyboardEvent("keydown", {
          key: V.key,
          code: V.code,
          ctrlKey: V.ctrlKey,
          metaKey: V.metaKey,
          shiftKey: V.shiftKey,
          altKey: V.altKey,
          bubbles: !0,
          cancelable: !0
        }));
        else if (V.type === "paste") document.dispatchEvent(new CustomEvent("maw-paste-text", { detail: String(V.text || "") }));
        else if (V.type === "inline") n().inlineSet(V.index, V.path, String(V.value ?? ""));
        else if (V.type === "inline-md") n().inlineSetMarkdown(V.index, V.path, String(V.value ?? ""));
        else if (V.type === "list-op") n().listOp(V);
        else if (V.type === "image-pick")
          n().select(V.index), n().imagePick = { index: V.index, path: V.path };
        else if (V.type === "md-request") {
          const Re = n().getPath(V.index, V.path);
          ee.source.postMessage(
            {
              source: "maw-builder",
              type: "md-value",
              req: V.req,
              value: typeof Re == "string" ? Re : ""
            },
            location.origin
          );
        } else V.type === "inline-start" ? (n().inlineEditing = !0, (n().selected !== V.index || n().selection.length > 1) && n().select(V.index)) : V.type === "inline-end" && (n().inlineEditing = !1);
    };
    return window.addEventListener("message", X), v(0), () => {
      window.removeEventListener("message", X), clearTimeout(b);
    };
  });
  const fe = /* @__PURE__ */ re(() => s(J) || n().inlineEditing ? null : s(f).find((X) => X.index === n().selected)), ce = /* @__PURE__ */ re(() => s(fe) ? Math.min(s(fe).top + s(fe).height, s(O) - 24) : 0), oe = /* @__PURE__ */ re(() => s(_) !== n().selected ? s(f).find((X) => X.index === s(_)) : null);
  function A(X) {
    const ee = s(p).getBoundingClientRect(), pe = X - ee.top;
    if (!s(f).length) return n().blocks.length;
    let V = n().blocks.length, He = 1 / 0;
    const Re = [...s(f)].sort((rt, ut) => rt.top - ut.top);
    return Re.forEach((rt, ut) => {
      var Ht;
      const Ut = Math.abs(pe - rt.top);
      Ut < He && (He = Ut, V = rt.index);
      const St = Math.abs(pe - (rt.top + rt.height));
      St < He && (He = St, V = ((Ht = Re[ut + 1]) == null ? void 0 : Ht.index) ?? rt.index + 1);
    }), V;
  }
  function N(X) {
    const ee = s(f).find((V) => V.index === X);
    if (ee) return ee.top;
    const pe = s(f).reduce((V, He) => He.index > ((V == null ? void 0 : V.index) ?? -1) ? He : V, null);
    return pe ? pe.top + pe.height : 0;
  }
  const $ = /* @__PURE__ */ re(() => !!n().dragType);
  function Q(X) {
    X.preventDefault(), X.dataTransfer.dropEffect = "copy", m(g, A(X.clientY), !0);
  }
  function te(X) {
    X.preventDefault();
    const ee = n().dragType || X.dataTransfer.getData("application/x-maw-block") || X.dataTransfer.getData("text/plain"), pe = s(g) >= 0 ? s(g) : A(X.clientY);
    n().dragType = "", m(g, -1), ee && n().defFor(ee) && n().insert(ee, pe);
  }
  _t(() => {
    n().dragType || m(g, -1);
  });
  const ke = (X) => {
    var pe, V;
    const ee = n().blocks[X];
    return (ee == null ? void 0 : ee.type) === "global" ? "Global · " + n().sectionTitle((pe = ee.global) == null ? void 0 : pe.section) : ((V = n().defFor(ee == null ? void 0 : ee.type)) == null ? void 0 : V.title) || (ee == null ? void 0 : ee.type) || "";
  };
  var we = { refresh: I }, le = uv(), me = Te(le), ze = h(me);
  let W, Y;
  var be = h(ze), he = h(be);
  qe(he, 19, () => i, (X) => X.key, (X, ee, pe) => {
    var V = Qd();
    let He;
    zn(V, (Re, rt) => l[rt] = Re, (Re) => l == null ? void 0 : l[Re], () => [s(pe)]), z(() => {
      ve(V, "src", s(ee).src), He = Le(V, 1, "svelte-dfb6jk", null, He, { hidden: s(pe) !== s(a) });
    }), y(X, V);
  });
  var ie = d(he, 2), ue = h(ie);
  {
    var de = (X) => {
      var ee = $d();
      let pe;
      var V = h(ee), He = Z(V, !0);
      z(
        (Re) => {
          pe = Tt(ee, "", pe, {
            top: `${s(oe).top ?? ""}px`,
            height: `${s(oe).height ?? ""}px`
          }), F(He, Re);
        },
        [() => ke(s(oe).index)]
      ), y(X, ee);
    };
    B(ue, (X) => {
      s(oe) && !s($) && X(de);
    });
  }
  var ae = d(ue, 2);
  {
    var xe = (X) => {
      const ee = /* @__PURE__ */ re(() => n().selection);
      var pe = sv(), V = Te(pe);
      let He;
      var Re = h(V), rt = Z(Re, !0), ut = d(Re, 2);
      {
        var Ut = (dt) => {
          var Xe = ev(), vt = Te(Xe), Rt = h(vt);
          K(Rt, { name: "up", size: 14 });
          var yn = d(vt, 2), ui = h(yn);
          K(ui, { name: "down", size: 14 });
          var Un = d(yn, 2), Yi = h(Un);
          K(Yi, { name: "copy", size: 14 }), z(
            (gs) => {
              vt.disabled = s(ee)[0] === 0, yn.disabled = gs;
            },
            [() => s(ee).at(-1) === n().blocks.length - 1]
          ), P("click", vt, () => n().moveSelection(-1)), P("click", yn, () => n().moveSelection(1)), P("click", Un, () => n().duplicateMany(s(ee))), y(dt, Xe);
        };
        B(ut, (dt) => {
          n().readOnly || dt(Ut);
        });
      }
      var St = d(ut, 2), Ht = h(St);
      K(Ht, { name: "clipboard", size: 14 });
      var Xs = d(St, 2);
      {
        var ps = (dt) => {
          var Xe = tv(), vt = h(Xe);
          K(vt, { name: "trash", size: 14 }), P("click", Xe, () => n().removeMany(s(ee))), y(dt, Xe);
        };
        B(Xs, (dt) => {
          n().readOnly || dt(ps);
        });
      }
      var Zs = d(V, 2);
      {
        var Qs = (dt) => {
          var Xe = nv();
          let vt;
          var Rt = h(Xe);
          K(Rt, { name: "plus", size: 16 }), z(() => vt = Tt(Xe, "", vt, { top: `${s(ce) ?? ""}px` })), P("click", Xe, () => m(C, { index: n().selected + 1, top: s(ce) + 18 }, !0)), y(dt, Xe);
        };
        B(Zs, (dt) => {
          !s(C) && !n().readOnly && s(ee).length === 1 && dt(Qs);
        });
      }
      z(
        (dt, Xe) => {
          He = Tt(V, "", He, { top: dt }), F(rt, Xe);
        },
        [
          () => `${Math.max(6, s(fe).top + 6)}px`,
          () => s(ee).length > 1 ? `${s(ee).length} blocks selected` : ke(n().selected)
        ]
      ), P("click", St, () => n().copyBlocks(s(ee))), y(X, pe);
    };
    B(ae, (X) => {
      s(fe) && !s($) && X(xe);
    });
  }
  var De = d(ae, 2);
  {
    var Ie = (X) => {
      var ee = rv(), pe = Te(ee);
      let V;
      var He = d(pe, 2);
      {
        let Re = /* @__PURE__ */ re(() => Math.min(s(C).top, s(O) - 380));
        Zd(He, {
          get store() {
            return n();
          },
          get index() {
            return s(C).index;
          },
          get top() {
            return s(Re);
          },
          onclose: () => m(C, null)
        });
      }
      z(() => V = Tt(pe, "", V, { top: `${s(C).top - 18}px` })), y(X, ee);
    };
    B(De, (X) => {
      s(C) && X(Ie);
    });
  }
  var Ue = d(De, 2);
  {
    var Ee = (X) => {
      var ee = iv();
      let pe;
      z((V) => pe = Tt(ee, "", pe, { top: V }), [() => `${N(n().pendingInsert.index) ?? ""}px`]), y(X, ee);
    };
    B(Ue, (X) => {
      n().pendingInsert && s(J) && X(Ee);
    });
  }
  var ye = d(Ue, 2);
  {
    var Ae = (X) => {
      var ee = lv(), pe = Te(ee), V = d(pe, 2);
      {
        var He = (Re) => {
          var rt = av();
          let ut;
          z((Ut) => ut = Tt(rt, "", ut, { top: Ut }), [() => `${N(s(g)) ?? ""}px`]), y(Re, rt);
        };
        B(V, (Re) => {
          s(g) >= 0 && Re(He);
        });
      }
      tt("dragover", pe, Q), tt("drop", pe, te), tt("dragleave", pe, () => m(g, -1)), y(X, ee);
    };
    B(ye, (X) => {
      s($) && X(Ae);
    });
  }
  var Se = d(ie, 2);
  {
    var Ne = (X) => {
      var ee = ov(), pe = h(ee);
      K(pe, { name: "sparkles", size: 28 }), y(X, ee);
    };
    B(Se, (X) => {
      !n().blocks.length && !s(o) && X(Ne);
    });
  }
  var Ye = d(Se, 2);
  {
    var st = (X) => {
      var ee = cv(), pe = Z(ee);
      z(() => F(pe, `Preview failed: ${s(u) ?? ""}`)), y(X, ee);
    };
    B(Ye, (X) => {
      s(u) && X(st);
    });
  }
  zn(be, (X) => m(p, X), () => s(p));
  var lt = d(me, 2);
  let Be;
  var ln = d(h(lt), 2), _n = Z(ln, !0);
  return z(() => {
    W = Le(ze, 1, "device svelte-dfb6jk", null, W, { framed: !!r() }), Y = Tt(ze, "", Y, { width: r() ? r() + "px" : "100%" }), Be = Le(lt, 1, "busy svelte-dfb6jk", null, Be, { on: s(L) }), F(_n, s(G));
  }), $u(be, "clientHeight", (X) => m(O, X)), y(t, le), ct(we);
}
pt(["click"]);
const Lo = (t) => /^\d+$/.test(t), vv = /* @__PURE__ */ new Set(["__proto__", "constructor", "prototype"]), fv = (t) => {
  if (vv.has(t)) throw new Error(`Refusing path segment "${t}"`);
  return Lo(t) ? Number(t) : t;
}, Wa = (t) => String(t).split(".").map(fv);
function Ro(t) {
  return (!t[t.type] || typeof t[t.type] != "object" || Array.isArray(t[t.type])) && (t[t.type] = {}), t[t.type];
}
function Al(t, e) {
  let n = t && t[t.type];
  for (const r of Wa(e)) {
    if (n == null) return;
    n = n[r];
  }
  return n;
}
function hv(t, e, n) {
  const r = Wa(e);
  let i = Ro(t);
  for (let l = 0; l < r.length - 1; l++) {
    const o = r[l];
    (i[o] == null || typeof i[o] != "object") && (i[o] = typeof r[l + 1] == "number" ? [] : {}), i = i[o];
  }
  const a = r.at(-1);
  return Ji(n) ? a in i ? (Array.isArray(i) ? i[a] = void 0 : delete i[a], !0) : !1 : i[a] === n ? !1 : (i[a] = n, !0);
}
function gi(t, e) {
  const n = Wa(e);
  let r = Ro(t);
  for (let a = 0; a < n.length - 1; a++) {
    const l = n[a];
    (r[l] == null || typeof r[l] != "object") && (r[l] = {}), r = r[l];
  }
  const i = n.at(-1);
  return Array.isArray(r[i]) || (r[i] = []), r[i];
}
const pv = (t) => JSON.parse(JSON.stringify(t)), Fn = {
  add(t, e) {
    return t.push(e), t.length - 1;
  },
  duplicate(t, e) {
    return t[e] === void 0 ? -1 : (t.splice(e + 1, 0, pv(t[e])), e + 1);
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
  for (const i of String(e).split("."))
    if (!Lo(i)) {
      if (r = n.find((a) => a.name === i) || null, !r) return null;
      n = r.fields || [];
    }
  return r;
}
function gv(t, e, n) {
  const r = [...new Set(e)].filter((o) => o >= 0 && o < t.length).sort((o, u) => o - u);
  if (!r.length || !n || r[0] + n < 0 || r.at(-1) + n >= t.length) return r;
  const i = r.map((o) => t[o]), a = t.filter((o, u) => !r.includes(u)), l = Math.max(0, Math.min(a.length, r[0] + n));
  return a.splice(l, 0, ...i), t.splice(0, t.length, ...a), i.map((o, u) => l + u);
}
var bv = /* @__PURE__ */ x('<div class="inner svelte-hzx6i5"></div>'), mv = /* @__PURE__ */ x('<div role="listitem"><div class="bar svelte-hzx6i5"><span class="grip svelte-hzx6i5" draggable="true" role="presentation" aria-hidden="true"><!></span> <button type="button" class="title svelte-hzx6i5"><span><!></span> <span class="t svelte-hzx6i5"> </span></button> <button type="button" class="mb-btn ghost icon sm" title="Move up" aria-label="Move up"><!></button> <button type="button" class="mb-btn ghost icon sm" title="Move down" aria-label="Move down"><!></button> <button type="button" class="mb-btn ghost icon sm" title="Duplicate" aria-label="Duplicate"><!></button> <button type="button" class="mb-btn ghost icon sm danger" title="Remove" aria-label="Remove"><!></button></div> <!></div>'), _v = /* @__PURE__ */ x('<div class="list svelte-hzx6i5"><div class="head svelte-hzx6i5"><span class="mb-label"> <span class="count svelte-hzx6i5"> </span></span></div> <div role="list"></div> <button type="button" class="mb-btn add svelte-hzx6i5"><!> </button></div>');
function yv(t, e) {
  ot(e, !0);
  let n = Je(e, "target", 7);
  const r = /* @__PURE__ */ re(() => Array.isArray(n()[e.field.name]) ? n()[e.field.name] : []);
  let i = /* @__PURE__ */ q(-1), a = /* @__PURE__ */ q(-1), l = /* @__PURE__ */ q(-1);
  function o() {
    return Array.isArray(n()[e.field.name]) || (n()[e.field.name] = []), n()[e.field.name];
  }
  function u() {
    const G = String(e.field.label || "item").replace(/s$/i, "").toLowerCase();
    let R = -1;
    e.store.mutate(
      () => {
        R = Fn.add(o(), No(e.field, G));
      },
      "Adding item…"
    ), m(i, R, !0);
  }
  function f(G) {
    e.store.mutate(() => Fn.remove(o(), G)), s(i) === G ? m(i, -1) : s(i) > G && m(i, s(i) - 1);
  }
  function _(G) {
    let R = -1;
    e.store.mutate(() => {
      R = Fn.duplicate(o(), G);
    }), R >= 0 && m(i, R, !0);
  }
  function S(G, R) {
    let T = -1;
    e.store.mutate(() => {
      T = Fn.move(o(), G, R);
    }), T >= 0 && m(i, T, !0);
  }
  var g = _v(), p = h(g), b = h(p), M = h(b), k = d(M), C = Z(k, !0), O = d(p, 2);
  qe(O, 21, () => s(r), wt, (G, R, T) => {
    var I = mv();
    let v;
    var w = h(I), j = h(w), fe = h(j);
    K(fe, { name: "grip", size: 13 });
    var ce = d(j, 2), oe = h(ce);
    let A;
    var N = h(oe);
    K(N, { name: "chevron", size: 12 });
    var $ = d(oe, 2), Q = Z($, !0), te = d(ce, 2);
    te.disabled = T === 0;
    var ke = h(te);
    K(ke, { name: "up", size: 12 });
    var we = d(te, 2), le = h(we);
    K(le, { name: "down", size: 12 });
    var me = d(we, 2), ze = h(me);
    K(ze, { name: "copy", size: 12 });
    var W = d(me, 2), Y = h(W);
    K(Y, { name: "trash", size: 12 });
    var be = d(w, 2);
    {
      var he = (ie) => {
        var ue = bv();
        qe(ue, 21, () => e.field.fields || [], (de) => de.name, (de, ae) => {
          Ri(de, {
            get field() {
              return s(ae);
            },
            get target() {
              return s(R);
            },
            get store() {
              return e.store;
            },
            compact: !0
          });
        }), y(ie, ue);
      };
      B(be, (ie) => {
        s(i) === T && ie(he);
      });
    }
    z(
      (ie) => {
        v = Le(I, 1, "item svelte-hzx6i5", null, v, { open: s(i) === T, over: s(l) === T }), ve(ce, "aria-expanded", s(i) === T), A = Le(oe, 1, "chev svelte-hzx6i5", null, A, { rot: s(i) === T }), F(Q, ie), we.disabled = T === s(r).length - 1;
      },
      [() => ad(s(R), e.field.fields, T)]
    ), tt("dragover", I, (ie) => {
      s(a) >= 0 && (ie.preventDefault(), m(l, T, !0));
    }), tt("drop", I, () => {
      S(s(a), T), m(a, m(l, -1), !0);
    }), tt("dragstart", j, (ie) => {
      m(a, T, !0), ie.dataTransfer.effectAllowed = "move";
    }), tt("dragend", j, () => m(a, m(l, -1), !0)), P("click", ce, () => m(i, s(i) === T ? -1 : T, !0)), P("click", te, () => S(T, T - 1)), P("click", we, () => S(T, T + 1)), P("click", me, () => _(T)), P("click", W, () => f(T)), y(G, I);
  });
  var D = d(O, 2), J = h(D);
  K(J, { name: "plus", size: 13 });
  var L = d(J);
  z(() => {
    F(M, `${(e.field.label || e.field.name) ?? ""} `), F(C, s(r).length), F(L, ` ${(e.field.btnLabel || "Add item") ?? ""}`);
  }), P("click", D, u), y(t, g), ct();
}
pt(["click"]);
var kv = /* @__PURE__ */ x('<footer class="svelte-1kwbck4"><!></footer>'), wv = /* @__PURE__ */ x('<div class="backdrop svelte-1kwbck4" role="presentation"><div tabindex="-1" role="dialog" aria-modal="true"><header class="svelte-1kwbck4"><h2 class="svelte-1kwbck4"> </h2> <button type="button" class="mb-btn ghost icon sm" aria-label="Close"><!></button></header> <div class="content mb-scroll svelte-1kwbck4"><!></div> <!></div></div>');
function Li(t, e) {
  ot(e, !0);
  let n = Je(e, "title", 3, ""), r = Je(e, "wide", 3, !1), i = /* @__PURE__ */ q(void 0);
  const a = 'input:not([type=hidden]):not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])', l = () => [...s(i).querySelectorAll(a)], o = () => s(i).getRootNode().activeElement || document.activeElement;
  hs(() => {
    const L = o();
    return (s(i).querySelector("[autofocus]") || l().find((R) => !R.closest("header")) || s(i)).focus(), () => {
      L && typeof L.focus == "function" && L.isConnected && L.focus();
    };
  });
  function u(L) {
    if (L.key !== "Tab") return;
    const G = l();
    if (!G.length) {
      L.preventDefault();
      return;
    }
    const R = o();
    L.shiftKey && (R === G[0] || R === s(i)) ? (L.preventDefault(), G.at(-1).focus()) : !L.shiftKey && R === G.at(-1) && (L.preventDefault(), G[0].focus());
  }
  var f = wv(), _ = h(f);
  let S;
  var g = h(_), p = h(g), b = Z(p, !0), M = d(p, 2), k = h(M);
  K(k, { name: "x", size: 14 });
  var C = d(g, 2), O = h(C);
  ml(O, () => e.children ?? ql);
  var D = d(C, 2);
  {
    var J = (L) => {
      var G = kv(), R = h(G);
      ml(R, () => e.actions), y(L, G);
    };
    B(D, (L) => {
      e.actions && L(J);
    });
  }
  zn(_, (L) => m(i, L), () => s(i)), z(() => {
    S = Le(_, 1, "dialog svelte-1kwbck4", null, S, { wide: r() }), ve(_, "aria-label", n()), F(b, n());
  }), P("click", f, (L) => {
    var G;
    return L.target === L.currentTarget && ((G = e.onclose) == null ? void 0 : G.call(e));
  }), P("keydown", _, u), P("click", M, () => {
    var L;
    return (L = e.onclose) == null ? void 0 : L.call(e);
  }), y(t, f), ct();
}
pt(["click", "keydown"]);
var xv = /* @__PURE__ */ x('<input class="mb-input search svelte-hd7o5x" placeholder="Filter by name"/> <input type="file" accept="image/*" multiple="" hidden=""/> <button type="button" class="mb-btn primary"><!> </button>', 1), Sv = /* @__PURE__ */ x('<p class="error svelte-hd7o5x"> </p>'), Ev = /* @__PURE__ */ x('<img class="url-preview svelte-hd7o5x" alt=""/>'), Mv = /* @__PURE__ */ x('<div class="url svelte-hd7o5x"><label class="mb-label" for="mb-media-url">Image URL</label> <input id="mb-media-url" class="mb-input" placeholder="https://…"/> <!> <button type="button" class="mb-btn primary">Use this URL</button></div>'), Tv = /* @__PURE__ */ x('<span>/</span> <button type="button" class="link svelte-hd7o5x"> </button>', 1), Av = /* @__PURE__ */ x('<div class="crumbs svelte-hd7o5x"><button type="button" class="link svelte-hd7o5x">user/media</button> <!></div>'), Cv = /* @__PURE__ */ x('<button type="button" class="tile folder svelte-hd7o5x"><!><span class="svelte-hd7o5x"> </span></button>'), Ov = /* @__PURE__ */ x('<button type="button"><img alt="" loading="lazy" class="svelte-hd7o5x"/> <span class="svelte-hd7o5x"> </span></button>'), Pv = /* @__PURE__ */ x('<div class="empty svelte-hd7o5x"><!> <strong class="svelte-hd7o5x"> </strong> <span>Drop image files here, or click Upload.</span></div>'), zv = /* @__PURE__ */ x('<p class="muted svelte-hd7o5x">Loading…</p>'), Dv = /* @__PURE__ */ x('<!> <div class="grid mb-scroll svelte-hd7o5x"><!> <!></div> <!>', 1), Nv = /* @__PURE__ */ x('<div role="presentation"><div class="bar svelte-hd7o5x"><!> <!></div> <!> <!></div>');
function jo(t, e) {
  ot(e, !0);
  let n = Je(e, "current", 3, ""), r = /* @__PURE__ */ q($e(e.store.isSection || n() && String(n()).startsWith("user://media") ? "site" : "page")), i = /* @__PURE__ */ q($e([])), a = /* @__PURE__ */ q($e([])), l = /* @__PURE__ */ q($e([])), o = /* @__PURE__ */ q(""), u = /* @__PURE__ */ q(!1), f = /* @__PURE__ */ q(!1), _ = /* @__PURE__ */ q(""), S = /* @__PURE__ */ q($e(/^https?:\/\//.test(n()) ? n() : "")), g = /* @__PURE__ */ q(""), p = /* @__PURE__ */ q(!1), b = /* @__PURE__ */ q(void 0);
  const M = (v) => String(v.type || v.mime || "").startsWith("image/") || /\.(jpe?g|png|gif|webp|avif|svg)$/i.test(v.filename || "");
  async function k() {
    m(u, !0), m(_, "");
    try {
      m(i, (await e.store.loadOwnMedia()).filter(M), !0);
    } catch (v) {
      m(_, v.message, !0);
    }
    m(u, !1);
  }
  async function C() {
    m(u, !0), m(_, "");
    try {
      const v = await We.siteMedia(s(o)), w = Array.isArray(v) ? v : (v == null ? void 0 : v.files) || (v == null ? void 0 : v.items) || [];
      m(a, w.filter(M), !0), m(l, (v == null ? void 0 : v.folders) || [], !0);
    } catch (v) {
      m(_, v.message, !0);
    }
    m(u, !1);
  }
  hs(() => {
    s(r) === "site" ? C() : k();
  });
  function O(v) {
    m(r, v, !0), v === "page" && !s(i).length && k(), v === "site" && C();
  }
  const D = /\.(jpe?g|png|gif|webp|avif|svg)$/i, J = (v) => [...v || []].filter((w) => w.type.startsWith("image/") || D.test(w.name));
  async function L(v) {
    const w = J(v);
    if (s(
      b
      // so the same file can be picked again after a failure
    ) && (s(b).value = ""), !w.length) {
      v != null && v.length && m(_, "Only image files can be uploaded here.");
      return;
    }
    m(f, !0), m(_, "");
    try {
      s(r) === "site" ? (await We.uploadSiteMedia(w, s(o)), await C()) : (await We.uploadOwnMedia(e.store.context, w), await k()), e.store.flash(`${w.length} file${w.length > 1 ? "s" : ""} uploaded`);
    } catch (j) {
      m(_, j.message, !0);
    }
    m(f, !1);
  }
  function G(v) {
    return "user://media/" + (v.path ? v.path.replace(/^\/|\/$/g, "") + "/" : s(o) ? s(o) + "/" : "") + v.filename;
  }
  const R = /* @__PURE__ */ re(() => {
    const v = s(r) === "site" ? s(a) : s(i), w = s(g).trim().toLowerCase();
    return w ? v.filter((j) => j.filename.toLowerCase().includes(w)) : v;
  });
  function T(v) {
    return typeof v == "string" ? v : v.name || v.path;
  }
  function I(v) {
    const w = typeof v == "string" ? v : v.path || v.name;
    m(o, w.includes("/") || !s(o) ? w : s(o) + "/" + w, !0), C();
  }
  Li(t, {
    title: "Media library",
    wide: !0,
    get onclose() {
      return e.onclose;
    },
    children: (v, w) => {
      var j = Nv();
      let fe;
      var ce = h(j), oe = h(ce);
      {
        let le = /* @__PURE__ */ re(() => [
          ...e.store.isSection ? [] : [
            {
              value: "page",
              label: e.store.isFlex ? "This item" : "This page"
            }
          ],
          { value: "site", label: "Site library" },
          { value: "url", label: "From URL" }
        ]);
        Vs(oe, {
          label: "Source",
          get value() {
            return s(r);
          },
          onchange: (me) => me === "url" ? m(r, "url") : O(me),
          get options() {
            return s(le);
          }
        });
      }
      var A = d(oe, 2);
      {
        var N = (le) => {
          var me = xv(), ze = Te(me), W = d(ze, 2);
          zn(W, (ie) => m(b, ie), () => s(b));
          var Y = d(W, 2), be = h(Y);
          K(be, { name: "upload", size: 14 });
          var he = d(be);
          z(() => {
            Y.disabled = s(f), F(he, ` ${s(f) ? "Uploading…" : "Upload"}`);
          }), mn(ze, () => s(g), (ie) => m(g, ie)), P("change", W, (ie) => L(ie.currentTarget.files)), P("click", Y, () => s(b).click()), y(le, me);
        };
        B(A, (le) => {
          s(r) !== "url" && le(N);
        });
      }
      var $ = d(ce, 2);
      {
        var Q = (le) => {
          var me = Sv(), ze = Z(me, !0);
          z(() => F(ze, s(_))), y(le, me);
        };
        B($, (le) => {
          s(_) && le(Q);
        });
      }
      var te = d($, 2);
      {
        var ke = (le) => {
          var me = Mv(), ze = d(h(me), 2), W = d(ze, 2);
          {
            var Y = (ie) => {
              var ue = Ev();
              z(() => ve(ue, "src", s(S))), y(ie, ue);
            }, be = /* @__PURE__ */ re(() => /^https?:\/\//.test(s(S)));
            B(W, (ie) => {
              s(be) && ie(Y);
            });
          }
          var he = d(W, 2);
          z((ie) => he.disabled = ie, [() => !/^https?:\/\//.test(s(S))]), mn(ze, () => s(S), (ie) => m(S, ie)), P("click", he, () => e.onselect(s(S))), y(le, me);
        }, we = (le) => {
          var me = Dv(), ze = Te(me);
          {
            var W = (ae) => {
              var xe = Av(), De = h(xe), Ie = d(De, 2);
              qe(Ie, 17, () => s(o).split("/").filter(Boolean), wt, (Ue, Ee, ye) => {
                var Ae = Tv(), Se = d(Te(Ae), 2), Ne = Z(Se, !0);
                z(() => F(Ne, s(Ee))), P("click", Se, () => {
                  m(o, s(o).split("/").slice(0, ye + 1).join("/"), !0), C();
                }), y(Ue, Ae);
              }), P("click", De, () => {
                m(o, ""), C();
              }), y(ae, xe);
            };
            B(ze, (ae) => {
              s(r) === "site" && ae(W);
            });
          }
          var Y = d(ze, 2), be = h(Y);
          {
            var he = (ae) => {
              var xe = At(), De = Te(xe);
              qe(De, 17, () => s(l), wt, (Ie, Ue) => {
                var Ee = Cv(), ye = h(Ee);
                K(ye, { name: "layers", size: 22 });
                var Ae = d(ye), Se = Z(Ae, !0);
                z((Ne) => F(Se, Ne), [() => T(s(Ue))]), P("click", Ee, () => I(s(Ue))), y(Ie, Ee);
              }), y(ae, xe);
            };
            B(be, (ae) => {
              s(r) === "site" && ae(he);
            });
          }
          var ie = d(be, 2);
          qe(
            ie,
            17,
            () => s(R),
            (ae) => ae.filename + (ae.path || ""),
            (ae, xe) => {
              const De = /* @__PURE__ */ re(() => s(r) === "site" ? G(s(xe)) : s(xe).filename);
              var Ie = Ov();
              let Ue;
              var Ee = h(Ie), ye = d(Ee, 2), Ae = Z(ye, !0);
              z(() => {
                Ue = Le(Ie, 1, "tile svelte-hd7o5x", null, Ue, { active: s(De) === n() }), ve(Ie, "title", s(xe).filename), ve(Ee, "src", s(xe).url), F(Ae, s(xe).filename);
              }), P("click", Ie, () => e.onselect(s(De))), y(ae, Ie);
            },
            (ae) => {
              var xe = At(), De = Te(xe);
              {
                var Ie = (Ue) => {
                  var Ee = Pv(), ye = h(Ee);
                  K(ye, { name: "upload", size: 26 });
                  var Ae = d(ye, 2), Se = Z(Ae);
                  z(() => F(Se, `No images ${s(r) === "page" ? e.store.isFlex ? "on this item" : "on this page" : "here"} yet`)), y(Ue, Ee);
                };
                B(De, (Ue) => {
                  s(u) || Ue(Ie);
                });
              }
              y(ae, xe);
            }
          );
          var ue = d(Y, 2);
          {
            var de = (ae) => {
              var xe = zv();
              y(ae, xe);
            };
            B(ue, (ae) => {
              s(u) && ae(de);
            });
          }
          y(le, me);
        };
        B(te, (le) => {
          s(r) === "url" ? le(ke) : le(we, -1);
        });
      }
      z(() => fe = Le(j, 1, "lib svelte-hd7o5x", null, fe, { drag: s(p) })), tt("dragover", j, (le) => {
        var me, ze;
        (ze = (me = le.dataTransfer) == null ? void 0 : me.types) != null && ze.includes("Files") && (le.preventDefault(), m(p, !0));
      }), tt("dragleave", j, () => m(p, !1)), tt("drop", j, (le) => {
        le.preventDefault(), m(p, !1), L(le.dataTransfer.files);
      }), y(v, j);
    },
    $$slots: { default: !0 }
  }), ct();
}
pt(["change", "click"]);
var Lv = /* @__PURE__ */ x('<img alt="" class="svelte-x4wd27"/>'), Rv = /* @__PURE__ */ x('<button type="button" class="mb-btn sm ghost danger">Remove</button>'), Iv = /* @__PURE__ */ x('<div class="media svelte-x4wd27"><button type="button" class="thumb svelte-x4wd27" title="Choose image" aria-label="Choose image"><!></button> <div class="side svelte-x4wd27"><div class="name svelte-x4wd27"> </div> <div class="btns svelte-x4wd27"><button type="button" class="mb-btn sm"><!> </button> <!></div></div></div> <!>', 1);
function jv(t, e) {
  ot(e, !0);
  let n = Je(e, "value", 3, ""), r = Je(e, "store", 7), i = /* @__PURE__ */ q(!1), a = /* @__PURE__ */ q(!1);
  _t(() => {
    if (s(i))
      return r().modal = { close: () => m(i, !1) }, () => {
        r().modal = null;
      };
  });
  const l = /* @__PURE__ */ re(() => {
    var I;
    const T = String(n() || "");
    return T ? /^(https?:)?\/\//.test(T) || T.startsWith("/") ? T : T.startsWith("user://") ? "/" + T.replace("user://", "user/") : T.startsWith("theme://") ? `/user/themes/${((I = r().catalog) == null ? void 0 : I.theme) || ""}/${T.replace("theme://", "")}` : r().pageMediaUrl(T) : "";
  });
  _t(() => {
    s(l), m(a, !1);
  });
  var o = Iv(), u = Te(o), f = h(u), _ = h(f);
  {
    var S = (T) => {
      var I = Lv();
      z(() => ve(I, "src", s(l))), tt("error", I, () => m(a, !0)), y(T, I);
    }, g = (T) => {
      K(T, { name: "image", size: 22 });
    };
    B(_, (T) => {
      s(l) && !s(a) ? T(S) : T(g, -1);
    });
  }
  var p = d(f, 2), b = h(p), M = Z(b, !0), k = d(b, 2), C = h(k), O = h(C);
  K(O, { name: "image", size: 13 });
  var D = d(O), J = d(C, 2);
  {
    var L = (T) => {
      var I = Rv();
      P("click", I, () => e.onchange("")), y(T, I);
    };
    B(J, (T) => {
      n() && T(L);
    });
  }
  var G = d(u, 2);
  {
    var R = (T) => {
      jo(T, {
        get store() {
          return r();
        },
        get current() {
          return n();
        },
        onselect: (I) => {
          e.onchange(I), m(i, !1);
        },
        onclose: () => m(i, !1)
      });
    };
    B(G, (T) => {
      s(i) && T(R);
    });
  }
  z(() => {
    ve(b, "title", n()), F(M, n() || "No image"), F(D, ` ${n() ? "Replace" : "Choose"}`);
  }), P("click", f, () => m(i, !0)), P("click", C, () => m(i, !0)), y(t, o), ct();
}
pt(["click"]);
var qv = /* @__PURE__ */ x("<i></i>"), Fv = /* @__PURE__ */ x('<button type="button" class="mb-btn ghost icon sm" title="Clear"><!></button>'), Bv = /* @__PURE__ */ x('<button type="button"><i></i></button>'), Uv = /* @__PURE__ */ x('<div class="pop svelte-168bgjg"><input class="mb-input" placeholder="Search icons" aria-label="Search icons"/> <div class="grid mb-scroll svelte-168bgjg"></div></div>'), Hv = /* @__PURE__ */ x('<div class="icon-control"><div class="row svelte-168bgjg"><button type="button" class="current svelte-168bgjg" title="Choose icon" aria-label="Choose icon"><!></button> <input class="mb-input" placeholder="fa-bolt"/> <!></div> <!></div>');
function Kv(t, e) {
  ot(e, !0);
  let n = Je(e, "value", 3, ""), r = /* @__PURE__ */ q(!1), i = /* @__PURE__ */ q(""), a = /* @__PURE__ */ q(void 0);
  const l = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css", o = "sha384-rWj9FmWWt3OMqd9vBkWRhFavvVUYalYqGPoMdL1brs/qvvqz88gvLShYa4hKNyqb", u = "mb-icons-" + Math.random().toString(36).slice(2, 8), f = "bolt rocket star heart check circle-check shield-halved lock key user users user-tie handshake briefcase building chart-line chart-simple chart-pie bullseye trophy medal award gem crown lightbulb brain robot microchip code terminal laptop mobile-screen desktop server cloud database wifi globe earth-americas map-location-dot location-dot compass envelope phone comments comment-dots headset bell calendar clock hourglass stopwatch cart-shopping bag-shopping credit-card money-bill wallet tags tag receipt truck box gift percent palette paintbrush pen-nib wand-magic-sparkles image images camera video film music microphone book book-open graduation-cap school newspaper file file-lines folder clipboard-list list-check gear gears wrench screwdriver-wrench hammer toolbox sliders filter magnifying-glass leaf seedling tree mountain sun moon cloud-sun water fire snowflake recycle house hotel utensils mug-hot pizza-slice burger wine-glass dumbbell heart-pulse stethoscope hospital paw plane car bicycle ship anchor route road thumbs-up face-smile hand-holding-heart people-group universal-access infinity arrows-rotate arrow-right link share-nodes".split(" ").map((v) => "fa-" + v), _ = "github facebook instagram x-twitter linkedin youtube tiktok whatsapp pinterest discord slack wordpress google apple".split(" ").map((v) => "fa-brands fa-" + v), S = /* @__PURE__ */ re(() => {
    const v = s(i).trim().toLowerCase().replace(/^fa-/, "");
    return [...f, ..._].filter((w) => !v || w.includes(v));
  }), g = (v) => {
    const w = String(v || "").trim();
    return w ? /\bfa-(brands|solid|regular)\b|\bfa[brs]\b/.test(w) ? w : "fa-solid " + (w.startsWith("fa-") ? w : "fa-" + w) : "";
  };
  function p() {
    const v = document.createElement("link");
    return v.rel = "stylesheet", v.href = l, v.integrity = o, v.crossOrigin = "anonymous", v.dataset.mawFa = "1", v;
  }
  hs(() => {
    document.head.querySelector("link[data-maw-fa]") || document.head.appendChild(p());
    const v = s(a).getRootNode();
    v instanceof ShadowRoot && !v.querySelector("link[data-maw-fa]") && v.prepend(p());
    const w = (j) => {
      s(r) && !j.composedPath().includes(s(a)) && m(r, !1);
    };
    return document.addEventListener("pointerdown", w, !0), () => document.removeEventListener("pointerdown", w, !0);
  });
  function b(v) {
    v.key === "Escape" && s(r) && (v.preventDefault(), v.stopPropagation(), m(r, !1));
  }
  var M = Hv(), k = h(M), C = h(k), O = h(C);
  {
    var D = (v) => {
      var w = qv();
      z((j) => Le(w, 1, j, "svelte-168bgjg"), [() => Ea(g(n()))]), y(v, w);
    }, J = (v) => {
      K(v, { name: "plus", size: 14 });
    };
    B(O, (v) => {
      n() ? v(D) : v(J, -1);
    });
  }
  var L = d(C, 2), G = d(L, 2);
  {
    var R = (v) => {
      var w = Fv(), j = h(w);
      K(j, { name: "x", size: 12 }), P("click", w, () => e.onchange("")), y(v, w);
    };
    B(G, (v) => {
      n() && v(R);
    });
  }
  var T = d(k, 2);
  {
    var I = (v) => {
      var w = Uv(), j = h(w);
      Xl(j);
      var fe = d(j, 2);
      qe(fe, 20, () => s(S), (ce) => ce, (ce, oe) => {
        var A = Bv();
        let N;
        var $ = Z(A);
        z(
          (Q, te, ke) => {
            ve(A, "aria-pressed", n() === oe), ve(A, "title", Q), ve(A, "aria-label", te), N = Le(A, 1, "svelte-168bgjg", null, N, { active: n() === oe }), Le($, 1, ke, "svelte-168bgjg");
          },
          [
            () => oe.replace("fa-brands ", ""),
            () => oe.replace("fa-brands ", ""),
            () => Ea(g(oe))
          ]
        ), P("click", A, () => {
          e.onchange(oe), m(r, !1);
        }), y(ce, A);
      }), z(() => ve(w, "id", u)), mn(j, () => s(i), (ce) => m(i, ce)), y(v, w);
    };
    B(T, (v) => {
      s(r) && v(I);
    });
  }
  zn(M, (v) => m(a, v), () => s(a)), z(() => {
    ve(C, "aria-expanded", s(r)), ve(C, "aria-controls", u), Xn(L, n());
  }), P("keydown", M, b), P("click", C, () => m(r, !s(r))), P("input", L, (v) => e.onchange(v.currentTarget.value)), y(t, M), ct();
}
pt(["keydown", "click", "input"]);
var Gv = /* @__PURE__ */ x('<div class="tools svelte-gx0hvo"><button type="button" title="Bold" class="svelte-gx0hvo"><!></button> <button type="button" title="Italic" class="svelte-gx0hvo"><!></button> <button type="button" title="Link" class="svelte-gx0hvo"><!></button> <button type="button" title="Bulleted list" class="svelte-gx0hvo"><!></button> <span class="hint svelte-gx0hvo">Markdown</span></div>'), Vv = /* @__PURE__ */ x('<div><!> <textarea class="mb-input svelte-gx0hvo"></textarea></div>');
function Jv(t, e) {
  ot(e, !0);
  let n = Je(e, "value", 3, ""), r = Je(e, "rows", 3, 4), i = Je(e, "plain", 3, !1), a = /* @__PURE__ */ q(void 0);
  function l(p, b = p, M = "text") {
    const k = s(a).selectionStart, C = s(a).selectionEnd, O = n().slice(k, C) || M, D = n().slice(0, k) + p + O + b + n().slice(C);
    e.onchange(D), requestAnimationFrame(() => {
      s(a).focus(), s(a).setSelectionRange(k + p.length, k + p.length + O.length);
    });
  }
  function o() {
    const p = n().lastIndexOf(`
`, s(a).selectionStart - 1) + 1, b = n().slice(0, p) + "- " + n().slice(p);
    e.onchange(b);
  }
  var u = Vv();
  let f;
  var _ = h(u);
  {
    var S = (p) => {
      var b = Gv(), M = h(b), k = h(M);
      K(k, { name: "bold", size: 13 });
      var C = d(M, 2), O = h(C);
      K(O, { name: "italic", size: 13 });
      var D = d(C, 2), J = h(D);
      K(J, { name: "link", size: 13 });
      var L = d(D, 2), G = h(L);
      K(G, { name: "list", size: 13 }), P("click", M, () => l("**")), P("click", C, () => l("_")), P("click", D, () => l("[", "](https://)", "link text")), P("click", L, o), y(p, b);
    };
    B(_, (p) => {
      i() || p(S);
    });
  }
  var g = d(_, 2);
  zn(g, (p) => m(a, p), () => s(a)), z(() => {
    f = Le(u, 1, "md svelte-gx0hvo", null, f, { plain: i() }), ve(g, "id", e.id), ve(g, "rows", r()), Xn(g, n());
  }), P("input", g, (p) => e.onchange(p.currentTarget.value)), y(t, u), ct();
}
pt(["click", "input"]);
var Yv = /* @__PURE__ */ x('<label class="toggle svelte-2ufken"><input type="checkbox" class="svelte-2ufken"/> <span class="track svelte-2ufken"><span class="thumb svelte-2ufken"></span></span> <span class="tl"> </span></label>'), Wv = /* @__PURE__ */ x("<option>—</option>"), Xv = /* @__PURE__ */ x("<option> </option>"), Zv = /* @__PURE__ */ x('<select class="mb-input"><!><!></select>'), Qv = /* @__PURE__ */ x('<label class="check svelte-2ufken"><input type="checkbox"/> </label>'), $v = /* @__PURE__ */ x('<div class="checks svelte-2ufken" role="group"></div>'), ef = /* @__PURE__ */ x('<input class="mb-input" type="number"/>'), tf = /* @__PURE__ */ x('<div class="color svelte-2ufken"><input type="color" class="svelte-2ufken"/><input class="mb-input"/></div>'), nf = /* @__PURE__ */ x('<input class="mb-input" type="text"/>'), sf = /* @__PURE__ */ x('<textarea class="mb-input mono svelte-2ufken" rows="4"></textarea> <div class="mb-help"> </div>', 1), rf = /* @__PURE__ */ x('<label class="mb-label"> </label> <!>', 1), af = /* @__PURE__ */ x('<div class="mb-help"> </div>'), lf = /* @__PURE__ */ x("<div><!> <!></div>");
function Ri(t, e) {
  ot(e, !0);
  let n = Je(e, "compact", 3, !1);
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
  ], i = "mb-" + Math.random().toString(36).slice(2, 9), a = /* @__PURE__ */ re(() => e.field.label || e.field.title || e.field.name), l = /* @__PURE__ */ re(() => e.field.type || "text"), o = /* @__PURE__ */ re(() => Do(e.field)), u = /* @__PURE__ */ re(() => id(e.field)), f = /* @__PURE__ */ re(() => r.includes(s(l))), _ = /* @__PURE__ */ re(() => s(l) === "markdown" || !!e.field.markdown || /markdown/i.test(s(a))), S = /* @__PURE__ */ re(() => e.target[e.field.name] ?? (s(o) ? !1 : "")), g = /* @__PURE__ */ re(() => s(S) === !0 || s(S) === 1 || s(S) === "1"), p = /* @__PURE__ */ re(() => {
    var v, w, j;
    return {
      min: ((v = e.field.validate) == null ? void 0 : v.min) ?? e.field.min,
      max: ((w = e.field.validate) == null ? void 0 : w.max) ?? e.field.max,
      step: ((j = e.field.validate) == null ? void 0 : j.step) ?? e.field.step
    };
  });
  function b(v) {
    e.store.beginEdit(), Si(e.target, e.field.name, v), e.store.endEdit();
  }
  function M(v) {
    if (v === "") return b(void 0);
    const w = Number(v);
    b(Number.isFinite(w) ? w : v);
  }
  function k(v, w) {
    const j = Array.isArray(s(S)) ? s(S).filter((fe) => fe !== v) : [];
    b(w ? [...j, v] : j);
  }
  let C = /* @__PURE__ */ q("");
  _t(() => {
    s(f) || m(C, JSON.stringify(e.target[e.field.name] ?? null, null, 2), !0);
  });
  var O = lf();
  let D;
  var J = h(O);
  {
    var L = (v) => {
      yv(v, {
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
    }, G = (v) => {
      var w = Yv(), j = h(w), fe = d(j, 4), ce = Z(fe, !0);
      z(() => {
        wl(j, s(g)), F(ce, s(a));
      }), P("change", j, (oe) => b(oe.currentTarget.checked)), y(v, w);
    }, R = (v) => {
      var w = rf(), j = Te(w), fe = Z(j, !0), ce = d(j, 2);
      {
        var oe = (W) => {
          {
            let Y = /* @__PURE__ */ re(() => String(s(S)));
            Vs(W, {
              get label() {
                return s(a);
              },
              get value() {
                return s(Y);
              },
              get options() {
                return e.field.options;
              },
              onchange: (be) => b(s(u) ? Number(be) : be)
            });
          }
        }, A = /* @__PURE__ */ re(() => {
          var W;
          return s(l) === "select" && ((W = e.field.options) == null ? void 0 : W.length) <= 4 && e.field.options.every((Y) => String(Y.label).length < 14);
        }), N = (W) => {
          var Y = Zv(), be = h(Y);
          {
            var he = (de) => {
              var ae = Wv();
              ae.value = ae.__value = "", y(de, ae);
            };
            B(be, (de) => {
              s(S) === "" && de(he);
            });
          }
          var ie = d(be);
          qe(ie, 17, () => e.field.options || [], wt, (de, ae) => {
            var xe = Xv(), De = Z(xe, !0), Ie = {};
            z(() => {
              F(De, s(ae).label), Ie !== (Ie = s(ae).value) && (xe.value = (xe.__value = Ie) ?? "");
            }), y(de, xe);
          });
          var ue;
          pr(Y), z(
            (de) => {
              ve(Y, "id", i), ue !== (ue = de) && (Y.value = (Y.__value = ue) ?? "", ci(Y, ue));
            },
            [() => String(s(S))]
          ), P("change", Y, (de) => b(s(u) ? Number(de.currentTarget.value) : de.currentTarget.value)), y(W, Y);
        }, $ = (W) => {
          var Y = $v();
          qe(Y, 21, () => e.field.options || [], wt, (be, he) => {
            var ie = Qv(), ue = h(ie), de = d(ue);
            z(
              (ae) => {
                wl(ue, ae), F(de, ` ${s(he).label ?? ""}`);
              },
              [
                () => Array.isArray(s(S)) && s(S).includes(s(he).value)
              ]
            ), P("change", ue, (ae) => k(s(he).value, ae.currentTarget.checked)), y(be, ie);
          }), z(() => ve(Y, "aria-label", s(a))), y(W, Y);
        }, Q = (W) => {
          {
            let Y = /* @__PURE__ */ re(() => s(S) || ""), be = /* @__PURE__ */ re(() => e.field.rows || (s(l) === "markdown" ? 6 : 3)), he = /* @__PURE__ */ re(() => !s(_));
            Jv(W, {
              get id() {
                return i;
              },
              get value() {
                return s(Y);
              },
              onchange: b,
              get rows() {
                return s(be);
              },
              get plain() {
                return s(he);
              }
            });
          }
        }, te = (W) => {
          jv(W, {
            get value() {
              return s(S);
            },
            onchange: b,
            get store() {
              return e.store;
            }
          });
        }, ke = (W) => {
          Kv(W, {
            get value() {
              return s(S);
            },
            onchange: b
          });
        }, we = (W) => {
          var Y = ef();
          z(() => {
            ve(Y, "id", i), Xn(Y, s(S)), ve(Y, "min", s(p).min), ve(Y, "max", s(p).max), ve(Y, "step", s(p).step);
          }), P("input", Y, (be) => M(be.currentTarget.value)), y(W, Y);
        }, le = (W) => {
          var Y = tf(), be = h(Y), he = d(be);
          z(() => {
            Xn(be, s(S) || "#000000"), ve(be, "aria-label", `${s(a) ?? ""} swatch`), ve(he, "id", i), Xn(he, s(S));
          }), P("input", be, (ie) => b(ie.currentTarget.value)), P("input", he, (ie) => b(ie.currentTarget.value)), y(W, Y);
        }, me = (W) => {
          var Y = nf();
          z(() => {
            ve(Y, "id", i), Xn(Y, s(S)), ve(Y, "placeholder", e.field.placeholder || "");
          }), P("input", Y, (be) => b(be.currentTarget.value)), y(W, Y);
        }, ze = (W) => {
          var Y = sf(), be = Te(Y), he = d(be, 2), ie = Z(he);
          z(() => {
            ve(be, "id", i), F(ie, `No control for field type “${s(l) ?? ""}” yet: edited as JSON.`);
          }), P("change", be, () => {
            try {
              b(JSON.parse(s(
                C
                /* keep editing */
              )));
            } catch {
            }
          }), mn(be, () => s(C), (ue) => m(C, ue)), y(W, Y);
        };
        B(ce, (W) => {
          s(A) ? W(oe) : s(l) === "select" ? W(N, 1) : s(l) === "checkboxes" ? W($, 2) : s(l) === "markdown" || s(l) === "textarea" ? W(Q, 3) : s(l) === "filepicker" || s(l) === "media" || s(l) === "file" ? W(te, 4) : s(l) === "iconpicker" ? W(ke, 5) : s(u) ? W(we, 6) : s(l) === "colorpicker" ? W(le, 7) : s(l) === "text" || s(l) === "date" ? W(me, 8) : W(ze, -1);
        });
      }
      z(() => {
        ve(j, "for", i), F(fe, s(a));
      }), y(v, w);
    };
    B(J, (v) => {
      s(l) === "list" ? v(L) : s(o) ? v(G, 1) : v(R, -1);
    });
  }
  var T = d(J, 2);
  {
    var I = (v) => {
      var w = af(), j = Z(w, !0);
      z(() => F(j, e.field.help)), y(v, w);
    };
    B(T, (v) => {
      e.field.help && s(l) !== "list" && v(I);
    });
  }
  z(() => D = Le(O, 1, "field svelte-2ufken", null, D, { compact: n(), inline: s(o) })), y(t, O), ct();
}
pt(["change", "input"]);
var of = /* @__PURE__ */ x('<button type="button"><span class="aa svelte-uthihf">Aa</span></button>'), cf = /* @__PURE__ */ x('<span class="aa svelte-uthihf">Aa</span>'), uf = /* @__PURE__ */ x('<label title="Custom color"><input type="color" aria-label="Custom background color" class="svelte-uthihf"/> <!></label>'), df = /* @__PURE__ */ x('<span class="live svelte-uthihf"> </span>'), vf = /* @__PURE__ */ x('<button type="button" class="mb-btn sm ghost">Clear</button>'), ff = /* @__PURE__ */ x('<button type="button" class="dot svelte-uthihf"></button>'), hf = /* @__PURE__ */ x('<span class="mb-label sub svelte-uthihf">Text color</span> <!>', 1), pf = /* @__PURE__ */ x('<div class="group custom-row svelte-uthihf"><span class="mb-label">Custom color</span> <div class="hex svelte-uthihf"><span class="chip svelte-uthihf"></span> <input class="mb-input svelte-uthihf" placeholder="#hex e.g. #0f766e" spellcheck="false"/> <!></div> <div class="suggest svelte-uthihf"></div> <!></div>'), gf = /* @__PURE__ */ x('<div class="group svelte-uthihf"><span class="mb-label">Background</span> <div class="swatches svelte-uthihf"><!> <!></div> <div class="mb-help"><!> <!></div></div> <!>', 1), bf = /* @__PURE__ */ x('<div class="group svelte-uthihf"><span class="mb-label"> </span> <!></div>'), mf = /* @__PURE__ */ x("<!> <!> <!>", 1), _f = /* @__PURE__ */ x('<button type="button"><!> </button>'), yf = /* @__PURE__ */ x(`<button type="button" title="Don't render this block anywhere"><!> Hide all</button>`), kf = /* @__PURE__ */ x('<div class="group svelte-uthihf"><span class="mb-label">Visibility</span> <div class="mb-seg svelte-uthihf"><!> <!></div> <div class="mb-help"><!></div></div>'), wf = /* @__PURE__ */ x("<!> <!>", 1);
function Mi(t, e) {
  ot(e, !0);
  let n = Je(e, "block", 7), r = Je(e, "settings", 19, () => []), i = Je(e, "mode", 3, "style");
  const a = [
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
  }, u = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i, f = /* @__PURE__ */ re(() => Object.fromEntries(r().map((A) => [A.name, A]))), _ = /* @__PURE__ */ re(() => r().filter((A) => !a.includes(A.name))), S = /* @__PURE__ */ re(() => typeof n().bg_color == "string" && u.test(n().bg_color) ? n().bg_color : "");
  let g = /* @__PURE__ */ q("");
  _t(() => {
    m(g, s(S), !0);
  });
  function p(A, N, $) {
    e.store.beginEdit(), Si(n(), A, N === $ ? void 0 : N), e.store.endEdit();
  }
  function b() {
    e.store.beginEdit(), Si(n(), "bg_color", void 0), Si(n(), "text_color", void 0), e.store.endEdit();
  }
  const M = (A) => {
    var N;
    return n()[A] ?? ((N = s(f)[A]) == null ? void 0 : N.default);
  }, k = /* @__PURE__ */ re(() => Es(n()));
  function C(A) {
    const N = s(k).includes(A) ? s(k).filter((Q) => Q !== A) : [...s(k), A], $ = l.map(([Q]) => Q).filter((Q) => N.includes(Q));
    e.store.beginEdit(), $.length ? n().hide_on = $ : delete n().hide_on, e.store.endEdit();
  }
  function O() {
    e.store.beginEdit(), n().hidden ? delete n().hidden : n().hidden = !0, e.store.endEdit();
  }
  function D(A) {
    var N;
    e.store.beginEdit(), delete n().bg_color, delete n().text_color, A === ((N = s(f).background) == null ? void 0 : N.default) ? delete n().background : n().background = A, e.store.endEdit();
  }
  function J(A) {
    u.test(A) && p("bg_color", A.toLowerCase());
  }
  function L() {
    let A = s(g).trim();
    A && !A.startsWith("#") && (A = "#" + A), A ? u.test(A) ? J(A) : m(g, s(S), !0) : b();
  }
  function G(A) {
    let N = A.replace("#", "");
    N.length === 3 && (N = N.split("").map((le) => le + le).join(""));
    const $ = (le) => (le /= 255, le <= 0.03928 ? le / 12.92 : ((le + 0.055) / 1.055) ** 2.4), [Q, te, ke] = [0, 2, 4].map((le) => parseInt(N.slice(le, le + 2), 16)), we = 0.2126 * $(Q) + 0.7152 * $(te) + 0.0722 * $(ke);
    return 1.05 / (we + 0.05) >= (we + 0.05) / 0.0597 ? "light" : "dark";
  }
  const R = (A) => {
    var N, $;
    return (($ = (N = e.store.palette) == null ? void 0 : N[A]) == null ? void 0 : $.bg) || o[A] || "var(--mb-muted)";
  }, T = (A) => {
    var N, $;
    return (($ = (N = e.store.palette) == null ? void 0 : N[A]) == null ? void 0 : $.fg) || (A === "accent" || A === "dark" ? "#fff" : "#111");
  }, I = /* @__PURE__ */ re(() => {
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
  var v = wf(), w = Te(v);
  {
    var j = (A) => {
      var N = mf(), $ = Te(N);
      {
        var Q = (le) => {
          var me = gf(), ze = Te(me), W = d(h(ze), 2), Y = h(W);
          qe(Y, 17, () => s(f).background.options || [], wt, (Ee, ye) => {
            const Ae = /* @__PURE__ */ re(() => !s(S) && M("background") === s(ye).value);
            var Se = of();
            let Ne, Ye;
            z(
              (st, lt) => {
                Ne = Le(Se, 1, "sw svelte-uthihf", null, Ne, { active: s(Ae) }), ve(Se, "title", s(ye).label), ve(Se, "aria-label", s(ye).label), ve(Se, "aria-pressed", s(Ae)), Ye = Tt(Se, "", Ye, { background: st, color: lt });
              },
              [
                () => R(s(ye).value),
                () => T(s(ye).value)
              ]
            ), P("click", Se, () => D(s(ye).value)), y(Ee, Se);
          });
          var be = d(Y, 2);
          {
            var he = (Ee) => {
              var ye = uf();
              let Ae, Se;
              var Ne = h(ye), Ye = d(Ne, 2);
              {
                var st = (Be) => {
                  var ln = cf();
                  y(Be, ln);
                }, lt = (Be) => {
                  K(Be, { name: "plus", size: 14 });
                };
                B(Ye, (Be) => {
                  s(S) ? Be(st) : Be(lt, -1);
                });
              }
              z(
                (Be) => {
                  Ae = Le(ye, 1, "sw custom svelte-uthihf", null, Ae, { active: !!s(S) }), Se = Tt(ye, "", Se, {
                    background: s(S) || "conic-gradient(#ef4444, #f59e0b, #22c55e, #06b6d4, #6366f1, #d946ef, #ef4444)",
                    color: Be
                  }), Xn(Ne, s(S) || "#2563eb");
                },
                [
                  () => s(S) ? G(s(S)) === "light" ? "#fff" : "#111" : "#fff"
                ]
              ), P("input", Ne, (Be) => J(Be.currentTarget.value)), y(Ee, ye);
            };
            B(be, (Ee) => {
              s(f).bg_color && Ee(he);
            });
          }
          var ie = d(W, 2), ue = h(ie);
          {
            var de = (Ee) => {
              var ye = nn();
              z(() => F(ye, `Custom ${s(S) ?? ""}`)), y(Ee, ye);
            }, ae = (Ee) => {
              var ye = nn();
              z((Ae) => F(ye, Ae), [
                () => {
                  var Ae;
                  return (Ae = (s(f).background.options || []).find((Se) => Se.value === M("background"))) == null ? void 0 : Ae.label;
                }
              ]), y(Ee, ye);
            };
            B(ue, (Ee) => {
              s(S) ? Ee(de) : Ee(ae, -1);
            });
          }
          var xe = d(ue, 2);
          {
            var De = (Ee) => {
              var ye = df(), Ae = Z(ye);
              z(() => F(Ae, `· colors from your theme (${e.store.palette._mode ?? ""})`)), y(Ee, ye);
            };
            B(xe, (Ee) => {
              e.store.palette && Ee(De);
            });
          }
          var Ie = d(ze, 2);
          {
            var Ue = (Ee) => {
              var ye = pf(), Ae = d(h(ye), 2), Se = h(Ae);
              let Ne;
              var Ye = d(Se, 2), st = d(Ye, 2);
              {
                var lt = (X) => {
                  var ee = vf();
                  P("click", ee, b), y(X, ee);
                };
                B(st, (X) => {
                  s(S) && X(lt);
                });
              }
              var Be = d(Ae, 2);
              qe(Be, 21, () => s(I), wt, (X, ee) => {
                var pe = ff();
                let V;
                z(() => {
                  ve(pe, "title", s(ee)), ve(pe, "aria-label", s(ee)), V = Tt(pe, "", V, { background: s(ee) });
                }), P("click", pe, () => J(s(ee))), y(X, pe);
              });
              var ln = d(Be, 2);
              {
                var _n = (X) => {
                  var ee = hf(), pe = d(Te(ee), 2);
                  {
                    let V = /* @__PURE__ */ re(() => n().text_color || "auto"), He = /* @__PURE__ */ re(() => (s(f).text_color.options || []).map((Re) => ({
                      value: Re.value,
                      label: Re.value === "auto" ? `${Re.label} (${G(s(S))})` : Re.label
                    })));
                    Vs(pe, {
                      label: "Text color",
                      get value() {
                        return s(V);
                      },
                      onchange: (Re) => p("text_color", Re, "auto"),
                      get options() {
                        return s(He);
                      }
                    });
                  }
                  y(X, ee);
                };
                B(ln, (X) => {
                  s(S) && s(f).text_color && X(_n);
                });
              }
              z(() => Ne = Tt(Se, "", Ne, { background: s(S) || "transparent" })), P("change", Ye, L), P("keydown", Ye, (X) => X.key === "Enter" && L()), mn(Ye, () => s(g), (X) => m(g, X)), y(Ee, ye);
            };
            B(Ie, (Ee) => {
              s(f).bg_color && Ee(Ue);
            });
          }
          y(le, me);
        };
        B($, (le) => {
          s(f).background && le(Q);
        });
      }
      var te = d($, 2);
      qe(te, 16, () => ["spacing", "width", "align"], wt, (le, me) => {
        var ze = At(), W = Te(ze);
        {
          var Y = (be) => {
            var he = bf(), ie = h(he), ue = Z(ie, !0), de = d(ie, 2);
            {
              let ae = /* @__PURE__ */ re(() => M(me));
              Vs(de, {
                get label() {
                  return s(f)[me].label;
                },
                get value() {
                  return s(ae);
                },
                get options() {
                  return s(f)[me].options;
                },
                onchange: (xe) => p(me, xe, s(f)[me].default)
              });
            }
            z(() => F(ue, s(f)[me].label)), y(be, he);
          };
          B(W, (be) => {
            var he;
            (he = s(f)[me]) != null && he.options && be(Y);
          });
        }
        y(le, ze);
      });
      var ke = d(te, 2);
      {
        var we = (le) => {
          Ri(le, {
            get field() {
              return s(f).reveal;
            },
            get target() {
              return n();
            },
            get store() {
              return e.store;
            }
          });
        };
        B(ke, (le) => {
          s(f).reveal && le(we);
        });
      }
      y(A, N);
    };
    B(w, (A) => {
      i() === "style" && A(j);
    });
  }
  var fe = d(w, 2);
  {
    var ce = (A) => {
      var N = At(), $ = Te(N);
      {
        var Q = (te) => {
          var ke = kf(), we = d(h(ke), 2), le = h(we);
          {
            var me = (de) => {
              var ae = At(), xe = Te(ae);
              qe(xe, 17, () => l, wt, (De, Ie) => {
                var Ue = /* @__PURE__ */ re(() => Ki(s(Ie), 3));
                let Ee = () => s(Ue)[0], ye = () => s(Ue)[1], Ae = () => s(Ue)[2];
                const Se = /* @__PURE__ */ re(() => s(k).includes(Ee()));
                var Ne = _f();
                let Ye;
                var st = h(Ne);
                {
                  let Be = /* @__PURE__ */ re(() => s(Se) ? "eye-off" : ye());
                  K(st, {
                    get name() {
                      return s(Be);
                    },
                    size: 13
                  });
                }
                var lt = d(st);
                z(
                  (Be) => {
                    Ye = Le(Ne, 1, "dev svelte-uthihf", null, Ye, { off: s(Se) }), Ne.disabled = !!n().hidden, ve(Ne, "aria-pressed", !s(Se)), ve(Ne, "title", Be), F(lt, ` ${Ae() ?? ""}`);
                  },
                  [
                    () => s(Se) ? `Hidden on ${Ae().toLowerCase()}: click to show` : `Shown on ${Ae().toLowerCase()}: click to hide`
                  ]
                ), P("click", Ne, () => C(Ee())), y(De, Ne);
              }), y(de, ae);
            };
            B(le, (de) => {
              s(f).hide_on && de(me);
            });
          }
          var ze = d(le, 2);
          {
            var W = (de) => {
              var ae = yf();
              let xe;
              var De = h(ae);
              K(De, { name: "eye-off", size: 13 }), z(() => {
                xe = Le(ae, 1, "dev svelte-uthihf", null, xe, { off: !!n().hidden }), ve(ae, "aria-pressed", !!n().hidden);
              }), P("click", ae, O), y(de, ae);
            };
            B(ze, (de) => {
              s(f).hidden && de(W);
            });
          }
          var Y = d(we, 2), be = h(Y);
          {
            var he = (de) => {
              var ae = nn("Hidden everywhere. The block isn't rendered on the site.");
              y(de, ae);
            }, ie = (de) => {
              var ae = nn();
              z((xe) => F(ae, `Hidden on ${xe ?? ""}. Still visible in this editor, striped.`), [() => s(k).join(", ")]), y(de, ae);
            }, ue = (de) => {
              var ae = nn("Shown on every screen size.");
              y(de, ae);
            };
            B(be, (de) => {
              n().hidden ? de(he) : s(k).length ? de(ie, 1) : de(ue, -1);
            });
          }
          y(te, ke);
        };
        B($, (te) => {
          (s(f).hide_on || s(f).hidden) && te(Q);
        });
      }
      y(A, N);
    }, oe = (A) => {
      var N = At(), $ = Te(N);
      qe($, 17, () => s(_), (Q) => Q.name, (Q, te) => {
        Ri(Q, {
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
    B(fe, (A) => {
      i() === "style" || i() === "visibility" ? A(ce) : i() === "advanced" && A(oe, 1);
    });
  }
  y(t, v), ct();
}
pt(["click", "input", "change", "keydown"]);
var xf = /* @__PURE__ */ x("<option>Choose…</option>"), Cl = /* @__PURE__ */ x("<option> </option>"), Sf = /* @__PURE__ */ x('<p class="muted svelte-1w5bgec">Checking…</p>'), Ef = /* @__PURE__ */ x('<li class="svelte-1w5bgec"> </li>'), Mf = /* @__PURE__ */ x('<ul class="svelte-1w5bgec"></ul>'), Tf = /* @__PURE__ */ x('<p class="muted svelte-1w5bgec">Not saved on any page yet.</p>'), Af = /* @__PURE__ */ x('<div class="usage svelte-1w5bgec"><span class="mb-label">Used on</span> <!></div>'), Cf = /* @__PURE__ */ x('<div class="global"><div class="banner svelte-1w5bgec"><!> <div class="svelte-1w5bgec"><strong> </strong> <span class="svelte-1w5bgec">Shared content. Edits apply on every page that uses it.</span></div></div> <label class="mb-label" for="mb-global-pick">Show this global section</label> <select id="mb-global-pick" class="mb-input"><!><!><!></select> <div class="actions svelte-1w5bgec"><button type="button" class="mb-btn primary"><!> Edit global section</button> <button type="button" class="mb-btn" title="Replace with an editable copy on this page"><!> Detach</button></div> <!> <!></div>');
function Of(t, e) {
  ot(e, !0);
  let n = Je(e, "block", 7), r = /* @__PURE__ */ q(null);
  const i = /* @__PURE__ */ re(() => {
    var A;
    return ((A = n().global) == null ? void 0 : A.section) || "";
  }), a = /* @__PURE__ */ re(() => e.store.sections.find((A) => A.id === s(i)));
  let l = 0;
  _t(() => {
    if (m(r, null), !s(i)) return;
    const A = ++l;
    We.section(s(i)).then((N) => {
      A === l && m(r, N.usage || [], !0);
    }).catch(() => {
      A === l && m(r, [], !0);
    });
  }), hs(() => e.store.refreshSections());
  function o(A) {
    const N = A.currentTarget.value;
    e.store.readOnly && (A.currentTarget.value = s(i)), e.store.mutate(
      () => {
        (!n().global || typeof n().global != "object") && (n().global = {}), n().global.section = N;
      },
      "Switching global section…"
    );
  }
  async function u() {
    e.store.dirty && e.store.flash("Your page changes are kept. Save the page when you come back.");
    try {
      await e.store.openSection(s(i));
    } catch (A) {
      e.store.flash(A.message);
    }
  }
  async function f() {
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
  var _ = Cf(), S = h(_), g = h(S);
  K(g, { name: "globe", size: 18 });
  var p = d(g, 2), b = h(p), M = Z(b, !0), k = d(S, 4), C = h(k);
  {
    var O = (A) => {
      var N = xf();
      N.value = N.__value = "", y(A, N);
    };
    B(C, (A) => {
      s(i) || A(O);
    });
  }
  var D = d(C);
  qe(D, 17, () => e.store.sections, (A) => A.id, (A, N) => {
    var $ = Cl(), Q = Z($), te = {};
    z(() => {
      F(Q, `${s(N).title ?? ""} (${s(N).count ?? ""})`), te !== (te = s(N).id) && ($.value = ($.__value = te) ?? "");
    }), y(A, $);
  });
  var J = d(D);
  {
    var L = (A) => {
      var N = Cl(), $ = Z(N), Q = {};
      z(() => {
        F($, `${s(i) ?? ""} (missing)`), Q !== (Q = s(i)) && (N.value = (N.__value = Q) ?? "");
      }), y(A, N);
    };
    B(J, (A) => {
      s(i) && !s(a) && A(L);
    });
  }
  var G;
  pr(k);
  var R = d(k, 2), T = h(R), I = h(T);
  K(I, { name: "edit", size: 14 });
  var v = d(T, 2), w = h(v);
  K(w, { name: "unlink", size: 14 });
  var j = d(R, 2);
  {
    var fe = (A) => {
      Mi(A, {
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
      (N = e.store.catalog) != null && N.settings && A(fe);
    });
  }
  var ce = d(j, 2);
  {
    var oe = (A) => {
      var N = Af(), $ = d(h(N), 2);
      {
        var Q = (we) => {
          var le = Sf();
          y(we, le);
        }, te = (we) => {
          var le = Mf();
          qe(le, 21, () => s(r), wt, (me, ze) => {
            var W = Ef(), Y = Z(W, !0);
            z(() => F(Y, s(ze))), y(me, W);
          }), y(we, le);
        }, ke = (we) => {
          var le = Tf();
          y(we, le);
        };
        B($, (we) => {
          s(r) === null ? we(Q) : s(r).length ? we(te, 1) : we(ke, -1);
        });
      }
      y(A, N);
    };
    B(ce, (A) => {
      s(i) && A(oe);
    });
  }
  z(() => {
    var A;
    F(M, ((A = s(a)) == null ? void 0 : A.title) || "Global section"), G !== (G = s(i)) && (k.value = (k.__value = G) ?? "", ci(k, G)), T.disabled = !s(a), v.disabled = !s(a);
  }), P("change", k, o), P("click", T, u), P("click", v, f), y(t, _), ct();
}
pt(["change", "click"]);
var Pf = /* @__PURE__ */ x('<div class="make-global svelte-17w6cpd"><span class="mb-label">Make global section</span> <p class="mb-help svelte-17w6cpd"> </p> <div class="row svelte-17w6cpd"><input class="mb-input" placeholder="Name, e.g. Services band"/> <button type="button" class="mb-btn primary"><!> </button></div></div>'), zf = /* @__PURE__ */ x(`<header class="svelte-17w6cpd"><span class="ico svelte-17w6cpd"><!></span> <div class="h svelte-17w6cpd"><strong class="svelte-17w6cpd"> </strong> <span class="svelte-17w6cpd"> </span></div> <button type="button" class="mb-btn ghost icon sm" title="Clear selection (Esc)"><!></button></header> <div class="body mb-scroll svelte-17w6cpd"><div class="multi-actions svelte-17w6cpd"><button type="button" class="mb-btn svelte-17w6cpd"><!> Move up</button> <button type="button" class="mb-btn svelte-17w6cpd"><!> Move down</button> <button type="button" class="mb-btn svelte-17w6cpd"><!> Duplicate</button> <button type="button" class="mb-btn svelte-17w6cpd"><!> Copy</button> <button type="button" class="mb-btn svelte-17w6cpd"><!> Save as pattern</button> <button type="button" class="mb-btn danger svelte-17w6cpd"><!> Delete</button></div> <p class="mb-help">Shift+click selects a range, Ctrl/Cmd+click adds or removes a block. Copy, then paste with Ctrl+V on any page's builder.</p> <!></div>`, 1), Df = /* @__PURE__ */ x('<div class="none svelte-17w6cpd"><!> <strong class="svelte-17w6cpd">No block selected</strong> <p class="svelte-17w6cpd">Click a section in the preview, or pick one in the Outline, to edit its content and style.</p> <p class="tip svelte-17w6cpd">Tip: click any heading, label or button text in the preview to type directly on the page.</p> <p class="keys svelte-17w6cpd"><span class="mb-kbd">Ctrl+Z</span> undo · <span class="mb-kbd">Ctrl+S</span> save · <span class="mb-kbd">Del</span> remove</p></div>'), Nf = /* @__PURE__ */ x('<header class="svelte-17w6cpd"><span class="ico svelte-17w6cpd"><!></span> <div class="h svelte-17w6cpd"><strong class="svelte-17w6cpd"> </strong> <span class="svelte-17w6cpd">The active theme has no definition for this type. Its content is kept exactly as saved; the site renders nothing for it until the theme defines it.</span></div> <button type="button" class="mb-btn ghost icon sm" title="Deselect"><!></button></header> <div class="body mb-scroll svelte-17w6cpd"><!> <pre class="raw svelte-17w6cpd"> </pre></div>', 1), Lf = /* @__PURE__ */ x('<div class="body mb-scroll svelte-17w6cpd"><!></div>'), Rf = /* @__PURE__ */ x("<option> </option>"), If = /* @__PURE__ */ x('<div class="make-global svelte-17w6cpd"><span class="mb-label">Make global section</span> <p class="mb-help svelte-17w6cpd">Share this block across pages. Edit it once and every page that uses it updates.</p> <div class="row svelte-17w6cpd"><input class="mb-input" placeholder="Name, e.g. Footer call to action"/> <button type="button" class="mb-btn primary"><!> </button></div></div>'), jf = /* @__PURE__ */ x('<!> <div class="field svelte-17w6cpd"><label class="mb-label" for="mb-type">Block type</label> <select id="mb-type" class="mb-input"></select></div> <!>', 1), qf = /* @__PURE__ */ x('<div class="mb-tabs tabs svelte-17w6cpd" role="group" aria-label="Block settings"><button type="button">Content</button> <button type="button">Style</button> <button type="button">Advanced</button></div> <div class="body mb-scroll svelte-17w6cpd"><!></div>', 1), Ff = /* @__PURE__ */ x('<header class="svelte-17w6cpd"><span class="ico svelte-17w6cpd"><!></span> <div class="h svelte-17w6cpd"><strong class="svelte-17w6cpd"> </strong> <span class="svelte-17w6cpd"> </span></div> <button type="button" class="mb-btn ghost icon sm" title="Deselect"><!></button></header> <!>', 1);
function Bf(t, e) {
  ot(e, !0);
  let n = Je(e, "savePattern", 3, () => {
  }), r = /* @__PURE__ */ q("content");
  const i = /* @__PURE__ */ re(() => e.store.selection);
  async function a() {
    await e.askConfirm({
      title: `Delete ${s(i).length} blocks?`,
      message: "You can undo this with Ctrl+Z.",
      choices: [
        { label: "Cancel", value: !1 },
        { label: "Delete", value: !0, primary: !0 }
      ]
    }) && e.store.removeMany(s(i));
  }
  const l = /* @__PURE__ */ re(() => e.store.selected >= 0 ? e.store.blocks[e.store.selected] : null), o = /* @__PURE__ */ re(() => s(l) ? e.store.defFor(s(l).type) : null);
  _t(() => {
    s(l) && s(o) && (typeof s(l)[s(l).type] != "object" || Array.isArray(s(l)[s(l).type])) && (s(l)[s(l).type] = {});
  });
  let u = /* @__PURE__ */ q(""), f = /* @__PURE__ */ q(!1);
  async function _(O = [e.store.selected]) {
    const D = s(u).trim();
    if (D) {
      m(f, !0);
      try {
        const J = await e.store.makeGlobal(O, D);
        m(u, ""), e.store.flash(`“${J.title}” is now a global section. Insert it on other pages from Patterns → Global.`);
      } catch (J) {
        e.store.flash(J.message);
      }
      m(f, !1);
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
  var g = At(), p = Te(g);
  {
    var b = (O) => {
      var D = zf(), J = Te(D), L = h(J), G = h(L);
      K(G, { name: "select", size: 16 });
      var R = d(L, 2), T = h(R), I = Z(T), v = d(T, 2), w = Z(v, !0), j = d(R, 2), fe = h(j);
      K(fe, { name: "x", size: 14 });
      var ce = d(J, 2), oe = h(ce), A = h(oe), N = h(A);
      K(N, { name: "up", size: 14 });
      var $ = d(A, 2), Q = h($);
      K(Q, { name: "down", size: 14 });
      var te = d($, 2), ke = h(te);
      K(ke, { name: "copy", size: 14 });
      var we = d(te, 2), le = h(we);
      K(le, { name: "clipboard", size: 14 });
      var me = d(we, 2), ze = h(me);
      K(ze, { name: "template", size: 14 });
      var W = d(me, 2), Y = h(W);
      K(Y, { name: "trash", size: 14 });
      var be = d(oe, 4);
      {
        var he = (ie) => {
          const ue = /* @__PURE__ */ re(() => s(i).filter((Ae) => {
            var Se;
            return ((Se = e.store.blocks[Ae]) == null ? void 0 : Se.type) !== "global";
          }));
          var de = Pf(), ae = d(h(de), 2), xe = Z(ae), De = d(ae, 2), Ie = h(De), Ue = d(Ie, 2), Ee = h(Ue);
          K(Ee, { name: "globe", size: 14 });
          var ye = d(Ee);
          z(
            (Ae) => {
              F(xe, `Turn ${s(ue).length === s(i).length ? `these ${s(ue).length} blocks` : `the ${s(ue).length} regular blocks`} into one shared section, placed where the first one is.`), Ue.disabled = Ae, F(ye, ` ${s(f) ? "Creating…" : "Create"}`);
            },
            [
              () => !s(u).trim() || s(f) || !s(ue).length
            ]
          ), P("keydown", Ie, (Ae) => Ae.key === "Enter" && _(s(ue))), mn(Ie, () => s(u), (Ae) => m(u, Ae)), P("click", Ue, () => _(s(ue))), y(ie, de);
        };
        B(be, (ie) => {
          e.store.isSection || ie(he);
        });
      }
      z(
        (ie, ue) => {
          F(I, `${s(i).length ?? ""} blocks selected`), F(w, ie), A.disabled = s(i)[0] === 0, $.disabled = ue;
        },
        [
          () => s(i).map((ie) => {
            var ue, de, ae;
            return ((de = e.store.defFor((ue = e.store.blocks[ie]) == null ? void 0 : ue.type)) == null ? void 0 : de.title) || ((ae = e.store.blocks[ie]) == null ? void 0 : ae.type);
          }).join(" · "),
          () => s(i).at(-1) === e.store.blocks.length - 1
        ]
      ), P("click", j, () => e.store.select(-1)), P("click", A, () => e.store.moveSelection(-1)), P("click", $, () => e.store.moveSelection(1)), P("click", te, () => e.store.duplicateMany(s(i))), P("click", we, () => e.store.copyBlocks(s(i))), P("click", me, function(...ie) {
        var ue;
        (ue = n()) == null || ue.apply(this, ie);
      }), P("click", W, a), y(O, D);
    }, M = (O) => {
      var D = Df(), J = h(D);
      K(J, { name: "settings", size: 26 }), y(O, D);
    }, k = (O) => {
      var D = Nf(), J = Te(D), L = h(J), G = h(L);
      K(G, { name: "blocks", size: 16 });
      var R = d(L, 2), T = h(R), I = Z(T), v = d(R, 2), w = h(v);
      K(w, { name: "x", size: 14 });
      var j = d(J, 2), fe = h(j);
      {
        var ce = (N) => {
          Mi(N, {
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
        B(fe, (N) => {
          var $;
          ($ = e.store.catalog) != null && $.settings && N(ce);
        });
      }
      var oe = d(fe, 2), A = Z(oe, !0);
      z(
        (N) => {
          F(I, `Unknown block “${s(l).type ?? ""}”`), F(A, N);
        },
        [
          () => JSON.stringify(s(l)[s(l).type] ?? null, null, 2)
        ]
      ), P("click", v, () => e.store.select(-1)), y(O, D);
    }, C = (O) => {
      var D = Ff(), J = Te(D), L = h(J), G = h(L);
      K(G, {
        get fa() {
          return s(o).icon;
        },
        size: 16
      });
      var R = d(L, 2), T = h(R), I = Z(T, !0), v = d(T, 2), w = Z(v, !0), j = d(R, 2), fe = h(j);
      K(fe, { name: "x", size: 14 });
      var ce = d(J, 2);
      {
        var oe = (N) => {
          var $ = Lf(), Q = h($);
          gl(Q, () => e.store.selected, (te) => {
            Of(te, {
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
          }), y(N, $);
        }, A = (N) => {
          var $ = qf(), Q = Te($), te = h(Q), ke = d(te, 2), we = d(ke, 2), le = d(Q, 2), me = h(le);
          gl(me, () => e.store.selected + ":" + s(l).type, (ze) => {
            var W = At(), Y = Te(W);
            {
              var be = (ue) => {
                var de = At(), ae = Te(de);
                qe(ae, 17, () => s(o).fields, (xe) => xe.name, (xe, De) => {
                  Ri(xe, {
                    get field() {
                      return s(De);
                    },
                    get target() {
                      return s(l)[s(l).type];
                    },
                    get store() {
                      return e.store;
                    }
                  });
                }), y(ue, de);
              }, he = (ue) => {
                Mi(ue, {
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
              }, ie = (ue) => {
                var de = jf(), ae = Te(de);
                Mi(ae, {
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
                var xe = d(ae, 2), De = d(h(xe), 2);
                qe(De, 21, () => e.store.catalog.blocks.filter((ye) => !ye.virtual), wt, (ye, Ae) => {
                  var Se = Rf(), Ne = Z(Se, !0), Ye = {};
                  z(() => {
                    F(Ne, s(Ae).title), Ye !== (Ye = s(Ae).type) && (Se.value = (Se.__value = Ye) ?? "");
                  }), y(ye, Se);
                });
                var Ie;
                pr(De);
                var Ue = d(xe, 2);
                {
                  var Ee = (ye) => {
                    var Ae = If(), Se = d(h(Ae), 4), Ne = h(Se), Ye = d(Ne, 2), st = h(Ye);
                    K(st, { name: "globe", size: 14 });
                    var lt = d(st);
                    z(
                      (Be) => {
                        Ye.disabled = Be, F(lt, ` ${s(f) ? "Creating…" : "Create"}`);
                      },
                      [() => !s(u).trim() || s(f)]
                    ), P("keydown", Ne, (Be) => Be.key === "Enter" && _()), mn(Ne, () => s(u), (Be) => m(u, Be)), P("click", Ye, () => _()), y(ye, Ae);
                  };
                  B(Ue, (ye) => {
                    e.store.isSection || ye(Ee);
                  });
                }
                z(() => {
                  Ie !== (Ie = s(l).type) && (De.value = (De.__value = Ie) ?? "", ci(De, Ie));
                }), P("change", De, S), y(ue, de);
              };
              B(Y, (ue) => {
                s(r) === "content" && s(l)[s(l).type] && typeof s(l)[s(l).type] == "object" ? ue(be) : s(r) === "style" ? ue(he, 1) : s(r) === "advanced" && ue(ie, 2);
              });
            }
            y(ze, W);
          }), z(() => {
            ve(te, "aria-pressed", s(r) === "content"), ve(ke, "aria-pressed", s(r) === "style"), ve(we, "aria-pressed", s(r) === "advanced");
          }), P("click", te, () => m(r, "content")), P("click", ke, () => m(r, "style")), P("click", we, () => m(r, "advanced")), y(N, $);
        };
        B(ce, (N) => {
          s(l).type === "global" ? N(oe) : N(A, -1);
        });
      }
      z(() => {
        F(I, s(o).title), F(w, s(o).description);
      }), P("click", j, () => e.store.select(-1)), y(O, D);
    };
    B(p, (O) => {
      s(i).length > 1 ? O(b) : s(l) ? s(o) ? O(C, -1) : O(k, 2) : O(M, 1);
    });
  }
  y(t, g), ct();
}
pt(["click", "keydown", "change"]);
const Ol = (t) => JSON.stringify(t ?? null);
function Pl(t, e) {
  const n = t.length, r = e.length, i = Array.from({ length: n + 1 }, () => new Uint16Array(r + 1));
  for (let l = n - 1; l >= 0; l--)
    for (let o = r - 1; o >= 0; o--)
      i[l][o] = t[l] === e[o] ? i[l + 1][o + 1] + 1 : Math.max(i[l + 1][o], i[l][o + 1]);
  const a = [];
  for (let l = 0, o = 0; l < n && o < r; )
    t[l] === e[o] ? (a.push([l, o]), l++, o++) : i[l + 1][o] >= i[l][o + 1] ? l++ : o++;
  return a;
}
function Ii(t, e = "", n = {}) {
  if (Array.isArray(t) && t.length && t.every((r) => r === null || typeof r != "object")) {
    const r = t.filter((i) => i !== null && i !== "").map(String).join(", ");
    r && (n[e] = r);
  } else if (Array.isArray(t))
    t.forEach((r, i) => Ii(r, e ? `${e}.${i}` : String(i), n));
  else if (t && typeof t == "object")
    for (const [r, i] of Object.entries(t)) Ii(i, e ? `${e}.${r}` : r, n);
  else t != null && t !== "" && (n[e] = typeof t == "boolean" ? t ? "Yes" : "No" : String(t));
  return n;
}
const bi = (t) => String(t).replace(/[_-]+/g, " ").replace(/^\w/, (e) => e.toUpperCase());
function Uf(t, e, { defFor: n, settings: r } = {}) {
  var u;
  const i = e.split(".");
  if (i[0] !== t.type) {
    const f = (r || []).find((_) => _.name === i[0]);
    return [(f == null ? void 0 : f.label) || bi(i[0]), ...i.slice(1).map((_) => /^\d+$/.test(_) ? String(Number(_) + 1) : bi(_))].join(" › ");
  }
  const a = ((u = n == null ? void 0 : n(t.type)) == null ? void 0 : u.fields) || [], l = [], o = [];
  for (const f of i.slice(1)) {
    if (o.push(f), /^\d+$/.test(f)) {
      l.push(String(Number(f) + 1));
      continue;
    }
    const _ = Io(a, o.join("."));
    l.push((_ == null ? void 0 : _.label) || bi(f));
  }
  return l.join(" › ") || bi(t.type);
}
function oa(t, e, n) {
  const r = Ii(t), i = Ii(e);
  return [.../* @__PURE__ */ new Set([...Object.keys(r), ...Object.keys(i)])].filter((l) => l !== "type" && r[l] !== i[l]).map((l) => ({ path: l, label: Uf(e || t, l, n), before: r[l] ?? "", after: i[l] ?? "" }));
}
function Hf(t = [], e = [], n = {}) {
  const r = t.map(Ol), i = e.map(Ol), a = new Array(t.length).fill(-1), l = new Array(e.length).fill(-1), o = {}, u = (g, p, b) => {
    a[g] = p, l[p] = g, o[p] = b;
  };
  for (const [g, p] of Pl(r, i)) u(g, p, "same");
  for (let g = 0; g < e.length; g++) {
    if (l[g] >= 0) continue;
    const p = r.findIndex((b, M) => a[M] < 0 && b === i[g]);
    p >= 0 && u(p, g, "moved");
  }
  const f = t.map((g, p) => p).filter((g) => a[g] < 0), _ = e.map((g, p) => p).filter((g) => l[g] < 0);
  for (const [g, p] of Pl(f.map((b) => {
    var M;
    return (M = t[b]) == null ? void 0 : M.type;
  }), _.map((b) => {
    var M;
    return (M = e[b]) == null ? void 0 : M.type;
  })))
    u(f[g], _[p], "changed");
  const S = [];
  return e.forEach((g, p) => {
    const b = l[p];
    if (b < 0)
      S.push({ status: "added", type: g.type, before: null, after: g, from: -1, to: p, changes: oa(null, g, n), sort: p });
    else {
      const M = o[p] === "changed" ? oa(t[b], g, n) : [];
      S.push({ status: o[p], type: g.type, before: t[b], after: g, from: b, to: p, changes: M, sort: p });
    }
  }), t.forEach((g, p) => {
    if (a[p] >= 0) return;
    let b = -1;
    for (let M = p - 1; M >= 0; M--) if (a[M] >= 0) {
      b = a[M];
      break;
    }
    S.push({ status: "removed", type: g.type, before: g, after: null, from: p, to: -1, changes: oa(g, null, n), sort: b + 0.5 + p / 1e6 });
  }), S.sort((g, p) => g.sort - p.sort), S.map(({ sort: g, ...p }) => p);
}
function Kf(t) {
  const e = { added: 0, removed: 0, changed: 0, moved: 0 };
  for (const n of t) n.status in e && e[n.status]++;
  return e;
}
var Gf = /* @__PURE__ */ x('<button type="button" class="mb-btn">Close</button> <button type="button" class="mb-btn primary"><!> </button>', 1), Vf = /* @__PURE__ */ x('<p class="error svelte-mmrwym"> </p>'), Jf = /* @__PURE__ */ x('<p class="muted svelte-mmrwym">Loading versions…</p>'), Yf = /* @__PURE__ */ x("<span> </span>"), Wf = /* @__PURE__ */ x('<span class="pos svelte-mmrwym"> </span>'), Xf = /* @__PURE__ */ x('<img alt="" class="svelte-mmrwym"/>'), Zf = /* @__PURE__ */ x('<em class="svelte-mmrwym">empty</em>'), Qf = /* @__PURE__ */ x('<span class="val svelte-mmrwym"> </span>'), $f = /* @__PURE__ */ x("<td><!> <!></td>"), eh = /* @__PURE__ */ x('<tr><td class="svelte-mmrwym"></td><td colspan="2" class="svelte-mmrwym"><button type="button" class="link svelte-mmrwym"> </button></td></tr>'), th = /* @__PURE__ */ x('<tr><td class="field svelte-mmrwym"> </td><!></tr> <!>', 1), nh = /* @__PURE__ */ x('<table class="svelte-mmrwym"><thead><tr><th class="svelte-mmrwym">Field</th><th class="svelte-mmrwym">Before</th><th class="svelte-mmrwym">After</th></tr></thead><tbody></tbody></table>'), sh = /* @__PURE__ */ x('<li><header class="svelte-mmrwym"><span> </span> <strong class="svelte-mmrwym"> </strong> <span class="sum svelte-mmrwym"> </span> <!></header> <!></li>'), rh = /* @__PURE__ */ x('<li class="muted svelte-mmrwym">Nothing to show.</li>'), ih = /* @__PURE__ */ x('<p class="counts svelte-mmrwym"><!></p> <ol class="rows svelte-mmrwym"></ol>', 1), ah = /* @__PURE__ */ x('<div class="bar svelte-mmrwym"><!> <label class="same svelte-mmrwym"><input type="checkbox"/> Show unchanged</label></div> <!>', 1);
function lh(t, e) {
  ot(e, !0);
  let n = Je(e, "previous", 3, null), r = /* @__PURE__ */ q(
    "current"
    // current | previous
  ), i = /* @__PURE__ */ q(null), a = /* @__PURE__ */ q(null), l = /* @__PURE__ */ q(""), o = /* @__PURE__ */ q(!1), u = $e({}), f = 0;
  _t(() => {
    const R = ++f;
    m(l, ""), m(i, null), We.revision(e.store.context, e.rev.id).then((T) => {
      R === f && m(i, kn(T.blocks || [], e.store.settingKeys), !0);
    }).catch((T) => {
      R === f && m(l, T.message, !0);
    });
  });
  let _ = 0;
  _t(() => {
    var I;
    const R = (I = n()) == null ? void 0 : I.id;
    if (m(a, null), s(r) !== "previous" || !R) return;
    const T = ++_;
    We.revision(e.store.context, R).then((v) => {
      T === _ && m(a, kn(v.blocks || [], e.store.settingKeys), !0);
    }).catch((v) => {
      T === _ && m(l, v.message, !0);
    });
  });
  const S = /* @__PURE__ */ re(() => {
    var R;
    return {
      defFor: (T) => e.store.defFor(T),
      settings: ((R = e.store.catalog) == null ? void 0 : R.settings) || []
    };
  }), g = /* @__PURE__ */ re(() => s(r) === "previous" ? [s(a), s(i)] : [s(i), e.store.snapshot()]), p = /* @__PURE__ */ re(() => s(g)[0] && s(g)[1] ? Hf(s(g)[0], s(g)[1], s(S)) : null), b = /* @__PURE__ */ re(() => s(p) ? Kf(s(p)) : null), M = /* @__PURE__ */ re(() => s(p) ? s(p).filter((R) => s(o) || R.status !== "same") : []), k = {
    added: "Added",
    removed: "Removed",
    changed: "Edited",
    moved: "Moved",
    same: "Unchanged"
  }, C = /\.(jpe?g|png|gif|webp|avif|svg)$/i, O = 180;
  function D(R) {
    var I, v;
    const T = R.after || R.before;
    return T.type === "global" ? "Global · " + e.store.sectionTitle((I = T.global) == null ? void 0 : I.section) : ((v = e.store.defFor(T.type)) == null ? void 0 : v.title) || T.type;
  }
  function J(R) {
    return !C.test(R) || /^(https?:)?\/\//.test(R) || R.startsWith("user://") ? "" : e.store.pageMediaUrl(R);
  }
  const L = (R) => R.length > O, G = (R, T) => L(R) && !u[T] ? R.slice(0, O) + "…" : R;
  Li(t, {
    title: "Compare versions",
    wide: !0,
    get onclose() {
      return e.onclose;
    },
    actions: (T) => {
      var I = Gf(), v = Te(I), w = d(v, 2), j = h(w);
      K(j, { name: "history", size: 14 });
      var fe = d(j);
      z((ce) => F(fe, ` Restore ${ce ?? ""}`), [() => e.when(e.rev.time)]), P("click", v, function(...ce) {
        var oe;
        (oe = e.onclose) == null || oe.apply(this, ce);
      }), P("click", w, () => e.onrestore(e.rev)), y(T, I);
    },
    children: (T, I) => {
      var v = ah(), w = Te(v), j = h(w);
      {
        let Q = /* @__PURE__ */ re(() => [
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
        Vs(j, {
          label: "Compare with",
          get value() {
            return s(r);
          },
          onchange: (te) => m(r, te, !0),
          get options() {
            return s(Q);
          }
        });
      }
      var fe = d(j, 2), ce = h(fe), oe = d(w, 2);
      {
        var A = (Q) => {
          var te = Vf(), ke = Z(te, !0);
          z(() => F(ke, s(l))), y(Q, te);
        }, N = (Q) => {
          var te = Jf();
          y(Q, te);
        }, $ = (Q) => {
          var te = ih(), ke = Te(te), we = h(ke);
          {
            var le = (W) => {
              var Y = nn("No differences.");
              y(W, Y);
            }, me = (W) => {
              var Y = At(), be = Te(Y);
              qe(
                be,
                16,
                () => [
                  ["changed", "edited"],
                  ["added", "added"],
                  ["removed", "removed"],
                  ["moved", "moved"]
                ],
                wt,
                (he, ie) => {
                  var ue = /* @__PURE__ */ re(() => Ki(ie, 2));
                  let de = () => s(ue)[0], ae = () => s(ue)[1];
                  var xe = At(), De = Te(xe);
                  {
                    var Ie = (Ue) => {
                      var Ee = Yf(), ye = Z(Ee);
                      z(() => {
                        Le(Ee, 1, `pill ${de() ?? ""}`, "svelte-mmrwym"), F(ye, `${s(b)[de()] ?? ""} ${ae() ?? ""}`);
                      }), y(Ue, Ee);
                    };
                    B(De, (Ue) => {
                      s(b)[de()] && Ue(Ie);
                    });
                  }
                  y(he, xe);
                }
              ), y(W, Y);
            };
            B(we, (W) => {
              !s(b).added && !s(b).removed && !s(b).changed && !s(b).moved ? W(le) : W(me, -1);
            });
          }
          var ze = d(ke, 2);
          qe(
            ze,
            23,
            () => s(M),
            (W, Y) => Y + W.status + W.from + ":" + W.to,
            (W, Y, be) => {
              var he = sh(), ie = h(he), ue = h(ie), de = Z(ue, !0), ae = d(ue, 2), xe = Z(ae, !0), De = d(ae, 2), Ie = Z(De, !0), Ue = d(De, 2);
              {
                var Ee = (Se) => {
                  var Ne = Wf(), Ye = Z(Ne);
                  z(() => F(Ye, `position ${s(Y).from + 1} → ${s(Y).to + 1}`)), y(Se, Ne);
                };
                B(Ue, (Se) => {
                  s(Y).status === "moved" && Se(Ee);
                });
              }
              var ye = d(ie, 2);
              {
                var Ae = (Se) => {
                  var Ne = nh(), Ye = d(h(Ne));
                  qe(Ye, 21, () => s(Y).changes, (st) => st.path, (st, lt) => {
                    const Be = /* @__PURE__ */ re(() => s(be) + s(lt).path);
                    var ln = th(), _n = Te(ln), X = h(_n), ee = Z(X, !0), pe = d(X);
                    qe(pe, 17, () => [s(lt).before, s(lt).after], wt, (rt, ut, Ut) => {
                      var St = $f();
                      Le(St, 1, Ea(Ut ? "after" : "before"), "svelte-mmrwym");
                      var Ht = h(St);
                      {
                        var Xs = (Xe) => {
                          var vt = Xf();
                          z((Rt) => ve(vt, "src", Rt), [() => J(s(ut))]), y(Xe, vt);
                        }, ps = /* @__PURE__ */ re(() => J(s(ut)));
                        B(Ht, (Xe) => {
                          s(ps) && Xe(Xs);
                        });
                      }
                      var Zs = d(Ht, 2);
                      {
                        var Qs = (Xe) => {
                          var vt = Zf();
                          y(Xe, vt);
                        }, dt = (Xe) => {
                          var vt = Qf(), Rt = Z(vt, !0);
                          z((yn) => F(Rt, yn), [() => G(s(ut), s(Be))]), y(Xe, vt);
                        };
                        B(Zs, (Xe) => {
                          s(ut) === "" ? Xe(Qs) : Xe(dt, -1);
                        });
                      }
                      y(rt, St);
                    });
                    var V = d(_n, 2);
                    {
                      var He = (rt) => {
                        var ut = eh(), Ut = d(h(ut)), St = h(Ut), Ht = Z(St, !0);
                        z(() => F(Ht, u[s(Be)] ? "Show less" : "Show full text")), P("click", St, () => u[s(Be)] = !u[s(Be)]), y(rt, ut);
                      }, Re = /* @__PURE__ */ re(() => L(s(lt).before) || L(s(lt).after));
                      B(V, (rt) => {
                        s(Re) && rt(He);
                      });
                    }
                    z(() => F(ee, s(lt).label)), y(st, ln);
                  }), y(Se, Ne);
                };
                B(ye, (Se) => {
                  s(Y).status === "changed" && Se(Ae);
                });
              }
              z(
                (Se, Ne) => {
                  Le(he, 1, `row ${s(Y).status ?? ""}`, "svelte-mmrwym"), Le(ue, 1, `pill ${s(Y).status ?? ""}`, "svelte-mmrwym"), F(de, k[s(Y).status]), F(xe, Se), F(Ie, Ne);
                },
                [
                  () => D(s(Y)),
                  () => Ya(s(Y).after || s(Y).before)
                ]
              ), y(W, he);
            },
            (W) => {
              var Y = rh();
              y(W, Y);
            }
          ), y(Q, te);
        };
        B(oe, (Q) => {
          s(l) ? Q(A) : s(p) ? Q($, -1) : Q(N, 1);
        });
      }
      Zu(ce, () => s(o), (Q) => m(o, Q)), y(T, v);
    },
    $$slots: { actions: !0, default: !0 }
  }), ct();
}
pt(["click"]);
var oh = /* @__PURE__ */ x('<p class="error svelte-19n2gxs"> </p>'), ch = /* @__PURE__ */ x('<p class="muted svelte-19n2gxs">Loading history…</p>'), uh = /* @__PURE__ */ x('<span class="time svelte-19n2gxs"> </span>'), dh = /* @__PURE__ */ x('<li><span class="dot svelte-19n2gxs"></span> <div class="body"><div class="row svelte-19n2gxs"><strong> </strong> <!></div> <div class="meta svelte-19n2gxs"> </div> <div class="types svelte-19n2gxs"> </div> <div class="btns svelte-19n2gxs"><button type="button" class="mb-btn sm" title="See what changed"><!> Compare</button> <button type="button" class="mb-btn sm"><!> </button></div></div></li>'), vh = /* @__PURE__ */ x('<p class="muted svelte-19n2gxs">No saved versions yet. Versions appear here after you save.</p>'), fh = /* @__PURE__ */ x('<div class="head svelte-19n2gxs"><p class="hint svelte-19n2gxs"> </p> <button type="button" class="mb-btn ghost icon sm" title="Refresh"><!></button></div> <!> <!> <ol class="timeline svelte-19n2gxs"></ol> <!>', 1);
function hh(t, e) {
  ot(e, !0);
  let n = Je(e, "store", 7), r = /* @__PURE__ */ q(
    ""
    // revision id while the compare dialog is open
  );
  _t(() => {
    if (s(r))
      return n().modal = { close: () => m(r, "") }, () => {
        n().modal = null;
      };
  });
  let i = /* @__PURE__ */ q($e([])), a = /* @__PURE__ */ q(!1), l = /* @__PURE__ */ q(""), o = /* @__PURE__ */ q(""), u = 0;
  async function f() {
    if (!n().canPreview) return;
    const v = ++u;
    m(a, !0), m(l, "");
    try {
      const w = await We.revisions(n().context);
      if (v !== u) return;
      m(i, (w == null ? void 0 : w.items) || [], !0);
    } catch (w) {
      v === u && m(l, w.message, !0);
    }
    v === u && m(a, !1);
  }
  _t(() => {
    JSON.stringify(n().context), n().revisionTick, f();
  });
  function _(v) {
    const w = Math.round(Date.now() / 1e3 - v);
    return w < 45 ? "just now" : w < 3600 ? `${Math.round(w / 60)} min ago` : w < 86400 ? `${Math.round(w / 3600)} h ago` : new Date(v * 1e3).toLocaleString(void 0, { dateStyle: "medium", timeStyle: "short" });
  }
  function S(v) {
    const w = (v.types || []).map((j) => {
      var fe;
      return j === "global" ? "Global" : ((fe = n().defFor(j)) == null ? void 0 : fe.title) || j;
    });
    return w.length > 4 ? w.slice(0, 4).join(" · ") + ` · +${w.length - 4}` : w.join(" · ");
  }
  async function g(v, w) {
    if (await e.askConfirm({
      title: "Restore this version?",
      message: `Loads the version from ${_(v.time)} into the editor. You can undo it, and nothing is saved until you click ${n().isSection ? "Save section" : "Update"}.`,
      choices: [
        { label: "Cancel", value: !1 },
        { label: "Restore", value: !0, primary: !0 }
      ]
    })) {
      m(o, v.id, !0);
      try {
        const fe = await We.revision(n().context, v.id);
        n().insertMany(fe.blocks || [], null, !0), n().busy = "Restoring version…", n().flash(w === 0 ? "Restored the last saved version" : `Restored version from ${_(v.time)}. Click ${n().isSection ? "Save section" : "Update"} to keep it.`);
      } catch (fe) {
        n().flash(fe.message);
      }
      m(o, "");
    }
  }
  var p = fh(), b = Te(p), M = h(b), k = Z(M), C = d(M, 2), O = h(C);
  K(O, { name: "refresh", size: 13 });
  var D = d(b, 2);
  {
    var J = (v) => {
      var w = oh(), j = Z(w, !0);
      z(() => F(j, s(l))), y(v, w);
    };
    B(D, (v) => {
      s(l) && v(J);
    });
  }
  var L = d(D, 2);
  {
    var G = (v) => {
      var w = ch();
      y(v, w);
    };
    B(L, (v) => {
      s(a) && !s(i).length && v(G);
    });
  }
  var R = d(L, 2);
  qe(
    R,
    23,
    () => s(i),
    (v) => v.id,
    (v, w, j) => {
      var fe = dh();
      let ce;
      var oe = d(h(fe), 2), A = h(oe), N = h(A), $ = Z(N, !0), Q = d(N, 2);
      {
        var te = (ue) => {
          var de = uh(), ae = Z(de, !0);
          z((xe) => F(ae, xe), [() => _(s(w).time)]), y(ue, de);
        };
        B(Q, (ue) => {
          s(j) === 0 && ue(te);
        });
      }
      var ke = d(A, 2), we = Z(ke), le = d(ke, 2), me = Z(le, !0), ze = d(le, 2), W = h(ze), Y = h(W);
      K(Y, { name: "layers", size: 12 });
      var be = d(W, 2), he = h(be);
      K(he, { name: "history", size: 12 });
      var ie = d(he);
      z(
        (ue, de) => {
          ce = Le(fe, 1, "svelte-19n2gxs", null, ce, { latest: s(j) === 0 }), F($, ue), F(we, `${s(w).count ?? ""} ${s(w).count === 1 ? "block" : "blocks"}${s(w).user ? ` · ${s(w).user}` : ""}${s(w).label ? ` · ${s(w).label}` : ""}`), F(me, de), be.disabled = s(o) === s(w).id || n().readOnly, F(ie, ` ${s(o) === s(w).id ? "Restoring…" : "Restore"}`);
        },
        [
          () => s(j) === 0 ? "Last saved" : _(s(w).time),
          () => S(s(w))
        ]
      ), P("click", W, () => m(r, s(w).id, !0)), P("click", be, () => g(s(w), s(j))), y(v, fe);
    },
    (v) => {
      var w = At(), j = Te(w);
      {
        var fe = (ce) => {
          var oe = vh();
          y(ce, oe);
        };
        B(j, (ce) => {
          !s(a) && !s(l) && ce(fe);
        });
      }
      y(v, w);
    }
  );
  var T = d(R, 2);
  {
    var I = (v) => {
      const w = /* @__PURE__ */ re(() => s(i).findIndex((oe) => oe.id === s(r)));
      var j = At(), fe = Te(j);
      {
        var ce = (oe) => {
          {
            let A = /* @__PURE__ */ re(() => s(i)[s(w) + 1] || null);
            lh(oe, {
              get store() {
                return n();
              },
              when: _,
              get rev() {
                return s(i)[s(w)];
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
        B(fe, (oe) => {
          s(w) >= 0 && oe(ce);
        });
      }
      y(v, j);
    };
    B(T, (v) => {
      s(r) && v(I);
    });
  }
  z(() => F(k, `Every save keeps a version${n().isSection ? " of this global section" : ""}. Restore any of them. You can undo, and nothing is saved until you choose to.`)), P("click", C, f), y(t, p), ct();
}
pt(["click"]);
var ph = /* @__PURE__ */ x('<button type="button"><!></button>'), gh = /* @__PURE__ */ x("<span> </span>"), bh = /* @__PURE__ */ x('<span class="avatar more svelte-1nqlp8n"> </span>'), mh = /* @__PURE__ */ x('<div class="avatars svelte-1nqlp8n" role="group" aria-label="Also open"><!> <!></div> <div class="sep svelte-1nqlp8n"></div>', 1), _h = /* @__PURE__ */ x('<span class="mini-spin svelte-1nqlp8n"></span> Saving…', 1), yh = /* @__PURE__ */ x("<!> Update", 1), kh = /* @__PURE__ */ x('<button type="button" class="mb-btn"><!> Save as pattern</button> <button type="button" class="mb-btn primary" title="Save page (Ctrl+S)"><!></button>', 1), wh = /* @__PURE__ */ x('<button type="button" class="mb-btn"><!> Back to page</button> <button type="button" class="mb-btn primary global-save svelte-1nqlp8n" title="Save global section (Ctrl+S)"><!> </button>', 1), xh = /* @__PURE__ */ x(`<div class="section-banner svelte-1nqlp8n" role="status"><!> <span class="svelte-1nqlp8n">Editing global section <strong> </strong>. Changes apply everywhere it's used<!>.</span> <button type="button" class="link svelte-1nqlp8n">Back to page</button></div>`), Sh = /* @__PURE__ */ x("<strong> </strong> ", 1), Eh = /* @__PURE__ */ x('<div class="notice lock-notice svelte-1nqlp8n" role="status"><!> <span class="svelte-1nqlp8n"><!></span> <button type="button" class="link svelte-1nqlp8n"> </button></div>'), Mh = /* @__PURE__ */ x('<div class="notice lock-notice svelte-1nqlp8n" role="alert"><!> <span class="svelte-1nqlp8n"><strong> </strong> </span> <button type="button" class="link svelte-1nqlp8n">OK</button></div>'), Th = /* @__PURE__ */ x('<div class="notice stale-notice svelte-1nqlp8n" role="alert"><!> <span class="svelte-1nqlp8n"> </span> <button type="button" class="link svelte-1nqlp8n">Load latest</button> <button type="button" class="link svelte-1nqlp8n">Keep mine</button></div>'), Ah = /* @__PURE__ */ x('<div class="notice error-notice svelte-1nqlp8n" role="alert"><!> <span class="svelte-1nqlp8n"> </span> <button type="button" class="link svelte-1nqlp8n">Try again</button> <button type="button" class="link svelte-1nqlp8n">Dismiss</button></div>'), Ch = /* @__PURE__ */ x('<div class="notice recovery-notice svelte-1nqlp8n" role="status"><!> <span class="svelte-1nqlp8n"> </span> <button type="button" class="link svelte-1nqlp8n">Restore</button> <button type="button" class="link svelte-1nqlp8n">Discard</button></div>'), Oh = /* @__PURE__ */ x('<p class="error svelte-1nqlp8n"> </p>'), Ph = /* @__PURE__ */ x('<p class="muted svelte-1nqlp8n">Loading blocks…</p>'), zh = /* @__PURE__ */ x('<button type="button" class="edge-tab left svelte-1nqlp8n" title="Show left panel"><!></button>'), Dh = /* @__PURE__ */ x('<button type="button" class="edge-tab right svelte-1nqlp8n" title="Show settings panel"><!></button>'), Nh = /* @__PURE__ */ x('<button type="button" class="mb-btn svelte-1nqlp8n">Cancel</button> <button type="button" class="mb-btn primary svelte-1nqlp8n">Save pattern</button>', 1), Lh = /* @__PURE__ */ x("<option> </option>"), Rh = /* @__PURE__ */ x('<label class="mb-label" for="mb-pattern-title">Name</label> <input id="mb-pattern-title" class="mb-input" placeholder="e.g. Services intro"/> <div class="grid2 svelte-1nqlp8n"><div><span class="mb-label">Contains</span> <select class="mb-input"><!><option> </option></select></div> <div><span class="mb-label">Type</span> <select class="mb-input"><option>Section</option><option>Full page layout</option></select></div></div>', 1), Ih = /* @__PURE__ */ x('<button type="button"> </button>'), jh = /* @__PURE__ */ x("<p> </p>"), qh = /* @__PURE__ */ x('<div><header class="top svelte-1nqlp8n"><div class="left svelte-1nqlp8n"><button type="button" class="mb-btn ghost icon" title="Close builder (Esc)"><!></button> <div class="brand svelte-1nqlp8n"><span class="logo svelte-1nqlp8n"><!></span> <div><div class="page svelte-1nqlp8n"> </div> <div class="route svelte-1nqlp8n"> </div></div></div> <div class="sep svelte-1nqlp8n"></div> <button type="button" class="mb-btn ghost icon" title="Undo (Ctrl+Z)"><!></button> <button type="button" class="mb-btn ghost icon" title="Redo (Ctrl+Shift+Z)"><!></button> <div class="sep svelte-1nqlp8n"></div> <button type="button"><!></button></div> <div class="devices svelte-1nqlp8n" role="group" aria-label="Preview width"></div> <div class="right svelte-1nqlp8n"><!> <button type="button" class="mb-btn ghost icon" title="Copy selected blocks (Ctrl+C)"><!></button> <button type="button" class="mb-btn ghost icon" title="Paste blocks (Ctrl+V)"><!></button> <button type="button" class="mb-btn ghost icon" title="Refresh preview"><!></button> <!> <div class="sep svelte-1nqlp8n"></div> <button type="button"><!></button></div></header> <!> <!> <!> <!> <div><aside><div class="mb-tabs tabs svelte-1nqlp8n" role="group" aria-label="Panel"><button type="button"><!> Blocks</button> <button type="button"><!> Patterns</button> <button type="button"><!> Outline</button> <button type="button" title="Saved versions"><!> History</button></div> <div class="panel-body mb-scroll svelte-1nqlp8n"><!></div></aside> <main class="canvas-wrap svelte-1nqlp8n"><!> <!> <!></main> <aside><div class="resize-handle svelte-1nqlp8n" role="separator" aria-orientation="vertical" aria-label="Resize settings panel" tabindex="0" title="Drag to resize · double-click to reset"></div> <div class="inspector-wrap svelte-1nqlp8n"><!></div></aside></div> <!> <div role="status" aria-live="polite"> </div> <!></div>');
function Fh(t, e) {
  ot(e, !0);
  let n = Je(e, "store", 7), r = /* @__PURE__ */ q(
    "blocks"
    // blocks | patterns | outline | history
  ), i = /* @__PURE__ */ q(
    "desktop"
    // desktop | tablet | mobile
  ), a = /* @__PURE__ */ q(
    null
    // {kind, ...}
  ), l = /* @__PURE__ */ q(void 0);
  const o = /Mac|iPhone|iPad/.test(navigator.platform);
  hs(() => {
    n().load();
    const E = (Ce) => _(Ce), H = () => m(r, "blocks"), ne = (Ce) => {
      var Ke;
      if (!n().open || s(a) || n().modal || n().imagePick || f(Ce)) return;
      const Pe = ((Ke = Ce.clipboardData) == null ? void 0 : Ke.getData("text/plain")) || "";
      n().pasteBlocks(Pe).then((Ge) => {
        Ge || n().flash("The clipboard has no blocks. Copy blocks in a builder first.");
      }), Ce.preventDefault();
    }, Me = (Ce) => {
      !s(a) && !n().imagePick && n().pasteBlocks(Ce.detail).then((Pe) => {
        Pe || n().flash("The clipboard has no blocks.");
      });
    }, Oe = () => n().refreshClipboard();
    return window.addEventListener("keydown", E, !0), document.addEventListener("paste", ne, !0), document.addEventListener("maw-paste-text", Me), document.addEventListener("maw-open-inserter", H), window.addEventListener("storage", Oe), window.addEventListener("focus", Oe), () => {
      window.removeEventListener("keydown", E, !0), document.removeEventListener("paste", ne, !0), document.removeEventListener("maw-paste-text", Me), document.removeEventListener("maw-open-inserter", H), window.removeEventListener("storage", Oe), window.removeEventListener("focus", Oe);
    };
  });
  const u = /* @__PURE__ */ re(() => n().presence);
  function f(E) {
    const H = E.composedPath()[0];
    return H && (H.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(H.tagName));
  }
  function _(E) {
    var Oe, Ce;
    if (!n().open) return;
    const H = o ? E.metaKey : E.ctrlKey, ne = E.key.toLowerCase();
    if (H && ne === "s") {
      E.preventDefault(), E.stopPropagation(), n().isSection ? p() : S();
      return;
    }
    if (H && ne === "z" && !f(E)) {
      E.preventDefault(), E.stopPropagation(), E.shiftKey ? n().redo() : n().undo();
      return;
    }
    if (H && ne === "y" && !f(E)) {
      E.preventDefault(), E.stopPropagation(), n().redo();
      return;
    }
    if (H && E.code === "Backslash") {
      E.preventDefault(), E.stopPropagation(), E.altKey ? m(v, !s(v)) : m(I, !s(I));
      return;
    }
    if (n().imagePick) {
      ne === "escape" && (n().imagePick = null, E.stopPropagation());
      return;
    }
    if (s(a)) {
      ne === "escape" && ((Ce = (Oe = s(a)).resolve) == null || Ce.call(Oe, null), m(a, null), E.stopPropagation());
      return;
    }
    if (n().modal) {
      ne === "escape" && (n().modal.close(), E.stopPropagation());
      return;
    }
    if (f(E)) return;
    if (ne === "escape") {
      E.stopPropagation(), n().selection.length > 1 ? n().select(n().selected) : n().selected >= 0 ? n().select(-1) : M();
      return;
    }
    if (H && ne === "a") {
      E.preventDefault(), E.stopPropagation(), n().selectAll();
      return;
    }
    if (n().selected < 0) return;
    const Me = n().selection;
    ne === "delete" || ne === "backspace" ? (E.preventDefault(), E.stopPropagation(), n().removeMany(Me)) : H && ne === "d" ? (E.preventDefault(), E.stopPropagation(), n().duplicateMany(Me)) : H && ne === "c" ? (E.preventDefault(), E.stopPropagation(), n().copyBlocks(Me)) : H && ne === "x" ? (E.preventDefault(), E.stopPropagation(), n().cutBlocks(Me)) : E.altKey && ne === "arrowup" ? (E.preventDefault(), n().moveSelection(-1)) : E.altKey && ne === "arrowdown" && (E.preventDefault(), n().moveSelection(1));
  }
  async function S() {
    var ne;
    if (n().isSection) return p();
    if (n().readOnly || n().saving) return;
    const E = n().snapshot(), H = n().dirty;
    if (window.dispatchEvent(new CustomEvent("grav:editor:save")), !H) {
      setTimeout(() => n().refreshBase(), 2500);
      return;
    }
    await n().confirmSaved(E) && ((ne = s(u)) == null || ne.acknowledgeStale(), n().flash("Saved"));
  }
  async function g() {
    var H;
    if (n().isSection) {
      await n().reloadSection(), (H = s(u)) == null || H.acknowledgeStale();
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
        const H = await O({
          title: "Global section changed meanwhile",
          message: `${E.message} Overwrite their changes with yours, or load their version (your edits are discarded)?`,
          choices: [
            { label: "Cancel", value: null },
            { label: "Load their version", value: "reload" },
            { label: "Overwrite", value: "force", primary: !0 }
          ]
        });
        try {
          if (H === "force") await n().saveSection(!0);
          else return H === "reload" && await n().reloadSection(), !1;
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
      const H = await O({
        title: "Unsaved global section changes",
        message: `Save changes to “${(E = n().editingSection) == null ? void 0 : E.title}” before going back to the page?`,
        choices: [
          { label: "Cancel", value: null },
          { label: "Discard", value: "discard" },
          { label: "Save & go back", value: "save", primary: !0 }
        ]
      });
      if (!H || H === "save" && !await p()) return;
      H === "discard" && n().clearBackup();
    }
    n().closeSection();
  }
  function M() {
    if (n().isSection) return b();
    e.close();
  }
  function k() {
    n().selected < 0 && !n().blocks.length || m(
      a,
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
    const E = s(a);
    if (!E.title.trim()) return;
    const H = E.scope === "selected" ? E.indexes : n().blocks.map((ne, Me) => Me);
    try {
      await n().savePattern(E.title.trim(), E.category, H), n().flash(`Pattern “${E.title.trim()}” saved`), m(a, null), m(r, "patterns");
    } catch (ne) {
      n().flash(ne.message);
    }
  }
  function O(E) {
    return new Promise((H) => {
      m(a, { kind: "confirm", ...E, resolve: H }, !0);
    });
  }
  const D = "maw-builder:layout", J = 280, L = 640, G = 340, R = 300, T = (() => {
    try {
      return JSON.parse(localStorage.getItem(D) || "{}");
    } catch {
      return {};
    }
  })();
  let I = /* @__PURE__ */ q($e(T.leftOpen ?? !0)), v = /* @__PURE__ */ q($e(T.rightOpen ?? !0)), w = /* @__PURE__ */ q($e(Math.min(L, Math.max(J, Number(T.rightWidth) || G)))), j = /* @__PURE__ */ q(!1);
  _t(() => {
    const E = {
      leftOpen: s(I),
      rightOpen: s(v),
      rightWidth: s(w)
    };
    try {
      localStorage.setItem(D, JSON.stringify(E));
    } catch {
    }
  });
  const fe = /* @__PURE__ */ re(() => `${s(I) ? R : 0}px minmax(0, 1fr) ${s(v) ? s(w) : 0}px`);
  function ce(E) {
    if (E.button !== 0) return;
    E.preventDefault();
    const H = E.currentTarget;
    try {
      H.setPointerCapture(E.pointerId);
    } catch {
    }
    const ne = E.clientX, Me = s(w), Oe = Math.min(L, Math.round(window.innerWidth * 0.5));
    m(j, !0);
    const Ce = (Ke) => {
      m(w, Math.min(Oe, Math.max(J, Me + (ne - Ke.clientX))), !0);
    }, Pe = () => {
      m(j, !1), window.removeEventListener("pointermove", Ce, !0), window.removeEventListener("pointerup", Pe, !0), window.removeEventListener("pointercancel", Pe, !0);
    };
    window.addEventListener("pointermove", Ce, !0), window.addEventListener("pointerup", Pe, !0), window.addEventListener("pointercancel", Pe, !0);
  }
  function oe(E) {
    const H = E.shiftKey ? 60 : 20;
    E.key === "ArrowLeft" ? (E.preventDefault(), m(w, Math.min(L, s(w) + H), !0)) : E.key === "ArrowRight" && (E.preventDefault(), m(w, Math.max(J, s(w) - H), !0));
  }
  const A = /* @__PURE__ */ re(() => {
    var E, H, ne, Me;
    return {
      desktop: null,
      tablet: ((H = (E = n().catalog) == null ? void 0 : E.devices) == null ? void 0 : H.tablet) || 820,
      mobile: ((Me = (ne = n().catalog) == null ? void 0 : ne.devices) == null ? void 0 : Me.mobile) || 390
    };
  });
  var N = qh();
  let $;
  var Q = h(N), te = h(Q), ke = h(te), we = h(ke);
  K(we, { name: "x" });
  var le = d(ke, 2), me = h(le), ze = h(me);
  K(ze, { name: "blocks", size: 15 });
  var W = d(me, 2), Y = h(W), be = Z(Y, !0), he = d(Y, 2), ie = Z(he, !0), ue = d(le, 4), de = h(ue);
  K(de, { name: "undo" });
  var ae = d(ue, 2), xe = h(ae);
  K(xe, { name: "redo" });
  var De = d(ae, 4);
  let Ie;
  var Ue = h(De);
  K(Ue, { name: "panel-left", size: 16 });
  var Ee = d(te, 2);
  qe(
    Ee,
    20,
    () => [
      ["desktop", "monitor", "Desktop"],
      ["tablet", "tablet", "Tablet"],
      ["mobile", "phone", "Mobile"]
    ],
    wt,
    (E, H) => {
      var ne = /* @__PURE__ */ re(() => Ki(H, 3));
      let Me = () => s(ne)[0], Oe = () => s(ne)[1], Ce = () => s(ne)[2];
      var Pe = ph();
      let Ke;
      var Ge = h(Pe);
      K(Ge, {
        get name() {
          return Oe();
        },
        size: 15
      }), z(() => {
        ve(Pe, "title", Ce()), ve(Pe, "aria-pressed", s(i) === Me()), Ke = Le(Pe, 1, "svelte-1nqlp8n", null, Ke, { active: s(i) === Me() });
      }), P("click", Pe, () => m(i, Me(), !0)), y(E, Pe);
    }
  );
  var ye = d(Ee, 2), Ae = h(ye);
  {
    var Se = (E) => {
      var H = mh(), ne = Te(H), Me = h(ne);
      qe(Me, 17, () => s(u).others.slice(0, 4), (Pe) => Pe.session, (Pe, Ke) => {
        const Ge = /* @__PURE__ */ re(() => Ms(s(Ke)));
        var it = gh();
        let Qe, Ot;
        var bs = Z(it, !0);
        z(() => {
          Qe = Le(it, 1, "avatar svelte-1nqlp8n", null, Qe, { editing: s(Ke).editing }), ve(it, "title", `${s(Ge).name ?? ""} ${s(Ke).editing ? "is editing" : "has this open"}`), Ot = Tt(it, "", Ot, { background: s(Ge).color }), F(bs, s(Ge).initials);
        }), y(Pe, it);
      });
      var Oe = d(Me, 2);
      {
        var Ce = (Pe) => {
          var Ke = bh(), Ge = Z(Ke);
          z(() => F(Ge, `+${s(u).others.length - 4}`)), y(Pe, Ke);
        };
        B(Oe, (Pe) => {
          s(u).others.length > 4 && Pe(Ce);
        });
      }
      y(E, H);
    };
    B(Ae, (E) => {
      var H;
      (H = s(u)) != null && H.others.length && E(Se);
    });
  }
  var Ne = d(Ae, 2), Ye = h(Ne);
  K(Ye, { name: "copy", size: 15 });
  var st = d(Ne, 2), lt = h(st);
  K(lt, { name: "clipboard", size: 15 });
  var Be = d(st, 2), ln = h(Be);
  K(ln, { name: "refresh", size: 15 });
  var _n = d(Be, 2);
  {
    var X = (E) => {
      var H = kh(), ne = Te(H), Me = h(ne);
      K(Me, { name: "template", size: 15 });
      var Oe = d(ne, 2), Ce = h(Oe);
      {
        var Pe = (Ge) => {
          var it = _h();
          y(Ge, it);
        }, Ke = (Ge) => {
          var it = yh(), Qe = Te(it);
          K(Qe, { name: "save", size: 15 }), y(Ge, it);
        };
        B(Ce, (Ge) => {
          n().saving ? Ge(Pe) : Ge(Ke, -1);
        });
      }
      z(() => {
        ne.disabled = !n().blocks.length, Oe.disabled = n().saving || n().readOnly;
      }), P("click", ne, k), P("click", Oe, S), y(E, H);
    }, ee = (E) => {
      var H = wh(), ne = Te(H), Me = h(ne);
      K(Me, { name: "back", size: 15 });
      var Oe = d(ne, 2), Ce = h(Oe);
      K(Ce, { name: "globe", size: 15 });
      var Pe = d(Ce);
      z(() => {
        Oe.disabled = !n().sectionDirty, F(Pe, ` ${n().sectionDirty ? "Save section" : "Saved"}`);
      }), P("click", ne, b), P("click", Oe, p), y(E, H);
    };
    B(_n, (E) => {
      n().isSection ? E(ee, -1) : E(X);
    });
  }
  var pe = d(_n, 4);
  let V;
  var He = h(pe);
  K(He, { name: "panel-right", size: 16 });
  var Re = d(Q, 2);
  {
    var rt = (E) => {
      var H = xh(), ne = h(H);
      K(ne, { name: "globe", size: 16 });
      var Me = d(ne, 2), Oe = d(h(Me)), Ce = Z(Oe, !0), Pe = d(Oe, 2);
      {
        var Ke = (it) => {
          var Qe = nn();
          z(() => F(Qe, `(${n().editingSection.usage.length ?? ""} ${n().editingSection.usage.length === 1 ? "place" : "places"})`)), y(it, Qe);
        };
        B(Pe, (it) => {
          var Qe, Ot;
          (Ot = (Qe = n().editingSection) == null ? void 0 : Qe.usage) != null && Ot.length && it(Ke);
        });
      }
      var Ge = d(Me, 2);
      z(() => {
        var it;
        return F(Ce, (it = n().editingSection) == null ? void 0 : it.title);
      }), P("click", Ge, b), y(E, H);
    };
    B(Re, (E) => {
      n().isSection && E(rt);
    });
  }
  var ut = d(Re, 2);
  {
    var Ut = (E) => {
      const H = /* @__PURE__ */ re(() => {
        var Qe;
        return ((Qe = s(u)) == null ? void 0 : Qe.editors) || [];
      });
      var ne = Eh(), Me = h(ne);
      K(Me, { name: "lock", size: 15 });
      var Oe = d(Me, 2), Ce = h(Oe);
      {
        var Pe = (Qe) => {
          var Ot = Sh(), bs = Te(Ot), Zi = Z(bs, !0), $s = d(bs);
          z(
            (Kn) => {
              F(Zi, Kn), F($s, ` ${s(H).length === 1 ? "is" : "are"} editing this ${n().isSection ? "global section" : "page"}. You're viewing read-only so you don't overwrite each other.`);
            },
            [() => s(H).map((Kn) => Ms(Kn).name).join(", ")]
          ), y(Qe, Ot);
        }, Ke = (Qe) => {
          var Ot = nn("The other editor has left. You can edit now.");
          y(Qe, Ot);
        };
        B(Ce, (Qe) => {
          s(H).length ? Qe(Pe) : Qe(Ke, -1);
        });
      }
      var Ge = d(Oe, 2), it = Z(Ge, !0);
      z(() => F(it, s(H).length ? "Edit anyway" : "Start editing")), P("click", Ge, () => {
        var Qe;
        return (Qe = s(u)) == null ? void 0 : Qe.editAnyway();
      }), y(E, ne);
    }, St = (E) => {
      var H = Mh(), ne = h(H);
      K(ne, { name: "users", size: 15 });
      var Me = d(ne, 2), Oe = h(Me), Ce = Z(Oe, !0), Pe = d(Oe), Ke = d(Me, 2);
      z(
        (Ge) => {
          F(Ce, Ge), F(Pe, ` started editing this ${n().isSection ? "global section" : "page"} too. Coordinate before saving, or one of you will overwrite the other.`);
        },
        [() => Ms(s(u).joined).name]
      ), P("click", Ke, () => s(u).joined = null), y(E, H);
    };
    B(ut, (E) => {
      var H;
      n().readOnly ? E(Ut) : (H = s(u)) != null && H.joined && E(St, 1);
    });
  }
  var Ht = d(ut, 2);
  {
    var Xs = (E) => {
      var H = Th(), ne = h(H);
      K(ne, { name: "history", size: 15 });
      var Me = d(ne, 2), Oe = Z(Me), Ce = d(Me, 2), Pe = d(Ce, 2);
      z(
        (Ke) => F(Oe, `${s(u).stale.by ? `${s(u).stale.by} saved` : "A newer version was saved"} at ${Ke ?? ""}, after you opened this. Saving now would replace their changes.`),
        [
          () => new Date(s(u).stale.modified * 1e3).toLocaleTimeString(void 0, { timeStyle: "short" })
        ]
      ), P("click", Ce, g), P("click", Pe, () => s(u).acknowledgeStale()), y(E, H);
    };
    B(Ht, (E) => {
      var H;
      (H = s(u)) != null && H.stale && !n().saving && E(Xs);
    });
  }
  var ps = d(Ht, 2);
  {
    var Zs = (E) => {
      var H = Ah(), ne = h(H);
      K(ne, { name: "x", size: 15 });
      var Me = d(ne, 2), Oe = Z(Me, !0), Ce = d(Me, 2), Pe = d(Ce, 2);
      z(() => F(Oe, n().saveError)), P("click", Ce, S), P("click", Pe, () => n().saveError = ""), y(E, H);
    }, Qs = (E) => {
      var H = Ch(), ne = h(H);
      K(ne, { name: "history", size: 15 });
      var Me = d(ne, 2), Oe = Z(Me), Ce = d(Me, 2), Pe = d(Ce, 2);
      z((Ke) => F(Oe, `Unsaved changes from ${Ke ?? ""} were found in this browser.`), [
        () => new Date(n().recovery.time).toLocaleString(void 0, { dateStyle: "medium", timeStyle: "short" })
      ]), P("click", Ce, () => n().restoreRecovery()), P("click", Pe, () => n().clearBackup()), y(E, H);
    };
    B(ps, (E) => {
      n().saveError ? E(Zs) : n().recovery && E(Qs, 1);
    });
  }
  var dt = d(ps, 2);
  let Xe, vt;
  var Rt = h(dt);
  let yn;
  var ui = h(Rt), Un = h(ui), Yi = h(Un);
  K(Yi, { name: "plus", size: 14 });
  var gs = d(Un, 2), Ho = h(gs);
  K(Ho, { name: "template", size: 14 });
  var di = d(gs, 2), Ko = h(di);
  K(Ko, { name: "layers", size: 14 });
  var Wi = d(di, 2), Go = h(Wi);
  K(Go, { name: "history", size: 14 });
  var Vo = d(ui, 2), Jo = h(Vo);
  {
    var Yo = (E) => {
      var H = Oh(), ne = Z(H, !0);
      z(() => F(ne, n().loadError)), y(E, H);
    }, Wo = (E) => {
      var H = Ph();
      y(E, H);
    }, Xo = (E) => {
      Cd(E, {
        get store() {
          return n();
        }
      });
    }, Zo = (E) => {
      Fd(E, {
        get store() {
          return n();
        },
        askConfirm: O
      });
    }, Qo = (E) => {
      Jd(E, {
        get store() {
          return n();
        }
      });
    }, $o = (E) => {
      hh(E, {
        get store() {
          return n();
        },
        askConfirm: O
      });
    };
    B(Jo, (E) => {
      n().loadError ? E(Yo) : n().catalog ? s(r) === "blocks" ? E(Xo, 2) : s(r) === "patterns" ? E(Zo, 3) : s(r) === "outline" ? E(Qo, 4) : E($o, -1) : E(Wo, 1);
    });
  }
  var Xa = d(Rt, 2), Za = h(Xa);
  zn(
    dv(Za, {
      get store() {
        return n();
      },
      get width() {
        return s(A)[s(i)];
      }
    }),
    (E) => m(l, E, !0),
    () => s(l)
  );
  var Qa = d(Za, 2);
  {
    var ec = (E) => {
      var H = zh(), ne = h(H);
      K(ne, { name: "chevron", size: 14 }), P("click", H, () => m(I, !0)), y(E, H);
    };
    B(Qa, (E) => {
      s(I) || E(ec);
    });
  }
  var tc = d(Qa, 2);
  {
    var nc = (E) => {
      var H = Dh(), ne = h(H);
      K(ne, { name: "chevron", size: 14 }), P("click", H, () => m(v, !0)), y(E, H);
    };
    B(tc, (E) => {
      s(v) || E(nc);
    });
  }
  var vi = d(Xa, 2);
  let $a;
  var Hn = h(vi);
  ve(Hn, "aria-valuemin", J), ve(Hn, "aria-valuemax", L);
  var el = d(Hn, 2), sc = h(el);
  Bf(sc, {
    get store() {
      return n();
    },
    askConfirm: O,
    savePattern: k
  });
  var tl = d(dt, 2);
  {
    var rc = (E) => {
      {
        let H = /* @__PURE__ */ re(() => n().getPath(n().imagePick.index, n().imagePick.path) || "");
        jo(E, {
          get store() {
            return n();
          },
          get current() {
            return s(H);
          },
          onselect: (ne) => n().replaceImage(ne),
          onclose: () => n().imagePick = null
        });
      }
    };
    B(tl, (E) => {
      n().imagePick && E(rc);
    });
  }
  var Xi = d(tl, 2);
  let nl;
  var ic = Z(Xi, !0), ac = d(Xi, 2);
  {
    var lc = (E) => {
      Li(E, {
        title: "Save as pattern",
        onclose: () => m(a, null),
        actions: (ne) => {
          var Me = Nh(), Oe = Te(Me), Ce = d(Oe, 2);
          z((Pe) => Ce.disabled = Pe, [() => !s(a).title.trim()]), P("click", Oe, () => m(a, null)), P("click", Ce, C), y(ne, Me);
        },
        children: (ne, Me) => {
          var Oe = Rh(), Ce = d(Te(Oe), 2);
          Xl(Ce);
          var Pe = d(Ce, 2), Ke = h(Pe), Ge = d(h(Ke), 2), it = h(Ge);
          {
            var Qe = (Zt) => {
              var fi = Lh(), cc = Z(fi, !0);
              fi.value = fi.__value = "selected", z(() => F(cc, s(a).indexes.length > 1 ? `Selected blocks (${s(a).indexes.length})` : "Selected block only")), y(Zt, fi);
            };
            B(it, (Zt) => {
              n().selected >= 0 && Zt(Qe);
            });
          }
          var Ot = d(it), bs = Z(Ot);
          Ot.value = Ot.__value = "all", pr(Ge);
          var Zi = d(Ke, 2), $s = d(h(Zi), 2), Kn = h($s);
          Kn.value = Kn.__value = "section";
          var sl = d(Kn);
          sl.value = sl.__value = "page", pr($s), z(() => F(bs, `All ${n().blocks.length ?? ""} blocks on this page`)), P("keydown", Ce, (Zt) => Zt.key === "Enter" && C()), mn(Ce, () => s(a).title, (Zt) => s(a).title = Zt), kl(Ge, () => s(a).scope, (Zt) => s(a).scope = Zt), kl($s, () => s(a).category, (Zt) => s(a).category = Zt), y(ne, Oe);
        },
        $$slots: { actions: !0, default: !0 }
      });
    }, oc = (E) => {
      Li(E, {
        get title() {
          return s(a).title;
        },
        onclose: () => {
          s(a).resolve(null), m(a, null);
        },
        actions: (ne) => {
          var Me = At(), Oe = Te(Me);
          qe(Oe, 17, () => s(a).choices, wt, (Ce, Pe) => {
            var Ke = Ih(), Ge = Z(Ke, !0);
            z(() => {
              Le(Ke, 1, `mb-btn ${s(Pe).primary ? "primary" : ""}`, "svelte-1nqlp8n"), F(Ge, s(Pe).label);
            }), P("click", Ke, () => {
              s(a).resolve(s(Pe).value), m(a, null);
            }), y(Ce, Ke);
          }), y(ne, Me);
        },
        children: (ne, Me) => {
          var Oe = jh(), Ce = Z(Oe, !0);
          z(() => F(Ce, s(a).message)), y(ne, Oe);
        },
        $$slots: { actions: !0, default: !0 }
      });
    };
    B(ac, (E) => {
      var H, ne;
      ((H = s(a)) == null ? void 0 : H.kind) === "pattern" ? E(lc) : ((ne = s(a)) == null ? void 0 : ne.kind) === "confirm" && E(oc, 1);
    });
  }
  z(
    (E) => {
      $ = Le(N, 1, "builder svelte-1nqlp8n", null, $, { "section-mode": n().isSection }), F(be, E), F(ie, n().isSection ? "Global section" : n().isFlex ? `Flex · ${n().context.type}` : n().route), ue.disabled = !n().canUndo, ae.disabled = !n().canRedo, Ie = Le(De, 1, "mb-btn ghost icon svelte-1nqlp8n", null, Ie, { on: s(I) }), ve(De, "title", s(I) ? "Hide left panel (Ctrl+)" : "Show left panel (Ctrl+)"), ve(De, "aria-pressed", s(I)), Ne.disabled = n().selected < 0, st.disabled = !n().clipboardAvailable || n().readOnly, V = Le(pe, 1, "mb-btn ghost icon svelte-1nqlp8n", null, V, { on: s(v) }), ve(pe, "title", s(v) ? "Hide settings panel (Ctrl+Alt+)" : "Show settings panel (Ctrl+Alt+)"), ve(pe, "aria-pressed", s(v)), Xe = Le(dt, 1, "body svelte-1nqlp8n", null, Xe, { resizing: s(j) }), vt = Tt(dt, "", vt, { "grid-template-columns": s(fe) }), yn = Le(Rt, 1, "panel left-panel svelte-1nqlp8n", null, yn, { collapsed: !s(I) }), Rt.inert = !s(I), ve(Rt, "aria-hidden", !s(I)), ve(Un, "aria-pressed", s(r) === "blocks"), ve(gs, "aria-pressed", s(r) === "patterns"), ve(di, "aria-pressed", s(r) === "outline"), ve(Wi, "aria-pressed", s(r) === "history"), $a = Le(vi, 1, "panel right-panel svelte-1nqlp8n", null, $a, { collapsed: !s(v) }), vi.inert = !s(v), ve(vi, "aria-hidden", !s(v)), ve(Hn, "aria-valuenow", s(w)), el.inert = n().readOnly, nl = Le(Xi, 1, "toast svelte-1nqlp8n", null, nl, { on: !!n().toast }), F(ic, n().toast);
    },
    [
      () => {
        var E;
        return n().isSection ? (E = n().editingSection) == null ? void 0 : E.title : document.title.replace(/\s*[—|-]\s*Grav Admin.*$/, "") || "Page";
      }
    ]
  ), P("click", ke, M), P("click", ue, () => n().undo()), P("click", ae, () => n().redo()), P("click", De, () => m(I, !s(I))), P("click", Ne, () => n().copyBlocks()), P("click", st, () => n().pasteBlocks()), P("click", Be, () => {
    var E;
    return (E = s(l)) == null ? void 0 : E.refresh();
  }), P("click", pe, () => m(v, !s(v))), P("click", Un, () => m(r, "blocks")), P("click", gs, () => m(r, "patterns")), P("click", di, () => m(r, "outline")), P("click", Wi, () => m(r, "history")), P("pointerdown", Hn, ce), P("dblclick", Hn, () => m(w, G)), P("keydown", Hn, oe), y(t, N), ct();
}
pt(["click", "pointerdown", "dblclick", "keydown"]);
const ca = "maw-builder:clipboard", Aa = "maw-blocks", qo = 1, Bh = ["filepicker", "media", "file"], Uh = /\.(jpe?g|png|gif|webp|avif|svg|mp4|webm|pdf)$/i;
function Hh(t, { source: e = null, theme: n = "" } = {}) {
  return { [Aa]: qo, theme: n, source: e, copied: Date.now(), blocks: JSON.parse(JSON.stringify(t)) };
}
function zl(t, { knownType: e = () => !0, inSection: n = !1 } = {}) {
  if (typeof t != "string" || !t.includes(Aa)) return null;
  let r;
  try {
    r = JSON.parse(t);
  } catch {
    return null;
  }
  if (!r || r[Aa] !== qo || !Array.isArray(r.blocks)) return null;
  const i = [], a = [];
  for (const l of r.blocks)
    !l || typeof l != "object" || typeof l.type != "string" || (!e(l.type) || n && l.type === "global" ? a.push(l.type) : i.push(l));
  return { blocks: i, skipped: a, source: r.source && typeof r.source == "object" ? r.source : null, theme: String(r.theme || "") };
}
const Kh = (t) => typeof t == "string" && Uh.test(t) && !/[/\\:]/.test(t);
function Gh(t, e) {
  var i;
  const n = /* @__PURE__ */ new Set(), r = (a, l) => {
    if (!(!l || typeof l != "object"))
      for (const o of a || []) {
        const u = l[o.name];
        o.type === "list" && Array.isArray(u) ? u.forEach((f) => r(o.fields, f)) : Bh.includes(o.type) && (Array.isArray(u) ? u : [u]).forEach((f) => Kh(f) && n.add(f));
      }
  };
  for (const a of t) r((i = e(a.type)) == null ? void 0 : i.fields, a[a.type]);
  return [...n];
}
function Vh(t, e) {
  return !t || !e || t.context !== e.context ? !1 : t.context === "page" ? String(t.route).replace(/\/$/, "") === String(e.route).replace(/\/$/, "") : t.context === "flex" ? t.type === e.type && t.key === e.key : t.id === e.id;
}
const Jh = 60, Yh = 700, Wh = 1e4, Gn = {
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
var Cr, Or, Pr, zr, Dr, Nr, Lr, Rr, Ir, jr, qr, Ft, tn, js, ss, Fr, Br, Ur, Hr, Kr, Gr, Vr, Jr, Yr, Wr, qs, Xr, Zr, Qr, $r, ei, dn, ti, Fs, et, Fo, Ca, Oa, ys, lr, ni, Ti;
class Xh {
  constructor({ context: e, fieldName: n, onChange: r }) {
    U(this, et);
    U(this, Cr, /* @__PURE__ */ q($e([])));
    U(this, Or, /* @__PURE__ */ q(-1));
    U(this, Pr, /* @__PURE__ */ q(null));
    U(this, zr, /* @__PURE__ */ q($e([])));
    U(this, Dr, /* @__PURE__ */ q(""));
    U(this, Nr, /* @__PURE__ */ q(!1));
    U(this, Lr, /* @__PURE__ */ q(!1));
    U(this, Rr, /* @__PURE__ */ q(""));
    U(this, Ir, /* @__PURE__ */ q(""));
    U(this, jr, /* @__PURE__ */ q(""));
    U(this, qr, /* @__PURE__ */ q(null));
    U(this, Ft, []);
    U(this, tn, []);
    U(this, js, 0);
    U(this, ss, !1);
    U(this, Fr, /* @__PURE__ */ q(!1));
    U(this, Br, /* @__PURE__ */ q(!1));
    U(this, Ur, /* @__PURE__ */ q(null));
    U(this, Hr, /* @__PURE__ */ q($e({})));
    U(this, Kr, /* @__PURE__ */ q($e({ kind: "unknown" })));
    U(this, Gr, /* @__PURE__ */ q($e([])));
    U(this, Vr, /* @__PURE__ */ q(null));
    U(this, Jr, /* @__PURE__ */ q(!1));
    U(this, Yr, /* @__PURE__ */ q(!1));
    U(this, Wr, /* @__PURE__ */ q(0));
    ft(this, "renderedPayload", "");
    U(this, qs, null);
    U(this, Xr, /* @__PURE__ */ q(!1));
    U(this, Zr, /* @__PURE__ */ q(""));
    U(this, Qr, /* @__PURE__ */ q(null));
    ft(this, "baseModified", 0);
    U(this, $r, /* @__PURE__ */ q(!1));
    ft(this, "presence", null);
    U(this, ei, /* @__PURE__ */ q($e([])));
    U(this, dn, -1);
    U(this, ti, /* @__PURE__ */ q(!1));
    ft(this, "modal", null);
    U(this, Fs, 0);
    /** After the next preview render, start inline editing this field: {index, path}. */
    ft(this, "pendingFocus", null);
    U(
      this,
      ni,
      /** Image clicked on the canvas: {index, path} while the media library is open for it. */
      /* @__PURE__ */ q(null)
    );
    this.context = e, this.fieldName = n, this.onChange = r;
  }
  get blocks() {
    return s(c(this, Cr));
  }
  set blocks(e) {
    m(c(this, Cr), e, !0);
  }
  get selected() {
    return s(c(this, Or));
  }
  set selected(e) {
    m(c(this, Or), e, !0);
  }
  get catalog() {
    return s(c(this, Pr));
  }
  set catalog(e) {
    m(c(this, Pr), e, !0);
  }
  get patterns() {
    return s(c(this, zr));
  }
  set patterns(e) {
    m(c(this, zr), e, !0);
  }
  get loadError() {
    return s(c(this, Dr));
  }
  set loadError(e) {
    m(c(this, Dr), e, !0);
  }
  get open() {
    return s(c(this, Nr));
  }
  set open(e) {
    m(c(this, Nr), e, !0);
  }
  get dirty() {
    return s(c(this, Lr));
  }
  set dirty(e) {
    m(c(this, Lr), e, !0);
  }
  get toast() {
    return s(c(this, Rr));
  }
  set toast(e) {
    m(c(this, Rr), e, !0);
  }
  get dragType() {
    return s(c(this, Ir));
  }
  set dragType(e) {
    m(c(this, Ir), e, !0);
  }
  get busy() {
    return s(c(this, jr));
  }
  set busy(e) {
    m(c(this, jr), e, !0);
  }
  get pendingInsert() {
    return s(c(this, qr));
  }
  set pendingInsert(e) {
    m(c(this, qr), e, !0);
  }
  get canUndo() {
    return s(c(this, Fr));
  }
  set canUndo(e) {
    m(c(this, Fr), e, !0);
  }
  get canRedo() {
    return s(c(this, Br));
  }
  set canRedo(e) {
    m(c(this, Br), e, !0);
  }
  get palette() {
    return s(c(this, Ur));
  }
  set palette(e) {
    m(c(this, Ur), e, !0);
  }
  get mediaUrls() {
    return s(c(this, Hr));
  }
  set mediaUrls(e) {
    m(c(this, Hr), e, !0);
  }
  get context() {
    return s(c(this, Kr));
  }
  set context(e) {
    m(c(this, Kr), e, !0);
  }
  get sections() {
    return s(c(this, Gr));
  }
  set sections(e) {
    m(c(this, Gr), e, !0);
  }
  get editingSection() {
    return s(c(this, Vr));
  }
  set editingSection(e) {
    m(c(this, Vr), e, !0);
  }
  get sectionDirty() {
    return s(c(this, Jr));
  }
  set sectionDirty(e) {
    m(c(this, Jr), e, !0);
  }
  get inlineEditing() {
    return s(c(this, Yr));
  }
  set inlineEditing(e) {
    m(c(this, Yr), e, !0);
  }
  get revisionTick() {
    return s(c(this, Wr));
  }
  set revisionTick(e) {
    m(c(this, Wr), e, !0);
  }
  get saving() {
    return s(c(this, Xr));
  }
  set saving(e) {
    m(c(this, Xr), e, !0);
  }
  get saveError() {
    return s(c(this, Zr));
  }
  set saveError(e) {
    m(c(this, Zr), e, !0);
  }
  get recovery() {
    return s(c(this, Qr));
  }
  set recovery(e) {
    m(c(this, Qr), e, !0);
  }
  get readOnly() {
    return s(c(this, $r));
  }
  set readOnly(e) {
    m(c(this, $r), e, !0);
  }
  get multi() {
    return s(c(this, ei));
  }
  set multi(e) {
    m(c(this, ei), e, !0);
  }
  get clipboardAvailable() {
    return s(c(this, ti));
  }
  set clipboardAvailable(e) {
    m(c(this, ti), e, !0);
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
    clearTimeout(c(this, Fs)), this.backupKey && Gn.remove(this.backupKey), this.recovery = null;
  }
  /** Offer a backup that differs from what's loaded and was written after the last server save. */
  async checkRecovery() {
    const e = this.backupKey, n = e && Gn.get(e);
    if (!this.canPreview) return;
    try {
      const i = await We.state(this.context, this.fieldName);
      this.baseModified = (i == null ? void 0 : i.modified) || 0;
    } catch {
    }
    if (!n || !Array.isArray(n.blocks)) return;
    if (JSON.stringify(kn(n.blocks, this.settingKeys)) === JSON.stringify(this.snapshot()) || n.time <= this.baseModified * 1e3) {
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
      const e = await We.state(this.context, this.fieldName);
      e != null && e.modified && (this.baseModified = e.modified);
    } catch {
    }
  }
  /**
   * A newer version is saved: when it holds exactly our blocks it is our own save, so it becomes the base and nothing
   * of ours is unsaved. Admin2's Save button saves the form without telling the field (no `grav:editor:save`, no new
   * `value`), so this is where such a save is noticed. Returns whether it was ours.
   */
  async adoptSaved() {
    if (this.isSection) return !1;
    const e = this.ownerKey, n = this.snapshot();
    let r;
    try {
      r = await We.state(this.context, this.fieldName, n);
    } catch {
      return !1;
    }
    return !(r != null && r.matches) || e !== this.ownerKey ? !1 : (this.baseModified = r.modified || this.baseModified, JSON.stringify(this.snapshot()) === JSON.stringify(n) && (this.dirty = !1, this.clearBackup()), this.revisionTick++, !0);
  }
  // ─── selection ───────────────────────────────────────────
  /** Selected block indexes (one or many), sorted. */
  get selection() {
    return this.selected < 0 ? [] : this.multi.length > 1 && this.multi.includes(this.selected) ? this.multi : [this.selected];
  }
  select(e) {
    this.selected = e, this.multi = e >= 0 ? [e] : [], se(this, dn, e);
  }
  toggleSelect(e) {
    if (e < 0) return;
    const n = this.selection;
    if (n.includes(e)) {
      const r = n.filter((i) => i !== e);
      if (!r.length) return this.select(-1);
      this.multi = r, this.selected = r.at(-1);
    } else
      this.multi = [...n, e].sort((r, i) => r - i), this.selected = e;
    se(this, dn, e);
  }
  rangeSelect(e) {
    if (e < 0) return;
    const n = c(this, dn) >= 0 && c(this, dn) < this.blocks.length ? c(this, dn) : this.selected >= 0 ? this.selected : e, [r, i] = n < e ? [n, e] : [e, n];
    this.multi = Array.from({ length: i - r + 1 }, (a, l) => r + l), this.selected = e;
  }
  selectAll() {
    this.blocks.length && (this.multi = this.blocks.map((e, n) => n), this.selected = this.blocks.length - 1, se(this, dn, 0));
  }
  // ─── group operations ────────────────────────────────────
  removeMany(e) {
    const n = [...new Set(e)].filter((r) => r >= 0 && r < this.blocks.length).sort((r, i) => i - r);
    if (n.length) {
      if (n.length === 1) return this.remove(n[0]);
      this.mutate((r) => n.forEach((i) => r.splice(i, 1)), `Removing ${n.length} blocks…`), this.select(Math.min(n.at(-1), this.blocks.length - 1)), this.flash(`${n.length} blocks removed. Ctrl+Z to undo.`);
    }
  }
  duplicateMany(e) {
    const n = [...new Set(e)].sort((a, l) => a - l);
    if (n.length <= 1) return n.length && this.duplicate(n[0]);
    const r = n.map((a) => El(Vn(this.blocks[a]))), i = n.at(-1) + 1;
    this.mutate((a) => a.splice(i, 0, ...r), `Duplicating ${r.length} blocks…`), ge(this, et, Ca).call(this, i, r.length);
  }
  /** Move the current selection up (-1) or down (+1). */
  moveSelection(e) {
    const n = this.selection;
    if (n.length <= 1) return this.move(this.selected, this.selected + e);
    if (n[0] + e < 0 || n.at(-1) + e >= this.blocks.length) return;
    let r = n;
    this.mutate(
      (i) => {
        r = gv(i, n, e);
      },
      `Moving ${n.length} blocks…`
    ), this.multi = r, this.selected = r.at(-1);
  }
  // ─── copy / paste ────────────────────────────────────────
  refreshClipboard() {
    this.clipboardAvailable = !!Gn.get(ca);
  }
  /** Copy blocks to the system clipboard (JSON) and this browser's storage (for the Paste button). */
  async copyBlocks(e = this.selection) {
    var i, a;
    const n = [...e].sort((l, o) => l - o).map((l) => this.snapshot()[l]).filter(Boolean);
    if (!n.length) return !1;
    const r = Hh(n, {
      source: wn(this.context),
      theme: ((i = this.catalog) == null ? void 0 : i.theme) || ""
    });
    Gn.set(ca, r), this.clipboardAvailable = !0;
    try {
      await ((a = navigator.clipboard) == null ? void 0 : a.writeText(JSON.stringify(r)));
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
    var f;
    if (this.readOnly)
      return this.mutate(() => {
      }), !0;
    const n = {
      knownType: (_) => !!this.defFor(_),
      inSection: this.isSection
    }, r = Gn.get(ca), i = zl(e, n) || (r ? zl(JSON.stringify(r), n) : null);
    if (!i) return !1;
    if (!i.blocks.length)
      return this.flash(i.skipped.length ? `Nothing to paste: ${i.skipped.join(", ")} can't be used here.` : "Nothing to paste."), !0;
    const a = [];
    i.skipped.length && a.push(`skipped ${i.skipped.length} (${[...new Set(i.skipped)].join(", ")})`);
    const l = Gh(i.blocks, (_) => this.defFor(_));
    if (l.length && i.source && !Vh(i.source, wn(this.context)))
      if (this.isSection)
        a.push(`${l.length} image${l.length === 1 ? "" : "s"} must be re-picked from the site library`);
      else {
        this.busy = "Copying images…";
        try {
          const _ = await We.copyMedia(i.source, this.context, l);
          (f = _ == null ? void 0 : _.copied) != null && f.length && (a.push(`${_.copied.length} image${_.copied.length === 1 ? "" : "s"} copied`), await this.loadOwnMedia());
          const S = [...(_ == null ? void 0 : _.missing) || [], ...(_ == null ? void 0 : _.refused) || []];
          S.length && a.push(`${S.length} image${S.length === 1 ? "" : "s"} not found`);
        } catch (_) {
          a.push(`images not copied (${_.message})`);
        }
      }
    const o = this.selection.length ? this.selection.at(-1) + 1 : this.blocks.length, u = i.blocks.length;
    return this.insertMany(i.blocks, o), ge(this, et, Ca).call(this, o, u), this.flash(`Pasted ${u} block${u === 1 ? "" : "s"}${a.length ? ": " + a.join(", ") : ""}`), !0;
  }
  // ─── save confirmation ───────────────────────────────────
  /**
   * After Admin2's save was triggered: poll until the server has exactly these blocks, or give up.
   * A failed validation or an expired session never writes the file, so a timeout means "not saved".
   */
  async confirmSaved(e) {
    this.saving = !0, this.saveError = "";
    const n = Date.now() + Wh;
    try {
      for (; Date.now() < n; ) {
        await new Promise((r) => setTimeout(r, Yh));
        try {
          const r = await We.state(this.context, this.fieldName, e);
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
      const e = await We.ownMedia(this.context), n = Array.isArray(e) ? e : (e == null ? void 0 : e.items) || (e == null ? void 0 : e.files) || [];
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
          We.blocks(),
          We.patterns().catch(() => []),
          We.sections().catch(() => [])
        ]);
        this.catalog = e, this.patterns = n || [], this.sections = r || [], this.blocks = kn(Vn(this.blocks), this.settingKeys), this.canPreview && this.loadOwnMedia(), this.checkRecovery();
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
    const n = kn(e, this.catalog ? this.settingKeys : null);
    JSON.stringify(n) !== JSON.stringify(Vn(this.blocks)) && (this.blocks = n, this.selected >= n.length && (this.selected = n.length - 1));
  }
  snapshot() {
    return Vn(this.blocks);
  }
  // ─── inline editing ──────────────────────────────────────
  /** Read a content field by path ("items.2.answer") from block[index]. */
  getPath(e, n) {
    return Al(this.blocks[e], n);
  }
  /**
   * Markdown edited on the canvas. Unlike plain text, the rendered result can differ from what was typed
   * (lists, links…), so the preview re-renders to show exactly what will be saved.
   */
  inlineSetMarkdown(e, n, r, i = "Updating text…") {
    (this.getPath(e, n) ?? "") !== r && (this.inlineSet(e, n, r), this.renderedPayload = "", this.busy = i);
  }
  /**
   * Repeater actions from the canvas.
   * op: add (at end) | duplicate | remove | move (item → to)
   */
  listOp({ index: e, path: n, op: r, item: i, to: a, label: l = "item" }) {
    var S;
    const o = this.blocks[e];
    if (!o || this.readOnly) return;
    const u = Io((S = this.defFor(o.type)) == null ? void 0 : S.fields, n), f = l || "item", _ = f.charAt(0).toUpperCase() + f.slice(1);
    if (this.selected = e, r === "add") {
      const g = No(u, f), p = ((u == null ? void 0 : u.fields) || []).find(rd) || ((u == null ? void 0 : u.fields) || []).find(gr);
      let b = 0;
      this.mutate(
        () => {
          b = Fn.add(gi(o, n), g);
        },
        `Adding ${f}…`
      ), p && (this.pendingFocus = { index: e, path: `${n}.${b}.${p.name}` });
    } else r === "duplicate" ? this.mutate(() => Fn.duplicate(gi(o, n), i), `Duplicating ${f}…`) : r === "remove" ? (this.mutate(() => Fn.remove(gi(o, n), i), `Removing ${f}…`), this.flash(`${_} removed. Ctrl+Z to undo.`)) : r === "move" && this.mutate(() => Fn.move(gi(o, n), i, a), `Moving ${f}…`);
  }
  get imagePick() {
    return s(c(this, ni));
  }
  set imagePick(e) {
    m(c(this, ni), e, !0);
  }
  replaceImage(e) {
    const n = this.imagePick;
    this.imagePick = null, !(!n || !e) && (this.selected = n.index, this.inlineSetMarkdown(n.index, n.path, e, "Replacing image…"));
  }
  inlineSet(e, n, r) {
    const i = this.blocks[e];
    !i || typeof n != "string" || this.readOnly || (Al(i, n) ?? "") !== r && (this.beginEdit(), hv(i, n, r), this.busy = "", this.renderedPayload = JSON.stringify(this.snapshot()), this.endEdit());
  }
  // ─── global sections ─────────────────────────────────────
  sectionTitle(e) {
    var n;
    return ((n = this.sections.find((r) => r.id === e)) == null ? void 0 : n.title) || e || "Global section";
  }
  async refreshSections() {
    this.sections = await We.sections().catch(() => this.sections) || [];
  }
  /** Insert a reference to an existing global section. */
  insertGlobal(e, n = null) {
    const r = n ?? (this.selected >= 0 ? this.selected + 1 : this.blocks.length);
    this.pendingInsert = { index: r, title: this.sectionTitle(e) }, this.mutate((i) => i.splice(r, 0, { type: "global", global: { section: e } }), `Adding ${this.sectionTitle(e)}…`), this.selected = r;
  }
  /** Turn blocks into a new global section and replace them with one reference. */
  async makeGlobal(e, n) {
    const r = [...e].sort((o, u) => o - u), i = r.map((o) => this.snapshot()[o]).filter((o) => o && o.type !== "global");
    if (!i.length) throw new Error("Pick at least one regular block.");
    const a = await We.createSection(n, i);
    await this.refreshSections();
    const l = r[0];
    return this.mutate(
      (o) => {
        for (const u of [...r].reverse()) o.splice(u, 1);
        o.splice(l, 0, { type: "global", global: { section: a.id } });
      },
      "Creating global section…"
    ), this.selected = l, a;
  }
  /** Replace a global reference with editable copies of its blocks (the section itself is untouched). */
  async detachGlobal(e) {
    var l;
    const n = this.blocks[e], r = (l = n == null ? void 0 : n.global) == null ? void 0 : l.section;
    if (!r) return;
    const i = await We.section(r), a = kn(JSON.parse(JSON.stringify(i.blocks || [])), this.settingKeys);
    this.mutate((o) => o.splice(e, 1, ...a), "Detaching section…"), this.selected = e;
  }
  /** Open a global section in the builder. The page's blocks, selection and undo history are restored on close. */
  async openSection(e) {
    this.isSection && await this.closeSection();
    const n = await We.section(e);
    se(this, qs, {
      context: Vn(this.context),
      blocks: this.snapshot(),
      selected: this.selected,
      past: c(this, Ft),
      future: c(this, tn),
      baseModified: this.baseModified
    }), se(this, Ft, []), se(this, tn, []), ge(this, et, ys).call(this), this.renderedPayload = "", this.context = { kind: "section", id: e }, this.editingSection = {
      id: e,
      title: n.title,
      usage: n.usage || [],
      rev: n.rev
    }, this.blocks = kn(n.blocks || [], this.settingKeys), this.selected = -1, this.sectionDirty = !1, this.busy = `Opening ${n.title}…`, this.checkRecovery();
  }
  /** Throw away local section edits and load what's saved now (after a conflict). */
  async reloadSection() {
    if (!this.isSection) return;
    const e = this.context.id, n = await We.section(e);
    this.clearBackup(), this.renderedPayload = "", this.editingSection = {
      id: e,
      title: n.title,
      usage: n.usage || [],
      rev: n.rev
    }, this.blocks = kn(n.blocks || [], this.settingKeys), this.sectionDirty = !1, this.busy = "Loading latest version…";
  }
  closeSection() {
    const e = c(this, qs);
    e && (se(this, qs, null), this.renderedPayload = "", this.context = e.context, this.editingSection = null, this.sectionDirty = !1, this.blocks = e.blocks, this.selected = e.selected, se(this, Ft, e.past), se(this, tn, e.future), this.baseModified = e.baseModified, this.recovery = null, ge(this, et, ys).call(this), this.busy = "Back to page…");
  }
  /** Save the open global section. Throws an Error with status 409 when someone else saved it first (retry with force). */
  async saveSection(e = !1) {
    var r;
    if (!this.isSection) return;
    const n = await We.updateSection(this.context.id, { blocks: this.snapshot(), base_rev: (r = this.editingSection) == null ? void 0 : r.rev }, e);
    this.sectionDirty = !1, this.clearBackup(), this.editingSection = { ...this.editingSection, title: n.title, rev: n.rev }, await this.refreshSections(), this.revisionTick++, this.flash(`Global section “${n.title}” saved. It updates everywhere it's used.`);
  }
  /** Structural change: record history immediately. */
  mutate(e, n = "Updating page…") {
    if (this.readOnly) {
      this.flash("Read-only: someone else is editing. Click “Edit anyway” to make changes.");
      return;
    }
    this.busy = n, ge(this, et, Ti).call(this), ge(this, et, Oa).call(this), this.multi = [], e(this.blocks), ge(this, et, lr).call(this);
  }
  /** Field edits: one history entry per burst of typing. Call BEFORE applying the change. */
  beginEdit() {
    this.busy = "Updating preview…", c(this, ss) || (ge(this, et, Oa).call(this), se(this, ss, !0)), clearTimeout(c(this, js)), se(this, js, setTimeout(() => se(this, ss, !1), 700));
  }
  endEdit() {
    ge(this, et, lr).call(this);
  }
  undo() {
    ge(this, et, Ti).call(this), c(this, Ft).length && (this.busy = "Undoing…", c(this, tn).push(JSON.stringify(this.snapshot())), this.blocks = JSON.parse(c(this, Ft).pop()), this.multi = [], this.selected >= this.blocks.length && (this.selected = this.blocks.length - 1), ge(this, et, ys).call(this), ge(this, et, lr).call(this));
  }
  redo() {
    ge(this, et, Ti).call(this), c(this, tn).length && (this.busy = "Redoing…", c(this, Ft).push(JSON.stringify(this.snapshot())), this.blocks = JSON.parse(c(this, tn).pop()), this.multi = [], this.selected >= this.blocks.length && (this.selected = this.blocks.length - 1), ge(this, et, ys).call(this), ge(this, et, lr).call(this));
  }
  // ─── operations ──────────────────────────────────────────
  insert(e, n = null) {
    const r = this.defFor(e);
    if (!r) return;
    const i = n ?? (this.selected >= 0 ? this.selected + 1 : this.blocks.length);
    this.pendingInsert = { index: i, title: r.title }, this.mutate((a) => a.splice(i, 0, Sl(r)), `Adding ${r.title}…`), this.selected = i;
  }
  insertMany(e, n = null, r = !1) {
    var l;
    const i = kn(JSON.parse(JSON.stringify(e)), this.settingKeys);
    if (!i.length) return;
    if (r) {
      this.mutate((o) => o.splice(0, o.length, ...i), "Building page layout…"), this.selected = 0;
      return;
    }
    const a = n ?? (this.selected >= 0 ? this.selected + 1 : this.blocks.length);
    this.pendingInsert = {
      index: a,
      title: i.length > 1 ? `${i.length} sections` : (l = this.defFor(i[0].type)) == null ? void 0 : l.title
    }, this.mutate((o) => o.splice(a, 0, ...i), `Adding ${i.length > 1 ? i.length + " sections" : "pattern"}…`), this.selected = a;
  }
  remove(e) {
    e < 0 || e >= this.blocks.length || (this.mutate((n) => n.splice(e, 1), "Removing block…"), this.selected = Math.min(e, this.blocks.length - 1));
  }
  duplicate(e) {
    const n = this.blocks[e];
    n && (this.mutate((r) => r.splice(e + 1, 0, El(Vn(n))), "Duplicating block…"), this.selected = e + 1);
  }
  move(e, n) {
    n < 0 || n >= this.blocks.length || e === n || (this.mutate(
      (r) => {
        const [i] = r.splice(e, 1);
        r.splice(n, 0, i);
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
    const r = this.defFor(n), i = this.blocks[e];
    !r || !i || i.type === n || this.mutate(
      (a) => {
        const l = Sl(r);
        for (const o of this.settingKeys) i[o] !== void 0 && (l[o] = i[o]);
        a[e] = l;
      },
      `Changing to ${r.title}…`
    );
  }
  flash(e) {
    this.toast = e, clearTimeout(this.toastTimer), this.toastTimer = setTimeout(() => this.toast = "", 2600);
  }
  async savePattern(e, n, r) {
    const i = [...r].sort((l, o) => l - o).map((l) => this.snapshot()[l]).filter(Boolean), a = await We.savePattern({ title: e, category: n, blocks: i });
    return this.patterns = [...this.patterns, a], a;
  }
  async deletePattern(e) {
    await We.deletePattern(e), this.patterns = this.patterns.filter((n) => n.id !== e);
  }
}
Cr = new WeakMap(), Or = new WeakMap(), Pr = new WeakMap(), zr = new WeakMap(), Dr = new WeakMap(), Nr = new WeakMap(), Lr = new WeakMap(), Rr = new WeakMap(), Ir = new WeakMap(), jr = new WeakMap(), qr = new WeakMap(), Ft = new WeakMap(), tn = new WeakMap(), js = new WeakMap(), ss = new WeakMap(), Fr = new WeakMap(), Br = new WeakMap(), Ur = new WeakMap(), Hr = new WeakMap(), Kr = new WeakMap(), Gr = new WeakMap(), Vr = new WeakMap(), Jr = new WeakMap(), Yr = new WeakMap(), Wr = new WeakMap(), qs = new WeakMap(), Xr = new WeakMap(), Zr = new WeakMap(), Qr = new WeakMap(), $r = new WeakMap(), ei = new WeakMap(), dn = new WeakMap(), ti = new WeakMap(), Fs = new WeakMap(), et = new WeakSet(), // ─── local backup of unsaved edits ───────────────────────
Fo = function() {
  clearTimeout(c(this, Fs));
  const e = this.backupKey;
  e && se(this, Fs, setTimeout(() => Gn.set(e, { blocks: this.snapshot(), time: Date.now() }), 1e3));
}, /** Select a contiguous range after a structural change. */
Ca = function(e, n) {
  this.multi = Array.from({ length: n }, (r, i) => e + i), this.selected = n ? e + n - 1 : -1, se(this, dn, e);
}, // ─── history ─────────────────────────────────────────────
Oa = function() {
  c(this, Ft).push(JSON.stringify(this.snapshot())), c(this, Ft).length > Jh && c(this, Ft).shift(), se(this, tn, []), ge(this, et, ys).call(this);
}, ys = function() {
  this.canUndo = c(this, Ft).length > 0, this.canRedo = c(this, tn).length > 0;
}, lr = function() {
  var e;
  if (ge(this, et, Fo).call(this), this.isSection) {
    this.sectionDirty = !0;
    return;
  }
  this.dirty = !0, this.saveError = "", (e = this.onChange) == null || e.call(this, this.snapshot());
}, ni = new WeakMap(), Ti = function() {
  clearTimeout(c(this, js)), se(this, ss, !1);
};
const Zh = "__MAW_CSS__", Dl = window.__GRAV_FIELD_TAG || "grav-maw-builder--blocks", Qh = ["blocks", "blocks_after"];
function ua() {
  const t = document.createElement("style");
  return t.textContent = Zh, t;
}
var jn, qn, si, nt, rs, Tn, An, Dt, or, Bo, Uo, Pa;
class $h extends HTMLElement {
  constructor() {
    super(...arguments);
    U(this, Dt);
    U(this, jn, null);
    U(this, qn, []);
    U(this, si, null);
    U(this, nt, null);
    U(this, rs, null);
    U(this, Tn, null);
    U(this, An, null);
  }
  set field(n) {
    se(this, jn, n), c(this, nt) && ge(this, Dt, or).call(this) && (c(this, nt).fieldName = ge(this, Dt, or).call(this));
  }
  get field() {
    return c(this, jn);
  }
  set value(n) {
    var i;
    JSON.stringify(n ?? []) !== c(this, si) && (se(this, qn, Array.isArray(n) ? n : []), (i = c(this, nt)) == null || i.setValue(c(this, qn)));
  }
  get value() {
    return c(this, qn);
  }
  connectedCallback() {
    var i;
    if (c(this, nt)) return;
    const n = this.shadowRoot || this.attachShadow({ mode: "open" });
    if (!ge(this, Dt, or).call(this)) {
      if (!n.childElementCount) {
        n.appendChild(ua());
        const a = document.createElement("p");
        a.style.cssText = "margin:0;padding:10px 12px;border:1px dashed var(--mb-border);border-radius:8px;color:var(--mb-muted-fg);font-size:13px", a.textContent = `The visual builder edits only the blocks and blocks_after fields, so “${(i = c(this, jn)) == null ? void 0 : i.name}” is left as it is.`, n.appendChild(a);
      }
      return;
    }
    n.appendChild(ua()), se(this, nt, new Xh({
      context: ld(),
      fieldName: ge(this, Dt, or).call(this),
      onChange: (a) => ge(this, Dt, Bo).call(this, a)
    })), c(this, nt).setValue(c(this, qn)), c(this, nt).load(), c(this, nt).presence = new fd(c(this, nt)), c(this, nt).presence.start();
    const r = document.createElement("div");
    n.appendChild(r), se(this, rs, hl(Sd, {
      target: r,
      props: { store: c(this, nt), field: c(this, jn), openBuilder: (a) => ge(this, Dt, Uo).call(this, a) }
    }));
  }
  disconnectedCallback() {
    queueMicrotask(() => {
      var n, r;
      this.isConnected || (ge(this, Dt, Pa).call(this), (r = (n = c(this, nt)) == null ? void 0 : n.presence) == null || r.stop(), c(this, rs) && pl(c(this, rs)), se(this, rs, null), se(this, nt, null), this.shadowRoot && (this.shadowRoot.innerHTML = ""));
    });
  }
}
jn = new WeakMap(), qn = new WeakMap(), si = new WeakMap(), nt = new WeakMap(), rs = new WeakMap(), Tn = new WeakMap(), An = new WeakMap(), Dt = new WeakSet(), /** 'blocks' | 'blocks_after', or null for a field the builder does not edit. */
or = function() {
  var r;
  const n = String(((r = c(this, jn)) == null ? void 0 : r.name) || "header.blocks").replace(/^header\./, "");
  return Qh.includes(n) ? n : null;
}, Bo = function(n) {
  se(this, qn, n), se(this, si, JSON.stringify(n)), this.dispatchEvent(new CustomEvent("change", { detail: n, bubbles: !0 }));
}, /** The builder mounts on <body> so no admin layout (overflow, transforms) can clip the full-screen overlay. */
Uo = function(n = -1) {
  if (c(this, An)) return;
  const r = c(this, nt);
  r.select(n), r.open = !0, se(this, Tn, document.createElement("maw-builder-host")), c(this, Tn).style.cssText = "position:fixed;inset:0;z-index:2147483000;display:block;";
  const i = c(this, Tn).attachShadow({ mode: "open" });
  i.appendChild(ua());
  const a = document.createElement("div");
  a.className = "maw-root", i.appendChild(a), document.body.appendChild(c(this, Tn)), document.documentElement.style.overflow = "hidden", se(this, An, hl(Fh, {
    target: a,
    props: { store: r, close: () => ge(this, Dt, Pa).call(this) }
  })), (r.dirty ? Promise.resolve() : r.refreshBase()).then(() => {
    var l;
    return (l = r.presence) == null ? void 0 : l.claim();
  }), r.refreshClipboard();
}, Pa = function() {
  var r, i;
  const n = !!c(this, An);
  c(this, An) && pl(c(this, An)), se(this, An, null), (r = c(this, Tn)) == null || r.remove(), se(this, Tn, null), document.documentElement.style.overflow = "", c(this, nt) && (c(this, nt).open = !1, c(this, nt).isSection && c(this, nt).closeSection(), c(this, nt).select(-1), n && ((i = c(this, nt).presence) == null || i.leave()));
};
customElements.get(Dl) || customElements.define(Dl, $h);
