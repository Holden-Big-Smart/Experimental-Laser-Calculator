export function formatTableInfo(raw) {
  const formatRaw = raw.split(/\r?\n/).map((line) => line.split(','))

  // 提取表头和表格数据
  return { tableHeader: formatRaw[0], tableData: formatRaw.slice(1) }
}

export function toFixed(num, precision = 2) {
  const power = Math.pow(10, precision)
  return (Math.round(num * power) / power).toFixed(precision)
}
