function main() {
  let r1 = 17,
  r2 = 47,
  n = 4,
  thick = 1,
  leaderWidth = r1 * sin(360 / (n * 6)) - 1,
  leaderHeight = leaderWidth + thick,
  ringWidth = 2,
  seq = n => Array.apply(null, {length: n}).map(Function.call, Number),
  dupAroundZ = (obj, n) => union(seq(n).map(i => obj.rotateZ(360 * i / n))),
  leaderBlock = (outset) => cube({center: [false, true, false]}).scale([r2 - r1, leaderWidth + outset, leaderHeight]).translate([r1, 0, 0]),
  leader = leaderBlock(thick).subtract(leaderBlock(0)),
  supportRing = (r, ringWidth) => cylinder({r: r + ringWidth, h: thick, fn: n * 6, center: [true, true, false]})
    .subtract(cylinder({r: r, h: thick, fn: n * 6, center: [true, true, false]})).translate([0, 0, 0]);
  console.log('leaderWidth', leaderWidth);
  console.log('leaderHeight', leaderHeight);

  return union(
    dupAroundZ(leaderBlock(thick), n * 6)
    .subtract(dupAroundZ(leaderBlock(0), n * 6)),
    supportRing(r1, ringWidth),
    supportRing(r1 + (r2 - r1 - ringWidth) / 2, ringWidth),
    supportRing(r2 - ringWidth, ringWidth)
  ).rotateZ(1)
}

/*
supportRing(r2, ringWidth)
.union(supportRing(r1 + ringWidth, ringWidth))
.union(
*/
