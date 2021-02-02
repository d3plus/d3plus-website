---
name: colorDefaults
kind: namespace
---

<a name="colorDefaults"></a>

### **colorDefaults** [<>](https://github.com/d3plus/d3plus-color/blob/master/src/defaults.js#L3)

A set of default color values used when assigning colors based on data.

| Name | Default | Description |
|---|---|---|
| dark | "#555555" | Used in the [contrast](#contrast) function when the color given is very light. |
| light | "#f7f7f7" | Used in the [contrast](#contrast) function when the color given is very dark. |
| missing | "#cccccc" | Used in the [assign](#assign) function when the value passed is `null` or `undefined`. |
| off | "#C44536" | Used in the [assign](#assign) function when the value passed is `false`. |
| on | "#6A994E" | Used in the [assign](#assign) function when the value passed is `true`. |
| scale | "#4281A4", "#F6AE2D", "#C44536", "#2A9D8F", "#6A994E", "#CEB54A", "#5E548E", "#C08497", "#99582A", "#8C8C99", "#1D3557", "#D08C60", "#6D2E46", "#8BB19C", "#52796F", "#5E60CE", "#985277", "#5C374C" | An ordinal scale used in the [assign](#assign) function for non-valid color strings and numbers. |


This is a global namespace.

