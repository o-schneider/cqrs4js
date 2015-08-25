'use strict';

import {StateHolder} from "../state/StateHolder"
import {EventEmitter} from 'events';
import {check} from '../utils/check';
import _ from 'lodash';

const log = false;

export class View extends StateHolder{

  constructor(eventBus, initialState, ...listenedEventTypesAndActions) {
    super(listenedEventTypesAndActions);
    check.notNull({'eventBus': eventBus});

    this.messageEmitter = new EventEmitter();
    let state = this.freeze(initialState);

    listenedEventTypesAndActions.forEach((actionAndType) => {
      const type = actionAndType.type;
      const action = actionAndType.action;

      if (log) console.log('about to register type ' + type + " and action " + action);

      check.true("type and action both present", () => {
        return typeof type === "string" && action instanceof Function
      });

      eventBus.subscribe(type, (event) => {
        state = this.freeze((action.call(null, event,this.createMutableClone(state))));
        this.messageEmitter.emit('change', state)
      });
    });

  }

  watch(cbk) {
    this.messageEmitter.on('change', (state) => cbk.call(null, state));
    return () => this.messageEmitter.removeListener('change', cbk);
  }
}
