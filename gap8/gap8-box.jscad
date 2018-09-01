function main() {
  let board = {x: 53.2, y: 75.2, z: 2},
    holes = [
      {x: 3.5, y: 3.4, d: 3},
      {x: 3.5 + 46, y: 3.4, d: 3},
      {x: 3.5 + 46, y: 3.4 + 54.8, d: 3},
      {x: 3.5, y: 3.4 + 52.2, d: 3}
    ],
    holder = (hole, rot) => cube({size: [5, 1, 5.5], center: [false, true, false]})
      .subtract(cylinder({d: 2, h: 5})).rotateZ(rot).translate([hole.x, hole.y, 0])
    gap8 = cube({size: [board.x, board.y, board.z]})
      //.subtract(union(holes.map(hole => cylinder({d: hole.d-0.2, h: 2}).translate([hole.x, hole.y, 0]))))
      .union(cube({size: [12.15, 16.5, 10.77]}).translate([31.8, 65.4, 2]))         // usb connector
      .union(cube({size: [8.9, 13.6, 10.65]}).translate([3.4, 63.5, 2]))            // power connector
      .union(cube({size: [2.5, 45.2 - 6.4, 8.5]}).translate([0.85, 6.4, 2]))        // left shield connector
      .union(cube({size: [2.5, 47.8, 8.5]}).translate([53.2 - 1.3 - 2.5, 6.4, 2])); // right shield connector
  return [
    cube({size: [2 + board.x + 2, 2 + board.y + 1.7, 12.77 + 3.5 + 1]}).translate([-2, -2, -1])
    .subtract(cube({size: [1 + board.x + 1, 1 + board.y + 0.7, 12.77 + 3 + 2]}).translate([-1, -1, 0]))
    .union([holder(holes[0], 180), holder(holes[0], 270),
      holder(holes[1], 270), holder(holes[1], 0),
      holder(holes[2], 0), holder(holes[3], 180),
      holder({x: board.x / 2, y: board.y - 4}, 90)])
    .union(holes.map(hole => cylinder({d: hole.d + 2, h: 3.5}).subtract(cylinder({d: 2, h: 3.5})).translate([hole.x, hole.y, 0])))
      .subtract(gap8.translate([0, 0, 3.5])).subtract(cube({size: [2.5, 5, 5]})
      .translate([holes[2].x - 4, holes[2].y - 2.5, 0]))
    .setColor(0.95, 0.95, 0.95, 0.4)
    // .intersect(cube({size: 100, center: true}).translate([30, 100, 0]))
    // .subtract(cube({size: 70, center: true}).translate([25, 60, 42]))
    ,
    //gap8.translate([0, 0, 3.5]),
  ];
}
