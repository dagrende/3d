function main() {
  return union(
    rep2(5, 0, 3).translate([20, 0, 0])
  );
}

function rep1(r) {
  return circle(r)
}

function rep2(r) {
  return union([0, 1, 2, 3, 4].map(i=>circle({r: r, center: true}).translate([r, 0]).rotateZ(i * 360 / 5)))
}

function rep3(r, rot, depth) {
  if (depth == 0) {
    return circle({r: r, center: true})
  } else {
    return union([0, 1, 2, 3, 4].map(i=>
      rep3(r/2, rot, depth - 1)
        .translate([r/2, 0])
        .rotateZ(i * 360/5 + 25 + rot)))
  }
}
