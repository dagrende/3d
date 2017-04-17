function main() {
  function waves(r, v, x, y, z, i, j) {
    return [x, y, cos(r * 360 * 5) / (20 + 300 * r * r * r)];
  };
  var n = 40; // ring count
  var m = 70; // sector count

  return fundisk({n: 40, m: 70, f: waves});

  function fundisk(params) {
    var defaultConfig = {n: 16, m: 16, f: function(r, v, x, y, z, i, j) {return [x, y, z]}}
    var config = Object.assign(defaultConfig, params);
    var n = config.n, m = config.m, f = config.f;

    var points = [f(0, 0, 0, 0, 0, 0, 0)];
    for (var i = 1; i <= n; i++) {
      for (var j = 0; j < m; j++) {
        var r = i / n;
        var v = j * 360 / m;
        var x = r * cos(v);
        var y = r * sin(v);
        points.push(f(r, v, x, y, 0, i, j));
      }
    }

    var triangles = [];
    for (var j = 0; j < m; j++) {
      triangles.push([
        0,
        1 + j,
        1 + (j + 1) % m
      ]);
    }
    for (var i = 0; i < n - 1; i++) {
      for (var j = 0; j < m; j++) {
        triangles.push([
          1 + i * m + j,
          1 + (i + 1) * m + j,
          1 + (i + 1) * m + (j + 1) % m,
          1 + i * m + (j + 1) % m
        ]);
      }
    }

    // connect all edge points to a top
    // points.push([0, 0, 1]);
    // for (var j = 0; j < m; j++) {
    //   triangles.push([
    //     points.length - 1,
    //     points.length - 2 - j,
    //     points.length - 2 - (j + 1) % m
    //   ]);
    // }

    console.log('points', points);
    console.log('triangles', triangles)


    return polyhedron({points: points, triangles: triangles}).rotateX(180);
  }
}
