function main() {
  let
    height = 10,
    depth = 5,
    bbouterdiam = 6,  // SMR 63 ZZ 3x6x2,5, or SMR 85 ZZ 5x8x2,5
    bbradius = bbouterdiam / 2,
    bbwidth = bbouterdiam + 4,
    bbout = depth + bbouterdiam + 6,
    gripboltDiam = 3,
    width = 27, //bbwidth + height * 1.5,
    fastenHoleX = 9.75, //(width + bbwidth) / 4,
    fastenHole = cylinder({r: 2, h: 100}).rotateX(-90).translate([fastenHoleX, 0, height / 2]),
    gripHoleY = depth + bbouterdiam + gripboltDiam / 2 + 1;

  console.log('workpiece:');
  console.log('  width', width);
  console.log('  depth', bbout);
  console.log('  height', height);
  console.log('  ball bearing hole y', depth + bbradius);
  console.log('  grip screw hole y', gripHoleY);
  console.log('  fastenhole x', (width + bbwidth) / 4);

  function getCenter(obj) {
    let bounds = obj.getBounds();
    return {x: (bounds[0].x + bounds[1].x) / 2,
      y: (bounds[0].y + bounds[1].y) / 2,
    z: (bounds[0].z + bounds[1].z) / 2}
  }

  return union(
    cube().translate([-0.5, 0, 0]).scale([width, depth, height]),
    cube().translate([-0.5, 0, 0]).scale([bbwidth, bbout, height])
  )
  // fasten holes
  .subtract(fastenHole)
  .subtract(fastenHole.mirroredX())
  // bb hole
  .subtract(cylinder({r: bbradius, h: height}).translate([0, depth + bbradius, 0]))
  // grip slit
  .subtract(cube().translate([-0.5, 0, 0]).scale([1, 100, height]).translate([0, depth + bbradius, 0]))
  // grip screw hole and thread hole
  .subtract(cylinder({r: gripboltDiam / 2, h: 100}).rotateY(90).translate([0, gripHoleY, height / 2]))
  .subtract(cylinder({r: gripboltDiam / 2 - .3, h: 100}).rotateY(-90).translate([0, depth + bbouterdiam + gripboltDiam / 2 + 1, height / 2]))
}
