'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _ObjectUtils = require('./ObjectUtils');

var _check = require('./check');

var initStateHolder = function initStateHolder(listenedNamesAndActions) {
  _check.check['true']("listenedNamesAndActions should contain at least one name and action", function () {
    return listenedNamesAndActions != null && listenedNamesAndActions.length != 0;
  });

  listenedNamesAndActions.forEach(function (actionAndName) {
    var name = actionAndName.name;
    var action = actionAndName.action;

    _check.check['true']("Name missing", function () {
      return typeof name === "string";
    });

    _check.check['true']("Action missing for name '" + name + "'", function () {
      return action instanceof Function;
    });
  });
  return function (state) {
    return _ObjectUtils.ObjectUtils.freezeDeep(state);
  };
};
exports.initStateHolder = initStateHolder;
//# sourceMappingURL=initStateHolder.js.map