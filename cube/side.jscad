function side(w, d, h) {
	return polyhedron({
  		points: [ [0,0,0],[w, 0, 0],[w, d, 0],[0, d, 0], 		 // 0-3
            [h, h, h], [w-h, h, h], [w-h, d-h, h], [h, d-h, h]   // 4-7
        ],
  		polygons: [
  			[0,1,2,3], [7,6,5,4],
  			[4,5,1,0], [5,6,2,1], [6,7,3,2], [7,4,0,3]
        ]
	});
}

function main() {
   return union([
   		side(20, 20, 2), 
   		side(20, 10, 2).rotateX(90).translate([0, 20, 0]), 
   		side(20, 10, 2).rotateX(-90).translate([0, 0, 10])
   	]);
}