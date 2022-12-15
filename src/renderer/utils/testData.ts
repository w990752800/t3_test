export type CheckOutObj = {
    id: string;
    name: string;
    type: 'auto' | 'tip' | 'ack',
    tip: string;
    writeContent: string;
    status: 'none' | 'fail' | 'success' | 'loading'
}

export type CheckOut = {
    [key: string]: CheckOutObj
}

export const CHECK_OUT: CheckOut = {
    chipTester: {
        id: 'chipTester',
        name: '主芯片功能测试',
        type: 'auto',
        tip: '',
        writeContent: 'chipInfo',
        status: 'none'
    },
    wifiTester: {
        id: 'wifiTester',
        name: 'wifi功能测试',
        type: 'auto',
        tip: '',
        writeContent: 'wifi',
        status: 'none'
    },
    // ----
    key1Tester: {
        id: 'key1Tester',
        name: '按键1测试',
        type: 'tip',
        tip: '请按下按键1',
        writeContent: 'keyboard',
        status: 'none'
    },
    sprayTester: {
        id: 'sprayTester',
        name: '雾化器功能测试',
        type: 'ack',
        tip: '请确认雾化器是否喷雾',
        writeContent: 'spray',
        status: 'none'
    },
    displayTester: {
        id: 'displayTester',
        name: '显示屏功能测试',
        type: 'ack',
        tip: '请确认显示屏图片是否与右图一致',
        writeContent: 'lcd',
        status: 'none'
    },
}
// const CHECK_OUT = {
//     bluetoothTester: new Tester('蓝牙功能测试', 'auto', '', 'bt'),
//     SDcardTester: new Tester('SD卡功能测试', 'auto', '', 'SDcard'),
//     // lightTester: new Tester('灯带功能测试', 'auto', '', 'chipInfo'),
//     batteryTester: new Tester('电量检测功能测试', 'auto', '', 'battery'),
//     touchKeyTester: new Tester('触摸屏按钮测试', 'tip', '请点击触摸屏按钮', 'touchKey'),
//     touchPadTester: new Tester('触摸屏功能测试', 'auto', '', 'touchKey'),
//     key1Tester: new Tester('按键1测试', 'tip', '请按下按键1', 'keyboard'),
//     key2Tester: new Tester('按键2测试', 'tip', '请按下按键2', 'keyboard'),
//     key3Tester: new Tester('按键3测试', 'tip', '请按下按键3', 'keyboard'),
//     key4Tester: new Tester('按键4测试', 'tip', '请按下按键4', 'keyboard'),
//     keyboardTester: new Tester('按键板功能测试', 'auto', '', 'keyboard'),
//     sprayTester: new Tester('雾化器功能测试', 'ack', '请确认雾化器是否喷雾', 'spray'),
//     displayTester: new Tester('显示屏功能测试', 'ack', '请确认显示屏图片是否与右图一致', 'lcd'),
//     cameraTester: new Tester('摄像头功能测试', 'ack', '请确认显示屏是否正确显示摄像头内容', 'camera'),
//     musicTester: new Tester('音乐播放器功能测试', 'ack', '请确认音乐是否正常播放', 'mplayer')
// }
