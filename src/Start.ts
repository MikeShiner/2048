import { Game2048 } from './Game2048'
import * as Mousetrap from 'mousetrap'
import { Direction } from './entities/Direction.enum'
import * as PIXI from 'pixi.js'
import * as Hammer from 'hammerjs'

function initGame() {
    const canvas: PIXI.Application = new PIXI.Application({
        width: 500,
        height: 550,
        antialias: true,    // default: false
        transparent: false, // default: false
        resolution: 1       // default: 1
    })
    
    canvas.renderer.backgroundColor = 0xCCCCCC
    
    document.body.appendChild(canvas.view)
    var game: Game2048 = new Game2048(canvas.stage, 4)

    const hammer = new Hammer(document.body)
    hammer.on('swipe', (event) => console.log(event))

    document.addEventListener('keydown', (e) => {
        let direction: Direction | null
        console.log(e.keyCode)
        switch (e.keyCode) {
            case 37:
                direction = Direction.LEFT
                break
            case 39:
                direction = Direction.RIGHT
                break
            case 38:
                direction = Direction.UP
                break
            case 40:
                direction = Direction.DOWN
                break
            default:
                direction = null
        }
        if (direction != null) {
            game.action(direction)
        } else {
            console.log('Invalid direction, please press Left/Right/Up/Down')
        }
    })
}

initGame();