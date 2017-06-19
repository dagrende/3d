function main() {
  var pillarDiam = 12.66 + 0.4,
    gliderOuterDiam = pillarDiam + 4
    gliderHeight = 15;

  return cube().translate([-0.5, -0.5, 0]).scale([gliderOuterDiam, gliderOuterDiam, gliderHeight])
  // cylinder({r: gliderOuterDiam / 2, h: steps * stepHeight, fn:64})
  .subtract(new cylinder({r:pillarDiam / 2, h: gliderHeight, fn:128}))
  .rotateX(90).translate([0, 0, gliderOuterDiam / 2]);

}
