function main() {
  let
    height = 4.37,
    shelfHeight = 3.34,
    width = 10.69,
    aboveShelfWidth = 6.45,
    depth = 6.1,
    lowerD = 6.25,
    screwD = 4.6; // dimension for tapping M5 thread
  return cylinder({r1: lowerD / 2, r2: lowerD / 2 + shelfHeight, h: shelfHeight})
    .union(cylinder({r: aboveShelfWidth / 2, h: height - shelfHeight}).translate([0, 0, shelfHeight]))
    .union(cube().scale([-aboveShelfWidth / 2, -depth / 2, height - shelfHeight]).translate([0, 0, shelfHeight]))
    .union(cube().scale([aboveShelfWidth / 2, depth / 2, height - shelfHeight]).translate([0, 0, shelfHeight]))
    // .union(cube({center: [true, true, false]}).scale([aboveShelfWidth, depth, height - shelfHeight]).translate([0, 0, shelfHeight]))
    .intersect(cube({center: [true, true, false]}).scale([width, depth, height]))
    .subtract(cylinder({r: screwD / 2, h: height}))
    .subtract(cube().scale([width / 2, -depth / 2, height]).subtract(cylinder({r: width / 2, h: height})))
    .subtract(cube().scale([-width / 2, depth / 2, height]).subtract(cylinder({r: width / 2, h: height})))
}
