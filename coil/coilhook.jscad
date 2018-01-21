function main() {
  let
    r = 3,
    d = 3,
    v = 30,
    v2 = v / 2,
    shaftl = 10,
    boardt = 3.5,
    extl = 2,
    boardHoleD = 3,
    shaft = union(
      sphere({r: d / 2}).translate([0, 0, shaftl]),
      cylinder({r: d / 2, h: shaftl})
    ),
    shaftTip = {x: r * cos(-v2) + shaftl * sin(v2), y: 0, z: r * sin(-v2) + shaftl * cos(v2)},
    vhalf = union(
      shaft.translate([r, 0, 0]).rotateY(v2),
      torus({ri: d / 2, ro: r, fni: 32}).rotateX(90)
        .subtract(cube().translate([-1, -0.5, -0.5]).scale(4 * r))
        .subtract(cube().translate([-0.5, -0.5, 0]).scale(4 * r).rotateY(v2))
    ),
    vpart = union(vhalf.mirroredX(),
      vhalf
    ),
    plugSolid = cylinder({r: boardHoleD / 2, h: boardt + extl}).rotateY(90),
    plug = plugSolid.subtract(plugSolid.subtract(plugSolid.translate([0, 0, boardHoleD / 4])).translate([-extl, 0, 0])),
    hook = vpart
      .subtract(cube().translate([0, -0.5, -0.5]).scale(30).translate([shaftTip.x, 0, 0]))
      .union(plug.translate([shaftTip.x, shaftTip.y, shaftTip.z]))
      .translate([-shaftTip.x, -shaftTip.y, -shaftTip.z]);

  if (true) {
    return hook
  } else {
    // show hooks in use around a masonite disk
    let seq = n => Array.apply(null, {length: n}).map(Function.call, Number),
    angles = n => seq(n).map(i => i * 360.0 / n),
    board = cylinder({r: 200, h: boardt}).subtract(cylinder({r: 3, h:boardt})),
    hooks = angles(20).map(v => hook.rotateY(90).translate([190, 0, boardt]).rotateZ(v));

    return board.union(hooks)
  }
}
