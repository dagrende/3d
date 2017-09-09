function main() {
  let height = 10,
    plateT = 3,
    plateW = 10,
    dipDown = 4,
    dipW = 5.8,
    screwIn = 5,
    screwHeadD = 6.5,
    screwHeadDown = plateT,
    screwHeadIn = plateT - 0.5,
    screwhole = cylinder({r1: 2.1, r2: 0.9, h:plateT + dipDown})
      .union(cylinder({r: screwHeadD / 2, h:screwHeadIn}))
      .translate([0, 0, -plateT]).rotateX(90),
    screwSlitW = .5,
    screwSlitIn = 2.7,
    screwSlitCornerD = 1,
    dipSlitW = 1.3,
    dipSlitIn = 1.5,
    dipSlitCornerD = 1.3;

  let part = union(
    // plate on top of profile
    cube().scale([plateW, plateT, height]),
    // part dipping into profile
    cube().translate([0, -1, 0]).scale([dipW / 2, dipDown, height])
      // slit to make plate-dip hinge
      .subtract(cube().translate([0, -1, 0]).scale([10, dipSlitW, height]).translate([dipW / 2 - dipSlitIn, 0, 0]))
      .subtract(cylinder({r:dipSlitCornerD / 2, h:height}).translate([dipW / 2 - dipSlitIn , -dipSlitCornerD / 2, 0]))
      // slit to make dip separatable by screw
      .subtract(cube().translate([0, -1, 0]).scale([screwSlitW / 2, 10, height]).translate([0, -dipDown + screwSlitIn, 0]))
      .subtract(cylinder({r:screwSlitCornerD / 2, h:height}).translate([0, -dipDown + screwSlitIn, 0]))
  )
    // conical holes for separating screws
    .subtract(screwhole.translate([0, 0, screwIn]))
    // .subtract(screwhole.translate([0, 0, height - screwIn]))

  return part.union(part.mirroredX())
}
