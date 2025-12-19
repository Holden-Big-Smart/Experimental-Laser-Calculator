<template>
  <div>
    <h3 class="text-xl text-center my-0">名称：单位换算</h3>
    <div class="flex justify-center gap-2 my-2 text-sm">
      <p class="text-right mb-0">版本号：V0.1-A0.1-D0.1</p>
      <p class="mb-0">发布日期：2024.04.30</p>
    </div>
    <div class="flex justify-center gap-2 my-2 text-sm">
      <button class="underline" @click="emitter.emit('feedback')">问题反馈</button>
      <button class="underline" @click="emitter.emit('help')">帮助</button>
    </div>
    <!-- S 波长/频率/波数 -->
    <fieldset class="my-4">
      <legend class="text-sm font-bold">波长/频率/波数</legend>
      <div class="flex items-center flex-wrap gap-2 overflow-visible">
        <input class="input input-sm w-28 input-bordered" type="number" v-model="wavelength_nm" />
        <span class="text-sm">nm</span>
        <span class="text-sm">=</span>
        <input class="input input-sm w-28 input-bordered" type="number" v-model="wavelength_GHz" />
        <span class="text-sm">GHz</span>
        <span class="text-sm">=</span>
        <input class="input input-sm w-28 input-bordered" type="number" v-model="wavelength_cm1" />
        <span class="text-sm">cm<sup>-1</sup></span>
        <span class="text-sm">=</span>
        <input class="input input-sm w-28 input-bordered" type="number" v-model="wavelength_eV" />
        <span class="text-sm">eV</span>

        <button class="btn btn-sm btn-neutral mx-4" @click="handleWavelengthClick">计算</button>
        <button class="btn btn-sm btn-ghost" @click="handleWavelengthRest">清空</button>
      </div>
    </fieldset>
    <!-- E 波长/频率/波数 -->

    <!-- S 线宽 -->
    <fieldset class="my-4">
      <legend class="text-sm font-bold">线宽</legend>
      <div class="flex items-center gap-2">
        <label class="input input-sm input-bordered flex items-center gap-2 w-80">
          中心波长
          <input class="grow" required="required" type="number" v-model="wave_width_cw" />
        </label>
        <span class="text-sm">nm</span>
      </div>
      <div class="flex items-center flex-wrap gap-2 my-2">
        <input class="input input-sm w-28 input-bordered" type="number" v-model="wave_width_nm" />
        <span class="text-sm">nm</span>
        <span class="text-sm">=</span>
        <input class="input input-sm w-28 input-bordered" type="number" v-model="wave_width_GHz" />
        <span class="text-sm">GHz</span>
        <span class="text-sm">=</span>
        <input class="input input-sm w-28 input-bordered" type="number" v-model="wave_width_cm1" />
        <span class="text-sm">cm<sup>-1</sup></span>
        <span class="text-sm">=</span>
        <input class="input input-sm w-28 input-bordered" type="number" v-model="wave_width_eV" />
        <span class="text-sm">eV</span>

        <button class="btn btn-sm btn-neutral mx-4" @click="handleWaveWidthClick">计算</button>
        <button class="btn btn-sm btn-ghost" @click="handleWaveWidthReset">清空</button>
      </div>
    </fieldset>
    <!-- E 线宽 -->

    <!-- S 压强/真空度 -->
    <fieldset class="my-4">
      <legend class="text-sm font-bold">压强/真空度</legend>
      <div class="flex flex-wrap items-center gap-2 my-2">
        <input class="input input-sm w-28 input-bordered" type="number" v-model="pressure_atm" />
        <span class="text-sm">atm</span>
        <span class="text-sm">=</span>
        <input class="input input-sm w-28 input-bordered" type="number" v-model="pressure_kPa" />
        <span class="text-sm">kPa</span>
        <span class="text-sm">=</span>
        <input class="input input-sm w-28 input-bordered" type="number" v-model="pressure_mmHg" />
        <span class="text-sm">mmHg</span>
        <span class="text-sm">=</span>
        <input class="input input-sm w-28 input-bordered" type="number" v-model="pressure_Torr" />
        <span class="text-sm">Torr</span>
        <span class="text-sm">=</span>
        <input class="input input-sm w-28 input-bordered" type="number" v-model="pressure_mBar" />
        <span class="text-sm">mBar</span>
        <span class="text-sm">=</span>
        <input class="input input-sm w-28 input-bordered" type="number" v-model="pressure_Pa" />
        <span class="text-sm">Pa</span>

        <button class="btn btn-sm btn-neutral ml-4" @click="handlePressureClick">计算</button>
        <button class="btn btn-sm btn-ghost" @click="handlePressureReset">清空</button>
      </div>
    </fieldset>
    <!-- E 压强/真空度 -->

    <!-- S 功率 -->
    <fieldset class="my-4">
      <legend class="text-sm font-bold">功率</legend>
      <div class="flex flex-wrap items-center gap-2 my-2">
        <input v-model="powerA" class="input input-sm w-28 input-bordered" type="number" />
        <span class="text-sm">mW</span>
        <span class="text-sm">=</span>
        <input v-model="powerB" class="input input-sm w-28 input-bordered" type="number" />
        <span class="text-sm">dBm</span>

        <button class="btn btn-sm btn-neutral ml-4" @click="handlePowerClick">计算</button>
        <button class="btn btn-sm btn-ghost" @click="handlePowerReset">清空</button>
      </div>
    </fieldset>
    <!-- E 功率 -->

    <!-- S 倍数 -->
    <fieldset class="my-4">
      <legend class="text-sm font-bold">倍数</legend>
      <div class="flex flex-wrap items-center gap-2 my-2">
        <input v-model="multipleA" class="input input-sm w-28 input-bordered" type="number" />
        <span class="text-sm">倍</span>
        <span class="text-sm">=</span>
        <input v-model="multipleB" class="input input-sm w-28 input-bordered" type="number" />
        <span class="text-sm">dB</span>

        <button class="btn btn-sm btn-neutral ml-4" @click="handleMultipleClick">计算</button>
        <button class="btn btn-sm btn-ghost" @click="handleMultipleReset">清空</button>
      </div>
    </fieldset>
    <!-- E 倍数 -->
  </div>
