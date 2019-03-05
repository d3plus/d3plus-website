---
name: dom2canvas
kind: function
---

  <a name="dom2canvas"></a>

### d3plus.**dom2canvas**(elem, [options]) [<>](https://github.com/d3plus/d3plus-export/blob/master/src/dom2canvas.js#L50)

Renders HTML/SVG elements to a shared canvas.


This is a global function.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| elem | <code>HTMLElement</code> \| <code>Object</code> \| <code>Array</code> |  | The element or array of elements to be rendered to a single canvas. Additionally, a complex object can be passed as an element which can contain specific other properties. |
| [elem.x] | <code>Number</code> |  | The x offset of the element within the rendered canvas. |
| [elem.y] | <code>Number</code> |  | The y offset of the element within the rendered canvas. |
| [options] | <code>Object</code> |  | Additional options to specify. |
| [options.background] | <code>String</code> |  | Background color of the rendered canvas. |
| [options.callback] | <code>function</code> |  | Callback function to be passed the canvas element after rendering. |
| [options.excludes] | <code>Array</code> |  | An array of HTMLElement objects to be excluded from the render. |
| [options.height] | <code>Number</code> |  | Pixel height for the final output. If a height value has not been passed, it will be inferred from the sizing of the first DOM element passed. |
| [options.padding] | <code>Number</code> | <code>0</code> | Outer padding for the final file. |
| [options.scale] | <code>Number</code> | <code>1</code> | Scale for the final file. |
| [options.width] | <code>Number</code> |  | Pixel width for the final output. If a width value has not been passed, it will be inferred from the sizing of the first DOM element passed. |


