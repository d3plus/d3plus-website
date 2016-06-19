//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Utils to include using relative imports
//------------------------------------------------------------------------------
var uniques = require("../../util/uniques.coffee");
var copy    = require("../../util/copy.coffee");

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Our main function to run, given the insttantiated vars, the function must
// return an array of objects each with a d3plus object containing
// x, y, width and height values that will be rendered on the screen.
//------------------------------------------------------------------------------
var table = function(vars) {
  
  var data = vars.data.viz;
  var height = vars.height.viz;
  var width = vars.width.viz;
  
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Loop through data for perform some manipulation
  //----------------------------------------------------------------------------
  vars.data.viz.forEach(function(d, i){
    
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Access user defined variables such as id
    //--------------------------------------------------------------------------
    var this_id = d[vars.id.value];
    
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Set vars for drawing
    //--------------------------------------------------------------------------
    d.d3plus.x = 0;
    d.d3plus.y = 0;
    d.d3plus.width = width/2;
    d.d3plus.height = height/2;
    
  })
  
  return data;

};

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Visualization Settings and Helper Functions
//------------------------------------------------------------------------------
table.shapes = ["square"];
table.requirements = ["data"];

module.exports = table;