</template>

<script setup>
import { isNumber } from 'radash'
import {
  dllBaseunitCalAtmKpammHgTorrmBar,
  dllBaseunitCaldBm,
  dllBaseunitCalFreAndWaveNumAndEnergybyWidth,
  dllBaseunitCalFreqAndWaveNumAndEnergy,
  dllBaseunitCalmW,
  dllBaseunitCalPaAtmKpammHgmBar,
  dllBaseunitCalPaAtmKpammHgmTorr,
  dllBaseunitCalPaAtmKpaTorrmBar,
  dllBaseunitCalPaAtmmmHgTorrmBar,
  dllBaseunitCalPaKpammHgTorrmBar,
  dllBaseunitCalWaveLenAndFreqAndWaveNum,
  dllBaseunitCalWaveLenAndWaveNumAndEnergy,
  dllBaseunitCalWaveWidthAndFreqAndEnergybyWidth,
  dllBaseunitCalWaveWidthAndFreqAndWaveNumbyWidth,
  dllBaseunitCalWaveWidthAndWaveNumAndEnergybyWidth,
  dllBaseunitCalWaveLenAndFreqAndEnergy
} from '@/api/dll/index'
import { ref } from 'vue'
import emitter from '@/utils/eventBus.js'

// S 波长/频率/波数计算
const wavelength_nm = ref(null) // 波长/频率/波数 - nm - 1
const wavelength_GHz = ref(null) // 波长/频率/波数 - GHz - 2
const wavelength_cm1 = ref(null) // 波长/频率/波数 - cm^-1 - 3
const wavelength_eV = ref(null) // 波长/频率/波数 - eV - 4

const handleWavelengthClick = () => {
  // 若已知1，求2，3，4时，用calFreqAndWaveNumAndEnergy
  if (isNumber(wavelength_nm.value)) {
    dllBaseunitCalFreqAndWaveNumAndEnergy({ d: wavelength_nm.value }).then((res) => {
      wavelength_GHz.value = res.data?.[0]
      wavelength_cm1.value = res.data?.[1]
      wavelength_eV.value = res.data?.[2]
    })

    return
  }
  // 若已知2，求1，3，4时，用calWaveLenAndWaveNumAndEnergy
  if (isNumber(wavelength_GHz.value)) {
    dllBaseunitCalWaveLenAndWaveNumAndEnergy({ d: wavelength_GHz.value }).then((res) => {
      wavelength_nm.value = res.data?.[0]
      wavelength_cm1.value = res.data?.[1]
      wavelength_eV.value = res.data?.[2]
    })

    return
  }
  // 若已知3，求1，2，4时，用calWaveLenAndFreqAndEnergy
  if (isNumber(wavelength_cm1.value)) {
    dllBaseunitCalWaveLenAndFreqAndEnergy({ d: wavelength_cm1.value }).then((res) => {
      wavelength_nm.value = res.data?.[0]
      wavelength_GHz.value = res.data?.[1]
      wavelength_eV.value = res.data?.[2]
    })

    return
  }
  // 若已知4，求1，2，3时，用calWaveLenAndFreqAndWaveNum
  if (isNumber(wavelength_eV.value)) {
    dllBaseunitCalWaveLenAndFreqAndWaveNum({ d: wavelength_eV.value }).then((res) => {
      wavelength_nm.value = res.data?.[0]
      wavelength_GHz.value = res.data?.[1]
      wavelength_cm1.value = res.data?.[2]
    })
  }
}
const handleWavelengthRest = () => {
  wavelength_nm.value = null
  wavelength_GHz.value = null
  wavelength_cm1.value = null
  wavelength_eV.value = null
}
// E 波长/频率/波数计算

