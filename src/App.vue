<template>
    <div class="App">
        <div id="main" style="width: 600px; height: 400px"></div>
        <button @click="increment">{{ time }}</button>
    </div>
</template>

<script setup lang="ts">
import type { PCB } from './assets/pcb'
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
        legend: {},
        tooltip: {},
        dataset: {
            dimensions: [
                'product',
                '2015',
                '2016',
                '2017'
                // 'PCB',
                // 'pid',
                // 'state',
                // 'serverTime',
                // 'address',
                // 'nowInfo',
                // 'remainTime',
                // 'interTime',
                // 'managerInfo',
                // 'lastTime'
            ],
            source: [{ product: 'Walnut Brownie', 2015: 72.4, 2016: 53.9, 2017: 39.1 }]
        },
        xAxis: { type: 'category' },
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [
            //设置柱状图
            { type: 'bar' },
            { type: 'bar' },
            { type: 'bar' }
            // { type: 'bar' },
            // { type: 'bar' },
            // { type: 'bar' }
        ]
    }
    option && myChart.setOption(option)
}

const time = ref(0)

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
    tmp.interTime = time.value //进入队列的时间
    runningQueue.push(tmp)
}

function interrupt() {}

function running() {
    time.value++
    runningQueue.forEach(function (item, index) {
        item.lastTime++
        item.remainTime = item.serverTime - item.lastTime
    })
}

function increment() {
    time.value++
}
</script>

<style lang="scss" scoped></style>
