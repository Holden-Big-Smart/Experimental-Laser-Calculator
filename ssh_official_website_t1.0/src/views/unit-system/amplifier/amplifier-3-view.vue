<template>
  <div>
    <h3 class="text-xl text-center my-0">名称：光参量放大器(3)群速度匹配</h3>
    <div class="flex justify-center gap-2 my-2 text-sm">
      <p class="text-right mb-0">版本号：V0.1-A0.1-D0.1</p>
      <p class="mb-0">发布日期：2024.04.30</p>
    </div>
    <div class="flex justify-center gap-2 my-2 text-sm">
      <button class="underline" @click="emitter.emit('feedback')">问题反馈</button>
      <button class="underline" @click="emitter.emit('help')">帮助</button>
    </div>

    <div class="grid grid-cols-2 gap-4 bg-white rounded-md px-4 py-2">
      <!-- S 信号激光参数 -->
      <fieldset class="my-4">
        <legend class="text-sm font-bold">信号激光参数</legend>
        <div class="my-2 flex items-center gap-2">
          <span class="text-sm w-[7em]">信号激光波长：</span>
          <input v-model="state.xs" class="input input-sm input-bordered" type="number" />
          <span class="text-sm">mm</span>
        </div>

        <legend class="text-sm font-bold">泵浦激光参数</legend>
        <div class="my-2 flex items-center gap-2">
          <span class="text-sm w-[7em]">泵浦激光波长：</span>
          <input v-model="state.xp" class="input input-sm input-bordered" type="number" />
          <span class="text-sm">nm</span>
        </div>
        <div class="my-2 flex items-center gap-2">
          <span class="text-sm w-[7em]">泵浦激光功率密度（选填）：</span>
          <input v-model="state.Ip" class="input input-sm input-bordered" type="number" />
          <span class="text-sm">GW/cm²</span>
        </div>
        <button class="btn btn-sm btn-neutral" @click="handleCalGratingParametersListClick">
          计算
        </button>
      </fieldset>
      <!-- E 信号激光参数 -->

      <!-- S 晶体基本参数 -->
      <fieldset class="my-4">
        <legend class="text-sm font-bold">晶体基本参数</legend>
        <div class="my-2 flex items-center gap-2">
          <span class="text-sm w-[8em]">材料名称：</span>
          <select v-model="state.materialName" class="select select-sm w-44 select-bordered">
            <option v-for="option in selectOptions" :key="option.Name" :value="option.Name">
              {{ option.Name }}
            </option>
          </select>
        </div>
        <div class="my-2 flex items-center gap-2">
          <span class="text-sm w-[8em]">相位匹配类型：</span>
          <select value="ooe" class="select select-sm w-44 select-bordered">
            <option value="ooe">ooe</option>
          </select>
        </div>
        <div class="my-2 flex items-center gap-2">
          <span class="text-sm w-[8em]">相位匹配类面：</span>
          <select value="-" class="select select-sm w-44 select-bordered">
            <option value="-">-</option>
          </select>
        </div>
        <div class="my-2 flex items-center gap-2">
          <span class="text-sm w-[8em]">材料长度：</span>
          <input v-model="state.lc" class="input input-sm input-bordered" type="number" />
          <span class="text-sm">mm</span>
        </div>
        <div class="my-2 flex items-center gap-2">
          <span class="text-sm w-[8em]">有效非线性系数：</span>
          <input v-model="state.deff" class="input input-sm input-bordered" type="number" />
          <span class="text-sm">pm/V</span>
        </div>
      </fieldset>
      <!-- E 输入光栅参数 -->

      <!-- S 绘图变量参数 -->
      <fieldset class="my-4">
        <legend class="text-sm font-bold">绘图变量参数</legend>
        <div class="my-2 flex items-center gap-2">
          <span class="text-sm w-[9em]">变量类型：</span>
          <select v-model="parametersType" class="select select-sm select-bordered">
            <option v-for="type in parametersTypeMap" :value="type.value" :key="type.value">
              {{ type.label }}
            </option>
          </select>
        </div>
        <div class="my-2 flex items-center gap-2">
          <span class="text-sm w-[9em]">起始变量值：</span>
          <input v-model="state.startxs" class="input input-sm input-bordered" type="number" />
        </div>
        <div class="my-2 flex items-center gap-2">
          <span class="text-sm w-[9em]">结束变量值：</span>
          <input v-model="state.endxs" class="input input-sm input-bordered" type="number" />
        </div>
        <div class="my-2 flex items-center gap-2">
          <span class="text-sm w-[9em]">计算点数：</span>
          <input v-model="state.iCount" class="input input-sm input-bordered" type="number" />
        </div>
        <button class="btn btn-sm btn-neutral" @click="handleDraw">绘图</button>
      </fieldset>
      <!-- E 绘图变量参数 -->

      <!-- S 数值输出参数 -->
      <fieldset class="my-4">
        <legend class="text-sm font-bold">数值输出参数</legend>
        <textarea
          class="textarea textarea-sm w-full textarea-bordered"
          rows="10"
          disabled
        ></textarea>
      </fieldset>
      <!-- E 数值输出参数 -->
      <!--S 绘图-->
      <fieldset class="my-4" v-if="!!a.length">
        <legend class="text-sm font-bold">绘图输出参数1</legend>
        <div class="h-[160px]">
          <v-chart :option="aOption" ref="ACharts" autoresize />
        </div>
        <div class="flex ml-[7em] my-4">
          <button
            class="btn btn-sm btn-neutral"
            @click="useExportEChartData(aOption, '非共线角/度')"
          >
            保存数据
          </button>
          <button
            class="btn btn-sm btn-ghost mx-4"
            @click="useExportEChart($refs.ACharts, '非共线角/度')"
          >
            保存图形
          </button>
        </div>
      </fieldset>

      <fieldset class="my-4" v-if="!!b.length">
        <legend class="text-sm font-bold">绘图输出参数2</legend>
        <div class="h-[160px]">
          <v-chart :option="bOption" ref="BCharts" autoresize />
        </div>
        <div class="flex ml-[7em] my-4">
          <button
            class="btn btn-sm btn-neutral"
            @click="useExportEChartData(bOption, '相位匹配角/度')"
          >
            保存数据
          </button>
          <button
            class="btn btn-sm btn-ghost mx-4"
            @click="useExportEChart($refs.BCharts, '相位匹配角/度')"
          >
            保存图形
          </button>
        </div>
      </fieldset>

      <fieldset class="my-4" v-if="!!c.length">
        <legend class="text-sm font-bold">绘图输出参数3</legend>
        <div class="h-[160px]">
          <v-chart :option="cOption" ref="CCharts" autoresize />
        </div>
        <div class="flex ml-[7em] my-4">
          <button
            class="btn btn-sm btn-neutral"
            @click="useExportEChartData(cOption, '参量带宽/nm')"
          >
            保存数据
          </button>
          <button
            class="btn btn-sm btn-ghost mx-4"
            @click="useExportEChart($refs.CCharts, '参量带宽/nm')"
          >
            保存图形
          </button>
        </div>
      </fieldset>

      <fieldset class="my-4" v-if="!!d.length">
        <legend class="text-sm font-bold">绘图输出参数4</legend>
        <div class="h-[160px]">
          <v-chart :option="dOption" ref="DCharts" autoresize />
        </div>
        <div class="flex ml-[7em] my-4">
          <button class="btn btn-sm btn-neutral" @click="useExportEChartData(dOption, '增益倍数')">
            保存数据
          </button>
          <button
            class="btn btn-sm btn-ghost mx-4"
            @click="useExportEChart($refs.DCharts, '增益倍数')"
          >
            保存图形
          </button>
        </div>
      </fieldset>

      <fieldset class="my-5" v-if="!!e.length">
        <legend class="text-sm font-bold">绘图输出参数5</legend>
        <div class="h-[160px]">
          <v-chart :option="eOption" ref="ECharts" autoresize />
        </div>
        <div class="flex ml-[7em] my-4">
          <button
            class="btn btn-sm btn-neutral"
            @click="useExportEChartData(eOption, '增益带宽/nm')"
          >
            保存数据
          </button>
          <button
            class="btn btn-sm btn-ghost mx-4"
            @click="useExportEChart($refs.ECharts, '增益带宽/nm')"
          >
            保存图形
          </button>
        </div>
      </fieldset>
    </div>
  </div>
