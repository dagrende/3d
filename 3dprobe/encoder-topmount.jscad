include('../utils/utils.jscad');

function main() {
  const plugD = 7.8,
    encoderD = 38.2,
    encoderAndScrewsD = 41,
    encoderH = 32,
    topToCable = 25,
    cableRingD = 12,
    fastenH = 30,
    cableSlot = linear_extrude({height: 100},
      hull(circle(7/2).center(),circle(7/2).center().translate([1000,0,0]) ).union(circle(13/2).center())),
    lockRing = torus({ro: (encoderAndScrewsD + 1) / 2, ri: 1, fni: 4, fno: 64}),
    slotIn = 3,
    slot = union(cylinder({r: 1, h: fastenH, center: [true, true, false]}),
      cube().translate([-.5, 0, 0]).scale([2, encoderAndScrewsD / 2, fastenH])),
    fodder = cylinder({d: encoderAndScrewsD, h: fastenH, fn: 64, center: [true, true, false]})
      .subtract(cube().translate([-.5, -.5, 0]).scale([25, 25, fastenH]))
      .subtract(dupAroundZ(4, union(slot.translate([0, 25 / 2 + slotIn, 0]),
        slot.rotateZ(180).translate([5, 16.5, 0]),
        slot.rotateZ(180).translate([-5, 16.5, 0]))))
      .setColor(0.95, 0.95, 0.95),
    mount = union(
      cylinder({d: encoderAndScrewsD + 2, h: encoderH + fastenH, fn: 64, center: [true, true, false]})
        .subtract(cylinder({d: encoderAndScrewsD, h: encoderH + fastenH, fn: 64, center: [true, true, false]}).translate([0, 0, 5]))
        .subtract(cylinder({d: encoderD, h: encoderH + fastenH, fn: 64, center: [true, true, false]}).translate([0, 0, 2]))
        .subtract(cylinder({d: encoderD + 1, h: 45, fn: 64, center: [true, true, false]}).translate([0, 0, 2]))
        .subtract(cylinder({d: 19, h: 2, fn: 64, center: [true, true, false]}))
        .subtract(dupAroundZ(2, cylinder({d: 3, h: 10, center: [true, true, false]}).translate([30.54 / 2, 0, 0])))
        .union(lockRing.translate([0, 0, encoderH + fastenH * 2 / 3]))
        .subtract(cableSlot.rotateY(90).rotateX(180).translate([0, 0, topToCable + 2]))

      ).setColor(0.95, 0.95, 0.95),
    ball = sphere({r: 5, center: [true, true, false]})
      .subtract(cylinder({d: 3, h: 5, center: [true, true, false]}))
      .subtract(cylinder({d1: 3, d2: 0, h: 1.5, center: [true, true, false]}).translate([0, 0, 5]))
      .setColor(0.95, 0.95, 0.95),
    pillarOD = 39.9,
    pillarID = 36.2,
    barThick = 4,
    pillarH = 40,
    biteR = pillarID / 2 * sqrt(3),
    biteOut = pillarID,
    pillarHolder = cylinder({d: pillarID + 0.3, h: pillarH, fn: 64, center: [true, true, false]})
      .subtract(union(dupAroundZ(3, cylinder({r: biteR, h: pillarH, fn: 64, center: [true, true, false]}).translate([biteOut + barThick / 2, 0, 0]))))
      .subtract(cylinder({r: 2.5, h: pillarH, center: [true, true, false]}))
    // cylinder({r: 5, h: 15, center: [true, true, false]})


return [pillarHolder]
}
