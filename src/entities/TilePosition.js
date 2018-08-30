"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TilePosition = (function () {
    function TilePosition(x, y) {
        this.x = x;
        this.y = y;
    }
    TilePosition.prototype.toString = function () {
        return 'x=' + this.x + ' y=' + this.y;
    };
    return TilePosition;
}());
exports.TilePosition = TilePosition;
