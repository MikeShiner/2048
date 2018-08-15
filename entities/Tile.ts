import { TilePosition } from './TilePosition';

export class Tile extends TilePosition {
    constructor(public x: number, public y: number, public value: number){
        super(x, y)
    }
}