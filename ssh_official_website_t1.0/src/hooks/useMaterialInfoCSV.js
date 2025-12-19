import materialInfo_Ex from '@/assets/static/tables/MaterialInfo_Ex.csv?raw'
import { formatTableInfo } from '@/utils/index.js'
import { ref } from 'vue'

export default function useMaterialInfoCSV() {
  const jsonTableData = ref([])
  // 0x00. 读取CSV文件并格式化为表头和表数据
  const { tableHeader, tableData } = formatTableInfo(materialInfo_Ex)
  // csv2json
  jsonTableData.value = tableData.reduce((acc, row) => {
    // 过滤空行
    if (!row[0]) return acc

    const obj = {}
    tableHeader.forEach((header, index) => {
      obj[header] = row[index]
    })
    acc.push(obj)
    return acc
  }, [])

  return jsonTableData
}
