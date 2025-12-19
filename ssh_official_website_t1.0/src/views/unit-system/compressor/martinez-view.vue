<template>
  <div>
    <h3 class="text-xl text-center my-0">名称：Martinez 型展宽器</h3>
    <div class="flex justify-center gap-2 my-2 text-sm">
      <p class="text-right mb-0">版本号：V0.1-A0.1-D0.1</p>
      <p class="mb-0">发布日期：2024.04.30</p>
    </div>
    <div class="flex justify-center gap-2 my-2 text-sm">
      <button class="underline" @click="emitter.emit('feedback')">问题反馈</button>
      <button class="underline" @click="emitter.emit('help')">帮助</button>
    </div>

    <div class="grid grid-cols-2 gap-4 bg-white rounded-md px-4 py-2">
      <!-- S 展宽器参数 -->
      <fieldset class="my-4">
        <legend class="text-sm font-bold">展宽器参数</legend>
        <div class="my-2 flex items-center gap-2">
          <span class="text-sm w-[9em]">凹面镜曲率半径：</span>
          <input v-model="state.r" class="input input-sm input-bordered" type="number" />
          <span class="text-sm">mm</span>
        </div>
        <div class="my-2 flex items-center gap-2">
          <span class="text-sm w-[9em]">光栅凹面镜间距：</span>
          <input v-model="state.l" class="input input-sm input-bordered" type="number" />
          <span class="text-sm">mm</span>
        </div>
        <div class="my-2 flex items-center gap-2">
          <span class="text-sm w-[9em]">光栅刻线密度：</span>
          <input v-model="state.d" class="input input-sm input-bordered" type="number" />
          <span class="text-sm">线/mm</span>
        </div>
        <div class="my-2 flex items-center gap-2">
          <span class="text-sm w-[9em]">光栅入射角：</span>
          <input v-model="state.gama" class="input input-sm input-bordered" type="number" />
          <span class="text-sm">度</span>
        </div>
        <div class="my-2 flex items-center gap-2">
          <span class="text-sm w-[9em]">展宽程数：</span>
          <input v-model="state.n" class="input input-sm input-bordered" type="number" />
          <span class="text-sm">程</span>
        </div>
      </fieldset>
      <!-- E 展宽器参数 -->

      <!-- S 输出参数 -->
      <fieldset class="my-4 row-span-2">
        <legend class="text-sm font-bold">输出参数</legend>
        <textarea
          class="textarea textarea-sm w-full textarea-bordered"
          disabled
          rows="13"
          :value="result"
        ></textarea>
      </fieldset>
      <!-- E 输出参数 -->

      <!-- S 激光参数 -->
      <fieldset class="my-4">
        <legend class="text-sm font-bold">激光参数</legend>
        <div class="my-2 flex items-center gap-2">
          <span class="text-sm w-[9em]">激光中心波长：</span>
          <input v-model="state.wave0" class="input input-sm input-bordered" type="number" />
          <span class="text-sm">nm</span>
        </div>
        <div class="my-2 flex items-center gap-2">
          <span class="text-sm w-[9em]">激光追迹波长：</span>
          <input v-model="state.wave" class="input input-sm input-bordered" type="number" />
          <span class="text-sm">nm</span>
        </div>
        <div class="my-2 flex items-center gap-2">
          <span class="text-sm w-[9em]">脉冲宽度（选填）：</span>
          <input v-model="state.pulsewidth" class="input input-sm input-bordered" type="number" />
          <span class="text-sm">fs</span>
        </div>
        <div class="my-2 flex items-center gap-2">
          <span class="text-sm w-[9em]">光谱宽度（选填）：</span>
          <input v-model="state.bandwidth" class="input input-sm input-bordered" type="number" />
          <span class="text-sm">nm</span>
        </div>
        <button class="btn btn-sm btn-neutral" @click="handleCalGratingParametersListClick">
          计算
        </button>
      </fieldset>
      <!-- E 激光参数 -->

      <!-- S 绘图输入参数 -->
      <fieldset class="my-4">
        <legend class="text-sm font-bold">绘图输入参数</legend>
        <div class="my-2 flex items-center gap-2">
          <span class="text-sm w-[9em]">变量类型：</span>
          <select v-model="parametersType" class="select select-sm select-bordered">
            <option v-for="type in parametersTypeMap" :value="type.value" :key="type.value">{{ type.label }}</option>
          </select>
        </div>
        <div class="my-2 flex items-center gap-2">
          <span class="text-sm w-[9em]">起始变量值：</span>
          <input v-model="state.startWave" class="input input-sm input-bordered" type="number" />
        </div>
        <div class="my-2 flex items-center gap-2">
          <span class="text-sm w-[9em]">结束变量值：</span>
          <input v-model="state.endWave" class="input input-sm input-bordered" type="number" />
        </div>
        <div class="my-2 flex items-center gap-2">
          <span class="text-sm w-[9em]">计算点数：</span>
          <input v-model="state.iCount" class="input input-sm input-bordered" type="number" />
        </div>
        <button class="btn btn-sm btn-neutral" @click="handleDraw">绘图</button>
      </fieldset>
      <!-- E 数值输出参数 -->

      <!--S 绘图-->
      <fieldset class="my-4" v-if="!!gdd.length">
        <legend class="text-sm font-bold">绘图输出参数</legend>
        <div class="h-[160px]">
          <v-chart class="chart" ref="gddCharts" :option="gddOption" autoresize />
        </div>
        <div class="flex ml-[7em] my-4">
          <button class="btn btn-sm btn-neutral" @click="useExportEChartData(gddOption, 'GDD')">
            保存数据
          </button>
          <button
            class="btn btn-sm btn-ghost mx-4"
            @click="useExportEChart($refs.gddCharts, 'GDD')"
          >
            保存图形
          </button>
        </div>
      </fieldset>
      <!--E 绘图输入参数-->

      <fieldset class="my-4" v-if="!!tod.length">
        <legend class="text-sm font-bold">绘图输出参数</legend>
        <div class="h-[160px]">
          <v-chart class="chart" ref="todCharts" :option="todOption" autoresize />
        </div>
        <div class="flex ml-[7em] my-4">
          <button class="btn btn-sm btn-neutral" @click="useExportEChartData(todOption, 'TOD')">
            保存数据
          </button>
          <button
            class="btn btn-sm btn-ghost mx-4"
            @click="useExportEChart($refs.todCharts, 'TOD')"
          >
            保存图形
          </button>
        </div>
      </fieldset>

      <fieldset class="my-4" v-if="!!fod.length">
        <legend class="text-sm font-bold">绘图输出参数</legend>
        <div class="h-[160px]">
          <v-chart class="chart" ref="fodCharts" :option="fodOption" autoresize />
        </div>
        <div class="flex ml-[7em] my-4">
          <button class="btn btn-sm btn-neutral" @click="useExportEChartData(fodOption, 'FOD')">
            保存数据
          </button>
          <button
            class="btn btn-sm btn-ghost mx-4"
            @click="useExportEChart($refs.fodCharts, 'FOD')"
          >
            保存图形
          </button>
        </div>
      </fieldset>
    </div>
  </div>
