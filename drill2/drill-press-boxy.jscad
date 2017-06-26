function main() {
  var motorHolderSide = 35,
    motorHolderLength = 60,
    motorHolderHeightElevation = 60,
    motorPillarY = 12,
    wallThickness = 2,
    pillarHeight = 167,
    pillarDiam = 12.66,
    pillarHole = pillarDiam + 0.4,
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
    gliderHeight = 10,
    springHeight = 44,
    springDiam = 15,
    arcRadius = 35,
    upperHolderUp = springHeight + gliderHeight + fixedPartHeight,
    arcUp = upperHolderUp + gliderHeight / 2- arcRadius,
    barDiam = gliderOuterDiam - 2,
    pillarClearance = 5,
    sinkHoleDiam = 6,
    sinkHoleOut = (pillarDiam + sinkHoleDiam) / 2 + pillarClearance + 10,
    stemYSize = arcRadius - gliderOuterDiam / 2 - pillarClearance,
    innerRadius = 3,
    motorHolderUp = 13
    rightmost = gliderHeight + gliderOuterDiam / 2 + pillarClearance,
    motorHolderOut = 12,
    cutY = rightmost + innerRadius + 1;

  function gliderAggregate(out) {
    return cylinder({r: gliderOuterDiam / 2, h: gliderHeight, fn:64})
      .union(cube().translate([-0.5, 0, 0]).scale([gliderOuterDiam, out, gliderHeight]));
  }

  function cubeCyl(r) {
    return {cube: cube().translate([-0.5, 0, 0]).scale([gliderOuterDiam, r, r]),
      cylinder: cylinder({r: r, h: gliderOuterDiam}).translate([0, 0, -gliderOuterDiam / 2])
      .rotateY(90)}
  }
  var outerCubeCyl = cubeCyl(gliderHeight);
  var innerCubeCyl = cubeCyl(innerRadius);
  var upperInnerCubeCyl = innerCubeCyl.cube.subtract(innerCubeCyl.cylinder.translate([0, 0, 0]));
  var stem = cube().translate([-0.5, 0, 0])
    .scale([1, gliderHeight, upperHolderUp - gliderHeight])
    .translate([0, gliderOuterDiam / 2 + pillarClearance, gliderHeight]);

  return gliderAggregate(arcRadius - stemYSize).translate([0, 0, springHeight + gliderHeight + fixedPartHeight])
    .union(
      gliderAggregate(arcRadius - stemYSize)
    )
    // stem between top and bottom glider aggregate
    .union(stem.scale([gliderOuterDiam, 1, 1]))
    // guiding bar gliding against holder
    .union(stem.scale([gliderOuterDiam - 10, 1, 1]).translate([0, -innerRadius + 1, 0]))

    // outer rounding on glider aggregate-stem joint
    .union(outerCubeCyl.cube.intersect(outerCubeCyl.cylinder.translate([0, 0, 0]))
      .translate([0, gliderOuterDiam / 2 + pillarClearance, upperHolderUp]))
    .union(outerCubeCyl.cube.intersect(outerCubeCyl.cylinder.translate([0, 0, gliderHeight]))
      .translate([0, gliderOuterDiam / 2 + pillarClearance, 0]))
    // inner rounding on glider aggregate-stem joint
    .union(upperInnerCubeCyl
      .translate([0, gliderOuterDiam / 2 + pillarClearance - innerRadius, upperHolderUp - innerRadius]))
    .union(innerCubeCyl.cube.subtract(innerCubeCyl.cylinder.translate([0, 0, innerRadius]))
      .translate([0, gliderOuterDiam / 2 + pillarClearance - innerRadius, gliderHeight]))
    .union(armHole({length: pillarHole + 4 + 4, d:4, x1: rightmost, y: motorHolderUp + 5}))
    .union(armHole({length: pillarHole + 4 + 4, d:4, x1: rightmost - 5, y: motorHolderUp + 25}))
    .union(armHole({length: pillarHole + 4 + 4, d:4, x1: rightmost - 5, y: motorHolderUp + 40}))

    // motor mount
    .union(upperInnerCubeCyl.scale([1, -1, -1]).translate([0, rightmost + innerRadius, gliderOuterDiam + innerRadius])
      .union(upperInnerCubeCyl.scale([1, -1, 1]).translate([0, rightmost + innerRadius, -innerRadius]))
      .union(cube().translate([-0.5, 0, 0]).scale([gliderOuterDiam, motorHolderOut + wallThickness + 0.1, gliderOuterDiam])
        .translate([0, rightmost, 0]))

      .union(cylinder({r: motorHolderSide / 2, h: gliderOuterDiam})
        .subtract(cylinder({r: (motorHolderSide - 2 * wallThickness) / 2, h: gliderOuterDiam}).translate([0, 0, 2]))
        .subtract(motorHoles())
        // .union(cylinder({r: 1, h: 80}).translate([0, 0, -40]))
        .translate([0, rightmost + motorHolderSide / 2 + motorHolderOut, 0]))
      .translate([0, 0, motorHolderUp])
    )

    .union(
      holder().translate([0, 0, gliderHeight + 1])
      .subtract(innerCubeCyl.cube.subtract(innerCubeCyl.cylinder.translate([0, 0, innerRadius])).translate([0, 10, gliderHeight + 1]))
      .subtract(stem.scale([gliderOuterDiam - 10 + 0.6, 1, 1]).translate([0, -innerRadius + 1 - 0.6, 0]))
    )
    .translate([0, 0, 20])
    .subtract(new cylinder({r:pillarHole / 2, h: pillarHeight, fn:128}))

    // glue bar
    .union(cube().translate([-0.5, 0, 0]).scale([gliderOuterDiam - 4, motorHolderOut - 2, gliderOuterDiam - 4])
      .translate([0, rightmost, motorHolderUp + 20 + 2]))

    .setColor(.8, .7, .3)
    // .rotateY(90)

  // glider that can be fixed to pillar with screw
  function holder() {
    return cube().translate([-0.5, 0, 0]).scale([gliderOuterDiam, pillarHole + gripScrewDiam + 7.5 + pillarClearance - 1, fixedPartHeight])
    .translate([0, -(pillarHole / 2 + gripScrewDiam + 5), 0])

    .union(armHole({length: pillarHole + 4 + 4, d:4, x1: pillarHole / 2, x2: pillarHole / 2, y: fixedPartHeight / 2}))

    .subtract(cube().translate([-0.5, -1, 0]).scale([1, 20, fixedPartHeight]))
    .subtract(armHole({length: 100, d: gripScrewDiam, x1: -(pillarHole + gripScrewDiam + 5) / 2, y: fixedPartHeight / 2}))
    .subtract(cylinder({r: 4, h: 3, fn: 6}).rotateY(90).translate([gliderOuterDiam / 2 - 2, -(pillarHole + gripScrewDiam + 5) / 2, fixedPartHeight / 2]))
    .subtract(stem.scale([gliderOuterDiam - 10 + 10.9, 1, 1]).translate([0, -innerRadius + 1 - 1.9, 0]))
  }
}


function armHole(conf) {
  var x2 = conf.x2 || conf.x1;
  var h = hull( circle(conf.d / 2),circle(conf.d / 2).translate([0, x2 - conf.x1, 0]) ).translate([-conf.d / 2, -conf.d / 2]);
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
