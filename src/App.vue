<template>
    <div class="App">
        <div id="main" style="width: 600px; height: 400px"></div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
//  按需引入 echarts
import * as echarts from 'echarts'
// 挂载的时候进行可视化
onMounted(() => {
    init1()
})
function init1() {
    type EChartsOption = echarts.EChartsOption

    var chartDom = document.getElementById('main')!
    var myChart = echarts.init(chartDom)
    var option: EChartsOption

    option = {
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [150, 230, 224, 218, 135, 147, 260],
                type: 'line'
            }
        ]
    }

    option && myChart.setOption(option)
}

class PCB {
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

let time: number = 0
let freeQueue: PCB[] = [
    {
        pid: 1,
        state: 'free',
        serverTime: 1,
        address: '',
        nowInfo: '',
        remainTime: 0,
        interTime: 0,
        manageInfo: '',
        lastTime: 0
    },
    {
        pid: 2,
        state: 'free',
        serverTime: 1,
        address: '',
        nowInfo: '',
        remainTime: 0,
        interTime: 0,
        manageInfo: '',
        lastTime: 0
    },
    {
        pid: 3,
        state: 'free',
        serverTime: 1,
        address: '',
        nowInfo: '',
        remainTime: 0,
        interTime: 0,
        manageInfo: '',
        lastTime: 0
    },
    {
        pid: 4,
        state: 'free',
        serverTime: 1,
        address: '',
        nowInfo: '',
        remainTime: 0,
        interTime: 0,
        manageInfo: '',
        lastTime: 0
    },
    {
        pid: 5,
        state: 'free',
        serverTime: 1,
        address: '',
        nowInfo: '',
        remainTime: 0,
        interTime: 0,
        manageInfo: '',
        lastTime: 0
    }
]
let readyQueue: PCB[] = []
let runningQueue: PCB[] = []
let blockQueue: PCB[] = []
let exitQueue: PCB[] = []

function init() {
    freeQueue.push()
}

function createProcess(serverTime: number) {
    let tmp: PCB = freeQueue.shift()!
    tmp.state = 'ready'
    tmp.serverTime = serverTime
    readyQueue.push(tmp)
}

function runProcess() {
    let tmp: PCB = readyQueue.shift()!
    tmp.state = 'running'
    tmp.interTime = time //进入队列的时间
    runningQueue.push(tmp)
}

function interrupt() {}

function running() {
    time++
    runningQueue.forEach(function (item, index) {
        item.lastTime++
        item.remainTime = item.serverTime - item.lastTime
    })
}
</script>

<style lang="scss" scoped></style>
