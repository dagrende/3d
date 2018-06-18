function main() {
  let r = 65 / 2 + 2,
    thick = 1,
    fn = 128;
  return sphere({r: r, fn}).subtract(sphere({r: r - thick, fn})).translate([0, 0, r])
    .union(cylinder({r: r, h: r, center: [true, true, false], fn}))
    .union(cylinder({r: r + 25, h: thick, center: [true, true, false], fn}))
    .subtract(cylinder({r: r - thick, h: r, center: [true, true, false], fn}))
    .setColor(0.95, 0.95, 0.95)
}
