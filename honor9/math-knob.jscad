function main() {
  const
  ria = 1, ra = 3.7,
  rib = 3, rb = 4,
  h = 8;
  return rotate_extrude(
  polygon([ [0,0],[0, h], [-rb+rib, h], [-rb+rib, h - rib],
    [-rb, h - rib], // tangent to b will be here
    [-ra, ria],   // tangent to a will be here
    [-ra-ria, ria] , [-ra-ria, 0]])
  .union(circle(rib).center().translate([-rb+rib, h - rib, 0]))
  .subtract(circle(ria).center().translate([-ra-ria, ria, 0]))
  .intersect(polygon([ [0,0],[0, h],[-rb, h],[-ra-ria, 0]]))
     )


}

// return array of the two points where the circles defined by p1, r1 and p2, r2 crosses
// p1, p2 and results are {x, y}
function circleCrossings(p1, r1, p2, r2) {
  const sqr = (x) => x * x,
    d = Math.sqrt(sqr(p1.x - p2.x) + sqr(p1.y - p2.y)),
    l = (sqr(r1) - sqr(r2) + sqr(d)) / (2 * d),
    h = Math.sqrt(sqr(r1) - sqr(l));
    return [
      { x: l / d * (p2.x - p1.x) + h / d * (p2.y - p1.y) + p1.x,
        y: l / d * (p2.y - p1.y) + h / d * (p2.x - p1.x) + p1.y},
      { x: l / d * (p2.x - p1.x) - h / d * (p2.y - p1.y) + p1.x,
        y: l / d * (p2.y - p1.y) - h / d * (p2.x - p1.x) + p1.y}
    ]
}
