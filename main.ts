
enum TalkerPin {
    //% block=P13/14
    P13 = 113,
    //% block=P15/16
    P15 = 115
}

/**
 * Talking extension for SU-03T
 */
//% color=#FC4B4B weight=104 icon="\uf028"
//% block="小酷宝"
namespace CoolTalker {

    //% blockId=CoolTalker_Init
    //% block="初始化小酷宝在 %pin| " weight=100
    export function TalkerInit(pin: TalkerPin) {
        serial.redirect(pin + 1, pin + 0, 9600);
    }

}