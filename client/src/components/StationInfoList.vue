<template>
  <div class="flex">
    <div class="me-4 flex flex-col items-center justify-center max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <h5 class="mb-0 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        <PriceValue :price="props?.price"/>
      </h5>

      <TrendValue
        class="mt-2 w-full text-sm text-left"
        :trend="props.trend"
      />
    </div>

    <dl class="max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
      <div class="flex flex-col pb-2">
        <dt class="mb-0 text-gray-500 md:text-sm dark:text-gray-400">Last updated</dt>
        <dd class="text-sm font-semibold">{{ new Date(props.updatedAt).toLocaleString() }}</dd>
      </div>
      <div class="flex flex-col pt-2">
        <dt class="mb-0 text-gray-500 md:text-sm dark:text-gray-400">Address</dt>
        <dd class="text-sm font-semibold">{{ props.address }}</dd>
      </div>
    </dl>

  </div>

</template>

<script setup lang="ts">
import type { Trend } from '@/types/models.ts';

import PriceValue from '@/components/PriceValue.vue';
import TrendValue from '@/components/TrendValue.vue';

interface Props {
  price: string,
  trend: Trend,
  updatedAt: Date,
  address: string
}

const props = defineProps<Props>();


</script>

<style scoped>

</style>