function main() {
  var pillarDiam = 12.66 + 0.4,
    gliderOuterDiam = pillarDiam + 4
    gliderHeight = 15,
    thickness = 1,
    off = 0.6;

  var c = cube().scale([gliderOuterDiam, gliderOuterDiam, gliderHeight]);
  var d = cube().scale([gliderOuterDiam, gliderOuterDiam - thickness * 2, gliderHeight - thickness * 2])
    .translate([gliderOuterDiam / 2, thickness, thickness]);
  var e = cube().scale([gliderOuterDiam, gliderOuterDiam - thickness * 2 - off, gliderHeight - thickness * 2 - off])
    .translate([gliderOuterDiam / 2, thickness + off / 2, thickness + off / 2]);
  return c
    .subtract(d)
    .union(c.union(e).translate([0, gliderOuterDiam + 3, 0]))

}
