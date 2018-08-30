"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var TileUpdateEvent = (function () {
    function TileUpdateEvent(position) {
        this.Position = position;
    }
    return TileUpdateEvent;
}());
exports.TileUpdateEvent = TileUpdateEvent;
var TileMergeEvent = (function (_super) {
    __extends(TileMergeEvent, _super);
    function TileMergeEvent(oldPosition, mergePosition, newValue) {
        var _this = _super.call(this, oldPosition) || this;
        _this.TilePosToMergeWith = mergePosition;
        _this.NewValue = newValue;
        return _this;
    }
    return TileMergeEvent;
}(TileUpdateEvent));
exports.TileMergeEvent = TileMergeEvent;
var TileMoveEvent = (function (_super) {
    __extends(TileMoveEvent, _super);
    function TileMoveEvent(oldPosition, newPosition, value, shouldBeDeleted) {
        var _this = _super.call(this, oldPosition) || this;
        _this.NewPosition = newPosition;
        _this.Value = value;
        _this.ShouldBeDeleted = shouldBeDeleted;
        return _this;
    }
    return TileMoveEvent;
}(TileUpdateEvent));
exports.TileMoveEvent = TileMoveEvent;
var TileCreatedEvent = (function (_super) {
    __extends(TileCreatedEvent, _super);
    function TileCreatedEvent(position, tileValue) {
        var _this = _super.call(this, position) || this;
        _this.TileValue = tileValue;
        return _this;
    }
    return TileCreatedEvent;
}(TileUpdateEvent));
exports.TileCreatedEvent = TileCreatedEvent;
