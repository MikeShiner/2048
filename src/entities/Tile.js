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
var TilePosition_1 = require("./TilePosition");
var Tile = (function (_super) {
    __extends(Tile, _super);
    function Tile(x, y, value) {
        var _this = _super.call(this, x, y) || this;
        _this.x = x;
        _this.y = y;
        _this.value = value;
        return _this;
    }
    return Tile;
}(TilePosition_1.TilePosition));
exports.Tile = Tile;