// S 线宽计算
const wave_width_cw = ref(null) // 线宽 - 中心波长
const wave_width_nm = ref(null) // 线宽 - nm - 5
const wave_width_GHz = ref(null) // 线宽 - GHz - 6
const wave_width_cm1 = ref(null) // 线宽 - cm^-1 - 7
const wave_width_eV = ref(null) // 线宽 - eV - 8

const handleWaveWidthClick = () => {
  // 若已知5，求6，7，8时，用calFreAndWaveNumAndEnergybyWidth
  if (isNumber(wave_width_nm.value)) {
    dllBaseunitCalFreAndWaveNumAndEnergybyWidth({
      d: wave_width_nm.value,
      cw: wave_width_cw.value
    }).then((res) => {
      wave_width_GHz.value = res.data?.[0]
      wave_width_cm1.value = res.data?.[1]
      wave_width_eV.value = res.data?.[2]
    })

    return
  }

  // 若已知6，求5，7，8时，用calWaveWidthAndWaveNumAndEnergybyWidth
  if (isNumber(wave_width_GHz.value)) {
    dllBaseunitCalWaveWidthAndWaveNumAndEnergybyWidth({
      gz: wave_width_GHz.value,
      cw: wave_width_cw.value
    }).then((res) => {
      wave_width_nm.value = res.data?.[0]
      wave_width_cm1.value = res.data?.[1]
      wave_width_eV.value = res.data?.[2]
    })

    return
  }

  // 若已知7，求5，6，8时，用calWaveWidthAndFreqAndEnergybyWidth
  if (isNumber(wave_width_cm1.value)) {
    dllBaseunitCalWaveWidthAndFreqAndEnergybyWidth({
      d: wave_width_cm1.value,
      cw: wave_width_cw.value
    }).then((res) => {
      wave_width_nm.value = res.data?.[0]
      wave_width_GHz.value = res.data?.[1]
      wave_width_eV.value = res.data?.[2]
    })

    return
  }

  // 若已知8，求5，6，7时，用calWaveWidthAndFreqAndWaveNumbyWidth
  if (isNumber(wave_width_eV.value)) {
    dllBaseunitCalWaveWidthAndFreqAndWaveNumbyWidth({
      d: wave_width_eV.value,
      cw: wave_width_cw.value
    }).then((res) => {
      wave_width_nm.value = res.data?.[0]
      wave_width_GHz.value = res.data?.[1]
      wave_width_cm1.value = res.data?.[2]
    })
  }
}
const handleWaveWidthReset = () => {
  wave_width_cw.value = null
  wave_width_nm.value = null
  wave_width_GHz.value = null
  wave_width_cm1.value = null
  wave_width_eV.value = null
}
// E 线宽计算

// S 压强/真空度计算
const pressure_atm = ref(null) // 压强/真空度 - atm - 9
const pressure_kPa = ref(null) // 压强/真空度 - kPa - 10
const pressure_mmHg = ref(null) // 压强/真空度 - mmHg - 11
const pressure_Torr = ref(null) // 压强/真空度 - Torr - 12
const pressure_mBar = ref(null) // 压强/真空度 - mBar - 13
const pressure_Pa = ref(null) // 压强/真空度 - Pa - 14