</template>

<script setup>
import {
  dllGclCalOPA3ForPumpPowerList,
  dllGclCalOPA3ForPumpWaveList,
  dllGclCalOPA3ForSignalwaveList
} from '@/api/dll'
import { computed, reactive, ref, watch } from 'vue'
import emitter from '@/utils/eventBus.js'

import useMaterialInfoCSV from '@/hooks/useMaterialInfoCSV.js'
import { toFixed } from '@/utils/index.js'
import useExportEChartData from '@/hooks/useExportEChartData.js'
import { GRID } from '@/utils/constant.js'
import { select } from 'radash'
import useExportEChart from '@/hooks/useExportEChart.js'
const materialInfoCSV = useMaterialInfoCSV()
const selectOptions = computed(() =>
  materialInfoCSV.value.filter((row) => row.AxisNum === '1' && row.NegPosType === '-1')
)

// S 输入参数
const parametersTypeMap = [
  { value: 'signal', label: '信号光波长（nm）', xAxisName: '信号光波长/nm' },
  { value: 'pump', label: '泵浦光波长（nm)', xAxisName: '泵浦光波长/nm' },
  { value: 'l', label: '泵浦光功率密度（GW/c㎡）', xAxisName: '泵浦功率密度/GW/cm²' }
]
const parametersType = ref(parametersTypeMap[0].value)

