<template>
  <div ref="mainView">
    <h3 class="flex items-center text-lg font-semibold leading-none tracking-tight">
      Price change history
    </h3>
    <p class="text-sm text-muted-foreground mb-4">
      Here you can view the price change per day or use the filter and select the period you are interested in.
    </p>

    <CalendarRange v-model="rangePeriod" :mainView="mainView"/>

    <div class="mt-4">
      <Line
        v-if="!isPending"
        :data="chartData"
        :options="options"
        :plugins="[verticalLinePlugin]"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  type ChartConfiguration
} from 'chart.js';

import { computed, ref, type Ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Line } from 'vue-chartjs';

import type { Price } from '@/types/models.ts';
import { type Point, verticalLinePlugin } from '@/plugins/chartjs.ts';

import { getPrices } from '@/api/services/mainService.ts';
import CalendarRange from '@/components/CalendarRange.vue';
import { CalendarDate } from '@internationalized/date';
import type { DateRange } from 'radix-vue';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type CustomChartOptions = ChartConfiguration['options'] & {
  lineAtIndex: Point[];
}

const options: CustomChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    }
  },
  lineAtIndex: [],
  scales: {
    x: {
      ticks: {
        callback: function (value, index) {
          const val = pricesList.value[index];

          return new Date(val.updatedAt).toLocaleTimeString(navigator.language, {
            hour: '2-digit',
            minute: '2-digit'
          });
        }
      }
    },
    y: {
      ticks: {
        callback: function (value) {
          return '€' + value;
        }
      }
    }
  }
};

const router = useRouter();
const route = useRoute();

const mainView = ref(null);

const currentDate = new Date();
const rangePeriod = ref({
  start: new CalendarDate(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate()),
  end: new CalendarDate(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate()),
}) as Ref<DateRange>;

const pricesList: Ref<Price[]> = ref([]);
const isPending: Ref<boolean> = ref(true);

const chartData = computed(() => {
  options.lineAtIndex = [];

  const labels: string[] = [];
  const typeE10 = [];
  const typeSuper = [];
  const typeDiesel = [];

  if (pricesList.value.length > 0) {
    for (let i = 0; i < pricesList.value.length; i++) {
      const previousDate = new Date(pricesList.value[i === 0 ? i : i - 1].updatedAt);
      const currentDate = new Date(pricesList.value[i].updatedAt);

      if (
        previousDate.toISOString().split('T')[0] !==
        currentDate.toISOString().split('T')[0]
      ) {
        options.lineAtIndex.push({
          index: i,
          label: currentDate.toLocaleString().split(',')[0]
        });
      }

      labels.push(
        new Date(pricesList.value[i].updatedAt).toLocaleString()
      );

      typeE10.push(pricesList.value[i].e10);
      typeSuper.push(pricesList.value[i].super);
      typeDiesel.push(pricesList.value[i].diesel);
    }
  }

  const datasets = [
    {
      label: 'E10',
      backgroundColor: '#2b80ba',
      borderColor: '#37a2eb',
      fill: false,
      cubicInterpolationMode: 'monotone',
      tension: 0.1,
      data: typeE10
    },
  ];

  return {
    labels,
    datasets
  };
});

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

watch(rangePeriod, (newVal) => {
  if (newVal.start && newVal.end) {

    console.log(newVal);
  }
});
</script>

<style scoped>

</style>