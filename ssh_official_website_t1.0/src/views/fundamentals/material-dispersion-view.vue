<template>
  <h3 class="text-xl text-center my-0">名称：材料色散计算</h3>
  <div class="flex justify-center gap-2 my-2 text-sm">
    <p class="text-right mb-0">版本号：V0.1-A0.1-D0.1</p>
    <p class="mb-0">发布日期：2024.04.30</p>
  </div>
  <div class="flex justify-center gap-2 my-2 text-sm">
    <button class="underline" @click="emitter.emit('feedback')">问题反馈</button>
    <button class="underline">帮助</button>
  </div>

  <div class="grid grid-cols-2 gap-4 bg-white rounded-md px-4 py-2">
    <div>
      <div class="my-2 text-sm font-bold">激光参数</div>
      <div class="my-2 flex items-center gap-2">
        <span class="text-sm w-[6em]">激光波长：</span>
        <input v-model="wavelength" class="input input-sm input-bordered" type="number" />
        <span class="text-sm">nm</span>
      </div>
      <div class="my-2 text-sm font-bold">材料参数</div>
      <div class="my-2 flex items-center gap-2">
        <span class="text-sm w-[6em]">材料名称：</span>
        <select v-model="material" class="select select-sm w-44 select-bordered">
          <option v-for="option in selectOptions" :key="option.Name" :value="option.Name">
            {{ option.Name }}
          </option>
        </select>
      </div>
      <div class="my-2 flex items-center gap-2">
        <span class="text-sm w-[6em]">材料长度：</span>
        <input v-model="Materiallength" class="input input-sm input-bordered" type="number" />
        <span class="text-sm">mm</span>
      </div>
      <div class="flex ml-[5em] my-4">
        <button class="btn btn-sm btn-neutral" @click="handleClssCalMaterialDispersionClick">
          计算
        </button>
        <button class="btn btn-sm btn-ghost mx-4" @click="handleClssCalMaterialDispersionReset">
          清空
        </button>
      </div>

      <div class="mt-6 my-2 text-sm font-bold">绘图输入参数</div>
      <div class="my-2 flex items-center gap-2">
        <span class="text-sm w-[6em]">起始波长：</span>
        <input v-model="startIncidentAngle" class="input input-sm input-bordered" type="number" />
        <span class="text-sm">nm</span>
      </div>
      <div class="my-2 flex items-center gap-2">
        <span class="text-sm w-[6em]">结束波长：</span>
        <input v-model="endIncidentAngle" class="input input-sm input-bordered" type="number" />
        <span class="text-sm">nm</span>
      </div>
      <div class="my-2 flex items-center gap-2">
        <span class="text-sm w-[6em]">计算点数：</span>
        <input v-model="iCount" class="input input-sm input-bordered" type="number" />
        <span class="text-sm"></span>
      </div>

      <div class="flex ml-[5em] my-4">
        <button class="btn btn-sm btn-neutral" @click="handleDraw">绘图</button>
      </div>
    </div>

    <div>
      <div class="text-sm font-bold">输出参数</div>
      <div class="my-4">
        <textarea
          class="textarea textarea-sm w-full textarea-bordered"
          disabled
          rows="5"
          :value="result"
        ></textarea>
      </div>

      <fieldset class="my-4" v-if="!!n.length">
        <legend class="text-sm font-bold">绘图输出参数</legend>
        <div class="my-4 h-[180px]">
          <v-chart :option="nOption" ref="NCharts" autoresize class="chart" />
        </div>
        <div>
          <button
            class="btn btn-sm btn-neutral mx-4"
            @click="useExportEChartData(nOption, '折射率n')"
          >
            保存数据
          </button>
          <button
            class="btn btn-sm btn-ghost mx-4"
            @click="useExportEChart($refs.NCharts, '折射率n')"
          >
            保存图形
          </button>
        </div>
      </fieldset>

      <fieldset class="my-4" v-if="!!gdd.length">
        <legend class="text-sm font-bold">绘图输出参数</legend>
        <div class="my-2 h-[180px]">
          <v-chart :option="gddOption" ref="GDDCharts" autoresize class="chart" />
        </div>
        <div>
          <button
            class="btn btn-sm btn-neutral mx-4"
            @click="useExportEChartData(gddOption, 'GDD曲线')"
          >
            保存数据
          </button>
          <button
            class="btn btn-sm btn-ghost mx-4"
            @click="useExportEChart($refs.GDDCharts, 'GDD曲线')"
          >
            保存图形
          </button>
        </div>
      </fieldset>

      <fieldset class="my-4" v-if="!!tod.length">
        <legend class="text-sm font-bold">绘图输出参数</legend>
        <div class="my-2 h-[180px]">
          <v-chart :option="todOption" ref="TODCharts" autoresize class="chart" />
        </div>
        <div>
          <button
            class="btn btn-sm btn-neutral mx-4"
            @click="useExportEChartData(todOption, 'TOD曲线')"
          >
            保存数据
          </button>
          <button
            class="btn btn-sm btn-ghost mx-4"
            @click="useExportEChart($refs.TODCharts, 'TOD曲线')"
          >
            保存图形
          </button>
        </div>
      </fieldset>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { isNumber } from 'radash'
