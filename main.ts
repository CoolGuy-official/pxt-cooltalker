
enum TalkerPin {
    //% block=P13/14
    P13 = 113,
    //% block=P15/16
    P15 = 115
}

enum TalkerWords {
    //% block=开机
    wakeup = 0,
    //% block=播放音乐
    play,
    //% block=关闭音乐
    stop,
    //% block=更换音乐
    next,
    //% block=调高音量
    highv,
    //% block=降低音量
    downv,
    //% block=打开音乐盒
    openv,
    //% block=歌曲一
    song1,
    //% block=歌曲二
    song2,
    //% block=歌曲三
    song3,
    //% block=打开洗衣机
    mrun0,
    //% block=打开摩天轮
    mrun1,
    //% block=打开电风扇
    mrun2,
    //% block=打开电机
    mrun3,
    //% block=小车前进
    crun0,
    //% block=小车右转
    crun1,
    //% block=小车左转
    crun3,
    //% block=小车后退
    crun2,
    //% block=打开
    open,
    //% block=关闭
    close,
    //% block=开灯
    lion,
    //% block=关灯
    lioff,
    //% block=降低
    low,
    //% block=提高
    high,
    //% block=开始
    start,
    //% block=结束
    end,
    //% block=开始计时
    clock,
    //% block=关闭定时
    clock0,
    //% block=定时结束
    timeup,
}
const TalkerWordsStr = ['wakeup', 'play', 'stop', 'next', 'highv', 'downv', 'openv', 'song1', 'song2', 'song3', 'mrun0', 'mrun1', 'mrun2', 'mrun3', 'crun0', 'crun1', 'crun3', 'crun2', 'open', 'close', 'lion', 'lioff', 'low', 'high', 'start', 'end', 'clock', 'clock0', 'timeup'];

enum TalkerCmd {
    //% block=你好
    hello = 0,
    //% block=再见
    goodbye,
    //% block=时间到
    timeout,
}
const TalkerCmdStr = ['\u0001', '\u0002', '\u0003', '\u0004', '\u0005', '\u0006', '\u0007', '\u0008', '\u0009', '\u0010', '\u0011', '\u0012', '\u0013', '\u0014', '\u0015', '\u0016', '\u0017', '\u0018', '\u0019', '\u0020'];

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
    //% str.fieldEditor="gridpicker" str.fieldOptions.columns=4
    //% str.fieldOption.tooltips="false"
    //% str.fieldOptions.width="250"
    export function Sendcmd(cmd: TalkerCmd) {
        serial.writeString("st")
        serial.writeString(TalkerCmdStr[cmd])
        serial.writeString("ed")
    }

    //% blockId=TalkerWord block="%word" weight=91
    //% blockGap=8
    //% word.fieldEditor="gridpicker" word.fieldOptions.columns=6
    //% word.fieldOptions.tooltips="false" 
    //% word.fieldOptions.width="250"
    export function TalkerWord(word: TalkerWords): string {
        return TalkerWordsStr[word];
    }

}