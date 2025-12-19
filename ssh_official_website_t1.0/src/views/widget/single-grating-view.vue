<template>
  <div>
    <h3 class="text-xl text-center my-0">名称：单光栅计算</h3>
    <div class="flex justify-center gap-2 my-2 text-sm">
      <p class="text-right mb-0">版本号：V0.1-A0.1-D0.1</p>
      <p class="mb-0">发布日期：2024.04.30</p>
    </div>
    <div class="flex justify-center gap-2 my-2 text-sm">
      <button class="underline" @click="emitter.emit('feedback')">问题反馈</button>
      <button class="underline" @click="emitter.emit('help')">帮助</button>
    </div>

    <div class="grid grid-cols-2 gap-4 bg-white rounded-md px-4 py-2">
      <!-- S 输入参数 -->
      <fieldset class="my-4">
        <legend class="text-sm font-bold">输入参数</legend>
        <div class="my-2 flex items-center gap-2">
          <span class="text-sm w-[7em]">激光中心波长：</span>
          <input v-model="ddWavelength" class="input input-sm input-bordered" type="number" />
          <span class="text-sm">nm</span>
        </div>
        <div class="my-2 flex items-center gap-2">
          <span class="text-sm w-[7em]">光栅入射角：</span>
          <input v-model="dTetai" class="input input-sm input-bordered" type="number" />
          <span class="text-sm">度</span>
        </div>
        <div class="my-2 flex items-center gap-2">
          <span class="text-sm w-[7em]">光栅刻线密度：</span>
          <input v-model="dNlinesPerMm" class="input input-sm input-bordered" type="number" />
          <span class="text-sm">线/nm</span>
        </div>
        <div class="my-2 flex items-center gap-2">
          <span class="text-sm w-[7em]">衍射级次：</span>
          <input v-model="iDiffractionOrder" class="input input-sm input-bordered" type="number" />
          <span class="text-sm">级</span>
        </div>
        <div class="flex ml-[7em] my-4">
          <button class="btn btn-sm btn-neutral" @click="handleCalGratingParametersClick">
            计算
          </button>
          <button class="btn btn-sm btn-ghost mx-4" @click="handleCalGratingParametersReset">
            清空
          </button>
        </div>
      </fieldset>
      <!-- E 输入参数 -->

      <!-- S 输出参数 -->
      <fieldset class="my-4">
        <legend class="text-sm font-bold">输出参数</legend>
        <div class="my-2 flex items-center gap-2">
          <span class="text-sm w-[7em]">激光衍射角：</span>
          <input v-model="r0" class="input input-sm input-bordered" type="number" disabled />
          <span class="text-sm">度</span>
        </div>
        <div class="my-2 flex items-center gap-2">
          <span class="text-sm w-[7em]">光栅利特罗角：</span>
          <input v-model="r1" class="input input-sm input-bordered" type="number" disabled />
          <span class="text-sm">度</span>
        </div>
      </fieldset>
      <!-- E 输出参数 -->

      <!-- S 绘图输入参数 -->
      <fieldset class="my-4">
        <legend class="text-sm font-bold">绘图输入参数</legend>
        <div class="my-2 flex items-center gap-2">
          <span class="text-sm w-[7em]">变量类型：</span>
          <select class="select select-sm select-bordered" v-model="parametersType">
            <option v-for="type in parametersTypeMap" :value="type.value" :key="type.value">{{ type.label }}</option>
          </select>
        </div>
        <div class="my-2 flex items-center gap-2">
          <span class="text-sm w-[7em]">起始变量值：</span>
          <input v-model="startTetai" class="input input-sm input-bordered" type="number" />
        </div>
        <div class="my-2 flex items-center gap-2">
          <span class="text-sm w-[7em]">结束变量值：</span>
          <input v-model="endTetai" class="input input-sm input-bordered" type="number" />
        </div>
        <div class="my-2 flex items-center gap-2">
          <span class="text-sm w-[7em]">计算点数：</span>
          <input v-model="iCount" class="input input-sm input-bordered" type="number" />
        </div>
        <div class="flex ml-[7em] my-4">
          <button class="btn btn-sm btn-neutral" @click="handleCalGratingParametersListClick">
            绘图
          </button>
        </div>
      </fieldset>
      <!-- E 绘图输入参数 -->

      <!-- S 绘图输出参数 -->
      <fieldset class="my-4" v-if="!!xAxis.length">
        <legend class="text-sm font-bold">绘图输出参数</legend>
        <div class="h-[160px]">
          <v-chart class="chart" ref="charts" :option="option" autoresize />
        </div>
        <div class="flex ml-[7em] my-4">
          <button class="btn btn-sm btn-neutral" @click="useExportEChartData(option, '单光栅')">
            保存数据
          </button>
          <button
            class="btn btn-sm btn-ghost mx-4"
            @click="useExportEChart($refs.charts, '单光栅')"
          >
            保存图形
          </button>
        </div>
      </fieldset>
      <!-- E 绘图输出参数 -->
    </div>
  </div>
