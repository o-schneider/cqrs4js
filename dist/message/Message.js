'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _nodeUuid = require('node-uuid');

var _nodeUuid2 = _interopRequireDefault(_nodeUuid);

var _checkCheck = require('../check/check');

// The Message class freezes all its attributes in the constructor: no other attribute can be added and current ones can have their value modified.
// Mind though that Object.freeze don't throw exception when trying to set a value, the new value is silently ignored. It throws a TypeError when trying to add new attributes.
//
// The name is mandatory.
//
// Message's subclasses must wrap their own attributes in the payload and define getters.

var Message = function Message(type, payloadOrNull) {
  _classCallCheck(this, Message);

  _checkCheck.check.notNull({ "name": type });
  this.uuid = _nodeUuid2['default'].v4(); // TODO : check generation time
  this.name = type;
  this.payload = payloadOrNull;
  Object.freeze(this);
};

exports.Message = Message;
//# sourceMappingURL=Message.js.map