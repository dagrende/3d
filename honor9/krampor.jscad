/*
  Lägg till en hållare som
  - snäpper fast runt mittpinnarna
  - har en 3.5mm rund och en SD-kortformad tapp till hålen i VW-brädan
  - för ut kramporna lite från brädan
  - låter kramporna skjutas lite i sidled
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
    SDRightToPlugLeft = 25.86,
    SDCenter = {x: -(SDSize.x / 2 + SDRightToPlugLeft + soundPlugD / 2), y: 0},
    soundPlug = union(stack('z', align('xy', [cylinder({d: soundPlugD, h: -10, center: [true, true, false]}),
      cylinder({d1: soundPlugD, d2: 2, h: 3, center: [true, true, false]}).translate([0, 0, -13])
    ]))),
    SDPlug = (SDSize)=>cube({size: [SDSize.x, SDSize.y, -(SDSize.z / 2 + 3)], center: [true, true, false]})
        .translate([SDCenter.x, SDCenter.y, 0]),
    plate = cube({size: [70, holderCenterDist + 7*tr, 3], center: [true, true, false]}).translate([-25, -holderCenterDist / 2 - 2, 0]),
    holderKnob1 = cylinder({r: tr, h: tr * 2 + 1, center: [true, true, false]}),
    holderKnob2 =  cube().scale([tr * 2, tr * 3, tr * 2]).center().translate([0, 0, tr]),
    holderKnob = CSG.roundedCube({corner1: [-tr / 2, -tr * 2, 0], corner2: [tr * 2, tr, tr * 2 + 1], roundradius: 0.9}),
    fixture = union(
      plate
        .subtract(SDPlug({x: SDSize.x + 0.62 , y: SDSize.y * 1.24, z: SDSize.z}).translate([0, 0, 3]))
        .subtract(soundPlug.scale([1.2, 1.2, 1]).translate([0, 0, 3]))
        .union(stack('z', align('xy', [plate, dup4corners(64, holderCenterDist + 3 * tr, holderKnob)]))[1].translate([0, 0, -.9]))
          .subtract(cylinder({r: tr, h: 150, center: [true, true, true]}).rotateY(90).translate([0, -tr, 3+tr]))
          .subtract(cylinder({r: tr, h: 150, center: [true, true, true]}).rotateY(90).translate([0, -tr - holderCenterDist , 3+tr]))
        .subtract(align('xy', [plate, plate.scale([0.8, 0.6, 1])])[1].translate([0, -3, 0]))
          .lieFlat(),
      SDPlug(SDSize).rotateX(90).lieFlat().translate([13, -3, 0]),
      soundPlug.rotateZ(90).lieFlat().translate([-3, 0, 0]),
      cylinder({r: 6, h: 8, center: [true, true, false]}).translate([-16, -3, 0])
    ).translate([20, 27, 0]);

    function dup4corners(w, h, obj) {
      return union(obj,
        obj.translate([0, h, 0]),
        obj.translate([w, h, 0]),
        obj.translate([w, 0, 0])
      )
    }


    function kramp() {
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

      const barLength = phoneSize.x - bendr + tr;
      let bar = cylinder({r: tr, h: barLength, center: [true, true, true]}).rotateY(90);

      const hookLeft = hookCenter.rotateZ(-90).translate([-barLength / 2, 0, 0]);
      const hookRight = hookCenter.rotateZ(90).translate([barLength / 2, 0, 0]);
      const krampa = union(hookLeft, bar, hookRight);
      const stand = union(
        krampa,
        krampa.translate([0, holderCenterDist, 0]),
        cylinder({r: tr, h: holderCenterDist + topBottomToKrampa, center: [true, true, false]}).rotateX(-90).translate([-barLength / 2 + 16, -24, 0]),
        hookCenter.translate([-barLength / 2 + leftRightToKrampa, -topBottomToKrampa, 0]),
        cylinder({r: tr, h: holderCenterDist + topBottomToKrampa, center: [true, true, false]}).rotateX(-90).translate([barLength / 2 - 16, -24, 0]),
        hookCenter.translate([barLength / 2 - leftRightToKrampa, -topBottomToKrampa, 0]),
      )
      return stand
    }

  return [
    //kramp().translate([0, -40, 0]).setColor(.95,.95,.45),
    fixture.setColor(.95,.95,.45)
  ]
}

// krampa 24 up
// krampa y - 24 up
