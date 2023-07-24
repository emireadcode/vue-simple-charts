<script setup lang="ts">
//import Column from './components/3d-charts/Column/Column.vue';
//import Cone from './components/3d-charts/Cone/Cone.vue';
//import Cylinder from './components/3d-charts/Cylinder/Cylinder.vue';
//import Pyramid from './components/3d-charts/Pyramid/Pyramid.vue';
import SankeyChart from './components/Sankey Chart/SankeyChart.vue';
</script>

<template>
  <div style="height:600px; width:900px; border: 1px solid black;">
    <sankey-chart :data="[
        //jagaban start
        {
          to: 'd', 
          from: 'b', 
          value: 0.97
        },
        {
          to: 'p',
          from: 'a',
          value: 0.97
        },
        {
          to: 'e',
          from: 'd',
          value: 0.87
        },
        {
          to: 'a',
          from: 'f',
          value: 0.78
        },
        {
          to: 'a',
          from: 'g',
          value: 0.32
        },
        {
          to: 'g',
          from: 'f',
          value: 0.78
        },
        {
          to: 'g',
          from: 'p',
          value: 0.67
        },
        {
          to: 'c',
          from: 'a',
          value: 0.87
        },
        {
          to: 'c',
          from: 'c',
          value: 0.87
        },
        {
          to: 'f',
          from: 'g',
          value: 0.56
        },
        {
          to: 'm',
          from: 'f',
          value: 0.45
        },
        {
          to: 'b',
          from: 'a',
          value: 0.63
        },
        {
          to: 'b',
          from: 'f',
          value: 0.27
        }
        //jagaban end
      ]"
    ></sankey-chart>
    <!--<column :data="[
        //jagaban start
        {from: 'g', to: 'f', value: 2},
        {from: 'g', to: 'a', value: 3},
        {from: 'f', to: 'a', value: 4},
        {from: 'f', to: 'b', value: 1},
        {from: 'f', to: 'm', value: 5},
        {from: 'a', to: 'b', value: 3},
        {from: 'a', to: 'c', value: 3},
        {from: 'b', to: 'd', value: 3},
        {from: 'd', to: 'e', value: 3},
        {from: 'f', to: 'c', value: 4},
        {from: 'e', to: 'p', value: 3},
        {from: 'm', to: 'a', value: 3},
        //jagaban end
      ]
      [
        {
          name:'Category 1',
          series:[
            {
              name:'Series 1',
              value:7110
            },
            {
              name:'Series 2',
              value:1840
            },
            {
              name:'Series 3',
              value:2111
            },
            {
              name:'Series 4',
              value:3120
            }
          ]
        },
        {
          name:'Category 2',
          series:[
            {
              name:'Series 1',
              value:6500
            },
            {
              name:'Series 2',
              value:9120
            },
            {
              name:'Series 3',
              value:5123
            },
            {
              name:'Series 4',
              value:8200
            }
          ]
        },
        {
          name:'Category 3',
          series:[
            {
              name:'Series 1',
              value:-6453
            },
            {
              name:'Series 2',
              value:-9000
            },
            {
              name:'Series 3',
              value:5009
            },
            {
              name:'Series 4',
              value:8900
            }
          ]
        },
        {
          name:'Category 4',
          series:[
            {
              name:'Series 1',
              value:8567
            },
            {
              name:'Series 2',
              value:4332
            },
            {
              name:'Series 3',
              value:-3111
            },
            {
              name:'Series 4',
              value:-3222
            }
          ]
        },
        {
          name:'Category 5',
          series:[
            {
              name:'Series 1',
              value:8333
            },
            {
              name:'Series 2',
              value:3234
            },
            {
              name:'Series 3',
              value:-7323
            },
            {
              name:'Series 4',
              value:1544
            }
          ]
        },
        {
          name:'Category 6',
          series:[
            {
              name:'Series 1',
              value:2112
            },
            {
              name:'Series 2',
              value:3232
            },
            {
              name:'Series 3',
              value:-8231
            },
            {
              name:'Series 4',
              value:1111
            }
          ]
        },
        {
          name:'Category 7',
          series:[
            {
              name:'Series 1',
              value:-2112
            },
            {
              name:'Series 2',
              value:3232
            },
            {
              name:'Series 3',
              value:8231
            },
            {
              name:'Series 4',
              value:-9111
            }
          ]
        },
        {
          name:'Category 8',
          series:[
            {
              name:'Series 1',
              value:-2112
            },
            {
              name:'Series 2',
              value:10
            },
            {
              name:'Series 3',
              value:-200
            },
            {
              name:'Series 4',
              value:0
            }
          ]
        }
      ]
    "
    ></column>-->
  </div>
</template>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
}

