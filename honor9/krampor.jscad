include("../attacher/lib.jscad");

function main() {
  const phoneSize = {x: 147.3, y: 70.9, z: 7.45},
    cornerR = 8;
  const width = 151.5,
    height = 74.1,
    thick = 10.5
  const tr = 2,
    out = 10,
    front = 3,
    bendr = 3,
    bend = torus({ri: tr, ro: bendr, fni: 32})
      .intersect(cube({size: bendr + tr, center: [false, false, true]})),
    hook1 = union(stack('y', align('+xz', [
      bend.rotateZ(-90),
      cylinder({r: tr, h: thick}).rotateX(90),
      bend
    ]))),
    hook = union(stack('x', align('+yz', [
      sphere({r: tr}).subtract(cube({size: tr * 2, center: [false, true, true]})),
      cylinder({r: tr, h: front}).rotateY(90),
      hook1
    ]))),
    hookBounds = hook.getBounds(),
    mountPoint = [hookBounds[1].x - bendr - tr, hookBounds[0].y + tr, 0];
    hook.properties.mount = new CSG.Connector(
      mountPoint,
      [0, -1, 0],
      [0, 0, 1]);

    const barLength = phoneSize.x - bendr + tr;
    let bar = cylinder({r: tr, h: barLength, center: [true, true, true]}).rotateY(90);
    bar.properties.leftMount = new CSG.Connector([-barLength / 2, 0, 0], [0, 1, 0], [0, 0, 1]);
    bar.properties.rightMount = new CSG.Connector([barLength / 2, 0, 0], [0, 1, 0], [0, 0, 1]);

    const hookLeft = hook.connectTo(hook.properties.mount, bar.properties.leftMount, false, 0);
    const hookRight = hook.connectTo(hook.properties.mount, bar.properties.rightMount, true, 0);
  return union(hookLeft, bar, hookRight).setColor(.95,.95,.45)
}
