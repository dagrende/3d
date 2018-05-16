include('../utils/utils.jscad');

function main() {
  const plugD = 7.8;
  const outer = cylinder({d: 42, h: 8, fn: 64, center: [true, true, false]});
  return union(
    outer
      .union(outer.scale([1.05, 1, 1]).translate([1, 0, 0]))
      .union(cylinder({d: plugD, h: 13 + 21, center: [true, true, false]}).rotateY(90).translate([0, 0, 4]))
      .subtract(cylinder({d: 38.2, h: 10, fn: 64, center: [true, true, false]}).translate([0, 0, 2]))
      .subtract(cylinder({d: 19, h: 2, center: [true, true, false]}))
      .subtract(dupAroundZ(2, cylinder({d: 9, h: 10, center: [true, true, false]}).intersect(cube().center().scale([plugD, 10, 20])).translate([16, 0, 2])).rotateZ(-14))
      .subtract(dupAroundZ(2, cylinder({d: 3, h: 10, center: [true, true, false]}).translate([30.54 / 2, 0, 0]))),
    torus({ri: 5, ro:6})
      .intersect(cube({size: 15, center: [false, false, true]}))
      .union(cylinder({d: plugD, h: 12, center: [true, true, false]}).rotateX(90).translate([5+1, 0, 0]))
      .union(cylinder({d: plugD, h: 12, center: [true, true, false]}).rotateY(-90).translate([0, 5+1, 0]))
      .translate([20, 20, 5])
  )
}
