<template>
  <div>
    <h3 class="text-xl text-center my-0">名称：四镜共焦腔</h3>
    <div class="flex justify-center gap-2 my-2 text-sm">
      <p class="text-right mb-0">版本号：V0.1-A0.1-D0.1</p>
      <p class="mb-0">发布日期：2024.04.30</p>
    </div>
    <div class="flex justify-center gap-2 my-2 text-sm">
      <button class="underline" @click="emitter.emit('feedback')">问题反馈</button>
      <button class="underline" @click="emitter.emit('help')">帮助</button>
    </div>

    <div class="bg-white rounded-md px-4 py-2">
      <!-- S 信号激光参数 -->
      <fieldset class="my-4">
        <legend class="text-sm font-bold">信号激光参数</legend>

        <div class="grid grid-cols-2">
          <div class="my-2 flex items-center gap-2">
            <span class="text-sm w-[10em]">激光波长：</span>
            <input v-model="state.lamda" class="input input-sm input-bordered" type="number" />
            <span class="text-sm">nm</span>
          </div>
          <div class="my-2 flex items-center gap-2">
            <span class="text-sm w-[10em]">凹面镜M1曲率半径：</span>
            <input v-model="state.r1" class="input input-sm input-bordered" type="number" />
            <span class="text-sm">mm</span>
          </div>
          <div class="my-2 flex items-center gap-2">
            <span class="text-sm w-[10em]">L1长度：</span>
            <input v-model="state.L1" class="input input-sm input-bordered" type="number" />
            <span class="text-sm">mm</span>
          </div>
          <div class="my-2 flex items-center gap-2">
            <span class="text-sm w-[10em]">凹面镜M1折叠角：</span>
            <input v-model="state.theta1" class="input input-sm input-bordered" type="number" />
            <span class="text-sm">度</span>
          </div>
          <div class="my-2 flex items-center gap-2">
            <span class="text-sm w-[10em]">L2长度：</span>
            <input v-model="state.L2" class="input input-sm input-bordered" type="number" />
            <span class="text-sm">mm</span>
          </div>
          <div class="my-2 flex items-center gap-2">
            <span class="text-sm w-[10em]">凹面镜M2曲率半径：</span>
            <input v-model="state.r2" class="input input-sm input-bordered" type="number" />
            <span class="text-sm">mm</span>
          </div>
          <div class="my-2 flex items-center gap-2">
            <span class="text-sm w-[10em]">L3长度：</span>
            <input v-model="state.L3" class="input input-sm input-bordered" type="number" />
            <span class="text-sm">mm</span>
          </div>
          <div class="my-2 flex items-center gap-2">
            <span class="text-sm w-[10em]">凹面镜M2折叠角：</span>
            <input v-model="state.theta2" class="input input-sm input-bordered" type="number" />
            <span class="text-sm">度</span>
          </div>
          <div class="my-2 flex items-center gap-2">
            <span class="text-sm w-[10em]">L4长度：</span>
            <input v-model="state.L4" class="input input-sm input-bordered" type="number" />
            <span class="text-sm">mm</span>
          </div>
          <div class="my-2 flex items-center gap-2">
            <span class="text-sm w-[10em]">布氏角晶体长度：</span>
            <input v-model="state.D" class="input input-sm input-bordered" type="number" />
            <span class="text-sm">mm</span>
          </div>
          <div class="my-2 flex items-center gap-2">
            <span class="text-sm w-[10em]">绘图间隔（步长）：</span>
            <input v-model="state.interval" class="input input-sm input-bordered" type="number" />
            <span class="text-sm">mm</span>
          </div>
          <div class="my-2 flex items-center gap-2">
            <span class="text-sm w-[10em]">布氏角晶体折射率：</span>
            <input v-model="state.n" class="input input-sm input-bordered" type="number" />
            <span class="text-sm">mm</span>
          </div>
        </div>

        <div class="mt-2 text-center">
          <button class="btn btn-sm btn-neutral" @click="handleCalGratingParametersListClick">
            计&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;算
          </button>
        </div>
      </fieldset>
      <!-- E 信号激光参数 -->

      <fieldset class="my-4" v-if="!!xAxis_a.length">
        <legend class="text-sm font-bold">绘图输出参数</legend>
        <div class="h-[300px]">
          <v-chart class="chart" ref="charts" :option="aOption" autoresize />
        </div>
        <div class="flex ml-[7em] my-4">
          <button
            class="btn btn-sm btn-neutral"
            @click="useExportEChartData(aOption, '四镜共焦腔')"
          >
            保存数据
          </button>
          <button
            class="btn btn-sm btn-ghost mx-4"
            @click="useExportEChart($refs.charts, '四镜共焦腔')"
          >
            保存图形
          </button>
        </div>
      </fieldset>
    </div>
  </div>
