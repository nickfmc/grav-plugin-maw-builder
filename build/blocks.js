var eo = Object.defineProperty;
var aa = (t) => {
  throw TypeError(t);
};
var to = (t, e, n) => e in t ? eo(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var ut = (t, e, n) => to(t, typeof e != "symbol" ? e + "" : e, n), ai = (t, e, n) => e.has(t) || aa("Cannot " + n);
var c = (t, e, n) => (ai(t, e, "read from private field"), n ? n.call(t) : e.get(t)), I = (t, e, n) => e.has(t) ? aa("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), V = (t, e, n, r) => (ai(t, e, "write to private field"), r ? r.call(t, n) : e.set(t, n), n), se = (t, e, n) => (ai(t, e, "access private method"), n);
var ws = Array.isArray, no = Array.prototype.indexOf, qs = Array.prototype.includes, $s = Array.from, Ia = Object.defineProperty, ar = Object.getOwnPropertyDescriptor, ro = Object.getOwnPropertyDescriptors, ja = Object.prototype, so = Array.prototype, Ii = Object.getPrototypeOf, la = Object.isExtensible;
const Fa = () => {
};
function io(t) {
  for (var e = 0; e < t.length; e++)
    t[e]();
}
function qa() {
  var t, e, n = new Promise((r, i) => {
    t = r, e = i;
  });
  return { promise: n, resolve: t, reject: e };
}
function Ua(t, e) {
  if (Array.isArray(t))
    return t;
  if (e === void 0 || !(Symbol.iterator in t))
    return Array.from(t);
  const n = [];
  for (const r of t)
    if (n.push(r), n.length === e) break;
  return n;
}
const lt = 2, mr = 4, ei = 8, Ha = 1 << 24, Bt = 16, Lt = 32, vn = 64, bi = 128, ji = 256, Dt = 512, tt = 1024, nt = 2048, Kt = 4096, _t = 8192, wt = 16384, xr = 32768, Us = 1 << 25, Wn = 65536, Hs = 1 << 17, ao = 1 << 18, Sr = 1 << 19, lo = 1 << 20, $t = 1 << 25, Xn = 65536, Gs = 1 << 21, lr = 1 << 22, Mn = 1 << 23, Kn = Symbol("$state"), Ga = Symbol("component"), oo = Symbol("legacy props"), co = Symbol(""), Os = Symbol("attributes"), _i = Symbol("class"), mi = Symbol("style"), zr = Symbol("text"), Rs = Symbol("form reset"), xs = new class extends Error {
  constructor() {
    super(...arguments);
    ut(this, "name", "StaleReactionError");
    ut(this, "message", "The reaction that called `getAbortSignal()` was re-run or destroyed");
  }
}();
var Ra;
const uo = (
  // We gotta write it like this because after downleveling the pure comment may end up in the wrong location
  !!((Ra = globalThis.document) != null && Ra.contentType) && /* @__PURE__ */ globalThis.document.contentType.includes("xml")
), fo = 1, vo = 2, Ba = 4, ho = 8, po = 16, go = 1, bo = 4, _o = 8, mo = 16, yo = 1, ko = 2, et = Symbol("uninitialized"), wo = "http://www.w3.org/1999/xhtml";
function xo() {
  console.warn("https://svelte.dev/e/derived_inert");
}
function So() {
  console.warn("https://svelte.dev/e/select_multiple_invalid_value");
}
function Eo() {
  console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
function Va(t) {
  return t === this.v;
}
function Mo(t, e) {
  return t != t ? e == e : t !== e || t !== null && typeof t == "object" || typeof t == "function";
}
function Ka(t) {
  return !Mo(t, this.v);
}
function To(t) {
  throw new Error("https://svelte.dev/e/lifecycle_outside_component");
}
function Ao() {
  throw new Error("https://svelte.dev/e/async_derived_orphan");
}
function Co(t, e, n) {
  throw new Error("https://svelte.dev/e/each_key_duplicate");
}
function Po(t) {
  throw new Error("https://svelte.dev/e/effect_in_teardown");
}
function zo() {
  throw new Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function No(t) {
  throw new Error("https://svelte.dev/e/effect_orphan");
}
function Oo() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function Ro(t) {
  throw new Error("https://svelte.dev/e/props_invalid_value");
}
function Do() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function Lo() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function Io() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
function jo() {
  throw new Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
const Fo = [];
function On(t, e = !1, n = !1) {
  return Ds(t, /* @__PURE__ */ new Map(), "", Fo, null, n);
}
function Ds(t, e, n, r, i = null, a = !1) {
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
    if (ws(t)) {
      var o = (
        /** @type {Snapshot<any>} */
        Array(t.length)
      );
      e.set(t, o), i !== null && e.set(i, o);
      for (var u = 0; u < t.length; u += 1) {
        var p = t[u];
        u in t && (o[u] = Ds(p, e, n, r, null, a));
      }
      return o;
    }
    if (Ii(t) === ja) {
      o = {}, e.set(t, o), i !== null && e.set(i, o);
      for (var h of Object.keys(t))
        o[h] = Ds(
          // @ts-expect-error
          t[h],
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
      return Ds(
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
let ft = null;
function yr(t) {
  ft = t;
}
function rt(t, e = !1, n) {
  ft = {
    p: ft,
    i: !1,
    c: null,
    e: null,
    s: t,
    x: null,
    r: (
      /** @type {Effect} */
      Me
    ),
    l: null
  };
}
function st(t) {
  var e = (
    /** @type {ComponentContext} */
    ft
  ), n = e.e;
  if (n !== null) {
    e.e = null;
    for (var r of n)
      hl(r);
  }
  return t !== void 0 && (e.x = t), e.i = !0, ft = e.p, Fi(t);
}
function Fi(t = {}) {
  return Ia(t, Ga, { value: !0 }), t;
}
function Ja() {
  return !0;
}
let Rn = [];
function Ya() {
  var t = Rn;
  Rn = [], io(t);
}
function en(t) {
  if (Rn.length === 0 && !Fr) {
    var e = Rn;
    queueMicrotask(() => {
      e === Rn && Ya();
    });
  }
  Rn.push(t);
}
function qo() {
  for (; Rn.length > 0; )
    Ya();
}
const Uo = -7169;
function Je(t, e) {
  t.f = t.f & Uo | e;
}
function qi(t) {
  (t.f & Dt) !== 0 || t.deps === null ? Je(t, tt) : Je(t, Kt);
}
function Wa(t) {
  if (t !== null)
    for (const e of t)
      (e.f & lt) === 0 || (e.f & Xn) === 0 || (e.f ^= Xn, Wa(
        /** @type {Derived} */
        e.deps
      ));
}
function Xa(t, e, n) {
  (t.f & nt) !== 0 ? e.add(t) : (t.f & Kt) !== 0 && n.add(t), Wa(t.deps), Je(t, tt);
}
let zs = !1;
function Ho(t) {
  var e = zs;
  try {
    return zs = !1, [t(), zs];
  } finally {
    zs = e;
  }
}
function Go(t, e) {
  {
    const n = document.body;
    t.autofocus = !0, en(() => {
      document.activeElement === n && t.focus();
    });
  }
}
let oa = !1;
function Bo() {
  oa || (oa = !0, document.addEventListener(
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
            (e = n[Rs]) == null || e.call(n);
      });
    },
    // In the capture phase to guarantee we get noticed of it (no possibility of stopPropagation)
    { capture: !0 }
  ));
}
function Er(t) {
  var e = we, n = Me;
  It(null), rn(null);
  try {
    return t();
  } finally {
    It(e), rn(n);
  }
}
function Za(t, e, n, r = n) {
  t.addEventListener(e, () => Er(n));
  const i = (
    /** @type {any} */
    t[Rs]
  );
  i ? t[Rs] = () => {
    i(), r(!0);
  } : t[Rs] = () => r(!0), Bo();
}
function Vo(t, e, n, r) {
  const i = Hr;
  var a = t.filter((_) => !_.settled), l = e.map(i);
  if (n.length === 0 && a.length === 0) {
    r(l);
    return;
  }
  var o = (
    /** @type {Effect} */
    Me
  ), u = Ko(), p = a.length === 1 ? a[0].promise : a.length > 1 ? Promise.all(a.map((_) => _.promise)) : null;
  function h(_) {
    if ((o.f & wt) === 0) {
      u();
      try {
        r([...l, ..._]);
      } catch (E) {
        Qt(E, o);
      }
      Bs();
    }
  }
  var M = Qa();
  if (n.length === 0) {
    p.then(() => h([])).finally(M);
    return;
  }
  function f() {
    Promise.all(n.map((_) => /* @__PURE__ */ Jo(_))).then(h).catch((_) => Qt(_, o)).finally(M);
  }
  p ? p.then(() => {
    u(), f(), Bs();
  }) : f();
}
function Ko() {
  var t = (
    /** @type {Effect} */
    Me
  ), e = we, n = ft, r = (
    /** @type {Batch} */
    ae
  );
  return function(a = !0) {
    rn(t), It(e), yr(n), a && (t.f & wt) === 0 && (r == null || r.activate(), r == null || r.apply());
  };
}
function Bs(t = !0) {
  rn(null), It(null), yr(null), t && (ae == null || ae.deactivate());
}
function Qa() {
  var t = (
    /** @type {Effect} */
    Me
  ), e = t.b, n = (
    /** @type {Batch} */
    ae
  ), r = !!(e != null && e.is_rendered());
  return e == null || e.update_pending_count(1, n), n.increment(r, t), () => {
    e == null || e.update_pending_count(-1, n), n.decrement(r, t);
  };
}
// @__NO_SIDE_EFFECTS__
function Hr(t) {
  var e = lt | nt;
  return Me !== null && (Me.f |= Sr), {
    ctx: ft,
    deps: null,
    effects: null,
    equals: Va,
    f: e,
    fn: t,
    reactions: null,
    rv: 0,
    v: (
      /** @type {V} */
      et
    ),
    wv: 0,
    parent: Me,
    ac: null
  };
}
const Nr = Symbol("obsolete");
// @__NO_SIDE_EFFECTS__
function Jo(t, e, n) {
  let r = (
    /** @type {Effect | null} */
    Me
  );
  r === null && Ao();
  var i = (
    /** @type {Promise<V>} */
    /** @type {unknown} */
    void 0
  ), a = Qn(
    /** @type {V} */
    et
  ), l = !we, o = /* @__PURE__ */ new Set();
  return cc(() => {
    var _, E;
    var u = (
      /** @type {Effect} */
      Me
    ), p = qa();
    i = p.promise;
    try {
      Promise.resolve(t()).then(p.resolve, (w) => {
        w !== xs && p.reject(w);
      }).finally(Bs);
    } catch (w) {
      p.reject(w), Bs();
    }
    var h = (
      /** @type {Batch} */
      ae
    );
    if (l) {
      if ((u.f & xr) !== 0)
        var M = Qa();
      if (
        // boundary can be null if the async derived is inside an $effect.root not connected to the component render tree
        (_ = r.b) != null && _.is_rendered()
      )
        (E = h.async_deriveds.get(u)) == null || E.reject(Nr);
      else
        for (const w of o.values())
          w.reject(Nr);
      o.add(p), h.async_deriveds.set(u, p);
    }
    const f = (w, v = void 0) => {
      M == null || M(), o.delete(p), v !== Nr && (h.activate(), v ? (a.f |= Mn, kr(a, v)) : ((a.f & Mn) !== 0 && (a.f ^= Mn), kr(a, w)), h.deactivate());
    };
    p.promise.then(f, (w) => f(null, w || "unknown"));
  }), Vi(() => {
    for (const u of o)
      u.reject(Nr);
  }), new Promise((u) => {
    function p(h) {
      function M() {
        h === i ? u(a) : p(i);
      }
      h.then(M, M);
    }
    p(i);
  });
}
// @__NO_SIDE_EFFECTS__
function fe(t) {
  const e = /* @__PURE__ */ Hr(t);
  return ml(e), e;
}
// @__NO_SIDE_EFFECTS__
function $a(t) {
  const e = /* @__PURE__ */ Hr(t);
  return e.equals = Ka, e;
}
function Yo(t) {
  var e = t.effects;
  if (e !== null) {
    t.effects = null;
    for (var n = 0; n < e.length; n += 1)
      xt(
        /** @type {Effect} */
        e[n]
      );
  }
}
function Ui(t) {
  var e, n = Me, r = t.parent;
  if (!hn && r !== null && t.v !== et && // if it was never evaluated before, it's guaranteed to fail downstream, so we try to execute instead
  (r.f & (wt | _t)) !== 0)
    return xo(), t.v;
  rn(r);
  try {
    t.f &= ~Xn, Yo(t), e = xl(t);
  } finally {
    rn(n);
  }
  return e;
}
function el(t) {
  var e = Ui(t);
  if (!t.equals(e) && (t.wv = kl(), (!(ae != null && ae.is_fork) || t.deps === null) && (ae !== null ? (ae.capture(t, e, !0), jr == null || jr.capture(t, e, !0)) : t.v = e, t.deps === null))) {
    Je(t, tt);
    return;
  }
  hn || (ct !== null ? (Bi() || ae != null && ae.is_fork) && ct.set(t, e) : qi(t));
}
function Wo(t) {
  var e;
  if (t.effects !== null)
    for (const n of t.effects)
      (n.teardown || n.ac) && ((e = n.teardown) == null || e.call(n), n.ac !== null && Er(() => {
        n.ac.abort(xs), n.ac = null;
      }), n.fn !== null && (n.teardown = Fa), Gr(n, 0), Yi(n));
}
function tl(t) {
  if (t.effects !== null)
    for (const e of t.effects)
      e.teardown && e.fn !== null && wr(e);
}
let li = null, nr = null, ae = null, jr = null, ct = null, yi = null, Fr = !1, oi = !1, ir = null, Ls = null;
var ca = 0;
let Xo = 1;
var cr, kn, jn, ur, dr, fr, on, vr, yt, Jr, cn, Ut, Wt, hr, Fn, De, ki, Or, wi, nl, rl, rr, Zo, Rr;
const Ys = class Ys {
  constructor() {
    I(this, De);
    ut(this, "id", Xo++);
    /** True as soon as `#process` was called */
    I(this, cr, !1);
    ut(this, "linked", !0);
    /** @type {Batch | null} */
    I(this, kn, null);
    /** @type {Batch | null} */
    I(this, jn, null);
    /** @type {Map<Effect, ReturnType<typeof deferred<any>>>} */
    ut(this, "async_deriveds", /* @__PURE__ */ new Map());
    /**
     * The current values of any signals that are updated in this batch.
     * Tuple format: [value, is_derived] (note: is_derived is false for deriveds, too, if they were overridden via assignment)
     * They keys of this map are identical to `this.#previous`
     * @type {Map<Value, [any, boolean]>}
     */
    ut(this, "current", /* @__PURE__ */ new Map());
    /**
     * The values of any signals (sources and deriveds) that are updated in this batch _before_ those updates took place.
     * They keys of this map are identical to `this.#current`
     * @type {Map<Value, any>}
     */
    ut(this, "previous", /* @__PURE__ */ new Map());
    /**
     * When the batch is committed (and the DOM is updated), we need to remove old branches
     * and append new ones by calling the functions added inside (if/each/key/etc) blocks
     * @type {Set<(batch: Batch) => void>}
     */
    I(this, ur, /* @__PURE__ */ new Set());
    /**
     * If a fork is discarded, we need to destroy any effects that are no longer needed
     * @type {Set<(batch: Batch) => void>}
     */
    I(this, dr, /* @__PURE__ */ new Set());
    /**
     * The number of async effects that are currently in flight
     */
    I(this, fr, 0);
    /**
     * Async effects that are currently in flight, _not_ inside a pending boundary
     * @type {Map<Effect, number>}
     */
    I(this, on, /* @__PURE__ */ new Map());
    /**
     * A deferred that resolves when the batch is committed, used with `settled()`
     * TODO replace with Promise.withResolvers once supported widely enough
     * @type {{ promise: Promise<void>, resolve: (value?: any) => void, reject: (reason: unknown) => void } | null}
     */
    I(this, vr, null);
    /**
     * The root effects that need to be flushed
     * @type {Effect[]}
     */
    I(this, yt, []);
    /**
     * Effects created while this batch was active.
     * @type {Effect[]}
     */
    I(this, Jr, []);
    /**
     * Deferred effects (which run after async work has completed) that are DIRTY
     * @type {Set<Effect>}
     */
    I(this, cn, /* @__PURE__ */ new Set());
    /**
     * Deferred effects that are MAYBE_DIRTY
     * @type {Set<Effect>}
     */
    I(this, Ut, /* @__PURE__ */ new Set());
    /**
     * A map of branches that still exist, but will be destroyed when this batch
     * is committed — we skip over these during `process`.
     * The value contains child effects that were dirty/maybe_dirty before being reset,
     * so they can be rescheduled if the branch survives.
     * @type {Map<Effect, { d: Effect[], m: Effect[] }>}
     */
    I(this, Wt, /* @__PURE__ */ new Map());
    /**
     * Inverse of #skipped_branches which we need to tell prior batches to unskip them when committing
     * @type {Set<Effect>}
     */
    I(this, hr, /* @__PURE__ */ new Set());
    ut(this, "is_fork", !1);
    I(this, Fn, !1);
    nr === null ? li = nr = this : (V(nr, jn, this), V(this, kn, nr)), nr = this;
  }
  /**
   * Add an effect to the #skipped_branches map and reset its children
   * @param {Effect} effect
   */
  skip_effect(e) {
    c(this, Wt).has(e) || c(this, Wt).set(e, { d: [], m: [] }), c(this, hr).delete(e);
  }
  /**
   * Remove an effect from the #skipped_branches map and reschedule
   * any tracked dirty/maybe_dirty child effects
   * @param {Effect} effect
   * @param {(e: Effect) => void} callback
   */
  unskip_effect(e, n = (r) => this.schedule(r)) {
    var r = c(this, Wt).get(e);
    if (r) {
      c(this, Wt).delete(e);
      for (var i of r.d)
        Je(i, nt), n(i);
      for (i of r.m)
        Je(i, Kt), n(i);
    }
    c(this, hr).add(e);
  }
  /**
   * Associate a change to a given source with the current
   * batch, noting its previous and current values
   * @param {Value} source
   * @param {any} value
   * @param {boolean} [is_derived]
   */
  capture(e, n, r = !1) {
    e.v !== et && !this.previous.has(e) && this.previous.set(e, e.v), (e.f & Mn) === 0 && (this.current.set(e, [n, r]), ct == null || ct.set(e, n)), this.is_fork || (e.v = n);
  }
  activate() {
    ae = this;
  }
  deactivate() {
    ae = null, ct = null;
  }
  flush() {
    try {
      oi = !0, ae = this, se(this, De, Or).call(this);
    } finally {
      ca = 0, yi = null, ir = null, Ls = null, oi = !1, ae = null, ct = null, tn.clear();
    }
  }
  discard() {
    var e;
    for (const n of c(this, dr)) n(this);
    c(this, dr).clear();
    for (const n of this.async_deriveds.values())
      n.reject(Nr);
    se(this, De, Rr).call(this), (e = c(this, vr)) == null || e.resolve();
  }
  /**
   * @param {Effect} effect
   */
  register_created_effect(e) {
    c(this, Jr).push(e);
  }
  /**
   * @param {boolean} blocking
   * @param {Effect} effect
   */
  increment(e, n) {
    if (V(this, fr, c(this, fr) + 1), e) {
      let r = c(this, on).get(n) ?? 0;
      c(this, on).set(n, r + 1);
    }
  }
  /**
   * @param {boolean} blocking
   * @param {Effect} effect
   */
  decrement(e, n) {
    if (V(this, fr, c(this, fr) - 1), e) {
      let r = c(this, on).get(n) ?? 0;
      r === 1 ? c(this, on).delete(n) : c(this, on).set(n, r - 1);
    }
    c(this, Fn) || (V(this, Fn, !0), en(() => {
      V(this, Fn, !1), this.linked && this.flush();
    }));
  }
  /**
   * @param {Set<Effect>} dirty_effects
   * @param {Set<Effect>} maybe_dirty_effects
   */
  transfer_effects(e, n) {
    for (const r of e)
      c(this, cn).add(r);
    for (const r of n)
      c(this, Ut).add(r);
    e.clear(), n.clear();
  }
  /** @param {(batch: Batch) => void} fn */
  oncommit(e) {
    c(this, ur).add(e);
  }
  /** @param {(batch: Batch) => void} fn */
  ondiscard(e) {
    c(this, dr).add(e);
  }
  settled() {
    return (c(this, vr) ?? V(this, vr, qa())).promise;
  }
  static ensure() {
    if (ae === null) {
      const e = ae = new Ys();
      !oi && !Fr && en(() => {
        c(e, cr) || e.flush();
      });
    }
    return ae;
  }
  apply() {
    {
      ct = null;
      return;
    }
  }
  /**
   *
   * @param {Effect} effect
   */
  schedule(e) {
    var i;
    if (yi = e, (i = e.b) != null && i.is_pending && (e.f & (mr | ei | Ha)) !== 0 && (e.f & xr) === 0) {
      e.b.defer_effect(e);
      return;
    }
    for (var n = e; n.parent !== null; ) {
      n = n.parent;
      var r = n.f;
      if (ir !== null && n === Me && (we === null || (we.f & lt) === 0))
        return;
      if ((r & (vn | Lt)) !== 0) {
        if ((r & tt) === 0)
          return;
        n.f ^= tt;
      }
    }
    c(this, yt).push(n);
  }
};
cr = new WeakMap(), kn = new WeakMap(), jn = new WeakMap(), ur = new WeakMap(), dr = new WeakMap(), fr = new WeakMap(), on = new WeakMap(), vr = new WeakMap(), yt = new WeakMap(), Jr = new WeakMap(), cn = new WeakMap(), Ut = new WeakMap(), Wt = new WeakMap(), hr = new WeakMap(), Fn = new WeakMap(), De = new WeakSet(), ki = function() {
  if (this.is_fork) return !0;
  for (const r of c(this, on).keys()) {
    for (var e = r, n = !1; e.parent !== null; ) {
      if (c(this, Wt).has(e)) {
        n = !0;
        break;
      }
      e = e.parent;
    }
    if (!n)
      return !0;
  }
  return !1;
}, Or = function() {
  var u, p, h, M;
  V(this, cr, !0), ca++ > 1e3 && (se(this, De, Rr).call(this), $o());
  for (const f of c(this, cn))
    c(this, Ut).delete(f), Je(f, nt), this.schedule(f);
  for (const f of c(this, Ut))
    Je(f, Kt), this.schedule(f);
  const e = c(this, yt);
  V(this, yt, []), this.apply();
  var n = ir = [], r = [], i = Ls = [];
  for (const f of e)
    try {
      se(this, De, wi).call(this, f, n, r);
    } catch (_) {
      throw al(f), se(this, De, ki).call(this) || this.discard(), _;
    }
  if (ae = null, i.length > 0) {
    var a = Ys.ensure();
    for (const f of i)
      a.schedule(f);
  }
  if (ir = null, Ls = null, se(this, De, ki).call(this)) {
    se(this, De, rr).call(this, r), se(this, De, rr).call(this, n);
    for (const [f, _] of c(this, Wt))
      il(f, _);
    i.length > 0 && /** @type {unknown} */
    se(u = ae, De, Or).call(u);
    return;
  }
  const l = se(this, De, nl).call(this);
  if (l) {
    se(this, De, rr).call(this, r), se(this, De, rr).call(this, n), se(p = l, De, rl).call(p, this);
    return;
  }
  c(this, cn).clear(), c(this, Ut).clear();
  for (const f of c(this, ur)) f(this);
  c(this, ur).clear(), jr = this, ua(r), ua(n), jr = null, (h = c(this, vr)) == null || h.resolve();
  var o = (
    /** @type {Batch | null} */
    /** @type {unknown} */
    ae
  );
  if (c(this, fr) === 0 && (c(this, yt).length === 0 || o !== null) && se(this, De, Rr).call(this), c(this, yt).length > 0)
    if (o !== null) {
      const f = o;
      c(f, yt).push(...c(this, yt).filter((_) => !c(f, yt).includes(_)));
    } else
      o = this;
  o !== null && (tn.clear(), se(M = o, De, Or).call(M));
}, /**
 * Traverse the effect tree, executing effects or stashing
 * them for later execution as appropriate
 * @param {Effect} root
 * @param {Effect[]} effects
 * @param {Effect[]} render_effects
 */
wi = function(e, n, r) {
  e.f ^= tt;
  for (var i = e.first; i !== null; ) {
    var a = i.f, l = (a & (Lt | vn)) !== 0, o = l && (a & tt) !== 0, u = o || (a & _t) !== 0 || c(this, Wt).has(i);
    if (!u && i.fn !== null) {
      l ? i.f ^= tt : (a & mr) !== 0 ? n.push(i) : Ms(i) && ((a & Bt) !== 0 && c(this, Ut).add(i), wr(i));
      var p = i.first;
      if (p !== null) {
        i = p;
        continue;
      }
    }
    for (; i !== null; ) {
      var h = i.next;
      if (h !== null) {
        i = h;
        break;
      }
      i = i.parent;
    }
  }
}, nl = function() {
  for (var e = c(this, kn); e !== null; ) {
    if (!e.is_fork) {
      for (const [n, [, r]] of this.current)
        if (e.current.has(n) && !r)
          return e;
    }
    e = c(e, kn);
  }
  return null;
}, /**
 * @param {Batch} batch
 */
rl = function(e) {
  var r;
  for (const [i, a] of e.current)
    !this.previous.has(i) && e.previous.has(i) && this.previous.set(i, e.previous.get(i)), this.current.set(i, a);
  for (const [i, a] of e.async_deriveds) {
    const l = this.async_deriveds.get(i);
    l && a.promise.then(l.resolve).catch(l.reject);
  }
  e.async_deriveds.clear(), this.transfer_effects(c(e, cn), c(e, Ut));
  const n = (i) => {
    var a = i.reactions;
    if (a !== null && !((i.f & lt) !== 0 && (i.f & (nt | Kt)) === 0))
      for (const u of a) {
        var l = u.f;
        if ((l & lt) !== 0)
          n(
            /** @type {Derived} */
            u
          );
        else {
          var o = (
            /** @type {Effect} */
            u
          );
          l & (lr | Bt) && !this.async_deriveds.has(o) && (c(this, Ut).delete(o), Je(o, nt), this.schedule(o));
        }
      }
  };
  for (const i of this.current.keys())
    n(i);
  this.oncommit(() => e.discard()), se(r = e, De, Rr).call(r), ae = this, se(this, De, Or).call(this);
}, /**
 * @param {Effect[]} effects
 */
rr = function(e) {
  for (var n = 0; n < e.length; n += 1)
    Xa(e[n], c(this, cn), c(this, Ut));
}, Zo = function() {
  var M;
  for (let f = li; f !== null; f = c(f, jn)) {
    var e = f.id < this.id, n = [];
    for (const [_, [E, w]] of this.current) {
      if (f.current.has(_)) {
        var r = (
          /** @type {[any, boolean]} */
          f.current.get(_)[0]
        );
        if (e && E !== r)
          f.current.set(_, [E, w]);
        else
          continue;
      }
      n.push(_);
    }
    if (e)
      for (const [_, E] of this.async_deriveds) {
        const w = f.async_deriveds.get(_);
        w && E.promise.then(w.resolve).catch(w.reject);
      }
    var i = [...f.current.keys()].filter(
      (_) => !/** @type {[any, boolean]} */
      f.current.get(_)[1]
    );
    if (!(!c(f, cr) || i.length === 0)) {
      var a = i.filter((_) => !this.current.has(_));
      if (a.length === 0)
        e && f.discard();
      else if (n.length > 0) {
        if (e)
          for (const _ of c(this, hr))
            f.unskip_effect(_, (E) => {
              var w;
              (E.f & (Bt | lr)) !== 0 ? f.schedule(E) : se(w = f, De, rr).call(w, [E]);
            });
        f.activate();
        var l = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Map();
        for (var u of n)
          sl(u, a, l, o);
        o = /* @__PURE__ */ new Map();
        var p = [...f.current].filter(([_, E]) => {
          const w = this.current.get(_);
          return w ? w[0] !== E[0] || w[1] !== E[1] : !0;
        }).map(([_]) => _);
        if (p.length > 0)
          for (const _ of c(this, Jr))
            (_.f & (wt | _t | Hs)) === 0 && Hi(_, p, o) && ((_.f & (lr | Bt)) !== 0 ? (Je(_, nt), f.schedule(_)) : c(f, cn).add(_));
        if (c(f, yt).length > 0 && !c(f, Fn)) {
          f.apply();
          for (var h of c(f, yt))
            se(M = f, De, wi).call(M, h, [], []);
          V(f, yt, []);
        }
        f.deactivate();
      }
    }
  }
}, Rr = function() {
  if (this.linked) {
    var e = c(this, kn), n = c(this, jn);
    e === null ? li = n : V(e, jn, n), n === null ? nr = e : V(n, kn, e), this.linked = !1;
  }
};
let Zn = Ys;
function Qo(t) {
  var e = Fr;
  Fr = !0;
  try {
    for (var n; ; ) {
      if (qo(), ae === null)
        return (
          /** @type {T} */
          n
        );
      ae.flush();
    }
  } finally {
    Fr = e;
  }
}
function $o() {
  try {
    Oo();
  } catch (t) {
    Qt(t, yi);
  }
}
let qt = null;
function ua(t) {
  var e = t.length;
  if (e !== 0) {
    for (var n = 0; n < e; ) {
      var r = t[n++];
      if ((r.f & (wt | _t)) === 0 && Ms(r) && (qt = /* @__PURE__ */ new Set(), wr(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && gl(r), (qt == null ? void 0 : qt.size) > 0)) {
        tn.clear();
        for (const i of qt) {
          if ((i.f & (wt | _t)) !== 0) continue;
          const a = [i];
          let l = i.parent;
          for (; l !== null; )
            qt.has(l) && (qt.delete(l), a.push(l)), l = l.parent;
          for (let o = a.length - 1; o >= 0; o--) {
            const u = a[o];
            (u.f & (wt | _t)) === 0 && wr(u);
          }
        }
        qt.clear();
      }
    }
    qt = null;
  }
}
function sl(t, e, n, r) {
  if (!n.has(t) && (n.add(t), t.reactions !== null))
    for (const i of t.reactions) {
      const a = i.f;
      (a & lt) !== 0 ? sl(
        /** @type {Derived} */
        i,
        e,
        n,
        r
      ) : (a & (lr | Bt)) !== 0 && (a & nt) === 0 && Hi(i, e, r) && (Je(i, nt), Gi(
        /** @type {Effect} */
        i
      ));
    }
}
function Hi(t, e, n) {
  const r = n.get(t);
  if (r !== void 0) return r;
  if (t.deps !== null)
    for (const i of t.deps) {
      if (qs.call(e, i))
        return !0;
      if ((i.f & lt) !== 0 && Hi(
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
function Gi(t) {
  ae.schedule(t);
}
function il(t, e) {
  if (!((t.f & Lt) !== 0 && (t.f & tt) !== 0)) {
    (t.f & nt) !== 0 ? e.d.push(t) : (t.f & Kt) !== 0 && e.m.push(t), Je(t, tt);
    for (var n = t.first; n !== null; )
      il(n, e), n = n.next;
  }
}
function al(t) {
  Je(t, tt);
  for (var e = t.first; e !== null; )
    al(e), e = e.next;
}
let Vs = /* @__PURE__ */ new Set();
const tn = /* @__PURE__ */ new Map();
let ll = !1;
function Qn(t, e) {
  var n = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: t,
    reactions: null,
    equals: Va,
    rv: 0,
    wv: 0
  };
  return n;
}
// @__NO_SIDE_EFFECTS__
function D(t, e) {
  const n = Qn(t);
  return ml(n), n;
}
// @__NO_SIDE_EFFECTS__
function ec(t, e = !1, n = !0) {
  const r = Qn(t);
  return e || (r.equals = Ka), r;
}
function b(t, e, n = !1) {
  we !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!Vt || (we.f & Hs) !== 0) && Ja() && (we.f & (lt | Bt | lr | Hs)) !== 0 && (nn === null || !nn.has(t)) && Io();
  let r = n ? Ye(e) : e;
  return kr(t, r, Ls);
}
function kr(t, e, n = null) {
  if (!t.equals(e)) {
    hn ? tn.set(t, e) : tn.has(t) || tn.set(t, t.v);
    var r = Zn.ensure();
    if (r.capture(t, e), (t.f & lt) !== 0) {
      const i = (
        /** @type {Derived} */
        t
      );
      (t.f & nt) !== 0 && Ui(i), ct === null && qi(i);
    }
    t.wv = kl(), ol(t, nt, n), Me !== null && (Me.f & tt) !== 0 && (Me.f & (Lt | vn)) === 0 && (zt === null ? fc([t]) : zt.push(t)), !r.is_fork && Vs.size > 0 && !ll && tc();
  }
  return e;
}
function tc() {
  ll = !1;
  for (const t of Vs) {
    (t.f & tt) !== 0 && Je(t, Kt);
    let e;
    try {
      e = Ms(t);
    } catch {
      e = !0;
    }
    e && wr(t);
  }
  Vs.clear();
}
function qr(t) {
  b(t, t.v + 1);
}
function ol(t, e, n) {
  var r = t.reactions;
  if (r !== null)
    for (var i = r.length, a = 0; a < i; a++) {
      var l = r[a], o = l.f, u = (o & nt) === 0;
      if (u && Je(l, e), (o & Hs) !== 0)
        Vs.add(
          /** @type {Effect} */
          l
        );
      else if ((o & lt) !== 0) {
        var p = (
          /** @type {Derived} */
          l
        );
        ct == null || ct.delete(p), (o & Xn) === 0 && (o & Dt && (Me === null || (Me.f & Gs) === 0) && (l.f |= Xn), ol(p, Kt, n));
      } else if (u) {
        var h = (
          /** @type {Effect} */
          l
        );
        (o & Bt) !== 0 && qt !== null && qt.add(h), n !== null ? n.push(h) : Gi(h);
      }
    }
}
function Ye(t) {
  if (typeof t != "object" || t === null || Kn in t || Ga in t)
    return t;
  const e = Ii(t);
  if (e !== ja && e !== so)
    return t;
  var n = /* @__PURE__ */ new Map(), r = ws(t), i = /* @__PURE__ */ D(0), a = Yn, l = (o) => {
    if (Yn === a)
      return o();
    var u = we, p = Yn;
    It(null), ha(a);
    var h = o();
    return It(u), ha(p), h;
  };
  return r && n.set("length", /* @__PURE__ */ D(
    /** @type {any[]} */
    t.length
  )), new Proxy(
    /** @type {any} */
    t,
    {
      defineProperty(o, u, p) {
        (!("value" in p) || p.configurable === !1 || p.enumerable === !1 || p.writable === !1) && Do();
        var h = n.get(u);
        return h === void 0 ? l(() => {
          var M = /* @__PURE__ */ D(p.value);
          return n.set(u, M), M;
        }) : b(h, p.value, !0), !0;
      },
      deleteProperty(o, u) {
        var p = n.get(u);
        if (p === void 0) {
          if (u in o) {
            const h = l(() => /* @__PURE__ */ D(et));
            n.set(u, h), qr(i);
          }
        } else
          b(p, et), qr(i);
        return !0;
      },
      get(o, u, p) {
        var _;
        if (u === Kn)
          return t;
        var h = n.get(u), M = u in o;
        if (h === void 0 && (!M || (_ = ar(o, u)) != null && _.writable) && (h = l(() => {
          var E = Ye(M ? o[u] : et), w = /* @__PURE__ */ D(E);
          return w;
        }), n.set(u, h)), h !== void 0) {
          var f = s(h);
          return f === et ? void 0 : f;
        }
        return Reflect.get(o, u, p);
      },
      getOwnPropertyDescriptor(o, u) {
        var p = Reflect.getOwnPropertyDescriptor(o, u);
        if (p && "value" in p) {
          var h = n.get(u);
          h && (p.value = s(h));
        } else if (p === void 0) {
          var M = n.get(u), f = M == null ? void 0 : M.v;
          if (M !== void 0 && f !== et)
            return {
              enumerable: !0,
              configurable: !0,
              value: f,
              writable: !0
            };
        }
        return p;
      },
      has(o, u) {
        var f;
        if (u === Kn)
          return !0;
        var p = n.get(u), h = p !== void 0 && p.v !== et || Reflect.has(o, u);
        if (p !== void 0 || Me !== null && (!h || (f = ar(o, u)) != null && f.writable)) {
          p === void 0 && (p = l(() => {
            var _ = h ? Ye(o[u]) : et, E = /* @__PURE__ */ D(_);
            return E;
          }), n.set(u, p));
          var M = s(p);
          if (M === et)
            return !1;
        }
        return h;
      },
      set(o, u, p, h) {
        var P;
        var M = n.get(u), f = u in o;
        if (r && u === "length")
          for (var _ = p; _ < /** @type {Source<number>} */
          M.v; _ += 1) {
            var E = n.get(_ + "");
            E !== void 0 ? b(E, et) : _ in o && (E = l(() => /* @__PURE__ */ D(et)), n.set(_ + "", E));
          }
        if (M === void 0)
          (!f || (P = ar(o, u)) != null && P.writable) && (M = l(() => /* @__PURE__ */ D(void 0)), b(M, Ye(p)), n.set(u, M));
        else {
          f = M.v !== et;
          var w = l(() => Ye(p));
          b(M, w);
        }
        var v = Reflect.getOwnPropertyDescriptor(o, u);
        if (v != null && v.set && v.set.call(h, p), !f) {
          if (r && typeof u == "string") {
            var A = (
              /** @type {Source<number>} */
              n.get("length")
            ), L = Number(u);
            Number.isInteger(L) && L >= A.v && b(A, L + 1);
          }
          qr(i);
        }
        return !0;
      },
      ownKeys(o) {
        s(i);
        var u = Reflect.ownKeys(o).filter((M) => {
          var f = n.get(M);
          return f === void 0 || f.v !== et;
        });
        for (var [p, h] of n)
          h.v !== et && !(p in o) && u.push(p);
        return u;
      },
      setPrototypeOf() {
        Lo();
      }
    }
  );
}
function da(t) {
  try {
    if (t !== null && typeof t == "object" && Kn in t)
      return t[Kn];
  } catch {
  }
  return t;
}
function cl(t, e) {
  return Object.is(da(t), da(e));
}
var fa, ul, dl, fl;
function nc() {
  if (fa === void 0) {
    fa = window, ul = /Firefox/.test(navigator.userAgent);
    var t = Element.prototype, e = Node.prototype, n = Text.prototype;
    dl = ar(e, "firstChild").get, fl = ar(e, "nextSibling").get, la(t) && (t[_i] = void 0, t[Os] = null, t[mi] = void 0, t.__e = void 0), la(n) && (n[zr] = void 0);
  }
}
function fn(t = "") {
  return document.createTextNode(t);
}
// @__NO_SIDE_EFFECTS__
function $n(t) {
  return (
    /** @type {TemplateNode | null} */
    dl.call(t)
  );
}
// @__NO_SIDE_EFFECTS__
function Ss(t) {
  return (
    /** @type {TemplateNode | null} */
    fl.call(t)
  );
}
function m(t, e) {
  return /* @__PURE__ */ $n(t);
}
function Ee(t, e = !1) {
  {
    var n = /* @__PURE__ */ $n(t);
    return n instanceof Comment && n.data === "" ? /* @__PURE__ */ Ss(n) : n;
  }
}
function Y(t, e = !1) {
  return /* @__PURE__ */ $n(t);
}
function g(t, e = 1, n = !1) {
  let r = t;
  for (; e--; )
    r = /** @type {TemplateNode} */
    /* @__PURE__ */ Ss(r);
  return r;
}
function rc(t) {
  t.textContent = "";
}
function vl() {
  return !1;
}
function sc(t, e, n) {
  return (
    /** @type {T extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[T] : Element} */
    n ? document.createElement(t, { is: n }) : document.createElement(t)
  );
}
function ic(t) {
  var e = Me;
  if (e === null)
    return we.f |= Mn, t;
  if ((e.f & xr) === 0 && (e.f & mr) === 0)
    throw t;
  Qt(t, e);
}
function Qt(t, e) {
  if (!(e !== null && (e.f & wt) !== 0)) {
    for (; e !== null; ) {
      if ((e.f & bi) !== 0 && (e.f & (wt | Us)) === 0) {
        if ((e.f & xr) === 0)
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
function ac(t) {
  Me === null && (we === null && No(), zo()), hn && Po();
}
function lc(t, e) {
  var n = e.last;
  n === null ? e.last = e.first = t : (n.next = t, t.prev = n, e.last = t);
}
function gn(t, e) {
  var n = Me;
  n !== null && (n.f & _t) !== 0 && (t |= _t);
  var r = {
    ctx: ft,
    deps: null,
    nodes: null,
    f: t | nt | Dt,
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
  ae == null || ae.register_created_effect(r);
  var i = r;
  if ((t & mr) !== 0)
    ir !== null ? ir.push(r) : Zn.ensure().schedule(r);
  else if (e !== null) {
    try {
      wr(r);
    } catch (l) {
      throw xt(r), l;
    }
    i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && // either `null`, or a singular child
    (i.f & Sr) === 0 && (i = i.first, (t & Bt) !== 0 && (t & Wn) !== 0 && i !== null && (i.f |= Wn));
  }
  if (i !== null && (i.parent = n, n !== null && lc(i, n), we !== null && (we.f & lt) !== 0 && (t & vn) === 0)) {
    var a = (
      /** @type {Derived} */
      we
    );
    (a.effects ?? (a.effects = [])).push(i);
  }
  return r;
}
function Bi() {
  return we !== null && !Vt;
}
function Vi(t) {
  const e = gn(ei, null);
  return Je(e, tt), e.teardown = t, e;
}
function Pt(t) {
  ac();
  var e = (
    /** @type {Effect} */
    Me.f
  ), n = !we && (e & Lt) !== 0 && ft !== null && !ft.i;
  if (n) {
    var r = (
      /** @type {ComponentContext} */
      ft
    );
    (r.e ?? (r.e = [])).push(t);
  } else
    return hl(t);
}
function hl(t) {
  return gn(mr | lo, t);
}
function oc(t) {
  Zn.ensure();
  const e = gn(vn | Sr, t);
  return (n = {}) => new Promise((r) => {
    n.outro ? Jn(e, () => {
      xt(e), r(void 0);
    }) : (xt(e), r(void 0));
  });
}
function Ki(t) {
  return gn(mr, t);
}
function cc(t) {
  return gn(lr | Sr, t);
}
function Ji(t, e = 0) {
  return gn(ei | e, t);
}
function O(t, e = [], n = [], r = []) {
  Vo(r, e, n, (i) => {
    gn(ei, () => {
      t(...i.map(s));
    });
  });
}
function Es(t, e = 0) {
  var n = gn(Bt | e, t);
  return n;
}
function Rt(t) {
  return gn(Lt | Sr, t);
}
function pl(t) {
  var e = t.teardown;
  if (e !== null) {
    const n = hn, r = we;
    va(!0), It(null);
    try {
      e.call(null);
    } catch (i) {
      Qt(i, t.parent);
    } finally {
      va(n), It(r);
    }
  }
}
function Yi(t, e = !1) {
  var n = t.first;
  for (t.first = t.last = null; n !== null; ) {
    const i = n.ac;
    i !== null && Er(() => {
      i.abort(xs);
    });
    var r = n.next;
    (n.f & vn) !== 0 ? n.parent = null : xt(n, e), n = r;
  }
}
function uc(t) {
  for (var e = t.first; e !== null; ) {
    var n = e.next;
    (e.f & Lt) === 0 && xt(e), e = n;
  }
}
function xt(t, e = !0) {
  var n = !1;
  (e || (t.f & ao) !== 0) && t.nodes !== null && t.nodes.end !== null && (dc(
    t.nodes.start,
    /** @type {TemplateNode} */
    t.nodes.end
  ), n = !0), t.f |= Us, Yi(t, e && !n), Gr(t, 0);
  var r = t.nodes && t.nodes.t;
  if (r !== null)
    for (const a of r)
      a.stop();
  pl(t), t.f ^= Us, t.f |= wt;
  var i = t.parent;
  i !== null && i.first !== null && gl(t), t.next = t.prev = t.teardown = t.ctx = t.deps = t.fn = t.nodes = t.ac = t.b = null;
}
function dc(t, e) {
  for (; t !== null; ) {
    var n = t === e ? null : /* @__PURE__ */ Ss(t);
    t.remove(), t = n;
  }
}
function gl(t) {
  var e = t.parent, n = t.prev, r = t.next;
  n !== null && (n.next = r), r !== null && (r.prev = n), e !== null && (e.first === t && (e.first = r), e.last === t && (e.last = n));
}
function Jn(t, e, n = !0) {
  var r = [];
  t.f |= ji, bl(t, r, !0);
  var i = () => {
    n && xt(t), e && e();
  }, a = r.length;
  if (a > 0) {
    var l = () => --a || i();
    for (var o of r)
      o.out(l);
  } else
    i();
}
function bl(t, e, n) {
  if ((t.f & _t) === 0) {
    t.f ^= _t;
    var r = t.nodes && t.nodes.t;
    if (r !== null)
      for (const o of r)
        (o.is_global || n) && e.push(o);
    for (var i = t.first; i !== null; ) {
      var a = i.next;
      if ((i.f & vn) === 0) {
        var l = (i.f & Wn) !== 0 || // If this is a branch effect without a block effect parent,
        // it means the parent block effect was pruned. In that case,
        // transparency information was transferred to the branch effect.
        (i.f & Lt) !== 0 && (t.f & Bt) !== 0;
        bl(i, e, l ? n : !1);
      }
      i = a;
    }
  }
}
function Ks(t) {
  t.f &= ~ji, _l(t, !0);
}
function _l(t, e) {
  if ((t.f & ji) === 0 && (t.f & _t) !== 0) {
    t.f ^= _t, (t.f & tt) === 0 && (Je(t, nt), Zn.ensure().schedule(t));
    for (var n = t.first; n !== null; ) {
      var r = n.next, i = (n.f & Wn) !== 0 || (n.f & Lt) !== 0;
      _l(n, i ? e : !1), n = r;
    }
    var a = t.nodes && t.nodes.t;
    if (a !== null)
      for (const l of a)
        (l.is_global || e) && l.in();
  }
}
function Wi(t, e) {
  if (t.nodes)
    for (var n = t.nodes.start, r = t.nodes.end; n !== null; ) {
      var i = n === r ? null : /* @__PURE__ */ Ss(n);
      e.append(n), n = i;
    }
}
let Is = !1, hn = !1;
function va(t) {
  hn = t;
}
let we = null, Vt = !1;
function It(t) {
  we = t;
}
let Me = null;
function rn(t) {
  Me = t;
}
let nn = null;
function ml(t) {
  we !== null && (nn ?? (nn = /* @__PURE__ */ new Set())).add(t);
}
let kt = null, At = 0, zt = null;
function fc(t) {
  zt = t;
}
let yl = 1, Dn = 0, Yn = Dn;
function ha(t) {
  Yn = t;
}
function kl() {
  return ++yl;
}
function Ms(t) {
  var e = t.f;
  if ((e & nt) !== 0)
    return !0;
  if (e & lt && (t.f &= ~Xn), (e & Kt) !== 0) {
    for (var n = (
      /** @type {Value[]} */
      t.deps
    ), r = n.length, i = 0; i < r; i++) {
      var a = n[i];
      if (Ms(
        /** @type {Derived} */
        a
      ) && el(
        /** @type {Derived} */
        a
      ), a.wv > t.wv)
        return !0;
    }
    (e & Dt) !== 0 && // During time traveling we don't want to reset the status so that
    // traversal of the graph in the other batches still happens
    ct === null && Je(t, tt);
  }
  return !1;
}
function wl(t, e, n = !0) {
  var r = t.reactions;
  if (r !== null && !(nn !== null && nn.has(t)))
    for (var i = 0; i < r.length; i++) {
      var a = r[i];
      (a.f & lt) !== 0 ? wl(
        /** @type {Derived} */
        a,
        e,
        !1
      ) : e === a && (n ? Je(a, nt) : (a.f & tt) !== 0 && Je(a, Kt), Gi(
        /** @type {Effect} */
        a
      ));
    }
}
function xl(t) {
  var e = kt, n = At, r = zt, i = we, a = nn, l = ft, o = Vt, u = Yn, p = t.f;
  kt = /** @type {null | Value[]} */
  null, At = 0, zt = null, we = (p & (Lt | vn)) === 0 ? t : null, nn = null, yr(t.ctx), Vt = !1, Yn = ++Dn, t.ac !== null && (Er(() => {
    t.ac.abort(xs);
  }), t.ac = null);
  try {
    t.f |= Gs;
    var h = (
      /** @type {Function} */
      t.fn
    ), M = h();
    t.f |= xr;
    var f = pa(t);
    if (Ja() && zt !== null && !Vt && f !== null && (t.f & (lt | Kt | nt)) === 0)
      for (var _ = 0; _ < /** @type {Source[]} */
      zt.length; _++)
        wl(
          zt[_],
          /** @type {Effect} */
          t
        );
    if (i !== null && i !== t) {
      if (Dn++, i.deps !== null)
        for (let E = 0; E < n; E += 1)
          i.deps[E].rv = Dn;
      if (e !== null)
        for (const E of e)
          E.rv = Dn;
      zt !== null && (r === null ? r = zt : r.push(.../** @type {Source[]} */
      zt));
    }
    return (t.f & Mn) !== 0 && (t.f ^= Mn), M;
  } catch (E) {
    return pa(t), ic(E);
  } finally {
    t.f ^= Gs, kt = e, At = n, zt = r, we = i, nn = a, yr(l), Vt = o, Yn = u;
  }
}
function pa(t) {
  var i;
  var e = t.deps, n = ae == null ? void 0 : ae.is_fork;
  if (kt !== null) {
    var r;
    if (n || Gr(t, At), e !== null && At > 0)
      for (e.length = At + kt.length, r = 0; r < kt.length; r++)
        e[At + r] = kt[r];
    else
      t.deps = e = kt;
    if (Bi() && (t.f & Dt) !== 0)
      for (r = At; r < e.length; r++)
        ((i = e[r]).reactions ?? (i.reactions = [])).push(t);
  } else !n && e !== null && At < e.length && (Gr(t, At), e.length = At);
  return e;
}
function vc(t, e) {
  let n = e.reactions;
  if (n !== null) {
    var r = no.call(n, t);
    if (r !== -1) {
      var i = n.length - 1;
      i === 0 ? n = e.reactions = null : (n[r] = n[i], n.pop());
    }
  }
  if (n === null && (e.f & lt) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (kt === null || !qs.call(kt, e))) {
    var a = (
      /** @type {Derived} */
      e
    );
    (a.f & Dt) !== 0 && (a.f ^= Dt, a.f &= ~Xn), a.v !== et && qi(a), a.ac !== null && Er(() => {
      a.ac.abort(xs), a.ac = null, Je(a, nt);
    }), Wo(a), Gr(a, 0);
  }
}
function Gr(t, e) {
  var n = t.deps;
  if (n !== null)
    for (var r = e; r < n.length; r++)
      vc(t, n[r]);
}
function wr(t) {
  var e = t.f;
  if ((e & wt) === 0) {
    Je(t, tt);
    var n = Me, r = Is;
    Me = t, Is = (e & (Lt | vn)) === 0;
    try {
      (e & (Bt | Ha)) !== 0 ? uc(t) : Yi(t), pl(t);
      var i = xl(t);
      t.teardown = typeof i == "function" ? i : null, t.wv = yl;
      var a;
    } finally {
      Is = r, Me = n;
    }
  }
}
async function hc() {
  await Promise.resolve(), Qo();
}
function s(t) {
  var e = t.f, n = (e & lt) !== 0;
  if (we !== null && !Vt) {
    var r = Me !== null && (Me.f & wt) !== 0;
    if (!r && (nn === null || !nn.has(t))) {
      var i = we.deps;
      if ((we.f & Gs) !== 0)
        t.rv < Dn && (t.rv = Dn, kt === null && i !== null && i[At] === t ? At++ : kt === null ? kt = [t] : kt.push(t));
      else {
        we.deps ?? (we.deps = []), qs.call(we.deps, t) || we.deps.push(t);
        var a = t.reactions;
        a === null ? t.reactions = [we] : qs.call(a, we) || a.push(we);
      }
    }
  }
  if (hn && tn.has(t))
    return tn.get(t);
  if (n) {
    var l = (
      /** @type {Derived} */
      t
    );
    if (hn) {
      var o = l.v;
      return ((l.f & tt) === 0 && l.reactions !== null || El(l)) && (o = Ui(l)), tn.set(l, o), o;
    }
    var u = (l.f & Dt) === 0 && !Vt && we !== null && (Is || (we.f & Dt) !== 0), p = (l.f & xr) === 0;
    Ms(l) && (u && (l.f |= Dt), el(l)), u && !p && (tl(l), Sl(l));
  }
  if (ct != null && ct.has(t))
    return ct.get(t);
  if ((t.f & Mn) !== 0)
    throw t.v;
  return t.v;
}
function Sl(t) {
  if (t.f |= Dt, t.deps !== null)
    for (const e of t.deps)
      (e.reactions ?? (e.reactions = [])).push(t), (e.f & lt) !== 0 && (e.f & Dt) === 0 && (tl(
        /** @type {Derived} */
        e
      ), Sl(
        /** @type {Derived} */
        e
      ));
}
function El(t) {
  if (t.v === et) return !0;
  if (t.deps === null) return !1;
  for (const e of t.deps)
    if (tn.has(e) || (e.f & lt) !== 0 && El(
      /** @type {Derived} */
      e
    ))
      return !0;
  return !1;
}
function Mr(t) {
  var e = Vt;
  try {
    return Vt = !0, t();
  } finally {
    Vt = e;
  }
}
const pc = ["touchstart", "touchmove"];
function gc(t) {
  return pc.includes(t);
}
const Ln = Symbol("events"), Ml = /* @__PURE__ */ new Set(), xi = /* @__PURE__ */ new Set();
function bc(t, e, n, r = {}) {
  function i(a) {
    if (r.capture || Si.call(e, a), !a.cancelBubble)
      return Er(() => n == null ? void 0 : n.call(this, a));
  }
  return t.startsWith("pointer") || t.startsWith("touch") || t === "wheel" ? en(() => {
    e.addEventListener(t, i, r);
  }) : e.addEventListener(t, i, r), i;
}
function Be(t, e, n, r, i) {
  var a = { capture: r, passive: i }, l = bc(t, e, n, a);
  (e === document.body || // @ts-ignore
  e === window || // @ts-ignore
  e === document || // Firefox has quirky behavior, it can happen that we still get "canplay" events when the element is already removed
  e instanceof HTMLMediaElement) && Vi(() => {
    e.removeEventListener(t, l, a);
  });
}
function N(t, e, n) {
  (e[Ln] ?? (e[Ln] = {}))[t] = n;
}
function ot(t) {
  for (var e = 0; e < t.length; e++)
    Ml.add(t[e]);
  for (var n of xi)
    n(t);
}
let ci = null, ui = !1;
function Si(t) {
  var w, v;
  var e = this, n = (
    /** @type {Node} */
    e.ownerDocument
  ), r = t.type, i = ((w = t.composedPath) == null ? void 0 : w.call(t)) || [], a = (
    /** @type {null | Element} */
    i[0] || t.target
  );
  ci = t, ui || (ui = !0, setTimeout(() => {
    ui = !1, ci = null;
  }));
  var l = 0, o = ci === t && t[Ln];
  if (o) {
    var u = i.indexOf(o);
    if (u !== -1 && (e === document || e === /** @type {any} */
    window)) {
      t[Ln] = e;
      return;
    }
    var p = i.indexOf(e);
    if (p === -1)
      return;
    u <= p && (l = u);
  }
  if (a = /** @type {Element} */
  i[l] || t.target, a !== e) {
    Ia(t, "currentTarget", {
      configurable: !0,
      get() {
        return a || n;
      }
    });
    var h = we, M = Me;
    It(null), rn(null);
    try {
      for (var f, _ = []; a !== null && a !== e; ) {
        try {
          var E = (v = a[Ln]) == null ? void 0 : v[r];
          E != null && (!/** @type {any} */
          a.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          t.target === a) && E.call(a, t);
        } catch (A) {
          f ? _.push(A) : f = A;
        }
        if (t.cancelBubble) break;
        l++, a = l < i.length ? (
          /** @type {Element} */
          i[l]
        ) : null;
      }
      if (f) {
        for (let A of _)
          queueMicrotask(() => {
            throw A;
          });
        throw f;
      }
    } finally {
      t[Ln] = e, delete t.currentTarget, It(h), rn(M);
    }
  }
}
var Da;
const di = (
  // We gotta write it like this because after downleveling the pure comment may end up in the wrong location
  ((Da = globalThis == null ? void 0 : globalThis.window) == null ? void 0 : Da.trustedTypes) && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", {
    /** @param {string} html */
    createHTML: (t) => t
  })
);
function _c(t) {
  return (
    /** @type {string} */
    (di == null ? void 0 : di.createHTML(t)) ?? t
  );
}
function Tl(t) {
  var e = sc("template");
  return e.innerHTML = _c(t.replaceAll("<!>", "<!---->")), e.content;
}
function Br(t, e) {
  var n = (
    /** @type {Effect} */
    Me
  );
  n.nodes === null && (n.nodes = { start: t, end: e, a: null, t: null });
}
// @__NO_SIDE_EFFECTS__
function C(t, e) {
  var n = (e & yo) !== 0, r = (e & ko) !== 0, i, a = !t.startsWith("<!>");
  return () => {
    i === void 0 && (i = Tl(a ? t : "<!>" + t), n || (i = /** @type {TemplateNode} */
    /* @__PURE__ */ $n(i)));
    var l = (
      /** @type {TemplateNode} */
      r || ul ? document.importNode(i, !0) : i.cloneNode(!0)
    );
    if (n) {
      var o = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ $n(l)
      ), u = (
        /** @type {TemplateNode} */
        l.lastChild
      );
      Br(o, u);
    } else
      Br(l, l);
    return l;
  };
}
// @__NO_SIDE_EFFECTS__
function mc(t, e, n = "svg") {
  var r = !t.startsWith("<!>"), i = `<${n}>${r ? t : "<!>" + t}</${n}>`, a;
  return () => {
    if (!a) {
      var l = (
        /** @type {DocumentFragment} */
        Tl(i)
      ), o = (
        /** @type {Element} */
        /* @__PURE__ */ $n(l)
      );
      a = /** @type {Element} */
      /* @__PURE__ */ $n(o);
    }
    var u = (
      /** @type {TemplateNode} */
      a.cloneNode(!0)
    );
    return Br(u, u), u;
  };
}
// @__NO_SIDE_EFFECTS__
function yc(t, e) {
  return /* @__PURE__ */ mc(t, e, "svg");
}
function Ur(t = "") {
  {
    var e = fn(t + "");
    return Br(e, e), e;
  }
}
function Jt() {
  var t = document.createDocumentFragment(), e = document.createComment(""), n = fn();
  return t.append(e, n), Br(e, n), t;
}
function x(t, e) {
  t !== null && t.before(
    /** @type {Node} */
    e
  );
}
function kc(t) {
  let e = 0, n = Qn(0), r;
  return () => {
    Bi() && (s(n), Ji(() => (e === 0 && (r = Mr(() => t(() => qr(n)))), e += 1, () => {
      en(() => {
        e -= 1, e === 0 && (r == null || r(), r = void 0, qr(n));
      });
    })));
  };
}
var wc = Wn | Sr;
function xc(t, e, n, r) {
  new Sc(t, e, n, r);
}
var Nt, Li, Ot, qn, ht, St, pt, Et, Xt, Un, wn, pr, Yr, Wr, un, Ws, je, Ec, Mc, Ei, Tc, Mi, Dr, js, Ti, Ai;
class Sc {
  /**
   * @param {TemplateNode} node
   * @param {BoundaryProps} props
   * @param {((anchor: Node) => void)} children
   * @param {((error: unknown) => unknown) | undefined} [transform_error]
   */
  constructor(e, n, r, i) {
    I(this, je);
    /** @type {Boundary | null} */
    ut(this, "parent");
    ut(this, "is_pending", !1);
    /**
     * API-level transformError transform function. Transforms errors before they reach the `failed` snippet.
     * Inherited from parent boundary, or defaults to identity.
     * @type {(error: unknown) => unknown}
     */
    ut(this, "transform_error");
    /** @type {TemplateNode} */
    I(this, Nt);
    /** @type {TemplateNode | null} */
    I(this, Li, null);
    /** @type {BoundaryProps} */
    I(this, Ot);
    /** @type {((anchor: Node) => void)} */
    I(this, qn);
    /** @type {Effect} */
    I(this, ht);
    /** @type {Effect | null} */
    I(this, St, null);
    /** @type {Effect | null} */
    I(this, pt, null);
    /** @type {Effect | null} */
    I(this, Et, null);
    /** @type {DocumentFragment | null} */
    I(this, Xt, null);
    I(this, Un, 0);
    I(this, wn, 0);
    I(this, pr, !1);
    /** @type {Set<Effect>} */
    I(this, Yr, /* @__PURE__ */ new Set());
    /** @type {Set<Effect>} */
    I(this, Wr, /* @__PURE__ */ new Set());
    /**
     * A source containing the number of pending async deriveds/expressions.
     * Only created if `$effect.pending()` is used inside the boundary,
     * otherwise updating the source results in needless `Batch.ensure()`
     * calls followed by no-op flushes
     * @type {Source<number> | null}
     */
    I(this, un, null);
    I(this, Ws, kc(() => (V(this, un, Qn(c(this, Un))), () => {
      V(this, un, null);
    })));
    var a;
    V(this, Nt, e), V(this, Ot, n), V(this, qn, (l) => {
      var o = (
        /** @type {Effect} */
        Me
      );
      o.b = this, o.f |= bi, r(l);
    }), this.parent = /** @type {Effect} */
    Me.b, this.transform_error = i ?? ((a = this.parent) == null ? void 0 : a.transform_error) ?? ((l) => l), V(this, ht, Es(() => {
      se(this, je, Mi).call(this);
    }, wc));
  }
  /**
   * Defer an effect inside a pending boundary until the boundary resolves
   * @param {Effect} effect
   */
  defer_effect(e) {
    Xa(e, c(this, Yr), c(this, Wr));
  }
  /**
   * Returns `false` if the effect exists inside a boundary whose pending snippet is shown
   * @returns {boolean}
   */
  is_rendered() {
    return !this.is_pending && (!this.parent || this.parent.is_rendered());
  }
  has_pending_snippet() {
    return !!c(this, Ot).pending;
  }
  /**
   * Update the source that powers `$effect.pending()` inside this boundary,
   * and controls when the current `pending` snippet (if any) is removed.
   * Do not call from inside the class
   * @param {1 | -1} d
   * @param {Batch} batch
   */
  update_pending_count(e, n) {
    se(this, je, Ti).call(this, e, n), V(this, Un, c(this, Un) + e), !(!c(this, un) || c(this, pr)) && (V(this, pr, !0), en(() => {
      V(this, pr, !1), c(this, un) && kr(c(this, un), c(this, Un));
    }));
  }
  get_effect_pending() {
    return c(this, Ws).call(this), s(
      /** @type {Source<number>} */
      c(this, un)
    );
  }
  /** @param {unknown} error */
  error(e) {
    if (!c(this, Ot).onerror && !c(this, Ot).failed)
      throw e;
    ae != null && ae.is_fork ? (c(this, St) && ae.skip_effect(c(this, St)), c(this, pt) && ae.skip_effect(c(this, pt)), c(this, Et) && ae.skip_effect(c(this, Et)), ae.oncommit(() => {
      se(this, je, Ai).call(this, e);
    })) : se(this, je, Ai).call(this, e);
  }
}
Nt = new WeakMap(), Li = new WeakMap(), Ot = new WeakMap(), qn = new WeakMap(), ht = new WeakMap(), St = new WeakMap(), pt = new WeakMap(), Et = new WeakMap(), Xt = new WeakMap(), Un = new WeakMap(), wn = new WeakMap(), pr = new WeakMap(), Yr = new WeakMap(), Wr = new WeakMap(), un = new WeakMap(), Ws = new WeakMap(), je = new WeakSet(), Ec = function() {
  try {
    V(this, St, Rt(() => c(this, qn).call(this, c(this, Nt))));
  } catch (e) {
    this.error(e);
  }
}, /**
 * @param {unknown} error The deserialized error from the server's hydration comment
 */
Mc = function(e) {
  const n = c(this, Ot).failed, { reset: r, invoke_onerror: i } = se(this, je, Ei).call(this, e);
  en(i), n && V(this, Et, Rt(() => {
    n(
      c(this, Nt),
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
Ei = function(e) {
  var n = !1, r = !1;
  const i = () => {
    if (n) {
      Eo();
      return;
    }
    n = !0, r && jo(), c(this, Et) !== null && Jn(c(this, Et), () => {
      V(this, Et, null);
    }), se(this, je, js).call(this, () => {
      se(this, je, Mi).call(this);
    });
  };
  return { reset: i, invoke_onerror: () => {
    var l, o;
    try {
      r = !0, (o = (l = c(this, Ot)).onerror) == null || o.call(l, e, i), r = !1;
    } catch (u) {
      Qt(u, c(this, ht) && c(this, ht).parent);
    }
  } };
}, Tc = function() {
  const e = c(this, Ot).pending;
  e && (this.is_pending = !0, V(this, pt, Rt(() => e(c(this, Nt)))), en(() => {
    var n = V(this, Xt, document.createDocumentFragment()), r = fn(), i = !1;
    if (n.append(r), V(this, St, se(this, je, js).call(this, () => {
      try {
        return Rt(() => c(this, qn).call(this, r));
      } catch (a) {
        try {
          this.error(a), i = !0;
        } catch (l) {
          Qt(l, c(this, ht).parent);
        }
        return null;
      }
    })), c(this, St) === null) {
      V(this, Xt, null), i && se(this, je, Dr).call(
        this,
        /** @type {Batch} */
        ae
      );
      return;
    }
    c(this, wn) === 0 && (c(this, Nt).before(n), V(this, Xt, null), Jn(
      /** @type {Effect} */
      c(this, pt),
      () => {
        V(this, pt, null);
      }
    ), se(this, je, Dr).call(
      this,
      /** @type {Batch} */
      ae
    ));
  }));
}, Mi = function() {
  try {
    if (this.is_pending = this.has_pending_snippet(), V(this, wn, 0), V(this, Un, 0), V(this, St, Rt(() => {
      c(this, qn).call(this, c(this, Nt));
    })), c(this, wn) > 0) {
      var e = V(this, Xt, document.createDocumentFragment());
      Wi(c(this, St), e);
      const n = (
        /** @type {(anchor: Node) => void} */
        c(this, Ot).pending
      );
      V(this, pt, Rt(() => n(c(this, Nt))));
    } else
      se(this, je, Dr).call(
        this,
        /** @type {Batch} */
        ae
      );
  } catch (n) {
    this.error(n);
  }
}, /**
 * @param {Batch} batch
 */
Dr = function(e) {
  this.is_pending = !1, e.transfer_effects(c(this, Yr), c(this, Wr));
}, /**
 * @template T
 * @param {() => T} fn
 */
js = function(e) {
  var n = Me, r = we, i = ft;
  rn(c(this, ht)), It(c(this, ht)), yr(c(this, ht).ctx);
  try {
    return Zn.ensure(), e();
  } finally {
    rn(n), It(r), yr(i);
  }
}, /**
 * Updates the pending count associated with the currently visible pending snippet,
 * if any, such that we can replace the snippet with content once work is done
 * @param {1 | -1} d
 * @param {Batch} batch
 */
Ti = function(e, n) {
  var r;
  if (!this.has_pending_snippet()) {
    this.parent && se(r = this.parent, je, Ti).call(r, e, n);
    return;
  }
  V(this, wn, c(this, wn) + e), c(this, wn) === 0 && (se(this, je, Dr).call(this, n), c(this, pt) && Jn(c(this, pt), () => {
    V(this, pt, null);
  }), c(this, Xt) && (c(this, Nt).before(c(this, Xt)), V(this, Xt, null)));
}, /**
 * @param {unknown} error
 */
Ai = function(e) {
  c(this, St) && (xt(c(this, St)), V(this, St, null)), c(this, pt) && (xt(c(this, pt)), V(this, pt, null)), c(this, Et) && (xt(c(this, Et)), V(this, Et, null));
  let n = c(this, Ot).failed;
  const r = (i) => {
    const { reset: a, invoke_onerror: l } = se(this, je, Ei).call(this, i);
    l(), n && V(this, Et, se(this, je, js).call(this, () => {
      try {
        return Rt(() => {
          var o = (
            /** @type {Effect} */
            Me
          );
          o.b = this, o.f |= bi, n(
            c(this, Nt),
            () => i,
            () => a
          );
        });
      } catch (o) {
        return Qt(
          o,
          /** @type {Effect} */
          c(this, ht).parent
        ), null;
      }
    }));
  };
  en(() => {
    var i;
    try {
      i = this.transform_error(e);
    } catch (a) {
      Qt(a, c(this, ht) && c(this, ht).parent);
      return;
    }
    i !== null && typeof i == "object" && typeof /** @type {any} */
    i.then == "function" ? i.then(
      r,
      /** @param {unknown} e */
      (a) => Qt(a, c(this, ht) && c(this, ht).parent)
    ) : r(i);
  });
};
function q(t, e) {
  var n = e == null ? "" : typeof e == "object" ? `${e}` : e;
  n !== /** @type {any} */
  (t[zr] ?? (t[zr] = t.nodeValue)) && (t[zr] = n, t.nodeValue = `${n}`);
}
function ga(t, e) {
  return Ac(t, e);
}
const Ns = /* @__PURE__ */ new Map();
function Ac(t, { target: e, anchor: n, props: r = {}, events: i, context: a, intro: l = !0, transformError: o }) {
  nc();
  var u = void 0, p = oc(() => {
    var h = n ?? e.appendChild(fn());
    xc(
      /** @type {TemplateNode} */
      h,
      {
        pending: () => {
        }
      },
      (_) => {
        rt({});
        var E = (
          /** @type {ComponentContext} */
          ft
        );
        a && (E.c = a), i && (r.$$events = i), u = t(_, r) || Fi(), st();
      },
      o
    );
    var M = /* @__PURE__ */ new Set(), f = (_) => {
      for (var E = 0; E < _.length; E++) {
        var w = _[E];
        if (!M.has(w)) {
          M.add(w);
          var v = gc(w);
          for (const P of [e, document]) {
            var A = Ns.get(P);
            A === void 0 && (A = /* @__PURE__ */ new Map(), Ns.set(P, A));
            var L = A.get(w);
            L === void 0 ? (P.addEventListener(w, Si, { passive: v }), A.set(w, 1)) : A.set(w, L + 1);
          }
        }
      }
    };
    return f($s(Ml)), xi.add(f), () => {
      var v;
      for (var _ of M)
        for (const A of [e, document]) {
          var E = (
            /** @type {Map<string, number>} */
            Ns.get(A)
          ), w = (
            /** @type {number} */
            E.get(_)
          );
          --w == 0 ? (A.removeEventListener(_, Si), E.delete(_), E.size === 0 && Ns.delete(A)) : E.set(_, w);
        }
      xi.delete(f), h !== n && ((v = h.parentNode) == null || v.removeChild(h));
    };
  });
  return Ci.set(u, p), u;
}
let Ci = /* @__PURE__ */ new WeakMap();
function ba(t, e) {
  const n = Ci.get(t);
  return n ? (Ci.delete(t), n(e)) : Promise.resolve();
}
var Ht, Zt, Mt, Hn, Xr, Zr, Xs;
class Xi {
  /**
   * @param {TemplateNode} anchor
   * @param {boolean} transition
   */
  constructor(e, n = !0) {
    /** @type {TemplateNode} */
    ut(this, "anchor");
    /** @type {Map<Batch, Key>} */
    I(this, Ht, /* @__PURE__ */ new Map());
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
    I(this, Zt, /* @__PURE__ */ new Map());
    /**
     * Similar to #onscreen with respect to the keys, but contains branches that are not yet
     * in the DOM, because their insertion is deferred.
     * @type {Map<Key, Branch>}
     */
    I(this, Mt, /* @__PURE__ */ new Map());
    /**
     * Keys of effects that are currently outroing
     * @type {Set<Key>}
     */
    I(this, Hn, /* @__PURE__ */ new Set());
    /**
     * Whether to pause (i.e. outro) on change, or destroy immediately.
     * This is necessary for `<svelte:element>`
     */
    I(this, Xr, !0);
    /**
     * @param {Batch} batch
     */
    I(this, Zr, (e) => {
      if (c(this, Ht).has(e)) {
        var n = (
          /** @type {Key} */
          c(this, Ht).get(e)
        ), r = c(this, Zt).get(n);
        if (r)
          Ks(r), c(this, Hn).delete(n);
        else {
          var i = c(this, Mt).get(n);
          i && (Ks(i.effect), c(this, Zt).set(n, i.effect), c(this, Mt).delete(n), i.fragment.lastChild.remove(), this.anchor.before(i.fragment), r = i.effect);
        }
        for (const [a, l] of c(this, Ht)) {
          if (c(this, Ht).delete(a), a === e)
            break;
          const o = c(this, Mt).get(l);
          o && (xt(o.effect), c(this, Mt).delete(l));
        }
        for (const [a, l] of c(this, Zt)) {
          if (a === n || c(this, Hn).has(a)) continue;
          const o = () => {
            if (Array.from(c(this, Ht).values()).includes(a)) {
              var p = document.createDocumentFragment();
              Wi(l, p), p.append(fn()), c(this, Mt).set(a, { effect: l, fragment: p });
            } else
              xt(l);
            c(this, Hn).delete(a), c(this, Zt).delete(a);
          };
          c(this, Xr) || !r ? (c(this, Hn).add(a), Jn(l, o, !1)) : o();
        }
      }
    });
    /**
     * @param {Batch} batch
     */
    I(this, Xs, (e) => {
      c(this, Ht).delete(e);
      const n = Array.from(c(this, Ht).values());
      for (const [r, i] of c(this, Mt))
        n.includes(r) || (xt(i.effect), c(this, Mt).delete(r));
    });
    this.anchor = e, V(this, Xr, n);
  }
  /**
   *
   * @param {any} key
   * @param {null | ((target: TemplateNode) => void)} fn
   */
  ensure(e, n) {
    var r = (
      /** @type {Batch} */
      ae
    ), i = vl();
    if (n && !c(this, Zt).has(e) && !c(this, Mt).has(e))
      if (i) {
        var a = document.createDocumentFragment(), l = fn();
        a.append(l), c(this, Mt).set(e, {
          effect: Rt(() => n(l)),
          fragment: a
        });
      } else
        c(this, Zt).set(
          e,
          Rt(() => n(this.anchor))
        );
    if (c(this, Ht).set(r, e), i) {
      for (const [o, u] of c(this, Zt))
        o === e ? r.unskip_effect(u) : r.skip_effect(u);
      for (const [o, u] of c(this, Mt))
        o === e ? r.unskip_effect(u.effect) : r.skip_effect(u.effect);
      r.oncommit(c(this, Zr)), r.ondiscard(c(this, Xs));
    } else
      c(this, Zr).call(this, r);
  }
}
Ht = new WeakMap(), Zt = new WeakMap(), Mt = new WeakMap(), Hn = new WeakMap(), Xr = new WeakMap(), Zr = new WeakMap(), Xs = new WeakMap();
function G(t, e, n = !1) {
  var r = new Xi(t), i = n ? Wn : 0;
  function a(l, o) {
    r.ensure(l, o);
  }
  Es(() => {
    var l = !1;
    e((o, u = 0) => {
      l = !0, a(u, o);
    }), l || a(-1, null);
  }, i);
}
const Cc = Symbol("NaN");
function _a(t, e, n) {
  var r = new Xi(t);
  Es(() => {
    var i = e();
    i !== i && (i = /** @type {any} */
    Cc), r.ensure(i, n);
  });
}
function bt(t, e) {
  return e;
}
function Pc(t, e, n) {
  for (var r = [], i = e.length, a, l = e.length, o = 0; o < i; o++) {
    let M = e[o];
    Jn(
      M,
      () => {
        if (a) {
          if (a.pending.delete(M), a.done.add(M), a.pending.size === 0) {
            var f = (
              /** @type {Set<EachOutroGroup>} */
              t.outrogroups
            );
            Pi(t, $s(a.done)), f.delete(a), f.size === 0 && (t.outrogroups = null);
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
      var p = (
        /** @type {Element} */
        n
      ), h = (
        /** @type {Element} */
        p.parentNode
      );
      rc(h), h.append(p), t.items.clear();
    }
    Pi(t, e, !u);
  } else
    a = {
      pending: new Set(e),
      done: /* @__PURE__ */ new Set()
    }, (t.outrogroups ?? (t.outrogroups = /* @__PURE__ */ new Set())).add(a);
}
function Pi(t, e, n = !0) {
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
      a.f |= $t;
      const l = document.createDocumentFragment();
      Wi(a, l);
    } else
      xt(e[i], n);
  }
}
var ma;
function Re(t, e, n, r, i, a = null) {
  var l = t, o = /* @__PURE__ */ new Map(), u = (e & Ba) !== 0;
  if (u) {
    var p = (
      /** @type {Element} */
      t
    );
    l = p.appendChild(fn());
  }
  var h = null, M = /* @__PURE__ */ $a(() => {
    var P = n();
    return (
      /** @type {V[]} */
      ws(P) ? P : P == null ? [] : $s(P)
    );
  }), f, _ = /* @__PURE__ */ new Map(), E = !0;
  function w(P) {
    (L.effect.f & wt) === 0 && (L.pending.delete(P), L.fallback = h, zc(L, f, l, e, r), h !== null && (f.length === 0 ? (h.f & $t) === 0 ? Ks(h) : (h.f ^= $t, Lr(h, null, l)) : Jn(h, () => {
      h = null;
    })));
  }
  function v(P) {
    L.pending.delete(P);
  }
  var A = Es(() => {
    f = /** @type {V[]} */
    s(M);
    for (var P = f.length, j = /* @__PURE__ */ new Set(), R = (
      /** @type {Batch} */
      ae
    ), y = vl(), d = 0; d < P; d += 1) {
      var k = f[d], S = r(k, d), z = E ? null : o.get(S);
      z ? (z.v && kr(z.v, k), z.i && kr(z.i, d), y && R.unskip_effect(z.e)) : (z = Nc(
        o,
        E ? l : ma ?? (ma = fn()),
        k,
        S,
        d,
        i,
        e,
        n
      ), E || (z.e.f |= $t), o.set(S, z)), j.add(S);
    }
    if (P === 0 && a && !h && (E ? h = Rt(() => a(l)) : (h = Rt(() => a(ma ?? (ma = fn()))), h.f |= $t)), P > j.size && Co(), !E)
      if (_.set(R, j), y) {
        for (const [X, re] of o)
          j.has(X) || R.skip_effect(re.e);
        R.oncommit(w), R.ondiscard(v);
      } else
        w(R);
    s(M);
  }), L = { effect: A, items: o, pending: _, outrogroups: null, fallback: h };
  E = !1;
}
function Cr(t) {
  for (; t !== null && (t.f & Lt) === 0; )
    t = t.next;
  return t;
}
function zc(t, e, n, r, i) {
  var z, X, re, U, Z, te, K, ue, pe;
  var a = (r & ho) !== 0, l = e.length, o = t.items, u = Cr(t.effect.first), p, h = null, M, f = [], _ = [], E, w, v, A;
  if (a)
    for (A = 0; A < l; A += 1)
      E = e[A], w = i(E, A), v = /** @type {EachItem} */
      o.get(w).e, (v.f & $t) === 0 && ((X = (z = v.nodes) == null ? void 0 : z.a) == null || X.measure(), (M ?? (M = /* @__PURE__ */ new Set())).add(v));
  for (A = 0; A < l; A += 1) {
    if (E = e[A], w = i(E, A), v = /** @type {EachItem} */
    o.get(w).e, t.outrogroups !== null)
      for (const $ of t.outrogroups)
        $.pending.delete(v), $.done.delete(v);
    if ((v.f & _t) !== 0 && (Ks(v), a && ((U = (re = v.nodes) == null ? void 0 : re.a) == null || U.unfix(), (M ?? (M = /* @__PURE__ */ new Set())).delete(v))), (v.f & $t) !== 0)
      if (v.f ^= $t, v === u)
        Lr(v, null, n);
      else {
        var L = h ? h.next : u;
        v === t.effect.last && (t.effect.last = v.prev), v.prev && (v.prev.next = v.next), v.next && (v.next.prev = v.prev), yn(t, h, v), yn(t, v, L), Lr(v, L, n), h = v, f = [], _ = [], u = Cr(h.next);
        continue;
      }
    if (v !== u) {
      if (p !== void 0 && p.has(v)) {
        if (f.length < _.length) {
          var P = _[0], j;
          h = P.prev;
          var R = f[0], y = f[f.length - 1];
          for (j = 0; j < f.length; j += 1)
            Lr(f[j], P, n);
          for (j = 0; j < _.length; j += 1)
            p.delete(_[j]);
          yn(t, R.prev, y.next), yn(t, h, R), yn(t, y, P), u = P, h = y, A -= 1, f = [], _ = [];
        } else
          p.delete(v), Lr(v, u, n), yn(t, v.prev, v.next), yn(t, v, h === null ? t.effect.first : h.next), yn(t, h, v), h = v;
        continue;
      }
      for (f = [], _ = []; u !== null && u !== v; )
        (p ?? (p = /* @__PURE__ */ new Set())).add(u), _.push(u), u = Cr(u.next);
      if (u === null)
        continue;
    }
    (v.f & $t) === 0 && f.push(v), h = v, u = Cr(v.next);
  }
  if (t.outrogroups !== null) {
    for (const $ of t.outrogroups)
      $.pending.size === 0 && (Pi(t, $s($.done)), (Z = t.outrogroups) == null || Z.delete($));
    t.outrogroups.size === 0 && (t.outrogroups = null);
  }
  if (u !== null || p !== void 0) {
    var d = [];
    if (p !== void 0)
      for (v of p)
        (v.f & _t) === 0 && d.push(v);
    for (; u !== null; )
      (u.f & _t) === 0 && u !== t.fallback && d.push(u), u = Cr(u.next);
    var k = d.length;
    if (k > 0) {
      var S = (r & Ba) !== 0 && l === 0 ? n : null;
      if (a) {
        for (A = 0; A < k; A += 1)
          (K = (te = d[A].nodes) == null ? void 0 : te.a) == null || K.measure();
        for (A = 0; A < k; A += 1)
          (pe = (ue = d[A].nodes) == null ? void 0 : ue.a) == null || pe.fix();
      }
      Pc(t, d, S);
    }
  }
  a && en(() => {
    var $, ke;
    if (M !== void 0)
      for (v of M)
        (ke = ($ = v.nodes) == null ? void 0 : $.a) == null || ke.apply();
  });
}
function Nc(t, e, n, r, i, a, l, o) {
  var u = (l & fo) !== 0 ? (l & po) === 0 ? /* @__PURE__ */ ec(n, !1, !1) : Qn(n) : null, p = (l & vo) !== 0 ? Qn(i) : null;
  return {
    v: u,
    i: p,
    e: Rt(() => (a(e, u ?? n, p ?? i, o), () => {
      t.delete(r);
    }))
  };
}
function Lr(t, e, n) {
  if (t.nodes)
    for (var r = t.nodes.start, i = t.nodes.end, a = e && (e.f & $t) === 0 ? (
      /** @type {EffectNodes} */
      e.nodes.start
    ) : n; r !== null; ) {
      var l = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ Ss(r)
      );
      if (a.before(r), r === i)
        return;
      r = l;
    }
}
function yn(t, e, n) {
  e === null ? t.effect.first = n : e.next = n, n === null ? t.effect.last = e : n.prev = e;
}
function ya(t, e, ...n) {
  var r = new Xi(t);
  Es(() => {
    const i = e() ?? null;
    r.ensure(i, i && ((a) => i(a, ...n)));
  }, Wn);
}
function Al(t) {
  var e, n, r = "";
  if (typeof t == "string" || typeof t == "number") r += t;
  else if (typeof t == "object") if (Array.isArray(t)) {
    var i = t.length;
    for (e = 0; e < i; e++) t[e] && (n = Al(t[e])) && (r && (r += " "), r += n);
  } else for (n in t) t[n] && (r && (r += " "), r += n);
  return r;
}
function Oc() {
  for (var t, e, n = 0, r = "", i = arguments.length; n < i; n++) (t = arguments[n]) && (e = Al(t)) && (r && (r += " "), r += e);
  return r;
}
function ka(t) {
  return typeof t == "object" ? Oc(t) : t ?? "";
}
const wa = [...` 	
\r\f \v\uFEFF`];
function Rc(t, e, n) {
  var r = t == null ? "" : "" + t;
  if (e && (r = r ? r + " " + e : e), n) {
    for (var i of Object.keys(n))
      if (n[i])
        r = r ? r + " " + i : i;
      else if (r.length)
        for (var a = i.length, l = 0; (l = r.indexOf(i, l)) >= 0; ) {
          var o = l + a;
          (l === 0 || wa.includes(r[l - 1])) && (o === r.length || wa.includes(r[o])) ? r = (l === 0 ? "" : r.substring(0, l)) + r.substring(o + 1) : l = o;
        }
  }
  return r === "" ? null : r;
}
function xa(t, e = !1) {
  var n = e ? " !important;" : ";", r = "";
  for (var i of Object.keys(t)) {
    var a = t[i];
    a != null && a !== "" && (r += " " + i + ": " + a + n);
  }
  return r;
}
function Dc(t, e) {
  if (e) {
    var n = "", r, i;
    return Array.isArray(e) ? (r = e[0], i = e[1]) : r = e, r && (n += xa(r)), i && (n += xa(i, !0)), n = n.trim(), n === "" ? null : n;
  }
  return String(t);
}
function be(t, e, n, r, i, a) {
  var l = (
    /** @type {any} */
    t[_i]
  );
  if (l !== n || l === void 0) {
    var o = Rc(n, r, a);
    o == null ? t.removeAttribute("class") : t.className = o, t[_i] = n;
  } else if (a && i !== a)
    for (var u in a) {
      var p = !!a[u];
      (i == null || p !== !!i[u]) && t.classList.toggle(u, p);
    }
  return a;
}
function fi(t, e = {}, n, r) {
  for (var i in n) {
    var a = n[i];
    e[i] !== a && (n[i] == null ? t.style.removeProperty(i) : t.style.setProperty(i, a, r));
  }
}
function Ct(t, e, n, r) {
  var i = (
    /** @type {any} */
    t[mi]
  );
  if (i !== e) {
    var a = Dc(e, r);
    a == null ? t.removeAttribute("style") : t.style.cssText = a, t[mi] = e;
  } else r && (Array.isArray(r) ? (fi(t, n == null ? void 0 : n[0], r[0]), fi(t, n == null ? void 0 : n[1], r[1], "important")) : fi(t, n, r));
  return r;
}
function Lc(t, e) {
  e ? t.hasAttribute("selected") || t.setAttribute("selected", "") : t.removeAttribute("selected");
}
function Ic(t, e) {
  var n = t.__defaultValue, r = t.multiple, i = r ? n ?? [] : null;
  if (!(r && !ws(i))) {
    t.selectedIndex;
    for (var a of t.options) {
      var l = or(a);
      Lc(
        a,
        r ? (
          /** @type {any[]} */
          i.includes(l)
        ) : cl(l, n)
      );
    }
  }
}
function Ts(t, e, n = !1) {
  if (t.multiple) {
    if (e == null)
      return;
    if (!ws(e))
      return So();
    for (var r of t.options)
      r.selected = e.includes(or(r));
    return;
  }
  for (r of t.options) {
    var i = or(r);
    if (cl(i, e)) {
      r.selected = !0;
      return;
    }
  }
  (!n || e !== void 0) && (t.selectedIndex = -1);
}
function Vr(t) {
  var e = new MutationObserver((n) => {
    n.every(jc) || ("__defaultValue" in t && Ic(t), "__value" in t && Ts(t, t.__value));
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
  }), Vi(() => {
    e.disconnect();
  });
}
function Sa(t, e, n = e) {
  var r = /* @__PURE__ */ new WeakSet(), i = !0;
  Za(t, "change", (a) => {
    var l = a ? "[selected]" : ":checked", o;
    if (t.multiple)
      o = [].map.call(t.querySelectorAll(l), or);
    else {
      var u = t.querySelector(l) ?? // will fall back to first non-disabled option if no option is selected
      t.querySelector("option:not([disabled])");
      o = u && or(u);
    }
    n(o), t.__value = o, ae !== null && r.add(ae);
  }), Ki(() => {
    var a = e();
    if (t === document.activeElement) {
      var l = (
        /** @type {Batch} */
        ae
      );
      if (r.has(l))
        return;
    }
    if (Ts(t, a, i), i && a === void 0) {
      var o = t.querySelector(":checked");
      o !== null && (a = or(o), n(a));
    }
    t.__value = a, i = !1;
  });
}
function or(t) {
  return "__value" in t ? t.__value : t.value;
}
function jc(t) {
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
const Fc = Symbol("is custom element"), qc = Symbol("is html"), Uc = uo ? "progress" : "PROGRESS";
function In(t, e) {
  var n = Zi(t);
  n.value === (n.value = // treat null and undefined the same for the initial value
  e ?? void 0) || // @ts-expect-error
  // `progress` elements always need their value set when it's `0`
  t.value === e && (e !== 0 || t.nodeName !== Uc) || (t.value = e ?? "");
}
function Hc(t, e) {
  var n = Zi(t);
  n.checked !== (n.checked = // treat null and undefined the same for the initial value
  e ?? void 0) && (t.checked = e);
}
function de(t, e, n, r) {
  var i = Zi(t);
  i[e] !== (i[e] = n) && (e === "loading" && (t[co] = n), n == null ? t.removeAttribute(e) : typeof n != "string" && Gc(t).has(e) ? t[e] = n : t.setAttribute(e, n));
}
function Zi(t) {
  return (
    /** @type {Record<string | symbol, unknown>} **/
    /** @type {any} */
    t[Os] ?? (t[Os] = {
      [Fc]: t.nodeName.includes("-"),
      [qc]: t.namespaceURI === wo
    })
  );
}
var Ea = /* @__PURE__ */ new Map();
function Gc(t) {
  var e = t.getAttribute("is") || t.nodeName, n = Ea.get(e);
  if (n) return n;
  Ea.set(e, n = /* @__PURE__ */ new Set());
  for (var r, i = t, a = Element.prototype; a !== i; ) {
    r = ro(i);
    for (var l in r)
      r[l].set && // better safe than sorry, we don't want spread attributes to mess with HTML content
      l !== "innerHTML" && l !== "textContent" && l !== "innerText" && n.add(l);
    i = Ii(i);
  }
  return n;
}
function pn(t, e, n = e) {
  var r = /* @__PURE__ */ new WeakSet();
  Za(t, "input", async (i) => {
    var a = i ? t.defaultValue : t.value;
    if (a = vi(t) ? hi(a) : a, n(a), ae !== null && r.add(ae), await hc(), a !== (a = e())) {
      var l = t.selectionStart, o = t.selectionEnd, u = t.value.length;
      if (t.value = a ?? "", o !== null) {
        var p = t.value.length;
        l === o && o === u && p > u ? (t.selectionStart = p, t.selectionEnd = p) : (t.selectionStart = l, t.selectionEnd = Math.min(o, p));
      }
    }
  }), // If we are hydrating and the value has since changed,
  // then use the updated value from the input instead.
  // If defaultValue is set, then value == defaultValue
  // TODO Svelte 6: remove input.value check and set to empty string?
  Mr(e) == null && t.value && (n(vi(t) ? hi(t.value) : t.value), ae !== null && r.add(ae)), Ji(() => {
    var i = e();
    if (t === document.activeElement) {
      var a = (
        /** @type {Batch} */
        ae
      );
      if (r.has(a))
        return;
    }
    vi(t) && i === hi(t.value) || t.type === "date" && !i && !t.value || i !== t.value && (t.value = i ?? "");
  });
}
function vi(t) {
  var e = t.type;
  return e === "number" || e === "range";
}
function hi(t) {
  return t === "" ? null : +t;
}
var xn, gr, Qr, Zs, Cl;
const Qs = class Qs {
  /** @param {ResizeObserverOptions} options */
  constructor(e) {
    I(this, Zs);
    /** */
    I(this, xn, /* @__PURE__ */ new WeakMap());
    /** @type {ResizeObserver | undefined} */
    I(this, gr);
    /** @type {ResizeObserverOptions} */
    I(this, Qr);
    V(this, Qr, e);
  }
  /**
   * @param {Element} element
   * @param {(entry: ResizeObserverEntry) => any} listener
   */
  observe(e, n) {
    var r = c(this, xn).get(e) || /* @__PURE__ */ new Set();
    return r.add(n), c(this, xn).set(e, r), se(this, Zs, Cl).call(this).observe(e, c(this, Qr)), () => {
      var i = c(this, xn).get(e);
      i.delete(n), i.size === 0 && (c(this, xn).delete(e), c(this, gr).unobserve(e));
    };
  }
};
xn = new WeakMap(), gr = new WeakMap(), Qr = new WeakMap(), Zs = new WeakSet(), Cl = function() {
  return c(this, gr) ?? V(this, gr, new ResizeObserver(
    /** @param {any} entries */
    (e) => {
      for (var n of e) {
        Qs.entries.set(n.target, n);
        for (var r of c(this, xn).get(n.target) || [])
          r(n);
      }
    }
  ));
}, /** @static */
ut(Qs, "entries", /* @__PURE__ */ new WeakMap());
let zi = Qs;
var Bc = /* @__PURE__ */ new zi({
  box: "border-box"
});
function Vc(t, e, n) {
  var r = Bc.observe(t, () => n(t[e]));
  Ki(() => (Mr(() => n(t[e])), r));
}
function pi(t, e) {
  return t === e || (t == null ? void 0 : t[Kn]) === e;
}
function Tn(t = Fi(), e, n, r) {
  var i = (
    /** @type {ComponentContext} */
    ft.r
  ), a = (
    /** @type {Effect} */
    Me
  );
  return Ki(() => {
    var l, o;
    return Ji(() => {
      l = o, o = (r == null ? void 0 : r()) || [], Mr(() => {
        pi(n(...o), t) || (e(t, ...o), l && pi(n(...l), t) && e(null, ...l));
      });
    }), () => {
      let u = a;
      for (; u !== i && u.parent !== null && u.parent.f & Us; )
        u = u.parent;
      const p = () => {
        o && pi(n(...o), t) && e(null, ...o);
      }, h = u.teardown;
      u.teardown = () => {
        p(), h == null || h();
      };
    };
  }), t;
}
function Fe(t, e, n, r) {
  var j;
  var i = !0, a = (n & _o) !== 0, l = (n & mo) !== 0, o = (
    /** @type {V} */
    r
  ), u = !0, p = (
    /** @type {Derived<V> | undefined} */
    void 0
  ), h = () => l && i ? (p ?? (p = /* @__PURE__ */ Hr(
    /** @type {() => V} */
    r
  )), s(p)) : (u && (u = !1, o = l ? Mr(
    /** @type {() => V} */
    r
  ) : (
    /** @type {V} */
    r
  )), o);
  let M;
  if (a) {
    var f = Kn in t || oo in t;
    M = ((j = ar(t, e)) == null ? void 0 : j.set) ?? (f && e in t ? (R) => t[e] = R : void 0);
  }
  var _, E = !1;
  a ? [_, E] = Ho(() => (
    /** @type {V} */
    t[e]
  )) : _ = /** @type {V} */
  t[e], _ === void 0 && r !== void 0 && (_ = h(), M && (Ro(), M(_)));
  var w;
  if (w = () => {
    var R = (
      /** @type {V} */
      t[e]
    );
    return R === void 0 ? h() : (u = !0, R);
  }, (n & bo) === 0)
    return w;
  if (M) {
    var v = t.$$legacy;
    return (
      /** @type {() => V} */
      (function(R, y) {
        return arguments.length > 0 ? ((!y || v || E) && M(y ? w() : R), R) : w();
      })
    );
  }
  var A = !1, L = ((n & go) !== 0 ? Hr : $a)(() => (A = !1, w()));
  a && s(L);
  var P = (
    /** @type {Effect} */
    Me
  );
  return (
    /** @type {() => V} */
    (function(R, y) {
      if (arguments.length > 0) {
        const d = y ? s(L) : a ? Ye(R) : R;
        return b(L, d), A = !0, o !== void 0 && (o = d), R;
      }
      return hn && A || (P.f & wt) !== 0 ? L.v : s(L);
    })
  );
}
function Tr(t) {
  ft === null && To(), Pt(() => {
    const e = Mr(t);
    if (typeof e == "function") return (
      /** @type {() => void} */
      e
    );
  });
}
const Kc = "5";
var La;
typeof window < "u" && ((La = window.__svelte ?? (window.__svelte = {})).v ?? (La.v = /* @__PURE__ */ new Set())).add(Kc);
var Jc = /* @__PURE__ */ yc('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="svelte-13so817"><path></path></svg>');
function B(t, e) {
  let n = Fe(e, "name", 3, "square"), r = Fe(e, "size", 3, 16), i = Fe(e, "fa", 3, "");
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
    "panel-right": "M3 4h18v16H3zM15 4v16"
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
  }, o = /* @__PURE__ */ fe(() => a[i() ? l[i()] || "blocks" : n()] || a.blocks);
  var u = Jc(), p = Y(u);
  O(() => {
    de(u, "width", r()), de(u, "height", r()), de(p, "d", s(o));
  }), x(t, u);
}
const Pl = ["anchor", "background", "spacing", "width", "align", "class", "reveal", "hidden"], Kr = (t) => t === void 0 ? void 0 : JSON.parse(JSON.stringify(t));
function zl(t, e = Pl) {
  if (!t || typeof t != "object" || typeof t.type != "string") return null;
  const { type: n } = t, r = { type: n }, i = {};
  for (const [l, o] of Object.entries(t))
    l === "type" || l === n || (e.includes(l) ? r[l] = o : i[l] = o);
  const a = t[n];
  return r[n] = a && typeof a == "object" && !Array.isArray(a) ? a : i, r;
}
function Pr(t, e) {
  return Array.isArray(t) ? t.map((n) => zl(n, e)).filter(Boolean) : [];
}
function Qi(t) {
  if (t.default !== void 0)
    return t.validate === "bool" || t.type === "toggle" ? t.default === !0 || t.default === 1 || t.default === "1" : Kr(t.default);
  if (t.type === "list") return [];
  if (t.type === "toggle") return !1;
}
function Nl(t, e = "item") {
  const n = {}, r = (t == null ? void 0 : t.fields) || [];
  for (const a of r) {
    const l = Qi(a);
    l !== void 0 && l !== "" && !(Array.isArray(l) && !l.length) && (n[a.name] = l);
  }
  t != null && t.new_item && typeof t.new_item == "object" && !Array.isArray(t.new_item) && Object.assign(n, Kr(t.new_item));
  let i = !0;
  for (const a of r) {
    if (n[a.name] !== void 0) {
      ["text", "textarea", "markdown"].includes(a.type) && (i = !1);
      continue;
    }
    if (/(^|_)url$/.test(a.name)) {
      n[a.name] = "#";
      continue;
    }
    ["text", "textarea", "markdown"].includes(a.type) && (n[a.name] = i ? `New ${e}` : String(a.label || a.name).replace(/\s*\(.*\)\s*$/, ""), i = !1);
  }
  return n;
}
function Ma(t, e = !0) {
  const n = {}, r = e && t.example && typeof t.example == "object" ? zl(t.example) : null;
  r && Object.assign(n, Kr(r[t.type]));
  for (const a of t.fields || [])
    if (n[a.name] === void 0) {
      const l = Qi(a);
      l !== void 0 && l !== "" && !(Array.isArray(l) && !l.length) && (n[a.name] = l);
    }
  const i = { type: t.type };
  if (r)
    for (const [a, l] of Object.entries(r)) a !== "type" && a !== t.type && (i[a] = Kr(l));
  return i[t.type] = n, i;
}
function Ol(t) {
  const e = t && t[t.type] || {}, n = e.heading || e.title || e.name || e.eyebrow || e.text || e.question || e.url || "";
  if (n) return String(n).replace(/[*_`#>]/g, "").slice(0, 70);
  const r = Array.isArray(e.items) && e.items[0];
  return r ? String(r.title || r.name || r.question || "").slice(0, 70) : "";
}
function Yc(t, e, n) {
  if (t && typeof t == "object")
    for (const r of e || []) {
      const i = t[r.name];
      if (typeof i == "string" && i.trim() && ["text", "textarea", "markdown"].includes(r.type))
        return i.replace(/[*_`#>]/g, "").slice(0, 60);
    }
  return `Item ${n + 1}`;
}
function Wc(t) {
  return Kr(t);
}
function Xc() {
  const t = decodeURIComponent(window.location.pathname);
  let e = t.match(/\/pages\/edit\/(.+?)\/?$/);
  return e ? { kind: "page", route: "/" + e[1] } : (e = t.match(/\/flex-objects\/([^/]+)\/([^/]+)\/?$/), e ? { kind: "flex", type: e[1], key: e[2] === "new" ? null : e[2] } : { kind: "unknown" });
}
const Ta = {
  hero: "Hero",
  content: "Content",
  media: "Media",
  "social-proof": "Social proof",
  commerce: "Commerce",
  dynamic: "Dynamic",
  forms: "Forms",
  layout: "Layout"
};
var Zc = /* @__PURE__ */ C('<span class="err svelte-1uadtto"> </span>'), Qc = /* @__PURE__ */ C('<p class="warn svelte-1uadtto"> </p>'), $c = /* @__PURE__ */ C('<span class="badge svelte-1uadtto">Hidden</span>'), eu = /* @__PURE__ */ C('<li draggable="true"><span class="grip svelte-1uadtto"><!></span> <span class="ico svelte-1uadtto"><!></span> <button type="button" class="row svelte-1uadtto"><strong class="svelte-1uadtto"> </strong> <span class="text svelte-1uadtto"> </span></button> <!></li>'), tu = /* @__PURE__ */ C('<ol class="svelte-1uadtto"></ol>'), nu = /* @__PURE__ */ C('<button type="button" class="empty svelte-1uadtto"><!> <span>Start building. Add your first section in the visual builder.</span></button>'), ru = /* @__PURE__ */ C('<div class="summary svelte-1uadtto"><header class="svelte-1uadtto"><div><div class="title svelte-1uadtto"> </div> <div class="sub svelte-1uadtto"><!></div></div> <button type="button" class="mb-btn primary"><!> Open Visual Builder</button></header> <!> <!></div>');
function su(t, e) {
  rt(e, !0);
  let n = /* @__PURE__ */ D(-1), r = /* @__PURE__ */ D(-1);
  const i = /* @__PURE__ */ fe(() => {
    var y;
    return ((y = e.field) == null ? void 0 : y.label) || "Blocks";
  });
  function a(y) {
    s(n) >= 0 && y !== s(n) && e.store.move(s(n), y), b(n, -1), b(r, -1);
  }
  var l = ru(), o = m(l), u = m(o), p = m(u), h = Y(p, !0), M = g(p, 2), f = m(M);
  {
    var _ = (y) => {
      var d = Zc(), k = Y(d, !0);
      O(() => q(k, e.store.loadError)), x(y, d);
    }, E = (y) => {
      var d = Ur();
      O(() => q(d, `${e.store.blocks.length ?? ""} ${e.store.blocks.length === 1 ? "section" : "sections"} · drag to reorder, click to edit`)), x(y, d);
    };
    G(f, (y) => {
      e.store.loadError ? y(_) : y(E, -1);
    });
  }
  var w = g(u, 2), v = m(w);
  B(v, { name: "maximize", size: 15 });
  var A = g(o, 2);
  {
    var L = (y) => {
      var d = Qc(), k = Y(d, !0);
      O(() => q(k, e.store.isFlex ? "Save this item first. The visual builder previews saved items." : "Save the page first. The visual builder needs a page URL to preview.")), x(y, d);
    };
    G(A, (y) => {
      e.store.canPreview || y(L);
    });
  }
  var P = g(A, 2);
  {
    var j = (y) => {
      var d = tu();
      Re(d, 23, () => e.store.blocks, (k, S) => S + ":" + k.type, (k, S, z) => {
        const X = /* @__PURE__ */ fe(() => e.store.defFor(s(S).type));
        var re = eu();
        let U;
        var Z = m(re), te = m(Z);
        B(te, { name: "grip", size: 14 });
        var K = g(Z, 2), ue = m(K);
        {
          let oe = /* @__PURE__ */ fe(() => {
            var _e;
            return ((_e = s(X)) == null ? void 0 : _e.icon) || "fa-square";
          });
          B(ue, {
            get fa() {
              return s(oe);
            },
            size: 15
          });
        }
        var pe = g(K, 2), $ = m(pe), ke = Y($, !0), W = g($, 2), Q = Y(W, !0), le = g(pe, 2);
        {
          var ve = (oe) => {
            var _e = $c();
            x(oe, _e);
          };
          G(le, (oe) => {
            s(S).hidden && oe(ve);
          });
        }
        O(
          (oe) => {
            var _e;
            U = be(re, 1, "svelte-1uadtto", null, U, {
              over: s(r) === s(z),
              "hidden-block": s(S).hidden
            }), q(ke, ((_e = s(X)) == null ? void 0 : _e.title) || s(S).type), q(Q, oe);
          },
          [
            () => {
              var oe;
              return s(S).type === "global" ? e.store.sectionTitle((oe = s(S).global) == null ? void 0 : oe.section) : Ol(s(S));
            }
          ]
        ), Be("dragstart", re, () => b(n, s(z), !0)), Be("dragover", re, (oe) => {
          oe.preventDefault(), b(r, s(z), !0);
        }), Be("dragleave", re, () => b(r, -1)), Be("drop", re, () => a(s(z))), Be("dragend", re, () => {
          b(n, -1), b(r, -1);
        }), N("click", pe, () => e.openBuilder(s(z))), x(k, re);
      }), x(y, d);
    }, R = (y) => {
      var d = nu(), k = m(d);
      B(k, { name: "plus", size: 18 }), O(() => d.disabled = !e.store.canPreview), N("click", d, () => e.openBuilder(-1)), x(y, d);
    };
    G(P, (y) => {
      e.store.blocks.length ? y(j) : y(R, -1);
    });
  }
  O(() => {
    q(h, s(i)), w.disabled = !e.store.canPreview;
  }), N("click", w, () => e.openBuilder(-1)), x(t, l), st();
}
ot(["click"]);
var iu = /* @__PURE__ */ C('<button type="button" class="card svelte-1cvfiky" draggable="true"><span class="ico svelte-1cvfiky"><!></span> <span class="name svelte-1cvfiky"> </span></button>'), au = /* @__PURE__ */ C('<section class="svelte-1cvfiky"><h3 class="svelte-1cvfiky"> </h3> <div class="grid svelte-1cvfiky"></div></section>'), lu = /* @__PURE__ */ C('<p class="hint svelte-1cvfiky"> </p>'), ou = /* @__PURE__ */ C('<div class="search svelte-1cvfiky"><!> <input type="search" placeholder="Search blocks" aria-label="Search blocks" class="svelte-1cvfiky"/></div> <p class="hint svelte-1cvfiky"> </p> <!>', 1);
function cu(t, e) {
  rt(e, !0);
  let n = Fe(e, "store", 7), r = /* @__PURE__ */ D("");
  const i = /* @__PURE__ */ fe(() => {
    var L;
    const E = s(r).trim().toLowerCase(), w = (((L = n().catalog) == null ? void 0 : L.blocks) || []).filter((P) => !P.virtual).filter((P) => !E || P.title.toLowerCase().includes(E) || P.type.includes(E) || (P.description || "").toLowerCase().includes(E)), v = Object.keys(Ta), A = /* @__PURE__ */ new Map();
    for (const P of w)
      A.has(P.category) || A.set(P.category, []), A.get(P.category).push(P);
    return [...A.entries()].sort((P, j) => {
      const R = v.indexOf(P[0]), y = v.indexOf(j[0]);
      return (R < 0 ? 99 : R) - (y < 0 ? 99 : y);
    });
  });
  function a(E, w) {
    E.dataTransfer.setData("application/x-maw-block", w), E.dataTransfer.setData("text/plain", w), E.dataTransfer.effectAllowed = "copy", requestAnimationFrame(() => n().dragType = w);
  }
  function l() {
    n().dragType = "";
  }
  var o = ou(), u = Ee(o), p = m(u);
  B(p, { name: "search", size: 14 });
  var h = g(p, 2), M = g(u, 2), f = Y(M), _ = g(M, 2);
  Re(
    _,
    17,
    () => s(i),
    ([E, w]) => E,
    (E, w) => {
      var v = /* @__PURE__ */ fe(() => Ua(s(w), 2));
      let A = () => s(v)[0], L = () => s(v)[1];
      var P = au(), j = m(P), R = Y(j, !0), y = g(j, 2);
      Re(y, 21, L, (d) => d.type, (d, k) => {
        var S = iu(), z = m(S), X = m(z);
        B(X, {
          get fa() {
            return s(k).icon;
          },
          size: 18
        });
        var re = g(z, 2), U = Y(re, !0);
        O(() => {
          de(S, "title", s(k).description), q(U, s(k).title);
        }), Be("dragstart", S, (Z) => a(Z, s(k).type)), Be("dragend", S, l), N("click", S, () => n().insert(s(k).type)), x(d, S);
      }), O(() => q(R, Ta[A()] || A())), x(E, P);
    },
    (E) => {
      var w = lu(), v = Y(w);
      O(() => q(v, `No blocks match “${s(r) ?? ""}”.`)), x(E, w);
    }
  ), O(() => q(f, `${n().selected >= 0 ? `Inserts after block ${n().selected + 1}` : "Inserts at the end of the page"} · or drag onto the page`)), pn(h, () => s(r), (E) => b(r, E)), x(t, o), st();
}
ot(["click"]);
var uu = /* @__PURE__ */ C('<button type="button"><!> Global</button>'), du = /* @__PURE__ */ C('<div class="global svelte-k3gmal"><span class="gico svelte-k3gmal"><!></span> <div class="meta svelte-k3gmal"><strong class="svelte-k3gmal"> </strong> <span class="svelte-k3gmal"> </span></div> <div class="acts svelte-k3gmal"><button type="button" class="mb-btn sm primary" title="Insert on this page"><!> Insert</button> <button type="button" class="mb-btn sm" title="Edit this global section"><!></button></div></div>'), fu = /* @__PURE__ */ C('<p class="empty svelte-k3gmal">No global sections yet. Select a block, open its <strong>Advanced</strong> tab and click <strong>Make global section</strong>.</p>'), vu = /* @__PURE__ */ C('<p class="hint svelte-k3gmal">Global sections are edited once and update on every page that uses them. Inserting one places a live reference, not a copy.</p> <!>', 1), hu = /* @__PURE__ */ C("<span></span>"), pu = /* @__PURE__ */ C('<button type="button" class="mb-btn ghost icon sm del svelte-k3gmal" title="Delete pattern"><!></button>'), gu = /* @__PURE__ */ C('<div class="pattern svelte-k3gmal"><button type="button" class="preview svelte-k3gmal" title="Insert pattern"><div class="mini svelte-k3gmal"></div> <div class="pmeta svelte-k3gmal"><strong class="svelte-k3gmal"> </strong> <span class="svelte-k3gmal"> </span></div></button> <!></div>'), bu = /* @__PURE__ */ C('<p class="empty svelte-k3gmal"> </p>'), _u = /* @__PURE__ */ C('<div class="seg svelte-k3gmal" role="tablist"><button type="button">Sections</button> <button type="button">Layouts</button> <!></div> <!>', 1);
function mu(t, e) {
  rt(e, !0);
  let n = /* @__PURE__ */ D("section");
  const r = /* @__PURE__ */ fe(() => e.store.patterns.filter((P) => P.category === s(n)));
  async function i(P) {
    if (P.category === "page" && e.store.blocks.length) {
      const j = await e.askConfirm({
        title: `Use “${P.title}”`,
        message: `This layout has ${P.blocks.length} sections. Replace the current page content or add it to the end?`,
        choices: [
          { label: "Cancel", value: null },
          { label: "Add to end", value: "append" },
          { label: "Replace page", value: "replace", primary: !0 }
        ]
      });
      if (!j) return;
      e.store.insertMany(P.blocks, j === "append" ? e.store.blocks.length : null, j === "replace");
    } else
      e.store.insertMany(P.blocks);
    e.store.flash(`Inserted “${P.title}”`);
  }
  async function a(P) {
    if (await e.askConfirm({
      title: "Delete pattern",
      message: `Delete “${P.title}”? Pages that already use it are not affected.`,
      choices: [
        { label: "Cancel", value: !1 },
        { label: "Delete", value: !0, primary: !0 }
      ]
    }))
      try {
        await e.store.deletePattern(P.id);
      } catch (R) {
        e.store.flash(R.message);
      }
  }
  async function l(P) {
    try {
      await e.store.openSection(P.id);
    } catch (j) {
      e.store.flash(j.message);
    }
  }
  function o(P) {
    var j;
    return ((j = e.store.defFor(P)) == null ? void 0 : j.title) || P;
  }
  var u = _u(), p = Ee(u), h = m(p);
  let M;
  var f = g(h, 2);
  let _;
  var E = g(f, 2);
  {
    var w = (P) => {
      var j = uu();
      let R;
      var y = m(j);
      B(y, { name: "globe", size: 12 }), O(() => R = be(j, 1, "svelte-k3gmal", null, R, { active: s(n) === "global" })), N("click", j, () => {
        b(n, "global"), e.store.refreshSections();
      }), x(P, j);
    };
    G(E, (P) => {
      e.store.isSection || P(w);
    });
  }
  var v = g(p, 2);
  {
    var A = (P) => {
      var j = vu(), R = g(Ee(j), 2);
      Re(
        R,
        17,
        () => e.store.sections,
        (y) => y.id,
        (y, d) => {
          var k = du(), S = m(k), z = m(S);
          B(z, { name: "globe", size: 16 });
          var X = g(S, 2), re = m(X), U = Y(re, !0), Z = g(re, 2), te = Y(Z), K = g(X, 2), ue = m(K), pe = m(ue);
          B(pe, { name: "plus", size: 12 });
          var $ = g(ue, 2), ke = m($);
          B(ke, { name: "edit", size: 12 }), O(() => {
            q(U, s(d).title), q(te, `${s(d).count ?? ""} ${s(d).count === 1 ? "block" : "blocks"}${s(d).updated_by ? ` · edited by ${s(d).updated_by}` : ""}`);
          }), N("click", ue, () => e.store.insertGlobal(s(d).id)), N("click", $, () => l(s(d))), x(y, k);
        },
        (y) => {
          var d = fu();
          x(y, d);
        }
      ), x(P, j);
    }, L = (P) => {
      var j = Jt(), R = Ee(j);
      Re(
        R,
        17,
        () => s(r),
        (y) => y.id,
        (y, d) => {
          var k = gu(), S = m(k), z = m(S);
          Re(z, 21, () => s(d).blocks.slice(0, 6), bt, (pe, $) => {
            var ke = hu();
            let W;
            O(() => W = be(ke, 1, `bar ${s($).type ?? ""}`, "svelte-k3gmal", W, {
              accent: s($).background === "accent" || s($).type === "cta",
              alt: s($).background === "alt" || s($).background === "soft",
              dark: s($).background === "dark"
            })), x(pe, ke);
          });
          var X = g(z, 2), re = m(X), U = Y(re, !0), Z = g(re, 2), te = Y(Z, !0), K = g(S, 2);
          {
            var ue = (pe) => {
              var $ = pu(), ke = m($);
              B(ke, { name: "trash", size: 13 }), N("click", $, () => a(s(d))), x(pe, $);
            };
            G(K, (pe) => {
              s(d).source === "user" && pe(ue);
            });
          }
          O(
            (pe) => {
              q(U, s(d).title), q(te, pe);
            },
            [
              () => s(d).description || s(d).blocks.map((pe) => o(pe.type)).join(" · ")
            ]
          ), N("click", S, () => i(s(d))), x(y, k);
        },
        (y) => {
          var d = bu(), k = Y(d);
          O(() => q(k, `No ${s(n) === "page" ? "page layouts" : "sections"} yet. Select blocks and click “Save as pattern” to create one.`)), x(y, d);
        }
      ), x(P, j);
    };
    G(v, (P) => {
      s(n) === "global" ? P(A) : P(L, -1);
    });
  }
  O(() => {
    M = be(h, 1, "svelte-k3gmal", null, M, { active: s(n) === "section" }), _ = be(f, 1, "svelte-k3gmal", null, _, { active: s(n) === "page" });
  }), N("click", h, () => b(n, "section")), N("click", f, () => b(n, "page")), x(t, u), st();
}
ot(["click"]);
var yu = /* @__PURE__ */ C('<p class="empty svelte-1jf4jiu">This page has no blocks yet. Add one from the Blocks tab.</p>'), ku = /* @__PURE__ */ C('<li draggable="true"><span class="grip svelte-1jf4jiu"><!></span> <button type="button" class="row svelte-1jf4jiu"><!> <span class="t svelte-1jf4jiu"> </span> <span class="s svelte-1jf4jiu"> </span></button> <span class="actions svelte-1jf4jiu"><button type="button" class="mb-btn ghost icon sm"><!></button> <button type="button" class="mb-btn ghost icon sm" title="Duplicate"><!></button> <button type="button" class="mb-btn ghost icon sm danger" title="Delete"><!></button></span></li>'), wu = /* @__PURE__ */ C('<!> <ol class="svelte-1jf4jiu"></ol>', 1);
function xu(t, e) {
  rt(e, !0);
  let n = Fe(e, "store", 7), r = /* @__PURE__ */ D(-1), i = /* @__PURE__ */ D(-1);
  function a(h) {
    s(r) >= 0 && n().move(s(r), (s(r) < h, h)), b(r, b(i, -1), !0);
  }
  var l = wu(), o = Ee(l);
  {
    var u = (h) => {
      var M = yu();
      x(h, M);
    };
    G(o, (h) => {
      n().blocks.length || h(u);
    });
  }
  var p = g(o, 2);
  Re(p, 23, () => n().blocks, (h, M) => M + h.type, (h, M, f) => {
    const _ = /* @__PURE__ */ fe(() => n().defFor(s(M).type));
    var E = ku();
    let w;
    var v = m(E), A = m(v);
    B(A, { name: "grip", size: 13 });
    var L = g(v, 2), P = m(L);
    {
      let te = /* @__PURE__ */ fe(() => {
        var K;
        return (K = s(_)) == null ? void 0 : K.icon;
      });
      B(P, {
        get fa() {
          return s(te);
        },
        size: 14
      });
    }
    var j = g(P, 2), R = Y(j, !0), y = g(j, 2), d = Y(y, !0), k = g(L, 2), S = m(k), z = m(S);
    {
      let te = /* @__PURE__ */ fe(() => s(M).hidden ? "eye-off" : "eye");
      B(z, {
        get name() {
          return s(te);
        },
        size: 13
      });
    }
    var X = g(S, 2), re = m(X);
    B(re, { name: "copy", size: 13 });
    var U = g(X, 2), Z = m(U);
    B(Z, { name: "trash", size: 13 }), O(
      (te) => {
        var K;
        w = be(E, 1, "svelte-1jf4jiu", null, w, {
          selected: n().selected === s(f),
          over: s(i) === s(f),
          dim: s(M).hidden
        }), q(R, ((K = s(_)) == null ? void 0 : K.title) || s(M).type), q(d, te), de(S, "title", s(M).hidden ? "Show" : "Hide");
      },
      [
        () => {
          var te;
          return s(M).type === "global" ? n().sectionTitle((te = s(M).global) == null ? void 0 : te.section) : Ol(s(M));
        }
      ]
    ), Be("dragstart", E, () => b(r, s(f), !0)), Be("dragover", E, (te) => {
      te.preventDefault(), b(i, s(f), !0);
    }), Be("dragleave", E, () => b(i, -1)), Be("drop", E, () => a(s(f))), Be("dragend", E, () => b(r, b(i, -1), !0)), N("click", L, () => n().selected = s(f)), N("click", S, () => n().toggleHidden(s(f))), N("click", X, () => n().duplicate(s(f))), N("click", U, () => n().remove(s(f))), x(h, E);
  }), x(t, l), st();
}
ot(["click"]);
var Su = /* @__PURE__ */ C('<button type="button" role="option"><span class="ico svelte-18xya39"><!></span> <span class="txt svelte-18xya39"><strong class="svelte-18xya39"> </strong><span class="svelte-18xya39"> </span></span></button>'), Eu = /* @__PURE__ */ C('<p class="none svelte-18xya39">No blocks match.</p>'), Mu = /* @__PURE__ */ C('<div class="qi svelte-18xya39" role="dialog" aria-label="Add block"><div class="search svelte-18xya39"><!> <input placeholder="Search blocks…" aria-label="Search blocks" class="svelte-18xya39"/></div> <div class="list mb-scroll svelte-18xya39" role="listbox"></div></div>');
function Tu(t, e) {
  rt(e, !0);
  let n = Fe(e, "top", 3, 0), r = /* @__PURE__ */ D(""), i = /* @__PURE__ */ D(0), a = /* @__PURE__ */ D(void 0), l = /* @__PURE__ */ D(void 0);
  const o = /* @__PURE__ */ fe(() => {
    var A;
    const v = s(r).trim().toLowerCase();
    return (((A = e.store.catalog) == null ? void 0 : A.blocks) || []).filter((L) => !v || L.title.toLowerCase().includes(v) || L.type.includes(v) || (L.description || "").toLowerCase().includes(v));
  });
  Pt(() => {
    s(r), b(i, 0);
  });
  function u(v) {
    e.store.insert(v.type, e.index), e.onclose();
  }
  function p(v) {
    v.key === "ArrowDown" ? (v.preventDefault(), b(i, Math.min(s(i) + 1, s(o).length - 1), !0)) : v.key === "ArrowUp" ? (v.preventDefault(), b(i, Math.max(s(i) - 1, 0), !0)) : v.key === "Enter" && s(o)[s(i)] ? (v.preventDefault(), u(s(o)[s(i)])) : v.key === "Escape" && (v.preventDefault(), v.stopPropagation(), e.onclose());
  }
  Tr(() => {
    var A;
    (A = s(a)) == null || A.focus();
    const v = (L) => {
      L.composedPath().includes(s(l)) || e.onclose();
    };
    return setTimeout(() => document.addEventListener("pointerdown", v, !0)), () => document.removeEventListener("pointerdown", v, !0);
  });
  var h = Mu();
  let M;
  var f = m(h), _ = m(f);
  B(_, { name: "search", size: 14 });
  var E = g(_, 2);
  Tn(E, (v) => b(a, v), () => s(a));
  var w = g(f, 2);
  Re(
    w,
    23,
    () => s(o),
    (v) => v.type,
    (v, A, L) => {
      var P = Su();
      let j;
      var R = m(P), y = m(R);
      B(y, {
        get fa() {
          return s(A).icon;
        },
        size: 16
      });
      var d = g(R, 2), k = m(d), S = Y(k, !0), z = g(k), X = Y(z, !0);
      O(() => {
        de(P, "aria-selected", s(L) === s(i)), j = be(P, 1, "svelte-18xya39", null, j, { active: s(L) === s(i) }), q(S, s(A).title), q(X, s(A).description);
      }), Be("mouseenter", P, () => b(i, s(L), !0)), N("click", P, () => u(s(A))), x(v, P);
    },
    (v) => {
      var A = Eu();
      x(v, A);
    }
  ), Tn(h, (v) => b(l, v), () => s(l)), O(() => M = Ct(h, "", M, { top: `${n() ?? ""}px` })), N("keydown", E, p), pn(E, () => s(r), (v) => b(r, v)), x(t, h), st();
}
ot(["keydown", "click"]);
function Au() {
  const t = (window.__GRAV_API_SERVER_URL || "").replace(/\/$/, ""), e = window.__GRAV_API_PREFIX || "/api/v1";
  return t + e;
}
function Cu(t = {}) {
  const e = { Accept: "application/json", ...t };
  return window.__GRAV_API_TOKEN && (e["X-API-Token"] = window.__GRAV_API_TOKEN), window.__GRAV_ENVIRONMENT && (e["X-Grav-Environment"] = window.__GRAV_ENVIRONMENT), e;
}
async function dt(t, e, n) {
  var l;
  const r = { method: t, headers: Cu(), credentials: "same-origin" };
  n instanceof FormData ? r.body = n : n !== void 0 && (r.headers["Content-Type"] = "application/json", r.body = JSON.stringify(n));
  const i = await fetch(Au() + e, r);
  if (i.status === 204) return null;
  const a = await i.json().catch(() => ({}));
  if (!i.ok) {
    const o = ((l = a == null ? void 0 : a.error) == null ? void 0 : l.message) || (a == null ? void 0 : a.message) || (a == null ? void 0 : a.detail) || `Request failed (${i.status})`;
    throw new Error(o);
  }
  return a && typeof a == "object" && "data" in a ? a.data : a;
}
function Pu(t) {
  return String(t || "").replace(/^\/+/, "").split("/").map(encodeURIComponent).join("/");
}
function gi(t) {
  return t.kind === "flex" ? { context: "flex", type: t.type, key: t.key } : t.kind === "section" ? { context: "section", id: t.id } : { context: "page", route: t.route };
}
function Aa(t) {
  return t.kind === "flex" ? `/flex-objects/${encodeURIComponent(t.type)}/${encodeURIComponent(t.key)}/media` : `/pages/${Pu(t.route)}/media`;
}
const at = {
  blocks: () => dt("GET", "/maw-builder/blocks"),
  patterns: () => dt("GET", "/maw-builder/patterns"),
  savePattern: (t) => dt("POST", "/maw-builder/patterns", t),
  deletePattern: (t) => dt("DELETE", "/maw-builder/patterns/" + encodeURIComponent(t)),
  /** ctx: {kind:'page', route} | {kind:'flex', type, key} | {kind:'section', id} */
  preview: (t, e, n) => dt("POST", "/maw-builder/preview", { ...gi(t), blocks: e, field: n }),
  /** Media stored with the page or Flex object being edited (global sections have none: they use the site library). */
  ownMedia: (t) => t.kind === "section" ? Promise.resolve([]) : dt("GET", Aa(t)),
  revisions: (t) => dt("GET", "/maw-builder/revisions?" + new URLSearchParams(gi(t))),
  revision: (t, e) => dt("GET", `/maw-builder/revisions/${encodeURIComponent(e)}?` + new URLSearchParams(gi(t))),
  sections: () => dt("GET", "/maw-builder/sections"),
  section: (t) => dt("GET", `/maw-builder/sections/${encodeURIComponent(t)}`),
  createSection: (t, e) => dt("POST", "/maw-builder/sections", { title: t, blocks: e }),
  updateSection: (t, e) => dt("PATCH", `/maw-builder/sections/${encodeURIComponent(t)}`, e),
  deleteSection: (t, e = !1) => dt("DELETE", `/maw-builder/sections/${encodeURIComponent(t)}${e ? "?force=1" : ""}`),
  uploadOwnMedia: (t, e) => {
    const n = new FormData();
    return [...e].forEach((r) => n.append("files[]", r)), dt("POST", Aa(t), n);
  },
  siteMedia: (t = "", e = "") => {
    const n = new URLSearchParams({ per_page: "200" });
    return t && n.set("path", t), e && n.set("search", e), dt("GET", `/media?${n}`);
  },
  uploadSiteMedia: (t, e = "") => {
    const n = new FormData();
    return [...t].forEach((r) => n.append("files[]", r)), dt("POST", `/media${e ? "?path=" + encodeURIComponent(e) : ""}`, n);
  }
};
var zu = /* @__PURE__ */ C('<iframe title="Page preview" sandbox="allow-same-origin allow-scripts"></iframe>'), Nu = /* @__PURE__ */ C('<div class="hover-box svelte-dfb6jk"><span class="tag svelte-dfb6jk"> </span></div>'), Ou = /* @__PURE__ */ C('<button type="button" class="add-gap svelte-dfb6jk" title="Add block below"><!><span class="svelte-dfb6jk">Add block</span></button>'), Ru = /* @__PURE__ */ C('<div class="toolbar svelte-dfb6jk"><span class="name svelte-dfb6jk"> </span> <button type="button" title="Move up (Alt+↑)" class="svelte-dfb6jk"><!></button> <button type="button" title="Move down (Alt+↓)" class="svelte-dfb6jk"><!></button> <button type="button" title="Duplicate (Ctrl+D)" class="svelte-dfb6jk"><!></button> <button type="button" title="Delete (Del)" class="danger svelte-dfb6jk"><!></button></div> <!>', 1), Du = /* @__PURE__ */ C('<div class="quick-line svelte-dfb6jk"></div> <!>', 1), Lu = /* @__PURE__ */ C('<div class="insert-line svelte-dfb6jk"></div>'), Iu = /* @__PURE__ */ C('<div class="drop-line svelte-dfb6jk"><span class="svelte-dfb6jk">Drop to insert here</span></div>'), ju = /* @__PURE__ */ C('<div class="drop-catcher svelte-dfb6jk" role="presentation"></div> <!>', 1), Fu = /* @__PURE__ */ C('<div class="blank svelte-dfb6jk"><!> <strong class="svelte-dfb6jk">Your page is empty</strong> <span class="svelte-dfb6jk">Pick a block or a page layout from the left panel, or drag one here.</span></div>'), qu = /* @__PURE__ */ C('<div class="error svelte-dfb6jk"> </div>'), Uu = /* @__PURE__ */ C('<div class="viewport svelte-dfb6jk"><div><div class="stage svelte-dfb6jk"><!> <div class="overlay svelte-dfb6jk"><!> <!> <!> <!> <!></div> <!> <!></div></div></div> <div role="status" aria-live="polite"><span class="spinner svelte-dfb6jk"></span> <span class="svelte-dfb6jk"> </span></div>', 1);
function Hu(t, e) {
  rt(e, !0);
  let n = Fe(e, "store", 7), r = Fe(e, "width", 3, null), i = Ye([
    { src: "about:blank", key: 0 },
    { src: "about:blank", key: 1 }
  ]), a = /* @__PURE__ */ D(
    0
    // index of the visible frame
  ), l = [], o = /* @__PURE__ */ D(!0), u = /* @__PURE__ */ D(""), p = /* @__PURE__ */ D(Ye([])), h = /* @__PURE__ */ D(-1), M = 0, f = /* @__PURE__ */ D(
    -1
    // insertion index while dragging a block from the inserter
  ), _ = /* @__PURE__ */ D(void 0), E = 0, w = 0, v = "", A = /* @__PURE__ */ D(
    null
    // {index, top} while the canvas block picker is open
  ), L = /* @__PURE__ */ D(600), P = !1;
  const j = /* @__PURE__ */ fe(() => s(o) || !!n().busy);
  let R = /* @__PURE__ */ D(!1), y = /* @__PURE__ */ D("Updating preview…"), d = 0;
  Pt(() => {
    s(j) ? (n().busy ? b(y, n().busy, !0) : s(o) && !n().blocks.length && b(y, "Loading preview…"), clearTimeout(d), s(R) || (d = setTimeout(() => b(R, !0), 250))) : (clearTimeout(d), b(R, !1));
  });
  function k() {
    b(o, !1), n().busy = "", n().pendingInsert = null;
  }
  function S() {
    v = "", z(0);
  }
  function z(H = 450) {
    clearTimeout(E), E = setTimeout(X, H);
  }
  async function X() {
    if (!n().canPreview) return;
    const H = n().snapshot(), J = JSON.stringify(H);
    if (J === n().renderedPayload) {
      v = J, s(o) || k();
      return;
    }
    if (J === v) {
      s(o) || k();
      return;
    }
    v = J;
    const ie = ++w;
    b(o, !0), b(u, "");
    try {
      const F = await at.preview(n().context, H, n().fieldName);
      if (ie !== w) return;
      const Ne = s(a) === 0 ? 1 : 0;
      i[Ne] = { src: F.url + "&_t=" + ie, key: i[Ne].key };
    } catch (F) {
      ie === w && (b(u, F.message, !0), k());
    }
  }
  Pt(() => {
    JSON.stringify(n().blocks), n().catalog && z();
  });
  let re = -1;
  Pt(() => {
    var ie, F;
    const H = n().selected, J = H !== re;
    if (re = H, s(j)) {
      J && (P = !0);
      return;
    }
    (F = (ie = l[s(a)]) == null ? void 0 : ie.contentWindow) == null || F.postMessage(
      {
        source: "maw-builder",
        type: "select",
        index: H,
        scroll: J
      },
      location.origin
    );
  }), Tr(() => {
    const H = (J) => {
      var Ne;
      if (J.origin !== location.origin || ((Ne = J.data) == null ? void 0 : Ne.source) !== "maw-preview") return;
      const ie = l.findIndex((Pe) => Pe && Pe.contentWindow === J.source);
      if (ie < 0) return;
      const F = J.data;
      if (F.type === "ready") {
        if (ie !== s(a)) {
          J.source.postMessage({ source: "maw-builder", type: "scrollTo", y: M }, location.origin), J.source.postMessage(
            {
              source: "maw-builder",
              type: "select",
              index: n().selected,
              scroll: P,
              behavior: "smooth"
            },
            location.origin
          ), P = !1;
          const Pe = n().pendingFocus;
          n().pendingFocus = null, requestAnimationFrame(() => {
            b(a, ie, !0), k(), Pe && J.source.postMessage(
              {
                source: "maw-builder",
                type: "focus-edit",
                index: Pe.index,
                path: Pe.path
              },
              location.origin
            );
          });
        } else
          k();
        b(p, F.rects || [], !0), F.palette && F.palette.none && (n().palette = F.palette);
        return;
      }
      if (ie === s(a))
        if (F.type === "rects")
          b(p, F.rects, !0), M = F.scrollY || 0;
        else if (F.type === "hover") b(h, F.index, !0);
        else if (F.type === "select") n().selected = F.index;
        else if (F.type === "inline") n().inlineSet(F.index, F.path, String(F.value ?? ""));
        else if (F.type === "inline-md") n().inlineSetMarkdown(F.index, F.path, String(F.value ?? ""));
        else if (F.type === "list-op") n().listOp(F);
        else if (F.type === "image-pick")
          n().selected = F.index, n().imagePick = { index: F.index, path: F.path };
        else if (F.type === "md-request") {
          const Pe = n().getPath(F.index, F.path);
          J.source.postMessage(
            {
              source: "maw-builder",
              type: "md-value",
              req: F.req,
              value: typeof Pe == "string" ? Pe : ""
            },
            location.origin
          );
        } else F.type === "inline-start" ? (n().inlineEditing = !0, n().selected = F.index) : F.type === "inline-end" && (n().inlineEditing = !1);
    };
    return window.addEventListener("message", H), z(0), () => {
      window.removeEventListener("message", H), clearTimeout(E);
    };
  });
  const U = /* @__PURE__ */ fe(() => s(j) || n().inlineEditing ? null : s(p).find((H) => H.index === n().selected)), Z = /* @__PURE__ */ fe(() => s(U) ? Math.min(s(U).top + s(U).height, s(L) - 24) : 0), te = /* @__PURE__ */ fe(() => s(h) !== n().selected ? s(p).find((H) => H.index === s(h)) : null);
  function K(H) {
    const J = s(_).getBoundingClientRect(), ie = H - J.top;
    if (!s(p).length) return n().blocks.length;
    let F = n().blocks.length, Ne = 1 / 0;
    const Pe = [...s(p)].sort(($e, Yt) => $e.top - Yt.top);
    return Pe.forEach(($e, Yt) => {
      var _n;
      const vt = Math.abs(ie - $e.top);
      vt < Ne && (Ne = vt, F = $e.index);
      const An = Math.abs(ie - ($e.top + $e.height));
      An < Ne && (Ne = An, F = ((_n = Pe[Yt + 1]) == null ? void 0 : _n.index) ?? $e.index + 1);
    }), F;
  }
  function ue(H) {
    const J = s(p).find((F) => F.index === H);
    if (J) return J.top;
    const ie = s(p).reduce((F, Ne) => Ne.index > ((F == null ? void 0 : F.index) ?? -1) ? Ne : F, null);
    return ie ? ie.top + ie.height : 0;
  }
  const pe = /* @__PURE__ */ fe(() => !!n().dragType);
  function $(H) {
    H.preventDefault(), H.dataTransfer.dropEffect = "copy", b(f, K(H.clientY), !0);
  }
  function ke(H) {
    H.preventDefault();
    const J = n().dragType || H.dataTransfer.getData("application/x-maw-block") || H.dataTransfer.getData("text/plain"), ie = s(f) >= 0 ? s(f) : K(H.clientY);
    n().dragType = "", b(f, -1), J && n().defFor(J) && n().insert(J, ie);
  }
  Pt(() => {
    n().dragType || b(f, -1);
  });
  const W = (H) => {
    var ie, F;
    const J = n().blocks[H];
    return (J == null ? void 0 : J.type) === "global" ? "Global · " + n().sectionTitle((ie = J.global) == null ? void 0 : ie.section) : ((F = n().defFor(J == null ? void 0 : J.type)) == null ? void 0 : F.title) || (J == null ? void 0 : J.type) || "";
  };
  var Q = { refresh: S }, le = Uu(), ve = Ee(le), oe = m(ve);
  let _e, he;
  var ge = m(oe), Te = m(ge);
  Re(Te, 19, () => i, (H) => H.key, (H, J, ie) => {
    var F = zu();
    let Ne;
    Tn(F, (Pe, $e) => l[$e] = Pe, (Pe) => l == null ? void 0 : l[Pe], () => [s(ie)]), O(() => {
      de(F, "src", s(J).src), Ne = be(F, 1, "svelte-dfb6jk", null, Ne, { hidden: s(ie) !== s(a) });
    }), x(H, F);
  });
  var Xe = g(Te, 2), ce = m(Xe);
  {
    var ye = (H) => {
      var J = Nu();
      let ie;
      var F = m(J), Ne = Y(F, !0);
      O(
        (Pe) => {
          ie = Ct(J, "", ie, {
            top: `${s(te).top ?? ""}px`,
            height: `${s(te).height ?? ""}px`
          }), q(Ne, Pe);
        },
        [() => W(s(te).index)]
      ), x(H, J);
    };
    G(ce, (H) => {
      s(te) && !s(pe) && H(ye);
    });
  }
  var xe = g(ce, 2);
  {
    var me = (H) => {
      var J = Ru(), ie = Ee(J);
      let F;
      var Ne = m(ie), Pe = Y(Ne, !0), $e = g(Ne, 2), Yt = m($e);
      B(Yt, { name: "up", size: 14 });
      var vt = g($e, 2), An = m(vt);
      B(An, { name: "down", size: 14 });
      var _n = g(vt, 2), Cn = m(_n);
      B(Cn, { name: "copy", size: 14 });
      var Ar = g(_n, 2), ti = m(Ar);
      B(ti, { name: "trash", size: 14 });
      var er = g(ie, 2);
      {
        var As = (Pn) => {
          var mn = Ou();
          let Cs;
          var ni = m(mn);
          B(ni, { name: "plus", size: 16 }), O(() => Cs = Ct(mn, "", Cs, { top: `${s(Z) ?? ""}px` })), N("click", mn, () => b(A, { index: n().selected + 1, top: s(Z) + 18 }, !0)), x(Pn, mn);
        };
        G(er, (Pn) => {
          s(A) || Pn(As);
        });
      }
      O(
        (Pn, mn) => {
          F = Ct(ie, "", F, { top: Pn }), q(Pe, mn), $e.disabled = n().selected === 0, vt.disabled = n().selected === n().blocks.length - 1;
        },
        [
          () => `${Math.max(6, s(U).top + 6)}px`,
          () => W(n().selected)
        ]
      ), N("click", $e, () => n().move(n().selected, n().selected - 1)), N("click", vt, () => n().move(n().selected, n().selected + 1)), N("click", _n, () => n().duplicate(n().selected)), N("click", Ar, () => n().remove(n().selected)), x(H, J);
    };
    G(xe, (H) => {
      s(U) && !s(pe) && H(me);
    });
  }
  var Le = g(xe, 2);
  {
    var Ze = (H) => {
      var J = Du(), ie = Ee(J);
      let F;
      var Ne = g(ie, 2);
      {
        let Pe = /* @__PURE__ */ fe(() => Math.min(s(A).top, s(L) - 380));
        Tu(Ne, {
          get store() {
            return n();
          },
          get index() {
            return s(A).index;
          },
          get top() {
            return s(Pe);
          },
          onclose: () => b(A, null)
        });
      }
      O(() => F = Ct(ie, "", F, { top: `${s(A).top - 18}px` })), x(H, J);
    };
    G(Le, (H) => {
      s(A) && H(Ze);
    });
  }
  var ze = g(Le, 2);
  {
    var Oe = (H) => {
      var J = Lu();
      let ie;
      O((F) => ie = Ct(J, "", ie, { top: F }), [() => `${ue(n().pendingInsert.index) ?? ""}px`]), x(H, J);
    };
    G(ze, (H) => {
      n().pendingInsert && s(j) && H(Oe);
    });
  }
  var Ae = g(ze, 2);
  {
    var Ie = (H) => {
      var J = ju(), ie = Ee(J), F = g(ie, 2);
      {
        var Ne = (Pe) => {
          var $e = Iu();
          let Yt;
          O((vt) => Yt = Ct($e, "", Yt, { top: vt }), [() => `${ue(s(f)) ?? ""}px`]), x(Pe, $e);
        };
        G(F, (Pe) => {
          s(f) >= 0 && Pe(Ne);
        });
      }
      Be("dragover", ie, $), Be("drop", ie, ke), Be("dragleave", ie, () => b(f, -1)), x(H, J);
    };
    G(Ae, (H) => {
      s(pe) && H(Ie);
    });
  }
  var qe = g(Xe, 2);
  {
    var Ce = (H) => {
      var J = Fu(), ie = m(J);
      B(ie, { name: "sparkles", size: 28 }), x(H, J);
    };
    G(qe, (H) => {
      !n().blocks.length && !s(o) && H(Ce);
    });
  }
  var Se = g(qe, 2);
  {
    var He = (H) => {
      var J = qu(), ie = Y(J);
      O(() => q(ie, `Preview failed: ${s(u) ?? ""}`)), x(H, J);
    };
    G(Se, (H) => {
      s(u) && H(He);
    });
  }
  Tn(ge, (H) => b(_, H), () => s(_));
  var it = g(ve, 2);
  let Qe;
  var bn = g(m(it), 2), sn = Y(bn, !0);
  return O(() => {
    _e = be(oe, 1, "device svelte-dfb6jk", null, _e, { framed: !!r() }), he = Ct(oe, "", he, { width: r() ? r() + "px" : "100%" }), Qe = be(it, 1, "busy svelte-dfb6jk", null, Qe, { on: s(R) }), q(sn, s(y));
  }), Vc(ge, "clientHeight", (H) => b(L, H)), x(t, le), st(Q);
}
ot(["click"]);
var Gu = /* @__PURE__ */ C('<div class="inner svelte-hzx6i5"></div>'), Bu = /* @__PURE__ */ C('<div role="listitem"><div class="bar svelte-hzx6i5"><span class="grip svelte-hzx6i5" draggable="true" role="button" tabindex="-1" aria-label="Drag to reorder"><!></span> <button type="button" class="title svelte-hzx6i5"><span><!></span> <span class="t svelte-hzx6i5"> </span></button> <button type="button" class="mb-btn ghost icon sm" title="Duplicate"><!></button> <button type="button" class="mb-btn ghost icon sm danger" title="Remove"><!></button></div> <!></div>'), Vu = /* @__PURE__ */ C('<div class="list svelte-hzx6i5"><div class="head svelte-hzx6i5"><span class="mb-label"> <span class="count svelte-hzx6i5"> </span></span></div> <!> <button type="button" class="mb-btn add svelte-hzx6i5"><!> </button></div>');
function Ku(t, e) {
  rt(e, !0);
  let n = Fe(e, "target", 7);
  const r = /* @__PURE__ */ fe(() => Array.isArray(n()[e.field.name]) ? n()[e.field.name] : []);
  let i = /* @__PURE__ */ D(-1), a = /* @__PURE__ */ D(-1), l = /* @__PURE__ */ D(-1);
  function o() {
    return Array.isArray(n()[e.field.name]) || (n()[e.field.name] = []), n()[e.field.name];
  }
  function u() {
    const y = String(e.field.label || "item").replace(/s$/i, "").toLowerCase();
    e.store.mutate(() => o().push(Nl(e.field, y)), "Adding item…"), b(i, s(r).length - 1);
  }
  function p(y) {
    e.store.mutate(() => o().splice(y, 1)), s(i) === y && b(i, -1);
  }
  function h(y) {
    e.store.mutate(() => o().splice(y + 1, 0, JSON.parse(JSON.stringify(On(s(r)[y]))))), b(i, y + 1);
  }
  function M(y, d) {
    d < 0 || d >= s(r).length || y === d || (e.store.mutate(() => {
      const k = o(), [S] = k.splice(y, 1);
      k.splice(d, 0, S);
    }), b(i, d, !0));
  }
  var f = Vu(), _ = m(f), E = m(_), w = m(E), v = g(w), A = Y(v, !0), L = g(_, 2);
  Re(L, 17, () => s(r), bt, (y, d, k) => {
    var S = Bu();
    let z;
    var X = m(S), re = m(X), U = m(re);
    B(U, { name: "grip", size: 13 });
    var Z = g(re, 2), te = m(Z);
    let K;
    var ue = m(te);
    B(ue, { name: "chevron", size: 12 });
    var pe = g(te, 2), $ = Y(pe, !0), ke = g(Z, 2), W = m(ke);
    B(W, { name: "copy", size: 12 });
    var Q = g(ke, 2), le = m(Q);
    B(le, { name: "trash", size: 12 });
    var ve = g(X, 2);
    {
      var oe = (_e) => {
        var he = Gu();
        Re(he, 21, () => e.field.fields || [], (ge) => ge.name, (ge, Te) => {
          Js(ge, {
            get field() {
              return s(Te);
            },
            get target() {
              return s(d);
            },
            get store() {
              return e.store;
            },
            compact: !0
          });
        }), x(_e, he);
      };
      G(ve, (_e) => {
        s(i) === k && _e(oe);
      });
    }
    O(
      (_e) => {
        z = be(S, 1, "item svelte-hzx6i5", null, z, { open: s(i) === k, over: s(l) === k }), K = be(te, 1, "chev svelte-hzx6i5", null, K, { rot: s(i) === k }), q($, _e);
      },
      [() => Yc(s(d), e.field.fields, k)]
    ), Be("dragover", S, (_e) => {
      s(a) >= 0 && (_e.preventDefault(), b(l, k, !0));
    }), Be("drop", S, () => {
      M(s(a), k), b(a, b(l, -1), !0);
    }), Be("dragstart", re, (_e) => {
      b(a, k, !0), _e.dataTransfer.effectAllowed = "move";
    }), Be("dragend", re, () => b(a, b(l, -1), !0)), N("click", Z, () => b(i, s(i) === k ? -1 : k, !0)), N("click", ke, () => h(k)), N("click", Q, () => p(k)), x(y, S);
  });
  var P = g(L, 2), j = m(P);
  B(j, { name: "plus", size: 13 });
  var R = g(j);
  O(() => {
    q(w, `${(e.field.label || e.field.name) ?? ""} `), q(A, s(r).length), q(R, ` ${(e.field.btnLabel || "Add item") ?? ""}`);
  }), N("click", P, u), x(t, f), st();
}
ot(["click"]);
var Ju = /* @__PURE__ */ C('<footer class="svelte-1kwbck4"><!></footer>'), Yu = /* @__PURE__ */ C('<div class="backdrop svelte-1kwbck4" role="presentation"><div role="dialog" aria-modal="true"><header class="svelte-1kwbck4"><h2 class="svelte-1kwbck4"> </h2> <button type="button" class="mb-btn ghost icon sm" aria-label="Close"><!></button></header> <div class="content mb-scroll svelte-1kwbck4"><!></div> <!></div></div>');
function Ni(t, e) {
  rt(e, !0);
  let n = Fe(e, "title", 3, ""), r = Fe(e, "wide", 3, !1);
  var i = Yu(), a = m(i);
  let l;
  var o = m(a), u = m(o), p = Y(u, !0), h = g(u, 2), M = m(h);
  B(M, { name: "x", size: 14 });
  var f = g(o, 2), _ = m(f);
  ya(_, () => e.children ?? Fa);
  var E = g(f, 2);
  {
    var w = (v) => {
      var A = Ju(), L = m(A);
      ya(L, () => e.actions), x(v, A);
    };
    G(E, (v) => {
      e.actions && v(w);
    });
  }
  O(() => {
    l = be(a, 1, "dialog svelte-1kwbck4", null, l, { wide: r() }), de(a, "aria-label", n()), q(p, n());
  }), N("click", i, (v) => {
    var A;
    return v.target === v.currentTarget && ((A = e.onclose) == null ? void 0 : A.call(e));
  }), N("click", h, () => {
    var v;
    return (v = e.onclose) == null ? void 0 : v.call(e);
  }), x(t, i), st();
}
ot(["click"]);
var Wu = /* @__PURE__ */ C('<button type="button"> </button>'), Xu = /* @__PURE__ */ C('<input class="mb-input search svelte-hd7o5x" placeholder="Filter by name"/> <input type="file" accept="image/*" multiple="" hidden=""/> <button type="button" class="mb-btn primary"><!> </button>', 1), Zu = /* @__PURE__ */ C('<p class="error svelte-hd7o5x"> </p>'), Qu = /* @__PURE__ */ C('<img class="url-preview svelte-hd7o5x" alt=""/>'), $u = /* @__PURE__ */ C('<div class="url svelte-hd7o5x"><label class="mb-label" for="mb-media-url">Image URL</label> <input id="mb-media-url" class="mb-input" placeholder="https://…"/> <!> <button type="button" class="mb-btn primary">Use this URL</button></div>'), ed = /* @__PURE__ */ C('<span>/</span> <button type="button" class="link svelte-hd7o5x"> </button>', 1), td = /* @__PURE__ */ C('<div class="crumbs svelte-hd7o5x"><button type="button" class="link svelte-hd7o5x">user/media</button> <!></div>'), nd = /* @__PURE__ */ C('<button type="button" class="tile folder svelte-hd7o5x"><!><span class="svelte-hd7o5x"> </span></button>'), rd = /* @__PURE__ */ C('<button type="button"><img alt="" loading="lazy" class="svelte-hd7o5x"/> <span class="svelte-hd7o5x"> </span></button>'), sd = /* @__PURE__ */ C('<div class="empty svelte-hd7o5x"><!> <strong class="svelte-hd7o5x"> </strong> <span>Drop image files here, or click Upload.</span></div>'), id = /* @__PURE__ */ C('<p class="muted svelte-hd7o5x">Loading…</p>'), ad = /* @__PURE__ */ C('<!> <div class="grid mb-scroll svelte-hd7o5x"><!> <!></div> <!>', 1), ld = /* @__PURE__ */ C('<div role="presentation"><div class="bar svelte-hd7o5x"><div class="seg svelte-hd7o5x"><!> <button type="button">Site library</button> <button type="button">From URL</button></div> <!></div> <!> <!></div>');
function Rl(t, e) {
  rt(e, !0);
  let n = Fe(e, "current", 3, ""), r = /* @__PURE__ */ D(Ye(e.store.isSection || n() && String(n()).startsWith("user://media") ? "site" : "page")), i = /* @__PURE__ */ D(Ye([])), a = /* @__PURE__ */ D(Ye([])), l = /* @__PURE__ */ D(Ye([])), o = /* @__PURE__ */ D(""), u = /* @__PURE__ */ D(!1), p = /* @__PURE__ */ D(!1), h = /* @__PURE__ */ D(""), M = /* @__PURE__ */ D(Ye(/^https?:\/\//.test(n()) ? n() : "")), f = /* @__PURE__ */ D(""), _ = /* @__PURE__ */ D(!1), E = /* @__PURE__ */ D(void 0);
  const w = (k) => String(k.type || k.mime || "").startsWith("image/") || /\.(jpe?g|png|gif|webp|avif|svg)$/i.test(k.filename || "");
  async function v() {
    b(u, !0), b(h, "");
    try {
      b(i, (await e.store.loadOwnMedia()).filter(w), !0);
    } catch (k) {
      b(h, k.message, !0);
    }
    b(u, !1);
  }
  async function A() {
    b(u, !0), b(h, "");
    try {
      const k = await at.siteMedia(s(o)), S = Array.isArray(k) ? k : (k == null ? void 0 : k.files) || (k == null ? void 0 : k.items) || [];
      b(a, S.filter(w), !0), b(l, (k == null ? void 0 : k.folders) || [], !0);
    } catch (k) {
      b(h, k.message, !0);
    }
    b(u, !1);
  }
  Tr(() => {
    s(r) === "site" ? A() : v();
  });
  function L(k) {
    b(r, k, !0), k === "page" && !s(i).length && v(), k === "site" && A();
  }
  async function P(k) {
    if (k != null && k.length) {
      b(p, !0), b(h, "");
      try {
        s(r) === "site" ? (await at.uploadSiteMedia(k, s(o)), await A()) : (await at.uploadOwnMedia(e.store.context, k), await v()), e.store.flash(`${k.length} file${k.length > 1 ? "s" : ""} uploaded`);
      } catch (S) {
        b(h, S.message, !0);
      }
      b(p, !1);
    }
  }
  function j(k) {
    return "user://media/" + (k.path ? k.path.replace(/^\/|\/$/g, "") + "/" : s(o) ? s(o) + "/" : "") + k.filename;
  }
  const R = /* @__PURE__ */ fe(() => {
    const k = s(r) === "site" ? s(a) : s(i), S = s(f).trim().toLowerCase();
    return S ? k.filter((z) => z.filename.toLowerCase().includes(S)) : k;
  });
  function y(k) {
    return typeof k == "string" ? k : k.name || k.path;
  }
  function d(k) {
    const S = typeof k == "string" ? k : k.path || k.name;
    b(o, S.includes("/") || !s(o) ? S : s(o) + "/" + S, !0), A();
  }
  Ni(t, {
    title: "Media library",
    wide: !0,
    get onclose() {
      return e.onclose;
    },
    children: (k, S) => {
      var z = ld();
      let X;
      var re = m(z), U = m(re), Z = m(U);
      {
        var te = (he) => {
          var ge = Wu();
          let Te;
          var Xe = Y(ge, !0);
          O(() => {
            Te = be(ge, 1, "svelte-hd7o5x", null, Te, { active: s(r) === "page" }), q(Xe, e.store.isFlex ? "This item" : "This page");
          }), N("click", ge, () => L("page")), x(he, ge);
        };
        G(Z, (he) => {
          e.store.isSection || he(te);
        });
      }
      var K = g(Z, 2);
      let ue;
      var pe = g(K, 2);
      let $;
      var ke = g(U, 2);
      {
        var W = (he) => {
          var ge = Xu(), Te = Ee(ge), Xe = g(Te, 2);
          Tn(Xe, (me) => b(E, me), () => s(E));
          var ce = g(Xe, 2), ye = m(ce);
          B(ye, { name: "upload", size: 14 });
          var xe = g(ye);
          O(() => {
            ce.disabled = s(p), q(xe, ` ${s(p) ? "Uploading…" : "Upload"}`);
          }), pn(Te, () => s(f), (me) => b(f, me)), N("change", Xe, (me) => P(me.currentTarget.files)), N("click", ce, () => s(E).click()), x(he, ge);
        };
        G(ke, (he) => {
          s(r) !== "url" && he(W);
        });
      }
      var Q = g(re, 2);
      {
        var le = (he) => {
          var ge = Zu(), Te = Y(ge, !0);
          O(() => q(Te, s(h))), x(he, ge);
        };
        G(Q, (he) => {
          s(h) && he(le);
        });
      }
      var ve = g(Q, 2);
      {
        var oe = (he) => {
          var ge = $u(), Te = g(m(ge), 2), Xe = g(Te, 2);
          {
            var ce = (me) => {
              var Le = Qu();
              O(() => de(Le, "src", s(M))), x(me, Le);
            }, ye = /* @__PURE__ */ fe(() => /^https?:\/\//.test(s(M)));
            G(Xe, (me) => {
              s(ye) && me(ce);
            });
          }
          var xe = g(Xe, 2);
          O((me) => xe.disabled = me, [() => !/^https?:\/\//.test(s(M))]), pn(Te, () => s(M), (me) => b(M, me)), N("click", xe, () => e.onselect(s(M))), x(he, ge);
        }, _e = (he) => {
          var ge = ad(), Te = Ee(ge);
          {
            var Xe = (ze) => {
              var Oe = td(), Ae = m(Oe), Ie = g(Ae, 2);
              Re(Ie, 17, () => s(o).split("/").filter(Boolean), bt, (qe, Ce, Se) => {
                var He = ed(), it = g(Ee(He), 2), Qe = Y(it, !0);
                O(() => q(Qe, s(Ce))), N("click", it, () => {
                  b(o, s(o).split("/").slice(0, Se + 1).join("/"), !0), A();
                }), x(qe, He);
              }), N("click", Ae, () => {
                b(o, ""), A();
              }), x(ze, Oe);
            };
            G(Te, (ze) => {
              s(r) === "site" && ze(Xe);
            });
          }
          var ce = g(Te, 2), ye = m(ce);
          {
            var xe = (ze) => {
              var Oe = Jt(), Ae = Ee(Oe);
              Re(Ae, 17, () => s(l), bt, (Ie, qe) => {
                var Ce = nd(), Se = m(Ce);
                B(Se, { name: "layers", size: 22 });
                var He = g(Se), it = Y(He, !0);
                O((Qe) => q(it, Qe), [() => y(s(qe))]), N("click", Ce, () => d(s(qe))), x(Ie, Ce);
              }), x(ze, Oe);
            };
            G(ye, (ze) => {
              s(r) === "site" && ze(xe);
            });
          }
          var me = g(ye, 2);
          Re(
            me,
            17,
            () => s(R),
            (ze) => ze.filename + (ze.path || ""),
            (ze, Oe) => {
              const Ae = /* @__PURE__ */ fe(() => s(r) === "site" ? j(s(Oe)) : s(Oe).filename);
              var Ie = rd();
              let qe;
              var Ce = m(Ie), Se = g(Ce, 2), He = Y(Se, !0);
              O(() => {
                qe = be(Ie, 1, "tile svelte-hd7o5x", null, qe, { active: s(Ae) === n() }), de(Ie, "title", s(Oe).filename), de(Ce, "src", s(Oe).url), q(He, s(Oe).filename);
              }), N("click", Ie, () => e.onselect(s(Ae))), x(ze, Ie);
            },
            (ze) => {
              var Oe = Jt(), Ae = Ee(Oe);
              {
                var Ie = (qe) => {
                  var Ce = sd(), Se = m(Ce);
                  B(Se, { name: "upload", size: 26 });
                  var He = g(Se, 2), it = Y(He);
                  O(() => q(it, `No images ${s(r) === "page" ? e.store.isFlex ? "on this item" : "on this page" : "here"} yet`)), x(qe, Ce);
                };
                G(Ae, (qe) => {
                  s(u) || qe(Ie);
                });
              }
              x(ze, Oe);
            }
          );
          var Le = g(ce, 2);
          {
            var Ze = (ze) => {
              var Oe = id();
              x(ze, Oe);
            };
            G(Le, (ze) => {
              s(u) && ze(Ze);
            });
          }
          x(he, ge);
        };
        G(ve, (he) => {
          s(r) === "url" ? he(oe) : he(_e, -1);
        });
      }
      O(() => {
        X = be(z, 1, "lib svelte-hd7o5x", null, X, { drag: s(_) }), ue = be(K, 1, "svelte-hd7o5x", null, ue, { active: s(r) === "site" }), $ = be(pe, 1, "svelte-hd7o5x", null, $, { active: s(r) === "url" });
      }), Be("dragover", z, (he) => {
        var ge, Te;
        (Te = (ge = he.dataTransfer) == null ? void 0 : ge.types) != null && Te.includes("Files") && (he.preventDefault(), b(_, !0));
      }), Be("dragleave", z, () => b(_, !1)), Be("drop", z, (he) => {
        he.preventDefault(), b(_, !1), P(he.dataTransfer.files);
      }), N("click", K, () => L("site")), N("click", pe, () => b(r, "url")), x(k, z);
    },
    $$slots: { default: !0 }
  }), st();
}
ot(["click", "change"]);
var od = /* @__PURE__ */ C('<img alt="" class="svelte-x4wd27"/>'), cd = /* @__PURE__ */ C('<button type="button" class="mb-btn sm ghost danger">Remove</button>'), ud = /* @__PURE__ */ C('<div class="media svelte-x4wd27"><button type="button" class="thumb svelte-x4wd27" title="Choose image"><!></button> <div class="side svelte-x4wd27"><div class="name svelte-x4wd27"> </div> <div class="btns svelte-x4wd27"><button type="button" class="mb-btn sm"><!> </button> <!></div></div></div> <!>', 1);
function dd(t, e) {
  rt(e, !0);
  let n = Fe(e, "value", 3, ""), r = /* @__PURE__ */ D(!1), i = /* @__PURE__ */ D(!1);
  const a = /* @__PURE__ */ fe(() => {
    var k;
    const d = String(n() || "");
    return d ? /^(https?:)?\/\//.test(d) || d.startsWith("/") ? d : d.startsWith("user://") ? "/" + d.replace("user://", "user/") : d.startsWith("theme://") ? `/user/themes/${((k = e.store.catalog) == null ? void 0 : k.theme) || ""}/${d.replace("theme://", "")}` : e.store.pageMediaUrl(d) : "";
  });
  Pt(() => {
    s(a), b(i, !1);
  });
  var l = ud(), o = Ee(l), u = m(o), p = m(u);
  {
    var h = (d) => {
      var k = od();
      O(() => de(k, "src", s(a))), Be("error", k, () => b(i, !0)), x(d, k);
    }, M = (d) => {
      B(d, { name: "image", size: 22 });
    };
    G(p, (d) => {
      s(a) && !s(i) ? d(h) : d(M, -1);
    });
  }
  var f = g(u, 2), _ = m(f), E = Y(_, !0), w = g(_, 2), v = m(w), A = m(v);
  B(A, { name: "image", size: 13 });
  var L = g(A), P = g(v, 2);
  {
    var j = (d) => {
      var k = cd();
      N("click", k, () => e.onchange("")), x(d, k);
    };
    G(P, (d) => {
      n() && d(j);
    });
  }
  var R = g(o, 2);
  {
    var y = (d) => {
      Rl(d, {
        get store() {
          return e.store;
        },
        get current() {
          return n();
        },
        onselect: (k) => {
          e.onchange(k), b(r, !1);
        },
        onclose: () => b(r, !1)
      });
    };
    G(R, (d) => {
      s(r) && d(y);
    });
  }
  O(() => {
    de(_, "title", n()), q(E, n() || "No image"), q(L, ` ${n() ? "Replace" : "Choose"}`);
  }), N("click", u, () => b(r, !0)), N("click", v, () => b(r, !0)), x(t, l), st();
}
ot(["click"]);
var fd = /* @__PURE__ */ C("<i></i>"), vd = /* @__PURE__ */ C('<button type="button" class="mb-btn ghost icon sm" title="Clear"><!></button>'), hd = /* @__PURE__ */ C('<button type="button"><i></i></button>'), pd = /* @__PURE__ */ C('<div class="pop svelte-168bgjg"><input class="mb-input" placeholder="Search icons"/> <div class="grid mb-scroll svelte-168bgjg"></div></div>'), gd = /* @__PURE__ */ C('<div class="icon-control"><div class="row svelte-168bgjg"><button type="button" class="current svelte-168bgjg" title="Choose icon"><!></button> <input class="mb-input" placeholder="fa-bolt"/> <!></div> <!></div>');
function bd(t, e) {
  rt(e, !0);
  let n = Fe(e, "value", 3, ""), r = /* @__PURE__ */ D(!1), i = /* @__PURE__ */ D(""), a = /* @__PURE__ */ D(void 0);
  const l = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css", o = "bolt rocket star heart check circle-check shield-halved lock key user users user-tie handshake briefcase building chart-line chart-simple chart-pie bullseye trophy medal award gem crown lightbulb brain robot microchip code terminal laptop mobile-screen desktop server cloud database wifi globe earth-americas map-location-dot location-dot compass envelope phone comments comment-dots headset bell calendar clock hourglass stopwatch cart-shopping bag-shopping credit-card money-bill wallet tags tag receipt truck box gift percent palette paintbrush pen-nib wand-magic-sparkles image images camera video film music microphone book book-open graduation-cap school newspaper file file-lines folder clipboard-list list-check gear gears wrench screwdriver-wrench hammer toolbox sliders filter magnifying-glass leaf seedling tree mountain sun moon cloud-sun water fire snowflake recycle house hotel utensils mug-hot pizza-slice burger wine-glass dumbbell heart-pulse stethoscope hospital paw plane car bicycle ship anchor route road thumbs-up face-smile hand-holding-heart people-group universal-access infinity arrows-rotate arrow-right link share-nodes".split(" ").map((y) => "fa-" + y), u = "github facebook instagram x-twitter linkedin youtube tiktok whatsapp pinterest discord slack wordpress google apple".split(" ").map((y) => "fa-brands fa-" + y), p = /* @__PURE__ */ fe(() => {
    const y = s(i).trim().toLowerCase().replace(/^fa-/, "");
    return [...o, ...u].filter((d) => !y || d.includes(y));
  }), h = (y) => {
    const d = String(y || "").trim();
    return d ? /\bfa-(brands|solid|regular)\b|\bfa[brs]\b/.test(d) ? d : "fa-solid " + (d.startsWith("fa-") ? d : "fa-" + d) : "";
  };
  Tr(() => {
    if (!document.head.querySelector("link[data-maw-fa]")) {
      const d = document.createElement("link");
      d.rel = "stylesheet", d.href = l, d.dataset.mawFa = "1", document.head.appendChild(d);
    }
    const y = s(a).getRootNode();
    if (y instanceof ShadowRoot && !y.querySelector("link[data-fa]")) {
      const d = document.createElement("link");
      d.rel = "stylesheet", d.href = l, d.dataset.fa = "1", y.prepend(d);
    }
  });
  var M = gd(), f = m(M), _ = m(f), E = m(_);
  {
    var w = (y) => {
      var d = fd();
      O((k) => be(d, 1, k, "svelte-168bgjg"), [() => ka(h(n()))]), x(y, d);
    }, v = (y) => {
      B(y, { name: "plus", size: 14 });
    };
    G(E, (y) => {
      n() ? y(w) : y(v, -1);
    });
  }
  var A = g(_, 2), L = g(A, 2);
  {
    var P = (y) => {
      var d = vd(), k = m(d);
      B(k, { name: "x", size: 12 }), N("click", d, () => e.onchange("")), x(y, d);
    };
    G(L, (y) => {
      n() && y(P);
    });
  }
  var j = g(f, 2);
  {
    var R = (y) => {
      var d = pd(), k = m(d), S = g(k, 2);
      Re(S, 20, () => s(p), (z) => z, (z, X) => {
        var re = hd();
        let U;
        var Z = Y(re);
        O(
          (te, K) => {
            de(re, "title", te), U = be(re, 1, "svelte-168bgjg", null, U, { active: n() === X }), be(Z, 1, K, "svelte-168bgjg");
          },
          [
            () => X.replace("fa-brands ", ""),
            () => ka(h(X))
          ]
        ), N("click", re, () => {
          e.onchange(X), b(r, !1);
        }), x(z, re);
      }), pn(k, () => s(i), (z) => b(i, z)), x(y, d);
    };
    G(j, (y) => {
      s(r) && y(R);
    });
  }
  Tn(M, (y) => b(a, y), () => s(a)), O(() => {
    de(_, "aria-expanded", s(r)), In(A, n());
  }), N("click", _, () => b(r, !s(r))), N("input", A, (y) => e.onchange(y.currentTarget.value)), x(t, M), st();
}
ot(["click", "input"]);
var _d = /* @__PURE__ */ C('<div class="tools svelte-gx0hvo"><button type="button" title="Bold" class="svelte-gx0hvo"><!></button> <button type="button" title="Italic" class="svelte-gx0hvo"><!></button> <button type="button" title="Link" class="svelte-gx0hvo"><!></button> <button type="button" title="Bulleted list" class="svelte-gx0hvo"><!></button> <span class="hint svelte-gx0hvo">Markdown</span></div>'), md = /* @__PURE__ */ C('<div><!> <textarea class="mb-input svelte-gx0hvo"></textarea></div>');
function Ca(t, e) {
  rt(e, !0);
  let n = Fe(e, "value", 3, ""), r = Fe(e, "rows", 3, 4), i = Fe(e, "plain", 3, !1), a = /* @__PURE__ */ D(void 0);
  function l(_, E = _, w = "text") {
    const v = s(a).selectionStart, A = s(a).selectionEnd, L = n().slice(v, A) || w, P = n().slice(0, v) + _ + L + E + n().slice(A);
    e.onchange(P), requestAnimationFrame(() => {
      s(a).focus(), s(a).setSelectionRange(v + _.length, v + _.length + L.length);
    });
  }
  function o() {
    const _ = n().lastIndexOf(`
`, s(a).selectionStart - 1) + 1, E = n().slice(0, _) + "- " + n().slice(_);
    e.onchange(E);
  }
  var u = md();
  let p;
  var h = m(u);
  {
    var M = (_) => {
      var E = _d(), w = m(E), v = m(w);
      B(v, { name: "bold", size: 13 });
      var A = g(w, 2), L = m(A);
      B(L, { name: "italic", size: 13 });
      var P = g(A, 2), j = m(P);
      B(j, { name: "link", size: 13 });
      var R = g(P, 2), y = m(R);
      B(y, { name: "list", size: 13 }), N("click", w, () => l("**")), N("click", A, () => l("_")), N("click", P, () => l("[", "](https://)", "link text")), N("click", R, o), x(_, E);
    };
    G(h, (_) => {
      i() || _(M);
    });
  }
  var f = g(h, 2);
  Tn(f, (_) => b(a, _), () => s(a)), O(() => {
    p = be(u, 1, "md svelte-gx0hvo", null, p, { plain: i() }), de(f, "id", e.id), de(f, "rows", r()), In(f, n());
  }), N("input", f, (_) => e.onchange(_.currentTarget.value)), x(t, u), st();
}
ot(["click", "input"]);
var yd = /* @__PURE__ */ C('<label class="toggle svelte-2ufken"><input type="checkbox" class="svelte-2ufken"/> <span class="track svelte-2ufken"><span class="thumb svelte-2ufken"></span></span> <span class="tl"> </span></label>'), kd = /* @__PURE__ */ C('<button type="button" role="radio"> </button>'), wd = /* @__PURE__ */ C('<div class="seg svelte-2ufken" role="radiogroup"></div>'), xd = /* @__PURE__ */ C("<option> </option>"), Sd = /* @__PURE__ */ C('<select class="mb-input"></select>'), Ed = /* @__PURE__ */ C('<input class="mb-input" type="number"/>'), Md = /* @__PURE__ */ C('<div class="color svelte-2ufken"><input type="color" class="svelte-2ufken"/><input class="mb-input"/></div>'), Td = /* @__PURE__ */ C('<input class="mb-input" type="text"/>'), Ad = /* @__PURE__ */ C('<textarea class="mb-input mono svelte-2ufken" rows="4"></textarea> <div class="mb-help"> </div>', 1), Cd = /* @__PURE__ */ C('<label class="mb-label"> </label> <!>', 1), Pd = /* @__PURE__ */ C('<div class="mb-help"> </div>'), zd = /* @__PURE__ */ C("<div><!> <!></div>");
function Js(t, e) {
  rt(e, !0);
  let n = Fe(e, "target", 7), r = Fe(e, "compact", 3, !1);
  const i = "mb-" + Math.random().toString(36).slice(2, 9), a = /* @__PURE__ */ fe(() => e.field.label || e.field.title || e.field.name), l = /* @__PURE__ */ fe(() => e.field.type || "text"), o = /* @__PURE__ */ fe(() => s(l) === "toggle" || e.field.validate === "bool"), u = /* @__PURE__ */ fe(() => s(l) === "number" || e.field.validate === "int"), p = /* @__PURE__ */ fe(() => n()[e.field.name] ?? Qi(e.field) ?? (s(o) ? !1 : ""));
  function h(R) {
    e.store.beginEdit(), R === "" || R === null || R === void 0 ? delete n()[e.field.name] : n()[e.field.name] = R, e.store.endEdit();
  }
  function M(R) {
    if (R === "") return h(void 0);
    const y = Number(R);
    h(Number.isFinite(y) ? y : R);
  }
  let f = /* @__PURE__ */ D("");
  Pt(() => {
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
    ].includes(s(l)) || b(f, JSON.stringify(n()[e.field.name] ?? null, null, 2), !0);
  });
  var _ = zd();
  let E;
  var w = m(_);
  {
    var v = (R) => {
      Ku(R, {
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
    }, A = (R) => {
      var y = yd(), d = m(y), k = g(d, 4), S = Y(k, !0);
      O(() => {
        Hc(d, s(p) === !0 || s(p) === 1 || s(p) === "1"), q(S, s(a));
      }), N("change", d, (z) => h(!!z.currentTarget.checked)), x(R, y);
    }, L = (R) => {
      var y = Cd(), d = Ee(y), k = Y(d, !0), S = g(d, 2);
      {
        var z = (W) => {
          var Q = wd();
          Re(Q, 21, () => e.field.options, bt, (le, ve) => {
            var oe = kd();
            let _e;
            var he = Y(oe, !0);
            O(
              (ge, Te) => {
                de(oe, "aria-checked", ge), _e = be(oe, 1, "svelte-2ufken", null, _e, { active: Te }), q(he, s(ve).label);
              },
              [
                () => String(s(p)) === s(ve).value,
                () => String(s(p)) === s(ve).value
              ]
            ), N("click", oe, () => h(s(u) ? Number(s(ve).value) : s(ve).value)), x(le, oe);
          }), O(() => de(Q, "aria-label", s(a))), x(W, Q);
        }, X = /* @__PURE__ */ fe(() => {
          var W;
          return s(l) === "select" && ((W = e.field.options) == null ? void 0 : W.length) <= 4 && e.field.options.every((Q) => String(Q.label).length < 14);
        }), re = (W) => {
          var Q = Sd();
          Re(Q, 21, () => e.field.options || [], bt, (ve, oe) => {
            var _e = xd(), he = Y(_e, !0), ge = {};
            O(() => {
              q(he, s(oe).label), ge !== (ge = s(oe).value) && (_e.value = (_e.__value = ge) ?? "");
            }), x(ve, _e);
          });
          var le;
          Vr(Q), O(
            (ve) => {
              de(Q, "id", i), le !== (le = ve) && (Q.value = (Q.__value = le) ?? "", Ts(Q, le));
            },
            [() => String(s(p))]
          ), N("change", Q, (ve) => h(s(u) ? Number(ve.currentTarget.value) : ve.currentTarget.value)), x(W, Q);
        }, U = (W) => {
          {
            let Q = /* @__PURE__ */ fe(() => s(p) || ""), le = /* @__PURE__ */ fe(() => e.field.rows || 6);
            Ca(W, {
              get id() {
                return i;
              },
              get value() {
                return s(Q);
              },
              onchange: h,
              get rows() {
                return s(le);
              }
            });
          }
        }, Z = (W) => {
          {
            let Q = /* @__PURE__ */ fe(() => s(p) || ""), le = /* @__PURE__ */ fe(() => e.field.rows || 3), ve = /* @__PURE__ */ fe(() => !/markdown/i.test(s(a)));
            Ca(W, {
              get id() {
                return i;
              },
              get value() {
                return s(Q);
              },
              onchange: h,
              get rows() {
                return s(le);
              },
              get plain() {
                return s(ve);
              }
            });
          }
        }, te = (W) => {
          dd(W, {
            get value() {
              return s(p);
            },
            onchange: h,
            get store() {
              return e.store;
            }
          });
        }, K = (W) => {
          bd(W, {
            get value() {
              return s(p);
            },
            onchange: h
          });
        }, ue = (W) => {
          var Q = Ed();
          O(() => {
            var le;
            de(Q, "id", i), In(Q, s(p)), de(Q, "min", (le = e.field.validate) == null ? void 0 : le.min);
          }), N("input", Q, (le) => M(le.currentTarget.value)), x(W, Q);
        }, pe = (W) => {
          var Q = Md(), le = m(Q), ve = g(le);
          O(() => {
            In(le, s(p) || "#000000"), de(ve, "id", i), In(ve, s(p));
          }), N("input", le, (oe) => h(oe.currentTarget.value)), N("input", ve, (oe) => h(oe.currentTarget.value)), x(W, Q);
        }, $ = (W) => {
          var Q = Td();
          O(() => {
            de(Q, "id", i), In(Q, s(p)), de(Q, "placeholder", e.field.placeholder || "");
          }), N("input", Q, (le) => h(le.currentTarget.value)), x(W, Q);
        }, ke = (W) => {
          var Q = Ad(), le = Ee(Q), ve = g(le, 2), oe = Y(ve);
          O(() => {
            de(le, "id", i), q(oe, `Edited as JSON (field type “${s(l) ?? ""}”).`);
          }), N("change", le, () => {
            try {
              h(JSON.parse(s(
                f
                /* keep editing */
              )));
            } catch {
            }
          }), pn(le, () => s(f), (_e) => b(f, _e)), x(W, Q);
        };
        G(S, (W) => {
          s(X) ? W(z) : s(l) === "select" ? W(re, 1) : s(l) === "markdown" ? W(U, 2) : s(l) === "textarea" ? W(Z, 3) : s(l) === "filepicker" || s(l) === "media" || s(l) === "file" ? W(te, 4) : s(l) === "iconpicker" ? W(K, 5) : s(u) ? W(ue, 6) : s(l) === "colorpicker" ? W(pe, 7) : s(l) === "text" || s(l) === "date" ? W($, 8) : W(ke, -1);
        });
      }
      O(() => {
        de(d, "for", i), q(k, s(a));
      }), x(R, y);
    };
    G(w, (R) => {
      s(l) === "list" ? R(v) : s(o) ? R(A, 1) : R(L, -1);
    });
  }
  var P = g(w, 2);
  {
    var j = (R) => {
      var y = Pd(), d = Y(y, !0);
      O(() => q(d, e.field.help)), x(R, y);
    };
    G(P, (R) => {
      e.field.help && s(l) !== "list" && R(j);
    });
  }
  O(() => E = be(_, 1, "field svelte-2ufken", null, E, { compact: r(), inline: s(o) })), x(t, _), st();
}
ot(["change", "click", "input"]);
var Nd = /* @__PURE__ */ C('<button type="button"><span class="aa svelte-uthihf">Aa</span></button>'), Od = /* @__PURE__ */ C('<span class="aa svelte-uthihf">Aa</span>'), Rd = /* @__PURE__ */ C('<label title="Custom color"><input type="color" aria-label="Custom background color" class="svelte-uthihf"/> <!></label>'), Dd = /* @__PURE__ */ C('<span class="live svelte-uthihf"> </span>'), Ld = /* @__PURE__ */ C('<button type="button" class="mb-btn sm ghost">Clear</button>'), Id = /* @__PURE__ */ C('<button type="button" class="dot svelte-uthihf"></button>'), jd = /* @__PURE__ */ C('<button type="button"> <!></button>'), Fd = /* @__PURE__ */ C('<span class="mb-label sub svelte-uthihf">Text color</span> <div class="seg svelte-uthihf"></div>', 1), qd = /* @__PURE__ */ C('<div class="group custom-row svelte-uthihf"><span class="mb-label">Custom color</span> <div class="hex svelte-uthihf"><span class="chip svelte-uthihf"></span> <input class="mb-input svelte-uthihf" placeholder="#hex e.g. #0f766e" spellcheck="false"/> <!></div> <div class="suggest svelte-uthihf"></div> <!></div>'), Ud = /* @__PURE__ */ C('<div class="group svelte-uthihf"><span class="mb-label">Background</span> <div class="swatches svelte-uthihf"><!> <!></div> <div class="mb-help"><!> <!></div></div> <!>', 1), Hd = /* @__PURE__ */ C('<button type="button"> </button>'), Gd = /* @__PURE__ */ C('<div class="group svelte-uthihf"><span class="mb-label"> </span> <div class="seg svelte-uthihf"></div></div>'), Bd = /* @__PURE__ */ C("<!> <!> <!>", 1);
function Pa(t, e) {
  rt(e, !0);
  let n = Fe(e, "block", 7), r = Fe(e, "settings", 19, () => []), i = Fe(e, "mode", 3, "style");
  const a = [
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
  }, o = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i, u = /* @__PURE__ */ fe(() => Object.fromEntries(r().map((S) => [S.name, S]))), p = /* @__PURE__ */ fe(() => r().filter((S) => !a.includes(S.name))), h = /* @__PURE__ */ fe(() => typeof n().bg_color == "string" && o.test(n().bg_color) ? n().bg_color : "");
  let M = /* @__PURE__ */ D("");
  Pt(() => {
    b(M, s(h), !0);
  });
  function f(S, z, X) {
    e.store.beginEdit(), z === void 0 || z === "" || z === null || z === X ? delete n()[S] : n()[S] = z, e.store.endEdit();
  }
  const _ = (S) => {
    var z;
    return n()[S] ?? ((z = s(u)[S]) == null ? void 0 : z.default);
  };
  function E(S) {
    var z;
    e.store.beginEdit(), delete n().bg_color, delete n().text_color, S === ((z = s(u).background) == null ? void 0 : z.default) ? delete n().background : n().background = S, e.store.endEdit();
  }
  function w(S) {
    o.test(S) && f("bg_color", S.toLowerCase());
  }
  function v() {
    let S = s(M).trim();
    S && !S.startsWith("#") && (S = "#" + S), S ? o.test(S) ? w(S) : b(M, s(h), !0) : f("bg_color", void 0);
  }
  function A(S) {
    let z = S.replace("#", "");
    z.length === 3 && (z = z.split("").map((K) => K + K).join(""));
    const X = (K) => (K /= 255, K <= 0.03928 ? K / 12.92 : ((K + 0.055) / 1.055) ** 2.4), [re, U, Z] = [0, 2, 4].map((K) => parseInt(z.slice(K, K + 2), 16)), te = 0.2126 * X(re) + 0.7152 * X(U) + 0.0722 * X(Z);
    return 1.05 / (te + 0.05) >= (te + 0.05) / 0.0597 ? "light" : "dark";
  }
  const L = (S) => {
    var z, X;
    return ((X = (z = e.store.palette) == null ? void 0 : z[S]) == null ? void 0 : X.bg) || l[S] || "var(--mb-muted)";
  }, P = (S) => {
    var z, X;
    return ((X = (z = e.store.palette) == null ? void 0 : z[S]) == null ? void 0 : X.fg) || (S === "accent" || S === "dark" ? "#fff" : "#111");
  }, j = /* @__PURE__ */ fe(() => {
    var S;
    return [
      (S = e.store.palette) == null ? void 0 : S._accent,
      "#0f766e",
      "#7c3aed",
      "#be123c",
      "#ea580c",
      "#111827",
      "#f5f5f4"
    ].filter((z) => z && o.test(z));
  });
  var R = Jt(), y = Ee(R);
  {
    var d = (S) => {
      var z = Bd(), X = Ee(z);
      {
        var re = (K) => {
          var ue = Ud(), pe = Ee(ue), $ = g(m(pe), 2), ke = m($);
          Re(ke, 17, () => s(u).background.options, bt, (ce, ye) => {
            const xe = /* @__PURE__ */ fe(() => !s(h) && _("background") === s(ye).value);
            var me = Nd();
            let Le, Ze;
            O(
              (ze, Oe) => {
                Le = be(me, 1, "sw svelte-uthihf", null, Le, { active: s(xe) }), de(me, "title", s(ye).label), de(me, "aria-label", s(ye).label), de(me, "aria-pressed", s(xe)), Ze = Ct(me, "", Ze, { background: ze, color: Oe });
              },
              [
                () => L(s(ye).value),
                () => P(s(ye).value)
              ]
            ), N("click", me, () => E(s(ye).value)), x(ce, me);
          });
          var W = g(ke, 2);
          {
            var Q = (ce) => {
              var ye = Rd();
              let xe, me;
              var Le = m(ye), Ze = g(Le, 2);
              {
                var ze = (Ae) => {
                  var Ie = Od();
                  x(Ae, Ie);
                }, Oe = (Ae) => {
                  B(Ae, { name: "plus", size: 14 });
                };
                G(Ze, (Ae) => {
                  s(h) ? Ae(ze) : Ae(Oe, -1);
                });
              }
              O(
                (Ae) => {
                  xe = be(ye, 1, "sw custom svelte-uthihf", null, xe, { active: !!s(h) }), me = Ct(ye, "", me, {
                    background: s(h) || "conic-gradient(#ef4444, #f59e0b, #22c55e, #06b6d4, #6366f1, #d946ef, #ef4444)",
                    color: Ae
                  }), In(Le, s(h) || "#2563eb");
                },
                [
                  () => s(h) ? A(s(h)) === "light" ? "#fff" : "#111" : "#fff"
                ]
              ), N("input", Le, (Ae) => w(Ae.currentTarget.value)), x(ce, ye);
            };
            G(W, (ce) => {
              s(u).bg_color && ce(Q);
            });
          }
          var le = g($, 2), ve = m(le);
          {
            var oe = (ce) => {
              var ye = Ur();
              O(() => q(ye, `Custom ${s(h) ?? ""}`)), x(ce, ye);
            }, _e = (ce) => {
              var ye = Ur();
              O((xe) => q(ye, xe), [
                () => {
                  var xe;
                  return (xe = s(u).background.options.find((me) => me.value === _("background"))) == null ? void 0 : xe.label;
                }
              ]), x(ce, ye);
            };
            G(ve, (ce) => {
              s(h) ? ce(oe) : ce(_e, -1);
            });
          }
          var he = g(ve, 2);
          {
            var ge = (ce) => {
              var ye = Dd(), xe = Y(ye);
              O(() => q(xe, `· colors from your theme (${e.store.palette._mode ?? ""})`)), x(ce, ye);
            };
            G(he, (ce) => {
              e.store.palette && ce(ge);
            });
          }
          var Te = g(pe, 2);
          {
            var Xe = (ce) => {
              var ye = qd(), xe = g(m(ye), 2), me = m(xe);
              let Le;
              var Ze = g(me, 2), ze = g(Ze, 2);
              {
                var Oe = (Ce) => {
                  var Se = Ld();
                  N("click", Se, () => f("bg_color", void 0)), x(Ce, Se);
                };
                G(ze, (Ce) => {
                  s(h) && Ce(Oe);
                });
              }
              var Ae = g(xe, 2);
              Re(Ae, 21, () => s(j), bt, (Ce, Se) => {
                var He = Id();
                let it;
                O(() => {
                  de(He, "title", s(Se)), de(He, "aria-label", s(Se)), it = Ct(He, "", it, { background: s(Se) });
                }), N("click", He, () => w(s(Se))), x(Ce, He);
              });
              var Ie = g(Ae, 2);
              {
                var qe = (Ce) => {
                  var Se = Fd(), He = g(Ee(Se), 2);
                  Re(He, 21, () => s(u).text_color.options, bt, (it, Qe) => {
                    var bn = jd();
                    let sn;
                    var H = m(bn), J = g(H);
                    {
                      var ie = (F) => {
                        var Ne = Ur();
                        O((Pe) => q(Ne, `(${Pe ?? ""})`), [() => A(s(h))]), x(F, Ne);
                      };
                      G(J, (F) => {
                        s(Qe).value === "auto" && F(ie);
                      });
                    }
                    O(() => {
                      sn = be(bn, 1, "svelte-uthihf", null, sn, { active: (n().text_color || "auto") === s(Qe).value }), q(H, s(Qe).label);
                    }), N("click", bn, () => f("text_color", s(Qe).value, "auto")), x(it, bn);
                  }), x(Ce, Se);
                };
                G(Ie, (Ce) => {
                  s(h) && s(u).text_color && Ce(qe);
                });
              }
              O(() => Le = Ct(me, "", Le, { background: s(h) || "transparent" })), N("change", Ze, v), N("keydown", Ze, (Ce) => Ce.key === "Enter" && v()), pn(Ze, () => s(M), (Ce) => b(M, Ce)), x(ce, ye);
            };
            G(Te, (ce) => {
              s(u).bg_color && ce(Xe);
            });
          }
          x(K, ue);
        };
        G(X, (K) => {
          s(u).background && K(re);
        });
      }
      var U = g(X, 2);
      Re(U, 16, () => ["spacing", "width", "align"], bt, (K, ue) => {
        var pe = Jt(), $ = Ee(pe);
        {
          var ke = (W) => {
            var Q = Gd(), le = m(Q), ve = Y(le, !0), oe = g(le, 2);
            Re(oe, 21, () => s(u)[ue].options, bt, (_e, he) => {
              var ge = Hd();
              let Te;
              var Xe = Y(ge, !0);
              O(
                (ce) => {
                  Te = be(ge, 1, "svelte-uthihf", null, Te, { active: ce }), q(Xe, s(he).label);
                },
                [() => _(ue) === s(he).value]
              ), N("click", ge, () => f(ue, s(he).value, s(u)[ue].default)), x(_e, ge);
            }), O(() => q(ve, s(u)[ue].label)), x(W, Q);
          };
          G($, (W) => {
            s(u)[ue] && W(ke);
          });
        }
        x(K, pe);
      });
      var Z = g(U, 2);
      {
        var te = (K) => {
          Js(K, {
            get field() {
              return s(u).reveal;
            },
            get target() {
              return n();
            },
            get store() {
              return e.store;
            }
          });
        };
        G(Z, (K) => {
          s(u).reveal && K(te);
        });
      }
      x(S, z);
    }, k = (S) => {
      var z = Jt(), X = Ee(z);
      Re(X, 17, () => s(p), (re) => re.name, (re, U) => {
        Js(re, {
          get field() {
            return s(U);
          },
          get target() {
            return n();
          },
          get store() {
            return e.store;
          }
        });
      }), x(S, z);
    };
    G(y, (S) => {
      i() === "style" ? S(d) : S(k, -1);
    });
  }
  x(t, R), st();
}
ot(["click", "input", "change", "keydown"]);
var Vd = /* @__PURE__ */ C("<option>Choose…</option>"), za = /* @__PURE__ */ C("<option> </option>"), Kd = /* @__PURE__ */ C('<p class="muted svelte-1w5bgec">Checking…</p>'), Jd = /* @__PURE__ */ C('<li class="svelte-1w5bgec"> </li>'), Yd = /* @__PURE__ */ C('<ul class="svelte-1w5bgec"></ul>'), Wd = /* @__PURE__ */ C('<p class="muted svelte-1w5bgec">Not saved on any page yet.</p>'), Xd = /* @__PURE__ */ C('<div class="usage svelte-1w5bgec"><span class="mb-label">Used on</span> <!></div>'), Zd = /* @__PURE__ */ C('<div class="global"><div class="banner svelte-1w5bgec"><!> <div class="svelte-1w5bgec"><strong> </strong> <span class="svelte-1w5bgec">Shared content. Edits apply on every page that uses it.</span></div></div> <label class="mb-label" for="mb-global-pick">Show this global section</label> <select id="mb-global-pick" class="mb-input"><!><!><!></select> <div class="actions svelte-1w5bgec"><button type="button" class="mb-btn primary"><!> Edit global section</button> <button type="button" class="mb-btn" title="Replace with an editable copy on this page"><!> Detach</button></div> <!></div>');
function Qd(t, e) {
  rt(e, !0);
  let n = Fe(e, "block", 7), r = /* @__PURE__ */ D(null);
  const i = /* @__PURE__ */ fe(() => {
    var U;
    return ((U = n().global) == null ? void 0 : U.section) || "";
  }), a = /* @__PURE__ */ fe(() => e.store.sections.find((U) => U.id === s(i)));
  Pt(() => {
    b(r, null), s(i) && at.section(s(i)).then((U) => b(r, U.usage || [], !0)).catch(() => b(r, [], !0));
  }), Tr(() => e.store.refreshSections());
  function l(U) {
    const Z = U.currentTarget.value;
    e.store.mutate(
      () => {
        (!n().global || typeof n().global != "object") && (n().global = {}), n().global.section = Z;
      },
      "Switching global section…"
    );
  }
  async function o() {
    e.store.dirty && e.store.flash("Your page changes are kept. Save the page when you come back.");
    try {
      await e.store.openSection(s(i));
    } catch (U) {
      e.store.flash(U.message);
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
      } catch (Z) {
        e.store.flash(Z.message);
      }
  }
  var p = Zd(), h = m(p), M = m(h);
  B(M, { name: "globe", size: 18 });
  var f = g(M, 2), _ = m(f), E = Y(_, !0), w = g(h, 4), v = m(w);
  {
    var A = (U) => {
      var Z = Vd();
      Z.value = Z.__value = "", x(U, Z);
    };
    G(v, (U) => {
      s(i) || U(A);
    });
  }
  var L = g(v);
  Re(L, 17, () => e.store.sections, (U) => U.id, (U, Z) => {
    var te = za(), K = Y(te), ue = {};
    O(() => {
      q(K, `${s(Z).title ?? ""} (${s(Z).count ?? ""})`), ue !== (ue = s(Z).id) && (te.value = (te.__value = ue) ?? "");
    }), x(U, te);
  });
  var P = g(L);
  {
    var j = (U) => {
      var Z = za(), te = Y(Z), K = {};
      O(() => {
        q(te, `${s(i) ?? ""} (missing)`), K !== (K = s(i)) && (Z.value = (Z.__value = K) ?? "");
      }), x(U, Z);
    };
    G(P, (U) => {
      s(i) && !s(a) && U(j);
    });
  }
  var R;
  Vr(w);
  var y = g(w, 2), d = m(y), k = m(d);
  B(k, { name: "edit", size: 14 });
  var S = g(d, 2), z = m(S);
  B(z, { name: "unlink", size: 14 });
  var X = g(y, 2);
  {
    var re = (U) => {
      var Z = Xd(), te = g(m(Z), 2);
      {
        var K = ($) => {
          var ke = Kd();
          x($, ke);
        }, ue = ($) => {
          var ke = Yd();
          Re(ke, 21, () => s(r), bt, (W, Q) => {
            var le = Jd(), ve = Y(le, !0);
            O(() => q(ve, s(Q))), x(W, le);
          }), x($, ke);
        }, pe = ($) => {
          var ke = Wd();
          x($, ke);
        };
        G(te, ($) => {
          s(r) === null ? $(K) : s(r).length ? $(ue, 1) : $(pe, -1);
        });
      }
      x(U, Z);
    };
    G(X, (U) => {
      s(i) && U(re);
    });
  }
  O(() => {
    var U;
    q(E, ((U = s(a)) == null ? void 0 : U.title) || "Global section"), R !== (R = s(i)) && (w.value = (w.__value = R) ?? "", Ts(w, R)), d.disabled = !s(a), S.disabled = !s(a);
  }), N("change", w, l), N("click", d, o), N("click", S, u), x(t, p), st();
}
ot(["change", "click"]);
var $d = /* @__PURE__ */ C('<div class="none svelte-17w6cpd"><!> <strong class="svelte-17w6cpd">No block selected</strong> <p class="svelte-17w6cpd">Click a section in the preview, or pick one in the Outline, to edit its content and style.</p> <p class="tip svelte-17w6cpd">Tip: click any heading, label or button text in the preview to type directly on the page.</p> <p class="keys svelte-17w6cpd"><span class="mb-kbd">Ctrl+Z</span> undo · <span class="mb-kbd">Ctrl+S</span> save · <span class="mb-kbd">Del</span> remove</p></div>'), ef = /* @__PURE__ */ C('<div class="none svelte-17w6cpd"><strong class="svelte-17w6cpd"> </strong><p class="svelte-17w6cpd">The active theme has no schema for this type.</p></div>'), tf = /* @__PURE__ */ C('<div class="body mb-scroll svelte-17w6cpd"><!></div>'), nf = /* @__PURE__ */ C("<option> </option>"), rf = /* @__PURE__ */ C('<div class="make-global svelte-17w6cpd"><span class="mb-label">Make global section</span> <p class="mb-help svelte-17w6cpd">Share this block across pages. Edit it once and every page that uses it updates.</p> <div class="row svelte-17w6cpd"><input class="mb-input" placeholder="Name, e.g. Footer call to action"/> <button type="button" class="mb-btn primary"><!> </button></div></div>'), sf = /* @__PURE__ */ C('<!> <div class="field svelte-17w6cpd"><label class="mb-label" for="mb-type">Block type</label> <select id="mb-type" class="mb-input"></select></div> <!>', 1), af = /* @__PURE__ */ C('<div class="tabs svelte-17w6cpd"><button type="button">Content</button> <button type="button">Style</button> <button type="button">Advanced</button></div> <div class="body mb-scroll svelte-17w6cpd"><!></div>', 1), lf = /* @__PURE__ */ C('<header class="svelte-17w6cpd"><span class="ico svelte-17w6cpd"><!></span> <div class="h svelte-17w6cpd"><strong class="svelte-17w6cpd"> </strong> <span class="svelte-17w6cpd"> </span></div> <button type="button" class="mb-btn ghost icon sm" title="Deselect"><!></button></header> <!>', 1);
function of(t, e) {
  rt(e, !0);
  let n = Fe(e, "store", 7), r = /* @__PURE__ */ D("content");
  const i = /* @__PURE__ */ fe(() => n().selected >= 0 ? n().blocks[n().selected] : null), a = /* @__PURE__ */ fe(() => s(i) ? n().defFor(s(i).type) : null);
  Pt(() => {
    s(i) && s(a) && (typeof s(i)[s(i).type] != "object" || Array.isArray(s(i)[s(i).type])) && (s(i)[s(i).type] = {});
  });
  let l = /* @__PURE__ */ D(""), o = /* @__PURE__ */ D(!1);
  async function u() {
    const w = s(l).trim();
    if (w) {
      b(o, !0);
      try {
        const v = await n().makeGlobal([n().selected], w);
        b(l, ""), n().flash(`“${v.title}” is now a global section. Insert it on other pages from Patterns → Global.`);
      } catch (v) {
        n().flash(v.message);
      }
      b(o, !1);
    }
  }
  async function p(w) {
    const v = w.currentTarget.value;
    w.currentTarget.value = s(i).type, await e.askConfirm({
      title: "Change block type",
      message: "Content that doesn’t fit the new block type is removed. Style settings are kept. You can undo this.",
      choices: [
        { label: "Cancel", value: !1 },
        { label: "Change type", value: !0, primary: !0 }
      ]
    }) && n().changeType(n().selected, v);
  }
  var h = Jt(), M = Ee(h);
  {
    var f = (w) => {
      var v = $d(), A = m(v);
      B(A, { name: "settings", size: 26 }), x(w, v);
    }, _ = (w) => {
      var v = ef(), A = m(v), L = Y(A);
      O(() => q(L, `Unknown block “${s(i).type ?? ""}”`)), x(w, v);
    }, E = (w) => {
      var v = lf(), A = Ee(v), L = m(A), P = m(L);
      B(P, {
        get fa() {
          return s(a).icon;
        },
        size: 16
      });
      var j = g(L, 2), R = m(j), y = Y(R, !0), d = g(R, 2), k = Y(d, !0), S = g(j, 2), z = m(S);
      B(z, { name: "x", size: 14 });
      var X = g(A, 2);
      {
        var re = (Z) => {
          var te = tf(), K = m(te);
          _a(K, () => n().selected, (ue) => {
            Qd(ue, {
              get store() {
                return n();
              },
              get block() {
                return s(i);
              },
              get index() {
                return n().selected;
              },
              get askConfirm() {
                return e.askConfirm;
              }
            });
          }), x(Z, te);
        }, U = (Z) => {
          var te = af(), K = Ee(te), ue = m(K);
          let pe;
          var $ = g(ue, 2);
          let ke;
          var W = g($, 2);
          let Q;
          var le = g(K, 2), ve = m(le);
          _a(ve, () => n().selected + ":" + s(i).type, (oe) => {
            var _e = Jt(), he = Ee(_e);
            {
              var ge = (ce) => {
                var ye = Jt(), xe = Ee(ye);
                Re(xe, 17, () => s(a).fields, (me) => me.name, (me, Le) => {
                  Js(me, {
                    get field() {
                      return s(Le);
                    },
                    get target() {
                      return s(i)[s(i).type];
                    },
                    get store() {
                      return n();
                    }
                  });
                }), x(ce, ye);
              }, Te = (ce) => {
                Pa(ce, {
                  get block() {
                    return s(i);
                  },
                  get store() {
                    return n();
                  },
                  get settings() {
                    return n().catalog.settings;
                  },
                  mode: "style"
                });
              }, Xe = (ce) => {
                var ye = sf(), xe = Ee(ye);
                Pa(xe, {
                  get block() {
                    return s(i);
                  },
                  get store() {
                    return n();
                  },
                  get settings() {
                    return n().catalog.settings;
                  },
                  mode: "advanced"
                });
                var me = g(xe, 2), Le = g(m(me), 2);
                Re(Le, 21, () => n().catalog.blocks.filter((Ae) => !Ae.virtual), bt, (Ae, Ie) => {
                  var qe = nf(), Ce = Y(qe, !0), Se = {};
                  O(() => {
                    q(Ce, s(Ie).title), Se !== (Se = s(Ie).type) && (qe.value = (qe.__value = Se) ?? "");
                  }), x(Ae, qe);
                });
                var Ze;
                Vr(Le);
                var ze = g(me, 2);
                {
                  var Oe = (Ae) => {
                    var Ie = rf(), qe = g(m(Ie), 4), Ce = m(qe), Se = g(Ce, 2), He = m(Se);
                    B(He, { name: "globe", size: 14 });
                    var it = g(He);
                    O(
                      (Qe) => {
                        Se.disabled = Qe, q(it, ` ${s(o) ? "Creating…" : "Create"}`);
                      },
                      [() => !s(l).trim() || s(o)]
                    ), N("keydown", Ce, (Qe) => Qe.key === "Enter" && u()), pn(Ce, () => s(l), (Qe) => b(l, Qe)), N("click", Se, u), x(Ae, Ie);
                  };
                  G(ze, (Ae) => {
                    n().isSection || Ae(Oe);
                  });
                }
                O(() => {
                  Ze !== (Ze = s(i).type) && (Le.value = (Le.__value = Ze) ?? "", Ts(Le, Ze));
                }), N("change", Le, p), x(ce, ye);
              };
              G(he, (ce) => {
                s(r) === "content" && s(i)[s(i).type] && typeof s(i)[s(i).type] == "object" ? ce(ge) : s(r) === "style" ? ce(Te, 1) : s(r) === "advanced" && ce(Xe, 2);
              });
            }
            x(oe, _e);
          }), O(() => {
            pe = be(ue, 1, "svelte-17w6cpd", null, pe, { active: s(r) === "content" }), ke = be($, 1, "svelte-17w6cpd", null, ke, { active: s(r) === "style" }), Q = be(W, 1, "svelte-17w6cpd", null, Q, { active: s(r) === "advanced" });
          }), N("click", ue, () => b(r, "content")), N("click", $, () => b(r, "style")), N("click", W, () => b(r, "advanced")), x(Z, te);
        };
        G(X, (Z) => {
          s(i).type === "global" ? Z(re) : Z(U, -1);
        });
      }
      O(() => {
        q(y, s(a).title), q(k, s(a).description);
      }), N("click", S, () => n().selected = -1), x(w, v);
    };
    G(M, (w) => {
      s(i) ? s(a) ? w(E, -1) : w(_, 1) : w(f);
    });
  }
  x(t, h), st();
}
ot(["click", "change", "keydown"]);
var cf = /* @__PURE__ */ C('<p class="error svelte-19n2gxs"> </p>'), uf = /* @__PURE__ */ C('<p class="muted svelte-19n2gxs">Loading history…</p>'), df = /* @__PURE__ */ C('<span class="time svelte-19n2gxs"> </span>'), ff = /* @__PURE__ */ C('<li><span class="dot svelte-19n2gxs"></span> <div class="body"><div class="row svelte-19n2gxs"><strong> </strong> <!></div> <div class="meta svelte-19n2gxs"> </div> <div class="types svelte-19n2gxs"> </div> <button type="button" class="mb-btn sm"><!> </button></div></li>'), vf = /* @__PURE__ */ C('<p class="muted svelte-19n2gxs">No saved versions yet. Versions appear here after you save.</p>'), hf = /* @__PURE__ */ C('<div class="head svelte-19n2gxs"><p class="hint svelte-19n2gxs"> </p> <button type="button" class="mb-btn ghost icon sm" title="Refresh"><!></button></div> <!> <!> <ol class="timeline svelte-19n2gxs"></ol>', 1);
function pf(t, e) {
  rt(e, !0);
  let n = Fe(e, "store", 7), r = /* @__PURE__ */ D(Ye([])), i = /* @__PURE__ */ D(!1), a = /* @__PURE__ */ D(""), l = /* @__PURE__ */ D("");
  async function o() {
    if (n().canPreview) {
      b(i, !0), b(a, "");
      try {
        const y = await at.revisions(n().context);
        b(r, (y == null ? void 0 : y.items) || [], !0);
      } catch (y) {
        b(a, y.message, !0);
      }
      b(i, !1);
    }
  }
  Pt(() => {
    JSON.stringify(n().context), n().revisionTick, o();
  });
  function u(y) {
    const d = Math.round(Date.now() / 1e3 - y);
    return d < 45 ? "just now" : d < 3600 ? `${Math.round(d / 60)} min ago` : d < 86400 ? `${Math.round(d / 3600)} h ago` : new Date(y * 1e3).toLocaleString(void 0, { dateStyle: "medium", timeStyle: "short" });
  }
  function p(y) {
    const d = (y.types || []).map((k) => {
      var S;
      return k === "global" ? "Global" : ((S = n().defFor(k)) == null ? void 0 : S.title) || k;
    });
    return d.length > 4 ? d.slice(0, 4).join(" · ") + ` · +${d.length - 4}` : d.join(" · ");
  }
  async function h(y, d) {
    if (await e.askConfirm({
      title: "Restore this version?",
      message: `Loads the version from ${u(y.time)} into the editor. You can undo it, and nothing is saved until you click ${n().isSection ? "Save section" : "Update"}.`,
      choices: [
        { label: "Cancel", value: !1 },
        { label: "Restore", value: !0, primary: !0 }
      ]
    })) {
      b(l, y.id, !0);
      try {
        const S = await at.revision(n().context, y.id);
        n().insertMany(S.blocks || [], null, !0), n().busy = "Restoring version…", n().flash(d === 0 ? "Restored the last saved version" : `Restored version from ${u(y.time)}. Click ${n().isSection ? "Save section" : "Update"} to keep it.`);
      } catch (S) {
        n().flash(S.message);
      }
      b(l, "");
    }
  }
  var M = hf(), f = Ee(M), _ = m(f), E = Y(_), w = g(_, 2), v = m(w);
  B(v, { name: "refresh", size: 13 });
  var A = g(f, 2);
  {
    var L = (y) => {
      var d = cf(), k = Y(d, !0);
      O(() => q(k, s(a))), x(y, d);
    };
    G(A, (y) => {
      s(a) && y(L);
    });
  }
  var P = g(A, 2);
  {
    var j = (y) => {
      var d = uf();
      x(y, d);
    };
    G(P, (y) => {
      s(i) && !s(r).length && y(j);
    });
  }
  var R = g(P, 2);
  Re(
    R,
    23,
    () => s(r),
    (y) => y.id,
    (y, d, k) => {
      var S = ff();
      let z;
      var X = g(m(S), 2), re = m(X), U = m(re), Z = Y(U, !0), te = g(U, 2);
      {
        var K = (ve) => {
          var oe = df(), _e = Y(oe, !0);
          O((he) => q(_e, he), [() => u(s(d).time)]), x(ve, oe);
        };
        G(te, (ve) => {
          s(k) === 0 && ve(K);
        });
      }
      var ue = g(re, 2), pe = Y(ue), $ = g(ue, 2), ke = Y($, !0), W = g($, 2), Q = m(W);
      B(Q, { name: "history", size: 12 });
      var le = g(Q);
      O(
        (ve, oe) => {
          z = be(S, 1, "svelte-19n2gxs", null, z, { latest: s(k) === 0 }), q(Z, ve), q(pe, `${s(d).count ?? ""} ${s(d).count === 1 ? "block" : "blocks"}${s(d).user ? ` · ${s(d).user}` : ""}${s(d).label ? ` · ${s(d).label}` : ""}`), q(ke, oe), W.disabled = s(l) === s(d).id, q(le, ` ${s(l) === s(d).id ? "Restoring…" : "Restore"}`);
        },
        [
          () => s(k) === 0 ? "Last saved" : u(s(d).time),
          () => p(s(d))
        ]
      ), N("click", W, () => h(s(d), s(k))), x(y, S);
    },
    (y) => {
      var d = Jt(), k = Ee(d);
      {
        var S = (z) => {
          var X = vf();
          x(z, X);
        };
        G(k, (z) => {
          !s(i) && !s(a) && z(S);
        });
      }
      x(y, d);
    }
  ), O(() => q(E, `Every save keeps a version${n().isSection ? " of this global section" : ""}. Restore any of them. You can undo, and nothing is saved until you choose to.`)), N("click", w, o), x(t, M), st();
}
ot(["click"]);
var gf = /* @__PURE__ */ C('<button type="button"><!></button>'), bf = /* @__PURE__ */ C('<button type="button" class="mb-btn"><!> Save as pattern</button> <button type="button" class="mb-btn primary" title="Save page (Ctrl+S)"><!> Update</button>', 1), _f = /* @__PURE__ */ C('<button type="button" class="mb-btn"><!> Back to page</button> <button type="button" class="mb-btn primary global-save svelte-1nqlp8n" title="Save global section (Ctrl+S)"><!> </button>', 1), mf = /* @__PURE__ */ C(`<div class="section-banner svelte-1nqlp8n" role="status"><!> <span class="svelte-1nqlp8n">Editing global section <strong> </strong>. Changes apply everywhere it's used<!>.</span> <button type="button" class="link svelte-1nqlp8n">Back to page</button></div>`), yf = /* @__PURE__ */ C('<p class="error svelte-1nqlp8n"> </p>'), kf = /* @__PURE__ */ C('<p class="muted svelte-1nqlp8n">Loading blocks…</p>'), wf = /* @__PURE__ */ C('<button type="button" class="edge-tab left svelte-1nqlp8n" title="Show left panel"><!></button>'), xf = /* @__PURE__ */ C('<button type="button" class="edge-tab right svelte-1nqlp8n" title="Show settings panel"><!></button>'), Sf = /* @__PURE__ */ C('<div class="toast svelte-1nqlp8n" role="status"> </div>'), Ef = /* @__PURE__ */ C('<button type="button" class="mb-btn svelte-1nqlp8n">Cancel</button> <button type="button" class="mb-btn primary svelte-1nqlp8n">Save pattern</button>', 1), Mf = /* @__PURE__ */ C("<option>Selected block only</option>"), Tf = /* @__PURE__ */ C('<label class="mb-label" for="mb-pattern-title">Name</label> <input id="mb-pattern-title" class="mb-input" placeholder="e.g. Services intro"/> <div class="grid2 svelte-1nqlp8n"><div><span class="mb-label">Contains</span> <select class="mb-input"><!><option> </option></select></div> <div><span class="mb-label">Type</span> <select class="mb-input"><option>Section</option><option>Full page layout</option></select></div></div>', 1), Af = /* @__PURE__ */ C('<button type="button"> </button>'), Cf = /* @__PURE__ */ C("<p> </p>"), Pf = /* @__PURE__ */ C('<div><header class="top svelte-1nqlp8n"><div class="left svelte-1nqlp8n"><button type="button" class="mb-btn ghost icon" title="Close builder (Esc)"><!></button> <div class="brand svelte-1nqlp8n"><span class="logo svelte-1nqlp8n"><!></span> <div><div class="page svelte-1nqlp8n"> </div> <div class="route svelte-1nqlp8n"> </div></div></div> <div class="sep svelte-1nqlp8n"></div> <button type="button" class="mb-btn ghost icon" title="Undo (Ctrl+Z)"><!></button> <button type="button" class="mb-btn ghost icon" title="Redo (Ctrl+Shift+Z)"><!></button> <div class="sep svelte-1nqlp8n"></div> <button type="button"><!></button></div> <div class="devices svelte-1nqlp8n" role="group" aria-label="Preview width"></div> <div class="right svelte-1nqlp8n"><button type="button" class="mb-btn ghost icon" title="Refresh preview"><!></button> <!> <div class="sep svelte-1nqlp8n"></div> <button type="button"><!></button></div></header> <!> <div><aside><div class="tabs svelte-1nqlp8n" role="tablist"><button type="button" role="tab"><!> Blocks</button> <button type="button" role="tab"><!> Patterns</button> <button type="button" role="tab"><!> Outline</button> <button type="button" role="tab" title="Saved versions"><!> History</button></div> <div class="panel-body mb-scroll svelte-1nqlp8n"><!></div></aside> <main class="canvas-wrap svelte-1nqlp8n"><!> <!> <!></main> <aside><div class="resize-handle svelte-1nqlp8n" role="separator" aria-orientation="vertical" aria-label="Resize settings panel" tabindex="0" title="Drag to resize · double-click to reset"></div> <!></aside></div> <!> <!> <!></div>');
function zf(t, e) {
  rt(e, !0);
  let n = Fe(e, "store", 7), r = /* @__PURE__ */ D(
    "blocks"
    // blocks | patterns | outline | history
  ), i = /* @__PURE__ */ D(
    "desktop"
    // desktop | tablet | mobile
  ), a = /* @__PURE__ */ D(
    null
    // {kind, ...}
  ), l = /* @__PURE__ */ D(void 0);
  const o = /Mac|iPhone|iPad/.test(navigator.platform);
  Tr(() => {
    n().load();
    const T = (ne) => p(ne), ee = () => b(r, "blocks");
    return window.addEventListener("keydown", T, !0), document.addEventListener("maw-open-inserter", ee), () => {
      window.removeEventListener("keydown", T, !0), document.removeEventListener("maw-open-inserter", ee);
    };
  });
  function u(T) {
    const ee = T.composedPath()[0];
    return ee && (ee.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(ee.tagName));
  }
  function p(T) {
    if (!n().open || T.__mawSave) return;
    const ee = o ? T.metaKey : T.ctrlKey, ne = T.key.toLowerCase();
    if (ee && ne === "s") {
      T.preventDefault(), T.stopPropagation(), n().isSection ? M() : h();
      return;
    }
    if (ee && ne === "z" && !u(T)) {
      T.preventDefault(), T.stopPropagation(), T.shiftKey ? n().redo() : n().undo();
      return;
    }
    if (ee && ne === "y" && !u(T)) {
      T.preventDefault(), T.stopPropagation(), n().redo();
      return;
    }
    if (ee && T.code === "Backslash") {
      T.preventDefault(), T.stopPropagation(), T.altKey ? b(k, !s(k)) : b(d, !s(d));
      return;
    }
    if (n().imagePick) {
      ne === "escape" && (n().imagePick = null, T.stopPropagation());
      return;
    }
    if (s(a)) {
      ne === "escape" && (b(a, null), T.stopPropagation());
      return;
    }
    if (!u(T)) {
      if (ne === "escape") {
        T.stopPropagation(), n().selected >= 0 ? n().selected = -1 : _();
        return;
      }
      n().selected < 0 || (ne === "delete" || ne === "backspace" ? (T.preventDefault(), T.stopPropagation(), n().remove(n().selected)) : ee && ne === "d" ? (T.preventDefault(), T.stopPropagation(), n().duplicate(n().selected)) : T.altKey && ne === "arrowup" ? (T.preventDefault(), n().move(n().selected, n().selected - 1)) : T.altKey && ne === "arrowdown" && (T.preventDefault(), n().move(n().selected, n().selected + 1)));
    }
  }
  function h() {
    if (n().isSection) return M();
    const T = new KeyboardEvent("keydown", {
      key: "s",
      code: "KeyS",
      ctrlKey: !o,
      metaKey: o,
      bubbles: !0,
      cancelable: !0
    });
    T.__mawSave = !0, window.dispatchEvent(T), n().dirty = !1, n().flash("Saving page…"), setTimeout(() => n().revisionTick++, 1800);
  }
  async function M() {
    try {
      await n().saveSection();
    } catch (T) {
      n().flash(T.message);
    }
  }
  async function f() {
    var T;
    if (n().sectionDirty) {
      const ee = await v({
        title: "Unsaved global section changes",
        message: `Save changes to “${(T = n().editingSection) == null ? void 0 : T.title}” before going back to the page?`,
        choices: [
          { label: "Cancel", value: null },
          { label: "Discard", value: "discard" },
          { label: "Save & go back", value: "save", primary: !0 }
        ]
      });
      if (!ee) return;
      if (ee === "save")
        try {
          await n().saveSection();
        } catch (ne) {
          n().flash(ne.message);
          return;
        }
    }
    n().closeSection();
  }
  function _() {
    if (n().isSection) return f();
    e.close();
  }
  function E() {
    n().selected < 0 && !n().blocks.length || b(
      a,
      {
        kind: "pattern",
        title: "",
        category: "section",
        scope: n().selected >= 0 ? "selected" : "all"
      },
      !0
    );
  }
  async function w() {
    const T = s(a);
    if (!T.title.trim()) return;
    const ee = T.scope === "selected" ? [n().selected] : n().blocks.map((ne, Ue) => Ue);
    try {
      await n().savePattern(T.title.trim(), T.category, ee), n().flash(`Pattern “${T.title.trim()}” saved`), b(a, null), b(r, "patterns");
    } catch (ne) {
      n().flash(ne.message);
    }
  }
  function v(T) {
    return new Promise((ee) => {
      b(a, { kind: "confirm", ...T, resolve: ee }, !0);
    });
  }
  const A = "maw-builder:layout", L = 280, P = 640, j = 340, R = 300, y = (() => {
    try {
      return JSON.parse(localStorage.getItem(A) || "{}");
    } catch {
      return {};
    }
  })();
  let d = /* @__PURE__ */ D(Ye(y.leftOpen ?? !0)), k = /* @__PURE__ */ D(Ye(y.rightOpen ?? !0)), S = /* @__PURE__ */ D(Ye(Math.min(P, Math.max(L, Number(y.rightWidth) || j)))), z = /* @__PURE__ */ D(!1);
  Pt(() => {
    const T = {
      leftOpen: s(d),
      rightOpen: s(k),
      rightWidth: s(S)
    };
    try {
      localStorage.setItem(A, JSON.stringify(T));
    } catch {
    }
  });
  const X = /* @__PURE__ */ fe(() => `${s(d) ? R : 0}px minmax(0, 1fr) ${s(k) ? s(S) : 0}px`);
  function re(T) {
    if (T.button !== 0) return;
    T.preventDefault();
    const ee = T.currentTarget;
    try {
      ee.setPointerCapture(T.pointerId);
    } catch {
    }
    const ne = T.clientX, Ue = s(S), Ge = Math.min(P, Math.round(window.innerWidth * 0.5));
    b(z, !0);
    const Ve = (mt) => {
      b(S, Math.min(Ge, Math.max(L, Ue + (ne - mt.clientX))), !0);
    }, Ke = () => {
      b(z, !1), window.removeEventListener("pointermove", Ve, !0), window.removeEventListener("pointerup", Ke, !0), window.removeEventListener("pointercancel", Ke, !0);
    };
    window.addEventListener("pointermove", Ve, !0), window.addEventListener("pointerup", Ke, !0), window.addEventListener("pointercancel", Ke, !0);
  }
  function U(T) {
    const ee = T.shiftKey ? 60 : 20;
    T.key === "ArrowLeft" ? (T.preventDefault(), b(S, Math.min(P, s(S) + ee), !0)) : T.key === "ArrowRight" && (T.preventDefault(), b(S, Math.max(L, s(S) - ee), !0));
  }
  const Z = /* @__PURE__ */ fe(() => {
    var T, ee, ne, Ue;
    return {
      desktop: null,
      tablet: ((ee = (T = n().catalog) == null ? void 0 : T.devices) == null ? void 0 : ee.tablet) || 820,
      mobile: ((Ue = (ne = n().catalog) == null ? void 0 : ne.devices) == null ? void 0 : Ue.mobile) || 390
    };
  });
  var te = Pf();
  let K;
  var ue = m(te), pe = m(ue), $ = m(pe), ke = m($);
  B(ke, { name: "x" });
  var W = g($, 2), Q = m(W), le = m(Q);
  B(le, { name: "blocks", size: 15 });
  var ve = g(Q, 2), oe = m(ve), _e = Y(oe, !0), he = g(oe, 2), ge = Y(he, !0), Te = g(W, 4), Xe = m(Te);
  B(Xe, { name: "undo" });
  var ce = g(Te, 2), ye = m(ce);
  B(ye, { name: "redo" });
  var xe = g(ce, 4);
  let me;
  var Le = m(xe);
  B(Le, { name: "panel-left", size: 16 });
  var Ze = g(pe, 2);
  Re(
    Ze,
    20,
    () => [
      ["desktop", "monitor", "Desktop"],
      ["tablet", "tablet", "Tablet"],
      ["mobile", "phone", "Mobile"]
    ],
    bt,
    (T, ee) => {
      var ne = /* @__PURE__ */ fe(() => Ua(ee, 3));
      let Ue = () => s(ne)[0], Ge = () => s(ne)[1], Ve = () => s(ne)[2];
      var Ke = gf();
      let mt;
      var an = m(Ke);
      B(an, {
        get name() {
          return Ge();
        },
        size: 15
      }), O(() => {
        de(Ke, "title", Ve()), de(Ke, "aria-pressed", s(i) === Ue()), mt = be(Ke, 1, "svelte-1nqlp8n", null, mt, { active: s(i) === Ue() });
      }), N("click", Ke, () => b(i, Ue(), !0)), x(T, Ke);
    }
  );
  var ze = g(Ze, 2), Oe = m(ze), Ae = m(Oe);
  B(Ae, { name: "refresh", size: 15 });
  var Ie = g(Oe, 2);
  {
    var qe = (T) => {
      var ee = bf(), ne = Ee(ee), Ue = m(ne);
      B(Ue, { name: "template", size: 15 });
      var Ge = g(ne, 2), Ve = m(Ge);
      B(Ve, { name: "save", size: 15 }), O(() => ne.disabled = !n().blocks.length), N("click", ne, E), N("click", Ge, h), x(T, ee);
    }, Ce = (T) => {
      var ee = _f(), ne = Ee(ee), Ue = m(ne);
      B(Ue, { name: "back", size: 15 });
      var Ge = g(ne, 2), Ve = m(Ge);
      B(Ve, { name: "globe", size: 15 });
      var Ke = g(Ve);
      O(() => {
        Ge.disabled = !n().sectionDirty, q(Ke, ` ${n().sectionDirty ? "Save section" : "Saved"}`);
      }), N("click", ne, f), N("click", Ge, M), x(T, ee);
    };
    G(Ie, (T) => {
      n().isSection ? T(Ce, -1) : T(qe);
    });
  }
  var Se = g(Ie, 4);
  let He;
  var it = m(Se);
  B(it, { name: "panel-right", size: 16 });
  var Qe = g(ue, 2);
  {
    var bn = (T) => {
      var ee = mf(), ne = m(ee);
      B(ne, { name: "globe", size: 16 });
      var Ue = g(ne, 2), Ge = g(m(Ue)), Ve = Y(Ge, !0), Ke = g(Ge, 2);
      {
        var mt = (ln) => {
          var Nn = Ur();
          O(() => q(Nn, `(${n().editingSection.usage.length ?? ""} ${n().editingSection.usage.length === 1 ? "place" : "places"})`)), x(ln, Nn);
        };
        G(Ke, (ln) => {
          var Nn, tr;
          (tr = (Nn = n().editingSection) == null ? void 0 : Nn.usage) != null && tr.length && ln(mt);
        });
      }
      var an = g(Ue, 2);
      O(() => {
        var ln;
        return q(Ve, (ln = n().editingSection) == null ? void 0 : ln.title);
      }), N("click", an, f), x(T, ee);
    };
    G(Qe, (T) => {
      n().isSection && T(bn);
    });
  }
  var sn = g(Qe, 2);
  let H, J;
  var ie = m(sn);
  let F;
  var Ne = m(ie), Pe = m(Ne);
  let $e;
  var Yt = m(Pe);
  B(Yt, { name: "plus", size: 14 });
  var vt = g(Pe, 2);
  let An;
  var _n = m(vt);
  B(_n, { name: "template", size: 14 });
  var Cn = g(vt, 2);
  let Ar;
  var ti = m(Cn);
  B(ti, { name: "layers", size: 14 });
  var er = g(Cn, 2);
  let As;
  var Pn = m(er);
  B(Pn, { name: "history", size: 14 });
  var mn = g(Ne, 2), Cs = m(mn);
  {
    var ni = (T) => {
      var ee = yf(), ne = Y(ee, !0);
      O(() => q(ne, n().loadError)), x(T, ee);
    }, jl = (T) => {
      var ee = kf();
      x(T, ee);
    }, Fl = (T) => {
      cu(T, {
        get store() {
          return n();
        }
      });
    }, ql = (T) => {
      mu(T, {
        get store() {
          return n();
        },
        askConfirm: v
      });
    }, Ul = (T) => {
      xu(T, {
        get store() {
          return n();
        }
      });
    }, Hl = (T) => {
      pf(T, {
        get store() {
          return n();
        },
        askConfirm: v
      });
    };
    G(Cs, (T) => {
      n().loadError ? T(ni) : n().catalog ? s(r) === "blocks" ? T(Fl, 2) : s(r) === "patterns" ? T(ql, 3) : s(r) === "outline" ? T(Ul, 4) : T(Hl, -1) : T(jl, 1);
    });
  }
  var $i = g(ie, 2), ea = m($i);
  Tn(
    Hu(ea, {
      get store() {
        return n();
      },
      get width() {
        return s(Z)[s(i)];
      }
    }),
    (T) => b(l, T, !0),
    () => s(l)
  );
  var ta = g(ea, 2);
  {
    var Gl = (T) => {
      var ee = wf(), ne = m(ee);
      B(ne, { name: "chevron", size: 14 }), N("click", ee, () => b(d, !0)), x(T, ee);
    };
    G(ta, (T) => {
      s(d) || T(Gl);
    });
  }
  var Bl = g(ta, 2);
  {
    var Vl = (T) => {
      var ee = xf(), ne = m(ee);
      B(ne, { name: "chevron", size: 14 }), N("click", ee, () => b(k, !0)), x(T, ee);
    };
    G(Bl, (T) => {
      s(k) || T(Vl);
    });
  }
  var Ps = g($i, 2);
  let na;
  var zn = m(Ps);
  de(zn, "aria-valuemin", L), de(zn, "aria-valuemax", P);
  var Kl = g(zn, 2);
  of(Kl, {
    get store() {
      return n();
    },
    askConfirm: v
  });
  var ra = g(sn, 2);
  {
    var Jl = (T) => {
      {
        let ee = /* @__PURE__ */ fe(() => n().getPath(n().imagePick.index, n().imagePick.path) || "");
        Rl(T, {
          get store() {
            return n();
          },
          get current() {
            return s(ee);
          },
          onselect: (ne) => n().replaceImage(ne),
          onclose: () => n().imagePick = null
        });
      }
    };
    G(ra, (T) => {
      n().imagePick && T(Jl);
    });
  }
  var sa = g(ra, 2);
  {
    var Yl = (T) => {
      var ee = Sf(), ne = Y(ee, !0);
      O(() => q(ne, n().toast)), x(T, ee);
    };
    G(sa, (T) => {
      n().toast && T(Yl);
    });
  }
  var Wl = g(sa, 2);
  {
    var Xl = (T) => {
      Ni(T, {
        title: "Save as pattern",
        onclose: () => b(a, null),
        actions: (ne) => {
          var Ue = Ef(), Ge = Ee(Ue), Ve = g(Ge, 2);
          O((Ke) => Ve.disabled = Ke, [() => !s(a).title.trim()]), N("click", Ge, () => b(a, null)), N("click", Ve, w), x(ne, Ue);
        },
        children: (ne, Ue) => {
          var Ge = Tf(), Ve = g(Ee(Ge), 2);
          Go(Ve);
          var Ke = g(Ve, 2), mt = m(Ke), an = g(m(mt), 2), ln = m(an);
          {
            var Nn = (Ft) => {
              var ii = Mf();
              ii.value = ii.__value = "selected", x(Ft, ii);
            };
            G(ln, (Ft) => {
              n().selected >= 0 && Ft(Nn);
            });
          }
          var tr = g(ln), Ql = Y(tr);
          tr.value = tr.__value = "all", Vr(an);
          var $l = g(mt, 2), ri = g(m($l), 2), si = m(ri);
          si.value = si.__value = "section";
          var ia = g(si);
          ia.value = ia.__value = "page", Vr(ri), O(() => q(Ql, `All ${n().blocks.length ?? ""} blocks on this page`)), N("keydown", Ve, (Ft) => Ft.key === "Enter" && w()), pn(Ve, () => s(a).title, (Ft) => s(a).title = Ft), Sa(an, () => s(a).scope, (Ft) => s(a).scope = Ft), Sa(ri, () => s(a).category, (Ft) => s(a).category = Ft), x(ne, Ge);
        },
        $$slots: { actions: !0, default: !0 }
      });
    }, Zl = (T) => {
      Ni(T, {
        get title() {
          return s(a).title;
        },
        onclose: () => {
          s(a).resolve(null), b(a, null);
        },
        actions: (ne) => {
          var Ue = Jt(), Ge = Ee(Ue);
          Re(Ge, 17, () => s(a).choices, bt, (Ve, Ke) => {
            var mt = Af(), an = Y(mt, !0);
            O(() => {
              be(mt, 1, `mb-btn ${s(Ke).primary ? "primary" : ""}`, "svelte-1nqlp8n"), q(an, s(Ke).label);
            }), N("click", mt, () => {
              s(a).resolve(s(Ke).value), b(a, null);
            }), x(Ve, mt);
          }), x(ne, Ue);
        },
        children: (ne, Ue) => {
          var Ge = Cf(), Ve = Y(Ge, !0);
          O(() => q(Ve, s(a).message)), x(ne, Ge);
        },
        $$slots: { actions: !0, default: !0 }
      });
    };
    G(Wl, (T) => {
      var ee, ne;
      ((ee = s(a)) == null ? void 0 : ee.kind) === "pattern" ? T(Xl) : ((ne = s(a)) == null ? void 0 : ne.kind) === "confirm" && T(Zl, 1);
    });
  }
  O(
    (T) => {
      K = be(te, 1, "builder svelte-1nqlp8n", null, K, { "section-mode": n().isSection }), q(_e, T), q(ge, n().isSection ? "Global section" : n().isFlex ? `Flex · ${n().context.type}` : n().route), Te.disabled = !n().canUndo, ce.disabled = !n().canRedo, me = be(xe, 1, "mb-btn ghost icon svelte-1nqlp8n", null, me, { on: s(d) }), de(xe, "title", s(d) ? "Hide left panel (Ctrl+)" : "Show left panel (Ctrl+)"), de(xe, "aria-pressed", s(d)), He = be(Se, 1, "mb-btn ghost icon svelte-1nqlp8n", null, He, { on: s(k) }), de(Se, "title", s(k) ? "Hide settings panel (Ctrl+Alt+)" : "Show settings panel (Ctrl+Alt+)"), de(Se, "aria-pressed", s(k)), H = be(sn, 1, "body svelte-1nqlp8n", null, H, { resizing: s(z) }), J = Ct(sn, "", J, { "grid-template-columns": s(X) }), F = be(ie, 1, "panel left-panel svelte-1nqlp8n", null, F, { collapsed: !s(d) }), ie.inert = !s(d), de(ie, "aria-hidden", !s(d)), de(Pe, "aria-selected", s(r) === "blocks"), $e = be(Pe, 1, "svelte-1nqlp8n", null, $e, { active: s(r) === "blocks" }), de(vt, "aria-selected", s(r) === "patterns"), An = be(vt, 1, "svelte-1nqlp8n", null, An, { active: s(r) === "patterns" }), de(Cn, "aria-selected", s(r) === "outline"), Ar = be(Cn, 1, "svelte-1nqlp8n", null, Ar, { active: s(r) === "outline" }), de(er, "aria-selected", s(r) === "history"), As = be(er, 1, "svelte-1nqlp8n", null, As, { active: s(r) === "history" }), na = be(Ps, 1, "panel right-panel svelte-1nqlp8n", null, na, { collapsed: !s(k) }), Ps.inert = !s(k), de(Ps, "aria-hidden", !s(k)), de(zn, "aria-valuenow", s(S));
    },
    [
      () => {
        var T;
        return n().isSection ? (T = n().editingSection) == null ? void 0 : T.title : document.title.replace(/\s*[—|-]\s*Grav Admin.*$/, "") || "Page";
      }
    ]
  ), N("click", $, _), N("click", Te, () => n().undo()), N("click", ce, () => n().redo()), N("click", xe, () => b(d, !s(d))), N("click", Oe, () => {
    var T;
    return (T = s(l)) == null ? void 0 : T.refresh();
  }), N("click", Se, () => b(k, !s(k))), N("click", Pe, () => b(r, "blocks")), N("click", vt, () => b(r, "patterns")), N("click", Cn, () => b(r, "outline")), N("click", er, () => b(r, "history")), N("pointerdown", zn, re), N("dblclick", zn, () => b(S, j)), N("keydown", zn, U), x(t, te), st();
}
ot(["click", "pointerdown", "dblclick", "keydown"]);
const Nf = 60;
var $r, es, ts, ns, rs, ss, is, as, ls, os, cs, Tt, Gt, br, Gn, us, ds, fs, vs, hs, ps, gs, bs, _s, ms, _r, We, Oi, sr, Ir, Dl, ys, Fs;
class Of {
  constructor({ context: e, fieldName: n, onChange: r }) {
    I(this, We);
    I(this, $r, /* @__PURE__ */ D(Ye([])));
    I(this, es, /* @__PURE__ */ D(-1));
    I(this, ts, /* @__PURE__ */ D(null));
    I(this, ns, /* @__PURE__ */ D(Ye([])));
    I(this, rs, /* @__PURE__ */ D(""));
    I(this, ss, /* @__PURE__ */ D(!1));
    I(this, is, /* @__PURE__ */ D(!1));
    I(this, as, /* @__PURE__ */ D(""));
    I(this, ls, /* @__PURE__ */ D(""));
    I(this, os, /* @__PURE__ */ D(""));
    I(this, cs, /* @__PURE__ */ D(null));
    I(this, Tt, []);
    I(this, Gt, []);
    I(this, br, 0);
    I(this, Gn, !1);
    I(this, us, /* @__PURE__ */ D(!1));
    I(this, ds, /* @__PURE__ */ D(!1));
    I(this, fs, /* @__PURE__ */ D(null));
    I(this, vs, /* @__PURE__ */ D(Ye({})));
    I(this, hs, /* @__PURE__ */ D(Ye({ kind: "unknown" })));
    I(this, ps, /* @__PURE__ */ D(Ye([])));
    I(this, gs, /* @__PURE__ */ D(null));
    I(this, bs, /* @__PURE__ */ D(!1));
    I(this, _s, /* @__PURE__ */ D(!1));
    I(this, ms, /* @__PURE__ */ D(0));
    ut(this, "renderedPayload", "");
    I(this, _r, null);
    /** After the next preview render, start inline editing this field: {index, path}. */
    ut(this, "pendingFocus", null);
    I(
      this,
      ys,
      /** Image clicked on the canvas: {index, path} while the media library is open for it. */
      /* @__PURE__ */ D(null)
    );
    this.context = e, this.fieldName = n, this.onChange = r;
  }
  get blocks() {
    return s(c(this, $r));
  }
  set blocks(e) {
    b(c(this, $r), e, !0);
  }
  get selected() {
    return s(c(this, es));
  }
  set selected(e) {
    b(c(this, es), e, !0);
  }
  get catalog() {
    return s(c(this, ts));
  }
  set catalog(e) {
    b(c(this, ts), e, !0);
  }
  get patterns() {
    return s(c(this, ns));
  }
  set patterns(e) {
    b(c(this, ns), e, !0);
  }
  get loadError() {
    return s(c(this, rs));
  }
  set loadError(e) {
    b(c(this, rs), e, !0);
  }
  get open() {
    return s(c(this, ss));
  }
  set open(e) {
    b(c(this, ss), e, !0);
  }
  get dirty() {
    return s(c(this, is));
  }
  set dirty(e) {
    b(c(this, is), e, !0);
  }
  get toast() {
    return s(c(this, as));
  }
  set toast(e) {
    b(c(this, as), e, !0);
  }
  get dragType() {
    return s(c(this, ls));
  }
  set dragType(e) {
    b(c(this, ls), e, !0);
  }
  get busy() {
    return s(c(this, os));
  }
  set busy(e) {
    b(c(this, os), e, !0);
  }
  get pendingInsert() {
    return s(c(this, cs));
  }
  set pendingInsert(e) {
    b(c(this, cs), e, !0);
  }
  get canUndo() {
    return s(c(this, us));
  }
  set canUndo(e) {
    b(c(this, us), e, !0);
  }
  get canRedo() {
    return s(c(this, ds));
  }
  set canRedo(e) {
    b(c(this, ds), e, !0);
  }
  get palette() {
    return s(c(this, fs));
  }
  set palette(e) {
    b(c(this, fs), e, !0);
  }
  get mediaUrls() {
    return s(c(this, vs));
  }
  set mediaUrls(e) {
    b(c(this, vs), e, !0);
  }
  get context() {
    return s(c(this, hs));
  }
  set context(e) {
    b(c(this, hs), e, !0);
  }
  get sections() {
    return s(c(this, ps));
  }
  set sections(e) {
    b(c(this, ps), e, !0);
  }
  get editingSection() {
    return s(c(this, gs));
  }
  set editingSection(e) {
    b(c(this, gs), e, !0);
  }
  get sectionDirty() {
    return s(c(this, bs));
  }
  set sectionDirty(e) {
    b(c(this, bs), e, !0);
  }
  get inlineEditing() {
    return s(c(this, _s));
  }
  set inlineEditing(e) {
    b(c(this, _s), e, !0);
  }
  get revisionTick() {
    return s(c(this, ms));
  }
  set revisionTick(e) {
    b(c(this, ms), e, !0);
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
    return ((e = this.catalog) == null ? void 0 : e.settingKeys) || Pl;
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
      const e = await at.ownMedia(this.context), n = Array.isArray(e) ? e : (e == null ? void 0 : e.items) || (e == null ? void 0 : e.files) || [];
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
          at.blocks(),
          at.patterns().catch(() => []),
          at.sections().catch(() => [])
        ]);
        this.catalog = e, this.patterns = n || [], this.sections = r || [], this.blocks = Pr(On(this.blocks), this.settingKeys), this.canPreview && this.loadOwnMedia();
      } catch (e) {
        this.loadError = e.message || String(e);
      }
    })(), this.loading);
  }
  /** Value pushed in by Admin2. Ignored if it's the value we just emitted. */
  setValue(e) {
    const n = Pr(e, this.settingKeys);
    JSON.stringify(n) !== JSON.stringify(On(this.blocks)) && (this.blocks = n, this.selected >= n.length && (this.selected = n.length - 1));
  }
  snapshot() {
    return On(this.blocks);
  }
  // ─── inline editing ──────────────────────────────────────
  /**
   * Text typed on the canvas: set `path` (e.g. "items.2.title") inside block[index]'s content.
   * The preview already shows the text, so the canvas is told not to re-render for it.
   */
  /** Read a content field by path ("items.2.answer") from block[index]. */
  getPath(e, n) {
    const r = this.blocks[e];
    let i = r && r[r.type];
    for (const a of String(n).split(".")) {
      if (i == null) return;
      i = i[/^\d+$/.test(a) ? Number(a) : a];
    }
    return i;
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
    const o = this.blocks[e];
    if (!o) return;
    const u = se(this, We, Dl).call(this, o.type, n), p = l || "item", h = p.charAt(0).toUpperCase() + p.slice(1), M = () => {
      (!o[o.type] || typeof o[o.type] != "object") && (o[o.type] = {});
      let f = o[o.type];
      const _ = String(n).split(".");
      for (let w = 0; w < _.length - 1; w++) {
        const v = /^\d+$/.test(_[w]) ? Number(_[w]) : _[w];
        (f[v] == null || typeof f[v] != "object") && (f[v] = {}), f = f[v];
      }
      const E = _.at(-1);
      return Array.isArray(f[E]) || (f[E] = []), f[E];
    };
    if (this.selected = e, r === "add") {
      const f = Nl(u, p), _ = ((u == null ? void 0 : u.fields) || []).find((v) => v.type === "text" && /(^|_)url$/.test(v.name) === !1) || ((u == null ? void 0 : u.fields) || []).find((v) => ["textarea", "markdown"].includes(v.type));
      let E = 0;
      this.mutate(
        () => {
          const v = M();
          v.push(f), E = v.length - 1;
        },
        `Adding ${p}…`
      );
      const w = _ == null ? void 0 : _.name;
      w && (this.pendingFocus = { index: e, path: `${n}.${E}.${w}` });
    } else r === "duplicate" ? this.mutate(
      () => {
        const f = M();
        f[i] !== void 0 && f.splice(i + 1, 0, JSON.parse(JSON.stringify(On(f[i]))));
      },
      `Duplicating ${p}…`
    ) : r === "remove" ? (this.mutate(
      () => {
        const f = M();
        f[i] !== void 0 && f.splice(i, 1);
      },
      `Removing ${p}…`
    ), this.flash(`${h} removed. Ctrl+Z to undo.`)) : r === "move" && this.mutate(
      () => {
        const f = M();
        if (a < 0 || a >= f.length || f[i] === void 0) return;
        const [_] = f.splice(i, 1);
        f.splice(a, 0, _);
      },
      `Moving ${p}…`
    );
  }
  get imagePick() {
    return s(c(this, ys));
  }
  set imagePick(e) {
    b(c(this, ys), e, !0);
  }
  replaceImage(e) {
    const n = this.imagePick;
    this.imagePick = null, !(!n || !e) && (this.selected = n.index, this.inlineSetMarkdown(n.index, n.path, e, "Replacing image…"));
  }
  inlineSet(e, n, r) {
    const i = this.blocks[e];
    if (!i || typeof n != "string") return;
    (!i[i.type] || typeof i[i.type] != "object") && (i[i.type] = {});
    const a = n.split(".");
    let l = i[i.type];
    for (let u = 0; u < a.length - 1; u++) {
      const p = /^\d+$/.test(a[u]) ? Number(a[u]) : a[u];
      (l[p] == null || typeof l[p] != "object") && (l[p] = /^\d+$/.test(a[u + 1]) ? [] : {}), l = l[p];
    }
    const o = /^\d+$/.test(a.at(-1)) ? Number(a.at(-1)) : a.at(-1);
    (l[o] ?? "") !== r && (this.beginEdit(), l[o] = r, this.busy = "", this.renderedPayload = JSON.stringify(this.snapshot()), this.endEdit());
  }
  // ─── global sections ─────────────────────────────────────
  sectionTitle(e) {
    var n;
    return ((n = this.sections.find((r) => r.id === e)) == null ? void 0 : n.title) || e || "Global section";
  }
  async refreshSections() {
    this.sections = await at.sections().catch(() => this.sections) || [];
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
    const a = await at.createSection(n, i);
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
    const i = await at.section(r), a = Pr(JSON.parse(JSON.stringify(i.blocks || [])), this.settingKeys);
    this.mutate((o) => o.splice(e, 1, ...a), "Detaching section…"), this.selected = e;
  }
  /** Open a global section in the builder. The page's blocks, selection and undo history are restored on close. */
  async openSection(e) {
    this.isSection && await this.closeSection();
    const n = await at.section(e);
    V(this, _r, {
      context: On(this.context),
      blocks: this.snapshot(),
      selected: this.selected,
      past: c(this, Tt),
      future: c(this, Gt)
    }), V(this, Tt, []), V(this, Gt, []), se(this, We, sr).call(this), this.renderedPayload = "", this.context = { kind: "section", id: e }, this.editingSection = { id: e, title: n.title, usage: n.usage || [] }, this.blocks = Pr(n.blocks || [], this.settingKeys), this.selected = -1, this.sectionDirty = !1, this.busy = `Opening ${n.title}…`;
  }
  closeSection() {
    const e = c(this, _r);
    e && (V(this, _r, null), this.renderedPayload = "", this.context = e.context, this.editingSection = null, this.sectionDirty = !1, this.blocks = e.blocks, this.selected = e.selected, V(this, Tt, e.past), V(this, Gt, e.future), se(this, We, sr).call(this), this.busy = "Back to page…");
  }
  async saveSection() {
    if (!this.isSection) return;
    const e = await at.updateSection(this.context.id, { blocks: this.snapshot() });
    this.sectionDirty = !1, this.editingSection = { ...this.editingSection, title: e.title }, await this.refreshSections(), this.revisionTick++, this.flash(`Global section “${e.title}” saved. It updates everywhere it's used.`);
  }
  /** Structural change: record history immediately. */
  mutate(e, n = "Updating page…") {
    this.busy = n, se(this, We, Fs).call(this), se(this, We, Oi).call(this), e(this.blocks), se(this, We, Ir).call(this);
  }
  /** Field edits: one history entry per burst of typing. Call BEFORE applying the change. */
  beginEdit() {
    this.busy = "Updating preview…", c(this, Gn) || (se(this, We, Oi).call(this), V(this, Gn, !0)), clearTimeout(c(this, br)), V(this, br, setTimeout(() => V(this, Gn, !1), 700));
  }
  endEdit() {
    se(this, We, Ir).call(this);
  }
  undo() {
    se(this, We, Fs).call(this), c(this, Tt).length && (this.busy = "Undoing…", c(this, Gt).push(JSON.stringify(this.snapshot())), this.blocks = JSON.parse(c(this, Tt).pop()), this.selected >= this.blocks.length && (this.selected = this.blocks.length - 1), se(this, We, sr).call(this), se(this, We, Ir).call(this));
  }
  redo() {
    se(this, We, Fs).call(this), c(this, Gt).length && (this.busy = "Redoing…", c(this, Tt).push(JSON.stringify(this.snapshot())), this.blocks = JSON.parse(c(this, Gt).pop()), this.selected >= this.blocks.length && (this.selected = this.blocks.length - 1), se(this, We, sr).call(this), se(this, We, Ir).call(this));
  }
  // ─── operations ──────────────────────────────────────────
  insert(e, n = null) {
    const r = this.defFor(e);
    if (!r) return;
    const i = n ?? (this.selected >= 0 ? this.selected + 1 : this.blocks.length);
    this.pendingInsert = { index: i, title: r.title }, this.mutate((a) => a.splice(i, 0, Ma(r)), `Adding ${r.title}…`), this.selected = i;
  }
  insertMany(e, n = null, r = !1) {
    var l;
    const i = Pr(JSON.parse(JSON.stringify(e)), this.settingKeys).filter((o) => this.defFor(o.type));
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
    n && (this.mutate((r) => r.splice(e + 1, 0, Wc(On(n))), "Duplicating block…"), this.selected = e + 1);
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
        const l = Ma(r);
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
    const i = r.map((l) => this.snapshot()[l]).filter(Boolean), a = await at.savePattern({ title: e, category: n, blocks: i });
    return this.patterns = [...this.patterns, a], a;
  }
  async deletePattern(e) {
    await at.deletePattern(e), this.patterns = this.patterns.filter((n) => n.id !== e);
  }
}
$r = new WeakMap(), es = new WeakMap(), ts = new WeakMap(), ns = new WeakMap(), rs = new WeakMap(), ss = new WeakMap(), is = new WeakMap(), as = new WeakMap(), ls = new WeakMap(), os = new WeakMap(), cs = new WeakMap(), Tt = new WeakMap(), Gt = new WeakMap(), br = new WeakMap(), Gn = new WeakMap(), us = new WeakMap(), ds = new WeakMap(), fs = new WeakMap(), vs = new WeakMap(), hs = new WeakMap(), ps = new WeakMap(), gs = new WeakMap(), bs = new WeakMap(), _s = new WeakMap(), ms = new WeakMap(), _r = new WeakMap(), We = new WeakSet(), // ─── history ─────────────────────────────────────────────
Oi = function() {
  c(this, Tt).push(JSON.stringify(this.snapshot())), c(this, Tt).length > Nf && c(this, Tt).shift(), V(this, Gt, []), se(this, We, sr).call(this);
}, sr = function() {
  this.canUndo = c(this, Tt).length > 0, this.canRedo = c(this, Gt).length > 0;
}, Ir = function() {
  var e;
  if (this.isSection) {
    this.sectionDirty = !0;
    return;
  }
  this.dirty = !0, (e = this.onChange) == null || e.call(this, this.snapshot());
}, /** Find a field definition by content path in a block's schema ("items" → the list field). */
Dl = function(e, n) {
  var a;
  let r = ((a = this.defFor(e)) == null ? void 0 : a.fields) || [], i = null;
  for (const l of String(n).split("."))
    if (!/^\d+$/.test(l)) {
      if (i = r.find((o) => o.name === l) || null, !i) return null;
      r = i.fields || [];
    }
  return i;
}, ys = new WeakMap(), Fs = function() {
  clearTimeout(c(this, br)), V(this, Gn, !1);
};
const Rf = "__MAW_CSS__", Na = window.__GRAV_FIELD_TAG || "grav-maw-builder--blocks";
function Oa() {
  const t = document.createElement("style");
  return t.textContent = Rf, t;
}
var Bn, Sn, ks, gt, Vn, dn, En, jt, Ri, Ll, Il, Di;
class Df extends HTMLElement {
  constructor() {
    super(...arguments);
    I(this, jt);
    I(this, Bn, null);
    I(this, Sn, []);
    I(this, ks, null);
    I(this, gt, null);
    I(this, Vn, null);
    I(this, dn, null);
    I(this, En, null);
  }
  set field(n) {
    V(this, Bn, n), c(this, gt) && (c(this, gt).fieldName = se(this, jt, Ri).call(this));
  }
  get field() {
    return c(this, Bn);
  }
  set value(n) {
    var i;
    JSON.stringify(n ?? []) !== c(this, ks) && (V(this, Sn, Array.isArray(n) ? n : []), (i = c(this, gt)) == null || i.setValue(c(this, Sn)));
  }
  get value() {
    return c(this, Sn);
  }
  connectedCallback() {
    if (c(this, gt)) return;
    const n = this.shadowRoot || this.attachShadow({ mode: "open" });
    n.appendChild(Oa()), V(this, gt, new Of({
      context: Xc(),
      fieldName: se(this, jt, Ri).call(this),
      onChange: (i) => se(this, jt, Ll).call(this, i)
    })), c(this, gt).setValue(c(this, Sn)), c(this, gt).load();
    const r = document.createElement("div");
    n.appendChild(r), V(this, Vn, ga(su, {
      target: r,
      props: { store: c(this, gt), field: c(this, Bn), openBuilder: (i) => se(this, jt, Il).call(this, i) }
    }));
  }
  disconnectedCallback() {
    queueMicrotask(() => {
      this.isConnected || (se(this, jt, Di).call(this), c(this, Vn) && ba(c(this, Vn)), V(this, Vn, null), V(this, gt, null), this.shadowRoot && (this.shadowRoot.innerHTML = ""));
    });
  }
}
Bn = new WeakMap(), Sn = new WeakMap(), ks = new WeakMap(), gt = new WeakMap(), Vn = new WeakMap(), dn = new WeakMap(), En = new WeakMap(), jt = new WeakSet(), Ri = function() {
  var r;
  return String(((r = c(this, Bn)) == null ? void 0 : r.name) || "header.blocks").replace(/^header\./, "") === "blocks_after" ? "blocks_after" : "blocks";
}, Ll = function(n) {
  V(this, Sn, n), V(this, ks, JSON.stringify(n)), this.dispatchEvent(new CustomEvent("change", { detail: n, bubbles: !0 }));
}, /** The builder mounts on <body> so no admin layout (overflow, transforms) can clip the full-screen overlay. */
Il = function(n = -1) {
  if (c(this, En)) return;
  const r = c(this, gt);
  r.selected = n, r.open = !0, V(this, dn, document.createElement("maw-builder-host")), c(this, dn).style.cssText = "position:fixed;inset:0;z-index:2147483000;display:block;";
  const i = c(this, dn).attachShadow({ mode: "open" });
  i.appendChild(Oa());
  const a = document.createElement("div");
  a.className = "maw-root", i.appendChild(a), document.body.appendChild(c(this, dn)), document.documentElement.style.overflow = "hidden", V(this, En, ga(zf, {
    target: a,
    props: { store: r, close: () => se(this, jt, Di).call(this) }
  }));
}, Di = function() {
  var n;
  c(this, En) && ba(c(this, En)), V(this, En, null), (n = c(this, dn)) == null || n.remove(), V(this, dn, null), document.documentElement.style.overflow = "", c(this, gt) && (c(this, gt).open = !1);
};
customElements.get(Na) || customElements.define(Na, Df);
