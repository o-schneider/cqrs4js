'use strict';

import {ObjectUtils} from '../utils/ObjectUtils'
import {check} from '../utils/check';
import _ from 'lodash';

export class StateHolder {

  constructor(listenedTypesAndActions) {
    check.true("listenedEventTypesAndActions should contain at least one type and action", function () {
      return listenedTypesAndActions != null && listenedTypesAndActions.length != 0;
    });

    listenedTypesAndActions.forEach((actionAndType) => {
      const type = actionAndType.type;
      const action = actionAndType.action;

      check.true("type and action both present", () => {
        return typeof type === "string" && action instanceof Function
      });

    });

  }

  freeze(state) {
    return ObjectUtils.freezeDeep(state);
  }

  createMutableClone(state){
    return _.cloneDeep(state);
  }

}