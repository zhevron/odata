"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ODataResponse = /** @class */ (function () {
    function ODataResponse(response) {
        this.status = response.status;
        this.headers = response.headers;
        this.metadata = ODataResponse.getMetadata(response.data);
        this.entities = ODataResponse.getEntities(response.data);
        this.entity = this.entities.length === 0 ? ODataResponse.getEntity(response.data) : null;
    }
    ODataResponse.getMetadata = function (data) {
        var metadata = new Map();
        Object.keys(data)
            .filter(function (key) { return key.startsWith("@odata"); })
            .forEach(function (key) { return metadata.set(key.replace("@odata.", ""), data[key]); });
        return metadata;
    };
    ODataResponse.getEntity = function (data) {
        var entity = {}; // tslint:disable-line:prefer-const
        Object.keys(data)
            .filter(function (key) { return !key.startsWith("@odata"); })
            .forEach(function (key) { return entity[key] = data[key]; });
        return entity;
    };
    ODataResponse.getEntities = function (data) {
        var keys = Object.keys(data).filter(function (key) { return !key.startsWith("@odata"); });
        if (keys.length === 1 && keys[0] === "value") {
            return data.value;
        }
        return [];
    };
    Object.defineProperty(ODataResponse.prototype, "containsMultipleEntities", {
        get: function () {
            return this.entities.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    return ODataResponse;
}());
exports.ODataResponse = ODataResponse;
//# sourceMappingURL=ODataResponse.js.map