include("../attacher/lib.jscad");

function main() {
  const phoneSize = {x: 147.3, y: 70.9, z: 7.45},
    cornerR = 8;
  const width = 151.5,
    height = 74.1,
    thick = 10.5
  const
    tr = 2,
    out = 10,
    bendr = 3,
    front = 3.5 - (bendr - tr),
    bend = torus({ri: tr, ro: bendr, fni: 32})
      .intersect(cube({size: bendr + tr, center: [false, false, true]})),
    hook1 = union(stack('y', align('+xz', [
      bend.rotateZ(-90),
      cylinder({r: tr, h: thick}).rotateX(90),
      bend
    ]))),
    hook = union(stack('x', align('+yz', [
      sphere({r: tr}).subtract(cube({size: tr * 2, center: [false, true, true]})),
      cylinder({r: tr, h: front - tr}).rotateY(90),
      hook1
    ]))),
    hookBounds = hook.getBounds();
    hookCenter = hook.translate([-hookBounds[1].x + bendr + tr, -hookBounds[0].y - tr, 0]).rotateX(90).rotateZ(-90);

    const barLength = phoneSize.x - bendr + tr;
    let bar = cylinder({r: tr, h: barLength, center: [true, true, true]}).rotateY(90);

    const hookLeft = hookCenter.rotateZ(-90).translate([-barLength / 2, 0, 0]);
    const hookRight = hookCenter.rotateZ(90).translate([barLength / 2, 0, 0]);
    const krampa = union(hookLeft, bar, hookRight);
  return union(
    krampa,
    krampa.translate([0, phoneSize.y - 2 * 24, 0]),
    cylinder({r: tr, h: phoneSize.y - 2 * 24 + 24, center: [true, true, false]}).rotateX(-90).translate([-barLength / 2 + 16, -24, 0]),
    hookCenter.translate([-barLength / 2 + 16, -24, 0]),
    cylinder({r: tr, h: phoneSize.y - 2 * 24 + 24, center: [true, true, false]}).rotateX(-90).translate([barLength / 2 - 16, -24, 0]),
    hookCenter.translate([barLength / 2 - 16, -24, 0]),
  ).setColor(.95,.95,.45)
}

// krampa 24 up
// krampa y - 24 up
