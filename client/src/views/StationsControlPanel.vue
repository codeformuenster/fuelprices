<template>
  <div class="flex items-center absolute z-10 top-2 left-2">
    <Select v-model="fuelType">
      <SelectTrigger class="w-[100px] me-3">
        <SelectValue placeholder=""/>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="super">
            {{fuelLabels.super}}
          </SelectItem>
          <SelectItem value="e10">
            {{fuelLabels.e10}}
          </SelectItem>
          <SelectItem value="diesel">
            {{fuelLabels.diesel}}
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>

    <ShowFavoritesButton/>

    <div
      class="justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background border border-input bg-background shadow-sm px-4 py-2 flex items-center h-10 ms-3">
      <PriceValue :price="currentAveragePrice"/>

      <TooltipProvider delayDuration="0">
        <Tooltip>
          <TooltipTrigger as-child>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="18px">
              <!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
              <path
                d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336l24 0 0-64-24 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l48 0c13.3 0 24 10.7 24 24l0 88 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/>
            </svg>
          </TooltipTrigger>
          <TooltipContent>
            <p>On a national average, {{ fuelLabels[fuelType as keyof FuelLabels] }} gasoline currently costs {{
                '€' + currentAveragePrice
              }} per litre</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  </div>
</template>

<script setup lang="ts">

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { computed, type Ref, ref, watchEffect } from 'vue';
import useLocalStorage from '@/composable/useLocalStorage.ts';
import ShowFavoritesButton from '@/components/ShowFavoritesButton.vue';
import { Button } from '@/components/ui/button';
import PriceValue from '@/components/PriceValue.vue';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import type { AveragePrice, FuelLabels } from '@/types/models.ts';
import { fuelLabels } from '@/utils/fuel.ts';

type Props = {
  averagePrice: AveragePrice
}

const props = defineProps<Props>();

const {storage}: { storage: Ref<string> } = useLocalStorage('fuelType', 'e10');

const fuelType = ref(storage.value);

const currentAveragePrice = computed(() => {
  if (props.averagePrice) {
    return props.averagePrice[fuelType.value as keyof AveragePrice];
  }

  return '0'
});

watchEffect(() => {
  if (fuelType.value) {
    storage.value = fuelType.value;
  }
});
</script>

<style scoped>

</style>