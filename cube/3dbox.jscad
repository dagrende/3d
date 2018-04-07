function main() {
    function el() {return rotate_extrude({fn:4}, 
    		polygon({points:[ [0,0],[5,0],[4,1],[0,1]]}) )
    	.rotateZ(45)}
   return union(el().rotateX(90));
}
