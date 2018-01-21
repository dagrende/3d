function main() {
  let
    seq = n => Array.apply(null, {length: n}).map(Function.call, Number),
    angles = n => seq(n).map(i => i * 360.0 / n),
    ringRI = 3,
    ringR1 = 50,
    ringR2 = 75,
    hook = torus({ro: 25, ri: 20, fni: 32})
      .subtract(torus({ro: 25, ri: 18, fni: 32}))
      .intersect(cube({center: [true, false, true]}).scale([20, 20, 40]))
      .intersect(cylinder({r: 15, h: 40, center: [true, true, true]}).translate([0, 3, 0]))
      .scale(0.3),
    hooks = angles(8).map((v, i) => hook.rotateZ(i % 2 ? 45 : -45).translate([0, ringR1, ringRI]).rotateZ(v)),
    ring1 = torus({ri: ringRI, ro: ringR1});
  return union(ring1, hooks)
}
