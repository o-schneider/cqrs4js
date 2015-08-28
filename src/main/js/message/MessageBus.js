'use strict';

import {Message} from './Message';
import {EventEmitter} from 'events';

const log = false;

export class MessageBus {
  constructor() {
    this.messageEmitter = new EventEmitter();
  }

  publish(message) {
    this.checkPublish(message);
    if (log) console.log("publish '" + message.name + "' with payload '" + message.payload + "'");
    this.messageEmitter.emit(message.name, message);
    return;
  }

  subscribe(messageName, callback) {
    if (log) console.log("subscribe to name '" + messageName + "' by callback '" + callback + "'");
    this.checkSubscribe(messageName, callback);
    this.messageEmitter.on(messageName, callback);
    return;
  }

  checkSubscribe() {
  }

  checkPublish(message) {
    if (!(message instanceof Message )) {
      throw new Error("Publish works only on instances of Message");
    }
  }
}