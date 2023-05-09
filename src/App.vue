<template>
    <div class="App">
        <el-form :model="form" label-width="120px">
            <el-form-item label="进程1">
                <br />
                需要运行的时间<el-input v-model="form.time1" /> 需要io时间<el-input
                    v-model="form.time1io"
                />
                io时间时长<el-input v-model="form.time1iolast" />
                <el-button @click="block1">阻塞</el-button>
                <el-button @click="run1">运行</el-button>
            </el-form-item>
            <el-form-item label="进程2">
                <br />
                需要运行的时间<el-input v-model="form.time2" /> 需要io时间<el-input
                    v-model="form.time2io"
                />
                io时间时长<el-input v-model="form.time2iolast" />
                <el-button @click="block2">阻塞</el-button>
                <el-button @click="run2">运行</el-button>
            </el-form-item>
            <el-form-item label="进程3">
                <br />
                需要运行的时间<el-input v-model="form.time3" /> 需要io时间<el-input
                    v-model="form.time3io"
                />
                io时间时长<el-input v-model="form.time3iolast" />
                <el-button @click="block3">阻塞</el-button>
                <el-button @click="run3">运行</el-button>
            </el-form-item>
            <el-form-item label="进程4">
                <br />
                需要运行的时间<el-input v-model="form.time4" /> 需要io时间<el-input
                    v-model="form.time4io"
                />
                io时间时长<el-input v-model="form.time4iolast" />
                <el-button @click="block4">阻塞</el-button>
                <el-button @click="run4">运行</el-button>
            </el-form-item>
            <el-form-item label="进程5">
                <br />
                需要运行的时间<el-input v-model="form.time5" /> 需要io时间<el-input
                    v-model="form.time5io"
                />
                io时间时长<el-input v-model="form.time5iolast" />
                <el-button @click="block5">阻塞</el-button>
                <el-button @click="run5">运行</el-button>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit">进程就绪</el-button>
                <el-button>Cancel</el-button>
            </el-form-item>
        </el-form>
        当前运行的时间 {{ time }}<br />
        <el-button @click="increment">点击进入下一秒</el-button>
        <el-button
            @click="
                () => {
                    time = 0
                }
            "
        >
            清零
        </el-button>
        <el-button @click="create">进程创建</el-button>
        <div class="queue" :class="{ active: isActive }">
            <div id="main" style="width: 600px; height: 200px">
                空闲队列
                <li v-for="(item, index) in freeQueue">
                    pid：{{ item.pid }} - 状态：free - 需要占用的时间：{{ item.serverTime }} -
                    剩余时间{{ item.remainTime }} -- Io时间{{ item.interTime }} -- io剩余时间{{
                        item.lastTime
                    }}
                </li>
            </div>
            <div id="main" style="width: 600px; height: 200px">
                就绪队列
                <li v-for="(item, index) in readyQueue">
                    pid：{{ item.pid }} - 状态：free - 需要占用的时间：{{ item.serverTime }} -
                    剩余时间{{ item.remainTime }} -- Io时间{{ item.interTime }} -- io剩余时间{{
                        item.lastTime
                    }}
                </li>
            </div>
            <div id="main" style="width: 600px; height: 200px">
                阻塞队列
                <li v-for="(item, index) in blockQueue">
                    pid：{{ item.pid }} - 状态：free - 需要占用的时间：{{ item.serverTime }} -
                    剩余时间{{ item.remainTime }} -- Io时间{{ item.interTime }} -- io剩余时间{{
                        item.lastTime
                    }}
                </li>
            </div>
            <div id="main" style="width: 600px; height: 200px">
                运行队列
                <li v-for="(item, index) in runningQueue">
                    pid：{{ item.pid }} - 状态：free - 需要占用的时间：{{ item.serverTime }} -
                    剩余时间{{ item.remainTime }} -- Io时间{{ item.interTime }} -- io剩余时间{{
                        item.lastTime
                    }}
                </li>
            </div>
            <div id="main" style="width: 600px; height: 200px">
                退出队列
                <li v-for="(item, index) in exitQueue">
                    pid：{{ item.pid }} - 状态：free - 需要占用的时间：{{ item.serverTime }} -
                    剩余时间{{ item.remainTime }} -- Io时间{{ item.interTime }} -- io剩余时间{{
                        item.lastTime
                    }}
                </li>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { PCB } from './assets/pcb'
import { ref, onMounted } from 'vue'
import { reactive } from 'vue'
//  按需引入 echarts
import * as echarts from 'echarts'
// 挂载的时候进行可视化
onMounted(() => {})
// function init1() {
//     type EChartsOption = echarts.EChartsOption

//     var chartDom = document.getElementById('main')!
//     var myChart = echarts.init(chartDom)
//     var option: EChartsOption

//     option = {
//         legend: {},
//         tooltip: {},
//         dataset: {
//             dimensions: [
//                 'product',
//                 '2015',
//                 '2016',
//                 '2017'
//                 // 'PCB',
//                 // 'pid',
//                 // 'state',
//                 // 'serverTime',
//                 // 'address',
//                 // 'nowInfo',
//                 // 'remainTime',
//                 // 'interTime',
//                 // 'managerInfo',
//                 // 'lastTime'
//             ],
//             source: [{ product: 'Walnut Brownie', 2015: 72.4, 2016: 53.9, 2017: 39.1 }]
//         },
//         xAxis: { type: 'category' },
//         yAxis: {},
//         // Declare several bar series, each will be mapped
//         // to a column of dataset.source by default.
//         series: [
//             //设置柱状图
//             { type: 'bar' },
//             { type: 'bar' },
//             { type: 'bar' }
//             // { type: 'bar' },
//             // { type: 'bar' },
//             // { type: 'bar' }
//         ]
//     }
//     option && myChart.setOption(option)
// }

