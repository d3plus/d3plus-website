---
name: elem
kind: function
---

<a name="elem"></a>

### d3plus.**elem**(selector, params) [<>](https://github.com/d3plus/d3plus-common/blob/master/src/elem.js#L6)

Manages the enter/update/exit pattern for a single DOM element.


This is a global function.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>String</code> |  | A D3 selector, which must include the tagname and a class and/or ID. |
| params | <code>Object</code> |  | Additional parameters. |
| [params.condition] | <code>Boolean</code> | <code>true</code> | Whether or not the element should be rendered (or removed). |
| [params.enter] | <code>Object</code> | <code>{}</code> | A collection of key/value pairs that map to attributes to be given on enter. |
| [params.exit] | <code>Object</code> | <code>{}</code> | A collection of key/value pairs that map to attributes to be given on exit. |
| [params.parent] | <code>D3Selection</code> | <code>d3.select(&quot;body&quot;)</code> | The parent element for this new element to be appended to. |
| [params.transition] | <code>D3Transition</code> | <code>d3.transition().duration(0)</code> | The transition to use when animated the different life cycle stages. |
| [params.update] | <code>Object</code> | <code>{}</code> | A collection of key/value pairs that map to attributes to be given on update. |

