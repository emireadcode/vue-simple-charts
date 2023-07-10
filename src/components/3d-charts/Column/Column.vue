<script setup lang="ts">
import type { DataTableType } from "../type/";
import { draw3DBoxAndPlot3DBoxData, measureText } from "../utility/";
import { ref, type Ref } from "vue";

const 
  props = defineProps<{
    data: DataTableType;
  }>(),
  drawboxandplot = draw3DBoxAndPlot3DBoxData(
    'COLUMN', 
    10, 
    {width: 200, height: 80}, 
    10, 
    {top: 10, bottom: 20, left: 10, right: 15}, 
    props.data
  )
;

</script>

<template>
  <div class="w-100 h-100 m-0 font-family background-color-fff font-size-1-rem font-weight-400 line-height-1-dot-5 color-212529 text-left">
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="width: 100%; height: 100%;" aria-labelledby="title" role="img">
      <title id="title">Column Chart</title>
      <g stroke="black" style="font-size:10px;">
        <template v-for="(axisnumber,i) in drawboxandplot.axisnumber">
          <text :x="drawboxandplot.axisnumbercoordinates[i].x - measureText(axisnumber+'', 10)" :y="drawboxandplot.axisnumbercoordinates[i].y + 3">{{ axisnumber }}</text>
        </template>
      </g>
      <g>
        <template v-for="planes in drawboxandplot.draw3DBox">
          <template v-if="planes.hastraceline">
            <template v-for="(line, i) in planes.tracelines">
              <template v-if="drawboxandplot.axisnumber[i] === 0">
                <g stroke="blue" style="stroke-width:3;">
                  <line :x1="line.x1" :x2="line.x2" :y1="line.y1" :y2="line.y2"></line>
                </g>
              </template>
              <template v-else>
                <g stroke="blue">
                  <line :x1="line.x1" :x2="line.x2" :y1="line.y1" :y2="line.y2"></line>
                </g>
              </template>
            </template>
          </template>
          <template v-if="(typeof planes.plane === 'string')">
            <g style="stroke-width:1;" stroke="blue" fill="rgb(220,220,220)">
              <polyline :points="planes.plane" />
            </g>
          </template>
          <template v-else>
            <template v-for="plane in planes.plane">
              <g stroke="blue">
                <line :x1="plane.x1" :x2="plane.x2" :y1="plane.y1" :y2="plane.y2"></line>
              </g>
            </template>
          </template>
        </template>
      </g>
      <g>
        <template v-for="side in drawboxandplot.plot3DBoxData">
          <template v-for="(series, i) in side.series">
            <g style="stroke-width:1;" stroke="lightgray" :fill="side.color[i]">
              <path :d="series.face"/>
            </g>
          </template>
        </template>
      </g>
      <template v-for="(originplane, i) in drawboxandplot.originplane.plane">
        <g stroke="blue">
          <line :x1="originplane.x1" :x2="originplane.x2" :y1="originplane.y1" :y2="originplane.y2"></line>
        </g>
      </template>
    </svg>
  </div>
</template>

<style scoped>

</style>