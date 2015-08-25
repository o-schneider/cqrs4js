'use strict';

import {Model} from '../../../main/js/model/Model';
import {CommandBus} from '../../../main/js/command/CommandBus';
import {EventBus} from '../../../main/js/event/EventBus';
import {Event} from '../../../main/js/event/Event';
import assert from 'assert';

describe('Model', function () {

  it("throws when no commandBus provided", function () {
    assert.throws(function () {
      new Model(null);
    });
  });

  it("throws when no event bus provided", function () {
    assert.throws(function () {
      new Model(new CommandBus(), null);
    });
  });

  it("subscribe given event type and action", function () {
    class FakeCommandBus extends CommandBus {
      constructor(collector) {
        super();
        this.collector = collector;
      }

      subscribe(messageType, callback) {
        this.collector.push({messageType, callback});
      }
    }
    const collector = new Array();
    const fakeCommandBus = new FakeCommandBus(collector);
    new Model(fakeCommandBus, new EventBus(), {},
      {
        'type': 'eventType1',
        'action': function () {
        }
      });
    assert.equal(1, collector.length);
  });
});