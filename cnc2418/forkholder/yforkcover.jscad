function main() {
  return cube().scale([27, 1+3+3, 2+8.8])
    .subtract(cube().scale([25, 3+3, 8.8]).translate([1, 0, 1]))
     .subtract(cube().scale([27, 1+3+3, 1+8.8]).translate([0, -(1+3), 0]))
    .rotateX(-90)
}
