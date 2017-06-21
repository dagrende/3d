function main() {
  var motorHolderSide = 35,
    motorHolderLength = 60,
    motorHolderHeightElevation = 60,
    motorPillarY = 12,
    wallThickness = 2,
    pillarHeight = 170,
    pillarDiam = 12.66 + 0.4,
    baseHeight = 15,
    baseWidth = 100,
    baseDepth = 120,
    steerPinHoleDiam = 6,
    steerDeviceLength = 70,
    fixedPartHeight = 10,
    fixedPartExtend = 10,
    fixedPartLength = motorHolderLength - motorHolderSide + fixedPartExtend,
    fixedPartSideClearance = 2,
    fixedPartElevation = motorHolderHeightElevation + wallThickness + 1,
    fixedPartWidth = motorHolderSide - wallThickness * 2 - fixedPartSideClearance * 2,
    pillarGripGapWidth = 1,
    gripScrewDiam = 4,
    angleFixPlugDiam = 5,
    angleFixThreadDiam = 4,
    gliderOuterDiam = pillarDiam + 4,
    gliderHeight = 16,
    springHeight = 44,
    springDiam = 15,
    arcRadius = 35,
    upperHolderUp = springHeight + gliderHeight + fixedPartHeight,
    arcUp = upperHolderUp + gliderHeight / 2- arcRadius,
    barDiam = gliderOuterDiam - 2,
    pillarClearance = 10,
    sinkHoleDiam = 6,
    sinkHoleOut = (pillarDiam + sinkHoleDiam) / 2 + pillarClearance + 10;

  var gliderAggregate = (out) => cylinder({r: gliderOuterDiam / 2, h: gliderHeight, fn:64})
    .union(cube().translate([-0.5, 0, 0]).scale([gliderOuterDiam, out, gliderHeight]));

    // returns a cube with any corners rounded
    // rexp has the form ([xXyYzZ]+([0-9].[0-9])?)+ where a is the primary and b the secondary side to be rounded
    // A side can be x, X, y, Y, z or Z, where x is min x side and X is max x side
    // Zx rounds the edge shared by the top
  function roundCornerCube(rexp) {
    
  }

  return gliderAggregate(arcRadius)
    .union(
      gliderAggregate(arcRadius).translate([0, 0, springHeight + gliderHeight + fixedPartHeight])
    )
    .union(cube().translate([-0.5, 0, 0])
      .scale([gliderOuterDiam, arcRadius - gliderOuterDiam / 2 - pillarClearance, upperHolderUp])
      .translate([0, gliderOuterDiam / 2 + pillarClearance, 0]))
    // .union(cylinder({r: motorHolderSide / 2, h: 16})
    //   .subtract(cylinder({r: (motorHolderSide - 2 * wallThickness) / 2, h: 14}).translate([0, 0, 2]))
    //   .translate([0, motorHolderLength, 0])).subtract(cylinder({r: (motorHolderSide - 2 * wallThickness) / 2, h: 14, fn:128})
    //   .translate([0, motorHolderLength, 2])).subtract(motorHoles().translate([0, motorHolderLength, 0]))
    // .subtract(armHole({length: 100, d: 5, x1: sinkHoleOut + 2, x2: sinkHoleOut + 4, y: gliderHeight + fixedPartHeight / 2 + 2}))
    // .union(holder().translate([0, 0, gliderHeight + 1]))
    .subtract(new cylinder({r:pillarDiam / 2, h: pillarHeight, fn:128}))

  function holder() {
    return cube().translate([-0.5, 0, 0]).scale([pillarDiam + 4, pillarDiam + gripScrewDiam + 5 + pillarClearance - 1, fixedPartHeight])
    .translate([0, -(pillarDiam / 2 + gripScrewDiam + 5), 0])
    .union(armHole({length: pillarDiam + 4 + 4, d:4, x1: pillarDiam / 2, x2: pillarDiam / 2, y: fixedPartHeight / 2}))
    .subtract(cube().translate([-0.5, -1, 0]).scale([1, 20, fixedPartHeight]))
    .subtract(armHole({length: 100, d: gripScrewDiam, x1: -(pillarDiam + gripScrewDiam + 5) / 2, x2: -(pillarDiam + gripScrewDiam + 5) / 2, y: fixedPartHeight / 2}))
    .subtract(cylinder({r: 3.97, h: 2, fn: 6}).rotateY(90).translate([gliderOuterDiam / 2 - 2, -(pillarDiam + gripScrewDiam + 5) / 2, fixedPartHeight / 2]))
  }
}


function armHole(conf) {
  var h = hull( circle(conf.d / 2),circle(conf.d / 2).translate([0, conf.x2 - conf.x1, 0]) ).translate([-conf.d / 2, -conf.d / 2]);
  var hole = linear_extrude({ height: conf.length }, h);
  return hole.translate([0, 0, -conf.length / 2]).rotateY(90)
    .translate([0, conf.x1, conf.y])
}

function motorHoles() {
  var r1 = 5, r2 = 1.5, d = 8;
  return union(
    cylinder({fn:128}).scale([r1, r1, 100]),
    cylinder().scale([r2, r2, 100]).translate([-d, 0, 0]),
    cylinder().scale([r2, r2, 100]).translate([d, 0, 0])
  );
}

function pipe(conf) {
  return new cylinder({r:conf.outerDiam / 2, h: conf.h})
    .subtract(new cylinder({r:conf.innerDiam / 2, h: conf.h}))
}
