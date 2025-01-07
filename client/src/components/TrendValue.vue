<template>
  <p v-if="trend?.status || placeholder"
     :class="trendClass[trend.status]"
  >
    {{ trendDirection }} {{ trend.value }}
  </p>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { trendClass } from '@/utils/html.ts';

import type { Trend } from '@/types/models.ts';


interface Props {
  trend: Trend;
  placeholder: Boolean
}

const props = defineProps<Props>();

const trendDirection = computed(() => {
  if(props?.trend?.status === 'up'){
    return '+'
  }

  if(props?.trend?.status === 'down'){
    return '-'
  }
});

</script>

<style scoped>

</style>