</template>

<script setup>
import { isNumber } from 'radash'
import { dllSjCalCavityByFourMirrorsHor, dllSjCalCavityByFourMirrorsVer } from '@/api/dll'
import { computed, reactive, ref } from 'vue'
import emitter from '@/utils/eventBus.js'
import useExportEChartData from '@/hooks/useExportEChartData.js'
import useExportEChart from '@/hooks/useExportEChart.js'
import { GRID } from '@/utils/constant.js'
const xAxis_a = ref([])
const yAxis_a = ref([])
const yAxis_b = ref([])
const aOption = computed(() => ({
  color: ['#1677ff', '#ff7f50'],
  grid: GRID,
  tooltip: {
    trigger: 'axis'
  },
  xAxis: {
    name: '位置/mm',
    nameLocation: 'center',
    nameTextStyle: {
      lineHeight: 30
    },
    data: xAxis_a.value
  },
  yAxis: {
    name: '垂直面腰斑尺寸/um'
  },
  series: [
    {
      name: '水平面腰斑尺寸/um',
      type: 'line',
      smooth: true,
      symbol: 'none',
      data: yAxis_a.value
    },
    {
      name: '垂直面腰斑尺寸/um',
      type: 'line',
      smooth: true,
      symbol: 'none',
      data: yAxis_b.value
    }
  ]
}))

// S 输入参数
const state = reactive({
  /** 激光波长，单位为 nm*/
  lamda: 800, // 1

  /** M1 镜半径，单位为 mm*/
  r1: 100, // 2

  /** 第一段长度，单位为 mm*/
  L1: 200, // 3

  /** M1 镜倾斜角度*/
  theta1: 10, // 4

  /** 第二段长度，单位为 mm*/
  L2: 50, // 5

  /** M2 镜半径，单位为 mm*/
  r2: 100, // 6

  /** M2 镜倾斜角度*/
  theta2: 10, // 8

  /** 第三段长度，单位为 mm*/
  L3: 50, // 7

  /** 第四段长度，单位为 mm*/
  L4: 200, // 9

  /** 晶体长度，单位为 mm*/
  D: 4, // 10

  /** 计算间隔，步长*/
  interval: 1, // 11

  /** 晶体的折射率*/
  n: 1.76 // 12
})

const handleCalGratingParametersListClick = () => {
  // 若已知2，3，4，5，10，1，6，8，11，7，9，12 时，用calCavityByFourMirrorsHor
  if (
    isNumber(state.r1) &&
    isNumber(state.L1) &&
    isNumber(state.theta1) &&
    isNumber(state.L2) &&
    isNumber(state.D) &&
    isNumber(state.lamda) &&
    isNumber(state.r2) &&
    isNumber(state.theta2) &&
    isNumber(state.interval) &&
    isNumber(state.L3) &&
    isNumber(state.L4) &&
    isNumber(state.n)
  ) {
    Promise.all([
      dllSjCalCavityByFourMirrorsHor(state),
      dllSjCalCavityByFourMirrorsVer(state)
    ]).then(([{ data: data1 }, { data: data2 }]) => {
      const _ax = [],
        _ay = [],
        _by = []

      for (let i = 0; i < data1.length; i += 2) {
        _ax.push(data1[i])
        _ay.push(data1[i + 1])
        _by.push(data2[i + 1])
      }

      xAxis_a.value = _ax
      yAxis_a.value = _ay
      yAxis_b.value = _by
    })
  }
}
</script>
