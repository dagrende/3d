function main() {
  return rope_ring().setColor([.6, .6, .6]);
}

function frame() {
  let curve = square([18, 24]);;
  let shape = square(3).translate([-1, -1]).subtract(square(3));
  return curve_extrude(curve, shape)
}

function trumpet() {
  let curve = circle({r: 12, fn: 32, center: true});
  let shape = i => circle({center: true}).scale(1 + i / 5);
  return curve_extrude(curve, shape)
}

function moebius_square() {
  let curve = circle({r: 20, fn: 256, center: true});
  let shape = square([10, 1]).translate([-5, -.5, 0]).rotateZ(10);
  return curve_extrude(curve, (i, n) => shape.rotateZ(i * 180 / n))
}

function moebius_oval() {
  let curve = circle({r: 50, fn: 256, center: true});
  let shape = circle({r: 1.5, fn: 128, center: true}).scale([6, 1]);
  return curve_extrude(curve, (i, n) => shape.rotateZ(i * 180 / n)).scale(0.7)
}

function rope_ring() {
  let curve = circle({r: 15, fn: 32, center: true});
  return curve_extrude(curve, (i, n) => rope(5.0, i * 360 * 1 / n, 2))
}

function rope(r, rot, depth) {
  if (depth == 0) {
    return circle({r: r, center: true})
  } else {
    return union([0, 1, 2, 3, 4].map(i=>
      rope(r/2, rot, depth - 1)
        .translate([r/2, 0])
        .rotateZ(i * 360/5 + 25 + rot)))
  }
}

// Extrudes a shape along a curve.
// The curve is a 2d shape with a border.
// shapeOrF is a 2d shape or a function returning a 2d shape. The function is called with (i, n) where i is 0..n. So i and n represents the same place on the curve.
function curve_extrude(curve, shapeOrF) {
  let polygons = [];
  iterateCurveSides(curve, function(s0, s1, s2, i, n) {
    let shape0 = shapeOrF;
    let shape1 = shapeOrF;
    if (typeof shapeOrF === "function") {
      shape0 = shapeOrF(i, n);
      shape1 = shapeOrF(i + 1, n);
    }
    // angle between two vectors of any length
    function angle(s0, s1) {
      let s0dir = s0.direction(), s1dir = s1.direction();
      return acos(s0dir.dot(s1dir) / (s0dir.length() * s1dir.length()))
    }
    // scaling for projection at corner of segments s1 and s2
    function scaling(s0, s1) {
      let v2 = angle(s0, s1) / 2,
        tanv2 = tan(v2);
      return sqrt(tanv2 * tanv2 + 1)
    }

    let axis0 = s0.direction().unit().plus(s1.direction().unit()).unit().toVector3D(0);
    let conn0 = new CSG.Connector(s0.vertex1.pos.toVector3D(0), axis0, axis0.rotateZ(90));
    let shape0s = shape0.scale([1, scaling(s0, s1), 1]);

    let axis1 = s1.direction().unit().plus(s2.direction().unit()).unit().toVector3D(0);
    let conn1 = new CSG.Connector(s1.vertex1.pos.toVector3D(0), axis1, axis1.rotateZ(90));
    let shape1s = shape1.scale([1, scaling(s1, s2), 1]);

    let segPolys = shape0s._toWallPolygons({
      cag: shape1s,
      toConnector1: conn0,
      toConnector2: conn1
    });
    polygons = polygons.concat(segPolys);
  });
  return CSG.fromPolygons(polygons);
}

function iterateCurveSides(curve, f) {
  let mod = (n, m) => (n % m + m) % m,
    sides = curve.sides,
    n = sides.length,
    s0 = sides[0],
    s1 = sides[1],
    s2 = sides[2];
  for (let i = 3; i < n + 3; ++i) {
    f(s0, s1, s2, i - 3, n);
    s0 = s1;
    s1 = s2;
    s2 = sides[mod(i, n)];
  }
}
