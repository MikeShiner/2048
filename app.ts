import { Game2048 } from './Game2048'
import * as Mousetrap from 'mousetrap'
import { Direction } from './entities/Direction.enum'

const stdin = process.openStdin()
var game: Game2048 = new Game2048(4)

console.log("Enter Direction: (l,r,u,d)")
stdin.addListener('data', function (input) {
    let direction: Direction | null

    switch (input.toString().trim()) {
        case "l":
            direction = Direction.LEFT
            break
        case "r":
            direction = Direction.RIGHT
            break
        case "u":
            direction = Direction.UP
            break
        case "d":
            direction = Direction.DOWN
            break
        default:
            direction = null
    }
    if (direction != null) {
        game.action(direction)
    } else {
        console.log('Invalid direction, please input l, r, u, d')
    }
})