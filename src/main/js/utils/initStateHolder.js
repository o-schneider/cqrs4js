'use strict';

import {ObjectUtils} from './ObjectUtils'
import {check} from './check';

export const initStateHolder = (listenedTypesAndActions) => {
  check.true("listenedTypesAndActions should contain at least one type and action", () => {
    return listenedTypesAndActions != null && listenedTypesAndActions.length != 0;
  });

  listenedTypesAndActions.forEach((actionAndType) => {
    const type = actionAndType.type;
    const action = actionAndType.action;

    check.true("type and action both present", () => {
      return typeof type === "string" && action instanceof Function
    });

  });
  return (state) => {
    return ObjectUtils.freezeDeep(state);
  };


}