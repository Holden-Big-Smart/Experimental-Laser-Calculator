<template>
  <div>
    <h3 class="text-xl text-center my-0">名称：双折射滤光片</h3>
    <div class="flex justify-center gap-2 my-2 text-sm">
      <p class="text-right mb-0">版本号：V0.1-A0.1-D0.1</p>
      <p class="mb-0">发布日期：2024.04.30</p>
    </div>
    <div class="flex justify-center gap-2 my-2 text-sm">
      <button class="underline" @click="emitter.emit('feedback')">问题反馈</button>
      <button class="underline" @click="emitter.emit('help')">帮助</button>
    </div>

    <div class="grid grid-cols-2 gap-4 bg-white rounded-md px-4 py-2">
      <div>
        <!-- S 单片参数 -->
        <fieldset class="my-4">
          <legend class="text-sm font-bold">单片参数</legend>
          <div class="my-2 flex items-center gap-2">
            <span class="text-sm w-[9em]">石英晶体厚度：</span>
            <input v-model="d" class="input input-sm input-bordered" type="number" />
            <span class="text-sm">mm</span>
          </div>
          <div class="my-2 flex items-center gap-2">
            <span class="text-sm w-[9em]">晶轴与表面夹角：</span>
            <input v-model="alpha" class="input input-sm input-bordered" type="number" />
            <span class="text-sm">度</span>
          </div>
        </fieldset>
        <!-- E 输入参数 -->

        <!-- S 三片组合参数 -->
        <fieldset class="my-4">
          <legend class="text-sm font-bold">三片组合参数</legend>
          <div class="my-2 flex items-center gap-2">
            <span class="text-sm w-[9em]">第2片厚度是第1片：</span>
            <input v-model="R2" class="input input-sm input-bordered" type="number" />
            <span class="text-sm">倍</span>
          </div>
          <div class="my-2 flex items-center gap-2">
            <span class="text-sm w-[9em]">第3片厚度是第1片：</span>
            <input v-model="R3" class="input input-sm input-bordered" type="number" />
            <span class="text-sm">倍</span>
          </div>
        </fieldset>
        <!-- E 三片组合参数 -->
      </div>

      <!-- S 绘图输入参数 -->
      <fieldset class="my-4">
        <legend class="text-sm font-bold">绘图输入参数</legend>
        <div class="my-2 flex items-center gap-2">
          <span class="text-sm w-[7em]">起始激光波长：</span>
          <input v-model="startWave" class="input input-sm input-bordered" type="number" />
          <span class="text-sm">nm</span>
        </div>
        <div class="my-2 flex items-center gap-2">
          <span class="text-sm w-[7em]">结束激光波长：</span>
          <input v-model="endWave" class="input input-sm input-bordered" type="number" />
          <span class="text-sm">mm</span>
        </div>
        <div class="my-2 flex items-center gap-2">
          <span class="text-sm w-[7em]">计算点数：</span>
          <input v-model="iCount" class="input input-sm input-bordered" type="number" />
        </div>
        <div class="my-2 flex items-center gap-2">
          <span class="text-sm w-[7em]">起始入射角度：</span>
          <input v-model="A1" class="input input-sm input-bordered" type="number" />
          <span class="text-sm">度</span>
        </div>
        <div class="my-2 flex items-center gap-2">
          <span class="text-sm w-[7em]">结束入射角度：</span>
          <input v-model="A3" class="input input-sm input-bordered" type="number" />
          <span class="text-sm">度</span>
        </div>
      </fieldset>
      <!-- E 输入光栅参数 -->

      <!-- S 绘图 -->
      <div class="col-span-2 text-center">
        <button class="btn btn-sm btn-neutral" @click="handleCalGratingParametersListClick">
          绘图
        </button>
      </div>
      <!-- E 绘图 -->

      <fieldset class="my-4" v-if="!!AOption.series.length">
        <legend class="text-sm font-bold">绘图输出参数</legend>
        <div class="h-[160px]">
          <v-chart class="chart" ref="ACharts" :option="AOption" autoresize />
        </div>
        <div class="flex ml-[7em] my-4">
          <button
            class="btn btn-sm btn-neutral"
            @click="useExportEChartData(AOption, '单片透射光谱')"
          >
            保存数据
          </button>
          <button
            class="btn btn-sm btn-ghost mx-4"
            @click="useExportEChart($refs.ACharts, '单片透射光谱')"
          >
            保存图形
          </button>
        </div>
      </fieldset>
      <fieldset class="my-4" v-if="!!BOption.series.length">
        <legend class="text-sm font-bold">绘图输出参数</legend>
        <div class="h-[160px]">
          <v-chart class="chart" ref="BCharts" :option="BOption" autoresize />
        </div>
        <div class="flex ml-[7em] my-4">
          <button
            class="btn btn-sm btn-neutral"
            @click="useExportEChartData(BOption, '三片透射光谱')"
          >
            保存数据
          </button>
          <button
            class="btn btn-sm btn-ghost mx-4"
            @click="useExportEChart($refs.BCharts, '三片透射光谱')"
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
import {
  dllSzsCalBirefringenceSpectrumList,
  dllSzsCalBirefringenceSpectrumSingleList
} from '@/api/dll'
import { reactive, ref } from 'vue'
import emitter from '@/utils/eventBus.js'
import { toFixed } from '@/utils/index.js'
import useExportEChartData from '@/hooks/useExportEChartData.js'
import useExportEChart from '@/hooks/useExportEChart.js'
import { GRID } from '@/utils/constant.js'
const AOption = reactive({
  color: ['#1677ff', '#ff7f50'],
  grid: GRID,
  tooltip: {
    trigger: 'axis'
  },
  xAxis: {
    name: '波长/nm',
    nameLocation: 'center',
    nameTextStyle: {
      lineHeight: 30
    },
    axisLabel: {
      formatter: (value) => toFixed(value) // 保留两位小数
    },
    data: []
  },
  yAxis: {
    name: '单片透射光谱输出'
  },
  series: [
    // {
    //   type: 'line',
    //   smooth: true,
    //   symbol: 'none',
    //   lineStyle: {
    //     color: '#1677ff'
    //   },
    //   data: chartResult.value
    // }
  ]
})
const BOption = reactive({
  color: ['#1677ff', '#ff7f50'],
  grid: GRID,
  tooltip: {
    trigger: 'axis'
  },
  xAxis: {
    name: '波长/nm',
    nameLocation: 'center',
    nameTextStyle: {
      lineHeight: 30
    },
    axisLabel: {
      formatter: (value) => toFixed(value) // 保留两位小数
    },
    data: []
  },
  yAxis: {
    name: '三片透射光谱输出',
    width: 260
  },
  series: [
    // {
    //   type: 'line',
    //   smooth: true,
    //   symbol: 'none',
    //   lineStyle: {
    //     color: '#1677ff'
    //   },
    //   data: chartResult.value
    // }
  ]
})
// S 输入参数
const A1 = ref(30) // 角度A1 起始入射角（度）
const A3 = ref(50) // 石英晶体厚度 单位mm。
const d = ref(0.55) // 第2片厚度是第1片的倍数
const R3 = ref(9) // 第3片厚度是第1片的倍数
const R2 = ref(3) // 第2片厚度是第1片的倍数
const alpha = ref(0) // 晶轴与表面的夹角alpha，单位为度。
const startWave = ref(700) // 起始波长，单位nm
const endWave = ref(900) // 结束波长，单位nm。
const iCount = ref(100) // 计算点数，即需要计算的信号波长个数
// E 输入参数

