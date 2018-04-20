function main() {
  const size = {x: 147.3, y: 70.9, z: 7.45},
    cornerR = 8;

  function phoneQ(size, cornerR) {
    const cornerC = [size.x / 2 - cornerR, size.y / 2 - cornerR, 0],
      quadrant = cube().scale([size.x / 2, size.y / 2, size.z / 2])
        .subtract(cube().scale([cornerR, cornerR, size.z]).translate(cornerC))
        .union(cylinder({r: cornerR, h: size.z / 2}).translate(cornerC));
    return quadrant
  }

  let kant = 4,
    holder = phoneQ({x: size.x + 1, y: size.y + 1, z: size.z + 1}, cornerR)
      .subtract(phoneQ(size, cornerR)),
    half = unionFunc('mirroredZ', unionFunc('mirroredX', holder))
      .subtract(unionFunc('mirroredX', phoneQ({x: size.x - kant, y: size.y - kant, z: size.z + 1}, cornerR - kant / 2).translate([0, 0, 1])))
      ;


  return half
}

function unionFunc(fname, obj) {
  return obj.union(obj[fname]())
}

// half = quadrant.union(quadrant.mirroredX());
// return half.union(half.mirroredY());
