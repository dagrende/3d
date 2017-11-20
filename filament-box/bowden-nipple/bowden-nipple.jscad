function main() {
let tubeOuterD = 4,
  tubeInnerD = 2,
  outerD = 20,
  nippleD = 6,
  nippleH = 3,
  peekD = 5,
  peekH = 2,
  baseH = 1,
  coneH = 1;


let holder = union(
  cylinder({r: nippleD / 2, h: nippleH}).translate([0, 0, baseH + coneH]),
  cylinder({r1: outerD / 2, r2: nippleD / 2, h: coneH}).translate([0, 0, baseH]),
  cylinder({r: outerD / 2, h: baseH}),
  cylinder({r: peekD / 2, h: peekH}).translate([0, 0, -peekH])
)
  .subtract(
    union(
      cylinder({r: (tubeOuterD - (tubeOuterD - tubeInnerD) / 2) / 2, h: 100}).translate([0, 0, -peekH]),
      cylinder({r: tubeOuterD / 2, h: coneH + nippleH + baseH}).translate([0, 0, tubeOuterD - tubeInnerD]),
      cylinder({r1: tubeInnerD / 2, r2: tubeOuterD / 2, h: tubeOuterD - tubeInnerD})
    )
  );

  return holder
}
