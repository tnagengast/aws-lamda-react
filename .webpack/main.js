(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("aws-sdk");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Note = undefined;

var _Note = __webpack_require__(2);

var _Note2 = _interopRequireDefault(_Note);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Note = _Note2.default;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = __webpack_require__(3);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(4);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(6);

var _createClass3 = _interopRequireDefault(_createClass2);

var _uuid = __webpack_require__(7);

var _uuid2 = _interopRequireDefault(_uuid);

var _awsSdk = __webpack_require__(0);

var _awsSdk2 = _interopRequireDefault(_awsSdk);

var _dynamodb = __webpack_require__(8);

var dynamoDbLib = _interopRequireWildcard(_dynamodb);

var _response = __webpack_require__(9);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Note = function () {
    function Note() {
        (0, _classCallCheck3.default)(this, Note);
    }

    (0, _createClass3.default)(Note, null, [{
        key: 'create',

        /*
        test: sls webpack invoke --function list --path mocks/create-event.json
        */
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(event, context, callback) {
                var data, params, result;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                data = JSON.parse(event.body);
                                params = {
                                    TableName: 'notes',
                                    Item: {
                                        user_id: event.requestContext.authorizer.claims.sub,
                                        note_id: _uuid2.default.v1(),
                                        content: data.content,
                                        attachment: data.attachment,
                                        created_at: new Date().getTime()
                                    }
                                };
                                _context.prev = 2;
                                _context.next = 5;
                                return dynamoDbLib.call('put', params);

                            case 5:
                                result = _context.sent;

                                callback(null, (0, _response.success)(params.Item));
                                _context.next = 12;
                                break;

                            case 9:
                                _context.prev = 9;
                                _context.t0 = _context['catch'](2);

                                callback(null, (0, _response.failure)({ status: false }));

                            case 12:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[2, 9]]);
            }));

            function create(_x, _x2, _x3) {
                return _ref.apply(this, arguments);
            }

            return create;
        }()

        /*
        test: sls webpack invoke --function list --path mocks/list-event.json
        */

    }, {
        key: 'list',
        value: function () {
            var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(event, context, callback) {
                var params, result;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                params = {
                                    TableName: 'notes',
                                    KeyConditionExpression: "user_id = :user_id",
                                    ExpressionAttributeValues: {
                                        ":user_id": event.requestContext.authorizer.claims.sub
                                    }
                                };
                                _context2.prev = 1;
                                _context2.next = 4;
                                return dynamoDbLib.call('query', params);

                            case 4:
                                result = _context2.sent;


                                callback(null, (0, _response.success)(result.Items));
                                _context2.next = 11;
                                break;

                            case 8:
                                _context2.prev = 8;
                                _context2.t0 = _context2['catch'](1);

                                callback(null, (0, _response.failure)({ status: false }));

                            case 11:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[1, 8]]);
            }));

            function list(_x4, _x5, _x6) {
                return _ref2.apply(this, arguments);
            }

            return list;
        }()

        /*
        test: sls webpack invoke --function list --path mocks/get-event.json
        */

    }, {
        key: 'get',
        value: function () {
            var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(event, context, callback) {
                var params, result;
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                params = {
                                    TableName: 'notes',
                                    Key: {
                                        user_id: event.requestContext.authorizer.claims.sub,
                                        note_id: event.pathParameters.id
                                    }
                                };
                                _context3.prev = 1;
                                _context3.next = 4;
                                return dynamoDbLib.call('get', params);

                            case 4:
                                result = _context3.sent;


                                if (result.Item) {
                                    callback(null, (0, _response.success)(result.Item));
                                } else {
                                    callback(null, (0, _response.failure)({ status: false, error: 'Item not found.' }));
                                }
                                _context3.next = 11;
                                break;

                            case 8:
                                _context3.prev = 8;
                                _context3.t0 = _context3['catch'](1);

                                callback(null, (0, _response.failure)({ status: false }));

                            case 11:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this, [[1, 8]]);
            }));

            function get(_x7, _x8, _x9) {
                return _ref3.apply(this, arguments);
            }

            return get;
        }()

        /*
        test: sls webpack invoke --function list --path mocks/update-event.json
        */

    }, {
        key: 'update',
        value: function () {
            var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(event, context, callback) {
                var data, params, result;
                return _regenerator2.default.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                data = JSON.parse(event.body);
                                params = {
                                    TableName: 'notes',
                                    Key: {
                                        user_id: event.requestContext.authorizer.claims.sub,
                                        note_id: event.pathParameters.id
                                    },
                                    UpdateExpression: 'SET content = :content, attachment = :attachment',
                                    ExpressionAttributeValues: {
                                        ':attachment': data.attachment ? data.attachment : null,
                                        ':content': data.content ? data.content : null
                                    },
                                    ReturnValues: 'ALL_NEW'
                                };
                                _context4.prev = 2;
                                _context4.next = 5;
                                return dynamoDbLib.call('update', params);

                            case 5:
                                result = _context4.sent;

                                callback(null, (0, _response.success)({ status: true }));
                                _context4.next = 12;
                                break;

                            case 9:
                                _context4.prev = 9;
                                _context4.t0 = _context4['catch'](2);

                                callback(null, (0, _response.failure)({ status: false }));

                            case 12:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this, [[2, 9]]);
            }));

            function update(_x10, _x11, _x12) {
                return _ref4.apply(this, arguments);
            }

            return update;
        }()

        /*
        test: sls webpack invoke --function list --path mocks/delete-event.json
        */

    }, {
        key: 'delete',
        value: function () {
            var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(event, context, callback) {
                var params, result;
                return _regenerator2.default.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                params = {
                                    TableName: 'notes',
                                    Key: {
                                        user_id: event.requestContext.authorizer.claims.sub,
                                        note_id: event.pathParameters.id
                                    }
                                };
                                _context5.prev = 1;
                                _context5.next = 4;
                                return dynamoDbLib.call('delete', params);

                            case 4:
                                result = _context5.sent;


                                callback(null, (0, _response.success)({ status: true }));
                                _context5.next = 11;
                                break;

                            case 8:
                                _context5.prev = 8;
                                _context5.t0 = _context5['catch'](1);

                                callback(null, (0, _response.failure)({ status: false }));

                            case 11:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, this, [[1, 8]]);
            }));

            function _delete(_x13, _x14, _x15) {
                return _ref5.apply(this, arguments);
            }

            return _delete;
        }()
    }]);
    return Note;
}();

exports.default = Note;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/regenerator");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/asyncToGenerator");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/classCallCheck");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/createClass");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("uuid");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.call = call;

var _awsSdk = __webpack_require__(0);

var _awsSdk2 = _interopRequireDefault(_awsSdk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_awsSdk2.default.config.update({ region: 'us-west-2' });

function call(action, params) {
    var dynamoDb = new _awsSdk2.default.DynamoDB.DocumentClient();

    return dynamoDb[action](params).promise();
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = __webpack_require__(10);

var _stringify2 = _interopRequireDefault(_stringify);

exports.success = success;
exports.failure = failure;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function success(body) {
    return buildResponse(200, body);
}

function failure(body) {
    return buildResponse(500, body);
}

function buildResponse(statusCode, body) {
    return {
        statusCode: statusCode,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
        },
        body: (0, _stringify2.default)(body)
    };
}

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/json/stringify");

/***/ })
/******/ ])));