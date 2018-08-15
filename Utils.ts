export class Utils {

    getRandomNumber(max: number) {
        let min = 0
        return Math.floor(Math.random() * (max - min)) + min
    }
}