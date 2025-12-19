<template>
  <h3 class="text-xl text-center my-0">名称：菲涅耳公式</h3>
  <div class="flex justify-center gap-2 my-2 text-sm">
    <p class="text-right mb-0">版本号：V0.1-A0.1-D0.1</p>
    <p class="mb-0">发布日期：2024.04.30</p>
  </div>
  <div class="flex justify-center gap-2 my-2 text-sm">
    <button class="underline" @click="emitter.emit('feedback')">问题反馈</button>
    <button class="underline">帮助</button>
  </div>

  <div class="grid grid-cols-[320px_1fr] gap-4 bg-white rounded-md px-4 py-2">
    <div>
      <div class="my-2 text-sm font-bold">激光参数</div>
      <div class="my-2 flex items-center gap-2">
        <span class="text-sm w-[6em]">激光波长：</span>
        <input v-model="wavelength" class="input input-sm input-bordered" type="number" />
        <span class="text-sm">mm</span>
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
        <span class="text-sm w-[6em]">入射角：</span>
        <input v-model="incidentAngle" class="input input-sm input-bordered" type="number" />
        <span class="text-sm">度</span>
      </div>
      <div class="flex ml-[5em] my-4">
        <button class="btn btn-sm btn-neutral" @click="handleCalRefractivePropertiesClick">
          计算
        </button>
        <button class="btn btn-sm btn-ghost mx-4" @click="handleCalRefractivePropertiesReset">
          清空
        </button>
      </div>

      <div class="mt-6 my-2 text-sm font-bold">绘图输入参数</div>
      <div class="my-2 flex items-center gap-2">
        <span class="text-sm w-[6em]">起始入射角：</span>
        <input v-model="startIncidentAngle" class="input input-sm input-bordered" type="number" />
        <span class="text-sm">度</span>
      </div>
      <div class="my-2 flex items-center gap-2">
        <span class="text-sm w-[6em]">结束入射角：</span>
        <input v-model="endIncidentAngle" class="input input-sm input-bordered" type="number" />
        <span class="text-sm">度</span>
      </div>
      <div class="my-2 flex items-center gap-2">
        <span class="text-sm w-[6em]">计算点数：</span>
        <input v-model="iCount" class="input input-sm input-bordered" type="number" />
      </div>

      <div class="flex ml-[5em] my-4">
        <button class="btn btn-sm btn-neutral" @click="handleCalRefractivePropertiesListClick">
          绘图
        </button>
        <button class="btn btn-sm btn-ghost mx-4" @click="handleCalRefractivePropertiesListReset">
          清空
        </button>
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

      <template v-if="!!xAxis_a.length">
        <div class="my-2 text-sm font-bold">绘图输出参数</div>
        <div class="my-4 h-[180px]">
          <v-chart :option="aOption" ref="chartsA" autoresize class="chart" />
        </div>
        <div>
          <button
            class="btn btn-sm btn-neutral mx-4"
            @click="useExportEChartData(aOption, '透射率')"
          >
            保存数据
          </button>
          <button
            class="btn btn-sm btn-ghost mx-4"
            @click="useExportEChart($refs.chartsA, '反射率')"
          >
            保存图形
          </button>
        </div>

        <div class="my-2 text-sm font-bold">绘图输出参数</div>
        <div class="my-4 h-[180px]">
          <v-chart :option="bOption" ref="chartsB" autoresize class="chart" />
        </div>
        <div>
          <button
            class="btn btn-sm btn-neutral mx-4"
            @click="useExportEChartData(bOption, '透射率')"
          >
            保存数据
          </button>
          <button
            class="btn btn-sm btn-ghost mx-4"
            @click="useExportEChart($refs.chartsB, '透射率')"
          >
            保存图形
          </button>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { isNumber } from 'radash'
import { dllFnerCalRefractiveProperties, dllFnerCalRefractivePropertiesList } from '@/api/dll'
import emitter from '@/utils/eventBus.js'
import useMaterialInfoCSV from '@/hooks/useMaterialInfoCSV.js'
import useExportEChart from '@/hooks/useExportEChart.js'
import { toFixed } from '@/utils/index.js'
import useExportEChartData from '@/hooks/useExportEChartData.js'
import { GRID } from '@/utils/constant.js'

const xAxis_a = ref([])
const yAxis_a_1 = ref([])
const yAxis_a_2 = ref([])
const yAxis_a_3 = ref([])
const aOption = computed(() => ({
  grid: GRID,
  tooltip: {
    trigger: 'axis'
  },
  xAxis: {
    data: xAxis_a.value,
    name: '入射角',
    nameLocation: 'center',
    nameTextStyle: {
      lineHeight: 30
    },
    axisLabel: {
      formatter: (value) => toFixed(value) // 保留两位小数
    }
  },
  yAxis: {
    name: '反射率'
  },
  series: [
    {
      name: 'Rp',
      type: 'line',
      smooth: true,
      symbol: 'none',
      data: yAxis_a_1.value
    },
    {
      name: 'Rs',
      type: 'line',
      smooth: true,
      symbol: 'none',
      data: yAxis_a_2.value
    },
    {
      name: 'Rn',
      type: 'line',
      smooth: true,
      symbol: 'none',
      data: yAxis_a_3.value
    }
  ]
}))
const yAxis_b_1 = ref([])
const yAxis_b_2 = ref([])
const yAxis_b_3 = ref([])
const bOption = computed(() => ({
  grid: GRID,
  tooltip: {
    trigger: 'axis'
  },
  xAxis: {
    name: '入射角',
    nameLocation: 'center',
    nameTextStyle: {
      lineHeight: 30
    },
    data: xAxis_a.value,
    axisLabel: {
      formatter: (value) => toFixed(value) // 保留两位小数
    }
  },
  yAxis: {
    name: '透射率'
  },
  series: [
    {
      name: 'Tp',
      type: 'line',
      smooth: true,
      symbol: 'none',
      data: yAxis_b_1.value
    },
    {
      name: 'Ts',
      type: 'line',
      smooth: true,
      symbol: 'none',
      data: yAxis_b_2.value
    },
    {
      name: 'Tn',
      type: 'line',
      smooth: true,
      symbol: 'none',
      data: yAxis_b_3.value
    }
  ]
}))

