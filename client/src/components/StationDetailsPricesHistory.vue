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
import type { DateRange } from 'radix-vue';
import { CalendarDate } from '@internationalized/date';

import type { Price } from '@/types/models.ts';
import { type Point, verticalLinePlugin } from '@/plugins/chartjs.ts';

import useLocalStorage from '@/composable/useLocalStorage.ts';

import { getPrices } from '@/api/services/mainService.ts';
import CalendarRange from '@/components/CalendarRange.vue';


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
          if (typeof value === 'number') {
            return '€' + parseFloat((value).toFixed(3));
          }

          return '€' + value;
        }
      }
    }
  }
};

const router = useRouter();
const route = useRoute();

const {storage}: { storage: Ref<string> } = useLocalStorage('fuelType', 'e10');

const mainView = ref(null);

const currentDate = new Date();
const rangePeriodDefault = {
  start: new CalendarDate(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate()),
  end: new CalendarDate(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate()),
};

const rangePeriod = ref(rangePeriodDefault) as Ref<DateRange>;

const pricesList: Ref<Price[]> = ref([]);
const isPending: Ref<boolean> = ref(true);

const chartData = computed(() => {
  options.lineAtIndex = [];

  const labels: string[] = [];

  type PricesCollector = {
    e10: number[],
    super: number[],
    diesel: number[],
  }
  const prices: PricesCollector = {
    e10: [],
    super: [],
    diesel: [],
  };

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

      prices.e10.push(pricesList.value[i].e10);
      prices.super.push(pricesList.value[i].super);
      prices.diesel.push(pricesList.value[i].diesel);
    }
  }

  const datasets = [
    {
      label: '',
      backgroundColor: '#2b80ba',
      borderColor: '#37a2eb',
      fill: false,
      cubicInterpolationMode: 'monotone',
      tension: 0.1,
      data: prices[storage.value as keyof PricesCollector]
    },
  ];

  return {
    labels,
    datasets
  };
});

const getPricesByDateRange = async () => {
  isPending.value = true;

  if (rangePeriod.value) {
    const startDate: string = rangePeriod.value?.start?.toString() || new Date().toISOString();
    const endDate = rangePeriod.value?.end?.toString() || new Date().toISOString();

    const queries = {
      startDay: startDate,
      endDay: endDate,
    };

    try {
      const result = await getPrices(route.params.id as string, queries);
      pricesList.value = result.data;
    } catch (error) {
      console.log(error);
    } finally {
      isPending.value = false;
    }
  }
};

watch(() => router.currentRoute.value, async (newVal) => {
  if (newVal.params.id) {
    rangePeriod.value = rangePeriodDefault;
  }
}, {immediate: true});

watch(rangePeriod, (newVal) => {
  if (newVal.start && newVal.end) {
    getPricesByDateRange();
  }
});

const refreshPrices = async () => {
  await getPricesByDateRange();
};

defineExpose({
  refreshPrices
});
</script>

<style scoped>

</style>