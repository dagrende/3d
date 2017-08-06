function main() {
  let axleDiam = 9,
    holderDiam = 40
    axleRadius = axleDiam / 2,
    holderRadius = holderDiam / 2,
    elevation = 2;
  let holder = cylinder({r1: holderRadius, r2:axleRadius, h: 5})
    .subtract(linear_extrude({ height: 10 },
      hull( circle(axleRadius).translate(-axleRadius, -axleRadius),
        circle(axleRadius * 1.5).translate([-axleRadius * 1.5, holderRadius]) )))
    .translate([0, 0, elevation])
    .union(cylinder({r: holderRadius, h: elevation}))
    .subtract(cylinder({r: 1, h: 10}))
    .subtract(cylinder({r: 1, h: 10}).translate([0, holderRadius, 0]));
  return holder.union(holder.translate([holderDiam + 2, 0, 0]))
}
