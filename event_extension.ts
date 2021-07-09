namespace Event_Extension {
/**
* light higher Event
*/
//% block="wenn Lichtstärke grösser als %dat" dat.defl=127
export function LightHigherThan(dat: number, body: () => void): void {
control.inBackground(function () {
    while (true) {
        if (input.lightLevel() > dat) {
            body()
        }
        basic.pause(1000)
    }
})
}
}
