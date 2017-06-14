function main() {
  function ccube() {
    return cube().translate([-0.5, -0.5, 0])
  }
  var bite = cylinder().scale(5).translate([10, 0, 0]);
  var nut = cylinder({r: 7 / cos(30) / 2, h: 3, fn: 6});
  var screwholed = 4.3;

  return ccube().scale([14.5, 14.5, 1])
    .union(nut.scale([1.5, 1.5, 1]))
    .intersect(ccube().scale(19).rotateZ(45))
    .subtract(bite)
    .subtract(bite.rotateZ(90))
    .subtract(bite.rotateZ(180))
    .subtract(bite.rotateZ(270))
    .subtract(nut
      .translate([0, 0, 1]))
    .subtract(cylinder({r: screwholed / 2, h: 10}));
}
