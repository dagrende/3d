function main() {
  var headHeight = 5.7;
  var headSize = 12.8;
  var threadLength = 50;
  var theadDiameter = 8;

  var head = cylinder({
    r: headSize / sqrt(3),
    h: headHeight,
    fn: 6});
  var thread = cylinder({h: threadLength, r: theadDiameter / 2})
  return union(head, thread.translate([0, 0, headHeight]));
}
