'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _events = require('events');

var _checkCheck = require('../check/check');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var log = false;

var View = (function () {
  function View(eventBus) {
    for (var _len = arguments.length, listenedEventTypesAndActions = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      listenedEventTypesAndActions[_key - 1] = arguments[_key];
    }

    _classCallCheck(this, View);

    _checkCheck.check.notNull({ 'eventBus': eventBus });
    _checkCheck.check['true']("listenedEventTypesAndActions should contain at least one type and action", function () {
      return listenedEventTypesAndActions != null && listenedEventTypesAndActions.length != 0;
    });

    var view = this;
    _lodash2['default'].forEach(listenedEventTypesAndActions, function (actionAndType) {
      var type = actionAndType.type;
      var action = actionAndType.action;

      if (log) console.log('about to register type ' + type + " and action " + action);

      _checkCheck.check['true']("type and action both present", function () {
        return typeof type === "string" && action instanceof Function;
      });

      eventBus.subscribe(type, function (message) {
        action.call(null, message, view);
        view.changed();
      });
    });
    this.messageEmitter = new _events.EventEmitter();
  }

  _createClass(View, [{
    key: 'changed',
    value: function changed() {
      this.messageEmitter.emit('change');
    }
  }, {
    key: 'watch',
    value: function watch(cbk) {
      var _this = this;

      this.messageEmitter.on('change', cbk);
      return function () {
        return _this.messageEmitter.removeListener('change', cbk);
      };
    }
  }]);

  return View;
})();

exports.View = View;
//# sourceMappingURL=View.js.map