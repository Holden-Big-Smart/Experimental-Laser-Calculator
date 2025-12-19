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

  <div class="my-2" v-show="helpVisible">
    <img class="w-full rounded-md" alt="" src="@/assets/material/extended.png" />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

import MainLayout from '@/layouts/MainLayout.vue'
import materialInfo_Ex from '@/assets/static/tables/MaterialInfo_Ex.csv?raw'
import uCrystal_SM from '@/assets/static/tables/uCrystal_SM_Ex.csv?raw'
import bCrystal_SM from '@/assets/static/tables/bCrystal_SM_Ex.csv?raw'
import { formatTableInfo } from '@/utils/index.js'
import { ref } from 'vue'
import emitter from '@/utils/eventBus.js'

const route = useRoute()

const { tableHeader, tableData } = formatTableInfo(materialInfo_Ex)
const { tableHeader: uCrystal_SMTableHeader, tableData: uCrystal_SMTableData } =
  formatTableInfo(uCrystal_SM)
const { tableHeader: bCrystal_SMTableHeader, tableData: bCrystal_SMTableData } =
  formatTableInfo(bCrystal_SM)

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

// 0x01. 加载AxisNum列不为0的Name列作为下拉框选项
const selectOptions = jsonTableData.filter((row) => row.AxisNum !== '0')
const selectedKeys = ref()

const displayTableHeader = ref([])
const displayTableData = ref([])
const helpVisible = ref(false)

const handleSelect = (e) => {
  // e.target.value: 0, 1, 2, ...
  const target = selectOptions[e.target.value]
  selectedKeys.value = target.AxisNum

  displayTableHeader.value = []
  displayTableData.value = []

  // 0x02. 根据选项值更新表格数据
  switch (selectedKeys.value /* === AxisNum */) {
    // 当选项值对应的AxisNum为1时，读取uCrystal_SM_Ex.csv
    case '1':
      {
        displayTableHeader.value = uCrystal_SMTableHeader

        const NameColumnIndex = uCrystal_SMTableHeader.indexOf('Name')
        displayTableData.value = uCrystal_SMTableData.filter(
          (row) => row[NameColumnIndex] === target.Name
        )
      }
      break
    // 当选项值对应的AxisNum为2时，读取bCrystal_SM_Ex.csv
    case '2':
      {
        displayTableHeader.value = bCrystal_SMTableHeader
        const NameColumnIndex = bCrystal_SMTableHeader.indexOf('Name')

        displayTableData.value = bCrystal_SMTableData.filter(
          (row) => row[NameColumnIndex] === target.Name
        )
      }
      break
  }
}

handleSelect({ target: { value: 0 } })
</script>
