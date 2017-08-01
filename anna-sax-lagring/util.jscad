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

// function main() {
//   return cylinderRounding(false, false, {r: 10, rr: 2, fn: 32, fni: 16})
// }
