function main() {
  var motorHolderSide = 35,
    motorHolderLength = 120,
    motorHolderHeightElevation = 60,
    motorPillarY = 12,
    wallThickness = 2,
    pillarDiam = 12.66,
    baseWidth = 150,
    baseDepth = 150
    steerPinHoleDiam = 6,
    steerDeviceLength = 70,
    fixedPartHeight = 12,
    fixedPartExtend = 10,
    fixedPartLength = motorHolderLength - motorHolderSide + fixedPartExtend,
    fixedPartSideClearance = 2,
    fixedPartElevation = motorHolderHeightElevation + wallThickness + 1,
    fixedPartWidth = motorHolderSide - wallThickness * 2 - fixedPartSideClearance * 2,
    pillarGripGapWidth = 1,
    gripScrewDiam = 5,
    angleFixPlugDiam = 5,
    angleFixThreadDiam = 4;


  var parts = [];

  // motorholder
  if (false) {
    parts.push(squarePipe(motorHolderSide, motorHolderSide, motorHolderLength, wallThickness)
      // pillar hole
      .subtract(cylinder({r: pillarDiam / 2, h: 100}).translate([motorHolderSide / 2, motorPillarY, 0]))
      // cut off for motor top
      .subtract(cube().scale(100).rotateX(45).translate([0, motorHolderLength, 0]))
      // motor mounting holes
      .subtract(motorHoles().translate([motorHolderSide / 2, motorHolderLength - motorHolderSide / 2, 0]))
      .translate([0, 0, motorHolderHeightElevation])
      .setColor(.99, .99, .99));
  }
  // fixed part
  parts.push(cube().scale([fixedPartWidth, fixedPartLength, fixedPartHeight])
    // pillar hole
    .subtract(cylinder({r: pillarDiam / 2, h: fixedPartHeight}).translate([motorHolderSide / 2 - fixedPartSideClearance - wallThickness, motorPillarY + fixedPartExtend, 0]))
    // pillar grip gap
    .subtract(cube().scale([pillarGripGapWidth, fixedPartExtend + motorPillarY, fixedPartHeight])
      .translate([motorHolderSide / 2 - fixedPartSideClearance - pillarGripGapWidth / 2 - fixedPartSideClearance, 0, 0]))
    // grip screw hole
    .subtract(cylinder({r: gripScrewDiam / 2, h: 100}).rotateY(90).translate([0, 6, fixedPartHeight / 2]))
    // right angle fix plug hole
    .subtract(cylinder({r: angleFixPlugDiam / 2, h: 100}).rotateY(90).translate([0, fixedPartLength - 12, fixedPartHeight / 2]))
    // left angle fix plug hole
    .subtract(cylinder({r: angleFixThreadDiam / 2, h: 100}).rotateY(90).translate([0, fixedPartLength - 5, fixedPartHeight / 2]))
    .subtract(cylinder({r: angleFixPlugDiam / 2, h: 100}).rotateY(90).translate([fixedPartWidth / 2, fixedPartLength - 5, fixedPartHeight / 2]))
    .translate([wallThickness + fixedPartSideClearance, -fixedPartExtend, fixedPartElevation])
    .setColor(.99, .99, .99));
  // pillar
  parts.push(cylinder({r: pillarDiam / 2, h: 100, fn: 32}).translate([motorHolderSide / 2, motorPillarY, 0])
    .setColor(.5, .5, .5));
  // mounting base
  parts.push(cube().scale([baseWidth, baseDepth, 20]).translate([motorHolderSide / 2 - baseWidth / 2, 0, 0])
    .subtract(cylinder({r: 8, h: 100}).translate([motorHolderSide / 2, motorHolderLength - motorHolderSide / 2, 0]))
    .setColor(.74, .50, .5)
  );
  return union(parts);
  // .subtract(cube().scale(1000).translate([motorHolderSide / 2, -500, 0]))
  ;
}
function motorHoles() {
  var r1 = 5, r2 = 1.5, d = 8;
  return union(
    cylinder().scale([r1, r1, 100]),
    cylinder().scale([r2, r2, 100]).translate([-d, 0, 0]),
    cylinder().scale([r2, r2, 100]).translate([d, 0, 0]),
  );
}

function squarePipe(width, height, length, thickness) {
  return cube().scale([width, length, height])
    .subtract(cube()
      .scale([width - 2 * thickness, length, height - 2 * thickness])
        .translate([thickness, 0, thickness]))
}
