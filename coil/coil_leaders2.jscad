function main() {
  let r1 = 17,
  r2 = 47,
  n = 4,
  thick = 1,
  leaderWidth = r1 * sin(360 / (n * 6)) - 1.5,
  leaderHeight = leaderWidth,
  ringWidth = 2,
  seq = n => Array.apply(null, {length: n}).map(Function.call, Number),
  dupAroundZ = (f, n) => union(seq(n).map(i => f(i, n).rotateZ(360 * i / n))),
  leader = cube({center: [false, true, false]}).scale([r2 - r1, leaderWidth, thick]).translate([r1, 0, 0]),
  supportRing = (r, ringWidth) => cylinder({r: r + ringWidth, h: thick, fn: n * 6, center: [true, true, false]})
    .subtract(cylinder({r: r, h: thick, fn: n * 6, center: [true, true, false]})).translate([0, 0, 0]),
  knobHeight = 3,
  knobWidth = 5,
  knobShaftR = 2,
  coilThick = 4,
  knob = cylinder({r: knobShaftR + coilThick / 2, h: coilThick + thick, center: [true, true, false]}).translate([0, 0, -thick])
    .intersect(cube().scale([knobWidth, knobWidth, knobHeight + thick]).translate([0, 0, -thick]))
    .subtract(torus({ro: knobShaftR + coilThick / 2, ri: coilThick / 2}).translate([0, 0, .6]))
    .union(cylinder({r: 1.5, h: coilThick, center: [true, true, false]}).translate([0, 0, -thick]))
    .subtract(cylinder({r: .25, h: coilThick, center: [true, true, false]}).translate([0, 0, -thick]));

  return union(
    dupAroundZ(()=>leader, n * 6),
    dupAroundZ((i)=>{
      let k = knob.translate([r2-leaderWidth, -leaderWidth / 2 - knobShaftR, thick]);
      if (Math.floor(i / 3) % 2 == 1) {
        return k.mirroredX()
      }
      return k;
    }, n * 6),
    // knob,
    supportRing(r1, ringWidth),
    supportRing(r1 + (r2 - r1 - ringWidth) / 2, ringWidth),
    supportRing(r2 - ringWidth, ringWidth)
  )
}

/*
supportRing(r2, ringWidth)
.union(supportRing(r1 + ringWidth, ringWidth))
.union(
*/
