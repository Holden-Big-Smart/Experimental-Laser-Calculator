<template>
  <div>
    <h3 class="text-xl text-center my-0">名称：CPA(1)</h3>
    <div class="flex justify-center gap-2 my-2 text-sm">
      <p class="text-right mb-0">版本号：V0.1-A0.1-D0.1</p>
      <p class="mb-0">发布日期：2024.04.30</p>
    </div>
    <div class="flex justify-center gap-2 my-2 text-sm">
      <button class="underline" @click="emitter.emit('feedback')">问题反馈</button>
      <button class="underline" @click="emitter.emit('help')">帮助</button>
    </div>

    <div class="grid grid-cols-2 gap-4 bg-white rounded-md px-4 py-2">
      <!-- S 激光参数 -->
      <fieldset class="my-4">
        <legend class="text-sm font-bold">激光参数</legend>
        <div class="my-2 flex items-center gap-2">
          <span class="text-sm w-[8em]">激光中心波长：</span>
          <input v-model="state.wave0" class="input input-sm input-bordered" type="number" />
          <span class="text-sm">nm</span>
        </div>
        <div class="my-2 flex items-center gap-2">
          <span class="text-sm w-[8em]">激光追迹波长：</span>
          <input v-model="state.wave" class="input input-sm input-bordered" type="number" />
          <span class="text-sm">nm</span>
        </div>
      </fieldset>
      <!-- E 激光参数 -->

      <!-- S 输出参数 -->
      <fieldset class="my-4 row-span-5">
        <legend class="text-sm font-bold">输出参数</legend>
        <textarea
          class="textarea textarea-sm w-full textarea-bordered"
          disabled
          rows="20"
          :value="result"
        ></textarea>
      </fieldset>
      <!-- E 输出参数 -->

      <!-- S 展宽器参数 -->
      <fieldset class="my-4">
        <legend class="text-sm font-bold">展宽器参数</legend>
        <div class="my-2 flex items-center gap-2">
          <span class="text-sm w-[8em]">凹面镜曲率半径：</span>
          <input v-model="state.r" class="input input-sm input-bordered" type="number" />
          <span class="text-sm">mm</span>
        </div>
        <div class="my-2 flex items-center gap-2">
          <span class="text-sm w-[8em]">光栅凹面镜间距：</span>
          <input v-model="state.l" class="input input-sm input-bordered" type="number" />
          <span class="text-sm">nm</span>
        </div>
        <div class="my-2 flex items-center gap-2">
          <span class="text-sm w-[8em]">光栅刻线密度：</span>
          <input v-model="state.d" class="input input-sm input-bordered" type="number" />
          <span class="text-sm">nm</span>
        </div>
        <div class="my-2 flex items-center gap-2">
          <span class="text-sm w-[8em]">光栅入射角：</span>
          <input v-model="state.gama" class="input input-sm input-bordered" type="number" />
          <span class="text-sm">度</span>
        </div>
        <div class="my-2 flex items-center gap-2">
          <span class="text-sm w-[8em]">展宽程数：</span>
          <input v-model="state.n" class="input input-sm input-bordered" type="number" />
          <span class="text-sm">程</span>
        </div>
      </fieldset>
      <!-- E 展宽器参数 -->

      <!-- S 放大器 -->
      <fieldset class="my-4">
        <legend class="text-sm font-bold">放大器</legend>
        <div class="flex gap-2" v-for="i in 10" :key="i">
          <div class="my-2">
            <select v-model="state['material' + i]" class="select select-sm select-bordered">
              <option v-for="option in selectOptions" :key="option.Name" :value="option.Name">
                {{ option.Name }}
              </option>
            </select>
          </div>
          <div class="my-2 flex items-center gap-2">
            <span class="text-sm w-[3em]">长度：</span>
            <input
              v-model="state['Materiallength' + i]"
              class="input input-sm input-bordered w-[8em]"
              type="number"
            />
            <span class="text-sm">mm</span>
          </div>
        </div>
      </fieldset>
      <!-- E 激光参数 -->

      <!-- S 其它附加色散 -->
      <fieldset class="my-4">
        <legend class="text-sm font-bold">其它附加色散</legend>
        <div class="my-2 flex items-center gap-2">
          <span class="text-sm w-[8em]">GD：</span>
          <input v-model="state.gd" class="input input-sm input-bordered" type="number" />
          <span class="text-sm">fs</span>
        </div>
        <div class="my-2 flex items-center gap-2">
          <span class="text-sm w-[8em]">GDD：</span>
          <input v-model="state.gdd" class="input input-sm input-bordered" type="number" />
          <span class="text-sm">fs</span>
        </div>
        <div class="my-2 flex items-center gap-2">
          <span class="text-sm w-[8em]">TOD：</span>
          <input v-model="state.tod" class="input input-sm input-bordered" type="number" />
          <span class="text-sm">fs</span>
        </div>
        <div class="my-2 flex items-center gap-2">
          <span class="text-sm w-[8em]">FOD：</span>
          <input v-model="state.fod" class="input input-sm input-bordered" type="number" />
          <span class="text-sm">fs</span>
        </div>
      </fieldset>
      <!-- E 其它附加色散 -->

      <!--S 压缩器-->
      <fieldset class="my-4">
        <legend class="text-sm font-bold">压缩器</legend>
        <div class="my-2 flex items-center gap-2">
          <span class="text-sm w-[8em]">光栅刻线密度：</span>
          <input v-model="state.d1" class="input input-sm input-bordered" type="number" />
          <span class="text-sm">线/mm</span>
        </div>
        <div class="my-2 flex items-center gap-2">
          <span class="text-sm w-[8em]">压缩程数：</span>
          <input v-model="state.n1" class="input input-sm input-bordered" type="number" />
        </div>
        <button class="btn btn-sm btn-neutral" @click="handleCalGratingParametersListClick">
          计算
        </button>
      </fieldset>
      <!--E 绘图输入参数-->
    </div>
  </div>
