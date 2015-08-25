'use strict';

import should from 'should';
import {ObjectUtils} from '../../../main/js/utils/ObjectUtils';

describe('ObjectUtil freeze', () => {
  it("handles null", () => {
    const obj = null;
    const frozenObj = ObjectUtils.freeze(obj);
    should.not.exist(frozenObj);
  });

  it("handles object", () => {
    const obj = {
      prop: "value"
    };
    const frozenObj = ObjectUtils.freeze(obj);
    should.throws(() => frozenObj.prop = "lala", /Cannot assign to read only property 'prop' of/);
  });

  it("handles already frozen objects", () => {
    const obj = {
      prop: "value"
    };
    const frozenObj = ObjectUtils.freeze(obj);
    should.exist(ObjectUtils.freeze(frozenObj));
  });
});

describe('ObjectUtil freezeDeep', () => {

  it("handles null", () => {
    const obj = null;
    const frozenObj = ObjectUtils.freezeDeep(obj);
    should.not.exist(frozenObj);
  });

  it("handles deeply nested objects", () => {
    const obj = {
      deep: {
        deepProp: "value"
      }
    };
    const frozenObj = ObjectUtils.freezeDeep(obj);
    should.throws(() => frozenObj.deep.deepProp = "lala", /Cannot assign to read only property 'deepProp' of/);
  });

  it("handles already frozen objects", () => {
    const obj = {
      deep: {
        deepProp: "value"
      }
    };
    const frozenObj = ObjectUtils.freezeDeep(obj);
    should.exist(ObjectUtils.freezeDeep(frozenObj));
  });
});