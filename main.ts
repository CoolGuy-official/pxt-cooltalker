
enum TalkerPin {
    //% block=P13/14
    P13 = 113,
    //% block=P15/16
    P15 = 115
}

enum TalkerWords {
    //% block=开机
    wakeup = 0,
    //% block=开灯
    poweron,
    //% block=关灯
    poweroff,
    //% block=发送
    send,
    //% block=你好
    hello,
    //% block=再见
    goodbye,
}
const TalkerWordsStr = ['wakeup', 'poweron', 'poweroff', 'send', 'hello', 'bye'];

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

    //% blockId=CoolTalker_when_receive
    //% block="当听见| %word| " weight=90
    export function WhenReceiveWord(word: string, body: () => void) {
        let talkres = '';
        serial.onDataReceived(serial.delimiters(Delimiters.NewLine), () => {
            talkres = serial.readString();
        });
        basic.showString(talkres);
        basic.showString(word);
        if (talkres == word) {
            body();
        }
    }

}