</template>

<script setup>
import { isNumber } from 'radash'
import { computed, reactive, ref } from 'vue'
import emitter from '@/utils/eventBus.js'
import { dllCpaCalCPAofMartinezGrating } from '@/api/dll'

import useMaterialInfoCSV from '@/hooks/useMaterialInfoCSV.js'
const materialInfoCSV = useMaterialInfoCSV()
const selectOptions = computed(() => materialInfoCSV.value.filter((row) => row.AxisNum === '0'))

// S 输入参数
const state = reactive({
  /** 激光中心波长，单位为 nm */
  wave0: 800,
  /** 追迹光波长，单位为 nm */
  wave: 750,
  /** 展宽器光栅入射角，单位为度 */
  gama: 22,
  /** 展宽器光栅刻线密度，单位为线/mm */
  d: 1200,
  /** 凹面镜曲率半径，单位为 mm */
  r: 1210,
  /** 光栅到凹面镜中心距离，单位为 mm */
  l: 400,
  /** 展宽器展宽程数，无单位 */
  n: 2,
  /** 光栅刻线密度，单位为线/mm */
  d1: 1500,
  /** 压缩程数，无单位 */
  n1: 2,
  /** material1*/
  material1: 'H-K5',
  /** material2*/
  material2: 'H-K5',
  /** material3*/
  material3: 'H-K7',
  /** material4*/
  material4: 'H-K5',
  /** material5*/
  material5: 'H-K9LA',
  /** material6*/
  material6: 'H-K50',
  /** material7*/
  material7: 'H-K51',
  /** material8*/
  material8: 'H-K10',
  /** material9*/
  material9: 'H-K11',
  /** material10*/
  material10: 'H-K11',
  /** Materiallength1*/
  Materiallength1: 0,
  /** Materiallength2*/
  Materiallength2: 0,
  /** Materiallength3*/
  Materiallength3: 0,
  /** Materiallength4*/
  Materiallength4: 0.015,
  /** Materiallength5*/
  Materiallength5: 0,
  /** Materiallength6*/
  Materiallength6: 0,
  /** Materiallength7*/
  Materiallength7: 0,
  /** Materiallength8*/
  Materiallength8: 0,
  /** Materiallength9*/
  Materiallength9: 0,
  /** Materiallength10*/
  Materiallength10: 0,
  /** 附加色散 fs */
  gd: 0,
  /** 附加色散 fs2 */
  gdd: 0,
  /** 附加色散 fs3 */
  tod: 0,
  /** 附加色散 fs4 */
  fod: 0
})
// E 输入参数

const result = ref(null)

const handleCalGratingParametersListClick = () => {
  dllCpaCalCPAofMartinezGrating(state).then((res) => {
    //输出 double* result：结果数组指针，包含以下元素
    //输出  展宽器的一到四阶色散
    //输出  result[0]：GD，一阶色散,单位fs
    //输出  result[1]：GDD，二阶色散,单位fs2
    //输出  result[2]：TOD，三阶色散,单位fs3
    //输出  result[3]：FOD，四阶色散,单位fs4
    //输出  材料的一到四阶色散
    //输出  result[4]：GD，一阶色散,单位fs
    //输出  result[5]：GD，二阶色散,单位fs2
    //输出  result[6]：GD，三阶色散,单位fs3
    //输出  result[7]：GD，四阶色散,单位fs4
    //输出  如果压缩器参数有效
    //输出  result[8]：第一组压缩器光栅入射角（度）
    //输出  result[9]：光栅对间距（mm）
    //输出  result[10]：第二组压缩器光栅入射角（度）
    //输出  result[11]：光栅对间距（mm）
    //输出  系统总色散
    //输出  result[12]：GD，一阶色散,单位fs
    //输出  result[13]：GDD，二阶色散,单位fs2
    //输出  result[14]：TOD，三阶色散,单位fs3
    //输出  result[15]：FOD，四阶色散,单位fs4
    console.log(res)
    result.value = `展宽器的一到四阶色散：\nGD，一阶色散: ${res.data?.[0]} fs\nGDD，二阶色散: ${res.data?.[1]} fs2\nTOD，三阶色散: ${res.data?.[2]} fs3\nFOD，四阶色散: ${res.data?.[3]} fs4\n材料的一到四阶色散：\nGD，一阶色散: ${res.data?.[4]} fs\nGD，二阶色散: ${res.data?.[5]} fs2\nGD，三阶色散: ${res.data?.[6]} fs3\nGD，四阶色散: ${res.data?.[7]} fs4\n系统总色散：\nGD，一阶色散: ${res.data?.[12]} fs\nGDD，二阶色散: ${res.data?.[13]} fs2\nTOD，三阶色散: ${res.data?.[14]} fs3\nFOD，四阶色散: ${res.data?.[15]} fs4\n
	`

    // 如果压缩器参数有效
    if (isNumber(res.data?.[8])) {
      result.value += `\n压缩器参数：\n第一组压缩器光栅入射角: ${res.data?.[8]} 度\n光栅对间距: ${res.data?.[9]} mm\n第二组压缩器光栅入射角: ${res.data?.[10]} 度\n光栅对间距: ${res.data?.[11]} mm`
      // result.value += `\n系统总色散：\nGD，一阶色散: ${res.data?.[12]} fs\nGDD，二阶色散: ${res.data?.[13]} fs2\nTOD，三阶色散: ${res.data?.[14]} fs3\nFOD，四阶色散: ${res.data?.[15]} fs4`
    }
  })
}
// E 绘图输入参数
</script>
