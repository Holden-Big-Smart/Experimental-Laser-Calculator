<template>
  <div>
    <h3 class="text-xl text-center my-0">名称：激光与功率密度计算</h3>
    <div class="flex justify-center gap-2 my-2 text-sm">
      <p class="text-right mb-0">版本号：V0.1-A0.1-D0.1</p>
      <p class="mb-0">发布日期：2024.04.30</p>
    </div>
    <div class="flex justify-center gap-2 my-2 text-sm">
      <button class="underline" @click="emitter.emit('feedback')">问题反馈</button>
      <button class="underline" @click="emitter.emit('help')">帮助</button>
    </div>

    <div class="grid grid-cols-2 my-4 bg-white rounded-md px-4 py-2">
      <!-- S 激光单脉冲能量计算 -->
      <fieldset>
        <legend class="text-sm font-bold">激光单脉冲能量计算</legend>
        <div class="my-2 flex items-center gap-2">
          <span class="text-sm w-[7em]">激光平均功率：</span>
          <input v-model="state.AveragePower" class="input input-sm input-bordered" type="number" />
          <span class="text-sm">W</span>
        </div>
        <div class="my-2 flex items-center gap-2">
          <span class="text-sm w-[7em]">脉冲重复频率：</span>
          <input v-model="state.RepRate" class="input input-sm input-bordered" type="number" />
          <span class="text-sm">kHz</span>
        </div>
        <div class="flex ml-[7em] my-4">
          <button class="btn btn-sm btn-neutral" @click="handleCalEnergyByPowerRepRateClick">
            计算
          </button>
        </div>
      </fieldset>
      <!-- E 激光单脉冲能量计算 -->

      <!-- S 激光聚焦光斑计算  -->
      <fieldset>
        <legend class="text-sm font-bold">激光聚焦光斑计算</legend>
        <div class="my-2 flex items-center gap-2">
          <span class="text-sm w-[8em]">激光中心波长：</span>
          <input v-model="state.wavelength" class="input input-sm input-bordered" type="number" />
          <span class="text-sm">nm</span>
        </div>
        <div class="my-2 flex items-center gap-2">
          <span class="text-sm w-[8em]">聚焦前激光半径：</span>
          <input v-model="state.Beamradius1" class="input input-sm input-bordered" type="number" />
          <span class="text-sm">um</span>
        </div>
        <div class="my-2 flex items-center gap-2">
          <span class="text-sm w-[8em]">聚焦透镜焦距：</span>
          <input v-model="state.f" class="input input-sm input-bordered" type="number" />
          <span class="text-sm">mm</span>
        </div>

        <div class="flex ml-[8em] my-4">
          <button class="btn btn-sm btn-neutral" @click="handleCalFRadiusByRadiusWavelensClick">
            计算
          </button>
        </div>
      </fieldset>
      <!-- E 激光聚焦光斑计算 -->

      <div class="grid grid-cols-3 col-span-2">
        <div>
          <div class="text-sm w-[8em]">激光单脉冲能量：</div>
          <input v-model="state.Energy" class="input input-sm input-bordered" type="number" />
          <span class="text-sm ml-2">μJ</span>
        </div>
        <div>
          <div class="text-sm w-[8em]">激光脉冲宽度：</div>
          <input v-model="state.pulsewidth" class="input input-sm input-bordered" type="number" />
          <span class="text-sm ml-2">mm</span>
        </div>
        <div>
          <div class="text-sm w-[8em]">激光焦斑半径：</div>
          <input v-model="state.Beamradius" class="input input-sm input-bordered" type="number" />
          <span class="text-sm ml-2">μm</span>
        </div>
        <div class="col-span-3 justify-center flex my-4">
          <button
            class="btn btn-sm btn-neutral"
            @click="handleCalPowerDensityByEnergyPluseWidthRadiusClick"
          >
            计算
          </button>
        </div>
      </div>

      <div class="col-span-2 flex gap-2 items-center justify-center">
        <span class="text-sm w-[8em]">激光功率密度：</span>
        <input v-model="state.result" class="input input-sm input-bordered" type="number" />
        <span class="text-sm ml-2">GW/cm²</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { isEmpty, isNumber } from 'radash'
import {
  dllGlmdCalEnergyByPowerRepRate,
  dllGlmdCalFRadiusByRadiusWavelens,
  dllGlmdCalPowerDensityByEnergyPluseWidthRadius
} from '@/api/dll/index'
import { reactive } from 'vue'
import emitter from '@/utils/eventBus.js'
import { toFixed } from '@/utils/index.js'

const state = reactive({
  AveragePower: 1, // 平均功率： 单位 W - 1
  RepRate: 80000, // 重复频率 ：单位 kHz - 2
  wavelength: 800, // 波长 ：单位 nm - 3
  Beamradius1: 4, // 激光半径 ：单位 um - 4
  f: 100, // 聚焦距离 ：单位 mm - 5
  Energy: null, // 能量 ：单位 uJ - 6
  pulsewidth: null, // 脉冲宽度 ：单位 fs - 7
  Beamradius: null, // 光斑半径 ：单位 um - 8
  result: null // 结果 - 9
})

// S 激光单脉冲能量计算
const handleCalEnergyByPowerRepRateClick = () => {
  // 由1,2,得6用函数calEnergyByPowerRepRate
  if (isNumber(state.AveragePower) && isNumber(state.RepRate)) {
    dllGlmdCalEnergyByPowerRepRate({
      AveragePower: state.AveragePower,
      RepRate: state.RepRate
    }).then((res) => {
      state.Energy = toFixed(res.data[0], 4)
    })
  }
}
// S 激光聚焦光斑计算
const handleCalFRadiusByRadiusWavelensClick = () => {
  // 由4，5，3得8用函数calFRadiusByRadiusWavelens
  if (isNumber(state.wavelength) && isNumber(state.f) && isNumber(state.Beamradius1)) {
    dllGlmdCalFRadiusByRadiusWavelens({
      Beamradius: state.Beamradius1,
      f: state.f,
      wavelength: state.wavelength
    }).then((res) => {
      state.Beamradius = toFixed(res.data[0], 4)
    })
  }
}
// S 激光聚焦光斑计算
const handleCalPowerDensityByEnergyPluseWidthRadiusClick = () => {
  // 由6，7，8得9用函数calPowerDensityByEnergyPluseWidthRadius
  if (!isEmpty(state.Energy) && isNumber(state.pulsewidth) && !isEmpty(state.Beamradius)) {
    dllGlmdCalPowerDensityByEnergyPluseWidthRadius({
      Energy: state.Energy,
      pulsewidth: state.pulsewidth,
      Beamradius: state.Beamradius
    }).then((res) => {
      state.result = toFixed(res.data[0], 4)
    })
  }
}
</script>
