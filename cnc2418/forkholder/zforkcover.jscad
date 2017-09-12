function main() {
  return cube().scale([22+2, 1+2+1.5, 19])
    .subtract(cube().scale([22, 1.5, 19]).translate([1, 0, 1]))
    .subtract(cube().scale([22, 2+1.5, 10]).translate([1, 0, 1]))
    .rotateX(-90)
}