</template>

<script setup>
import { isNumber, select } from 'radash'
import { computed, reactive, ref, watch } from 'vue'
import emitter from '@/utils/eventBus.js'
import {
  dllMartCalMartinezDispersion,
  dllMartCalMartinezDispersionByPulseWidth,
  dllMartCalMartinezDispersionBySpectrum,
  dllMartCalMartinezDispersionBySpectrumAndPulseWidth,
  dllMartCalMartinezDispersionListByD,
  dllMartCalMartinezDispersionListByGama,
  dllMartCalMartinezDispersionListByL,
  dllMartCalMartinezDispersionListByR,
  dllMartCalMartinezDispersionListByWave
} from '@/api/dll'
import { toFixed } from '@/utils/index.js'
import useExportEChartData from '@/hooks/useExportEChartData.js'
import useExportEChart from '@/hooks/useExportEChart.js'
const GRID = {
  top: '18%',
  left: '3%',
  right: '4%',
  bottom: '10%',
  containLabel: true
}
// S 输入参数
const state = reactive({
  /** 凹面镜曲率半径，单位为 mm*/
  r: 1000, // 1
  /** 光栅凹面镜中心距，单位为 mm*/
  l: 750, // 2
  /** 光栅刻线密度，单位为线/mm*/
  d: 1200, // 3
  /** 光栅入射角，单位为度*/
  gama: 28, // 4
  /** 展宽程数，程*/
  n: 2, // 5
  /** 激光中心波长，单位为 nm*/
  wave0: 800, // 6
  /** 激光追迹波长，单位为 nm*/
  wave: 801, // 7
  /** 脉冲宽度*/
  pulsewidth: 20, // 8
  /** 激光光谱宽度*/
  bandwidth: 50, // 9
  /** startWave*/
  startWave: 700, // 10
  /** endWave*/
  endWave: 900, // 11
  /** 要计算的波长点的数量*/
  iCount: 10 // 12
})
// E 输入参数

