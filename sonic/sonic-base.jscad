function main() {
  var r = 25,
    h = 7,
    hubR = 7,
    hubH = 5,
    cr = 1,
    bottomThickness = 2,
    wallThickness = .5,
    sides = 16;
  var jar = roundedJar({r: r, h: h, cr: cr, sides: sides})
    .subtract(roundedJar({r: r - wallThickness, h: h - bottomThickness, cr: cr, sides: sides})
      .translate([0, 0, bottomThickness]))
    .union(footCylinder({r: hubR, h: hubH}).translate([0, 0, bottomThickness]))
    .subtract(cylinder({r: 4, h: 7}));

  // cylinder with rounded foot of radius fr
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

  return jar.subtract(cube().translate([-.5, 0, -.5]).scale([100, 100, 100]));
}
