function main() {
  let outletInnerD = 57.9,
    outletInnerDepth = 14,
    adapterWallThick = 1,
    suckerInnerD = 38,
    suckerPipeDepth = 30;
  return union(cylinder({r: outletInnerD / 2, h: outletInnerDepth, fn: 128})
    .subtract(cylinder({r: outletInnerD / 2 - adapterWallThick, h: outletInnerDepth, fn: 128})),
    cylinder({r:outletInnerD / 2, h: adapterWallThick}),
    cylinder({r: suckerInnerD / 2, h: suckerPipeDepth, fn: 128}),
    cylinderRounding(true, false, {r: outletInnerD / 2 - adapterWallThick, rr:2, fn: 128, fni: 32}).translate([0, 0, adapterWallThick]),
    cylinderRounding(true, true, {r: suckerInnerD / 2, rr:2, fn: 128, fni: 32}).translate([0, 0, adapterWallThick])
  )
  .subtract(cylinder({r: suckerInnerD / 2 - 1.5, h: suckerPipeDepth, fn: 128}))
  .subtract(cylinderRounding(false, false, {r: suckerInnerD / 2, rr:adapterWallThick, fn: 128, fni: 32}).translate([0, 0, suckerPipeDepth - adapterWallThick]))
}

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
