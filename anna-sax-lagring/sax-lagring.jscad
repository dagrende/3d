include("util.jscad");

function main() {
  var kyd = 22, // kullagerytterdiam
    kh = 7,     // kullagerhöjd
    vt = 1,     // väggtjocklek
    fyd = 30,   // flänsytterdiam
    ft = 1,     // flänstjocklek
    del1 = kyd => cylinder({r: kyd / 2 + vt, h: kh + ft})
    .union(cylinder({r: fyd / 2, h: ft}))
    .subtract(cylinder({r: kyd / 2, h: kh}).translate([0, 0, ft]))
    .subtract(cylinder({r: 10, h: ft}));
  return union(
    del1(kyd + 0.5),
    del1(kyd + 2 * vt + 1)
      // .rotateX(180).translate([0, 0, 40])
      .translate([fyd + 2, 0, 0])
  ).translate([-fyd / 2, 0, 0])
  .subtract(cube().translate([-0.5, 0, 0]).scale(100 ));
}
