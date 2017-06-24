// returns a 1x1x1 cube centered around origo, with
// one edge rounded with radius 0.5.
// The edge to round, is specified by rex as 'ab' where a and b is in x, X, y, Y, z, Z.
// Example: topmost edge in the lower x direction is 'Zx'.
function roundEdgeCube(rex) {
  var c = cube().translate([-0.5, -0.5, -0.5]);
  var cy = cylinder({r: 0.5}).translate([0, 0, -0.5]);

  function ord(c) {return {x: 0, X: 0, y: 1, Y: 1, z: 2, Z: 2}[c]};
  function sign(c) {return {x: -1, X: 1, y: -1, Y: 1, z: -1, Z: 1}[c]};
  function aa(char, m) {
    var a = [0, 0, 0];
    a[ord(char)] += m * sign(char);
    return a;
  }
  function roundPlace(i0, i1) {
    if (ord(rex[0]) == 2 || ord(rex[1]) == 2) {
      cy = cy.rotateX(90);
      if (ord(rex[0]) == 1 || ord(rex[1]) == 1) {
        cy = cy.rotateZ(90);
      }
    }
    return c.translate(aa(rex[0], 0.5)).translate(aa(rex[1], 0.5));
  }

  // rendera steg för steg...

  return c
    .subtract(roundPlace(0, 1))
    .union(cy.intersect(roundPlace(0, 1)));
}

function main() {
  return roundEdgeCube('Zy');
}
