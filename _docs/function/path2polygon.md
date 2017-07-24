---
name: path2polygon
kind: function
---

  <a name="path2polygon"></a>

### d3plus.**path2polygon**(path, [segmentLength]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/geom/path2polygon.js#L6)

Transforms a path string into an Array of points.


This is a global function.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| path | <code>String</code> |  | An SVG string path, commonly the "d" property of a <path> element. |
| [segmentLength] | <code>Number</code> | <code>20</code> | The lenght of line segments when converting curves line segments. Higher values lower computation time, but will result in curves that are more rigid. |


