function main() {
  var motorHolderSide = 35,
    motorHolderLength = 100,
    motorHolderHeightElevation = 60,
    motorPillarY = 12,
    wallThickness = 2,
    pillarHeight = 110,
    pillarDiam = 15,
    pillarHoleDiam = 14,
    baseHeight = 15,
    baseWidth = 100,
    baseDepth = 120,
    steerPinHoleDiam = 6,
    steerDeviceLength = 70,
    fixedPartHeight = 8,
    fixedPartExtend = 10,
    fixedPartLength = motorHolderLength - motorHolderSide + fixedPartExtend,
    fixedPartSideClearance = 2,
    fixedPartElevation = motorHolderHeightElevation + wallThickness + 1,
    fixedPartWidth = motorHolderSide - wallThickness * 2 - fixedPartSideClearance * 2,
    pillarGripGapWidth = 1,
    gripScrewDiam = 4,
    angleFixPlugDiam = 5,
    angleFixThreadDiam = 4,
    gliderOuterDiam = 19;

function glidePipe(conf) {
  return new cylinder({r:conf.outerDiam / 2, h: conf.h})
    .subtract(new cylinder({r:conf.innerDiam / 2, h: conf.h}))
}

  var parts = [];

  parts.push(
    cylinder({r: gliderOuterDiam / 2, h: 16, fn:64})
  // parts.push(cylinder({r: gliderOuterDiam / 2, h: 16})
  //   .translate([motorHolderSide / 2, motorPillarY, 60]))
    .union(glidePipe({outerDiam: 14, innerDiam: 12, h: 30})
      .rotateY(90).rotateZ(90).translate([0,0, 8]))


    .subtract(new cylinder({r:pillarDiam / 2, h: 100, fn:128}))
    .union(cylinder({r: motorHolderSide / 2, h: 16})
      .subtract(cylinder({r: (motorHolderSide - 2 * wallThickness) / 2, h: 14}).translate([0, 0, 2]))
      .translate([0, 30, 0])).subtract(cylinder({r: (motorHolderSide - 2 * wallThickness) / 2, h: 14, fn:128})
      .translate([0, 30, 2])).subtract(motorHoles().translate([0, 30, 0]))

    .subtract(cube().scale([100, 100, 100]).translate([-20, -20, 5]))
  )
  // parts.push(glidePipe({outerDiam: 14, innerDiam: 12, h: 50})
  //   .rotateY(125).rotateZ(90)
  //   .translate([motorHolderSide / 2, motorPillarY, 68]))


  // pillar
  // parts.push(cylinder({r: pillarDiam / 2, h: pillarHeight, fn: 32})
  //   .translate([motorHolderSide / 2, motorPillarY, 0])
  //   .setColor(0.5, 0.5, 0.5));
  // mounting base
  // parts.push(cube().scale([baseWidth, baseDepth, baseHeight]).translate([motorHolderSide / 2 - baseWidth / 2, 0, 0])
  //   .subtract(cylinder({r: 0.5, h: 100})
  //   .translate([motorHolderSide / 2, motorHolderLength - motorHolderSide / 2, 0]))
  //   .setColor(0.74, 0.50, 0.5)
  // );
  return union(parts);
}
function motorHoles() {
  var r1 = 5, r2 = 1.5, d = 8;
  return union(
    cylinder({fn:128}).scale([r1, r1, 100]),
    cylinder().scale([r2, r2, 100]).translate([-d, 0, 0]),
    cylinder().scale([r2, r2, 100]).translate([d, 0, 0])
  );
}

function squarePipe(width, height, length, thickness) {
  return cube().scale([width, length, height])
    .subtract(cube()
      .scale([width - 2 * thickness, length, height - 2 * thickness])
        .translate([thickness, 0, thickness]));
}
