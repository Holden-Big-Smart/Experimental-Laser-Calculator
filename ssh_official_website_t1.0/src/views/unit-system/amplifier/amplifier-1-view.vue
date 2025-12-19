<template>
	<div>
		<h3 class="text-xl text-center my-0">名称：光参量放大器(1)</h3>
		<div class="flex justify-center gap-2 my-2 text-sm">
			<p class="text-right mb-0">版本号：V0.1-A0.1-D0.1</p>
			<p class="mb-0">发布日期：2024.04.30</p>
		</div>
		<div class="flex justify-center gap-2 my-2 text-sm">
			<button class="underline" @click="emitter.emit('feedback')">问题反馈</button>
			<button class="underline" @click="emitter.emit('help')">帮助</button>
		</div>

		<div class="grid grid-cols-2 gap-4 bg-white rounded-md px-4 py-2">
			<!-- S 信号激光参数 -->
			<fieldset class="my-4">
				<legend class="text-sm font-bold">信号激光参数</legend>
				<div class="my-2 flex items-center gap-2">
					<span class="text-sm w-[7em]">起始激光波长：</span>
					<input v-model="state.startxs" class="input input-sm input-bordered" type="number" />
					<span class="text-sm">nm</span>
				</div>

				<div class="my-2 flex items-center gap-2">
					<span class="text-sm w-[7em]">结束激光波长：</span>
					<input v-model="state.endxs" class="input input-sm input-bordered" type="number" />
					<span class="text-sm">nm</span>
				</div>
				<div class="my-2 flex items-center gap-2">
					<span class="text-sm w-[7em]">计算点数：</span>
					<input v-model="state.iCount" class="input input-sm input-bordered" type="number" />
				</div>
			</fieldset>
			<!-- E 信号激光参数 -->

			<!-- S 晶体基本参数 -->
			<fieldset class="my-4 row-span-2">
				<legend class="text-sm font-bold">晶体参数</legend>
				<div class="my-2 flex items-center gap-2">
					<span class="text-sm w-[8em]">材料名称：</span>
					<select v-model="state.materialName" class="select select-sm w-44 select-bordered">
						<option v-for="option in selectOptions" :key="option.Name" :value="option.Name">
							{{ option.Name }}
						</option>
					</select>
				</div>
				<div class="my-2 flex items-center gap-2">
					<span class="text-sm w-[8em]">相位匹配类型：</span>
					<select value="ooe" class="select select-sm w-44 select-bordered">
						<option value="ooe">ooe</option>
					</select>
				</div>
				<div class="my-2 flex items-center gap-2">
					<span class="text-sm w-[8em]">相位匹配面：</span>
					<select value="--" class="select select-sm w-44 select-bordered">
						<option value="--">--</option>
					</select>
				</div>
				<div class="my-2 flex items-center gap-2">
					<span class="text-sm w-[8em]">材料长度：</span>
					<input v-model="state.lc" class="input input-sm input-bordered" type="number" />
					<span class="text-sm">mm</span>
				</div>
				<div class="my-2 flex items-center gap-2">
					<span class="text-sm w-[8em]">内部非共线角：</span>
					<input v-model="state.a" class="input input-sm input-bordered" type="number" />
					<span class="text-sm">度</span>
				</div>
				<div class="my-2 flex items-center gap-2">
					<span class="text-sm w-[8em]">相位匹配角：</span>
					<input v-model="state.p" class="input input-sm input-bordered" type="number" />
					<span class="text-sm">度</span>
				</div>
				<div class="my-2 flex items-center gap-2">
					<span class="text-sm w-[8em]">有效非线性系数：</span>
					<input v-model="state.deff" class="input input-sm input-bordered" type="number" />
					<span class="text-sm">pm/V</span>
				</div>
			</fieldset>
			<!-- E 晶体基本参数 -->

			<!-- S 泵浦激光参数 -->
			<fieldset class="my-4">
				<legend class="text-sm font-bold">泵浦激光参数</legend>
				<div class="my-2 flex items-center gap-2">
					<span class="text-sm w-[7em]">泵浦激光波长：</span>
					<input v-model="state.xp" class="input input-sm input-bordered" type="number" />
					<span class="text-sm">nm</span>
				</div>
				<div class="my-2 flex items-center gap-2">
					<span class="text-sm w-[7em]">泵浦激光功率密度（选填）：</span>
					<input v-model="state.Ip" class="input input-sm input-bordered" type="number" />
					<span class="text-sm">GW/cm²</span>
				</div>
				<button class="btn btn-sm btn-neutral" @click="handleCalGratingParametersListClick">
					计算
				</button>
			</fieldset>
			<!-- E 泵浦激光参数 -->

			<!-- S 数值输出参数 -->
			<fieldset class="my-4">
				<legend class="text-sm font-bold">数值输出参数</legend>
				<textarea class="textarea textarea-sm w-full textarea-bordered" disabled rows="4"
					:value="result"></textarea>
			</fieldset>
			<!-- E 数值输出参数 -->
			<!--S 绘图-->
			<fieldset class="my-4" v-if="!!a.length">
				<legend class="text-sm font-bold">绘图输出参数</legend>
				<div class="h-[160px]">
					<v-chart class="chart" ref="ACharts" :option="aOption" autoresize />
				</div>
				<div class="flex ml-[7em] my-4">
					<button class="btn btn-sm btn-neutral" @click="useExportEChartData(aOption, '闲频光散射角')">
						保存数据
					</button>
					<button class="btn btn-sm btn-ghost mx-4" @click="useExportEChart($refs.ACharts, '闲频光散射角')">
						保存图形
					</button>
				</div>
			</fieldset>

			<fieldset class="my-4" v-if="!!b.length">
				<legend class="text-sm font-bold">绘图输出参数</legend>
				<div class="h-[160px]">
					<v-chart class="chart" ref="BCharts" :option="bOption" autoresize />
				</div>
				<div class="flex ml-[7em] my-4">
					<button class="btn btn-sm btn-neutral" @click="useExportEChartData(bOption, '相位匹配角')">
						保存数据
					</button>
					<button class="btn btn-sm btn-ghost mx-4" @click="useExportEChart($refs.BCharts, '相位匹配角')">
						保存图形
					</button>
				</div>
			</fieldset>

			<fieldset class="my-4" v-if="!!c.length">
				<legend class="text-sm font-bold">绘图输出参数</legend>
				<div class="h-[160px]">
					<v-chart class="chart" ref="CCharts" :option="cOption" autoresize />
				</div>
				<div class="flex ml-[7em] my-4">
					<button class="btn btn-sm btn-neutral" @click="useExportEChartData(cOption, '增益/倍数')">
						保存数据
					</button>
					<button class="btn btn-sm btn-ghost mx-4" @click="useExportEChart($refs.CCharts, '增益/倍数')">
						保存图形
					</button>
				</div>
			</fieldset>

			<fieldset class="my-4" v-if="!!d.length">
				<legend class="text-sm font-bold">绘图输出参数</legend>
				<div class="h-[160px]">
					<v-chart class="chart" ref="DCharts" :option="dOption" autoresize />
				</div>
				<div class="flex ml-[7em] my-4">
					<button class="btn btn-sm btn-neutral" @click="useExportEChartData(dOption, '参量带宽')">
						保存数据
					</button>
					<button class="btn btn-sm btn-ghost mx-4" @click="useExportEChart($refs.DCharts, '参量带宽')">
						保存图形
					</button>
				</div>
			</fieldset>

			<fieldset class="my-4" v-if="!!e.length">
				<legend class="text-sm font-bold">绘图输出参数</legend>
				<div class="h-[160px]">
					<v-chart class="chart" ref="eOption" :option="eOption" autoresize />
				</div>
				<div class="flex ml-[7em] my-4">
					<button class="btn btn-sm btn-neutral" @click="useExportEChartData(eOption, '增益带宽')">
						保存数据
					</button>
					<button class="btn btn-sm btn-ghost mx-4" @click="useExportEChart($refs.ECharts, '增益带宽')">
						保存图形
					</button>
				</div>
			</fieldset>

			<fieldset class="my-4" v-if="!!f.length">
				<legend class="text-sm font-bold">绘图输出参数</legend>
				<div class="h-[160px]">
					<v-chart class="chart" ref="FCharts" :option="fOption" autoresize />
				</div>
				<div class="flex ml-[7em] my-4">
					<button class="btn btn-sm btn-neutral" @click="useExportEChartData(fOption, '闲频光波长')">
						保存数据
					</button>
					<button class="btn btn-sm btn-ghost mx-4" @click="useExportEChart($refs.FCharts, '闲频光波长')">
						保存图形
					</button>
				</div>
			</fieldset>

			<fieldset class="my-4" v-if="!!g.length">
				<legend class="text-sm font-bold">绘图输出参数</legend>
				<div class="h-[160px]">
					<v-chart class="chart" ref="GCharts" :option="gOption" autoresize />
				</div>
				<div class="flex ml-[7em] my-4">
					<button class="btn btn-sm btn-neutral" @click="useExportEChartData(gOption, '相位失配')">
						保存数据
					</button>
					<button class="btn btn-sm btn-ghost mx-4" @click="useExportEChart($refs.GCharts, '相位失配')">
						保存图形
					</button>
				</div>
			</fieldset>
		</div>
	</div>
