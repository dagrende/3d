function main() {
  var
    cr = 0.1,
    r = (13.05 - cr / 4) / sqrt(3);

    function roundedHexagon(r, cr, cornerout, rounded) {
      var a = [];
      for (var i = 0; i < 6; i++) {
        a.push(union(
            cylinder({r: cr}).translate([0, -cornerout, 0]),
            cube({size: [r - cr, 2 * cr, 1]}).translate([0, -cr, 0]).rotateZ(30)
          ).translate([0, -r + cr, 0]).rotateZ(60 * i)
        )
      }
      a.push(cylinder({r: r - cr, fn: 6}).rotateZ(30))
      return union(a);
    }

  var hole = roundedHexagon(r, cr, 0)
    .scale([1, 1, 100])
    .translate([0, 0, 1]);
  var body = union(
    roundedHexagon(r * 1.5, 2, 0).scale([1, 1, 6]),
    difference(roundedHexagon(15, 2, 1).scale([1, 1, 10]),
      roundedHexagon(13, cr, 0).scale([1, 1, 10]).translate([0, 0, 3]))
  );
  var holder = difference(
    body,
    hole
  )
  return holder;
}
