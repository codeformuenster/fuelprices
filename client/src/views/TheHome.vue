<template>
  <div class="flex h-screen bg-gray-200 font-roboto">
    <div class="flex">
      <div class="hidden fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden"></div>
      <div
        class="-translate-x-full ease-in fixed inset-y-0 left-0 z-30 w-96
        overflow-y-auto transition duration-300 transform bg-white lg:translate-x-0 lg:static lg:inset-0">
        <StationsList :data="filteredStations"
                      :favorites="favoritesList"
                      :activeStation="activeStation"
                      :fuelType="storage"
                      @onHover="setHighlightedStation"
        />
      </div>
    </div>
    <div class="flex-1 flex flex-col overflow-hidden">
      <main class="flex flex-col flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
        <StationsMap ref="stationsMap"
                     :center="currentCenter"
                     :stations="filteredStations"
                     :favorites="favoritesList"
                     :highlightedStation="highlightedStationId"
                     :activeStation="activeStation"
                     :averagePrice="currentAveragePrice"
        />

        <router-view v-slot="{ Component }">
          <transition name="slideUp">
            <component :is="Component"
                       :activeStation="activeStation"
                       :favorites="favoritesList"
            />
          </transition>
        </router-view>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, type Ref, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import StationsList from '@/views/StationsList.vue';
import StationsMap from '@/views/StationsMap.vue';

import type { AveragePrice, City, Station, StationId } from '@/types/models.ts';

import useFavorites from '@/composable/useFavorites.ts';
import useLocalStorage from '@/composable/useLocalStorage.ts';

import { getAveragePrice, getCities, getStationsList } from '@/api/services/mainService.ts';


const stationsMap = ref(null);
const currentCity: Ref<undefined | City> = ref(undefined);
const stations: Ref<Station[]> = ref([]);
const currentAveragePrice: Ref<null | AveragePrice> = ref(null);
const isPending: Ref<true | false> = ref(true);
const isPendingList: Ref<true | false> = ref(true);

const activeStation: Ref<Station | null> = ref(null);
const highlightedStationId: Ref<StationId> = ref('');

const {favoritesList} = useFavorites();
const {storage}: { storage: Ref<string> } = useLocalStorage('fuelType', 'e10');
const {storage: showOnlyFavorites}: { storage: Ref<boolean> } = useLocalStorage('showOnlyFavorites', false);

const currentCenter = ref();

const router = useRouter();
const route = useRoute();

let intervalId = null;

const setActiveStation = (id: StationId) => {
  const station = stations.value.find((item) => item.id === id);
  if (station) {
    activeStation.value = station;
  }
};
const setHighlightedStation = (id: StationId) => {
  if (activeStation?.value?.id !== id) {
    highlightedStationId.value = id;
  }
};

const getStationsListByCity = async (cityId: string) => {
  isPendingList.value = true;

  try {
    const result = await getStationsList({cityId: cityId});
    stations.value = result.data;

    if (route.params.id) {
      setActiveStation(route.params.id as string);
    }
  } catch (error) {
    console.log(error);
  } finally {
    isPendingList.value = false;
  }
};

const getCurrentAveragePrice = async () => {
  isPendingList.value = true;

  try {
    const result = await getAveragePrice();
    currentAveragePrice.value = result.data;
  } catch (error) {
    console.log(error);
  } finally {
    isPendingList.value = false;
  }
};

const filteredStations = computed(() => {
  return showOnlyFavorites.value
    ? stations.value.filter((station) => {
      return favoritesList.value.some((item) => item === station.id);
    })
    : stations.value;
});

onMounted(async () => {
  isPending.value = true;

  try {
    const cities = await getCities();

    if (cities.data) {
      currentCity.value = cities.data.find(({name}) => name === 'Münster');
      currentCenter.value = currentCity?.value?.location.coordinates;

      if (currentCity.value) {
        await Promise.all([getStationsListByCity(currentCity.value.id), getCurrentAveragePrice()])

        intervalId = setInterval(async () => {
          if (currentCity.value) {
            await Promise.all([getStationsListByCity(currentCity.value.id), getCurrentAveragePrice()])
          }
        }, 1000*60*5);
      }
    }
  } catch (error) {
    console.log(error);
  } finally {
    isPending.value = false;
  }
});

onUnmounted(() => {
  intervalId = null
})

watch(() => router.currentRoute.value, (newVal) => {
  if (newVal.params.id) {
    setActiveStation(newVal.params.id as string);
  } else {
    activeStation.value = null;
  }
});

</script>

<style>
.slideUp-enter-active {
  transform: translateY(0);
}

.slideUp-enter-from {
  transform: translateY(75%);
}

.slideUp-leave-from, .slideUp-leave-active {
  transform: translateY(0);
}
</style>