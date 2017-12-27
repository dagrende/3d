function main() {
  let r = 3 / cos(30),
  l = 30;
  return union(
    cylinder({r: r, h: 20, fn: 6, center: [true, true, false]}),
    cube({center: [true, false, false]}).scale([2 * r, 30, 2 * r]),
    cylinder({r: r, h: -25, center: [true, true, false]}).translate([0, l, 2 * r])
  )
}
