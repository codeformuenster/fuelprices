<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import AddToFavoritesButton from '@/components/AddToFavoritesButton.vue';
import StationsList from '@/views/StationsList.vue';
</script>

<template>
  <div class="flex h-screen bg-gray-200 font-roboto">
    <div class="flex">
      <div class="hidden fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden"></div>
      <div
        class="-translate-x-full ease-in fixed inset-y-0 left-0 z-30 w-96
        overflow-y-auto transition duration-300 transform bg-white lg:translate-x-0 lg:static lg:inset-0">
        <StationsList/>
      </div>
    </div>
    <div class="flex-1 flex flex-col overflow-hidden">
      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
        <div class="container mx-auto px-6 py-8">

        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>

</style>