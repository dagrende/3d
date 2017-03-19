function main() {
  var r = 25,
    h = 7,
    hubR = 7,
    hubH = 5,
    gearH = 5,
    gearToothLength = .5,
    gearCutOff = 1,
    cr = 1,
    bottomThickness = 2,
    wallThickness = .5,
    sides = 80;
  var jar =
  cylinder({r: r, h: h, fn: sides})
    .subtract(roundedJar({r: r - wallThickness, h: h - bottomThickness, cr: cr, sides: sides})
      .translate([0, 0, bottomThickness]))
    .union(footCylinder({r: hubR, h: hubH, sides: sides}).translate([0, 0, bottomThickness]))
    .subtract(cylinder({r: 4, h: 7, fn: sides}))
    .union(
      cylinder({r: r, h: gearH, fn: sides})
      .subtract(outerGear({n: sides, h: gearH, ri: r - wallThickness - gearToothLength, ro: r - wallThickness, c: gearCutOff}))
      .translate([0, 0, h - gearH])
    );

  // triangular inner gears, with cut-off
  // opts: h height, ro outer radius, ri inner radius, n gear count, c gear top and bottom cut-off
  function outerGear(opts) {
    var vInc = 360 / opts.n,
      vertices = [];
    for (var i = 0; i < opts.n; i++) {
      vertices.push([
        (opts.ri - opts.c) * cos(i * vInc),
        (opts.ri - opts.c) * sin(i * vInc)]);
      vertices.push([
        (opts.ro + opts.c) * cos((i + .5) * vInc),
        (opts.ro + opts.c) * sin((i + .5) * vInc)]);
    }
    var gear = CAG.fromPoints(vertices).extrude({offset: [0, 0, opts.h]})
      .intersect(cylinder({r: opts.ro, h: opts.h, fn: opts.n}))
      .union(cylinder({r: opts.ri, h: opts.h, fn: opts.n}));
    return gear;
}

  // cylinder with rounded foot of radius fr, other opts as roundedJar
  function footCylinder(opts) {
    opts = Object.assign({r: 25,
      h: 25,
      fr: 3,
      sides: 16,
      roundsides: 16}, opts);
    return cylinder({r: opts.r, h: opts.h, fn: opts.sides})
      .union(cylinder({r: opts.r + opts.fr, h: opts.fr, fn: opts.sides}))
      .subtract(torus({ri: opts.fr, ro: opts.r + opts.fr, fni: opts.roundsides, fno: opts.sides}).translate([0, 0, opts.fr]))
  }

  function roundedJar(opts) {
    opts = Object.assign({r: 25,
      h: 25,
      cr: 10,
      sides: 16,
      roundsides: 16}, opts);
    return cylinder({r: opts.r, h: opts.h - opts.cr, fn: opts.sides})
      .translate([0, 0, opts.cr])
      .union(torus({ri: opts.cr, ro: opts.r - opts.cr, fni: opts.roundsides, fno: opts.sides}).translate([0, 0, opts.cr]))
      .union(cylinder({fn: opts.sides, r: opts.r - opts.cr, h: opts.cr}))
  }

  return jar//.subtract(cube().translate([-.5, 0, -.5]).scale([100, 100, 100]));
}