// 0x01. 加载AxisNum列不为0的Name列作为下拉框选项
const materialInfoCSV = useMaterialInfoCSV()
const selectOptions = computed(() => materialInfoCSV.value.filter((row) => row.AxisNum === '0'))

const wavelength = ref(800) // wavelength 光波的波长，单位为纳米（nm）-1
const material = ref('K4A') // 材料名称 - 2
const incidentAngle = ref(20) // 光波的入射角，单位为度 - 3
const result = ref([]) // 结果 - 4
const startIncidentAngle = ref(0) // 起始入射角 - 5
const endIncidentAngle = ref(100) // 结束入射角 - 6
const iCount = ref(20) // 计算点数 - 7

const handleCalRefractivePropertiesClick = () => {
  result.value = null

  // 若已知 1，3，2，求结果，用 calRefractiveProperties，在 4 中显示
  // 折射角（弧度）：【结果值0】
  // 强度反射率: Rp=【结果值1】, Rs=【结果值2】
  // 强度透射率: Tp=【结果值3】, Ts=【结果值4】

  if (isNumber(wavelength.value) && isNumber(incidentAngle.value) && material.value) {
    dllFnerCalRefractiveProperties({
      wavelength: wavelength.value,
      incidentAngle: incidentAngle.value,
      material: material.value
    }).then((res) => {
      result.value = [
        `折射角（弧度）：${toFixed(res.data[0], 4)}`,
        `强度反射率: Rp=${toFixed(res.data[1], 4)}, Rs=${toFixed(res.data[2], 4)}`,
        `强度透射率: Tp=${toFixed(res.data[3], 4)}, Ts=${toFixed(res.data[4], 4)}`
      ].join('\n')
    })
  }
}
const handleCalRefractivePropertiesReset = () => {
  material.value = null
  wavelength.value = null
  incidentAngle.value = null
}

const handleCalRefractivePropertiesListClick = () => {
  xAxis_a.value = []

  yAxis_a_1.value = []
  yAxis_a_2.value = []
  yAxis_a_3.value = []

  yAxis_b_1.value = []
  yAxis_b_2.value = []
  yAxis_b_3.value = []

  // 若已知 1，5，6，7，2，求结果二维数组用 calRefractivePropertiesList
  if (
    isNumber(wavelength.value) &&
    isNumber(startIncidentAngle.value) &&
    isNumber(endIncidentAngle.value) &&
    isNumber(iCount.value) &&
    material.value
  ) {
    dllFnerCalRefractivePropertiesList({
      /** material*/
      material: material.value,
      /** wavelength*/
      wavelength: wavelength.value,
      /** startIncidentAngle*/
      startIncidentAngle: startIncidentAngle.value,
      /** endIncidentAngle*/
      endIncidentAngle: endIncidentAngle.value,
      /** iCount*/
      iCount: iCount.value
    }).then((res) => {
      // 曲线A区域（含3条曲线）：
      // 横坐标：results[0+7*index【7】]入射角（度）
      // 纵坐标：
      // results[1+7*index【7】]：Rp；
      // results[2+7*index【7】]:Rs;
      // results[5+7*index【7】]:Rn;
      // 曲线B区域（含3条曲线）：
      // 横坐标：results[0+7*index【7】]：入射角（度）
      // 纵坐标：results[3+7*index【7】]：Tp；
      // results[4+7*index【7】]:Ts;
      // results[6+7*index【7】]:Tn;

      for (let i = 0; i < res.data.length; i += 7) {
        xAxis_a.value.push(res.data[i])

        yAxis_a_1.value.push(res.data[i + 1])
        yAxis_a_2.value.push(res.data[i + 2])
        yAxis_a_3.value.push(res.data[i + 5])

        yAxis_b_1.value.push(res.data[i + 3])
        yAxis_b_2.value.push(res.data[i + 4])
        yAxis_b_3.value.push(res.data[i + 6])
      }
    })
  }
}
const handleCalRefractivePropertiesListReset = () => {
  startIncidentAngle.value = null
  endIncidentAngle.value = null
  iCount.value = null

  xAxis_a.value = []

  yAxis_a_1.value = []
  yAxis_a_2.value = []
  yAxis_a_3.value = []

  yAxis_b_1.value = []
  yAxis_b_2.value = []
  yAxis_b_3.value = []
}
</script>
