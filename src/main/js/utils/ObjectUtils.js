'use strict';

import {check} from './check'

export class ObjectUtils {
  static freeze(obj) {
    return Object.freeze(obj);
  }

  static freezeDeep(obj) {
    const propNames = Object.getOwnPropertyNames(obj);
    propNames.forEach((name) => {
      const prop = obj[name];
      if (typeof prop == 'object' && !Object.isFrozen(prop))
        ObjectUtils.freezeDeep(prop);
    });
    return Object.freeze(obj);
  }
}