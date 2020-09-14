"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vueRouter = require("vue-router");

var _ResourceHome = _interopRequireDefault(require("@/pages/ResourceHome"));

var _ResourceNew = _interopRequireDefault(require("@/pages/ResourceNew"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var routes = [{
  path: '/',
  redirect: {
    name: 'resourceHomePage'
  }
}, {
  path: '/resources',
  name: "resourceHomePage",
  component: _ResourceHome["default"]
}, {
  path: '/resources/new',
  name: "resourceNewPage",
  component: _ResourceNew["default"]
}];
var router = (0, _vueRouter.createRouter)({
  history: (0, _vueRouter.createWebHistory)(),
  routes: routes
});
var _default = router;
exports["default"] = _default;