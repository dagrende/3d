// lib.jscad
// stack all a objects after the first one, in the direction in axis, that can be 'x', 'y' or 'z'
stack = function(axis, a) {
  let axi = "xyz".indexOf(axis);
  let top = a[0].getBounds()[0][axis];
  return a.map(function(ai) {
    let bnds = ai.getBounds();
    let tra = [0, 0, 0];
    tra[axi] = top - bnds[0][axis];
    top += bnds[1][axis] - bnds[0][axis];
    return ai.translate(tra)
  })
}

// align all a objects to the first one, according to axes, that is a sequence of [-][+][x|y|z].
// axes '-xy+z' means, align min x and center y of them.
align = function(axes, a) {
  function iterateAxes(ai, f) {
    let i = 0, pos;
    while (i < axes.length) {
      let prefix = axes[i];
      if (prefix === '-' || prefix === '+') {
        i++;
      }
      let axis = axes[i++],
        axisi = 'xyz'.indexOf(axis),
        bounds = ai.getBounds();
      if (prefix === '-') {
        pos = bounds[0][axis];
      } else if (prefix === '+') {
        pos = bounds[1][axis];
      } else {
        pos = (bounds[0][axis] + bounds[1][axis]) / 2;
      }
      f(axis, axisi, pos);
    }
  }
  function getRefs(obj) {
    let axi = [0, 0, 0];
    iterateAxes(obj, function(axis, axisi, pos) {
      axi[axisi] = pos;
    });
    return axi
  }
  let refs = getRefs(a[0]);
  function minus(a, b) {
    return a.map((ai, i)=>ai - b[i])
  }
  let alignedObjects = a.slice(1).map(function(ai) {
    let alignedCoords = minus(refs, getRefs(ai));
    return ai.translate(alignedCoords);
  });
  return [a[0]].concat(alignedObjects);
}

// function main() {
//   return union(align('xyz', stack('z', [cylinder(), cube().scale(1.5), cube()])))
// }
