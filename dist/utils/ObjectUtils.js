'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _check = require('./check');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var ObjectUtils = (function () {
  function ObjectUtils() {
    _classCallCheck(this, ObjectUtils);
  }

  _createClass(ObjectUtils, null, [{
    key: 'freeze',
    value: function freeze(obj) {
      return Object.freeze(obj);
    }
  }, {
    key: 'freezeDeep',
    value: function freezeDeep(obj) {
      if (obj != null) {
        var propNames = Object.getOwnPropertyNames(obj);
        propNames.forEach(function (name) {
          var prop = obj[name];
          if (typeof prop == 'object' && !Object.isFrozen(prop)) ObjectUtils.freezeDeep(prop);
        });
      }
      return Object.freeze(obj);
    }
  }, {
    key: 'createMutableClone',
    value: function createMutableClone(state) {
      return _lodash2['default'].cloneDeep(state);
    }
  }, {
    key: 'toString',
    value: function toString(message) {
      if (message instanceof Function) {
        return message();
      } else {
        return message;
      }
    }
  }]);

  return ObjectUtils;
})();

exports.ObjectUtils = ObjectUtils;
//# sourceMappingURL=ObjectUtils.js.map