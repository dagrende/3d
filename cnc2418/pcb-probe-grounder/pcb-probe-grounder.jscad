function main() {
  let screwD = 4,
    screwHeadD = 7,
    screwHeadH = 2.6,
    innerWidth = 15,
    innerHeight = 9.5,
    innerDepth = 5,
    innerOutHeight = 6,
    innerOutDepth = 6,
    outerWidth = 25,
    outerDepth = 10,
    outerHeight = 15,
    outerInHeight = 6 + .4,
    outerInDepth = 4;

  let innerPart = union(
    cube({center: [true, false, true]}).scale([innerWidth, innerDepth, innerHeight]),
    cube({center: [true, false, true]}).scale([innerWidth, -innerOutDepth, innerOutHeight])
  ).subtract(cylinder({r: screwHeadD / 2, h: screwHeadH}).rotateX(90).translate([0, innerDepth, 0]))
  .subtract(cylinder({r: screwD / 2, h: innerDepth + innerOutDepth}).rotateX(90).translate([0, innerDepth, 0]));

  let outerPart =
    cube({center: [true, false, true]}).scale([outerWidth, -outerDepth, outerHeight]).translate([(outerWidth - innerWidth) / 2, 0, 0])
    .subtract(cube({center: [true, false, true]}).scale([outerWidth, outerInDepth, outerInHeight]).translate([0, -outerInDepth, 0]))
    .subtract(cylinder({r: screwD / 2 + .25, h: outerDepth}).rotateX(90).translate([0, 0, 0]));

  if (true) {
    // show assembled
    return union(
      innerPart.translate([0, innerOutDepth - outerInDepth + .2, 0]).setColor(0.8, 0.8, 1),
      outerPart.setColor(1, 0.8, 0.8)
    )
  } else {
    // line up for printing
    return union(
      innerPart.rotateX(90).translate([0, innerHeight + 4, innerOutDepth]).setColor(0.8, 0.8, 1),
      outerPart.rotateX(90).translate([0, 0, outerDepth]).setColor(1, 0.8, 0.8)
    )
  }
}
