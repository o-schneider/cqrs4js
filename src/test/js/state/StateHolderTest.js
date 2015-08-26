'use strict';

import {StateHolder} from '../../../main/js/utils/initStateHolder';
import assert from 'assert';


describe('StateHolder', function () {

  it("throws when no listened event types provided", function () {
    assert.throws(function () {
      new StateHolder();
    });
  });

  it("throws when given listenedEventTypesAndAction missing type", function () {
    assert.throws(function () {
      new StateHolder(
        {
          'action': function () {
          }
        });
    });
  });
  it("throws when given listenedEventTypesAndAction's type isn't a String", function () {
    assert.throws(function () {
      new StateHolder(
        {
          type: ()=>true,
          'action': function () {
          }
        });
    });
  });
  it("throws when given listenedEventTypesAndAction missing action", function () {
    assert.throws(function () {
      new StateHolder(
        {
          'type': "type"
        });
    });
  });
  it("throws when given listenedEventTypesAndAction's action isn't a function", function () {
    assert.throws(function () {
      new StateHolder(
        {
          'type': 'type',
          action: "wrongOne"
        });
    });
  });
});