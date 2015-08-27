'use strict';

import {initStateHolder} from "../utils/initStateHolder";
import {EventEmitter} from 'events';
import {check} from '../utils/check';
import _ from 'lodash';

const log = false;

export const createModel = (commandBus, eventBus, initialState, ...listenedCommandsTypesAndActions) => {
  const freeze = initStateHolder(listenedCommandsTypesAndActions);
  check.notNull({'commandBus': commandBus}, {'eventBus': eventBus});

  const messageEmitter = new EventEmitter();
  let state = freeze(initialState);

  listenedCommandsTypesAndActions.forEach((actionAndType) => {
    const commandType = actionAndType.type;
    const action = actionAndType.action;

    if (log) console.log('about to register command type ' + commandType + " and action " + action);

    commandBus.subscribe(commandType, (command) => {
      state = freeze(action(command, state, eventBus));
    });
  });

};