const time = ref(0)
let isActive: boolean = false
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

function runProcess() {
    let tmp: PCB = readyQueue.shift()!
    tmp.state = 'running'
    tmp.interTime = time.value //进入队列的时间
    runningQueue.push(tmp)
}

function interrupt() {}

function create() {
    runningQueue.push(readyQueue.pop()!)
}

function block1() {
    for (let i = 0; i < runningQueue.length; i++) {
        if ((runningQueue[i].pid = 1)) {
            blockQueue.push(runningQueue[i])
            runningQueue.splice(i, 1)
        }
    }
}

function block2() {
    for (let i = 0; i < runningQueue.length; i++) {
        if ((runningQueue[i].pid = 2)) {
            blockQueue.push(runningQueue[i])
            runningQueue.splice(i, 1)
        }
    }
}
function block3() {
    for (let i = 0; i < runningQueue.length; i++) {
        if ((runningQueue[i].pid = 3)) {
            blockQueue.push(runningQueue[i])
            runningQueue.splice(i, 1)
        }
    }
}
function block4() {
    for (let i = 0; i < runningQueue.length; i++) {
        if ((runningQueue[i].pid = 4)) {
            blockQueue.push(runningQueue[i])
            runningQueue.splice(i, 1)
        }
    }
}
function block5() {
    for (let i = 0; i < runningQueue.length; i++) {
        if ((runningQueue[i].pid = 5)) {
            blockQueue.push(runningQueue[i])
            runningQueue.splice(i, 1)
        }
    }
}

function run1() {
    for (let i = 0; i < blockQueue.length; i++) {
        if ((blockQueue[i].pid = 1)) {
            runningQueue.push(blockQueue[i])
            blockQueue.splice(i, 1)
        }
    }
}
function run2() {
    for (let i = 0; i < blockQueue.length; i++) {
        if ((blockQueue[i].pid = 2)) {
            runningQueue.push(blockQueue[i])
            blockQueue.splice(i, 1)
        }
    }
}
function run3() {
    for (let i = 0; i < blockQueue.length; i++) {
        if ((blockQueue[i].pid = 3)) {
            runningQueue.push(blockQueue[i])
            blockQueue.splice(i, 1)
        }
    }
}
function run4() {
    for (let i = 0; i < blockQueue.length; i++) {
        if ((blockQueue[i].pid = 4)) {
            runningQueue.push(blockQueue[i])
            blockQueue.splice(i, 1)
        }
    }
}
function run5() {
    for (let i = 0; i < blockQueue.length; i++) {
        if ((blockQueue[i].pid = 5)) {
            runningQueue.push(blockQueue[i])
            blockQueue.splice(i, 1)
        }
    }
}

function increment() {
    time.value++
    for (let i: number = 0; i < runningQueue.length; i++) {
        runningQueue[i].remainTime--
    }
    //到时间退出队列
    for (let i: number = 0; i < runningQueue.length; i++) {
        if (runningQueue[i].remainTime <= 0) {
            runningQueue[i].remainTime = 0
            exitQueue.push(runningQueue[i])
            runningQueue.splice(i, 1)
        }
    }

    //到了io时间就 block
    for (let i: number = 0; i < runningQueue.length; i++) {
        if (runningQueue[i].interTime == time.value) {
            blockQueue.push(runningQueue[i])
            runningQueue.splice(i, 1)
        }
    }
    //io完了就就绪
    for (let i: number = 0; i < blockQueue.length; i++) {
        blockQueue[i].lastTime--
        if (blockQueue[i].lastTime <= 0) {
            readyQueue.push(blockQueue[i])
            readyQueue.splice(i, 1)
        }
    }
}

// do not use same name with ref
const form = reactive({
    time1: 0,
    time1io: 0,
    time1iolast: 0,
    time2: 0,
    time2io: 0,
    time3: 0,
    time3io: 0,
    time4: 0,
    time4io: 0,
    time5: 0,
    time5io: 0,
    time2iolast: 0,
    time3iolast: 0,
    time4iolast: 0,
    time5iolast: 0
})

const onSubmit = () => {
    freeQueue[0].serverTime = form.time1
    freeQueue[1].serverTime = form.time2
    freeQueue[2].serverTime = form.time3
    freeQueue[3].serverTime = form.time4
    freeQueue[4].serverTime = form.time5
    freeQueue[0].interTime = form.time1io
    freeQueue[1].interTime = form.time2io
    freeQueue[2].interTime = form.time3io
    freeQueue[3].interTime = form.time4io
    freeQueue[4].interTime = form.time5io
    freeQueue[0].lastTime = form.time1iolast
    freeQueue[1].lastTime = form.time2iolast
    freeQueue[2].lastTime = form.time3iolast
    freeQueue[3].lastTime = form.time4iolast
    freeQueue[4].lastTime = form.time5iolast
    for (let i: number = 0; i < 5; i++) {
        freeQueue[i].remainTime = freeQueue[i].serverTime
    }

    for (let i: number = 0; i < 5; i++) {
        readyQueue.push(freeQueue.shift()!)
    }
}
</script>

<style scoped>
.queue {
    margin-top: 10px;
    display: flex;
}

.active {
    display: block;
}
</style>
