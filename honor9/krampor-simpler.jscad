/*
  Holder for mobile Huawei HOnor 9 with soft case, to be inserted in SD card and audio jack of VW Polo 2017
*/

include("../attacher/lib.jscad");
function main() {
  const phoneSizeBare = {x: 147.3, y: 70.9, z: 7.45},
    phoneSizeInCase = {x: 151.7, y: 74.2, z: 10.0},
    phoneSize = {x: 152.2, y: 74.2, z: 10.5}, // with marg
    SDSize = {x: 24, y: 2, z: 32},
    topBottomToKrampa = 24,
    leftRightToKrampa = 16,
    cornerR = 8,
    holderCenterDist = phoneSize.y - 2 * topBottomToKrampa;

  const
    tr = 2,
    out = 10,
    bendr = 3,
    front = 3.5 - (bendr - tr);
  const
    soundPlugD = 3.5,
    soundPlugCenter = {x: 0, y: 0},
    SDLeftToPlugRight = 54.14,
    SDRightToPlugLeft = 25.86;

    bend = torus({ri: tr, ro: bendr, fni: 32})
      .intersect(cube({size: bendr + tr, center: [false, false, true]})),
    hook1 = union(stack('y', align('+xz', [
      bend.rotateZ(-90),
      cylinder({r: tr, h: phoneSize.z - 2 * (bendr - tr)}).rotateX(90),
      bend
    ]))),
    hook = union(stack('x', align('+yz', [
      sphere({r: tr}).subtract(cube({size: tr * 2, center: [false, true, true]})),
      cylinder({r: tr, h: front - tr}).rotateY(90),
      hook1
    ]))),
  hookBounds = hook.getBounds();
  hookCenter = hook.translate([-hookBounds[1].x + bendr + tr, -hookBounds[0].y - tr, 0]).rotateX(90).rotateZ(-90);

  const bendExtra = bendr - tr;
  const barLength = phoneSize.x - 2 * bendExtra;
  let bar = cylinder({r: tr, h: barLength, center: [true, true, true]}).rotateY(90);

  const bottomHook =
    union(cylinder({r: tr, h: holderCenterDist + topBottomToKrampa - tr - 2, center: [true, true, false]})
      .rotateX(-90),
    hookCenter).rotateY(90).rotateZ(90);
  const joints = cylinder({r: 6, h: 2 * tr + 1, fn: 8, center: [true, true, true]}).rotateZ(360 / 16)
    .subtract(cylinder({r: tr, h: 30, center: [true, true, true]}).rotateY(90))
    .subtract(cube({size: [30, 1.5, 30], center: true}))
    .subtract(cylinder({r: tr, h: 30, center: [true, true, true]}).rotateX(90))
  const joint1 = cylinder({r: 6, h: 2 * tr, fn: 8, center: [true, true, true]}).rotateZ(360 / 16)
    .rotateX(90)
    .intersect(cube(20).center().translate([0, 0, 10]))
    .subtract(cylinder({r: tr, h: 10, center: [true, true, false]}));
  const jointEnd = cylinder({r: 6, h: 2 * tr, center: [true, true, true]}).rotateX(90);
  const ext = 4;
  const joint = jointEnd.translate([phoneSize.x / 2 - leftRightToKrampa + ext, 0, 0])
    .union(jointEnd.translate([-phoneSize.x / 2 + leftRightToKrampa - ext, 0, 0]))
    .union(cube().center().scale([phoneSize.x - 2 * leftRightToKrampa + ext, 2 * tr, 2 * 6]))
    .intersect(cube().center().scale([phoneSize.x + 2 * ext, 2 * tr, 6]).translate([0, 0, 3]))
    .subtract(cylinder({r: tr, h: 10, center: [true, true, false]}).translate([-phoneSize.x / 2 + leftRightToKrampa, 0, 0]))
    .subtract(cylinder({r: tr, h: 10, center: [true, true, false]}).translate([phoneSize.x / 2 - leftRightToKrampa, 0, 0]));

  const hookLeft = hookCenter.rotateZ(-90).translate([-barLength / 2, 0, 0]);
  const hookRight = hookCenter.rotateZ(90).translate([barLength / 2, 0, 0]);
  const krampa = union(hookLeft, bar, hookRight).rotateX(90);
  const stand = union(
    union(
      krampa,
      CSG.cube({corner1: [0, 0, -SDSize.y / 2], corner2: [SDSize.x, SDSize.z / 2, SDSize.y / 2]}).translate([-phoneSize.x / 2 + 27, 0, 0]),
      cylinder({d: 3.2, h: 10, center: [true, true, true]}).rotateX(90).translate([-phoneSize.x / 2 + 27 + SDSize.x + SDRightToPlugLeft + soundPlugD / 2, 5, 0])
    ).rotateX(180),
    joint
    //cylinder({r: 10, h: 6 * cos(360 / 16) + tr, center: [true, true, false]}).translate([0, 15, -tr])

    // union(align('-z', [
    //   bottomHook,
    //   bottomHook.translate([9, -6, 0]),
    //   joints.translate([-10, 10, 0])
    // ])).rotateZ(180).translate([-55, -12, 0])
  )
  return stand.setColor(.95,.95,.45)
}
