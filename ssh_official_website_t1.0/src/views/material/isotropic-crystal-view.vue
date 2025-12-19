<template>
  <h3 class="text-xl text-center my-0">名称：各向同性晶体/玻璃</h3>
  <div class="flex justify-center gap-2 my-2 text-sm">
    <p class="text-right mb-0">版本号：V0.1-A0.1-D0.1</p>
    <p class="mb-0">发布日期：2024.04.30</p>
  </div>
  <div class="flex justify-center gap-2 my-2 text-sm">
    <button class="underline" @click="emitter.emit('feedback')">问题反馈</button>
    <button class="underline" @click="helpVisible = !helpVisible">帮助</button>
  </div>

  <select class="select select-sm select-bordered" @change="handleSelect">
    <option v-for="(option, index) in selectOptions" :key="option.Name" :value="index">
      {{ option.Name }}
    </option>
  </select>

  <!-- 结果表格 -->
  <div class="my-4 bg-white rounded-md overflow-x-auto">
    <table class="table text-nowrap">
      <thead>
        <tr>
          <th v-for="header in displayTableHeader" :key="header">{{ header }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in displayTableData" :key="index">
          <td v-for="(cell, idx) in row" :key="cell + idx">{{ cell }}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- 帮助图片 -->
  <div class="my-2" v-show="helpVisible">
    <!-- 当选项值对应的EquationType为1时, 表格下方展示图片Sellmeier.png -->
    <img
      v-show="selectedKeys === '1'"
      class="w-full rounded-md"
      alt="sellmeier"
      src="@/assets/material/sellmeier.png"
    />

    <!-- 当选项值对应的EquationType为2时, 表格下方展示图片Schott.png -->
    <img
      v-show="selectedKeys === '2'"
      class="w-full rounded-md"
      alt="schott"
      src="@/assets/material/schott.png"
    />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

import MainLayout from '@/layouts/MainLayout.vue'
import materialInfo_Ex from '@/assets/static/tables/MaterialInfo_Ex.csv?raw'
import glass_SM from '@/assets/static/tables/Glass_SM.csv?raw'
import glass_ST from '@/assets/static/tables/Glass_ST.csv?raw'
import { formatTableInfo } from '@/utils/index.js'
import { ref } from 'vue'
import emitter from '@/utils/eventBus.js'

const route = useRoute()

const { tableHeader, tableData } = formatTableInfo(materialInfo_Ex)
const { tableHeader: glass_SMTableHeader, tableData: glass_SMTableData } = formatTableInfo(glass_SM)
const { tableHeader: glass_STTableHeader, tableData: glass_STTableData } = formatTableInfo(glass_ST)

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

// 清空tableHeader和tableData
tableHeader.length = tableData.length = 0

// 0x01. 加载AxisNum列为0的Name列作为下拉框选项
const selectOptions = jsonTableData.filter((row) => row.AxisNum === '0')
const selectedKeys = ref()

const displayTableHeader = ref([])
const displayTableData = ref([])
const helpVisible = ref(false)

const handleSelect = (e) => {
  // e.target.value: 0, 1, 2, ...
  const target = selectOptions[e.target.value]
  selectedKeys.value = target.EquationType

  // 0x02. 根据选项值更新表格数据
  switch (selectedKeys.value /* === EquationType */) {
    // 当选项值对应的EquationType为1时，读取Glass_SM.csv
    case '1':
      {
        displayTableHeader.value = glass_SMTableHeader

        const NameColumnIndex = glass_SMTableHeader.indexOf('Name')

        displayTableData.value = glass_SMTableData.filter(
          (row) => row[NameColumnIndex] === target.Name
        )
      }
      break
    // 当选项值对应的EquationType为2时，读取Glass_ST.csv
    case '2':
      {
        displayTableHeader.value = glass_STTableHeader
        const NameColumnIndex = glass_STTableHeader.indexOf('Name')

        displayTableData.value = glass_STTableData.filter(
          (row) => row[NameColumnIndex] === target.Name
        )
      }
      break
  }
}

handleSelect({ target: { value: 0 } })
</script>
