<template>
  <h3 class="text-xl text-center my-0">名称：高斯成像公式</h3>
  <div class="flex justify-center gap-2 my-2 text-sm">
    <p class="text-right mb-0">版本号：V0.1-A0.1-D0.1</p>
    <p class="mb-0">发布日期：2024.04.30</p>
  </div>
  <div class="flex justify-center gap-2 my-2 text-sm">
    <button class="underline" @click="emitter.emit('feedback')">问题反馈</button>
    <button class="underline">帮助</button>
  </div>

  <div class="grid grid-cols-2 gap-4 bg-white rounded-md px-4 py-2">
    <div>
      <div class="my-2 text-sm font-bold">输入参数</div>
      <div class="my-2 flex items-center gap-2">
        <span class="text-sm w-[5em]">物距：</span>
        <input v-model="objectDistance" class="input input-sm input-bordered" type="number" />
        <span class="text-sm">mm</span>
      </div>
      <div class="my-2 flex items-center gap-2">
        <span class="text-sm w-[5em]">透镜焦距：</span>
        <input v-model="focalLength" class="input input-sm input-bordered" type="number" />
        <span class="text-sm">mm</span>
      </div>
      <div class="text-sm font-bold">输出参数</div>
      <div class="my-2 flex items-center gap-2">
        <span class="text-sm w-[5em]">像距：</span>
        <input
          v-model="imageDistance"
          class="input input-sm input-bordered"
          type="number"
          disabled
        />
        <span class="text-sm">mm</span>
      </div>
      <div class="flex ml-[5em] my-4">
        <button class="btn btn-sm btn-neutral" @click="handleCallImageDistanceClick">计算</button>
        <button class="btn btn-sm btn-ghost mx-4" @click="handleCallImageDistanceReset">
          清空
        </button>
      </div>
    </div>

    <div>
      <div class="my-2 text-sm font-bold">输入参数</div>
      <div class="my-2 flex items-center gap-2">
        <span class="text-sm w-[5em]">物距：</span>
        <input v-model="objectDistance_1" class="input input-sm input-bordered" type="number" />
        <span class="text-sm">mm</span>
      </div>
      <div class="my-2 flex items-center gap-2">
        <span class="text-sm w-[5em]">像距：</span>
        <input v-model="imageDistance_1" class="input input-sm input-bordered" type="number" />
        <span class="text-sm">mm</span>
      </div>
      <div class="text-sm font-bold">输出参数</div>
      <div class="my-2 flex items-center gap-2">
        <span class="text-sm w-[5em]">透镜焦距：</span>
        <input
          v-model="focalLength_1"
          class="input input-sm input-bordered"
          type="number"
          disabled
        />
        <span class="text-sm">mm</span>
      </div>

      <div class="flex ml-[5em] my-4">
        <button class="btn btn-sm btn-neutral" @click="handleCallImageDistanceClick_1">计算</button>
        <button class="btn btn-sm btn-ghost mx-4" @click="handleCallImageDistanceReset_1">
          清空
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { isNumber } from 'radash'
import { dllGsCalFocalLengthsi, dllGsCalImageDistance } from '@/api/dll'
import emitter from '@/utils/eventBus.js'

const objectDistance = ref(null) // 物距 - 1
const focalLength = ref(null) // 透镜焦距 - 2
const imageDistance = ref(null) // 像距 - 3

const handleCallImageDistanceClick = () => {
  // 若已知 1，2，求 3 时，用 calImageDistance
  if (isNumber(objectDistance.value) && isNumber(focalLength.value)) {
    dllGsCalImageDistance({
      objectDistance: objectDistance.value,
      focalLength: focalLength.value
    }).then((res) => {
      imageDistance.value = res.data?.[0]
    })
  }
}
const handleCallImageDistanceReset = () => {
  objectDistance.value = null
  focalLength.value = null
  imageDistance.value = null
}

const objectDistance_1 = ref(null) // 物距 - 4
const imageDistance_1 = ref(null) // 像距 - 5
const focalLength_1 = ref(null) // 透镜焦距 - 6

const handleCallImageDistanceClick_1 = () => {
  // 若已知 4，5，求 6 时，用 calFocalLengthsi
  if (isNumber(objectDistance_1.value) && isNumber(imageDistance_1.value)) {
    dllGsCalFocalLengthsi({
      objectDistance: objectDistance_1.value,
      imageDistance: imageDistance_1.value
    }).then((res) => {
      focalLength_1.value = res.data?.[0]
    })
  }
}
const handleCallImageDistanceReset_1 = () => {
  objectDistance_1.value = null
  imageDistance_1.value = null
  focalLength_1.value = null
}
</script>
