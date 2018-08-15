import { Grid } from './Grid';
import { Tile } from './entities/Tile';
import { TilePosition } from './entities/TilePosition';
import { Utils } from './Utils';

export class Game2048 {

    private grid: Grid;
    private utils: Utils = new Utils();

    constructor(private size: number) {
        this.grid = new Grid(size)
        this.insertRandomTile()
        this.grid.printBoard()
    }

    insertRandomTile(): Tile {
        let freeSpaces: Array<TilePosition> = this.grid.getAvailableTiles()
        let chosenTile: TilePosition = freeSpaces[this.utils.getRandomNumber(freeSpaces.length)]
        var tile = new Tile(chosenTile.x ,chosenTile.y, this.utils.getRandomNumber(1) == 0 ? 2 : 4)

        console.log('Inserting tile(' + tile.value + ') into space: ' + chosenTile.toString())
        this.grid.insertTileByPos(tile)
        return tile
    }
}