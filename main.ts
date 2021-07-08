control.onEvent(EventBusSource.MICROBIT_ID_BUTTON_A, EventBusValue.MICROBIT_BUTTON_EVT_UP, function () {
    Stop = input.runningTime()
    Gedrueckt = Stop - Start
    if (Gedrueckt > StrichPunktLaenge) {
        radio.sendString("-")
        basic.showLeds(`
            . . . . .
            . . . . .
            # # # # #
            . . . . .
            . . . . .
            `)
    } else {
        radio.sendString(".")
        basic.showLeds(`
            . . . . .
            . . . . .
            . . # . .
            . . . . .
            . . . . .
            `)
    }
    basic.clearScreen()
})
control.onEvent(EventBusSource.MICROBIT_ID_BUTTON_A, EventBusValue.MICROBIT_BUTTON_EVT_DOWN, function () {
    Start = input.runningTime()
})
radio.onReceivedString(function (receivedString) {
    Empfangen = receivedString
    ZeitpunktEmpfangen = input.runningTime()
})
let Position = 0
let Pause = 0
let Start = 0
let Gedrueckt = 0
let Stop = 0
let ZeitpunktEmpfangen = 0
let Empfangen = ""
let StrichPunktLaenge = 0
StrichPunktLaenge = 400
let PauseNeuerBuchstabe = 1000
Empfangen = ""
ZeitpunktEmpfangen = 0
let AlleZeichen = "**ETIANMSURWDKGOHVF*L*PJBXCYZQ**"
radio.setGroup(1)
radio.setTransmitPower(7)
basic.showIcon(IconNames.Yes)
basic.pause(100)
basic.forever(function () {
    Pause = input.runningTime() - ZeitpunktEmpfangen
    if (Pause >= PauseNeuerBuchstabe) {
        if (Position > 1) {
            basic.showString(AlleZeichen.charAt(Position))
            basic.pause(500)
            basic.clearScreen()
        }
        Position = 1
    } else {
        if (Empfangen != "") {
            if (Empfangen == "-") {
                Position = 2 * Position + 1
            } else {
                Position = 2 * Position
            }
            Empfangen = ""
        }
    }
})
