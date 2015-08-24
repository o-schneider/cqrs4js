'use strict';

import {CommandBus} from '../../../main/js/command/CommandBus';
import {Command} from '../../../main/js/command/Command';
import assert from 'assert';

describe('commandBus', function () {

  it("throws when publishing a command for which no subscriber is present", function () {
    const commandBus = new CommandBus();
    assert.throws(function () {
      commandBus.publish(new Command("type"));
    });
  });

  it("throws when adding a subscriber to some command type already listened to", function () {
    const commandBus = new CommandBus();
    const messageType = "testType";
    commandBus.subscribe(messageType, function () {
    });
    assert.throws(function () {
      commandBus.subscribe(messageType, function () {
      });
    });
  });

  it("works", function(done){

    const commandBus = new CommandBus();
    const messageType = "testType";
    var called = 0;
    commandBus.subscribe(messageType, function (message) {
      called += message.payload;
      if(called >= 6){
        done();
      }

    });
    commandBus.publish(new Command(messageType,3));
    commandBus.publish(new Command(messageType,2));
    commandBus.publish(new Command(messageType,1));
  });
});