<template>
  <ul class="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
    <li class="pt-3 sm:pt-4 pb-1 sm:pb-2">
      <div class="flex items-center space-x-4 rtl:space-x-reverse">
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
            Current price
          </p>
        </div>
        <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
          <div class="flex flex-col items-end ms-2">
            <p class="text-xl font-semibold tracking-tight leading-none">
              {{
                priceValue
              }}<span class="text-sm inline-block align-top leading-none">
                {{ priceValueCents }}
              </span>
            </p>
          </div>
        </div>
      </div>
    </li>
    <li class="pt-3 sm:pt-4 pb-1 sm:pb-2">
      <div class="flex items-center space-x-4 rtl:space-x-reverse">
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
            Trend
          </p>
        </div>
        <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white"
             :class="props.trend?.status ? trendClass[props.trend?.status] : null"
        >
          {{ props?.trend?.value }}
        </div>
      </div>
    </li>
    <li class="pt-3 sm:pt-4 pb-1 sm:pb-2">
      <div class="flex items-center space-x-4 rtl:space-x-reverse">
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
            Last updated
          </p>
        </div>
        <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
          {{ new Date(props.updatedAt).toLocaleString() }}
        </div>
      </div>
    </li>
    <li class="pt-3 sm:pt-4 pb-1 sm:pb-2">
      <div class="flex items-center space-x-4 rtl:space-x-reverse">
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
            Address
          </p>
        </div>
        <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
          {{ props.address }}
        </div>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { trendClass } from '@/utils/html.ts';

import type { Trend } from '@/types/models.ts';


interface Props {
  price: string,
  trend: Trend,
  updatedAt: Date,
  address: string
}

const props = defineProps<Props>();

const priceValue = computed(() => {
  return props?.price?.toString().slice(0, props?.price?.toString().length - 1);
});

const priceValueCents = computed(() => {
  return props?.price?.toString().slice(-1);
});


</script>

<style scoped>

</style>