</template>

<script setup>
import { isNumber, list, select } from 'radash'
import {
  dllDgsCalGratingParameters,
  dllDgsCalGratingParametersListforIncident,
  dllDgsCalGratingParametersListforlinesPerMm,
  dllDgsCalGratingParametersListforWavelength
} from '@/api/dll/index'
import { computed, ref, watch } from 'vue'
import emitter from '@/utils/eventBus.js'
import { toFixed } from '@/utils/index.js'
import useExportEChartData from '@/hooks/useExportEChartData.js'
import useExportEChart from '@/hooks/useExportEChart.js'

const parametersTypeMap = [
  { value: 'incident', label: '入射角（度）', xAxisName: '入射角/°', yAxisName: '衍射角/°' },
  { value: 'wavelength', label: '中心波长（nm）', xAxisName: '波长/nm', yAxisName: '衍射角/°' },
  { value: 'linesPerMm', label: '刻线密度（线/nm）', xAxisName: '光栅刻线密度', yAxisName: '利特罗角/°' }
]

const option = computed(() => ({
  color: ['#1677ff'],
  grid: {
    left: '3%',
    right: '4%',
    bottom: '10%',
    containLabel: true
  },
  tooltip: {
    trigger: 'axis'
  },
  xAxis: {
    name: select(parametersTypeMap, f => f.xAxisName, f => f.value === parametersType.value),
    nameLocation: 'center',
    nameTextStyle: {
      lineHeight: 30
    },
    data: xAxis.value,
    axisLabel: {
      formatter: (value) => toFixed(value) // 保留两位小数
    }
  },
  yAxis: {
    name: select(parametersTypeMap, f => f.yAxisName, f => f.value === parametersType.value),
    nameLocation: 'end',
    nameTextStyle: {
      lineHeight: 30
    }
  },
  series: [
    {
      type: 'line',
      smooth: true,
      symbol: 'none',
      data: chartResult.value
    }
  ]
}))

// S 输入参数
const ddWavelength = ref(800) // 中心波长（单位：纳米） - nm - 1
const dTetai = ref(20) // 光栅入射角 - 度 - 2
const dNlinesPerMm = ref(1200) // 光栅刻线密度 - 线/nm - 3
const iDiffractionOrder = ref(1) // 衍射级次 - 级 - 4
const r0 = ref(null) // 激光衍射角 - 度 - 5
const r1 = ref(null) // 光栅利特罗角 - 度 - 6

const handleCalGratingParametersClick = () => {
  // 若已知2，1，3，4 求5，6 时，用calGratingParameters
  if (
    isNumber(dTetai.value) &&
    isNumber(ddWavelength.value) &&
    isNumber(dNlinesPerMm.value) &&
    isNumber(iDiffractionOrder.value)
  ) {
    dllDgsCalGratingParameters({
      dTetai: dTetai.value,
      ddWavelength: ddWavelength.value,
      dNlinesPerMm: dNlinesPerMm.value,
      iDiffractionOrder: iDiffractionOrder.value
    }).then((res) => {
      r0.value = toFixed(res.data?.[0], 2)
      r1.value = toFixed(res.data?.[1], 2)
    })
  }
}
const handleCalGratingParametersReset = () => {
  ddWavelength.value = null
  dTetai.value = null
  dNlinesPerMm.value = null
  iDiffractionOrder.value = null
  r0.value = null
  r1.value = null
}
// E 输入参数

