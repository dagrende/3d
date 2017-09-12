function main() {
  let height = 20,
    plateT = 3,
    plateW = 20,
    dipDown = .7,
    dipW = 6 + .8,
    screwD = 5 + .5,
    screwUp = 6,
    screwHeadD = 8,
    screwHeadDown = plateT,
    screwHeadIn = plateT - 0.5,
    screwOut = 5,
    forkW = 13.2,
    forkH = 10,
    forkT = 6 + .3,
    forkGapW = 4.9,
    forkWMarg = 5,
    forkPlateT = 2,
    forkUp = 11,
    forkHole = cube().scale([forkPlateT, forkW, forkT]);

  function holder(height, vertical) {
    let base = union(
      // plate on top of profile
      cube().translate([-0.5, 0, 0]).scale([plateW, plateT, height]),
      // part dipping into profile
      cube().translate([-0.5, -1, 0]).scale([dipW, dipDown, height]),
      // screw head seat
      cylinder({r: screwHeadD / 2, h: screwOut}).rotateX(-90).translate([0, 0, screwUp])

    ).subtract(cylinder({r: screwD / 2, h: 100, center: true}).rotateX(90).translate([0, 0, screwUp]));
    if (vertical) {
      return base
          .union(
            // fork mounting plate
            cube().translate([0, 0, 0]).scale([forkPlateT, forkW + forkWMarg, height])
              // fork hole
              .subtract(forkHole.translate([0, forkWMarg / 2, forkUp])).translate([-plateW / 2 + 15, plateT, 0])
          )
    } else {
      return base
          .union(
            // fork mounting plate
            cube().translate([0, 0, 0]).scale([forkPlateT, 20, height])
              // fork hole
              .subtract(cube().scale([forkPlateT, forkT, forkW]).translate([0, 11, height - forkW - forkWMarg / 2])).translate([-plateW / 2 + 15, plateT, 0])
          )
    }
  }

  return holder(height + 7, false);
}
