// Google Nexus 5x stand for VW Polo driver cup stand
// holds USB-C charger connector that is inserted when phone is put into stand
// width/height/depth is with phone screen upright, facing me
function main() {
  var mugHoleTopDiameter = 83;
  var mugHoleDown10Diameter = 80;
  var holderHeight = 16;
  var phoneWidth = 72.5 + 0.7;
  var phoneDepth = 8 + .2;
  var phoneCornerRadius = 9;
  var usbCenterFromFront = 4.11;
  var holderOverlapFront = 1.5;
  var holderOverlapBack = 10;
  var usbWidth = 8.2 + .5;
  var usbDepth = 2.5 + .2;
  var usbHandleWidth = 12.5 + .7;
  var usbHandleDepth = 6.3;
  var usbHandleHeight = 23.5;
  var usbHandleCableDiameter = 6.3;
  var holderOutsideWidth = 5;
  var holderWallThickness = 1;

  function ccube() {return cube().translate([-.5, -.5, 0])}
  function ccircle() {return circle(.5).translate([-.5, -.5])}

  var base = cylinder({r: 50, h: 1});

  var yOffset = -phoneDepth / 2 + usbCenterFromFront;

  var phoneBody = union(
    difference(
      ccube() // phone body
        .scale([phoneWidth, phoneDepth, holderHeight]),
      ccube() // phone body
        .scale([phoneCornerRadius, phoneDepth, phoneCornerRadius])
        .translate([-(phoneWidth - phoneCornerRadius) / 2, 0, holderHeight - phoneCornerRadius]),
      ccube() // phone body
        .scale([phoneCornerRadius, phoneDepth, phoneCornerRadius])
        .translate([(phoneWidth - phoneCornerRadius) / 2, 0, holderHeight - phoneCornerRadius])
    ),
    cylinder({r: phoneCornerRadius, h: phoneDepth})
      .translate([0, 0, -phoneDepth / 2])
      .rotateX(90)
      .translate([-(phoneWidth) / 2 + phoneCornerRadius, 0, holderHeight - phoneCornerRadius]),
    cylinder({r: phoneCornerRadius, h: phoneDepth})
      .translate([0, 0, -phoneDepth / 2])
      .rotateX(90)
      .translate([(phoneWidth) / 2 - phoneCornerRadius, 0, holderHeight - phoneCornerRadius])

    )

  var top =
    difference(
      union(
        base,
        ccube() // outer holder, long part
          .scale([phoneWidth + holderOutsideWidth * 2, holderWallThickness, holderHeight + holderOutsideWidth])
          .translate([0, 0, 1]),

        ccube() // outer holder, short part
          .scale([holderWallThickness, phoneDepth + holderOutsideWidth * 2, holderHeight + holderOutsideWidth])
          .translate([-phoneWidth / 3, 0, 1]),
        // ccube() // outer holder, short part
        //   .scale([holderWallThickness, phoneDepth + holderOutsideWidth * 2, holderHeight + holderOutsideWidth])
        //   .translate([-usbHandleWidth / 2, 0, 1]),
        ccube() // outer holder, short part
          .scale([holderWallThickness, phoneDepth + holderOutsideWidth * 2, holderHeight + holderOutsideWidth])
          .translate([0, 0, 1]),
        // ccube() // outer holder, short part
        //   .scale([holderWallThickness, phoneDepth + holderOutsideWidth * 2, holderHeight + holderOutsideWidth])
        //   .translate([usbHandleWidth / 2, 0, 1]),
        ccube() // outer holder, short part
          .scale([holderWallThickness, phoneDepth + holderOutsideWidth * 2, holderHeight + holderOutsideWidth])
          .translate([phoneWidth / 3, 0, 1])
        //   ,
        //
        // ccube() // outer usb connector handle box
        //   .scale([usbHandleWidth + 2, usbHandleDepth + 1, usbHandleHeight + 2])
        //   .translate([0, 0, holderHeight])
      ),

      phoneBody
      //,
      // ccube() // inner usb connector handle box
      //   .scale([usbHandleWidth, usbHandleDepth + 1, usbHandleHeight + .5])
      //   .translate([0, .5, holderHeight + .5]),
      // ccube() // inlet for usb connector handle cable
      //   .scale([usbHandleCableDiameter, usbHandleCableDiameter + 10, 20])
      //   .translate([0, 0, holderHeight + usbHandleHeight - 10]),

  );

  var edge = difference(
    cylinder({r: mugHoleDown10Diameter / 2, h: 10}),
    cylinder({r: mugHoleDown10Diameter / 2 - 1, h: 10})
  ).translate([0, 0, 1]);

  var all = union(
    // edge,
    top
  );
// return phoneBody;
  return all.intersect(ccube().scale([90, 30, 100]));
}
