function main() {
  let
    suckerInnerD = 38,
    suckerPipeL = 50,
    suckerPipeT = 1.5,
    pipe = r=>cylinder({r: r, h: -suckerPipeL * 2, center: [true, true, true]}).rotateY(45).translate([0, 0, -15]),
    screwHole = cylinder({r: 5.4 / 2, h: -20, center: [true, true, false]}).translate([-9, 26, 0]);

  return union(
    pipe(suckerInnerD / 2),
    // screw block
    cube({center: [false, true, false]}).scale([-15, suckerInnerD + 25, -20]),
    cylinder({r: suckerInnerD / 2 + 5, h: suckerPipeT, center: [true, true, true]}).rotateY(-90).translate([0, 0, -3]).scale([suckerPipeT, 1, 2])
  ).intersect(cube({center: [false, true, false]}).scale([-200, 200, -200]))
  .subtract(pipe(suckerInnerD / 2 - suckerPipeT))
  .subtract(screwHole)
  .subtract(screwHole.mirroredY())
}
