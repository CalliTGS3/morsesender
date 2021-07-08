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
    basic.pause(10)
    basic.clearScreen()
})
control.onEvent(EventBusSource.MICROBIT_ID_BUTTON_A, EventBusValue.MICROBIT_BUTTON_EVT_DOWN, function () {
    Start = input.runningTime()
})
radio.onReceivedString(function (receivedString) {
    Empfangen = receivedString
    Laufzeit = input.runningTime()
})
let Position = 0
let Pause = 0
let Start = 0
let Gedrueckt = 0
let Stop = 0
let Laufzeit = 0
let Empfangen = ""
let StrichPunktLaenge = 0
StrichPunktLaenge = 400
let NeuerBuchstabe = 1000
Empfangen = ""
Laufzeit = 0
let AlleZeichen = "**ETIANMSURWDKGOHVF*L*PJBXCYZQ**"
radio.setGroup(1)
radio.setTransmitPower(7)
basic.forever(function () {
    Pause = input.runningTime() - Laufzeit
    if (Pause >= NeuerBuchstabe) {
        if (Position > 1) {
            basic.showString(AlleZeichen.charAt(Position))
            basic.pause(1000)
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
        }
        Empfangen = ""
    }
})
