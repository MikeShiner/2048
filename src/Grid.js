"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Tile_1 = require("./entities/Tile");
var TilePosition_1 = require("./entities/TilePosition");
var Direction_enum_1 = require("./entities/Direction.enum");
var Grid = (function () {
    function Grid(renderer, size) {
        this.renderer = renderer;
        this.size = size;
        this.cells = Array(size);
        for (var x = 0; x < this.size; x++) {
            this.cells[x] = Array(this.size);
            for (var y = 0; y < this.size; y++) {
                this.cells[x][y] = 0;
            }
        }
    }
    Grid.prototype.insertTileByPos = function (tile) {
        this.cells[tile.x][tile.y] = tile.value;
    };
    Grid.prototype.UpdateTileByPos = function (pos, newValue) {
        this.cells[pos.x][pos.y] = newValue;
    };
    Grid.prototype.RemoveTileByPos = function (pos) {
        this.cells[pos.x][pos.y] = 0;
    };
    Grid.prototype.getAvailableTiles = function () {
        var arr = [];
        for (var x = 0; x < this.size; x++) {
            for (var y = 0; y < this.size; y++) {
                if (this.cells[x][y] == 0)
                    arr.push(new TilePosition_1.TilePosition(x, y));
            }
        }
        return arr;
    };
    Grid.prototype.GetTile = function (x, y) {
        return new Tile_1.Tile(x, y, this.cells[x][y]);
    };
    Grid.prototype.GetRowDataByDirection = function (move) {
        var rowData = [];
        switch (move) {
            case Direction_enum_1.Direction.LEFT:
                for (var x = 0; x < this.size; x++) {
                    var row = [];
                    for (var y = 0; y < this.size; y++) {
                        row.push(this.GetTile(x, y));
                    }
                    rowData.push(row);
                }
                break;
            case Direction_enum_1.Direction.RIGHT:
                for (var x = 0; x < this.size; x++) {
                    var row = [];
                    for (var y = 0; y < this.size; y++) {
                        row.push(this.GetTile(x, this.size - y - 1));
                    }
                    rowData.push(row);
                }
                break;
            case Direction_enum_1.Direction.UP:
                for (var y = 0; y < this.size; ++y) {
                    var row = [];
                    for (var x = 0; x < this.size; ++x) {
                        row.push(this.GetTile(x, y));
                    }
                    rowData.push(row);
                }
                break;
            case Direction_enum_1.Direction.DOWN:
                for (var y = 0; y < this.size; ++y) {
                    var row = [];
                    for (var x = 0; x < this.size; ++x) {
                        row.push(this.GetTile(this.size - x - 1, y));
                    }
                    rowData.push(row);
                }
                break;
        }
        return rowData;
    };
    Grid.prototype.printBoard = function () {
        console.log("Game Board");
        for (var x = 0; x < this.size; x++) {
            var logLine = '| ';
            for (var y = 0; y < this.size; y++) {
                logLine = logLine + (this.cells[x][y] == 0 ? "-" : this.cells[x][y]);
                logLine = logLine + ' | ';
            }
            console.log(logLine);
        }
    };
    return Grid;
}());
exports.Grid = Grid;
