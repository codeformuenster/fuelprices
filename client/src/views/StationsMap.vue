<template>
  <div class="flex ease-in-out duration-200 relative"
       :class="activeStation ? 'h-[25%]' : 'h-full'"
  >
    <StationsControllPanel :averagePrice="averagePrice"/>

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
import { ref, watch, type Ref } from 'vue';
import mapboxgl, { type LngLatLike } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { symmetricArrayDiff } from '@/utils/array.ts';

import type { AveragePrice, Station, StationId } from '@/types/models.ts';

import { Skeleton } from '@/components/ui/skeleton';
import StationsControllPanel from '@/views/StationsControlPanel.vue';
import useLocalStorage from '@/composable/useLocalStorage.ts';
import { useRouter } from 'vue-router';


interface Props {
  center: LngLatLike;
  stations: Station[];
  favorites: StationId[];
  activeStation: Station;
  highlightedStation: StationId;
  averagePrice: AveragePrice;
}

interface Markers {
  id: string;
  marker: mapboxgl.Marker;
}

const props = defineProps<Props>();

const router = useRouter();

const {storage}: { storage: Ref<string> } = useLocalStorage('fuelType', 'e10');

const mapRef: Ref<null | mapboxgl.Map> = ref(null);
const mapContainerRef: Ref<string | HTMLElement> = ref('');
const isPending: Ref<Boolean> = ref(true);
const markers: Ref<Markers[]> = ref([]);

const defaultZoom = 10;

const initMapBox = (center?: LngLatLike) => {
  mapboxgl.accessToken = 'pk.eyJ1IjoibWlsay0yLWRldiIsImEiOiJjbTNmdzdjeGkwMDh6MnFzOGsxaDRibGxyIn0.qfDvVCwBAFD1lMbOT4O9Xw';

  setTimeout(() => {
    mapRef.value = new mapboxgl.Map({
      container: mapContainerRef.value,
      center,
      zoom: defaultZoom
    });
  });
};

watch(() => props.center, () => {
  if (mapRef.value) {
    mapRef.value.flyTo({
      center: props.center,
      zoom: defaultZoom
    });
  } else {
    initMapBox(props.center);

    isPending.value = false;
  }
});

