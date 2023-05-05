export class PCB {
    pid: number //标识信息
    state: string //状态
    serverTime: number //运行时间
    address: string //存储地址
    nowInfo: string //现场信息
    manageInfo: string //管理信息  记录下运行到的时间
    remainTime: number
    interTime: number
    lastTime: number
    constructor(
        pid: number,
        state: string,
        serverTime: number,
        address: string,
        nowInfo: string,
        manageInfo: string,
        remainTime: number,
        lastTime: number,
        interTime: number
    ) {
        this.pid = pid
        this.state = state
        this.serverTime = serverTime
        this.address = address
        this.nowInfo = nowInfo
        this.manageInfo = manageInfo
        this.remainTime = remainTime
        this.interTime = interTime
        this.lastTime = lastTime
    }
}
