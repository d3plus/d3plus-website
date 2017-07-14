---
name: polygonRayCast
kind: function
---

<a name="polygonRayCast"></a>

### d3plus.**polygonRayCast**(poly, origin, [alpha]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/geom/polygonRayCast.js#L5)

Gives the two closest intersection points between a ray cast from a point inside a polygon. The two points should lie on opposite sides of the origin.


This is a global function.
**Returns**: <code>Array</code> - An array containing two values, the closest point on the left and the closest point on the right. If either point cannot be found, that value will be `null`.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| poly | <code>Array</code> |  | The polygon to test against, which should be an `[x, y]` formatted Array. |
| origin | <code>Array</code> |  | The origin point of the ray to be cast, which should be an `[x, y]` formatted Array. |
| [alpha] | <code>Number</code> | <code>0</code> | The angle in radians of the ray. |

