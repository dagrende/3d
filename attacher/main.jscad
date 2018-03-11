//include("lib.jscad");
let extras = [];
function main() {
  if (true) {
    // tests
    testSuite();
    return cube();
  }
  let obj = cube(4)
    .subtract(cube().scale([1.5, 1, 100]))
    .subtract(cube(4).translate([0, -4, 0]).rotateX(10).translate([0, 1, 4]));
  console.log(obj);
  //  // obj.polygons.forEach(p=>p.shared = new CSG.Polygon.Shared([Math.random(), Math.random(), Math.random(), 1]));
  //  // console.log(getuniqueVertices(obj));
  let edges = getUniqueEdges(obj);
  // console.log(edges);
  edges.forEach(edge => {
  //   // console.log(edge.v0.pos, edge.v1.pos);
  //   // let angle = acos(edge.polygons[0].plane.normal.unit().dot(edge.polygons[1].plane.normal))
  //   // console.log('convex', edge, isConvex(edge), angle);
    addCube(edge.v0.pos.plus(edge.v1.pos).times(0.5));//, isConvex(edge) ? 'green' : 'red');
  //
  });
  // // console.log(isConvex(edges[2]));

  return obj.union(extras)
}

// *** all poygons are convex, one polygon segment can in the middle touch another polygon vertex

// returns a map of
function getUniqueEdges(s) {
  let csg = s.reTesselated().canonicalized();

  // csg.polygons[6].vertices.splice(2, 0, csg.polygons[7].vertices[3]);
  // csg.polygons[9].vertices.splice(4, 0, csg.polygons[8].vertices[2

  // if any other vertices between any pair of polygon vertices, add the vertices the polygon


  let edges = [];
  csg.polygons.forEach((p, i) => {
    console.log(p);
    iteratePolygonSides(p, (v0, v1, j) => {
      let key0 = posString(v0.pos) + '-' + posString(v1.pos),
          key1 = posString(v1.pos) + '-' + posString(v0.pos),
          key = key0 < key1 ? key0 : key1
          console.log(key0);
      let edge = edges[key];
      if (edge) {
        edge.polygons.push(p);
      } else {
        edges[key] = {v0, v1, polygons: [p]};
      }
    });
  })
  console.log(edges);
  return Object.values(edges);
}

function isConvex(edge) {
  // addBall(edge.v0.pos, 'red');
  // addBall(edge.v1.pos, 'blue');
  let edgeVec = edge.v0.pos.minus(edge.v1.pos),
  findPosNotInLine = polygon => {
    // console.log(polygon);
    for (let vertex of polygon.vertices) {
      // console.log('findPosNotInLine', edge.v0.pos, edge.v1.pos, vertex.pos, edge.v0.pos.minus(vertex.pos));
      if (edge.v0.pos.distanceToSquared(vertex.pos) > 1e-10
          && edge.v1.pos.distanceToSquared(vertex.pos) > 1e-10
          && abs(abs(edgeVec.dot(edge.v0.pos.minus(vertex.pos))) - 1) > 1e-5) {
        return vertex.pos;
      }
    }
  },
  poly0Point = findPosNotInLine(edge.polygons[0]),
  poly1Point = findPosNotInLine(edge.polygons[1]);
  // addBall(poly0Point, 'green');
  // addBall(poly1Point, 'yellow');
  // console.log(poly0Point, poly1Point);
  return poly0Point.minus(poly1Point).dot(edge.polygons[0].plane.normal) > 1e-5;
}

function getuniqueVertices(s) {
  let vertices = {};
  s.polygons.forEach(p => {
    p.vertices.forEach(v => {
      vertices[posString(v.pos)] = v;
    })
  });
  return Object.keys(vertices)
}

function addBall(pos, colorName) {
  extras.push(sphere(0.1).translate(pos).setColor(css2rgb(colorName || 'red')));
}

function addCube(pos, colorName) {
  extras.push(cube({size: 0.1, center: true}).translate(pos).setColor(css2rgb(colorName || 'red')));
}

// for every pair of the n vertices around polygon p, call f(v0, v1, i)
// v0, v1 is the vertex pair and i is the pair index 0..n-1
function iteratePolygonSides(p, f) {
  let mod = (n, m) => (n % m + m) % m,
    vs = p.vertices;
  for (let i = 0; i < vs.length; ++i) {
    f(vs[i], vs[mod(i + 1, vs.length)], i);
  }
}

function testSuite() {
  let tests = [iteratePolygonSidesTest];
  tests.forEach(f => {
    try {
      f();
      console.log(f.name, 'OK');
    } catch (err) {
      console.log(f.name, 'failure: ', err);
    }
  })
}

function iteratePolygonSidesTest() {
  let c = cube(), prevV1, previ, firstV0, lastV1,
    p = c.polygons[0];
  iteratePolygonSides(p, (v0, v1, i) => {
    if (!firstV0) {
      firstV0 = v0;
    }

    if (prevV1) {
      if (!v0.pos.equals(prevV1.pos)) {
        throw "v0 not equal to previous v1";
      }
    }
    prevV1 = v1;

    if (previ) {
      if (i !== (previ + 1)) {
        throw 'i is not previ + 1'
      }
    }
    previ = i;
    lastV1 = v1;
  });
  if (!lastV1.pos.equals(firstV0.pos)) {
    throw "lastV1 not equal to firstV0";
  }
}

function posString(p) {
  return '(' + round(p.x * 5) / 5 + ', ' + round(p.y * 5) / 5 + ', ' + round(p.z * 5) / 5 + ')'
}
