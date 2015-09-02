'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _ObjectUtils = require("./ObjectUtils");

var Check = (function () {
  function Check() {
    _classCallCheck(this, Check);
  }

  _createClass(Check, [{
    key: "notNull",
    value: function notNull(parameters) {
      if (parameters == null) {
        throw new Error("Null object parameters given ");
      }
      if (_lodash2["default"].some(parameters, function (n) {
        return n == null;
      })) {
        var result = _lodash2["default"].reduce(parameters, function (result, n, key) {
          var currentValue = _ObjectUtils.ObjectUtils.toString(key) + "/" + n;
          if (typeof result === 'string') {
            result = result + ", " + currentValue;
          } else {
            result = "parameter key/values: " + currentValue;
          }
          return result;
        }, {});
        throw new Error("One of more null parameters in " + result);
      }
    }
  }, {
    key: "true",
    value: function _true(description, truthyFunction) {
      this.notNull({ 'description': description, 'truthyFunction': truthyFunction });
      if (truthyFunction() == false) {
        throw new Error(_ObjectUtils.ObjectUtils.toString(description));
      }
    }
  }]);

  return Check;
})();

var check = new Check();
exports.check = check;
//# sourceMappingURL=check.js.map