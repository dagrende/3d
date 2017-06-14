function main() {
  function ccube() {
    return cube().translate([-0.5, -0.5, 0])
  }

  var screwholed = 4.5;
  return ccube().scale([46, 46, 21.5])
    .subtract(ccube().scale([43, 43, 20]).translate([0, 0, 1.5]))
    .subtract(ccube().scale([40, 50, 10]).translate([0, 0, 20-6+1.5]))
    .union(cylinder({r1: 8, r2: 4, h: 5}))
    .subtract(cylinder({r: screwholed / 2, h: 10}))
    .rotateZ(90);
}
