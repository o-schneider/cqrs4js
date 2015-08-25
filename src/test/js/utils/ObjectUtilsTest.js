'use strict';

import should from 'should';
import {ObjectUtils} from '../../../main/js/utils/ObjectUtils';

describe('ObjectUtils', () => {
  it("freeze object", () => {
    const obj = {
      prop: "value"
    };
    const frozenObj = ObjectUtils.freeze(obj);
    should.throws(() => frozenObj.prop = "lala", /Cannot assign to read only property 'prop' of/);
  });

  it("deep freeze objects",() => {
    const obj = {
      deep: {
        deepProp: "value"
      }
    };
    const frozenObj = ObjectUtils.freezeDeep(obj);
    should.throws(() => frozenObj.deep.deepProp = "lala", /Cannot assign to read only property 'deepProp' of/);
  });

  describe("on frozen object", () => {
    it("freeze", () => {
      const obj = {
        prop: "value"
      };
      const frozenObj = ObjectUtils.freeze(obj);
      should.exist(ObjectUtils.freeze(frozenObj));
    });

    it("deep freeze",() => {
      const obj = {
        deep: {
          deepProp: "value"
        }
      };
      const frozenObj = ObjectUtils.freezeDeep(obj);
      should.exist(ObjectUtils.freezeDeep(frozenObj));
    });
  });
});