watch(
  () => parametersType.value,
  (parametersType) => {
    if (parametersType === 'signal') {
      state.startxs = 700
      state.endxs = 900
    }

    if (parametersType === 'pump') {
      state.startxs = 300
      state.endxs = 700
    }

    if (parametersType === 'l') {
      state.startxs = 1
      state.endxs = 10
    }
  }
)

const state = reactive({
  /** 晶体名称*/
  materialName: 'BBO', // 4
  /** 泵浦光波长，单位为nm*/
  xp: 532, // 2
  /** 信号光波长，单位为mm*/
  xs: 700, // 1
  /** 泵浦功率密度，单位为GW/cm²*/
  Ip: 1, // 3
  /** 有效非线性系数，单位为pm/V*/
  deff: 2, // 6

  /** 非线性晶体长度，单位为mm*/
  lc: 1, // 5

  /** 起始信号光波长，单位为nm*/
  startxs: 700, // 8
  /** 结束信号光波长，单位为nm*/
  endxs: 900, // 9
  /** 计算点数，即需要计算的泵浦光强度个数*/
  iCount: 100 // 7
})

const x = ref([])
// 非共线角/度
const a = ref([])
const aOption = computed(() => ({
  grid: GRID,
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
  tooltip: { trigger: 'axis' },
  yAxis: { name: '非共线角/度' },
  series: [
    {
      name: '非共线角/度',
      type: 'line',
      smooth: true,
      symbol: 'none',
      lineStyle: {
        color: '#1677ff'
      },
      data: a.value
    }
  ]
}))

// 相位匹配角/度
const b = ref([])
const bOption = computed(() => ({
  grid: GRID,
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
  tooltip: { trigger: 'axis' },
  yAxis: {
    name: '相位匹配角/度'
  },
  series: [
    {
      name: '相位匹配角/度',
      type: 'line',
      smooth: true,
      symbol: 'none',
      lineStyle: {
        color: '#1677ff'
      },
      data: b.value
    }
  ]
}))

// 参量带宽/nm
const c = ref([])
const cOption = computed(() => ({
  grid: GRID,
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
  tooltip: { trigger: 'axis' },
  yAxis: { name: '参量带宽/nm' },
  series: [
    {
      name: '参量带宽/nm',
      type: 'line',
      smooth: true,
      symbol: 'none',
      lineStyle: {
        color: '#1677ff'
      },
      data: c.value
    }
  ]
}))

// 增益倍数
const d = ref([])
const dOption = computed(() => ({
  grid: GRID,
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
  tooltip: { trigger: 'axis' },
  yAxis: { name: '增益倍数' },
  series: [
    {
      name: '增益倍数',
      type: 'line',
      smooth: true,
      symbol: 'none',
      lineStyle: {
        color: '#1677ff'
      },
      data: d.value
    }
  ]
}))

