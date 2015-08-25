'use strict';

import {StateHolder} from "../state/StateHolder";
import {EventEmitter} from 'events';
import {check} from '../utils/check';
import {ObjectUtils} from '../utils/ObjectUtils'
import _ from 'lodash';

const log = false;

export class Model extends StateHolder{

  constructor(commandBus, eventBus, initialState, ...listenedCommandsTypesAndActions) {
    super(listenedCommandsTypesAndActions);
    check.notNull({'commandBus': commandBus}, {'eventBus': eventBus});

    this.messageEmitter = new EventEmitter();
    let state = this.freeze(initialState);

    listenedCommandsTypesAndActions.forEach((actionAndType) => {
      const commandType = actionAndType.type;
      const action = actionAndType.action;

      if (log) console.log('about to register command type ' + commandType + " and action " + action);

      commandBus.subscribe(commandType, (command) => {
        state = this.freeze(action.call(null, command, this.createMutableClone(state), eventBus));
      });
    });

  }

}