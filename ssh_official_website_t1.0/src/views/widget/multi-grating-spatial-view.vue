<template>
  <div>
    <h3 class="text-xl text-center my-0">名称：多光栅空间色散</h3>
    <div class="flex justify-center gap-2 my-2 text-sm">
      <p class="text-right mb-0">版本号：V0.1-A0.1-D0.1</p>
      <p class="mb-0">发布日期：2024.04.30</p>
    </div>
    <div class="flex justify-center gap-2 my-2 text-sm">
      <button class="underline" @click="emitter.emit('feedback')">问题反馈</button>
      <button class="underline" @click="emitter.emit('help')">帮助</button>
    </div>

    <div class="grid grid-cols-2 gap-4 bg-white rounded-md px-4 py-2">
      <!-- S 输入参数 -->
      <fieldset class="my-4">
        <legend class="text-sm font-bold">输入激光参数</legend>
        <div class="my-2 flex items-center gap-2">
          <span class="text-sm w-[7em]">激光中心波长：</span>
          <input v-model="lt1" class="input input-sm input-bordered" type="number" />
          <span class="text-sm">nm</span>
        </div>
        <div class="my-2 flex items-center gap-2">
          <span class="text-sm w-[7em]">纵横间隔：</span>
          <input v-model="lt3" class="input input-sm input-bordered" type="number" />
          <span class="text-sm">Ghz</span>
        </div>
        <div class="my-2 flex items-center gap-2">
          <span class="text-sm w-[7em]">光斑直径：</span>
          <input v-model="lt4" class="input input-sm input-bordered" type="number" />
          <span class="text-sm">mm</span>
        </div>
        <div class="my-2 flex items-center gap-2">
          <span class="text-sm w-[7em]">空间角色散：</span>
          <input v-model="lt5" class="input input-sm input-bordered" type="number" />
          <span class="text-sm">deg/nm</span>
        </div>
      </fieldset>
      <!-- E 输入参数 -->

      <!-- S 基本输出参数 -->
      <fieldset class="my-4">
        <legend class="text-sm font-bold">基本输出参数</legend>
        <div class="my-2 flex items-center gap-2">
          <span class="text-sm w-[8em]">聚焦后光斑直径：</span>
          <input v-model="interval" class="input input-sm input-bordered" disabled type="number" />
          <span class="text-sm">mm</span>
        </div>
        <div class="my-2 flex items-center gap-2">
          <span class="text-sm w-[8em]">聚焦后光斑间距：</span>
          <input v-model="diameter" class="input input-sm input-bordered" disabled type="number" />
          <span class="text-sm">mm</span>
        </div>
        <div class="my-2 flex items-center gap-2">
          <span class="text-sm w-[8em]">至少需要通过：</span>
          <input v-model="frequency" class="input input-sm input-bordered" disabled type="number" />
          <span class="text-sm">次此光栅</span>
        </div>
      </fieldset>
      <!-- E 基本输出参数 -->

      <!-- S 输入光栅参数 -->
      <fieldset class="my-4">
        <legend class="text-sm font-bold">输入光栅参数</legend>
        <div class="my-2 flex items-center gap-2">
          <span class="text-sm w-[7em]">激光入射角度：</span>
          <input v-model="gt1" class="input input-sm input-bordered" type="number" />
          <span class="text-sm">度</span>
        </div>
        <div class="my-2 flex items-center gap-2">
          <span class="text-sm w-[7em]">光栅刻线：</span>
          <input v-model="gt2" class="input input-sm input-bordered" type="number" />
          <span class="text-sm">线/mm</span>
        </div>

        <div class="my-2 flex items-center gap-2">
          <span class="text-sm w-[7em]">衍射级：</span>
          <input v-model="gt3" class="input input-sm input-bordered" type="number" />
          <span class="text-sm">级</span>
        </div>
        <div class="my-2 flex items-center gap-2">
          <span class="text-sm w-[7em]">通过次数：</span>
          <input v-model="gt5" class="input input-sm input-bordered" type="number" />
          <span class="text-sm">次</span>
        </div>
      </fieldset>
      <!-- E 输入光栅参数 -->

      <!-- S 输出参数 -->
      <fieldset class="my-4 overflow-x-auto row-span-2">
        <legend class="text-sm font-bold">输出参数</legend>
        <table class="table overflow-x-auto">
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
      </fieldset>

      <!-- S 输入聚光参数 -->
      <fieldset class="my-4">
        <legend class="text-sm font-bold">输入聚焦参数</legend>
        <div class="my-2 flex items-center gap-2">
          <span class="text-sm w-[7em]">透镜聚焦：</span>
          <input v-model="ft1" class="input input-sm input-bordered" type="number" />
          <span class="text-sm">mm</span>
        </div>
      </fieldset>
      <!-- E 输入聚光参数 -->

      <div class="flex ml-[7em] my-4">
        <button class="btn btn-sm btn-neutral" @click="handleCalGratingParametersClick">
          计算
        </button>
        <button class="btn btn-sm btn-ghost mx-4" @click="handleReset">清空</button>
        <button class="btn btn-sm btn-ghost mx-4" @click="handleDownload">保存</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { isNumber } from 'radash'
