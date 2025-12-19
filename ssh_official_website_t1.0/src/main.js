import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'

import App from './App.vue'
import router from './router'

import { use } from 'echarts/core'
import { GridComponent, LegendComponent, TitleComponent, TooltipComponent } from 'echarts/components'
import { LineChart, PieChart } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import VChart from 'vue-echarts'

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent, LineChart, CanvasRenderer, UniversalTransition]
)

const app = createApp(App)

app.use(Antd)
app.use(createPinia())
app.use(router)
app.component('v-chart', VChart)

app.mount('#app')
