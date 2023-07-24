<script setup lang="ts">
import type { SankeyDataType } from "./implementation/type/";
import { drawSankeyChart } from "./implementation/";
import { ref, onMounted } from "vue";

const 
  props = defineProps<{
    data: SankeyDataType;
  }>(),
  chartarea = ref<HTMLDivElement>()
;

onMounted(() => {
  drawSankeyChart( 
    props.data,
    chartarea
  );
});

</script>

<template>
  <div :ref="el=>chartarea = el as HTMLDivElement" class="w-100 h-100 m-0 font-family background-color-fff font-size-1-rem font-weight-400 line-height-1-dot-5 color-212529 text-left">
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="width: 100%; height: 100%;" aria-labelledby="title" role="img">
      <title id="title">Column Chart</title>
    </svg>
  </div>
</template>

<style scoped>

</style>