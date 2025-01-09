<template>
  <div class="flex items-center absolute z-10 top-2 left-2">
    <Select v-model="fuelType">
      <SelectTrigger class="w-[100px]">
        <SelectValue placeholder=""/>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="e10">
            E10
          </SelectItem>
          <SelectItem value="super">
            Super
          </SelectItem>
          <SelectItem value="diesel">
            Diesel
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>

    <ShowFavoritesButton class="ms-3"/>
  </div>
</template>

<script setup lang="ts">

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { type Ref, ref, watchEffect } from 'vue';
import useLocalStorage from '@/composable/useLocalStorage.ts';
import ShowFavoritesButton from '@/components/ShowFavoritesButton.vue';

const {storage}: { storage: Ref<string> } = useLocalStorage('fuelType', 'e10');

const fuelType = ref(storage.value);

watchEffect(() => {
  if(fuelType.value){
    storage.value = fuelType.value
  }
});
</script>

<style scoped>

</style>