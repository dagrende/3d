function main() {
  let
    cavitySepT = 1.5,
    height = 7,
    axleD = 5,
    ballD = 5,
    springID = 3.8,
    springMinL = 6.6,
    springMaxL = 5,
    cablePlateT = 2,
    width = 2 * (ballD  + cavitySepT) + 2
    ballSpringCavity =
      union(
          cylinder({r: ballD / 2 + .3, h: ballD + springMaxL + cablePlateT})  // spring cavity
            .union(cylinder({r: 1.5, h: 30})).rotateX(-90),  // cable inlet
          sphere({r: ballD / 2 + .3}))
      .translate([0, axleD * 2 / 3, 0])
      .union(
        cube({center: [true, false, false]})
          .scale([ballD + 0.4, ballD + springMaxL + cablePlateT - axleD / 2, height])
          .translate([0, axleD, 0])
      );
  return cylinder({r: width / 2, h: height, fn: 32})
    .union(cube({center: [true, false, false]}).scale([width, axleD + ballD + springMaxL + cablePlateT, height]))
    .subtract(cylinder({r: axleD / 2 + 0.2, h: height}))  // axle hole
    .subtract(ballSpringCavity.translate([(cavitySepT + ballD) / 2, 0, height / 2]))
    .subtract(ballSpringCavity.translate([-(cavitySepT + ballD) / 2, 0, height / 2]))
    .setColor(.8, .8, .8, 1)
}
