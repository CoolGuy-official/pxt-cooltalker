
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
    //% block=打开电视
    tvon,
    //% block=关闭电视
    tvof,
    //% block=播放动画
    carton,
    //% block=开灯
    lion,
    //% block=关灯
    lioff,
    //% block=学习模式
    stli,
    //% block=休息模式
    reli,
    //% block=彩灯
    roll,
    //% block=打开油烟机
    mrun0,
    //% block=打开摩天轮
    mrun1,
    //% block=打开电风扇
    mrun2,
    //% block=关闭油烟机
    stopm2,
    //% block=关闭摩天轮
    stopm3,
    //% block=关闭电风扇
    stopm1,
    //% block=打开电机
    mrun3,
    //% block=关闭电机
    stopm,
    //% block=小车前进
    crun0,
    //% block=小车右转
    crun1,
    //% block=小车左转
    crun3,
    //% block=小车后退
    crun2,
    //% block=准备洗澡水
    wateri,
    //% block=洗澡水够了
    watero,
    //% block=开门
    dooro,
    //% block=关门
    doorc,
    //% block=打开
    open,
    //% block=关闭
    close,
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
    //% block=定时结束
    timeup,
    //% block=打开加湿器
    humidifler,
    //% block=加热
    hot,
    //% block=通风
    wind,
    //% block=红光
    red,
    //% block=蓝光
    blue,

}
const TalkerWordsStr = ['wakeup', 'play', 'stop', 'next', 'highv', 'downv', 'openv', 'song1', 'song2', 'song3', 'tvon', 'tvof', 'carton', 'lion', 'lioff', 'stli', 'reli', 'roll', 'mrun0', 'mrun1', 'mrun2', 'stopm2', 'stopm3', 'stopm1', 'mrun3', 'stopm', 'crun0', 'crun1', 'crun3', 'crun2', 'wateri', 'watero', 'dooro', 'doorc', 'open', 'close', 'low', 'high', 'start', 'end', 'clock', 'timeup', 'humidifler', 'hot', 'wind', 'red', 'blue'];

enum TalkerCmd {
    //% block=你好
    hello = 0,
    //% block=再见
    goodbye,
    //% block=好的
    yes,
    //% block=不行
    no,
    //% block=早上好
    morning,
    //% block=马上去
    now,
    //% block=已打开
    opened,
    //% block=已关闭
    closed,
    //% block=时间到
    timeout,
}
const TalkerCmdStr = ['\u0001', '\u0002', '\u0004', '\u0005', '\u0006', '\u0007', '\u0008', '\u0009', '\u0003', '\u0010', '\u0011', '\u0012', '\u0013', '\u0014', '\u0015', '\u0016', '\u0017', '\u0018', '\u0019', '\u0020'];

/**
 * Talking extension for SU-03T
 */
//% color=#FC4B4B weight=103.5 icon="\uf028"
//% block="小酷宝语音模块"
namespace CoolTalker {

    //% blockId=CoolTalker_Init group=CoolTalker
    //% block="初始化小酷宝在 %pin| "
    export function TalkerInit(pin: TalkerPin) {
        serial.redirect(pin + 1, pin + 0, 9600);
    }

    //% blockId=CoolTalker_when_receive group=CoolTalker
    //% block="当听见 %wordword=TalkerWord |||"
    //% expandableArguementMode=enable deprecated=true
    export function WhenReceiveWord(word: string, body?: () => void) {
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
    //% blockId=CoolTalker_isheard group=CoolTalker
    //% block="是否听见%word=TalkerWord?"
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

    //% blockId=CoolTalker_sendcmd group=CoolTalker
    //% block="小酷宝说 %str| "
    //% str.fieldEditor="gridpicker" str.fieldOptions.columns=4
    //% str.fieldOption.tooltips="false"
    //% str.fieldOptions.width="250"
    export function Sendcmd(cmd: TalkerCmd) {
        serial.writeString("st");
        serial.writeString(TalkerCmdStr[cmd]);
        serial.writeString("ed");
    }

    //% blockId=TalkerWord block="%word"
    //% blockGap=8 group=CoolTalker
    //% word.fieldEditor="gridpicker" word.fieldOptions.columns=6
    //% word.fieldOptions.tooltips="false" 
    //% word.fieldOptions.width="250"
    export function TalkerWord(word: TalkerWords): string {
        return TalkerWordsStr[word];
    }

}