'use strict';

import {MessageBus} from '../message/MessageBus';
import {Event} from './Event';

export class EventBus extends MessageBus {

  checkPublish(event) {
    super.checkPublish(event);
    if (!(event instanceof Event )) {
      throw new Error("Publish works only on events");
    }
  }

}
