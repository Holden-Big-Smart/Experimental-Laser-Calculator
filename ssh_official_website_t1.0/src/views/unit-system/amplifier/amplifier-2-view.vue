<template>
  <div>
    <h3 class="text-xl text-center my-0">名称：光参量放大器(2)</h3>
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
          <select v-model="state.crystalname" class="select select-sm w-44 select-bordered">
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
          <span class="text-sm w-[9em]">起始内部非共线角：</span>
          <input v-model="state.starta" class="input input-sm input-bordered" type="number" />
        </div>
        <div class="my-2 flex items-center gap-2">
          <span class="text-sm w-[9em]">结束内部非共线角：</span>
          <input v-model="state.enda" class="input input-sm input-bordered" type="number" />
        </div>
        <div class="my-2 flex items-center gap-2">
          <span class="text-sm w-[9em]">计算点数：</span>
          <input v-model="state.iCount" class="input input-sm input-bordered" type="number" />
        </div>
        <button class="btn btn-sm btn-neutral" @click="handleDrawClick">绘图</button>
      </fieldset>
      <!-- E 绘图变量参数 -->

      <!-- S 数值输出参数 -->
      <fieldset class="my-4">
        <legend class="text-sm font-bold">数值输出参数</legend>
        <textarea
          class="textarea textarea-sm w-full textarea-bordered"
          rows="10"
          disabled
          :value="result"
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
            @click="useExportEChartData(aOption, '相位匹配角/度')"
          >
            保存数据
          </button>
          <button
            class="btn btn-sm btn-ghost mx-4"
            @click="useExportEChart($refs.ACharts, '相位匹配角/度')"
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
            @click="useExportEChartData(bOption, '参量带宽/nm')"
          >
            保存数据
          </button>
          <button
            class="btn btn-sm btn-ghost mx-4"
            @click="useExportEChart($refs.BCharts, '参量带宽/nm')"
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
            @click="useExportEChartData(cOption, '增益带宽/nm')"
          >
            保存数据
          </button>
          <button
            class="btn btn-sm btn-ghost mx-4"
            @click="useExportEChart($refs.CCharts, '增益带宽/nm')"
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
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import emitter from '@/utils/eventBus.js'

import useMaterialInfoCSV from '@/hooks/useMaterialInfoCSV.js'
import { dllGclCalOPAForAngleRange, dllGclCalOPAForAngleRangeList } from '@/api/dll'
import { toFixed } from '@/utils/index.js'
import useExportEChartData from '@/hooks/useExportEChartData.js'
import useExportEChart from '@/hooks/useExportEChart.js'
import { GRID } from '@/utils/constant.js'
const materialInfoCSV = useMaterialInfoCSV()
const selectOptions = computed(() =>
  materialInfoCSV.value.filter((row) => row.AxisNum === '1' && row.NegPosType === '-1')
)

// S 输入参数
const state = reactive({
  /** 晶体名称*/
  crystalname: 'BBO', // 4
  /** 泵浦光波长，单位为nm*/
  xp: 532, // 2
  /** 非线性晶体长度，单位为mm*/
  xs: 800, // 1
  /** 泵浦功率密度，单位为GW/cm²*/
  Ip: 3, // 3
  /** 材料长度，单位为mm*/
  lc: 1, // 5
  /** 有效非线性系数，单位为pm/V*/
  deff: 2, // 6

  /** 起始信号光波长，单位为nm*/
  starta: 0, // 7
  /** 结束信号光波长，单位为nm*/
  enda: 7, // 8
  /** 计算点数，即需要计算的泵浦光强度个数*/
  iCount: 10 // 9
})

const x = ref([])
const a = ref([]),
  b = ref([]),
  c = ref([]),
  d = ref([])
