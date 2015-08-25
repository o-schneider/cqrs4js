'use strict';

import {View} from '../../../main/js/view/View';
import {EventBus} from '../../../main/js/event/EventBus';
import {Event} from '../../../main/js/event/Event';
import assert from 'assert';

describe('View', function () {
  it("throws when no event bus provided", function () {
    assert.throws(function () {
      new View(null, "");
    });
  });

  it("subscribe given event type and action", function () {
    class FakeEventBus extends EventBus {
      constructor(collector) {
        super();
        this.collector = collector;
      }

      subscribe(messageType, callback) {
        this.collector.push({messageType, callback});
      }
    }
    const collector = new Array();
    const fakeEventBus = new FakeEventBus(collector);
    new View(fakeEventBus, {},
      {
        'type': 'eventType1',
        'action': function () {
        }
      });
    assert.equal(1, collector.length);
  });
  it("subscribe given event types and actions", function () {
    class FakeEventBus extends EventBus {
      constructor(collector) {
        super();
        this.collector = collector;
      }

      subscribe(messageType, callback) {
        this.collector.push({messageType, callback});
      }
    }
    const collector = [];
    const fakeEventBus = new FakeEventBus(collector);
    new View(fakeEventBus, {},
      {
        'type': 'eventType1',
        'action': function () {
        }
      }, {
        'type': 'eventType2',
        'action': function () {
        }
      }
    );
    assert.equal(2, collector.length);
  });

  it("register actions for given even types", function (done) {
    let counter = 0;
    const eventBus = new EventBus();
    const type1 = "messageType1";
    const type2 = "messageType2";
    new View(eventBus, {},
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
    eventBus.publish(new Event(type1));
    eventBus.publish(new Event(type2));
  });
  it("keeps state between calls", function (done) {
    const eventBus = new EventBus();
    const type1 = "messageType1";
    new View(eventBus, {counter: 0}, {
        'type': type1,
        'action': (message, state) => {
          state.counter += 1;
          if (state.counter == 3) {
            done();
          }
          return state;
        }
      }
    );
    eventBus.publish(new Event(type1));
    eventBus.publish(new Event(type1));
    eventBus.publish(new Event(type1));
  });

  it("keeps deep state between calls", function (done) {
    const eventBus = new EventBus();
    const type = "messageType";
    const view = new View(eventBus, {
        deep: {
          counter: 0
        }
      }, {
        'type': type,
        'action': (message, state) => {
          state.deep.counter += 1;
          return state;
        }
      }
    );
    view.watch(function (state) {
      assert.equal(state.deep.counter, 1);
      done();
    });
    eventBus.publish(new Event(type));
  });

  it("notify watchers after each event handling", function (done) {
    const eventBus = new EventBus();
    const type = "messageType";
    const view = new View(eventBus, {counter: 0},
      {
        'type': type,
        'action': (message, view) => {
          view.counter += 1;
        }
      }
    );
    view.watch(function () {
      done();
    });
    eventBus.publish(new Event(type));
  });
});
