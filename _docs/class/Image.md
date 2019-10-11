---
name: Image
kind: class
---

  <a name="Image"></a>

### **Image** [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Image.js#L6)


This is a global class.


* [Image](#Image)
    * [new Image()](#new_Image_new)
    * [.render([*callback*])](#Image.render) ↩︎
    * [.data([*data*])](#Image.data) ↩︎
    * [.duration([*ms*])](#Image.duration) ↩︎
    * [.height([*value*])](#Image.height) ↩︎
    * [.id([*value*])](#Image.id) ↩︎
    * [.opacity([*value*])](#Image.opacity) ↩︎
    * [.pointerEvents([*value*])](#Image.pointerEvents) ↩︎
    * [.select([*selector*])](#Image.select) ↩︎
    * [.url([*value*])](#Image.url) ↩︎
    * [.width([*value*])](#Image.width) ↩︎
    * [.x([*value*])](#Image.x) ↩︎
    * [.y([*value*])](#Image.y) ↩︎


<a name="new_Image_new" href="#new_Image_new">#</a> new **Image**()

Creates SVG images based on an array of data.



a sample row of data

```js
var data = {"url": "file.png", "width": "100", "height": "50"};
```
passed to the generator

```js
new Image().data([data]).render();
```
creates the following

```js
<image class="d3plus-Image" opacity="1" href="file.png" width="100" height="50" x="0" y="0"></image>
```
this is shorthand for the following

```js
image().data([data])();
```
which also allows a post-draw callback function

```js
image().data([data])(function() { alert("draw complete!"); })
```


<a name="Image.render" href="#Image.render">#</a> Image.**render**([*callback*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Image.js#L46)

Renders the current Image to the page. If a *callback* is specified, it will be called once the images are done drawing.


This is a static method of [<code>Image</code>](#Image), and is chainable with other methods of this Class.


<a name="Image.data" href="#Image.data">#</a> Image.**data**([*data*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Image.js#L110)

If *data* is specified, sets the data array to the specified array and returns the current class instance. If *data* is not specified, returns the current data array. An <image> tag will be drawn for each object in the array.


This is a static method of [<code>Image</code>](#Image), and is chainable with other methods of this Class.


<a name="Image.duration" href="#Image.duration">#</a> Image.**duration**([*ms*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Image.js#L120)

If *ms* is specified, sets the animation duration to the specified number and returns the current class instance. If *ms* is not specified, returns the current animation duration.


This is a static method of [<code>Image</code>](#Image), and is chainable with other methods of this Class.


<a name="Image.height" href="#Image.height">#</a> Image.**height**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Image.js#L134)

If *value* is specified, sets the height accessor to the specified function or number and returns the current class instance.


This is a static method of [<code>Image</code>](#Image), and is chainable with other methods of this Class.


```js
function(d) {
  return d.height;
}
```


<a name="Image.id" href="#Image.id">#</a> Image.**id**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Image.js#L148)

If *value* is specified, sets the id accessor to the specified function and returns the current class instance.


This is a static method of [<code>Image</code>](#Image), and is chainable with other methods of this Class.


```js
function(d) {
  return d.id;
}
```


<a name="Image.opacity" href="#Image.opacity">#</a> Image.**opacity**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Image.js#L158)

Sets the opacity of the image.


This is a static method of [<code>Image</code>](#Image), and is chainable with other methods of this Class.


<a name="Image.pointerEvents" href="#Image.pointerEvents">#</a> Image.**pointerEvents**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Image.js#L168)

If *value* is specified, sets the pointer-events accessor to the specified function or string and returns the current class instance.


This is a static method of [<code>Image</code>](#Image), and is chainable with other methods of this Class.


<a name="Image.select" href="#Image.select">#</a> Image.**select**([*selector*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Image.js#L178)

If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns the current class instance. If *selector* is not specified, returns the current SVG container element.


This is a static method of [<code>Image</code>](#Image), and is chainable with other methods of this Class.


<a name="Image.url" href="#Image.url">#</a> Image.**url**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Image.js#L192)

If *value* is specified, sets the URL accessor to the specified function and returns the current class instance.


This is a static method of [<code>Image</code>](#Image), and is chainable with other methods of this Class.


```js
function(d) {
  return d.url;
}
```


<a name="Image.width" href="#Image.width">#</a> Image.**width**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Image.js#L206)

If *value* is specified, sets the width accessor to the specified function or number and returns the current class instance.


This is a static method of [<code>Image</code>](#Image), and is chainable with other methods of this Class.


```js
function(d) {
  return d.width;
}
```


<a name="Image.x" href="#Image.x">#</a> Image.**x**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Image.js#L220)

If *value* is specified, sets the x accessor to the specified function or number and returns the current class instance.


This is a static method of [<code>Image</code>](#Image), and is chainable with other methods of this Class.


```js
function(d) {
  return d.x || 0;
}
```


<a name="Image.y" href="#Image.y">#</a> Image.**y**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Image.js#L234)

If *value* is specified, sets the y accessor to the specified function or number and returns the current class instance.


This is a static method of [<code>Image</code>](#Image), and is chainable with other methods of this Class.


```js
function(d) {
  return d.y || 0;
}
```

