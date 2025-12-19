/**
 * 将数据导出为txt文档
 */

import { saveAs } from 'file-saver-es'
import { zip } from 'radash'
import { toFixed } from '@/utils/index.js'

export default function useExportEChartData(chartOptions, filename = '') {
  const split = '\t'

  const content = zip(
    [chartOptions.xAxis.name, ...chartOptions.xAxis.data.map((num) => toFixed(num, 4))],
    ...chartOptions.series.map((item) => [item.name, ...item.data.map((num) => toFixed(num, 4))])
  )
    .map((item) => item.join(split))
    .join('\n')

  saveAs(new Blob([content], { type: 'text/plain;charset=utf-8' }), `${filename}-数据.txt`)
}