import { dllDgskjssCalMultiGrattingParameters } from '@/api/dll/index'
import { ref } from 'vue'
import emitter from '@/utils/eventBus.js'
import { toFixed } from '@/utils/index.js'
import { saveAs } from 'file-saver-es'

// S 输入参数
const lt1 = ref(800) // 激光中心波长，单位为nm
const lt3 = ref(10) // 纵横间隔，单位为GHz
const lt4 = ref(2) // 光斑直径，单位为GHz
const lt5 = ref(4) // 空间角色散，单位deg
const gt1 = ref(20) // 激光入射角，单位为deg
const gt2 = ref(1500) // 光栅刻线，单位为线/mm
const gt3 = ref(1) // 衍射级，单位为线/mm
const gt5 = ref(4) // 光栅通过次数，单位次
const ft1 = ref(300) // 透镜焦距，单位mm

const diameter = ref(null) // 聚焦后光斑直径
const interval = ref(null) // 聚焦后光斑间距
const frequency = ref(null) // 至少需要通过
//
// const tableHeader = ref([])
const tableData = ref([])

// 提取表头和表格数据
const tableHeader = ['中心波长衍射角（度）', '角色散（度/nm）', '焦平面光斑间距（mm）']

const handleCalGratingParametersClick = () => {
  // 若已知1，2，1，3，4 ，5，6，7时，用calMultiGrattingParameters
  if (
    isNumber(lt1.value) &&
    isNumber(lt3.value) &&
    isNumber(lt4.value) &&
    isNumber(lt5.value) &&
    isNumber(gt1.value) &&
    isNumber(gt2.value) &&
    isNumber(gt5.value) &&
    isNumber(ft1.value)
  ) {
    dllDgskjssCalMultiGrattingParameters({
      lt1: lt1.value,
      lt3: lt3.value,
      lt4: lt4.value,
      lt5: lt5.value,
      gt1: gt1.value,
      gt2: gt2.value,
      gt5: gt5.value,
      ft1: ft1.value
    }).then((res) => {
      diameter.value = toFixed(res.data?.[0])
      interval.value = toFixed(res.data?.[1])
      frequency.value = toFixed(res.data?.[15])

      for (let i = 0; i < gt5.value; i++) {
        tableData.value.push([
          toFixed(res.data[3 + i * 3]),
          toFixed(res.data[4 + i * 3]),
          toFixed(res.data[5 + i * 3])
        ])
      }
    })
  }
}

/** 重置 */
const handleReset = () => {
  diameter.value = null
  interval.value = null
  frequency.value = null
  tableData.value = []
}

/** 保存 */
const handleDownload = () => {
  const split = '\t'

  const content = [tableHeader, ...tableData.value].map((item) => item.join(split)).join('\n')

  saveAs(new Blob([content], { type: 'text/plain;charset=utf-8' }), `多光栅空间色散.txt`)
}
// E 绘图输入参数
</script>