const handleCalGratingParametersListClick = () => {
  // 若已知7，8，1，3，4 ，2，5，6，9 时
  if (
    isNumber(A1.value) &&
    isNumber(A3.value) &&
    isNumber(d.value) &&
    isNumber(R3.value) &&
    isNumber(R2.value) &&
    isNumber(startWave.value) &&
    isNumber(endWave.value) &&
    isNumber(iCount.value) &&
    isNumber(alpha.value)
  ) {
    // 用calBirefringenceSpectrumList计算曲线B区域
    // 输出result[3*次数【9】+0]：曲线纵坐标（起始入射角透射率）
    // 输出result[3*次数【9】+1]：曲线纵坐标（结束入射角透射率）
    // 输出result[3*次数【9】+2]：曲线横坐标（波长/nm）
    dllSzsCalBirefringenceSpectrumList({
      A1: A1.value,
      A3: A3.value,
      d: d.value,
      R3: R3.value,
      R2: R2.value,
      startWave: startWave.value,
      endWave: endWave.value,
      iCount: iCount.value,
      alpha: alpha.value
    }).then((res) => {
      const xAxis = [],
        y1Axis = [],
        y2Axis = []

      for (let i = 0; i < iCount.value; i++) {
        xAxis.push(res.data[3 * i + 2])
        y1Axis.push(res.data[3 * i])
        y2Axis.push(res.data[3 * i + 1])
      }

      BOption.xAxis.data = xAxis
      BOption.series = [
        {
          name: '起始入射角透射率',
          type: 'line',
          smooth: true,
          symbol: 'none',
          data: y1Axis
        },
        {
          name: '结束入射角透射率',
          type: 'line',
          smooth: true,
          symbol: 'none',
          data: y2Axis
        }
      ]
    })

    // 同时曲线A有两条曲线，用7，8，1，2，5，6，9时，用calBirefringenceSpectrumSingleList
    // 输出result[3*次数【9】+0]：曲线纵坐标（起始入射角透射率）
    // 输出result[3*次数【9】+1]：曲线纵坐标（结束入射角透射率）
    // 输出result[3*次数【9】+2]：曲线横坐标（波长/nm）
    // 所以曲线A有两条曲线
    dllSzsCalBirefringenceSpectrumSingleList({
      A1: A1.value,
      A3: A3.value,
      d: d.value,
      startWave: startWave.value,
      endWave: endWave.value,
      iCount: iCount.value,
      alpha: alpha.value
    }).then((res) => {
      const xAxis = [],
        y1Axis = [],
        y2Axis = []

      for (let i = 0; i < iCount.value; i++) {
        xAxis.push(res.data[3 * i + 2])
        y1Axis.push(res.data[3 * i])
        y2Axis.push(res.data[3 * i + 1])
      }

      AOption.xAxis.data = xAxis
      AOption.series = [
        {
          name: '起始入射角透射率',
          type: 'line',
          smooth: true,
          symbol: 'none',
          data: y1Axis
        },
        {
          name: '结束入射角透射率',
          type: 'line',
          smooth: true,
          symbol: 'none',
          data: y2Axis
        }
      ]
    })
  }
}
// E 绘图输入参数
</script>
