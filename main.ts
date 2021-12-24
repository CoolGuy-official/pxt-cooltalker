
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

enum TalkerCmd {
    //% block=发送
    send = 0,
    //% block=你好
    hello = 1,
    //% block=再见
    goodbye = 2,
}
const TalkerCmdStr = ['\u0001', '\u0002', '\u0003'];

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
    //% block="当听见| %wordword=TalkerWord " weight=90
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

    let talkres = '';
    //% blockId=CoolTalker_isheard
    //% block="是否听见%word=TalkerWord?" weight=85
    export function isHeard(word: string) {
        let talktmp = serial.readString();
        if (talktmp != '') {
            if (talktmp === word + '\n') {
                return true;
            }
            talkres = talktmp;
            return false;
        }
        else {
            if (talkres === word + '\n') {
                talkres = '';
                return true;
            }
            return false;
        }
    }

    //% blockId=CoolTalker_sendcmd
    //% block="小酷宝说 %str| " weight=80
    export function Sendcmd(cmd: TalkerCmd) {
        serial.writeString("st")
        serial.writeString(TalkerCmdStr[cmd])
        serial.writeString("ed")
    }

    //% blockId=TalkerWord block="%word" weight=91
    //% blockGap=8
    //% word.fieldEditor="gridpicker" word.fieldOptions.columns=4
    //% word.fieldOptions.tooltips="false" word.fieldOptions.width="250"
    export function TalkerWord(word: TalkerWords): string {
        return TalkerWordsStr[word];
    }

}