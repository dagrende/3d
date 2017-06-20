function main() {
  var pillarDiam = 12.66 + 0.4,
    gliderOuterDiam = pillarDiam + 4
    gliderHeight = 15;

  var c = cube().translate([-0.5, -0.5, -0.5]).scale([gliderOuterDiam, gliderOuterDiam, gliderHeight]);
  var d = c.scale([0.9, 0.9, 0.9]).translate([gliderOuterDiam / 2, 0, 0]);
  return c
    .subtract(d)
    .union(c.union(d).translate([0, gliderOuterDiam + 3, 0]))

}
