var _classNameSet = new Set();
var ClassNames = [];
ClassNames._set = _classNameSet;
ClassNames._has = function(n) { return _classNameSet.has(n); };
ClassNames._add = function(n) { _classNameSet.add(n); ClassNames.push(n); };

export default {
  renderQueues: [],
  tempModuleLoadQueue: [],
  ClassNames: ClassNames,
  CSSCache: {},
  WidgetCache: {},
  PageCache: [],
  EventCache: [],
};
