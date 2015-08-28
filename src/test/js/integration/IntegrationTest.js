'use strict';

import {createView} from '../../../main/js/view/createView';
import {createModel} from '../../../main/js/model/createModel';
import {EventBus} from '../../../main/js/event/EventBus';
import {CommandBus} from '../../../main/js/command/CommandBus';
import {Command} from '../../../main/js/command/Command';
import {Event} from '../../../main/js/event/Event';
import {ObjectUtils} from '../../../main/js/utils/ObjectUtils';
import assert from 'assert';
import should from 'should';
import _ from 'lodash';

describe('CQRS and ES from end to end ', function () {
  let commandBus = new CommandBus();
  let eventBus = new EventBus();
  createModel(commandBus, eventBus, [], {
    'name': "addUser",
    'action': (command, state, eventBus) => {
      const userToAdd = command.payload;
      var login = userToAdd.login;
      if (_.find(state, (chr) => {
          return chr === login;
        })) {
        eventBus.publish(new Event("addUserFailure", {'message': "Login already existing", 'command': command}));
        return state;
      }
      const newState = ObjectUtils.createMutableClone(state);
      newState.push(login);
      eventBus.publish(new Event("userAdded", {command}));
      return newState;
    }
  });
  const userViewSubscriber = createView(eventBus, [], {
    'name': "userAdded",
    'action': (event, state) => {
      const newState = ObjectUtils.createMutableClone(state);
      newState.push(event.payload);
      return newState;
    }
  });
  var users = {};
  userViewSubscriber(function (state) {
    users = state;
  });
  commandBus.publish(new Command("addUser", {login: 'foo'}));
  commandBus.publish(new Command("addUser", {login: 'foo'}));
  assert(users.length, 1);
});
