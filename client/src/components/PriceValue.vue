<template>
  <p class="text-xl font-semibold tracking-tight leading-none">
    <span class="text-xl font-semibold">€</span>
    {{mainPrice}}<span
      class="text-sm inline-block align-top leading-none">{{ secondaryPrice }}</span>
  </p>
</template>

<script setup lang="ts">
import { computed } from 'vue';


interface Props {
  price: number;
}

const props = defineProps<Props>();

const mainPrice = computed(() => {
  return props?.price?.toString().slice(0, props.price.toString().length - 1)
})

const secondaryPrice = computed(() => {
  return props?.price?.toString().slice(-1)
})

</script>

<style scoped>

</style>