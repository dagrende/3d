function main() {
  let axleDiam = 9,
    holderDiam = 40
    axleRadius = axleDiam / 2,
    holderRadius = holderDiam / 2,
    elevation = 2;
  let holder = cylinder({r1: holderRadius, r2:axleRadius, h: 5})
    .translate([0, 0, elevation])
    .union(cylinder({r: holderRadius, h: elevation}));

holder = cylinder({r1: holderRadius, r2:axleRadius, h: 5})
  .translate([0, 0, elevation])
  .union(cylinder({r: holderRadius, h: elevation}))
  .union(cylinder({r: 5, h: 10}))
  .union(cylinder({r: 2.5, h: 3}).translate([0, 0, -3]))
  .subtract(cylinder({r: 1, h: 100}).translate([0, 0, -50]))
  .subtract(cylinder({r: 2, h: 5}).translate([0, 0, 5]))

  return holder
}
