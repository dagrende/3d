function main() {
  const width = 151.5,
    height = 74.1,
    thick = 10.5,
    pthick = 1,
    hangstripheight = 10,
    bottom = cube().scale([width / 2 + pthick, pthick, thick + 2 * pthick]),
    side = cube().scale([pthick, 12, thick + 2 * pthick]).translate([width / 2, pthick, 0]),
    back = cube().scale([width / 2, 12, pthick]).translate([0, pthick, 0]),
    hangstrip = cube().scale([12, height + hangstripheight, pthick])
      .translate([width / 2 - 12 + pthick, pthick, 0]),
    corner = cylinder({r: 12, h: 1}).intersect(cube().scale([12, 12, 1])).rotateZ(90),
    stand = union(bottom,
      corner.translate([width / 2, pthick, 10.5 + pthick]),
      side,
      back,
      hangstrip
    );
  return stand.union(stand.mirroredX())
}
