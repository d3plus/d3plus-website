---
name: formatAbbreviate
kind: function
---

<a name="formatAbbreviate"></a>

### d3plus.**formatAbbreviate**(n, locale) [<>](https://github.com/d3plus/d3plus-format/blob/master/src/abbreviate.js#L38)

Formats a number to an appropriate number of decimal places and rounding, adding suffixes if applicable (ie. `1200000` to `"1.2M"`).


This is a global function.

| Param | Type | Description |
| --- | --- | --- |
| n | <code>Number</code> \| <code>String</code> | The number to be formatted. |
| locale | <code>Object</code> \| <code>String</code> | The locale config to be used. If *value* is an object, the function will format the numbers according the object. The object must include `suffixes`, `delimiter` and `currency` properties. |


