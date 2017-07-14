---
name: configPrep
kind: function
---

<a name="configPrep"></a>

### d3plus.**configPrep**([config], [type], [nest]) [<>](https://github.com/d3plus/d3plus-common/blob/master/src/configPrep.js#L1)

Preps a config object for d3plus data, and optionally bubbles up a specific nested type. When using this function, you must bind a d3plus class' `this` context.


This is a global function.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [config] | <code>Object</code> | <code>this._shapeConfig</code> | The configuration object to parse. |
| [type] | <code>String</code> | <code>&quot;shape&quot;</code> | The event classifier to user for "on" events. For example, the default event type of "shape" will apply all events in the "on" config object with that key, like "click.shape" and "mouseleave.shape", in addition to any gloval events like "click" and "mouseleave". |
| [nest] | <code>String</code> |  | An optional nested key to bubble up to the parent config level. |

