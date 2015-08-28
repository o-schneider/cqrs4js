'use strict';

import {initStateHolder} from "../utils/initStateHolder"
import {EventEmitter} from 'events';
import {check} from '../utils/check';
import _ from 'lodash';

const log = false;

export const createView = (eventBus, initialState, ...listenedEventNamesAndActions) => {
  const freeze = initStateHolder(listenedEventNamesAndActions);
  check.notNull({'eventBus': eventBus});

  const messageEmitter = new EventEmitter();
  let state = freeze(initialState);

  listenedEventNamesAndActions.forEach((actionAndName) => {
    const name = actionAndName.name;
    const action = actionAndName.action;

    if (log) console.log('about to register name ' + name + " and action " + action);

    eventBus.subscribe(name, (event) => {
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
