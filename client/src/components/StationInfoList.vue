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
            <PriceValue :price="props?.price"/>
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
        <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
          <TrendValue
            class="w-full text-sm text-left"
            :trend="props?.trend"
          />
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