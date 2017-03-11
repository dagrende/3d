// Google Nexus 5x stand for VW Polo driver cup stand
// holds USB-C charger connector that is inserted when phone is put into stand
// width/height/depth is with phone screen upright, facing me
function main() {
  var mugHoleTopDiameter = 83;
  var mugHoleDown10Diameter = 80;
  var holderHeight = 16;
  var phoneWidth = 72.5 + 0.7;
  var phoneDepth = 8 + .2;
  var usbCenterFromFront = 4.11;
  var holderOverlapFront = 1.5;
  var holderOverlapBack = 10;
  var usbWidth = 8.2 + .5;
  var usbDepth = 2.5 + .2;
  var usbHandleWidth = 12.5;
  var usbHandleHeight = 6.3;
  var usbHandleDepth = 23.5;
  var usbHandleCableDiameter = 6.3;

  function ccube() {return cube().translate([-.5, -.5, 0])}
  function ccircle() {return circle(.5).translate([-.5, -.5])}

  var base = cylinder({r: 50, h: 1});

  var yOffset = -phoneDepth / 2 + usbCenterFromFront;
  console.log(yOffset);
  var usbProfile = hull(
    ccircle().scale(usbDepth).translate([-(usbWidth - usbDepth) / 2, 0, 0]),
    ccircle().scale(usbDepth).translate([(usbWidth - usbDepth) / 2, 0, 0])
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
        ccube() // outer holder
          .scale([phoneWidth + 2, phoneDepth + 2, holderHeight])
          .translate([0, 0, 1]),
        ccube() // outer usb connector handle box
          .scale([usbHandleWidth + 2, usbHandleHeight + 1, usbHandleDepth + 2])
          .translate([0, 0, holderHeight])
      ),

      ccube() // inner usb connector handle box
        .scale([usbHandleWidth, usbHandleHeight + 1, usbHandleDepth + .5])
        .translate([0, .5, holderHeight + .5]),
      ccube() // inlet for usb connector handle cable
        .scale([usbHandleCableDiameter, usbHandleCableDiameter + 10, 20])
        .translate([0, 0, holderHeight + usbHandleDepth - 10]),
      ccube() // inner holder
        .scale([phoneWidth, phoneDepth, holderHeight]),
      usb.translate([0, -phoneDepth / 2 + usbCenterFromFront, holderHeight]),
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

  return all.rotateZ(90);
}