import materialInfo_Ex from '@/assets/static/tables/MaterialInfo_Ex.csv?raw'
import { dllClssCalMaterialDispersion, dllClssCalMaterialDispersionList } from '@/api/dll'
import { formatTableInfo, toFixed } from '@/utils/index.js'
import emitter from '@/utils/eventBus.js'
import useExportEChartData from '@/hooks/useExportEChartData.js'
import useExportEChart from '@/hooks/useExportEChart.js'

const { tableHeader, tableData } = formatTableInfo(materialInfo_Ex)
// csv2json
const jsonTableData = tableData.reduce((acc, row) => {
  // 过滤空行
  if (!row[0]) return acc

  const obj = {}
  tableHeader.forEach((header, index) => {
    obj[header] = row[index]
  })
  acc.push(obj)
  return acc
}, [])
// 0x01. 加载AxisNum列不为0的Name列作为下拉框选项
const selectOptions = jsonTableData.filter((row) => row.AxisNum === '0')

const wavelength = ref(800) // wavelength 光波的波长，单位为纳米（nm）-1
const material = ref('H-FK61') // 材料名称 - 2
const Materiallength = ref(1) // 材料长度，单位为度 - 3
const result = ref([]) // 结果 - 4
const startIncidentAngle = ref(700) // 起始入射角 - 5
const endIncidentAngle = ref(900) // 结束入射角 - 6
const iCount = ref(10) // 计算点数 - 7

const GRID = {
  top: '18%',
  left: '3%',
  right: '4%',
  bottom: '10%',
  containLabel: true
}
const x = ref([])
const n = ref([])
const gdd = ref([])
const tod = ref([])
const nOption = computed(() => ({
  color: ['#1677ff'],
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
    data: x.value
  },
  yAxis: {
    name: '折射率n'
  },
  series: [
    {
      name: '折射率n',
      type: 'line',
      smooth: true,
      symbol: 'none',
      data: n.value
    }
  ]
}))
const gddOption = computed(() => ({
  color: ['#1677ff'],
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
    data: x.value
  },
  yAxis: {
    name: 'GDD'
  },
  series: [
    {
      name: 'GDD',
      type: 'line',
      smooth: true,
      symbol: 'none',
      data: gdd.value
    }
  ]
}))
const todOption = computed(() => ({
  color: ['#1677ff'],
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
    data: x.value
  },
  yAxis: {
    name: 'TOD'
  },
  series: [
    {
      name: 'TOD',
      type: 'line',
      smooth: true,
      symbol: 'none',
      data: tod.value
    }
  ]
}))

const handleClssCalMaterialDispersionClick = () => {
  // 若已知 2，1，3，求结果，用 calMaterialDispersion，在 4 中显示
  if (isNumber(wavelength.value) && isNumber(Materiallength.value) && material.value) {
    result.value = null

    dllClssCalMaterialDispersion({
      wavelength: wavelength.value,
      Materiallength: Materiallength.value,
      material: material.value
    }).then((res) => {
      result.value = [
        `折射率: ${toFixed(res.data?.[0], 4)}`,
        `GD: ${toFixed(res.data?.[1], 4)}, GDD: ${toFixed(res.data?.[2], 4)}`,
        `TOD: ${toFixed(res.data?.[3], 4)}, FOD: ${toFixed(res.data?.[4], 4)}`
      ].join('\n')
    })
  }
}
const handleClssCalMaterialDispersionReset = () => {
  material.value = null
  wavelength.value = null
  Materiallength.value = null
}

const handleDraw = () => {
  const step = 4
  const _x = [],
    _n = [],
    _tod = [],
    _gdd = []

  // 若已知2，5，6，7，3，求结果一维数组用calMaterialDispersionList
  // 需要画3个图：
  // 曲线A区域（含1条曲线）：
  // 横坐标：results[3+step]
  // 纵坐标：results[0+step]：折射率n曲线
  // 曲线B区域（含1条曲线）：
  // 横坐标：results[3+step]
  // 纵坐标：results[1+step]：GDD曲线
  // 曲线C区域（含1条曲线）：
  // 横坐标：results[3+step]
  // 纵坐标：results[2+step]：TOD曲线
  if (
    isNumber(wavelength.value) &&
    isNumber(startIncidentAngle.value) &&
    isNumber(endIncidentAngle.value) &&
    isNumber(iCount.value) &&
    isNumber(Materiallength.value)
  ) {
    dllClssCalMaterialDispersionList({
      material: material.value,
      Materiallength: Materiallength.value,
      startWavelength: startIncidentAngle.value,
      endWavelength: endIncidentAngle.value,
      iCount: iCount.value
    }).then(({ data }) => {
      for (let i = 0; i < data.length; i += step) {
        _x.push(data[i + 3])
        _n.push(data[i])
        _gdd.push(data[i + 1])
        _tod.push(data[i + 2])
      }

      x.value = _x
      n.value = _n
      tod.value = _tod
      gdd.value = _gdd
    })
  }
}
</script>
