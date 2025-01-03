<template>
  <Collapsible
    :open="isOpen"
    class="h-[75%] w-full space-y-2 bg-white"
  >
    <div v-show="isPending"
         class="flex flex-col w-full h-full items-center justify-center space-y-3"
    >
      <Skeleton class="h-[125px] w-[250px] rounded-xl"/>
      <div class="space-y-2">
        <Skeleton class="h-4 w-[250px]"/>
        <Skeleton class="h-4 w-[200px]"/>
      </div>
    </div>
    <CollapsibleContent class="space-y-2">
      <div class="rounded-md border px-4 py-3 font-mono text-sm">
        @radix-ui/colors
      </div>
      <div class="rounded-md border px-4 py-3 font-mono text-sm">
        @stitches/react
      </div>
    </CollapsibleContent>
  </Collapsible>
</template>

<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import { useRoute } from 'vue-router';

import type { Price } from '@/types/models.ts';

import { getPrices } from '@/api/services/mainService.ts';

import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
import { Skeleton } from '@/components/ui/skeleton';


const route = useRoute();

const isOpen: Ref<boolean> = ref(false);
const pricesList: Ref<Price[]> = ref([]);
const isPending: Ref<boolean> = ref(true);


onMounted(async () => {
  // setTimeout(() => {
  //   isOpen.value = true
  // }, 300)
  isPending.value = true;

  try {
    const result = await getPrices(route.params.id as string);
    pricesList.value = result.data;

  } catch (error) {
    console.log(error);
  } finally {
    // isPending.value = false;
  }
});
</script>

<style>

</style>