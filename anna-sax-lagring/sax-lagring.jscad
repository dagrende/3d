include("util.jscad");

function main() {
  var kyd = 22, // kullagerytterdiam
    kh = 7,     // kullagerhöjd
    vt = 1,     // väggtjocklek
    fyd = 30,   // flänsytterdiam
    ft = 1,     // flänstjocklek
    rr = vt * 0.8,  // rundningsradie
    fn = 128,
    del = kyd => cylinder({r: kyd / 2 + vt, h: kh + ft, fn: fn})
    .union(cylinder({r: fyd / 2, h: ft, fn: fn}))
    .subtract(cylinder({r: kyd / 2, h: kh, fn: fn}).translate([0, 0, ft]))
    .subtract(cylinder({r: 10, h: ft, fn: fn}))
    .union(cylinderRounding(true, false, {r: kyd / 2, rr: rr, fn: fn, fni: 16}).translate([0, 0, ft]))
    .union(cylinderRounding(true, true, {r: kyd / 2 + vt, rr: rr, fn: fn, fni: 16}).translate([0, 0, ft])),
    deli = kyd => del(kyd).subtract(cylinderRounding(false, false, {r: kyd / 2 + vt, rr: rr, fn: fn, fni: 16}).translate([0, 0, ft + kh - rr]));
    delo = kyd => del(kyd).subtract(cylinderRounding(false, true, {r: kyd / 2, rr: rr, fn: fn, fni: 16}).translate([0, 0, ft + kh - rr]));
    // add upper roundings to fit lower roundings
  return union(
    deli(kyd + 0.5),
    delo(kyd + 2 * vt + 1.1)
      // .rotateX(180).translate([0, 0, 40])
      .translate([fyd + 2, 0, 0])
  ).translate([-fyd / 2, 0, 0])
  // .subtract(cube().translate([-0.5, 0, 0]).scale(100 ));
}
