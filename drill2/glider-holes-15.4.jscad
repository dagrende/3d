function main() {
  var pillarDiam = 12.66 + 0.4,
    gliderOuterDiam = 12.66 + 4,
    steps = 1,
    stepHeight = 10;

  var glider = cylinder({r: gliderOuterDiam / 2, h: steps * stepHeight, fn:64});

  for (let i = 0; i < steps; i++) {
    let d = pillarDiam + i * .1;
    console.log(i, d );
    glider = glider.subtract(new cylinder({r:d / 2, h: stepHeight, fn:128}).translate([0, 0, i * stepHeight]));
  }

  return glider;
}