</template>

<script setup>
	import {
		isNumber,
		isString
	} from 'radash'
	import {
		dllUnitsysCalOPA1ForSignalWaveList
	} from '@/api/dll'
	import {
		computed,
		reactive,
		ref
	} from 'vue'
	import emitter from '@/utils/eventBus.js'
	import useMaterialInfoCSV from '@/hooks/useMaterialInfoCSV.js'
	import {
		toFixed
	} from '@/utils/index.js'
	import useExportEChart from '@/hooks/useExportEChart.js'
	import useExportEChartData from '@/hooks/useExportEChartData.js'
	import {
		GRID
	} from '@/utils/constant.js'
	const materialInfoCSV = useMaterialInfoCSV()
	const selectOptions = computed(() =>
		materialInfoCSV.value.filter((row) => row.AxisNum === '1' && row.NegPosType === '-1')
	)
	const x = ref([])
	const a = ref([])

	const aOption = computed(() => ({
		grid: GRID,
		tooltip: {
			trigger: 'axis'
		},
		xAxis: {
			name: '种子光波长/nm',
			nameLocation: 'center',
			nameTextStyle: {
				lineHeight: 30
			},
			axisLabel: {
				formatter: (value) => toFixed(value) // 保留两位小数
			},
			data: x.value
		},
		yAxis: {
			name: '闲频光散射角(度)'
		},
		series: [{
			name: '闲频光散射角(度)',
			type: 'line',
			smooth: true,
			symbol: 'none',
			data: a.value
		}]
	}))
	const b = ref([])
	const bOption = computed(() => ({
		grid: GRID,
		tooltip: {
			trigger: 'axis'
		},
		xAxis: {
			name: '种子光波长/nm',
			nameLocation: 'center',
			nameTextStyle: {
				lineHeight: 30
			},
			axisLabel: {
				formatter: (value) => toFixed(value) // 保留两位小数
			},
			data: x.value
		},
		yAxis: {
			name: '相位匹配角(度)'
		},
		series: [{
			type: 'line',
			smooth: true,
			symbol: 'none',

			data: b.value
		}]
	}))
	const c = ref([])
	const cOption = computed(() => ({
		grid: GRID,
		tooltip: {
			trigger: 'axis'
		},
		xAxis: {
			name: '种子光波长/nm',
			nameLocation: 'center',
			nameTextStyle: {
				lineHeight: 30
			},
			axisLabel: {
				formatter: (value) => toFixed(value) // 保留两位小数
			},
			data: x.value
		},
		yAxis: {
			name: '增益/倍数'
		},
		series: [{
			type: 'line',
			smooth: true,
			symbol: 'none',
			name: '增益/倍数',
			data: c.value
		}]
	}))
	const d = ref([])
	const dOption = computed(() => ({
		grid: GRID,
		tooltip: {
			trigger: 'axis'
		},
		xAxis: {
			name: '种子光波长/nm',
			nameLocation: 'center',
			nameTextStyle: {
				lineHeight: 30
			},
			axisLabel: {
				formatter: (value) => toFixed(value) // 保留两位小数
			},
			data: x.value
		},
		yAxis: {
			name: '参量带宽/nm'
		},
		series: [{
			type: 'line',
			smooth: true,
			symbol: 'none',
			name: '参量带宽/nm',
			data: d.value
		}]
	}))
	const e = ref([])
	const eOption = computed(() => ({
		grid: GRID,
		tooltip: {
			trigger: 'axis'
		},
		xAxis: {
			name: '种子光波长/nm',
			nameLocation: 'center',
			nameTextStyle: {
				lineHeight: 30
			},
			axisLabel: {
				formatter: (value) => toFixed(value) // 保留两位小数
			},
			data: x.value
		},
		yAxis: {
			name: '增益带宽/nm'
		},
		series: [{
			type: 'line',
			smooth: true,
			symbol: 'none',
			name: '增益带宽/nm',
			data: e.value
		}]
	}))
	const f = ref([])
	const fOption = computed(() => ({
		grid: GRID,
		tooltip: {
			trigger: 'axis'
		},
		xAxis: {
			name: '种子光波长/nm',
			nameLocation: 'center',
			nameTextStyle: {
				lineHeight: 30
			},
			axisLabel: {
				formatter: (value) => toFixed(value) // 保留两位小数
			},
			data: x.value
		},
		yAxis: {
			name: '闲频光波长/um'
		},
		series: [{
			type: 'line',
			smooth: true,
			symbol: 'none',
			name: '闲频光波长/um',
			data: f.value
		}]
	}))
	const g = ref([])
	const gOption = computed(() => ({
		grid: GRID,
		tooltip: {
			trigger: 'axis'
		},
		xAxis: {
			name: '种子光波长/nm',
			nameLocation: 'center',
			nameTextStyle: {
				lineHeight: 30
			},
			axisLabel: {
				formatter: (value) => toFixed(value) // 保留两位小数
			},
			data: x.value
		},
		yAxis: {
			name: '相位失配/mm^-1'
		},
		series: [{
			type: 'line',
			smooth: true,
			symbol: 'none',
			name: '相位失配/mm^-1',
			data: g.value
		}]
	}))
	// S 输入参数

	const state = reactive({
		/** 材料名称*/
		materialName: 'BBO', // 6
		/** 泵浦光波长，单位为nm*/
		xp: 400, // 4
		/** 内部非共线角，单位为度*/
		a: 0.5, // 8
		/** 相位匹配角，单位为度*/
		p: 29.2, // 9
		/** 非线性晶体长度，单位为mm*/
		lc: 3, // 7
		/** 泵浦功率密度，单位为GW/cm²*/
		Ip: 1, // 5
		/** 有效非线性系数，单位为pm/V*/
		deff: 2, // 10
		/** 计算点数，即需要计算的信号波长个数*/
		iCount: 10, // 3
		/** 起始信号波长，单位为nm*/
		startxs: 700, // 1
		/** 起始信号波长，单位为nm*/
		endxs: 900 // 2
	})

	const result = ref('') // 数值输出参数

	const handleCalGratingParametersListClick = () => {
		// const step = 10  为啥写10呀，哈哈
		const step = 8
		const _a = [],
			_b = [],
			_c = [],
			_d = [],
			_e = [],
			_f = [],
			_g = [],
			_x = []
		// 若已知6，4，8，9，7，5，10，3，1，2 时，用calOPA1ForSignalWaveList计算所有曲线
		if (
			isString(state.materialName) &&
			isNumber(state.xp) &&
			isNumber(state.a) &&
			isNumber(state.p) &&
			isNumber(state.lc) &&
			isNumber(state.Ip) &&
			isNumber(state.deff) &&
			isNumber(state.iCount) &&
			isNumber(state.startxs) &&
			isNumber(state.endxs)
		) {
			dllUnitsysCalOPA1ForSignalWaveList({
				materialName: state.materialName,
				xp: state.xp,
				a: state.a,
				p: state.p,
				lc: state.lc,
				Ip: state.Ip,
				deff: state.deff,
				iCount: state.iCount,
				startxs: state.startxs,
				endxs: state.endxs
			}).then((res) => {
				//不要输出先注释
				// result.value = res.data.map((num) => toFixed(num, 4)).join('\n')

				for (let i = 0; i < res.data.length; i += step) {
					_a.push(res.data[i])
					_b.push(res.data[i + 1])
					_c.push(res.data[i + 2])
					_d.push(res.data[i + 3])
					_e.push(res.data[i + 4])
					_f.push(res.data[i + 5])
					_g.push(res.data[i + 6])
					_x.push(res.data[i + 7])
				}

				a.value = _a
				b.value = _b
				c.value = _c
				d.value = _d
				e.value = _e
				f.value = _f
				g.value = _g
				x.value = _x
			})
		}
	}
</script>