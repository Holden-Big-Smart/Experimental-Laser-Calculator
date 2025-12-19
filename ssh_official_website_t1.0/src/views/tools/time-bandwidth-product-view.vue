<template>
  <h3 class="text-xl text-center my-0">名称：时间带宽积</h3>
  <div class="flex justify-center gap-2 my-2 text-sm">
    <p class="text-right mb-0">版本号：V0.1-A0.1-D0.1</p>
    <p class="mb-0">发布日期：2024.04.30</p>
  </div>
  <div class="flex justify-center gap-2 my-2 text-sm">
    <button class="underline" @click="emitter.emit('feedback')">问题反馈</button>
    <button class="underline">帮助</button>
  </div>

  <div class="grid grid-cols-2 bg-white rounded-md px-4 pt-2">
    <fieldset>
      <legend class="text-sm font-bold">激光参数</legend>
      <div class="my-2 flex items-center gap-2">
        <span class="text-sm w-[120px]">激光中心波长：</span>
        <input v-model="w0" class="input input-sm input-bordered" type="number" />
        <span class="text-sm">nm</span>
      </div>
      <div class="my-2 flex items-center gap-2">
        <span class="text-sm w-[120px]">脉冲宽度（选填）：</span>
        <input v-model="pulse" class="input input-sm input-bordered" type="number" />
        <span class="text-sm">fs</span>
      </div>
      <div class="my-2 flex items-center gap-2">
        <span class="text-sm w-[120px]">光谱宽度（选填）：</span>
        <input v-model="bandwidth" class="input input-sm input-bordered" type="number" />
        <span class="text-sm">nm</span>
      </div>
    </fieldset>

    <div class="text-sm">
      <div class="font-bold">输出参数</div>
      <div v-show="!isEmpty(result)">
        <div class="my-2">啁啾量: {{ result[0] }}</div>
        <div class="my-2">时间带宽积: {{ result[1] }}</div>
      </div>
    </div>
  </div>

  <div class="flex justify-center my-4">
    <button class="btn btn-sm btn-neutral mx-4" @click="handleWavelengthClick">计算</button>
    <button class="btn btn-sm btn-ghost" @click="handleWavelengthRest">清空</button>
  </div>

</template>

<script setup>
import { ref } from 'vue'
import { isEmpty, isNumber } from 'radash'
import { dllSjdgCalChirpMT, dllSjdgCalLaserPluseWidth, dllSjdgCalLaserSpectrumWidth } from '@/api/dll'
import emitter from '@/utils/eventBus.js'

const w0 = ref(null) // 激光中心波长 - 1
const pulse = ref(null) // 脉冲宽度（选填） - 2
const bandwidth = ref(null) // 光谱宽度（选填） -3
const result = ref([]) // 输出参数

const handleWavelengthClick = () => {
  result.value = []

  // 若输入 1，2， （3 为空）时，用 calLaserSpectrumWidth，输出栏显
  // - FT 变换极限（高斯线型）
  // - 激光脉宽： 【结果值】 fs
  if (isNumber(w0.value) && isNumber(pulse.value) && !isNumber(bandwidth.value)) {
    dllSjdgCalLaserSpectrumWidth({
      w0: w0.value,
      pulse: pulse.value
    }).then(res => {
      bandwidth.value = res.data?.[0]
    })
  }

  // 若输入 1，3，（2 为空）时，用 calLaserPluseWidth，输出栏显示：
  // - FT 变换极限（高斯线型）
  // - 激光谱宽： 【结果值】 nm
  if (isNumber(w0.value) && !isNumber(pulse.value) && isNumber(bandwidth.value)) {
    dllSjdgCalLaserPluseWidth({
      w0: w0.value,
      bandwidth: bandwidth.value
    }).then(res => {
      pulse.value = res.data?.[0]
    })
  }

  // 若输入 1，2，3 时，用 calChirpMT，输出栏显示：
  // - 啁啾量： 【结果值 1】
  // - 时间带宽积： 【结果值 2】
  if (isNumber(w0.value) && isNumber(pulse.value) && isNumber(bandwidth.value)) {
    dllSjdgCalChirpMT({
      w0: w0.value,
      pulsewidth: pulse.value,
      spectrumwidth: bandwidth.value
    }).then(res => {
      result.value = res.data
    })
  }
}

const handleWavelengthRest = () => {
  result.value = []
  w0.value = null
  pulse.value = null
  bandwidth.value = null
}

</script>
