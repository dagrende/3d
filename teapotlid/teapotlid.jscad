function main() {
  let baseH = 16,
    hatH = 5,
    baseD = 62,
    hatD = 70,
    cupoleR = 200,
    knobD = 15,
    shaftD = 10,
    fn = 128;
  return union(
    cylinder({r: baseD / 2, h: baseH, fn: fn, center: [true, true, false]}).translate([0, 0, -16]),
    cylinder({r: hatD / 2, h: hatH, fn: fn, center: [true, true, true]}),
    torus({ro: hatD / 2, ri: hatH / 2, fno: fn, fni: fn}),
    sphere({r: cupoleR, fn: fn, center: [true, true, true]}).translate([0, 0, -cupoleR + hatH + 0.75]).intersect(cylinder({r: hatD / 2, h: 10, center: [true, true, false]}).translate([0, 0, 0])),
    sphere({r: knobD / 2, center: [true, true, true]}).translate([0, 0, hatH * 3]),
    cylinder({r: shaftD / 2, h: 10, center: [true, true, false]}),
    sphere({r: 4, center: [true, true, true]}).scale([1, 1, .5]).translate([baseD / 2, 0, -baseH + 2]),
    sphere({r: 4, center: [true, true, true]}).scale([1, 1, .5]).translate([-baseD / 2, 0, -baseH + 2])
  ).subtract(cylinder({r: 1.5, h: 100, center: [true, true, true]}).translate([baseD * .4, 0, 0]))
}
