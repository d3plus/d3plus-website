(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define('d3plus-text', ['exports'], factory) :
	(factory((global.d3plus_text = {})));
}(this, function (exports) { 'use strict';

	var babelHelpers_typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
	  return typeof obj;
	} : function (obj) {
	  return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
	};

	var version = "0.4.1";

	var xhtml = "http://www.w3.org/1999/xhtml";

	var namespaces = {
	  svg: "http://www.w3.org/2000/svg",
	  xhtml: xhtml,
	  xlink: "http://www.w3.org/1999/xlink",
	  xml: "http://www.w3.org/XML/1998/namespace",
	  xmlns: "http://www.w3.org/2000/xmlns/"
	};

	function namespace (name) {
	  var prefix = name += "",
	      i = prefix.indexOf(":");
	  if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
	  return namespaces.hasOwnProperty(prefix) ? { space: namespaces[prefix], local: name } : name;
	}

	function creatorInherit(name) {
	  return function () {
	    var document = this.ownerDocument,
	        uri = this.namespaceURI;
	    return uri === xhtml && document.documentElement.namespaceURI === xhtml ? document.createElement(name) : document.createElementNS(uri, name);
	  };
	}

	function creatorFixed(fullname) {
	  return function () {
	    return this.ownerDocument.createElementNS(fullname.space, fullname.local);
	  };
	}

	function creator (name) {
	  var fullname = namespace(name);
	  return (fullname.local ? creatorFixed : creatorInherit)(fullname);
	}

	var matcher = function matcher(selector) {
	  return function () {
	    return this.matches(selector);
	  };
	};

	if (typeof document !== "undefined") {
	  var element = document.documentElement;
	  if (!element.matches) {
	    var vendorMatches = element.webkitMatchesSelector || element.msMatchesSelector || element.mozMatchesSelector || element.oMatchesSelector;
	    matcher = function matcher(selector) {
	      return function () {
	        return vendorMatches.call(this, selector);
	      };
	    };
	  }
	}

	var matcher$1 = matcher;

	var filterEvents = {};

	var event = null;

	if (typeof document !== "undefined") {
	  var element$1 = document.documentElement;
	  if (!("onmouseenter" in element$1)) {
	    filterEvents = { mouseenter: "mouseover", mouseleave: "mouseout" };
	  }
	}

	function filterContextListener(listener, index, group) {
	  listener = contextListener(listener, index, group);
	  return function (event) {
	    var related = event.relatedTarget;
	    if (!related || related !== this && !(related.compareDocumentPosition(this) & 8)) {
	      listener.call(this, event);
	    }
	  };
	}

	function contextListener(listener, index, group) {
	  return function (event1) {
	    var event0 = event; // Events can be reentrant (e.g., focus).
	    event = event1;
	    try {
	      listener.call(this, this.__data__, index, group);
	    } finally {
	      event = event0;
	    }
	  };
	}

	function parseTypenames(typenames) {
	  return typenames.trim().split(/^|\s+/).map(function (t) {
	    var name = "",
	        i = t.indexOf(".");
	    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
	    return { type: t, name: name };
	  });
	}

	function onRemove(typename) {
	  return function () {
	    var on = this.__on;
	    if (!on) return;
	    for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {
	      if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
	        this.removeEventListener(o.type, o.listener, o.capture);
	      } else {
	        on[++i] = o;
	      }
	    }
	    if (++i) on.length = i;else delete this.__on;
	  };
	}

	function onAdd(typename, value, capture) {
	  var wrap = filterEvents.hasOwnProperty(typename.type) ? filterContextListener : contextListener;
	  return function (d, i, group) {
	    var on = this.__on,
	        o,
	        listener = wrap(value, i, group);
	    if (on) for (var j = 0, m = on.length; j < m; ++j) {
	      if ((o = on[j]).type === typename.type && o.name === typename.name) {
	        this.removeEventListener(o.type, o.listener, o.capture);
	        this.addEventListener(o.type, o.listener = listener, o.capture = capture);
	        o.value = value;
	        return;
	      }
	    }
	    this.addEventListener(typename.type, listener, capture);
	    o = { type: typename.type, name: typename.name, value: value, listener: listener, capture: capture };
	    if (!on) this.__on = [o];else on.push(o);
	  };
	}

	function selection_on (typename, value, capture) {
	  var typenames = parseTypenames(typename + ""),
	      i,
	      n = typenames.length,
	      t;

	  if (arguments.length < 2) {
	    var on = this.node().__on;
	    if (on) for (var j = 0, m = on.length, o; j < m; ++j) {
	      for (i = 0, o = on[j]; i < n; ++i) {
	        if ((t = typenames[i]).type === o.type && t.name === o.name) {
	          return o.value;
	        }
	      }
	    }
	    return;
	  }

	  on = value ? onAdd : onRemove;
	  if (capture == null) capture = false;
	  for (i = 0; i < n; ++i) {
	    this.each(on(typenames[i], value, capture));
	  }return this;
	}

	function defaultView (node) {
	    return node.ownerDocument && node.ownerDocument.defaultView || // node is a Node
	    node.document && node // node is a Window
	     || node.defaultView; // node is a Document
	}

	function selector (selector) {
	  return function () {
	    return this.querySelector(selector);
	  };
	}

	function selection_select (select) {
	  if (typeof select !== "function") select = selector(select);

	  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
	      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
	        if ("__data__" in node) subnode.__data__ = node.__data__;
	        subgroup[i] = subnode;
	      }
	    }
	  }

	  return new Selection(subgroups, this._parents);
	}

	function selectorAll (selector) {
	  return function () {
	    return this.querySelectorAll(selector);
	  };
	}

	function selection_selectAll (select) {
	  if (typeof select !== "function") select = selectorAll(select);

	  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
	      if (node = group[i]) {
	        subgroups.push(select.call(node, node.__data__, i, group));
	        parents.push(node);
	      }
	    }
	  }

	  return new Selection(subgroups, parents);
	}

	function selection_filter (match) {
	  if (typeof match !== "function") match = matcher$1(match);

	  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
	      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
	        subgroup[i] = node;
	      }
	    }
	  }

	  return new Selection(subgroups, this._parents);
	}

	function constant$2 (x) {
	  return function () {
	    return x;
	  };
	}

	var keyPrefix = "$"; // Protect against keys like “__proto__”.

	function bindIndex(parent, group, enter, update, exit, data) {
	  var i = 0,
	      node,
	      groupLength = group.length,
	      dataLength = data.length;

	  // Put any non-null nodes that fit into update.
	  // Put any null nodes into enter.
	  // Put any remaining data into enter.
	  for (; i < dataLength; ++i) {
	    if (node = group[i]) {
	      node.__data__ = data[i];
	      update[i] = node;
	    } else {
	      enter[i] = new EnterNode(parent, data[i]);
	    }
	  }

	  // Put any non-null nodes that don’t fit into exit.
	  for (; i < groupLength; ++i) {
	    if (node = group[i]) {
	      exit[i] = node;
	    }
	  }
	}

	function bindKey(parent, group, enter, update, exit, data, key) {
	  var i,
	      node,
	      nodeByKeyValue = {},
	      groupLength = group.length,
	      dataLength = data.length,
	      keyValues = new Array(groupLength),
	      keyValue;

	  // Compute the key for each node.
	  // If multiple nodes have the same key, only the first one counts.
	  for (i = 0; i < groupLength; ++i) {
	    if (node = group[i]) {
	      keyValues[i] = keyValue = keyPrefix + key.call(node, node.__data__, i, group);
	      if (!nodeByKeyValue[keyValue]) {
	        nodeByKeyValue[keyValue] = node;
	      }
	    }
	  }

	  // Compute the key for each datum.
	  // If multiple data have the same key, only the first one counts.
	  for (i = 0; i < dataLength; ++i) {
	    keyValue = keyPrefix + key.call(parent, data[i], i, data);

	    // Is there a node associated with this key?
	    // If not, this datum is added to the enter selection.
	    if (!(node = nodeByKeyValue[keyValue])) {
	      enter[i] = new EnterNode(parent, data[i]);
	    }

	    // Did we already bind a node using this key? (Or is a duplicate?)
	    // If unique, the node and datum are joined in the update selection.
	    // Otherwise, the datum is ignored, neither entering nor exiting.
	    else if (node !== true) {
	        update[i] = node;
	        node.__data__ = data[i];
	      }

	    // Record that we consumed this key, either to enter or update.
	    nodeByKeyValue[keyValue] = true;
	  }

	  // Take any remaining nodes that were not bound to data,
	  // and place them in the exit selection.
	  for (i = 0; i < groupLength; ++i) {
	    if ((node = group[i]) && nodeByKeyValue[keyValues[i]] !== true) {
	      exit[i] = node;
	    }
	  }
	}

	function selection_data (value, key) {
	  if (!value) {
	    data = new Array(this.size()), j = -1;
	    this.each(function (d) {
	      data[++j] = d;
	    });
	    return data;
	  }

	  var bind = key ? bindKey : bindIndex,
	      parents = this._parents,
	      groups = this._groups;

	  if (typeof value !== "function") value = constant$2(value);

	  for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
	    var parent = parents[j],
	        group = groups[j],
	        groupLength = group.length,
	        data = value.call(parent, parent && parent.__data__, j, parents),
	        dataLength = data.length,
	        enterGroup = enter[j] = new Array(dataLength),
	        updateGroup = update[j] = new Array(dataLength),
	        exitGroup = exit[j] = new Array(groupLength);

	    bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);

	    // Now connect the enter nodes to their following update node, such that
	    // appendChild can insert the materialized enter node before this node,
	    // rather than at the end of the parent node.
	    for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
	      if (previous = enterGroup[i0]) {
	        if (i0 >= i1) i1 = i0 + 1;
	        while (!(next = updateGroup[i1]) && ++i1 < dataLength) {}
	        previous._next = next || null;
	      }
	    }
	  }

	  update = new Selection(update, parents);
	  update._enter = enter;
	  update._exit = exit;
	  return update;
	}

	function EnterNode(parent, datum) {
	  this.ownerDocument = parent.ownerDocument;
	  this.namespaceURI = parent.namespaceURI;
	  this._next = null;
	  this._parent = parent;
	  this.__data__ = datum;
	}

	EnterNode.prototype = {
	  constructor: EnterNode,
	  appendChild: function appendChild(child) {
	    return this._parent.insertBefore(child, this._next);
	  },
	  insertBefore: function insertBefore(child, next) {
	    return this._parent.insertBefore(child, next);
	  },
	  querySelector: function querySelector(selector) {
	    return this._parent.querySelector(selector);
	  },
	  querySelectorAll: function querySelectorAll(selector) {
	    return this._parent.querySelectorAll(selector);
	  }
	};

	function sparse (update) {
	  return new Array(update.length);
	}

	function selection_enter () {
	  return new Selection(this._enter || this._groups.map(sparse), this._parents);
	}

	function selection_exit () {
	  return new Selection(this._exit || this._groups.map(sparse), this._parents);
	}

	function selection_merge (selection) {

	  for (var groups0 = this._groups, groups1 = selection._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
	    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
	      if (node = group0[i] || group1[i]) {
	        merge[i] = node;
	      }
	    }
	  }

	  for (; j < m0; ++j) {
	    merges[j] = groups0[j];
	  }

	  return new Selection(merges, this._parents);
	}

	function selection_order () {

	  for (var groups = this._groups, j = -1, m = groups.length; ++j < m;) {
	    for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0;) {
	      if (node = group[i]) {
	        if (next && next !== node.nextSibling) next.parentNode.insertBefore(node, next);
	        next = node;
	      }
	    }
	  }

	  return this;
	}

	function selection_sort (compare) {
	  if (!compare) compare = ascending$1;

	  function compareNode(a, b) {
	    return a && b ? compare(a.__data__, b.__data__) : !a - !b;
	  }

	  for (var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
	      if (node = group[i]) {
	        sortgroup[i] = node;
	      }
	    }
	    sortgroup.sort(compareNode);
	  }

	  return new Selection(sortgroups, this._parents).order();
	}

	function ascending$1(a, b) {
	  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
	}

	function selection_call () {
	  var callback = arguments[0];
	  arguments[0] = this;
	  callback.apply(null, arguments);
	  return this;
	}

	function selection_nodes () {
	  var nodes = new Array(this.size()),
	      i = -1;
	  this.each(function () {
	    nodes[++i] = this;
	  });
	  return nodes;
	}

	function selection_node () {

	  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
	    for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
	      var node = group[i];
	      if (node) return node;
	    }
	  }

	  return null;
	}

	function selection_size () {
	  var size = 0;
	  this.each(function () {
	    ++size;
	  });
	  return size;
	}

	function selection_empty () {
	  return !this.node();
	}

	function selection_each (callback) {

	  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
	    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
	      if (node = group[i]) callback.call(node, node.__data__, i, group);
	    }
	  }

	  return this;
	}

	function attrRemove$1(name) {
	  return function () {
	    this.removeAttribute(name);
	  };
	}

	function attrRemoveNS$1(fullname) {
	  return function () {
	    this.removeAttributeNS(fullname.space, fullname.local);
	  };
	}

	function attrConstant$1(name, value) {
	  return function () {
	    this.setAttribute(name, value);
	  };
	}

	function attrConstantNS$1(fullname, value) {
	  return function () {
	    this.setAttributeNS(fullname.space, fullname.local, value);
	  };
	}

	function attrFunction$1(name, value) {
	  return function () {
	    var v = value.apply(this, arguments);
	    if (v == null) this.removeAttribute(name);else this.setAttribute(name, v);
	  };
	}

	function attrFunctionNS$1(fullname, value) {
	  return function () {
	    var v = value.apply(this, arguments);
	    if (v == null) this.removeAttributeNS(fullname.space, fullname.local);else this.setAttributeNS(fullname.space, fullname.local, v);
	  };
	}

	function selection_attr (name, value) {
	  var fullname = namespace(name);

	  if (arguments.length < 2) {
	    var node = this.node();
	    return fullname.local ? node.getAttributeNS(fullname.space, fullname.local) : node.getAttribute(fullname);
	  }

	  return this.each((value == null ? fullname.local ? attrRemoveNS$1 : attrRemove$1 : typeof value === "function" ? fullname.local ? attrFunctionNS$1 : attrFunction$1 : fullname.local ? attrConstantNS$1 : attrConstant$1)(fullname, value));
	}

	function styleRemove$1(name) {
	  return function () {
	    this.style.removeProperty(name);
	  };
	}

	function styleConstant$1(name, value, priority) {
	  return function () {
	    this.style.setProperty(name, value, priority);
	  };
	}

	function styleFunction$1(name, value, priority) {
	  return function () {
	    var v = value.apply(this, arguments);
	    if (v == null) this.style.removeProperty(name);else this.style.setProperty(name, v, priority);
	  };
	}

	function selection_style (name, value, priority) {
	  var node;
	  return arguments.length > 1 ? this.each((value == null ? styleRemove$1 : typeof value === "function" ? styleFunction$1 : styleConstant$1)(name, value, priority == null ? "" : priority)) : defaultView(node = this.node()).getComputedStyle(node, null).getPropertyValue(name);
	}

	function propertyRemove(name) {
	  return function () {
	    delete this[name];
	  };
	}

	function propertyConstant(name, value) {
	  return function () {
	    this[name] = value;
	  };
	}

	function propertyFunction(name, value) {
	  return function () {
	    var v = value.apply(this, arguments);
	    if (v == null) delete this[name];else this[name] = v;
	  };
	}

	function selection_property (name, value) {
	  return arguments.length > 1 ? this.each((value == null ? propertyRemove : typeof value === "function" ? propertyFunction : propertyConstant)(name, value)) : this.node()[name];
	}

	function classArray(string) {
	  return string.trim().split(/^|\s+/);
	}

	function classList(node) {
	  return node.classList || new ClassList(node);
	}

	function ClassList(node) {
	  this._node = node;
	  this._names = classArray(node.getAttribute("class") || "");
	}

	ClassList.prototype = {
	  add: function add(name) {
	    var i = this._names.indexOf(name);
	    if (i < 0) {
	      this._names.push(name);
	      this._node.setAttribute("class", this._names.join(" "));
	    }
	  },
	  remove: function remove(name) {
	    var i = this._names.indexOf(name);
	    if (i >= 0) {
	      this._names.splice(i, 1);
	      this._node.setAttribute("class", this._names.join(" "));
	    }
	  },
	  contains: function contains(name) {
	    return this._names.indexOf(name) >= 0;
	  }
	};

	function classedAdd(node, names) {
	  var list = classList(node),
	      i = -1,
	      n = names.length;
	  while (++i < n) {
	    list.add(names[i]);
	  }
	}

	function classedRemove(node, names) {
	  var list = classList(node),
	      i = -1,
	      n = names.length;
	  while (++i < n) {
	    list.remove(names[i]);
	  }
	}

	function classedTrue(names) {
	  return function () {
	    classedAdd(this, names);
	  };
	}

	function classedFalse(names) {
	  return function () {
	    classedRemove(this, names);
	  };
	}

	function classedFunction(names, value) {
	  return function () {
	    (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
	  };
	}

	function selection_classed (name, value) {
	  var names = classArray(name + "");

	  if (arguments.length < 2) {
	    var list = classList(this.node()),
	        i = -1,
	        n = names.length;
	    while (++i < n) {
	      if (!list.contains(names[i])) return false;
	    }return true;
	  }

	  return this.each((typeof value === "function" ? classedFunction : value ? classedTrue : classedFalse)(names, value));
	}

	function textRemove() {
	  this.textContent = "";
	}

	function textConstant$1(value) {
	  return function () {
	    this.textContent = value;
	  };
	}

	function textFunction$1(value) {
	  return function () {
	    var v = value.apply(this, arguments);
	    this.textContent = v == null ? "" : v;
	  };
	}

	function selection_text (value) {
	  return arguments.length ? this.each(value == null ? textRemove : (typeof value === "function" ? textFunction$1 : textConstant$1)(value)) : this.node().textContent;
	}

	function htmlRemove() {
	  this.innerHTML = "";
	}

	function htmlConstant(value) {
	  return function () {
	    this.innerHTML = value;
	  };
	}

	function htmlFunction(value) {
	  return function () {
	    var v = value.apply(this, arguments);
	    this.innerHTML = v == null ? "" : v;
	  };
	}

	function selection_html (value) {
	  return arguments.length ? this.each(value == null ? htmlRemove : (typeof value === "function" ? htmlFunction : htmlConstant)(value)) : this.node().innerHTML;
	}

	function raise() {
	  this.parentNode.appendChild(this);
	}

	function selection_raise () {
	  return this.each(raise);
	}

	function lower() {
	  this.parentNode.insertBefore(this, this.parentNode.firstChild);
	}

	function selection_lower () {
	  return this.each(lower);
	}

	function append(create) {
	  return function () {
	    return this.appendChild(create.apply(this, arguments));
	  };
	}

	function insert(create, select) {
	  return function () {
	    return this.insertBefore(create.apply(this, arguments), select.apply(this, arguments) || null);
	  };
	}

	function constantNull() {
	  return null;
	}

	function selection_append (name, before) {
	  var create = typeof name === "function" ? name : creator(name);
	  return this.select(arguments.length < 2 ? append(create) : insert(create, before == null ? constantNull : typeof before === "function" ? before : selector(before)));
	}

	function remove() {
	  var parent = this.parentNode;
	  if (parent) parent.removeChild(this);
	}

	function selection_remove () {
	  return this.each(remove);
	}

	function selection_datum (value) {
	    return arguments.length ? this.property("__data__", value) : this.node().__data__;
	}

	function dispatchEvent(node, type, params) {
	  var window = defaultView(node),
	      event = window.CustomEvent;

	  if (event) {
	    event = new event(type, params);
	  } else {
	    event = window.document.createEvent("Event");
	    if (params) event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail;else event.initEvent(type, false, false);
	  }

	  node.dispatchEvent(event);
	}

	function dispatchConstant(type, params) {
	  return function () {
	    return dispatchEvent(this, type, params);
	  };
	}

	function dispatchFunction(type, params) {
	  return function () {
	    return dispatchEvent(this, type, params.apply(this, arguments));
	  };
	}

	function selection_dispatch (type, params) {
	  return this.each((typeof params === "function" ? dispatchFunction : dispatchConstant)(type, params));
	}

	var root$1 = [null];

	function Selection(groups, parents) {
	  this._groups = groups;
	  this._parents = parents;
	}

	function selection() {
	  return new Selection([[document.documentElement]], root$1);
	}

	Selection.prototype = selection.prototype = {
	  constructor: Selection,
	  select: selection_select,
	  selectAll: selection_selectAll,
	  filter: selection_filter,
	  data: selection_data,
	  enter: selection_enter,
	  exit: selection_exit,
	  merge: selection_merge,
	  order: selection_order,
	  sort: selection_sort,
	  call: selection_call,
	  nodes: selection_nodes,
	  node: selection_node,
	  size: selection_size,
	  empty: selection_empty,
	  each: selection_each,
	  attr: selection_attr,
	  style: selection_style,
	  property: selection_property,
	  classed: selection_classed,
	  text: selection_text,
	  html: selection_html,
	  raise: selection_raise,
	  lower: selection_lower,
	  append: selection_append,
	  remove: selection_remove,
	  datum: selection_datum,
	  on: selection_on,
	  dispatch: selection_dispatch
	};

	function select (selector) {
	    return typeof selector === "string" ? new Selection([[document.querySelector(selector)]], [document.documentElement]) : new Selection([[selector]], root$1);
	}

	var bug44083 = typeof navigator !== "undefined" && /WebKit/.test(navigator.userAgent) ? -1 : 0;

	var noop = { value: function value() {} };

	function dispatch() {
	  for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
	    if (!(t = arguments[i] + "") || t in _) throw new Error();
	    _[t] = [];
	  }
	  return new Dispatch(_);
	}

	function Dispatch(_) {
	  this._ = _;
	}

	function parseTypenames$1(typenames, types) {
	  return typenames.trim().split(/^|\s+/).map(function (t) {
	    var name = "",
	        i = t.indexOf(".");
	    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
	    if (t && !types.hasOwnProperty(t)) throw new Error();
	    return { type: t, name: name };
	  });
	}

	Dispatch.prototype = dispatch.prototype = {
	  constructor: Dispatch,
	  on: function on(typename, callback) {
	    var _ = this._,
	        T = parseTypenames$1(typename + "", _),
	        t,
	        i = -1,
	        n = T.length;

	    // If no callback was specified, return the callback of the given type and name.
	    if (arguments.length < 2) {
	      while (++i < n) {
	        if ((t = (typename = T[i]).type) && (t = get$1(_[t], typename.name))) return t;
	      }return;
	    }

	    // If a type was specified, set the callback for the given type and name.
	    // Otherwise, if a null callback was specified, remove callbacks of the given name.
	    if (callback != null && typeof callback !== "function") throw new Error();
	    while (++i < n) {
	      if (t = (typename = T[i]).type) _[t] = set$1(_[t], typename.name, callback);else if (callback == null) for (t in _) {
	        _[t] = set$1(_[t], typename.name, null);
	      }
	    }

	    return this;
	  },
	  copy: function copy() {
	    var copy = {},
	        _ = this._;
	    for (var t in _) {
	      copy[t] = _[t].slice();
	    }return new Dispatch(copy);
	  },
	  call: function call(type, that) {
	    if ((n = arguments.length - 2) > 0) for (var args = new Array(n), i = 0, n; i < n; ++i) {
	      args[i] = arguments[i + 2];
	    }this.apply(type, that, args);
	  },
	  apply: function apply(type, that, args) {
	    if (!this._.hasOwnProperty(type)) throw new Error();
	    for (var t = this._[type], i = 0, n = t.length; i < n; ++i) {
	      t[i].value.apply(that, args);
	    }
	  }
	};

	function get$1(type, name) {
	  for (var i = 0, n = type.length, c; i < n; ++i) {
	    if ((c = type[i]).name === name) {
	      return c.value;
	    }
	  }
	}

	function set$1(type, name, callback) {
	  for (var i = 0, n = type.length; i < n; ++i) {
	    if (type[i].name === name) {
	      type[i] = noop, type = type.slice(0, i).concat(type.slice(i + 1));
	      break;
	    }
	  }
	  if (callback != null) type.push({ name: name, value: callback });
	  return type;
	}

	var frame = 0;
	var timeout = 0;
	var interval = 0;
	var pokeDelay = 1000;
	var taskHead;
	var taskTail;
	var clockLast = 0;
	var clockNow = 0;
	var clockSkew = 0;
	var clock = (typeof performance === "undefined" ? "undefined" : babelHelpers_typeof(performance)) === "object" ? performance : Date;
	var setFrame = typeof requestAnimationFrame === "function" ? requestAnimationFrame : function (callback) {
	  return setTimeout(callback, 17);
	};
	function now() {
	  return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
	}

	function clearNow() {
	  clockNow = 0;
	}

	function Timer() {
	  this._call = this._time = this._next = null;
	}

	Timer.prototype = timer.prototype = {
	  constructor: Timer,
	  restart: function restart(callback, delay, time) {
	    if (typeof callback !== "function") throw new TypeError("callback is not a function");
	    time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
	    if (!this._call) {
	      if (taskTail) taskTail._next = this;else taskHead = this;
	      taskTail = this;
	    }
	    this._call = callback;
	    this._time = time;
	    sleep();
	  },
	  stop: function stop() {
	    if (this._call) {
	      this._call = null;
	      this._time = Infinity;
	      sleep();
	    }
	  }
	};

	function timer(callback, delay, time) {
	  var t = new Timer();
	  t.restart(callback, delay, time);
	  return t;
	}

	function timerFlush() {
	  now(); // Get the current time, if not already set.
	  ++frame; // Pretend we’ve set an alarm, if we haven’t already.
	  var t = taskHead,
	      e;
	  while (t) {
	    if ((e = clockNow - t._time) >= 0) t._call.call(null, e);
	    t = t._next;
	  }
	  --frame;
	}

	function wake(time) {
	  clockNow = (clockLast = time || clock.now()) + clockSkew;
	  frame = timeout = 0;
	  try {
	    timerFlush();
	  } finally {
	    frame = 0;
	    nap();
	    clockNow = 0;
	  }
	}

	function poke() {
	  var now = clock.now(),
	      delay = now - clockLast;
	  if (delay > pokeDelay) clockSkew -= delay, clockLast = now;
	}

	function nap() {
	  var t0,
	      t1 = taskHead,
	      time = Infinity;
	  while (t1) {
	    if (t1._call) {
	      if (time > t1._time) time = t1._time;
	      t1 = (t0 = t1)._next;
	    } else {
	      t1 = t0 ? t0._next = t1._next : taskHead = t1._next;
	    }
	  }
	  taskTail = t0;
	  sleep(time);
	}

	function sleep(time) {
	  if (frame) return; // Soonest alarm already set, or will be.
	  if (timeout) timeout = clearTimeout(timeout);
	  var delay = time - clockNow;
	  if (delay > 24) {
	    if (time < Infinity) timeout = setTimeout(wake, delay);
	    if (interval) interval = clearInterval(interval);
	  } else {
	    if (!interval) interval = setInterval(poke, pokeDelay);
	    frame = 1, setFrame(wake);
	  }
	}

	function timeout$1 (callback, delay, time) {
	  var t = new Timer();
	  delay = delay == null ? 0 : +delay;
	  t.restart(function (elapsed) {
	    t.stop();
	    callback(elapsed + delay);
	  }, delay, time);
	  return t;
	}

	var emptyOn = dispatch("start", "end", "interrupt");
	var emptyTween = [];

	var CREATED = 0;
	var SCHEDULED = 1;
	var STARTING = 2;
	var STARTED = 3;
	var ENDING = 4;
	var ENDED = 5;

	function schedule (node, name, id, index, group, timing) {
	  var schedules = node.__transition;
	  if (!schedules) node.__transition = {};else if (id in schedules) return;
	  create(node, id, {
	    name: name,
	    index: index, // For context during callback.
	    group: group, // For context during callback.
	    on: emptyOn,
	    tween: emptyTween,
	    time: timing.time,
	    delay: timing.delay,
	    duration: timing.duration,
	    ease: timing.ease,
	    timer: null,
	    state: CREATED
	  });
	}

	function init(node, id) {
	  var schedule = node.__transition;
	  if (!schedule || !(schedule = schedule[id]) || schedule.state > CREATED) throw new Error("too late");
	  return schedule;
	}

	function set(node, id) {
	  var schedule = node.__transition;
	  if (!schedule || !(schedule = schedule[id]) || schedule.state > STARTING) throw new Error("too late");
	  return schedule;
	}

	function get(node, id) {
	  var schedule = node.__transition;
	  if (!schedule || !(schedule = schedule[id])) throw new Error("too late");
	  return schedule;
	}

	function create(node, id, self) {
	  var schedules = node.__transition,
	      tween;

	  // Initialize the self timer when the transition is created.
	  // Note the actual delay is not known until the first callback!
	  schedules[id] = self;
	  self.timer = timer(schedule, 0, self.time);

	  // If the delay is greater than this first sleep, sleep some more;
	  // otherwise, start immediately.
	  function schedule(elapsed) {
	    self.state = SCHEDULED;
	    if (self.delay <= elapsed) start(elapsed - self.delay);else self.timer.restart(start, self.delay, self.time);
	  }

	  function start(elapsed) {
	    var i, j, n, o;

	    for (i in schedules) {
	      o = schedules[i];
	      if (o.name !== self.name) continue;

	      // Interrupt the active transition, if any.
	      // Dispatch the interrupt event.
	      if (o.state === STARTED) {
	        o.state = ENDED;
	        o.timer.stop();
	        o.on.call("interrupt", node, node.__data__, o.index, o.group);
	        delete schedules[i];
	      }

	      // Cancel any pre-empted transitions. No interrupt event is dispatched
	      // because the cancelled transitions never started. Note that this also
	      // removes this transition from the pending list!
	      else if (+i < id) {
	          o.state = ENDED;
	          o.timer.stop();
	          delete schedules[i];
	        }
	    }

	    // Defer the first tick to end of the current frame; see mbostock/d3#1576.
	    // Note the transition may be canceled after start and before the first tick!
	    // Note this must be scheduled before the start event; see d3/d3-transition#16!
	    // Assuming this is successful, subsequent callbacks go straight to tick.
	    timeout$1(function () {
	      if (self.state === STARTED) {
	        self.timer.restart(tick, self.delay, self.time);
	        tick(elapsed);
	      }
	    });

	    // Dispatch the start event.
	    // Note this must be done before the tween are initialized.
	    self.state = STARTING;
	    self.on.call("start", node, node.__data__, self.index, self.group);
	    if (self.state !== STARTING) return; // interrupted
	    self.state = STARTED;

	    // Initialize the tween, deleting null tween.
	    tween = new Array(n = self.tween.length);
	    for (i = 0, j = -1; i < n; ++i) {
	      if (o = self.tween[i].value.call(node, node.__data__, self.index, self.group)) {
	        tween[++j] = o;
	      }
	    }
	    tween.length = j + 1;
	  }

	  function tick(elapsed) {
	    var t = elapsed < self.duration ? self.ease.call(null, elapsed / self.duration) : (self.state = ENDING, 1),
	        i = -1,
	        n = tween.length;

	    while (++i < n) {
	      tween[i].call(null, t);
	    }

	    // Dispatch the end event.
	    if (self.state === ENDING) {
	      self.state = ENDED;
	      self.timer.stop();
	      self.on.call("end", node, node.__data__, self.index, self.group);
	      for (i in schedules) {
	        if (+i !== id) return void delete schedules[id];
	      }delete node.__transition;
	    }
	  }
	}

	function selection_interrupt (name) {
	  name = name == null ? null : name + "";
	  return this.each(function () {
	    var schedules = this.__transition,
	        schedule,
	        active,
	        empty = true,
	        i;

	    if (!schedules) return;

	    for (i in schedules) {
	      if ((schedule = schedules[i]).name !== name) {
	        empty = false;continue;
	      }
	      active = schedule.state === STARTED;
	      schedule.state = ENDED;
	      schedule.timer.stop();
	      if (active) schedule.on.call("interrupt", this, this.__data__, schedule.index, schedule.group);
	      delete schedules[i];
	    }

	    if (empty) delete this.__transition;
	  });
	}

	function define (constructor, factory, prototype) {
	  constructor.prototype = factory.prototype = prototype;
	  prototype.constructor = constructor;
	}

	function extend(parent, definition) {
	  var prototype = Object.create(parent.prototype);
	  for (var key in definition) {
	    prototype[key] = definition[key];
	  }return prototype;
	}

	function Color() {}

	var _darker = 0.7;
	var _brighter = 1 / _darker;

	var reHex3 = /^#([0-9a-f]{3})$/;
	var reHex6 = /^#([0-9a-f]{6})$/;
	var reRgbInteger = /^rgb\(\s*([-+]?\d+)\s*,\s*([-+]?\d+)\s*,\s*([-+]?\d+)\s*\)$/;
	var reRgbPercent = /^rgb\(\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*\)$/;
	var reRgbaInteger = /^rgba\(\s*([-+]?\d+)\s*,\s*([-+]?\d+)\s*,\s*([-+]?\d+)\s*,\s*([-+]?\d+(?:\.\d+)?)\s*\)$/;
	var reRgbaPercent = /^rgba\(\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)\s*\)$/;
	var reHslPercent = /^hsl\(\s*([-+]?\d+(?:\.\d+)?)\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*\)$/;
	var reHslaPercent = /^hsla\(\s*([-+]?\d+(?:\.\d+)?)\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)\s*\)$/;
	var named = {
	  aliceblue: 0xf0f8ff,
	  antiquewhite: 0xfaebd7,
	  aqua: 0x00ffff,
	  aquamarine: 0x7fffd4,
	  azure: 0xf0ffff,
	  beige: 0xf5f5dc,
	  bisque: 0xffe4c4,
	  black: 0x000000,
	  blanchedalmond: 0xffebcd,
	  blue: 0x0000ff,
	  blueviolet: 0x8a2be2,
	  brown: 0xa52a2a,
	  burlywood: 0xdeb887,
	  cadetblue: 0x5f9ea0,
	  chartreuse: 0x7fff00,
	  chocolate: 0xd2691e,
	  coral: 0xff7f50,
	  cornflowerblue: 0x6495ed,
	  cornsilk: 0xfff8dc,
	  crimson: 0xdc143c,
	  cyan: 0x00ffff,
	  darkblue: 0x00008b,
	  darkcyan: 0x008b8b,
	  darkgoldenrod: 0xb8860b,
	  darkgray: 0xa9a9a9,
	  darkgreen: 0x006400,
	  darkgrey: 0xa9a9a9,
	  darkkhaki: 0xbdb76b,
	  darkmagenta: 0x8b008b,
	  darkolivegreen: 0x556b2f,
	  darkorange: 0xff8c00,
	  darkorchid: 0x9932cc,
	  darkred: 0x8b0000,
	  darksalmon: 0xe9967a,
	  darkseagreen: 0x8fbc8f,
	  darkslateblue: 0x483d8b,
	  darkslategray: 0x2f4f4f,
	  darkslategrey: 0x2f4f4f,
	  darkturquoise: 0x00ced1,
	  darkviolet: 0x9400d3,
	  deeppink: 0xff1493,
	  deepskyblue: 0x00bfff,
	  dimgray: 0x696969,
	  dimgrey: 0x696969,
	  dodgerblue: 0x1e90ff,
	  firebrick: 0xb22222,
	  floralwhite: 0xfffaf0,
	  forestgreen: 0x228b22,
	  fuchsia: 0xff00ff,
	  gainsboro: 0xdcdcdc,
	  ghostwhite: 0xf8f8ff,
	  gold: 0xffd700,
	  goldenrod: 0xdaa520,
	  gray: 0x808080,
	  green: 0x008000,
	  greenyellow: 0xadff2f,
	  grey: 0x808080,
	  honeydew: 0xf0fff0,
	  hotpink: 0xff69b4,
	  indianred: 0xcd5c5c,
	  indigo: 0x4b0082,
	  ivory: 0xfffff0,
	  khaki: 0xf0e68c,
	  lavender: 0xe6e6fa,
	  lavenderblush: 0xfff0f5,
	  lawngreen: 0x7cfc00,
	  lemonchiffon: 0xfffacd,
	  lightblue: 0xadd8e6,
	  lightcoral: 0xf08080,
	  lightcyan: 0xe0ffff,
	  lightgoldenrodyellow: 0xfafad2,
	  lightgray: 0xd3d3d3,
	  lightgreen: 0x90ee90,
	  lightgrey: 0xd3d3d3,
	  lightpink: 0xffb6c1,
	  lightsalmon: 0xffa07a,
	  lightseagreen: 0x20b2aa,
	  lightskyblue: 0x87cefa,
	  lightslategray: 0x778899,
	  lightslategrey: 0x778899,
	  lightsteelblue: 0xb0c4de,
	  lightyellow: 0xffffe0,
	  lime: 0x00ff00,
	  limegreen: 0x32cd32,
	  linen: 0xfaf0e6,
	  magenta: 0xff00ff,
	  maroon: 0x800000,
	  mediumaquamarine: 0x66cdaa,
	  mediumblue: 0x0000cd,
	  mediumorchid: 0xba55d3,
	  mediumpurple: 0x9370db,
	  mediumseagreen: 0x3cb371,
	  mediumslateblue: 0x7b68ee,
	  mediumspringgreen: 0x00fa9a,
	  mediumturquoise: 0x48d1cc,
	  mediumvioletred: 0xc71585,
	  midnightblue: 0x191970,
	  mintcream: 0xf5fffa,
	  mistyrose: 0xffe4e1,
	  moccasin: 0xffe4b5,
	  navajowhite: 0xffdead,
	  navy: 0x000080,
	  oldlace: 0xfdf5e6,
	  olive: 0x808000,
	  olivedrab: 0x6b8e23,
	  orange: 0xffa500,
	  orangered: 0xff4500,
	  orchid: 0xda70d6,
	  palegoldenrod: 0xeee8aa,
	  palegreen: 0x98fb98,
	  paleturquoise: 0xafeeee,
	  palevioletred: 0xdb7093,
	  papayawhip: 0xffefd5,
	  peachpuff: 0xffdab9,
	  peru: 0xcd853f,
	  pink: 0xffc0cb,
	  plum: 0xdda0dd,
	  powderblue: 0xb0e0e6,
	  purple: 0x800080,
	  rebeccapurple: 0x663399,
	  red: 0xff0000,
	  rosybrown: 0xbc8f8f,
	  royalblue: 0x4169e1,
	  saddlebrown: 0x8b4513,
	  salmon: 0xfa8072,
	  sandybrown: 0xf4a460,
	  seagreen: 0x2e8b57,
	  seashell: 0xfff5ee,
	  sienna: 0xa0522d,
	  silver: 0xc0c0c0,
	  skyblue: 0x87ceeb,
	  slateblue: 0x6a5acd,
	  slategray: 0x708090,
	  slategrey: 0x708090,
	  snow: 0xfffafa,
	  springgreen: 0x00ff7f,
	  steelblue: 0x4682b4,
	  tan: 0xd2b48c,
	  teal: 0x008080,
	  thistle: 0xd8bfd8,
	  tomato: 0xff6347,
	  turquoise: 0x40e0d0,
	  violet: 0xee82ee,
	  wheat: 0xf5deb3,
	  white: 0xffffff,
	  whitesmoke: 0xf5f5f5,
	  yellow: 0xffff00,
	  yellowgreen: 0x9acd32
	};

	define(Color, color, {
	  displayable: function displayable() {
	    return this.rgb().displayable();
	  },
	  toString: function toString() {
	    return this.rgb() + "";
	  }
	});

	function color(format) {
	  var m;
	  format = (format + "").trim().toLowerCase();
	  return (m = reHex3.exec(format)) ? (m = parseInt(m[1], 16), new Rgb(m >> 8 & 0xf | m >> 4 & 0x0f0, m >> 4 & 0xf | m & 0xf0, (m & 0xf) << 4 | m & 0xf, 1) // #f00
	  ) : (m = reHex6.exec(format)) ? rgbn(parseInt(m[1], 16)) // #ff0000
	  : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
	  : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
	  : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
	  : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
	  : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
	  : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
	  : named.hasOwnProperty(format) ? rgbn(named[format]) : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0) : null;
	}

	function rgbn(n) {
	  return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
	}

	function rgba(r, g, b, a) {
	  if (a <= 0) r = g = b = NaN;
	  return new Rgb(r, g, b, a);
	}

	function rgbConvert(o) {
	  if (!(o instanceof Color)) o = color(o);
	  if (!o) return new Rgb();
	  o = o.rgb();
	  return new Rgb(o.r, o.g, o.b, o.opacity);
	}

	function rgb$1(r, g, b, opacity) {
	  return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
	}

	function Rgb(r, g, b, opacity) {
	  this.r = +r;
	  this.g = +g;
	  this.b = +b;
	  this.opacity = +opacity;
	}

	define(Rgb, rgb$1, extend(Color, {
	  brighter: function brighter(k) {
	    k = k == null ? _brighter : Math.pow(_brighter, k);
	    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
	  },
	  darker: function darker(k) {
	    k = k == null ? _darker : Math.pow(_darker, k);
	    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
	  },
	  rgb: function rgb() {
	    return this;
	  },
	  displayable: function displayable() {
	    return 0 <= this.r && this.r <= 255 && 0 <= this.g && this.g <= 255 && 0 <= this.b && this.b <= 255 && 0 <= this.opacity && this.opacity <= 1;
	  },
	  toString: function toString() {
	    var a = this.opacity;a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
	    return (a === 1 ? "rgb(" : "rgba(") + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.b) || 0)) + (a === 1 ? ")" : ", " + a + ")");
	  }
	}));

	function hsla(h, s, l, a) {
	  if (a <= 0) h = s = l = NaN;else if (l <= 0 || l >= 1) h = s = NaN;else if (s <= 0) h = NaN;
	  return new Hsl(h, s, l, a);
	}

	function hslConvert(o) {
	  if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
	  if (!(o instanceof Color)) o = color(o);
	  if (!o) return new Hsl();
	  if (o instanceof Hsl) return o;
	  o = o.rgb();
	  var r = o.r / 255,
	      g = o.g / 255,
	      b = o.b / 255,
	      min = Math.min(r, g, b),
	      max = Math.max(r, g, b),
	      h = NaN,
	      s = max - min,
	      l = (max + min) / 2;
	  if (s) {
	    if (r === max) h = (g - b) / s + (g < b) * 6;else if (g === max) h = (b - r) / s + 2;else h = (r - g) / s + 4;
	    s /= l < 0.5 ? max + min : 2 - max - min;
	    h *= 60;
	  } else {
	    s = l > 0 && l < 1 ? 0 : h;
	  }
	  return new Hsl(h, s, l, o.opacity);
	}

	function hsl(h, s, l, opacity) {
	  return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
	}

	function Hsl(h, s, l, opacity) {
	  this.h = +h;
	  this.s = +s;
	  this.l = +l;
	  this.opacity = +opacity;
	}

	define(Hsl, hsl, extend(Color, {
	  brighter: function brighter(k) {
	    k = k == null ? _brighter : Math.pow(_brighter, k);
	    return new Hsl(this.h, this.s, this.l * k, this.opacity);
	  },
	  darker: function darker(k) {
	    k = k == null ? _darker : Math.pow(_darker, k);
	    return new Hsl(this.h, this.s, this.l * k, this.opacity);
	  },
	  rgb: function rgb() {
	    var h = this.h % 360 + (this.h < 0) * 360,
	        s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
	        l = this.l,
	        m2 = l + (l < 0.5 ? l : 1 - l) * s,
	        m1 = 2 * l - m2;
	    return new Rgb(hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2), hsl2rgb(h, m1, m2), hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2), this.opacity);
	  },
	  displayable: function displayable() {
	    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
	  }
	}));

	/* From FvD 13.37, CSS Color Module Level 3 */
	function hsl2rgb(h, m1, m2) {
	  return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
	}

	var deg2rad = Math.PI / 180;
	var rad2deg = 180 / Math.PI;

	var Kn = 18;
	var Xn = 0.950470;
	var Yn = 1;
	var Zn = 1.088830;
	var t0 = 4 / 29;
	var t1 = 6 / 29;
	var t2 = 3 * t1 * t1;
	var t3 = t1 * t1 * t1;
	function labConvert(o) {
	  if (o instanceof Lab) return new Lab(o.l, o.a, o.b, o.opacity);
	  if (o instanceof Hcl) {
	    var h = o.h * deg2rad;
	    return new Lab(o.l, Math.cos(h) * o.c, Math.sin(h) * o.c, o.opacity);
	  }
	  if (!(o instanceof Rgb)) o = rgbConvert(o);
	  var b = rgb2xyz(o.r),
	      a = rgb2xyz(o.g),
	      l = rgb2xyz(o.b),
	      x = xyz2lab((0.4124564 * b + 0.3575761 * a + 0.1804375 * l) / Xn),
	      y = xyz2lab((0.2126729 * b + 0.7151522 * a + 0.0721750 * l) / Yn),
	      z = xyz2lab((0.0193339 * b + 0.1191920 * a + 0.9503041 * l) / Zn);
	  return new Lab(116 * y - 16, 500 * (x - y), 200 * (y - z), o.opacity);
	}

	function lab(l, a, b, opacity) {
	  return arguments.length === 1 ? labConvert(l) : new Lab(l, a, b, opacity == null ? 1 : opacity);
	}

	function Lab(l, a, b, opacity) {
	  this.l = +l;
	  this.a = +a;
	  this.b = +b;
	  this.opacity = +opacity;
	}

	define(Lab, lab, extend(Color, {
	  brighter: function brighter(k) {
	    return new Lab(this.l + Kn * (k == null ? 1 : k), this.a, this.b, this.opacity);
	  },
	  darker: function darker(k) {
	    return new Lab(this.l - Kn * (k == null ? 1 : k), this.a, this.b, this.opacity);
	  },
	  rgb: function rgb() {
	    var y = (this.l + 16) / 116,
	        x = isNaN(this.a) ? y : y + this.a / 500,
	        z = isNaN(this.b) ? y : y - this.b / 200;
	    y = Yn * lab2xyz(y);
	    x = Xn * lab2xyz(x);
	    z = Zn * lab2xyz(z);
	    return new Rgb(xyz2rgb(3.2404542 * x - 1.5371385 * y - 0.4985314 * z), // D65 -> sRGB
	    xyz2rgb(-0.9692660 * x + 1.8760108 * y + 0.0415560 * z), xyz2rgb(0.0556434 * x - 0.2040259 * y + 1.0572252 * z), this.opacity);
	  }
	}));

	function xyz2lab(t) {
	  return t > t3 ? Math.pow(t, 1 / 3) : t / t2 + t0;
	}

	function lab2xyz(t) {
	  return t > t1 ? t * t * t : t2 * (t - t0);
	}

	function xyz2rgb(x) {
	  return 255 * (x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055);
	}

	function rgb2xyz(x) {
	  return (x /= 255) <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
	}

	function hclConvert(o) {
	  if (o instanceof Hcl) return new Hcl(o.h, o.c, o.l, o.opacity);
	  if (!(o instanceof Lab)) o = labConvert(o);
	  var h = Math.atan2(o.b, o.a) * rad2deg;
	  return new Hcl(h < 0 ? h + 360 : h, Math.sqrt(o.a * o.a + o.b * o.b), o.l, o.opacity);
	}

	function hcl(h, c, l, opacity) {
	  return arguments.length === 1 ? hclConvert(h) : new Hcl(h, c, l, opacity == null ? 1 : opacity);
	}

	function Hcl(h, c, l, opacity) {
	  this.h = +h;
	  this.c = +c;
	  this.l = +l;
	  this.opacity = +opacity;
	}

	define(Hcl, hcl, extend(Color, {
	  brighter: function brighter(k) {
	    return new Hcl(this.h, this.c, this.l + Kn * (k == null ? 1 : k), this.opacity);
	  },
	  darker: function darker(k) {
	    return new Hcl(this.h, this.c, this.l - Kn * (k == null ? 1 : k), this.opacity);
	  },
	  rgb: function rgb() {
	    return labConvert(this).rgb();
	  }
	}));

	var A = -0.14861;
	var B = +1.78277;
	var C = -0.29227;
	var D = -0.90649;
	var E = +1.97294;
	var ED = E * D;
	var EB = E * B;
	var BC_DA = B * C - D * A;
	function cubehelixConvert(o) {
	  if (o instanceof Cubehelix) return new Cubehelix(o.h, o.s, o.l, o.opacity);
	  if (!(o instanceof Rgb)) o = rgbConvert(o);
	  var r = o.r / 255,
	      g = o.g / 255,
	      b = o.b / 255,
	      l = (BC_DA * b + ED * r - EB * g) / (BC_DA + ED - EB),
	      bl = b - l,
	      k = (E * (g - l) - C * bl) / D,
	      s = Math.sqrt(k * k + bl * bl) / (E * l * (1 - l)),
	      // NaN if l=0 or l=1
	  h = s ? Math.atan2(k, bl) * rad2deg - 120 : NaN;
	  return new Cubehelix(h < 0 ? h + 360 : h, s, l, o.opacity);
	}

	function cubehelix$1(h, s, l, opacity) {
	  return arguments.length === 1 ? cubehelixConvert(h) : new Cubehelix(h, s, l, opacity == null ? 1 : opacity);
	}

	function Cubehelix(h, s, l, opacity) {
	  this.h = +h;
	  this.s = +s;
	  this.l = +l;
	  this.opacity = +opacity;
	}

	define(Cubehelix, cubehelix$1, extend(Color, {
	  brighter: function brighter(k) {
	    k = k == null ? _brighter : Math.pow(_brighter, k);
	    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
	  },
	  darker: function darker(k) {
	    k = k == null ? _darker : Math.pow(_darker, k);
	    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
	  },
	  rgb: function rgb() {
	    var h = isNaN(this.h) ? 0 : (this.h + 120) * deg2rad,
	        l = +this.l,
	        a = isNaN(this.s) ? 0 : this.s * l * (1 - l),
	        cosh = Math.cos(h),
	        sinh = Math.sin(h);
	    return new Rgb(255 * (l + a * (A * cosh + B * sinh)), 255 * (l + a * (C * cosh + D * sinh)), 255 * (l + a * (E * cosh)), this.opacity);
	  }
	}));

	function constant$3 (x) {
	  return function () {
	    return x;
	  };
	}

	function linear$1(a, d) {
	  return function (t) {
	    return a + t * d;
	  };
	}

	function exponential(a, b, y) {
	  return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function (t) {
	    return Math.pow(a + t * b, y);
	  };
	}

	function hue(a, b) {
	  var d = b - a;
	  return d ? linear$1(a, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d) : constant$3(isNaN(a) ? b : a);
	}

	function gamma(y) {
	  return (y = +y) === 1 ? nogamma : function (a, b) {
	    return b - a ? exponential(a, b, y) : constant$3(isNaN(a) ? b : a);
	  };
	}

	function nogamma(a, b) {
	  var d = b - a;
	  return d ? linear$1(a, d) : constant$3(isNaN(a) ? b : a);
	}

	var rgb = function gamma$$(y) {
	  var interpolateColor = gamma(y);

	  function interpolateRgb(start, end) {
	    var r = interpolateColor((start = rgb$1(start)).r, (end = rgb$1(end)).r),
	        g = interpolateColor(start.g, end.g),
	        b = interpolateColor(start.b, end.b),
	        opacity = interpolateColor(start.opacity, end.opacity);
	    return function (t) {
	      start.r = r(t);
	      start.g = g(t);
	      start.b = b(t);
	      start.opacity = opacity(t);
	      return start + "";
	    };
	  }

	  interpolateRgb.gamma = gamma$$;

	  return interpolateRgb;
	}(1);

	function number$2 (a, b) {
	  return a = +a, b -= a, function (t) {
	    return a + b * t;
	  };
	}

	var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;
	var reB = new RegExp(reA.source, "g");
	function zero(b) {
	  return function () {
	    return b;
	  };
	}

	function one(b) {
	  return function (t) {
	    return b(t) + "";
	  };
	}

	function string (a, b) {
	  var bi = reA.lastIndex = reB.lastIndex = 0,
	      // scan index for next number in b
	  am,
	      // current match in a
	  bm,
	      // current match in b
	  bs,
	      // string preceding current number in b, if any
	  i = -1,
	      // index in s
	  s = [],
	      // string constants and placeholders
	  q = []; // number interpolators

	  // Coerce inputs to strings.
	  a = a + "", b = b + "";

	  // Interpolate pairs of numbers in a & b.
	  while ((am = reA.exec(a)) && (bm = reB.exec(b))) {
	    if ((bs = bm.index) > bi) {
	      // a string precedes the next number in b
	      bs = b.slice(bi, bs);
	      if (s[i]) s[i] += bs; // coalesce with previous string
	      else s[++i] = bs;
	    }
	    if ((am = am[0]) === (bm = bm[0])) {
	      // numbers in a & b match
	      if (s[i]) s[i] += bm; // coalesce with previous string
	      else s[++i] = bm;
	    } else {
	      // interpolate non-matching numbers
	      s[++i] = null;
	      q.push({ i: i, x: number$2(am, bm) });
	    }
	    bi = reB.lastIndex;
	  }

	  // Add remains of b.
	  if (bi < b.length) {
	    bs = b.slice(bi);
	    if (s[i]) s[i] += bs; // coalesce with previous string
	    else s[++i] = bs;
	  }

	  // Special optimization for only a single match.
	  // Otherwise, interpolate each of the numbers and rejoin the string.
	  return s.length < 2 ? q[0] ? one(q[0].x) : zero(b) : (b = q.length, function (t) {
	    for (var i = 0, o; i < b; ++i) {
	      s[(o = q[i]).i] = o.x(t);
	    }return s.join("");
	  });
	}

	var rad2deg$1 = 180 / Math.PI;

	var identity$1 = {
	  translateX: 0,
	  translateY: 0,
	  rotate: 0,
	  skewX: 0,
	  scaleX: 1,
	  scaleY: 1
	};

	function decompose (a, b, c, d, e, f) {
	  if (a * d === b * c) return null;

	  var scaleX = Math.sqrt(a * a + b * b);
	  a /= scaleX, b /= scaleX;

	  var skewX = a * c + b * d;
	  c -= a * skewX, d -= b * skewX;

	  var scaleY = Math.sqrt(c * c + d * d);
	  c /= scaleY, d /= scaleY, skewX /= scaleY;

	  if (a * d < b * c) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;

	  return {
	    translateX: e,
	    translateY: f,
	    rotate: Math.atan2(b, a) * rad2deg$1,
	    skewX: Math.atan(skewX) * rad2deg$1,
	    scaleX: scaleX,
	    scaleY: scaleY
	  };
	}

	var cssNode;
	var cssRoot;
	var cssView;
	var svgNode;
	function parseCss(value) {
	  if (value === "none") return identity$1;
	  if (!cssNode) cssNode = document.createElement("DIV"), cssRoot = document.documentElement, cssView = document.defaultView;
	  cssNode.style.transform = value;
	  value = cssView.getComputedStyle(cssRoot.appendChild(cssNode), null).getPropertyValue("transform");
	  cssRoot.removeChild(cssNode);
	  var m = value.slice(7, -1).split(",");
	  return decompose(+m[0], +m[1], +m[2], +m[3], +m[4], +m[5]);
	}

	function parseSvg(value) {
	  if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
	  svgNode.setAttribute("transform", value == null ? "" : value);
	  var m = svgNode.transform.baseVal.consolidate().matrix;
	  return decompose(m.a, m.b, m.c, m.d, m.e, m.f);
	}

	function interpolateTransform(parse, pxComma, pxParen, degParen) {

	  function pop(s) {
	    return s.length ? s.pop() + " " : "";
	  }

	  function translate(xa, ya, xb, yb, s, q) {
	    if (xa !== xb || ya !== yb) {
	      var i = s.push("translate(", null, pxComma, null, pxParen);
	      q.push({ i: i - 4, x: number$2(xa, xb) }, { i: i - 2, x: number$2(ya, yb) });
	    } else if (xb || yb) {
	      s.push("translate(" + xb + pxComma + yb + pxParen);
	    }
	  }

	  function rotate(a, b, s, q) {
	    if (a !== b) {
	      if (a - b > 180) b += 360;else if (b - a > 180) a += 360; // shortest path
	      q.push({ i: s.push(pop(s) + "rotate(", null, degParen) - 2, x: number$2(a, b) });
	    } else if (b) {
	      s.push(pop(s) + "rotate(" + b + degParen);
	    }
	  }

	  function skewX(a, b, s, q) {
	    if (a !== b) {
	      q.push({ i: s.push(pop(s) + "skewX(", null, degParen) - 2, x: number$2(a, b) });
	    } else if (b) {
	      s.push(pop(s) + "skewX(" + b + degParen);
	    }
	  }

	  function scale(xa, ya, xb, yb, s, q) {
	    if (xa !== xb || ya !== yb) {
	      var i = s.push(pop(s) + "scale(", null, ",", null, ")");
	      q.push({ i: i - 4, x: number$2(xa, xb) }, { i: i - 2, x: number$2(ya, yb) });
	    } else if (xb !== 1 || yb !== 1) {
	      s.push(pop(s) + "scale(" + xb + "," + yb + ")");
	    }
	  }

	  return function (a, b) {
	    var s = [],
	        // string constants and placeholders
	    q = []; // number interpolators
	    a = parse(a), b = parse(b);
	    translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
	    rotate(a.rotate, b.rotate, s, q);
	    skewX(a.skewX, b.skewX, s, q);
	    scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
	    a = b = null; // gc
	    return function (t) {
	      var i = -1,
	          n = q.length,
	          o;
	      while (++i < n) {
	        s[(o = q[i]).i] = o.x(t);
	      }return s.join("");
	    };
	  };
	}

	var interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
	var interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");

	function gamma(y) {
	  y = +y;

	  function interpolateCubehelix(start, end) {
	    var h = hue((start = cubehelix$1(start)).h, (end = cubehelix$1(end)).h),
	        s = nogamma(start.s, end.s),
	        l = nogamma(start.l, end.l),
	        opacity = nogamma(start.opacity, end.opacity);
	    return function (t) {
	      start.h = h(t);
	      start.s = s(t);
	      start.l = l(Math.pow(t, y));
	      start.opacity = opacity(t);
	      return start + "";
	    };
	  }

	  interpolateCubehelix.gamma = gamma;

	  return interpolateCubehelix;
	}(1);

	function gamma(y) {
	  y = +y;

	  function interpolateCubehelixLong(start, end) {
	    var h = nogamma((start = cubehelix$1(start)).h, (end = cubehelix$1(end)).h),
	        s = nogamma(start.s, end.s),
	        l = nogamma(start.l, end.l),
	        opacity = nogamma(start.opacity, end.opacity);
	    return function (t) {
	      start.h = h(t);
	      start.s = s(t);
	      start.l = l(Math.pow(t, y));
	      start.opacity = opacity(t);
	      return start + "";
	    };
	  }

	  interpolateCubehelixLong.gamma = gamma;

	  return interpolateCubehelixLong;
	}(1);

	function tweenRemove(id, name) {
	  var tween0, tween1;
	  return function () {
	    var schedule = set(this, id),
	        tween = schedule.tween;

	    // If this node shared tween with the previous node,
	    // just assign the updated shared tween and we’re done!
	    // Otherwise, copy-on-write.
	    if (tween !== tween0) {
	      tween1 = tween0 = tween;
	      for (var i = 0, n = tween1.length; i < n; ++i) {
	        if (tween1[i].name === name) {
	          tween1 = tween1.slice();
	          tween1.splice(i, 1);
	          break;
	        }
	      }
	    }

	    schedule.tween = tween1;
	  };
	}

	function tweenFunction(id, name, value) {
	  var tween0, tween1;
	  if (typeof value !== "function") throw new Error();
	  return function () {
	    var schedule = set(this, id),
	        tween = schedule.tween;

	    // If this node shared tween with the previous node,
	    // just assign the updated shared tween and we’re done!
	    // Otherwise, copy-on-write.
	    if (tween !== tween0) {
	      tween1 = (tween0 = tween).slice();
	      for (var t = { name: name, value: value }, i = 0, n = tween1.length; i < n; ++i) {
	        if (tween1[i].name === name) {
	          tween1[i] = t;
	          break;
	        }
	      }
	      if (i === n) tween1.push(t);
	    }

	    schedule.tween = tween1;
	  };
	}

	function transition_tween (name, value) {
	  var id = this._id;

	  name += "";

	  if (arguments.length < 2) {
	    var tween = get(this.node(), id).tween;
	    for (var i = 0, n = tween.length, t; i < n; ++i) {
	      if ((t = tween[i]).name === name) {
	        return t.value;
	      }
	    }
	    return null;
	  }

	  return this.each((value == null ? tweenRemove : tweenFunction)(id, name, value));
	}

	function tweenValue(transition, name, value) {
	  var id = transition._id;

	  transition.each(function () {
	    var schedule = set(this, id);
	    (schedule.value || (schedule.value = {}))[name] = value.apply(this, arguments);
	  });

	  return function (node) {
	    return get(node, id).value[name];
	  };
	}

	function interpolate (a, b) {
	    var c;
	    return (typeof b === "number" ? number$2 : b instanceof color ? rgb : (c = color(b)) ? (b = c, rgb) : string)(a, b);
	}

	function attrRemove(name) {
	  return function () {
	    this.removeAttribute(name);
	  };
	}

	function attrRemoveNS(fullname) {
	  return function () {
	    this.removeAttributeNS(fullname.space, fullname.local);
	  };
	}

	function attrConstant(name, interpolate, value1) {
	  var value00, interpolate0;
	  return function () {
	    var value0 = this.getAttribute(name);
	    return value0 === value1 ? null : value0 === value00 ? interpolate0 : interpolate0 = interpolate(value00 = value0, value1);
	  };
	}

	function attrConstantNS(fullname, interpolate, value1) {
	  var value00, interpolate0;
	  return function () {
	    var value0 = this.getAttributeNS(fullname.space, fullname.local);
	    return value0 === value1 ? null : value0 === value00 ? interpolate0 : interpolate0 = interpolate(value00 = value0, value1);
	  };
	}

	function attrFunction(name, interpolate, value) {
	  var value00, value10, interpolate0;
	  return function () {
	    var value0,
	        value1 = value(this);
	    if (value1 == null) return void this.removeAttribute(name);
	    value0 = this.getAttribute(name);
	    return value0 === value1 ? null : value0 === value00 && value1 === value10 ? interpolate0 : interpolate0 = interpolate(value00 = value0, value10 = value1);
	  };
	}

	function attrFunctionNS(fullname, interpolate, value) {
	  var value00, value10, interpolate0;
	  return function () {
	    var value0,
	        value1 = value(this);
	    if (value1 == null) return void this.removeAttributeNS(fullname.space, fullname.local);
	    value0 = this.getAttributeNS(fullname.space, fullname.local);
	    return value0 === value1 ? null : value0 === value00 && value1 === value10 ? interpolate0 : interpolate0 = interpolate(value00 = value0, value10 = value1);
	  };
	}

	function transition_attr (name, value) {
	  var fullname = namespace(name),
	      i = fullname === "transform" ? interpolateTransformSvg : interpolate;
	  return this.attrTween(name, typeof value === "function" ? (fullname.local ? attrFunctionNS : attrFunction)(fullname, i, tweenValue(this, "attr." + name, value)) : value == null ? (fullname.local ? attrRemoveNS : attrRemove)(fullname) : (fullname.local ? attrConstantNS : attrConstant)(fullname, i, value));
	}

	function attrTweenNS(fullname, value) {
	  function tween() {
	    var node = this,
	        i = value.apply(node, arguments);
	    return i && function (t) {
	      node.setAttributeNS(fullname.space, fullname.local, i(t));
	    };
	  }
	  tween._value = value;
	  return tween;
	}

	function attrTween(name, value) {
	  function tween() {
	    var node = this,
	        i = value.apply(node, arguments);
	    return i && function (t) {
	      node.setAttribute(name, i(t));
	    };
	  }
	  tween._value = value;
	  return tween;
	}

	function transition_attrTween (name, value) {
	  var key = "attr." + name;
	  if (arguments.length < 2) return (key = this.tween(key)) && key._value;
	  if (value == null) return this.tween(key, null);
	  if (typeof value !== "function") throw new Error();
	  var fullname = namespace(name);
	  return this.tween(key, (fullname.local ? attrTweenNS : attrTween)(fullname, value));
	}

	function delayFunction(id, value) {
	  return function () {
	    init(this, id).delay = +value.apply(this, arguments);
	  };
	}

	function delayConstant(id, value) {
	  return value = +value, function () {
	    init(this, id).delay = value;
	  };
	}

	function transition_delay (value) {
	  var id = this._id;

	  return arguments.length ? this.each((typeof value === "function" ? delayFunction : delayConstant)(id, value)) : get(this.node(), id).delay;
	}

	function durationFunction(id, value) {
	  return function () {
	    set(this, id).duration = +value.apply(this, arguments);
	  };
	}

	function durationConstant(id, value) {
	  return value = +value, function () {
	    set(this, id).duration = value;
	  };
	}

	function transition_duration (value) {
	  var id = this._id;

	  return arguments.length ? this.each((typeof value === "function" ? durationFunction : durationConstant)(id, value)) : get(this.node(), id).duration;
	}

	function easeConstant(id, value) {
	  if (typeof value !== "function") throw new Error();
	  return function () {
	    set(this, id).ease = value;
	  };
	}

	function transition_ease (value) {
	  var id = this._id;

	  return arguments.length ? this.each(easeConstant(id, value)) : get(this.node(), id).ease;
	}

	function transition_filter (match) {
	  if (typeof match !== "function") match = matcher$1(match);

	  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
	      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
	        subgroup[i] = node;
	      }
	    }
	  }

	  return new Transition(subgroups, this._parents, this._name, this._id);
	}

	function transition_merge (transition) {
	  if (transition._id !== this._id) throw new Error();

	  for (var groups0 = this._groups, groups1 = transition._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
	    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
	      if (node = group0[i] || group1[i]) {
	        merge[i] = node;
	      }
	    }
	  }

	  for (; j < m0; ++j) {
	    merges[j] = groups0[j];
	  }

	  return new Transition(merges, this._parents, this._name, this._id);
	}

	function start(name) {
	  return (name + "").trim().split(/^|\s+/).every(function (t) {
	    var i = t.indexOf(".");
	    if (i >= 0) t = t.slice(0, i);
	    return !t || t === "start";
	  });
	}

	function onFunction(id, name, listener) {
	  var on0,
	      on1,
	      sit = start(name) ? init : set;
	  return function () {
	    var schedule = sit(this, id),
	        on = schedule.on;

	    // If this node shared a dispatch with the previous node,
	    // just assign the updated shared dispatch and we’re done!
	    // Otherwise, copy-on-write.
	    if (on !== on0) (on1 = (on0 = on).copy()).on(name, listener);

	    schedule.on = on1;
	  };
	}

	function transition_on (name, listener) {
	  var id = this._id;

	  return arguments.length < 2 ? get(this.node(), id).on.on(name) : this.each(onFunction(id, name, listener));
	}

	function removeFunction(id) {
	  return function () {
	    var parent = this.parentNode;
	    for (var i in this.__transition) {
	      if (+i !== id) return;
	    }if (parent) parent.removeChild(this);
	  };
	}

	function transition_remove () {
	  return this.on("end.remove", removeFunction(this._id));
	}

	function transition_select (select) {
	  var name = this._name,
	      id = this._id;

	  if (typeof select !== "function") select = selector(select);

	  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
	      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
	        if ("__data__" in node) subnode.__data__ = node.__data__;
	        subgroup[i] = subnode;
	        schedule(subgroup[i], name, id, i, subgroup, get(node, id));
	      }
	    }
	  }

	  return new Transition(subgroups, this._parents, name, id);
	}

	function transition_selectAll (select) {
	  var name = this._name,
	      id = this._id;

	  if (typeof select !== "function") select = selectorAll(select);

	  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
	      if (node = group[i]) {
	        for (var children = select.call(node, node.__data__, i, group), child, inherit = get(node, id), k = 0, l = children.length; k < l; ++k) {
	          if (child = children[k]) {
	            schedule(child, name, id, k, children, inherit);
	          }
	        }
	        subgroups.push(children);
	        parents.push(node);
	      }
	    }
	  }

	  return new Transition(subgroups, parents, name, id);
	}

	var Selection$1 = selection.prototype.constructor;

	function transition_selection () {
	  return new Selection$1(this._groups, this._parents);
	}

	function styleRemove(name, interpolate) {
	    var value00, value10, interpolate0;
	    return function () {
	        var style = defaultView(this).getComputedStyle(this, null),
	            value0 = style.getPropertyValue(name),
	            value1 = (this.style.removeProperty(name), style.getPropertyValue(name));
	        return value0 === value1 ? null : value0 === value00 && value1 === value10 ? interpolate0 : interpolate0 = interpolate(value00 = value0, value10 = value1);
	    };
	}

	function styleRemoveEnd(name) {
	    return function () {
	        this.style.removeProperty(name);
	    };
	}

	function styleConstant(name, interpolate, value1) {
	    var value00, interpolate0;
	    return function () {
	        var value0 = defaultView(this).getComputedStyle(this, null).getPropertyValue(name);
	        return value0 === value1 ? null : value0 === value00 ? interpolate0 : interpolate0 = interpolate(value00 = value0, value1);
	    };
	}

	function styleFunction(name, interpolate, value) {
	    var value00, value10, interpolate0;
	    return function () {
	        var style = defaultView(this).getComputedStyle(this, null),
	            value0 = style.getPropertyValue(name),
	            value1 = value(this);
	        if (value1 == null) value1 = (this.style.removeProperty(name), style.getPropertyValue(name));
	        return value0 === value1 ? null : value0 === value00 && value1 === value10 ? interpolate0 : interpolate0 = interpolate(value00 = value0, value10 = value1);
	    };
	}

	function transition_style (name, value, priority) {
	    var i = (name += "") === "transform" ? interpolateTransformCss : interpolate;
	    return value == null ? this.styleTween(name, styleRemove(name, i)).on("end.style." + name, styleRemoveEnd(name)) : this.styleTween(name, typeof value === "function" ? styleFunction(name, i, tweenValue(this, "style." + name, value)) : styleConstant(name, i, value), priority);
	}

	function styleTween(name, value, priority) {
	  function tween() {
	    var node = this,
	        i = value.apply(node, arguments);
	    return i && function (t) {
	      node.style.setProperty(name, i(t), priority);
	    };
	  }
	  tween._value = value;
	  return tween;
	}

	function transition_styleTween (name, value, priority) {
	  var key = "style." + (name += "");
	  if (arguments.length < 2) return (key = this.tween(key)) && key._value;
	  if (value == null) return this.tween(key, null);
	  if (typeof value !== "function") throw new Error();
	  return this.tween(key, styleTween(name, value, priority == null ? "" : priority));
	}

	function textConstant(value) {
	  return function () {
	    this.textContent = value;
	  };
	}

	function textFunction(value) {
	  return function () {
	    var value1 = value(this);
	    this.textContent = value1 == null ? "" : value1;
	  };
	}

	function transition_text (value) {
	  return this.tween("text", typeof value === "function" ? textFunction(tweenValue(this, "text", value)) : textConstant(value == null ? "" : value + ""));
	}

	function transition_transition () {
	  var name = this._name,
	      id0 = this._id,
	      id1 = newId();

	  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
	      if (node = group[i]) {
	        var inherit = get(node, id0);
	        schedule(node, name, id1, i, group, {
	          time: inherit.time + inherit.delay + inherit.duration,
	          delay: 0,
	          duration: inherit.duration,
	          ease: inherit.ease
	        });
	      }
	    }
	  }

	  return new Transition(groups, this._parents, name, id1);
	}

	var id = 0;

	function Transition(groups, parents, name, id) {
	  this._groups = groups;
	  this._parents = parents;
	  this._name = name;
	  this._id = id;
	}

	function transition(name) {
	  return selection().transition(name);
	}

	function newId() {
	  return ++id;
	}

	var selection_prototype = selection.prototype;

	Transition.prototype = transition.prototype = {
	  constructor: Transition,
	  select: transition_select,
	  selectAll: transition_selectAll,
	  filter: transition_filter,
	  merge: transition_merge,
	  selection: transition_selection,
	  transition: transition_transition,
	  call: selection_prototype.call,
	  nodes: selection_prototype.nodes,
	  node: selection_prototype.node,
	  size: selection_prototype.size,
	  empty: selection_prototype.empty,
	  each: selection_prototype.each,
	  on: transition_on,
	  attr: transition_attr,
	  attrTween: transition_attrTween,
	  style: transition_style,
	  styleTween: transition_styleTween,
	  text: transition_text,
	  remove: transition_remove,
	  tween: transition_tween,
	  delay: transition_delay,
	  duration: transition_duration,
	  ease: transition_ease
	};

	function cubicInOut(t) {
	  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
	}

	var exponent = 3;

	var polyIn = function custom(e) {
	  e = +e;

	  function polyIn(t) {
	    return Math.pow(t, e);
	  }

	  polyIn.exponent = custom;

	  return polyIn;
	}(exponent);

	var polyOut = function custom(e) {
	  e = +e;

	  function polyOut(t) {
	    return 1 - Math.pow(1 - t, e);
	  }

	  polyOut.exponent = custom;

	  return polyOut;
	}(exponent);

	var polyInOut = function custom(e) {
	  e = +e;

	  function polyInOut(t) {
	    return ((t *= 2) <= 1 ? Math.pow(t, e) : 2 - Math.pow(2 - t, e)) / 2;
	  }

	  polyInOut.exponent = custom;

	  return polyInOut;
	}(exponent);

	var overshoot = 1.70158;

	var backIn = function custom(s) {
	  s = +s;

	  function backIn(t) {
	    return t * t * ((s + 1) * t - s);
	  }

	  backIn.overshoot = custom;

	  return backIn;
	}(overshoot);

	var backOut = function custom(s) {
	  s = +s;

	  function backOut(t) {
	    return --t * t * ((s + 1) * t + s) + 1;
	  }

	  backOut.overshoot = custom;

	  return backOut;
	}(overshoot);

	var backInOut = function custom(s) {
	  s = +s;

	  function backInOut(t) {
	    return ((t *= 2) < 1 ? t * t * ((s + 1) * t - s) : (t -= 2) * t * ((s + 1) * t + s) + 2) / 2;
	  }

	  backInOut.overshoot = custom;

	  return backInOut;
	}(overshoot);

	var tau = 2 * Math.PI;
	var amplitude = 1;
	var period = 0.3;
	var elasticIn = function custom(a, p) {
	  var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);

	  function elasticIn(t) {
	    return a * Math.pow(2, 10 * --t) * Math.sin((s - t) / p);
	  }

	  elasticIn.amplitude = function (a) {
	    return custom(a, p * tau);
	  };
	  elasticIn.period = function (p) {
	    return custom(a, p);
	  };

	  return elasticIn;
	}(amplitude, period);

	var elasticOut = function custom(a, p) {
	  var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);

	  function elasticOut(t) {
	    return 1 - a * Math.pow(2, -10 * (t = +t)) * Math.sin((t + s) / p);
	  }

	  elasticOut.amplitude = function (a) {
	    return custom(a, p * tau);
	  };
	  elasticOut.period = function (p) {
	    return custom(a, p);
	  };

	  return elasticOut;
	}(amplitude, period);

	var elasticInOut = function custom(a, p) {
	  var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);

	  function elasticInOut(t) {
	    return ((t = t * 2 - 1) < 0 ? a * Math.pow(2, 10 * t) * Math.sin((s - t) / p) : 2 - a * Math.pow(2, -10 * t) * Math.sin((s + t) / p)) / 2;
	  }

	  elasticInOut.amplitude = function (a) {
	    return custom(a, p * tau);
	  };
	  elasticInOut.period = function (p) {
	    return custom(a, p);
	  };

	  return elasticInOut;
	}(amplitude, period);

	var defaultTiming = {
	  time: null, // Set on use.
	  delay: 0,
	  duration: 250,
	  ease: cubicInOut
	};

	function inherit(node, id) {
	  var timing;
	  while (!(timing = node.__transition) || !(timing = timing[id])) {
	    if (!(node = node.parentNode)) {
	      return defaultTiming.time = now(), defaultTiming;
	    }
	  }
	  return timing;
	}

	function selection_transition (name) {
	  var id, timing;

	  if (name instanceof Transition) {
	    id = name._id, name = name._name;
	  } else {
	    id = newId(), (timing = defaultTiming).time = now(), name = name == null ? null : name + "";
	  }

	  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
	      if (node = group[i]) {
	        schedule(node, name, id, i, group, timing || inherit(node, id));
	      }
	    }
	  }

	  return new Transition(groups, this._parents, name, id);
	}

	selection.prototype.interrupt = selection_interrupt;
	selection.prototype.transition = selection_transition;

	function ascending (a, b) {
	  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
	}

	function bisector (compare) {
	  if (compare.length === 1) compare = ascendingComparator(compare);
	  return {
	    left: function left(a, x, lo, hi) {
	      if (lo == null) lo = 0;
	      if (hi == null) hi = a.length;
	      while (lo < hi) {
	        var mid = lo + hi >>> 1;
	        if (compare(a[mid], x) < 0) lo = mid + 1;else hi = mid;
	      }
	      return lo;
	    },
	    right: function right(a, x, lo, hi) {
	      if (lo == null) lo = 0;
	      if (hi == null) hi = a.length;
	      while (lo < hi) {
	        var mid = lo + hi >>> 1;
	        if (compare(a[mid], x) > 0) hi = mid;else lo = mid + 1;
	      }
	      return lo;
	    }
	  };
	}

	function ascendingComparator(f) {
	  return function (d, x) {
	    return ascending(f(d), x);
	  };
	}

	var ascendingBisect = bisector(ascending);

	function d3Max (array, f) {
	  var i = -1,
	      n = array.length,
	      a,
	      b;

	  if (f == null) {
	    while (++i < n) {
	      if ((b = array[i]) != null && b >= b) {
	        a = b;break;
	      }
	    }while (++i < n) {
	      if ((b = array[i]) != null && b > a) a = b;
	    }
	  } else {
	    while (++i < n) {
	      if ((b = f(array[i], i, array)) != null && b >= b) {
	        a = b;break;
	      }
	    }while (++i < n) {
	      if ((b = f(array[i], i, array)) != null && b > a) a = b;
	    }
	  }

	  return a;
	}

	function min (array, f) {
	  var i = -1,
	      n = array.length,
	      a,
	      b;

	  if (f == null) {
	    while (++i < n) {
	      if ((b = array[i]) != null && b >= b) {
	        a = b;break;
	      }
	    }while (++i < n) {
	      if ((b = array[i]) != null && a > b) a = b;
	    }
	  } else {
	    while (++i < n) {
	      if ((b = f(array[i], i, array)) != null && b >= b) {
	        a = b;break;
	      }
	    }while (++i < n) {
	      if ((b = f(array[i], i, array)) != null && a > b) a = b;
	    }
	  }

	  return a;
	}

	function d3Sum (array, f) {
	  var s = 0,
	      n = array.length,
	      a,
	      i = -1;

	  if (f == null) {
	    while (++i < n) {
	      if (a = +array[i]) s += a;
	    } // Note: zero and null are equivalent.
	  } else {
	      while (++i < n) {
	        if (a = +f(array[i], i, array)) s += a;
	      }
	    }

	  return s;
	}

	/**
	    Wraps non-function variables in a simple return function.
	    @private
	*/
	function constant (x) {
	  return function constant() {
	    return x;
	  };
	}

	/**
	    @function width
	    @desc Given a text string, returns the predicted pixel width of the string when placed into DOM.
	    @param {String|Array} text Can be either a single string or an array of strings to analyze.
	    @param {Object} [style] An object of CSS font styles to apply. Accepts any of the valid [CSS font property](http://www.w3schools.com/cssref/pr_font_font.asp) values.
	*/
	function measure (text) {
	  var style = arguments.length <= 1 || arguments[1] === undefined ? { "font-size": 10, "font-family": "sans-serif" } : arguments[1];

	  var canvas = select("body").selectAll("canvas#d3plus-text-size").data([0]);

	  var context = canvas.enter().append("canvas").attr("id", "d3plus-text-size").style("position", "absolute").style("left", "-9999px").style("top", "-9999px").style("visibility", "hidden").style("display", "block").merge(canvas).node().getContext("2d");

	  var font = [];
	  if ("font-style" in style) font.push(style["font-style"]);
	  if ("font-variant" in style) font.push(style["font-variant"]);
	  if ("font-weight" in style) font.push(style["font-weight"]);
	  if ("font-size" in style) {
	    var s = style["font-size"] + "px";
	    if ("line-height" in style) s += "/" + style["line-height"] + "px";
	    font.push(s);
	  }
	  if ("font-family" in style) font.push(style["font-family"]);

	  context.font = font.join(" ");

	  if (text instanceof Array) return text.map(function (t) {
	    return context.measureText(t).width;
	  });
	  return context.measureText(text).width;
	}

	var d3 = {
	  "max": d3Max,
	  "min": min,
	  "select": select,
	  "sum": d3Sum,
	  "transition": transition
	};

	/**
	    The default height accessor function.
	    @private
	*/
	function boxHeight(d) {
	  return d.height || 200;
	}

	/**
	    The default id accessor function.
	    @private
	*/
	function boxId(d, i) {
	  return d.id || "" + i;
	}

	var splitChars = ["-", "/", ";", ":", "&"];
	var splitRegex = new RegExp("[^\\s\\" + splitChars.join("\\") + "]+\\" + splitChars.join("?\\") + "?", "g");
	/**
	    The default word split function.
	    @private
	*/
	function boxSplit(_) {
	  return _.match(splitRegex);
	}

	/**
	    The default text accessor function.
	    @private
	*/
	function boxText(d) {
	  return d.text;
	}

	/**
	    The default width accessor function.
	    @private
	*/
	function boxWidth(d) {
	  return d.width || 200;
	}

	/**
	    The default x accessor function.
	    @private
	*/
	function boxX(d) {
	  return d.x || 0;
	}

	/**
	    The default y accessor function.
	    @private
	*/
	function boxY(d) {
	  return d.y || 0;
	}

	/**
	    @function box
	    @desc Creates a wrapped text box based on an array of data. If *data* is specified, immediately wraps the text based on the specified array and returns this box generator. If *data* is not specified on instantiation, it can be passed/updated after instantiation using the [data](#box.data) method.
	    @param {Array} [data = []]
	    @example <caption>a sample row of data</caption>
	var data = {"text": "Hello D3plus, please wrap this sentence for me."};
	@example <caption>passed to the generator</caption>
	box([data]);
	@example <caption>creates the following</caption>
	<text class="d3plus-text-box" id="d3plus-text-box-0" text-anchor="start" font-family="Helvetica Neue" font-size="16px" transform="translate(0,-3.6)">
	  <tspan dominant-baseline="alphabetic" opacity="1" x="0px" dx="0px" dy="18px" style="baseline-shift: 0%;">
	    Hello D3plus, please wrap
	  </tspan>
	  <tspan dominant-baseline="alphabetic" opacity="1" x="0px" dx="0px" dy="18px" style="baseline-shift: 0%;">
	    this sentence for me.
	  </tspan>
	</text>
	*/
	function box () {
	  var data = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

	  /**
	      The default ellipsis function.
	      @private
	  */
	  function boxEllipsis(_) {
	    return _ + "...";
	  }

	  var delay = 0,
	      duration = 0,
	      ellipsis = boxEllipsis,
	      fontColor = undefined,
	      fontFamily = undefined,
	      fontMax = constant(50),
	      fontMin = constant(8),
	      fontResize = constant(false),
	      fontSize = undefined,
	      height = boxHeight,
	      id = boxId,
	      lineHeight = undefined,
	      overflow = constant(false),
	      select = undefined,
	      split = boxSplit,
	      text = boxText,
	      textAnchor = constant("start"),
	      verticalAlign = constant("top"),
	      width = boxWidth,
	      x = boxX,
	      y = boxY;

	  /**
	      The inner return object and draw function that gets assigned the public methods.
	      @private
	  */
	  function box() {

	    if (select === void 0) box.select(d3.select("body").append("svg").style("width", window.innerWidth + "px").style("height", window.innerHeight + "px").node());

	    var boxes = select.selectAll(".d3plus-text-box").data(data, id);

	    boxes.exit().remove();

	    boxes.enter().append("text").attr("class", "d3plus-text-box").attr("id", function (d, i) {
	      return "d3plus-text-box-" + id(d, i);
	    }).merge(boxes).attr("y", function (d, i) {
	      return y(d, i) + "px";
	    }).attr("fill", function (d, i) {
	      return fontColor(d, i);
	    }).attr("text-anchor", function (d, i) {
	      return textAnchor(d, i);
	    }).attr("font-family", function (d, i) {
	      return fontFamily(d, i);
	    }).each(function (d, i) {

	      var resize = fontResize(d, i);

	      var fS = resize ? fontMax(d, i) : fontSize(d, i),
	          lH = resize ? fS * 1.1 : lineHeight(d, i),
	          line = 1,
	          lineData = [""],
	          sizes = undefined;

	      var style = {
	        "font-family": fontFamily(d, i),
	        "font-size": fS,
	        "line-height": lH
	      };

	      var fMax = fontMax(d, i),
	          fMin = fontMin(d, i),
	          h = height(d, i),
	          oF = overflow(d, i),
	          space = measure(" ", style),
	          t = text(d, i),
	          tA = textAnchor(d, i),
	          vA = verticalAlign(d, i),
	          w = width(d, i),
	          words = split(t, i);

	      var dx = tA === "start" ? 0 : tA === "end" ? w : w / 2;

	      /**
	          Figures out the lineData to be used for wrapping.
	          @private
	      */
	      function checkSize() {

	        line = 1;
	        lineData = [""];

	        if (fS < fMin) {
	          lineData = [];
	          return;
	        } else if (fS > fMax) fS = fMax;

	        var textProg = "",
	            widthProg = 0;

	        if (resize) {
	          lH = fS * 1.1;
	          style["font-size"] = fS;
	          style["line-height"] = lH;
	        }

	        sizes = measure(words, style);

	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;

	        try {
	          for (var _iterator = words[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var word = _step.value;

	            var nextChar = t.charAt(textProg.length + word.length),
	                wordWidth = sizes[words.indexOf(word)];
	            if (nextChar === " ") word += nextChar;
	            if (widthProg + wordWidth > w - fS) {
	              line++;
	              if (lH * line > h || wordWidth > w && !oF) {
	                if (resize) {
	                  fS--;
	                  if (fS < fMin) {
	                    lineData = [];
	                    break;
	                  }
	                  checkSize();
	                } else lineData[line - 2] = ellipsis(lineData[line - 2].trimRight());
	                break;
	              }
	              widthProg = 0;
	              lineData.push(word);
	            } else lineData[line - 1] += word;
	            textProg += word;
	            widthProg += wordWidth;
	            if (nextChar === " ") widthProg += space;
	          }
	        } catch (err) {
	          _didIteratorError = true;
	          _iteratorError = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion && _iterator.return) {
	              _iterator.return();
	            }
	          } finally {
	            if (_didIteratorError) {
	              throw _iteratorError;
	            }
	          }
	        }
	      }

	      if (h > lH || resize) {

	        if (resize) {

	          sizes = measure(words, style);

	          var areaMod = 1.165 + w / h * 0.1,
	              boxArea = w * h,
	              maxWidth = d3.max(sizes),
	              textArea = d3.sum(sizes, function (d) {
	            return d * lH;
	          }) * areaMod;

	          if (maxWidth > w || textArea > boxArea) {
	            var areaRatio = Math.sqrt(boxArea / textArea),
	                widthRatio = w / maxWidth;
	            var sizeRatio = d3.min([areaRatio, widthRatio]);
	            fS = Math.floor(fS * sizeRatio);
	          }

	          var heightMax = Math.floor(h * 0.8);
	          if (fS > heightMax) fS = heightMax;
	        }

	        checkSize();

	        d3.select(this).attr("font-size", fS + "px").style("font-size", fS + "px");
	      }

	      var tH = line * lH;
	      var y = vA === "top" ? 0 : vA === "middle" ? h / 2 - tH / 2 : h - tH;
	      y -= lH * 0.2;

	      d3.select(this).transition().duration(duration).attr("transform", "translate(0," + y + ")");

	      /**
	          Styles to apply to each <tspan> element.
	          @private
	      */
	      function tspanStyle(tspan) {
	        tspan.text(function (d) {
	          return d.trimRight();
	        }).attr("x", x(d, i) + "px").attr("dx", dx + "px").attr("dy", lH + "px");
	      }

	      var tspans = d3.select(this).selectAll("tspan").data(lineData);

	      tspans.transition().duration(duration).call(tspanStyle);

	      tspans.exit().transition().duration(duration).attr("opacity", 0).remove();

	      tspans.enter().append("tspan").attr("dominant-baseline", "alphabetic").style("baseline-shift", "0%").attr("opacity", 0).call(tspanStyle).transition().duration(duration).delay(delay).attr("opacity", 1);
	    });

	    return box;
	  }

	  /**
	      @memberof box
	      @desc If *data* is specified, sets the data array to the specified array and returns this box generator. If *data* is not specified, returns the current data array. A text box will be drawn for each object in the array.
	      @param {Array} [*data* = []]
	  */
	  box.data = function (_) {
	    return arguments.length ? (data = _, box) : data;
	  };

	  /**
	      @memberof box
	      @desc If *value* is specified, sets the animation delay to the specified number and returns this box generator. If *value* is not specified, returns the current animation delay.
	      @param {Number} [*value* = 0]
	  */
	  box.delay = function (_) {
	    return arguments.length ? (delay = _, box) : delay;
	  };

	  /**
	      @memberof box
	      @desc If *value* is specified, sets the animation duration to the specified number and returns this box generator. If *value* is not specified, returns the current animation duration.
	      @param {Number} [*value* = 0]
	  */
	  box.duration = function (_) {
	    return arguments.length ? (duration = _, box) : duration;
	  };

	  /**
	      @memberof box
	      @desc If *value* is specified, sets the ellipsis method to the specified function or string and returns this box generator. If *value* is not specified, returns the current ellipsis method, which simply adds an ellipsis to the string by default.
	      @param {Function|String} [*value*]
	      @example
	  function(d) {
	  return d + "...";
	  }
	  */
	  box.ellipsis = function (_) {
	    return arguments.length ? (ellipsis = typeof _ === "function" ? _ : constant(_), box) : ellipsis;
	  };

	  /**
	      @memberof box
	      @desc If *value* is specified, sets the font color accessor to the specified function or string and returns this box generator. If *value* is not specified, returns the current font color accessor, which is inferred from the [container element](#box.select) by default.
	      @param {Function|String} [*value*]
	  */
	  box.fontColor = function (_) {
	    return arguments.length ? (fontColor = typeof _ === "function" ? _ : constant(_), box) : fontColor;
	  };

	  /**
	      @memberof box
	      @desc If *value* is specified, sets the font family accessor to the specified function or string and returns this box generator. If *value* is not specified, returns the current font family accessor, which is inferred from the [container element](#box.select) by default.
	      @param {Function|String} [*value*]
	  */
	  box.fontFamily = function (_) {
	    return arguments.length ? (fontFamily = typeof _ === "function" ? _ : constant(_), box) : fontFamily;
	  };

	  /**
	      @memberof box
	      @desc If *value* is specified, sets the maximum font size accessor to the specified function or number and returns this box generator. If *value* is not specified, returns the current maximum font size accessor. The maximum font size is used when [resizing fonts](#box.fontResize) dynamically.
	      @param {Function|Number} [*value* = 50]
	  */
	  box.fontMax = function (_) {
	    return arguments.length ? (fontMax = typeof _ === "function" ? _ : constant(_), box) : fontMax;
	  };

	  /**
	      @memberof box
	      @desc If *value* is specified, sets the minimum font size accessor to the specified function or number and returns this box generator. If *value* is not specified, returns the current minimum font size accessor. The minimum font size is used when [resizing fonts](#box.fontResize) dynamically.
	      @param {Function|Number} [*value* = 8]
	  */
	  box.fontMin = function (_) {
	    return arguments.length ? (fontMin = typeof _ === "function" ? _ : constant(_), box) : fontMin;
	  };

	  /**
	      @memberof box
	      @desc If *value* is specified, sets the font resizing accessor to the specified function or boolean and returns this box generator. If *value* is not specified, returns the current font resizing accessor.
	      @param {Function|Boolean} [*value* = false]
	  */
	  box.fontResize = function (_) {
	    return arguments.length ? (fontResize = typeof _ === "function" ? _ : constant(_), box) : fontResize;
	  };

	  /**
	      @memberof box
	      @desc If *value* is specified, sets the font size accessor to the specified function or number and returns this box generator. If *value* is not specified, returns the current font size accessor, which is inferred from the [container element](#box.select) by default.
	      @param {Function|Number} [*value*]
	  */
	  box.fontSize = function (_) {
	    if (arguments.length) {
	      fontSize = typeof _ === "function" ? _ : constant(_);
	      if (lineHeight === void 0) lineHeight = constant(Math.ceil(fontSize() * 1.1));
	      return box;
	    }
	    return fontSize;
	  };

	  /**
	      @memberof box
	      @desc If *value* is specified, sets the height accessor to the specified function or number and returns this box generator. If *value* is not specified, returns the current height accessor.
	      @param {Function|Number} [*value*]
	      @example
	  function(d) {
	  return d.height || 200;
	  }
	  */
	  box.height = function (_) {
	    return arguments.length ? (height = typeof _ === "function" ? _ : constant(_), box) : height;
	  };

	  /**
	      @memberof box
	      @desc If *value* is specified, sets the id accessor to the specified function or number and returns this box generator. If *value* is not specified, returns the current id accessor.
	      @param {Function|Number} [*value*]
	      @example
	  function(d, i) {
	  return d.id || i + "";
	  }
	  */
	  box.id = function (_) {
	    return arguments.length ? (id = typeof _ === "function" ? _ : constant(_), box) : id;
	  };

	  /**
	      @memberof box
	      @desc If *value* is specified, sets the line height accessor to the specified function or number and returns this box generator. If *value* is not specified, returns the current line height accessor, which is 1.1 times the [font size](#box.fontSize) by default.
	      @param {Function|Number} [*value*]
	  */
	  box.lineHeight = function (_) {
	    return arguments.length ? (lineHeight = typeof _ === "function" ? _ : constant(_), box) : lineHeight;
	  };

	  /**
	      @memberof box
	      @desc If *value* is specified, sets the overflow accessor to the specified function or boolean and returns this box generator. If *value* is not specified, returns the current overflow accessor.
	      @param {Function|Boolean} [*value* = false]
	  */
	  box.overflow = function (_) {
	    return arguments.length ? (overflow = typeof _ === "function" ? _ : constant(_), box) : overflow;
	  };

	  /**
	      @memberof box
	      @desc If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns this box generator. If *selector* is not specified, returns the current SVG container element, which adds an SVG element to the page by default.
	      @param {String|HTMLElement} [*selector*]
	  */
	  box.select = function (_) {
	    if (arguments.length) {
	      select = d3.select(_);
	      if (fontColor === void 0) box.fontColor(select.style("font-color"));
	      if (fontFamily === void 0) box.fontFamily(select.style("font-family"));
	      if (fontSize === void 0) box.fontSize(parseFloat(select.style("font-size"), 10));
	      return box;
	    }
	    return select;
	  };

	  /**
	      @memberof box
	      @desc If *value* is specified, sets the word split function to the specified function and returns this box generator. If *value* is not specified, returns the current word split function.
	      @param {Function} [*value*] A function that, when passed a string, is expected to return that string split into an array of words to wrap. The default split function splits strings on the following characters: `-`, `/`, `;`, `:`, `&`
	  */
	  box.split = function (_) {
	    return arguments.length ? (split = _, box) : split;
	  };

	  /**
	      @memberof box
	      @desc If *value* is specified, sets the text accessor to the specified function or string and returns this box generator. If *value* is not specified, returns the current text accessor.
	      @param {Function|String} [*value*]
	      @example
	  function(d) {
	  return d.text;
	  }
	  */
	  box.text = function (_) {
	    return arguments.length ? (text = typeof _ === "function" ? _ : constant(_), box) : text;
	  };

	  /**
	      @memberof box
	      @desc If *value* is specified, sets the horizontal text anchor accessor to the specified function or string and returns this box generator. If *value* is not specified, returns the current horizontal text anchor accessor.
	      @param {Function|String} [*value* = "start"] Analagous to the SVG [text-anchor](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/text-anchor) property.
	  */
	  box.textAnchor = function (_) {
	    return arguments.length ? (textAnchor = typeof _ === "function" ? _ : constant(_), box) : textAnchor;
	  };

	  /**
	      @memberof box
	      @desc If *value* is specified, sets the vertical alignment accessor to the specified function or string and returns this box generator. If *value* is not specified, returns the current vertical alignment accessor.
	      @param {Function|String} [*value* = "top"] Accepts `"top"`, `"middle"`, and `"bottom"`.
	  */
	  box.verticalAlign = function (_) {
	    return arguments.length ? (verticalAlign = typeof _ === "function" ? _ : constant(_), box) : verticalAlign;
	  };

	  /**
	      @memberof box
	      @desc If *value* is specified, sets the width accessor to the specified function or number and returns this box generator. If *value* is not specified, returns the current width accessor.
	      @param {Function|Number} [*value*]
	      @example
	  function(d) {
	  return d.width || 200;
	  }
	  */
	  box.width = function (_) {
	    return arguments.length ? (width = typeof _ === "function" ? _ : constant(_), box) : width;
	  };

	  /**
	      @memberof box
	      @desc If *value* is specified, sets the x accessor to the specified function or number and returns this box generator. If *value* is not specified, returns the current x accessor. The number returned should correspond to the left position of the box.
	      @param {Function|Number} [*value*]
	      @example
	  function(d) {
	  return d.x || 0;
	  }
	  */
	  box.x = function (_) {
	    return arguments.length ? (x = typeof _ === "function" ? _ : constant(_), box) : x;
	  };

	  /**
	      @memberof box
	      @desc If *value* is specified, sets the y accessor to the specified function or number and returns this box generator. If *value* is not specified, returns the current y accessor. The number returned should correspond to the top position of the box.
	      @param {Function|Number} [*value*]
	      @example
	  function(d) {
	  return d.y || 0;
	  }
	  */
	  box.y = function (_) {
	    return arguments.length ? (y = typeof _ === "function" ? _ : constant(_), box) : y;
	  };

	  return data.length ? box() : box;
	}

	exports.version = version;
	exports.box = box;
	exports.width = measure;

}));