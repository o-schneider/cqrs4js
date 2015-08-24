'use strict';

import Uuid from 'node-uuid';
import {check} from '../check/check';

// The Message class freezes all its attributes in the constructor: no other attribute can be added and current ones can have their value modified.
// Mind though that Object.freeze don't throw exception when trying to set a value, the new value is silently ignored. It throws a TypeError when trying to add new attributes.
//
// The type is mandatory.
//
// Message's subclasses must wrap their own attributes in the payload and define getters.
export class Message {

  constructor(type, payloadOrNull) {
    check.notNull({'type': type});
    this.uuid = Uuid.v4(); // TODO : check generation time
    this.type = type;
    this.payload = payloadOrNull;
    Object.freeze(this);
  }
}
