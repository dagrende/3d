function main() {
  return cube().scale([7.7+2, 1+3+1.5, 23])
    .subtract(cube().scale([7.7, 1.5, 22]).translate([1, 0, 1]))
    .subtract(cube().scale([7.7, 2+1.5, 21]).translate([1, 0, 1]))
    .rotateX(-90)
}
