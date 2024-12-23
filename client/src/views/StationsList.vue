<template>
  <nav class="p-4">
    <Card v-for="item in props.data"
          class="mb-4 shadow-none hover:shadow-md cursor-pointer">
      <CardHeader class="p-4">
        <CardTitle class="flex mb-2 text-xl">
          <span class="flex-1 me-4">{{ item.name }}</span>

          <div class="flex flex-col items-end ms-2">
            <p class="text-xl font-semibold tracking-tight leading-none">{{ item.super.toString().slice(0, item.super.toString().length - 1) }}<span
              class="text-sm inline-block align-top leading-none">{{ item.super.toString().slice(-1) }}</span></p>
            <p class="w-full text-sm text-left text-green-500">{{ item.trend.super }}</p>
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
              <AddToFavoritesButton :stationId="item.id"/>
            </li>
          </ul>
        </CardDescription>
      </CardHeader>
    </Card>
  </nav>
</template>

<script setup lang="ts">

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AddToFavoritesButton from '@/components/AddToFavoritesButton.vue';
import type { Station } from '@/types/models.ts';

interface Props {
  data: Station[];
}

const props = defineProps<Props>();


</script>

<style scoped>

</style>