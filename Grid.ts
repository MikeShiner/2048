import { Tile } from './entities/Tile';
import { TilePosition } from './entities/TilePosition';
export class Grid {

    private cells: number[][]

    constructor(private size: number){
        this.cells = Array(size)
        for (let x = 0; x < this.size; x++){
            this.cells[x] = Array(this.size)
            for(let y = 0; y < this.size; y++){
                this.cells[x][y] = 0
            }
        }
    }

    insertTileByPos(tile: Tile){
        this.cells[tile.x][tile.y] = tile.value
    }

    getAvailableTiles(): Array<TilePosition> {
        let arr: Array<TilePosition> = [];
        for (let x = 0; x < this.size; x++) {
            for(let y = 0; y < this.size; y++) {
                if (this.cells[x][y] == 0) {
                    arr.push(new TilePosition(x, y))
                }
            }
        }
        return arr;
    }

    printBoard(): void {
        console.log("Game Board");
        for (let x = 0; x < this.size; x++) {
            let logLine = '| '
            for(let y = 0; y < this.size; y++) {
                logLine = logLine + (this.cells[x][y] == 0 ? "-" : this.cells[x][y])
                logLine = logLine + ' | '
            }
            console.log(logLine)
        }
    }
}