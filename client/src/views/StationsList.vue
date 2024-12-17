<template>
  <nav class="p-4">
    <Card class="mb-4 shadow-none hover:shadow-md cursor-pointer">
      <CardHeader class="p-4">
        <div class="flex items-center">
          <div class="flex-1 space-y-1">
            <CardTitle>
              Markant
              <AddToFavoritesButton/>
            </CardTitle>
            <CardDescription class="flex">
              <svg class="me-1 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                <path
                  d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/>
              </svg>
              Harkortstr. 4, 48163 Münster
            </CardDescription>
          </div>
          <div class="flex flex-col items-end ms-2">
            <p class="text-2xl font-semibold tracking-tight leading-none">1.65<span
              class="text-sm inline-block align-top leading-none">9</span></p>
            <p class="w-full text-sm text-left text-green-500">-0.02</p>
          </div>
        </div>
      </CardHeader>
    </Card>
  </nav>
</template>

<script setup lang="ts">

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AddToFavoritesButton from '@/components/AddToFavoritesButton.vue';
</script>

<style scoped>

</style>