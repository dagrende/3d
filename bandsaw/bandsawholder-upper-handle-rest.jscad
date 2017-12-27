function main() {
  let w = 80,
    r = 10;

  rest = linear_extrude({ height: w },
    hull(circle({r:r, center: true}), circle({r:r, center: true}).translate([-40, 40]))
  ).rotateX(90).translate([0, w, 0]);
  rest = rest.union(cube().scale([4 * r, w, 4 * r]).translate([-r, 0, -r]).rotateY(45));
  rest = rest.subtract(cylinder({r: r, h: w, center: [true, true, false]}).rotateX(-90).translate([2 * r, 0, r]).rotateY(-45));
  rest = rest.subtract(cube().scale([w, w, 8 * r]).translate([1.4*r, 0, -4*r]));
  rest = rest.union(cube().scale([12, w, 8 * r]).translate([1.4*r, 0, -4*r]));
  return rest;
}
