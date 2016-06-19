---
layout: post  
title: Guide to Creating Visualizations
subtitle: Learn how to create your own custom visualization using the D3plus skeleton
category: advanced
author: alex
author_url: https://twitter.com/ximoes
tags:  
  - tree map
  - data visualization
---

Ok, so you've been D3plus for a while, gotten used to its quirks and even come to love it (hopefully). Now you'd like to extend the library to include a specific visualization type not currently supported. Well, you've come to the right place. This post will walk you through, step-by-step, how to create a new visualization type using D3plus best practices and taking advantage of many of the built in utilities used in some of the other visualization -- no use repeating ourselves!

Building a Table
---
Our example visualization that we'll be building as part of this blog post is a table, or more descriptively a visual representation of a table. Something like the following two examples shown below.

<img src="/assets/posts/new_visualization_guide/tables.jpg" />

The Data
---
Below is a sample of what our data looks like for these examples.
{% highlight js linenos=table %}
var data = [
  {"index":"a", "foo":20, "bar":5, "baz":77},
  {"index":"b", "foo":2, "bar":20},
  {"index":"c", "foo":94, "bar":55, "baz":101},
  {"index":"d", "bar":95, "baz":82}
]
{% endhighlight %}

User Instantiation
---
Feature comparison example (using checkboxes)

<aside>
  Download test file (checkbox table).
  <p><a href="/assets/posts/new_visualization_guide/checkbox_table.html">checkbox_table.html</a>
  </p>
</aside>
{% highlight js linenos=table %}
var visualization = d3plus.viz()
    .container("#viz")
    .data(data)
    .type("table")
    .id("index")
    .shape("check")
    .cols(["foo", "bar", "baz"])
    .draw()
{% endhighlight %}

Feature heatmap example (using square cells with color scale)

<aside>
  Download test file (heatmap table).
  <p><a href="/assets/posts/new_visualization_guide/heatmap_table.html">heatmap_table.html</a>
  </p>
</aside>
{% highlight js linenos=table %}
var visualization = d3plus.viz()
    .container("#viz")
    .data(data)
    .type("table")
    .id("index")
    .shape("square")
    .cols(["foo", "bar", "baz"])
    .draw()
{% endhighlight %}

A New Viz
---
We begin our journey by creating a new file in the <code><a href="https://github.com/alexandersimoes/d3plus/tree/master/src/viz/types">/src/viz/types/</a></code> directory. We'll call our file <code>table.js</code>. Below you'll see a boilerplate sample to help us know how to structure our new viz type.

<aside>
  Download this boilerplate file.
  <p><a href="/assets/posts/new_visualization_guide/new_viz_boilerplate.js">new_viz_boilerplate.js</a>
  </p>
</aside>

