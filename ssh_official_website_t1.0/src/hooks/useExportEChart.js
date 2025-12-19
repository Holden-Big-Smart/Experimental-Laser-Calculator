/**
 * 将echarts导出图片
 * @see https://echarts.apache.org/zh/api.html#echartsInstance.getDataURL
 */

import { saveAs } from 'file-saver-es'

export default function useExportEChart(chartRef, filename = '') {
  const img = new Image()
  img.src = chartRef.getDataURL({
    type: 'png',
    pixelRatio: 2,
    backgroundColor: '#fff'
  })

  saveAs(img.src, `${filename}-图表.png`)
}
