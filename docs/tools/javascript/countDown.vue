<script setup>
import { reactive } from 'vue'
import { ref } from 'vue'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

// 配置 duration 插件
dayjs.extend(duration)

const state = reactive({ timer: ['0', '00', '00', '00'], count: null })

const timerRef = ref({ current: null })

// 计算倒计时的时间差
const countdown = () => {
  const now = dayjs()
  // 目标日期（默认为当天 23:59:59）
  const target = dayjs().endOf('D')
  const diff = target.diff(now)
  // 将时间差转换为 Day.js 对象
  const durationDiff = dayjs.duration(diff)
  state.count = durationDiff
}

// 倒计时格式化
const calcMS = (t) => dayjs.duration(t).format('D-HH-mm-ss')

const initTimer = (t) => {
  if (t < 0) return
  const intervalFun = setInterval(() => {
    t -= 1000
    if (t > 0) {
      state.timer = calcMS(t).split('-')
    } else {
      state.timer = ['0', '00', '00', '00']
      clearInterval(timerRef.value)
    }
  }, 1000)
  timerRef.value = { current: intervalFun }
}
countdown()
setInterval(countdown, 1000)

initTimer(89098909)

const format = '[<span>]HH[</span>] 时 [<span>]mm[</span>] 分 [<span>]ss[</span>] 秒'
</script>

<template>
  <div class="countdown" v-html="state.count.format(format)"></div>

  <p>{{ state.count.format('D 天 HH 时 mm 分 ss 秒') }}</p>
  <p>{{ state.count.format('DD : HH : mm : ss') }}</p>
  <p>{{ state.count.format('HH-mm-ss') }}</p>

  <div class="countdown">
    使用取值方法：
    <span>{{ state.count.hours() }}</span>
    时
    <span>{{ state.count.minutes() }}</span>
    分
    <span>{{ state.count.seconds() }}</span>
    秒
    <span>{{ state.count.milliseconds() }}</span>
  </div>

  <div>
    距活动结束：<span className="countdown-num">{{ state.timer[0] }}</span
    >天 <span className="countdown-num">{{ state.timer[1] }}</span
    >时 <span className="countdown-num">{{ state.timer[2] }}</span
    >分 <span className="countdown-num">{{ state.timer[3] }}</span
    >秒
  </div>
</template>
