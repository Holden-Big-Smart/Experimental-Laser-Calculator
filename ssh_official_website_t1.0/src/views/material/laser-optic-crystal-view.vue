<template>
  <h3>敬请期待</h3>

</template>

<script setup>
import { useRoute } from 'vue-router'

import MainLayout from '@/layouts/MainLayout.vue'
import materialInfo_Ex from '@/assets/static/tables/MaterialInfo_Ex.csv?raw'
import uCrystal_SM from '@/assets/static/tables/uCrystal_SM_Ex.csv?raw'
import bCrystal_SM from '@/assets/static/tables/bCrystal_SM_Ex.csv?raw'
import { formatTableInfo } from '@/utils/index.js'
import { ref } from 'vue'

const route = useRoute()

</script>
