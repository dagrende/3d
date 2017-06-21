// returns a 1x1x1 cube centered around origo, with
// one edge rounded with radius 0.5.
// The edge to round, is specified by rex as 'ab' where a and b is in x, X, y, Y, z, Z.
// Example: topmost edge in the lower x direction is 'Zx'.
function roundEdgeCube(rex) {
  function ord(c) {return {x: 0, X: 0, y: 1, Y: 1, z: 2, Z: 2}[c]};
  function sign(c) {return {x: -1, X: 1, y: -1, Y: 1, z: -1, Z: 1}[c]};
  var c = cube().translate([-0.5, -0.5, -0.5]);

  function aa(char, m) {
    var a = [0, 0, 0];
    a[ord(char)] += m * sign(char);
    return a;
  }

  var b = [0, 0, 0];
  b[ord(rex[0])] += 90 * sign(rex[0])

  var cy = cylinder({r: 0.5}).translate([0, 0, -0.5]);
  if (ord(rex[0]) == 2 || ord(rex[1]) == 2) {
    cy = cy.rotateX(90);
    if (ord(rex[0]) == 1 || ord(rex[1]) == 1) {
      cy = cy.rotateZ(90);
    }
  }

  var roundPlace = c.translate(aa(rex[0], 0.5)).translate(aa(rex[1], 0.5));
  return c
    .subtract(roundPlace)
    .union(cy.intersect(roundPlace));
}

function main() {
  return roundEdgeCube('Zx');
}
