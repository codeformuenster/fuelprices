<template>
  <div class="relative w-full h-full">
    <div v-show="isPending"
         class="flex flex-col w-full h-full items-center justify-center space-y-3"
    >
      <Skeleton class="h-[125px] w-[250px] rounded-xl"/>
      <div class="space-y-2">
        <Skeleton class="h-4 w-[250px]"/>
        <Skeleton class="h-4 w-[200px]"/>
      </div>
    </div>
    <div ref="mapContainerRef"
         class="absolute top-0 left-0 w-full h-full"
    />
  </div>

</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import mapboxgl, { type LngLatLike } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import type { Ref } from 'vue';

import { Skeleton } from '@/components/ui/skeleton';


const props = defineProps([ 'center' ]);

const mapRef: Ref<null | mapboxgl.Map> = ref(null);
const mapContainerRef: Ref<string | HTMLElement> = ref('');
const isPending: Ref<Boolean> = ref(true);

const initMapBox = (center: LngLatLike | undefined): void => {
  mapboxgl.accessToken = 'pk.eyJ1IjoibWlsay0yLWRldiIsImEiOiJjbTNmdzdjeGkwMDh6MnFzOGsxaDRibGxyIn0.qfDvVCwBAFD1lMbOT4O9Xw';

  mapRef.value = new mapboxgl.Map({
    container: mapContainerRef.value,
    center,
    zoom: 10
  });
};

watch(() => props.center, () => {
  if (mapRef.value) {
    mapRef.value.flyTo({
      center: [ props.center[1], props.center[0] ],
      zoom: 10
    });
  } else {
    initMapBox([ props.center[1], props.center[0] ]);

    isPending.value = false;
  }
});

</script>

<style scoped>

</style>