include("dimensions.jscad");
include("../utils/utils.jscad");

function main() {
  let fanD = 100,
    bladeN = 24,
    bladeH = 30,
    bladeR1 = 9,
    bladeR2 = 6,
    topR1 = dr(fanD) - 10;
  blade = cylinder({r: bladeR2, h: bladeH, center: [true, true, false]})
    .subtract(cylinder({r: bladeR1, h: bladeH, center: [true, true, false]})
      .translate([0, 4, 0]))
    .translate([dr(fanD) - bladeR1 / 1.9, bladeR2 - 4 / 2, 0])

    let
    outsideH = drumH + footH - topThick,
    footHole = cylinder({r: dr(footD), h: footH * 10, center: [true, true, false]}),
    cableChannel = cube({size: [cablesW, cablesW, footH - cablesH], center: [false, true, false]})
      .union(cylinder({r: 1, h: 1, center: [true, true, true]})),
    top = cylinder({r: dr(drumD) + (sideThick + drumPadding) * 2, h: topThick, center: [true, true, false]}),
    drumHole = cylinder({r: dr(drumHoleD), h: topThick, center: [true, true, false]}).translate([dr(drumHoleRingD), 0, 0]),
    drumTop = cylinder({r: dr(drumTopD), h: drumTopH + topThick, center: [true, true, false]})
      .union(cylinderRounding(true, true, {rr: 2, r: dr(drumTopD), h: drumTopH + topThick, center: [true, true, false]})),
    outside = cylinder({r: dr(drumD) + (sideThick + drumPadding) * 2, h: outsideH, center: [true, true, false]})
      .subtract(cylinder({r: dr(drumD) + sideThick + drumPadding * 2, h: outsideH, center: [true, true, false]}))
      .union(cylinderRounding(true, true, {rr: 2, r: dr(drumD) + (sideThick + drumPadding) * 2, h: drumTopH + topThick, center: [true, true, false]}).translate([0, 0, topThick]))
      .translate([0, 0, -outsideH]);

    mount = top
    .union(dupAroundZ(3, drumHole.rotateZ(60).translate([0, 0, -.8])))
    .union(drumTop.scale([1.3, 1.3, 1]).translate([0, 0, topThick]))
    .union(cylinder({r1: dr(drumTopD) * 1.3, r2: dr(axleD * 2), h: drumTopToThreadH, center: [true, true, false]}).translate([0, 0, drumTopH + topThick * 2]))
    .subtract(drumTop)
    .subtract(dupAroundZ(3, drumHole).scale([1, 1, 2]))
    .subtract(cylinder({r: dr(axleD), h: 100, center: [true, true, false]}))
    .union(outside)

  return pipe({r1: dr(drumD) + (sideThick + drumPadding) * 2, r2: dr(fanD), h: topThick, fn: bladeN})
    .union(dupAroundZ(bladeN, blade))
    .union(pipe({r1: topR1, r2: dr(fanD), h: sideThick, fn: bladeN}).translate([0, 0, bladeH - sideThick]))
    //.union(mount.translate([0, 0, outsideH]));
}
