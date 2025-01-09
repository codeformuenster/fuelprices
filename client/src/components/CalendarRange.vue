<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        class="w-[280px] justify-start text-left font-normal"
        :class="!value && 'text-muted-foreground'"
      >
        <svg class="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
          <path
            d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L64 64C28.7 64 0 92.7 0 128l0 16 0 48L0 448c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-256 0-48 0-16c0-35.3-28.7-64-64-64l-40 0 0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L152 64l0-40zM48 192l80 0 0 56-80 0 0-56zm0 104l80 0 0 64-80 0 0-64zm128 0l96 0 0 64-96 0 0-64zm144 0l80 0 0 64-80 0 0-64zm80-48l-80 0 0-56 80 0 0 56zm0 160l0 40c0 8.8-7.2 16-16 16l-64 0 0-56 80 0zm-128 0l0 56-96 0 0-56 96 0zm-144 0l0 56-64 0c-8.8 0-16-7.2-16-16l0-40 80 0zM272 248l-96 0 0-56 96 0 0 56z"/>
        </svg>

        <template v-if="value.start">
          <template v-if="value.end">
            {{ df.format(value.start.toDate(getLocalTimeZone())) }} - {{
              df.format(value.end.toDate(getLocalTimeZone()))
            }}
          </template>

          <template v-else>
            {{ df.format(value.start.toDate(getLocalTimeZone())) }}
          </template>
        </template>
        <template v-else>
          Pick a date
        </template>
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <RangeCalendar v-model="value"
                     initial-focus
                     :number-of-months="1"
                     :isDateUnavailable="disableDates"
                     @update:modelValue="handleUpdateRange"
      />
    </PopoverContent>
  </Popover>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { DateRange } from 'radix-vue';
import {
  CalendarDate,
  DateFormatter,
  getLocalTimeZone,
} from '@internationalized/date';

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { RangeCalendar } from '@/components/ui/range-calendar';


const props = defineProps([ 'modelValue', 'mainView' ]);
const emits = defineEmits([ 'update:modelValue' ]);

const currentDate = new Date();
const currentDateSpecially = new CalendarDate(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate());

const getLang = () => {
  if (navigator.languages !== undefined)
    return navigator.languages[0];
  return navigator.language;
};

const userLocale = getLang();


const df = new DateFormatter(userLocale, {
  dateStyle: 'medium',
});

const value = computed(() => {
  return props.modelValue;
});

const disableDates = (date: CalendarDate) => {
  return date.compare(currentDateSpecially) > 0;
};

const handleUpdateRange = (newVal: DateRange) => {
  emits('update:modelValue', newVal);
};
</script>

<style scoped>

</style>