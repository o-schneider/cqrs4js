'use strict';

import {createView} from '../../../main/js/view/createView';
import {EventBus} from '../../../main/js/event/EventBus';
import {Event} from '../../../main/js/event/Event';
import assert from 'assert';
import should from 'should';

describe('View', function () {
  it("throws when no event bus provided", function () {
    assert.throws(function () {
      createView(null, "");
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
    createView(fakeEventBus, {},
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
    createView(fakeEventBus, {},
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
  it("register actions for given event types", function (done) {
    let counter = 0;
    const eventBus = new EventBus();
    const type1 = "messageType1";
    const type2 = "messageType2";
    createView(eventBus, {},
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
    createView(eventBus, 0, {
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
    eventBus.publish(new Event(type1));
    eventBus.publish(new Event(type1));
    eventBus.publish(new Event(type1));
  });

  it("notify subscribers provides state on subscription", function (done) {
    const eventBus = new EventBus();
    const type = "messageType";
    const expectedState = 2;
    const subscribe = createView(eventBus, expectedState,
      {
        'type': type,
        'action': () => {
        }
      }
    );
    subscribe(function (state) {
      should.equal(state, expectedState);
      done();
    });
  });


  it("notify subscribers after each event handling", function (done) {
    const eventBus = new EventBus();
    const type = "messageType";
    const expected = "1";
    const subscribe = createView(eventBus, 0,
      {
        'type': type,
        'action': () => {
          return expected;
        }
      }
    );
    subscribe(function (state) {
      if (state === expected) {
        done();
      }
    });
    eventBus.publish(new Event(type));
  });

  it("doesn't notify subscribers when no state change is done", function (done) {
    const eventBus = new EventBus();
    const type = "messageType";
    const firstPayload = "1";
    const subscribe = createView(eventBus, firstPayload,
      {
        'type': type,
        'action': (event) => {
          return event.payload;
        }
      }
    );
    const secondPayload = "2";
    let counter = 0;
    subscribe(function (state) {
      counter++;
      if (state === secondPayload && counter == 2) {
        done();
      }
    });
    eventBus.publish(new Event(type, firstPayload));
    eventBus.publish(new Event(type, firstPayload));
    eventBus.publish(new Event(type, secondPayload));
  });


  it("unsubscribe", function (done) {
    const eventBus = new EventBus();
    const type = "messageType";
    const unexpected = "wrong";
    const subscribe = createView(eventBus, 0,
      {
        'type': type,
        'action': () => {
          return unexpected;
        }
      }
    );
    let called = 0;
    const unsubscribe = subscribe(() => {
      called += 1;
    });
    unsubscribe(() => {
      eventBus.publish(new Event(type));
      setTimeout(() => {
        if (called === 1) {
          done();
        }
      }, 10);
    });
  });
});
