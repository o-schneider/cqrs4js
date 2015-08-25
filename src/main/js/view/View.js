'use strict';

import {EventEmitter} from 'events';
import {check} from '../utils/check';
import {ObjectUtils} from '../utils/ObjectUtils'
import _ from 'lodash';

const log = false;

export class View {

  constructor(eventBus, initialState, ...listenedEventTypesAndActions) {
    check.notNull({'eventBus': eventBus});
    check.true("listenedEventTypesAndActions should contain at least one type and action", function () {
      return listenedEventTypesAndActions != null && listenedEventTypesAndActions.length != 0;
    });

    this.messageEmitter = new EventEmitter();
    let state = ObjectUtils.freezeDeep(initialState);

    listenedEventTypesAndActions.forEach((actionAndType) => {
      const type = actionAndType.type;
      const action = actionAndType.action;

      if (log) console.log('about to register type ' + type + " and action " + action);

      check.true("type and action both present", () => {
        return typeof type === "string" && action instanceof Function
      });

      eventBus.subscribe(type, (event) => {
        state = ObjectUtils.freezeDeep(action.call(null, event, _.cloneDeep(state)));
        this.messageEmitter.emit('change', state)
      });
    });

  }

  watch(cbk) {
    this.messageEmitter.on('change', (state) => cbk.call(null, state) );
    return () => this.messageEmitter.removeListener('change', cbk);
  }
}
