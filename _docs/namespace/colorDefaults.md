---
name: colorDefaults
kind: namespace
---

<a name="colorDefaults"></a>

### **colorDefaults** [<>](https://github.com/d3plus/d3plus-color/blob/master/src/defaults.js#L3)

A set of default color values used when assigning colors based on data.

| Name | Default | Description |
|---|---|---|
| dark | #444444 | Used in the [contrast](#contrast) function when the color given is very light. |
| light | #f7f7f7 | Used in the [contrast](#contrast) function when the color given is very dark. |
| missing | #cccccc | Used in the [assign](#assign) function when the value passed is `null` or `undefined`. |
| off | #b22200 | Used in the [assign](#assign) function when the value passed is `false`. |
| on | #224f20 | Used in the [assign](#assign) function when the value passed is `true`. |
| scale | #b22200, #eace3f, #282f6b, #b35c1e, #224f20, #5f487c, #759143, #419391, #993c88, #e89c89, #ffee8d, #afd5e8, #f7ba77, #a5c697, #c5b5e5, #d1d392, #bbefd0, #e099cf | An ordinal scale used in the [assign](#assign) function for non-valid color strings and numbers. |


This is a global namespace.