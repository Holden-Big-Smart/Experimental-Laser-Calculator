<template>
  <h3 class="text-xl text-center my-0">名称：激光腔长与脉冲重复频率</h3>
  <div class="flex justify-center gap-2 my-2 text-sm">
    <p class="text-right mb-0">版本号：V0.1-A0.1-D0.1</p>
    <p class="mb-0">发布日期：2024.04.30</p>
  </div>
  <div class="flex justify-center gap-2 my-2 text-sm">
    <button class="underline" @click="emitter.emit('feedback')">问题反馈</button>
    <button class="underline">帮助</button>
  </div>

  <div class="grid grid-cols-2 gap-4 bg-white rounded-md px-4 py-2">
    <div class="my-2 flex items-center gap-2">
      <span class="text-sm">腔长：</span>
      <input v-model="L" class="input input-sm input-bordered" type="number" />
      <span class="text-sm">m</span>
    </div>
    <div class="my-2 flex items-center gap-2">
      <span class="text-sm">激光脉冲重复频率：</span>
      <input v-model="RP" class="input input-sm input-bordered" type="number" />
      <span class="text-sm">Hz</span>
    </div>
  </div>

  <div class="flex justify-center my-4">
    <button class="btn btn-sm btn-neutral mx-4" @click="handleWavelengthClick">计算</button>
    <button class="btn btn-sm btn-ghost" @click="handleWavelengthRest">清空</button>
  </div>

  <div class="grid grid-cols-2 gap-4 bg-white rounded-md px-4 py-2">
    <div class="my-2 flex items-center gap-2">
      <span class="text-sm">激光脉冲重复频率：</span>
      <input v-model="RP1" class="input input-sm input-bordered" type="number" />
      <span class="text-sm">Hz</span>
    </div>
    <div class="my-2 flex items-center gap-2">
      <span class="text-sm">腔长：</span>
      <input v-model="L1" class="input input-sm input-bordered" type="number" />
      <span class="text-sm">m</span>
    </div>
  </div>

  <div class="flex justify-center my-4">
    <button class="btn btn-sm btn-neutral mx-4" @click="handleWavelengthClick1">计算</button>
    <button class="btn btn-sm btn-ghost" @click="handleWavelengthRest1">清空</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { isNumber } from 'radash'
import { dllQccpCalLaserL, dllQccpCalLaserRP } from '@/api/dll'
import emitter from '@/utils/eventBus.js'

const L = ref(null) // 腔长 - 1
const RP = ref(null) // 激光脉冲重复频率 - 2

const handleWavelengthClick = () => {
  // 若已知 1，求 2，用 calLaserRP
  if (isNumber(L.value)) {
    dllQccpCalLaserRP({
      L: L.value
    }).then((res) => {
      RP.value = res.data?.[0]
    })

    return
  }
}

const handleWavelengthRest = () => {
  L.value = null
  RP.value = null
}

const L1 = ref(null) // 腔长 - 1
const RP1 = ref(null) // 激光脉冲重复频率 - 2

const handleWavelengthClick1 = () => {
  // 若已知 2，求 1，用 calLaserL
  if (isNumber(RP1.value)) {
    dllQccpCalLaserL({
      RP: RP1.value
    }).then((res) => {
      L1.value = res.data?.[0]
    })
  }
}

const handleWavelengthRest1 = () => {
  L1.value = null
  RP1.value = null
}
</script>
