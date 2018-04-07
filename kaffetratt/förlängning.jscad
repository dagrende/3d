function main() {
  let fn = 127,
    tube = (od, t, h) => cylinder({d: od, h, fn}).subtract(cylinder({d: od - t, h, fn})),
    funnel = (uod, lod, t, h) => cylinder({d1: uod, d2: lod, h, fn}).subtract(cylinder({d1: uod - t, d2: lod - t, h, fn}))
  return tube(39, 1, 31)
    .union(funnel(39, 35, 1, 5).translate([0, 0, 31]))
    .union(tube(35, 1, 25).translate([0, 0, 31+5]))
}
