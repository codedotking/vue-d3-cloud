import { getCurrentScope as Ci, onScopeDispose as Ni, onMounted as On, nextTick as Er, unref as $i, getCurrentInstance as Ar, computed as Ke, watch as En, ref as se, reactive as Mi, toRaw as ki, openBlock as Ri, createElementBlock as Li, normalizeStyle as Pi } from "vue";
var z = "top", Z = "bottom", tt = "right", U = "left", An = "auto", ve = [z, Z, tt, U], Ht = "start", ue = "end", Ii = "clippingParents", Tr = "viewport", Qt = "popper", Bi = "reference", Hn = /* @__PURE__ */ ve.reduce(function(t, e) {
  return t.concat([e + "-" + Ht, e + "-" + ue]);
}, []), Sr = /* @__PURE__ */ [].concat(ve, [An]).reduce(function(t, e) {
  return t.concat([e, e + "-" + Ht, e + "-" + ue]);
}, []), Vi = "beforeRead", Hi = "read", Fi = "afterRead", Wi = "beforeMain", qi = "main", zi = "afterMain", Ui = "beforeWrite", Xi = "write", Yi = "afterWrite", ji = [Vi, Hi, Fi, Wi, qi, zi, Ui, Xi, Yi];
function ft(t) {
  return t ? (t.nodeName || "").toLowerCase() : null;
}
function Y(t) {
  if (t == null)
    return window;
  if (t.toString() !== "[object Window]") {
    var e = t.ownerDocument;
    return e && e.defaultView || window;
  }
  return t;
}
function Ct(t) {
  var e = Y(t).Element;
  return t instanceof e || t instanceof Element;
}
function Q(t) {
  var e = Y(t).HTMLElement;
  return t instanceof e || t instanceof HTMLElement;
}
function Tn(t) {
  if (typeof ShadowRoot > "u")
    return !1;
  var e = Y(t).ShadowRoot;
  return t instanceof e || t instanceof ShadowRoot;
}
function Gi(t) {
  var e = t.state;
  Object.keys(e.elements).forEach(function(n) {
    var r = e.styles[n] || {}, i = e.attributes[n] || {}, o = e.elements[n];
    !Q(o) || !ft(o) || (Object.assign(o.style, r), Object.keys(i).forEach(function(a) {
      var s = i[a];
      s === !1 ? o.removeAttribute(a) : o.setAttribute(a, s === !0 ? "" : s);
    }));
  });
}
function Ki(t) {
  var e = t.state, n = {
    popper: {
      position: e.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  return Object.assign(e.elements.popper.style, n.popper), e.styles = n, e.elements.arrow && Object.assign(e.elements.arrow.style, n.arrow), function() {
    Object.keys(e.elements).forEach(function(r) {
      var i = e.elements[r], o = e.attributes[r] || {}, a = Object.keys(e.styles.hasOwnProperty(r) ? e.styles[r] : n[r]), s = a.reduce(function(u, c) {
        return u[c] = "", u;
      }, {});
      !Q(i) || !ft(i) || (Object.assign(i.style, s), Object.keys(o).forEach(function(u) {
        i.removeAttribute(u);
      }));
    });
  };
}
const Dr = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: Gi,
  effect: Ki,
  requires: ["computeStyles"]
};
function st(t) {
  return t.split("-")[0];
}
var St = Math.max, We = Math.min, Ft = Math.round;
function ln() {
  var t = navigator.userAgentData;
  return t != null && t.brands && Array.isArray(t.brands) ? t.brands.map(function(e) {
    return e.brand + "/" + e.version;
  }).join(" ") : navigator.userAgent;
}
function Cr() {
  return !/^((?!chrome|android).)*safari/i.test(ln());
}
function Wt(t, e, n) {
  e === void 0 && (e = !1), n === void 0 && (n = !1);
  var r = t.getBoundingClientRect(), i = 1, o = 1;
  e && Q(t) && (i = t.offsetWidth > 0 && Ft(r.width) / t.offsetWidth || 1, o = t.offsetHeight > 0 && Ft(r.height) / t.offsetHeight || 1);
  var a = Ct(t) ? Y(t) : window, s = a.visualViewport, u = !Cr() && n, c = (r.left + (u && s ? s.offsetLeft : 0)) / i, f = (r.top + (u && s ? s.offsetTop : 0)) / o, p = r.width / i, d = r.height / o;
  return {
    width: p,
    height: d,
    top: f,
    right: c + p,
    bottom: f + d,
    left: c,
    x: c,
    y: f
  };
}
function Sn(t) {
  var e = Wt(t), n = t.offsetWidth, r = t.offsetHeight;
  return Math.abs(e.width - n) <= 1 && (n = e.width), Math.abs(e.height - r) <= 1 && (r = e.height), {
    x: t.offsetLeft,
    y: t.offsetTop,
    width: n,
    height: r
  };
}
function Nr(t, e) {
  var n = e.getRootNode && e.getRootNode();
  if (t.contains(e))
    return !0;
  if (n && Tn(n)) {
    var r = e;
    do {
      if (r && t.isSameNode(r))
        return !0;
      r = r.parentNode || r.host;
    } while (r);
  }
  return !1;
}
function mt(t) {
  return Y(t).getComputedStyle(t);
}
function Ji(t) {
  return ["table", "td", "th"].indexOf(ft(t)) >= 0;
}
function _t(t) {
  return ((Ct(t) ? t.ownerDocument : (
    // $FlowFixMe[prop-missing]
    t.document
  )) || window.document).documentElement;
}
function Je(t) {
  return ft(t) === "html" ? t : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    t.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    t.parentNode || // DOM Element detected
    (Tn(t) ? t.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    _t(t)
  );
}
function Fn(t) {
  return !Q(t) || // https://github.com/popperjs/popper-core/issues/837
  mt(t).position === "fixed" ? null : t.offsetParent;
}
function Qi(t) {
  var e = /firefox/i.test(ln()), n = /Trident/i.test(ln());
  if (n && Q(t)) {
    var r = mt(t);
    if (r.position === "fixed")
      return null;
  }
  var i = Je(t);
  for (Tn(i) && (i = i.host); Q(i) && ["html", "body"].indexOf(ft(i)) < 0; ) {
    var o = mt(i);
    if (o.transform !== "none" || o.perspective !== "none" || o.contain === "paint" || ["transform", "perspective"].indexOf(o.willChange) !== -1 || e && o.willChange === "filter" || e && o.filter && o.filter !== "none")
      return i;
    i = i.parentNode;
  }
  return null;
}
function me(t) {
  for (var e = Y(t), n = Fn(t); n && Ji(n) && mt(n).position === "static"; )
    n = Fn(n);
  return n && (ft(n) === "html" || ft(n) === "body" && mt(n).position === "static") ? e : n || Qi(t) || e;
}
function Dn(t) {
  return ["top", "bottom"].indexOf(t) >= 0 ? "x" : "y";
}
function ie(t, e, n) {
  return St(t, We(e, n));
}
function Zi(t, e, n) {
  var r = ie(t, e, n);
  return r > n ? n : r;
}
function $r() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function Mr(t) {
  return Object.assign({}, $r(), t);
}
function kr(t, e) {
  return e.reduce(function(n, r) {
    return n[r] = t, n;
  }, {});
}
var to = function(e, n) {
  return e = typeof e == "function" ? e(Object.assign({}, n.rects, {
    placement: n.placement
  })) : e, Mr(typeof e != "number" ? e : kr(e, ve));
};
function eo(t) {
  var e, n = t.state, r = t.name, i = t.options, o = n.elements.arrow, a = n.modifiersData.popperOffsets, s = st(n.placement), u = Dn(s), c = [U, tt].indexOf(s) >= 0, f = c ? "height" : "width";
  if (!(!o || !a)) {
    var p = to(i.padding, n), d = Sn(o), v = u === "y" ? z : U, m = u === "y" ? Z : tt, w = n.rects.reference[f] + n.rects.reference[u] - a[u] - n.rects.popper[f], E = a[u] - n.rects.reference[u], D = me(o), g = D ? u === "y" ? D.clientHeight || 0 : D.clientWidth || 0 : 0, x = w / 2 - E / 2, l = p[v], O = g - d[f] - p[m], y = g / 2 - d[f] / 2 + x, C = ie(l, y, O), $ = u;
    n.modifiersData[r] = (e = {}, e[$] = C, e.centerOffset = C - y, e);
  }
}
function no(t) {
  var e = t.state, n = t.options, r = n.element, i = r === void 0 ? "[data-popper-arrow]" : r;
  i != null && (typeof i == "string" && (i = e.elements.popper.querySelector(i), !i) || Nr(e.elements.popper, i) && (e.elements.arrow = i));
}
const ro = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: eo,
  effect: no,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function qt(t) {
  return t.split("-")[1];
}
var io = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function oo(t, e) {
  var n = t.x, r = t.y, i = e.devicePixelRatio || 1;
  return {
    x: Ft(n * i) / i || 0,
    y: Ft(r * i) / i || 0
  };
}
function Wn(t) {
  var e, n = t.popper, r = t.popperRect, i = t.placement, o = t.variation, a = t.offsets, s = t.position, u = t.gpuAcceleration, c = t.adaptive, f = t.roundOffsets, p = t.isFixed, d = a.x, v = d === void 0 ? 0 : d, m = a.y, w = m === void 0 ? 0 : m, E = typeof f == "function" ? f({
    x: v,
    y: w
  }) : {
    x: v,
    y: w
  };
  v = E.x, w = E.y;
  var D = a.hasOwnProperty("x"), g = a.hasOwnProperty("y"), x = U, l = z, O = window;
  if (c) {
    var y = me(n), C = "clientHeight", $ = "clientWidth";
    if (y === Y(n) && (y = _t(n), mt(y).position !== "static" && s === "absolute" && (C = "scrollHeight", $ = "scrollWidth")), y = y, i === z || (i === U || i === tt) && o === ue) {
      l = Z;
      var R = p && y === O && O.visualViewport ? O.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        y[C]
      );
      w -= R - r.height, w *= u ? 1 : -1;
    }
    if (i === U || (i === z || i === Z) && o === ue) {
      x = tt;
      var A = p && y === O && O.visualViewport ? O.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        y[$]
      );
      v -= A - r.width, v *= u ? 1 : -1;
    }
  }
  var _ = Object.assign({
    position: s
  }, c && io), M = f === !0 ? oo({
    x: v,
    y: w
  }, Y(n)) : {
    x: v,
    y: w
  };
  if (v = M.x, w = M.y, u) {
    var S;
    return Object.assign({}, _, (S = {}, S[l] = g ? "0" : "", S[x] = D ? "0" : "", S.transform = (O.devicePixelRatio || 1) <= 1 ? "translate(" + v + "px, " + w + "px)" : "translate3d(" + v + "px, " + w + "px, 0)", S));
  }
  return Object.assign({}, _, (e = {}, e[l] = g ? w + "px" : "", e[x] = D ? v + "px" : "", e.transform = "", e));
}
function ao(t) {
  var e = t.state, n = t.options, r = n.gpuAcceleration, i = r === void 0 ? !0 : r, o = n.adaptive, a = o === void 0 ? !0 : o, s = n.roundOffsets, u = s === void 0 ? !0 : s, c = {
    placement: st(e.placement),
    variation: qt(e.placement),
    popper: e.elements.popper,
    popperRect: e.rects.popper,
    gpuAcceleration: i,
    isFixed: e.options.strategy === "fixed"
  };
  e.modifiersData.popperOffsets != null && (e.styles.popper = Object.assign({}, e.styles.popper, Wn(Object.assign({}, c, {
    offsets: e.modifiersData.popperOffsets,
    position: e.options.strategy,
    adaptive: a,
    roundOffsets: u
  })))), e.modifiersData.arrow != null && (e.styles.arrow = Object.assign({}, e.styles.arrow, Wn(Object.assign({}, c, {
    offsets: e.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: u
  })))), e.attributes.popper = Object.assign({}, e.attributes.popper, {
    "data-popper-placement": e.placement
  });
}
const so = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: ao,
  data: {}
};
var $e = {
  passive: !0
};
function uo(t) {
  var e = t.state, n = t.instance, r = t.options, i = r.scroll, o = i === void 0 ? !0 : i, a = r.resize, s = a === void 0 ? !0 : a, u = Y(e.elements.popper), c = [].concat(e.scrollParents.reference, e.scrollParents.popper);
  return o && c.forEach(function(f) {
    f.addEventListener("scroll", n.update, $e);
  }), s && u.addEventListener("resize", n.update, $e), function() {
    o && c.forEach(function(f) {
      f.removeEventListener("scroll", n.update, $e);
    }), s && u.removeEventListener("resize", n.update, $e);
  };
}
const fo = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: uo,
  data: {}
};
var co = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function Pe(t) {
  return t.replace(/left|right|bottom|top/g, function(e) {
    return co[e];
  });
}
var lo = {
  start: "end",
  end: "start"
};
function qn(t) {
  return t.replace(/start|end/g, function(e) {
    return lo[e];
  });
}
function Cn(t) {
  var e = Y(t), n = e.pageXOffset, r = e.pageYOffset;
  return {
    scrollLeft: n,
    scrollTop: r
  };
}
function Nn(t) {
  return Wt(_t(t)).left + Cn(t).scrollLeft;
}
function po(t, e) {
  var n = Y(t), r = _t(t), i = n.visualViewport, o = r.clientWidth, a = r.clientHeight, s = 0, u = 0;
  if (i) {
    o = i.width, a = i.height;
    var c = Cr();
    (c || !c && e === "fixed") && (s = i.offsetLeft, u = i.offsetTop);
  }
  return {
    width: o,
    height: a,
    x: s + Nn(t),
    y: u
  };
}
function ho(t) {
  var e, n = _t(t), r = Cn(t), i = (e = t.ownerDocument) == null ? void 0 : e.body, o = St(n.scrollWidth, n.clientWidth, i ? i.scrollWidth : 0, i ? i.clientWidth : 0), a = St(n.scrollHeight, n.clientHeight, i ? i.scrollHeight : 0, i ? i.clientHeight : 0), s = -r.scrollLeft + Nn(t), u = -r.scrollTop;
  return mt(i || n).direction === "rtl" && (s += St(n.clientWidth, i ? i.clientWidth : 0) - o), {
    width: o,
    height: a,
    x: s,
    y: u
  };
}
function $n(t) {
  var e = mt(t), n = e.overflow, r = e.overflowX, i = e.overflowY;
  return /auto|scroll|overlay|hidden/.test(n + i + r);
}
function Rr(t) {
  return ["html", "body", "#document"].indexOf(ft(t)) >= 0 ? t.ownerDocument.body : Q(t) && $n(t) ? t : Rr(Je(t));
}
function oe(t, e) {
  var n;
  e === void 0 && (e = []);
  var r = Rr(t), i = r === ((n = t.ownerDocument) == null ? void 0 : n.body), o = Y(r), a = i ? [o].concat(o.visualViewport || [], $n(r) ? r : []) : r, s = e.concat(a);
  return i ? s : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    s.concat(oe(Je(a)))
  );
}
function pn(t) {
  return Object.assign({}, t, {
    left: t.x,
    top: t.y,
    right: t.x + t.width,
    bottom: t.y + t.height
  });
}
function vo(t, e) {
  var n = Wt(t, !1, e === "fixed");
  return n.top = n.top + t.clientTop, n.left = n.left + t.clientLeft, n.bottom = n.top + t.clientHeight, n.right = n.left + t.clientWidth, n.width = t.clientWidth, n.height = t.clientHeight, n.x = n.left, n.y = n.top, n;
}
function zn(t, e, n) {
  return e === Tr ? pn(po(t, n)) : Ct(e) ? vo(e, n) : pn(ho(_t(t)));
}
function mo(t) {
  var e = oe(Je(t)), n = ["absolute", "fixed"].indexOf(mt(t).position) >= 0, r = n && Q(t) ? me(t) : t;
  return Ct(r) ? e.filter(function(i) {
    return Ct(i) && Nr(i, r) && ft(i) !== "body";
  }) : [];
}
function go(t, e, n, r) {
  var i = e === "clippingParents" ? mo(t) : [].concat(e), o = [].concat(i, [n]), a = o[0], s = o.reduce(function(u, c) {
    var f = zn(t, c, r);
    return u.top = St(f.top, u.top), u.right = We(f.right, u.right), u.bottom = We(f.bottom, u.bottom), u.left = St(f.left, u.left), u;
  }, zn(t, a, r));
  return s.width = s.right - s.left, s.height = s.bottom - s.top, s.x = s.left, s.y = s.top, s;
}
function Lr(t) {
  var e = t.reference, n = t.element, r = t.placement, i = r ? st(r) : null, o = r ? qt(r) : null, a = e.x + e.width / 2 - n.width / 2, s = e.y + e.height / 2 - n.height / 2, u;
  switch (i) {
    case z:
      u = {
        x: a,
        y: e.y - n.height
      };
      break;
    case Z:
      u = {
        x: a,
        y: e.y + e.height
      };
      break;
    case tt:
      u = {
        x: e.x + e.width,
        y: s
      };
      break;
    case U:
      u = {
        x: e.x - n.width,
        y: s
      };
      break;
    default:
      u = {
        x: e.x,
        y: e.y
      };
  }
  var c = i ? Dn(i) : null;
  if (c != null) {
    var f = c === "y" ? "height" : "width";
    switch (o) {
      case Ht:
        u[c] = u[c] - (e[f] / 2 - n[f] / 2);
        break;
      case ue:
        u[c] = u[c] + (e[f] / 2 - n[f] / 2);
        break;
    }
  }
  return u;
}
function fe(t, e) {
  e === void 0 && (e = {});
  var n = e, r = n.placement, i = r === void 0 ? t.placement : r, o = n.strategy, a = o === void 0 ? t.strategy : o, s = n.boundary, u = s === void 0 ? Ii : s, c = n.rootBoundary, f = c === void 0 ? Tr : c, p = n.elementContext, d = p === void 0 ? Qt : p, v = n.altBoundary, m = v === void 0 ? !1 : v, w = n.padding, E = w === void 0 ? 0 : w, D = Mr(typeof E != "number" ? E : kr(E, ve)), g = d === Qt ? Bi : Qt, x = t.rects.popper, l = t.elements[m ? g : d], O = go(Ct(l) ? l : l.contextElement || _t(t.elements.popper), u, f, a), y = Wt(t.elements.reference), C = Lr({
    reference: y,
    element: x,
    strategy: "absolute",
    placement: i
  }), $ = pn(Object.assign({}, x, C)), R = d === Qt ? $ : y, A = {
    top: O.top - R.top + D.top,
    bottom: R.bottom - O.bottom + D.bottom,
    left: O.left - R.left + D.left,
    right: R.right - O.right + D.right
  }, _ = t.modifiersData.offset;
  if (d === Qt && _) {
    var M = _[i];
    Object.keys(A).forEach(function(S) {
      var L = [tt, Z].indexOf(S) >= 0 ? 1 : -1, V = [z, Z].indexOf(S) >= 0 ? "y" : "x";
      A[S] += M[V] * L;
    });
  }
  return A;
}
function yo(t, e) {
  e === void 0 && (e = {});
  var n = e, r = n.placement, i = n.boundary, o = n.rootBoundary, a = n.padding, s = n.flipVariations, u = n.allowedAutoPlacements, c = u === void 0 ? Sr : u, f = qt(r), p = f ? s ? Hn : Hn.filter(function(m) {
    return qt(m) === f;
  }) : ve, d = p.filter(function(m) {
    return c.indexOf(m) >= 0;
  });
  d.length === 0 && (d = p);
  var v = d.reduce(function(m, w) {
    return m[w] = fe(t, {
      placement: w,
      boundary: i,
      rootBoundary: o,
      padding: a
    })[st(w)], m;
  }, {});
  return Object.keys(v).sort(function(m, w) {
    return v[m] - v[w];
  });
}
function wo(t) {
  if (st(t) === An)
    return [];
  var e = Pe(t);
  return [qn(t), e, qn(e)];
}
function xo(t) {
  var e = t.state, n = t.options, r = t.name;
  if (!e.modifiersData[r]._skip) {
    for (var i = n.mainAxis, o = i === void 0 ? !0 : i, a = n.altAxis, s = a === void 0 ? !0 : a, u = n.fallbackPlacements, c = n.padding, f = n.boundary, p = n.rootBoundary, d = n.altBoundary, v = n.flipVariations, m = v === void 0 ? !0 : v, w = n.allowedAutoPlacements, E = e.options.placement, D = st(E), g = D === E, x = u || (g || !m ? [Pe(E)] : wo(E)), l = [E].concat(x).reduce(function(H, nt) {
      return H.concat(st(nt) === An ? yo(e, {
        placement: nt,
        boundary: f,
        rootBoundary: p,
        padding: c,
        flipVariations: m,
        allowedAutoPlacements: w
      }) : nt);
    }, []), O = e.rects.reference, y = e.rects.popper, C = /* @__PURE__ */ new Map(), $ = !0, R = l[0], A = 0; A < l.length; A++) {
      var _ = l[A], M = st(_), S = qt(_) === Ht, L = [z, Z].indexOf(M) >= 0, V = L ? "width" : "height", I = fe(e, {
        placement: _,
        boundary: f,
        rootBoundary: p,
        altBoundary: d,
        padding: c
      }), B = L ? S ? tt : U : S ? Z : z;
      O[V] > y[V] && (B = Pe(B));
      var P = Pe(B), G = [];
      if (o && G.push(I[M] <= 0), s && G.push(I[B] <= 0, I[P] <= 0), G.every(function(H) {
        return H;
      })) {
        R = _, $ = !1;
        break;
      }
      C.set(_, G);
    }
    if ($)
      for (var K = m ? 3 : 1, ot = function(nt) {
        var lt = l.find(function($t) {
          var pt = C.get($t);
          if (pt)
            return pt.slice(0, nt).every(function(Mt) {
              return Mt;
            });
        });
        if (lt)
          return R = lt, "break";
      }, W = K; W > 0; W--) {
        var et = ot(W);
        if (et === "break")
          break;
      }
    e.placement !== R && (e.modifiersData[r]._skip = !0, e.placement = R, e.reset = !0);
  }
}
const bo = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: xo,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function Un(t, e, n) {
  return n === void 0 && (n = {
    x: 0,
    y: 0
  }), {
    top: t.top - e.height - n.y,
    right: t.right - e.width + n.x,
    bottom: t.bottom - e.height + n.y,
    left: t.left - e.width - n.x
  };
}
function Xn(t) {
  return [z, tt, Z, U].some(function(e) {
    return t[e] >= 0;
  });
}
function _o(t) {
  var e = t.state, n = t.name, r = e.rects.reference, i = e.rects.popper, o = e.modifiersData.preventOverflow, a = fe(e, {
    elementContext: "reference"
  }), s = fe(e, {
    altBoundary: !0
  }), u = Un(a, r), c = Un(s, i, o), f = Xn(u), p = Xn(c);
  e.modifiersData[n] = {
    referenceClippingOffsets: u,
    popperEscapeOffsets: c,
    isReferenceHidden: f,
    hasPopperEscaped: p
  }, e.attributes.popper = Object.assign({}, e.attributes.popper, {
    "data-popper-reference-hidden": f,
    "data-popper-escaped": p
  });
}
const Oo = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: _o
};
function Eo(t, e, n) {
  var r = st(t), i = [U, z].indexOf(r) >= 0 ? -1 : 1, o = typeof n == "function" ? n(Object.assign({}, e, {
    placement: t
  })) : n, a = o[0], s = o[1];
  return a = a || 0, s = (s || 0) * i, [U, tt].indexOf(r) >= 0 ? {
    x: s,
    y: a
  } : {
    x: a,
    y: s
  };
}
function Ao(t) {
  var e = t.state, n = t.options, r = t.name, i = n.offset, o = i === void 0 ? [0, 0] : i, a = Sr.reduce(function(f, p) {
    return f[p] = Eo(p, e.rects, o), f;
  }, {}), s = a[e.placement], u = s.x, c = s.y;
  e.modifiersData.popperOffsets != null && (e.modifiersData.popperOffsets.x += u, e.modifiersData.popperOffsets.y += c), e.modifiersData[r] = a;
}
const To = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: Ao
};
function So(t) {
  var e = t.state, n = t.name;
  e.modifiersData[n] = Lr({
    reference: e.rects.reference,
    element: e.rects.popper,
    strategy: "absolute",
    placement: e.placement
  });
}
const Do = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: So,
  data: {}
};
function Co(t) {
  return t === "x" ? "y" : "x";
}
function No(t) {
  var e = t.state, n = t.options, r = t.name, i = n.mainAxis, o = i === void 0 ? !0 : i, a = n.altAxis, s = a === void 0 ? !1 : a, u = n.boundary, c = n.rootBoundary, f = n.altBoundary, p = n.padding, d = n.tether, v = d === void 0 ? !0 : d, m = n.tetherOffset, w = m === void 0 ? 0 : m, E = fe(e, {
    boundary: u,
    rootBoundary: c,
    padding: p,
    altBoundary: f
  }), D = st(e.placement), g = qt(e.placement), x = !g, l = Dn(D), O = Co(l), y = e.modifiersData.popperOffsets, C = e.rects.reference, $ = e.rects.popper, R = typeof w == "function" ? w(Object.assign({}, e.rects, {
    placement: e.placement
  })) : w, A = typeof R == "number" ? {
    mainAxis: R,
    altAxis: R
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, R), _ = e.modifiersData.offset ? e.modifiersData.offset[e.placement] : null, M = {
    x: 0,
    y: 0
  };
  if (y) {
    if (o) {
      var S, L = l === "y" ? z : U, V = l === "y" ? Z : tt, I = l === "y" ? "height" : "width", B = y[l], P = B + E[L], G = B - E[V], K = v ? -$[I] / 2 : 0, ot = g === Ht ? C[I] : $[I], W = g === Ht ? -$[I] : -C[I], et = e.elements.arrow, H = v && et ? Sn(et) : {
        width: 0,
        height: 0
      }, nt = e.modifiersData["arrow#persistent"] ? e.modifiersData["arrow#persistent"].padding : $r(), lt = nt[L], $t = nt[V], pt = ie(0, C[I], H[I]), Mt = x ? C[I] / 2 - K - pt - lt - A.mainAxis : ot - pt - lt - A.mainAxis, yt = x ? -C[I] / 2 + K + pt + $t + A.mainAxis : W + pt + $t + A.mainAxis, kt = e.elements.arrow && me(e.elements.arrow), xe = kt ? l === "y" ? kt.clientTop || 0 : kt.clientLeft || 0 : 0, Yt = (S = _ == null ? void 0 : _[l]) != null ? S : 0, be = B + Mt - Yt - xe, _e = B + yt - Yt, jt = ie(v ? We(P, be) : P, B, v ? St(G, _e) : G);
      y[l] = jt, M[l] = jt - B;
    }
    if (s) {
      var Gt, Oe = l === "x" ? z : U, Ee = l === "x" ? Z : tt, ht = y[O], wt = O === "y" ? "height" : "width", Kt = ht + E[Oe], Ot = ht - E[Ee], Jt = [z, U].indexOf(D) !== -1, Ae = (Gt = _ == null ? void 0 : _[O]) != null ? Gt : 0, Te = Jt ? Kt : ht - C[wt] - $[wt] - Ae + A.altAxis, Se = Jt ? ht + C[wt] + $[wt] - Ae - A.altAxis : Ot, De = v && Jt ? Zi(Te, ht, Se) : ie(v ? Te : Kt, ht, v ? Se : Ot);
      y[O] = De, M[O] = De - ht;
    }
    e.modifiersData[r] = M;
  }
}
const $o = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: No,
  requiresIfExists: ["offset"]
};
function Mo(t) {
  return {
    scrollLeft: t.scrollLeft,
    scrollTop: t.scrollTop
  };
}
function ko(t) {
  return t === Y(t) || !Q(t) ? Cn(t) : Mo(t);
}
function Ro(t) {
  var e = t.getBoundingClientRect(), n = Ft(e.width) / t.offsetWidth || 1, r = Ft(e.height) / t.offsetHeight || 1;
  return n !== 1 || r !== 1;
}
function Lo(t, e, n) {
  n === void 0 && (n = !1);
  var r = Q(e), i = Q(e) && Ro(e), o = _t(e), a = Wt(t, i, n), s = {
    scrollLeft: 0,
    scrollTop: 0
  }, u = {
    x: 0,
    y: 0
  };
  return (r || !r && !n) && ((ft(e) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  $n(o)) && (s = ko(e)), Q(e) ? (u = Wt(e, !0), u.x += e.clientLeft, u.y += e.clientTop) : o && (u.x = Nn(o))), {
    x: a.left + s.scrollLeft - u.x,
    y: a.top + s.scrollTop - u.y,
    width: a.width,
    height: a.height
  };
}
function Po(t) {
  var e = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Set(), r = [];
  t.forEach(function(o) {
    e.set(o.name, o);
  });
  function i(o) {
    n.add(o.name);
    var a = [].concat(o.requires || [], o.requiresIfExists || []);
    a.forEach(function(s) {
      if (!n.has(s)) {
        var u = e.get(s);
        u && i(u);
      }
    }), r.push(o);
  }
  return t.forEach(function(o) {
    n.has(o.name) || i(o);
  }), r;
}
function Io(t) {
  var e = Po(t);
  return ji.reduce(function(n, r) {
    return n.concat(e.filter(function(i) {
      return i.phase === r;
    }));
  }, []);
}
function Bo(t) {
  var e;
  return function() {
    return e || (e = new Promise(function(n) {
      Promise.resolve().then(function() {
        e = void 0, n(t());
      });
    })), e;
  };
}
function Vo(t) {
  var e = t.reduce(function(n, r) {
    var i = n[r.name];
    return n[r.name] = i ? Object.assign({}, i, r, {
      options: Object.assign({}, i.options, r.options),
      data: Object.assign({}, i.data, r.data)
    }) : r, n;
  }, {});
  return Object.keys(e).map(function(n) {
    return e[n];
  });
}
var Yn = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function jn() {
  for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
    e[n] = arguments[n];
  return !e.some(function(r) {
    return !(r && typeof r.getBoundingClientRect == "function");
  });
}
function Ho(t) {
  t === void 0 && (t = {});
  var e = t, n = e.defaultModifiers, r = n === void 0 ? [] : n, i = e.defaultOptions, o = i === void 0 ? Yn : i;
  return function(s, u, c) {
    c === void 0 && (c = o);
    var f = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, Yn, o),
      modifiersData: {},
      elements: {
        reference: s,
        popper: u
      },
      attributes: {},
      styles: {}
    }, p = [], d = !1, v = {
      state: f,
      setOptions: function(D) {
        var g = typeof D == "function" ? D(f.options) : D;
        w(), f.options = Object.assign({}, o, f.options, g), f.scrollParents = {
          reference: Ct(s) ? oe(s) : s.contextElement ? oe(s.contextElement) : [],
          popper: oe(u)
        };
        var x = Io(Vo([].concat(r, f.options.modifiers)));
        return f.orderedModifiers = x.filter(function(l) {
          return l.enabled;
        }), m(), v.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!d) {
          var D = f.elements, g = D.reference, x = D.popper;
          if (jn(g, x)) {
            f.rects = {
              reference: Lo(g, me(x), f.options.strategy === "fixed"),
              popper: Sn(x)
            }, f.reset = !1, f.placement = f.options.placement, f.orderedModifiers.forEach(function(A) {
              return f.modifiersData[A.name] = Object.assign({}, A.data);
            });
            for (var l = 0; l < f.orderedModifiers.length; l++) {
              if (f.reset === !0) {
                f.reset = !1, l = -1;
                continue;
              }
              var O = f.orderedModifiers[l], y = O.fn, C = O.options, $ = C === void 0 ? {} : C, R = O.name;
              typeof y == "function" && (f = y({
                state: f,
                options: $,
                name: R,
                instance: v
              }) || f);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: Bo(function() {
        return new Promise(function(E) {
          v.forceUpdate(), E(f);
        });
      }),
      destroy: function() {
        w(), d = !0;
      }
    };
    if (!jn(s, u))
      return v;
    v.setOptions(c).then(function(E) {
      !d && c.onFirstUpdate && c.onFirstUpdate(E);
    });
    function m() {
      f.orderedModifiers.forEach(function(E) {
        var D = E.name, g = E.options, x = g === void 0 ? {} : g, l = E.effect;
        if (typeof l == "function") {
          var O = l({
            state: f,
            name: D,
            instance: v,
            options: x
          }), y = function() {
          };
          p.push(O || y);
        }
      });
    }
    function w() {
      p.forEach(function(E) {
        return E();
      }), p = [];
    }
    return v;
  };
}
var Fo = [fo, Do, so, Dr, To, bo, $o, ro, Oo], Wo = /* @__PURE__ */ Ho({
  defaultModifiers: Fo
}), qo = "tippy-box", Pr = "tippy-content", zo = "tippy-backdrop", Ir = "tippy-arrow", Br = "tippy-svg-arrow", At = {
  passive: !0,
  capture: !0
}, Vr = function() {
  return document.body;
};
function Uo(t, e) {
  return {}.hasOwnProperty.call(t, e);
}
function rn(t, e, n) {
  if (Array.isArray(t)) {
    var r = t[e];
    return r ?? (Array.isArray(n) ? n[e] : n);
  }
  return t;
}
function Mn(t, e) {
  var n = {}.toString.call(t);
  return n.indexOf("[object") === 0 && n.indexOf(e + "]") > -1;
}
function Hr(t, e) {
  return typeof t == "function" ? t.apply(void 0, e) : t;
}
function Gn(t, e) {
  if (e === 0)
    return t;
  var n;
  return function(r) {
    clearTimeout(n), n = setTimeout(function() {
      t(r);
    }, e);
  };
}
function Xo(t, e) {
  var n = Object.assign({}, t);
  return e.forEach(function(r) {
    delete n[r];
  }), n;
}
function Yo(t) {
  return t.split(/\s+/).filter(Boolean);
}
function It(t) {
  return [].concat(t);
}
function Kn(t, e) {
  t.indexOf(e) === -1 && t.push(e);
}
function jo(t) {
  return t.filter(function(e, n) {
    return t.indexOf(e) === n;
  });
}
function Go(t) {
  return t.split("-")[0];
}
function qe(t) {
  return [].slice.call(t);
}
function Jn(t) {
  return Object.keys(t).reduce(function(e, n) {
    return t[n] !== void 0 && (e[n] = t[n]), e;
  }, {});
}
function ae() {
  return document.createElement("div");
}
function ce(t) {
  return ["Element", "Fragment"].some(function(e) {
    return Mn(t, e);
  });
}
function Ko(t) {
  return Mn(t, "NodeList");
}
function Jo(t) {
  return Mn(t, "MouseEvent");
}
function Qo(t) {
  return !!(t && t._tippy && t._tippy.reference === t);
}
function Zo(t) {
  return ce(t) ? [t] : Ko(t) ? qe(t) : Array.isArray(t) ? t : qe(document.querySelectorAll(t));
}
function on(t, e) {
  t.forEach(function(n) {
    n && (n.style.transitionDuration = e + "ms");
  });
}
function Qn(t, e) {
  t.forEach(function(n) {
    n && n.setAttribute("data-state", e);
  });
}
function ta(t) {
  var e, n = It(t), r = n[0];
  return r != null && (e = r.ownerDocument) != null && e.body ? r.ownerDocument : document;
}
function ea(t, e) {
  var n = e.clientX, r = e.clientY;
  return t.every(function(i) {
    var o = i.popperRect, a = i.popperState, s = i.props, u = s.interactiveBorder, c = Go(a.placement), f = a.modifiersData.offset;
    if (!f)
      return !0;
    var p = c === "bottom" ? f.top.y : 0, d = c === "top" ? f.bottom.y : 0, v = c === "right" ? f.left.x : 0, m = c === "left" ? f.right.x : 0, w = o.top - r + p > u, E = r - o.bottom - d > u, D = o.left - n + v > u, g = n - o.right - m > u;
    return w || E || D || g;
  });
}
function an(t, e, n) {
  var r = e + "EventListener";
  ["transitionend", "webkitTransitionEnd"].forEach(function(i) {
    t[r](i, n);
  });
}
function Zn(t, e) {
  for (var n = e; n; ) {
    var r;
    if (t.contains(n))
      return !0;
    n = n.getRootNode == null || (r = n.getRootNode()) == null ? void 0 : r.host;
  }
  return !1;
}
var at = {
  isTouch: !1
}, tr = 0;
function na() {
  at.isTouch || (at.isTouch = !0, window.performance && document.addEventListener("mousemove", Fr));
}
function Fr() {
  var t = performance.now();
  t - tr < 20 && (at.isTouch = !1, document.removeEventListener("mousemove", Fr)), tr = t;
}
function ra() {
  var t = document.activeElement;
  if (Qo(t)) {
    var e = t._tippy;
    t.blur && !e.state.isVisible && t.blur();
  }
}
function ia() {
  document.addEventListener("touchstart", na, At), window.addEventListener("blur", ra);
}
var oa = typeof window < "u" && typeof document < "u", aa = oa ? (
  // @ts-ignore
  !!window.msCrypto
) : !1;
function Pt(t) {
  var e = t === "destroy" ? "n already-" : " ";
  return [t + "() was called on a" + e + "destroyed instance. This is a no-op but", "indicates a potential memory leak."].join(" ");
}
function er(t) {
  var e = /[ \t]{2,}/g, n = /^[ \t]*/gm;
  return t.replace(e, " ").replace(n, "").trim();
}
function sa(t) {
  return er(`
  %ctippy.js

  %c` + er(t) + `

  %c👷‍ This is a development-only message. It will be removed in production.
  `);
}
function Wr(t) {
  return [
    sa(t),
    // title
    "color: #00C584; font-size: 1.3em; font-weight: bold;",
    // message
    "line-height: 1.5",
    // footer
    "color: #a6a095;"
  ];
}
var le;
process.env.NODE_ENV !== "production" && ua();
function ua() {
  le = /* @__PURE__ */ new Set();
}
function vt(t, e) {
  if (t && !le.has(e)) {
    var n;
    le.add(e), (n = console).warn.apply(n, Wr(e));
  }
}
function hn(t, e) {
  if (t && !le.has(e)) {
    var n;
    le.add(e), (n = console).error.apply(n, Wr(e));
  }
}
function fa(t) {
  var e = !t, n = Object.prototype.toString.call(t) === "[object Object]" && !t.addEventListener;
  hn(e, ["tippy() was passed", "`" + String(t) + "`", "as its targets (first) argument. Valid types are: String, Element,", "Element[], or NodeList."].join(" ")), hn(n, ["tippy() was passed a plain object which is not supported as an argument", "for virtual positioning. Use props.getReferenceClientRect instead."].join(" "));
}
var qr = {
  animateFill: !1,
  followCursor: !1,
  inlinePositioning: !1,
  sticky: !1
}, ca = {
  allowHTML: !1,
  animation: "fade",
  arrow: !0,
  content: "",
  inertia: !1,
  maxWidth: 350,
  role: "tooltip",
  theme: "",
  zIndex: 9999
}, X = Object.assign({
  appendTo: Vr,
  aria: {
    content: "auto",
    expanded: "auto"
  },
  delay: 0,
  duration: [300, 250],
  getReferenceClientRect: null,
  hideOnClick: !0,
  ignoreAttributes: !1,
  interactive: !1,
  interactiveBorder: 2,
  interactiveDebounce: 0,
  moveTransition: "",
  offset: [0, 10],
  onAfterUpdate: function() {
  },
  onBeforeUpdate: function() {
  },
  onCreate: function() {
  },
  onDestroy: function() {
  },
  onHidden: function() {
  },
  onHide: function() {
  },
  onMount: function() {
  },
  onShow: function() {
  },
  onShown: function() {
  },
  onTrigger: function() {
  },
  onUntrigger: function() {
  },
  onClickOutside: function() {
  },
  placement: "top",
  plugins: [],
  popperOptions: {},
  render: null,
  showOnCreate: !1,
  touch: !0,
  trigger: "mouseenter focus",
  triggerTarget: null
}, qr, ca), la = Object.keys(X), pa = function(e) {
  process.env.NODE_ENV !== "production" && Ur(e, []);
  var n = Object.keys(e);
  n.forEach(function(r) {
    X[r] = e[r];
  });
};
function zr(t) {
  var e = t.plugins || [], n = e.reduce(function(r, i) {
    var o = i.name, a = i.defaultValue;
    if (o) {
      var s;
      r[o] = t[o] !== void 0 ? t[o] : (s = X[o]) != null ? s : a;
    }
    return r;
  }, {});
  return Object.assign({}, t, n);
}
function ha(t, e) {
  var n = e ? Object.keys(zr(Object.assign({}, X, {
    plugins: e
  }))) : la, r = n.reduce(function(i, o) {
    var a = (t.getAttribute("data-tippy-" + o) || "").trim();
    if (!a)
      return i;
    if (o === "content")
      i[o] = a;
    else
      try {
        i[o] = JSON.parse(a);
      } catch {
        i[o] = a;
      }
    return i;
  }, {});
  return r;
}
function nr(t, e) {
  var n = Object.assign({}, e, {
    content: Hr(e.content, [t])
  }, e.ignoreAttributes ? {} : ha(t, e.plugins));
  return n.aria = Object.assign({}, X.aria, n.aria), n.aria = {
    expanded: n.aria.expanded === "auto" ? e.interactive : n.aria.expanded,
    content: n.aria.content === "auto" ? e.interactive ? null : "describedby" : n.aria.content
  }, n;
}
function Ur(t, e) {
  t === void 0 && (t = {}), e === void 0 && (e = []);
  var n = Object.keys(t);
  n.forEach(function(r) {
    var i = Xo(X, Object.keys(qr)), o = !Uo(i, r);
    o && (o = e.filter(function(a) {
      return a.name === r;
    }).length === 0), vt(o, ["`" + r + "`", "is not a valid prop. You may have spelled it incorrectly, or if it's", "a plugin, forgot to pass it in an array as props.plugins.", `

`, `All props: https://atomiks.github.io/tippyjs/v6/all-props/
`, "Plugins: https://atomiks.github.io/tippyjs/v6/plugins/"].join(" "));
  });
}
var da = function() {
  return "innerHTML";
};
function dn(t, e) {
  t[da()] = e;
}
function rr(t) {
  var e = ae();
  return t === !0 ? e.className = Ir : (e.className = Br, ce(t) ? e.appendChild(t) : dn(e, t)), e;
}
function ir(t, e) {
  ce(e.content) ? (dn(t, ""), t.appendChild(e.content)) : typeof e.content != "function" && (e.allowHTML ? dn(t, e.content) : t.textContent = e.content);
}
function vn(t) {
  var e = t.firstElementChild, n = qe(e.children);
  return {
    box: e,
    content: n.find(function(r) {
      return r.classList.contains(Pr);
    }),
    arrow: n.find(function(r) {
      return r.classList.contains(Ir) || r.classList.contains(Br);
    }),
    backdrop: n.find(function(r) {
      return r.classList.contains(zo);
    })
  };
}
function Xr(t) {
  var e = ae(), n = ae();
  n.className = qo, n.setAttribute("data-state", "hidden"), n.setAttribute("tabindex", "-1");
  var r = ae();
  r.className = Pr, r.setAttribute("data-state", "hidden"), ir(r, t.props), e.appendChild(n), n.appendChild(r), i(t.props, t.props);
  function i(o, a) {
    var s = vn(e), u = s.box, c = s.content, f = s.arrow;
    a.theme ? u.setAttribute("data-theme", a.theme) : u.removeAttribute("data-theme"), typeof a.animation == "string" ? u.setAttribute("data-animation", a.animation) : u.removeAttribute("data-animation"), a.inertia ? u.setAttribute("data-inertia", "") : u.removeAttribute("data-inertia"), u.style.maxWidth = typeof a.maxWidth == "number" ? a.maxWidth + "px" : a.maxWidth, a.role ? u.setAttribute("role", a.role) : u.removeAttribute("role"), (o.content !== a.content || o.allowHTML !== a.allowHTML) && ir(c, t.props), a.arrow ? f ? o.arrow !== a.arrow && (u.removeChild(f), u.appendChild(rr(a.arrow))) : u.appendChild(rr(a.arrow)) : f && u.removeChild(f);
  }
  return {
    popper: e,
    onUpdate: i
  };
}
Xr.$$tippy = !0;
var va = 1, Me = [], sn = [];
function ma(t, e) {
  var n = nr(t, Object.assign({}, X, zr(Jn(e)))), r, i, o, a = !1, s = !1, u = !1, c = !1, f, p, d, v = [], m = Gn(be, n.interactiveDebounce), w, E = va++, D = null, g = jo(n.plugins), x = {
    // Is the instance currently enabled?
    isEnabled: !0,
    // Is the tippy currently showing and not transitioning out?
    isVisible: !1,
    // Has the instance been destroyed?
    isDestroyed: !1,
    // Is the tippy currently mounted to the DOM?
    isMounted: !1,
    // Has the tippy finished transitioning in?
    isShown: !1
  }, l = {
    // properties
    id: E,
    reference: t,
    popper: ae(),
    popperInstance: D,
    props: n,
    state: x,
    plugins: g,
    // methods
    clearDelayTimeouts: Te,
    setProps: Se,
    setContent: De,
    show: Oi,
    hide: Ei,
    hideWithInteractivity: Ai,
    enable: Jt,
    disable: Ae,
    unmount: Ti,
    destroy: Si
  };
  if (!n.render)
    return process.env.NODE_ENV !== "production" && hn(!0, "render() function has not been supplied."), l;
  var O = n.render(l), y = O.popper, C = O.onUpdate;
  y.setAttribute("data-tippy-root", ""), y.id = "tippy-" + l.id, l.popper = y, t._tippy = l, y._tippy = l;
  var $ = g.map(function(h) {
    return h.fn(l);
  }), R = t.hasAttribute("aria-expanded");
  return kt(), K(), B(), P("onCreate", [l]), n.showOnCreate && Kt(), y.addEventListener("mouseenter", function() {
    l.props.interactive && l.state.isVisible && l.clearDelayTimeouts();
  }), y.addEventListener("mouseleave", function() {
    l.props.interactive && l.props.trigger.indexOf("mouseenter") >= 0 && L().addEventListener("mousemove", m);
  }), l;
  function A() {
    var h = l.props.touch;
    return Array.isArray(h) ? h : [h, 0];
  }
  function _() {
    return A()[0] === "hold";
  }
  function M() {
    var h;
    return !!((h = l.props.render) != null && h.$$tippy);
  }
  function S() {
    return w || t;
  }
  function L() {
    var h = S().parentNode;
    return h ? ta(h) : document;
  }
  function V() {
    return vn(y);
  }
  function I(h) {
    return l.state.isMounted && !l.state.isVisible || at.isTouch || f && f.type === "focus" ? 0 : rn(l.props.delay, h ? 0 : 1, X.delay);
  }
  function B(h) {
    h === void 0 && (h = !1), y.style.pointerEvents = l.props.interactive && !h ? "" : "none", y.style.zIndex = "" + l.props.zIndex;
  }
  function P(h, b, T) {
    if (T === void 0 && (T = !0), $.forEach(function(N) {
      N[h] && N[h].apply(N, b);
    }), T) {
      var k;
      (k = l.props)[h].apply(k, b);
    }
  }
  function G() {
    var h = l.props.aria;
    if (h.content) {
      var b = "aria-" + h.content, T = y.id, k = It(l.props.triggerTarget || t);
      k.forEach(function(N) {
        var F = N.getAttribute(b);
        if (l.state.isVisible)
          N.setAttribute(b, F ? F + " " + T : T);
        else {
          var J = F && F.replace(T, "").trim();
          J ? N.setAttribute(b, J) : N.removeAttribute(b);
        }
      });
    }
  }
  function K() {
    if (!(R || !l.props.aria.expanded)) {
      var h = It(l.props.triggerTarget || t);
      h.forEach(function(b) {
        l.props.interactive ? b.setAttribute("aria-expanded", l.state.isVisible && b === S() ? "true" : "false") : b.removeAttribute("aria-expanded");
      });
    }
  }
  function ot() {
    L().removeEventListener("mousemove", m), Me = Me.filter(function(h) {
      return h !== m;
    });
  }
  function W(h) {
    if (!(at.isTouch && (u || h.type === "mousedown"))) {
      var b = h.composedPath && h.composedPath()[0] || h.target;
      if (!(l.props.interactive && Zn(y, b))) {
        if (It(l.props.triggerTarget || t).some(function(T) {
          return Zn(T, b);
        })) {
          if (at.isTouch || l.state.isVisible && l.props.trigger.indexOf("click") >= 0)
            return;
        } else
          P("onClickOutside", [l, h]);
        l.props.hideOnClick === !0 && (l.clearDelayTimeouts(), l.hide(), s = !0, setTimeout(function() {
          s = !1;
        }), l.state.isMounted || lt());
      }
    }
  }
  function et() {
    u = !0;
  }
  function H() {
    u = !1;
  }
  function nt() {
    var h = L();
    h.addEventListener("mousedown", W, !0), h.addEventListener("touchend", W, At), h.addEventListener("touchstart", H, At), h.addEventListener("touchmove", et, At);
  }
  function lt() {
    var h = L();
    h.removeEventListener("mousedown", W, !0), h.removeEventListener("touchend", W, At), h.removeEventListener("touchstart", H, At), h.removeEventListener("touchmove", et, At);
  }
  function $t(h, b) {
    Mt(h, function() {
      !l.state.isVisible && y.parentNode && y.parentNode.contains(y) && b();
    });
  }
  function pt(h, b) {
    Mt(h, b);
  }
  function Mt(h, b) {
    var T = V().box;
    function k(N) {
      N.target === T && (an(T, "remove", k), b());
    }
    if (h === 0)
      return b();
    an(T, "remove", p), an(T, "add", k), p = k;
  }
  function yt(h, b, T) {
    T === void 0 && (T = !1);
    var k = It(l.props.triggerTarget || t);
    k.forEach(function(N) {
      N.addEventListener(h, b, T), v.push({
        node: N,
        eventType: h,
        handler: b,
        options: T
      });
    });
  }
  function kt() {
    _() && (yt("touchstart", Yt, {
      passive: !0
    }), yt("touchend", _e, {
      passive: !0
    })), Yo(l.props.trigger).forEach(function(h) {
      if (h !== "manual")
        switch (yt(h, Yt), h) {
          case "mouseenter":
            yt("mouseleave", _e);
            break;
          case "focus":
            yt(aa ? "focusout" : "blur", jt);
            break;
          case "focusin":
            yt("focusout", jt);
            break;
        }
    });
  }
  function xe() {
    v.forEach(function(h) {
      var b = h.node, T = h.eventType, k = h.handler, N = h.options;
      b.removeEventListener(T, k, N);
    }), v = [];
  }
  function Yt(h) {
    var b, T = !1;
    if (!(!l.state.isEnabled || Gt(h) || s)) {
      var k = ((b = f) == null ? void 0 : b.type) === "focus";
      f = h, w = h.currentTarget, K(), !l.state.isVisible && Jo(h) && Me.forEach(function(N) {
        return N(h);
      }), h.type === "click" && (l.props.trigger.indexOf("mouseenter") < 0 || a) && l.props.hideOnClick !== !1 && l.state.isVisible ? T = !0 : Kt(h), h.type === "click" && (a = !T), T && !k && Ot(h);
    }
  }
  function be(h) {
    var b = h.target, T = S().contains(b) || y.contains(b);
    if (!(h.type === "mousemove" && T)) {
      var k = wt().concat(y).map(function(N) {
        var F, J = N._tippy, Rt = (F = J.popperInstance) == null ? void 0 : F.state;
        return Rt ? {
          popperRect: N.getBoundingClientRect(),
          popperState: Rt,
          props: n
        } : null;
      }).filter(Boolean);
      ea(k, h) && (ot(), Ot(h));
    }
  }
  function _e(h) {
    var b = Gt(h) || l.props.trigger.indexOf("click") >= 0 && a;
    if (!b) {
      if (l.props.interactive) {
        l.hideWithInteractivity(h);
        return;
      }
      Ot(h);
    }
  }
  function jt(h) {
    l.props.trigger.indexOf("focusin") < 0 && h.target !== S() || l.props.interactive && h.relatedTarget && y.contains(h.relatedTarget) || Ot(h);
  }
  function Gt(h) {
    return at.isTouch ? _() !== h.type.indexOf("touch") >= 0 : !1;
  }
  function Oe() {
    Ee();
    var h = l.props, b = h.popperOptions, T = h.placement, k = h.offset, N = h.getReferenceClientRect, F = h.moveTransition, J = M() ? vn(y).arrow : null, Rt = N ? {
      getBoundingClientRect: N,
      contextElement: N.contextElement || S()
    } : t, Vn = {
      name: "$$tippy",
      enabled: !0,
      phase: "beforeWrite",
      requires: ["computeStyles"],
      fn: function(Ce) {
        var Lt = Ce.state;
        if (M()) {
          var Di = V(), nn = Di.box;
          ["placement", "reference-hidden", "escaped"].forEach(function(Ne) {
            Ne === "placement" ? nn.setAttribute("data-placement", Lt.placement) : Lt.attributes.popper["data-popper-" + Ne] ? nn.setAttribute("data-" + Ne, "") : nn.removeAttribute("data-" + Ne);
          }), Lt.attributes.popper = {};
        }
      }
    }, Et = [{
      name: "offset",
      options: {
        offset: k
      }
    }, {
      name: "preventOverflow",
      options: {
        padding: {
          top: 2,
          bottom: 2,
          left: 5,
          right: 5
        }
      }
    }, {
      name: "flip",
      options: {
        padding: 5
      }
    }, {
      name: "computeStyles",
      options: {
        adaptive: !F
      }
    }, Vn];
    M() && J && Et.push({
      name: "arrow",
      options: {
        element: J,
        padding: 3
      }
    }), Et.push.apply(Et, (b == null ? void 0 : b.modifiers) || []), l.popperInstance = Wo(Rt, y, Object.assign({}, b, {
      placement: T,
      onFirstUpdate: d,
      modifiers: Et
    }));
  }
  function Ee() {
    l.popperInstance && (l.popperInstance.destroy(), l.popperInstance = null);
  }
  function ht() {
    var h = l.props.appendTo, b, T = S();
    l.props.interactive && h === Vr || h === "parent" ? b = T.parentNode : b = Hr(h, [T]), b.contains(y) || b.appendChild(y), l.state.isMounted = !0, Oe(), process.env.NODE_ENV !== "production" && vt(l.props.interactive && h === X.appendTo && T.nextElementSibling !== y, ["Interactive tippy element may not be accessible via keyboard", "navigation because it is not directly after the reference element", "in the DOM source order.", `

`, "Using a wrapper <div> or <span> tag around the reference element", "solves this by creating a new parentNode context.", `

`, "Specifying `appendTo: document.body` silences this warning, but it", "assumes you are using a focus management solution to handle", "keyboard navigation.", `

`, "See: https://atomiks.github.io/tippyjs/v6/accessibility/#interactivity"].join(" "));
  }
  function wt() {
    return qe(y.querySelectorAll("[data-tippy-root]"));
  }
  function Kt(h) {
    l.clearDelayTimeouts(), h && P("onTrigger", [l, h]), nt();
    var b = I(!0), T = A(), k = T[0], N = T[1];
    at.isTouch && k === "hold" && N && (b = N), b ? r = setTimeout(function() {
      l.show();
    }, b) : l.show();
  }
  function Ot(h) {
    if (l.clearDelayTimeouts(), P("onUntrigger", [l, h]), !l.state.isVisible) {
      lt();
      return;
    }
    if (!(l.props.trigger.indexOf("mouseenter") >= 0 && l.props.trigger.indexOf("click") >= 0 && ["mouseleave", "mousemove"].indexOf(h.type) >= 0 && a)) {
      var b = I(!1);
      b ? i = setTimeout(function() {
        l.state.isVisible && l.hide();
      }, b) : o = requestAnimationFrame(function() {
        l.hide();
      });
    }
  }
  function Jt() {
    l.state.isEnabled = !0;
  }
  function Ae() {
    l.hide(), l.state.isEnabled = !1;
  }
  function Te() {
    clearTimeout(r), clearTimeout(i), cancelAnimationFrame(o);
  }
  function Se(h) {
    if (process.env.NODE_ENV !== "production" && vt(l.state.isDestroyed, Pt("setProps")), !l.state.isDestroyed) {
      P("onBeforeUpdate", [l, h]), xe();
      var b = l.props, T = nr(t, Object.assign({}, b, Jn(h), {
        ignoreAttributes: !0
      }));
      l.props = T, kt(), b.interactiveDebounce !== T.interactiveDebounce && (ot(), m = Gn(be, T.interactiveDebounce)), b.triggerTarget && !T.triggerTarget ? It(b.triggerTarget).forEach(function(k) {
        k.removeAttribute("aria-expanded");
      }) : T.triggerTarget && t.removeAttribute("aria-expanded"), K(), B(), C && C(b, T), l.popperInstance && (Oe(), wt().forEach(function(k) {
        requestAnimationFrame(k._tippy.popperInstance.forceUpdate);
      })), P("onAfterUpdate", [l, h]);
    }
  }
  function De(h) {
    l.setProps({
      content: h
    });
  }
  function Oi() {
    process.env.NODE_ENV !== "production" && vt(l.state.isDestroyed, Pt("show"));
    var h = l.state.isVisible, b = l.state.isDestroyed, T = !l.state.isEnabled, k = at.isTouch && !l.props.touch, N = rn(l.props.duration, 0, X.duration);
    if (!(h || b || T || k) && !S().hasAttribute("disabled") && (P("onShow", [l], !1), l.props.onShow(l) !== !1)) {
      if (l.state.isVisible = !0, M() && (y.style.visibility = "visible"), B(), nt(), l.state.isMounted || (y.style.transition = "none"), M()) {
        var F = V(), J = F.box, Rt = F.content;
        on([J, Rt], 0);
      }
      d = function() {
        var Et;
        if (!(!l.state.isVisible || c)) {
          if (c = !0, y.offsetHeight, y.style.transition = l.props.moveTransition, M() && l.props.animation) {
            var en = V(), Ce = en.box, Lt = en.content;
            on([Ce, Lt], N), Qn([Ce, Lt], "visible");
          }
          G(), K(), Kn(sn, l), (Et = l.popperInstance) == null || Et.forceUpdate(), P("onMount", [l]), l.props.animation && M() && pt(N, function() {
            l.state.isShown = !0, P("onShown", [l]);
          });
        }
      }, ht();
    }
  }
  function Ei() {
    process.env.NODE_ENV !== "production" && vt(l.state.isDestroyed, Pt("hide"));
    var h = !l.state.isVisible, b = l.state.isDestroyed, T = !l.state.isEnabled, k = rn(l.props.duration, 1, X.duration);
    if (!(h || b || T) && (P("onHide", [l], !1), l.props.onHide(l) !== !1)) {
      if (l.state.isVisible = !1, l.state.isShown = !1, c = !1, a = !1, M() && (y.style.visibility = "hidden"), ot(), lt(), B(!0), M()) {
        var N = V(), F = N.box, J = N.content;
        l.props.animation && (on([F, J], k), Qn([F, J], "hidden"));
      }
      G(), K(), l.props.animation ? M() && $t(k, l.unmount) : l.unmount();
    }
  }
  function Ai(h) {
    process.env.NODE_ENV !== "production" && vt(l.state.isDestroyed, Pt("hideWithInteractivity")), L().addEventListener("mousemove", m), Kn(Me, m), m(h);
  }
  function Ti() {
    process.env.NODE_ENV !== "production" && vt(l.state.isDestroyed, Pt("unmount")), l.state.isVisible && l.hide(), l.state.isMounted && (Ee(), wt().forEach(function(h) {
      h._tippy.unmount();
    }), y.parentNode && y.parentNode.removeChild(y), sn = sn.filter(function(h) {
      return h !== l;
    }), l.state.isMounted = !1, P("onHidden", [l]));
  }
  function Si() {
    process.env.NODE_ENV !== "production" && vt(l.state.isDestroyed, Pt("destroy")), !l.state.isDestroyed && (l.clearDelayTimeouts(), l.unmount(), xe(), delete t._tippy, l.state.isDestroyed = !0, P("onDestroy", [l]));
  }
}
function ge(t, e) {
  e === void 0 && (e = {});
  var n = X.plugins.concat(e.plugins || []);
  process.env.NODE_ENV !== "production" && (fa(t), Ur(e, n)), ia();
  var r = Object.assign({}, e, {
    plugins: n
  }), i = Zo(t);
  if (process.env.NODE_ENV !== "production") {
    var o = ce(r.content), a = i.length > 1;
    vt(o && a, ["tippy() was passed an Element as the `content` prop, but more than", "one tippy instance was created by this invocation. This means the", "content element will only be appended to the last tippy instance.", `

`, "Instead, pass the .innerHTML of the element, or use a function that", "returns a cloned version of the element instead.", `

`, `1) content: element.innerHTML
`, "2) content: () => element.cloneNode(true)"].join(" "));
  }
  var s = i.reduce(function(u, c) {
    var f = c && ma(c, r);
    return f && u.push(f), u;
  }, []);
  return ce(t) ? s[0] : s;
}
ge.defaultProps = X;
ge.setDefaultProps = pa;
ge.currentInput = at;
Object.assign({}, Dr, {
  effect: function(e) {
    var n = e.state, r = {
      popper: {
        position: n.options.strategy,
        left: "0",
        top: "0",
        margin: "0"
      },
      arrow: {
        position: "absolute"
      },
      reference: {}
    };
    Object.assign(n.elements.popper.style, r.popper), n.styles = r, n.elements.arrow && Object.assign(n.elements.arrow.style, r.arrow);
  }
});
ge.setDefaultProps({
  render: Xr
});
var ga = { value: () => {
} };
function Yr() {
  for (var t = 0, e = arguments.length, n = {}, r; t < e; ++t) {
    if (!(r = arguments[t] + "") || r in n || /[\s.]/.test(r))
      throw new Error("illegal type: " + r);
    n[r] = [];
  }
  return new Ie(n);
}
function Ie(t) {
  this._ = t;
}
function ya(t, e) {
  return t.trim().split(/^|\s+/).map(function(n) {
    var r = "", i = n.indexOf(".");
    if (i >= 0 && (r = n.slice(i + 1), n = n.slice(0, i)), n && !e.hasOwnProperty(n))
      throw new Error("unknown type: " + n);
    return { type: n, name: r };
  });
}
Ie.prototype = Yr.prototype = {
  constructor: Ie,
  on: function(t, e) {
    var n = this._, r = ya(t + "", n), i, o = -1, a = r.length;
    if (arguments.length < 2) {
      for (; ++o < a; )
        if ((i = (t = r[o]).type) && (i = wa(n[i], t.name)))
          return i;
      return;
    }
    if (e != null && typeof e != "function")
      throw new Error("invalid callback: " + e);
    for (; ++o < a; )
      if (i = (t = r[o]).type)
        n[i] = or(n[i], t.name, e);
      else if (e == null)
        for (i in n)
          n[i] = or(n[i], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, e = this._;
    for (var n in e)
      t[n] = e[n].slice();
    return new Ie(t);
  },
  call: function(t, e) {
    if ((i = arguments.length - 2) > 0)
      for (var n = new Array(i), r = 0, i, o; r < i; ++r)
        n[r] = arguments[r + 2];
    if (!this._.hasOwnProperty(t))
      throw new Error("unknown type: " + t);
    for (o = this._[t], r = 0, i = o.length; r < i; ++r)
      o[r].value.apply(e, n);
  },
  apply: function(t, e, n) {
    if (!this._.hasOwnProperty(t))
      throw new Error("unknown type: " + t);
    for (var r = this._[t], i = 0, o = r.length; i < o; ++i)
      r[i].value.apply(e, n);
  }
};
function wa(t, e) {
  for (var n = 0, r = t.length, i; n < r; ++n)
    if ((i = t[n]).name === e)
      return i.value;
}
function or(t, e, n) {
  for (var r = 0, i = t.length; r < i; ++r)
    if (t[r].name === e) {
      t[r] = ga, t = t.slice(0, r).concat(t.slice(r + 1));
      break;
    }
  return n != null && t.push({ name: e, value: n }), t;
}
var mn = "http://www.w3.org/1999/xhtml";
const ar = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: mn,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function Qe(t) {
  var e = t += "", n = e.indexOf(":");
  return n >= 0 && (e = t.slice(0, n)) !== "xmlns" && (t = t.slice(n + 1)), ar.hasOwnProperty(e) ? { space: ar[e], local: t } : t;
}
function xa(t) {
  return function() {
    var e = this.ownerDocument, n = this.namespaceURI;
    return n === mn && e.documentElement.namespaceURI === mn ? e.createElement(t) : e.createElementNS(n, t);
  };
}
function ba(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function jr(t) {
  var e = Qe(t);
  return (e.local ? ba : xa)(e);
}
function _a() {
}
function kn(t) {
  return t == null ? _a : function() {
    return this.querySelector(t);
  };
}
function Oa(t) {
  typeof t != "function" && (t = kn(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var o = e[i], a = o.length, s = r[i] = new Array(a), u, c, f = 0; f < a; ++f)
      (u = o[f]) && (c = t.call(u, u.__data__, f, o)) && ("__data__" in u && (c.__data__ = u.__data__), s[f] = c);
  return new j(r, this._parents);
}
function Ea(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function Aa() {
  return [];
}
function Gr(t) {
  return t == null ? Aa : function() {
    return this.querySelectorAll(t);
  };
}
function Ta(t) {
  return function() {
    return Ea(t.apply(this, arguments));
  };
}
function Sa(t) {
  typeof t == "function" ? t = Ta(t) : t = Gr(t);
  for (var e = this._groups, n = e.length, r = [], i = [], o = 0; o < n; ++o)
    for (var a = e[o], s = a.length, u, c = 0; c < s; ++c)
      (u = a[c]) && (r.push(t.call(u, u.__data__, c, a)), i.push(u));
  return new j(r, i);
}
function Kr(t) {
  return function() {
    return this.matches(t);
  };
}
function Jr(t) {
  return function(e) {
    return e.matches(t);
  };
}
var Da = Array.prototype.find;
function Ca(t) {
  return function() {
    return Da.call(this.children, t);
  };
}
function Na() {
  return this.firstElementChild;
}
function $a(t) {
  return this.select(t == null ? Na : Ca(typeof t == "function" ? t : Jr(t)));
}
var Ma = Array.prototype.filter;
function ka() {
  return Array.from(this.children);
}
function Ra(t) {
  return function() {
    return Ma.call(this.children, t);
  };
}
function La(t) {
  return this.selectAll(t == null ? ka : Ra(typeof t == "function" ? t : Jr(t)));
}
function Pa(t) {
  typeof t != "function" && (t = Kr(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var o = e[i], a = o.length, s = r[i] = [], u, c = 0; c < a; ++c)
      (u = o[c]) && t.call(u, u.__data__, c, o) && s.push(u);
  return new j(r, this._parents);
}
function Qr(t) {
  return new Array(t.length);
}
function Ia() {
  return new j(this._enter || this._groups.map(Qr), this._parents);
}
function ze(t, e) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = e;
}
ze.prototype = {
  constructor: ze,
  appendChild: function(t) {
    return this._parent.insertBefore(t, this._next);
  },
  insertBefore: function(t, e) {
    return this._parent.insertBefore(t, e);
  },
  querySelector: function(t) {
    return this._parent.querySelector(t);
  },
  querySelectorAll: function(t) {
    return this._parent.querySelectorAll(t);
  }
};
function Ba(t) {
  return function() {
    return t;
  };
}
function Va(t, e, n, r, i, o) {
  for (var a = 0, s, u = e.length, c = o.length; a < c; ++a)
    (s = e[a]) ? (s.__data__ = o[a], r[a] = s) : n[a] = new ze(t, o[a]);
  for (; a < u; ++a)
    (s = e[a]) && (i[a] = s);
}
function Ha(t, e, n, r, i, o, a) {
  var s, u, c = /* @__PURE__ */ new Map(), f = e.length, p = o.length, d = new Array(f), v;
  for (s = 0; s < f; ++s)
    (u = e[s]) && (d[s] = v = a.call(u, u.__data__, s, e) + "", c.has(v) ? i[s] = u : c.set(v, u));
  for (s = 0; s < p; ++s)
    v = a.call(t, o[s], s, o) + "", (u = c.get(v)) ? (r[s] = u, u.__data__ = o[s], c.delete(v)) : n[s] = new ze(t, o[s]);
  for (s = 0; s < f; ++s)
    (u = e[s]) && c.get(d[s]) === u && (i[s] = u);
}
function Fa(t) {
  return t.__data__;
}
function Wa(t, e) {
  if (!arguments.length)
    return Array.from(this, Fa);
  var n = e ? Ha : Va, r = this._parents, i = this._groups;
  typeof t != "function" && (t = Ba(t));
  for (var o = i.length, a = new Array(o), s = new Array(o), u = new Array(o), c = 0; c < o; ++c) {
    var f = r[c], p = i[c], d = p.length, v = qa(t.call(f, f && f.__data__, c, r)), m = v.length, w = s[c] = new Array(m), E = a[c] = new Array(m), D = u[c] = new Array(d);
    n(f, p, w, E, D, v, e);
    for (var g = 0, x = 0, l, O; g < m; ++g)
      if (l = w[g]) {
        for (g >= x && (x = g + 1); !(O = E[x]) && ++x < m; )
          ;
        l._next = O || null;
      }
  }
  return a = new j(a, r), a._enter = s, a._exit = u, a;
}
function qa(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function za() {
  return new j(this._exit || this._groups.map(Qr), this._parents);
}
function Ua(t, e, n) {
  var r = this.enter(), i = this, o = this.exit();
  return typeof t == "function" ? (r = t(r), r && (r = r.selection())) : r = r.append(t + ""), e != null && (i = e(i), i && (i = i.selection())), n == null ? o.remove() : n(o), r && i ? r.merge(i).order() : i;
}
function Xa(t) {
  for (var e = t.selection ? t.selection() : t, n = this._groups, r = e._groups, i = n.length, o = r.length, a = Math.min(i, o), s = new Array(i), u = 0; u < a; ++u)
    for (var c = n[u], f = r[u], p = c.length, d = s[u] = new Array(p), v, m = 0; m < p; ++m)
      (v = c[m] || f[m]) && (d[m] = v);
  for (; u < i; ++u)
    s[u] = n[u];
  return new j(s, this._parents);
}
function Ya() {
  for (var t = this._groups, e = -1, n = t.length; ++e < n; )
    for (var r = t[e], i = r.length - 1, o = r[i], a; --i >= 0; )
      (a = r[i]) && (o && a.compareDocumentPosition(o) ^ 4 && o.parentNode.insertBefore(a, o), o = a);
  return this;
}
function ja(t) {
  t || (t = Ga);
  function e(p, d) {
    return p && d ? t(p.__data__, d.__data__) : !p - !d;
  }
  for (var n = this._groups, r = n.length, i = new Array(r), o = 0; o < r; ++o) {
    for (var a = n[o], s = a.length, u = i[o] = new Array(s), c, f = 0; f < s; ++f)
      (c = a[f]) && (u[f] = c);
    u.sort(e);
  }
  return new j(i, this._parents).order();
}
function Ga(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function Ka() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function Ja() {
  return Array.from(this);
}
function Qa() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, o = r.length; i < o; ++i) {
      var a = r[i];
      if (a)
        return a;
    }
  return null;
}
function Za() {
  let t = 0;
  for (const e of this)
    ++t;
  return t;
}
function ts() {
  return !this.node();
}
function es(t) {
  for (var e = this._groups, n = 0, r = e.length; n < r; ++n)
    for (var i = e[n], o = 0, a = i.length, s; o < a; ++o)
      (s = i[o]) && t.call(s, s.__data__, o, i);
  return this;
}
function ns(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function rs(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function is(t, e) {
  return function() {
    this.setAttribute(t, e);
  };
}
function os(t, e) {
  return function() {
    this.setAttributeNS(t.space, t.local, e);
  };
}
function as(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttribute(t) : this.setAttribute(t, n);
  };
}
function ss(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, n);
  };
}
function us(t, e) {
  var n = Qe(t);
  if (arguments.length < 2) {
    var r = this.node();
    return n.local ? r.getAttributeNS(n.space, n.local) : r.getAttribute(n);
  }
  return this.each((e == null ? n.local ? rs : ns : typeof e == "function" ? n.local ? ss : as : n.local ? os : is)(n, e));
}
function Zr(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function fs(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function cs(t, e, n) {
  return function() {
    this.style.setProperty(t, e, n);
  };
}
function ls(t, e, n) {
  return function() {
    var r = e.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, n);
  };
}
function ps(t, e, n) {
  return arguments.length > 1 ? this.each((e == null ? fs : typeof e == "function" ? ls : cs)(t, e, n ?? "")) : zt(this.node(), t);
}
function zt(t, e) {
  return t.style.getPropertyValue(e) || Zr(t).getComputedStyle(t, null).getPropertyValue(e);
}
function hs(t) {
  return function() {
    delete this[t];
  };
}
function ds(t, e) {
  return function() {
    this[t] = e;
  };
}
function vs(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? delete this[t] : this[t] = n;
  };
}
function ms(t, e) {
  return arguments.length > 1 ? this.each((e == null ? hs : typeof e == "function" ? vs : ds)(t, e)) : this.node()[t];
}
function ti(t) {
  return t.trim().split(/^|\s+/);
}
function Rn(t) {
  return t.classList || new ei(t);
}
function ei(t) {
  this._node = t, this._names = ti(t.getAttribute("class") || "");
}
ei.prototype = {
  add: function(t) {
    var e = this._names.indexOf(t);
    e < 0 && (this._names.push(t), this._node.setAttribute("class", this._names.join(" ")));
  },
  remove: function(t) {
    var e = this._names.indexOf(t);
    e >= 0 && (this._names.splice(e, 1), this._node.setAttribute("class", this._names.join(" ")));
  },
  contains: function(t) {
    return this._names.indexOf(t) >= 0;
  }
};
function ni(t, e) {
  for (var n = Rn(t), r = -1, i = e.length; ++r < i; )
    n.add(e[r]);
}
function ri(t, e) {
  for (var n = Rn(t), r = -1, i = e.length; ++r < i; )
    n.remove(e[r]);
}
function gs(t) {
  return function() {
    ni(this, t);
  };
}
function ys(t) {
  return function() {
    ri(this, t);
  };
}
function ws(t, e) {
  return function() {
    (e.apply(this, arguments) ? ni : ri)(this, t);
  };
}
function xs(t, e) {
  var n = ti(t + "");
  if (arguments.length < 2) {
    for (var r = Rn(this.node()), i = -1, o = n.length; ++i < o; )
      if (!r.contains(n[i]))
        return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? ws : e ? gs : ys)(n, e));
}
function bs() {
  this.textContent = "";
}
function _s(t) {
  return function() {
    this.textContent = t;
  };
}
function Os(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.textContent = e ?? "";
  };
}
function Es(t) {
  return arguments.length ? this.each(t == null ? bs : (typeof t == "function" ? Os : _s)(t)) : this.node().textContent;
}
function As() {
  this.innerHTML = "";
}
function Ts(t) {
  return function() {
    this.innerHTML = t;
  };
}
function Ss(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.innerHTML = e ?? "";
  };
}
function Ds(t) {
  return arguments.length ? this.each(t == null ? As : (typeof t == "function" ? Ss : Ts)(t)) : this.node().innerHTML;
}
function Cs() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Ns() {
  return this.each(Cs);
}
function $s() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Ms() {
  return this.each($s);
}
function ks(t) {
  var e = typeof t == "function" ? t : jr(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function Rs() {
  return null;
}
function Ls(t, e) {
  var n = typeof t == "function" ? t : jr(t), r = e == null ? Rs : typeof e == "function" ? e : kn(e);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function Ps() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function Is() {
  return this.each(Ps);
}
function Bs() {
  var t = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Vs() {
  var t = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Hs(t) {
  return this.select(t ? Vs : Bs);
}
function Fs(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function Ws(t) {
  return function(e) {
    t.call(this, e, this.__data__);
  };
}
function qs(t) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var n = "", r = e.indexOf(".");
    return r >= 0 && (n = e.slice(r + 1), e = e.slice(0, r)), { type: e, name: n };
  });
}
function zs(t) {
  return function() {
    var e = this.__on;
    if (e) {
      for (var n = 0, r = -1, i = e.length, o; n < i; ++n)
        o = e[n], (!t.type || o.type === t.type) && o.name === t.name ? this.removeEventListener(o.type, o.listener, o.options) : e[++r] = o;
      ++r ? e.length = r : delete this.__on;
    }
  };
}
function Us(t, e, n) {
  return function() {
    var r = this.__on, i, o = Ws(e);
    if (r) {
      for (var a = 0, s = r.length; a < s; ++a)
        if ((i = r[a]).type === t.type && i.name === t.name) {
          this.removeEventListener(i.type, i.listener, i.options), this.addEventListener(i.type, i.listener = o, i.options = n), i.value = e;
          return;
        }
    }
    this.addEventListener(t.type, o, n), i = { type: t.type, name: t.name, value: e, listener: o, options: n }, r ? r.push(i) : this.__on = [i];
  };
}
function Xs(t, e, n) {
  var r = qs(t + ""), i, o = r.length, a;
  if (arguments.length < 2) {
    var s = this.node().__on;
    if (s) {
      for (var u = 0, c = s.length, f; u < c; ++u)
        for (i = 0, f = s[u]; i < o; ++i)
          if ((a = r[i]).type === f.type && a.name === f.name)
            return f.value;
    }
    return;
  }
  for (s = e ? Us : zs, i = 0; i < o; ++i)
    this.each(s(r[i], e, n));
  return this;
}
function ii(t, e, n) {
  var r = Zr(t), i = r.CustomEvent;
  typeof i == "function" ? i = new i(e, n) : (i = r.document.createEvent("Event"), n ? (i.initEvent(e, n.bubbles, n.cancelable), i.detail = n.detail) : i.initEvent(e, !1, !1)), t.dispatchEvent(i);
}
function Ys(t, e) {
  return function() {
    return ii(this, t, e);
  };
}
function js(t, e) {
  return function() {
    return ii(this, t, e.apply(this, arguments));
  };
}
function Gs(t, e) {
  return this.each((typeof e == "function" ? js : Ys)(t, e));
}
function* Ks() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, o = r.length, a; i < o; ++i)
      (a = r[i]) && (yield a);
}
var oi = [null];
function j(t, e) {
  this._groups = t, this._parents = e;
}
function ye() {
  return new j([[document.documentElement]], oi);
}
function Js() {
  return this;
}
j.prototype = ye.prototype = {
  constructor: j,
  select: Oa,
  selectAll: Sa,
  selectChild: $a,
  selectChildren: La,
  filter: Pa,
  data: Wa,
  enter: Ia,
  exit: za,
  join: Ua,
  merge: Xa,
  selection: Js,
  order: Ya,
  sort: ja,
  call: Ka,
  nodes: Ja,
  node: Qa,
  size: Za,
  empty: ts,
  each: es,
  attr: us,
  style: ps,
  property: ms,
  classed: xs,
  text: Es,
  html: Ds,
  raise: Ns,
  lower: Ms,
  append: ks,
  insert: Ls,
  remove: Is,
  clone: Hs,
  datum: Fs,
  on: Xs,
  dispatch: Gs,
  [Symbol.iterator]: Ks
};
function sr(t) {
  return typeof t == "string" ? new j([[document.querySelector(t)]], [document.documentElement]) : new j([[t]], oi);
}
function Ln(t, e, n) {
  t.prototype = e.prototype = n, n.constructor = t;
}
function ai(t, e) {
  var n = Object.create(t.prototype);
  for (var r in e)
    n[r] = e[r];
  return n;
}
function we() {
}
var pe = 0.7, Ue = 1 / pe, Vt = "\\s*([+-]?\\d+)\\s*", he = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", ut = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", Qs = /^#([0-9a-f]{3,8})$/, Zs = new RegExp(`^rgb\\(${Vt},${Vt},${Vt}\\)$`), tu = new RegExp(`^rgb\\(${ut},${ut},${ut}\\)$`), eu = new RegExp(`^rgba\\(${Vt},${Vt},${Vt},${he}\\)$`), nu = new RegExp(`^rgba\\(${ut},${ut},${ut},${he}\\)$`), ru = new RegExp(`^hsl\\(${he},${ut},${ut}\\)$`), iu = new RegExp(`^hsla\\(${he},${ut},${ut},${he}\\)$`), ur = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
Ln(we, Ut, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: fr,
  // Deprecated! Use color.formatHex.
  formatHex: fr,
  formatHex8: ou,
  formatHsl: au,
  formatRgb: cr,
  toString: cr
});
function fr() {
  return this.rgb().formatHex();
}
function ou() {
  return this.rgb().formatHex8();
}
function au() {
  return si(this).formatHsl();
}
function cr() {
  return this.rgb().formatRgb();
}
function Ut(t) {
  var e, n;
  return t = (t + "").trim().toLowerCase(), (e = Qs.exec(t)) ? (n = e[1].length, e = parseInt(e[1], 16), n === 6 ? lr(e) : n === 3 ? new q(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : n === 8 ? ke(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : n === 4 ? ke(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = Zs.exec(t)) ? new q(e[1], e[2], e[3], 1) : (e = tu.exec(t)) ? new q(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = eu.exec(t)) ? ke(e[1], e[2], e[3], e[4]) : (e = nu.exec(t)) ? ke(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = ru.exec(t)) ? dr(e[1], e[2] / 100, e[3] / 100, 1) : (e = iu.exec(t)) ? dr(e[1], e[2] / 100, e[3] / 100, e[4]) : ur.hasOwnProperty(t) ? lr(ur[t]) : t === "transparent" ? new q(NaN, NaN, NaN, 0) : null;
}
function lr(t) {
  return new q(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function ke(t, e, n, r) {
  return r <= 0 && (t = e = n = NaN), new q(t, e, n, r);
}
function su(t) {
  return t instanceof we || (t = Ut(t)), t ? (t = t.rgb(), new q(t.r, t.g, t.b, t.opacity)) : new q();
}
function gn(t, e, n, r) {
  return arguments.length === 1 ? su(t) : new q(t, e, n, r ?? 1);
}
function q(t, e, n, r) {
  this.r = +t, this.g = +e, this.b = +n, this.opacity = +r;
}
Ln(q, gn, ai(we, {
  brighter(t) {
    return t = t == null ? Ue : Math.pow(Ue, t), new q(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? pe : Math.pow(pe, t), new q(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new q(Dt(this.r), Dt(this.g), Dt(this.b), Xe(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: pr,
  // Deprecated! Use color.formatHex.
  formatHex: pr,
  formatHex8: uu,
  formatRgb: hr,
  toString: hr
}));
function pr() {
  return `#${Tt(this.r)}${Tt(this.g)}${Tt(this.b)}`;
}
function uu() {
  return `#${Tt(this.r)}${Tt(this.g)}${Tt(this.b)}${Tt((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function hr() {
  const t = Xe(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${Dt(this.r)}, ${Dt(this.g)}, ${Dt(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function Xe(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function Dt(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function Tt(t) {
  return t = Dt(t), (t < 16 ? "0" : "") + t.toString(16);
}
function dr(t, e, n, r) {
  return r <= 0 ? t = e = n = NaN : n <= 0 || n >= 1 ? t = e = NaN : e <= 0 && (t = NaN), new rt(t, e, n, r);
}
function si(t) {
  if (t instanceof rt)
    return new rt(t.h, t.s, t.l, t.opacity);
  if (t instanceof we || (t = Ut(t)), !t)
    return new rt();
  if (t instanceof rt)
    return t;
  t = t.rgb();
  var e = t.r / 255, n = t.g / 255, r = t.b / 255, i = Math.min(e, n, r), o = Math.max(e, n, r), a = NaN, s = o - i, u = (o + i) / 2;
  return s ? (e === o ? a = (n - r) / s + (n < r) * 6 : n === o ? a = (r - e) / s + 2 : a = (e - n) / s + 4, s /= u < 0.5 ? o + i : 2 - o - i, a *= 60) : s = u > 0 && u < 1 ? 0 : a, new rt(a, s, u, t.opacity);
}
function fu(t, e, n, r) {
  return arguments.length === 1 ? si(t) : new rt(t, e, n, r ?? 1);
}
function rt(t, e, n, r) {
  this.h = +t, this.s = +e, this.l = +n, this.opacity = +r;
}
Ln(rt, fu, ai(we, {
  brighter(t) {
    return t = t == null ? Ue : Math.pow(Ue, t), new rt(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? pe : Math.pow(pe, t), new rt(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, e = isNaN(t) || isNaN(this.s) ? 0 : this.s, n = this.l, r = n + (n < 0.5 ? n : 1 - n) * e, i = 2 * n - r;
    return new q(
      un(t >= 240 ? t - 240 : t + 120, i, r),
      un(t, i, r),
      un(t < 120 ? t + 240 : t - 120, i, r),
      this.opacity
    );
  },
  clamp() {
    return new rt(vr(this.h), Re(this.s), Re(this.l), Xe(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = Xe(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${vr(this.h)}, ${Re(this.s) * 100}%, ${Re(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function vr(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function Re(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function un(t, e, n) {
  return (t < 60 ? e + (n - e) * t / 60 : t < 180 ? n : t < 240 ? e + (n - e) * (240 - t) / 60 : e) * 255;
}
const ui = (t) => () => t;
function cu(t, e) {
  return function(n) {
    return t + n * e;
  };
}
function lu(t, e, n) {
  return t = Math.pow(t, n), e = Math.pow(e, n) - t, n = 1 / n, function(r) {
    return Math.pow(t + r * e, n);
  };
}
function pu(t) {
  return (t = +t) == 1 ? fi : function(e, n) {
    return n - e ? lu(e, n, t) : ui(isNaN(e) ? n : e);
  };
}
function fi(t, e) {
  var n = e - t;
  return n ? cu(t, n) : ui(isNaN(t) ? e : t);
}
const mr = function t(e) {
  var n = pu(e);
  function r(i, o) {
    var a = n((i = gn(i)).r, (o = gn(o)).r), s = n(i.g, o.g), u = n(i.b, o.b), c = fi(i.opacity, o.opacity);
    return function(f) {
      return i.r = a(f), i.g = s(f), i.b = u(f), i.opacity = c(f), i + "";
    };
  }
  return r.gamma = t, r;
}(1);
function bt(t, e) {
  return t = +t, e = +e, function(n) {
    return t * (1 - n) + e * n;
  };
}
var yn = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, fn = new RegExp(yn.source, "g");
function hu(t) {
  return function() {
    return t;
  };
}
function du(t) {
  return function(e) {
    return t(e) + "";
  };
}
function vu(t, e) {
  var n = yn.lastIndex = fn.lastIndex = 0, r, i, o, a = -1, s = [], u = [];
  for (t = t + "", e = e + ""; (r = yn.exec(t)) && (i = fn.exec(e)); )
    (o = i.index) > n && (o = e.slice(n, o), s[a] ? s[a] += o : s[++a] = o), (r = r[0]) === (i = i[0]) ? s[a] ? s[a] += i : s[++a] = i : (s[++a] = null, u.push({ i: a, x: bt(r, i) })), n = fn.lastIndex;
  return n < e.length && (o = e.slice(n), s[a] ? s[a] += o : s[++a] = o), s.length < 2 ? u[0] ? du(u[0].x) : hu(e) : (e = u.length, function(c) {
    for (var f = 0, p; f < e; ++f)
      s[(p = u[f]).i] = p.x(c);
    return s.join("");
  });
}
var gr = 180 / Math.PI, wn = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function ci(t, e, n, r, i, o) {
  var a, s, u;
  return (a = Math.sqrt(t * t + e * e)) && (t /= a, e /= a), (u = t * n + e * r) && (n -= t * u, r -= e * u), (s = Math.sqrt(n * n + r * r)) && (n /= s, r /= s, u /= s), t * r < e * n && (t = -t, e = -e, u = -u, a = -a), {
    translateX: i,
    translateY: o,
    rotate: Math.atan2(e, t) * gr,
    skewX: Math.atan(u) * gr,
    scaleX: a,
    scaleY: s
  };
}
var Le;
function mu(t) {
  const e = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return e.isIdentity ? wn : ci(e.a, e.b, e.c, e.d, e.e, e.f);
}
function gu(t) {
  return t == null || (Le || (Le = document.createElementNS("http://www.w3.org/2000/svg", "g")), Le.setAttribute("transform", t), !(t = Le.transform.baseVal.consolidate())) ? wn : (t = t.matrix, ci(t.a, t.b, t.c, t.d, t.e, t.f));
}
function li(t, e, n, r) {
  function i(c) {
    return c.length ? c.pop() + " " : "";
  }
  function o(c, f, p, d, v, m) {
    if (c !== p || f !== d) {
      var w = v.push("translate(", null, e, null, n);
      m.push({ i: w - 4, x: bt(c, p) }, { i: w - 2, x: bt(f, d) });
    } else
      (p || d) && v.push("translate(" + p + e + d + n);
  }
  function a(c, f, p, d) {
    c !== f ? (c - f > 180 ? f += 360 : f - c > 180 && (c += 360), d.push({ i: p.push(i(p) + "rotate(", null, r) - 2, x: bt(c, f) })) : f && p.push(i(p) + "rotate(" + f + r);
  }
  function s(c, f, p, d) {
    c !== f ? d.push({ i: p.push(i(p) + "skewX(", null, r) - 2, x: bt(c, f) }) : f && p.push(i(p) + "skewX(" + f + r);
  }
  function u(c, f, p, d, v, m) {
    if (c !== p || f !== d) {
      var w = v.push(i(v) + "scale(", null, ",", null, ")");
      m.push({ i: w - 4, x: bt(c, p) }, { i: w - 2, x: bt(f, d) });
    } else
      (p !== 1 || d !== 1) && v.push(i(v) + "scale(" + p + "," + d + ")");
  }
  return function(c, f) {
    var p = [], d = [];
    return c = t(c), f = t(f), o(c.translateX, c.translateY, f.translateX, f.translateY, p, d), a(c.rotate, f.rotate, p, d), s(c.skewX, f.skewX, p, d), u(c.scaleX, c.scaleY, f.scaleX, f.scaleY, p, d), c = f = null, function(v) {
      for (var m = -1, w = d.length, E; ++m < w; )
        p[(E = d[m]).i] = E.x(v);
      return p.join("");
    };
  };
}
var yu = li(mu, "px, ", "px)", "deg)"), wu = li(gu, ", ", ")", ")"), Xt = 0, te = 0, Zt = 0, pi = 1e3, Ye, ee, je = 0, Nt = 0, Ze = 0, de = typeof performance == "object" && performance.now ? performance : Date, hi = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function Pn() {
  return Nt || (hi(xu), Nt = de.now() + Ze);
}
function xu() {
  Nt = 0;
}
function Ge() {
  this._call = this._time = this._next = null;
}
Ge.prototype = di.prototype = {
  constructor: Ge,
  restart: function(t, e, n) {
    if (typeof t != "function")
      throw new TypeError("callback is not a function");
    n = (n == null ? Pn() : +n) + (e == null ? 0 : +e), !this._next && ee !== this && (ee ? ee._next = this : Ye = this, ee = this), this._call = t, this._time = n, xn();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, xn());
  }
};
function di(t, e, n) {
  var r = new Ge();
  return r.restart(t, e, n), r;
}
function bu() {
  Pn(), ++Xt;
  for (var t = Ye, e; t; )
    (e = Nt - t._time) >= 0 && t._call.call(void 0, e), t = t._next;
  --Xt;
}
function yr() {
  Nt = (je = de.now()) + Ze, Xt = te = 0;
  try {
    bu();
  } finally {
    Xt = 0, Ou(), Nt = 0;
  }
}
function _u() {
  var t = de.now(), e = t - je;
  e > pi && (Ze -= e, je = t);
}
function Ou() {
  for (var t, e = Ye, n, r = 1 / 0; e; )
    e._call ? (r > e._time && (r = e._time), t = e, e = e._next) : (n = e._next, e._next = null, e = t ? t._next = n : Ye = n);
  ee = t, xn(r);
}
function xn(t) {
  if (!Xt) {
    te && (te = clearTimeout(te));
    var e = t - Nt;
    e > 24 ? (t < 1 / 0 && (te = setTimeout(yr, t - de.now() - Ze)), Zt && (Zt = clearInterval(Zt))) : (Zt || (je = de.now(), Zt = setInterval(_u, pi)), Xt = 1, hi(yr));
  }
}
function wr(t, e, n) {
  var r = new Ge();
  return e = e == null ? 0 : +e, r.restart((i) => {
    r.stop(), t(i + e);
  }, e, n), r;
}
var Eu = Yr("start", "end", "cancel", "interrupt"), Au = [], vi = 0, xr = 1, bn = 2, Be = 3, br = 4, _n = 5, Ve = 6;
function tn(t, e, n, r, i, o) {
  var a = t.__transition;
  if (!a)
    t.__transition = {};
  else if (n in a)
    return;
  Tu(t, n, {
    name: e,
    index: r,
    // For context during callback.
    group: i,
    // For context during callback.
    on: Eu,
    tween: Au,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: vi
  });
}
function In(t, e) {
  var n = it(t, e);
  if (n.state > vi)
    throw new Error("too late; already scheduled");
  return n;
}
function ct(t, e) {
  var n = it(t, e);
  if (n.state > Be)
    throw new Error("too late; already running");
  return n;
}
function it(t, e) {
  var n = t.__transition;
  if (!n || !(n = n[e]))
    throw new Error("transition not found");
  return n;
}
function Tu(t, e, n) {
  var r = t.__transition, i;
  r[e] = n, n.timer = di(o, 0, n.time);
  function o(c) {
    n.state = xr, n.timer.restart(a, n.delay, n.time), n.delay <= c && a(c - n.delay);
  }
  function a(c) {
    var f, p, d, v;
    if (n.state !== xr)
      return u();
    for (f in r)
      if (v = r[f], v.name === n.name) {
        if (v.state === Be)
          return wr(a);
        v.state === br ? (v.state = Ve, v.timer.stop(), v.on.call("interrupt", t, t.__data__, v.index, v.group), delete r[f]) : +f < e && (v.state = Ve, v.timer.stop(), v.on.call("cancel", t, t.__data__, v.index, v.group), delete r[f]);
      }
    if (wr(function() {
      n.state === Be && (n.state = br, n.timer.restart(s, n.delay, n.time), s(c));
    }), n.state = bn, n.on.call("start", t, t.__data__, n.index, n.group), n.state === bn) {
      for (n.state = Be, i = new Array(d = n.tween.length), f = 0, p = -1; f < d; ++f)
        (v = n.tween[f].value.call(t, t.__data__, n.index, n.group)) && (i[++p] = v);
      i.length = p + 1;
    }
  }
  function s(c) {
    for (var f = c < n.duration ? n.ease.call(null, c / n.duration) : (n.timer.restart(u), n.state = _n, 1), p = -1, d = i.length; ++p < d; )
      i[p].call(t, f);
    n.state === _n && (n.on.call("end", t, t.__data__, n.index, n.group), u());
  }
  function u() {
    n.state = Ve, n.timer.stop(), delete r[e];
    for (var c in r)
      return;
    delete t.__transition;
  }
}
function Su(t, e) {
  var n = t.__transition, r, i, o = !0, a;
  if (n) {
    e = e == null ? null : e + "";
    for (a in n) {
      if ((r = n[a]).name !== e) {
        o = !1;
        continue;
      }
      i = r.state > bn && r.state < _n, r.state = Ve, r.timer.stop(), r.on.call(i ? "interrupt" : "cancel", t, t.__data__, r.index, r.group), delete n[a];
    }
    o && delete t.__transition;
  }
}
function Du(t) {
  return this.each(function() {
    Su(this, t);
  });
}
function Cu(t, e) {
  var n, r;
  return function() {
    var i = ct(this, t), o = i.tween;
    if (o !== n) {
      r = n = o;
      for (var a = 0, s = r.length; a < s; ++a)
        if (r[a].name === e) {
          r = r.slice(), r.splice(a, 1);
          break;
        }
    }
    i.tween = r;
  };
}
function Nu(t, e, n) {
  var r, i;
  if (typeof n != "function")
    throw new Error();
  return function() {
    var o = ct(this, t), a = o.tween;
    if (a !== r) {
      i = (r = a).slice();
      for (var s = { name: e, value: n }, u = 0, c = i.length; u < c; ++u)
        if (i[u].name === e) {
          i[u] = s;
          break;
        }
      u === c && i.push(s);
    }
    o.tween = i;
  };
}
function $u(t, e) {
  var n = this._id;
  if (t += "", arguments.length < 2) {
    for (var r = it(this.node(), n).tween, i = 0, o = r.length, a; i < o; ++i)
      if ((a = r[i]).name === t)
        return a.value;
    return null;
  }
  return this.each((e == null ? Cu : Nu)(n, t, e));
}
function Bn(t, e, n) {
  var r = t._id;
  return t.each(function() {
    var i = ct(this, r);
    (i.value || (i.value = {}))[e] = n.apply(this, arguments);
  }), function(i) {
    return it(i, r).value[e];
  };
}
function mi(t, e) {
  var n;
  return (typeof e == "number" ? bt : e instanceof Ut ? mr : (n = Ut(e)) ? (e = n, mr) : vu)(t, e);
}
function Mu(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function ku(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Ru(t, e, n) {
  var r, i = n + "", o;
  return function() {
    var a = this.getAttribute(t);
    return a === i ? null : a === r ? o : o = e(r = a, n);
  };
}
function Lu(t, e, n) {
  var r, i = n + "", o;
  return function() {
    var a = this.getAttributeNS(t.space, t.local);
    return a === i ? null : a === r ? o : o = e(r = a, n);
  };
}
function Pu(t, e, n) {
  var r, i, o;
  return function() {
    var a, s = n(this), u;
    return s == null ? void this.removeAttribute(t) : (a = this.getAttribute(t), u = s + "", a === u ? null : a === r && u === i ? o : (i = u, o = e(r = a, s)));
  };
}
function Iu(t, e, n) {
  var r, i, o;
  return function() {
    var a, s = n(this), u;
    return s == null ? void this.removeAttributeNS(t.space, t.local) : (a = this.getAttributeNS(t.space, t.local), u = s + "", a === u ? null : a === r && u === i ? o : (i = u, o = e(r = a, s)));
  };
}
function Bu(t, e) {
  var n = Qe(t), r = n === "transform" ? wu : mi;
  return this.attrTween(t, typeof e == "function" ? (n.local ? Iu : Pu)(n, r, Bn(this, "attr." + t, e)) : e == null ? (n.local ? ku : Mu)(n) : (n.local ? Lu : Ru)(n, r, e));
}
function Vu(t, e) {
  return function(n) {
    this.setAttribute(t, e.call(this, n));
  };
}
function Hu(t, e) {
  return function(n) {
    this.setAttributeNS(t.space, t.local, e.call(this, n));
  };
}
function Fu(t, e) {
  var n, r;
  function i() {
    var o = e.apply(this, arguments);
    return o !== r && (n = (r = o) && Hu(t, o)), n;
  }
  return i._value = e, i;
}
function Wu(t, e) {
  var n, r;
  function i() {
    var o = e.apply(this, arguments);
    return o !== r && (n = (r = o) && Vu(t, o)), n;
  }
  return i._value = e, i;
}
function qu(t, e) {
  var n = "attr." + t;
  if (arguments.length < 2)
    return (n = this.tween(n)) && n._value;
  if (e == null)
    return this.tween(n, null);
  if (typeof e != "function")
    throw new Error();
  var r = Qe(t);
  return this.tween(n, (r.local ? Fu : Wu)(r, e));
}
function zu(t, e) {
  return function() {
    In(this, t).delay = +e.apply(this, arguments);
  };
}
function Uu(t, e) {
  return e = +e, function() {
    In(this, t).delay = e;
  };
}
function Xu(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? zu : Uu)(e, t)) : it(this.node(), e).delay;
}
function Yu(t, e) {
  return function() {
    ct(this, t).duration = +e.apply(this, arguments);
  };
}
function ju(t, e) {
  return e = +e, function() {
    ct(this, t).duration = e;
  };
}
function Gu(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Yu : ju)(e, t)) : it(this.node(), e).duration;
}
function Ku(t, e) {
  if (typeof e != "function")
    throw new Error();
  return function() {
    ct(this, t).ease = e;
  };
}
function Ju(t) {
  var e = this._id;
  return arguments.length ? this.each(Ku(e, t)) : it(this.node(), e).ease;
}
function Qu(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    if (typeof n != "function")
      throw new Error();
    ct(this, t).ease = n;
  };
}
function Zu(t) {
  if (typeof t != "function")
    throw new Error();
  return this.each(Qu(this._id, t));
}
function tf(t) {
  typeof t != "function" && (t = Kr(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var o = e[i], a = o.length, s = r[i] = [], u, c = 0; c < a; ++c)
      (u = o[c]) && t.call(u, u.__data__, c, o) && s.push(u);
  return new gt(r, this._parents, this._name, this._id);
}
function ef(t) {
  if (t._id !== this._id)
    throw new Error();
  for (var e = this._groups, n = t._groups, r = e.length, i = n.length, o = Math.min(r, i), a = new Array(r), s = 0; s < o; ++s)
    for (var u = e[s], c = n[s], f = u.length, p = a[s] = new Array(f), d, v = 0; v < f; ++v)
      (d = u[v] || c[v]) && (p[v] = d);
  for (; s < r; ++s)
    a[s] = e[s];
  return new gt(a, this._parents, this._name, this._id);
}
function nf(t) {
  return (t + "").trim().split(/^|\s+/).every(function(e) {
    var n = e.indexOf(".");
    return n >= 0 && (e = e.slice(0, n)), !e || e === "start";
  });
}
function rf(t, e, n) {
  var r, i, o = nf(e) ? In : ct;
  return function() {
    var a = o(this, t), s = a.on;
    s !== r && (i = (r = s).copy()).on(e, n), a.on = i;
  };
}
function of(t, e) {
  var n = this._id;
  return arguments.length < 2 ? it(this.node(), n).on.on(t) : this.each(rf(n, t, e));
}
function af(t) {
  return function() {
    var e = this.parentNode;
    for (var n in this.__transition)
      if (+n !== t)
        return;
    e && e.removeChild(this);
  };
}
function sf() {
  return this.on("end.remove", af(this._id));
}
function uf(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = kn(t));
  for (var r = this._groups, i = r.length, o = new Array(i), a = 0; a < i; ++a)
    for (var s = r[a], u = s.length, c = o[a] = new Array(u), f, p, d = 0; d < u; ++d)
      (f = s[d]) && (p = t.call(f, f.__data__, d, s)) && ("__data__" in f && (p.__data__ = f.__data__), c[d] = p, tn(c[d], e, n, d, c, it(f, n)));
  return new gt(o, this._parents, e, n);
}
function ff(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = Gr(t));
  for (var r = this._groups, i = r.length, o = [], a = [], s = 0; s < i; ++s)
    for (var u = r[s], c = u.length, f, p = 0; p < c; ++p)
      if (f = u[p]) {
        for (var d = t.call(f, f.__data__, p, u), v, m = it(f, n), w = 0, E = d.length; w < E; ++w)
          (v = d[w]) && tn(v, e, n, w, d, m);
        o.push(d), a.push(f);
      }
  return new gt(o, a, e, n);
}
var cf = ye.prototype.constructor;
function lf() {
  return new cf(this._groups, this._parents);
}
function pf(t, e) {
  var n, r, i;
  return function() {
    var o = zt(this, t), a = (this.style.removeProperty(t), zt(this, t));
    return o === a ? null : o === n && a === r ? i : i = e(n = o, r = a);
  };
}
function gi(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function hf(t, e, n) {
  var r, i = n + "", o;
  return function() {
    var a = zt(this, t);
    return a === i ? null : a === r ? o : o = e(r = a, n);
  };
}
function df(t, e, n) {
  var r, i, o;
  return function() {
    var a = zt(this, t), s = n(this), u = s + "";
    return s == null && (u = s = (this.style.removeProperty(t), zt(this, t))), a === u ? null : a === r && u === i ? o : (i = u, o = e(r = a, s));
  };
}
function vf(t, e) {
  var n, r, i, o = "style." + e, a = "end." + o, s;
  return function() {
    var u = ct(this, t), c = u.on, f = u.value[o] == null ? s || (s = gi(e)) : void 0;
    (c !== n || i !== f) && (r = (n = c).copy()).on(a, i = f), u.on = r;
  };
}
function mf(t, e, n) {
  var r = (t += "") == "transform" ? yu : mi;
  return e == null ? this.styleTween(t, pf(t, r)).on("end.style." + t, gi(t)) : typeof e == "function" ? this.styleTween(t, df(t, r, Bn(this, "style." + t, e))).each(vf(this._id, t)) : this.styleTween(t, hf(t, r, e), n).on("end.style." + t, null);
}
function gf(t, e, n) {
  return function(r) {
    this.style.setProperty(t, e.call(this, r), n);
  };
}
function yf(t, e, n) {
  var r, i;
  function o() {
    var a = e.apply(this, arguments);
    return a !== i && (r = (i = a) && gf(t, a, n)), r;
  }
  return o._value = e, o;
}
function wf(t, e, n) {
  var r = "style." + (t += "");
  if (arguments.length < 2)
    return (r = this.tween(r)) && r._value;
  if (e == null)
    return this.tween(r, null);
  if (typeof e != "function")
    throw new Error();
  return this.tween(r, yf(t, e, n ?? ""));
}
function xf(t) {
  return function() {
    this.textContent = t;
  };
}
function bf(t) {
  return function() {
    var e = t(this);
    this.textContent = e ?? "";
  };
}
function _f(t) {
  return this.tween("text", typeof t == "function" ? bf(Bn(this, "text", t)) : xf(t == null ? "" : t + ""));
}
function Of(t) {
  return function(e) {
    this.textContent = t.call(this, e);
  };
}
function Ef(t) {
  var e, n;
  function r() {
    var i = t.apply(this, arguments);
    return i !== n && (e = (n = i) && Of(i)), e;
  }
  return r._value = t, r;
}
function Af(t) {
  var e = "text";
  if (arguments.length < 1)
    return (e = this.tween(e)) && e._value;
  if (t == null)
    return this.tween(e, null);
  if (typeof t != "function")
    throw new Error();
  return this.tween(e, Ef(t));
}
function Tf() {
  for (var t = this._name, e = this._id, n = yi(), r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var a = r[o], s = a.length, u, c = 0; c < s; ++c)
      if (u = a[c]) {
        var f = it(u, e);
        tn(u, t, n, c, a, {
          time: f.time + f.delay + f.duration,
          delay: 0,
          duration: f.duration,
          ease: f.ease
        });
      }
  return new gt(r, this._parents, t, n);
}
function Sf() {
  var t, e, n = this, r = n._id, i = n.size();
  return new Promise(function(o, a) {
    var s = { value: a }, u = { value: function() {
      --i === 0 && o();
    } };
    n.each(function() {
      var c = ct(this, r), f = c.on;
      f !== t && (e = (t = f).copy(), e._.cancel.push(s), e._.interrupt.push(s), e._.end.push(u)), c.on = e;
    }), i === 0 && o();
  });
}
var Df = 0;
function gt(t, e, n, r) {
  this._groups = t, this._parents = e, this._name = n, this._id = r;
}
function yi() {
  return ++Df;
}
var dt = ye.prototype;
gt.prototype = {
  constructor: gt,
  select: uf,
  selectAll: ff,
  selectChild: dt.selectChild,
  selectChildren: dt.selectChildren,
  filter: tf,
  merge: ef,
  selection: lf,
  transition: Tf,
  call: dt.call,
  nodes: dt.nodes,
  node: dt.node,
  size: dt.size,
  empty: dt.empty,
  each: dt.each,
  on: of,
  attr: Bu,
  attrTween: qu,
  style: mf,
  styleTween: wf,
  text: _f,
  textTween: Af,
  remove: sf,
  tween: $u,
  delay: Xu,
  duration: Gu,
  ease: Ju,
  easeVarying: Zu,
  end: Sf,
  [Symbol.iterator]: dt[Symbol.iterator]
};
function Cf(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var Nf = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: Cf
};
function $f(t, e) {
  for (var n; !(n = t.__transition) || !(n = n[e]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${e} not found`);
  return n;
}
function Mf(t) {
  var e, n;
  t instanceof gt ? (e = t._id, t = t._name) : (e = yi(), (n = Nf).time = Pn(), t = t == null ? null : t + "");
  for (var r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var a = r[o], s = a.length, u, c = 0; c < s; ++c)
      (u = a[c]) && tn(u, t, e, c, a, n || $f(u, e));
  return new gt(r, this._parents, t, e);
}
ye.prototype.interrupt = Du;
ye.prototype.transition = Mf;
function ne(t, e, n) {
  this.k = t, this.x = e, this.y = n;
}
ne.prototype = {
  constructor: ne,
  scale: function(t) {
    return t === 1 ? this : new ne(this.k * t, this.x, this.y);
  },
  translate: function(t, e) {
    return t === 0 & e === 0 ? this : new ne(this.k, this.x + this.k * t, this.y + this.k * e);
  },
  apply: function(t) {
    return [t[0] * this.k + this.x, t[1] * this.k + this.y];
  },
  applyX: function(t) {
    return t * this.k + this.x;
  },
  applyY: function(t) {
    return t * this.k + this.y;
  },
  invert: function(t) {
    return [(t[0] - this.x) / this.k, (t[1] - this.y) / this.k];
  },
  invertX: function(t) {
    return (t - this.x) / this.k;
  },
  invertY: function(t) {
    return (t - this.y) / this.k;
  },
  rescaleX: function(t) {
    return t.copy().domain(t.range().map(this.invertX, this).map(t.invert, t));
  },
  rescaleY: function(t) {
    return t.copy().domain(t.range().map(this.invertY, this).map(t.invert, t));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};
ne.prototype;
function kf(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
function Rf(t) {
  if (t.__esModule)
    return t;
  var e = t.default;
  if (typeof e == "function") {
    var n = function r() {
      return this instanceof r ? Reflect.construct(e, arguments, this.constructor) : e.apply(this, arguments);
    };
    n.prototype = e.prototype;
  } else
    n = {};
  return Object.defineProperty(n, "__esModule", { value: !0 }), Object.keys(t).forEach(function(r) {
    var i = Object.getOwnPropertyDescriptor(t, r);
    Object.defineProperty(n, r, i.get ? i : {
      enumerable: !0,
      get: function() {
        return t[r];
      }
    });
  }), n;
}
var Lf = { value: function() {
} };
function wi() {
  for (var t = 0, e = arguments.length, n = {}, r; t < e; ++t) {
    if (!(r = arguments[t] + "") || r in n || /[\s.]/.test(r))
      throw new Error("illegal type: " + r);
    n[r] = [];
  }
  return new He(n);
}
function He(t) {
  this._ = t;
}
function Pf(t, e) {
  return t.trim().split(/^|\s+/).map(function(n) {
    var r = "", i = n.indexOf(".");
    if (i >= 0 && (r = n.slice(i + 1), n = n.slice(0, i)), n && !e.hasOwnProperty(n))
      throw new Error("unknown type: " + n);
    return { type: n, name: r };
  });
}
He.prototype = wi.prototype = {
  constructor: He,
  on: function(t, e) {
    var n = this._, r = Pf(t + "", n), i, o = -1, a = r.length;
    if (arguments.length < 2) {
      for (; ++o < a; )
        if ((i = (t = r[o]).type) && (i = If(n[i], t.name)))
          return i;
      return;
    }
    if (e != null && typeof e != "function")
      throw new Error("invalid callback: " + e);
    for (; ++o < a; )
      if (i = (t = r[o]).type)
        n[i] = _r(n[i], t.name, e);
      else if (e == null)
        for (i in n)
          n[i] = _r(n[i], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, e = this._;
    for (var n in e)
      t[n] = e[n].slice();
    return new He(t);
  },
  call: function(t, e) {
    if ((i = arguments.length - 2) > 0)
      for (var n = new Array(i), r = 0, i, o; r < i; ++r)
        n[r] = arguments[r + 2];
    if (!this._.hasOwnProperty(t))
      throw new Error("unknown type: " + t);
    for (o = this._[t], r = 0, i = o.length; r < i; ++r)
      o[r].value.apply(e, n);
  },
  apply: function(t, e, n) {
    if (!this._.hasOwnProperty(t))
      throw new Error("unknown type: " + t);
    for (var r = this._[t], i = 0, o = r.length; i < o; ++i)
      r[i].value.apply(e, n);
  }
};
function If(t, e) {
  for (var n = 0, r = t.length, i; n < r; ++n)
    if ((i = t[n]).name === e)
      return i.value;
}
function _r(t, e, n) {
  for (var r = 0, i = t.length; r < i; ++r)
    if (t[r].name === e) {
      t[r] = Lf, t = t.slice(0, r).concat(t.slice(r + 1));
      break;
    }
  return n != null && t.push({ name: e, value: n }), t;
}
const Bf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  dispatch: wi
}, Symbol.toStringTag, { value: "Module" })), Vf = /* @__PURE__ */ Rf(Bf), Hf = Vf.dispatch, cn = Math.PI / 180, Ff = {
  archimedean: xi,
  rectangular: Qf
}, re = 64, Fe = 2048;
var Wf = function() {
  var t = [256, 256], e = qf, n = zf, r = Uf, i = Or, o = Or, a = Xf, s = Yf, u = xi, c = [], f = 1 / 0, p = Hf("word", "end"), d = null, v = Math.random, m = {}, w = tc;
  m.canvas = function(g) {
    return arguments.length ? (w = xt(g), m) : w;
  }, m.start = function() {
    var g = E(w()), x = Zf((t[0] >> 5) * t[1]), l = null, O = c.length, y = -1, C = [], $ = c.map(function(A, _) {
      return A.text = e.call(this, A, _), A.font = n.call(this, A, _), A.style = i.call(this, A, _), A.weight = o.call(this, A, _), A.rotate = a.call(this, A, _), A.size = ~~r.call(this, A, _), A.padding = s.call(this, A, _), A;
    }).sort(function(A, _) {
      return _.size - A.size;
    });
    return d && clearInterval(d), d = setInterval(R, 0), R(), m;
    function R() {
      for (var A = Date.now(); Date.now() - A < f && ++y < O && d; ) {
        var _ = $[y];
        _.x = t[0] * (v() + 0.5) >> 1, _.y = t[1] * (v() + 0.5) >> 1, jf(g, _, $, y), _.hasText && D(x, _, l) && (C.push(_), p.call("word", m, _), l ? Kf(l, _) : l = [{ x: _.x + _.x0, y: _.y + _.y0 }, { x: _.x + _.x1, y: _.y + _.y1 }], _.x -= t[0] >> 1, _.y -= t[1] >> 1);
      }
      y >= O && (m.stop(), p.call("end", m, C, l));
    }
  }, m.stop = function() {
    d && (clearInterval(d), d = null);
    for (const g of c)
      delete g.sprite;
    return m;
  };
  function E(g) {
    const x = g.getContext("2d", { willReadFrequently: !0 });
    g.width = g.height = 1;
    const l = Math.sqrt(x.getImageData(0, 0, 1, 1).data.length >> 2);
    return g.width = (re << 5) / l, g.height = Fe / l, x.fillStyle = x.strokeStyle = "red", { context: x, ratio: l };
  }
  function D(g, x, l) {
    t[0], t[1];
    for (var O = x.x, y = x.y, C = Math.sqrt(t[0] * t[0] + t[1] * t[1]), $ = u(t), R = v() < 0.5 ? 1 : -1, A = -R, _, M, S; (_ = $(A += R)) && (M = ~~_[0], S = ~~_[1], !(Math.min(Math.abs(M), Math.abs(S)) >= C)); )
      if (x.x = O + M, x.y = y + S, !(x.x + x.x0 < 0 || x.y + x.y0 < 0 || x.x + x.x1 > t[0] || x.y + x.y1 > t[1]) && (!l || Jf(x, l)) && !Gf(x, g, t[0])) {
        for (var L = x.sprite, V = x.width >> 5, I = t[0] >> 5, B = x.x - (V << 4), P = B & 127, G = 32 - P, K = x.y1 - x.y0, ot = (x.y + x.y0) * I + (B >> 5), W, et = 0; et < K; et++) {
          W = 0;
          for (var H = 0; H <= V; H++)
            g[ot + H] |= W << G | (H < V ? (W = L[et * V + H]) >>> P : 0);
          ot += I;
        }
        return !0;
      }
    return !1;
  }
  return m.timeInterval = function(g) {
    return arguments.length ? (f = g ?? 1 / 0, m) : f;
  }, m.words = function(g) {
    return arguments.length ? (c = g, m) : c;
  }, m.size = function(g) {
    return arguments.length ? (t = [+g[0], +g[1]], m) : t;
  }, m.font = function(g) {
    return arguments.length ? (n = xt(g), m) : n;
  }, m.fontStyle = function(g) {
    return arguments.length ? (i = xt(g), m) : i;
  }, m.fontWeight = function(g) {
    return arguments.length ? (o = xt(g), m) : o;
  }, m.rotate = function(g) {
    return arguments.length ? (a = xt(g), m) : a;
  }, m.text = function(g) {
    return arguments.length ? (e = xt(g), m) : e;
  }, m.spiral = function(g) {
    return arguments.length ? (u = Ff[g] || g, m) : u;
  }, m.fontSize = function(g) {
    return arguments.length ? (r = xt(g), m) : r;
  }, m.padding = function(g) {
    return arguments.length ? (s = xt(g), m) : s;
  }, m.random = function(g) {
    return arguments.length ? (v = g, m) : v;
  }, m.on = function() {
    var g = p.on.apply(p, arguments);
    return g === p ? m : g;
  }, m;
};
function qf(t) {
  return t.text;
}
function zf() {
  return "serif";
}
function Or() {
  return "normal";
}
function Uf(t) {
  return Math.sqrt(t.value);
}
function Xf() {
  return (~~(random() * 6) - 3) * 30;
}
function Yf() {
  return 1;
}
function jf(t, e, n, r) {
  if (!e.sprite) {
    var i = t.context, o = t.ratio;
    i.clearRect(0, 0, (re << 5) / o, Fe / o);
    var a = 0, s = 0, u = 0, c = n.length;
    for (--r; ++r < c; ) {
      e = n[r], i.save(), i.font = e.style + " " + e.weight + " " + ~~((e.size + 1) / o) + "px " + e.font;
      const _ = i.measureText(e.text), M = -Math.floor(_.width / 2);
      let S = (_.width + 1) * o, L = e.size << 1;
      if (e.rotate) {
        var f = Math.sin(e.rotate * cn), p = Math.cos(e.rotate * cn), d = S * p, v = S * f, m = L * p, w = L * f;
        S = Math.max(Math.abs(d + w), Math.abs(d - w)) + 31 >> 5 << 5, L = ~~Math.max(Math.abs(v + m), Math.abs(v - m));
      } else
        S = S + 31 >> 5 << 5;
      if (L > u && (u = L), a + S >= re << 5 && (a = 0, s += u, u = 0), s + L >= Fe)
        break;
      i.translate((a + (S >> 1)) / o, (s + (L >> 1)) / o), e.rotate && i.rotate(e.rotate * cn), i.fillText(e.text, M, 0), e.padding && (i.lineWidth = 2 * e.padding, i.strokeText(e.text, M, 0)), i.restore(), e.width = S, e.height = L, e.xoff = a, e.yoff = s, e.x1 = S >> 1, e.y1 = L >> 1, e.x0 = -e.x1, e.y0 = -e.y1, e.hasText = !0, a += S;
    }
    for (var E = i.getImageData(0, 0, (re << 5) / o, Fe / o).data, D = []; --r >= 0; )
      if (e = n[r], !!e.hasText) {
        for (var g = e.width, x = g >> 5, l = e.y1 - e.y0, O = 0; O < l * x; O++)
          D[O] = 0;
        if (a = e.xoff, a == null)
          return;
        s = e.yoff;
        for (var y = 0, C = -1, $ = 0; $ < l; $++) {
          for (var O = 0; O < g; O++) {
            var R = x * $ + (O >> 5), A = E[(s + $) * (re << 5) + (a + O) << 2] ? 1 << 31 - O % 32 : 0;
            D[R] |= A, y |= A;
          }
          y ? C = $ : (e.y0++, l--, $--, s++);
        }
        e.y1 = e.y0 + C, e.sprite = D.slice(0, (e.y1 - e.y0) * x);
      }
  }
}
function Gf(t, e, n) {
  n >>= 5;
  for (var r = t.sprite, i = t.width >> 5, o = t.x - (i << 4), a = o & 127, s = 32 - a, u = t.y1 - t.y0, c = (t.y + t.y0) * n + (o >> 5), f, p = 0; p < u; p++) {
    f = 0;
    for (var d = 0; d <= i; d++)
      if ((f << s | (d < i ? (f = r[p * i + d]) >>> a : 0)) & e[c + d])
        return !0;
    c += n;
  }
  return !1;
}
function Kf(t, e) {
  var n = t[0], r = t[1];
  e.x + e.x0 < n.x && (n.x = e.x + e.x0), e.y + e.y0 < n.y && (n.y = e.y + e.y0), e.x + e.x1 > r.x && (r.x = e.x + e.x1), e.y + e.y1 > r.y && (r.y = e.y + e.y1);
}
function Jf(t, e) {
  return t.x + t.x1 > e[0].x && t.x + t.x0 < e[1].x && t.y + t.y1 > e[0].y && t.y + t.y0 < e[1].y;
}
function xi(t) {
  var e = t[0] / t[1];
  return function(n) {
    return [e * (n *= 0.1) * Math.cos(n), n * Math.sin(n)];
  };
}
function Qf(t) {
  var e = 4, n = e * t[0] / t[1], r = 0, i = 0;
  return function(o) {
    var a = o < 0 ? -1 : 1;
    switch (Math.sqrt(1 + 4 * a * o) - a & 3) {
      case 0:
        r += n;
        break;
      case 1:
        i += e;
        break;
      case 2:
        r -= n;
        break;
      default:
        i -= e;
        break;
    }
    return [r, i];
  };
}
function Zf(t) {
  for (var e = [], n = -1; ++n < t; )
    e[n] = 0;
  return e;
}
function tc() {
  return document.createElement("canvas");
}
function xt(t) {
  return typeof t == "function" ? t : function() {
    return t;
  };
}
const ec = /* @__PURE__ */ kf(Wf);
function nc(t) {
  return Ci() ? (Ni(t), !0) : !1;
}
function rc(t) {
  return typeof t == "function" ? t() : $i(t);
}
const ic = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
function oc(t) {
  return t || Ar();
}
function ac(t, e = !0, n) {
  oc() ? On(t, n) : e ? t() : Er(t);
}
function Bt(t) {
  var e;
  const n = rc(t);
  return (e = n == null ? void 0 : n.$el) != null ? e : n;
}
const bi = ic ? window : void 0;
function sc() {
  const t = se(!1), e = Ar();
  return e && On(() => {
    t.value = !0;
  }, e), t;
}
function uc(t) {
  const e = sc();
  return Ke(() => (e.value, !!t()));
}
function _i(t, e, n = {}) {
  const { window: r = bi, ...i } = n;
  let o;
  const a = uc(() => r && "ResizeObserver" in r), s = () => {
    o && (o.disconnect(), o = void 0);
  }, u = Ke(() => Array.isArray(t) ? t.map((p) => Bt(p)) : [Bt(t)]), c = En(
    u,
    (p) => {
      if (s(), a.value && r) {
        o = new ResizeObserver(e);
        for (const d of p)
          d && o.observe(d, i);
      }
    },
    { immediate: !0, flush: "post" }
  ), f = () => {
    s(), c();
  };
  return nc(f), {
    isSupported: a,
    stop: f
  };
}
function fc(t, e = { width: 0, height: 0 }, n = {}) {
  const { window: r = bi, box: i = "content-box" } = n, o = Ke(() => {
    var p, d;
    return (d = (p = Bt(t)) == null ? void 0 : p.namespaceURI) == null ? void 0 : d.includes("svg");
  }), a = se(e.width), s = se(e.height), { stop: u } = _i(
    t,
    ([p]) => {
      const d = i === "border-box" ? p.borderBoxSize : i === "content-box" ? p.contentBoxSize : p.devicePixelContentBoxSize;
      if (r && o.value) {
        const v = Bt(t);
        if (v) {
          const m = r.getComputedStyle(v);
          a.value = Number.parseFloat(m.width), s.value = Number.parseFloat(m.height);
        }
      } else if (d) {
        const v = Array.isArray(d) ? d : [d];
        a.value = v.reduce((m, { inlineSize: w }) => m + w, 0), s.value = v.reduce((m, { blockSize: w }) => m + w, 0);
      } else
        a.value = p.contentRect.width, s.value = p.contentRect.height;
    },
    n
  );
  ac(() => {
    const p = Bt(t);
    p && (a.value = "offsetWidth" in p ? p.offsetWidth : e.width, s.value = "offsetHeight" in p ? p.offsetHeight : e.height);
  });
  const c = En(
    () => Bt(t),
    (p) => {
      a.value = p ? e.width : 0, s.value = p ? e.height : 0;
    }
  );
  function f() {
    u(), c();
  }
  return {
    width: a,
    height: s,
    stop: f
  };
}
const cc = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [r, i] of e)
    n[r] = i;
  return n;
}, lc = /* @__PURE__ */ Object.assign({ name: "WordCloud" }, {
  __name: "WordCloud",
  props: {
    words: {
      type: Array,
      default: () => []
    },
    width: {
      type: String,
      default: "500px"
    },
    height: {
      type: String,
      default: "500px"
    }
  },
  setup(t) {
    const e = t, n = se(), r = Mi({
      width: 0,
      height: 0
    }), i = se(""), o = Ke(() => {
      const a = [
        "#1f77b4",
        "#ff7f0e",
        "#2ca02c",
        "#d62728",
        "#9467bd",
        "#8c564b",
        "#e377c2",
        "#7f7f7f",
        "#bcbd22",
        "#17becf"
      ];
      return sr(n.value).select("svg").remove(), ec().size([r.width, r.height]).padding(5).words(ki(e.words)).rotate(() => 0).fontSize((s) => `${s.size}`).on("end", (s) => {
        const c = sr(n.value).append("svg").attr("width", r.width).attr("height", r.height).append("g").attr("width", r.width).attr("height", r.height).attr("transform", `translate(${r.width / 2},${r.height / 2})`);
        Ut("d"), c.selectAll("text").data(s).enter().append("text").style("font-size", (f) => `${f.size}px`).style("cursor", "pointer").attr("text-anchor", "middle").attr("fill", () => a[Math.floor(Math.random() * a.length)]).attr("transform", (f) => `translate(${f.x}, ${f.y})rotate(${f.rotate})`).text((f) => f.text || "").each(function(f) {
          ge(this, {
            content: () => f.text,
            theme: "tomato"
          });
        });
      });
    });
    return _i(n, (a) => {
      const s = a[0], { width: u, height: c } = s.contentRect;
      r.width = u, r.height = c, o.value.start(), i.value = `width: ${u}, height: ${c}`;
    }), En(e.words, () => {
      o.value.start();
    }), On(() => {
      const { width: a, height: s } = fc(n);
      r.width = a.value, r.height = s.value, Er(() => {
        o.value.start();
      });
    }), (a, s) => (Ri(), Li("div", {
      class: "wordcloud",
      ref_key: "cloudRef",
      ref: n,
      style: Pi({
        width: t.width,
        height: t.height
      })
    }, null, 4));
  }
}), pc = /* @__PURE__ */ cc(lc, [["__scopeId", "data-v-2ea3a2e7"]]), hc = [pc], vc = {
  install(t) {
    hc.forEach((e) => {
      t.component(e.name, e);
    });
  }
};
export {
  pc as WordCloud,
  vc as default
};
