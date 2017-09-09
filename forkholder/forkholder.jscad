function main() {
  let height = 10,
    plateT = 3,
    plateW = 10,
    dipDown = 4,
    dipW = 6.1 / 2,
    screwIn = 5,
    screwHeadD = 6.5,
    screwHeadDown = plateT
    screwhole = cylinder({r1: 2.1, r2: 0.9, h:plateT + dipDown})
      .union(cylinder({r: screwHeadD / 2, h:plateT}))
      .translate([0, 0, -plateT]).rotateX(90);

  let part = union(
    // plate on top of profile
    cube().scale([plateW, plateT, height]),
    // part dipping into profile
    cube().translate([0, -1, 0]).scale([dipW, dipDown, height])
      // slit to make plate-dip hinge
      .subtract(cube().translate([0, -1, 0]).scale([3, .5, height]).translate([0.6, 0, 0]))
      // slit to make dip separatable by screw
      .subtract(cube().translate([0, -1, 0]).scale([.2, 5, height]).translate([0, -2, 0]))
  )
    // conical holes for separating screws
    .subtract(screwhole.translate([0, 0, screwIn]))
    // .subtract(screwhole.translate([0, 0, height - screwIn]))

  return part.union(part.mirroredX())
}
