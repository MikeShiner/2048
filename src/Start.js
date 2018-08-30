"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Game2048_1 = require("./Game2048");
var PIXI = require("pixi.js");
function initGame() {
    var renderer = PIXI.autoDetectRenderer(512, 512);
    document.body.appendChild(renderer.view);
    var game = new Game2048_1.Game2048(renderer, 4);
}
initGame();
