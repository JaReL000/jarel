<template>
    <div id="box">
        <simulation-scroll-y
            ref="ssy"
            @on-transmove-end="testFn"
            >
            <div class="content">
                <p v-for="obj in list">{{obj.txt}}</p>
            </div>
        </simulation-scroll-y>
    </div>
</template>

<script>
import SimulationScrollY from '@/jinr-sdk/components/simulation-scroll/vue-component/simulation-scroll-y.vue'

function createTxt (i) {
    let str = ''
    for (let k = 0; k < 200; k++) {
        str += i + '----'
    }
    return str
}

let listData = []
for (let i = 0; i < 200; i++) {
    listData.push({
        txt: createTxt(i)
    })
}
export default {
    name: 'app',
    data () {
        return {
            list: listData
        }
    },
    methods: {
        testFn: function (currentY) {
            console.log(currentY)
        }
    },
    components: {
        SimulationScrollY
    },
    mounted () {
        let ssy = this.$refs.ssy
    }
}
</script>

<style>
#box {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    box-sizing: border-box;
    overflow: hidden;
}
.content p {
    margin: 0;
    height: 40px;
    line-height: 40px;
    text-indent: 20px;
    font-size: 24px;
    color: #fff;
    white-space: nowrap;
    background-color: #2aa198;
}
</style>


