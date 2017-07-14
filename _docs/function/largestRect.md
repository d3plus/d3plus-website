---
name: largestRect
kind: function
---

<a name="largestRect"></a>

### d3plus.**largestRect**(poly, [options]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/geom/largestRect.js#L26)

An angle of zero means that the longer side of the polygon (the width) will be aligned with the x axis. An angle of 90 and/or -90 means that the longer side of the polygon (the width) will be aligned with the y axis. The value can be a number between -90 and 90 specifying the angle of rotation of the polygon, a string which is parsed to a number, or an array of numbers specifying the possible rotations of the polygon.


This is a global function.
**Author**: Daniel Smilkov [dsmilkov@gmail.com]  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| poly | <code>Array</code> |  | An Array of points that represent a polygon. |
| [options] | <code>Object</code> |  | An Object that allows for overriding various parameters of the algorithm. |
| [options.angle] | <code>Number</code> \| <code>String</code> \| <code>Array</code> | <code>d3.range(-90, 95, 5)</code> | The allowed rotations of the final rectangle. |
| [options.aspectRatio] | <code>Number</code> \| <code>String</code> \| <code>Array</code> |  | The ratio between the width and height of the rectangle. The value can be a number, a string which is parsed to a number, or an array of numbers specifying the possible aspect ratios of the final rectangle. |
| [options.maxAspectRatio] | <code>Number</code> | <code>15</code> | The maximum aspect ratio (width/height) allowed for the rectangle. This property should only be used if the aspectRatio is not provided. |
| [options.minAspectRatio] | <code>Number</code> | <code>1</code> | The minimum aspect ratio (width/height) allowed for the rectangle. This property should only be used if the aspectRatio is not provided. |
| [options.nTries] | <code>Number</code> | <code>20</code> | The number of randomly drawn points inside the polygon which the algorithm explores as possible center points of the maximal rectangle. |
| [options.minHeight] | <code>Number</code> | <code>0</code> | The minimum height of the rectangle. |
| [options.minWidth] | <code>Number</code> | <code>0</code> | The minimum width of the rectangle. |
| [options.tolerance] | <code>Number</code> | <code>0.02</code> | The simplification tolerance factor, between 0 and 1. A larger tolerance corresponds to more extensive simplification. |
| [options.origin] | <code>Array</code> |  | The center point of the rectangle. If specified, the rectangle will be fixed at that point, otherwise the algorithm optimizes across all possible points. The given value can be either a two dimensional array specifying the x and y coordinate of the origin or an array of two dimensional points specifying multiple possible center points of the rectangle. |

