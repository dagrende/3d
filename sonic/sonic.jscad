function main() {
  var r = 25,
    h = 20,
    cr = 5,
    bottomThickness = 3,
    wallThickness = .5;
  var jar = roundedJar({r: r, h: h, cr: cr})
    .subtract(roundedJar({r: r - wallThickness, h: h - bottomThickness, cr: cr})
      .translate([0, 0, bottomThickness]));

  function roundedJar(options) {
    options = Object.assign({r: 25,
      h: 25,
      cr: 10,
      sides: 64,
      roundsides: 32}, options);
    return cylinder({r: options.r, h: options.h, fn: options.sides})
      .translate([0, 0, options.cr])
      .union(torus({ri: options.cr, ro: options.r - options.cr, fni: options.roundsides, fno: options.sides}).translate([0, 0, options.cr]))
      .union(cylinder({fn: options.sides}).scale(options.r - options.cr, options.r - options.cr, options.cr))
  }

  return jar.subtract(cube().translate([-.5, 0, -.5]).scale([100, 100, 100]));
}
