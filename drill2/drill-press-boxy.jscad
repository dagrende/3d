function main() {
  var printLayout = false,  // true to layout for 3d-printing all parts
    motorHolderSide = 35,
    motorHolderLength = 60,
    motorHolderHeightElevation = 60,
    motorPillarY = 12,
    wallThickness = 2,
    pillarHeight = 167,
    pillarDiam = 12.66,
    pillarHoleDiam = pillarDiam + 0.4,
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
    cutY = rightmost + innerRadius + 1,
    pillarHole = new cylinder({r:pillarHoleDiam / 2, h: pillarHeight, fn:128});

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

  if (printLayout) {
    // drill parts layed out for 3d printing
    return union(
      mainPart(true).subtract(pillarHole).lieFlat(),
      holder().subtract(pillarHole).lieFlat().rotateZ(90).translate([-5, -15, 0]),
      lockKnob().lieFlat().translate([40, 25, 0]),
      union(
        mainPart(false).subtract(pillarHole).lieFlat().translate([0, 10, 0]),
        lever().lieFlat()
      ).rotateZ(90).translate([-10, 50, 0])
    )
    .setColor(.8, .7, .3)
  } else {
    // assembled drill
    return union(
      mainPart(true),
      mainPart(false),
      union(
        holder(),
        lockKnob(),
        lever().translate([0, rightmost - 15, gliderHeight / 2])
      ).translate([0, 0, gliderHeight + 1])
    ).translate([0, 0, 50])
    .union(pillarHole)
    .setColor(.8, .7, .3)
  }

  function mainPart(verticalPart) {
    var part = gliderAggregate(arcRadius - stemYSize).translate([0, 0, springHeight + gliderHeight + fixedPartHeight])
    .union(gliderAggregate(arcRadius - stemYSize))
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
      .union(armHole({length: pillarHoleDiam + 4 + 4, d:4, x1: rightmost, y: motorHolderUp + 5}))

      // motor mount
      .union(upperInnerCubeCyl.scale([1, -1, -1]).translate([0, rightmost + innerRadius, gliderOuterDiam + innerRadius])
      .union(upperInnerCubeCyl.scale([1, -1, 1]).translate([0, rightmost + innerRadius, -innerRadius]))
      .union(cube().translate([-0.5, 0, 0]).scale([gliderOuterDiam, motorHolderOut + wallThickness + 0.1, gliderOuterDiam])
      .translate([0, rightmost, 0]))

      .union(cylinder({r: motorHolderSide / 2, h: gliderOuterDiam})
      .subtract(cylinder({r: (motorHolderSide - 2 * wallThickness) / 2, h: gliderOuterDiam}).translate([0, 0, 2]))
      .subtract(motorHoles())
      .translate([0, rightmost + motorHolderSide / 2 + motorHolderOut, 0]))
      .translate([0, 0, motorHolderUp])
    )

    if (verticalPart) {
      part = part.subtract(cube().translate([-0.5, 0, 0]).scale(100).translate([0, cutY, 0]))
      // glue bar
      .union(cube().translate([-0.5, 0, 0]).scale([gliderOuterDiam - 4, motorHolderOut - 2, gliderOuterDiam - 4 + 0.6])
      .translate([0, rightmost, motorHolderUp + 2]))
    } else {
      part = part.intersect(cube().translate([-0.5, 0, 0]).scale(100).translate([0, cutY, 0]))
      // glue bar hole
      .subtract(cube().translate([-0.5, 0, 0]).scale([gliderOuterDiam - 4 + 0.5, motorHolderOut - 2 + 0.5, gliderOuterDiam - 4 + 0.6])
      .translate([0, rightmost, motorHolderUp + 2 - 0.25]))
    }

    return part;
  }

  function lockKnob() {
    var n = 16;
    return cylinder({r: 4, h: 2})
      .union(cylinder({r1: 4, r2: 8, h: 5}).translate([0, 0, 2]))
      .union(cylinder({r: 8, h: 5}).translate([0, 0, 7]))
      .subtract(union(sequence(n).map(i => cylinder({r: 1, h: 10}).translate([0, 8.5, 5]).rotateZ(i * 360 / n))))
      .subtract(cylinder({r: 6, h: 5}).translate([0, 0, 7]))
      .subtract(cylinder({r: gripScrewDiam / 2 + 0.2, h: 20}))
      .subtract(cube().translate([-0.5, -0.5, 0]).scale([5, 9, 20]).translate([0, 0, 5]))
      .rotateY(-90)
      .translate([-gliderOuterDiam / 2 - 1, -(pillarHoleDiam + gripScrewDiam + 5) / 2, fixedPartHeight / 2])
  }

  function lever() {
    var bar = cube().translate([0, 0, -0.5]).scale([5, 30, 10]).translate([0, -10, 0]);
    var glidePath = linear_extrude({ height: 20 }, polygon({points:[ [0, -2],[0, 2],[2, 3],[2, -3] ]})).union(cylinder({r1: 2, r2: 3, h: 2}).rotateY(90)).rotateX(90).scale(1.2);
    var hole = cylinder({r: 2.1, h: 4}).rotateY(90);
    var barDevice = bar.subtract(glidePath.translate([0, 7, 0])).subtract(hole.translate([0, 15, 0])).translate([gliderOuterDiam / 2, 0, 0]);
    var handle = torus({ri: 5, ro: 31, fni: 4, roti: 45}).subtract(cube().translate([-0.5, -0.5, -1]).scale(100).rotateX(4)).translate([0, 45, 0])
      .subtract(cube().translate([-0.5, 0, -0.5]).scale([gliderOuterDiam + 5, 50, 100]));
    return barDevice.union(barDevice.mirroredX()).union(handle)
  }

  // returns array of numbers 0 to n-1
  function sequence(n) {
    var a = [];
    for (var i = 0; i < n; i++) {
      a.push(i)
    }
    return a;
  }


  // glider that can be fixed to pillar with screw
  function holder() {
    var knob = cylinder({r1: 2, r2: 3, h: 2}).rotateY(90).translate([gliderOuterDiam / 2, pillarHoleDiam / 2, fixedPartHeight / 2]);
    return cube().translate([-0.5, 0, 0]).scale([gliderOuterDiam, pillarHoleDiam + gripScrewDiam + 7.5 + pillarClearance - 1, fixedPartHeight])
    .translate([0, -(pillarHoleDiam / 2 + gripScrewDiam + 5), 0])

    // .union(armHole({length: pillarHoleDiam + 4 + 4, d:4, x1: pillarHoleDiam / 2, y: fixedPartHeight / 2}))
    .union(knob.union(knob.mirroredX()))

    .subtract(cube().translate([-0.5, -1, 0]).scale([1, 20, fixedPartHeight]))
    .subtract(armHole({length: 100, d: gripScrewDiam + 0.2, x1: -(pillarHoleDiam + gripScrewDiam + 5) / 2, y: fixedPartHeight / 2}))
    .subtract(cylinder({r: 4, h: 3, fn: 6}).rotateY(90).translate([gliderOuterDiam / 2 - 2, -(pillarHoleDiam + gripScrewDiam + 5) / 2, fixedPartHeight / 2]))
    .subtract(stem.scale([gliderOuterDiam - 10 + 10.9, 1, 1]).translate([0, -innerRadius + 1 - 1.9, 0]))
    .subtract(innerCubeCyl.cube.subtract(innerCubeCyl.cylinder.translate([0, 0, innerRadius])).translate([0, 10, 0]))
    .subtract(stem.scale([gliderOuterDiam - 10 + 0.6, 1, 1]).translate([0, -innerRadius + 1 - 0.6, -gliderHeight]))
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
