'use strict';

import {initStateHolder} from "../utils/initStateHolder"
import {EventEmitter} from 'events';
import {check} from '../utils/check';
import _ from 'lodash';

const log = true;

export const createView = (eventBus, initialState, ...listenedEventTypesAndActions) => {
  const freeze = initStateHolder(listenedEventTypesAndActions);
  check.notNull({'eventBus': eventBus});

  const messageEmitter = new EventEmitter();
  let state = freeze(initialState);

  listenedEventTypesAndActions.forEach((actionAndType) => {
    const type = actionAndType.type;
    const action = actionAndType.action;

    if (log) console.log('about to register type ' + type + " and action " + action);

    check.true("type and action both present", () => {
      return typeof type === "string" && action instanceof Function
    });

    eventBus.subscribe(type, (event) => {
      state = freeze(action(event, state));
      messageEmitter.emit('change', state)
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
