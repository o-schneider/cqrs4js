'use strict';

import {initStateHolder} from "../utils/initStateHolder";
import {check} from '../utils/check';

const log = false;

export const createModel = (commandBus, eventBus, initialState, ...listenedCommandsNamesAndActions) => {
  const freeze = initStateHolder(listenedCommandsNamesAndActions);
  check.notNull({'commandBus': commandBus}, {'eventBus': eventBus});

  let state = freeze(initialState);

  listenedCommandsNamesAndActions.forEach((actionAndName) => {
    const commandName = actionAndName.name;
    const action = actionAndName.action;

    if (log) console.log('about to register command name ' + commandName + " and action " + action);

    commandBus.subscribe(commandName, (command) => {
      state = freeze(action(command, state, eventBus));
    });
  });

};
