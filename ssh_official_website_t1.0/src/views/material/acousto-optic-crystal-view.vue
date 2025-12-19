<template>
  <h3>敬请期待</h3>
</template>

<script setup>
import { useRoute } from 'vue-router'

import MainLayout from '@/layouts/MainLayout.vue'
import materialInfo_Ex from '@/assets/static/tables/MaterialInfo_Ex.csv?raw'
import uCrystal_SM from '@/assets/static/tables/uCrystal_SM_Ex.csv?raw'
import bCrystal_SM from '@/assets/static/tables/bCrystal_SM_Ex.csv?raw'
import { formatTableInfo } from '@/utils/index.js'
import { ref } from 'vue'

const route = useRoute()

const { tableHeader, tableData } = formatTableInfo(materialInfo_Ex)
const { tableHeader: uCrystal_SMTableHeader, tableData: uCrystal_SMTableData } = formatTableInfo(uCrystal_SM)
const { tableHeader: bCrystal_SMTableHeader, tableData: bCrystal_SMTableData } = formatTableInfo(bCrystal_SM)

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
const selectOptions = jsonTableData.filter(row => row.AxisNum !== '0')
const selectedKeys = ref()


const displayTableHeader = ref([])
const displayTableData = ref([])

const handleSelect = e => {

  // e.target.value: 0, 1, 2, ...
  const target = selectOptions[e.target.value]
  selectedKeys.value = target.AxisNum;

  displayTableHeader.value = []
  displayTableData.value = []

  // 0x02. 根据选项值更新表格数据
  switch (selectedKeys.value /* === AxisNum */) {
    // 当选项值对应的AxisNum为1时，读取uCrystal_SM_Ex.csv
    case '1': {
      displayTableHeader.value = uCrystal_SMTableHeader

      const NameColumnIndex = uCrystal_SMTableHeader.indexOf('Name')
      displayTableData.value = uCrystal_SMTableData.filter(row => row[NameColumnIndex] === target.Name)
    }
      break
    // 当选项值对应的AxisNum为2时，读取bCrystal_SM_Ex.csv
    case '2': {
      displayTableHeader.value = bCrystal_SMTableHeader
      const NameColumnIndex = bCrystal_SMTableHeader.indexOf('Name')

      displayTableData.value = bCrystal_SMTableData.filter(row => row[NameColumnIndex] === target.Name)
    }
      break
  }
}

handleSelect({ target: { value: 0 } })
</script>
