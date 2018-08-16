import { TilePosition } from './TilePosition';

export class TileUpdateEvent {
    Position: TilePosition;

    constructor(position: TilePosition) {
        this.Position = position;
    }
}

export class TileMergeEvent extends TileUpdateEvent {
    TilePosToMergeWith: TilePosition;
    NewValue: number;

    constructor(oldPosition: TilePosition, mergePosition: TilePosition, newValue: number) {
        super(oldPosition);
        this.TilePosToMergeWith = mergePosition;
        this.NewValue = newValue;
    }
}

export class TileMoveEvent extends TileUpdateEvent {
    NewPosition: TilePosition;
    Value: number;
    ShouldBeDeleted: boolean;

    constructor(oldPosition: TilePosition, newPosition: TilePosition, value: number, shouldBeDeleted: boolean) {
        super(oldPosition);
        this.NewPosition = newPosition;
        this.Value = value;
        this.ShouldBeDeleted = shouldBeDeleted;
    }
}

export class TileCreatedEvent extends TileUpdateEvent {
    TileValue: number;

    constructor(position: TilePosition, tileValue: number) {
        super(position);
        this.TileValue = tileValue;
    }
}