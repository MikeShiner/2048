import { Tile } from './entities/Tile';
import { TilePosition } from './entities/TilePosition';
import { Direction } from './entities/Direction.enum';
export class Grid {

    private cells: number[][]

    constructor(private uiBoard: PIXI.Container, private size: number) {
        this.cells = Array(size)
        for (let x = 0; x < this.size; x++) {
            this.cells[x] = Array(this.size)
            for (let y = 0; y < this.size; y++) {
                this.cells[x][y] = 0
            }
        }
    }

    insertTileByPos(tile: Tile) {
        this.cells[tile.x][tile.y] = tile.value
    }

    UpdateTileByPos(pos: TilePosition, newValue: number) {
        this.cells[pos.x][pos.y] = newValue
    }

    RemoveTileByPos(pos: TilePosition): void {
        this.cells[pos.x][pos.y] = 0
    }

    getAvailableTiles(): Array<TilePosition> {
        let arr: Array<TilePosition> = [];
        for (let x = 0; x < this.size; x++) {
            for (let y = 0; y < this.size; y++) {
                if (this.cells[x][y] == 0)
                    arr.push(new TilePosition(x, y))
            }
        }
        return arr
    }

    GetTile(x: number, y: number): Tile {
        return new Tile(x, y, this.cells[x][y])
    }

    GetRowDataByDirection(move: Direction) {
        var rowData = <Tile[][]>[];

        switch (move) {
            case Direction.LEFT:
                for (var x = 0; x < this.size; x++) {
                    var row = <Tile[]>[]
                    for (var y = 0; y < this.size; y++) {
                        row.push(this.GetTile(x, y))
                    }
                    rowData.push(row)
                }
                break
            case Direction.RIGHT:
                for (var x = 0; x < this.size; x++) {
                    var row = <Tile[]>[]
                    for (var y = 0; y < this.size; y++) {
                        row.push(this.GetTile(x, this.size - y - 1))
                    }
                    rowData.push(row)
                }
                break;
            case Direction.UP:
                for (var y = 0; y < this.size; ++y) {
                    var row = <Tile[]>[]
                    for (var x = 0; x < this.size; ++x) {
                        row.push(this.GetTile(x, y))
                    }
                    rowData.push(row)
                }
                break
            case Direction.DOWN:
                for (var y = 0; y < this.size; ++y) {
                    var row = <Tile[]>[]
                    for (var x = 0; x < this.size; ++x) {
                        row.push(this.GetTile(this.size - x - 1, y))
                    }
                    rowData.push(row)
                }
                break
        }
        return rowData
    }

    printBoard(): void {
        console.log("Game Board");
        for (var i = this.uiBoard.children.length - 1; i >= 0; i--) {
            this.uiBoard.removeChild(this.uiBoard.children[i]);
        };

        for (let x = 0; x < this.size; x++) {
            let logLine = '| '
            for (let y = 0; y < this.size; y++) {

                let box = new PIXI.Graphics()
                box.lineStyle(2, 0x333, 1)
                box.beginFill(0xCCC, 0.25)
                box.drawRoundedRect(100 * x, 100 * y, 100, 100, 10)
                box.endFill()
                let txt = (this.cells[x][y] == 0 ? "-" : this.cells[x][y]).toString()
                let number = new PIXI.Text(txt)
                number.anchor.set(0.5, 0.5);
                number.x = (100 * x) + 50
                number.y = (100 * y) + 50
                box.addChild(number)
                this.uiBoard.addChild(box)
            }
        }
        this.printConsoleBoard();
    }
    printConsoleBoard(): void {
        console.log("Game Board");
        for (let x = 0; x < this.size; x++) {
            let logLine = '| '
            for (let y = 0; y < this.size; y++) {
                logLine = logLine + (this.cells[x][y] == 0 ? "-" : this.cells[x][y])
                logLine = logLine + ' | '
            }
            console.log(logLine)
        }
    }
}