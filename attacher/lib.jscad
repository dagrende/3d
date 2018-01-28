// lib.jscad
// stack all a objects after the first one, in the direction in axis, that can be 'x', 'y' or 'z'
function stack(axis, a) {
  let axi = "xyz".indexOf(axis);
  let top = a[0].getBounds()[0][axis];
  return a.map(function(ai) {
    let bnds = ai.getBounds();
    let tra = [0, 0, 0];
    tra[axi] = top - bnds[0][axis];
    top += bnds[1][axis] - bnds[0][axis];
    return ai.translate(tra)
  })
}

// align all a objects to the first one, according to axes, that is a sequence of [-][+][x|y|z].
// axes '-xy+z' means, align min x and center y of them.
function align(axes, a) {
  function iterateAxes(ai, f) {
    let i = 0, pos;
    while (i < axes.length) {
      let prefix = axes[i];
      if (prefix === '-' || prefix === '+') {
        i++;
      }
      let axis = axes[i++],
        axisi = 'xyz'.indexOf(axis),
        bounds = ai.getBounds();
      if (prefix === '-') {
        pos = bounds[0][axis];
      } else if (prefix === '+') {
        pos = bounds[1][axis];
      } else {
        pos = (bounds[0][axis] + bounds[1][axis]) / 2;
      }
      f(axis, axisi, pos);
    }
  }
  function getRefs(obj) {
    let axi = [0, 0, 0];
    iterateAxes(obj, function(axis, axisi, pos) {
      axi[axisi] = pos;
    });
    return axi
  }
  let refs = getRefs(a[0]);
  function minus(a, b) {
    return a.map((ai, i)=>ai - b[i])
  }
  let alignedObjects = a.slice(1).map(function(ai) {
    let alignedCoords = minus(refs, getRefs(ai));
    return ai.translate(alignedCoords);
  });
  return [a[0]].concat(alignedObjects);
}

// function test_align_stack() {
//   return union(align('xyz', stack('z', [cylinder(), cube().scale(1.5), cube()])))
// }

function iterateCurvePoints(curve, f) {
  let mod = (n, m) => (n % m + m) % m,
    points = curve.getOutlinePaths()[0].points,
    n = points.length,
    p0 = points[0],
    p1 = points[1],
    p2 = points[2],
    p3 = points[mod(3, n)];
  for (let i = 4; i < n + 4; ++i) {
    f(p0, p1, p2, p3);
    p0 = p1;
    p1 = p2;
    p2 = p3;
    p3 = points[mod(i, n)];
  }
}

function iterateCurveSides(curve, f) {
  let mod = (n, m) => (n % m + m) % m,
    sides = curve.sides,
    n = sides.length,
    s0 = sides[0],
    s1 = sides[1],
    s2 = sides[2];
  for (let i = 3; i < n + 3; ++i) {
    f(s0, s1, s2);
    s0 = s1;
    s1 = s2;
    s2 = sides[mod(i, n)];
  }
}

// extrude shape along curve
function curve_extrude(curve, shape) {
  let polygons = [];
  iterateCurveSides(curve, function(s0, s1, s2) {
    // s0.vertex1.pos
    // s1.pos.unit().plus(s2.pos.unit()).unit()
    // s1.pos.cross(s2.pos).unit
    function angle(s0, s1) {
      let s0dir = s0.direction(), s1dir = s1.direction();
      return acos(s0dir.dot(s1dir) / (s0dir.length() * s1dir.length()))
    }

    function scaling(s0, s1) {
      let v2 = angle(s0, s1) / 2,
        tanv2 = tan(v2);
      return sqrt(tanv2 * tanv2 + 1)
    }

    let axis0 = s0.direction().unit().plus(s1.direction().unit()).unit().toVector3D(0);
    let conn0 = new CSG.Connector(s0.vertex1.pos.toVector3D(0), axis0, axis0.rotateZ(90));
    let shape0 = shape.scale([1, scaling(s0, s1), 1]);

    let axis1 = s1.direction().unit().plus(s2.direction().unit()).unit().toVector3D(0);
    let conn1 = new CSG.Connector(s1.vertex1.pos.toVector3D(0), axis1, axis1.rotateZ(90));
    let shape1 = shape.scale([1, scaling(s1, s2), 1]);

    let segPolys = shape0._toWallPolygons({
      cag: shape1,
      toConnector1: conn0,
      toConnector2: conn1
    });
    polygons = polygons.concat(segPolys);
  });
  return CSG.fromPolygons(polygons);
}

function test_curve_extrude() {
  let curve = circle({r: 4, fn: 3, center: true});
  let shape = circle({center: true});
  return curve_extrude(curve, shape)//.subtract(cube().scale(100).translate([0, 0, -50]));
}
