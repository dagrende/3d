include("dimensions.jscad");
include("../utils/utils.jscad");

function main() {
  let
  outside = cylinder({r: dr(drumD) + sideThick + drumPadding, h: drumH / 2 + footH, center: [true, true, false]}),
  footHole = cylinder({r: dr(footD), h: footH * 10, center: [true, true, false]}),
  drumHole = cylinder({r: dr(drumD) + drumPadding, h: drumH + coilExtH + footH, center: [true, true, false]}),
  cableChannel = cube({size: [cablesW, cablesW, footH - cablesH], center: [false, true, false]})
    .union(cylinder({r: 1, h: 1, center: [true, true, true]})),
  footLockScrewD = 3;

  return outside
  .subtract(footHole)
  .subtract(drumHole.translate([0, 0, footH - cablesH]))
  .subtract(cableChannel.translate([5, 0, 0]))
  .subtract(cylinder({r: dr(footLockScrewD), h: 100, center: [true, true, true]}).rotateX(90).translate([0, 0, (footH - cablesH) * 2 / 3]))
}
