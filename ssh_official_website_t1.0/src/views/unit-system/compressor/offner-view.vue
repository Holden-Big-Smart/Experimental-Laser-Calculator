<template>
  <div>
    <h3 class="text-xl text-center my-0">名称：Offner型展宽器</h3>
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
          <input v-model="r" class="input input-sm input-bordered" type="number" />
          <span class="text-sm">nm</span>
        </div>
        <div class="my-2 flex items-center gap-2">
          <span class="text-sm w-[9em]">光栅凹面镜间距：</span>
          <input v-model="l" class="input input-sm input-bordered" type="number" />
          <span class="text-sm">nm</span>
        </div>
        <div class="my-2 flex items-center gap-2">
          <span class="text-sm w-[9em]">光栅刻线密度：</span>
          <input v-model="d" class="input input-sm input-bordered" type="number" />
          <span class="text-sm">线/mm</span>
        </div>
        <div class="my-2 flex items-center gap-2">
          <span class="text-sm w-[9em]">光栅入射角：</span>
          <input v-model="gama" class="input input-sm input-bordered" type="number" />
          <span class="text-sm">度</span>
        </div>
        <div class="my-2 flex items-center gap-2">
          <span class="text-sm w-[9em]">展宽程数：</span>
          <input v-model="n" class="input input-sm input-bordered" type="number" />
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
          rows="14"
          :value="result"
        ></textarea>
      </fieldset>
      <!-- E 输出参数 -->

      <!-- S 激光参数 -->
      <fieldset class="my-4">
        <legend class="text-sm font-bold">激光参数</legend>
        <div class="my-2 flex items-center gap-2">
          <span class="text-sm w-[9em]">激光中心波长：</span>
          <input v-model="wave0" class="input input-sm input-bordered" type="number" />
          <span class="text-sm">nm</span>
        </div>
        <div class="my-2 flex items-center gap-2">
          <span class="text-sm w-[9em]">激光追迹波长：</span>
          <input v-model="wave" class="input input-sm input-bordered" type="number" />
          <span class="text-sm">nm</span>
        </div>
        <div class="my-2 flex items-center gap-2">
          <span class="text-sm w-[9em]">脉冲宽度（选填）：</span>
          <input v-model="pulsewidth" class="input input-sm input-bordered" type="number" />
          <span class="text-sm">fs</span>
        </div>
        <div class="my-2 flex items-center gap-2">
          <span class="text-sm w-[9em]">光谱宽度（选填）：</span>
          <input v-model="bandwidth" class="input input-sm input-bordered" type="number" />
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
          <span class="text-sm w-[7em]">变量类型：</span>
          <select v-model="parametersType" class="select select-sm select-bordered">
            <option v-for="type in parametersTypeMap" :value="type.value" :key="type.value">
              {{ type.label }}
            </option>
          </select>
        </div>
        <div class="my-2 flex items-center gap-2">
          <span class="text-sm w-[7em]">起始变量值：</span>
          <input v-model="startWave" class="input input-sm input-bordered" type="number" />
        </div>
        <div class="my-2 flex items-center gap-2">
          <span class="text-sm w-[7em]">结束变量值：</span>
          <input v-model="endWave" class="input input-sm input-bordered" type="number" />
        </div>
        <div class="my-2 flex items-center gap-2">
          <span class="text-sm w-[7em]">计算点数：</span>
          <input v-model="iCount" class="input input-sm input-bordered" type="number" />
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
import {
  dllOffnerCalOffnerDispersion,
  dllOffnerCalOffnerDispersionByPulseWidth,
  dllOffnerCalOffnerDispersionBySpectrum,
  dllOffnerCalOffnerDispersionBySpectrumAndPulseWidth,
  dllOffnerCalOffnerDispersionListByD,
  dllOffnerCalOffnerDispersionListByGama,
  dllOffnerCalOffnerDispersionListByL,
  dllOffnerCalOffnerDispersionListByR,
  dllOffnerCalOffnerDispersionListByWave
} from '@/api/dll'
import { computed, ref, watch } from 'vue'
import emitter from '@/utils/eventBus.js'
import { toFixed } from '@/utils/index.js'
import useExportEChart from '@/hooks/useExportEChart.js'
import useExportEChartData from '@/hooks/useExportEChartData.js'
import { GRID } from '@/utils/constant.js'

