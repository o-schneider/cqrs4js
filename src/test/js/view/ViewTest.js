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

  it("throws when no listened event types provided", function () {
    assert.throws(function () {
      new View(new EventBus());
    });
  });

  it("throws when given listenedEventTypesAndAction missing type", function () {
    assert.throws(function () {
      new View(new EventBus(),
        {
          'action': function () {
          }
        });
    });
  });
  it("throws when given listenedEventTypesAndAction's type isn't a String", function () {
    assert.throws(function () {
      new View(new EventBus(),
        {
          type: ()=>true,
          'action': function () {
          }
        });
    });
  });
  it("throws when given listenedEventTypesAndAction missing action", function () {
    assert.throws(function () {
      new View(new EventBus(),
        {
          'type': "type"
        });
    });
  });
  it("throws when given listenedEventTypesAndAction's action isn't a function", function () {
    assert.throws(function () {
      new View(new EventBus(),
        {
          'type': 'type',
          action: "wrongOne"
        });
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
    new View(fakeEventBus,
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
    const collector = new Array();
    const fakeEventBus = new FakeEventBus(collector);
    new View(fakeEventBus,
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
    new View(eventBus,
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
    class CounterView extends View {
      constructor(eventBus, ...listenedEventTypesAndActions) {
        super(eventBus, ...listenedEventTypesAndActions);
        this.counter = 0;
      }
    }
    const eventBus = new EventBus();
    const type1 = "messageType1";
    new CounterView(eventBus,
      {
        'type': type1,
        'action': (message, view) => {
          view.counter += 1;
          if (view.counter == 3) {
            done();
          }
        }
      }
    );
    eventBus.publish(new Event(type1));
    eventBus.publish(new Event(type1));
    eventBus.publish(new Event(type1));
  });

  it("notify watchers after each event handling", function (done) {
    class CounterView extends View {
      constructor(eventBus, ...listenedEventTypesAndActions) {
        super(eventBus, ...listenedEventTypesAndActions);
        this.counter = 0;
      }
    }
    const eventBus = new EventBus();
    const type = "messageType";
    const view = new CounterView(eventBus,
      {
        'type': type,
        'action': (message, view) => {
          view.counter += 1;
        }
      }
    );
    view.watch(function(){
        done();
    });
    eventBus.publish(new Event(type));
  });
});
