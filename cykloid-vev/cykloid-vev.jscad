function main() {
  let r = 3 / cos(30),
  l = 15,
  rp2 = r + 2,
  bendPart = union(
    cylinder({r: r, h: l, fn: 6, center: [true, true, false]}).rotateZ(30).translate([0, -rp2, rp2]),
    torus({ri: r, ro: rp2, fni: 6}).rotateY(90)
    .intersect(cube({center: [true, false, false]}).scale([100, -100, -100])).translate([0, 0, rp2])
  );
  return union(
    bendPart,
    cylinder({r: r, h: 20, fn: 6, center: [true, true, false]}).rotateZ(30).rotateX(-90),
    bendPart.rotateX(180).translate([0, 20, 0])
  )
}