// S 输入参数
const r = ref(1000) // 凹面镜曲率半径，单位为mm - 1
const l = ref(750) // 光栅凹面镜中心距，单位为mm - 2
const d = ref(1200) // 栅刻线密度，单位为线 - 3
const gama = ref(28) // 光栅入射角，单位为度 - 4
const n = ref(2) // 展宽程数 - 5
const wave0 = ref(800) // 激光中心波长 - 6
const wave = ref(801) // 激光追迹波长，单位为nm - 7
const pulsewidth = ref(20) // 激光脉冲宽度，单位为fs - 8
const bandwidth = ref(50) // 激光光谱宽度 - 9
const result = ref(null)
const parametersTypeMap = [
  { value: 'wave', label: '激光追迹波长（nm)', xAxisName: '波长/nm' },
  { value: 'r', label: '凹面镜曲率半径（mm)', xAxisName: '半径/mm' },
  { value: 'l', label: '光栅凹面镜间距（mm)', xAxisName: '间距/mm' },
  { value: 'd', label: '光栅刻线密度（线/mm)', xAxisName: '密度（线/mm)' },
  { value: 'gama', label: '光栅入射角（度)', xAxisName: '入射角/°' }
]
const parametersType = ref(parametersTypeMap[0].value)
const startWave = ref(700) // 10
const endWave = ref(900) // 11
const iCount = ref(100) // 12

watch(
  () => parametersType.value,
  (parametersType) => {
    if (parametersType === 'wave') {
      startWave.value = 700
      endWave.value = 900
      iCount.value = 100
    }

    if (parametersType === 'r') {
      startWave.value = 900
      endWave.value = 1000
      iCount.value = 10
    }

    if (parametersType === 'l') {
      startWave.value = 600
      endWave.value = 800
      iCount.value = 10
    }

    if (parametersType === 'd') {
      startWave.value = 1200
      endWave.value = 1500
      iCount.value = 10
    }

    if (parametersType === 'gama') {
      startWave.value = 20
      endWave.value = 30
      iCount.value = 10
    }
  }
)

// E 输入参数