// S 绘图输入参数
const parametersTypeMap = [
  { value: 'wave', label: '激光追迹波长（nm)', xAxisName: '波长/nm' },
  { value: 'r', label: '凹面镜曲率半径（mm)', xAxisName: '半径/mm' },
  { value: 'l', label: '光栅凹面镜间距（mm)', xAxisName: '间距/mm' },
  { value: 'd', label: '光栅刻线密度（线/mm)', xAxisName: '密度（线/mm)' },
  { value: 'gama', label: '光栅入射角（度)', xAxisName: '入射角/°' },
]
const parametersType = ref(parametersTypeMap[0].value)
const result = ref('')

watch(
  () => parametersType.value,
  (parametersType) => {
    if (parametersType === 'wave') {
      state.startWave = 700
      state.endWave = 900
    }

    if (parametersType === 'r') {
      state.startWave = 800
      state.endWave = 1200
    }

    if (parametersType === 'l') {
      state.startWave = 700
      state.endWave = 800
    }

    if (parametersType === 'd') {
      state.startWave = 1200
      state.endWave = 1500
    }

    if (parametersType === 'gama') {
      state.startWave = 10
      state.endWave = 28
    }

    gdd.value = []
    tod.value = []
    fod.value = []
  }
)

// 计算
const handleCalGratingParametersListClick = async () => {
  result.value = ''

  // 1.如果8和9都没有填，则根据6，7，4，3，1，2，5，用calMartinezDispersion，输出如下：
  // 一阶色散result[0]，单位fs
  // 二阶色散result[1]，单位fs2
  // 三阶色散result[2]，单位fs3
  // 四阶色散result[3]，单位fs4
  if (!isNumber(state.pulsewidth) && !isNumber(state.bandwidth)) {
    const { data } = await dllMartCalMartinezDispersion({
      wave0: state.wave0,
      wave: state.wave,
      gama: state.gama,
      d: state.d,
      r: state.r,
      l: state.l,
      n: state.n
    })
    result.value = [
      `一阶色散：${toFixed(data[0], 4)} fs`,
      `二阶色散：${toFixed(data[1], 4)} fs2`,
      `三阶色散：${toFixed(data[2], 4)} fs3`,
      `四阶色散：${toFixed(data[3], 4)} fs4`
    ].join('\n')

    return
  }

  // 2.如果8填写，9未填写时，根据8，6，7，4，3，1，2，5时，用calMartinezDispersionByPulseWidth，输出如下：
  // 一阶色散result[0]，单位fs
  // 二阶色散result[1]，单位fs2
  // 三阶色散result[2]，单位fs3
  // 四阶色散result[3]，单位fs4
  // FT谱宽result[4]，单位nm
  // 出射脉宽result[5]，单位ps
  // 展宽倍数result[6]，无单位
  if (isNumber(state.pulsewidth) && !isNumber(state.bandwidth)) {
    const { data } = await dllMartCalMartinezDispersionByPulseWidth({
      pulsewidth: state.pulsewidth,
      wave0: state.wave0,
      wave: state.wave,
      gama: state.gama,
      d: state.d,
      r: state.r,
      l: state.l,
      n: state.n
    })
    result.value = [
      `一阶色散：${toFixed(data[0], 4)} fs`,
      `二阶色散：${toFixed(data[1], 4)} fs2`,
      `三阶色散：${toFixed(data[2], 4)} fs3`,
      `四阶色散：${toFixed(data[3], 4)} fs4`,
      `FT谱宽：${toFixed(data[4], 4)} nm`,
      `出射脉宽：${toFixed(data[5], 4)} ps`,
      `展宽倍数：${toFixed(data[6], 4)}`
    ].join('\n')

    return
  }

  // 3.如果8未填写，9填写时，根据9，6，7，4，3，1，2，5时，用calMartinezDispersionBySpectrum，输出如下：
  // 一阶色散result[0]，单位fs
  // 二阶色散result[1]，单位fs2
  // 三阶色散result[2]，单位fs3
  // 四阶色散result[3]，单位fs4
  // FT谱宽result[4]，单位nm
  // 出射脉宽result[5]，单位ps
  // 展宽倍数result[6]，无单位
  if (!isNumber(state.pulsewidth) && isNumber(state.bandwidth)) {
    const { data } = await dllMartCalMartinezDispersionBySpectrum({
      bandwidth: state.bandwidth,
      wave0: state.wave0,
      wave: state.wave,
      gama: state.gama,
      d: state.d,
      r: state.r,
      l: state.l,
      n: state.n
    })
    result.value = [
      `一阶色散：${toFixed(data[0], 4)} fs`,
      `二阶色散：${toFixed(data[1], 4)} fs2`,
      `三阶色散：${toFixed(data[2], 4)} fs3`,
      `四阶色散：${toFixed(data[3], 4)} fs4`,
      `FT谱宽：${toFixed(data[4], 4)} nm`,
      `出射脉宽：${toFixed(data[5], 4)} ps`,
      `展宽倍数：${toFixed(data[6], 4)}`
    ].join('\n')

    return
  }

  // 4.如果8和9都填写的时候，根据9，8，6，7，4，3，1，2，5时，用calMartinezDispersionBySpectrumAndPulseWidth，输出如下：
  // 一阶色散result[0]，单位fs
  // 二阶色散result[1]，单位fs2
  // 三阶色散result[2]，单位fs3
  // 四阶色散result[3]，单位fs4
  // 入射啁啾result[4]，无单位
  // 出射啁啾result[5]，无单位
  // 出射脉宽result[6]，单位ps
  // 展宽倍数result[7]，无单位
  const { data } = await dllMartCalMartinezDispersionBySpectrumAndPulseWidth({
    spectrumwidth: state.bandwidth,
    pulsewidth1: state.pulsewidth,
    wave0: state.wave0,
    wave: state.wave,
    gama: state.gama,
    d: state.d,
    r: state.r,
    l: state.l,
    n: state.n
  })

  result.value = [
    `一阶色散：${toFixed(data[0], 4)} fs`,
    `二阶色散：${toFixed(data[1], 4)} fs2`,
    `三阶色散：${toFixed(data[2], 4)} fs3`,
    `四阶色散：${toFixed(data[3], 4)} fs4`,
    `入射啁啾：${toFixed(data[4], 4)}`,
    `出射啁啾：${toFixed(data[5], 4)}`,
    `出射脉宽：${toFixed(data[6], 4)} ps`,
    `展宽倍数：${toFixed(data[7], 4)}`
  ].join('\n')
}
const x = ref([])
const gdd = ref([])
const tod = ref([])
const fod = ref([])
const gddOption = computed(() => ({
  grid: GRID,
  tooltip: {
    trigger: 'axis'
  },
  xAxis: {
    name: select(parametersTypeMap, f => f.xAxisName, f => f.value === parametersType.value),
    nameLocation: 'center',
    nameTextStyle: {
      lineHeight: 30
    },
    axisLabel: {
      formatter: (value) => toFixed(value) // 保留两位小数
    },
    data: x.value
  },
  yAxis: { name: 'GDD' },
  series: [
    {
      name: 'GDD',
      type: 'line',
      smooth: true,
      symbol: 'none',
      lineStyle: {
        color: '#1677ff'
      },
      data: gdd.value
    }
  ]
}))
const todOption = computed(() => ({
  grid: GRID,
  tooltip: {
    trigger: 'axis'
  },
  xAxis: {
    name: select(parametersTypeMap, f => f.xAxisName, f => f.value === parametersType.value),
    nameLocation: 'center',
    nameTextStyle: {
      lineHeight: 30
    },
    axisLabel: {
      formatter: (value) => toFixed(value) // 保留两位小数
    },
    data: x.value
  },
  yAxis: { name: 'TOD' },
  series: [
    {
      name: 'TOD',
      type: 'line',
      smooth: true,
      symbol: 'none',
      lineStyle: {
        color: '#1677ff'
      },
      data: tod.value
    }
  ]
}))
const fodOption = computed(() => ({
  grid: GRID,
  tooltip: {
    trigger: 'axis'
  },
  xAxis: {
    name: select(parametersTypeMap, f => f.xAxisName, f => f.value === parametersType.value),
    nameLocation: 'center',
    nameTextStyle: {
      lineHeight: 30
    },
    axisLabel: {
      formatter: (value) => toFixed(value) // 保留两位小数
    },
    data: x.value
  },
  yAxis: {
    name: 'FOD'
  },
  series: [
    {
      name: 'FOD',
      type: 'line',
      smooth: true,
      symbol: 'none',
      lineStyle: {
        color: '#1677ff'
      },
      data: fod.value
    }
  ]
}))
const handleDraw = async () => {
  const step = 4
  const _x = [],
    _gdd = [],
    _tod = [],
    _fod = []

  // 当【变量类型】选择”激光追迹波长（nm）”时，根据6，10，11，4，3，1，2，5，12，调用calMartinezDispersionListByWave，绘制3个曲线（A、B、C），其中
  // 横坐标都是：result[4*次数【12】+0]:追迹波长（nm）
  // A纵坐标：result[4*次数【12】+1]：GDD（fs2）
  // B纵坐标：result[4*次数【12】+2]：TOD（fs2）
  // C纵坐标：result[4*次数【12】+3]：FOD（fs2）
  if (parametersType.value === 'wave') {
    const { data } = await dllMartCalMartinezDispersionListByWave({
      wave0: state.wave0,
      startWave: state.startWave,
      endWave: state.endWave,
      gama: state.gama,
      d: state.d,
      r: state.r,
      l: state.l,
      n: state.n,
      iCount: state.iCount
    })

    for (let i = 0; i < data.length; i += step) {
      _x.push(data[i])
      _gdd.push(data[i + 1])
      _tod.push(data[i + 2])
      _fod.push(data[i + 3])
    }

    x.value = _x
    gdd.value = _gdd
    tod.value = _tod
    fod.value = _fod

    return
  }

  // 当【变量类型】选择” 凹面镜曲率半径(mm)”时，根据6，7,4,3,10,11,2,5,12调用calMartinezDispersionListByR，绘制3个曲线（A、B、C），其中
  // 横坐标都是：result[4*次数【12】+0]:追迹波长（nm）
  // A纵坐标：result[4*次数【12】+1]：GDD（fs2）
  // B纵坐标：result[4*次数【12】+2]：TOD（fs2）
  // C纵坐标：result[4*次数【12】+3]：FOD（fs2）
  if (parametersType.value === 'r') {
    const { data } = await dllMartCalMartinezDispersionListByR({
      wave0: state.wave0,
      wave: state.wave,
      gama: state.gama,
      d: state.d,
      startR: state.startWave,
      endR: state.endWave,
      l: state.l,
      n: state.n,
      iCount: state.iCount
    })

    for (let i = 0; i < data.length; i += step) {
      _x.push(data[i])
      _gdd.push(data[i + 1])
      _tod.push(data[i + 2])
      _fod.push(data[i + 3])
    }

    x.value = _x
    gdd.value = _gdd
    tod.value = _tod
    fod.value = _fod

    return
  }

  // 当【变量类型】选择” 光栅凹面镜间距（mm）”时，根据6，7,4,3,1,10,11,5,12调用calMartinezDispersionListByL，绘制3个曲线（A、B、C），其中
  // 横坐标都是：result[4*次数【12】+0]:追迹波长（nm）
  // A纵坐标：result[4*次数【12】+1]：GDD（fs2）
  // B纵坐标：result[4*次数【12】+2]：TOD（fs2）
  // C纵坐标：result[4*次数【12】+3]：FOD（fs2）
  if (parametersType.value === 'l') {
    const { data } = await dllMartCalMartinezDispersionListByL({
      wave0: state.wave0,
      wave: state.wave,
      gama: state.gama,
      d: state.d,
      r: state.r,
      startL: state.startWave,
      endL: state.endWave,
      n: state.n,
      iCount: state.iCount
    })

    for (let i = 0; i < data.length; i += step) {
      _x.push(data[i])
      _gdd.push(data[i + 1])
      _tod.push(data[i + 2])
      _fod.push(data[i + 3])
    }

    x.value = _x
    gdd.value = _gdd
    tod.value = _tod
    fod.value = _fod

    return
  }

  // 当【变量类型】选择” 光栅刻线密度（线/mm）”时，根据6，7,4,10,11,1,2,5,12调用calMartinezDispersionListByD，绘制3个曲线（A、B、C），其中
  // 横坐标都是：result[4*次数【12】+0]:追迹波长（nm）
  // A纵坐标：result[4*次数【12】+1]：GDD（fs2）
  // B纵坐标：result[4*次数【12】+2]：TOD（fs2）
  // C纵坐标：result[4*次数【12】+3]：FOD（fs2）
  if (parametersType.value === 'd') {
    const { data } = await dllMartCalMartinezDispersionListByD({
      wave0: state.wave0,
      wave: state.wave,
      gama: state.gama,
      startD: state.startWave,
      endD: state.endWave,
      r: state.r,
      l: state.l,
      n: state.n,
      iCount: state.iCount
    })

    for (let i = 0; i < data.length; i += step) {
      _x.push(data[i])
      _gdd.push(data[i + 1])
      _tod.push(data[i + 2])
      _fod.push(data[i + 3])
    }

    x.value = _x
    gdd.value = _gdd
    tod.value = _tod
    fod.value = _fod

    return
  }

  // 当【变量类型】选择” 光栅入射角（度）”时，根据6，7,10,11,3,1,2,5,12调用calMartinezDispersionListByGama，绘制3个曲线（A、B、C），其中
  // 横坐标都是：result[4*次数【12】+0]:追迹波长（nm）
  // A纵坐标：result[4*次数【12】+1]：GDD（fs2）
  // B纵坐标：result[4*次数【12】+2]：TOD（fs2）
  // C纵坐标：result[4*次数【12】+3]：FOD（fs2）
  if (parametersType.value === 'gama') {
    const { data } = await dllMartCalMartinezDispersionListByGama({
      wave0: state.wave0,
      wave: state.wave,
      gama: state.gama,
      startGama: state.startWave,
      endGama: state.endWave,
      d: state.d,
      r: state.r,
      l: state.l,
      n: state.n,
      iCount: state.iCount
    })

    for (let i = 0; i < data.length; i += step) {
      _x.push(data[i])
      _gdd.push(data[i + 1])
      _tod.push(data[i + 2])
      _fod.push(data[i + 3])
    }

    x.value = _x
    gdd.value = _gdd
    tod.value = _tod
    fod.value = _fod
  }
}
// E 绘图输入参数
</script>
