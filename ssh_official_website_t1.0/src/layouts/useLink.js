import { computed, ref } from 'vue'
import { useRoute } from 'vue-router';
import * as XLSX from 'xlsx'
import linkSheetURL from '@/assets/static/link.xlsx?url'

export default function useLink() {
  const route = useRoute();
  const links = ref([]);
  const currentPageLinks = computed(() => {
    if (!route.meta.sn) return []

    return links.value.filter(link => link.sn === route.meta.sn)
  })

  fetch(linkSheetURL)
    .then(response => response.arrayBuffer())
    .then(data => {
      const workbook = XLSX.read(data)
      const sheetName = workbook.SheetNames[0]
      const sheet = workbook.Sheets[sheetName]
      // const links = XLSX.utils.sheet_to_json(sheet)

      links.value = XLSX.utils.sheet_to_json(sheet).map(link => ({
        sn: link['页面编号'],
        link: link['相关链接'],
      }))
    })

  return { links, currentPageLinks }
}
