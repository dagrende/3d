// Google Nexus 5x stand for VW Polo driver cup stand
// holds USB-C charger connector that is inserted when phone is put into stand
function main() {
  var mugHoleTopDiameter = 83;
  var mugHoleDown10Diameter = 80;
  var holderHeight = 16;
  var phoneWidth = 72.5 * 1.025;
  var phoneThickness = 8 * 1.025;
  var usbCenterFromFront = 4.11;
  var holderOverlapFront = 1.5;
  var holderOverlapBack = 10;
  var usbWidth = 8.2;
  var usbHeight = 2.4;

  function ccube() {return cube().translate([-.5, -.5, 0])}

  var base = cylinder({r: 50, h: 1});

  var yOffset = -phoneThickness / 2 + usbCenterFromFront;
  console.log(yOffset);
  var usbProfile = hull(
    circle(1).translate([-1, -1]).translate([-usbWidth / 2, 0, 0]),
    circle(1).translate([-1, -1]).translate([usbWidth / 2, 0, 0])
  );
  var usb = linear_extrude({ height: 10 }, usbProfile);

  var top =
    difference(
      union(
        base,
        ccube()
          .scale([phoneWidth + 2, phoneThickness + 2, holderHeight])
          .translate([0, 0, -holderHeight + 1])
      ),
      ccube()
        .scale([phoneWidth, phoneThickness, holderHeight])
        .translate([0, 0, -holderHeight + 2]),

      usb.translate([0, -phoneThickness / 2 + usbCenterFromFront, -holderHeight + 1])
   );

  var edge = difference(
    cylinder({r: 40, h: 10}),
    cylinder({r: 39, h: 10})
  ).translate([0, 0, -10]);

  var all = union(
    top,
    edge
  );

  // return usb;

  return all.translate([0, 0, holderHeight]);

  // return intersection(top, cube()
  //   .translate([-.5, -.5, 0])
  //   .scale([phoneWidth + 10, phoneThickness + 10, 100]))
}
