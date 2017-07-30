// vacuum holder for UV exposing PCBs
function main() {
  var windowSide = 100,
    frameWidth = 10,
    sqrt2 = Math.sqrt(2);
  return union(torus({ro: (windowSide + frameWidth) * sqrt2 / 2, ri: frameWidth * sqrt2 / 2, fno: 4})
    .subtract(torus({ro: (windowSide + frameWidth) * sqrt2 / 2, ri: (frameWidth - 1.5) * sqrt2 / 2, fno: 4}))
    .subtract(cube().translate([-0.5, -0.5, -1]).scale(1000))
    .rotateZ(45)
    .scale(2)
  )
    .setColor(.95, .95, .95);
}
