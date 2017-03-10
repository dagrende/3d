// Google Nexus 5x stand for VW Polo driver cup stand
// holds USB-C charger connector that is inserted when phone is put into stand
function main() {
  var holderHeight = 30;
  var phoneWidth = 72.5;
  var phoneThickness = 8;
  var usbCenterFromFront = 4.2;
  var holderOverlapFront = 1.5;
  var holderOverlapBack = 10;
  var usbWidth = 8.2;
  var usbHeight = 2.4;

  var base = cylinder({r: 50, h: 1});

  var holder = difference(
    cube()
      .translate([-.5, -.5, 0])
      .scale([phoneWidth + 2, phoneThickness + 2, holderHeight]),
    cube()
      .translate([-.5, -1, 0])
      .scale([phoneWidth - 2 * holderOverlapFront, 20, holderHeight]),
    cube()
      .translate([-.5, 0, 0])
      .scale([phoneWidth - 2 * holderOverlapBack, 20, holderHeight]),
    cube()
      .translate([-.5, -.5, 0])
      .scale([phoneWidth, phoneThickness, holderHeight])
    );

  var yOffset = -phoneThickness / 2 + usbCenterFromFront;
  var usbProfile = hull(
    circle(1).translate([-usbWidth / 2 -1, yOffset, 0]),
    circle(1).translate([usbWidth / 2-1, yOffset, 0])
  );
  var usb = linear_extrude({ height: 10 }, usbProfile);
  var top = union(difference(base, usb), holder);

  var bottom = difference(
    cylinder({r: 40, h: 10}),
    cylinder({r: 39, h: 9}).translate([0, 0, -1]),
    cube()
      .translate([-.5, -.5, 0])
      .scale([10, 5, 10])
  );

  var all = union(
    top.translate([0, 0, 10]),
    bottom
  );

  return intersection(top, cube()
    .translate([-.5, -.5, 0])
    .scale([phoneWidth + 10, phoneThickness + 10, 100]))
}
