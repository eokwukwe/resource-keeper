"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var fs = require('fs').promises;

var path = require('path');

function Model(resource, data) {
  this.resource = resource;
  this._id = this.db.generateId();

  if (data) {
    for (var property in data) {
      if (data.hasOwnProperty(property)) {
        this[property] = data[property];
      }
    }
  }
}

Model.getAll = function getAll() {
  var all;
  return regeneratorRuntime.async(function getAll$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(this.db.readData(this.resource));

        case 2:
          all = _context.sent;
          return _context.abrupt("return", all || []);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  }, null, this);
};

Model.findOne = function findOne(fields) {
  var keys, all, result;
  return regeneratorRuntime.async(function findOne$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          keys = Object.keys(fields);

          if (!(keys.length === 0)) {
            _context2.next = 3;
            break;
          }

          throw new Error('Provide fields!');

        case 3:
          _context2.next = 5;
          return regeneratorRuntime.awrap(this.getAll());

        case 5:
          all = _context2.sent;

          if (!(all.length === 0)) {
            _context2.next = 8;
            break;
          }

          return _context2.abrupt("return", null);

        case 8:
          result = all.find(function (a) {
            var isFound = keys.every(function (k) {
              return fields[k] === a[k];
            });
            return isFound;
          });

          if (result) {
            _context2.next = 11;
            break;
          }

          throw new Error('Item not found!');

        case 11:
          return _context2.abrupt("return", new this(result));

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, null, this);
};

Model.search = function search(fields) {
  var _this = this;

  var keys, all, results;
  return regeneratorRuntime.async(function search$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          keys = Object.keys(fields);

          if (!(keys.length === 0)) {
            _context3.next = 3;
            break;
          }

          throw new Error('Provide fields!');

        case 3:
          _context3.next = 5;
          return regeneratorRuntime.awrap(this.getAll());

        case 5:
          all = _context3.sent;

          if (!(all.length === 0)) {
            _context3.next = 8;
            break;
          }

          return _context3.abrupt("return", []);

        case 8:
          results = all.filter(function (a) {
            var isFound = keys.every(function (k) {
              return typeof a[k] === 'string' && a[k].toLowerCase().includes(fields[k]);
            });
            return isFound;
          });

          if (results) {
            _context3.next = 11;
            break;
          }

          throw new Error('Item not found!');

        case 11:
          return _context3.abrupt("return", results.map(function (r) {
            return new _this(r);
          }));

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  }, null, this);
};

Model.findOneAndUpdate = function findOneAndUpdate(id, data) {
  var all, index;
  return regeneratorRuntime.async(function findOneAndUpdate$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(this.getAll());

        case 2:
          all = _context4.sent;

          if (!(all.length === 0)) {
            _context4.next = 5;
            break;
          }

          throw new Error('Collection is empty');

        case 5:
          index = all.findIndex(function (a) {
            return a._id === id;
          });

          if (!(index < 0)) {
            _context4.next = 8;
            break;
          }

          throw new Error('Item doesnt exists!');

        case 8:
          all[index] = _objectSpread({}, all[index], {}, data);
          _context4.next = 11;
          return regeneratorRuntime.awrap(this.db.saveData(this.resource, all));

        case 11:
          return _context4.abrupt("return", all[index]);

        case 12:
        case "end":
          return _context4.stop();
      }
    }
  }, null, this);
};

Model.prototype.remove = function remove() {
  var _this2 = this;

  var all, index;
  return regeneratorRuntime.async(function remove$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(Model.getAll.call(this));

        case 2:
          all = _context5.sent;

          if (!(all.length === 0)) {
            _context5.next = 5;
            break;
          }

          throw new Error('Collection is empty');

        case 5:
          index = all.findIndex(function (a) {
            return a._id === _this2._id;
          });

          if (!(index < 0)) {
            _context5.next = 8;
            break;
          }

          throw new Error('Item not found!');

        case 8:
          all.splice(index, 1);
          _context5.next = 11;
          return regeneratorRuntime.awrap(this.db.saveData(this.resource, all));

        case 11:
          if (!(index === -1)) {
            _context5.next = 13;
            break;
          }

          throw new Error('Cannot remove data!');

        case 13:
          return _context5.abrupt("return", true);

        case 14:
        case "end":
          return _context5.stop();
      }
    }
  }, null, this);
};

Model.prototype.save = function save() {
  var all, newItem, desc;
  return regeneratorRuntime.async(function save$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(Model.getAll.call(this));

        case 2:
          all = _context6.sent;
          newItem = {
            _id: this._id
          };

          for (desc in this.descriptors) {
            newItem[desc] = this[desc];
          }

          all.push(newItem);
          _context6.next = 8;
          return regeneratorRuntime.awrap(this.db.saveData(this.resource, all));

        case 8:
          return _context6.abrupt("return", this.data);

        case 9:
        case "end":
          return _context6.stop();
      }
    }
  }, null, this);
};

var Connection =
/*#__PURE__*/
function () {
  function Connection() {
    _classCallCheck(this, Connection);
  }

  _createClass(Connection, [{
    key: "resolvePath",
    value: function resolvePath(resource) {
      return path.join(__dirname, '..', 'data', "".concat(resource, ".json"));
    }
  }, {
    key: "readData",
    value: function readData(resource) {
      var data;
      return regeneratorRuntime.async(function readData$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              _context7.next = 3;
              return regeneratorRuntime.awrap(fs.readFile(this.resolvePath(resource), 'utf8'));

            case 3:
              data = _context7.sent;

              if (data) {
                _context7.next = 6;
                break;
              }

              return _context7.abrupt("return", null);

            case 6:
              return _context7.abrupt("return", JSON.parse(data));

            case 9:
              _context7.prev = 9;
              _context7.t0 = _context7["catch"](0);

              if (!(_context7.t0.code === 'ENOENT')) {
                _context7.next = 13;
                break;
              }

              return _context7.abrupt("return", []);

            case 13:
              throw _context7.t0;

            case 14:
            case "end":
              return _context7.stop();
          }
        }
      }, null, this, [[0, 9]]);
    }
  }, {
    key: "saveData",
    value: function saveData(resource, data) {
      // eslint-disable-next-line no-useless-catch
      try {
        fs.writeFile(this.resolvePath(resource), JSON.stringify(data, null, 2));
      } catch (e) {
        throw e;
      }
    }
  }, {
    key: "generateId",
    value: function generateId() {
      return '_' + Math.random().toString(36).substr(2, 9);
    }
  }]);

  return Connection;
}();

var FileDatabase =
/*#__PURE__*/
function () {
  function FileDatabase() {
    _classCallCheck(this, FileDatabase);

    this.models = {};
    this.db = new Connection();
  }

  _createClass(FileDatabase, [{
    key: "register",
    value: function register(resource) {
      var schema = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var model;

      model = function model(data) {
        Model.call(this, resource, data);
      };

      model.resource = resource;
      model.db = model.prototype.db = this.db;

      if (!(model.prototype instanceof Model)) {
        model.__proto__ = Model;
        model.prototype.__proto__ = Model.prototype;
      }

      if (schema.methods) {
        var methods = schema.methods;
        Object.keys(methods).forEach(function (method) {
          model.prototype[method] = methods[method];
        });
      }

      if (schema.descriptors) {
        model.prototype.descriptors = _objectSpread({}, schema.descriptors);
      }

      this.models[resource] = model;
      return this.models[resource];
    }
  }]);

  return FileDatabase;
}();

module.exports = new FileDatabase();