<template>
  <h3 class="text-xl text-center my-0">名称：曲线绘制</h3>
  <div class="flex justify-center gap-2 my-2 text-sm">
    <p class="text-right mb-0">版本号：V0.1-A0.1-D0.1</p>
    <p class="mb-0">发布日期：2024.04.30</p>
  </div>
  <div class="flex justify-center gap-2 my-2 text-sm">
    <button class="underline" @click="emitter.emit('feedback')">问题反馈</button>
    <button class="underline">帮助</button>
  </div>

  <div class="card">
    <p>导入文件格式说明：</p>
    <ol class="pl-6 mb-0">
      <li class="list-decimal">文本统一采用“*.txt”格式，文件名为图/曲线总标题；</li>
      <li class="list-decimal">首行为横纵坐标标题，空格隔开，如”中心波长/nm 增益带宽/nm”；</li>
      <li class="list-decimal">数据通过空格隔开。</li>
    </ol>
  </div>

  <div class="my-4 flex">
    <input ref="importFile" accept=".txt" class="file-input w-full max-w-xs" type="file" />
    <button class="ml-2 btn" @click="handleImport">
      <span v-show="importFileLoading" class="loading loading-spinner"></span>
      导入
    </button>
  </div>

  <div v-show="importResultVisible" class="bg-white rounded-md">
    <div class="grid grid-cols-[1fr_256px]">
      <div class="my-y h-[400px]">
        <v-chart ref="charts" :option="aOption" autoresize class="chart" />
      </div>
      <div class="h-[400px] px-4 grid grid-rows-[auto_1fr] overflow-hidden">
        <h3 class="mb-0 my-4">数据表</h3>
        <ul class="max-h-[400px] overflow-y-auto">
          <li class="grid grid-cols-2 my-2">
            <span class="font-bold">{{ tableHeader[0] }}</span>
            <span class="font-bold">{{ tableHeader[1] }}</span>
          </li>
          <li v-for="(row, index) in tableData" :key="index" class="grid grid-cols-2">
            <span>{{ row[0] }}</span>
            <span>{{ row[1] }}</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="p-4">
      <button
        class="btn btn-sm btn-neutral mx-4"
        @click="useExportEChart($refs.charts, '曲线绘制')"
      >
        保存图形
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import emitter from '@/utils/eventBus.js'
import useExportEChart from '@/hooks/useExportEChart.js'

// 提取表头和表格数据
const tableHeader = ref([])
const tableData = ref([])

// 图表绘制
const aOption = computed(() => ({
  grid: {
    left: '3%',
    right: '4%',
    bottom: '6%',
    containLabel: true
  },
  tooltip: {
    trigger: 'axis'
  },
  xAxis: {
    type: 'value',
    name: tableHeader.value[0],
    nameLocation: 'center',
    nameTextStyle: {
      lineHeight: 30
    }
  },
  yAxis: {
    type: 'value',
    name: tableHeader.value[1],
    nameLocation: 'end',
    nameTextStyle: {
      lineHeight: 30
    }
  },
  series: [
    {
      data: tableData.value,
      type: 'line',
      smooth: 0.6,
      symbol: 'none',
      lineStyle: {
        color: '#1677ff'
      }
    }
  ]
}))

const importFile = ref(null) // 导入文件input
const importFileLoading = ref(false) // 导入文件按钮loading
const importResultVisible = ref(false) // 导入结果显示

// 导入文件按钮处理逻辑
const handleImport = () => {
  // 0x01. 获取文件对象
  const file = importFile.value?.files[0]

  // 0x02. 文件不存在直接返回
  if (!file) return

  // 0x03. 显示loading，通知用户正在处理
  importFileLoading.value = true

  // 0x04. 读取文件内容
  const reader = new FileReader()

  reader.addEventListener('load', (event) => {
    const fileContent = event.target.result

    // 0x04-1. 提取表头和表格数据, 通过换行符分割文本
    const [_tableHeader, ..._tableData] = fileContent.split(/\r?\n/)

    // 中心波长/nm 增益带宽/nm => ['中心波长/nm', '增益带宽/nm']
    tableHeader.value = _tableHeader?.split(/\s+/)

    // 通过空格分割数据
    // 340.021	126.55
    // 340.397	126.55
    // 340.772	126.55
    // 341.148	-36.16
    // 341.524	-63.28 =>
    //   ['340.021', '126.55'],
    //   ['340.397', '126.55'],
    //   ['340.772', '126.55'],
    //   ['341.148', '-36.16'],
    //   ['341.524', '-63.28']
    tableData.value = _tableData.map((row) => row?.split(/\s+/))

    // 0x05. 显示导入结果
    importResultVisible.value = true
    importFileLoading.value = false
  })

  reader.readAsText(file)
}
</script>
