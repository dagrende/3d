function main() {
  let r = 65 / 2 + 2
    up = r / 2,
    thick = 1,
    fn = 128
    topKeeper = cylinder({r: 2 * r, h: 2 * r, center: [true, true, false]});
  return sphere({r: r, fn}).subtract(sphere({r: r - thick, fn}))
    .intersect(topKeeper)
    .translate([0, 0, up])
    .union(cylinder({r: r, h: up, center: [true, true, false], fn}))
    .union(cylinder({r: r + 25, h: thick, center: [true, true, false], fn}))
    .subtract(cylinder({r: r - thick, h: up, center: [true, true, false], fn}))
    .setColor(0.95, 0.95, 0.95)
}