const handlePressureClick = () => {
  // 若已知9，求14，10，11，12，13时，用calPaKpammHgTorrmBar
  if (isNumber(pressure_atm.value)) {
    dllBaseunitCalPaKpammHgTorrmBar({ d: pressure_atm.value }).then((res) => {
      pressure_Pa.value = res.data?.[0]
      pressure_kPa.value = res.data?.[1]
      pressure_mmHg.value = res.data?.[2]
      pressure_Torr.value = res.data?.[3]
      pressure_mBar.value = res.data?.[4]
    })

    return
  }

  // 若已知10，求14，9，11，12，13时，用calPaAtmmmHgTorrmBar
  if (isNumber(pressure_kPa.value)) {
    dllBaseunitCalPaAtmmmHgTorrmBar({ d: pressure_kPa.value }).then((res) => {
      pressure_Pa.value = res.data?.[0]
      pressure_atm.value = res.data?.[1]
      pressure_mmHg.value = res.data?.[2]
      pressure_Torr.value = res.data?.[3]
      pressure_mBar.value = res.data?.[4]
    })

    return
  }

  // 若已知11，求14，9，10，12，13时，用calPaAtmKpaTorrmBar
  if (isNumber(pressure_mmHg.value)) {
    dllBaseunitCalPaAtmKpaTorrmBar({ d: pressure_mmHg.value }).then((res) => {
      pressure_Pa.value = res.data?.[0]
      pressure_atm.value = res.data?.[1]
      pressure_kPa.value = res.data?.[2]
      pressure_Torr.value = res.data?.[3]
      pressure_mBar.value = res.data?.[4]
    })

    return
  }

  // 若已知12，求14，9，10，11，13时，用calPaAtmKpammHgmBar
  if (isNumber(pressure_Torr.value)) {
    dllBaseunitCalPaAtmKpammHgmBar({ d: pressure_Torr.value }).then((res) => {
      pressure_Pa.value = res.data?.[0]
      pressure_atm.value = res.data?.[1]
      pressure_kPa.value = res.data?.[2]
      pressure_mmHg.value = res.data?.[3]
      pressure_mBar.value = res.data?.[4]
    })

    return
  }

  // 若已知13，求14，9，10，11，12时，用calPaAtmKpammHgmTorr
  if (isNumber(pressure_mBar.value)) {
    dllBaseunitCalPaAtmKpammHgmTorr({ d: pressure_mBar.value }).then((res) => {
      pressure_Pa.value = res.data?.[0]
      pressure_atm.value = res.data?.[1]
      pressure_kPa.value = res.data?.[2]
      pressure_mmHg.value = res.data?.[3]
      pressure_Torr.value = res.data?.[4]
    })

    return
  }

  // 若已知14，求9，10，11，12，13时，用calAtmKpammHgTorrmBar
  if (isNumber(pressure_Pa.value)) {
    dllBaseunitCalAtmKpammHgTorrmBar({ d: pressure_Pa.value }).then((res) => {
      pressure_atm.value = res.data?.[0]
      pressure_kPa.value = res.data?.[1]
      pressure_mmHg.value = res.data?.[2]
      pressure_Torr.value = res.data?.[3]
      pressure_mBar.value = res.data?.[4]
    })
  }
}
const handlePressureReset = () => {
  pressure_atm.value = null
  pressure_kPa.value = null
  pressure_mmHg.value = null
  pressure_Torr.value = null
  pressure_mBar.value = null
  pressure_Pa.value = null
}
// E 压强/真空度计算

// S 功率计算
const powerA = ref(null) // 功率 - mW
const powerB = ref(null) // 功率 - dBm

const handlePowerClick = () => {
  if (isNumber(powerA.value)) {
    dllBaseunitCaldBm({ d: powerA.value }).then((res) => {
      powerB.value = res.data
    })

    return
  }

  if (isNumber(powerB.value)) {
    dllBaseunitCalmW({ d: powerB.value }).then((res) => {
      powerA.value = res.data
    })
  }
}
const handlePowerReset = () => {
  powerA.value = null
  powerB.value = null
}
// E 功率计算

// S 倍数计算
const multipleA = ref(null) // 倍数 - 倍
const multipleB = ref(null) // 倍数 - dB

const handleMultipleClick = () => {
  if (isNumber(multipleA.value)) {
    dllBaseunitCaldBm({ d: multipleA.value }).then((res) => {
      multipleB.value = res.data
    })

    return
  }

  if (isNumber(multipleB.value)) {
    dllBaseunitCalmW({ d: multipleB.value }).then((res) => {
      multipleA.value = res.data
    })
  }
}
const handleMultipleReset = () => {
  multipleA.value = null
  multipleB.value = null
}
// E 倍数计算
</script>
