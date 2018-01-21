let
seq = n => Array.apply(null, {length: n}).map(Function.call, Number),
dupAroundZ = (n, obj) => union(seq(n).map(i => obj.rotateZ(360 * i / n))),
dr = d => d / 2
;

// upper - true rounds upper part of cylinder, false rounds lower
// outer - true for outgoing rounding, false for ingoing
function cylinderRounding(upper, outer, param) {
  var p = Object.assign({}, {fn: 32, fni: 16}, param);
  var torusUp = upper ? p.rr : 0;
  var torusIn = outer ? 0 : p.rr;
  p.r = p.r + p.rr - torusIn;
  p.h = p.rr;
  return cylinder(p)
    .subtract(cylinder({r: p.r - p.rr, h: p.h, fn: p.fn}))
    .subtract(torus({ro: p.r - torusIn, ri: p.rr, fno: p.fn, fni: p.fni})
      .translate([0, 0, torusUp])
    );
}

function pipe({r1, r2, h, fn}) {
  console.log({r1, r2, h, fn});
  return cylinder({r: r2, h: h, fn, center: [true, true, false]})
    .subtract(cylinder({r: r1, h: h, fn, center: [true, true, false]}))
}
