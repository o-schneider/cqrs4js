'use strict';

import {EventEmitter} from 'events';
import {check} from '../check/check';
import _ from 'lodash';

const log = false;

export class View {

  constructor(eventBus, ...listenedEventTypesAndActions) {
    check.notNull({'eventBus': eventBus});
    check.true("listenedEventTypesAndActions should contain at least one type and action", function () {
      return listenedEventTypesAndActions != null && listenedEventTypesAndActions.length != 0;
    });

    const view = this;
    _.forEach(listenedEventTypesAndActions, (actionAndType) => {
      const type = actionAndType.type;
      const action = actionAndType.action;

      if (log) console.log('about to register type ' + type + " and action " + action);

      check.true("type and action both present", () => {
        return typeof type === "string" && action instanceof Function
      });

      eventBus.subscribe(type, (message)=> {
        action.call(null, message, view);
        view.changed();
      });
    });
    this.messageEmitter = new EventEmitter();
  }

  changed() { this.messageEmitter.emit('change'); }

  watch(cbk) {
    this.messageEmitter.on('change', cbk);
    return () => this.messageEmitter.removeListener('change', cbk);
  }
}
