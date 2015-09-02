'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _utilsInitStateHolder = require("../utils/initStateHolder");

var _utilsCheck = require('../utils/check');

var log = false;

var createModel = function createModel(commandBus, eventBus, initialState) {
  for (var _len = arguments.length, listenedCommandsNamesAndActions = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    listenedCommandsNamesAndActions[_key - 3] = arguments[_key];
  }

  var freeze = (0, _utilsInitStateHolder.initStateHolder)(listenedCommandsNamesAndActions);
  _utilsCheck.check.notNull({ 'commandBus': commandBus }, { 'eventBus': eventBus });

  var state = freeze(initialState);

  listenedCommandsNamesAndActions.forEach(function (actionAndName) {
    var commandName = actionAndName.name;
    var action = actionAndName.action;

    if (log) console.log('about to register command name ' + commandName + " and action " + action);

    commandBus.subscribe(commandName, function (command) {
      state = freeze(action(command, state, eventBus));
    });
  });
};
exports.createModel = createModel;
//# sourceMappingURL=createModel.js.map