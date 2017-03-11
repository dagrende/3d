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
  var usbWidth = 8.2 * 1.025;
  var usbHeight = 2.5 * 1.1;
  var usbHandleWidth = 12.5;
  var usbHandleHeight = 6.3;
  var usbHandleDepth = 23.5;
  var usbHandleCableDiameter = 6.3;

  function ccube() {return cube().translate([-.5, -.5, 0])}

  var base = cylinder({r: 50, h: 1});

  var yOffset = -phoneThickness / 2 + usbCenterFromFront;
  console.log(yOffset);
  var usbProfile = hull(
    circle(1).translate([-1, -1]).translate([-usbWidth / 2, 0, 0]),
    circle(1).translate([-1, -1]).translate([usbWidth / 2, 0, 0])
  );
  var usb = linear_extrude({ height: 3 }, usbProfile);

  var bite = cylinder({r: .5})
    .translate([0, 0, -.5])
    .rotateX(90).scale(25)
    .translate([0, 0, 20]);

  // bite = ccube().scale([20, 100, 25]).translate([0, 0, 10]);

  var top =
    difference(
      union(
        // base,
        ccube()
          .scale([phoneWidth + 2, phoneThickness + 2, holderHeight])
          .translate([0, 0, 1])
        //   ,
        // difference(
        //   ccube()
        //     .scale([usbHandleWidth + 2, usbHandleHeight + 2, usbHandleDepth + 2])
        //     .translate([0, 0, holderHeight]),
        //   ccube()
        //     .scale([usbHandleWidth, usbHandleHeight + 2, usbHandleDepth + 1])
        //     .translate([0, 1, holderHeight]),
        //   ccube()
        //     .scale([usbHandleCableDiameter, usbHandleCableDiameter + 10, 20])
        //     .translate([0, 0, holderHeight + usbHandleDepth - 10])
        // )
      ),

      ccube()
        .scale([phoneWidth, phoneThickness, holderHeight]),
      usb.translate([0, -phoneThickness / 2 + usbCenterFromFront, holderHeight])
      ,
      bite.translate([-20, 0, 0]),
      bite.translate([20, 0, 0])
   );

  var edge = difference(
    cylinder({r: mugHoleDown10Diameter / 2, h: 10}),
    cylinder({r: mugHoleDown10Diameter / 2 - 1, h: 10})
  ).translate([0, 0, 1]);

  var all = union(
    // edge,
    top
  );

  // return usb;

  return all.rotateZ(90);

  // return intersection(top, cube()
  //   .translate([-.5, -.5, 0])
  //   .scale([phoneWidth + 10, phoneThickness + 10, 100]))
}
