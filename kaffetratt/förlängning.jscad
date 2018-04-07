function main() {
  let fn = 64,
    tube = (od, t, h) => cylinder({d: od, h, fn}).subtract(cylinder({d: od - t, h, fn})),
    funnel = (uod, lod, t, h) => cylinder({d1: uod, d2: lod, h, fn}).subtract(cylinder({d1: uod - t, d2: lod - t, h, fn}))
  return union(
    cylinder({d: 35, h: 55, fn}),
    cylinder({d1:48, d2:35, h: 5}).translate([0, 0, 25]),
    cylinder({d1:35, d2:40, h: 5}).translate([0, 0, 50])
  ).subtract(cylinder({d: 33, h: 55, fn}))
  .mirroredZ()
}
