<template>
  <div class="overflow-x-auto">
    <div class="my-14 grid gap-2 grid-cols-2">
      <!-- 时谱变换 -->
      <RouterLink :to="{name: 'time-varying-spectrum'}">
        <figure>
          <img alt="" class="h-[300px]" src="@/assets/tools/1.jpg">
          <figcaption class="mt-4 text-center">时谱变换</figcaption>
        </figure>
      </RouterLink>

      <!-- 曲线绘制 -->
      <RouterLink :to="{name: 'curve-draw'}">
        <figure>
          <img alt="" class="h-[300px]" src="@/assets/tools/2.jpg">
          <figcaption class="mt-4 text-center">曲线绘制</figcaption>
        </figure>
      </RouterLink>
    </div>
  </div>

</template>

<script setup>
import MainLayout from '@/layouts/MainLayout.vue'
import physicalConstant from '@/assets/static/physical-constant.txt?raw'

// 按换行符分割文本文件
const formatPhysicalConstant = physicalConstant.split(/\r?\n/).map((line) => line.split(','))

// 提取表头和表格数据
const tableHeader = formatPhysicalConstant[0], tableData = formatPhysicalConstant.slice(1)
</script>
