---
name: TextBox
kind: class
---

  <a name="TextBox"></a>

### **TextBox** [<>](https://github.com/d3plus/d3plus-text/blob/master/src/TextBox.js#L27)


This is a global class, and extends all of the methods and functionality of [<code>BaseClass</code>](#BaseClass).


* [TextBox](#TextBox) ⇐ [<code>BaseClass</code>](#BaseClass)
    * [new TextBox()](#new_TextBox_new)
    * [.render([*callback*])](#TextBox.render)
    * [.ariaHidden(*value*)](#TextBox.ariaHidden) ↩︎
    * [.data([*data*])](#TextBox.data) ↩︎
    * [.delay([*value*])](#TextBox.delay) ↩︎
    * [.duration([*value*])](#TextBox.duration) ↩︎
    * [.ellipsis([*value*])](#TextBox.ellipsis) ↩︎
    * [.fontColor([*value*])](#TextBox.fontColor) ↩︎
    * [.fontFamily([*value*])](#TextBox.fontFamily) ↩︎
    * [.fontMax([*value*])](#TextBox.fontMax) ↩︎
    * [.fontMin([*value*])](#TextBox.fontMin) ↩︎
    * [.fontOpacity([*value*])](#TextBox.fontOpacity) ↩︎
    * [.fontResize([*value*])](#TextBox.fontResize) ↩︎
    * [.fontSize([*value*])](#TextBox.fontSize) ↩︎
    * [.fontWeight([*value*])](#TextBox.fontWeight) ↩︎
    * [.height([*value*])](#TextBox.height) ↩︎
    * [.html([*value*])](#TextBox.html) ↩︎
    * [.id([*value*])](#TextBox.id) ↩︎
    * [.lineHeight([*value*])](#TextBox.lineHeight) ↩︎
    * [.maxLines([*value*])](#TextBox.maxLines) ↩︎
    * [.overflow([*value*])](#TextBox.overflow) ↩︎
    * [.padding([*value*])](#TextBox.padding) ↩︎
    * [.pointerEvents([*value*])](#TextBox.pointerEvents) ↩︎
    * [.rotate([*value*])](#TextBox.rotate) ↩︎
    * [.rotateAnchor(_)](#TextBox.rotateAnchor) ↩︎
    * [.select([*selector*])](#TextBox.select) ↩︎
    * [.split([*value*])](#TextBox.split) ↩︎
    * [.text([*value*])](#TextBox.text) ↩︎
    * [.textAnchor([*value*])](#TextBox.textAnchor) ↩︎
    * [.verticalAlign([*value*])](#TextBox.verticalAlign) ↩︎
    * [.width([*value*])](#TextBox.width) ↩︎
    * [.x([*value*])](#TextBox.x) ↩︎
    * [.y([*value*])](#TextBox.y) ↩︎


<a name="new_TextBox_new" href="#new_TextBox_new">#</a> new **TextBox**()

Creates a wrapped text box for each point in an array of data. See [this example](https://d3plus.org/examples/d3plus-text/getting-started/) for help getting started using the TextBox class.





<a name="TextBox.render" href="#TextBox.render">#</a> TextBox.**render**([*callback*]) [<>](https://github.com/d3plus/d3plus-text/blob/master/src/TextBox.js#L81)

Renders the text boxes. If a *callback* is specified, it will be called once the shapes are done drawing.


This is a static method of [<code>TextBox</code>](#TextBox).


<a name="TextBox.ariaHidden" href="#TextBox.ariaHidden">#</a> TextBox.**ariaHidden**(*value*) [<>](https://github.com/d3plus/d3plus-text/blob/master/src/TextBox.js#L369)

If *value* is specified, sets the aria-hidden attribute to the specified function or string and returns the current class instance.


This is a static method of [<code>TextBox</code>](#TextBox), and is chainable with other methods of this Class.


<a name="TextBox.data" href="#TextBox.data">#</a> TextBox.**data**([*data*]) [<>](https://github.com/d3plus/d3plus-text/blob/master/src/TextBox.js#L381)

Sets the data array to the specified array. A text box will be drawn for each object in the array.


This is a static method of [<code>TextBox</code>](#TextBox), and is chainable with other methods of this Class.


<a name="TextBox.delay" href="#TextBox.delay">#</a> TextBox.**delay**([*value*]) [<>](https://github.com/d3plus/d3plus-text/blob/master/src/TextBox.js#L391)

Sets the animation delay to the specified number in milliseconds.


This is a static method of [<code>TextBox</code>](#TextBox), and is chainable with other methods of this Class.


<a name="TextBox.duration" href="#TextBox.duration">#</a> TextBox.**duration**([*value*]) [<>](https://github.com/d3plus/d3plus-text/blob/master/src/TextBox.js#L401)

Sets the animation duration to the specified number in milliseconds.


This is a static method of [<code>TextBox</code>](#TextBox), and is chainable with other methods of this Class.


<a name="TextBox.ellipsis" href="#TextBox.ellipsis">#</a> TextBox.**ellipsis**([*value*]) [<>](https://github.com/d3plus/d3plus-text/blob/master/src/TextBox.js#L415)

Sets the function that handles what to do when a line is truncated. It should return the new value for the line, and is passed 2 arguments: the String of text for the line in question, and the number of the line. By default, an ellipsis is added to the end of any line except if it is the first word that cannot fit (in that case, an empty string is returned).


This is a static method of [<code>TextBox</code>](#TextBox), and is chainable with other methods of this Class.
default accessor

```js
function(text, line) {
  return line ? text.replace(/\.|,$/g, "") + "..." : "";
}
```


<a name="TextBox.fontColor" href="#TextBox.fontColor">#</a> TextBox.**fontColor**([*value*]) [<>](https://github.com/d3plus/d3plus-text/blob/master/src/TextBox.js#L425)

Sets the font color to the specified accessor function or static string, which is inferred from the [DOM selection](#textBox.select) by default.


This is a static method of [<code>TextBox</code>](#TextBox), and is chainable with other methods of this Class.


<a name="TextBox.fontFamily" href="#TextBox.fontFamily">#</a> TextBox.**fontFamily**([*value*]) [<>](https://github.com/d3plus/d3plus-text/blob/master/src/TextBox.js#L435)

Defines the font-family to be used. The value passed can be either a *String* name of a font, a comma-separated list of font-family fallbacks, an *Array* of fallbacks, or a *Function* that returns either a *String* or an *Array*. If supplying multiple fallback fonts, the [fontExists](#fontExists) function will be used to determine the first available font on the client's machine.


This is a static method of [<code>TextBox</code>](#TextBox), and is chainable with other methods of this Class.


<a name="TextBox.fontMax" href="#TextBox.fontMax">#</a> TextBox.**fontMax**([*value*]) [<>](https://github.com/d3plus/d3plus-text/blob/master/src/TextBox.js#L445)

Sets the maximum font size to the specified accessor function or static number (which corresponds to pixel units), which is used when [dynamically resizing fonts](#textBox.fontResize).


This is a static method of [<code>TextBox</code>](#TextBox), and is chainable with other methods of this Class.


<a name="TextBox.fontMin" href="#TextBox.fontMin">#</a> TextBox.**fontMin**([*value*]) [<>](https://github.com/d3plus/d3plus-text/blob/master/src/TextBox.js#L455)

Sets the minimum font size to the specified accessor function or static number (which corresponds to pixel units), which is used when [dynamically resizing fonts](#textBox.fontResize).


This is a static method of [<code>TextBox</code>](#TextBox), and is chainable with other methods of this Class.


<a name="TextBox.fontOpacity" href="#TextBox.fontOpacity">#</a> TextBox.**fontOpacity**([*value*]) [<>](https://github.com/d3plus/d3plus-text/blob/master/src/TextBox.js#L465)

Sets the font opacity to the specified accessor function or static number between 0 and 1.


This is a static method of [<code>TextBox</code>](#TextBox), and is chainable with other methods of this Class.


<a name="TextBox.fontResize" href="#TextBox.fontResize">#</a> TextBox.**fontResize**([*value*]) [<>](https://github.com/d3plus/d3plus-text/blob/master/src/TextBox.js#L475)

Toggles font resizing, which can either be defined as a static boolean for all data points, or an accessor function that returns a boolean. See [this example](http://d3plus.org/examples/d3plus-text/resizing-text/) for a side-by-side comparison.


This is a static method of [<code>TextBox</code>](#TextBox), and is chainable with other methods of this Class.


<a name="TextBox.fontSize" href="#TextBox.fontSize">#</a> TextBox.**fontSize**([*value*]) [<>](https://github.com/d3plus/d3plus-text/blob/master/src/TextBox.js#L485)

Sets the font size to the specified accessor function or static number (which corresponds to pixel units), which is inferred from the [DOM selection](#textBox.select) by default.


This is a static method of [<code>TextBox</code>](#TextBox), and is chainable with other methods of this Class.


<a name="TextBox.fontWeight" href="#TextBox.fontWeight">#</a> TextBox.**fontWeight**([*value*]) [<>](https://github.com/d3plus/d3plus-text/blob/master/src/TextBox.js#L495)

Sets the font weight to the specified accessor function or static number, which is inferred from the [DOM selection](#textBox.select) by default.


This is a static method of [<code>TextBox</code>](#TextBox), and is chainable with other methods of this Class.


<a name="TextBox.height" href="#TextBox.height">#</a> TextBox.**height**([*value*]) [<>](https://github.com/d3plus/d3plus-text/blob/master/src/TextBox.js#L509)

Sets the height for each box to the specified accessor function or static number.


This is a static method of [<code>TextBox</code>](#TextBox), and is chainable with other methods of this Class.
default accessor

```js
function(d) {
  return d.height || 200;
}
```


<a name="TextBox.html" href="#TextBox.html">#</a> TextBox.**html**([*value*]) [<>](https://github.com/d3plus/d3plus-text/blob/master/src/TextBox.js#L519)

Toggles the ability to render simple HTML tags. Currently supports `<b>`, `<strong>`, `<i>`, and `<em>`.


This is a static method of [<code>TextBox</code>](#TextBox), and is chainable with other methods of this Class.


<a name="TextBox.id" href="#TextBox.id">#</a> TextBox.**id**([*value*]) [<>](https://github.com/d3plus/d3plus-text/blob/master/src/TextBox.js#L533)

Defines the unique id for each box to the specified accessor function or static number.


This is a static method of [<code>TextBox</code>](#TextBox), and is chainable with other methods of this Class.
default accessor

```js
function(d, i) {
  return d.id || i + "";
}
```


<a name="TextBox.lineHeight" href="#TextBox.lineHeight">#</a> TextBox.**lineHeight**([*value*]) [<>](https://github.com/d3plus/d3plus-text/blob/master/src/TextBox.js#L543)

Sets the line height to the specified accessor function or static number, which is 1.2 times the [font size](#textBox.fontSize) by default.


This is a static method of [<code>TextBox</code>](#TextBox), and is chainable with other methods of this Class.


<a name="TextBox.maxLines" href="#TextBox.maxLines">#</a> TextBox.**maxLines**([*value*]) [<>](https://github.com/d3plus/d3plus-text/blob/master/src/TextBox.js#L553)

Restricts the maximum number of lines to wrap onto, which is null (unlimited) by default.


This is a static method of [<code>TextBox</code>](#TextBox), and is chainable with other methods of this Class.


<a name="TextBox.overflow" href="#TextBox.overflow">#</a> TextBox.**overflow**([*value*]) [<>](https://github.com/d3plus/d3plus-text/blob/master/src/TextBox.js#L563)

Sets the text overflow to the specified accessor function or static boolean.


This is a static method of [<code>TextBox</code>](#TextBox), and is chainable with other methods of this Class.


<a name="TextBox.padding" href="#TextBox.padding">#</a> TextBox.**padding**([*value*]) [<>](https://github.com/d3plus/d3plus-text/blob/master/src/TextBox.js#L573)

Sets the padding to the specified accessor function, CSS shorthand string, or static number, which is 0 by default.


This is a static method of [<code>TextBox</code>](#TextBox), and is chainable with other methods of this Class.


<a name="TextBox.pointerEvents" href="#TextBox.pointerEvents">#</a> TextBox.**pointerEvents**([*value*]) [<>](https://github.com/d3plus/d3plus-text/blob/master/src/TextBox.js#L583)

Sets the pointer-events to the specified accessor function or static string.


This is a static method of [<code>TextBox</code>](#TextBox), and is chainable with other methods of this Class.


<a name="TextBox.rotate" href="#TextBox.rotate">#</a> TextBox.**rotate**([*value*]) [<>](https://github.com/d3plus/d3plus-text/blob/master/src/TextBox.js#L593)

Sets the rotate percentage for each box to the specified accessor function or static string.


This is a static method of [<code>TextBox</code>](#TextBox), and is chainable with other methods of this Class.


<a name="TextBox.rotateAnchor" href="#TextBox.rotateAnchor">#</a> TextBox.**rotateAnchor**(_) [<>](https://github.com/d3plus/d3plus-text/blob/master/src/TextBox.js#L603)

Sets the anchor point around which to rotate the text box.


This is a static method of [<code>TextBox</code>](#TextBox), and is chainable with other methods of this Class.


<a name="TextBox.select" href="#TextBox.select">#</a> TextBox.**select**([*selector*]) [<>](https://github.com/d3plus/d3plus-text/blob/master/src/TextBox.js#L613)

Sets the SVG container element to the specified d3 selector or DOM element. If not explicitly specified, an SVG element will be added to the page for use.


This is a static method of [<code>TextBox</code>](#TextBox), and is chainable with other methods of this Class.


<a name="TextBox.split" href="#TextBox.split">#</a> TextBox.**split**([*value*]) [<>](https://github.com/d3plus/d3plus-text/blob/master/src/TextBox.js#L623)

Sets the word split behavior to the specified function, which when passed a string is expected to return that string split into an array of words.


This is a static method of [<code>TextBox</code>](#TextBox), and is chainable with other methods of this Class.


<a name="TextBox.text" href="#TextBox.text">#</a> TextBox.**text**([*value*]) [<>](https://github.com/d3plus/d3plus-text/blob/master/src/TextBox.js#L637)

Sets the text for each box to the specified accessor function or static string.


This is a static method of [<code>TextBox</code>](#TextBox), and is chainable with other methods of this Class.
default accessor

```js
function(d) {
  return d.text;
}
```


<a name="TextBox.textAnchor" href="#TextBox.textAnchor">#</a> TextBox.**textAnchor**([*value*]) [<>](https://github.com/d3plus/d3plus-text/blob/master/src/TextBox.js#L647)

Sets the horizontal text anchor to the specified accessor function or static string, whose values are analagous to the SVG [text-anchor](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/text-anchor) property.


This is a static method of [<code>TextBox</code>](#TextBox), and is chainable with other methods of this Class.


<a name="TextBox.verticalAlign" href="#TextBox.verticalAlign">#</a> TextBox.**verticalAlign**([*value*]) [<>](https://github.com/d3plus/d3plus-text/blob/master/src/TextBox.js#L657)

Sets the vertical alignment to the specified accessor function or static string. Accepts `"top"`, `"middle"`, and `"bottom"`.


This is a static method of [<code>TextBox</code>](#TextBox), and is chainable with other methods of this Class.


<a name="TextBox.width" href="#TextBox.width">#</a> TextBox.**width**([*value*]) [<>](https://github.com/d3plus/d3plus-text/blob/master/src/TextBox.js#L671)

Sets the width for each box to the specified accessor function or static number.


This is a static method of [<code>TextBox</code>](#TextBox), and is chainable with other methods of this Class.
default accessor

```js
function(d) {
  return d.width || 200;
}
```


<a name="TextBox.x" href="#TextBox.x">#</a> TextBox.**x**([*value*]) [<>](https://github.com/d3plus/d3plus-text/blob/master/src/TextBox.js#L685)

Sets the x position for each box to the specified accessor function or static number. The number given should correspond to the left side of the textBox.


This is a static method of [<code>TextBox</code>](#TextBox), and is chainable with other methods of this Class.
default accessor

```js
function(d) {
  return d.x || 0;
}
```


<a name="TextBox.y" href="#TextBox.y">#</a> TextBox.**y**([*value*]) [<>](https://github.com/d3plus/d3plus-text/blob/master/src/TextBox.js#L699)

Sets the y position for each box to the specified accessor function or static number. The number given should correspond to the top side of the textBox.


This is a static method of [<code>TextBox</code>](#TextBox), and is chainable with other methods of this Class.
default accessor

```js
function(d) {
  return d.y || 0;
}
```

