function main() {
  const threadD = 2,
    knobs = (d)=>dupMirroredY(dupMirroredX(cylinder({d, h: 3, center: [true, true, true]}).translate([3.5, 3.5, 0]))),
    button =  cylinder({d: 15, h: threadD + 1, center: [true, true, false]})
      .subtract(cylinder({d: threadD, h: 20, center: [true, true, true]}).rotateX(90).translate([0, 0, threadD / 2]))
      .subtract(cube().center().scale([threadD, 20, threadD]));
  return union(button.union(knobs(2.6)),
    button.subtract(knobs(3.4)).translate([17, 0, 0])
  ).rotateX(180)

}

function dupMirroredX(obj) {
  return obj.union(obj.mirroredX())
}
function dupMirroredY(obj) {
  return obj.union(obj.mirroredY())
}
