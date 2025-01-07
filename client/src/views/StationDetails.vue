<template>
  <div
    class="h-[75%] grid gap-4 bg-white p-4 relative"
  >
    <div v-if="isPending"
         class="flex flex-col w-full h-full items-center justify-center space-y-3"
    >
<!--      TODO:// Need to create another preloader, because this one make my eyes crying-->
<!--      <Skeleton class="h-[125px] w-[250px] rounded-xl"/>-->
<!--      <div class="space-y-2">-->
<!--        <Skeleton class="h-4 w-[250px]"/>-->
<!--        <Skeleton class="h-4 w-[200px]"/>-->
<!--      </div>-->
    </div>
    <div v-slse>
      <div class="flex flex-col gap-y-1.5 text-center sm:text-left">
        <h2 class="flex items-center text-lg font-semibold leading-none tracking-tight">
          {{ props?.activeStation?.name }}

          <AddToFavoritesButton class="ms-4"
                                :stationId="props?.activeStation?.id"
                                :favorites="props?.favorites"
          />
        </h2>
        <p id="radix-vue-dialog-description-v-25-2" class="text-sm text-muted-foreground"> Make changes to your profile
          here. Click save when you're done. </p>
      </div>

      <div class="grid gap-4 py-4">
        <StationInfoList :address="props?.activeStation?.address"
                         :trend="props?.activeStation?.trend.e10"
                         :price="props?.activeStation?.e10"
                         :updatedAt="props?.activeStation?.latestPriceUpdatedAt"
        />
      </div>

      <Button variant="ghost"
              size="icon"
              class="flex items-center absolute right-4 top-2 opacity-70 transition-opacity hover:opacity-100"
              @click="handleClickClose"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
          <!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
          <path
            d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
        </svg>
        <span class="sr-only">Close</span>
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import type { Price, Station, StationId } from '@/types/models.ts';

import { getPrices } from '@/api/services/mainService.ts';

import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import AddToFavoritesButton from '@/components/AddToFavoritesButton.vue';
import StationInfoList from '@/components/StationInfoList.vue';

interface Props {
  activeStation: Station;
  favorites: StationId[];
}

const router = useRouter();
const route = useRoute();

const props = defineProps<Props>();

const pricesList: Ref<Price[]> = ref([]);
const isPending: Ref<boolean> = ref(true);

const handleClickClose = () => {
  router.push('/')
}

watch(() => router.currentRoute.value, async (newVal) => {
  if (newVal.params.id) {
    isPending.value = true;

    try {
      const result = await getPrices(route.params.id as string);
      pricesList.value = result.data;

    } catch (error) {
      console.log(error);
    } finally {
      isPending.value = false;
    }
  }
}, {immediate: true});
</script>

<style>

</style>