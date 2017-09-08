function main() {
  let height = 30,
    plateT = 3,
    dipDown = 10,
    screwIn = 4,
    screwHeadD = 5,
    screwHeadDown = plateT
    screwhole = cylinder({r1: 1, r2: .2, h:plateT + dipDown})
      .union(cylinder({r: screwHeadD / 2, h:plateT}))
      .translate([0, 0, -plateT]).rotateX(90);

  return union(
    // plate on top of profile
    cube().scale([dipDown, plateT, height]),
    // part dipping into profile
    cube().translate([0, -1, 0]).scale([3, 6, height])
      // slit to make plate-dip hinge
      .subtract(cube().translate([0, -1, 0]).scale([3, .5, height]).translate([1, 0, 0]))
      // slit to make dip separatable by screw
      .subtract(cube().translate([0, -1, 0]).scale([.2, 5, height]).translate([0, -2, 0]))
  )
    // conical holes for separating screws
    .subtract(screwhole.translate([0, 0, screwIn]))
    .subtract(screwhole.translate([0, 0, height - screwIn]))
}
