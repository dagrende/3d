// lib.jscad
myLib = function() {
   var a = function(n) {  // internal
      return n*2;
   };
   myLib.b = function(n) {      // public
      return sphere(a(n));
   };
   return myLib
}
