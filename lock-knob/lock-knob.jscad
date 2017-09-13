function main(params) {
  return lockKnob(params.screwD, params.nutFlatD)
}

function getParameterDefinitions() {
  return [
    { name: 'screwD', type: 'float', initial: 4, caption: "Screw diameter [mm]:" },
    { name: 'nutFlatD', type: 'float', initial: 7, caption: "Nut flat diameter [mm]:" }
  ];
}

function lockKnob(screwD, nutFlatD) {
  let n = 16,
    nutMaxD = sqrt(nutFlatD * nutFlatD * 5 / 4),
    seq = n => Array.apply(null, {length: n}).map(Function.call, Number);
  return cylinder({r: 4, h: 2})
    .union(cylinder({r1: 4, r2: 8, h: 5}).translate([0, 0, 2]))
    .union(cylinder({r: 8, h: 5}).translate([0, 0, 7]))
    .subtract(union(seq(n).map(i => cylinder({r: 1, h: 10}).translate([0, 8.5, 5]).rotateZ(i * 360 / n))))
    .subtract(cylinder({r: 6, h: 5}).translate([0, 0, 7]))
    .subtract(cylinder({r: screwD / 2 + 0.3, h: 20}))
    .subtract(cylinder({r: nutMaxD / 2 + .3, h: 20, fn: 6}).translate([0, 0, 0]).translate([0, 0, 4]))
}
