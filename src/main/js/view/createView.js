'use strict';

import {initStateHolder} from "../utils/initStateHolder"
import {EventEmitter} from 'events';
import {check} from '../utils/check';
import _ from 'lodash';

const log = false;

export const createView = (eventBus, initialState, ...listenedEventTypesAndActions) => {
  const freeze = initStateHolder(listenedEventTypesAndActions);
  check.notNull({'eventBus': eventBus});

  const messageEmitter = new EventEmitter();
  let state = freeze(initialState);

  listenedEventTypesAndActions.forEach((actionAndType) => {
    const type = actionAndType.type;
    const action = actionAndType.action;

    if (log) console.log('about to register type ' + type + " and action " + action);

    eventBus.subscribe(type, (event) => {
      const newState = freeze(action(event, state));
      if (newState !== state) {
        state = newState;
        messageEmitter.emit('change', state);
      } else if (log) {
        console.log("No change detected. Previous state '", state, "', new state '", newState, "'");
      }
    });
  });

  messageEmitter.on('addSubscriber', (cbk) => {
    if (log) {
      console.log("about to subscribe '" + cbk + "'");
    }
    messageEmitter.on('change', cbk);
    cbk(state);
  });

  return (cbk) => {
    const effectiveCallback = (state) => cbk(state);
    messageEmitter.emit('addSubscriber', effectiveCallback);
    return (cb) => {
      if (log) {
        console.log("about to remove '" + effectiveCallback + "'");
      }
      messageEmitter.removeListener('change', effectiveCallback);
      cb();
    }
  };
};