const aOption = computed(() => ({
  grid: GRID,
  tooltip: {
    trigger: 'axis'
  },
  xAxis: {
    name: '非共线角/度',
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
      data: a.value
    }
  ]
}))
const bOption = computed(() => ({
  grid: GRID,
  tooltip: {
    trigger: 'axis'
  },
  xAxis: {
    name: '非共线角/度',
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
    name: '参量带宽/nm'
  },
  series: [
    {
      name: '参量带宽/nm',
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
const cOption = computed(() => ({
  grid: GRID,
  tooltip: {
    trigger: 'axis'
  },
  xAxis: {
    name: '非共线角/度',
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
    name: '增益带宽/nm'
  },
  series: [
    {
      name: '增益带宽/nm',
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
const dOption = computed(() => ({
  grid: GRID,
  tooltip: {
    trigger: 'axis'
  },
  xAxis: {
    name: '非共线角/度',
    nameLocation: 'center',
    nameTextStyle: {
      lineHeight: 30
    },
    axisLabel: {
      formatter: (value) => toFixed(value) // 保留两位小数
    },
    data: x.value
  },
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

const result = ref(null)
const handleCalGratingParametersListClick = async () => {
  // 若已知1，2，5，3，6，4时， 用calOPAForAngleRange计算结果，在输出参数区域显示如下：
  // 泵浦光波长（nm）：result[0]
  // 信号光波长（nm）：result[1]
  // 空闲光波长（nm）：result[2]
  // 最佳非共线角（度）：result[3]
  // 此时相位匹配角（度）：result[4]
  // 此时参量带宽（nm）：result[5]
  // 此时增益倍数：result[6]
  // 此时增益带宽（nm）：result[7]
  if (!state.xp || !state.xs || !state.lc || !state.Ip || !state.deff || !state.crystalname) {
    alert('请填写完整参数')
    return
  }
  const { data } = await dllGclCalOPAForAngleRange({
    crystalname: state.crystalname,
    xs: state.xs,
    xp: state.xp,
    lc: state.lc,
    Ip: state.Ip,
    deff: state.deff
  })

  result.value = [
    `泵浦光波长（nm）：${toFixed(data[0], 4)}`,
    `信号光波长（nm）：${toFixed(data[1], 4)}`,
    `空闲光波长（nm）：${toFixed(data[2], 4)}`,
    `最佳非共线角（度）：${toFixed(data[3], 4)}`,
    `此时相位匹配角（度）：${toFixed(data[4], 4)}`,
    `此时参量带宽（nm）：${toFixed(data[5], 4)}`,
    `此时增益倍数：${toFixed(data[6], 4)}`,
    `此时增益带宽（nm）：${toFixed(data[7], 4)}`
  ].join('\n')
}

const handleDrawClick = async () => {
  // const step = 6 为啥写6啊，哈哈
  const step = 5
  const _x = []
  const _a = []
  const _b = []
  const _c = []
  const _d = []

  // 若已知4，1，2，5，6，9，3，7，8时，用calOPAForAngleRangeList计算，并分别在以下绘图区域绘图
  // 其中result[5*次数【9】+0]：曲线横坐标（非共线角/度）：
  // A.result[5*次数【9】+1]：曲线纵坐标（相位匹配角/度）
  // B.result[5*次数【9】+2]：曲线纵坐标（参量带宽/nm）
  // C.result[5*次数【9】+3]：曲线纵坐标（增益带宽/nm）
  // D.result[5*次数【9】+4]：曲线纵坐标（增益倍数）
  const { data } = await dllGclCalOPAForAngleRangeList({
    materialName: state.crystalname,
    xs: state.xs,
    xp: state.xp,
    lc: state.lc,
    Ip: state.Ip,
    iCount: state.iCount,
    deff: state.deff,
    starta: state.starta,
    enda: state.enda
  })

  for (let i = 0; i < data.length; i += step) {
    _x.push(data[i])
    _a.push(data[i + 1])
    _b.push(data[i + 2])
    _c.push(data[i + 3])
    _d.push(data[i + 4])
  }

  x.value = _x
  a.value = _a
  b.value = _b
  c.value = _c
  d.value = _d
}
// E 输入参数
</script>
