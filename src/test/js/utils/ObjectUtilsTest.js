'use strict';

import should from 'should';
import {ObjectUtils} from '../../../main/js/utils/ObjectUtils';

describe('ObjectUtils freeze', () => {
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

describe('ObjectUtils freezeDeep', () => {

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

describe('ObjectUtils toString', () => {
  it("handles null", () => {
    const obj = null;
    const string = ObjectUtils.toString(obj);
    should.not.exist(string);
  });

  it("handles string", () => {
    const string = ObjectUtils.toString("string");
    should.exist(string);
  });

  it("handles function", () => {
    const result = "result";
    const stringFunction = () => {
      return result;
    };
    const string = ObjectUtils.toString(stringFunction);
    should.equal(string, result);
  });

  it("handles object", () => {
    const object = {foo: 'nar'};
    const string = ObjectUtils.toString(object);
    should.equal(string, object);
  });

});