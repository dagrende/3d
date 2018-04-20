function main() {
  const knobs = dupMirroredY(dupMirroredX(cylinder({r: 1.5, h: 3, center: [true, true, true]}).translate([3.5, 3.5, 0]))),
    button =  cylinder({d: 15, h: 4, center: [true, true, false]})
      .subtract(cylinder({r: 1.5, h: 20, center: [true, true, true]}).rotateX(90).translate([0, 0, 1.5]))
      .subtract(cube().center().scale([3, 20, 3]));
  return union(button.union(knobs),
    button.subtract(knobs).translate([17, 0, 0])
  ).rotateX(90)

}

function dupMirroredX(obj) {
  return obj.union(obj.mirroredX())
}
function dupMirroredY(obj) {
  return obj.union(obj.mirroredY())
}
