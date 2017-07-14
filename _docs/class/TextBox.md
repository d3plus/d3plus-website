---
name: TextBox
kind: class
---

<a name="TextBox"></a>

### **TextBox** [<>](https://github.com/d3plus/d3plus-text/blob/master/src/TextBox.js#L10)


This is a global class, and extends all of the methods and functionality of [<code>BaseClass</code>](#BaseClass).

* [TextBox](#TextBox) ⇐ [<code>BaseClass</code>](#BaseClass)
    * [new TextBox()](#new_TextBox_new)
    * [.render([*callback*])](#TextBox.render)
    * [.data([*data*])](#TextBox.data)
    * [.delay([*value*])](#TextBox.delay)
    * [.duration([*value*])](#TextBox.duration)
    * [.ellipsis([*value*])](#TextBox.ellipsis)
    * [.fontColor([*value*])](#TextBox.fontColor)
    * [.fontFamily([*value*])](#TextBox.fontFamily)
    * [.fontMax([*value*])](#TextBox.fontMax)
    * [.fontMin([*value*])](#TextBox.fontMin)
    * [.fontResize([*value*])](#TextBox.fontResize)
    * [.fontSize([*value*])](#TextBox.fontSize)
    * [.fontWeight([*value*])](#TextBox.fontWeight)
    * [.height([*value*])](#TextBox.height)
    * [.id([*value*])](#TextBox.id)
    * [.lineHeight([*value*])](#TextBox.lineHeight)
    * [.overflow([*value*])](#TextBox.overflow)
    * [.pointerEvents([*value*])](#TextBox.pointerEvents)
    * [.rotate([*value*])](#TextBox.rotate)
    * [.select([*selector*])](#TextBox.select)
    * [.split([*value*])](#TextBox.split)
    * [.text([*value*])](#TextBox.text)
    * [.textAnchor([*value*])](#TextBox.textAnchor)
    * [.verticalAlign([*value*])](#TextBox.verticalAlign)
    * [.width([*value*])](#TextBox.width)
    * [.x([*value*])](#TextBox.x)
    * [.y([*value*])](#TextBox.y)

<a name="new_TextBox_new" href="#new_TextBox_new">#</a> new **TextBox**()

Creates a wrapped text box for each point in an array of data. See [this example](https://d3plus.org/examples/d3plus-text/getting-started/) for help getting started using the textBox function.



<a name="TextBox.render" href="#TextBox.render">#</a> TextBox.**render**([*callback*]) [<>](https://github.com/d3plus/d3plus-text/blob/master/src/TextBox.js#L57)

Renders the text boxes. If a *callback* is specified, it will be called once the shapes are done drawing.


This is a static method of [<code>TextBox</code>](#TextBox).
<a name="TextBox.data" href="#TextBox.data">#</a> TextBox.**data**([*data*]) [<>](https://github.com/d3plus/d3plus-text/blob/master/src/TextBox.js#L301)

If *data* is specified, sets the data array to the specified array and returns this generator. If *data* is not specified, returns the current data array. A text box will be drawn for each object in the array.


This is a static method of [<code>TextBox</code>](#TextBox).
<a name="TextBox.delay" href="#TextBox.delay">#</a> TextBox.**delay**([*value*]) [<>](https://github.com/d3plus/d3plus-text/blob/master/src/TextBox.js#L310)

If *value* is specified, sets the animation delay to the specified number and returns this generator. If *value* is not specified, returns the current animation delay.


This is a static method of [<code>TextBox</code>](#TextBox).
<a name="TextBox.duration" href="#TextBox.duration">#</a> TextBox.**duration**([*value*]) [<>](https://github.com/d3plus/d3plus-text/blob/master/src/TextBox.js#L319)

If *value* is specified, sets the animation duration to the specified number and returns this generator. If *value* is not specified, returns the current animation duration.


This is a static method of [<code>TextBox</code>](#TextBox).
<a name="TextBox.ellipsis" href="#TextBox.ellipsis">#</a> TextBox.**ellipsis**([*value*]) [<>](https://github.com/d3plus/d3plus-text/blob/master/src/TextBox.js#L332)

If *value* is specified, sets the ellipsis method to the specified function or string and returns this generator. If *value* is not specified, returns the current ellipsis method, which simply adds an ellipsis to the string by default.


This is a static method of [<code>TextBox</code>](#TextBox).
default accessor

```js
function(d) {
  return d + "...";
}
```
<a name="TextBox.fontColor" href="#TextBox.fontColor">#</a> TextBox.**fontColor**([*value*]) [<>](https://github.com/d3plus/d3plus-text/blob/master/src/TextBox.js#L341)

If *value* is specified, sets the font color accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current font color accessor, which is inferred from the [container element](#textBox.select) by default.


This is a static method of [<code>TextBox</code>](#TextBox).
<a name="TextBox.fontFamily" href="#TextBox.fontFamily">#</a> TextBox.**fontFamily**([*value*]) [<>](https://github.com/d3plus/d3plus-text/blob/master/src/TextBox.js#L350)

If *value* is specified, sets the font family accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current font family accessor, which is inferred from the [container element](#textBox.select) by default.


This is a static method of [<code>TextBox</code>](#TextBox).
<a name="TextBox.fontMax" href="#TextBox.fontMax">#</a> TextBox.**fontMax**([*value*]) [<>](https://github.com/d3plus/d3plus-text/blob/master/src/TextBox.js#L359)

If *value* is specified, sets the maximum font size accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current maximum font size accessor. The maximum font size is used when [resizing fonts](#textBox.fontResize) dynamically.


This is a static method of [<code>TextBox</code>](#TextBox).
<a name="TextBox.fontMin" href="#TextBox.fontMin">#</a> TextBox.**fontMin**([*value*]) [<>](https://github.com/d3plus/d3plus-text/blob/master/src/TextBox.js#L368)

If *value* is specified, sets the minimum font size accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current minimum font size accessor. The minimum font size is used when [resizing fonts](#textBox.fontResize) dynamically.


This is a static method of [<code>TextBox</code>](#TextBox).
<a name="TextBox.fontResize" href="#TextBox.fontResize">#</a> TextBox.**fontResize**([*value*]) [<>](https://github.com/d3plus/d3plus-text/blob/master/src/TextBox.js#L377)

If *value* is specified, sets the font resizing accessor to the specified function or boolean and returns this generator. If *value* is not specified, returns the current font resizing accessor.


This is a static method of [<code>TextBox</code>](#TextBox).
<a name="TextBox.fontSize" href="#TextBox.fontSize">#</a> TextBox.**fontSize**([*value*]) [<>](https://github.com/d3plus/d3plus-text/blob/master/src/TextBox.js#L386)

If *value* is specified, sets the font size accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current font size accessor, which is inferred from the [container element](#textBox.select) by default.


This is a static method of [<code>TextBox</code>](#TextBox).
<a name="TextBox.fontWeight" href="#TextBox.fontWeight">#</a> TextBox.**fontWeight**([*value*]) [<>](https://github.com/d3plus/d3plus-text/blob/master/src/TextBox.js#L395)

If *value* is specified, sets the font weight accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current font weight accessor, which is inferred from the [container element](#textBox.select) by default.


This is a static method of [<code>TextBox</code>](#TextBox).
<a name="TextBox.height" href="#TextBox.height">#</a> TextBox.**height**([*value*]) [<>](https://github.com/d3plus/d3plus-text/blob/master/src/TextBox.js#L408)

If *value* is specified, sets the height accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current height accessor.


This is a static method of [<code>TextBox</code>](#TextBox).
default accessor

```js
function(d) {
  return d.height || 200;
}
```
<a name="TextBox.id" href="#TextBox.id">#</a> TextBox.**id**([*value*]) [<>](https://github.com/d3plus/d3plus-text/blob/master/src/TextBox.js#L421)

If *value* is specified, sets the id accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current id accessor.


This is a static method of [<code>TextBox</code>](#TextBox).
default accessor

```js
function(d, i) {
  return d.id || i + "";
}
```
<a name="TextBox.lineHeight" href="#TextBox.lineHeight">#</a> TextBox.**lineHeight**([*value*]) [<>](https://github.com/d3plus/d3plus-text/blob/master/src/TextBox.js#L430)

If *value* is specified, sets the line height accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current line height accessor, which is 1.1 times the [font size](#textBox.fontSize) by default.


This is a static method of [<code>TextBox</code>](#TextBox).
<a name="TextBox.overflow" href="#TextBox.overflow">#</a> TextBox.**overflow**([*value*]) [<>](https://github.com/d3plus/d3plus-text/blob/master/src/TextBox.js#L439)

If *value* is specified, sets the overflow accessor to the specified function or boolean and returns this generator. If *value* is not specified, returns the current overflow accessor.


This is a static method of [<code>TextBox</code>](#TextBox).
<a name="TextBox.pointerEvents" href="#TextBox.pointerEvents">#</a> TextBox.**pointerEvents**([*value*]) [<>](https://github.com/d3plus/d3plus-text/blob/master/src/TextBox.js#L448)

If *value* is specified, sets the pointer-events accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current pointer-events accessor.


This is a static method of [<code>TextBox</code>](#TextBox).
<a name="TextBox.rotate" href="#TextBox.rotate">#</a> TextBox.**rotate**([*value*]) [<>](https://github.com/d3plus/d3plus-text/blob/master/src/TextBox.js#L457)

If *value* is specified, sets the rotate accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current rotate accessor.


This is a static method of [<code>TextBox</code>](#TextBox).
<a name="TextBox.select" href="#TextBox.select">#</a> TextBox.**select**([*selector*]) [<>](https://github.com/d3plus/d3plus-text/blob/master/src/TextBox.js#L466)

If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns this generator. If *selector* is not specified, returns the current SVG container element, which adds an SVG element to the page by default.


This is a static method of [<code>TextBox</code>](#TextBox).
<a name="TextBox.split" href="#TextBox.split">#</a> TextBox.**split**([*value*]) [<>](https://github.com/d3plus/d3plus-text/blob/master/src/TextBox.js#L475)

If *value* is specified, sets the word split function to the specified function and returns this generator. If *value* is not specified, returns the current word split function.


This is a static method of [<code>TextBox</code>](#TextBox).
<a name="TextBox.text" href="#TextBox.text">#</a> TextBox.**text**([*value*]) [<>](https://github.com/d3plus/d3plus-text/blob/master/src/TextBox.js#L488)

If *value* is specified, sets the text accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current text accessor.


This is a static method of [<code>TextBox</code>](#TextBox).
default accessor

```js
function(d) {
  return d.text;
}
```
<a name="TextBox.textAnchor" href="#TextBox.textAnchor">#</a> TextBox.**textAnchor**([*value*]) [<>](https://github.com/d3plus/d3plus-text/blob/master/src/TextBox.js#L497)

If *value* is specified, sets the horizontal text anchor accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current horizontal text anchor accessor.


This is a static method of [<code>TextBox</code>](#TextBox).
<a name="TextBox.verticalAlign" href="#TextBox.verticalAlign">#</a> TextBox.**verticalAlign**([*value*]) [<>](https://github.com/d3plus/d3plus-text/blob/master/src/TextBox.js#L506)

If *value* is specified, sets the vertical alignment accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current vertical alignment accessor.


This is a static method of [<code>TextBox</code>](#TextBox).
<a name="TextBox.width" href="#TextBox.width">#</a> TextBox.**width**([*value*]) [<>](https://github.com/d3plus/d3plus-text/blob/master/src/TextBox.js#L519)

If *value* is specified, sets the width accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current width accessor.


This is a static method of [<code>TextBox</code>](#TextBox).
default accessor

```js
function(d) {
  return d.width || 200;
}
```
<a name="TextBox.x" href="#TextBox.x">#</a> TextBox.**x**([*value*]) [<>](https://github.com/d3plus/d3plus-text/blob/master/src/TextBox.js#L532)

If *value* is specified, sets the x accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current x accessor. The number returned should correspond to the left position of the textBox.


This is a static method of [<code>TextBox</code>](#TextBox).
default accessor

```js
function(d) {
  return d.x || 0;
}
```
<a name="TextBox.y" href="#TextBox.y">#</a> TextBox.**y**([*value*]) [<>](https://github.com/d3plus/d3plus-text/blob/master/src/TextBox.js#L545)

If *value* is specified, sets the y accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current y accessor. The number returned should correspond to the top position of the textBox.


This is a static method of [<code>TextBox</code>](#TextBox).
default accessor

```js
function(d) {
  return d.y || 0;
}
```
