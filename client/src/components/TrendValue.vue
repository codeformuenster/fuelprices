<template>
  <p v-if="trend?.status"
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
}

const props = defineProps<Props>();

const trendDirection = computed(() => {
  return props?.trend?.status === 'up' ? '+' : '-';
});

</script>

<style scoped>

</style>