.color-212529 {
  color: #212529;
}

.font-family {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue",
    Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol", "Noto Color Emoji";
}

.line-height-1-dot-5 {
  line-height: 1.5;
}

.font-weight-400 {
  font-weight: 400;
}

.font-size-1-rem {
  font-size: 1rem;
}

.background-color-fff {
  background-color: #fff;
}

[tabindex="-1"]:focus:not(:focus-visible) {
  outline: 0 !important;
}

template {
  display: none;
}

.position-absolute {
  position: absolute !important;
}
.position-relative {
  position: relative !important;
}
.position-fixed {
  position: fixed !important;
}

.w-50 {
  width: 50% !important;
}
.w-100, #chart-area {
  width: 100% !important;
}

.h-100, #chart-area {
  height: 100% !important;
}
.height-auto {
  height: auto !important;
}

.m-0 {
  margin: 0 !important;
}

.p-0 {
  padding: 0 !important;
}

.t-0 {
  top: 0 !important;
}

.l-0 {
  left: 0 !important;
}

.text-center {
  text-align: center !important;
}
.text-left {
  text-align: left !important;
}
.text-right {
  text-align: right !important;
}

.align-middle {
  vertical-align: middle !important;
}

.align-items-start {
  -ms-flex-align: start !important;
  align-items: flex-start !important;
}
.align-items-center {
  align-items: center !important;
}

.align-self-stretch {
  align-self: stretch !important;
}


.shadow {
  box-shadow: 0 0.46667rem 0.991667rem 0 rgba(0, 0, 0, 0.2),
    0 0.35rem 1.16667rem 0 rgba(0, 0, 0, 0.19);
}

.d-block{
  display: block !important;
}
.d-none {
  display: none !important;
}
.d-inline-block {
  display: inline-block !important;
}

.overflow-hidden {
  overflow: hidden !important;
}
.overflow-auto {
  overflow: auto !important;
}
.overflow-y-auto {
  overflow-y: auto !important;
}
.overflow-x-hidden {
  overflow-x: hidden !important;
}
.overflow-x-scroll {
  overflow-x: scroll !important;
}

.underline-none {
  text-decoration: none !important;
}

.text-break {
  word-break: break-word !important;
  overflow-wrap: break-word !important;
}
.text-wrap {
  white-space: normal !important;
}
.text-lowercase {
  text-transform: lowercase !important;
}
.text-uppercase {
  text-transform: uppercase !important;
}
.text-capitalize {
  text-transform: capitalize !important;
}

.flex-box {
  display: -webkit-box; /* OLD - iOS 6-, Safari 3.1-6 */
  display: -moz-box; /* OLD - Firefox 19- (buggy but mostly works) */
  display: -ms-flexbox; /* TWEENER - IE 10 */
  display: -webkit-flex; /* NEW - Chrome */
  display: flex; /* NEW, Spec - Opera 12.1, Firefox 20+ */
}
.flex-direction-row {
  -ms-flex-direction: row !important;
  flex-direction: row !important;
}
.flex-nowrap {
  -ms-flex-wrap: nowrap !important;
  flex-wrap: nowrap !important;
}
.flex-wrap {
  -ms-flex-wrap: wrap !important;
  flex-wrap: wrap !important;
}

.flex-w-10 {
  -webkit-box-flex: 0 0 10%; /* OLD - iOS 6-, Safari 3.1-6 */
  -moz-box-flex: 0 0 10%; /* OLD - Firefox 19- */
  width: 10%; /* For old syntax, otherwise collapses. */
  -webkit-flex: 0 0 10%; /* Chrome */
  -ms-flex: 0 0 10%; /* IE 10 */
  flex: 0 0 10%; /* NEW, Spec - Opera 12.1, Firefox 20+ */
}

.justify-content-center {
  justify-content: center !important;
}
.justify-content-start {
  -ms-flex-pack: start !important;
  justify-content: flex-start !important;
}
.justify-content-end {
  -ms-flex-pack: end !important;
  justify-content: flex-end !important;
}

.flex-fill {
  -ms-flex: 1 1 auto !important;
  flex: 1 1 auto !important;
}
.flex-grow-1 {
  -ms-flex-positive: 1 !important;
  flex-grow: 1 !important;
}
.flex-shrink-1 {
  -ms-flex-negative: 1 !important;
  flex-shrink: 1 !important;
}
.flex-grow-0 {
  -ms-flex-positive: 0 !important;
  flex-grow: 0 !important;
}
.flex-shrink-0 {
  -ms-flex-negative: 0 !important;
  flex-shrink: 0 !important;
}

.list-style-none {
  list-style: none !important;
}

.ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  -moz-binding: url("/src/assets/xml/ellipsis.xml#ellipsis");
}

</style>
