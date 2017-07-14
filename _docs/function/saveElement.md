---
name: saveElement
kind: function
---

<a name="saveElement"></a>

### d3plus.**saveElement**(elem, [options], [renderOptions]) [<>](https://github.com/d3plus/d3plus-export/blob/master/src/saveElement.js#L12)

Downloads an HTML Element as a bitmap PNG image.


This is a global function.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| elem | <code>HTMLElement</code> \| <code>Array</code> |  | A single element or array of elements to be saved to one file. |
| [options] | <code>Object</code> |  | Additional options to specify. |
| [options.filename] | <code>String</code> | <code>&quot;download&quot;</code> | Filename for the downloaded file, without the extension. |
| [options.type] | <code>String</code> | <code>&quot;png&quot;</code> | File type of the saved document. Accepted values are `"png"` and `"jpg"`. |
| [renderOptions] | <code>Object</code> |  | Custom options to be passed to the dom2canvas function. |

