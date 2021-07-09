namespace Event_Extension {

/**
* light higher Event
*/
//% block="wenn Lichtstärke grösser als %level" level.defl=127
export function LightHigherThan(level: number, body: () => void): void {
control.inBackground(function () {
    while (true) {
        if (input.lightLevel() > level) {
            body()
        }
        basic.pause(10)
    }
})
}

/**
* light pulse Event
*/
//% block="wenn Lichtstärke grösser als %level und zwischen %pulse_low und %pulse_high" level.defl=127 pulse_low.defl=400 pulse_high.defl=800
export function LightPulse(level: number, pulse_low:number, pulse_high:number, body: () => void): void {
control.inBackground(function () {
    let pulsed: boolean = false;
    let LightPulseHigh: boolean = false;
    let TimePulseHigh: number = 0;
    let TimePulseStart:number = 0;
    
    while (true) {
        pulsed = false;
        if (input.lightLevel() > level) {
            if (!(LightPulseHigh)) {
                LightPulseHigh = true;
                TimePulseStart = input.runningTime()
            }
        } else {
            if (LightPulseHigh) {
                TimePulseHigh = input.runningTime() - TimePulseStart
                if (TimePulseHigh > pulse_low && TimePulseHigh < pulse_high) {
                    pulsed = true;
                }
            }
        }
        if (pulsed) {
            body()
        }
        basic.pause(10)
    }
})
}

}
