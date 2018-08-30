"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils = (function () {
    function Utils() {
    }
    Utils.prototype.getRandomNumber = function (max) {
        var min = 0;
        return Math.floor(Math.random() * (max - min)) + min;
    };
    return Utils;
}());
exports.Utils = Utils;
