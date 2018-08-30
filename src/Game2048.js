"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Grid_1 = require("./Grid");
var Tile_1 = require("./entities/Tile");
var Utils_1 = require("./Utils");
var Direction_enum_1 = require("./entities/Direction.enum");
var Events_1 = require("./entities/Events");
var Game2048 = (function () {
    function Game2048(renderer, size) {
        this.renderer = renderer;
        this.size = size;
        this.utils = new Utils_1.Utils();
        this.grid = new Grid_1.Grid(renderer, size);
        this.insertRandomTile();
        this.grid.printBoard();
    }
    Game2048.prototype.insertRandomTile = function () {
        var freeSpaces = this.grid.getAvailableTiles();
        var chosenTile = freeSpaces[this.utils.getRandomNumber(freeSpaces.length)];
        var tile = new Tile_1.Tile(chosenTile.x, chosenTile.y, this.utils.getRandomNumber(1) == 0 ? 2 : 4);
        console.log('Inserting tile(' + tile.value + ') into space: ' + chosenTile.toString());
        this.grid.insertTileByPos(tile);
        return tile;
    };
    Game2048.prototype.action = function (direction) {
        var _this = this;
        console.log("performing action..", Direction_enum_1.Direction[direction]);
        var rowData = this.grid.GetRowDataByDirection(direction);
        var eventTrigger = false;
        for (var row = 0; row < rowData.length; row++) {
            var gameEvents = this.calculateRowEvents(rowData[row]);
            gameEvents.forEach(function (event) {
                if (event instanceof Events_1.TileMoveEvent) {
                    console.log("Move event!");
                    _this.grid.UpdateTileByPos(event.NewPosition, event.Value);
                    _this.grid.RemoveTileByPos(event.Position);
                }
                if (event instanceof Events_1.TileMergeEvent) {
                    console.log("Merge event!");
                    _this.grid.UpdateTileByPos(event.TilePosToMergeWith, event.NewValue);
                    _this.grid.RemoveTileByPos(event.Position);
                }
            });
            console.log(gameEvents);
            if (gameEvents.length > 0)
                eventTrigger = true;
        }
        if (eventTrigger)
            this.insertRandomTile();
        this.grid.printBoard();
    };
    Game2048.prototype.calculateRowEvents = function (tiles) {
        var valueToMerge = tiles[0].value;
        var availableCellIndex = tiles[0].value > 0 ? 1 : 0;
        var eventList = [];
        var moveEventBeforeMerge = null;
        for (var colIndex = 1; colIndex < tiles.length; colIndex++) {
            var current = tiles[colIndex].value;
            if (current == 0)
                continue;
            if (valueToMerge != current) {
                if (colIndex > availableCellIndex) {
                    moveEventBeforeMerge = new Events_1.TileMoveEvent(tiles[colIndex], tiles[availableCellIndex], current, false);
                    eventList.push(moveEventBeforeMerge);
                }
                valueToMerge = current;
                availableCellIndex++;
                continue;
            }
            if (moveEventBeforeMerge != null) {
            }
            else {
                eventList.push(new Events_1.TileMoveEvent(tiles[availableCellIndex - 1], tiles[availableCellIndex - 1], current, true));
            }
            eventList.push(new Events_1.TileMergeEvent(tiles[colIndex], tiles[availableCellIndex - 1], current + valueToMerge));
            valueToMerge = 0;
        }
        return eventList;
    };
    return Game2048;
}());
exports.Game2048 = Game2048;