// S 绘图输入参数
const parametersType = ref('incident') // 变量类型
const startTetai = ref(20) // 起始变量值 - 7
const endTetai = ref(90) // 结束变量值 - 8
const iCount = ref(100) // 计算点数 - 9
const xAxis = ref([])
const chartResult = ref([]) // 结果 - 10

watch(
  () => parametersType.value,
  (parametersType) => {
    if (parametersType === 'incident') {
      startTetai.value = 20
      endTetai.value = 90
    }

    if (parametersType === 'wavelength') {
      startTetai.value = 800
      endTetai.value = 894
    }

    if (parametersType === 'linesPerMm') {
      startTetai.value = 1200
      endTetai.value = 1500
    }

    xAxis.value = []
  }
)

const handleCalGratingParametersListClick = () => {
  xAxis.value = []
  chartResult.value = []

  // 若下拉框选择“入射角（度）”，已知 7，8，9，1，3，4 时，用 calGratingParametersListforIncident
  if (
    parametersType.value === 'incident' &&
    isNumber(startTetai.value) &&
    isNumber(endTetai.value) &&
    isNumber(iCount.value) &&
    isNumber(ddWavelength.value) &&
    isNumber(dNlinesPerMm.value) &&
    isNumber(iDiffractionOrder.value)
  ) {
    dllDgsCalGratingParametersListforIncident({
      startTetai: startTetai.value,
      endTetai: endTetai.value,
      iCount: iCount.value,
      ddWavelength: ddWavelength.value,
      dNlinesPerMm: dNlinesPerMm.value,
      iDiffractionOrder: iDiffractionOrder.value
    }).then((res) => {
      for (let i = 0; i < res.data.length; i += 2) {
        xAxis.value.push(res.data[i])
        chartResult.value.push(res.data[i + 1])
      }
    })
    return
  }

  // 若下拉框选择“中心波长”，已知 2，7，8，9，3，4 时，用calGratingParametersListforWavelength
  if (
    parametersType.value === 'wavelength' &&
    isNumber(dTetai.value) &&
    isNumber(startTetai.value) &&
    isNumber(endTetai.value) &&
    isNumber(iCount.value) &&
    isNumber(dNlinesPerMm.value) &&
    isNumber(iDiffractionOrder.value)
  ) {
    dllDgsCalGratingParametersListforWavelength({
      dTetai: dTetai.value,
      startWavelength: startTetai.value,
      endWavelength: endTetai.value,
      iCount: iCount.value,
      dNlinesPerMm: dNlinesPerMm.value,
      iDiffractionOrder: iDiffractionOrder.value
    }).then((res) => {
      for (let i = 0; i < res.data.length; i += 2) {
        xAxis.value.push(res.data[i])
        chartResult.value.push(res.data[i + 1])
      }
    })

    return
  }

  // 若下拉框选择“刻线密度”，已知 2，1，7，8，9，4 时，用calGratingParametersListforlinesPerMm
  if (
    parametersType.value === 'linesPerMm' &&
    isNumber(dTetai.value) &&
    isNumber(ddWavelength.value) &&
    isNumber(startTetai.value) &&
    isNumber(endTetai.value) &&
    isNumber(iCount.value) &&
    isNumber(iDiffractionOrder.value)
  ) {
    dllDgsCalGratingParametersListforlinesPerMm({
      dTetai: dTetai.value,
      dWavelength: ddWavelength.value,
      startNlinesPerMm: startTetai.value,
      endNlinesPerMm: endTetai.value,
      iCount: iCount.value,
      iDiffractionOrder: iDiffractionOrder.value
    }).then((res) => {
      for (let i = 0; i < res.data.length; i += 2) {
        xAxis.value.push(res.data[i] / 1000)
        chartResult.value.push(res.data[i + 1])
      }
    })
  }
}
// E 绘图输入参数
</script>
