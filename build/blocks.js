var ac = Object.defineProperty;
var nl = (n) => {
  throw TypeError(n);
};
var ic = (n, e, t) => e in n ? ac(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var ct = (n, e, t) => ic(n, typeof e != "symbol" ? e + "" : e, t), Va = (n, e, t) => e.has(n) || nl("Cannot " + t);
var c = (n, e, t) => (Va(n, e, "read from private field"), t ? t.call(n) : e.get(n)), K = (n, e, t) => e.has(n) ? nl("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(n) : e.set(n, t), ne = (n, e, t, r) => (Va(n, e, "write to private field"), r ? r.call(n, t) : e.set(n, t), t), ve = (n, e, t) => (Va(n, e, "access private method"), t);
var sa = Array.isArray, lc = Array.prototype.indexOf, Ea = Array.prototype.includes, Ba = Array.from, Rl = Object.defineProperty, Ss = Object.getOwnPropertyDescriptor, oc = Object.getOwnPropertyDescriptors, jl = Object.prototype, cc = Array.prototype, Ti = Object.getPrototypeOf, sl = Object.isExtensible;
const Il = () => {
};
function uc(n) {
  for (var e = 0; e < n.length; e++)
    n[e]();
}
function ql() {
  var n, e, t = new Promise((r, a) => {
    n = r, e = a;
  });
  return { promise: t, resolve: n, reject: e };
}
function Ua(n, e) {
  if (Array.isArray(n))
    return n;
  if (e === void 0 || !(Symbol.iterator in n))
    return Array.from(n);
  const t = [];
  for (const r of n)
    if (t.push(r), t.length === e) break;
  return t;
}
const _t = 2, Hs = 4, Ha = 8, Fl = 1 << 24, cn = 16, $t = 32, Nn = 64, ri = 128, Ai = 256, Qt = 512, pt = 1024, gt = 2048, dn = 4096, Ot = 8192, jt = 16384, Js = 32768, Ma = 1 << 25, fs = 65536, Ta = 1 << 17, dc = 1 << 18, Ys = 1 << 19, vc = 1 << 20, mn = 1 << 25, hs = 65536, Aa = 1 << 21, Es = 1 << 22, Vn = 1 << 23, us = Symbol("$state"), Bl = Symbol("component"), fc = Symbol("legacy props"), hc = Symbol(""), ba = Symbol("attributes"), ai = Symbol("class"), ii = Symbol("style"), nr = Symbol("text"), ma = Symbol("form reset"), ra = new class extends Error {
  constructor() {
    super(...arguments);
    ct(this, "name", "StaleReactionError");
    ct(this, "message", "The reaction that called `getAbortSignal()` was re-run or destroyed");
  }
}();
var Dl;
const pc = (
  // We gotta write it like this because after downleveling the pure comment may end up in the wrong location
  !!((Dl = globalThis.document) != null && Dl.contentType) && /* @__PURE__ */ globalThis.document.contentType.includes("xml")
), gc = 1, bc = 2, Ul = 4, mc = 8, _c = 16, yc = 1, kc = 4, wc = 8, xc = 16, Sc = 1, Ec = 2, ft = Symbol("uninitialized"), Mc = "http://www.w3.org/1999/xhtml";
function Tc() {
  console.warn("https://svelte.dev/e/derived_inert");
}
function Ac() {
  console.warn("https://svelte.dev/e/select_multiple_invalid_value");
}
function Cc() {
  console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
function Hl(n) {
  return n === this.v;
}
function Oc(n, e) {
  return n != n ? e == e : n !== e || n !== null && typeof n == "object" || typeof n == "function";
}
function Kl(n) {
  return !Oc(n, this.v);
}
function Pc(n) {
  throw new Error("https://svelte.dev/e/lifecycle_outside_component");
}
function zc() {
  throw new Error("https://svelte.dev/e/async_derived_orphan");
}
function Dc(n, e, t) {
  throw new Error("https://svelte.dev/e/each_key_duplicate");
}
function Nc(n) {
  throw new Error("https://svelte.dev/e/effect_in_teardown");
}
function Lc() {
  throw new Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function Rc(n) {
  throw new Error("https://svelte.dev/e/effect_orphan");
}
function jc() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function Ic(n) {
  throw new Error("https://svelte.dev/e/props_invalid_value");
}
function qc() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function Fc() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function Bc() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
function Uc() {
  throw new Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
const Hc = [];
function Bn(n, e = !1, t = !1) {
  return _a(n, /* @__PURE__ */ new Map(), "", Hc, null, t);
}
function _a(n, e, t, r, a = null, i = !1) {
  if (typeof n == "object" && n !== null) {
    var l = e.get(n);
    if (l !== void 0) return l;
    if (n instanceof Map) return (
      /** @type {Snapshot<T>} */
      new Map(n)
    );
    if (n instanceof Set) return (
      /** @type {Snapshot<T>} */
      new Set(n)
    );
    if (sa(n)) {
      var o = (
        /** @type {Snapshot<any>} */
        Array(n.length)
      );
      e.set(n, o), a !== null && e.set(a, o);
      for (var u = 0; u < n.length; u += 1) {
        var v = n[u];
        u in n && (o[u] = _a(v, e, t, r, null, i));
      }
      return o;
    }
    if (Ti(n) === jl) {
      o = {}, e.set(n, o), a !== null && e.set(a, o);
      for (var g of Object.keys(n))
        o[g] = _a(
          // @ts-expect-error
          n[g],
          e,
          t,
          r,
          null,
          i
        );
      return o;
    }
    if (n instanceof Date)
      return n.getTime(), /** @type {Snapshot<T>} */
      structuredClone(n);
    if (typeof /** @type {T & { toJSON?: any } } */
    n.toJSON == "function" && !i)
      return _a(
        /** @type {T & { toJSON(): any } } */
        n.toJSON(),
        e,
        t,
        r,
        // Associate the instance with the toJSON clone
        n
      );
  }
  if (n instanceof EventTarget)
    return (
      /** @type {Snapshot<T>} */
      n
    );
  try {
    return (
      /** @type {Snapshot<T>} */
      structuredClone(n)
    );
  } catch {
    return (
      /** @type {Snapshot<T>} */
      n
    );
  }
}
let Et = null;
function Ks(n) {
  Et = n;
}
function dt(n, e = !1, t) {
  Et = {
    p: Et,
    i: !1,
    c: null,
    e: null,
    s: n,
    x: null,
    r: (
      /** @type {Effect} */
      Fe
    ),
    l: null
  };
}
function vt(n) {
  var e = (
    /** @type {ComponentContext} */
    Et
  ), t = e.e;
  if (t !== null) {
    e.e = null;
    for (var r of t)
      vo(r);
  }
  return n !== void 0 && (e.x = n), e.i = !0, Et = e.p, Ci(n);
}
function Ci(n = {}) {
  return Rl(n, Bl, { value: !0 }), n;
}
function Gl() {
  return !0;
}
let Zn = [];
function Vl() {
  var n = Zn;
  Zn = [], uc(n);
}
function _n(n) {
  if (Zn.length === 0 && !ur) {
    var e = Zn;
    queueMicrotask(() => {
      e === Zn && Vl();
    });
  }
  Zn.push(n);
}
function Kc() {
  for (; Zn.length > 0; )
    Vl();
}
const Gc = -7169;
function it(n, e) {
  n.f = n.f & Gc | e;
}
function Oi(n) {
  (n.f & Qt) !== 0 || n.deps === null ? it(n, pt) : it(n, dn);
}
function Jl(n) {
  if (n !== null)
    for (const e of n)
      (e.f & _t) === 0 || (e.f & hs) === 0 || (e.f ^= hs, Jl(
        /** @type {Derived} */
        e.deps
      ));
}
function Yl(n, e, t) {
  (n.f & gt) !== 0 ? e.add(n) : (n.f & dn) !== 0 && t.add(n), Jl(n.deps), it(n, pt);
}
let va = !1;
function Vc(n) {
  var e = va;
  try {
    return va = !1, [n(), va];
  } finally {
    va = e;
  }
}
function Jc(n, e) {
  {
    const t = document.body;
    n.autofocus = !0, _n(() => {
      document.activeElement === t && n.focus();
    });
  }
}
let rl = !1;
function Yc() {
  rl || (rl = !0, document.addEventListener(
    "reset",
    (n) => {
      Promise.resolve().then(() => {
        var e;
        if (!n.defaultPrevented)
          for (
            const t of
            /**@type {HTMLFormElement} */
            n.target.elements
          )
            (e = t[ma]) == null || e.call(t);
      });
    },
    // In the capture phase to guarantee we get noticed of it (no possibility of stopPropagation)
    { capture: !0 }
  ));
}
function Ws(n) {
  var e = qe, t = Fe;
  en(null), wn(null);
  try {
    return n();
  } finally {
    en(e), wn(t);
  }
}
function Pi(n, e, t, r = t) {
  n.addEventListener(e, () => Ws(t));
  const a = (
    /** @type {any} */
    n[ma]
  );
  a ? n[ma] = () => {
    a(), r(!0);
  } : n[ma] = () => r(!0), Yc();
}
function Wc(n, e, t, r) {
  const a = vr;
  var i = n.filter((p) => !p.settled), l = e.map(a);
  if (t.length === 0 && i.length === 0) {
    r(l);
    return;
  }
  var o = (
    /** @type {Effect} */
    Fe
  ), u = Xc(), v = i.length === 1 ? i[0].promise : i.length > 1 ? Promise.all(i.map((p) => p.promise)) : null;
  function g(p) {
    if ((o.f & jt) === 0) {
      u();
      try {
        r([...l, ...p]);
      } catch (x) {
        bn(x, o);
      }
      Ca();
    }
  }
  var E = Wl();
  if (t.length === 0) {
    v.then(() => g([])).finally(E);
    return;
  }
  function f() {
    Promise.all(t.map((p) => /* @__PURE__ */ Zc(p))).then(g).catch((p) => bn(p, o)).finally(E);
  }
  v ? v.then(() => {
    u(), f(), Ca();
  }) : f();
}
function Xc() {
  var n = (
    /** @type {Effect} */
    Fe
  ), e = qe, t = Et, r = (
    /** @type {Batch} */
    ye
  );
  return function(i = !0) {
    wn(n), en(e), Ks(t), i && (n.f & jt) === 0 && (r == null || r.activate(), r == null || r.apply());
  };
}
function Ca(n = !0) {
  wn(null), en(null), Ks(null), n && (ye == null || ye.deactivate());
}
function Wl() {
  var n = (
    /** @type {Effect} */
    Fe
  ), e = n.b, t = (
    /** @type {Batch} */
    ye
  ), r = !!(e != null && e.is_rendered());
  return e == null || e.update_pending_count(1, t), t.increment(r, n), () => {
    e == null || e.update_pending_count(-1, t), t.decrement(r, n);
  };
}
// @__NO_SIDE_EFFECTS__
function vr(n) {
  var e = _t | gt;
  return Fe !== null && (Fe.f |= Ys), {
    ctx: Et,
    deps: null,
    effects: null,
    equals: Hl,
    f: e,
    fn: n,
    reactions: null,
    rv: 0,
    v: (
      /** @type {V} */
      ft
    ),
    wv: 0,
    parent: Fe,
    ac: null
  };
}
const sr = Symbol("obsolete");
// @__NO_SIDE_EFFECTS__
function Zc(n, e, t) {
  let r = (
    /** @type {Effect | null} */
    Fe
  );
  r === null && zc();
  var a = (
    /** @type {Promise<V>} */
    /** @type {unknown} */
    void 0
  ), i = gs(
    /** @type {V} */
    ft
  ), l = !qe, o = /* @__PURE__ */ new Set();
  return fu(() => {
    var p, x;
    var u = (
      /** @type {Effect} */
      Fe
    ), v = ql();
    a = v.promise;
    try {
      Promise.resolve(n()).then(v.resolve, (M) => {
        M !== ra && v.reject(M);
      }).finally(Ca);
    } catch (M) {
      v.reject(M), Ca();
    }
    var g = (
      /** @type {Batch} */
      ye
    );
    if (l) {
      if ((u.f & Js) !== 0)
        var E = Wl();
      if (
        // boundary can be null if the async derived is inside an $effect.root not connected to the component render tree
        (p = r.b) != null && p.is_rendered()
      )
        (x = g.async_deriveds.get(u)) == null || x.reject(sr);
      else
        for (const M of o.values())
          M.reject(sr);
      o.add(v), g.async_deriveds.set(u, v);
    }
    const f = (M, y = void 0) => {
      E == null || E(), o.delete(v), y !== sr && (g.activate(), y ? (i.f |= Vn, Gs(i, y)) : ((i.f & Vn) !== 0 && (i.f ^= Vn), Gs(i, M)), g.deactivate());
    };
    v.promise.then(f, (M) => f(null, M || "unknown"));
  }), Ri(() => {
    for (const u of o)
      u.reject(sr);
  }), new Promise((u) => {
    function v(g) {
      function E() {
        g === a ? u(i) : v(a);
      }
      g.then(E, E);
    }
    v(a);
  });
}
// @__NO_SIDE_EFFECTS__
function le(n) {
  const e = /* @__PURE__ */ vr(n);
  return bo(e), e;
}
// @__NO_SIDE_EFFECTS__
function Xl(n) {
  const e = /* @__PURE__ */ vr(n);
  return e.equals = Kl, e;
}
function Qc(n) {
  var e = n.effects;
  if (e !== null) {
    n.effects = null;
    for (var t = 0; t < e.length; t += 1)
      It(
        /** @type {Effect} */
        e[t]
      );
  }
}
function zi(n) {
  var e, t = Fe, r = n.parent;
  if (!Ln && r !== null && n.v !== ft && // if it was never evaluated before, it's guaranteed to fail downstream, so we try to execute instead
  (r.f & (jt | Ot)) !== 0)
    return Tc(), n.v;
  wn(r);
  try {
    n.f &= ~hs, Qc(n), e = ko(n);
  } finally {
    wn(t);
  }
  return e;
}
function Zl(n) {
  var e = zi(n);
  if (!n.equals(e) && (n.wv = _o(), (!(ye != null && ye.is_fork) || n.deps === null) && (ye !== null ? (ye.capture(n, e, !0), cr == null || cr.capture(n, e, !0)) : n.v = e, n.deps === null))) {
    it(n, pt);
    return;
  }
  Ln || (yt !== null ? (Li() || ye != null && ye.is_fork) && yt.set(n, e) : Oi(n));
}
function $c(n) {
  var e;
  if (n.effects !== null)
    for (const t of n.effects)
      (t.teardown || t.ac) && ((e = t.teardown) == null || e.call(t), t.ac !== null && Ws(() => {
        t.ac.abort(ra), t.ac = null;
      }), t.fn !== null && (t.teardown = Il), fr(t, 0), Ii(t));
}
function Ql(n) {
  if (n.effects !== null)
    for (const e of n.effects)
      e.teardown && e.fn !== null && Vs(e);
}
let Ja = null, ys = null, ye = null, cr = null, yt = null, li = null, ur = !1, Ya = !1, xs = null, ya = null;
var al = 0;
let eu = 1;
var Cs, Un, ts, Os, Ps, zs, Tn, Ds, Nt, br, An, an, fn, Ns, ns, We, oi, rr, ci, $l, eo, ks, tu, ar;
const Ra = class Ra {
  constructor() {
    K(this, We);
    ct(this, "id", eu++);
    /** True as soon as `#process` was called */
    K(this, Cs, !1);
    ct(this, "linked", !0);
    /** @type {Batch | null} */
    K(this, Un, null);
    /** @type {Batch | null} */
    K(this, ts, null);
    /** @type {Map<Effect, ReturnType<typeof deferred<any>>>} */
    ct(this, "async_deriveds", /* @__PURE__ */ new Map());
    /**
     * The current values of any signals that are updated in this batch.
     * Tuple format: [value, is_derived] (note: is_derived is false for deriveds, too, if they were overridden via assignment)
     * They keys of this map are identical to `this.#previous`
     * @type {Map<Value, [any, boolean]>}
     */
    ct(this, "current", /* @__PURE__ */ new Map());
    /**
     * The values of any signals (sources and deriveds) that are updated in this batch _before_ those updates took place.
     * They keys of this map are identical to `this.#current`
     * @type {Map<Value, any>}
     */
    ct(this, "previous", /* @__PURE__ */ new Map());
    /**
     * When the batch is committed (and the DOM is updated), we need to remove old branches
     * and append new ones by calling the functions added inside (if/each/key/etc) blocks
     * @type {Set<(batch: Batch) => void>}
     */
    K(this, Os, /* @__PURE__ */ new Set());
    /**
     * If a fork is discarded, we need to destroy any effects that are no longer needed
     * @type {Set<(batch: Batch) => void>}
     */
    K(this, Ps, /* @__PURE__ */ new Set());
    /**
     * The number of async effects that are currently in flight
     */
    K(this, zs, 0);
    /**
     * Async effects that are currently in flight, _not_ inside a pending boundary
     * @type {Map<Effect, number>}
     */
    K(this, Tn, /* @__PURE__ */ new Map());
    /**
     * A deferred that resolves when the batch is committed, used with `settled()`
     * TODO replace with Promise.withResolvers once supported widely enough
     * @type {{ promise: Promise<void>, resolve: (value?: any) => void, reject: (reason: unknown) => void } | null}
     */
    K(this, Ds, null);
    /**
     * The root effects that need to be flushed
     * @type {Effect[]}
     */
    K(this, Nt, []);
    /**
     * Effects created while this batch was active.
     * @type {Effect[]}
     */
    K(this, br, []);
    /**
     * Deferred effects (which run after async work has completed) that are DIRTY
     * @type {Set<Effect>}
     */
    K(this, An, /* @__PURE__ */ new Set());
    /**
     * Deferred effects that are MAYBE_DIRTY
     * @type {Set<Effect>}
     */
    K(this, an, /* @__PURE__ */ new Set());
    /**
     * A map of branches that still exist, but will be destroyed when this batch
     * is committed — we skip over these during `process`.
     * The value contains child effects that were dirty/maybe_dirty before being reset,
     * so they can be rescheduled if the branch survives.
     * @type {Map<Effect, { d: Effect[], m: Effect[] }>}
     */
    K(this, fn, /* @__PURE__ */ new Map());
    /**
     * Inverse of #skipped_branches which we need to tell prior batches to unskip them when committing
     * @type {Set<Effect>}
     */
    K(this, Ns, /* @__PURE__ */ new Set());
    ct(this, "is_fork", !1);
    K(this, ns, !1);
    ys === null ? Ja = ys = this : (ne(ys, ts, this), ne(this, Un, ys)), ys = this;
  }
  /**
   * Add an effect to the #skipped_branches map and reset its children
   * @param {Effect} effect
   */
  skip_effect(e) {
    c(this, fn).has(e) || c(this, fn).set(e, { d: [], m: [] }), c(this, Ns).delete(e);
  }
  /**
   * Remove an effect from the #skipped_branches map and reschedule
   * any tracked dirty/maybe_dirty child effects
   * @param {Effect} effect
   * @param {(e: Effect) => void} callback
   */
  unskip_effect(e, t = (r) => this.schedule(r)) {
    var r = c(this, fn).get(e);
    if (r) {
      c(this, fn).delete(e);
      for (var a of r.d)
        it(a, gt), t(a);
      for (a of r.m)
        it(a, dn), t(a);
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
  capture(e, t, r = !1) {
    e.v !== ft && !this.previous.has(e) && this.previous.set(e, e.v), (e.f & Vn) === 0 && (this.current.set(e, [t, r]), yt == null || yt.set(e, t)), this.is_fork || (e.v = t);
  }
  activate() {
    ye = this;
  }
  deactivate() {
    ye = null, yt = null;
  }
  flush() {
    try {
      Ya = !0, ye = this, ve(this, We, rr).call(this);
    } finally {
      al = 0, li = null, xs = null, ya = null, Ya = !1, ye = null, yt = null, yn.clear();
    }
  }
  discard() {
    var e;
    for (const t of c(this, Ps)) t(this);
    c(this, Ps).clear();
    for (const t of this.async_deriveds.values())
      t.reject(sr);
    ve(this, We, ar).call(this), (e = c(this, Ds)) == null || e.resolve();
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
  increment(e, t) {
    if (ne(this, zs, c(this, zs) + 1), e) {
      let r = c(this, Tn).get(t) ?? 0;
      c(this, Tn).set(t, r + 1);
    }
  }
  /**
   * @param {boolean} blocking
   * @param {Effect} effect
   */
  decrement(e, t) {
    if (ne(this, zs, c(this, zs) - 1), e) {
      let r = c(this, Tn).get(t) ?? 0;
      r === 1 ? c(this, Tn).delete(t) : c(this, Tn).set(t, r - 1);
    }
    c(this, ns) || (ne(this, ns, !0), _n(() => {
      ne(this, ns, !1), this.linked && this.flush();
    }));
  }
  /**
   * @param {Set<Effect>} dirty_effects
   * @param {Set<Effect>} maybe_dirty_effects
   */
  transfer_effects(e, t) {
    for (const r of e)
      c(this, An).add(r);
    for (const r of t)
      c(this, an).add(r);
    e.clear(), t.clear();
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
    return (c(this, Ds) ?? ne(this, Ds, ql())).promise;
  }
  static ensure() {
    if (ye === null) {
      const e = ye = new Ra();
      !Ya && !ur && _n(() => {
        c(e, Cs) || e.flush();
      });
    }
    return ye;
  }
  apply() {
    {
      yt = null;
      return;
    }
  }
  /**
   *
   * @param {Effect} effect
   */
  schedule(e) {
    var a;
    if (li = e, (a = e.b) != null && a.is_pending && (e.f & (Hs | Ha | Fl)) !== 0 && (e.f & Js) === 0) {
      e.b.defer_effect(e);
      return;
    }
    for (var t = e; t.parent !== null; ) {
      t = t.parent;
      var r = t.f;
      if (xs !== null && t === Fe && (qe === null || (qe.f & _t) === 0))
        return;
      if ((r & (Nn | $t)) !== 0) {
        if ((r & pt) === 0)
          return;
        t.f ^= pt;
      }
    }
    c(this, Nt).push(t);
  }
};
Cs = new WeakMap(), Un = new WeakMap(), ts = new WeakMap(), Os = new WeakMap(), Ps = new WeakMap(), zs = new WeakMap(), Tn = new WeakMap(), Ds = new WeakMap(), Nt = new WeakMap(), br = new WeakMap(), An = new WeakMap(), an = new WeakMap(), fn = new WeakMap(), Ns = new WeakMap(), ns = new WeakMap(), We = new WeakSet(), oi = function() {
  if (this.is_fork) return !0;
  for (const r of c(this, Tn).keys()) {
    for (var e = r, t = !1; e.parent !== null; ) {
      if (c(this, fn).has(e)) {
        t = !0;
        break;
      }
      e = e.parent;
    }
    if (!t)
      return !0;
  }
  return !1;
}, rr = function() {
  var u, v, g, E;
  ne(this, Cs, !0), al++ > 1e3 && (ve(this, We, ar).call(this), su());
  for (const f of c(this, An))
    c(this, an).delete(f), it(f, gt), this.schedule(f);
  for (const f of c(this, an))
    it(f, dn), this.schedule(f);
  const e = c(this, Nt);
  ne(this, Nt, []), this.apply();
  var t = xs = [], r = [], a = ya = [];
  for (const f of e)
    try {
      ve(this, We, ci).call(this, f, t, r);
    } catch (p) {
      throw so(f), ve(this, We, oi).call(this) || this.discard(), p;
    }
  if (ye = null, a.length > 0) {
    var i = Ra.ensure();
    for (const f of a)
      i.schedule(f);
  }
  if (xs = null, ya = null, ve(this, We, oi).call(this)) {
    ve(this, We, ks).call(this, r), ve(this, We, ks).call(this, t);
    for (const [f, p] of c(this, fn))
      no(f, p);
    a.length > 0 && /** @type {unknown} */
    ve(u = ye, We, rr).call(u);
    return;
  }
  const l = ve(this, We, $l).call(this);
  if (l) {
    ve(this, We, ks).call(this, r), ve(this, We, ks).call(this, t), ve(v = l, We, eo).call(v, this);
    return;
  }
  c(this, An).clear(), c(this, an).clear();
  for (const f of c(this, Os)) f(this);
  c(this, Os).clear(), cr = this, il(r), il(t), cr = null, (g = c(this, Ds)) == null || g.resolve();
  var o = (
    /** @type {Batch | null} */
    /** @type {unknown} */
    ye
  );
  if (c(this, zs) === 0 && (c(this, Nt).length === 0 || o !== null) && ve(this, We, ar).call(this), c(this, Nt).length > 0)
    if (o !== null) {
      const f = o;
      c(f, Nt).push(...c(this, Nt).filter((p) => !c(f, Nt).includes(p)));
    } else
      o = this;
  o !== null && (yn.clear(), ve(E = o, We, rr).call(E));
}, /**
 * Traverse the effect tree, executing effects or stashing
 * them for later execution as appropriate
 * @param {Effect} root
 * @param {Effect[]} effects
 * @param {Effect[]} render_effects
 */
ci = function(e, t, r) {
  e.f ^= pt;
  for (var a = e.first; a !== null; ) {
    var i = a.f, l = (i & ($t | Nn)) !== 0, o = l && (i & pt) !== 0, u = o || (i & Ot) !== 0 || c(this, fn).has(a);
    if (!u && a.fn !== null) {
      l ? a.f ^= pt : (i & Hs) !== 0 ? t.push(a) : la(a) && ((i & cn) !== 0 && c(this, an).add(a), Vs(a));
      var v = a.first;
      if (v !== null) {
        a = v;
        continue;
      }
    }
    for (; a !== null; ) {
      var g = a.next;
      if (g !== null) {
        a = g;
        break;
      }
      a = a.parent;
    }
  }
}, $l = function() {
  for (var e = c(this, Un); e !== null; ) {
    if (!e.is_fork) {
      for (const [t, [, r]] of this.current)
        if (e.current.has(t) && !r)
          return e;
    }
    e = c(e, Un);
  }
  return null;
}, /**
 * @param {Batch} batch
 */
eo = function(e) {
  var r;
  for (const [a, i] of e.current)
    !this.previous.has(a) && e.previous.has(a) && this.previous.set(a, e.previous.get(a)), this.current.set(a, i);
  for (const [a, i] of e.async_deriveds) {
    const l = this.async_deriveds.get(a);
    l && i.promise.then(l.resolve).catch(l.reject);
  }
  e.async_deriveds.clear(), this.transfer_effects(c(e, An), c(e, an));
  const t = (a) => {
    var i = a.reactions;
    if (i !== null && !((a.f & _t) !== 0 && (a.f & (gt | dn)) === 0))
      for (const u of i) {
        var l = u.f;
        if ((l & _t) !== 0)
          t(
            /** @type {Derived} */
            u
          );
        else {
          var o = (
            /** @type {Effect} */
            u
          );
          l & (Es | cn) && !this.async_deriveds.has(o) && (c(this, an).delete(o), it(o, gt), this.schedule(o));
        }
      }
  };
  for (const a of this.current.keys())
    t(a);
  this.oncommit(() => e.discard()), ve(r = e, We, ar).call(r), ye = this, ve(this, We, rr).call(this);
}, /**
 * @param {Effect[]} effects
 */
ks = function(e) {
  for (var t = 0; t < e.length; t += 1)
    Yl(e[t], c(this, An), c(this, an));
}, tu = function() {
  var E;
  for (let f = Ja; f !== null; f = c(f, ts)) {
    var e = f.id < this.id, t = [];
    for (const [p, [x, M]] of this.current) {
      if (f.current.has(p)) {
        var r = (
          /** @type {[any, boolean]} */
          f.current.get(p)[0]
        );
        if (e && x !== r)
          f.current.set(p, [x, M]);
        else
          continue;
      }
      t.push(p);
    }
    if (e)
      for (const [p, x] of this.async_deriveds) {
        const M = f.async_deriveds.get(p);
        M && x.promise.then(M.resolve).catch(M.reject);
      }
    var a = [...f.current.keys()].filter(
      (p) => !/** @type {[any, boolean]} */
      f.current.get(p)[1]
    );
    if (!(!c(f, Cs) || a.length === 0)) {
      var i = a.filter((p) => !this.current.has(p));
      if (i.length === 0)
        e && f.discard();
      else if (t.length > 0) {
        if (e)
          for (const p of c(this, Ns))
            f.unskip_effect(p, (x) => {
              var M;
              (x.f & (cn | Es)) !== 0 ? f.schedule(x) : ve(M = f, We, ks).call(M, [x]);
            });
        f.activate();
        var l = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Map();
        for (var u of t)
          to(u, i, l, o);
        o = /* @__PURE__ */ new Map();
        var v = [...f.current].filter(([p, x]) => {
          const M = this.current.get(p);
          return M ? M[0] !== x[0] || M[1] !== x[1] : !0;
        }).map(([p]) => p);
        if (v.length > 0)
          for (const p of c(this, br))
            (p.f & (jt | Ot | Ta)) === 0 && Di(p, v, o) && ((p.f & (Es | cn)) !== 0 ? (it(p, gt), f.schedule(p)) : c(f, An).add(p));
        if (c(f, Nt).length > 0 && !c(f, ns)) {
          f.apply();
          for (var g of c(f, Nt))
            ve(E = f, We, ci).call(E, g, [], []);
          ne(f, Nt, []);
        }
        f.deactivate();
      }
    }
  }
}, ar = function() {
  if (this.linked) {
    var e = c(this, Un), t = c(this, ts);
    e === null ? Ja = t : ne(e, ts, t), t === null ? ys = e : ne(t, Un, e), this.linked = !1;
  }
};
let ps = Ra;
function nu(n) {
  var e = ur;
  ur = !0;
  try {
    for (var t; ; ) {
      if (Kc(), ye === null)
        return (
          /** @type {T} */
          t
        );
      ye.flush();
    }
  } finally {
    ur = e;
  }
}
function su() {
  try {
    jc();
  } catch (n) {
    bn(n, li);
  }
}
let rn = null;
function il(n) {
  var e = n.length;
  if (e !== 0) {
    for (var t = 0; t < e; ) {
      var r = n[t++];
      if ((r.f & (jt | Ot)) === 0 && la(r) && (rn = /* @__PURE__ */ new Set(), Vs(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && ho(r), (rn == null ? void 0 : rn.size) > 0)) {
        yn.clear();
        for (const a of rn) {
          if ((a.f & (jt | Ot)) !== 0) continue;
          const i = [a];
          let l = a.parent;
          for (; l !== null; )
            rn.has(l) && (rn.delete(l), i.push(l)), l = l.parent;
          for (let o = i.length - 1; o >= 0; o--) {
            const u = i[o];
            (u.f & (jt | Ot)) === 0 && Vs(u);
          }
        }
        rn.clear();
      }
    }
    rn = null;
  }
}
function to(n, e, t, r) {
  if (!t.has(n) && (t.add(n), n.reactions !== null))
    for (const a of n.reactions) {
      const i = a.f;
      (i & _t) !== 0 ? to(
        /** @type {Derived} */
        a,
        e,
        t,
        r
      ) : (i & (Es | cn)) !== 0 && (i & gt) === 0 && Di(a, e, r) && (it(a, gt), Ni(
        /** @type {Effect} */
        a
      ));
    }
}
function Di(n, e, t) {
  const r = t.get(n);
  if (r !== void 0) return r;
  if (n.deps !== null)
    for (const a of n.deps) {
      if (Ea.call(e, a))
        return !0;
      if ((a.f & _t) !== 0 && Di(
        /** @type {Derived} */
        a,
        e,
        t
      ))
        return t.set(
          /** @type {Derived} */
          a,
          !0
        ), !0;
    }
  return t.set(n, !1), !1;
}
function Ni(n) {
  ye.schedule(n);
}
function no(n, e) {
  if (!((n.f & $t) !== 0 && (n.f & pt) !== 0)) {
    (n.f & gt) !== 0 ? e.d.push(n) : (n.f & dn) !== 0 && e.m.push(n), it(n, pt);
    for (var t = n.first; t !== null; )
      no(t, e), t = t.next;
  }
}
function so(n) {
  it(n, pt);
  for (var e = n.first; e !== null; )
    so(e), e = e.next;
}
let Oa = /* @__PURE__ */ new Set();
const yn = /* @__PURE__ */ new Map();
let ro = !1;
function gs(n, e) {
  var t = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: n,
    reactions: null,
    equals: Hl,
    rv: 0,
    wv: 0
  };
  return t;
}
// @__NO_SIDE_EFFECTS__
function I(n, e) {
  const t = gs(n);
  return bo(t), t;
}
// @__NO_SIDE_EFFECTS__
function ru(n, e = !1, t = !0) {
  const r = gs(n);
  return e || (r.equals = Kl), r;
}
function m(n, e, t = !1) {
  qe !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!un || (qe.f & Ta) !== 0) && Gl() && (qe.f & (_t | cn | Es | Ta)) !== 0 && (kn === null || !kn.has(n)) && Bc();
  let r = t ? et(e) : e;
  return Gs(n, r, ya);
}
function Gs(n, e, t = null) {
  if (!n.equals(e)) {
    Ln ? yn.set(n, e) : yn.has(n) || yn.set(n, n.v);
    var r = ps.ensure();
    if (r.capture(n, e), (n.f & _t) !== 0) {
      const a = (
        /** @type {Derived} */
        n
      );
      (n.f & gt) !== 0 && zi(a), yt === null && Oi(a);
    }
    n.wv = _o(), ao(n, gt, t), Fe !== null && (Fe.f & pt) !== 0 && (Fe.f & ($t | Nn)) === 0 && (Jt === null ? gu([n]) : Jt.push(n)), !r.is_fork && Oa.size > 0 && !ro && au();
  }
  return e;
}
function au() {
  ro = !1;
  for (const n of Oa) {
    (n.f & pt) !== 0 && it(n, dn);
    let e;
    try {
      e = la(n);
    } catch {
      e = !0;
    }
    e && Vs(n);
  }
  Oa.clear();
}
function dr(n) {
  m(n, n.v + 1);
}
function ao(n, e, t) {
  var r = n.reactions;
  if (r !== null)
    for (var a = r.length, i = 0; i < a; i++) {
      var l = r[i], o = l.f, u = (o & gt) === 0;
      if (u && it(l, e), (o & Ta) !== 0)
        Oa.add(
          /** @type {Effect} */
          l
        );
      else if ((o & _t) !== 0) {
        var v = (
          /** @type {Derived} */
          l
        );
        yt == null || yt.delete(v), (o & hs) === 0 && (o & Qt && (Fe === null || (Fe.f & Aa) === 0) && (l.f |= hs), ao(v, dn, t));
      } else if (u) {
        var g = (
          /** @type {Effect} */
          l
        );
        (o & cn) !== 0 && rn !== null && rn.add(g), t !== null ? t.push(g) : Ni(g);
      }
    }
}
function et(n) {
  if (typeof n != "object" || n === null || us in n || Bl in n)
    return n;
  const e = Ti(n);
  if (e !== jl && e !== cc)
    return n;
  var t = /* @__PURE__ */ new Map(), r = sa(n), a = /* @__PURE__ */ I(0), i = vs, l = (o) => {
    if (vs === i)
      return o();
    var u = qe, v = vs;
    en(null), ul(i);
    var g = o();
    return en(u), ul(v), g;
  };
  return r && t.set("length", /* @__PURE__ */ I(
    /** @type {any[]} */
    n.length
  )), new Proxy(
    /** @type {any} */
    n,
    {
      defineProperty(o, u, v) {
        (!("value" in v) || v.configurable === !1 || v.enumerable === !1 || v.writable === !1) && qc();
        var g = t.get(u);
        return g === void 0 ? l(() => {
          var E = /* @__PURE__ */ I(v.value);
          return t.set(u, E), E;
        }) : m(g, v.value, !0), !0;
      },
      deleteProperty(o, u) {
        var v = t.get(u);
        if (v === void 0) {
          if (u in o) {
            const g = l(() => /* @__PURE__ */ I(ft));
            t.set(u, g), dr(a);
          }
        } else
          m(v, ft), dr(a);
        return !0;
      },
      get(o, u, v) {
        var p;
        if (u === us)
          return n;
        var g = t.get(u), E = u in o;
        if (g === void 0 && (!E || (p = Ss(o, u)) != null && p.writable) && (g = l(() => {
          var x = et(E ? o[u] : ft), M = /* @__PURE__ */ I(x);
          return M;
        }), t.set(u, g)), g !== void 0) {
          var f = s(g);
          return f === ft ? void 0 : f;
        }
        return Reflect.get(o, u, v);
      },
      getOwnPropertyDescriptor(o, u) {
        var v = Reflect.getOwnPropertyDescriptor(o, u);
        if (v && "value" in v) {
          var g = t.get(u);
          g && (v.value = s(g));
        } else if (v === void 0) {
          var E = t.get(u), f = E == null ? void 0 : E.v;
          if (E !== void 0 && f !== ft)
            return {
              enumerable: !0,
              configurable: !0,
              value: f,
              writable: !0
            };
        }
        return v;
      },
      has(o, u) {
        var f;
        if (u === us)
          return !0;
        var v = t.get(u), g = v !== void 0 && v.v !== ft || Reflect.has(o, u);
        if (v !== void 0 || Fe !== null && (!g || (f = Ss(o, u)) != null && f.writable)) {
          v === void 0 && (v = l(() => {
            var p = g ? et(o[u]) : ft, x = /* @__PURE__ */ I(p);
            return x;
          }), t.set(u, v));
          var E = s(v);
          if (E === ft)
            return !1;
        }
        return g;
      },
      set(o, u, v, g) {
        var A;
        var E = t.get(u), f = u in o;
        if (r && u === "length")
          for (var p = v; p < /** @type {Source<number>} */
          E.v; p += 1) {
            var x = t.get(p + "");
            x !== void 0 ? m(x, ft) : p in o && (x = l(() => /* @__PURE__ */ I(ft)), t.set(p + "", x));
          }
        if (E === void 0)
          (!f || (A = Ss(o, u)) != null && A.writable) && (E = l(() => /* @__PURE__ */ I(void 0)), m(E, et(v)), t.set(u, E));
        else {
          f = E.v !== ft;
          var M = l(() => et(v));
          m(E, M);
        }
        var y = Reflect.getOwnPropertyDescriptor(o, u);
        if (y != null && y.set && y.set.call(g, v), !f) {
          if (r && typeof u == "string") {
            var L = (
              /** @type {Source<number>} */
              t.get("length")
            ), j = Number(u);
            Number.isInteger(j) && j >= L.v && m(L, j + 1);
          }
          dr(a);
        }
        return !0;
      },
      ownKeys(o) {
        s(a);
        var u = Reflect.ownKeys(o).filter((E) => {
          var f = t.get(E);
          return f === void 0 || f.v !== ft;
        });
        for (var [v, g] of t)
          g.v !== ft && !(v in o) && u.push(v);
        return u;
      },
      setPrototypeOf() {
        Fc();
      }
    }
  );
}
function ll(n) {
  try {
    if (n !== null && typeof n == "object" && us in n)
      return n[us];
  } catch {
  }
  return n;
}
function io(n, e) {
  return Object.is(ll(n), ll(e));
}
var ol, lo, oo, co;
function iu() {
  if (ol === void 0) {
    ol = window, lo = /Firefox/.test(navigator.userAgent);
    var n = Element.prototype, e = Node.prototype, t = Text.prototype;
    oo = Ss(e, "firstChild").get, co = Ss(e, "nextSibling").get, sl(n) && (n[ai] = void 0, n[ba] = null, n[ii] = void 0, n.__e = void 0), sl(t) && (t[nr] = void 0);
  }
}
function Dn(n = "") {
  return document.createTextNode(n);
}
// @__NO_SIDE_EFFECTS__
function bs(n) {
  return (
    /** @type {TemplateNode | null} */
    oo.call(n)
  );
}
// @__NO_SIDE_EFFECTS__
function aa(n) {
  return (
    /** @type {TemplateNode | null} */
    co.call(n)
  );
}
function h(n, e) {
  return /* @__PURE__ */ bs(n);
}
function Me(n, e = !1) {
  {
    var t = /* @__PURE__ */ bs(n);
    return t instanceof Comment && t.data === "" ? /* @__PURE__ */ aa(t) : t;
  }
}
function Y(n, e = !1) {
  return /* @__PURE__ */ bs(n);
}
function d(n, e = 1, t = !1) {
  let r = n;
  for (; e--; )
    r = /** @type {TemplateNode} */
    /* @__PURE__ */ aa(r);
  return r;
}
function lu(n) {
  n.textContent = "";
}
function uo() {
  return !1;
}
function ou(n, e, t) {
  return (
    /** @type {T extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[T] : Element} */
    t ? document.createElement(n, { is: t }) : document.createElement(n)
  );
}
function cu(n) {
  var e = Fe;
  if (e === null)
    return qe.f |= Vn, n;
  if ((e.f & Js) === 0 && (e.f & Hs) === 0)
    throw n;
  bn(n, e);
}
function bn(n, e) {
  if (!(e !== null && (e.f & jt) !== 0)) {
    for (; e !== null; ) {
      if ((e.f & ri) !== 0 && (e.f & (jt | Ma)) === 0) {
        if ((e.f & Js) === 0)
          throw n;
        try {
          e.b.error(n);
          return;
        } catch (t) {
          n = t;
        }
      }
      e = e.parent;
    }
    throw n;
  }
}
function uu(n) {
  Fe === null && (qe === null && Rc(), Lc()), Ln && Nc();
}
function du(n, e) {
  var t = e.last;
  t === null ? e.last = e.first = n : (t.next = n, n.prev = t, e.last = n);
}
function Rn(n, e) {
  var t = Fe;
  t !== null && (t.f & Ot) !== 0 && (n |= Ot);
  var r = {
    ctx: Et,
    deps: null,
    nodes: null,
    f: n | gt | Qt,
    first: null,
    fn: e,
    last: null,
    next: null,
    parent: t,
    b: t && t.b,
    prev: null,
    teardown: null,
    wv: 0,
    ac: null
  };
  ye == null || ye.register_created_effect(r);
  var a = r;
  if ((n & Hs) !== 0)
    xs !== null ? xs.push(r) : ps.ensure().schedule(r);
  else if (e !== null) {
    try {
      Vs(r);
    } catch (l) {
      throw It(r), l;
    }
    a.deps === null && a.teardown === null && a.nodes === null && a.first === a.last && // either `null`, or a singular child
    (a.f & Ys) === 0 && (a = a.first, (n & cn) !== 0 && (n & fs) !== 0 && a !== null && (a.f |= fs));
  }
  if (a !== null && (a.parent = t, t !== null && du(a, t), qe !== null && (qe.f & _t) !== 0 && (n & Nn) === 0)) {
    var i = (
      /** @type {Derived} */
      qe
    );
    (i.effects ?? (i.effects = [])).push(a);
  }
  return r;
}
function Li() {
  return qe !== null && !un;
}
function Ri(n) {
  const e = Rn(Ha, null);
  return it(e, pt), e.teardown = n, e;
}
function kt(n) {
  uu();
  var e = (
    /** @type {Effect} */
    Fe.f
  ), t = !qe && (e & $t) !== 0 && Et !== null && !Et.i;
  if (t) {
    var r = (
      /** @type {ComponentContext} */
      Et
    );
    (r.e ?? (r.e = [])).push(n);
  } else
    return vo(n);
}
function vo(n) {
  return Rn(Hs | vc, n);
}
function vu(n) {
  ps.ensure();
  const e = Rn(Nn | Ys, n);
  return (t = {}) => new Promise((r) => {
    t.outro ? ds(e, () => {
      It(e), r(void 0);
    }) : (It(e), r(void 0));
  });
}
function ji(n) {
  return Rn(Hs, n);
}
function fu(n) {
  return Rn(Es | Ys, n);
}
function Ka(n, e = 0) {
  return Rn(Ha | e, n);
}
function D(n, e = [], t = [], r = []) {
  Wc(r, e, t, (a) => {
    Rn(Ha, () => {
      n(...a.map(s));
    });
  });
}
function ia(n, e = 0) {
  var t = Rn(cn | e, n);
  return t;
}
function Xt(n) {
  return Rn($t | Ys, n);
}
function fo(n) {
  var e = n.teardown;
  if (e !== null) {
    const t = Ln, r = qe;
    cl(!0), en(null);
    try {
      e.call(null);
    } catch (a) {
      bn(a, n.parent);
    } finally {
      cl(t), en(r);
    }
  }
}
function Ii(n, e = !1) {
  var t = n.first;
  for (n.first = n.last = null; t !== null; ) {
    const a = t.ac;
    a !== null && Ws(() => {
      a.abort(ra);
    });
    var r = t.next;
    (t.f & Nn) !== 0 ? t.parent = null : It(t, e), t = r;
  }
}
function hu(n) {
  for (var e = n.first; e !== null; ) {
    var t = e.next;
    (e.f & $t) === 0 && It(e), e = t;
  }
}
function It(n, e = !0) {
  var t = !1;
  (e || (n.f & dc) !== 0) && n.nodes !== null && n.nodes.end !== null && (pu(
    n.nodes.start,
    /** @type {TemplateNode} */
    n.nodes.end
  ), t = !0), n.f |= Ma, Ii(n, e && !t), fr(n, 0);
  var r = n.nodes && n.nodes.t;
  if (r !== null)
    for (const i of r)
      i.stop();
  fo(n), n.f ^= Ma, n.f |= jt;
  var a = n.parent;
  a !== null && a.first !== null && ho(n), n.next = n.prev = n.teardown = n.ctx = n.deps = n.fn = n.nodes = n.ac = n.b = null;
}
function pu(n, e) {
  for (; n !== null; ) {
    var t = n === e ? null : /* @__PURE__ */ aa(n);
    n.remove(), n = t;
  }
}
function ho(n) {
  var e = n.parent, t = n.prev, r = n.next;
  t !== null && (t.next = r), r !== null && (r.prev = t), e !== null && (e.first === n && (e.first = r), e.last === n && (e.last = t));
}
function ds(n, e, t = !0) {
  var r = [];
  n.f |= Ai, po(n, r, !0);
  var a = () => {
    t && It(n), e && e();
  }, i = r.length;
  if (i > 0) {
    var l = () => --i || a();
    for (var o of r)
      o.out(l);
  } else
    a();
}
function po(n, e, t) {
  if ((n.f & Ot) === 0) {
    n.f ^= Ot;
    var r = n.nodes && n.nodes.t;
    if (r !== null)
      for (const o of r)
        (o.is_global || t) && e.push(o);
    for (var a = n.first; a !== null; ) {
      var i = a.next;
      if ((a.f & Nn) === 0) {
        var l = (a.f & fs) !== 0 || // If this is a branch effect without a block effect parent,
        // it means the parent block effect was pruned. In that case,
        // transparency information was transferred to the branch effect.
        (a.f & $t) !== 0 && (n.f & cn) !== 0;
        po(a, e, l ? t : !1);
      }
      a = i;
    }
  }
}
function Pa(n) {
  n.f &= ~Ai, go(n, !0);
}
function go(n, e) {
  if ((n.f & Ai) === 0 && (n.f & Ot) !== 0) {
    n.f ^= Ot, (n.f & pt) === 0 && (it(n, gt), ps.ensure().schedule(n));
    for (var t = n.first; t !== null; ) {
      var r = t.next, a = (t.f & fs) !== 0 || (t.f & $t) !== 0;
      go(t, a ? e : !1), t = r;
    }
    var i = n.nodes && n.nodes.t;
    if (i !== null)
      for (const l of i)
        (l.is_global || e) && l.in();
  }
}
function qi(n, e) {
  if (n.nodes)
    for (var t = n.nodes.start, r = n.nodes.end; t !== null; ) {
      var a = t === r ? null : /* @__PURE__ */ aa(t);
      e.append(t), t = a;
    }
}
let ka = !1, Ln = !1;
function cl(n) {
  Ln = n;
}
let qe = null, un = !1;
function en(n) {
  qe = n;
}
let Fe = null;
function wn(n) {
  Fe = n;
}
let kn = null;
function bo(n) {
  qe !== null && (kn ?? (kn = /* @__PURE__ */ new Set())).add(n);
}
let Lt = null, Kt = 0, Jt = null;
function gu(n) {
  Jt = n;
}
let mo = 1, Qn = 0, vs = Qn;
function ul(n) {
  vs = n;
}
function _o() {
  return ++mo;
}
function la(n) {
  var e = n.f;
  if ((e & gt) !== 0)
    return !0;
  if (e & _t && (n.f &= ~hs), (e & dn) !== 0) {
    for (var t = (
      /** @type {Value[]} */
      n.deps
    ), r = t.length, a = 0; a < r; a++) {
      var i = t[a];
      if (la(
        /** @type {Derived} */
        i
      ) && Zl(
        /** @type {Derived} */
        i
      ), i.wv > n.wv)
        return !0;
    }
    (e & Qt) !== 0 && // During time traveling we don't want to reset the status so that
    // traversal of the graph in the other batches still happens
    yt === null && it(n, pt);
  }
  return !1;
}
function yo(n, e, t = !0) {
  var r = n.reactions;
  if (r !== null && !(kn !== null && kn.has(n)))
    for (var a = 0; a < r.length; a++) {
      var i = r[a];
      (i.f & _t) !== 0 ? yo(
        /** @type {Derived} */
        i,
        e,
        !1
      ) : e === i && (t ? it(i, gt) : (i.f & pt) !== 0 && it(i, dn), Ni(
        /** @type {Effect} */
        i
      ));
    }
}
function ko(n) {
  var e = Lt, t = Kt, r = Jt, a = qe, i = kn, l = Et, o = un, u = vs, v = n.f;
  Lt = /** @type {null | Value[]} */
  null, Kt = 0, Jt = null, qe = (v & ($t | Nn)) === 0 ? n : null, kn = null, Ks(n.ctx), un = !1, vs = ++Qn, n.ac !== null && (Ws(() => {
    n.ac.abort(ra);
  }), n.ac = null);
  try {
    n.f |= Aa;
    var g = (
      /** @type {Function} */
      n.fn
    ), E = g();
    n.f |= Js;
    var f = dl(n);
    if (Gl() && Jt !== null && !un && f !== null && (n.f & (_t | dn | gt)) === 0)
      for (var p = 0; p < /** @type {Source[]} */
      Jt.length; p++)
        yo(
          Jt[p],
          /** @type {Effect} */
          n
        );
    if (a !== null && a !== n) {
      if (Qn++, a.deps !== null)
        for (let x = 0; x < t; x += 1)
          a.deps[x].rv = Qn;
      if (e !== null)
        for (const x of e)
          x.rv = Qn;
      Jt !== null && (r === null ? r = Jt : r.push(.../** @type {Source[]} */
      Jt));
    }
    return (n.f & Vn) !== 0 && (n.f ^= Vn), E;
  } catch (x) {
    return dl(n), cu(x);
  } finally {
    n.f ^= Aa, Lt = e, Kt = t, Jt = r, qe = a, kn = i, Ks(l), un = o, vs = u;
  }
}
function dl(n) {
  var a;
  var e = n.deps, t = ye == null ? void 0 : ye.is_fork;
  if (Lt !== null) {
    var r;
    if (t || fr(n, Kt), e !== null && Kt > 0)
      for (e.length = Kt + Lt.length, r = 0; r < Lt.length; r++)
        e[Kt + r] = Lt[r];
    else
      n.deps = e = Lt;
    if (Li() && (n.f & Qt) !== 0)
      for (r = Kt; r < e.length; r++)
        ((a = e[r]).reactions ?? (a.reactions = [])).push(n);
  } else !t && e !== null && Kt < e.length && (fr(n, Kt), e.length = Kt);
  return e;
}
function bu(n, e) {
  let t = e.reactions;
  if (t !== null) {
    var r = lc.call(t, n);
    if (r !== -1) {
      var a = t.length - 1;
      a === 0 ? t = e.reactions = null : (t[r] = t[a], t.pop());
    }
  }
  if (t === null && (e.f & _t) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (Lt === null || !Ea.call(Lt, e))) {
    var i = (
      /** @type {Derived} */
      e
    );
    (i.f & Qt) !== 0 && (i.f ^= Qt, i.f &= ~hs), i.v !== ft && Oi(i), i.ac !== null && Ws(() => {
      i.ac.abort(ra), i.ac = null, it(i, gt);
    }), $c(i), fr(i, 0);
  }
}
function fr(n, e) {
  var t = n.deps;
  if (t !== null)
    for (var r = e; r < t.length; r++)
      bu(n, t[r]);
}
function Vs(n) {
  var e = n.f;
  if ((e & jt) === 0) {
    it(n, pt);
    var t = Fe, r = ka;
    Fe = n, ka = (e & ($t | Nn)) === 0;
    try {
      (e & (cn | Fl)) !== 0 ? hu(n) : Ii(n), fo(n);
      var a = ko(n);
      n.teardown = typeof a == "function" ? a : null, n.wv = mo;
      var i;
    } finally {
      ka = r, Fe = t;
    }
  }
}
async function mu() {
  await Promise.resolve(), nu();
}
function s(n) {
  var e = n.f, t = (e & _t) !== 0;
  if (qe !== null && !un) {
    var r = Fe !== null && (Fe.f & jt) !== 0;
    if (!r && (kn === null || !kn.has(n))) {
      var a = qe.deps;
      if ((qe.f & Aa) !== 0)
        n.rv < Qn && (n.rv = Qn, Lt === null && a !== null && a[Kt] === n ? Kt++ : Lt === null ? Lt = [n] : Lt.push(n));
      else {
        qe.deps ?? (qe.deps = []), Ea.call(qe.deps, n) || qe.deps.push(n);
        var i = n.reactions;
        i === null ? n.reactions = [qe] : Ea.call(i, qe) || i.push(qe);
      }
    }
  }
  if (Ln && yn.has(n))
    return yn.get(n);
  if (t) {
    var l = (
      /** @type {Derived} */
      n
    );
    if (Ln) {
      var o = l.v;
      return ((l.f & pt) === 0 && l.reactions !== null || xo(l)) && (o = zi(l)), yn.set(l, o), o;
    }
    var u = (l.f & Qt) === 0 && !un && qe !== null && (ka || (qe.f & Qt) !== 0), v = (l.f & Js) === 0;
    la(l) && (u && (l.f |= Qt), Zl(l)), u && !v && (Ql(l), wo(l));
  }
  if (yt != null && yt.has(n))
    return yt.get(n);
  if ((n.f & Vn) !== 0)
    throw n.v;
  return n.v;
}
function wo(n) {
  if (n.f |= Qt, n.deps !== null)
    for (const e of n.deps)
      (e.reactions ?? (e.reactions = [])).push(n), (e.f & _t) !== 0 && (e.f & Qt) === 0 && (Ql(
        /** @type {Derived} */
        e
      ), wo(
        /** @type {Derived} */
        e
      ));
}
function xo(n) {
  if (n.v === ft) return !0;
  if (n.deps === null) return !1;
  for (const e of n.deps)
    if (yn.has(e) || (e.f & _t) !== 0 && xo(
      /** @type {Derived} */
      e
    ))
      return !0;
  return !1;
}
function ms(n) {
  var e = un;
  try {
    return un = !0, n();
  } finally {
    un = e;
  }
}
const _u = ["touchstart", "touchmove"];
function yu(n) {
  return _u.includes(n);
}
const $n = Symbol("events"), So = /* @__PURE__ */ new Set(), ui = /* @__PURE__ */ new Set();
function ku(n, e, t, r = {}) {
  function a(i) {
    if (r.capture || di.call(e, i), !i.cancelBubble)
      return Ws(() => t == null ? void 0 : t.call(this, i));
  }
  return n.startsWith("pointer") || n.startsWith("touch") || n === "wheel" ? _n(() => {
    e.addEventListener(n, a, r);
  }) : e.addEventListener(n, a, r), a;
}
function st(n, e, t, r, a) {
  var i = { capture: r, passive: a }, l = ku(n, e, t, i);
  (e === document.body || // @ts-ignore
  e === window || // @ts-ignore
  e === document || // Firefox has quirky behavior, it can happen that we still get "canplay" events when the element is already removed
  e instanceof HTMLMediaElement) && Ri(() => {
    e.removeEventListener(n, l, i);
  });
}
function P(n, e, t) {
  (e[$n] ?? (e[$n] = {}))[n] = t;
}
function bt(n) {
  for (var e = 0; e < n.length; e++)
    So.add(n[e]);
  for (var t of ui)
    t(n);
}
let Wa = null, Xa = !1;
function di(n) {
  var M, y;
  var e = this, t = (
    /** @type {Node} */
    e.ownerDocument
  ), r = n.type, a = ((M = n.composedPath) == null ? void 0 : M.call(n)) || [], i = (
    /** @type {null | Element} */
    a[0] || n.target
  );
  Wa = n, Xa || (Xa = !0, setTimeout(() => {
    Xa = !1, Wa = null;
  }));
  var l = 0, o = Wa === n && n[$n];
  if (o) {
    var u = a.indexOf(o);
    if (u !== -1 && (e === document || e === /** @type {any} */
    window)) {
      n[$n] = e;
      return;
    }
    var v = a.indexOf(e);
    if (v === -1)
      return;
    u <= v && (l = u);
  }
  if (i = /** @type {Element} */
  a[l] || n.target, i !== e) {
    Rl(n, "currentTarget", {
      configurable: !0,
      get() {
        return i || t;
      }
    });
    var g = qe, E = Fe;
    en(null), wn(null);
    try {
      for (var f, p = []; i !== null && i !== e; ) {
        try {
          var x = (y = i[$n]) == null ? void 0 : y[r];
          x != null && (!/** @type {any} */
          i.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          n.target === i) && x.call(i, n);
        } catch (L) {
          f ? p.push(L) : f = L;
        }
        if (n.cancelBubble) break;
        l++, i = l < a.length ? (
          /** @type {Element} */
          a[l]
        ) : null;
      }
      if (f) {
        for (let L of p)
          queueMicrotask(() => {
            throw L;
          });
        throw f;
      }
    } finally {
      n[$n] = e, delete n.currentTarget, en(g), wn(E);
    }
  }
}
var Nl;
const Za = (
  // We gotta write it like this because after downleveling the pure comment may end up in the wrong location
  ((Nl = globalThis == null ? void 0 : globalThis.window) == null ? void 0 : Nl.trustedTypes) && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", {
    /** @param {string} html */
    createHTML: (n) => n
  })
);
function wu(n) {
  return (
    /** @type {string} */
    (Za == null ? void 0 : Za.createHTML(n)) ?? n
  );
}
function Eo(n) {
  var e = ou("template");
  return e.innerHTML = wu(n.replaceAll("<!>", "<!---->")), e.content;
}
function hr(n, e) {
  var t = (
    /** @type {Effect} */
    Fe
  );
  t.nodes === null && (t.nodes = { start: n, end: e, a: null, t: null });
}
// @__NO_SIDE_EFFECTS__
function k(n, e) {
  var t = (e & Sc) !== 0, r = (e & Ec) !== 0, a, i = !n.startsWith("<!>");
  return () => {
    a === void 0 && (a = Eo(i ? n : "<!>" + n), t || (a = /** @type {TemplateNode} */
    /* @__PURE__ */ bs(a)));
    var l = (
      /** @type {TemplateNode} */
      r || lo ? document.importNode(a, !0) : a.cloneNode(!0)
    );
    if (t) {
      var o = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ bs(l)
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
function xu(n, e, t = "svg") {
  var r = !n.startsWith("<!>"), a = `<${t}>${r ? n : "<!>" + n}</${t}>`, i;
  return () => {
    if (!i) {
      var l = (
        /** @type {DocumentFragment} */
        Eo(a)
      ), o = (
        /** @type {Element} */
        /* @__PURE__ */ bs(l)
      );
      i = /** @type {Element} */
      /* @__PURE__ */ bs(o);
    }
    var u = (
      /** @type {TemplateNode} */
      i.cloneNode(!0)
    );
    return hr(u, u), u;
  };
}
// @__NO_SIDE_EFFECTS__
function Su(n, e) {
  return /* @__PURE__ */ xu(n, e, "svg");
}
function Zt(n = "") {
  {
    var e = Dn(n + "");
    return hr(e, e), e;
  }
}
function Rt() {
  var n = document.createDocumentFragment(), e = document.createComment(""), t = Dn();
  return n.append(e, t), hr(e, t), n;
}
function b(n, e) {
  n !== null && n.before(
    /** @type {Node} */
    e
  );
}
function Eu(n) {
  let e = 0, t = gs(0), r;
  return () => {
    Li() && (s(t), Ka(() => (e === 0 && (r = ms(() => n(() => dr(t)))), e += 1, () => {
      _n(() => {
        e -= 1, e === 0 && (r == null || r(), r = void 0, dr(t));
      });
    })));
  };
}
var Mu = fs | Ys;
function Tu(n, e, t, r) {
  new Au(n, e, t, r);
}
var Yt, Mi, Wt, ss, Tt, Ft, At, Bt, hn, rs, Hn, Ls, mr, _r, Cn, ja, Ze, Cu, Ou, vi, Pu, fi, ir, wa, hi, pi;
class Au {
  /**
   * @param {TemplateNode} node
   * @param {BoundaryProps} props
   * @param {((anchor: Node) => void)} children
   * @param {((error: unknown) => unknown) | undefined} [transform_error]
   */
  constructor(e, t, r, a) {
    K(this, Ze);
    /** @type {Boundary | null} */
    ct(this, "parent");
    ct(this, "is_pending", !1);
    /**
     * API-level transformError transform function. Transforms errors before they reach the `failed` snippet.
     * Inherited from parent boundary, or defaults to identity.
     * @type {(error: unknown) => unknown}
     */
    ct(this, "transform_error");
    /** @type {TemplateNode} */
    K(this, Yt);
    /** @type {TemplateNode | null} */
    K(this, Mi, null);
    /** @type {BoundaryProps} */
    K(this, Wt);
    /** @type {((anchor: Node) => void)} */
    K(this, ss);
    /** @type {Effect} */
    K(this, Tt);
    /** @type {Effect | null} */
    K(this, Ft, null);
    /** @type {Effect | null} */
    K(this, At, null);
    /** @type {Effect | null} */
    K(this, Bt, null);
    /** @type {DocumentFragment | null} */
    K(this, hn, null);
    K(this, rs, 0);
    K(this, Hn, 0);
    K(this, Ls, !1);
    /** @type {Set<Effect>} */
    K(this, mr, /* @__PURE__ */ new Set());
    /** @type {Set<Effect>} */
    K(this, _r, /* @__PURE__ */ new Set());
    /**
     * A source containing the number of pending async deriveds/expressions.
     * Only created if `$effect.pending()` is used inside the boundary,
     * otherwise updating the source results in needless `Batch.ensure()`
     * calls followed by no-op flushes
     * @type {Source<number> | null}
     */
    K(this, Cn, null);
    K(this, ja, Eu(() => (ne(this, Cn, gs(c(this, rs))), () => {
      ne(this, Cn, null);
    })));
    var i;
    ne(this, Yt, e), ne(this, Wt, t), ne(this, ss, (l) => {
      var o = (
        /** @type {Effect} */
        Fe
      );
      o.b = this, o.f |= ri, r(l);
    }), this.parent = /** @type {Effect} */
    Fe.b, this.transform_error = a ?? ((i = this.parent) == null ? void 0 : i.transform_error) ?? ((l) => l), ne(this, Tt, ia(() => {
      ve(this, Ze, fi).call(this);
    }, Mu));
  }
  /**
   * Defer an effect inside a pending boundary until the boundary resolves
   * @param {Effect} effect
   */
  defer_effect(e) {
    Yl(e, c(this, mr), c(this, _r));
  }
  /**
   * Returns `false` if the effect exists inside a boundary whose pending snippet is shown
   * @returns {boolean}
   */
  is_rendered() {
    return !this.is_pending && (!this.parent || this.parent.is_rendered());
  }
  has_pending_snippet() {
    return !!c(this, Wt).pending;
  }
  /**
   * Update the source that powers `$effect.pending()` inside this boundary,
   * and controls when the current `pending` snippet (if any) is removed.
   * Do not call from inside the class
   * @param {1 | -1} d
   * @param {Batch} batch
   */
  update_pending_count(e, t) {
    ve(this, Ze, hi).call(this, e, t), ne(this, rs, c(this, rs) + e), !(!c(this, Cn) || c(this, Ls)) && (ne(this, Ls, !0), _n(() => {
      ne(this, Ls, !1), c(this, Cn) && Gs(c(this, Cn), c(this, rs));
    }));
  }
  get_effect_pending() {
    return c(this, ja).call(this), s(
      /** @type {Source<number>} */
      c(this, Cn)
    );
  }
  /** @param {unknown} error */
  error(e) {
    if (!c(this, Wt).onerror && !c(this, Wt).failed)
      throw e;
    ye != null && ye.is_fork ? (c(this, Ft) && ye.skip_effect(c(this, Ft)), c(this, At) && ye.skip_effect(c(this, At)), c(this, Bt) && ye.skip_effect(c(this, Bt)), ye.oncommit(() => {
      ve(this, Ze, pi).call(this, e);
    })) : ve(this, Ze, pi).call(this, e);
  }
}
Yt = new WeakMap(), Mi = new WeakMap(), Wt = new WeakMap(), ss = new WeakMap(), Tt = new WeakMap(), Ft = new WeakMap(), At = new WeakMap(), Bt = new WeakMap(), hn = new WeakMap(), rs = new WeakMap(), Hn = new WeakMap(), Ls = new WeakMap(), mr = new WeakMap(), _r = new WeakMap(), Cn = new WeakMap(), ja = new WeakMap(), Ze = new WeakSet(), Cu = function() {
  try {
    ne(this, Ft, Xt(() => c(this, ss).call(this, c(this, Yt))));
  } catch (e) {
    this.error(e);
  }
}, /**
 * @param {unknown} error The deserialized error from the server's hydration comment
 */
Ou = function(e) {
  const t = c(this, Wt).failed, { reset: r, invoke_onerror: a } = ve(this, Ze, vi).call(this, e);
  _n(a), t && ne(this, Bt, Xt(() => {
    t(
      c(this, Yt),
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
vi = function(e) {
  var t = !1, r = !1;
  const a = () => {
    if (t) {
      Cc();
      return;
    }
    t = !0, r && Uc(), c(this, Bt) !== null && ds(c(this, Bt), () => {
      ne(this, Bt, null);
    }), ve(this, Ze, wa).call(this, () => {
      ve(this, Ze, fi).call(this);
    });
  };
  return { reset: a, invoke_onerror: () => {
    var l, o;
    try {
      r = !0, (o = (l = c(this, Wt)).onerror) == null || o.call(l, e, a), r = !1;
    } catch (u) {
      bn(u, c(this, Tt) && c(this, Tt).parent);
    }
  } };
}, Pu = function() {
  const e = c(this, Wt).pending;
  e && (this.is_pending = !0, ne(this, At, Xt(() => e(c(this, Yt)))), _n(() => {
    var t = ne(this, hn, document.createDocumentFragment()), r = Dn(), a = !1;
    if (t.append(r), ne(this, Ft, ve(this, Ze, wa).call(this, () => {
      try {
        return Xt(() => c(this, ss).call(this, r));
      } catch (i) {
        try {
          this.error(i), a = !0;
        } catch (l) {
          bn(l, c(this, Tt).parent);
        }
        return null;
      }
    })), c(this, Ft) === null) {
      ne(this, hn, null), a && ve(this, Ze, ir).call(
        this,
        /** @type {Batch} */
        ye
      );
      return;
    }
    c(this, Hn) === 0 && (c(this, Yt).before(t), ne(this, hn, null), ds(
      /** @type {Effect} */
      c(this, At),
      () => {
        ne(this, At, null);
      }
    ), ve(this, Ze, ir).call(
      this,
      /** @type {Batch} */
      ye
    ));
  }));
}, fi = function() {
  try {
    if (this.is_pending = this.has_pending_snippet(), ne(this, Hn, 0), ne(this, rs, 0), ne(this, Ft, Xt(() => {
      c(this, ss).call(this, c(this, Yt));
    })), c(this, Hn) > 0) {
      var e = ne(this, hn, document.createDocumentFragment());
      qi(c(this, Ft), e);
      const t = (
        /** @type {(anchor: Node) => void} */
        c(this, Wt).pending
      );
      ne(this, At, Xt(() => t(c(this, Yt))));
    } else
      ve(this, Ze, ir).call(
        this,
        /** @type {Batch} */
        ye
      );
  } catch (t) {
    this.error(t);
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
  var t = Fe, r = qe, a = Et;
  wn(c(this, Tt)), en(c(this, Tt)), Ks(c(this, Tt).ctx);
  try {
    return ps.ensure(), e();
  } finally {
    wn(t), en(r), Ks(a);
  }
}, /**
 * Updates the pending count associated with the currently visible pending snippet,
 * if any, such that we can replace the snippet with content once work is done
 * @param {1 | -1} d
 * @param {Batch} batch
 */
hi = function(e, t) {
  var r;
  if (!this.has_pending_snippet()) {
    this.parent && ve(r = this.parent, Ze, hi).call(r, e, t);
    return;
  }
  ne(this, Hn, c(this, Hn) + e), c(this, Hn) === 0 && (ve(this, Ze, ir).call(this, t), c(this, At) && ds(c(this, At), () => {
    ne(this, At, null);
  }), c(this, hn) && (c(this, Yt).before(c(this, hn)), ne(this, hn, null)));
}, /**
 * @param {unknown} error
 */
pi = function(e) {
  c(this, Ft) && (It(c(this, Ft)), ne(this, Ft, null)), c(this, At) && (It(c(this, At)), ne(this, At, null)), c(this, Bt) && (It(c(this, Bt)), ne(this, Bt, null));
  let t = c(this, Wt).failed;
  const r = (a) => {
    const { reset: i, invoke_onerror: l } = ve(this, Ze, vi).call(this, a);
    l(), t && ne(this, Bt, ve(this, Ze, wa).call(this, () => {
      try {
        return Xt(() => {
          var o = (
            /** @type {Effect} */
            Fe
          );
          o.b = this, o.f |= ri, t(
            c(this, Yt),
            () => a,
            () => i
          );
        });
      } catch (o) {
        return bn(
          o,
          /** @type {Effect} */
          c(this, Tt).parent
        ), null;
      }
    }));
  };
  _n(() => {
    var a;
    try {
      a = this.transform_error(e);
    } catch (i) {
      bn(i, c(this, Tt) && c(this, Tt).parent);
      return;
    }
    a !== null && typeof a == "object" && typeof /** @type {any} */
    a.then == "function" ? a.then(
      r,
      /** @param {unknown} e */
      (i) => bn(i, c(this, Tt) && c(this, Tt).parent)
    ) : r(a);
  });
};
function R(n, e) {
  var t = e == null ? "" : typeof e == "object" ? `${e}` : e;
  t !== /** @type {any} */
  (n[nr] ?? (n[nr] = n.nodeValue)) && (n[nr] = t, n.nodeValue = `${t}`);
}
function vl(n, e) {
  return zu(n, e);
}
const fa = /* @__PURE__ */ new Map();
function zu(n, { target: e, anchor: t, props: r = {}, events: a, context: i, intro: l = !0, transformError: o }) {
  iu();
  var u = void 0, v = vu(() => {
    var g = t ?? e.appendChild(Dn());
    Tu(
      /** @type {TemplateNode} */
      g,
      {
        pending: () => {
        }
      },
      (p) => {
        dt({});
        var x = (
          /** @type {ComponentContext} */
          Et
        );
        i && (x.c = i), a && (r.$$events = a), u = n(p, r) || Ci(), vt();
      },
      o
    );
    var E = /* @__PURE__ */ new Set(), f = (p) => {
      for (var x = 0; x < p.length; x++) {
        var M = p[x];
        if (!E.has(M)) {
          E.add(M);
          var y = yu(M);
          for (const A of [e, document]) {
            var L = fa.get(A);
            L === void 0 && (L = /* @__PURE__ */ new Map(), fa.set(A, L));
            var j = L.get(M);
            j === void 0 ? (A.addEventListener(M, di, { passive: y }), L.set(M, 1)) : L.set(M, j + 1);
          }
        }
      }
    };
    return f(Ba(So)), ui.add(f), () => {
      var y;
      for (var p of E)
        for (const L of [e, document]) {
          var x = (
            /** @type {Map<string, number>} */
            fa.get(L)
          ), M = (
            /** @type {number} */
            x.get(p)
          );
          --M == 0 ? (L.removeEventListener(p, di), x.delete(p), x.size === 0 && fa.delete(L)) : x.set(p, M);
        }
      ui.delete(f), g !== t && ((y = g.parentNode) == null || y.removeChild(g));
    };
  });
  return gi.set(u, v), u;
}
let gi = /* @__PURE__ */ new WeakMap();
function fl(n, e) {
  const t = gi.get(n);
  return t ? (gi.delete(n), t(e)) : Promise.resolve();
}
var ln, pn, Ut, as, yr, kr, Ia;
class Fi {
  /**
   * @param {TemplateNode} anchor
   * @param {boolean} transition
   */
  constructor(e, t = !0) {
    /** @type {TemplateNode} */
    ct(this, "anchor");
    /** @type {Map<Batch, Key>} */
    K(this, ln, /* @__PURE__ */ new Map());
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
    K(this, pn, /* @__PURE__ */ new Map());
    /**
     * Similar to #onscreen with respect to the keys, but contains branches that are not yet
     * in the DOM, because their insertion is deferred.
     * @type {Map<Key, Branch>}
     */
    K(this, Ut, /* @__PURE__ */ new Map());
    /**
     * Keys of effects that are currently outroing
     * @type {Set<Key>}
     */
    K(this, as, /* @__PURE__ */ new Set());
    /**
     * Whether to pause (i.e. outro) on change, or destroy immediately.
     * This is necessary for `<svelte:element>`
     */
    K(this, yr, !0);
    /**
     * @param {Batch} batch
     */
    K(this, kr, (e) => {
      if (c(this, ln).has(e)) {
        var t = (
          /** @type {Key} */
          c(this, ln).get(e)
        ), r = c(this, pn).get(t);
        if (r)
          Pa(r), c(this, as).delete(t);
        else {
          var a = c(this, Ut).get(t);
          a && (Pa(a.effect), c(this, pn).set(t, a.effect), c(this, Ut).delete(t), a.fragment.lastChild.remove(), this.anchor.before(a.fragment), r = a.effect);
        }
        for (const [i, l] of c(this, ln)) {
          if (c(this, ln).delete(i), i === e)
            break;
          const o = c(this, Ut).get(l);
          o && (It(o.effect), c(this, Ut).delete(l));
        }
        for (const [i, l] of c(this, pn)) {
          if (i === t || c(this, as).has(i)) continue;
          const o = () => {
            if (Array.from(c(this, ln).values()).includes(i)) {
              var v = document.createDocumentFragment();
              qi(l, v), v.append(Dn()), c(this, Ut).set(i, { effect: l, fragment: v });
            } else
              It(l);
            c(this, as).delete(i), c(this, pn).delete(i);
          };
          c(this, yr) || !r ? (c(this, as).add(i), ds(l, o, !1)) : o();
        }
      }
    });
    /**
     * @param {Batch} batch
     */
    K(this, Ia, (e) => {
      c(this, ln).delete(e);
      const t = Array.from(c(this, ln).values());
      for (const [r, a] of c(this, Ut))
        t.includes(r) || (It(a.effect), c(this, Ut).delete(r));
    });
    this.anchor = e, ne(this, yr, t);
  }
  /**
   *
   * @param {any} key
   * @param {null | ((target: TemplateNode) => void)} fn
   */
  ensure(e, t) {
    var r = (
      /** @type {Batch} */
      ye
    ), a = uo();
    if (t && !c(this, pn).has(e) && !c(this, Ut).has(e))
      if (a) {
        var i = document.createDocumentFragment(), l = Dn();
        i.append(l), c(this, Ut).set(e, {
          effect: Xt(() => t(l)),
          fragment: i
        });
      } else
        c(this, pn).set(
          e,
          Xt(() => t(this.anchor))
        );
    if (c(this, ln).set(r, e), a) {
      for (const [o, u] of c(this, pn))
        o === e ? r.unskip_effect(u) : r.skip_effect(u);
      for (const [o, u] of c(this, Ut))
        o === e ? r.unskip_effect(u.effect) : r.skip_effect(u.effect);
      r.oncommit(c(this, kr)), r.ondiscard(c(this, Ia));
    } else
      c(this, kr).call(this, r);
  }
}
ln = new WeakMap(), pn = new WeakMap(), Ut = new WeakMap(), as = new WeakMap(), yr = new WeakMap(), kr = new WeakMap(), Ia = new WeakMap();
function H(n, e, t = !1) {
  var r = new Fi(n), a = t ? fs : 0;
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
const Du = Symbol("NaN");
function hl(n, e, t) {
  var r = new Fi(n);
  ia(() => {
    var a = e();
    a !== a && (a = /** @type {any} */
    Du), r.ensure(a, t);
  });
}
function ht(n, e) {
  return e;
}
function Nu(n, e, t) {
  for (var r = [], a = e.length, i, l = e.length, o = 0; o < a; o++) {
    let E = e[o];
    ds(
      E,
      () => {
        if (i) {
          if (i.pending.delete(E), i.done.add(E), i.pending.size === 0) {
            var f = (
              /** @type {Set<EachOutroGroup>} */
              n.outrogroups
            );
            bi(n, Ba(i.done)), f.delete(i), f.size === 0 && (n.outrogroups = null);
          }
        } else
          l -= 1;
      },
      !1
    );
  }
  if (l === 0) {
    var u = r.length === 0 && t !== null && n.pending.size === 0;
    if (u) {
      var v = (
        /** @type {Element} */
        t
      ), g = (
        /** @type {Element} */
        v.parentNode
      );
      lu(g), g.append(v), n.items.clear();
    }
    bi(n, e, !u);
  } else
    i = {
      pending: new Set(e),
      done: /* @__PURE__ */ new Set()
    }, (n.outrogroups ?? (n.outrogroups = /* @__PURE__ */ new Set())).add(i);
}
function bi(n, e, t = !0) {
  var r;
  if (n.pending.size > 0) {
    r = /* @__PURE__ */ new Set();
    for (const l of n.pending.values())
      for (const o of l)
        r.add(
          /** @type {EachItem} */
          n.items.get(o).e
        );
  }
  for (var a = 0; a < e.length; a++) {
    var i = e[a];
    if (r != null && r.has(i)) {
      i.f |= mn;
      const l = document.createDocumentFragment();
      qi(i, l);
    } else
      It(e[a], t);
  }
}
var pl;
function Ie(n, e, t, r, a, i = null) {
  var l = n, o = /* @__PURE__ */ new Map(), u = (e & Ul) !== 0;
  if (u) {
    var v = (
      /** @type {Element} */
      n
    );
    l = v.appendChild(Dn());
  }
  var g = null, E = /* @__PURE__ */ Xl(() => {
    var A = t();
    return (
      /** @type {V[]} */
      sa(A) ? A : A == null ? [] : Ba(A)
    );
  }), f, p = /* @__PURE__ */ new Map(), x = !0;
  function M(A) {
    (j.effect.f & jt) === 0 && (j.pending.delete(A), j.fallback = g, Lu(j, f, l, e, r), g !== null && (f.length === 0 ? (g.f & mn) === 0 ? Pa(g) : (g.f ^= mn, lr(g, null, l)) : ds(g, () => {
      g = null;
    })));
  }
  function y(A) {
    j.pending.delete(A);
  }
  var L = ia(() => {
    f = /** @type {V[]} */
    s(E);
    for (var A = f.length, q = /* @__PURE__ */ new Set(), O = (
      /** @type {Batch} */
      ye
    ), C = uo(), S = 0; S < A; S += 1) {
      var _ = f[S], T = r(_, S), z = x ? null : o.get(T);
      z ? (z.v && Gs(z.v, _), z.i && Gs(z.i, S), C && O.unskip_effect(z.e)) : (z = Ru(
        o,
        x ? l : pl ?? (pl = Dn()),
        _,
        T,
        S,
        a,
        e,
        t
      ), x || (z.e.f |= mn), o.set(T, z)), q.add(T);
    }
    if (A === 0 && i && !g && (x ? g = Xt(() => i(l)) : (g = Xt(() => i(pl ?? (pl = Dn()))), g.f |= mn)), A > q.size && Dc(), !x)
      if (p.set(O, q), C) {
        for (const [W, re] of o)
          q.has(W) || O.skip_effect(re.e);
        O.oncommit(M), O.ondiscard(y);
      } else
        M(O);
    s(E);
  }), j = { effect: L, items: o, pending: p, outrogroups: null, fallback: g };
  x = !1;
}
function tr(n) {
  for (; n !== null && (n.f & $t) === 0; )
    n = n.next;
  return n;
}
function Lu(n, e, t, r, a) {
  var z, W, re, ke, he, N, F, ee, te;
  var i = (r & mc) !== 0, l = e.length, o = n.items, u = tr(n.effect.first), v, g = null, E, f = [], p = [], x, M, y, L;
  if (i)
    for (L = 0; L < l; L += 1)
      x = e[L], M = a(x, L), y = /** @type {EachItem} */
      o.get(M).e, (y.f & mn) === 0 && ((W = (z = y.nodes) == null ? void 0 : z.a) == null || W.measure(), (E ?? (E = /* @__PURE__ */ new Set())).add(y));
  for (L = 0; L < l; L += 1) {
    if (x = e[L], M = a(x, L), y = /** @type {EachItem} */
    o.get(M).e, n.outrogroups !== null)
      for (const se of n.outrogroups)
        se.pending.delete(y), se.done.delete(y);
    if ((y.f & Ot) !== 0 && (Pa(y), i && ((ke = (re = y.nodes) == null ? void 0 : re.a) == null || ke.unfix(), (E ?? (E = /* @__PURE__ */ new Set())).delete(y))), (y.f & mn) !== 0)
      if (y.f ^= mn, y === u)
        lr(y, null, t);
      else {
        var j = g ? g.next : u;
        y === n.effect.last && (n.effect.last = y.prev), y.prev && (y.prev.next = y.next), y.next && (y.next.prev = y.prev), Fn(n, g, y), Fn(n, y, j), lr(y, j, t), g = y, f = [], p = [], u = tr(g.next);
        continue;
      }
    if (y !== u) {
      if (v !== void 0 && v.has(y)) {
        if (f.length < p.length) {
          var A = p[0], q;
          g = A.prev;
          var O = f[0], C = f[f.length - 1];
          for (q = 0; q < f.length; q += 1)
            lr(f[q], A, t);
          for (q = 0; q < p.length; q += 1)
            v.delete(p[q]);
          Fn(n, O.prev, C.next), Fn(n, g, O), Fn(n, C, A), u = A, g = C, L -= 1, f = [], p = [];
        } else
          v.delete(y), lr(y, u, t), Fn(n, y.prev, y.next), Fn(n, y, g === null ? n.effect.first : g.next), Fn(n, g, y), g = y;
        continue;
      }
      for (f = [], p = []; u !== null && u !== y; )
        (v ?? (v = /* @__PURE__ */ new Set())).add(u), p.push(u), u = tr(u.next);
      if (u === null)
        continue;
    }
    (y.f & mn) === 0 && f.push(y), g = y, u = tr(y.next);
  }
  if (n.outrogroups !== null) {
    for (const se of n.outrogroups)
      se.pending.size === 0 && (bi(n, Ba(se.done)), (he = n.outrogroups) == null || he.delete(se));
    n.outrogroups.size === 0 && (n.outrogroups = null);
  }
  if (u !== null || v !== void 0) {
    var S = [];
    if (v !== void 0)
      for (y of v)
        (y.f & Ot) === 0 && S.push(y);
    for (; u !== null; )
      (u.f & Ot) === 0 && u !== n.fallback && S.push(u), u = tr(u.next);
    var _ = S.length;
    if (_ > 0) {
      var T = (r & Ul) !== 0 && l === 0 ? t : null;
      if (i) {
        for (L = 0; L < _; L += 1)
          (F = (N = S[L].nodes) == null ? void 0 : N.a) == null || F.measure();
        for (L = 0; L < _; L += 1)
          (te = (ee = S[L].nodes) == null ? void 0 : ee.a) == null || te.fix();
      }
      Nu(n, S, T);
    }
  }
  i && _n(() => {
    var se, ie;
    if (E !== void 0)
      for (y of E)
        (ie = (se = y.nodes) == null ? void 0 : se.a) == null || ie.apply();
  });
}
function Ru(n, e, t, r, a, i, l, o) {
  var u = (l & gc) !== 0 ? (l & _c) === 0 ? /* @__PURE__ */ ru(t, !1, !1) : gs(t) : null, v = (l & bc) !== 0 ? gs(a) : null;
  return {
    v: u,
    i: v,
    e: Xt(() => (i(e, u ?? t, v ?? a, o), () => {
      n.delete(r);
    }))
  };
}
function lr(n, e, t) {
  if (n.nodes)
    for (var r = n.nodes.start, a = n.nodes.end, i = e && (e.f & mn) === 0 ? (
      /** @type {EffectNodes} */
      e.nodes.start
    ) : t; r !== null; ) {
      var l = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ aa(r)
      );
      if (i.before(r), r === a)
        return;
      r = l;
    }
}
function Fn(n, e, t) {
  e === null ? n.effect.first = t : e.next = t, t === null ? n.effect.last = e : t.prev = e;
}
function gl(n, e, ...t) {
  var r = new Fi(n);
  ia(() => {
    const a = e() ?? null;
    r.ensure(a, a && ((i) => a(i, ...t)));
  }, fs);
}
function Mo(n) {
  var e, t, r = "";
  if (typeof n == "string" || typeof n == "number") r += n;
  else if (typeof n == "object") if (Array.isArray(n)) {
    var a = n.length;
    for (e = 0; e < a; e++) n[e] && (t = Mo(n[e])) && (r && (r += " "), r += t);
  } else for (t in n) n[t] && (r && (r += " "), r += t);
  return r;
}
function ju() {
  for (var n, e, t = 0, r = "", a = arguments.length; t < a; t++) (n = arguments[t]) && (e = Mo(n)) && (r && (r += " "), r += e);
  return r;
}
function mi(n) {
  return typeof n == "object" ? ju(n) : n ?? "";
}
const bl = [...` 	
\r\f \v\uFEFF`];
function Iu(n, e, t) {
  var r = n == null ? "" : "" + n;
  if (e && (r = r ? r + " " + e : e), t) {
    for (var a of Object.keys(t))
      if (t[a])
        r = r ? r + " " + a : a;
      else if (r.length)
        for (var i = a.length, l = 0; (l = r.indexOf(a, l)) >= 0; ) {
          var o = l + i;
          (l === 0 || bl.includes(r[l - 1])) && (o === r.length || bl.includes(r[o])) ? r = (l === 0 ? "" : r.substring(0, l)) + r.substring(o + 1) : l = o;
        }
  }
  return r === "" ? null : r;
}
function ml(n, e = !1) {
  var t = e ? " !important;" : ";", r = "";
  for (var a of Object.keys(n)) {
    var i = n[a];
    i != null && i !== "" && (r += " " + a + ": " + i + t);
  }
  return r;
}
function qu(n, e) {
  if (e) {
    var t = "", r, a;
    return Array.isArray(e) ? (r = e[0], a = e[1]) : r = e, r && (t += ml(r)), a && (t += ml(a, !0)), t = t.trim(), t === "" ? null : t;
  }
  return String(n);
}
function _e(n, e, t, r, a, i) {
  var l = (
    /** @type {any} */
    n[ai]
  );
  if (l !== t || l === void 0) {
    var o = Iu(t, r, i);
    o == null ? n.removeAttribute("class") : n.className = o, n[ai] = t;
  } else if (i && a !== i)
    for (var u in i) {
      var v = !!i[u];
      (a == null || v !== !!a[u]) && n.classList.toggle(u, v);
    }
  return i;
}
function Qa(n, e = {}, t, r) {
  for (var a in t) {
    var i = t[a];
    e[a] !== i && (t[a] == null ? n.style.removeProperty(a) : n.style.setProperty(a, i, r));
  }
}
function Ct(n, e, t, r) {
  var a = (
    /** @type {any} */
    n[ii]
  );
  if (a !== e) {
    var i = qu(e, r);
    i == null ? n.removeAttribute("style") : n.style.cssText = i, n[ii] = e;
  } else r && (Array.isArray(r) ? (Qa(n, t == null ? void 0 : t[0], r[0]), Qa(n, t == null ? void 0 : t[1], r[1], "important")) : Qa(n, t, r));
  return r;
}
function Fu(n, e) {
  e ? n.hasAttribute("selected") || n.setAttribute("selected", "") : n.removeAttribute("selected");
}
function Bu(n, e) {
  var t = n.__defaultValue, r = n.multiple, a = r ? t ?? [] : null;
  if (!(r && !sa(a))) {
    n.selectedIndex;
    for (var i of n.options) {
      var l = Ms(i);
      Fu(
        i,
        r ? (
          /** @type {any[]} */
          a.includes(l)
        ) : io(l, t)
      );
    }
  }
}
function oa(n, e, t = !1) {
  if (n.multiple) {
    if (e == null)
      return;
    if (!sa(e))
      return Ac();
    for (var r of n.options)
      r.selected = e.includes(Ms(r));
    return;
  }
  for (r of n.options) {
    var a = Ms(r);
    if (io(a, e)) {
      r.selected = !0;
      return;
    }
  }
  (!t || e !== void 0) && (n.selectedIndex = -1);
}
function pr(n) {
  var e = new MutationObserver((t) => {
    t.every(Uu) || ("__defaultValue" in n && Bu(n), "__value" in n && oa(n, n.__value));
  });
  e.observe(n, {
    // Listen to option element changes
    childList: !0,
    subtree: !0,
    // because of <optgroup>
    // Listen to option element value attribute changes
    // (doesn't get notified of select value changes,
    // because that property is not reflected as an attribute)
    attributes: !0,
    attributeFilter: ["value"]
  }), Ri(() => {
    e.disconnect();
  });
}
function _l(n, e, t = e) {
  var r = /* @__PURE__ */ new WeakSet(), a = !0;
  Pi(n, "change", (i) => {
    var l = i ? "[selected]" : ":checked", o;
    if (n.multiple)
      o = [].map.call(n.querySelectorAll(l), Ms);
    else {
      var u = n.querySelector(l) ?? // will fall back to first non-disabled option if no option is selected
      n.querySelector("option:not([disabled])");
      o = u && Ms(u);
    }
    t(o), n.__value = o, ye !== null && r.add(ye);
  }), ji(() => {
    var i = e();
    if (n === document.activeElement) {
      var l = (
        /** @type {Batch} */
        ye
      );
      if (r.has(l))
        return;
    }
    if (oa(n, i, a), a && i === void 0) {
      var o = n.querySelector(":checked");
      o !== null && (i = Ms(o), t(i));
    }
    n.__value = i, a = !1;
  });
}
function Ms(n) {
  return "__value" in n ? n.__value : n.value;
}
function Uu(n) {
  if (
    /** @type {Element} */
    n.target.closest("selectedcontent") !== null
  )
    return !0;
  if (n.type === "childList") {
    var e = [...n.addedNodes, ...n.removedNodes];
    return e.length > 0 && e.every((t) => t.nodeName === "SELECTEDCONTENT");
  }
  return !1;
}
const Hu = Symbol("is custom element"), Ku = Symbol("is html"), Gu = pc ? "progress" : "PROGRESS";
function es(n, e) {
  var t = Bi(n);
  t.value === (t.value = // treat null and undefined the same for the initial value
  e ?? void 0) || // @ts-expect-error
  // `progress` elements always need their value set when it's `0`
  n.value === e && (e !== 0 || n.nodeName !== Gu) || (n.value = e ?? "");
}
function Vu(n, e) {
  var t = Bi(n);
  t.checked !== (t.checked = // treat null and undefined the same for the initial value
  e ?? void 0) && (n.checked = e);
}
function be(n, e, t, r) {
  var a = Bi(n);
  a[e] !== (a[e] = t) && (e === "loading" && (n[hc] = t), t == null ? n.removeAttribute(e) : typeof t != "string" && Ju(n).has(e) ? n[e] = t : n.setAttribute(e, t));
}
function Bi(n) {
  return (
    /** @type {Record<string | symbol, unknown>} **/
    /** @type {any} */
    n[ba] ?? (n[ba] = {
      [Hu]: n.nodeName.includes("-"),
      [Ku]: n.namespaceURI === Mc
    })
  );
}
var yl = /* @__PURE__ */ new Map();
function Ju(n) {
  var e = n.getAttribute("is") || n.nodeName, t = yl.get(e);
  if (t) return t;
  yl.set(e, t = /* @__PURE__ */ new Set());
  for (var r, a = n, i = Element.prototype; i !== a; ) {
    r = oc(a);
    for (var l in r)
      r[l].set && // better safe than sorry, we don't want spread attributes to mess with HTML content
      l !== "innerHTML" && l !== "textContent" && l !== "innerText" && t.add(l);
    a = Ti(a);
  }
  return t;
}
function xn(n, e, t = e) {
  var r = /* @__PURE__ */ new WeakSet();
  Pi(n, "input", async (a) => {
    var i = a ? n.defaultValue : n.value;
    if (i = $a(n) ? ei(i) : i, t(i), ye !== null && r.add(ye), await mu(), i !== (i = e())) {
      var l = n.selectionStart, o = n.selectionEnd, u = n.value.length;
      if (n.value = i ?? "", o !== null) {
        var v = n.value.length;
        l === o && o === u && v > u ? (n.selectionStart = v, n.selectionEnd = v) : (n.selectionStart = l, n.selectionEnd = Math.min(o, v));
      }
    }
  }), // If we are hydrating and the value has since changed,
  // then use the updated value from the input instead.
  // If defaultValue is set, then value == defaultValue
  // TODO Svelte 6: remove input.value check and set to empty string?
  ms(e) == null && n.value && (t($a(n) ? ei(n.value) : n.value), ye !== null && r.add(ye)), Ka(() => {
    var a = e();
    if (n === document.activeElement) {
      var i = (
        /** @type {Batch} */
        ye
      );
      if (r.has(i))
        return;
    }
    $a(n) && a === ei(n.value) || n.type === "date" && !a && !n.value || a !== n.value && (n.value = a ?? "");
  });
}
function Yu(n, e, t = e) {
  Pi(n, "change", (r) => {
    var a = r ? n.defaultChecked : n.checked;
    t(a);
  }), // If we are hydrating and the value has since changed,
  // then use the update value from the input instead.
  // If defaultChecked is set, then checked == defaultChecked
  ms(e) == null && t(n.checked), Ka(() => {
    var r = e();
    n.checked = !!r;
  });
}
function $a(n) {
  var e = n.type;
  return e === "number" || e === "range";
}
function ei(n) {
  return n === "" ? null : +n;
}
var Kn, Rs, wr, qa, To;
const Fa = class Fa {
  /** @param {ResizeObserverOptions} options */
  constructor(e) {
    K(this, qa);
    /** */
    K(this, Kn, /* @__PURE__ */ new WeakMap());
    /** @type {ResizeObserver | undefined} */
    K(this, Rs);
    /** @type {ResizeObserverOptions} */
    K(this, wr);
    ne(this, wr, e);
  }
  /**
   * @param {Element} element
   * @param {(entry: ResizeObserverEntry) => any} listener
   */
  observe(e, t) {
    var r = c(this, Kn).get(e) || /* @__PURE__ */ new Set();
    return r.add(t), c(this, Kn).set(e, r), ve(this, qa, To).call(this).observe(e, c(this, wr)), () => {
      var a = c(this, Kn).get(e);
      a.delete(t), a.size === 0 && (c(this, Kn).delete(e), c(this, Rs).unobserve(e));
    };
  }
};
Kn = new WeakMap(), Rs = new WeakMap(), wr = new WeakMap(), qa = new WeakSet(), To = function() {
  return c(this, Rs) ?? ne(this, Rs, new ResizeObserver(
    /** @param {any} entries */
    (e) => {
      for (var t of e) {
        Fa.entries.set(t.target, t);
        for (var r of c(this, Kn).get(t.target) || [])
          r(t);
      }
    }
  ));
}, /** @static */
ct(Fa, "entries", /* @__PURE__ */ new WeakMap());
let _i = Fa;
var Wu = /* @__PURE__ */ new _i({
  box: "border-box"
});
function Xu(n, e, t) {
  var r = Wu.observe(n, () => t(n[e]));
  ji(() => (ms(() => t(n[e])), r));
}
function ti(n, e) {
  return n === e || (n == null ? void 0 : n[us]) === e;
}
function Jn(n = Ci(), e, t, r) {
  var a = (
    /** @type {ComponentContext} */
    Et.r
  ), i = (
    /** @type {Effect} */
    Fe
  );
  return ji(() => {
    var l, o;
    return Ka(() => {
      l = o, o = (r == null ? void 0 : r()) || [], ms(() => {
        ti(t(...o), n) || (e(n, ...o), l && ti(t(...l), n) && e(null, ...l));
      });
    }), () => {
      let u = i;
      for (; u !== a && u.parent !== null && u.parent.f & Ma; )
        u = u.parent;
      const v = () => {
        o && ti(t(...o), n) && e(null, ...o);
      }, g = u.teardown;
      u.teardown = () => {
        v(), g == null || g();
      };
    };
  }), n;
}
function Qe(n, e, t, r) {
  var q;
  var a = !0, i = (t & wc) !== 0, l = (t & xc) !== 0, o = (
    /** @type {V} */
    r
  ), u = !0, v = (
    /** @type {Derived<V> | undefined} */
    void 0
  ), g = () => l && a ? (v ?? (v = /* @__PURE__ */ vr(
    /** @type {() => V} */
    r
  )), s(v)) : (u && (u = !1, o = l ? ms(
    /** @type {() => V} */
    r
  ) : (
    /** @type {V} */
    r
  )), o);
  let E;
  if (i) {
    var f = us in n || fc in n;
    E = ((q = Ss(n, e)) == null ? void 0 : q.set) ?? (f && e in n ? (O) => n[e] = O : void 0);
  }
  var p, x = !1;
  i ? [p, x] = Vc(() => (
    /** @type {V} */
    n[e]
  )) : p = /** @type {V} */
  n[e], p === void 0 && r !== void 0 && (p = g(), E && (Ic(), E(p)));
  var M;
  if (M = () => {
    var O = (
      /** @type {V} */
      n[e]
    );
    return O === void 0 ? g() : (u = !0, O);
  }, (t & kc) === 0)
    return M;
  if (E) {
    var y = n.$$legacy;
    return (
      /** @type {() => V} */
      (function(O, C) {
        return arguments.length > 0 ? ((!C || y || x) && E(C ? M() : O), O) : M();
      })
    );
  }
  var L = !1, j = ((t & yc) !== 0 ? vr : Xl)(() => (L = !1, M()));
  i && s(j);
  var A = (
    /** @type {Effect} */
    Fe
  );
  return (
    /** @type {() => V} */
    (function(O, C) {
      if (arguments.length > 0) {
        const S = C ? s(j) : i ? et(O) : O;
        return m(j, S), L = !0, o !== void 0 && (o = S), O;
      }
      return Ln && L || (A.f & jt) !== 0 ? j.v : s(j);
    })
  );
}
function Xs(n) {
  Et === null && Pc(), kt(() => {
    const e = ms(n);
    if (typeof e == "function") return (
      /** @type {() => void} */
      e
    );
  });
}
const Zu = "5";
var Ll;
typeof window < "u" && ((Ll = window.__svelte ?? (window.__svelte = {})).v ?? (Ll.v = /* @__PURE__ */ new Set())).add(Zu);
var Qu = /* @__PURE__ */ Su('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="svelte-13so817"><path></path></svg>');
function V(n, e) {
  let t = Qe(e, "name", 3, "square"), r = Qe(e, "size", 3, 16), a = Qe(e, "fa", 3, "");
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
  }, o = /* @__PURE__ */ le(() => i[a() ? l[a()] || "blocks" : t()] || i.blocks);
  var u = Qu(), v = Y(u);
  D(() => {
    be(u, "width", r()), be(u, "height", r()), be(v, "d", s(o));
  }), b(n, u);
}
const Ao = ["anchor", "background", "spacing", "width", "align", "class", "reveal", "hidden", "hide_on"], $u = ["mobile", "tablet", "desktop"];
function Ts(n) {
  let e = n == null ? void 0 : n.hide_on;
  if (typeof e == "string" ? e = e.split(",") : e && typeof e == "object" && !Array.isArray(e) && (e = Object.keys(e).filter((r) => e[r])), !Array.isArray(e)) return [];
  const t = new Set(e.map((r) => String(r).trim().toLowerCase()));
  return $u.filter((r) => t.has(r));
}
const gr = (n) => n === void 0 ? void 0 : JSON.parse(JSON.stringify(n));
function Co(n, e = Ao) {
  if (!n || typeof n != "object" || typeof n.type != "string") return null;
  const { type: t } = n, r = { type: t }, a = {};
  for (const [l, o] of Object.entries(n))
    l === "type" || l === t || (e.includes(l) ? r[l] = o : a[l] = o);
  const i = n[t];
  return r[t] = i && typeof i == "object" && !Array.isArray(i) ? i : a, r;
}
function En(n, e) {
  return Array.isArray(n) ? n.map((t) => Co(t, e)).filter(Boolean) : [];
}
function Ui(n) {
  if (n.default !== void 0)
    return n.validate === "bool" || n.type === "toggle" ? n.default === !0 || n.default === 1 || n.default === "1" : gr(n.default);
  if (n.type === "list") return [];
  if (n.type === "toggle") return !1;
}
function Oo(n, e = "item") {
  const t = {}, r = (n == null ? void 0 : n.fields) || [];
  for (const i of r) {
    const l = Ui(i);
    l !== void 0 && l !== "" && !(Array.isArray(l) && !l.length) && (t[i.name] = l);
  }
  n != null && n.new_item && typeof n.new_item == "object" && !Array.isArray(n.new_item) && Object.assign(t, gr(n.new_item));
  let a = !0;
  for (const i of r) {
    if (t[i.name] !== void 0) {
      ["text", "textarea", "markdown"].includes(i.type) && (a = !1);
      continue;
    }
    if (/(^|_)url$/.test(i.name)) {
      t[i.name] = "#";
      continue;
    }
    ["text", "textarea", "markdown"].includes(i.type) && (t[i.name] = a ? `New ${e}` : String(i.label || i.name).replace(/\s*\(.*\)\s*$/, ""), a = !1);
  }
  return t;
}
function kl(n, e = !0) {
  const t = {}, r = e && n.example && typeof n.example == "object" ? Co(n.example) : null;
  r && Object.assign(t, gr(r[n.type]));
  for (const i of n.fields || [])
    if (t[i.name] === void 0) {
      const l = Ui(i);
      l !== void 0 && l !== "" && !(Array.isArray(l) && !l.length) && (t[i.name] = l);
    }
  const a = { type: n.type };
  if (r)
    for (const [i, l] of Object.entries(r)) i !== "type" && i !== n.type && (a[i] = gr(l));
  return a[n.type] = t, a;
}
function Hi(n) {
  const e = n && n[n.type] || {}, t = e.heading || e.title || e.name || e.eyebrow || e.text || e.question || e.url || "";
  if (t) return String(t).replace(/[*_`#>]/g, "").slice(0, 70);
  const r = Array.isArray(e.items) && e.items[0];
  return r ? String(r.title || r.name || r.question || "").slice(0, 70) : "";
}
function ed(n, e, t) {
  if (n && typeof n == "object")
    for (const r of e || []) {
      const a = n[r.name];
      if (typeof a == "string" && a.trim() && ["text", "textarea", "markdown"].includes(r.type))
        return a.replace(/[*_`#>]/g, "").slice(0, 60);
    }
  return `Item ${t + 1}`;
}
function wl(n) {
  return gr(n);
}
function td() {
  const n = decodeURIComponent(window.location.pathname);
  let e = n.match(/\/pages\/edit\/(.+?)\/?$/);
  return e ? { kind: "page", route: "/" + e[1] } : (e = n.match(/\/flex-objects\/([^/]+)\/([^/]+)\/?$/), e ? { kind: "flex", type: e[1], key: e[2] === "new" ? null : e[2] } : { kind: "unknown" });
}
const xl = {
  hero: "Hero",
  content: "Content",
  media: "Media",
  "social-proof": "Social proof",
  commerce: "Commerce",
  dynamic: "Dynamic",
  forms: "Forms",
  layout: "Layout"
};
function nd() {
  const n = (window.__GRAV_API_SERVER_URL || "").replace(/\/$/, ""), e = window.__GRAV_API_PREFIX || "/api/v1";
  return n + e;
}
function sd(n = {}) {
  const e = { Accept: "application/json", ...n };
  return window.__GRAV_API_TOKEN && (e["X-API-Token"] = window.__GRAV_API_TOKEN), window.__GRAV_ENVIRONMENT && (e["X-Grav-Environment"] = window.__GRAV_ENVIRONMENT), e;
}
async function ut(n, e, t, r = {}) {
  var o;
  const a = { method: n, headers: sd(), credentials: "same-origin", ...r };
  t instanceof FormData ? a.body = t : t !== void 0 && (a.headers["Content-Type"] = "application/json", a.body = JSON.stringify(t));
  const i = await fetch(nd() + e, a);
  if (i.status === 204) return null;
  const l = await i.json().catch(() => ({}));
  if (!i.ok) {
    const u = ((o = l == null ? void 0 : l.error) == null ? void 0 : o.message) || (l == null ? void 0 : l.message) || (l == null ? void 0 : l.detail) || `Request failed (${i.status})`, v = new Error(u);
    throw v.status = i.status, v;
  }
  return l && typeof l == "object" && "data" in l ? l.data : l;
}
function rd(n) {
  return String(n || "").replace(/^\/+/, "").split("/").map(encodeURIComponent).join("/");
}
function Mn(n) {
  return n.kind === "flex" ? { context: "flex", type: n.type, key: n.key } : n.kind === "section" ? { context: "section", id: n.id } : { context: "page", route: n.route };
}
function Sl(n) {
  return n.kind === "flex" ? `/flex-objects/${encodeURIComponent(n.type)}/${encodeURIComponent(n.key)}/media` : `/pages/${rd(n.route)}/media`;
}
const Xe = {
  blocks: () => ut("GET", "/maw-builder/blocks"),
  patterns: () => ut("GET", "/maw-builder/patterns"),
  savePattern: (n) => ut("POST", "/maw-builder/patterns", n),
  deletePattern: (n) => ut("DELETE", "/maw-builder/patterns/" + encodeURIComponent(n)),
  /** ctx: {kind:'page', route} | {kind:'flex', type, key} | {kind:'section', id} */
  preview: (n, e, t) => ut("POST", "/maw-builder/preview", { ...Mn(n), blocks: e, field: t }),
  /** Media stored with the page or Flex object being edited (global sections have none: they use the site library). */
  ownMedia: (n) => n.kind === "section" ? Promise.resolve([]) : ut("GET", Sl(n)),
  /** What's saved on the server: {modified, matches (when blocks are given), saved_by}. */
  state: (n, e, t) => ut("POST", "/maw-builder/state", { ...Mn(n), field: e, ...t ? { blocks: t } : {} }),
  /** Presence heartbeat: {you, editors: [other sessions], modified, saved_by}. */
  presence: (n, e, t) => ut("POST", "/maw-builder/presence", { ...Mn(n), session: e, editing: t }),
  /** Sent while the page may be unloading: keepalive lets it finish. */
  releasePresence: (n, e) => ut("DELETE", "/maw-builder/presence?" + new URLSearchParams({ ...Mn(n), session: e }), void 0, { keepalive: !0 }),
  /** Copy media files referenced by pasted blocks: {copied, skipped, missing, refused}. */
  copyMedia: (n, e, t) => ut("POST", "/maw-builder/media/copy", { from: n, to: Mn(e), files: t }),
  revisions: (n) => ut("GET", "/maw-builder/revisions?" + new URLSearchParams(Mn(n))),
  revision: (n, e) => ut("GET", `/maw-builder/revisions/${encodeURIComponent(e)}?` + new URLSearchParams(Mn(n))),
  sections: () => ut("GET", "/maw-builder/sections"),
  section: (n) => ut("GET", `/maw-builder/sections/${encodeURIComponent(n)}`),
  createSection: (n, e) => ut("POST", "/maw-builder/sections", { title: n, blocks: e }),
  updateSection: (n, e, t = !1) => ut("PATCH", `/maw-builder/sections/${encodeURIComponent(n)}${t ? "?force=1" : ""}`, e),
  deleteSection: (n, e = !1) => ut("DELETE", `/maw-builder/sections/${encodeURIComponent(n)}${e ? "?force=1" : ""}`),
  uploadOwnMedia: (n, e) => {
    const t = new FormData();
    return [...e].forEach((r) => t.append("files[]", r)), ut("POST", Sl(n), t);
  },
  siteMedia: (n = "", e = "") => {
    const t = new URLSearchParams({ per_page: "200" });
    return n && t.set("path", n), e && t.set("search", e), ut("GET", `/media?${t}`);
  },
  uploadSiteMedia: (n, e = "") => {
    const t = new FormData();
    return [...n].forEach((r) => t.append("files[]", r)), ut("POST", `/media${e ? "?path=" + encodeURIComponent(e) : ""}`, t);
  }
}, ad = 15e3, id = () => crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).slice(2, 12);
var xr, Sr, Er, Mr, is, On, js, Is, Tr, qs, xa;
class ld {
  constructor(e) {
    K(this, qs);
    K(this, xr, /* @__PURE__ */ I(et(
      []
      // other live sessions [{session, user, fullname, since, editing}]
    )));
    K(this, Sr, /* @__PURE__ */ I(null));
    K(this, Er, /* @__PURE__ */ I(null));
    ct(this, "me", "");
    K(this, Mr, id());
    K(this, is, 0);
    K(this, On, null);
    K(this, js, /* @__PURE__ */ new Set());
    K(this, Is, !1);
    K(this, Tr, () => ve(this, qs, xa).call(this));
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
    return this.store.open && !this.store.readOnly && !c(this, Is);
  }
  start() {
    c(this, is) || (this.beat(), ne(this, is, setInterval(() => this.beat(), ad)), window.addEventListener("pagehide", c(this, Tr)));
  }
  stop() {
    clearInterval(c(this, is)), ne(this, is, 0), window.removeEventListener("pagehide", c(this, Tr)), ve(this, qs, xa).call(this);
  }
  async beat() {
    const e = this.store;
    if (!e.canPreview) return;
    const t = e.ownerKey, r = Bn(e.context);
    c(this, On) && c(this, On).key !== t && (ve(this, qs, xa).call(this), c(this, js).clear(), this.others = [], this.stale = null), ne(this, On, { key: t, ctx: r });
    let a;
    try {
      a = await Xe.presence(r, c(this, Mr), this.editing);
    } catch {
      return;
    }
    if (t !== e.ownerKey) return;
    this.me = a.you || "";
    const i = a.editors || [];
    if (this.editing) {
      const l = i.find((o) => o.editing && !c(this, js).has(o.session));
      l && (this.joined = l);
    }
    ne(this, js, new Set(i.filter((l) => l.editing).map((l) => l.session))), this.others = i, e.open && !e.saving && a.modified && e.baseModified && a.modified > e.baseModified && !(this.stale && this.stale.modified === a.modified) && (this.stale = {
      by: a.saved_by && a.saved_by !== this.me ? a.saved_by : "",
      modified: a.modified
    });
  }
  /** Builder opened: start read-only when someone else is already editing. */
  async claim() {
    ne(this, Is, !0), this.joined = null, await this.beat(), ne(this, Is, !1), this.store.readOnly = this.editors.length > 0, this.store.readOnly || await this.beat();
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
xr = new WeakMap(), Sr = new WeakMap(), Er = new WeakMap(), Mr = new WeakMap(), is = new WeakMap(), On = new WeakMap(), js = new WeakMap(), Is = new WeakMap(), Tr = new WeakMap(), qs = new WeakSet(), xa = function() {
  c(this, On) && Xe.releasePresence(c(this, On).ctx, c(this, Mr)).catch(() => {
  }), ne(this, On, null);
};
function As(n) {
  const e = String((n == null ? void 0 : n.fullname) || (n == null ? void 0 : n.user) || "?"), t = e.split(/\s+/).filter(Boolean).slice(0, 2).map((a) => a[0].toUpperCase()).join("") || "?";
  let r = 0;
  for (const a of String((n == null ? void 0 : n.user) || e)) r = r * 31 + a.charCodeAt(0) | 0;
  return { initials: t, color: `hsl(${Math.abs(r) % 360} 60% 42%)`, name: e };
}
var od = /* @__PURE__ */ k('<span class="err svelte-1uadtto"> </span>'), cd = /* @__PURE__ */ k('<span class="avatar svelte-1uadtto"> </span>'), ud = /* @__PURE__ */ k('<p><!> <span class="svelte-1uadtto"><!></span></p>'), dd = /* @__PURE__ */ k('<p class="warn svelte-1uadtto"> </p>'), vd = /* @__PURE__ */ k('<span class="badge svelte-1uadtto">Hidden</span>'), fd = /* @__PURE__ */ k('<span class="badge svelte-1uadtto"> </span>'), hd = /* @__PURE__ */ k('<li draggable="true"><span class="grip svelte-1uadtto"><!></span> <span class="ico svelte-1uadtto"><!></span> <button type="button" class="row svelte-1uadtto"><strong class="svelte-1uadtto"> </strong> <span class="text svelte-1uadtto"> </span></button> <!></li>'), pd = /* @__PURE__ */ k('<ol class="svelte-1uadtto"></ol>'), gd = /* @__PURE__ */ k('<button type="button" class="empty svelte-1uadtto"><!> <span>Start building. Add your first section in the visual builder.</span></button>'), bd = /* @__PURE__ */ k('<div class="summary svelte-1uadtto"><header class="svelte-1uadtto"><div><div class="title svelte-1uadtto"> </div> <div class="sub svelte-1uadtto"><!></div></div> <button type="button" class="mb-btn primary"><!> Open Visual Builder</button></header> <!> <!> <!></div>');
function md(n, e) {
  dt(e, !0);
  let t = /* @__PURE__ */ I(-1), r = /* @__PURE__ */ I(-1);
  const a = /* @__PURE__ */ le(() => {
    var _;
    return ((_ = e.field) == null ? void 0 : _.label) || "Blocks";
  });
  function i(_) {
    s(t) >= 0 && _ !== s(t) && e.store.move(s(t), _), m(t, -1), m(r, -1);
  }
  var l = bd(), o = h(l), u = h(o), v = h(u), g = Y(v, !0), E = d(v, 2), f = h(E);
  {
    var p = (_) => {
      var T = od(), z = Y(T, !0);
      D(() => R(z, e.store.loadError)), b(_, T);
    }, x = (_) => {
      var T = Zt();
      D(() => R(T, `${e.store.blocks.length ?? ""} ${e.store.blocks.length === 1 ? "section" : "sections"} · drag to reorder, click to edit`)), b(_, T);
    };
    H(f, (_) => {
      e.store.loadError ? _(p) : _(x, -1);
    });
  }
  var M = d(u, 2), y = h(M);
  V(y, { name: "maximize", size: 15 });
  var L = d(o, 2);
  {
    var j = (_) => {
      const T = /* @__PURE__ */ le(() => e.store.presence.editors);
      var z = ud();
      let W;
      var re = h(z);
      Ie(re, 17, () => e.store.presence.others.slice(0, 5), (ee) => ee.session, (ee, te) => {
        const se = /* @__PURE__ */ le(() => As(s(te)));
        var ie = cd();
        let X;
        var U = Y(ie, !0);
        D(() => {
          be(ie, "title", s(se).name), X = Ct(ie, "", X, { background: s(se).color }), R(U, s(se).initials);
        }), b(ee, ie);
      });
      var ke = d(re, 2), he = h(ke);
      {
        var N = (ee) => {
          var te = Zt();
          D((se) => R(te, `${se ?? ""} ${s(T).length === 1 ? "is" : "are"} editing in the visual builder. Opening it starts read-only.`), [() => s(T).map((se) => As(se).name).join(", ")]), b(ee, te);
        }, F = (ee) => {
          var te = Zt();
          D((se) => R(te, `${se ?? ""} also ${e.store.presence.others.length === 1 ? "has" : "have"} this open.`), [
            () => e.store.presence.others.map((se) => As(se).name).join(", ")
          ]), b(ee, te);
        };
        H(he, (ee) => {
          s(T).length ? ee(N) : ee(F, -1);
        });
      }
      D(() => W = _e(z, 1, "presence svelte-1uadtto", null, W, { editing: s(T).length })), b(_, z);
    };
    H(L, (_) => {
      var T;
      (T = e.store.presence) != null && T.others.length && _(j);
    });
  }
  var A = d(L, 2);
  {
    var q = (_) => {
      var T = dd(), z = Y(T, !0);
      D(() => R(z, e.store.isFlex ? "Save this item first. The visual builder previews saved items." : "Save the page first. The visual builder needs a page URL to preview.")), b(_, T);
    };
    H(A, (_) => {
      e.store.canPreview || _(q);
    });
  }
  var O = d(A, 2);
  {
    var C = (_) => {
      var T = pd();
      Ie(T, 23, () => e.store.blocks, (z, W) => W + ":" + z.type, (z, W, re) => {
        const ke = /* @__PURE__ */ le(() => e.store.defFor(s(W).type));
        var he = hd();
        let N;
        var F = h(he), ee = h(F);
        V(ee, { name: "grip", size: 14 });
        var te = d(F, 2), se = h(te);
        {
          let ge = /* @__PURE__ */ le(() => {
            var oe;
            return ((oe = s(ke)) == null ? void 0 : oe.icon) || "fa-square";
          });
          V(se, {
            get fa() {
              return s(ge);
            },
            size: 15
          });
        }
        var ie = d(te, 2), X = h(ie), U = Y(X, !0), ae = d(X, 2), fe = Y(ae, !0), Se = d(ie, 2);
        {
          var Pe = (ge) => {
            var oe = vd();
            b(ge, oe);
          }, pe = (ge) => {
            var oe = fd(), $ = Y(oe);
            D((Te) => R($, `Hidden on ${Te ?? ""}`), [() => Ts(s(W)).join(", ")]), b(ge, oe);
          }, we = /* @__PURE__ */ le(() => Ts(s(W)).length);
          H(Se, (ge) => {
            s(W).hidden ? ge(Pe) : s(we) && ge(pe, 1);
          });
        }
        D(
          (ge) => {
            var oe;
            N = _e(he, 1, "svelte-1uadtto", null, N, {
              over: s(r) === s(re),
              "hidden-block": s(W).hidden
            }), R(U, ((oe = s(ke)) == null ? void 0 : oe.title) || s(W).type), R(fe, ge);
          },
          [
            () => {
              var ge;
              return s(W).type === "global" ? e.store.sectionTitle((ge = s(W).global) == null ? void 0 : ge.section) : Hi(s(W));
            }
          ]
        ), st("dragstart", he, () => m(t, s(re), !0)), st("dragover", he, (ge) => {
          ge.preventDefault(), m(r, s(re), !0);
        }), st("dragleave", he, () => m(r, -1)), st("drop", he, () => i(s(re))), st("dragend", he, () => {
          m(t, -1), m(r, -1);
        }), P("click", ie, () => e.openBuilder(s(re))), b(z, he);
      }), b(_, T);
    }, S = (_) => {
      var T = gd(), z = h(T);
      V(z, { name: "plus", size: 18 }), D(() => T.disabled = !e.store.canPreview), P("click", T, () => e.openBuilder(-1)), b(_, T);
    };
    H(O, (_) => {
      e.store.blocks.length ? _(C) : _(S, -1);
    });
  }
  D(() => {
    R(g, s(a)), M.disabled = !e.store.canPreview;
  }), P("click", M, () => e.openBuilder(-1)), b(n, l), vt();
}
bt(["click"]);
var _d = /* @__PURE__ */ k('<button type="button" class="card svelte-1cvfiky" draggable="true"><span class="ico svelte-1cvfiky"><!></span> <span class="name svelte-1cvfiky"> </span></button>'), yd = /* @__PURE__ */ k('<section class="svelte-1cvfiky"><h3 class="svelte-1cvfiky"> </h3> <div class="grid svelte-1cvfiky"></div></section>'), kd = /* @__PURE__ */ k('<p class="hint svelte-1cvfiky"> </p>'), wd = /* @__PURE__ */ k('<div class="search svelte-1cvfiky"><!> <input type="search" placeholder="Search blocks" aria-label="Search blocks" class="svelte-1cvfiky"/></div> <p class="hint svelte-1cvfiky"> </p> <!>', 1);
function xd(n, e) {
  dt(e, !0);
  let t = Qe(e, "store", 7), r = /* @__PURE__ */ I("");
  const a = /* @__PURE__ */ le(() => {
    var j;
    const x = s(r).trim().toLowerCase(), M = (((j = t().catalog) == null ? void 0 : j.blocks) || []).filter((A) => !A.virtual).filter((A) => !x || A.title.toLowerCase().includes(x) || A.type.includes(x) || (A.description || "").toLowerCase().includes(x)), y = Object.keys(xl), L = /* @__PURE__ */ new Map();
    for (const A of M)
      L.has(A.category) || L.set(A.category, []), L.get(A.category).push(A);
    return [...L.entries()].sort((A, q) => {
      const O = y.indexOf(A[0]), C = y.indexOf(q[0]);
      return (O < 0 ? 99 : O) - (C < 0 ? 99 : C);
    });
  });
  function i(x, M) {
    x.dataTransfer.setData("application/x-maw-block", M), x.dataTransfer.setData("text/plain", M), x.dataTransfer.effectAllowed = "copy", requestAnimationFrame(() => t().dragType = M);
  }
  function l() {
    t().dragType = "";
  }
  var o = wd(), u = Me(o), v = h(u);
  V(v, { name: "search", size: 14 });
  var g = d(v, 2), E = d(u, 2), f = Y(E), p = d(E, 2);
  Ie(
    p,
    17,
    () => s(a),
    ([x, M]) => x,
    (x, M) => {
      var y = /* @__PURE__ */ le(() => Ua(s(M), 2));
      let L = () => s(y)[0], j = () => s(y)[1];
      var A = yd(), q = h(A), O = Y(q, !0), C = d(q, 2);
      Ie(C, 21, j, (S) => S.type, (S, _) => {
        var T = _d(), z = h(T), W = h(z);
        V(W, {
          get fa() {
            return s(_).icon;
          },
          size: 18
        });
        var re = d(z, 2), ke = Y(re, !0);
        D(() => {
          be(T, "title", s(_).description), R(ke, s(_).title);
        }), st("dragstart", T, (he) => i(he, s(_).type)), st("dragend", T, l), P("click", T, () => t().insert(s(_).type)), b(S, T);
      }), D(() => R(O, xl[L()] || L())), b(x, A);
    },
    (x) => {
      var M = kd(), y = Y(M);
      D(() => R(y, `No blocks match “${s(r) ?? ""}”.`)), b(x, M);
    }
  ), D(() => R(f, `${t().selected >= 0 ? `Inserts after block ${t().selected + 1}` : "Inserts at the end of the page"} · or drag onto the page`)), xn(g, () => s(r), (x) => m(r, x)), b(n, o), vt();
}
bt(["click"]);
var Sd = /* @__PURE__ */ k('<button type="button"><!> Global</button>'), Ed = /* @__PURE__ */ k('<div class="global svelte-k3gmal"><span class="gico svelte-k3gmal"><!></span> <div class="meta svelte-k3gmal"><strong class="svelte-k3gmal"> </strong> <span class="svelte-k3gmal"> </span></div> <div class="acts svelte-k3gmal"><button type="button" class="mb-btn sm primary" title="Insert on this page"><!> Insert</button> <button type="button" class="mb-btn sm" title="Edit this global section"><!></button></div></div>'), Md = /* @__PURE__ */ k('<p class="empty svelte-k3gmal">No global sections yet. Select a block, open its <strong>Advanced</strong> tab and click <strong>Make global section</strong>.</p>'), Td = /* @__PURE__ */ k('<p class="hint svelte-k3gmal">Global sections are edited once and update on every page that uses them. Inserting one places a live reference, not a copy.</p> <!>', 1), Ad = /* @__PURE__ */ k("<span></span>"), Cd = /* @__PURE__ */ k('<button type="button" class="mb-btn ghost icon sm del svelte-k3gmal" title="Delete pattern"><!></button>'), Od = /* @__PURE__ */ k('<div class="pattern svelte-k3gmal"><button type="button" class="preview svelte-k3gmal" title="Insert pattern"><div class="mini svelte-k3gmal"></div> <div class="pmeta svelte-k3gmal"><strong class="svelte-k3gmal"> </strong> <span class="svelte-k3gmal"> </span></div></button> <!></div>'), Pd = /* @__PURE__ */ k('<p class="empty svelte-k3gmal"> </p>'), zd = /* @__PURE__ */ k('<div class="seg svelte-k3gmal" role="tablist"><button type="button">Sections</button> <button type="button">Layouts</button> <!></div> <!>', 1);
function Dd(n, e) {
  dt(e, !0);
  let t = /* @__PURE__ */ I("section");
  const r = /* @__PURE__ */ le(() => e.store.patterns.filter((A) => A.category === s(t)));
  async function a(A) {
    if (A.category === "page" && e.store.blocks.length) {
      const q = await e.askConfirm({
        title: `Use “${A.title}”`,
        message: `This layout has ${A.blocks.length} sections. Replace the current page content or add it to the end?`,
        choices: [
          { label: "Cancel", value: null },
          { label: "Add to end", value: "append" },
          { label: "Replace page", value: "replace", primary: !0 }
        ]
      });
      if (!q) return;
      e.store.insertMany(A.blocks, q === "append" ? e.store.blocks.length : null, q === "replace");
    } else
      e.store.insertMany(A.blocks);
    e.store.flash(`Inserted “${A.title}”`);
  }
  async function i(A) {
    if (await e.askConfirm({
      title: "Delete pattern",
      message: `Delete “${A.title}”? Pages that already use it are not affected.`,
      choices: [
        { label: "Cancel", value: !1 },
        { label: "Delete", value: !0, primary: !0 }
      ]
    }))
      try {
        await e.store.deletePattern(A.id);
      } catch (O) {
        e.store.flash(O.message);
      }
  }
  async function l(A) {
    try {
      await e.store.openSection(A.id);
    } catch (q) {
      e.store.flash(q.message);
    }
  }
  function o(A) {
    var q;
    return ((q = e.store.defFor(A)) == null ? void 0 : q.title) || A;
  }
  var u = zd(), v = Me(u), g = h(v);
  let E;
  var f = d(g, 2);
  let p;
  var x = d(f, 2);
  {
    var M = (A) => {
      var q = Sd();
      let O;
      var C = h(q);
      V(C, { name: "globe", size: 12 }), D(() => O = _e(q, 1, "svelte-k3gmal", null, O, { active: s(t) === "global" })), P("click", q, () => {
        m(t, "global"), e.store.refreshSections();
      }), b(A, q);
    };
    H(x, (A) => {
      e.store.isSection || A(M);
    });
  }
  var y = d(v, 2);
  {
    var L = (A) => {
      var q = Td(), O = d(Me(q), 2);
      Ie(
        O,
        17,
        () => e.store.sections,
        (C) => C.id,
        (C, S) => {
          var _ = Ed(), T = h(_), z = h(T);
          V(z, { name: "globe", size: 16 });
          var W = d(T, 2), re = h(W), ke = Y(re, !0), he = d(re, 2), N = Y(he), F = d(W, 2), ee = h(F), te = h(ee);
          V(te, { name: "plus", size: 12 });
          var se = d(ee, 2), ie = h(se);
          V(ie, { name: "edit", size: 12 }), D(() => {
            R(ke, s(S).title), R(N, `${s(S).count ?? ""} ${s(S).count === 1 ? "block" : "blocks"}${s(S).updated_by ? ` · edited by ${s(S).updated_by}` : ""}`);
          }), P("click", ee, () => e.store.insertGlobal(s(S).id)), P("click", se, () => l(s(S))), b(C, _);
        },
        (C) => {
          var S = Md();
          b(C, S);
        }
      ), b(A, q);
    }, j = (A) => {
      var q = Rt(), O = Me(q);
      Ie(
        O,
        17,
        () => s(r),
        (C) => C.id,
        (C, S) => {
          var _ = Od(), T = h(_), z = h(T);
          Ie(z, 21, () => s(S).blocks.slice(0, 6), ht, (te, se) => {
            var ie = Ad();
            let X;
            D(() => X = _e(ie, 1, `bar ${s(se).type ?? ""}`, "svelte-k3gmal", X, {
              accent: s(se).background === "accent" || s(se).type === "cta",
              alt: s(se).background === "alt" || s(se).background === "soft",
              dark: s(se).background === "dark"
            })), b(te, ie);
          });
          var W = d(z, 2), re = h(W), ke = Y(re, !0), he = d(re, 2), N = Y(he, !0), F = d(T, 2);
          {
            var ee = (te) => {
              var se = Cd(), ie = h(se);
              V(ie, { name: "trash", size: 13 }), P("click", se, () => i(s(S))), b(te, se);
            };
            H(F, (te) => {
              s(S).source === "user" && te(ee);
            });
          }
          D(
            (te) => {
              R(ke, s(S).title), R(N, te);
            },
            [
              () => s(S).description || s(S).blocks.map((te) => o(te.type)).join(" · ")
            ]
          ), P("click", T, () => a(s(S))), b(C, _);
        },
        (C) => {
          var S = Pd(), _ = Y(S);
          D(() => R(_, `No ${s(t) === "page" ? "page layouts" : "sections"} yet. Select blocks and click “Save as pattern” to create one.`)), b(C, S);
        }
      ), b(A, q);
    };
    H(y, (A) => {
      s(t) === "global" ? A(L) : A(j, -1);
    });
  }
  D(() => {
    E = _e(g, 1, "svelte-k3gmal", null, E, { active: s(t) === "section" }), p = _e(f, 1, "svelte-k3gmal", null, p, { active: s(t) === "page" });
  }), P("click", g, () => m(t, "section")), P("click", f, () => m(t, "page")), b(n, u), vt();
}
bt(["click"]);
var Nd = /* @__PURE__ */ k('<p class="empty svelte-1jf4jiu">This page has no blocks yet. Add one from the Blocks tab.</p>'), Ld = /* @__PURE__ */ k('<span class="count svelte-1jf4jiu"> </span>'), Rd = /* @__PURE__ */ k('<div class="tools svelte-1jf4jiu"><button type="button" class="mb-btn sm ghost" title="Select all (Ctrl+A)"><!> Select all</button> <!> <span class="spacer svelte-1jf4jiu"></span> <button type="button" class="mb-btn sm ghost" title="Copy (Ctrl+C)"><!> Copy</button> <button type="button" class="mb-btn sm ghost" title="Paste after the selection (Ctrl+V)"><!> Paste</button></div>'), jd = /* @__PURE__ */ k('<span class="dev-off svelte-1jf4jiu"></span>'), Id = /* @__PURE__ */ k('<li><span class="grip svelte-1jf4jiu"><!></span> <button type="button" class="row svelte-1jf4jiu" title="Click to select · Shift+click for a range · Ctrl/Cmd+click to add"><!> <span class="t svelte-1jf4jiu"> </span> <span class="s svelte-1jf4jiu"> </span> <!></button> <span class="actions svelte-1jf4jiu"><button type="button" class="mb-btn ghost icon sm"><!></button> <button type="button" class="mb-btn ghost icon sm" title="Duplicate"><!></button> <button type="button" class="mb-btn ghost icon sm danger" title="Delete"><!></button></span></li>'), qd = /* @__PURE__ */ k('<!> <ol class="svelte-1jf4jiu"></ol>', 1);
function Fd(n, e) {
  dt(e, !0);
  const t = { mobile: "phone", tablet: "tablet", desktop: "monitor" };
  let r = /* @__PURE__ */ I(-1), a = /* @__PURE__ */ I(-1);
  function i(f, p) {
    f.shiftKey ? e.store.rangeSelect(p) : f.ctrlKey || f.metaKey ? e.store.toggleSelect(p) : e.store.select(p);
  }
  function l(f) {
    s(r) >= 0 && e.store.move(s(r), (s(r) < f, f)), m(r, m(a, -1), !0);
  }
  var o = qd(), u = Me(o);
  {
    var v = (f) => {
      var p = Nd();
      b(f, p);
    }, g = (f) => {
      var p = Rd(), x = h(p), M = h(x);
      V(M, { name: "select", size: 12 });
      var y = d(x, 2);
      {
        var L = (C) => {
          var S = Ld(), _ = Y(S);
          D(() => R(_, `${e.store.selection.length ?? ""} selected`)), b(C, S);
        };
        H(y, (C) => {
          e.store.selection.length > 1 && C(L);
        });
      }
      var j = d(y, 4), A = h(j);
      V(A, { name: "copy", size: 12 });
      var q = d(j, 2), O = h(q);
      V(O, { name: "clipboard", size: 12 }), D(() => {
        j.disabled = e.store.selected < 0, q.disabled = !e.store.clipboardAvailable || e.store.readOnly;
      }), P("click", x, () => e.store.selectAll()), P("click", j, () => e.store.copyBlocks()), P("click", q, () => e.store.pasteBlocks()), b(f, p);
    };
    H(u, (f) => {
      e.store.blocks.length ? f(g, -1) : f(v);
    });
  }
  var E = d(u, 2);
  Ie(E, 23, () => e.store.blocks, (f, p) => p + f.type, (f, p, x) => {
    const M = /* @__PURE__ */ le(() => e.store.defFor(s(p).type));
    var y = Id();
    let L;
    var j = h(y), A = h(j);
    V(A, { name: "grip", size: 13 });
    var q = d(j, 2), O = h(q);
    {
      let ie = /* @__PURE__ */ le(() => {
        var X;
        return (X = s(M)) == null ? void 0 : X.icon;
      });
      V(O, {
        get fa() {
          return s(ie);
        },
        size: 14
      });
    }
    var C = d(O, 2), S = Y(C, !0), _ = d(C, 2), T = Y(_, !0), z = d(_, 2);
    {
      var W = (ie) => {
        var X = jd();
        Ie(X, 21, () => Ts(s(p)), ht, (U, ae) => {
          V(U, {
            get name() {
              return t[s(ae)];
            },
            size: 11
          });
        }), D((U) => be(X, "title", `Hidden on ${U ?? ""}`), [() => Ts(s(p)).join(", ")]), b(ie, X);
      }, re = /* @__PURE__ */ le(() => !s(p).hidden && Ts(s(p)).length);
      H(z, (ie) => {
        s(re) && ie(W);
      });
    }
    var ke = d(q, 2), he = h(ke), N = h(he);
    {
      let ie = /* @__PURE__ */ le(() => s(p).hidden ? "eye-off" : "eye");
      V(N, {
        get name() {
          return s(ie);
        },
        size: 13
      });
    }
    var F = d(he, 2), ee = h(F);
    V(ee, { name: "copy", size: 13 });
    var te = d(F, 2), se = h(te);
    V(se, { name: "trash", size: 13 }), D(
      (ie, X) => {
        var U;
        be(y, "draggable", !e.store.readOnly), L = _e(y, 1, "svelte-1jf4jiu", null, L, {
          selected: ie,
          over: s(a) === s(x),
          dim: s(p).hidden
        }), R(S, ((U = s(M)) == null ? void 0 : U.title) || s(p).type), R(T, X), be(he, "title", s(p).hidden ? "Show" : "Hide");
      },
      [
        () => e.store.selection.includes(s(x)),
        () => {
          var ie;
          return s(p).type === "global" ? e.store.sectionTitle((ie = s(p).global) == null ? void 0 : ie.section) : Hi(s(p));
        }
      ]
    ), st("dragstart", y, () => m(r, s(x), !0)), st("dragover", y, (ie) => {
      ie.preventDefault(), m(a, s(x), !0);
    }), st("dragleave", y, () => m(a, -1)), st("drop", y, () => l(s(x))), st("dragend", y, () => m(r, m(a, -1), !0)), P("click", q, (ie) => i(ie, s(x))), P("click", he, () => e.store.toggleHidden(s(x))), P("click", F, () => e.store.duplicate(s(x))), P("click", te, () => e.store.remove(s(x))), b(f, y);
  }), b(n, o), vt();
}
bt(["click"]);
var Bd = /* @__PURE__ */ k('<button type="button" role="option"><span class="ico svelte-18xya39"><!></span> <span class="txt svelte-18xya39"><strong class="svelte-18xya39"> </strong><span class="svelte-18xya39"> </span></span></button>'), Ud = /* @__PURE__ */ k('<p class="none svelte-18xya39">No blocks match.</p>'), Hd = /* @__PURE__ */ k('<div class="qi svelte-18xya39" role="dialog" aria-label="Add block"><div class="search svelte-18xya39"><!> <input placeholder="Search blocks…" aria-label="Search blocks" class="svelte-18xya39"/></div> <div class="list mb-scroll svelte-18xya39" role="listbox"></div></div>');
function Kd(n, e) {
  dt(e, !0);
  let t = Qe(e, "top", 3, 0), r = /* @__PURE__ */ I(""), a = /* @__PURE__ */ I(0), i = /* @__PURE__ */ I(void 0), l = /* @__PURE__ */ I(void 0);
  const o = /* @__PURE__ */ le(() => {
    var L;
    const y = s(r).trim().toLowerCase();
    return (((L = e.store.catalog) == null ? void 0 : L.blocks) || []).filter((j) => !y || j.title.toLowerCase().includes(y) || j.type.includes(y) || (j.description || "").toLowerCase().includes(y));
  });
  kt(() => {
    s(r), m(a, 0);
  });
  function u(y) {
    e.store.insert(y.type, e.index), e.onclose();
  }
  function v(y) {
    y.key === "ArrowDown" ? (y.preventDefault(), m(a, Math.min(s(a) + 1, s(o).length - 1), !0)) : y.key === "ArrowUp" ? (y.preventDefault(), m(a, Math.max(s(a) - 1, 0), !0)) : y.key === "Enter" && s(o)[s(a)] ? (y.preventDefault(), u(s(o)[s(a)])) : y.key === "Escape" && (y.preventDefault(), y.stopPropagation(), e.onclose());
  }
  Xs(() => {
    var L;
    (L = s(i)) == null || L.focus();
    const y = (j) => {
      j.composedPath().includes(s(l)) || e.onclose();
    };
    return setTimeout(() => document.addEventListener("pointerdown", y, !0)), () => document.removeEventListener("pointerdown", y, !0);
  });
  var g = Hd();
  let E;
  var f = h(g), p = h(f);
  V(p, { name: "search", size: 14 });
  var x = d(p, 2);
  Jn(x, (y) => m(i, y), () => s(i));
  var M = d(f, 2);
  Ie(
    M,
    23,
    () => s(o),
    (y) => y.type,
    (y, L, j) => {
      var A = Bd();
      let q;
      var O = h(A), C = h(O);
      V(C, {
        get fa() {
          return s(L).icon;
        },
        size: 16
      });
      var S = d(O, 2), _ = h(S), T = Y(_, !0), z = d(_), W = Y(z, !0);
      D(() => {
        be(A, "aria-selected", s(j) === s(a)), q = _e(A, 1, "svelte-18xya39", null, q, { active: s(j) === s(a) }), R(T, s(L).title), R(W, s(L).description);
      }), st("mouseenter", A, () => m(a, s(j), !0)), P("click", A, () => u(s(L))), b(y, A);
    },
    (y) => {
      var L = Ud();
      b(y, L);
    }
  ), Jn(g, (y) => m(l, y), () => s(l)), D(() => E = Ct(g, "", E, { top: `${t() ?? ""}px` })), P("keydown", x, v), xn(x, () => s(r), (y) => m(r, y)), b(n, g), vt();
}
bt(["keydown", "click"]);
var Gd = /* @__PURE__ */ k('<iframe title="Page preview" sandbox="allow-same-origin allow-scripts"></iframe>'), Vd = /* @__PURE__ */ k('<div class="hover-box svelte-dfb6jk"><span class="tag svelte-dfb6jk"> </span></div>'), Jd = /* @__PURE__ */ k('<button type="button" title="Move up (Alt+↑)" class="svelte-dfb6jk"><!></button> <button type="button" title="Move down (Alt+↓)" class="svelte-dfb6jk"><!></button> <button type="button" title="Duplicate (Ctrl+D)" class="svelte-dfb6jk"><!></button>', 1), Yd = /* @__PURE__ */ k('<button type="button" title="Delete (Del)" class="danger svelte-dfb6jk"><!></button>'), Wd = /* @__PURE__ */ k('<button type="button" class="add-gap svelte-dfb6jk" title="Add block below"><!><span class="svelte-dfb6jk">Add block</span></button>'), Xd = /* @__PURE__ */ k('<div class="toolbar svelte-dfb6jk"><span class="name svelte-dfb6jk"> </span> <!> <button type="button" title="Copy (Ctrl+C)" class="svelte-dfb6jk"><!></button> <!></div> <!>', 1), Zd = /* @__PURE__ */ k('<div class="quick-line svelte-dfb6jk"></div> <!>', 1), Qd = /* @__PURE__ */ k('<div class="insert-line svelte-dfb6jk"></div>'), $d = /* @__PURE__ */ k('<div class="drop-line svelte-dfb6jk"><span class="svelte-dfb6jk">Drop to insert here</span></div>'), ev = /* @__PURE__ */ k('<div class="drop-catcher svelte-dfb6jk" role="presentation"></div> <!>', 1), tv = /* @__PURE__ */ k('<div class="blank svelte-dfb6jk"><!> <strong class="svelte-dfb6jk">Your page is empty</strong> <span class="svelte-dfb6jk">Pick a block or a page layout from the left panel, or drag one here.</span></div>'), nv = /* @__PURE__ */ k('<div class="error svelte-dfb6jk"> </div>'), sv = /* @__PURE__ */ k('<div class="viewport svelte-dfb6jk"><div><div class="stage svelte-dfb6jk"><!> <div class="overlay svelte-dfb6jk"><!> <!> <!> <!> <!></div> <!> <!></div></div></div> <div role="status" aria-live="polite"><span class="spinner svelte-dfb6jk"></span> <span class="svelte-dfb6jk"> </span></div>', 1);
function rv(n, e) {
  dt(e, !0);
  let t = Qe(e, "store", 7), r = Qe(e, "width", 3, null), a = et([
    { src: "about:blank", key: 0 },
    { src: "about:blank", key: 1 }
  ]), i = /* @__PURE__ */ I(
    0
    // index of the visible frame
  ), l = [], o = /* @__PURE__ */ I(!0), u = /* @__PURE__ */ I(""), v = /* @__PURE__ */ I(et([])), g = /* @__PURE__ */ I(-1), E = 0, f = /* @__PURE__ */ I(
    -1
    // insertion index while dragging a block from the inserter
  ), p = /* @__PURE__ */ I(void 0), x = 0, M = 0, y = "", L = /* @__PURE__ */ I(
    null
    // {index, top} while the canvas block picker is open
  ), j = /* @__PURE__ */ I(600), A = !1;
  const q = /* @__PURE__ */ le(() => s(o) || !!t().busy);
  let O = /* @__PURE__ */ I(!1), C = /* @__PURE__ */ I("Updating preview…"), S = 0;
  kt(() => {
    s(q) ? (t().busy ? m(C, t().busy, !0) : s(o) && !t().blocks.length && m(C, "Loading preview…"), clearTimeout(S), s(O) || (S = setTimeout(() => m(O, !0), 250))) : (clearTimeout(S), m(O, !1));
  });
  function _() {
    m(o, !1), t().busy = "", t().pendingInsert = null;
  }
  function T() {
    y = "", z(0);
  }
  function z(J = 450) {
    clearTimeout(x), x = setTimeout(W, J);
  }
  async function W() {
    if (!t().canPreview) return;
    const J = t().snapshot(), Q = JSON.stringify(J);
    if (Q === t().renderedPayload) {
      y = Q, s(o) || _();
      return;
    }
    if (Q === y) {
      s(o) || _();
      return;
    }
    y = Q;
    const de = ++M;
    m(o, !0), m(u, "");
    try {
      const G = await Xe.preview(t().context, J, t().fieldName);
      if (de !== M) return;
      const je = s(i) === 0 ? 1 : 0;
      a[je] = { src: G.url + "&_t=" + de, key: a[je].key };
    } catch (G) {
      de === M && (m(u, G.message, !0), _());
    }
  }
  kt(() => {
    JSON.stringify(t().blocks), t().catalog && z();
  });
  let re = -1;
  kt(() => {
    var G, je;
    const J = t().selected, Q = [...t().multi], de = J !== re;
    if (re = J, s(q)) {
      de && (A = !0);
      return;
    }
    (je = (G = l[s(i)]) == null ? void 0 : G.contentWindow) == null || je.postMessage(
      {
        source: "maw-builder",
        type: "select",
        index: J,
        multi: Q,
        scroll: de
      },
      location.origin
    );
  }), kt(() => {
    var Q, de;
    const J = t().readOnly;
    s(q) || (de = (Q = l[s(i)]) == null ? void 0 : Q.contentWindow) == null || de.postMessage({ source: "maw-builder", type: "readonly", value: J }, location.origin);
  }), Xs(() => {
    const J = (Q) => {
      var je;
      if (Q.origin !== location.origin || ((je = Q.data) == null ? void 0 : je.source) !== "maw-preview") return;
      const de = l.findIndex((Ue) => Ue && Ue.contentWindow === Q.source);
      if (de < 0) return;
      const G = Q.data;
      if (G.type === "ready") {
        if (de !== s(i)) {
          Q.source.postMessage({ source: "maw-builder", type: "scrollTo", y: E }, location.origin), Q.source.postMessage(
            {
              source: "maw-builder",
              type: "select",
              index: t().selected,
              multi: [...t().multi],
              scroll: A,
              behavior: "smooth"
            },
            location.origin
          ), Q.source.postMessage(
            {
              source: "maw-builder",
              type: "readonly",
              value: t().readOnly
            },
            location.origin
          ), A = !1;
          const Ue = t().pendingFocus;
          t().pendingFocus = null, requestAnimationFrame(() => {
            m(i, de, !0), _(), Ue && Q.source.postMessage(
              {
                source: "maw-builder",
                type: "focus-edit",
                index: Ue.index,
                path: Ue.path
              },
              location.origin
            );
          });
        } else
          _();
        m(v, G.rects || [], !0), G.palette && G.palette.none && (t().palette = G.palette);
        return;
      }
      if (de === s(i))
        if (G.type === "rects")
          m(v, G.rects, !0), E = G.scrollY || 0;
        else if (G.type === "hover") m(g, G.index, !0);
        else if (G.type === "select")
          G.range ? t().rangeSelect(G.index) : G.toggle ? t().toggleSelect(G.index) : t().select(G.index);
        else if (G.type === "key") window.dispatchEvent(new KeyboardEvent("keydown", {
          key: G.key,
          code: G.code,
          ctrlKey: G.ctrlKey,
          metaKey: G.metaKey,
          shiftKey: G.shiftKey,
          altKey: G.altKey,
          bubbles: !0,
          cancelable: !0
        }));
        else if (G.type === "paste") document.dispatchEvent(new CustomEvent("maw-paste-text", { detail: String(G.text || "") }));
        else if (G.type === "inline") t().inlineSet(G.index, G.path, String(G.value ?? ""));
        else if (G.type === "inline-md") t().inlineSetMarkdown(G.index, G.path, String(G.value ?? ""));
        else if (G.type === "list-op") t().listOp(G);
        else if (G.type === "image-pick")
          t().select(G.index), t().imagePick = { index: G.index, path: G.path };
        else if (G.type === "md-request") {
          const Ue = t().getPath(G.index, G.path);
          Q.source.postMessage(
            {
              source: "maw-builder",
              type: "md-value",
              req: G.req,
              value: typeof Ue == "string" ? Ue : ""
            },
            location.origin
          );
        } else G.type === "inline-start" ? (t().inlineEditing = !0, (t().selected !== G.index || t().selection.length > 1) && t().select(G.index)) : G.type === "inline-end" && (t().inlineEditing = !1);
    };
    return window.addEventListener("message", J), z(0), () => {
      window.removeEventListener("message", J), clearTimeout(x);
    };
  });
  const ke = /* @__PURE__ */ le(() => s(q) || t().inlineEditing ? null : s(v).find((J) => J.index === t().selected)), he = /* @__PURE__ */ le(() => s(ke) ? Math.min(s(ke).top + s(ke).height, s(j) - 24) : 0), N = /* @__PURE__ */ le(() => s(g) !== t().selected ? s(v).find((J) => J.index === s(g)) : null);
  function F(J) {
    const Q = s(p).getBoundingClientRect(), de = J - Q.top;
    if (!s(v).length) return t().blocks.length;
    let G = t().blocks.length, je = 1 / 0;
    const Ue = [...s(v)].sort((lt, wt) => lt.top - wt.top);
    return Ue.forEach((lt, wt) => {
      var xt;
      const Vt = Math.abs(de - lt.top);
      Vt < je && (je = Vt, G = lt.index);
      const Pt = Math.abs(de - (lt.top + lt.height));
      Pt < je && (je = Pt, G = ((xt = Ue[wt + 1]) == null ? void 0 : xt.index) ?? lt.index + 1);
    }), G;
  }
  function ee(J) {
    const Q = s(v).find((G) => G.index === J);
    if (Q) return Q.top;
    const de = s(v).reduce((G, je) => je.index > ((G == null ? void 0 : G.index) ?? -1) ? je : G, null);
    return de ? de.top + de.height : 0;
  }
  const te = /* @__PURE__ */ le(() => !!t().dragType);
  function se(J) {
    J.preventDefault(), J.dataTransfer.dropEffect = "copy", m(f, F(J.clientY), !0);
  }
  function ie(J) {
    J.preventDefault();
    const Q = t().dragType || J.dataTransfer.getData("application/x-maw-block") || J.dataTransfer.getData("text/plain"), de = s(f) >= 0 ? s(f) : F(J.clientY);
    t().dragType = "", m(f, -1), Q && t().defFor(Q) && t().insert(Q, de);
  }
  kt(() => {
    t().dragType || m(f, -1);
  });
  const X = (J) => {
    var de, G;
    const Q = t().blocks[J];
    return (Q == null ? void 0 : Q.type) === "global" ? "Global · " + t().sectionTitle((de = Q.global) == null ? void 0 : de.section) : ((G = t().defFor(Q == null ? void 0 : Q.type)) == null ? void 0 : G.title) || (Q == null ? void 0 : Q.type) || "";
  };
  var U = { refresh: T }, ae = sv(), fe = Me(ae), Se = h(fe);
  let Pe, pe;
  var we = h(Se), ge = h(we);
  Ie(ge, 19, () => a, (J) => J.key, (J, Q, de) => {
    var G = Gd();
    let je;
    Jn(G, (Ue, lt) => l[lt] = Ue, (Ue) => l == null ? void 0 : l[Ue], () => [s(de)]), D(() => {
      be(G, "src", s(Q).src), je = _e(G, 1, "svelte-dfb6jk", null, je, { hidden: s(de) !== s(i) });
    }), b(J, G);
  });
  var oe = d(ge, 2), $ = h(oe);
  {
    var Te = (J) => {
      var Q = Vd();
      let de;
      var G = h(Q), je = Y(G, !0);
      D(
        (Ue) => {
          de = Ct(Q, "", de, {
            top: `${s(N).top ?? ""}px`,
            height: `${s(N).height ?? ""}px`
          }), R(je, Ue);
        },
        [() => X(s(N).index)]
      ), b(J, Q);
    };
    H($, (J) => {
      s(N) && !s(te) && J(Te);
    });
  }
  var Re = d($, 2);
  {
    var Ae = (J) => {
      const Q = /* @__PURE__ */ le(() => t().selection);
      var de = Xd(), G = Me(de);
      let je;
      var Ue = h(G), lt = Y(Ue, !0), wt = d(Ue, 2);
      {
        var Vt = (ot) => {
          var mt = Jd(), zt = Me(mt), nn = h(zt);
          V(nn, { name: "up", size: 14 });
          var Sn = d(zt, 2), Mt = h(Sn);
          V(Mt, { name: "down", size: 14 });
          var St = d(Sn, 2), qn = h(St);
          V(qn, { name: "copy", size: 14 }), D(
            (Zs) => {
              zt.disabled = s(Q)[0] === 0, Sn.disabled = Zs;
            },
            [() => s(Q).at(-1) === t().blocks.length - 1]
          ), P("click", zt, () => t().moveSelection(-1)), P("click", Sn, () => t().moveSelection(1)), P("click", St, () => t().duplicateMany(s(Q))), b(ot, mt);
        };
        H(wt, (ot) => {
          t().readOnly || ot(Vt);
        });
      }
      var Pt = d(wt, 2), xt = h(Pt);
      V(xt, { name: "clipboard", size: 14 });
      var qt = d(Pt, 2);
      {
        var jn = (ot) => {
          var mt = Yd(), zt = h(mt);
          V(zt, { name: "trash", size: 14 }), P("click", mt, () => t().removeMany(s(Q))), b(ot, mt);
        };
        H(qt, (ot) => {
          t().readOnly || ot(jn);
        });
      }
      var vn = d(G, 2);
      {
        var In = (ot) => {
          var mt = Wd();
          let zt;
          var nn = h(mt);
          V(nn, { name: "plus", size: 16 }), D(() => zt = Ct(mt, "", zt, { top: `${s(he) ?? ""}px` })), P("click", mt, () => m(L, { index: t().selected + 1, top: s(he) + 18 }, !0)), b(ot, mt);
        };
        H(vn, (ot) => {
          !s(L) && !t().readOnly && s(Q).length === 1 && ot(In);
        });
      }
      D(
        (ot, mt) => {
          je = Ct(G, "", je, { top: ot }), R(lt, mt);
        },
        [
          () => `${Math.max(6, s(ke).top + 6)}px`,
          () => s(Q).length > 1 ? `${s(Q).length} blocks selected` : X(t().selected)
        ]
      ), P("click", Pt, () => t().copyBlocks(s(Q))), b(J, de);
    };
    H(Re, (J) => {
      s(ke) && !s(te) && J(Ae);
    });
  }
  var Be = d(Re, 2);
  {
    var Je = (J) => {
      var Q = Zd(), de = Me(Q);
      let G;
      var je = d(de, 2);
      {
        let Ue = /* @__PURE__ */ le(() => Math.min(s(L).top, s(j) - 380));
        Kd(je, {
          get store() {
            return t();
          },
          get index() {
            return s(L).index;
          },
          get top() {
            return s(Ue);
          },
          onclose: () => m(L, null)
        });
      }
      D(() => G = Ct(de, "", G, { top: `${s(L).top - 18}px` })), b(J, Q);
    };
    H(Be, (J) => {
      s(L) && J(Je);
    });
  }
  var ce = d(Be, 2);
  {
    var ue = (J) => {
      var Q = Qd();
      let de;
      D((G) => de = Ct(Q, "", de, { top: G }), [() => `${ee(t().pendingInsert.index) ?? ""}px`]), b(J, Q);
    };
    H(ce, (J) => {
      t().pendingInsert && s(q) && J(ue);
    });
  }
  var ze = d(ce, 2);
  {
    var xe = (J) => {
      var Q = ev(), de = Me(Q), G = d(de, 2);
      {
        var je = (Ue) => {
          var lt = $d();
          let wt;
          D((Vt) => wt = Ct(lt, "", wt, { top: Vt }), [() => `${ee(s(f)) ?? ""}px`]), b(Ue, lt);
        };
        H(G, (Ue) => {
          s(f) >= 0 && Ue(je);
        });
      }
      st("dragover", de, se), st("drop", de, ie), st("dragleave", de, () => m(f, -1)), b(J, Q);
    };
    H(ze, (J) => {
      s(te) && J(xe);
    });
  }
  var De = d(oe, 2);
  {
    var Ne = (J) => {
      var Q = tv(), de = h(Q);
      V(de, { name: "sparkles", size: 28 }), b(J, Q);
    };
    H(De, (J) => {
      !t().blocks.length && !s(o) && J(Ne);
    });
  }
  var Ke = d(De, 2);
  {
    var Ge = (J) => {
      var Q = nv(), de = Y(Q);
      D(() => R(de, `Preview failed: ${s(u) ?? ""}`)), b(J, Q);
    };
    H(Ke, (J) => {
      s(u) && J(Ge);
    });
  }
  Jn(we, (J) => m(p, J), () => s(p));
  var Le = d(fe, 2);
  let Ve;
  var Gt = d(h(Le), 2), nt = Y(Gt, !0);
  return D(() => {
    Pe = _e(Se, 1, "device svelte-dfb6jk", null, Pe, { framed: !!r() }), pe = Ct(Se, "", pe, { width: r() ? r() + "px" : "100%" }), Ve = _e(Le, 1, "busy svelte-dfb6jk", null, Ve, { on: s(O) }), R(nt, s(C));
  }), Xu(we, "clientHeight", (J) => m(j, J)), b(n, ae), vt(U);
}
bt(["click"]);
var av = /* @__PURE__ */ k('<div class="inner svelte-hzx6i5"></div>'), iv = /* @__PURE__ */ k('<div role="listitem"><div class="bar svelte-hzx6i5"><span class="grip svelte-hzx6i5" draggable="true" role="button" tabindex="-1" aria-label="Drag to reorder"><!></span> <button type="button" class="title svelte-hzx6i5"><span><!></span> <span class="t svelte-hzx6i5"> </span></button> <button type="button" class="mb-btn ghost icon sm" title="Duplicate"><!></button> <button type="button" class="mb-btn ghost icon sm danger" title="Remove"><!></button></div> <!></div>'), lv = /* @__PURE__ */ k('<div class="list svelte-hzx6i5"><div class="head svelte-hzx6i5"><span class="mb-label"> <span class="count svelte-hzx6i5"> </span></span></div> <!> <button type="button" class="mb-btn add svelte-hzx6i5"><!> </button></div>');
function ov(n, e) {
  dt(e, !0);
  let t = Qe(e, "target", 7);
  const r = /* @__PURE__ */ le(() => Array.isArray(t()[e.field.name]) ? t()[e.field.name] : []);
  let a = /* @__PURE__ */ I(-1), i = /* @__PURE__ */ I(-1), l = /* @__PURE__ */ I(-1);
  function o() {
    return Array.isArray(t()[e.field.name]) || (t()[e.field.name] = []), t()[e.field.name];
  }
  function u() {
    const C = String(e.field.label || "item").replace(/s$/i, "").toLowerCase();
    e.store.mutate(() => o().push(Oo(e.field, C)), "Adding item…"), m(a, s(r).length - 1);
  }
  function v(C) {
    e.store.mutate(() => o().splice(C, 1)), s(a) === C && m(a, -1);
  }
  function g(C) {
    e.store.mutate(() => o().splice(C + 1, 0, JSON.parse(JSON.stringify(Bn(s(r)[C]))))), m(a, C + 1);
  }
  function E(C, S) {
    S < 0 || S >= s(r).length || C === S || (e.store.mutate(() => {
      const _ = o(), [T] = _.splice(C, 1);
      _.splice(S, 0, T);
    }), m(a, S, !0));
  }
  var f = lv(), p = h(f), x = h(p), M = h(x), y = d(M), L = Y(y, !0), j = d(p, 2);
  Ie(j, 17, () => s(r), ht, (C, S, _) => {
    var T = iv();
    let z;
    var W = h(T), re = h(W), ke = h(re);
    V(ke, { name: "grip", size: 13 });
    var he = d(re, 2), N = h(he);
    let F;
    var ee = h(N);
    V(ee, { name: "chevron", size: 12 });
    var te = d(N, 2), se = Y(te, !0), ie = d(he, 2), X = h(ie);
    V(X, { name: "copy", size: 12 });
    var U = d(ie, 2), ae = h(U);
    V(ae, { name: "trash", size: 12 });
    var fe = d(W, 2);
    {
      var Se = (Pe) => {
        var pe = av();
        Ie(pe, 21, () => e.field.fields || [], (we) => we.name, (we, ge) => {
          Da(we, {
            get field() {
              return s(ge);
            },
            get target() {
              return s(S);
            },
            get store() {
              return e.store;
            },
            compact: !0
          });
        }), b(Pe, pe);
      };
      H(fe, (Pe) => {
        s(a) === _ && Pe(Se);
      });
    }
    D(
      (Pe) => {
        z = _e(T, 1, "item svelte-hzx6i5", null, z, { open: s(a) === _, over: s(l) === _ }), F = _e(N, 1, "chev svelte-hzx6i5", null, F, { rot: s(a) === _ }), R(se, Pe);
      },
      [() => ed(s(S), e.field.fields, _)]
    ), st("dragover", T, (Pe) => {
      s(i) >= 0 && (Pe.preventDefault(), m(l, _, !0));
    }), st("drop", T, () => {
      E(s(i), _), m(i, m(l, -1), !0);
    }), st("dragstart", re, (Pe) => {
      m(i, _, !0), Pe.dataTransfer.effectAllowed = "move";
    }), st("dragend", re, () => m(i, m(l, -1), !0)), P("click", he, () => m(a, s(a) === _ ? -1 : _, !0)), P("click", ie, () => g(_)), P("click", U, () => v(_)), b(C, T);
  });
  var A = d(j, 2), q = h(A);
  V(q, { name: "plus", size: 13 });
  var O = d(q);
  D(() => {
    R(M, `${(e.field.label || e.field.name) ?? ""} `), R(L, s(r).length), R(O, ` ${(e.field.btnLabel || "Add item") ?? ""}`);
  }), P("click", A, u), b(n, f), vt();
}
bt(["click"]);
var cv = /* @__PURE__ */ k('<footer class="svelte-1kwbck4"><!></footer>'), uv = /* @__PURE__ */ k('<div class="backdrop svelte-1kwbck4" role="presentation"><div role="dialog" aria-modal="true"><header class="svelte-1kwbck4"><h2 class="svelte-1kwbck4"> </h2> <button type="button" class="mb-btn ghost icon sm" aria-label="Close"><!></button></header> <div class="content mb-scroll svelte-1kwbck4"><!></div> <!></div></div>');
function za(n, e) {
  dt(e, !0);
  let t = Qe(e, "title", 3, ""), r = Qe(e, "wide", 3, !1);
  var a = uv(), i = h(a);
  let l;
  var o = h(i), u = h(o), v = Y(u, !0), g = d(u, 2), E = h(g);
  V(E, { name: "x", size: 14 });
  var f = d(o, 2), p = h(f);
  gl(p, () => e.children ?? Il);
  var x = d(f, 2);
  {
    var M = (y) => {
      var L = cv(), j = h(L);
      gl(j, () => e.actions), b(y, L);
    };
    H(x, (y) => {
      e.actions && y(M);
    });
  }
  D(() => {
    l = _e(i, 1, "dialog svelte-1kwbck4", null, l, { wide: r() }), be(i, "aria-label", t()), R(v, t());
  }), P("click", a, (y) => {
    var L;
    return y.target === y.currentTarget && ((L = e.onclose) == null ? void 0 : L.call(e));
  }), P("click", g, () => {
    var y;
    return (y = e.onclose) == null ? void 0 : y.call(e);
  }), b(n, a), vt();
}
bt(["click"]);
var dv = /* @__PURE__ */ k('<button type="button"> </button>'), vv = /* @__PURE__ */ k('<input class="mb-input search svelte-hd7o5x" placeholder="Filter by name"/> <input type="file" accept="image/*" multiple="" hidden=""/> <button type="button" class="mb-btn primary"><!> </button>', 1), fv = /* @__PURE__ */ k('<p class="error svelte-hd7o5x"> </p>'), hv = /* @__PURE__ */ k('<img class="url-preview svelte-hd7o5x" alt=""/>'), pv = /* @__PURE__ */ k('<div class="url svelte-hd7o5x"><label class="mb-label" for="mb-media-url">Image URL</label> <input id="mb-media-url" class="mb-input" placeholder="https://…"/> <!> <button type="button" class="mb-btn primary">Use this URL</button></div>'), gv = /* @__PURE__ */ k('<span>/</span> <button type="button" class="link svelte-hd7o5x"> </button>', 1), bv = /* @__PURE__ */ k('<div class="crumbs svelte-hd7o5x"><button type="button" class="link svelte-hd7o5x">user/media</button> <!></div>'), mv = /* @__PURE__ */ k('<button type="button" class="tile folder svelte-hd7o5x"><!><span class="svelte-hd7o5x"> </span></button>'), _v = /* @__PURE__ */ k('<button type="button"><img alt="" loading="lazy" class="svelte-hd7o5x"/> <span class="svelte-hd7o5x"> </span></button>'), yv = /* @__PURE__ */ k('<div class="empty svelte-hd7o5x"><!> <strong class="svelte-hd7o5x"> </strong> <span>Drop image files here, or click Upload.</span></div>'), kv = /* @__PURE__ */ k('<p class="muted svelte-hd7o5x">Loading…</p>'), wv = /* @__PURE__ */ k('<!> <div class="grid mb-scroll svelte-hd7o5x"><!> <!></div> <!>', 1), xv = /* @__PURE__ */ k('<div role="presentation"><div class="bar svelte-hd7o5x"><div class="seg svelte-hd7o5x"><!> <button type="button">Site library</button> <button type="button">From URL</button></div> <!></div> <!> <!></div>');
function Po(n, e) {
  dt(e, !0);
  let t = Qe(e, "current", 3, ""), r = /* @__PURE__ */ I(et(e.store.isSection || t() && String(t()).startsWith("user://media") ? "site" : "page")), a = /* @__PURE__ */ I(et([])), i = /* @__PURE__ */ I(et([])), l = /* @__PURE__ */ I(et([])), o = /* @__PURE__ */ I(""), u = /* @__PURE__ */ I(!1), v = /* @__PURE__ */ I(!1), g = /* @__PURE__ */ I(""), E = /* @__PURE__ */ I(et(/^https?:\/\//.test(t()) ? t() : "")), f = /* @__PURE__ */ I(""), p = /* @__PURE__ */ I(!1), x = /* @__PURE__ */ I(void 0);
  const M = (_) => String(_.type || _.mime || "").startsWith("image/") || /\.(jpe?g|png|gif|webp|avif|svg)$/i.test(_.filename || "");
  async function y() {
    m(u, !0), m(g, "");
    try {
      m(a, (await e.store.loadOwnMedia()).filter(M), !0);
    } catch (_) {
      m(g, _.message, !0);
    }
    m(u, !1);
  }
  async function L() {
    m(u, !0), m(g, "");
    try {
      const _ = await Xe.siteMedia(s(o)), T = Array.isArray(_) ? _ : (_ == null ? void 0 : _.files) || (_ == null ? void 0 : _.items) || [];
      m(i, T.filter(M), !0), m(l, (_ == null ? void 0 : _.folders) || [], !0);
    } catch (_) {
      m(g, _.message, !0);
    }
    m(u, !1);
  }
  Xs(() => {
    s(r) === "site" ? L() : y();
  });
  function j(_) {
    m(r, _, !0), _ === "page" && !s(a).length && y(), _ === "site" && L();
  }
  async function A(_) {
    if (_ != null && _.length) {
      m(v, !0), m(g, "");
      try {
        s(r) === "site" ? (await Xe.uploadSiteMedia(_, s(o)), await L()) : (await Xe.uploadOwnMedia(e.store.context, _), await y()), e.store.flash(`${_.length} file${_.length > 1 ? "s" : ""} uploaded`);
      } catch (T) {
        m(g, T.message, !0);
      }
      m(v, !1);
    }
  }
  function q(_) {
    return "user://media/" + (_.path ? _.path.replace(/^\/|\/$/g, "") + "/" : s(o) ? s(o) + "/" : "") + _.filename;
  }
  const O = /* @__PURE__ */ le(() => {
    const _ = s(r) === "site" ? s(i) : s(a), T = s(f).trim().toLowerCase();
    return T ? _.filter((z) => z.filename.toLowerCase().includes(T)) : _;
  });
  function C(_) {
    return typeof _ == "string" ? _ : _.name || _.path;
  }
  function S(_) {
    const T = typeof _ == "string" ? _ : _.path || _.name;
    m(o, T.includes("/") || !s(o) ? T : s(o) + "/" + T, !0), L();
  }
  za(n, {
    title: "Media library",
    wide: !0,
    get onclose() {
      return e.onclose;
    },
    children: (_, T) => {
      var z = xv();
      let W;
      var re = h(z), ke = h(re), he = h(ke);
      {
        var N = (pe) => {
          var we = dv();
          let ge;
          var oe = Y(we, !0);
          D(() => {
            ge = _e(we, 1, "svelte-hd7o5x", null, ge, { active: s(r) === "page" }), R(oe, e.store.isFlex ? "This item" : "This page");
          }), P("click", we, () => j("page")), b(pe, we);
        };
        H(he, (pe) => {
          e.store.isSection || pe(N);
        });
      }
      var F = d(he, 2);
      let ee;
      var te = d(F, 2);
      let se;
      var ie = d(ke, 2);
      {
        var X = (pe) => {
          var we = vv(), ge = Me(we), oe = d(ge, 2);
          Jn(oe, (Ae) => m(x, Ae), () => s(x));
          var $ = d(oe, 2), Te = h($);
          V(Te, { name: "upload", size: 14 });
          var Re = d(Te);
          D(() => {
            $.disabled = s(v), R(Re, ` ${s(v) ? "Uploading…" : "Upload"}`);
          }), xn(ge, () => s(f), (Ae) => m(f, Ae)), P("change", oe, (Ae) => A(Ae.currentTarget.files)), P("click", $, () => s(x).click()), b(pe, we);
        };
        H(ie, (pe) => {
          s(r) !== "url" && pe(X);
        });
      }
      var U = d(re, 2);
      {
        var ae = (pe) => {
          var we = fv(), ge = Y(we, !0);
          D(() => R(ge, s(g))), b(pe, we);
        };
        H(U, (pe) => {
          s(g) && pe(ae);
        });
      }
      var fe = d(U, 2);
      {
        var Se = (pe) => {
          var we = pv(), ge = d(h(we), 2), oe = d(ge, 2);
          {
            var $ = (Ae) => {
              var Be = hv();
              D(() => be(Be, "src", s(E))), b(Ae, Be);
            }, Te = /* @__PURE__ */ le(() => /^https?:\/\//.test(s(E)));
            H(oe, (Ae) => {
              s(Te) && Ae($);
            });
          }
          var Re = d(oe, 2);
          D((Ae) => Re.disabled = Ae, [() => !/^https?:\/\//.test(s(E))]), xn(ge, () => s(E), (Ae) => m(E, Ae)), P("click", Re, () => e.onselect(s(E))), b(pe, we);
        }, Pe = (pe) => {
          var we = wv(), ge = Me(we);
          {
            var oe = (ce) => {
              var ue = bv(), ze = h(ue), xe = d(ze, 2);
              Ie(xe, 17, () => s(o).split("/").filter(Boolean), ht, (De, Ne, Ke) => {
                var Ge = gv(), Le = d(Me(Ge), 2), Ve = Y(Le, !0);
                D(() => R(Ve, s(Ne))), P("click", Le, () => {
                  m(o, s(o).split("/").slice(0, Ke + 1).join("/"), !0), L();
                }), b(De, Ge);
              }), P("click", ze, () => {
                m(o, ""), L();
              }), b(ce, ue);
            };
            H(ge, (ce) => {
              s(r) === "site" && ce(oe);
            });
          }
          var $ = d(ge, 2), Te = h($);
          {
            var Re = (ce) => {
              var ue = Rt(), ze = Me(ue);
              Ie(ze, 17, () => s(l), ht, (xe, De) => {
                var Ne = mv(), Ke = h(Ne);
                V(Ke, { name: "layers", size: 22 });
                var Ge = d(Ke), Le = Y(Ge, !0);
                D((Ve) => R(Le, Ve), [() => C(s(De))]), P("click", Ne, () => S(s(De))), b(xe, Ne);
              }), b(ce, ue);
            };
            H(Te, (ce) => {
              s(r) === "site" && ce(Re);
            });
          }
          var Ae = d(Te, 2);
          Ie(
            Ae,
            17,
            () => s(O),
            (ce) => ce.filename + (ce.path || ""),
            (ce, ue) => {
              const ze = /* @__PURE__ */ le(() => s(r) === "site" ? q(s(ue)) : s(ue).filename);
              var xe = _v();
              let De;
              var Ne = h(xe), Ke = d(Ne, 2), Ge = Y(Ke, !0);
              D(() => {
                De = _e(xe, 1, "tile svelte-hd7o5x", null, De, { active: s(ze) === t() }), be(xe, "title", s(ue).filename), be(Ne, "src", s(ue).url), R(Ge, s(ue).filename);
              }), P("click", xe, () => e.onselect(s(ze))), b(ce, xe);
            },
            (ce) => {
              var ue = Rt(), ze = Me(ue);
              {
                var xe = (De) => {
                  var Ne = yv(), Ke = h(Ne);
                  V(Ke, { name: "upload", size: 26 });
                  var Ge = d(Ke, 2), Le = Y(Ge);
                  D(() => R(Le, `No images ${s(r) === "page" ? e.store.isFlex ? "on this item" : "on this page" : "here"} yet`)), b(De, Ne);
                };
                H(ze, (De) => {
                  s(u) || De(xe);
                });
              }
              b(ce, ue);
            }
          );
          var Be = d($, 2);
          {
            var Je = (ce) => {
              var ue = kv();
              b(ce, ue);
            };
            H(Be, (ce) => {
              s(u) && ce(Je);
            });
          }
          b(pe, we);
        };
        H(fe, (pe) => {
          s(r) === "url" ? pe(Se) : pe(Pe, -1);
        });
      }
      D(() => {
        W = _e(z, 1, "lib svelte-hd7o5x", null, W, { drag: s(p) }), ee = _e(F, 1, "svelte-hd7o5x", null, ee, { active: s(r) === "site" }), se = _e(te, 1, "svelte-hd7o5x", null, se, { active: s(r) === "url" });
      }), st("dragover", z, (pe) => {
        var we, ge;
        (ge = (we = pe.dataTransfer) == null ? void 0 : we.types) != null && ge.includes("Files") && (pe.preventDefault(), m(p, !0));
      }), st("dragleave", z, () => m(p, !1)), st("drop", z, (pe) => {
        pe.preventDefault(), m(p, !1), A(pe.dataTransfer.files);
      }), P("click", F, () => j("site")), P("click", te, () => m(r, "url")), b(_, z);
    },
    $$slots: { default: !0 }
  }), vt();
}
bt(["click", "change"]);
var Sv = /* @__PURE__ */ k('<img alt="" class="svelte-x4wd27"/>'), Ev = /* @__PURE__ */ k('<button type="button" class="mb-btn sm ghost danger">Remove</button>'), Mv = /* @__PURE__ */ k('<div class="media svelte-x4wd27"><button type="button" class="thumb svelte-x4wd27" title="Choose image"><!></button> <div class="side svelte-x4wd27"><div class="name svelte-x4wd27"> </div> <div class="btns svelte-x4wd27"><button type="button" class="mb-btn sm"><!> </button> <!></div></div></div> <!>', 1);
function Tv(n, e) {
  dt(e, !0);
  let t = Qe(e, "value", 3, ""), r = /* @__PURE__ */ I(!1), a = /* @__PURE__ */ I(!1);
  const i = /* @__PURE__ */ le(() => {
    var _;
    const S = String(t() || "");
    return S ? /^(https?:)?\/\//.test(S) || S.startsWith("/") ? S : S.startsWith("user://") ? "/" + S.replace("user://", "user/") : S.startsWith("theme://") ? `/user/themes/${((_ = e.store.catalog) == null ? void 0 : _.theme) || ""}/${S.replace("theme://", "")}` : e.store.pageMediaUrl(S) : "";
  });
  kt(() => {
    s(i), m(a, !1);
  });
  var l = Mv(), o = Me(l), u = h(o), v = h(u);
  {
    var g = (S) => {
      var _ = Sv();
      D(() => be(_, "src", s(i))), st("error", _, () => m(a, !0)), b(S, _);
    }, E = (S) => {
      V(S, { name: "image", size: 22 });
    };
    H(v, (S) => {
      s(i) && !s(a) ? S(g) : S(E, -1);
    });
  }
  var f = d(u, 2), p = h(f), x = Y(p, !0), M = d(p, 2), y = h(M), L = h(y);
  V(L, { name: "image", size: 13 });
  var j = d(L), A = d(y, 2);
  {
    var q = (S) => {
      var _ = Ev();
      P("click", _, () => e.onchange("")), b(S, _);
    };
    H(A, (S) => {
      t() && S(q);
    });
  }
  var O = d(o, 2);
  {
    var C = (S) => {
      Po(S, {
        get store() {
          return e.store;
        },
        get current() {
          return t();
        },
        onselect: (_) => {
          e.onchange(_), m(r, !1);
        },
        onclose: () => m(r, !1)
      });
    };
    H(O, (S) => {
      s(r) && S(C);
    });
  }
  D(() => {
    be(p, "title", t()), R(x, t() || "No image"), R(j, ` ${t() ? "Replace" : "Choose"}`);
  }), P("click", u, () => m(r, !0)), P("click", y, () => m(r, !0)), b(n, l), vt();
}
bt(["click"]);
var Av = /* @__PURE__ */ k("<i></i>"), Cv = /* @__PURE__ */ k('<button type="button" class="mb-btn ghost icon sm" title="Clear"><!></button>'), Ov = /* @__PURE__ */ k('<button type="button"><i></i></button>'), Pv = /* @__PURE__ */ k('<div class="pop svelte-168bgjg"><input class="mb-input" placeholder="Search icons"/> <div class="grid mb-scroll svelte-168bgjg"></div></div>'), zv = /* @__PURE__ */ k('<div class="icon-control"><div class="row svelte-168bgjg"><button type="button" class="current svelte-168bgjg" title="Choose icon"><!></button> <input class="mb-input" placeholder="fa-bolt"/> <!></div> <!></div>');
function Dv(n, e) {
  dt(e, !0);
  let t = Qe(e, "value", 3, ""), r = /* @__PURE__ */ I(!1), a = /* @__PURE__ */ I(""), i = /* @__PURE__ */ I(void 0);
  const l = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css", o = "bolt rocket star heart check circle-check shield-halved lock key user users user-tie handshake briefcase building chart-line chart-simple chart-pie bullseye trophy medal award gem crown lightbulb brain robot microchip code terminal laptop mobile-screen desktop server cloud database wifi globe earth-americas map-location-dot location-dot compass envelope phone comments comment-dots headset bell calendar clock hourglass stopwatch cart-shopping bag-shopping credit-card money-bill wallet tags tag receipt truck box gift percent palette paintbrush pen-nib wand-magic-sparkles image images camera video film music microphone book book-open graduation-cap school newspaper file file-lines folder clipboard-list list-check gear gears wrench screwdriver-wrench hammer toolbox sliders filter magnifying-glass leaf seedling tree mountain sun moon cloud-sun water fire snowflake recycle house hotel utensils mug-hot pizza-slice burger wine-glass dumbbell heart-pulse stethoscope hospital paw plane car bicycle ship anchor route road thumbs-up face-smile hand-holding-heart people-group universal-access infinity arrows-rotate arrow-right link share-nodes".split(" ").map((C) => "fa-" + C), u = "github facebook instagram x-twitter linkedin youtube tiktok whatsapp pinterest discord slack wordpress google apple".split(" ").map((C) => "fa-brands fa-" + C), v = /* @__PURE__ */ le(() => {
    const C = s(a).trim().toLowerCase().replace(/^fa-/, "");
    return [...o, ...u].filter((S) => !C || S.includes(C));
  }), g = (C) => {
    const S = String(C || "").trim();
    return S ? /\bfa-(brands|solid|regular)\b|\bfa[brs]\b/.test(S) ? S : "fa-solid " + (S.startsWith("fa-") ? S : "fa-" + S) : "";
  };
  Xs(() => {
    if (!document.head.querySelector("link[data-maw-fa]")) {
      const S = document.createElement("link");
      S.rel = "stylesheet", S.href = l, S.dataset.mawFa = "1", document.head.appendChild(S);
    }
    const C = s(i).getRootNode();
    if (C instanceof ShadowRoot && !C.querySelector("link[data-fa]")) {
      const S = document.createElement("link");
      S.rel = "stylesheet", S.href = l, S.dataset.fa = "1", C.prepend(S);
    }
  });
  var E = zv(), f = h(E), p = h(f), x = h(p);
  {
    var M = (C) => {
      var S = Av();
      D((_) => _e(S, 1, _, "svelte-168bgjg"), [() => mi(g(t()))]), b(C, S);
    }, y = (C) => {
      V(C, { name: "plus", size: 14 });
    };
    H(x, (C) => {
      t() ? C(M) : C(y, -1);
    });
  }
  var L = d(p, 2), j = d(L, 2);
  {
    var A = (C) => {
      var S = Cv(), _ = h(S);
      V(_, { name: "x", size: 12 }), P("click", S, () => e.onchange("")), b(C, S);
    };
    H(j, (C) => {
      t() && C(A);
    });
  }
  var q = d(f, 2);
  {
    var O = (C) => {
      var S = Pv(), _ = h(S), T = d(_, 2);
      Ie(T, 20, () => s(v), (z) => z, (z, W) => {
        var re = Ov();
        let ke;
        var he = Y(re);
        D(
          (N, F) => {
            be(re, "title", N), ke = _e(re, 1, "svelte-168bgjg", null, ke, { active: t() === W }), _e(he, 1, F, "svelte-168bgjg");
          },
          [
            () => W.replace("fa-brands ", ""),
            () => mi(g(W))
          ]
        ), P("click", re, () => {
          e.onchange(W), m(r, !1);
        }), b(z, re);
      }), xn(_, () => s(a), (z) => m(a, z)), b(C, S);
    };
    H(q, (C) => {
      s(r) && C(O);
    });
  }
  Jn(E, (C) => m(i, C), () => s(i)), D(() => {
    be(p, "aria-expanded", s(r)), es(L, t());
  }), P("click", p, () => m(r, !s(r))), P("input", L, (C) => e.onchange(C.currentTarget.value)), b(n, E), vt();
}
bt(["click", "input"]);
var Nv = /* @__PURE__ */ k('<div class="tools svelte-gx0hvo"><button type="button" title="Bold" class="svelte-gx0hvo"><!></button> <button type="button" title="Italic" class="svelte-gx0hvo"><!></button> <button type="button" title="Link" class="svelte-gx0hvo"><!></button> <button type="button" title="Bulleted list" class="svelte-gx0hvo"><!></button> <span class="hint svelte-gx0hvo">Markdown</span></div>'), Lv = /* @__PURE__ */ k('<div><!> <textarea class="mb-input svelte-gx0hvo"></textarea></div>');
function El(n, e) {
  dt(e, !0);
  let t = Qe(e, "value", 3, ""), r = Qe(e, "rows", 3, 4), a = Qe(e, "plain", 3, !1), i = /* @__PURE__ */ I(void 0);
  function l(p, x = p, M = "text") {
    const y = s(i).selectionStart, L = s(i).selectionEnd, j = t().slice(y, L) || M, A = t().slice(0, y) + p + j + x + t().slice(L);
    e.onchange(A), requestAnimationFrame(() => {
      s(i).focus(), s(i).setSelectionRange(y + p.length, y + p.length + j.length);
    });
  }
  function o() {
    const p = t().lastIndexOf(`
`, s(i).selectionStart - 1) + 1, x = t().slice(0, p) + "- " + t().slice(p);
    e.onchange(x);
  }
  var u = Lv();
  let v;
  var g = h(u);
  {
    var E = (p) => {
      var x = Nv(), M = h(x), y = h(M);
      V(y, { name: "bold", size: 13 });
      var L = d(M, 2), j = h(L);
      V(j, { name: "italic", size: 13 });
      var A = d(L, 2), q = h(A);
      V(q, { name: "link", size: 13 });
      var O = d(A, 2), C = h(O);
      V(C, { name: "list", size: 13 }), P("click", M, () => l("**")), P("click", L, () => l("_")), P("click", A, () => l("[", "](https://)", "link text")), P("click", O, o), b(p, x);
    };
    H(g, (p) => {
      a() || p(E);
    });
  }
  var f = d(g, 2);
  Jn(f, (p) => m(i, p), () => s(i)), D(() => {
    v = _e(u, 1, "md svelte-gx0hvo", null, v, { plain: a() }), be(f, "id", e.id), be(f, "rows", r()), es(f, t());
  }), P("input", f, (p) => e.onchange(p.currentTarget.value)), b(n, u), vt();
}
bt(["click", "input"]);
var Rv = /* @__PURE__ */ k('<label class="toggle svelte-2ufken"><input type="checkbox" class="svelte-2ufken"/> <span class="track svelte-2ufken"><span class="thumb svelte-2ufken"></span></span> <span class="tl"> </span></label>'), jv = /* @__PURE__ */ k('<button type="button" role="radio"> </button>'), Iv = /* @__PURE__ */ k('<div class="seg svelte-2ufken" role="radiogroup"></div>'), qv = /* @__PURE__ */ k("<option> </option>"), Fv = /* @__PURE__ */ k('<select class="mb-input"></select>'), Bv = /* @__PURE__ */ k('<input class="mb-input" type="number"/>'), Uv = /* @__PURE__ */ k('<div class="color svelte-2ufken"><input type="color" class="svelte-2ufken"/><input class="mb-input"/></div>'), Hv = /* @__PURE__ */ k('<input class="mb-input" type="text"/>'), Kv = /* @__PURE__ */ k('<textarea class="mb-input mono svelte-2ufken" rows="4"></textarea> <div class="mb-help"> </div>', 1), Gv = /* @__PURE__ */ k('<label class="mb-label"> </label> <!>', 1), Vv = /* @__PURE__ */ k('<div class="mb-help"> </div>'), Jv = /* @__PURE__ */ k("<div><!> <!></div>");
function Da(n, e) {
  dt(e, !0);
  let t = Qe(e, "target", 7), r = Qe(e, "compact", 3, !1);
  const a = "mb-" + Math.random().toString(36).slice(2, 9), i = /* @__PURE__ */ le(() => e.field.label || e.field.title || e.field.name), l = /* @__PURE__ */ le(() => e.field.type || "text"), o = /* @__PURE__ */ le(() => s(l) === "toggle" || e.field.validate === "bool"), u = /* @__PURE__ */ le(() => s(l) === "number" || e.field.validate === "int"), v = /* @__PURE__ */ le(() => t()[e.field.name] ?? Ui(e.field) ?? (s(o) ? !1 : ""));
  function g(O) {
    e.store.beginEdit(), O === "" || O === null || O === void 0 ? delete t()[e.field.name] : t()[e.field.name] = O, e.store.endEdit();
  }
  function E(O) {
    if (O === "") return g(void 0);
    const C = Number(O);
    g(Number.isFinite(C) ? C : O);
  }
  let f = /* @__PURE__ */ I("");
  kt(() => {
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
    ].includes(s(l)) || m(f, JSON.stringify(t()[e.field.name] ?? null, null, 2), !0);
  });
  var p = Jv();
  let x;
  var M = h(p);
  {
    var y = (O) => {
      ov(O, {
        get field() {
          return e.field;
        },
        get target() {
          return t();
        },
        get store() {
          return e.store;
        }
      });
    }, L = (O) => {
      var C = Rv(), S = h(C), _ = d(S, 4), T = Y(_, !0);
      D(() => {
        Vu(S, s(v) === !0 || s(v) === 1 || s(v) === "1"), R(T, s(i));
      }), P("change", S, (z) => g(!!z.currentTarget.checked)), b(O, C);
    }, j = (O) => {
      var C = Gv(), S = Me(C), _ = Y(S, !0), T = d(S, 2);
      {
        var z = (X) => {
          var U = Iv();
          Ie(U, 21, () => e.field.options, ht, (ae, fe) => {
            var Se = jv();
            let Pe;
            var pe = Y(Se, !0);
            D(
              (we, ge) => {
                be(Se, "aria-checked", we), Pe = _e(Se, 1, "svelte-2ufken", null, Pe, { active: ge }), R(pe, s(fe).label);
              },
              [
                () => String(s(v)) === s(fe).value,
                () => String(s(v)) === s(fe).value
              ]
            ), P("click", Se, () => g(s(u) ? Number(s(fe).value) : s(fe).value)), b(ae, Se);
          }), D(() => be(U, "aria-label", s(i))), b(X, U);
        }, W = /* @__PURE__ */ le(() => {
          var X;
          return s(l) === "select" && ((X = e.field.options) == null ? void 0 : X.length) <= 4 && e.field.options.every((U) => String(U.label).length < 14);
        }), re = (X) => {
          var U = Fv();
          Ie(U, 21, () => e.field.options || [], ht, (fe, Se) => {
            var Pe = qv(), pe = Y(Pe, !0), we = {};
            D(() => {
              R(pe, s(Se).label), we !== (we = s(Se).value) && (Pe.value = (Pe.__value = we) ?? "");
            }), b(fe, Pe);
          });
          var ae;
          pr(U), D(
            (fe) => {
              be(U, "id", a), ae !== (ae = fe) && (U.value = (U.__value = ae) ?? "", oa(U, ae));
            },
            [() => String(s(v))]
          ), P("change", U, (fe) => g(s(u) ? Number(fe.currentTarget.value) : fe.currentTarget.value)), b(X, U);
        }, ke = (X) => {
          {
            let U = /* @__PURE__ */ le(() => s(v) || ""), ae = /* @__PURE__ */ le(() => e.field.rows || 6);
            El(X, {
              get id() {
                return a;
              },
              get value() {
                return s(U);
              },
              onchange: g,
              get rows() {
                return s(ae);
              }
            });
          }
        }, he = (X) => {
          {
            let U = /* @__PURE__ */ le(() => s(v) || ""), ae = /* @__PURE__ */ le(() => e.field.rows || 3), fe = /* @__PURE__ */ le(() => !/markdown/i.test(s(i)));
            El(X, {
              get id() {
                return a;
              },
              get value() {
                return s(U);
              },
              onchange: g,
              get rows() {
                return s(ae);
              },
              get plain() {
                return s(fe);
              }
            });
          }
        }, N = (X) => {
          Tv(X, {
            get value() {
              return s(v);
            },
            onchange: g,
            get store() {
              return e.store;
            }
          });
        }, F = (X) => {
          Dv(X, {
            get value() {
              return s(v);
            },
            onchange: g
          });
        }, ee = (X) => {
          var U = Bv();
          D(() => {
            var ae;
            be(U, "id", a), es(U, s(v)), be(U, "min", (ae = e.field.validate) == null ? void 0 : ae.min);
          }), P("input", U, (ae) => E(ae.currentTarget.value)), b(X, U);
        }, te = (X) => {
          var U = Uv(), ae = h(U), fe = d(ae);
          D(() => {
            es(ae, s(v) || "#000000"), be(fe, "id", a), es(fe, s(v));
          }), P("input", ae, (Se) => g(Se.currentTarget.value)), P("input", fe, (Se) => g(Se.currentTarget.value)), b(X, U);
        }, se = (X) => {
          var U = Hv();
          D(() => {
            be(U, "id", a), es(U, s(v)), be(U, "placeholder", e.field.placeholder || "");
          }), P("input", U, (ae) => g(ae.currentTarget.value)), b(X, U);
        }, ie = (X) => {
          var U = Kv(), ae = Me(U), fe = d(ae, 2), Se = Y(fe);
          D(() => {
            be(ae, "id", a), R(Se, `Edited as JSON (field type “${s(l) ?? ""}”).`);
          }), P("change", ae, () => {
            try {
              g(JSON.parse(s(
                f
                /* keep editing */
              )));
            } catch {
            }
          }), xn(ae, () => s(f), (Pe) => m(f, Pe)), b(X, U);
        };
        H(T, (X) => {
          s(W) ? X(z) : s(l) === "select" ? X(re, 1) : s(l) === "markdown" ? X(ke, 2) : s(l) === "textarea" ? X(he, 3) : s(l) === "filepicker" || s(l) === "media" || s(l) === "file" ? X(N, 4) : s(l) === "iconpicker" ? X(F, 5) : s(u) ? X(ee, 6) : s(l) === "colorpicker" ? X(te, 7) : s(l) === "text" || s(l) === "date" ? X(se, 8) : X(ie, -1);
        });
      }
      D(() => {
        be(S, "for", a), R(_, s(i));
      }), b(O, C);
    };
    H(M, (O) => {
      s(l) === "list" ? O(y) : s(o) ? O(L, 1) : O(j, -1);
    });
  }
  var A = d(M, 2);
  {
    var q = (O) => {
      var C = Vv(), S = Y(C, !0);
      D(() => R(S, e.field.help)), b(O, C);
    };
    H(A, (O) => {
      e.field.help && s(l) !== "list" && O(q);
    });
  }
  D(() => x = _e(p, 1, "field svelte-2ufken", null, x, { compact: r(), inline: s(o) })), b(n, p), vt();
}
bt(["change", "click", "input"]);
var Yv = /* @__PURE__ */ k('<button type="button"><span class="aa svelte-uthihf">Aa</span></button>'), Wv = /* @__PURE__ */ k('<span class="aa svelte-uthihf">Aa</span>'), Xv = /* @__PURE__ */ k('<label title="Custom color"><input type="color" aria-label="Custom background color" class="svelte-uthihf"/> <!></label>'), Zv = /* @__PURE__ */ k('<span class="live svelte-uthihf"> </span>'), Qv = /* @__PURE__ */ k('<button type="button" class="mb-btn sm ghost">Clear</button>'), $v = /* @__PURE__ */ k('<button type="button" class="dot svelte-uthihf"></button>'), ef = /* @__PURE__ */ k('<button type="button"> <!></button>'), tf = /* @__PURE__ */ k('<span class="mb-label sub svelte-uthihf">Text color</span> <div class="seg svelte-uthihf"></div>', 1), nf = /* @__PURE__ */ k('<div class="group custom-row svelte-uthihf"><span class="mb-label">Custom color</span> <div class="hex svelte-uthihf"><span class="chip svelte-uthihf"></span> <input class="mb-input svelte-uthihf" placeholder="#hex e.g. #0f766e" spellcheck="false"/> <!></div> <div class="suggest svelte-uthihf"></div> <!></div>'), sf = /* @__PURE__ */ k('<div class="group svelte-uthihf"><span class="mb-label">Background</span> <div class="swatches svelte-uthihf"><!> <!></div> <div class="mb-help"><!> <!></div></div> <!>', 1), rf = /* @__PURE__ */ k('<button type="button"> </button>'), af = /* @__PURE__ */ k('<div class="group svelte-uthihf"><span class="mb-label"> </span> <div class="seg svelte-uthihf"></div></div>'), lf = /* @__PURE__ */ k("<!> <!> <!>", 1), of = /* @__PURE__ */ k('<button type="button"><!> </button>'), cf = /* @__PURE__ */ k(`<button type="button" title="Don't render this block anywhere"><!> Hide all</button>`), uf = /* @__PURE__ */ k('<div class="group svelte-uthihf"><span class="mb-label">Visibility</span> <div class="seg svelte-uthihf"><!> <!></div> <div class="mb-help"><!></div></div>'), df = /* @__PURE__ */ k("<!> <!>", 1);
function yi(n, e) {
  dt(e, !0);
  let t = Qe(e, "block", 7), r = Qe(e, "settings", 19, () => []), a = Qe(e, "mode", 3, "style");
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
  }, u = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i, v = /* @__PURE__ */ le(() => Object.fromEntries(r().map((N) => [N.name, N]))), g = /* @__PURE__ */ le(() => r().filter((N) => !i.includes(N.name))), E = /* @__PURE__ */ le(() => typeof t().bg_color == "string" && u.test(t().bg_color) ? t().bg_color : "");
  let f = /* @__PURE__ */ I("");
  kt(() => {
    m(f, s(E), !0);
  });
  function p(N, F, ee) {
    e.store.beginEdit(), F === void 0 || F === "" || F === null || F === ee ? delete t()[N] : t()[N] = F, e.store.endEdit();
  }
  const x = (N) => {
    var F;
    return t()[N] ?? ((F = s(v)[N]) == null ? void 0 : F.default);
  }, M = /* @__PURE__ */ le(() => Ts(t()));
  function y(N) {
    const F = s(M).includes(N) ? s(M).filter((te) => te !== N) : [...s(M), N], ee = l.map(([te]) => te).filter((te) => F.includes(te));
    e.store.beginEdit(), ee.length ? t().hide_on = ee : delete t().hide_on, e.store.endEdit();
  }
  function L() {
    e.store.beginEdit(), t().hidden ? delete t().hidden : t().hidden = !0, e.store.endEdit();
  }
  function j(N) {
    var F;
    e.store.beginEdit(), delete t().bg_color, delete t().text_color, N === ((F = s(v).background) == null ? void 0 : F.default) ? delete t().background : t().background = N, e.store.endEdit();
  }
  function A(N) {
    u.test(N) && p("bg_color", N.toLowerCase());
  }
  function q() {
    let N = s(f).trim();
    N && !N.startsWith("#") && (N = "#" + N), N ? u.test(N) ? A(N) : m(f, s(E), !0) : p("bg_color", void 0);
  }
  function O(N) {
    let F = N.replace("#", "");
    F.length === 3 && (F = F.split("").map((U) => U + U).join(""));
    const ee = (U) => (U /= 255, U <= 0.03928 ? U / 12.92 : ((U + 0.055) / 1.055) ** 2.4), [te, se, ie] = [0, 2, 4].map((U) => parseInt(F.slice(U, U + 2), 16)), X = 0.2126 * ee(te) + 0.7152 * ee(se) + 0.0722 * ee(ie);
    return 1.05 / (X + 0.05) >= (X + 0.05) / 0.0597 ? "light" : "dark";
  }
  const C = (N) => {
    var F, ee;
    return ((ee = (F = e.store.palette) == null ? void 0 : F[N]) == null ? void 0 : ee.bg) || o[N] || "var(--mb-muted)";
  }, S = (N) => {
    var F, ee;
    return ((ee = (F = e.store.palette) == null ? void 0 : F[N]) == null ? void 0 : ee.fg) || (N === "accent" || N === "dark" ? "#fff" : "#111");
  }, _ = /* @__PURE__ */ le(() => {
    var N;
    return [
      (N = e.store.palette) == null ? void 0 : N._accent,
      "#0f766e",
      "#7c3aed",
      "#be123c",
      "#ea580c",
      "#111827",
      "#f5f5f4"
    ].filter((F) => F && u.test(F));
  });
  var T = df(), z = Me(T);
  {
    var W = (N) => {
      var F = lf(), ee = Me(F);
      {
        var te = (U) => {
          var ae = sf(), fe = Me(ae), Se = d(h(fe), 2), Pe = h(Se);
          Ie(Pe, 17, () => s(v).background.options, ht, (ce, ue) => {
            const ze = /* @__PURE__ */ le(() => !s(E) && x("background") === s(ue).value);
            var xe = Yv();
            let De, Ne;
            D(
              (Ke, Ge) => {
                De = _e(xe, 1, "sw svelte-uthihf", null, De, { active: s(ze) }), be(xe, "title", s(ue).label), be(xe, "aria-label", s(ue).label), be(xe, "aria-pressed", s(ze)), Ne = Ct(xe, "", Ne, { background: Ke, color: Ge });
              },
              [
                () => C(s(ue).value),
                () => S(s(ue).value)
              ]
            ), P("click", xe, () => j(s(ue).value)), b(ce, xe);
          });
          var pe = d(Pe, 2);
          {
            var we = (ce) => {
              var ue = Xv();
              let ze, xe;
              var De = h(ue), Ne = d(De, 2);
              {
                var Ke = (Le) => {
                  var Ve = Wv();
                  b(Le, Ve);
                }, Ge = (Le) => {
                  V(Le, { name: "plus", size: 14 });
                };
                H(Ne, (Le) => {
                  s(E) ? Le(Ke) : Le(Ge, -1);
                });
              }
              D(
                (Le) => {
                  ze = _e(ue, 1, "sw custom svelte-uthihf", null, ze, { active: !!s(E) }), xe = Ct(ue, "", xe, {
                    background: s(E) || "conic-gradient(#ef4444, #f59e0b, #22c55e, #06b6d4, #6366f1, #d946ef, #ef4444)",
                    color: Le
                  }), es(De, s(E) || "#2563eb");
                },
                [
                  () => s(E) ? O(s(E)) === "light" ? "#fff" : "#111" : "#fff"
                ]
              ), P("input", De, (Le) => A(Le.currentTarget.value)), b(ce, ue);
            };
            H(pe, (ce) => {
              s(v).bg_color && ce(we);
            });
          }
          var ge = d(Se, 2), oe = h(ge);
          {
            var $ = (ce) => {
              var ue = Zt();
              D(() => R(ue, `Custom ${s(E) ?? ""}`)), b(ce, ue);
            }, Te = (ce) => {
              var ue = Zt();
              D((ze) => R(ue, ze), [
                () => {
                  var ze;
                  return (ze = s(v).background.options.find((xe) => xe.value === x("background"))) == null ? void 0 : ze.label;
                }
              ]), b(ce, ue);
            };
            H(oe, (ce) => {
              s(E) ? ce($) : ce(Te, -1);
            });
          }
          var Re = d(oe, 2);
          {
            var Ae = (ce) => {
              var ue = Zv(), ze = Y(ue);
              D(() => R(ze, `· colors from your theme (${e.store.palette._mode ?? ""})`)), b(ce, ue);
            };
            H(Re, (ce) => {
              e.store.palette && ce(Ae);
            });
          }
          var Be = d(fe, 2);
          {
            var Je = (ce) => {
              var ue = nf(), ze = d(h(ue), 2), xe = h(ze);
              let De;
              var Ne = d(xe, 2), Ke = d(Ne, 2);
              {
                var Ge = (nt) => {
                  var J = Qv();
                  P("click", J, () => p("bg_color", void 0)), b(nt, J);
                };
                H(Ke, (nt) => {
                  s(E) && nt(Ge);
                });
              }
              var Le = d(ze, 2);
              Ie(Le, 21, () => s(_), ht, (nt, J) => {
                var Q = $v();
                let de;
                D(() => {
                  be(Q, "title", s(J)), be(Q, "aria-label", s(J)), de = Ct(Q, "", de, { background: s(J) });
                }), P("click", Q, () => A(s(J))), b(nt, Q);
              });
              var Ve = d(Le, 2);
              {
                var Gt = (nt) => {
                  var J = tf(), Q = d(Me(J), 2);
                  Ie(Q, 21, () => s(v).text_color.options, ht, (de, G) => {
                    var je = ef();
                    let Ue;
                    var lt = h(je), wt = d(lt);
                    {
                      var Vt = (Pt) => {
                        var xt = Zt();
                        D((qt) => R(xt, `(${qt ?? ""})`), [() => O(s(E))]), b(Pt, xt);
                      };
                      H(wt, (Pt) => {
                        s(G).value === "auto" && Pt(Vt);
                      });
                    }
                    D(() => {
                      Ue = _e(je, 1, "svelte-uthihf", null, Ue, { active: (t().text_color || "auto") === s(G).value }), R(lt, s(G).label);
                    }), P("click", je, () => p("text_color", s(G).value, "auto")), b(de, je);
                  }), b(nt, J);
                };
                H(Ve, (nt) => {
                  s(E) && s(v).text_color && nt(Gt);
                });
              }
              D(() => De = Ct(xe, "", De, { background: s(E) || "transparent" })), P("change", Ne, q), P("keydown", Ne, (nt) => nt.key === "Enter" && q()), xn(Ne, () => s(f), (nt) => m(f, nt)), b(ce, ue);
            };
            H(Be, (ce) => {
              s(v).bg_color && ce(Je);
            });
          }
          b(U, ae);
        };
        H(ee, (U) => {
          s(v).background && U(te);
        });
      }
      var se = d(ee, 2);
      Ie(se, 16, () => ["spacing", "width", "align"], ht, (U, ae) => {
        var fe = Rt(), Se = Me(fe);
        {
          var Pe = (pe) => {
            var we = af(), ge = h(we), oe = Y(ge, !0), $ = d(ge, 2);
            Ie($, 21, () => s(v)[ae].options, ht, (Te, Re) => {
              var Ae = rf();
              let Be;
              var Je = Y(Ae, !0);
              D(
                (ce) => {
                  Be = _e(Ae, 1, "svelte-uthihf", null, Be, { active: ce }), R(Je, s(Re).label);
                },
                [() => x(ae) === s(Re).value]
              ), P("click", Ae, () => p(ae, s(Re).value, s(v)[ae].default)), b(Te, Ae);
            }), D(() => R(oe, s(v)[ae].label)), b(pe, we);
          };
          H(Se, (pe) => {
            s(v)[ae] && pe(Pe);
          });
        }
        b(U, fe);
      });
      var ie = d(se, 2);
      {
        var X = (U) => {
          Da(U, {
            get field() {
              return s(v).reveal;
            },
            get target() {
              return t();
            },
            get store() {
              return e.store;
            }
          });
        };
        H(ie, (U) => {
          s(v).reveal && U(X);
        });
      }
      b(N, F);
    };
    H(z, (N) => {
      a() === "style" && N(W);
    });
  }
  var re = d(z, 2);
  {
    var ke = (N) => {
      var F = Rt(), ee = Me(F);
      {
        var te = (se) => {
          var ie = uf(), X = d(h(ie), 2), U = h(X);
          {
            var ae = ($) => {
              var Te = Rt(), Re = Me(Te);
              Ie(Re, 17, () => l, ht, (Ae, Be) => {
                var Je = /* @__PURE__ */ le(() => Ua(s(Be), 3));
                let ce = () => s(Je)[0], ue = () => s(Je)[1], ze = () => s(Je)[2];
                const xe = /* @__PURE__ */ le(() => s(M).includes(ce()));
                var De = of();
                let Ne;
                var Ke = h(De);
                {
                  let Le = /* @__PURE__ */ le(() => s(xe) ? "eye-off" : ue());
                  V(Ke, {
                    get name() {
                      return s(Le);
                    },
                    size: 13
                  });
                }
                var Ge = d(Ke);
                D(
                  (Le) => {
                    Ne = _e(De, 1, "dev svelte-uthihf", null, Ne, { off: s(xe) }), De.disabled = !!t().hidden, be(De, "aria-pressed", !s(xe)), be(De, "title", Le), R(Ge, ` ${ze() ?? ""}`);
                  },
                  [
                    () => s(xe) ? `Hidden on ${ze().toLowerCase()}: click to show` : `Shown on ${ze().toLowerCase()}: click to hide`
                  ]
                ), P("click", De, () => y(ce())), b(Ae, De);
              }), b($, Te);
            };
            H(U, ($) => {
              s(v).hide_on && $(ae);
            });
          }
          var fe = d(U, 2);
          {
            var Se = ($) => {
              var Te = cf();
              let Re;
              var Ae = h(Te);
              V(Ae, { name: "eye-off", size: 13 }), D(() => {
                Re = _e(Te, 1, "dev svelte-uthihf", null, Re, { off: !!t().hidden }), be(Te, "aria-pressed", !!t().hidden);
              }), P("click", Te, L), b($, Te);
            };
            H(fe, ($) => {
              s(v).hidden && $(Se);
            });
          }
          var Pe = d(X, 2), pe = h(Pe);
          {
            var we = ($) => {
              var Te = Zt("Hidden everywhere. The block isn't rendered on the site.");
              b($, Te);
            }, ge = ($) => {
              var Te = Zt();
              D((Re) => R(Te, `Hidden on ${Re ?? ""}. Still visible in this editor, striped.`), [() => s(M).join(", ")]), b($, Te);
            }, oe = ($) => {
              var Te = Zt("Shown on every screen size.");
              b($, Te);
            };
            H(pe, ($) => {
              t().hidden ? $(we) : s(M).length ? $(ge, 1) : $(oe, -1);
            });
          }
          b(se, ie);
        };
        H(ee, (se) => {
          (s(v).hide_on || s(v).hidden) && se(te);
        });
      }
      b(N, F);
    }, he = (N) => {
      var F = Rt(), ee = Me(F);
      Ie(ee, 17, () => s(g), (te) => te.name, (te, se) => {
        Da(te, {
          get field() {
            return s(se);
          },
          get target() {
            return t();
          },
          get store() {
            return e.store;
          }
        });
      }), b(N, F);
    };
    H(re, (N) => {
      a() === "style" || a() === "visibility" ? N(ke) : a() === "advanced" && N(he, 1);
    });
  }
  b(n, T), vt();
}
bt(["click", "input", "change", "keydown"]);
var vf = /* @__PURE__ */ k("<option>Choose…</option>"), Ml = /* @__PURE__ */ k("<option> </option>"), ff = /* @__PURE__ */ k('<p class="muted svelte-1w5bgec">Checking…</p>'), hf = /* @__PURE__ */ k('<li class="svelte-1w5bgec"> </li>'), pf = /* @__PURE__ */ k('<ul class="svelte-1w5bgec"></ul>'), gf = /* @__PURE__ */ k('<p class="muted svelte-1w5bgec">Not saved on any page yet.</p>'), bf = /* @__PURE__ */ k('<div class="usage svelte-1w5bgec"><span class="mb-label">Used on</span> <!></div>'), mf = /* @__PURE__ */ k('<div class="global"><div class="banner svelte-1w5bgec"><!> <div class="svelte-1w5bgec"><strong> </strong> <span class="svelte-1w5bgec">Shared content. Edits apply on every page that uses it.</span></div></div> <label class="mb-label" for="mb-global-pick">Show this global section</label> <select id="mb-global-pick" class="mb-input"><!><!><!></select> <div class="actions svelte-1w5bgec"><button type="button" class="mb-btn primary"><!> Edit global section</button> <button type="button" class="mb-btn" title="Replace with an editable copy on this page"><!> Detach</button></div> <!> <!></div>');
function _f(n, e) {
  dt(e, !0);
  let t = Qe(e, "block", 7), r = /* @__PURE__ */ I(null);
  const a = /* @__PURE__ */ le(() => {
    var N;
    return ((N = t().global) == null ? void 0 : N.section) || "";
  }), i = /* @__PURE__ */ le(() => e.store.sections.find((N) => N.id === s(a)));
  kt(() => {
    m(r, null), s(a) && Xe.section(s(a)).then((N) => m(r, N.usage || [], !0)).catch(() => m(r, [], !0));
  }), Xs(() => e.store.refreshSections());
  function l(N) {
    const F = N.currentTarget.value;
    e.store.mutate(
      () => {
        (!t().global || typeof t().global != "object") && (t().global = {}), t().global.section = F;
      },
      "Switching global section…"
    );
  }
  async function o() {
    e.store.dirty && e.store.flash("Your page changes are kept. Save the page when you come back.");
    try {
      await e.store.openSection(s(a));
    } catch (N) {
      e.store.flash(N.message);
    }
  }
  async function u() {
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
      } catch (F) {
        e.store.flash(F.message);
      }
  }
  var v = mf(), g = h(v), E = h(g);
  V(E, { name: "globe", size: 18 });
  var f = d(E, 2), p = h(f), x = Y(p, !0), M = d(g, 4), y = h(M);
  {
    var L = (N) => {
      var F = vf();
      F.value = F.__value = "", b(N, F);
    };
    H(y, (N) => {
      s(a) || N(L);
    });
  }
  var j = d(y);
  Ie(j, 17, () => e.store.sections, (N) => N.id, (N, F) => {
    var ee = Ml(), te = Y(ee), se = {};
    D(() => {
      R(te, `${s(F).title ?? ""} (${s(F).count ?? ""})`), se !== (se = s(F).id) && (ee.value = (ee.__value = se) ?? "");
    }), b(N, ee);
  });
  var A = d(j);
  {
    var q = (N) => {
      var F = Ml(), ee = Y(F), te = {};
      D(() => {
        R(ee, `${s(a) ?? ""} (missing)`), te !== (te = s(a)) && (F.value = (F.__value = te) ?? "");
      }), b(N, F);
    };
    H(A, (N) => {
      s(a) && !s(i) && N(q);
    });
  }
  var O;
  pr(M);
  var C = d(M, 2), S = h(C), _ = h(S);
  V(_, { name: "edit", size: 14 });
  var T = d(S, 2), z = h(T);
  V(z, { name: "unlink", size: 14 });
  var W = d(C, 2);
  {
    var re = (N) => {
      yi(N, {
        get block() {
          return t();
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
    H(W, (N) => {
      var F;
      (F = e.store.catalog) != null && F.settings && N(re);
    });
  }
  var ke = d(W, 2);
  {
    var he = (N) => {
      var F = bf(), ee = d(h(F), 2);
      {
        var te = (X) => {
          var U = ff();
          b(X, U);
        }, se = (X) => {
          var U = pf();
          Ie(U, 21, () => s(r), ht, (ae, fe) => {
            var Se = hf(), Pe = Y(Se, !0);
            D(() => R(Pe, s(fe))), b(ae, Se);
          }), b(X, U);
        }, ie = (X) => {
          var U = gf();
          b(X, U);
        };
        H(ee, (X) => {
          s(r) === null ? X(te) : s(r).length ? X(se, 1) : X(ie, -1);
        });
      }
      b(N, F);
    };
    H(ke, (N) => {
      s(a) && N(he);
    });
  }
  D(() => {
    var N;
    R(x, ((N = s(i)) == null ? void 0 : N.title) || "Global section"), O !== (O = s(a)) && (M.value = (M.__value = O) ?? "", oa(M, O)), S.disabled = !s(i), T.disabled = !s(i);
  }), P("change", M, l), P("click", S, o), P("click", T, u), b(n, v), vt();
}
bt(["change", "click"]);
var yf = /* @__PURE__ */ k('<div class="make-global svelte-17w6cpd"><span class="mb-label">Make global section</span> <p class="mb-help svelte-17w6cpd"> </p> <div class="row svelte-17w6cpd"><input class="mb-input" placeholder="Name, e.g. Services band"/> <button type="button" class="mb-btn primary"><!> </button></div></div>'), kf = /* @__PURE__ */ k(`<header class="svelte-17w6cpd"><span class="ico svelte-17w6cpd"><!></span> <div class="h svelte-17w6cpd"><strong class="svelte-17w6cpd"> </strong> <span class="svelte-17w6cpd"> </span></div> <button type="button" class="mb-btn ghost icon sm" title="Clear selection (Esc)"><!></button></header> <div class="body mb-scroll svelte-17w6cpd"><div class="multi-actions svelte-17w6cpd"><button type="button" class="mb-btn svelte-17w6cpd"><!> Move up</button> <button type="button" class="mb-btn svelte-17w6cpd"><!> Move down</button> <button type="button" class="mb-btn svelte-17w6cpd"><!> Duplicate</button> <button type="button" class="mb-btn svelte-17w6cpd"><!> Copy</button> <button type="button" class="mb-btn svelte-17w6cpd"><!> Save as pattern</button> <button type="button" class="mb-btn danger svelte-17w6cpd"><!> Delete</button></div> <p class="mb-help">Shift+click selects a range, Ctrl/Cmd+click adds or removes a block. Copy, then paste with Ctrl+V on any page's builder.</p> <!></div>`, 1), wf = /* @__PURE__ */ k('<div class="none svelte-17w6cpd"><!> <strong class="svelte-17w6cpd">No block selected</strong> <p class="svelte-17w6cpd">Click a section in the preview, or pick one in the Outline, to edit its content and style.</p> <p class="tip svelte-17w6cpd">Tip: click any heading, label or button text in the preview to type directly on the page.</p> <p class="keys svelte-17w6cpd"><span class="mb-kbd">Ctrl+Z</span> undo · <span class="mb-kbd">Ctrl+S</span> save · <span class="mb-kbd">Del</span> remove</p></div>'), xf = /* @__PURE__ */ k('<div class="none svelte-17w6cpd"><strong class="svelte-17w6cpd"> </strong><p class="svelte-17w6cpd">The active theme has no schema for this type.</p></div>'), Sf = /* @__PURE__ */ k('<div class="body mb-scroll svelte-17w6cpd"><!></div>'), Ef = /* @__PURE__ */ k("<option> </option>"), Mf = /* @__PURE__ */ k('<div class="make-global svelte-17w6cpd"><span class="mb-label">Make global section</span> <p class="mb-help svelte-17w6cpd">Share this block across pages. Edit it once and every page that uses it updates.</p> <div class="row svelte-17w6cpd"><input class="mb-input" placeholder="Name, e.g. Footer call to action"/> <button type="button" class="mb-btn primary"><!> </button></div></div>'), Tf = /* @__PURE__ */ k('<!> <div class="field svelte-17w6cpd"><label class="mb-label" for="mb-type">Block type</label> <select id="mb-type" class="mb-input"></select></div> <!>', 1), Af = /* @__PURE__ */ k('<div class="tabs svelte-17w6cpd"><button type="button">Content</button> <button type="button">Style</button> <button type="button">Advanced</button></div> <div class="body mb-scroll svelte-17w6cpd"><!></div>', 1), Cf = /* @__PURE__ */ k('<header class="svelte-17w6cpd"><span class="ico svelte-17w6cpd"><!></span> <div class="h svelte-17w6cpd"><strong class="svelte-17w6cpd"> </strong> <span class="svelte-17w6cpd"> </span></div> <button type="button" class="mb-btn ghost icon sm" title="Deselect"><!></button></header> <!>', 1);
function Of(n, e) {
  dt(e, !0);
  let t = Qe(e, "savePattern", 3, () => {
  }), r = /* @__PURE__ */ I("content");
  const a = /* @__PURE__ */ le(() => e.store.selection);
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
  const l = /* @__PURE__ */ le(() => e.store.selected >= 0 ? e.store.blocks[e.store.selected] : null), o = /* @__PURE__ */ le(() => s(l) ? e.store.defFor(s(l).type) : null);
  kt(() => {
    s(l) && s(o) && (typeof s(l)[s(l).type] != "object" || Array.isArray(s(l)[s(l).type])) && (s(l)[s(l).type] = {});
  });
  let u = /* @__PURE__ */ I(""), v = /* @__PURE__ */ I(!1);
  async function g(j = [e.store.selected]) {
    const A = s(u).trim();
    if (A) {
      m(v, !0);
      try {
        const q = await e.store.makeGlobal(j, A);
        m(u, ""), e.store.flash(`“${q.title}” is now a global section. Insert it on other pages from Patterns → Global.`);
      } catch (q) {
        e.store.flash(q.message);
      }
      m(v, !1);
    }
  }
  async function E(j) {
    const A = j.currentTarget.value;
    j.currentTarget.value = s(l).type, await e.askConfirm({
      title: "Change block type",
      message: "Content that doesn’t fit the new block type is removed. Style settings are kept. You can undo this.",
      choices: [
        { label: "Cancel", value: !1 },
        { label: "Change type", value: !0, primary: !0 }
      ]
    }) && e.store.changeType(e.store.selected, A);
  }
  var f = Rt(), p = Me(f);
  {
    var x = (j) => {
      var A = kf(), q = Me(A), O = h(q), C = h(O);
      V(C, { name: "select", size: 16 });
      var S = d(O, 2), _ = h(S), T = Y(_), z = d(_, 2), W = Y(z, !0), re = d(S, 2), ke = h(re);
      V(ke, { name: "x", size: 14 });
      var he = d(q, 2), N = h(he), F = h(N), ee = h(F);
      V(ee, { name: "up", size: 14 });
      var te = d(F, 2), se = h(te);
      V(se, { name: "down", size: 14 });
      var ie = d(te, 2), X = h(ie);
      V(X, { name: "copy", size: 14 });
      var U = d(ie, 2), ae = h(U);
      V(ae, { name: "clipboard", size: 14 });
      var fe = d(U, 2), Se = h(fe);
      V(Se, { name: "template", size: 14 });
      var Pe = d(fe, 2), pe = h(Pe);
      V(pe, { name: "trash", size: 14 });
      var we = d(N, 4);
      {
        var ge = (oe) => {
          const $ = /* @__PURE__ */ le(() => s(a).filter((xe) => {
            var De;
            return ((De = e.store.blocks[xe]) == null ? void 0 : De.type) !== "global";
          }));
          var Te = yf(), Re = d(h(Te), 2), Ae = Y(Re), Be = d(Re, 2), Je = h(Be), ce = d(Je, 2), ue = h(ce);
          V(ue, { name: "globe", size: 14 });
          var ze = d(ue);
          D(
            (xe) => {
              R(Ae, `Turn ${s($).length === s(a).length ? `these ${s($).length} blocks` : `the ${s($).length} regular blocks`} into one shared section, placed where the first one is.`), ce.disabled = xe, R(ze, ` ${s(v) ? "Creating…" : "Create"}`);
            },
            [
              () => !s(u).trim() || s(v) || !s($).length
            ]
          ), P("keydown", Je, (xe) => xe.key === "Enter" && g(s($))), xn(Je, () => s(u), (xe) => m(u, xe)), P("click", ce, () => g(s($))), b(oe, Te);
        };
        H(we, (oe) => {
          e.store.isSection || oe(ge);
        });
      }
      D(
        (oe, $) => {
          R(T, `${s(a).length ?? ""} blocks selected`), R(W, oe), F.disabled = s(a)[0] === 0, te.disabled = $;
        },
        [
          () => s(a).map((oe) => {
            var $, Te, Re;
            return ((Te = e.store.defFor(($ = e.store.blocks[oe]) == null ? void 0 : $.type)) == null ? void 0 : Te.title) || ((Re = e.store.blocks[oe]) == null ? void 0 : Re.type);
          }).join(" · "),
          () => s(a).at(-1) === e.store.blocks.length - 1
        ]
      ), P("click", re, () => e.store.select(-1)), P("click", F, () => e.store.moveSelection(-1)), P("click", te, () => e.store.moveSelection(1)), P("click", ie, () => e.store.duplicateMany(s(a))), P("click", U, () => e.store.copyBlocks(s(a))), P("click", fe, function(...oe) {
        var $;
        ($ = t()) == null || $.apply(this, oe);
      }), P("click", Pe, i), b(j, A);
    }, M = (j) => {
      var A = wf(), q = h(A);
      V(q, { name: "settings", size: 26 }), b(j, A);
    }, y = (j) => {
      var A = xf(), q = h(A), O = Y(q);
      D(() => R(O, `Unknown block “${s(l).type ?? ""}”`)), b(j, A);
    }, L = (j) => {
      var A = Cf(), q = Me(A), O = h(q), C = h(O);
      V(C, {
        get fa() {
          return s(o).icon;
        },
        size: 16
      });
      var S = d(O, 2), _ = h(S), T = Y(_, !0), z = d(_, 2), W = Y(z, !0), re = d(S, 2), ke = h(re);
      V(ke, { name: "x", size: 14 });
      var he = d(q, 2);
      {
        var N = (ee) => {
          var te = Sf(), se = h(te);
          hl(se, () => e.store.selected, (ie) => {
            _f(ie, {
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
          }), b(ee, te);
        }, F = (ee) => {
          var te = Af(), se = Me(te), ie = h(se);
          let X;
          var U = d(ie, 2);
          let ae;
          var fe = d(U, 2);
          let Se;
          var Pe = d(se, 2), pe = h(Pe);
          hl(pe, () => e.store.selected + ":" + s(l).type, (we) => {
            var ge = Rt(), oe = Me(ge);
            {
              var $ = (Ae) => {
                var Be = Rt(), Je = Me(Be);
                Ie(Je, 17, () => s(o).fields, (ce) => ce.name, (ce, ue) => {
                  Da(ce, {
                    get field() {
                      return s(ue);
                    },
                    get target() {
                      return s(l)[s(l).type];
                    },
                    get store() {
                      return e.store;
                    }
                  });
                }), b(Ae, Be);
              }, Te = (Ae) => {
                yi(Ae, {
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
              }, Re = (Ae) => {
                var Be = Tf(), Je = Me(Be);
                yi(Je, {
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
                var ce = d(Je, 2), ue = d(h(ce), 2);
                Ie(ue, 21, () => e.store.catalog.blocks.filter((Ne) => !Ne.virtual), ht, (Ne, Ke) => {
                  var Ge = Ef(), Le = Y(Ge, !0), Ve = {};
                  D(() => {
                    R(Le, s(Ke).title), Ve !== (Ve = s(Ke).type) && (Ge.value = (Ge.__value = Ve) ?? "");
                  }), b(Ne, Ge);
                });
                var ze;
                pr(ue);
                var xe = d(ce, 2);
                {
                  var De = (Ne) => {
                    var Ke = Mf(), Ge = d(h(Ke), 4), Le = h(Ge), Ve = d(Le, 2), Gt = h(Ve);
                    V(Gt, { name: "globe", size: 14 });
                    var nt = d(Gt);
                    D(
                      (J) => {
                        Ve.disabled = J, R(nt, ` ${s(v) ? "Creating…" : "Create"}`);
                      },
                      [() => !s(u).trim() || s(v)]
                    ), P("keydown", Le, (J) => J.key === "Enter" && g()), xn(Le, () => s(u), (J) => m(u, J)), P("click", Ve, () => g()), b(Ne, Ke);
                  };
                  H(xe, (Ne) => {
                    e.store.isSection || Ne(De);
                  });
                }
                D(() => {
                  ze !== (ze = s(l).type) && (ue.value = (ue.__value = ze) ?? "", oa(ue, ze));
                }), P("change", ue, E), b(Ae, Be);
              };
              H(oe, (Ae) => {
                s(r) === "content" && s(l)[s(l).type] && typeof s(l)[s(l).type] == "object" ? Ae($) : s(r) === "style" ? Ae(Te, 1) : s(r) === "advanced" && Ae(Re, 2);
              });
            }
            b(we, ge);
          }), D(() => {
            X = _e(ie, 1, "svelte-17w6cpd", null, X, { active: s(r) === "content" }), ae = _e(U, 1, "svelte-17w6cpd", null, ae, { active: s(r) === "style" }), Se = _e(fe, 1, "svelte-17w6cpd", null, Se, { active: s(r) === "advanced" });
          }), P("click", ie, () => m(r, "content")), P("click", U, () => m(r, "style")), P("click", fe, () => m(r, "advanced")), b(ee, te);
        };
        H(he, (ee) => {
          s(l).type === "global" ? ee(N) : ee(F, -1);
        });
      }
      D(() => {
        R(T, s(o).title), R(W, s(o).description);
      }), P("click", re, () => e.store.select(-1)), b(j, A);
    };
    H(p, (j) => {
      s(a).length > 1 ? j(x) : s(l) ? s(o) ? j(L, -1) : j(y, 2) : j(M, 1);
    });
  }
  b(n, f), vt();
}
bt(["click", "keydown", "change"]);
const Ki = (n) => /^\d+$/.test(n), Na = (n) => Ki(n) ? Number(n) : n;
function zo(n) {
  return (!n[n.type] || typeof n[n.type] != "object" || Array.isArray(n[n.type])) && (n[n.type] = {}), n[n.type];
}
function Tl(n, e) {
  let t = n && n[n.type];
  for (const r of String(e).split(".")) {
    if (t == null) return;
    t = t[Na(r)];
  }
  return t;
}
function Pf(n, e, t) {
  const r = String(e).split(".");
  let a = zo(n);
  for (let l = 0; l < r.length - 1; l++) {
    const o = Na(r[l]);
    (a[o] == null || typeof a[o] != "object") && (a[o] = Ki(r[l + 1]) ? [] : {}), a = a[o];
  }
  const i = Na(r.at(-1));
  return (a[i] ?? "") === t ? !1 : (a[i] = t, !0);
}
function ha(n, e) {
  const t = String(e).split(".");
  let r = zo(n);
  for (let i = 0; i < t.length - 1; i++) {
    const l = Na(t[i]);
    (r[l] == null || typeof r[l] != "object") && (r[l] = {}), r = r[l];
  }
  const a = t.at(-1);
  return Array.isArray(r[a]) || (r[a] = []), r[a];
}
const zf = (n) => JSON.parse(JSON.stringify(n)), pa = {
  add(n, e) {
    return n.push(e), n.length - 1;
  },
  duplicate(n, e) {
    return n[e] === void 0 ? -1 : (n.splice(e + 1, 0, zf(n[e])), e + 1);
  },
  remove(n, e) {
    return n[e] === void 0 ? -1 : (n.splice(e, 1), Math.min(e, n.length - 1));
  },
  move(n, e, t) {
    if (t < 0 || t >= n.length || n[e] === void 0) return -1;
    const [r] = n.splice(e, 1);
    return n.splice(t, 0, r), t;
  }
};
function Do(n, e) {
  let t = n || [], r = null;
  for (const a of String(e).split("."))
    if (!Ki(a)) {
      if (r = t.find((i) => i.name === a) || null, !r) return null;
      t = r.fields || [];
    }
  return r;
}
function Df(n, e, t) {
  const r = [...new Set(e)].filter((o) => o >= 0 && o < n.length).sort((o, u) => o - u);
  if (!r.length || !t || r[0] + t < 0 || r.at(-1) + t >= n.length) return r;
  const a = r.map((o) => n[o]), i = n.filter((o, u) => !r.includes(u)), l = Math.max(0, Math.min(i.length, r[0] + t));
  return i.splice(l, 0, ...a), n.splice(0, n.length, ...i), a.map((o, u) => l + u);
}
const Al = (n) => JSON.stringify(n ?? null);
function Cl(n, e) {
  const t = n.length, r = e.length, a = Array.from({ length: t + 1 }, () => new Uint16Array(r + 1));
  for (let l = t - 1; l >= 0; l--)
    for (let o = r - 1; o >= 0; o--)
      a[l][o] = n[l] === e[o] ? a[l + 1][o + 1] + 1 : Math.max(a[l + 1][o], a[l][o + 1]);
  const i = [];
  for (let l = 0, o = 0; l < t && o < r; )
    n[l] === e[o] ? (i.push([l, o]), l++, o++) : a[l + 1][o] >= a[l][o + 1] ? l++ : o++;
  return i;
}
function La(n, e = "", t = {}) {
  if (Array.isArray(n) && n.length && n.every((r) => r === null || typeof r != "object")) {
    const r = n.filter((a) => a !== null && a !== "").map(String).join(", ");
    r && (t[e] = r);
  } else if (Array.isArray(n))
    n.forEach((r, a) => La(r, e ? `${e}.${a}` : String(a), t));
  else if (n && typeof n == "object")
    for (const [r, a] of Object.entries(n)) La(a, e ? `${e}.${r}` : r, t);
  else n != null && n !== "" && (t[e] = typeof n == "boolean" ? n ? "Yes" : "No" : String(n));
  return t;
}
const ga = (n) => String(n).replace(/[_-]+/g, " ").replace(/^\w/, (e) => e.toUpperCase());
function Nf(n, e, { defFor: t, settings: r } = {}) {
  var u;
  const a = e.split(".");
  if (a[0] !== n.type) {
    const v = (r || []).find((g) => g.name === a[0]);
    return [(v == null ? void 0 : v.label) || ga(a[0]), ...a.slice(1).map((g) => /^\d+$/.test(g) ? String(Number(g) + 1) : ga(g))].join(" › ");
  }
  const i = ((u = t == null ? void 0 : t(n.type)) == null ? void 0 : u.fields) || [], l = [], o = [];
  for (const v of a.slice(1)) {
    if (o.push(v), /^\d+$/.test(v)) {
      l.push(String(Number(v) + 1));
      continue;
    }
    const g = Do(i, o.join("."));
    l.push((g == null ? void 0 : g.label) || ga(v));
  }
  return l.join(" › ") || ga(n.type);
}
function ni(n, e, t) {
  const r = La(n), a = La(e);
  return [.../* @__PURE__ */ new Set([...Object.keys(r), ...Object.keys(a)])].filter((l) => l !== "type" && r[l] !== a[l]).map((l) => ({ path: l, label: Nf(e || n, l, t), before: r[l] ?? "", after: a[l] ?? "" }));
}
function Lf(n = [], e = [], t = {}) {
  const r = n.map(Al), a = e.map(Al), i = new Array(n.length).fill(-1), l = new Array(e.length).fill(-1), o = {}, u = (f, p, x) => {
    i[f] = p, l[p] = f, o[p] = x;
  };
  for (const [f, p] of Cl(r, a)) u(f, p, "same");
  for (let f = 0; f < e.length; f++) {
    if (l[f] >= 0) continue;
    const p = r.findIndex((x, M) => i[M] < 0 && x === a[f]);
    p >= 0 && u(p, f, "moved");
  }
  const v = n.map((f, p) => p).filter((f) => i[f] < 0), g = e.map((f, p) => p).filter((f) => l[f] < 0);
  for (const [f, p] of Cl(v.map((x) => {
    var M;
    return (M = n[x]) == null ? void 0 : M.type;
  }), g.map((x) => {
    var M;
    return (M = e[x]) == null ? void 0 : M.type;
  })))
    u(v[f], g[p], "changed");
  const E = [];
  return e.forEach((f, p) => {
    const x = l[p];
    if (x < 0)
      E.push({ status: "added", type: f.type, before: null, after: f, from: -1, to: p, changes: ni(null, f, t), sort: p });
    else {
      const M = o[p] === "changed" ? ni(n[x], f, t) : [];
      E.push({ status: o[p], type: f.type, before: n[x], after: f, from: x, to: p, changes: M, sort: p });
    }
  }), n.forEach((f, p) => {
    if (i[p] >= 0) return;
    let x = -1;
    for (let M = p - 1; M >= 0; M--) if (i[M] >= 0) {
      x = i[M];
      break;
    }
    E.push({ status: "removed", type: f.type, before: f, after: null, from: p, to: -1, changes: ni(f, null, t), sort: x + 0.5 + p / 1e6 });
  }), E.sort((f, p) => f.sort - p.sort), E.map(({ sort: f, ...p }) => p);
}
function Rf(n) {
  const e = { added: 0, removed: 0, changed: 0, moved: 0 };
  for (const t of n) t.status in e && e[t.status]++;
  return e;
}
var jf = /* @__PURE__ */ k('<button type="button" class="mb-btn">Close</button> <button type="button" class="mb-btn primary"><!> </button>', 1), If = /* @__PURE__ */ k('<p class="error svelte-mmrwym"> </p>'), qf = /* @__PURE__ */ k('<p class="muted svelte-mmrwym">Loading versions…</p>'), Ff = /* @__PURE__ */ k("<span> </span>"), Bf = /* @__PURE__ */ k('<span class="pos svelte-mmrwym"> </span>'), Uf = /* @__PURE__ */ k('<img alt="" class="svelte-mmrwym"/>'), Hf = /* @__PURE__ */ k('<em class="svelte-mmrwym">empty</em>'), Kf = /* @__PURE__ */ k('<span class="val svelte-mmrwym"> </span>'), Gf = /* @__PURE__ */ k("<td><!> <!></td>"), Vf = /* @__PURE__ */ k('<tr><td class="svelte-mmrwym"></td><td colspan="2" class="svelte-mmrwym"><button type="button" class="link svelte-mmrwym"> </button></td></tr>'), Jf = /* @__PURE__ */ k('<tr><td class="field svelte-mmrwym"> </td><!></tr> <!>', 1), Yf = /* @__PURE__ */ k('<table class="svelte-mmrwym"><thead><tr><th class="svelte-mmrwym">Field</th><th class="svelte-mmrwym">Before</th><th class="svelte-mmrwym">After</th></tr></thead><tbody></tbody></table>'), Wf = /* @__PURE__ */ k('<li><header class="svelte-mmrwym"><span> </span> <strong class="svelte-mmrwym"> </strong> <span class="sum svelte-mmrwym"> </span> <!></header> <!></li>'), Xf = /* @__PURE__ */ k('<li class="muted svelte-mmrwym">Nothing to show.</li>'), Zf = /* @__PURE__ */ k('<p class="counts svelte-mmrwym"><!></p> <ol class="rows svelte-mmrwym"></ol>', 1), Qf = /* @__PURE__ */ k('<div class="bar svelte-mmrwym"><div class="seg svelte-mmrwym" role="group" aria-label="Compare with"><button type="button"> </button> <button type="button"> </button></div> <label class="same svelte-mmrwym"><input type="checkbox"/> Show unchanged</label></div> <!>', 1);
function $f(n, e) {
  dt(e, !0);
  let t = Qe(e, "previous", 3, null), r = /* @__PURE__ */ I(
    "current"
    // current | previous
  ), a = /* @__PURE__ */ I(null), i = /* @__PURE__ */ I(null), l = /* @__PURE__ */ I(""), o = /* @__PURE__ */ I(!1), u = et({});
  kt(() => {
    m(l, ""), Xe.revision(e.store.context, e.rev.id).then((O) => m(a, En(O.blocks || [], e.store.settingKeys), !0)).catch((O) => m(l, O.message, !0));
  }), kt(() => {
    s(r) !== "previous" || !t() || s(i) || Xe.revision(e.store.context, t().id).then((O) => m(i, En(O.blocks || [], e.store.settingKeys), !0)).catch((O) => m(l, O.message, !0));
  });
  const v = /* @__PURE__ */ le(() => {
    var O;
    return {
      defFor: (C) => e.store.defFor(C),
      settings: ((O = e.store.catalog) == null ? void 0 : O.settings) || []
    };
  }), g = /* @__PURE__ */ le(() => s(r) === "previous" ? [s(i), s(a)] : [s(a), e.store.snapshot()]), E = /* @__PURE__ */ le(() => s(g)[0] && s(g)[1] ? Lf(s(g)[0], s(g)[1], s(v)) : null), f = /* @__PURE__ */ le(() => s(E) ? Rf(s(E)) : null), p = /* @__PURE__ */ le(() => s(E) ? s(E).filter((O) => s(o) || O.status !== "same") : []), x = {
    added: "Added",
    removed: "Removed",
    changed: "Edited",
    moved: "Moved",
    same: "Unchanged"
  }, M = /\.(jpe?g|png|gif|webp|avif|svg)$/i, y = 180;
  function L(O) {
    var S, _;
    const C = O.after || O.before;
    return C.type === "global" ? "Global · " + e.store.sectionTitle((S = C.global) == null ? void 0 : S.section) : ((_ = e.store.defFor(C.type)) == null ? void 0 : _.title) || C.type;
  }
  function j(O) {
    return !M.test(O) || /^(https?:)?\/\//.test(O) || O.startsWith("user://") ? "" : e.store.pageMediaUrl(O);
  }
  const A = (O) => O.length > y, q = (O, C) => A(O) && !u[C] ? O.slice(0, y) + "…" : O;
  za(n, {
    title: "Compare versions",
    wide: !0,
    get onclose() {
      return e.onclose;
    },
    actions: (C) => {
      var S = jf(), _ = Me(S), T = d(_, 2), z = h(T);
      V(z, { name: "history", size: 14 });
      var W = d(z);
      D((re) => R(W, ` Restore ${re ?? ""}`), [() => e.when(e.rev.time)]), P("click", _, function(...re) {
        var ke;
        (ke = e.onclose) == null || ke.apply(this, re);
      }), P("click", T, () => e.onrestore(e.rev)), b(C, S);
    },
    children: (C, S) => {
      var _ = Qf(), T = Me(_), z = h(T), W = h(z);
      let re;
      var ke = Y(W), he = d(W, 2);
      let N;
      var F = Y(he, !0), ee = d(z, 2), te = h(ee), se = d(T, 2);
      {
        var ie = (ae) => {
          var fe = If(), Se = Y(fe, !0);
          D(() => R(Se, s(l))), b(ae, fe);
        }, X = (ae) => {
          var fe = qf();
          b(ae, fe);
        }, U = (ae) => {
          var fe = Zf(), Se = Me(fe), Pe = h(Se);
          {
            var pe = (oe) => {
              var $ = Zt("No differences.");
              b(oe, $);
            }, we = (oe) => {
              var $ = Rt(), Te = Me($);
              Ie(
                Te,
                16,
                () => [
                  ["changed", "edited"],
                  ["added", "added"],
                  ["removed", "removed"],
                  ["moved", "moved"]
                ],
                ht,
                (Re, Ae) => {
                  var Be = /* @__PURE__ */ le(() => Ua(Ae, 2));
                  let Je = () => s(Be)[0], ce = () => s(Be)[1];
                  var ue = Rt(), ze = Me(ue);
                  {
                    var xe = (De) => {
                      var Ne = Ff(), Ke = Y(Ne);
                      D(() => {
                        _e(Ne, 1, `pill ${Je() ?? ""}`, "svelte-mmrwym"), R(Ke, `${s(f)[Je()] ?? ""} ${ce() ?? ""}`);
                      }), b(De, Ne);
                    };
                    H(ze, (De) => {
                      s(f)[Je()] && De(xe);
                    });
                  }
                  b(Re, ue);
                }
              ), b(oe, $);
            };
            H(Pe, (oe) => {
              !s(f).added && !s(f).removed && !s(f).changed && !s(f).moved ? oe(pe) : oe(we, -1);
            });
          }
          var ge = d(Se, 2);
          Ie(
            ge,
            23,
            () => s(p),
            (oe, $) => $ + oe.status + oe.from + ":" + oe.to,
            (oe, $, Te) => {
              var Re = Wf(), Ae = h(Re), Be = h(Ae), Je = Y(Be, !0), ce = d(Be, 2), ue = Y(ce, !0), ze = d(ce, 2), xe = Y(ze, !0), De = d(ze, 2);
              {
                var Ne = (Le) => {
                  var Ve = Bf(), Gt = Y(Ve);
                  D(() => R(Gt, `position ${s($).from + 1} → ${s($).to + 1}`)), b(Le, Ve);
                };
                H(De, (Le) => {
                  s($).status === "moved" && Le(Ne);
                });
              }
              var Ke = d(Ae, 2);
              {
                var Ge = (Le) => {
                  var Ve = Yf(), Gt = d(h(Ve));
                  Ie(Gt, 21, () => s($).changes, (nt) => nt.path, (nt, J) => {
                    const Q = /* @__PURE__ */ le(() => s(Te) + s(J).path);
                    var de = Jf(), G = Me(de), je = h(G), Ue = Y(je, !0), lt = d(je);
                    Ie(lt, 17, () => [s(J).before, s(J).after], ht, (xt, qt, jn) => {
                      var vn = Gf();
                      _e(vn, 1, mi(jn ? "after" : "before"), "svelte-mmrwym");
                      var In = h(vn);
                      {
                        var ot = (Mt) => {
                          var St = Uf();
                          D((qn) => be(St, "src", qn), [() => j(s(qt))]), b(Mt, St);
                        }, mt = /* @__PURE__ */ le(() => j(s(qt)));
                        H(In, (Mt) => {
                          s(mt) && Mt(ot);
                        });
                      }
                      var zt = d(In, 2);
                      {
                        var nn = (Mt) => {
                          var St = Hf();
                          b(Mt, St);
                        }, Sn = (Mt) => {
                          var St = Kf(), qn = Y(St, !0);
                          D((Zs) => R(qn, Zs), [() => q(s(qt), s(Q))]), b(Mt, St);
                        };
                        H(zt, (Mt) => {
                          s(qt) === "" ? Mt(nn) : Mt(Sn, -1);
                        });
                      }
                      b(xt, vn);
                    });
                    var wt = d(G, 2);
                    {
                      var Vt = (xt) => {
                        var qt = Vf(), jn = d(h(qt)), vn = h(jn), In = Y(vn, !0);
                        D(() => R(In, u[s(Q)] ? "Show less" : "Show full text")), P("click", vn, () => u[s(Q)] = !u[s(Q)]), b(xt, qt);
                      }, Pt = /* @__PURE__ */ le(() => A(s(J).before) || A(s(J).after));
                      H(wt, (xt) => {
                        s(Pt) && xt(Vt);
                      });
                    }
                    D(() => R(Ue, s(J).label)), b(nt, de);
                  }), b(Le, Ve);
                };
                H(Ke, (Le) => {
                  s($).status === "changed" && Le(Ge);
                });
              }
              D(
                (Le, Ve) => {
                  _e(Re, 1, `row ${s($).status ?? ""}`, "svelte-mmrwym"), _e(Be, 1, `pill ${s($).status ?? ""}`, "svelte-mmrwym"), R(Je, x[s($).status]), R(ue, Le), R(xe, Ve);
                },
                [
                  () => L(s($)),
                  () => Hi(s($).after || s($).before)
                ]
              ), b(oe, Re);
            },
            (oe) => {
              var $ = Xf();
              b(oe, $);
            }
          ), b(ae, fe);
        };
        H(se, (ae) => {
          s(l) ? ae(ie) : s(E) ? ae(U, -1) : ae(X, 1);
        });
      }
      D(
        (ae, fe) => {
          re = _e(W, 1, "svelte-mmrwym", null, re, { active: s(r) === "current" }), R(ke, `${ae ?? ""} → current editor`), he.disabled = !t(), be(he, "title", t() ? "" : "This is the oldest saved version"), N = _e(he, 1, "svelte-mmrwym", null, N, { active: s(r) === "previous" }), R(F, fe);
        },
        [
          () => e.when(e.rev.time),
          () => t() ? `${e.when(t().time)} → ${e.when(e.rev.time)}` : "No earlier version"
        ]
      ), P("click", W, () => m(r, "current")), P("click", he, () => m(r, "previous")), Yu(te, () => s(o), (ae) => m(o, ae)), b(C, _);
    },
    $$slots: { actions: !0, default: !0 }
  }), vt();
}
bt(["click"]);
var eh = /* @__PURE__ */ k('<p class="error svelte-19n2gxs"> </p>'), th = /* @__PURE__ */ k('<p class="muted svelte-19n2gxs">Loading history…</p>'), nh = /* @__PURE__ */ k('<span class="time svelte-19n2gxs"> </span>'), sh = /* @__PURE__ */ k('<li><span class="dot svelte-19n2gxs"></span> <div class="body"><div class="row svelte-19n2gxs"><strong> </strong> <!></div> <div class="meta svelte-19n2gxs"> </div> <div class="types svelte-19n2gxs"> </div> <div class="btns svelte-19n2gxs"><button type="button" class="mb-btn sm" title="See what changed"><!> Compare</button> <button type="button" class="mb-btn sm"><!> </button></div></div></li>'), rh = /* @__PURE__ */ k('<p class="muted svelte-19n2gxs">No saved versions yet. Versions appear here after you save.</p>'), ah = /* @__PURE__ */ k('<div class="head svelte-19n2gxs"><p class="hint svelte-19n2gxs"> </p> <button type="button" class="mb-btn ghost icon sm" title="Refresh"><!></button></div> <!> <!> <ol class="timeline svelte-19n2gxs"></ol> <!>', 1);
function ih(n, e) {
  dt(e, !0);
  let t = Qe(e, "store", 7), r = /* @__PURE__ */ I(
    -1
    // index into items while the compare dialog is open
  );
  kt(() => {
    if (!(s(r) < 0))
      return t().modal = { close: () => m(r, -1) }, () => {
        t().modal = null;
      };
  });
  let a = /* @__PURE__ */ I(et([])), i = /* @__PURE__ */ I(!1), l = /* @__PURE__ */ I(""), o = /* @__PURE__ */ I("");
  async function u() {
    if (t().canPreview) {
      m(i, !0), m(l, "");
      try {
        const T = await Xe.revisions(t().context);
        m(a, (T == null ? void 0 : T.items) || [], !0);
      } catch (T) {
        m(l, T.message, !0);
      }
      m(i, !1);
    }
  }
  kt(() => {
    JSON.stringify(t().context), t().revisionTick, u();
  });
  function v(T) {
    const z = Math.round(Date.now() / 1e3 - T);
    return z < 45 ? "just now" : z < 3600 ? `${Math.round(z / 60)} min ago` : z < 86400 ? `${Math.round(z / 3600)} h ago` : new Date(T * 1e3).toLocaleString(void 0, { dateStyle: "medium", timeStyle: "short" });
  }
  function g(T) {
    const z = (T.types || []).map((W) => {
      var re;
      return W === "global" ? "Global" : ((re = t().defFor(W)) == null ? void 0 : re.title) || W;
    });
    return z.length > 4 ? z.slice(0, 4).join(" · ") + ` · +${z.length - 4}` : z.join(" · ");
  }
  async function E(T, z) {
    if (await e.askConfirm({
      title: "Restore this version?",
      message: `Loads the version from ${v(T.time)} into the editor. You can undo it, and nothing is saved until you click ${t().isSection ? "Save section" : "Update"}.`,
      choices: [
        { label: "Cancel", value: !1 },
        { label: "Restore", value: !0, primary: !0 }
      ]
    })) {
      m(o, T.id, !0);
      try {
        const re = await Xe.revision(t().context, T.id);
        t().insertMany(re.blocks || [], null, !0), t().busy = "Restoring version…", t().flash(z === 0 ? "Restored the last saved version" : `Restored version from ${v(T.time)}. Click ${t().isSection ? "Save section" : "Update"} to keep it.`);
      } catch (re) {
        t().flash(re.message);
      }
      m(o, "");
    }
  }
  var f = ah(), p = Me(f), x = h(p), M = Y(x), y = d(x, 2), L = h(y);
  V(L, { name: "refresh", size: 13 });
  var j = d(p, 2);
  {
    var A = (T) => {
      var z = eh(), W = Y(z, !0);
      D(() => R(W, s(l))), b(T, z);
    };
    H(j, (T) => {
      s(l) && T(A);
    });
  }
  var q = d(j, 2);
  {
    var O = (T) => {
      var z = th();
      b(T, z);
    };
    H(q, (T) => {
      s(i) && !s(a).length && T(O);
    });
  }
  var C = d(q, 2);
  Ie(
    C,
    23,
    () => s(a),
    (T) => T.id,
    (T, z, W) => {
      var re = sh();
      let ke;
      var he = d(h(re), 2), N = h(he), F = h(N), ee = Y(F, !0), te = d(F, 2);
      {
        var se = (oe) => {
          var $ = nh(), Te = Y($, !0);
          D((Re) => R(Te, Re), [() => v(s(z).time)]), b(oe, $);
        };
        H(te, (oe) => {
          s(W) === 0 && oe(se);
        });
      }
      var ie = d(N, 2), X = Y(ie), U = d(ie, 2), ae = Y(U, !0), fe = d(U, 2), Se = h(fe), Pe = h(Se);
      V(Pe, { name: "layers", size: 12 });
      var pe = d(Se, 2), we = h(pe);
      V(we, { name: "history", size: 12 });
      var ge = d(we);
      D(
        (oe, $) => {
          ke = _e(re, 1, "svelte-19n2gxs", null, ke, { latest: s(W) === 0 }), R(ee, oe), R(X, `${s(z).count ?? ""} ${s(z).count === 1 ? "block" : "blocks"}${s(z).user ? ` · ${s(z).user}` : ""}${s(z).label ? ` · ${s(z).label}` : ""}`), R(ae, $), pe.disabled = s(o) === s(z).id || t().readOnly, R(ge, ` ${s(o) === s(z).id ? "Restoring…" : "Restore"}`);
        },
        [
          () => s(W) === 0 ? "Last saved" : v(s(z).time),
          () => g(s(z))
        ]
      ), P("click", Se, () => m(r, s(W), !0)), P("click", pe, () => E(s(z), s(W))), b(T, re);
    },
    (T) => {
      var z = Rt(), W = Me(z);
      {
        var re = (ke) => {
          var he = rh();
          b(ke, he);
        };
        H(W, (ke) => {
          !s(i) && !s(l) && ke(re);
        });
      }
      b(T, z);
    }
  );
  var S = d(C, 2);
  {
    var _ = (T) => {
      {
        let z = /* @__PURE__ */ le(() => s(a)[s(r) + 1] || null);
        $f(T, {
          get store() {
            return t();
          },
          when: v,
          get rev() {
            return s(a)[s(r)];
          },
          get previous() {
            return s(z);
          },
          onclose: () => m(r, -1),
          onrestore: (W) => {
            const re = s(r);
            m(r, -1), E(W, re);
          }
        });
      }
    };
    H(S, (T) => {
      s(r) >= 0 && s(a)[s(r)] && T(_);
    });
  }
  D(() => R(M, `Every save keeps a version${t().isSection ? " of this global section" : ""}. Restore any of them. You can undo, and nothing is saved until you choose to.`)), P("click", y, u), b(n, f), vt();
}
bt(["click"]);
var lh = /* @__PURE__ */ k('<button type="button"><!></button>'), oh = /* @__PURE__ */ k("<span> </span>"), ch = /* @__PURE__ */ k('<span class="avatar more svelte-1nqlp8n"> </span>'), uh = /* @__PURE__ */ k('<div class="avatars svelte-1nqlp8n" role="group" aria-label="Also open"><!> <!></div> <div class="sep svelte-1nqlp8n"></div>', 1), dh = /* @__PURE__ */ k('<span class="mini-spin svelte-1nqlp8n"></span> Saving…', 1), vh = /* @__PURE__ */ k("<!> Update", 1), fh = /* @__PURE__ */ k('<button type="button" class="mb-btn"><!> Save as pattern</button> <button type="button" class="mb-btn primary" title="Save page (Ctrl+S)"><!></button>', 1), hh = /* @__PURE__ */ k('<button type="button" class="mb-btn"><!> Back to page</button> <button type="button" class="mb-btn primary global-save svelte-1nqlp8n" title="Save global section (Ctrl+S)"><!> </button>', 1), ph = /* @__PURE__ */ k(`<div class="section-banner svelte-1nqlp8n" role="status"><!> <span class="svelte-1nqlp8n">Editing global section <strong> </strong>. Changes apply everywhere it's used<!>.</span> <button type="button" class="link svelte-1nqlp8n">Back to page</button></div>`), gh = /* @__PURE__ */ k("<strong> </strong> ", 1), bh = /* @__PURE__ */ k('<div class="notice lock-notice svelte-1nqlp8n" role="status"><!> <span class="svelte-1nqlp8n"><!></span> <button type="button" class="link svelte-1nqlp8n"> </button></div>'), mh = /* @__PURE__ */ k('<div class="notice lock-notice svelte-1nqlp8n" role="alert"><!> <span class="svelte-1nqlp8n"><strong> </strong> </span> <button type="button" class="link svelte-1nqlp8n">OK</button></div>'), _h = /* @__PURE__ */ k('<div class="notice stale-notice svelte-1nqlp8n" role="alert"><!> <span class="svelte-1nqlp8n"> </span> <button type="button" class="link svelte-1nqlp8n">Load latest</button> <button type="button" class="link svelte-1nqlp8n">Keep mine</button></div>'), yh = /* @__PURE__ */ k('<div class="notice error-notice svelte-1nqlp8n" role="alert"><!> <span class="svelte-1nqlp8n"> </span> <button type="button" class="link svelte-1nqlp8n">Try again</button> <button type="button" class="link svelte-1nqlp8n">Dismiss</button></div>'), kh = /* @__PURE__ */ k('<div class="notice recovery-notice svelte-1nqlp8n" role="status"><!> <span class="svelte-1nqlp8n"> </span> <button type="button" class="link svelte-1nqlp8n">Restore</button> <button type="button" class="link svelte-1nqlp8n">Discard</button></div>'), wh = /* @__PURE__ */ k('<p class="error svelte-1nqlp8n"> </p>'), xh = /* @__PURE__ */ k('<p class="muted svelte-1nqlp8n">Loading blocks…</p>'), Sh = /* @__PURE__ */ k('<button type="button" class="edge-tab left svelte-1nqlp8n" title="Show left panel"><!></button>'), Eh = /* @__PURE__ */ k('<button type="button" class="edge-tab right svelte-1nqlp8n" title="Show settings panel"><!></button>'), Mh = /* @__PURE__ */ k('<div class="toast svelte-1nqlp8n" role="status"> </div>'), Th = /* @__PURE__ */ k('<button type="button" class="mb-btn svelte-1nqlp8n">Cancel</button> <button type="button" class="mb-btn primary svelte-1nqlp8n">Save pattern</button>', 1), Ah = /* @__PURE__ */ k("<option> </option>"), Ch = /* @__PURE__ */ k('<label class="mb-label" for="mb-pattern-title">Name</label> <input id="mb-pattern-title" class="mb-input" placeholder="e.g. Services intro"/> <div class="grid2 svelte-1nqlp8n"><div><span class="mb-label">Contains</span> <select class="mb-input"><!><option> </option></select></div> <div><span class="mb-label">Type</span> <select class="mb-input"><option>Section</option><option>Full page layout</option></select></div></div>', 1), Oh = /* @__PURE__ */ k('<button type="button"> </button>'), Ph = /* @__PURE__ */ k("<p> </p>"), zh = /* @__PURE__ */ k('<div><header class="top svelte-1nqlp8n"><div class="left svelte-1nqlp8n"><button type="button" class="mb-btn ghost icon" title="Close builder (Esc)"><!></button> <div class="brand svelte-1nqlp8n"><span class="logo svelte-1nqlp8n"><!></span> <div><div class="page svelte-1nqlp8n"> </div> <div class="route svelte-1nqlp8n"> </div></div></div> <div class="sep svelte-1nqlp8n"></div> <button type="button" class="mb-btn ghost icon" title="Undo (Ctrl+Z)"><!></button> <button type="button" class="mb-btn ghost icon" title="Redo (Ctrl+Shift+Z)"><!></button> <div class="sep svelte-1nqlp8n"></div> <button type="button"><!></button></div> <div class="devices svelte-1nqlp8n" role="group" aria-label="Preview width"></div> <div class="right svelte-1nqlp8n"><!> <button type="button" class="mb-btn ghost icon" title="Copy selected blocks (Ctrl+C)"><!></button> <button type="button" class="mb-btn ghost icon" title="Paste blocks (Ctrl+V)"><!></button> <button type="button" class="mb-btn ghost icon" title="Refresh preview"><!></button> <!> <div class="sep svelte-1nqlp8n"></div> <button type="button"><!></button></div></header> <!> <!> <!> <!> <div><aside><div class="tabs svelte-1nqlp8n" role="tablist"><button type="button" role="tab"><!> Blocks</button> <button type="button" role="tab"><!> Patterns</button> <button type="button" role="tab"><!> Outline</button> <button type="button" role="tab" title="Saved versions"><!> History</button></div> <div class="panel-body mb-scroll svelte-1nqlp8n"><!></div></aside> <main class="canvas-wrap svelte-1nqlp8n"><!> <!> <!></main> <aside><div class="resize-handle svelte-1nqlp8n" role="separator" aria-orientation="vertical" aria-label="Resize settings panel" tabindex="0" title="Drag to resize · double-click to reset"></div> <div class="inspector-wrap svelte-1nqlp8n"><!></div></aside></div> <!> <!> <!></div>');
function Dh(n, e) {
  dt(e, !0);
  let t = Qe(e, "store", 7), r = /* @__PURE__ */ I(
    "blocks"
    // blocks | patterns | outline | history
  ), a = /* @__PURE__ */ I(
    "desktop"
    // desktop | tablet | mobile
  ), i = /* @__PURE__ */ I(
    null
    // {kind, ...}
  ), l = /* @__PURE__ */ I(void 0);
  const o = /Mac|iPhone|iPad/.test(navigator.platform);
  Xs(() => {
    t().load();
    const w = (Ee) => g(Ee), B = () => m(r, "blocks"), Z = (Ee) => {
      var He;
      if (!t().open || s(i) || t().modal || t().imagePick || v(Ee)) return;
      const Oe = ((He = Ee.clipboardData) == null ? void 0 : He.getData("text/plain")) || "";
      t().pasteBlocks(Oe).then((Ye) => {
        Ye || t().flash("The clipboard has no blocks. Copy blocks in a builder first.");
      }), Ee.preventDefault();
    }, me = (Ee) => {
      !s(i) && !t().imagePick && t().pasteBlocks(Ee.detail).then((Oe) => {
        Oe || t().flash("The clipboard has no blocks.");
      });
    }, Ce = () => t().refreshClipboard();
    return window.addEventListener("keydown", w, !0), document.addEventListener("paste", Z, !0), document.addEventListener("maw-paste-text", me), document.addEventListener("maw-open-inserter", B), window.addEventListener("storage", Ce), window.addEventListener("focus", Ce), () => {
      window.removeEventListener("keydown", w, !0), document.removeEventListener("paste", Z, !0), document.removeEventListener("maw-paste-text", me), document.removeEventListener("maw-open-inserter", B), window.removeEventListener("storage", Ce), window.removeEventListener("focus", Ce);
    };
  });
  const u = /* @__PURE__ */ le(() => t().presence);
  function v(w) {
    const B = w.composedPath()[0];
    return B && (B.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(B.tagName));
  }
  function g(w) {
    var Ce, Ee;
    if (!t().open || w.__mawSave) return;
    const B = o ? w.metaKey : w.ctrlKey, Z = w.key.toLowerCase();
    if (B && Z === "s") {
      w.preventDefault(), w.stopPropagation(), t().isSection ? p() : E();
      return;
    }
    if (B && Z === "z" && !v(w)) {
      w.preventDefault(), w.stopPropagation(), w.shiftKey ? t().redo() : t().undo();
      return;
    }
    if (B && Z === "y" && !v(w)) {
      w.preventDefault(), w.stopPropagation(), t().redo();
      return;
    }
    if (B && w.code === "Backslash") {
      w.preventDefault(), w.stopPropagation(), w.altKey ? m(z, !s(z)) : m(T, !s(T));
      return;
    }
    if (t().imagePick) {
      Z === "escape" && (t().imagePick = null, w.stopPropagation());
      return;
    }
    if (s(i)) {
      Z === "escape" && ((Ee = (Ce = s(i)).resolve) == null || Ee.call(Ce, null), m(i, null), w.stopPropagation());
      return;
    }
    if (t().modal) {
      Z === "escape" && (t().modal.close(), w.stopPropagation());
      return;
    }
    if (v(w)) return;
    if (Z === "escape") {
      w.stopPropagation(), t().selection.length > 1 ? t().select(t().selected) : t().selected >= 0 ? t().select(-1) : M();
      return;
    }
    if (B && Z === "a") {
      w.preventDefault(), w.stopPropagation(), t().selectAll();
      return;
    }
    if (t().selected < 0) return;
    const me = t().selection;
    Z === "delete" || Z === "backspace" ? (w.preventDefault(), w.stopPropagation(), t().removeMany(me)) : B && Z === "d" ? (w.preventDefault(), w.stopPropagation(), t().duplicateMany(me)) : B && Z === "c" ? (w.preventDefault(), w.stopPropagation(), t().copyBlocks(me)) : B && Z === "x" ? (w.preventDefault(), w.stopPropagation(), t().cutBlocks(me)) : w.altKey && Z === "arrowup" ? (w.preventDefault(), t().moveSelection(-1)) : w.altKey && Z === "arrowdown" && (w.preventDefault(), t().moveSelection(1));
  }
  async function E() {
    var me;
    if (t().isSection) return p();
    if (t().readOnly || t().saving) return;
    const w = t().snapshot(), B = t().dirty, Z = new KeyboardEvent("keydown", {
      key: "s",
      code: "KeyS",
      ctrlKey: !o,
      metaKey: o,
      bubbles: !0,
      cancelable: !0
    });
    if (Z.__mawSave = !0, window.dispatchEvent(Z), !B) {
      setTimeout(() => t().refreshBase(), 2500);
      return;
    }
    await t().confirmSaved(w) && ((me = s(u)) == null || me.acknowledgeStale(), t().flash("Saved"));
  }
  async function f() {
    var B;
    if (t().isSection) {
      await t().reloadSection(), (B = s(u)) == null || B.acknowledgeStale();
      return;
    }
    await j({
      title: "Load the latest version?",
      message: "The admin page reloads with the saved version. Your unsaved changes on this page are discarded.",
      choices: [
        { label: "Cancel", value: !1 },
        { label: "Reload page", value: !0, primary: !0 }
      ]
    }) && (t().clearBackup(), t().dirty = !1, location.reload());
  }
  async function p() {
    if (!t().readOnly) {
      try {
        await t().saveSection();
      } catch (w) {
        if (w.status !== 409)
          return t().flash(w.message), !1;
        const B = await j({
          title: "Global section changed meanwhile",
          message: `${w.message} Overwrite their changes with yours, or load their version (your edits are discarded)?`,
          choices: [
            { label: "Cancel", value: null },
            { label: "Load their version", value: "reload" },
            { label: "Overwrite", value: "force", primary: !0 }
          ]
        });
        try {
          if (B === "force") await t().saveSection(!0);
          else return B === "reload" && await t().reloadSection(), !1;
        } catch (Z) {
          return t().flash(Z.message), !1;
        }
      }
      return !0;
    }
  }
  async function x() {
    var w;
    if (t().sectionDirty) {
      const B = await j({
        title: "Unsaved global section changes",
        message: `Save changes to “${(w = t().editingSection) == null ? void 0 : w.title}” before going back to the page?`,
        choices: [
          { label: "Cancel", value: null },
          { label: "Discard", value: "discard" },
          { label: "Save & go back", value: "save", primary: !0 }
        ]
      });
      if (!B || B === "save" && !await p()) return;
      B === "discard" && t().clearBackup();
    }
    t().closeSection();
  }
  function M() {
    if (t().isSection) return x();
    e.close();
  }
  function y() {
    t().selected < 0 && !t().blocks.length || m(
      i,
      {
        kind: "pattern",
        title: "",
        category: "section",
        scope: t().selected >= 0 ? "selected" : "all",
        indexes: [...t().selection]
      },
      !0
    );
  }
  async function L() {
    const w = s(i);
    if (!w.title.trim()) return;
    const B = w.scope === "selected" ? w.indexes : t().blocks.map((Z, me) => me);
    try {
      await t().savePattern(w.title.trim(), w.category, B), t().flash(`Pattern “${w.title.trim()}” saved`), m(i, null), m(r, "patterns");
    } catch (Z) {
      t().flash(Z.message);
    }
  }
  function j(w) {
    return new Promise((B) => {
      m(i, { kind: "confirm", ...w, resolve: B }, !0);
    });
  }
  const A = "maw-builder:layout", q = 280, O = 640, C = 340, S = 300, _ = (() => {
    try {
      return JSON.parse(localStorage.getItem(A) || "{}");
    } catch {
      return {};
    }
  })();
  let T = /* @__PURE__ */ I(et(_.leftOpen ?? !0)), z = /* @__PURE__ */ I(et(_.rightOpen ?? !0)), W = /* @__PURE__ */ I(et(Math.min(O, Math.max(q, Number(_.rightWidth) || C)))), re = /* @__PURE__ */ I(!1);
  kt(() => {
    const w = {
      leftOpen: s(T),
      rightOpen: s(z),
      rightWidth: s(W)
    };
    try {
      localStorage.setItem(A, JSON.stringify(w));
    } catch {
    }
  });
  const ke = /* @__PURE__ */ le(() => `${s(T) ? S : 0}px minmax(0, 1fr) ${s(z) ? s(W) : 0}px`);
  function he(w) {
    if (w.button !== 0) return;
    w.preventDefault();
    const B = w.currentTarget;
    try {
      B.setPointerCapture(w.pointerId);
    } catch {
    }
    const Z = w.clientX, me = s(W), Ce = Math.min(O, Math.round(window.innerWidth * 0.5));
    m(re, !0);
    const Ee = (He) => {
      m(W, Math.min(Ce, Math.max(q, me + (Z - He.clientX))), !0);
    }, Oe = () => {
      m(re, !1), window.removeEventListener("pointermove", Ee, !0), window.removeEventListener("pointerup", Oe, !0), window.removeEventListener("pointercancel", Oe, !0);
    };
    window.addEventListener("pointermove", Ee, !0), window.addEventListener("pointerup", Oe, !0), window.addEventListener("pointercancel", Oe, !0);
  }
  function N(w) {
    const B = w.shiftKey ? 60 : 20;
    w.key === "ArrowLeft" ? (w.preventDefault(), m(W, Math.min(O, s(W) + B), !0)) : w.key === "ArrowRight" && (w.preventDefault(), m(W, Math.max(q, s(W) - B), !0));
  }
  const F = /* @__PURE__ */ le(() => {
    var w, B, Z, me;
    return {
      desktop: null,
      tablet: ((B = (w = t().catalog) == null ? void 0 : w.devices) == null ? void 0 : B.tablet) || 820,
      mobile: ((me = (Z = t().catalog) == null ? void 0 : Z.devices) == null ? void 0 : me.mobile) || 390
    };
  });
  var ee = zh();
  let te;
  var se = h(ee), ie = h(se), X = h(ie), U = h(X);
  V(U, { name: "x" });
  var ae = d(X, 2), fe = h(ae), Se = h(fe);
  V(Se, { name: "blocks", size: 15 });
  var Pe = d(fe, 2), pe = h(Pe), we = Y(pe, !0), ge = d(pe, 2), oe = Y(ge, !0), $ = d(ae, 4), Te = h($);
  V(Te, { name: "undo" });
  var Re = d($, 2), Ae = h(Re);
  V(Ae, { name: "redo" });
  var Be = d(Re, 4);
  let Je;
  var ce = h(Be);
  V(ce, { name: "panel-left", size: 16 });
  var ue = d(ie, 2);
  Ie(
    ue,
    20,
    () => [
      ["desktop", "monitor", "Desktop"],
      ["tablet", "tablet", "Tablet"],
      ["mobile", "phone", "Mobile"]
    ],
    ht,
    (w, B) => {
      var Z = /* @__PURE__ */ le(() => Ua(B, 3));
      let me = () => s(Z)[0], Ce = () => s(Z)[1], Ee = () => s(Z)[2];
      var Oe = lh();
      let He;
      var Ye = h(Oe);
      V(Ye, {
        get name() {
          return Ce();
        },
        size: 15
      }), D(() => {
        be(Oe, "title", Ee()), be(Oe, "aria-pressed", s(a) === me()), He = _e(Oe, 1, "svelte-1nqlp8n", null, He, { active: s(a) === me() });
      }), P("click", Oe, () => m(a, me(), !0)), b(w, Oe);
    }
  );
  var ze = d(ue, 2), xe = h(ze);
  {
    var De = (w) => {
      var B = uh(), Z = Me(B), me = h(Z);
      Ie(me, 17, () => s(u).others.slice(0, 4), (Oe) => Oe.session, (Oe, He) => {
        const Ye = /* @__PURE__ */ le(() => As(s(He)));
        var at = oh();
        let $e, Dt;
        var _s = Y(at, !0);
        D(() => {
          $e = _e(at, 1, "avatar svelte-1nqlp8n", null, $e, { editing: s(He).editing }), be(at, "title", `${s(Ye).name ?? ""} ${s(He).editing ? "is editing" : "has this open"}`), Dt = Ct(at, "", Dt, { background: s(Ye).color }), R(_s, s(Ye).initials);
        }), b(Oe, at);
      });
      var Ce = d(me, 2);
      {
        var Ee = (Oe) => {
          var He = ch(), Ye = Y(He);
          D(() => R(Ye, `+${s(u).others.length - 4}`)), b(Oe, He);
        };
        H(Ce, (Oe) => {
          s(u).others.length > 4 && Oe(Ee);
        });
      }
      b(w, B);
    };
    H(xe, (w) => {
      var B;
      (B = s(u)) != null && B.others.length && w(De);
    });
  }
  var Ne = d(xe, 2), Ke = h(Ne);
  V(Ke, { name: "copy", size: 15 });
  var Ge = d(Ne, 2), Le = h(Ge);
  V(Le, { name: "clipboard", size: 15 });
  var Ve = d(Ge, 2), Gt = h(Ve);
  V(Gt, { name: "refresh", size: 15 });
  var nt = d(Ve, 2);
  {
    var J = (w) => {
      var B = fh(), Z = Me(B), me = h(Z);
      V(me, { name: "template", size: 15 });
      var Ce = d(Z, 2), Ee = h(Ce);
      {
        var Oe = (Ye) => {
          var at = dh();
          b(Ye, at);
        }, He = (Ye) => {
          var at = vh(), $e = Me(at);
          V($e, { name: "save", size: 15 }), b(Ye, at);
        };
        H(Ee, (Ye) => {
          t().saving ? Ye(Oe) : Ye(He, -1);
        });
      }
      D(() => {
        Z.disabled = !t().blocks.length, Ce.disabled = t().saving || t().readOnly;
      }), P("click", Z, y), P("click", Ce, E), b(w, B);
    }, Q = (w) => {
      var B = hh(), Z = Me(B), me = h(Z);
      V(me, { name: "back", size: 15 });
      var Ce = d(Z, 2), Ee = h(Ce);
      V(Ee, { name: "globe", size: 15 });
      var Oe = d(Ee);
      D(() => {
        Ce.disabled = !t().sectionDirty, R(Oe, ` ${t().sectionDirty ? "Save section" : "Saved"}`);
      }), P("click", Z, x), P("click", Ce, p), b(w, B);
    };
    H(nt, (w) => {
      t().isSection ? w(Q, -1) : w(J);
    });
  }
  var de = d(nt, 4);
  let G;
  var je = h(de);
  V(je, { name: "panel-right", size: 16 });
  var Ue = d(se, 2);
  {
    var lt = (w) => {
      var B = ph(), Z = h(B);
      V(Z, { name: "globe", size: 16 });
      var me = d(Z, 2), Ce = d(h(me)), Ee = Y(Ce, !0), Oe = d(Ce, 2);
      {
        var He = (at) => {
          var $e = Zt();
          D(() => R($e, `(${t().editingSection.usage.length ?? ""} ${t().editingSection.usage.length === 1 ? "place" : "places"})`)), b(at, $e);
        };
        H(Oe, (at) => {
          var $e, Dt;
          (Dt = ($e = t().editingSection) == null ? void 0 : $e.usage) != null && Dt.length && at(He);
        });
      }
      var Ye = d(me, 2);
      D(() => {
        var at;
        return R(Ee, (at = t().editingSection) == null ? void 0 : at.title);
      }), P("click", Ye, x), b(w, B);
    };
    H(Ue, (w) => {
      t().isSection && w(lt);
    });
  }
  var wt = d(Ue, 2);
  {
    var Vt = (w) => {
      const B = /* @__PURE__ */ le(() => {
        var $e;
        return (($e = s(u)) == null ? void 0 : $e.editors) || [];
      });
      var Z = bh(), me = h(Z);
      V(me, { name: "lock", size: 15 });
      var Ce = d(me, 2), Ee = h(Ce);
      {
        var Oe = ($e) => {
          var Dt = gh(), _s = Me(Dt), Ga = Y(_s, !0), er = d(_s);
          D(
            (Wn) => {
              R(Ga, Wn), R(er, ` ${s(B).length === 1 ? "is" : "are"} editing this ${t().isSection ? "global section" : "page"}. You're viewing read-only so you don't overwrite each other.`);
            },
            [() => s(B).map((Wn) => As(Wn).name).join(", ")]
          ), b($e, Dt);
        }, He = ($e) => {
          var Dt = Zt("The other editor has left. You can edit now.");
          b($e, Dt);
        };
        H(Ee, ($e) => {
          s(B).length ? $e(Oe) : $e(He, -1);
        });
      }
      var Ye = d(Ce, 2), at = Y(Ye, !0);
      D(() => R(at, s(B).length ? "Edit anyway" : "Start editing")), P("click", Ye, () => {
        var $e;
        return ($e = s(u)) == null ? void 0 : $e.editAnyway();
      }), b(w, Z);
    }, Pt = (w) => {
      var B = mh(), Z = h(B);
      V(Z, { name: "users", size: 15 });
      var me = d(Z, 2), Ce = h(me), Ee = Y(Ce, !0), Oe = d(Ce), He = d(me, 2);
      D(
        (Ye) => {
          R(Ee, Ye), R(Oe, ` started editing this ${t().isSection ? "global section" : "page"} too. Coordinate before saving, or one of you will overwrite the other.`);
        },
        [() => As(s(u).joined).name]
      ), P("click", He, () => s(u).joined = null), b(w, B);
    };
    H(wt, (w) => {
      var B;
      t().readOnly ? w(Vt) : (B = s(u)) != null && B.joined && w(Pt, 1);
    });
  }
  var xt = d(wt, 2);
  {
    var qt = (w) => {
      var B = _h(), Z = h(B);
      V(Z, { name: "history", size: 15 });
      var me = d(Z, 2), Ce = Y(me), Ee = d(me, 2), Oe = d(Ee, 2);
      D(
        (He) => R(Ce, `${s(u).stale.by ? `${s(u).stale.by} saved` : "A newer version was saved"} at ${He ?? ""}, after you opened this. Saving now would replace their changes.`),
        [
          () => new Date(s(u).stale.modified * 1e3).toLocaleTimeString(void 0, { timeStyle: "short" })
        ]
      ), P("click", Ee, f), P("click", Oe, () => s(u).acknowledgeStale()), b(w, B);
    };
    H(xt, (w) => {
      var B;
      (B = s(u)) != null && B.stale && !t().saving && w(qt);
    });
  }
  var jn = d(xt, 2);
  {
    var vn = (w) => {
      var B = yh(), Z = h(B);
      V(Z, { name: "x", size: 15 });
      var me = d(Z, 2), Ce = Y(me, !0), Ee = d(me, 2), Oe = d(Ee, 2);
      D(() => R(Ce, t().saveError)), P("click", Ee, E), P("click", Oe, () => t().saveError = ""), b(w, B);
    }, In = (w) => {
      var B = kh(), Z = h(B);
      V(Z, { name: "history", size: 15 });
      var me = d(Z, 2), Ce = Y(me), Ee = d(me, 2), Oe = d(Ee, 2);
      D((He) => R(Ce, `Unsaved changes from ${He ?? ""} were found in this browser.`), [
        () => new Date(t().recovery.time).toLocaleString(void 0, { dateStyle: "medium", timeStyle: "short" })
      ]), P("click", Ee, () => t().restoreRecovery()), P("click", Oe, () => t().clearBackup()), b(w, B);
    };
    H(jn, (w) => {
      t().saveError ? w(vn) : t().recovery && w(In, 1);
    });
  }
  var ot = d(jn, 2);
  let mt, zt;
  var nn = h(ot);
  let Sn;
  var Mt = h(nn), St = h(Mt);
  let qn;
  var Zs = h(St);
  V(Zs, { name: "plus", size: 14 });
  var Qs = d(St, 2);
  let Gi;
  var Io = h(Qs);
  V(Io, { name: "template", size: 14 });
  var $s = d(Qs, 2);
  let Vi;
  var qo = h($s);
  V(qo, { name: "layers", size: 14 });
  var ca = d($s, 2);
  let Ji;
  var Fo = h(ca);
  V(Fo, { name: "history", size: 14 });
  var Bo = d(Mt, 2), Uo = h(Bo);
  {
    var Ho = (w) => {
      var B = wh(), Z = Y(B, !0);
      D(() => R(Z, t().loadError)), b(w, B);
    }, Ko = (w) => {
      var B = xh();
      b(w, B);
    }, Go = (w) => {
      xd(w, {
        get store() {
          return t();
        }
      });
    }, Vo = (w) => {
      Dd(w, {
        get store() {
          return t();
        },
        askConfirm: j
      });
    }, Jo = (w) => {
      Fd(w, {
        get store() {
          return t();
        }
      });
    }, Yo = (w) => {
      ih(w, {
        get store() {
          return t();
        },
        askConfirm: j
      });
    };
    H(Uo, (w) => {
      t().loadError ? w(Ho) : t().catalog ? s(r) === "blocks" ? w(Go, 2) : s(r) === "patterns" ? w(Vo, 3) : s(r) === "outline" ? w(Jo, 4) : w(Yo, -1) : w(Ko, 1);
    });
  }
  var Yi = d(nn, 2), Wi = h(Yi);
  Jn(
    rv(Wi, {
      get store() {
        return t();
      },
      get width() {
        return s(F)[s(a)];
      }
    }),
    (w) => m(l, w, !0),
    () => s(l)
  );
  var Xi = d(Wi, 2);
  {
    var Wo = (w) => {
      var B = Sh(), Z = h(B);
      V(Z, { name: "chevron", size: 14 }), P("click", B, () => m(T, !0)), b(w, B);
    };
    H(Xi, (w) => {
      s(T) || w(Wo);
    });
  }
  var Xo = d(Xi, 2);
  {
    var Zo = (w) => {
      var B = Eh(), Z = h(B);
      V(Z, { name: "chevron", size: 14 }), P("click", B, () => m(z, !0)), b(w, B);
    };
    H(Xo, (w) => {
      s(z) || w(Zo);
    });
  }
  var ua = d(Yi, 2);
  let Zi;
  var Yn = h(ua);
  be(Yn, "aria-valuemin", q), be(Yn, "aria-valuemax", O);
  var Qi = d(Yn, 2), Qo = h(Qi);
  Of(Qo, {
    get store() {
      return t();
    },
    askConfirm: j,
    savePattern: y
  });
  var $i = d(ot, 2);
  {
    var $o = (w) => {
      {
        let B = /* @__PURE__ */ le(() => t().getPath(t().imagePick.index, t().imagePick.path) || "");
        Po(w, {
          get store() {
            return t();
          },
          get current() {
            return s(B);
          },
          onselect: (Z) => t().replaceImage(Z),
          onclose: () => t().imagePick = null
        });
      }
    };
    H($i, (w) => {
      t().imagePick && w($o);
    });
  }
  var el = d($i, 2);
  {
    var ec = (w) => {
      var B = Mh(), Z = Y(B, !0);
      D(() => R(Z, t().toast)), b(w, B);
    };
    H(el, (w) => {
      t().toast && w(ec);
    });
  }
  var tc = d(el, 2);
  {
    var nc = (w) => {
      za(w, {
        title: "Save as pattern",
        onclose: () => m(i, null),
        actions: (Z) => {
          var me = Th(), Ce = Me(me), Ee = d(Ce, 2);
          D((Oe) => Ee.disabled = Oe, [() => !s(i).title.trim()]), P("click", Ce, () => m(i, null)), P("click", Ee, L), b(Z, me);
        },
        children: (Z, me) => {
          var Ce = Ch(), Ee = d(Me(Ce), 2);
          Jc(Ee);
          var Oe = d(Ee, 2), He = h(Oe), Ye = d(h(He), 2), at = h(Ye);
          {
            var $e = (sn) => {
              var da = Ah(), rc = Y(da, !0);
              da.value = da.__value = "selected", D(() => R(rc, s(i).indexes.length > 1 ? `Selected blocks (${s(i).indexes.length})` : "Selected block only")), b(sn, da);
            };
            H(at, (sn) => {
              t().selected >= 0 && sn($e);
            });
          }
          var Dt = d(at), _s = Y(Dt);
          Dt.value = Dt.__value = "all", pr(Ye);
          var Ga = d(He, 2), er = d(h(Ga), 2), Wn = h(er);
          Wn.value = Wn.__value = "section";
          var tl = d(Wn);
          tl.value = tl.__value = "page", pr(er), D(() => R(_s, `All ${t().blocks.length ?? ""} blocks on this page`)), P("keydown", Ee, (sn) => sn.key === "Enter" && L()), xn(Ee, () => s(i).title, (sn) => s(i).title = sn), _l(Ye, () => s(i).scope, (sn) => s(i).scope = sn), _l(er, () => s(i).category, (sn) => s(i).category = sn), b(Z, Ce);
        },
        $$slots: { actions: !0, default: !0 }
      });
    }, sc = (w) => {
      za(w, {
        get title() {
          return s(i).title;
        },
        onclose: () => {
          s(i).resolve(null), m(i, null);
        },
        actions: (Z) => {
          var me = Rt(), Ce = Me(me);
          Ie(Ce, 17, () => s(i).choices, ht, (Ee, Oe) => {
            var He = Oh(), Ye = Y(He, !0);
            D(() => {
              _e(He, 1, `mb-btn ${s(Oe).primary ? "primary" : ""}`, "svelte-1nqlp8n"), R(Ye, s(Oe).label);
            }), P("click", He, () => {
              s(i).resolve(s(Oe).value), m(i, null);
            }), b(Ee, He);
          }), b(Z, me);
        },
        children: (Z, me) => {
          var Ce = Ph(), Ee = Y(Ce, !0);
          D(() => R(Ee, s(i).message)), b(Z, Ce);
        },
        $$slots: { actions: !0, default: !0 }
      });
    };
    H(tc, (w) => {
      var B, Z;
      ((B = s(i)) == null ? void 0 : B.kind) === "pattern" ? w(nc) : ((Z = s(i)) == null ? void 0 : Z.kind) === "confirm" && w(sc, 1);
    });
  }
  D(
    (w) => {
      te = _e(ee, 1, "builder svelte-1nqlp8n", null, te, { "section-mode": t().isSection }), R(we, w), R(oe, t().isSection ? "Global section" : t().isFlex ? `Flex · ${t().context.type}` : t().route), $.disabled = !t().canUndo, Re.disabled = !t().canRedo, Je = _e(Be, 1, "mb-btn ghost icon svelte-1nqlp8n", null, Je, { on: s(T) }), be(Be, "title", s(T) ? "Hide left panel (Ctrl+)" : "Show left panel (Ctrl+)"), be(Be, "aria-pressed", s(T)), Ne.disabled = t().selected < 0, Ge.disabled = !t().clipboardAvailable || t().readOnly, G = _e(de, 1, "mb-btn ghost icon svelte-1nqlp8n", null, G, { on: s(z) }), be(de, "title", s(z) ? "Hide settings panel (Ctrl+Alt+)" : "Show settings panel (Ctrl+Alt+)"), be(de, "aria-pressed", s(z)), mt = _e(ot, 1, "body svelte-1nqlp8n", null, mt, { resizing: s(re) }), zt = Ct(ot, "", zt, { "grid-template-columns": s(ke) }), Sn = _e(nn, 1, "panel left-panel svelte-1nqlp8n", null, Sn, { collapsed: !s(T) }), nn.inert = !s(T), be(nn, "aria-hidden", !s(T)), be(St, "aria-selected", s(r) === "blocks"), qn = _e(St, 1, "svelte-1nqlp8n", null, qn, { active: s(r) === "blocks" }), be(Qs, "aria-selected", s(r) === "patterns"), Gi = _e(Qs, 1, "svelte-1nqlp8n", null, Gi, { active: s(r) === "patterns" }), be($s, "aria-selected", s(r) === "outline"), Vi = _e($s, 1, "svelte-1nqlp8n", null, Vi, { active: s(r) === "outline" }), be(ca, "aria-selected", s(r) === "history"), Ji = _e(ca, 1, "svelte-1nqlp8n", null, Ji, { active: s(r) === "history" }), Zi = _e(ua, 1, "panel right-panel svelte-1nqlp8n", null, Zi, { collapsed: !s(z) }), ua.inert = !s(z), be(ua, "aria-hidden", !s(z)), be(Yn, "aria-valuenow", s(W)), Qi.inert = t().readOnly;
    },
    [
      () => {
        var w;
        return t().isSection ? (w = t().editingSection) == null ? void 0 : w.title : document.title.replace(/\s*[—|-]\s*Grav Admin.*$/, "") || "Page";
      }
    ]
  ), P("click", X, M), P("click", $, () => t().undo()), P("click", Re, () => t().redo()), P("click", Be, () => m(T, !s(T))), P("click", Ne, () => t().copyBlocks()), P("click", Ge, () => t().pasteBlocks()), P("click", Ve, () => {
    var w;
    return (w = s(l)) == null ? void 0 : w.refresh();
  }), P("click", de, () => m(z, !s(z))), P("click", St, () => m(r, "blocks")), P("click", Qs, () => m(r, "patterns")), P("click", $s, () => m(r, "outline")), P("click", ca, () => m(r, "history")), P("pointerdown", Yn, he), P("dblclick", Yn, () => m(W, C)), P("keydown", Yn, N), b(n, ee), vt();
}
bt(["click", "pointerdown", "dblclick", "keydown"]);
const si = "maw-builder:clipboard", ki = "maw-blocks", No = 1, Nh = ["filepicker", "media", "file"], Lh = /\.(jpe?g|png|gif|webp|avif|svg|mp4|webm|pdf)$/i;
function Rh(n, { source: e = null, theme: t = "" } = {}) {
  return { [ki]: No, theme: t, source: e, copied: Date.now(), blocks: JSON.parse(JSON.stringify(n)) };
}
function Ol(n, { knownType: e = () => !0, inSection: t = !1 } = {}) {
  if (typeof n != "string" || !n.includes(ki)) return null;
  let r;
  try {
    r = JSON.parse(n);
  } catch {
    return null;
  }
  if (!r || r[ki] !== No || !Array.isArray(r.blocks)) return null;
  const a = [], i = [];
  for (const l of r.blocks)
    !l || typeof l != "object" || typeof l.type != "string" || (!e(l.type) || t && l.type === "global" ? i.push(l.type) : a.push(l));
  return { blocks: a, skipped: i, source: r.source && typeof r.source == "object" ? r.source : null, theme: String(r.theme || "") };
}
const jh = (n) => typeof n == "string" && Lh.test(n) && !/[/\\:]/.test(n);
function Ih(n, e) {
  var a;
  const t = /* @__PURE__ */ new Set(), r = (i, l) => {
    if (!(!l || typeof l != "object"))
      for (const o of i || []) {
        const u = l[o.name];
        o.type === "list" && Array.isArray(u) ? u.forEach((v) => r(o.fields, v)) : Nh.includes(o.type) && (Array.isArray(u) ? u : [u]).forEach((v) => jh(v) && t.add(v));
      }
  };
  for (const i of n) r((a = e(i.type)) == null ? void 0 : a.fields, i[i.type]);
  return [...t];
}
function qh(n, e) {
  return !n || !e || n.context !== e.context ? !1 : n.context === "page" ? String(n.route).replace(/\/$/, "") === String(e.route).replace(/\/$/, "") : n.context === "flex" ? n.type === e.type && n.key === e.key : n.id === e.id;
}
const Fh = 60, Bh = 700, Uh = 1e4, Xn = {
  get(n) {
    try {
      return JSON.parse(localStorage.getItem(n) || "null");
    } catch {
      return null;
    }
  },
  set(n, e) {
    try {
      localStorage.setItem(n, JSON.stringify(e));
    } catch {
    }
  },
  remove(n) {
    try {
      localStorage.removeItem(n);
    } catch {
    }
  }
};
var Ar, Cr, Or, Pr, zr, Dr, Nr, Lr, Rr, jr, Ir, Ht, on, Fs, ls, qr, Fr, Br, Ur, Hr, Kr, Gr, Vr, Jr, Yr, Bs, Wr, Xr, Zr, Qr, $r, gn, ea, Us, tt, Lo, wi, xi, ws, or, ta, Sa;
class Hh {
  constructor({ context: e, fieldName: t, onChange: r }) {
    K(this, tt);
    K(this, Ar, /* @__PURE__ */ I(et([])));
    K(this, Cr, /* @__PURE__ */ I(-1));
    K(this, Or, /* @__PURE__ */ I(null));
    K(this, Pr, /* @__PURE__ */ I(et([])));
    K(this, zr, /* @__PURE__ */ I(""));
    K(this, Dr, /* @__PURE__ */ I(!1));
    K(this, Nr, /* @__PURE__ */ I(!1));
    K(this, Lr, /* @__PURE__ */ I(""));
    K(this, Rr, /* @__PURE__ */ I(""));
    K(this, jr, /* @__PURE__ */ I(""));
    K(this, Ir, /* @__PURE__ */ I(null));
    K(this, Ht, []);
    K(this, on, []);
    K(this, Fs, 0);
    K(this, ls, !1);
    K(this, qr, /* @__PURE__ */ I(!1));
    K(this, Fr, /* @__PURE__ */ I(!1));
    K(this, Br, /* @__PURE__ */ I(null));
    K(this, Ur, /* @__PURE__ */ I(et({})));
    K(this, Hr, /* @__PURE__ */ I(et({ kind: "unknown" })));
    K(this, Kr, /* @__PURE__ */ I(et([])));
    K(this, Gr, /* @__PURE__ */ I(null));
    K(this, Vr, /* @__PURE__ */ I(!1));
    K(this, Jr, /* @__PURE__ */ I(!1));
    K(this, Yr, /* @__PURE__ */ I(0));
    ct(this, "renderedPayload", "");
    K(this, Bs, null);
    K(this, Wr, /* @__PURE__ */ I(!1));
    K(this, Xr, /* @__PURE__ */ I(""));
    K(this, Zr, /* @__PURE__ */ I(null));
    ct(this, "baseModified", 0);
    K(this, Qr, /* @__PURE__ */ I(!1));
    ct(this, "presence", null);
    K(this, $r, /* @__PURE__ */ I(et([])));
    K(this, gn, -1);
    K(this, ea, /* @__PURE__ */ I(!1));
    ct(this, "modal", null);
    K(this, Us, 0);
    /** After the next preview render, start inline editing this field: {index, path}. */
    ct(this, "pendingFocus", null);
    K(
      this,
      ta,
      /** Image clicked on the canvas: {index, path} while the media library is open for it. */
      /* @__PURE__ */ I(null)
    );
    this.context = e, this.fieldName = t, this.onChange = r;
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
    return s(c(this, jr));
  }
  set busy(e) {
    m(c(this, jr), e, !0);
  }
  get pendingInsert() {
    return s(c(this, Ir));
  }
  set pendingInsert(e) {
    m(c(this, Ir), e, !0);
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
    return s(c(this, Jr));
  }
  set inlineEditing(e) {
    m(c(this, Jr), e, !0);
  }
  get revisionTick() {
    return s(c(this, Yr));
  }
  set revisionTick(e) {
    m(c(this, Yr), e, !0);
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
    return ((e = this.catalog) == null ? void 0 : e.settingKeys) || Ao;
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
    clearTimeout(c(this, Us)), this.backupKey && Xn.remove(this.backupKey), this.recovery = null;
  }
  /** Offer a backup that differs from what's loaded and was written after the last server save. */
  async checkRecovery() {
    const e = this.backupKey, t = e && Xn.get(e);
    if (!this.canPreview) return;
    try {
      const a = await Xe.state(this.context, this.fieldName);
      this.baseModified = (a == null ? void 0 : a.modified) || 0;
    } catch {
    }
    if (!t || !Array.isArray(t.blocks)) return;
    if (JSON.stringify(En(t.blocks, this.settingKeys)) === JSON.stringify(this.snapshot()) || t.time <= this.baseModified * 1e3) {
      Xn.remove(e);
      return;
    }
    this.recovery = { blocks: t.blocks, time: t.time };
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
    this.selected = e, this.multi = e >= 0 ? [e] : [], ne(this, gn, e);
  }
  toggleSelect(e) {
    if (e < 0) return;
    const t = this.selection;
    if (t.includes(e)) {
      const r = t.filter((a) => a !== e);
      if (!r.length) return this.select(-1);
      this.multi = r, this.selected = r.at(-1);
    } else
      this.multi = [...t, e].sort((r, a) => r - a), this.selected = e;
    ne(this, gn, e);
  }
  rangeSelect(e) {
    if (e < 0) return;
    const t = c(this, gn) >= 0 && c(this, gn) < this.blocks.length ? c(this, gn) : this.selected >= 0 ? this.selected : e, [r, a] = t < e ? [t, e] : [e, t];
    this.multi = Array.from({ length: a - r + 1 }, (i, l) => r + l), this.selected = e;
  }
  selectAll() {
    this.blocks.length && (this.multi = this.blocks.map((e, t) => t), this.selected = this.blocks.length - 1, ne(this, gn, 0));
  }
  // ─── group operations ────────────────────────────────────
  removeMany(e) {
    const t = [...new Set(e)].filter((r) => r >= 0 && r < this.blocks.length).sort((r, a) => a - r);
    if (t.length) {
      if (t.length === 1) return this.remove(t[0]);
      this.mutate((r) => t.forEach((a) => r.splice(a, 1)), `Removing ${t.length} blocks…`), this.select(Math.min(t.at(-1), this.blocks.length - 1)), this.flash(`${t.length} blocks removed. Ctrl+Z to undo.`);
    }
  }
  duplicateMany(e) {
    const t = [...new Set(e)].sort((i, l) => i - l);
    if (t.length <= 1) return t.length && this.duplicate(t[0]);
    const r = t.map((i) => wl(Bn(this.blocks[i]))), a = t.at(-1) + 1;
    this.mutate((i) => i.splice(a, 0, ...r), `Duplicating ${r.length} blocks…`), ve(this, tt, wi).call(this, a, r.length);
  }
  /** Move the current selection up (-1) or down (+1). */
  moveSelection(e) {
    const t = this.selection;
    if (t.length <= 1) return this.move(this.selected, this.selected + e);
    if (t[0] + e < 0 || t.at(-1) + e >= this.blocks.length) return;
    let r = t;
    this.mutate(
      (a) => {
        r = Df(a, t, e);
      },
      `Moving ${t.length} blocks…`
    ), this.multi = r, this.selected = r.at(-1);
  }
  // ─── copy / paste ────────────────────────────────────────
  refreshClipboard() {
    this.clipboardAvailable = !!Xn.get(si);
  }
  /** Copy blocks to the system clipboard (JSON) and this browser's storage (for the Paste button). */
  async copyBlocks(e = this.selection) {
    var a, i;
    const t = [...e].sort((l, o) => l - o).map((l) => this.snapshot()[l]).filter(Boolean);
    if (!t.length) return !1;
    const r = Rh(t, {
      source: Mn(this.context),
      theme: ((a = this.catalog) == null ? void 0 : a.theme) || ""
    });
    Xn.set(si, r), this.clipboardAvailable = !0;
    try {
      await ((i = navigator.clipboard) == null ? void 0 : i.writeText(JSON.stringify(r)));
    } catch {
    }
    return this.flash(t.length === 1 ? "Block copied" : `${t.length} blocks copied`), !0;
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
    const t = {
      knownType: (g) => !!this.defFor(g),
      inSection: this.isSection
    }, r = Xn.get(si), a = Ol(e, t) || (r ? Ol(JSON.stringify(r), t) : null);
    if (!a) return !1;
    if (!a.blocks.length)
      return this.flash(a.skipped.length ? `Nothing to paste: ${a.skipped.join(", ")} can't be used here.` : "Nothing to paste."), !0;
    const i = [];
    a.skipped.length && i.push(`skipped ${a.skipped.length} (${[...new Set(a.skipped)].join(", ")})`);
    const l = Ih(a.blocks, (g) => this.defFor(g));
    if (l.length && a.source && !qh(a.source, Mn(this.context)))
      if (this.isSection)
        i.push(`${l.length} image${l.length === 1 ? "" : "s"} must be re-picked from the site library`);
      else {
        this.busy = "Copying images…";
        try {
          const g = await Xe.copyMedia(a.source, this.context, l);
          (v = g == null ? void 0 : g.copied) != null && v.length && (i.push(`${g.copied.length} image${g.copied.length === 1 ? "" : "s"} copied`), await this.loadOwnMedia());
          const E = [...(g == null ? void 0 : g.missing) || [], ...(g == null ? void 0 : g.refused) || []];
          E.length && i.push(`${E.length} image${E.length === 1 ? "" : "s"} not found`);
        } catch (g) {
          i.push(`images not copied (${g.message})`);
        }
      }
    const o = this.selection.length ? this.selection.at(-1) + 1 : this.blocks.length, u = a.blocks.length;
    return this.insertMany(a.blocks, o), ve(this, tt, wi).call(this, o, u), this.flash(`Pasted ${u} block${u === 1 ? "" : "s"}${i.length ? ": " + i.join(", ") : ""}`), !0;
  }
  // ─── save confirmation ───────────────────────────────────
  /**
   * After Admin2's save was triggered: poll until the server has exactly these blocks, or give up.
   * A failed validation or an expired session never writes the file, so a timeout means "not saved".
   */
  async confirmSaved(e) {
    this.saving = !0, this.saveError = "";
    const t = Date.now() + Uh;
    try {
      for (; Date.now() < t; ) {
        await new Promise((r) => setTimeout(r, Bh));
        try {
          const r = await Xe.state(this.context, this.fieldName, e);
          if (r != null && r.matches)
            return this.baseModified = r.modified || this.baseModified, JSON.stringify(this.snapshot()) === JSON.stringify(e) && (this.dirty = !1, this.clearBackup()), this.revisionTick++, !0;
        } catch (r) {
          if (r.status === 401 || r.status === 403) break;
        }
      }
      return this.saveError = "The page wasn't saved. Check the admin message (a required field, or your session may have expired), then try again.", !1;
    } finally {
      this.saving = !1;
    }
  }
  /** Display URL for a bare filename in this page's / object's folder. */
  pageMediaUrl(e) {
    return this.mediaUrls[e] ? this.mediaUrls[e] : this.isFlex ? "" : `${(this.route || "").replace(/\/$/, "")}/${encodeURIComponent(e)}`;
  }
  rememberMedia(e) {
    const t = { ...this.mediaUrls };
    for (const r of e || []) r != null && r.filename && r.url && (t[r.filename] = r.url);
    this.mediaUrls = t;
  }
  async loadOwnMedia() {
    try {
      const e = await Xe.ownMedia(this.context), t = Array.isArray(e) ? e : (e == null ? void 0 : e.items) || (e == null ? void 0 : e.files) || [];
      return this.rememberMedia(t), t;
    } catch {
      return [];
    }
  }
  defFor(e) {
    var t;
    return ((t = this.catalog) == null ? void 0 : t.blocks.find((r) => r.type === e)) || null;
  }
  async load() {
    return this.catalog || this.loading ? this.loading : (this.loading = (async () => {
      try {
        const [e, t, r] = await Promise.all([
          Xe.blocks(),
          Xe.patterns().catch(() => []),
          Xe.sections().catch(() => [])
        ]);
        this.catalog = e, this.patterns = t || [], this.sections = r || [], this.blocks = En(Bn(this.blocks), this.settingKeys), this.canPreview && this.loadOwnMedia(), this.checkRecovery();
      } catch (e) {
        this.loadError = e.message || String(e);
      }
    })(), this.loading);
  }
  /** Value pushed in by Admin2. Ignored if it's the value we just emitted. */
  setValue(e) {
    const t = En(e, this.settingKeys);
    JSON.stringify(t) !== JSON.stringify(Bn(this.blocks)) && (this.blocks = t, this.selected >= t.length && (this.selected = t.length - 1));
  }
  snapshot() {
    return Bn(this.blocks);
  }
  // ─── inline editing ──────────────────────────────────────
  /** Read a content field by path ("items.2.answer") from block[index]. */
  getPath(e, t) {
    return Tl(this.blocks[e], t);
  }
  /**
   * Markdown edited on the canvas. Unlike plain text, the rendered result can differ from what was typed
   * (lists, links…), so the preview re-renders to show exactly what will be saved.
   */
  inlineSetMarkdown(e, t, r, a = "Updating text…") {
    (this.getPath(e, t) ?? "") !== r && (this.inlineSet(e, t, r), this.renderedPayload = "", this.busy = a);
  }
  /**
   * Repeater actions from the canvas.
   * op: add (at end) | duplicate | remove | move (item → to)
   */
  listOp({ index: e, path: t, op: r, item: a, to: i, label: l = "item" }) {
    var E;
    const o = this.blocks[e];
    if (!o || this.readOnly) return;
    const u = Do((E = this.defFor(o.type)) == null ? void 0 : E.fields, t), v = l || "item", g = v.charAt(0).toUpperCase() + v.slice(1);
    if (this.selected = e, r === "add") {
      const f = Oo(u, v), p = ((u == null ? void 0 : u.fields) || []).find((M) => M.type === "text" && /(^|_)url$/.test(M.name) === !1) || ((u == null ? void 0 : u.fields) || []).find((M) => ["textarea", "markdown"].includes(M.type));
      let x = 0;
      this.mutate(
        () => {
          x = pa.add(ha(o, t), f);
        },
        `Adding ${v}…`
      ), p && (this.pendingFocus = { index: e, path: `${t}.${x}.${p.name}` });
    } else r === "duplicate" ? this.mutate(() => pa.duplicate(ha(o, t), a), `Duplicating ${v}…`) : r === "remove" ? (this.mutate(() => pa.remove(ha(o, t), a), `Removing ${v}…`), this.flash(`${g} removed. Ctrl+Z to undo.`)) : r === "move" && this.mutate(() => pa.move(ha(o, t), a, i), `Moving ${v}…`);
  }
  get imagePick() {
    return s(c(this, ta));
  }
  set imagePick(e) {
    m(c(this, ta), e, !0);
  }
  replaceImage(e) {
    const t = this.imagePick;
    this.imagePick = null, !(!t || !e) && (this.selected = t.index, this.inlineSetMarkdown(t.index, t.path, e, "Replacing image…"));
  }
  inlineSet(e, t, r) {
    const a = this.blocks[e];
    !a || typeof t != "string" || this.readOnly || (Tl(a, t) ?? "") !== r && (this.beginEdit(), Pf(a, t, r), this.busy = "", this.renderedPayload = JSON.stringify(this.snapshot()), this.endEdit());
  }
  // ─── global sections ─────────────────────────────────────
  sectionTitle(e) {
    var t;
    return ((t = this.sections.find((r) => r.id === e)) == null ? void 0 : t.title) || e || "Global section";
  }
  async refreshSections() {
    this.sections = await Xe.sections().catch(() => this.sections) || [];
  }
  /** Insert a reference to an existing global section. */
  insertGlobal(e, t = null) {
    const r = t ?? (this.selected >= 0 ? this.selected + 1 : this.blocks.length);
    this.pendingInsert = { index: r, title: this.sectionTitle(e) }, this.mutate((a) => a.splice(r, 0, { type: "global", global: { section: e } }), `Adding ${this.sectionTitle(e)}…`), this.selected = r;
  }
  /** Turn blocks into a new global section and replace them with one reference. */
  async makeGlobal(e, t) {
    const r = [...e].sort((o, u) => o - u), a = r.map((o) => this.snapshot()[o]).filter((o) => o && o.type !== "global");
    if (!a.length) throw new Error("Pick at least one regular block.");
    const i = await Xe.createSection(t, a);
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
    const t = this.blocks[e], r = (l = t == null ? void 0 : t.global) == null ? void 0 : l.section;
    if (!r) return;
    const a = await Xe.section(r), i = En(JSON.parse(JSON.stringify(a.blocks || [])), this.settingKeys);
    this.mutate((o) => o.splice(e, 1, ...i), "Detaching section…"), this.selected = e;
  }
  /** Open a global section in the builder. The page's blocks, selection and undo history are restored on close. */
  async openSection(e) {
    this.isSection && await this.closeSection();
    const t = await Xe.section(e);
    ne(this, Bs, {
      context: Bn(this.context),
      blocks: this.snapshot(),
      selected: this.selected,
      past: c(this, Ht),
      future: c(this, on)
    }), ne(this, Ht, []), ne(this, on, []), ve(this, tt, ws).call(this), this.renderedPayload = "", this.context = { kind: "section", id: e }, this.editingSection = {
      id: e,
      title: t.title,
      usage: t.usage || [],
      rev: t.rev
    }, this.blocks = En(t.blocks || [], this.settingKeys), this.selected = -1, this.sectionDirty = !1, this.busy = `Opening ${t.title}…`, this.checkRecovery();
  }
  /** Throw away local section edits and load what's saved now (after a conflict). */
  async reloadSection() {
    if (!this.isSection) return;
    const e = this.context.id, t = await Xe.section(e);
    this.clearBackup(), this.renderedPayload = "", this.editingSection = {
      id: e,
      title: t.title,
      usage: t.usage || [],
      rev: t.rev
    }, this.blocks = En(t.blocks || [], this.settingKeys), this.sectionDirty = !1, this.busy = "Loading latest version…";
  }
  closeSection() {
    const e = c(this, Bs);
    e && (ne(this, Bs, null), this.renderedPayload = "", this.context = e.context, this.editingSection = null, this.sectionDirty = !1, this.blocks = e.blocks, this.selected = e.selected, ne(this, Ht, e.past), ne(this, on, e.future), this.recovery = null, ve(this, tt, ws).call(this), this.busy = "Back to page…");
  }
  /** Save the open global section. Throws an Error with status 409 when someone else saved it first (retry with force). */
  async saveSection(e = !1) {
    var r;
    if (!this.isSection) return;
    const t = await Xe.updateSection(this.context.id, { blocks: this.snapshot(), base_rev: (r = this.editingSection) == null ? void 0 : r.rev }, e);
    this.sectionDirty = !1, this.clearBackup(), this.editingSection = { ...this.editingSection, title: t.title, rev: t.rev }, await this.refreshSections(), this.revisionTick++, this.flash(`Global section “${t.title}” saved. It updates everywhere it's used.`);
  }
  /** Structural change: record history immediately. */
  mutate(e, t = "Updating page…") {
    if (this.readOnly) {
      this.flash("Read-only: someone else is editing. Click “Edit anyway” to make changes.");
      return;
    }
    this.busy = t, ve(this, tt, Sa).call(this), ve(this, tt, xi).call(this), this.multi = [], e(this.blocks), ve(this, tt, or).call(this);
  }
  /** Field edits: one history entry per burst of typing. Call BEFORE applying the change. */
  beginEdit() {
    this.busy = "Updating preview…", c(this, ls) || (ve(this, tt, xi).call(this), ne(this, ls, !0)), clearTimeout(c(this, Fs)), ne(this, Fs, setTimeout(() => ne(this, ls, !1), 700));
  }
  endEdit() {
    ve(this, tt, or).call(this);
  }
  undo() {
    ve(this, tt, Sa).call(this), c(this, Ht).length && (this.busy = "Undoing…", c(this, on).push(JSON.stringify(this.snapshot())), this.blocks = JSON.parse(c(this, Ht).pop()), this.multi = [], this.selected >= this.blocks.length && (this.selected = this.blocks.length - 1), ve(this, tt, ws).call(this), ve(this, tt, or).call(this));
  }
  redo() {
    ve(this, tt, Sa).call(this), c(this, on).length && (this.busy = "Redoing…", c(this, Ht).push(JSON.stringify(this.snapshot())), this.blocks = JSON.parse(c(this, on).pop()), this.multi = [], this.selected >= this.blocks.length && (this.selected = this.blocks.length - 1), ve(this, tt, ws).call(this), ve(this, tt, or).call(this));
  }
  // ─── operations ──────────────────────────────────────────
  insert(e, t = null) {
    const r = this.defFor(e);
    if (!r) return;
    const a = t ?? (this.selected >= 0 ? this.selected + 1 : this.blocks.length);
    this.pendingInsert = { index: a, title: r.title }, this.mutate((i) => i.splice(a, 0, kl(r)), `Adding ${r.title}…`), this.selected = a;
  }
  insertMany(e, t = null, r = !1) {
    var l;
    const a = En(JSON.parse(JSON.stringify(e)), this.settingKeys).filter((o) => this.defFor(o.type));
    if (!a.length) return;
    if (r) {
      this.mutate((o) => o.splice(0, o.length, ...a), "Building page layout…"), this.selected = 0;
      return;
    }
    const i = t ?? (this.selected >= 0 ? this.selected + 1 : this.blocks.length);
    this.pendingInsert = {
      index: i,
      title: a.length > 1 ? `${a.length} sections` : (l = this.defFor(a[0].type)) == null ? void 0 : l.title
    }, this.mutate((o) => o.splice(i, 0, ...a), `Adding ${a.length > 1 ? a.length + " sections" : "pattern"}…`), this.selected = i;
  }
  remove(e) {
    e < 0 || e >= this.blocks.length || (this.mutate((t) => t.splice(e, 1), "Removing block…"), this.selected = Math.min(e, this.blocks.length - 1));
  }
  duplicate(e) {
    const t = this.blocks[e];
    t && (this.mutate((r) => r.splice(e + 1, 0, wl(Bn(t))), "Duplicating block…"), this.selected = e + 1);
  }
  move(e, t) {
    t < 0 || t >= this.blocks.length || e === t || (this.mutate(
      (r) => {
        const [a] = r.splice(e, 1);
        r.splice(t, 0, a);
      },
      "Moving block…"
    ), this.selected = t);
  }
  toggleHidden(e) {
    const t = this.blocks[e];
    t && this.mutate(
      () => {
        t.hidden ? delete t.hidden : t.hidden = !0;
      },
      t.hidden ? "Showing block…" : "Hiding block…"
    );
  }
  changeType(e, t) {
    const r = this.defFor(t), a = this.blocks[e];
    !r || !a || a.type === t || this.mutate(
      (i) => {
        const l = kl(r);
        for (const o of this.settingKeys) a[o] !== void 0 && (l[o] = a[o]);
        i[e] = l;
      },
      `Changing to ${r.title}…`
    );
  }
  flash(e) {
    this.toast = e, clearTimeout(this.toastTimer), this.toastTimer = setTimeout(() => this.toast = "", 2600);
  }
  async savePattern(e, t, r) {
    const a = [...r].sort((l, o) => l - o).map((l) => this.snapshot()[l]).filter(Boolean), i = await Xe.savePattern({ title: e, category: t, blocks: a });
    return this.patterns = [...this.patterns, i], i;
  }
  async deletePattern(e) {
    await Xe.deletePattern(e), this.patterns = this.patterns.filter((t) => t.id !== e);
  }
}
Ar = new WeakMap(), Cr = new WeakMap(), Or = new WeakMap(), Pr = new WeakMap(), zr = new WeakMap(), Dr = new WeakMap(), Nr = new WeakMap(), Lr = new WeakMap(), Rr = new WeakMap(), jr = new WeakMap(), Ir = new WeakMap(), Ht = new WeakMap(), on = new WeakMap(), Fs = new WeakMap(), ls = new WeakMap(), qr = new WeakMap(), Fr = new WeakMap(), Br = new WeakMap(), Ur = new WeakMap(), Hr = new WeakMap(), Kr = new WeakMap(), Gr = new WeakMap(), Vr = new WeakMap(), Jr = new WeakMap(), Yr = new WeakMap(), Bs = new WeakMap(), Wr = new WeakMap(), Xr = new WeakMap(), Zr = new WeakMap(), Qr = new WeakMap(), $r = new WeakMap(), gn = new WeakMap(), ea = new WeakMap(), Us = new WeakMap(), tt = new WeakSet(), // ─── local backup of unsaved edits ───────────────────────
Lo = function() {
  clearTimeout(c(this, Us));
  const e = this.backupKey;
  e && ne(this, Us, setTimeout(() => Xn.set(e, { blocks: this.snapshot(), time: Date.now() }), 1e3));
}, /** Select a contiguous range after a structural change. */
wi = function(e, t) {
  this.multi = Array.from({ length: t }, (r, a) => e + a), this.selected = t ? e + t - 1 : -1, ne(this, gn, e);
}, // ─── history ─────────────────────────────────────────────
xi = function() {
  c(this, Ht).push(JSON.stringify(this.snapshot())), c(this, Ht).length > Fh && c(this, Ht).shift(), ne(this, on, []), ve(this, tt, ws).call(this);
}, ws = function() {
  this.canUndo = c(this, Ht).length > 0, this.canRedo = c(this, on).length > 0;
}, or = function() {
  var e;
  if (ve(this, tt, Lo).call(this), this.isSection) {
    this.sectionDirty = !0;
    return;
  }
  this.dirty = !0, this.saveError = "", (e = this.onChange) == null || e.call(this, this.snapshot());
}, ta = new WeakMap(), Sa = function() {
  clearTimeout(c(this, Fs)), ne(this, ls, !1);
};
const Kh = "__MAW_CSS__", Pl = window.__GRAV_FIELD_TAG || "grav-maw-builder--blocks";
function zl() {
  const n = document.createElement("style");
  return n.textContent = Kh, n;
}
var os, Gn, na, rt, cs, Pn, zn, tn, Si, Ro, jo, Ei;
class Gh extends HTMLElement {
  constructor() {
    super(...arguments);
    K(this, tn);
    K(this, os, null);
    K(this, Gn, []);
    K(this, na, null);
    K(this, rt, null);
    K(this, cs, null);
    K(this, Pn, null);
    K(this, zn, null);
  }
  set field(t) {
    ne(this, os, t), c(this, rt) && (c(this, rt).fieldName = ve(this, tn, Si).call(this));
  }
  get field() {
    return c(this, os);
  }
  set value(t) {
    var a;
    JSON.stringify(t ?? []) !== c(this, na) && (ne(this, Gn, Array.isArray(t) ? t : []), (a = c(this, rt)) == null || a.setValue(c(this, Gn)));
  }
  get value() {
    return c(this, Gn);
  }
  connectedCallback() {
    if (c(this, rt)) return;
    const t = this.shadowRoot || this.attachShadow({ mode: "open" });
    t.appendChild(zl()), ne(this, rt, new Hh({
      context: td(),
      fieldName: ve(this, tn, Si).call(this),
      onChange: (a) => ve(this, tn, Ro).call(this, a)
    })), c(this, rt).setValue(c(this, Gn)), c(this, rt).load(), c(this, rt).presence = new ld(c(this, rt)), c(this, rt).presence.start();
    const r = document.createElement("div");
    t.appendChild(r), ne(this, cs, vl(md, {
      target: r,
      props: { store: c(this, rt), field: c(this, os), openBuilder: (a) => ve(this, tn, jo).call(this, a) }
    }));
  }
  disconnectedCallback() {
    queueMicrotask(() => {
      var t, r;
      this.isConnected || (ve(this, tn, Ei).call(this), (r = (t = c(this, rt)) == null ? void 0 : t.presence) == null || r.stop(), c(this, cs) && fl(c(this, cs)), ne(this, cs, null), ne(this, rt, null), this.shadowRoot && (this.shadowRoot.innerHTML = ""));
    });
  }
}
os = new WeakMap(), Gn = new WeakMap(), na = new WeakMap(), rt = new WeakMap(), cs = new WeakMap(), Pn = new WeakMap(), zn = new WeakMap(), tn = new WeakSet(), Si = function() {
  var r;
  return String(((r = c(this, os)) == null ? void 0 : r.name) || "header.blocks").replace(/^header\./, "") === "blocks_after" ? "blocks_after" : "blocks";
}, Ro = function(t) {
  ne(this, Gn, t), ne(this, na, JSON.stringify(t)), this.dispatchEvent(new CustomEvent("change", { detail: t, bubbles: !0 }));
}, /** The builder mounts on <body> so no admin layout (overflow, transforms) can clip the full-screen overlay. */
jo = function(t = -1) {
  if (c(this, zn)) return;
  const r = c(this, rt);
  r.select(t), r.open = !0, ne(this, Pn, document.createElement("maw-builder-host")), c(this, Pn).style.cssText = "position:fixed;inset:0;z-index:2147483000;display:block;";
  const a = c(this, Pn).attachShadow({ mode: "open" });
  a.appendChild(zl());
  const i = document.createElement("div");
  i.className = "maw-root", a.appendChild(i), document.body.appendChild(c(this, Pn)), document.documentElement.style.overflow = "hidden", ne(this, zn, vl(Dh, {
    target: i,
    props: { store: r, close: () => ve(this, tn, Ei).call(this) }
  })), (r.dirty ? Promise.resolve() : r.refreshBase()).then(() => {
    var l;
    return (l = r.presence) == null ? void 0 : l.claim();
  }), r.refreshClipboard();
}, Ei = function() {
  var r, a;
  const t = !!c(this, zn);
  c(this, zn) && fl(c(this, zn)), ne(this, zn, null), (r = c(this, Pn)) == null || r.remove(), ne(this, Pn, null), document.documentElement.style.overflow = "", c(this, rt) && (c(this, rt).open = !1, c(this, rt).isSection && c(this, rt).closeSection(), c(this, rt).select(-1), t && ((a = c(this, rt).presence) == null || a.leave()));
};
customElements.get(Pl) || customElements.define(Pl, Gh);
