function screw(m, pitch, height) {
  let thread = [];
  let n = 16;
  let h = cos(30) * pitch;
  let rmin = m / 2 - 5 * h / 8;
  for (let i = 0; i < ceil(n * (height / pitch + 1)); i++) {
    thread.push(th_out_pt(rmin + h / 8, pitch, 360 / n, i, n, h / 8, pitch / n))
  }
  return union(thread)
    .translate([0, 0, -pitch])
    .intersect(cylinder({r: m / 2, h: height, fn: n}))
    .union(cylinder({r: rmin + h / 8, h: height, fn: n}))
}

// make a part of an outside thread (single segment)
//  rt = radius of thread (nearest centre)
//  p = pitch
//  s = segment length (degrees)
//  sg = segment number
//  thr = segments in circumference
//  h = ISO h of thread / 8
//  sh = segment height (z)
function th_out_pt(rt,p,s,sg,thr,h,sh) {
	let as = (sg % thr) * s;			// angle to start of seg
	let ae = as + s  - (s/100);		// angle to end of seg (with overlap)
	let z = sh*sg;
	//pp = p/2;
	//   1,4
	//   |\
	//   | \  2,5
 	//   | /
	//   |/
	//   0,3
	//  view from front (x & z) extruded in y by sg
	//
	//echo(str("as=",as,", ae=",ae," z=",z));
  let params = {
		points: [
			[cos(as)*rt,sin(as)*rt,z],								// 0
			[cos(as)*rt,sin(as)*rt,z+(3/4*p)],						// 1
			[cos(as)*(rt+(5*h)),sin(as)*(rt+(5*h)),z+(3/8*p)],		// 2
			[cos(ae)*rt,sin(ae)*rt,z+sh],							// 3
			[cos(ae)*rt,sin(ae)*rt,z+(3/4*p)+sh],					// 4
			[cos(ae)*(rt+(5*h)),sin(ae)*(rt+(5*h)),z+sh+(3/8*p)]],	// 5
		triangles: [
			[0,1,2],			// near face
			[3,5,4],			// far face
			[0,3,4],[0,4,1],	// left face
			[0,5,3],[0,2,5],	// bottom face
			[1,4,5],[1,5,2]]};
  console.log('params', params);
	return polyhedron(params);	// top face
}
