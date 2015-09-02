'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsInitStateHolder = require("../utils/initStateHolder");

var _events = require('events');

var _utilsCheck = require('../utils/check');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var log = false;

var createView = function createView(eventBus, initialState) {
  for (var _len = arguments.length, listenedEventNamesAndActions = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    listenedEventNamesAndActions[_key - 2] = arguments[_key];
  }

  var freeze = (0, _utilsInitStateHolder.initStateHolder)(listenedEventNamesAndActions);
  _utilsCheck.check.notNull({ 'eventBus': eventBus });

  var messageEmitter = new _events.EventEmitter();
  var state = freeze(initialState);

  listenedEventNamesAndActions.forEach(function (actionAndName) {
    var name = actionAndName.name;
    var action = actionAndName.action;

    if (log) console.log('about to register name ' + name + " and action " + action);

    eventBus.subscribe(name, function (event) {
      var newState = freeze(action(event, state));
      if (newState !== state) {
        state = newState;
        messageEmitter.emit('change', state);
      } else if (log) {
        console.log("No change detected. Previous state '", state, "', new state '", newState, "'");
      }
    });
  });

  messageEmitter.on('addSubscriber', function (cbk) {
    if (log) {
      console.log("about to subscribe '" + cbk + "'");
    }
    messageEmitter.on('change', cbk);
    cbk(state);
  });

  return function (cbk) {
    var effectiveCallback = function effectiveCallback(state) {
      return cbk(state);
    };
    messageEmitter.emit('addSubscriber', effectiveCallback);
    return function (cb) {
      if (log) {
        console.log("about to remove '" + effectiveCallback + "'");
      }
      messageEmitter.removeListener('change', effectiveCallback);
      cb();
    };
  };
};
exports.createView = createView;
//# sourceMappingURL=createView.js.map