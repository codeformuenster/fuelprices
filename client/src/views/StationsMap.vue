<template>
  <div ref="mapContainerRef"
       class="stations-map"
  />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import type { Ref } from 'vue';

const mapRef: Ref<null | mapboxgl.Map> = ref(null);
const mapContainerRef: Ref<string | HTMLElement> = ref('');

onMounted(() => {
  mapboxgl.accessToken = 'pk.eyJ1IjoibWlsay0yLWRldiIsImEiOiJjbTNmdzdjeGkwMDh6MnFzOGsxaDRibGxyIn0.qfDvVCwBAFD1lMbOT4O9Xw';

  mapRef.value = new mapboxgl.Map({
    container: mapContainerRef.value,
    center: [ 13.41053, 52.52437 ],
    zoom: 10
  });
});

</script>

<style scoped>
.stations-map {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}
</style>