import { Grid } from './Grid';
import { Tile } from './entities/Tile';
import { TilePosition } from './entities/TilePosition';
import { Utils } from './Utils';
import { Direction } from './entities/Direction.enum';
import { TileMoveEvent, TileUpdateEvent, TileMergeEvent } from './entities/Events';

export class Game2048 {

    private grid: Grid
    private utils: Utils = new Utils()
    private score: number = 0

    private scoreContainer: PIXI.Text;


    constructor(private stage: PIXI.Container, private size: number) {
        let gridCont: PIXI.Container = new PIXI.Container()
        gridCont.y = 100
        gridCont.x = 50
        this.stage.addChild(gridCont)

        let title = new PIXI.Text('2048')
        title.x = 50
        title.y = 50
        this.stage.addChild(title)

        this.scoreContainer = new PIXI.Text('Score: ' + this.score)
        this.scoreContainer.x = 300
        this.scoreContainer.y = 50
        this.stage.addChild(this.scoreContainer)

        this.grid = new Grid(gridCont, size)
        
        this.insertRandomTile()
        this.grid.printBoard()
    }

    insertRandomTile(): Tile {
        let freeSpaces: Array<TilePosition> = this.grid.getAvailableTiles()
        if (freeSpaces.length == 0){
            console.log("Game over!")
        }
        let chosenTile: TilePosition = freeSpaces[this.utils.getRandomNumber(freeSpaces.length)]
        var tile = new Tile(chosenTile.x, chosenTile.y, this.utils.getRandomNumber(1) == 0 ? 2 : 4)

        console.log('Inserting tile(' + tile.value + ') into space: ' + chosenTile.toString())
        this.grid.insertTileByPos(tile)
        return tile
    }

    updateScore(increment: number){
        this.score = this.score + increment
        this.scoreContainer.text = "Score: " + this.score
    }

    action(direction: Direction) {
        console.log("performing action..", Direction[direction])

        var rowData: Tile[][] = this.grid.GetRowDataByDirection(direction)
        var eventTrigger = false

        for (let row = 0; row < rowData.length; row++) {
            let gameEvents: TileUpdateEvent[] = this.calculateRowEvents(rowData[row]);

            gameEvents.forEach((event: any) => {
                if (event instanceof TileMoveEvent) {
                    console.log("Move event!");
                    this.grid.UpdateTileByPos(event.NewPosition, event.Value)
                    this.grid.RemoveTileByPos(event.Position)
                }
                if (event instanceof TileMergeEvent) {
                    console.log("Merge event!");
                    this.grid.UpdateTileByPos(event.TilePosToMergeWith, event.NewValue)
                    this.grid.RemoveTileByPos(event.Position)
                    this.updateScore(event.NewValue);
                }
            });
            if (gameEvents.length > 0) eventTrigger = true
        }

        if (eventTrigger) this.insertRandomTile()
        this.grid.printBoard()
    }

    private calculateRowEvents(tiles: Tile[]) {
        var valueToMerge = tiles[0].value
        var availableCellIndex = tiles[0].value > 0 ? 1 : 0
        var eventList = <TileUpdateEvent[]>[]
        var moveEventBeforeMerge: TileMoveEvent | null = null

        for (var colIndex = 1; colIndex < tiles.length; colIndex++) {
            var current = tiles[colIndex].value

            if (current == 0) continue

            if (valueToMerge != current) {
                if (colIndex > availableCellIndex) {
                    // If not in left most cell - move
                    moveEventBeforeMerge = new TileMoveEvent(tiles[colIndex], tiles[availableCellIndex], current, false)
                    eventList.push(moveEventBeforeMerge)
                }
                valueToMerge = current
                availableCellIndex++
                continue
            }

            if (moveEventBeforeMerge == null) {
                eventList.push(new TileMoveEvent(tiles[availableCellIndex - 1], tiles[availableCellIndex - 1], current, true))
            }
            eventList.push(new TileMergeEvent(tiles[colIndex], tiles[availableCellIndex - 1], current + valueToMerge))

            valueToMerge = 0  // Don't allow all merges in one turn
        }
        return eventList
    }
}