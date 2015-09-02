'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Message = require('./Message');

var _events = require('events');

var log = false;

var MessageBus = (function () {
  function MessageBus() {
    _classCallCheck(this, MessageBus);

    this.messageEmitter = new _events.EventEmitter();
  }

  _createClass(MessageBus, [{
    key: 'publish',
    value: function publish(message) {
      this.checkPublish(message);
      if (log) console.log("publish '" + message.name + "' with payload '" + message.payload + "'");
      this.messageEmitter.emit(message.name, message);
      return;
    }
  }, {
    key: 'subscribe',
    value: function subscribe(messageName, callback) {
      if (log) console.log("subscribe to name '" + messageName + "' by callback '" + callback + "'");
      this.checkSubscribe(messageName, callback);
      this.messageEmitter.on(messageName, callback);
      return;
    }
  }, {
    key: 'checkSubscribe',
    value: function checkSubscribe() {}
  }, {
    key: 'checkPublish',
    value: function checkPublish(message) {
      if (!(message instanceof _Message.Message)) {
        throw new Error("Publish works only on instances of Message");
      }
    }
  }]);

  return MessageBus;
})();

exports.MessageBus = MessageBus;
//# sourceMappingURL=MessageBus.js.map