// 增益带宽/nm
const e = ref([])
const eOption = computed(() => ({
  grid: GRID,
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
  tooltip: { trigger: 'axis' },
  yAxis: { name: '增益带宽/nm' },
  series: [
    {
      name: '增益带宽/nm',
      type: 'line',
      smooth: true,
      symbol: 'none',
      lineStyle: {
        color: '#1677ff'
      },
      data: e.value
    }
  ]
}))

const handleCalGratingParametersListClick = () => {}

const handleDraw = async () => {
  const step = 6
  const _x = []
  const _a = []
  const _b = []
  const _c = []
  const _d = []
  const _e = []
  // a.【变量类型】选择“信号光波长（nm）”时候，根据4，2，5，3，6，7，8，9时调用calOPA3ForSignalwaveList ，绘制以下5个曲线（各占用一个区域）
  // 其中result[6*次数【7】+5]：曲线横坐标（信号光波长/nm）：
  // A.result[6*次数【7】+0]：曲线纵坐标（信号光波长/nm）
  // B.result[6*次数【7】+1]：曲线纵坐标（相位匹配角/度）
  // C.result[6*次数【7】+2]：曲线纵坐标（参量带宽/nm）
  // D.result[6*次数【7】+3]：曲线纵坐标（增益倍数）
  // E.result[6*次数【7】+4]：曲线纵坐标（增益带宽/nm）
  if (parametersType.value === 'signal') {
    const { data } = await dllGclCalOPA3ForSignalwaveList({
      materialName: state.materialName,
      xs: state.xs,
      xp: state.xp,
      lc: state.lc,
      Ip: state.Ip,
      deff: state.deff,
      startxs: state.startxs,
      endxs: state.endxs,
      iCount: state.iCount
    })

    for (let i = 0; i < data.length; i += step) {
      _x.push(data[i + 5])
      _a.push(data[i])
      _b.push(data[i + 1])
      _c.push(data[i + 2])
      _d.push(data[i + 3])
      _e.push(data[i + 4])
    }

    x.value = _x
    a.value = _a
    b.value = _b
    c.value = _c
    d.value = _d
    e.value = _e

    return
  }

  // b.【变量类型】选择“泵浦光波长（nm）”时候，根据4，1，8，9，5，3，6，7时调用calOPA3ForPumpWaveList，绘制以下5个曲线（各占用一个区域）
  // 其中result[6*次数【7】+5]：曲线横坐标（信号光波长/nm）：
  // A.result[6*次数【7】+0]：曲线纵坐标（信号光波长/nm）
  // B.result[6*次数【7】+1]：曲线纵坐标（相位匹配角/度）
  // C.result[6*次数【7】+2]：曲线纵坐标（参量带宽/nm）
  // D.result[6*次数【7】+3]：曲线纵坐标（增益倍数）
  // E.result[6*次数【7】+4]：曲线纵坐标（增益带宽/nm）
  if (parametersType.value === 'pump') {
    const { data } = await dllGclCalOPA3ForPumpWaveList({
      materialName: state.materialName,
      xs: state.xs,
      startxp: state.startxs,
      endxp: state.endxs,
      lc: state.lc,
      Ip: state.Ip,
      deff: state.deff,
      iCount: state.iCount
    })

    for (let i = 0; i < data.length; i += step) {
      _x.push(data[i + 5])
      _a.push(data[i])
      _b.push(data[i + 1])
      _c.push(data[i + 2])
      _d.push(data[i + 3])
      _e.push(data[i + 4])
    }

    x.value = _x
    a.value = _a
    b.value = _b
    c.value = _c
    d.value = _d
    e.value = _e

    return
  }

  // c.【变量类型】选择“泵浦光功率密度（GW/cm2）”时候，根据4,1,2,5,7,8,9时调用calOPA3ForPumpPowerList，绘制以下1个曲线（各占用一个区域）
  if (parametersType.value === 'l') {
    const { data } = await dllGclCalOPA3ForPumpPowerList({
      materialName: state.materialName,
      xs: state.xs,
      xp: state.xp,
      startIp: state.startxs,
      endIp: state.endxs,
      lc: state.lc,
      iCount: state.iCount
    })

    for (let i = 0; i < data.length; i += step) {
      _x.push(data[i])
      _e.push(data[i + 1])
    }

    x.value = _x
    a.value = _a
    b.value = _b
    c.value = _c
    d.value = _d
    e.value = _e
  }
}
// E 输入参数
</script>
