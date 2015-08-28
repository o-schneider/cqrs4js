'use strict';

import {MessageBus} from '../message/MessageBus';
import {Command} from './Command';

export class CommandBus extends MessageBus {

  checkPublish(command) {
    super.checkPublish(command);
    if (!(command instanceof Command )) {
      throw new Error("Publish works only on commands");
    }
    const type = command.type;
    const listeners = this.getListeners(type);
    if (listeners.length == 0) {
      throw new Error("No subscriber for command type '" + type + "'");
    }
  }

  getListeners(type) {
    return this.messageEmitter.listeners(type);
  }

  checkSubscribe(messageType, callback) {
    super.checkSubscribe(messageType, callback);
    const listeners = this.getListeners(messageType);
    const length = listeners.length;
    if (length == 1) {
      throw new Error("Subscriber already present  for command type '" + messageType + "': '" + listeners[0] + "'");
    }
    if (length > 1) {
      throw new Error("Unexpected state: '" + length + "' subscribers for type '" + messageType + "', here be dragons! Subscribers: " + listeners);
    }
  }

}
