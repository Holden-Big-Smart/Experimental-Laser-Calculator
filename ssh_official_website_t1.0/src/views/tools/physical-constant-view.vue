<template>
  <h3 class="text-xl text-center my-0">名称：物理常数</h3>
  <div class="flex justify-center gap-2 my-2 text-sm">
    <p class="text-right mb-0">版本号：V0.1-A0.1-D0.1</p>
    <p class="mb-0">发布日期：2024.04.30</p>
  </div>
  <div class="flex justify-center gap-2 my-2 text-sm">
    <button class="underline" @click="emitter.emit('feedback')">问题反馈</button>
    <button class="underline">帮助</button>
  </div>

  <div class="my-4 bg-white rounded-md overflow-x-auto">
    <table class="table">
      <thead>
      <tr>
        <th v-for="header in tableHeader" :key="header">{{ header }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(row, index) in tableData" :key="index">
        <td v-for="cell in row" :key="cell">{{ cell }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import physicalConstant from '@/assets/static/physical-constant.txt?raw'
import emitter from '@/utils/eventBus.js'

// 按换行符分割文本文件
const formatPhysicalConstant = physicalConstant.split(/\r?\n/).map((line) => line.split(','))

// 提取表头和表格数据
const tableHeader = formatPhysicalConstant[0], tableData = formatPhysicalConstant.slice(1)
</script>