const handleCalGratingParametersListClick = () => {
  result.value = null

  // 如果8和9都没有填，则根据6，7，4，3，1，2，5，用calOffnerDispersion，输出如下：
  // 一阶色散result[0]，单位fs
  // 二阶色散result[1]，单位fs2
  // 三阶色散result[2]，单位fs3
  // /四阶色散result[3]，单位fs4
  if (
    isNumber(wave0.value) &&
    isNumber(wave.value) &&
    isNumber(gama.value) &&
    isNumber(d.value) &&
    isNumber(l.value) &&
    isNumber(r.value) &&
    isNumber(n.value) &&
    !isNumber(pulsewidth.value) &&
    !isNumber(bandwidth.value)
  ) {
    dllOffnerCalOffnerDispersion({
      wave0: wave0.value,
      wave: wave.value,
      gama: gama.value,
      d: d.value,
      l: l.value,
      r: r.value,
      n: n.value
    }).then((res) => {
      // 一阶色散result[0]，单位fs
      // 二阶色散result[1]，单位fs2
      // 三阶色散result[2]，单位fs3
      // 四阶色散result[3]，单位fs4
      result.value = [
        `一阶色散：${toFixed(res.data?.[0], 4)} fs`,
        `二阶色散：${toFixed(res.data?.[1], 4)} fs2`,
        `三阶色散：${toFixed(res.data?.[2], 4)} fs3`,
        `四阶色散：${toFixed(res.data?.[3], 4)} fs4`
      ].join('\n')
    })
    return
  }

  // 如果8填写，9未填写时，根据8，6，7，4，3，1，2，5时，用calOffnerDispersionByPulseWidth，输出如下：
  // 一阶色散result[0]，单位fs
  // 二阶色散result[1]，单位fs2
  // 三阶色散result[2]，单位fs3
  // 四阶色散result[3]，单位fs4
  // FT谱宽result[4]，单位nm
  // 出射脉宽result[5]，单位ps
  // 展宽倍数result[6]，无单位
  if (
    isNumber(wave0.value) &&
    isNumber(wave.value) &&
    isNumber(gama.value) &&
    isNumber(d.value) &&
    isNumber(l.value) &&
    isNumber(r.value) &&
    isNumber(n.value) &&
    isNumber(pulsewidth.value) &&
    !isNumber(bandwidth.value)
  ) {
    dllOffnerCalOffnerDispersionByPulseWidth({
      wave0: wave0.value,
      wave: wave.value,
      gama: gama.value,
      d: d.value,
      l: l.value,
      r: r.value,
      n: n.value,
      pulsewidth: pulsewidth.value
    }).then((res) => {
      // 一阶色散result[0]，单位fs
      // 二阶色散result[1]，单位fs2
      // 三阶色散result[2]，单位fs3
      // 四阶色散result[3]，单位fs4
      // FT谱宽result[4]，单位nm
      // 出射脉宽result[5]，单位ps
      // 展宽倍数result[6]，无单位
      result.value = [
        `一阶色散：${toFixed(res.data?.[0], 4)} fs`,
        `二阶色散：${toFixed(res.data?.[1], 4)} fs2`,
        `三阶色散：${toFixed(res.data?.[2], 4)} fs3`,
        `四阶色散：${toFixed(res.data?.[3], 4)} fs4`,
        `FT谱宽：${toFixed(res.data?.[4], 4)} nm`,
        `出射脉宽：${toFixed(res.data?.[5], 4)} ps`,
        `展宽倍数：${toFixed(res.data?.[6], 4)}`
      ].join('\n')
    })
    return
  }

  // 如果8未填写，9填写时，根据9，6，7，4，3，1，2，5时，用calOffnerDispersionBySpectrum，输出如下：
  // 一阶色散result[0]，单位fs
  // 二阶色散result[1]，单位fs2
  // 三阶色散result[2]，单位fs3
  // 四阶色散result[3]，单位fs4
  // FT谱宽result[4]，单位nm
  // 出射脉宽result[5]，单位ps
  // 展宽倍数result[6]，无单位
  if (
    isNumber(wave0.value) &&
    isNumber(wave.value) &&
    isNumber(gama.value) &&
    isNumber(d.value) &&
    isNumber(l.value) &&
    isNumber(r.value) &&
    isNumber(n.value) &&
    !isNumber(pulsewidth.value) &&
    isNumber(bandwidth.value)
  ) {
    dllOffnerCalOffnerDispersionBySpectrum({
      wave0: wave0.value,
      wave: wave.value,
      gama: gama.value,
      d: d.value,
      l: l.value,
      r: r.value,
      n: n.value,
      bandwidth: bandwidth.value
    }).then((res) => {
      // 一阶色散result[0]，单位fs
      // 二阶色散result[1]，单位fs2
      // 三阶色散result[2]，单位fs3
      // 四阶色散result[3]，单位fs4
      // FT谱宽result[4]，单位nm
      // 出射脉宽result[5]，单位ps
      // 展宽倍数result[6]，无单位
      result.value = [
        `一阶色散：${toFixed(res.data?.[0], 4)} fs`,
        `二阶色散：${toFixed(res.data?.[1], 4)} fs2`,
        `三阶色散：${toFixed(res.data?.[2], 4)} fs3`,
        `四阶色散：${toFixed(res.data?.[3], 4)} fs4`,
        `FT谱宽：${toFixed(res.data?.[4], 4)} nm`,
        `出射脉宽：${toFixed(res.data?.[5], 4)} ps`,
        `展宽倍数：${toFixed(res.data?.[6], 4)}`
      ].join('\n')
    })
    return
  }

  // 如果8和9都填写的时候，根据9，8，6，7，4，3，1，2，5时，用calOffnerDispersionBySpectrumAndPulseWidth，输出如下：
  // 一阶色散result[0]，单位fs
  // 二阶色散result[1]，单位fs2
  // 三阶色散result[2]，单位fs3
  // 四阶色散result[3]，单位fs4
  // 入射啁啾result[4]，无单位
  // 出射啁啾result[5]，无单位
  // 出射脉宽result[6]，单位ps
  // 展宽倍数result[7]，无单位
  if (
    isNumber(wave0.value) &&
    isNumber(wave.value) &&
    isNumber(gama.value) &&
    isNumber(d.value) &&
    isNumber(l.value) &&
    isNumber(r.value) &&
    isNumber(n.value) &&
    isNumber(pulsewidth.value) &&
    isNumber(bandwidth.value)
  ) {
    dllOffnerCalOffnerDispersionBySpectrumAndPulseWidth({
      /** 激光光谱宽度，单位为nm*/
      spectrumwidth: bandwidth.value,
      /** 激光脉冲宽度，单位为fs*/
      pulsewidth1: pulsewidth.value,
      /** 激光中心波长，单位为纳米*/
      wave0: wave0.value,
      /** 计算激光波长，单位为nm*/
      wave: wave.value,
      /** 光栅入射角，单位为度*/
      gama: gama.value,
      /** 光栅刻线密度，单位为线/mm*/
      d: d.value,
      /** 凹面镜曲率半径，单位为mm*/
      r: r.value,
      /** 光栅凹面镜中心距，单位为mm*/
      l: l.value,
      /** 展宽程数，程*/
      n: n.value
    }).then((res) => {
      // 一阶色散result[0]，单位fs
      // 二阶色散result[1]，单位fs2
      // 三阶色散result[2]，单位fs3
      // 四阶色散result[3]，单位fs4
      // 入射啁啾result[4]，无单位
      // 出射啁啾result[5]，无单位
      // 出射脉宽result[6]，单位ps
      // 展宽倍数result[7]，无单位
      result.value = [
        `一阶色散：${toFixed(res.data?.[0], 4)} fs`,
        `二阶色散：${toFixed(res.data?.[1], 4)} fs2`,
        `三阶色散：${toFixed(res.data?.[2], 4)} fs3`,
        `四阶色散：${toFixed(res.data?.[3], 4)} fs4`,
        `入射啁啾：${toFixed(res.data?.[4], 4)}`,
        `出射啁啾：${toFixed(res.data?.[5], 4)}`,
        `出射脉宽：${toFixed(res.data?.[6], 4)} ps`,
        `展宽倍数：${toFixed(res.data?.[7], 4)}`
      ].join('\n')
    })
  }
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
    name: select(
      parametersTypeMap,
      (f) => f.xAxisName,
      (f) => f.value === parametersType.value
    ),
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
    name: select(
      parametersTypeMap,
      (f) => f.xAxisName,
      (f) => f.value === parametersType.value
    ),
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
    name: select(
      parametersTypeMap,
      (f) => f.xAxisName,
      (f) => f.value === parametersType.value
    ),
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

  // 0x01
  // 当【变量类型】选择”激光追迹波长（nm）”时，根据6，10，11，4，3，1，2，5，12，调用calOffnerDispersionListByWave，绘制3个曲线（A、B、C），其中
  // 横坐标都是：result[4*次数【12】+0]:追迹波长（nm）
  // A纵坐标：result[4*次数【12】+1]：GDD（fs2）
  // B纵坐标：result[4*次数【12】+2]：TOD（fs2）
  // C纵坐标：result[4*次数【12】+3]：FOD（fs2）
  if (parametersType.value === 'wave') {
    const { data } = await dllOffnerCalOffnerDispersionListByWave({
      wave0: wave0.value,
      wave: wave.value,
      gama: gama.value,
      d: d.value,
      l: l.value,
      r: r.value,
      n: n.value,
      startWave: startWave.value,
      endWave: endWave.value,
      iCount: iCount.value
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

  // 0x02
  // 当【变量类型】选择” 凹面镜曲率半径(mm)”时，根据6，7,4,3,10,11,2,5,12调用calOffnerDispersionListByR，绘制3个曲线（A、B、C），其中
  // 横坐标都是：result[4*次数【12】+0]:追迹波长（nm）
  // A纵坐标：result[4*次数【12】+1]：GDD（fs2）
  // B纵坐标：result[4*次数【12】+2]：TOD（fs2）
  // C纵坐标：result[4*次数【12】+3]：FOD（fs2）
  if (parametersType.value === 'r') {
    const { data } = await dllOffnerCalOffnerDispersionListByR({
      wave0: wave0.value,
      wave: wave.value,
      gama: gama.value,
      d: d.value,
      l: l.value,
      r: r.value,
      n: n.value,
      startR: startWave.value,
      endR: endWave.value,
      iCount: iCount.value
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

  // 0x03
  // 当【变量类型】选择” 光栅凹面镜间距（mm）”时，根据6，7,4,3,1,10,11,5,12调用calOffnerDispersionListByL，绘制3个曲线（A、B、C），其中
  // 横坐标都是：result[4*次数【12】+0]:追迹波长（nm）
  // A纵坐标：result[4*次数【12】+1]：GDD（fs2）
  // B纵坐标：result[4*次数【12】+2]：TOD（fs2）
  // C纵坐标：result[4*次数【12】+3]：FOD（fs2）
  if (parametersType.value === 'l') {
    const { data } = await dllOffnerCalOffnerDispersionListByL({
      wave0: wave0.value,
      wave: wave.value,
      gama: gama.value,
      d: d.value,
      l: l.value,
      r: r.value,
      n: n.value,
      startL: startWave.value,
      endL: endWave.value,
      iCount: iCount.value
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

  // 0x04
  // 当【变量类型】选择” 光栅刻线密度（线/mm）”时，根据6，7,4,10,11,1,2,5,12调用calOffnerDispersionListByD，绘制3个曲线（A、B、C），其中
  // 横坐标都是：result[4*次数【12】+0]:追迹波长（nm）
  // A纵坐标：result[4*次数【12】+1]：GDD（fs2）
  // B纵坐标：result[4*次数【12】+2]：TOD（fs2）
  // C纵坐标：result[4*次数【12】+3]：FOD（fs2）
  if (parametersType.value === 'd') {
    const { data } = await dllOffnerCalOffnerDispersionListByD({
      wave0: wave0.value,
      wave: wave.value,
      gama: gama.value,
      d: d.value,
      l: l.value,
      r: r.value,
      n: n.value,
      startD: startWave.value,
      endD: endWave.value,
      iCount: iCount.value
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

  // 0x05
  // 当【变量类型】选择” 光栅入射角（度）”时，根据6，7,10,11,3,1,2,5,12调用calOffnerDispersionListByGama，绘制3个曲线（A、B、C），其中
  // 横坐标都是：result[4*次数【12】+0]:追迹波长（nm）
  // A纵坐标：result[4*次数【12】+1]：GDD（fs2）
  // B纵坐标：result[4*次数【12】+2]：TOD（fs2）
  // C纵坐标：result[4*次数【12】+3]：FOD（fs2）
  if (parametersType.value === 'gama') {
    const { data } = await dllOffnerCalOffnerDispersionListByGama({
      wave0: wave0.value,
      wave: wave.value,
      gama: gama.value,
      d: d.value,
      l: l.value,
      r: r.value,
      n: n.value,
      startGama: startWave.value,
      endGama: endWave.value,
      iCount: iCount.value
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
}
// E 绘图输入参数
</script>
