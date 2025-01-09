<template>
  <nav class="p-4 border-r">
    <Card v-for="item in props.data"
          class="mb-4 shadow-none hover:shadow-md cursor-pointer"
          :class="item.id === activeStation?.id ? 'shadow-md border-teal-600' : null"
          @mouseenter="() => onStationHover(item.id)"
          @mouseleave="() => onStationHover(null)"
    >
      <CardHeader class="p-4">
        <CardTitle class="flex mb-2 text-xl">
          <RouterLink :to="`/${item.id}`" class="flex-1 me-4">
            {{ item.name }}
          </RouterLink>

          <div class="flex flex-col items-end ms-2">
            <PriceValue :price="item[fuelType as keyof Station]"/>
            <TrendValue
              class="w-full text-sm text-left"
              :trend="item.trend[fuelType as keyof Station['trend']]"
            />
          </div>
        </CardTitle>
        <CardDescription class="flex">
          <ul class="flex items-center w-full list-none">
            <li>
                  <span class="flex">
                    <svg class="me-1 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                    <!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                    <path
                      d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/>
                  </svg>
                  {{ item.address }}
                  </span>

            </li>
            <li class="ms-4">
              <AddToFavoritesButton :stationId="item.id"
                                    :favorites="props.favorites"
              />
            </li>
          </ul>
        </CardDescription>
      </CardHeader>
    </Card>
  </nav>
</template>

<script setup lang="ts">
import type { Station } from '@/types/models.ts';

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AddToFavoritesButton from '@/components/AddToFavoritesButton.vue';
import TrendValue from '@/components/TrendValue.vue';
import PriceValue from '@/components/PriceValue.vue';


interface Props {
  data: Station[];
  favorites: string[];
  activeStation: Station;
  fuelType: string
}

const props = defineProps<Props>();
const emits = defineEmits([ 'onHover' ]);

const onStationHover = (id: any) => {
  emits('onHover', id);
};

</script>

<style scoped>

</style>