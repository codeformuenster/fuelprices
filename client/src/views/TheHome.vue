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
        <StationsMap :center="currentCity?.location.coordinates"/>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, type Ref, ref } from 'vue';

import StationsList from '@/views/StationsList.vue';
import StationsMap from '@/views/StationsMap.vue';

import { getCities } from '@/api/services/mainService.ts';
import type { City } from '@/types/models.ts';

const currentCity: Ref<undefined | City> = ref(undefined);
const isPending: Ref<true | false> = ref(true);

onMounted(async () => {
  isPending.value = true;

  try {
    const cities = await getCities();

    if (cities.data) {
      currentCity.value = cities.data.find(({name}) => name === 'Münster');
    }
  } catch (error) {
    console.log(error);
  } finally {
    isPending.value = false;
  }
});


</script>

<style scoped>

</style>