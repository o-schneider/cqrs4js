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
    if (log) console.log("publish type of '" + message.type + "' with payload '" + message.payload + "'");
    this.messageEmitter.emit(message.type, message);
    return;
  }

  subscribe(messageType, callback) {
    if (log) console.log("subscribe to type '" + messageType + "' by callback '" + callback + "'");
    this.checkSubscribe(messageType, callback);
    this.messageEmitter.on(messageType, callback);
    return;
  }

  checkSubscribe(messageType, callback) {
  }

  checkPublish(message) {
    if (!(message instanceof Message )) {
      throw new Error("Publish works only on instances of Message");
    }
  }
}