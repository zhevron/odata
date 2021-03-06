"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var lodash_1 = require("lodash");
var ODataRequest = /** @class */ (function () {
    function ODataRequest(client, config, method, entity, id) {
        this.cancelTokenSource = axios_1.default.CancelToken.source();
        this.client = client;
        this.config = __assign({}, config, { cancelToken: this.cancelTokenSource.token, method: method, params: {}, url: entity });
        if (id != null) {
            this.config.url += "(" + id + ")";
        }
    }
    ODataRequest.prototype.clone = function () {
        var request = new ODataRequest(this.client, null, null, null);
        request.config = __assign({}, lodash_1.cloneDeep(this.config), { cancelToken: request.cancelTokenSource.token });
        return request;
    };
    ODataRequest.prototype.select = function () {
        var props = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            props[_i] = arguments[_i];
        }
        if (this.config.method !== "GET") {
            throw Error("Invalid request method for 'select'");
        }
        this.config.params.$select = props.join(",");
        return this;
    };
    ODataRequest.prototype.expand = function () {
        var props = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            props[_i] = arguments[_i];
        }
        if (this.config.method !== "GET") {
            throw Error("Invalid request method for 'expand'");
        }
        this.config.params.$expand = props.join(",");
        return this;
    };
    ODataRequest.prototype.filter = function (filter) {
        if (this.config.method !== "GET") {
            throw Error("Invalid request method for 'filter'");
        }
        this.config.params.$filter = filter;
        return this;
    };
    ODataRequest.prototype.ref = function (nevigationProperty, entity, id) {
        if (this.config.method !== "POST" && this.config.method !== "PUT") {
            throw Error("Invalid request method for 'ref'");
        }
        this.config.url = this.config.url + "/" + nevigationProperty + "/$ref";
        var entityUrl = "" + origin + this.config.baseURL + "/" + entity + "(" + id + ")";
        if (entityUrl.indexOf("http://") === -1 && entityUrl.indexOf("https://") === -1) {
            if (window != null) {
                entityUrl = window.location.origin + entityUrl;
            }
        }
        this.config.data = {
            "@odata.id": entityUrl,
        };
        return this;
    };
    ODataRequest.prototype.body = function (body) {
        if (this.config.method !== "PATCH" && this.config.method !== "POST" && this.config.method !== "PUT") {
            throw Error("Invalid request method for 'body'");
        }
        this.config.data = body;
        return this;
    };
    ODataRequest.prototype.execute = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    return [2 /*return*/, this.client.execute(this)];
                }
                catch (error) {
                    throw error;
                }
                return [2 /*return*/];
            });
        });
    };
    ODataRequest.prototype.cancel = function (message) {
        this.cancelTokenSource.cancel(message);
    };
    return ODataRequest;
}());
exports.ODataRequest = ODataRequest;
//# sourceMappingURL=ODataRequest.js.map