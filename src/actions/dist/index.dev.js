"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchResources = fetchResources;
exports.updateResource = updateResource;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function fetchResources() {
  return _axios["default"].get('/api/resources').then(function (res) {
    return res.data;
  });
}

function updateResource(id, resource) {
  return _axios["default"].patch("/api/resources/".concat(id, "sssssss"), resource).then(function (res) {
    return res.data;
  });
}