'use strict';

import {createModel} from '../../../main/js/model/createModel';
import {CommandBus} from '../../../main/js/command/CommandBus';
import {Command} from '../../../main/js/command/Command';
import {EventBus} from '../../../main/js/event/EventBus';
import {Event} from '../../../main/js/event/Event';
import assert from 'assert';

describe('Model', function () {

  it("throws when no commandBus provided", function () {
    assert.throws(function () {
      createModel(null);
    });
  });

  it("throws when no event bus provided", function () {
    assert.throws(function () {
      createModel(new CommandBus(), null);
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
    createModel(fakeCommandBus, new EventBus(), {},
      {
        'type': 'eventType1',
        'action': function () {
        }
      });
    assert.equal(1, collector.length);
  });

  it("register actions for given commands", function (done) {
    let counter = 0;
    const commandBus = new CommandBus();
    const eventBus = new EventBus();
    const type1 = "messageType1";
    const type2 = "messageType2";
    createModel(commandBus, eventBus, {},
      {
        'type': type1,
        'action': () => {
          counter += 1;
          if (counter == 3) {
            done();
          }
        }
      }, {
        'type': type2,
        'action': () => {
          counter += 2;
          if (counter == 3) {
            done();
          }
        }
      }
    );
    commandBus.publish(new Command(type1));
    commandBus.publish(new Command(type2));
  });

  it("keeps state between calls", function (done) {
    const commandBus = new CommandBus();
    const eventBus = new EventBus();
    const type1 = "messageType1";
    createModel(commandBus,eventBus, 0, {
        'type': type1,
        'action': (message, counter) => {
          const newCounter = counter + 1;
          if (newCounter == 3) {
            done();
          }
          return newCounter;
        }
      }
    );
    commandBus.publish(new Command(type1));
    commandBus.publish(new Command(type1));
    commandBus.publish(new Command(type1));
  });

});