{% highlight js linenos=table %}
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
var new_viz_name = function(vars) {

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
{% endhighlight %}

One more thing we'll need to do to get our little test example off the ground is to register this new viz type in the D3plus global viz shell. This is a coffeescript file found here: <code><a href="https://github.com/alexandersimoes/d3plus/blob/master/src/viz/viz.coffee">/src/viz/viz.coffee</a></code> (note the alpha-sorting of the viz types) :-).

{% highlight coffeescript linenos=table %}
module.exports = ->

  vars =
    g: {apps: {}}
    types:
      bar:          require "./types/bar.coffee"
      bubbles:      require "./types/bubbles.js"
      box:          require "./types/box.coffee"
      chart:        require "./types/deprecated/chart.coffee"
      geo_map:      require "./types/geo_map.js"
      line:         require "./types/line.coffee"
      network:      require "./types/network.js"
      paths:        require "./types/paths.coffee"
      pie:          require "./types/pie.coffee"
      rings:        require "./types/rings.js"
      scatter:      require "./types/scatter.coffee"
      stacked:      require "./types/stacked.coffee"
      table:        require "./types/table.js" # <-- this is the new line!
      tree_map:     require "./types/tree_map.coffee"
{% endhighlight %}

Now if we load reload our checkbox_table.html test file we'll actually see something draw! This is a huge leap but we've only just begun.

New Instantiation Method: .cols()
---
As you're probably familiar by now, there are different methods that can be called on different types of visualizations. For example, all visualizations require the user to set the <a href="https://github.com/alexandersimoes/d3plus/wiki/Container-Element">.container()</a>, <a href="https://github.com/alexandersimoes/d3plus/wiki/Data-Points">.data()</a> and <a href="https://github.com/alexandersimoes/d3plus/wiki/Output-Type">.type()</a> methods but other viz types may require other methods to be set e.g. geo maps require the <a href="https://github.com/alexandersimoes/d3plus/wiki/Geography-Data">.coords()</a> method.

In our case, for our new table visualization we'll require a brand new method, .cols(), that the user will have to set to tell the viz what keys in the data will be used as the columns. Methods are stored in the directory <code><a href="https://github.com/alexandersimoes/d3plus/tree/master/src/viz/methods">/src/viz/methods/</a></code>. Here we'll create the following file, cols.js.

{% highlight coffeescript linenos=table %}
module.exports = {
  "accepted" : [ Array , Function , String ],
  "process"  : function(value, vars) {
    if (typeof value === "string") value = [value]
    return value
  },
  "value"    : false
}
{% endhighlight %}

A method file is simply a JSON object that sets some specific settings. Behind the scences, when D3plus is loaded, each of these small method files get compiled into public functions, exposed to the user, that return the instantiated viz (for daisy chaining). You can think of them as extending an Interface with certain defaults that can be overridden with our implementation (for fans of object oriented programming). In our case we are setting the allowed variable types to the method as arrays, functions and strings. Process is a function that gets called initially on the supplied argument(s) to the method. In our case, if the user passes a string, we are coercing this to an array. The value key defines the default value returned by the method. As with our new viz type file created above, we also need to "register" this new method in our global viz shell. The following are lines added to the coffeescript file found here: <code><a href="https://github.com/alexandersimoes/d3plus/blob/master/src/viz/viz.coffee">/src/viz/viz.coffee</a></code>.

{% highlight coffeescript linenos=table %}
  # Define methods and expose public methods.
  attach vars,
    active:     require "./methods/active.coffee"
    aggs:       require "./methods/aggs.coffee"
    attrs:      require "./methods/attrs.coffee"
    axes:       require "./methods/axes.coffee"
    background: require "./methods/background.coffee"
    color:      require "./methods/color.coffee"
    cols:       require "./methods/cols.js"  # <-- this is the new line!
    container:  require "./methods/container.coffee"
    ...
{% endhighlight %}

New Shape: Checkbox
---
Another task you might find yourself needing to perform is creating a custom shape for your visualization. First we need to back up a step and define what a shape is in D3plus lingo. You see each viz file, whether it be our new table type or a tree map needs to specify an array of accepted "shapes". Like it's name suggests, these are all the specific types of shapes that our visualization can map data to. For example, the tree map can only draw squares while the scatter plot can draw our data as circles, squares or donuts. At the current point in time the possible shapes are:
<ul>
  <li>rectangle</li>
  <li>line</li>
  <li>donut</li>
  <li>area</li>
</ul>
We're going to create a new shape of type "check". The files that define a shape are stored in the directory <code><a href="https://github.com/alexandersimoes/d3plus/tree/master/src/viz/helpers/shapes">/src/viz/helpers/shapes/</a></code>. Here we'll create the following file, <code>check.js</code>.

{% highlight js linenos=table %}
var shapeStyle  = require("./style.coffee")
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Draws "square" and "circle" shapes using svg:rect
//------------------------------------------------------------------------------
module.exports = function(vars,selection,enter,exit) {

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Initialize check scale on enter and exit.
  //----------------------------------------------------------------------------
  function init(paths){
    paths.attr("transform", "scale(1)")
  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Change scale of check on update.
  //---------------------------------------------------------------------------
  function update(paths){
    paths.attr("transform", function(d){
      var smaller_dim = Math.min(d.d3plus.width, d.d3plus.height);
      var scale = Math.floor(smaller_dim / 16);
      return "scale("+scale+")";
    })
  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // "paths" Enter
  //----------------------------------------------------------------------------
  enter.append("path").attr("class","d3plus_data")
    .attr("d", "M5-6.844L3.594-5.407L-2,0.188l-1.594-1.594L...7.844-4L5-6.844z")
    .call(init)
    .call(shapeStyle,vars)

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // "paths" Update
  //----------------------------------------------------------------------------
  selection.selectAll("path.d3plus_data")
    .data(function(d) {
      return [d];
    })

  if (vars.draw.timing) {
    selection.selectAll("path.d3plus_data")
      .transition().duration(vars.draw.timing)
        .call(update)
        .call(shapeStyle,vars)
  }
  else {
    selection.selectAll("path.d3plus_data")
      .call(update)
      .call(shapeStyle,vars)
  }

}
{% endhighlight %}
Let's walk through this file and point out things to note. The line tells us we're importing our default shape styles (held in an external file) which we can apply using D3's .call() method on a selection. The next thing to notice is that we're separating our enter/update function into external functions called init() and update(). While this isn't strictly necessary, it allows us to reduce code duplication because we'll be using our init() function on enter and exit. Our update function we'll also be using in multiple places because we're separating our update code depending on whether or not vars.draw.timing is true. This is a variable that gets toggled depending on the amount of data we're trying to draw i.e. when there are a lot of items to draw D3plus smartly toggles transitions off so that the browser doesn't choke. It's a small optimization that makes a huge difference! The rest of the code base is mostly self-explanatory using D3's enter/update/exit paradigm.

Putting It All Together
---
Here is a link to the actual <code><a href="https://github.com/alexandersimoes/d3plus/blob/master/src/viz/types/table.js">/src/viz/types/table.js</a></code> source code. We'll step through a simplified version to highlight specific functionality that would be helpful for someone looking to make their own custom viz.

{% highlight js linenos=table %}
  // get unique IDs and columns
  var ids = uniques(vars.data.viz, vars.id.value);
  var cols = uniques(vars.cols.value);

  // width/height are a function of number of IDs and columns
  var item_height = vars.height.viz / (ids.length+1); // add 1 for header offset
  var item_width = vars.width.viz / cols.length;
{% endhighlight %}
From the user defined .id() and .cols() variable we are obtaining a unique array of values we'll use for the columns and rows of our table. Next we determine the width and height of each cell for our table based on the total available width and height of our viz. For our height we add 1 to the length in anticipation of a header row.

{% highlight js linenos=table %}
    var ret = []
    var colors = {}

  // doing 2 things here, first we add our column headers to our ret array as
  // items dor d3plus to draw. We also compute the color scales for each column
  cols.forEach(function(col, col_i){
    // add columns
    var header = {"d3plus":{
      "x": (item_width * col_i) + item_width/2,
      "y": item_height/2,
      "width": item_width,
      "height": item_height,
      "id": "d3p_header_"+col.replace(/ /g,"_"),
      "shape": "square",
      "color": rand_col(col),
      "text": col
    }}
    if(col == vars.id.value){
      header.d3plus.color = "#fff";
    }
    if(col == "label"){
      header.d3plus.label = false;
      header.d3plus.color = "#fff";
      header.d3plus.stroke = "#fff";
    }
    ret.push(header)

    // set up color scales
    if(vars.data.keys[col] == "number"){
      var domain_extent = d3.extent(vars.data.viz, function(d){ return d[col]; })
      if(domain_extent[0] == domain_extent[1]){
        domain_extent = [domain_extent[0]-1, domain_extent[1]]
      }
      colors[col] = d3.scale.linear().domain(domain_extent).range([vars.color.missing,rand_col(col)])
    }
    else if(vars.data.keys[col] == "boolean"){
      colors[col] = function(bool){
        return bool ? rand_col(col) : vars.color.missing;
      }
    }
  })
{% endhighlight %}
Two more variable we initialize are ret (an empty array) and colors (an empty object). We'll use the ret array to push items to be drawn and return this at the end of our function. The colors object we'll use to push our color scales which we'll precompute per column. In the following <code>forEach()</code> loop we'll create our header cells and append them to our return array as well as precompute our color scales. One thing to note where we're creating our color scales is that we're using the D3plus <code>vars.data.keys</code> helper to decipher is a column's data types are numbers or booleans.

{% highlight js linenos=table %}
  vars.data.viz.forEach(function(d, row_i){
    // offset for column headers
    row_i += 1;

    // loop through each user defined column to create new "object" to draw
    cols.forEach(function(col, col_i){

      // need to clone data since we'll be dupliating it for each column
      var d_clone = copy(d);

      // set unique ID otherwise it'd be the same in each column
      d_clone.d3plus.id = "d3p_"+d_clone[vars.id.value].replace(/ /g,"_")+"_"+col;
      d_clone.d3plus.x = (item_width * col_i) + item_width/2;
      d_clone.d3plus.y = (item_height * row_i) + item_height/2;
      d_clone.d3plus.width = item_width;
      d_clone.d3plus.height = item_height;

      if(col == "label"){
        d_clone.d3plus.shape = "square";
        d_clone.d3plus.color = "#fff";
        // special case for top left corner
        ret.push(d_clone)
      }

      // be sure that this column is actually in this data item
      if(d3.keys(d).indexOf(col) >= 0 && col in d){
        if(colors[col]){
          d_clone.d3plus.color = colors[col](d_clone[col]);
        }
        d_clone.d3plus.text = d_clone[col];
        if(vars.data.keys[col] == "boolean"){
          d_clone.d3plus.label = false;
        }
        else if(vars.data.keys[col] == "string"){
          d_clone.d3plus.color = vars.color.missing;
          d_clone.d3plus.stroke = "#fff";
          d_clone.d3plus.shape = "square";
        }
        ret.push(d_clone)
      }
    })

  })

  return ret
{% endhighlight %}
This final section is the meat and potatoes where we're actually looping through each row and column value and determining their visual attributes. We first clone our data object (since we'll need a unique instance per column). The id attribute of our d3plus object is what is used as our <a href="http://bost.ocks.org/mike/constancy/">object constancy</a> key, so we need to make sure this is unique and doesn't contain any spaces. Next we compute x, y, width and height attributes for our return object. We have a some special visual styles that we'll override if the cell is in our label column. lastly, we only add our object to the return array if the user supplied data row contains a value for the current column. We again check our D3plus <code>vars.data.keys</code> to see if the value of our cell is a string in which case we'll set its label to its value. This means if the user set the shape property to "square" they will see the text.
