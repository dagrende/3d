// Google Nexus 5x stand for VW Polo driver cup stand
// holds USB-C charger connector that is inserted when phone is put into stand
// width/height/depth is with phone screen upright, facing me
function main() {
  var mugHoleTopDiameter = 83;
  var mugHoleDown10Diameter = 80;
  var holderHeight = 16;
  var phoneWidth = 72.5 + 0.3;
  var phoneDepth = 8 + .4;
  var phoneCornerRadius = 9;
  var usbCenterFromFront = 4.11;
  var holderOverlapFront = 1.5;
  var holderOverlapBack = 10;
  var usbWidth = 8.2 + .5;
  var usbDepth = 2.5 + .2;
  var usbHandleWidth = 12.5 + .7;
  var usbHandleDepth = 6.3;
  var usbHandleHeight = 23.5;
  var usbHandleCableBushelDiameter = 6.3;
  var usbHandleCableDiameter = 4.4;
  var holderOutsideWidth = 3;
  var holderWallThickness = 1.5;
  var baseThickness = 1.5;

  function ccube() {return cube().translate([-.5, -.5, 0])}
  function ccircle() {return circle(.5).translate([-.5, -.5])}

  var base = cylinder({r: mugHoleTopDiameter / 2 + 5, h: 1.5});

  var yOffset = -phoneDepth / 2 + usbCenterFromFront;

  var phoneBody = union(
    difference(
      ccube() // box
        .scale([phoneWidth, phoneDepth, holderHeight]),
      ccube() // cut top left corner
        .scale([phoneCornerRadius, phoneDepth, phoneCornerRadius])
        .translate([-(phoneWidth - phoneCornerRadius) / 2, 0, holderHeight - phoneCornerRadius]),
      ccube() // cut top rigt corner
        .scale([phoneCornerRadius, phoneDepth, phoneCornerRadius])
        .translate([(phoneWidth - phoneCornerRadius) / 2, 0, holderHeight - phoneCornerRadius])
    ),
    // add top left rounded corner
    cylinder({r: phoneCornerRadius, h: phoneDepth})
      .translate([0, 0, -phoneDepth / 2])
      .rotateX(90)
      .translate([-(phoneWidth) / 2 + phoneCornerRadius, 0, holderHeight - phoneCornerRadius]),
      // add top rigt rounded corner
    cylinder({r: phoneCornerRadius, h: phoneDepth})
      .translate([0, 0, -phoneDepth / 2])
      .rotateX(90)
      .translate([(phoneWidth) / 2 - phoneCornerRadius, 0, holderHeight - phoneCornerRadius])
  );

  // joint holder to base
  function softJoint(length) {
    return cube().subtract(cylinder().translate([1, 1, 0])).rotateX(90)
      .translate([0, .5, 0]).scale([2, length, 2])
      .translate([holderWallThickness / 2, 0, 0]);
  }

  // joint holder to long holder
  function softJoint2(length) {
    return cube().subtract(cylinder().translate([1, 1, 0]))
      .translate([0, 0, 0]).scale([2, 2, length])
      .translate([holderWallThickness / 2, holderWallThickness / 2, 0]);
  }

  function holder(length) {
    return ccube() // outer holder, short part
      .scale([holderWallThickness, length, holderHeight + holderOutsideWidth])
      .union(softJoint(length)).union(softJoint(length).rotateZ(180))
  }

  function holder2(length) {
    return ccube() // outer holder, short part
      .scale([holderWallThickness, length, holderHeight + holderOutsideWidth])
      .union(softJoint(length)).union(softJoint(length).rotateZ(180))
      .union(softJoint2(holderHeight + holderOutsideWidth))
      .union(softJoint2(holderHeight + holderOutsideWidth).rotateZ(90))
      .union(softJoint2(holderHeight + holderOutsideWidth).rotateZ(180))
      .union(softJoint2(holderHeight + holderOutsideWidth).rotateZ(270))
  }
  var ccyl = cylinder({r: .5}).translate([0, 0, -.5]);
  var shortLength = phoneDepth + holderOutsideWidth * 2;
  var usbHandleSupport = ccyl.rotateY(90)
    .scale([holderWallThickness, shortLength, shortLength]);

  var top =
    difference(
      union(
        base,
        holder(phoneWidth + holderOutsideWidth * 2).rotateZ(90).translate([0, 0, holderWallThickness]),

        holder2(shortLength).translate([-phoneWidth / 3, 0, holderWallThickness]),
        holder2(shortLength).translate([-(usbHandleWidth + holderWallThickness) / 2, 0, holderWallThickness]),
        holder2(shortLength).translate([(usbHandleWidth + holderWallThickness) / 2, 0, holderWallThickness]),
        holder2(shortLength).translate([phoneWidth / 3, 0, holderWallThickness]),

        ccube() // outer usb connector handle box
          .scale([usbHandleWidth + 2 * holderWallThickness, usbHandleDepth + holderWallThickness, usbHandleHeight + 2])
          .translate([0, 0, holderHeight]),
        usbHandleSupport.translate([-(usbHandleWidth + holderWallThickness) / 2, 0, holderHeight + holderOutsideWidth]),
        usbHandleSupport.translate([(usbHandleWidth + holderWallThickness) / 2, 0, holderHeight + holderOutsideWidth])
      ),

      phoneBody
      ,
      ccube() // inner usb connector handle box
        .scale([usbHandleWidth, usbHandleDepth + 1, usbHandleHeight + .5])
        .translate([0, .5, holderHeight]),
      cylinder({r: usbHandleCableBushelDiameter / 2, h: 20}) // inlet for usb connector handle cable
        .translate([0, 0, holderHeight + usbHandleHeight - 10])
        ,
      ccube() // inlet for usb connector handle cable
        .scale([usbHandleCableDiameter, usbHandleCableDiameter + 10, 20])
        .translate([0, usbHandleDepth, holderHeight + usbHandleHeight - 10])

  );

  var edge = difference(
    cylinder({r: mugHoleDown10Diameter / 2, h: 10}),
    cylinder({r: mugHoleDown10Diameter / 2 - holderWallThickness, h: 10})
  ).translate([0, 0, baseThickness]);

  var all = union(
    edge,
    top
  );

  // return jointSupport;

  return all.rotateZ(90)//.intersect(ccube().scale([90, 30, 100]));
}