const stationMarker = (data: any) => {
  const icon = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="41" viewBox="0 0 28 41" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.6667 39C13.6667 39 26.3333 20.6623 26.3333 13.6667C26.3333 6.67106 20.6623 1 13.6667 1C6.67106 1 1 6.67106 1 13.6667C1 20.6623 13.6667 39 13.6667 39ZM13.6667 22.5333C18.5636 22.5333 22.5333 18.5636 22.5333 13.6667C22.5333 8.76974 18.5636 4.8 13.6667 4.8C8.76974 4.8 4.8 8.76974 4.8 13.6667C4.8 18.5636 8.76974 22.5333 13.6667 22.5333Z" fill="currentColor"/>
<path d="M22.5333 13.6667C22.5333 18.5636 18.5636 22.5333 13.6667 22.5333C8.76974 22.5333 4.8 18.5636 4.8 13.6667C4.8 8.76974 8.76974 4.8 13.6667 4.8C18.5636 4.8 22.5333 8.76974 22.5333 13.6667Z" fill="white"/>
<path d="M13.6667 39L13.2553 39.2842L13.6667 39.8798L14.0781 39.2842L13.6667 39ZM13.6667 39C14.0781 39.2842 14.0781 39.2841 14.0783 39.2839L14.0787 39.2832L14.0806 39.2805L14.0876 39.2703L14.1152 39.2302C14.1395 39.1949 14.1753 39.1425 14.222 39.0741C14.3153 38.9372 14.452 38.7359 14.6259 38.4774C14.9735 37.9604 15.4698 37.2145 16.0652 36.2978C17.2556 34.4647 18.8437 31.9464 20.4325 29.2076C22.0203 26.4704 23.6139 23.5044 24.8119 20.7774C26.001 18.0709 26.8333 15.5291 26.8333 13.6667C26.8333 6.39492 20.9384 0.5 13.6667 0.5C6.39492 0.5 0.5 6.39492 0.5 13.6667C0.5 15.5291 1.33235 18.0709 2.5214 20.7774C3.71946 23.5044 5.313 26.4704 6.90083 29.2076C8.48962 31.9464 10.0777 34.4647 11.2682 36.2978C11.8636 37.2145 12.3598 37.9604 12.7075 38.4774C12.8813 38.7359 13.018 38.9372 13.1113 39.0741C13.158 39.1425 13.1939 39.1949 13.2181 39.2302L13.2457 39.2703L13.2528 39.2805L13.2546 39.2832L13.2551 39.2839C13.2552 39.2841 13.2553 39.2842 13.6667 39Z" stroke="currentColor"/>
<script xmlns=""/></svg>`;

  const markerElement = document.createElement('div');

  markerElement.className = 'custom-marker';

  if (isFavorite(data.id)) {
    markerElement.classList.add('favorite');
  } else {
    markerElement.classList.remove('favorite');
  }

  const price = data[storage.value].toString();

  markerElement.innerHTML = `<div class="custom-marker_wrapper">
<div class="custom-marker_icon">${icon}</div>
<div class="custom-marker_title">${data.name}</div>
<div class="custom-marker_price">
${price.slice(0, price.length - 1)}
<div class="custom-marker_price-cents">${price.slice(-1)}</div>
<!--<div class="custom-marker_price-trend">icon</div>-->
</div>
</div>`;

  markerElement.addEventListener('click', () => {
    router.push(`/${data.id}`);
  });

  return markerElement;
};

const clearMarkers = () => {
  for (let i = 0; i < markers.value.length; i++) {
    markers.value[i].marker.remove();
  }
};

const updateMarkers = () => {
  clearMarkers();

  if (props.stations) {
    markers.value = props.stations.map((item) => {
      return {
        id: item.id,
        marker: new mapboxgl.Marker({
          element: stationMarker(item),
          anchor: 'bottom-left'
        })
          .setLngLat(item.location.coordinates)
      };
    });
  }

  for (let i = 0; i < markers.value.length; i++) {
    if (mapRef.value) {
      markers.value[i].marker.addTo(mapRef.value);
    }
  }
};

const toggleHighlightedStation = (id: StationId) => {
  const markerObj = markers.value.find((item) => item.id === id);

  markerObj?.marker._element.classList.toggle('highlighted');
};

const toggleActiveStation = (id: StationId) => {
  const markerObj = markers.value.find((item) => item.id === id);

  markerObj?.marker._element.classList.toggle('active');
};

const isFavorite = (id: string) => {
  if (props?.favorites?.length > 0) {
    if (props.favorites.some((item) => item === id)) {
      return true;
    }
  }

  return false;
};

watch(() => props.stations, () => {
  updateMarkers();
});

watch(storage, () => {
  updateMarkers();
});

watch(() => props.highlightedStation, (newVal, prevVal) => {
  const id = newVal ? newVal : prevVal;
  toggleHighlightedStation(id);
});

watch(() => props.favorites, (newVal, prevVal = []) => {
  const diff = symmetricArrayDiff(newVal, prevVal);

  if (diff.length) {
    for (let i = 0; i < diff.length; i++) {
      const markerObj = markers.value.find((item) => item.id === diff[i]);

      markerObj?.marker._element.classList.toggle('favorite');
    }
  }
});

watch(() => props.activeStation, async (newVal, prevVal) => {
  if (newVal && !prevVal) {
    await resizeMap();
  }

  if (newVal) {
    mapRef?.value?.flyTo({
      center: newVal.location.coordinates,
      zoom: 15
    });

    toggleActiveStation(newVal.id);

  } else {
    await resizeMap();

    mapRef?.value?.flyTo({
      zoom: defaultZoom
    });
  }

  if (prevVal) {
    toggleActiveStation(prevVal.id);
  }
});

const resizeMap = async () => {
  // TODO: need to wait until map container finish calculating height;
  await new Promise((resolve) => {
    setTimeout(() => {
      mapRef?.value?.resize();
      resolve(true);
    }, 250);
  });
};

defineExpose({
  resizeMap
});

</script>

<style>
.custom-marker {
  cursor: pointer;
}

.custom-marker.active, .custom-marker.highlighted {
  z-index: 999999999;
}

.custom-marker.favorite {
  z-index: 999999998;
}

.custom-marker.active .custom-marker_icon, .custom-marker.highlighted .custom-marker_icon {
  animation: bouncing 1s infinite;
}

.custom-marker.highlighted .custom-marker_icon svg {
  color: #3F9EFF !important;
}

.custom-marker.active .custom-marker_icon svg {
  color: #009688 !important;
}

.custom-marker.favorite .custom-marker_icon svg {
  color: #ffa500;
}

.custom-marker .custom-marker_wrapper {
  position: relative;
  background-color: #fff;
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
  padding: 4px 14px 0 18px;
  box-shadow: 3px 3px 10px -3px #4A4A4A;
}

.custom-marker .custom-marker_icon {
  position: absolute;
  top: 0;
  left: -14px;
  width: 28px;
  height: 40px;
}

.custom-marker .custom-marker_icon svg {
  color: #4A4A4A;
}

.custom-marker .custom-marker_title {
  font-size: 10px;
  line-height: 1;
  overflow: hidden;
  width: 60px;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.custom-marker .custom-marker_price {
  display: flex;
  font-size: 12px;
  font-weight: bold;
}

.custom-marker .custom-marker_price .custom-marker_price-cents {
  position: relative;
  top: -2px;
  font-size: 10px;
  margin-right: 8px;
}

@keyframes bouncing {
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(0, -7px);
  }
  100% {
    transform: translate(0, 0);
  }
}

</style>