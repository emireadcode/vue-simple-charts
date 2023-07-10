Vue.config.productionTip = false;

const ColumnChartMixin = {
  data:function(){
    return {
      yAxisNamingAreaWidth:40,
      seriesNamingAreaWidth:150,
      titleNamingAreaHeight:40,
      seriesNamingAreaHeight:30,
      xAxisNamingAreaHeight:100,
      tempXAxisNamingAreaHeight:100,
      tempWidth:0,
      yDataPoints:[],
      xDataPoints:[],
      height:0,
      width:0,
      xOriginLine:0,
      yAxisSpacer:0,
      top:10,
      gap:0,
      left:0,
      maxSeries:20,
      maxCategories:10,
      xDistance:0,
      spaceGap:10,
      colors:[
        {	color: "rgb(126, 77, 42)"},
        {	color: "rgb(77, 93, 49)"},
        {	color: "rgb(17, 40, 64)"},
        {	color: "rgb(67, 53, 81)"},
        {	color: "rgb(31, 86, 99)"},
        {	color: "rgb(29, 29, 28)"},
        {	color: "rgb(38, 66, 94)"},
        {	color: "rgb(100, 44, 43)"},
        {	color: "rgb(0, 36, 95)"},
        {	color: "rgb(255, 255, 49)"}
      ],
      categories:[],
      tempCategories:[]
    };
  },
  methods:{
    initialize(categories){
      this.categories = [];
      this.tempCategories = [];
      let copy = JSON.parse(JSON.stringify(categories));
      this.tempCategories = copy;
      this.categories = copy;
    },
    safeInteger(value){
      return Number.isInteger(value) && Math.abs(value) <= Number.MAX_SAFE_INTEGER;
    },
    round(number,precision) {
      let result = Math.round((number / precision) *  precision);
      return result;
    },
    debounce: function(fn, delay) {
      let timer = null;
      return function () {
        var context = this, args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
          fn.apply(context, args);
        }, delay);
      };
    },
    determineXAxis(){
      let xH = 0, h = this.height, index = 0;
      for(let point of this.yDataPoints){
        if(point==0){
          xH = ((h-this.top)-(index*this.yAxisSpacer)-(this.yAxisSpacer/2));
          break;
        }
        index++;
      }
      return xH;
    },
    checkPoint(xUnit,h,point,curH){
      let yCoord = 0;
      if(point==h){
        yCoord = curH;
      }
      else{
        for(let i=1;i<=this.gap;i++){
          if((point-i)==h){
            yCoord = curH+(i*xUnit);
            break;
          }
        }
      }
      return yCoord;
    },
    getYCoordinate(h){
      let height = this.height, index = 0,
          entered = false, yCoord = 0, xUnit = this.yAxisSpacer/this.gap
      ;
      for(let point of this.yDataPoints){
        if(point>=0&&h>=0){
          if(point>=h && !entered){
            entered = true;
            let curH = ((height-this.top)-(index*this.yAxisSpacer)-(this.yAxisSpacer/2));
            yCoord = this.checkPoint(xUnit,h,point,curH);
            break;
          }
        }
        if(point<=0&&h<=0){
          if(point>=h && !entered){
            entered = true;
            let curH = ((height-this.top)-(index*this.yAxisSpacer)-(this.yAxisSpacer/2));
            yCoord = this.checkPoint(xUnit,h,point,curH);
            break;
          }
        }
        index++;
      };
      return yCoord;
    },
    checkAndResetGap(gap,min,max){
      let gapString = '',newgap = 0;
      (gap==0)? newgap=1: newgap=gap;
      gapString=""+newgap;
      if(gapString.length>1){
        let divisor = '1', divisorInt = 0;
        for(let i=0;i<gapString.length-1;i++){
          divisor+='0';
        }
        divisorInt = parseInt(divisor);
        let baseValue = parseInt(gap/divisorInt)*divisorInt;
        newgap = baseValue;
      }
      else{
        if(gap>1){
          if(gap<=5) newgap = 5;
          else newgap = 10;
        }
      }
      this.gap = newgap;
      return newgap;
    },
    getYPositivePoints(gap,max){
      do{
        this.addGapToYPositivePoint(gap);
      }
      while((this.yDataPoints[this.yDataPoints.length-1]+gap)<=max);
      if(this.yDataPoints[this.yDataPoints.length-1]<max) this.addGapToYPositivePoint(gap);
    },
    addGapToYPositivePoint(gap){
      this.yDataPoints.push(this.yDataPoints[this.yDataPoints.length-1]+gap);
    },
    getYNegativePoints(gap,min){
      do{
        this.addGapToYNegativePoint(gap);
      }
      while((this.yDataPoints[this.yDataPoints.length-1]-gap)>=min);
      if(this.yDataPoints[this.yDataPoints.length-1]>min) this.addGapToYNegativePoint(gap);
    },
    addGapToYNegativePoint(gap){
      this.yDataPoints.push(this.yDataPoints[this.yDataPoints.length-1]-gap);
    },
    findMinAndMax(){
      let max = this.categories[0].series[0].value;
      let min = this.categories[0].series[0].value;
      this.categories.forEach((item,i)=>{
        item.series.forEach((category,j)=>{
          if(!(i==0&&j==0)){
            if(min>category.value) min = category.value;
            if(max<category.value) max = category.value;
          }
        });
      });
      return {max,min};
    },
    getYDataPoints(sizeInt){
      let minAndMax = this.findMinAndMax(),
          min = minAndMax.min,
          max = minAndMax.max,
          diff = 0,
          gap = 0
      ;
      if(min<0){
        if(max>0){
          diff = max-min;
        }
        else{
          diff = -1*min;
        }
      }
      else{
        diff = max;
      }
      gap = Math.floor(diff/parseFloat(sizeInt));
      gap = this.checkAndResetGap(gap,min,max);
      this.yDataPoints.push(0);
      if(min<0){
        this.getYNegativePoints(gap,min);
        this.yDataPoints.reverse();
        if(max>0){
          this.getYPositivePoints(gap,max);
        }
      }
      else{
        this.getYPositivePoints(gap,max);
      }
    }
  }
};


const HighLowCloseStockChart = {
  data:function(){
    return {
      precisionApplied4:false,
      stocks:[
        {
          name:'Date 1',
          series:[
            {name:'High',value:55},
            {name:'Low',value:67},
            {name:'Close',value:32}
          ]
        },
        {
          name:'Date 2',
          series:[
            {name:'High',value:57},
            {name:'Low',value:12},
            {name:'Close',value:35}
          ]
        },
        {
          name:'Date 3',
          series:[
            {name:'High',value:-57},
            {name:'Low',value:10},
            {name:'Close',value:34}
          ]
        },
        {
          name:'Date 4',
          series:[
            {name:'High',value:58},
            {name:'Low',value:-11},
            {name:'Close',value:34}
          ]
        },
        {
          name:'Date 5',
          series:[
            {name:'High',value:58},
            {name:'Low',value:35},
            {name:'Close',value:-43}
          ]
        }
      ]
    };
  },
  mixins:[ColumnChartMixin],
  methods:{
    removeDot(){
      for(let i=0;i<this.stocks.length;i++){
        for(let j=0;j<this.stocks[i].series.length;j++){
          if(!this.precisionApplied4){
            if (!Number.MAX_SAFE_INTEGER) {
              Number.MAX_SAFE_INTEGER = 9007199254740991;
            }
            if(!this.safeInteger(this.stocks[i].series[j].value)){
              this.precisionApplied4 = true;
              i=-1;
              break;
            }
          }
          else{
            this.stocks[i].series[j].value = this.stocks[i].series[j].value * 1000;
            this.stocks[i].series[j].value = this.round(this.stocks[i].series[j].value,1000);
          }
        }
      }
    },
    handleResize3(){
      this.xAxisNamingAreaHeight = this.tempXAxisNamingAreaHeight;
      let container = document.getElementById('svg-charts');
      this.tempWidth = container.offsetWidth;
      (this.tempWidth<=700)? this.xAxisNamingAreaHeight = this.xAxisNamingAreaHeight - this.seriesNamingAreaHeight: this.xAxisNamingAreaHeight = this.xAxisNamingAreaHeight;
      this.height = container.offsetHeight - (((this.tempWidth<=700)? this.seriesNamingAreaHeight:0)+this.xAxisNamingAreaHeight+this.titleNamingAreaHeight);
      (this.tempWidth<=700)? this.width = container.offsetWidth - this.yAxisNamingAreaWidth - 10:this.width = container.offsetWidth - (this.yAxisNamingAreaWidth+this.seriesNamingAreaWidth);
      this.left = this.yAxisNamingAreaWidth+5;
      this.yDataPoints = [];
      this.xDataPoints = [];
      this.getYDataPoints(9);
      this.yAxisSpacer = (this.height-(2*this.top))/this.yDataPoints.length;
      this.xDistance = this.width;
      this.xOriginLine = this.determineXAxis();
      this.getXDataPoints();
    },
    findNewHighLow(y){
      let highlow=[y.high.y, y.low.y, y.close.y], min = max = highlow[0];
      for(let i=1; i<highlow.length; i++){
        if(min>highlow[i]) min = highlow[i];
        if(max<highlow[i]) max = highlow[i];
      }
      return [min,max];
    },
    determineLineEndPointsAndCloseMarker(){
      this.xDataPoints.forEach((point,index)=>{
        let highlow = this.findNewHighLow(point.y);
        point.line = Object.assign({},{y1:highlow[0],y2:highlow[1],color:'rgb(31, 86, 99)'});
        point.closeMarker = Object.assign({},{points:(point.x-5)+','+(point.y.close.y)+' '+(point.x+5)+','+(point.y.close.y)+' '+point.x+','+(point.y.close.y-5), color:'rgb(31, 86, 99)'}); //points to draw triangular marker
      });
    },
    getXDataPoints(){
      let categoriesCount = this.categories.length, seriesCount = this.stocks[0].series.length,
          columns = categoriesCount, xAxis = this.determineXAxis(), columnGap = 1
      ;
      if(categoriesCount<=this.maxCategories&&seriesCount<=this.maxSeries){
        this.spaceGap = (this.xDistance-this.left)/(2*parseFloat(columns));
        this.categories.forEach((category,i)=>{
          category.series.forEach((series,j)=>{
            let coord = this.getYCoordinate(series.value);
            if(j!=0){
              if(j==1)
                this.xDataPoints[i].y = Object.assign({},{
                  high:this.xDataPoints[i].y.high,
                  low:{y:(series.value==0)?xAxis:coord,value:series.value,color:'rgb(31, 86, 99)'}
                });
              else
                this.xDataPoints[i].y = Object.assign({},{
                  high:this.xDataPoints[i].y.high,
                  low:this.xDataPoints[i].y.low,
                  close:{y:(series.value==0)?xAxis:coord,value:series.value}
                });
            }
            else{
              if(i==0){
                this.xDataPoints.push({
                  x:this.spaceGap+this.left,
                  y:{},
                  line:{},
                  closeMarker:{}
                });
              }
              else{
                this.xDataPoints.push({
                  x:(2*this.spaceGap)+this.xDataPoints[this.xDataPoints.length-1].x+columnGap,
                  y:{},
                  line:{},
                  closeMarker:{}
                });
              }
              this.xDataPoints[i].y = Object.assign({},{high:{y:(series.value==0)?xAxis:coord,value:series.value,color:'rgb(0, 36, 95)'}});
            }
          });
        });
        this.determineLineEndPointsAndCloseMarker();
      }
    }
  },
  template:
  `
  <div class="block height-100-percent overflow-hidden text-center">
    <div class="block" style="border:1px solid pink;" :style="'height:'+titleNamingAreaHeight+'px;'"></div>
    <template v-if="tempWidth<=700">
      <div class="block" style="border:1px solid pink;" :style="'height:'+seriesNamingAreaHeight+'px;'"></div>
    </template>
    <div class="block row no-white-space" style="font-size:0px;" :style="'height:'+height+'px;'">
      <div class="inline-block align-middle height-100-percent" :style="'width:'+yAxisNamingAreaWidth+'px;'"></div>
      <div class="inline-block align-middle height-100-percent" :style="'width:'+width+'px;'">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="height-100-percent width-100-percent" aria-labelledby="title" role="img">
          <title id="title">Column Chart</title>
          <g stroke="blue">
            <line :x1="left" :x2="left" :y1="top" :y2="height-top"></line>
          </g>
          <g style="font-size: 13px;">
            <template v-if="precisionApplied4">
              <template v-for="(point,index) in yDataPoints">
                <text x="1" :y="((height-top)-(index*yAxisSpacer)-(yAxisSpacer/2)+5)">{{point/1000000}}</text>
              </template>
            </template>
            <template v-else>
              <template v-for="(point,index) in yDataPoints">
                <text x="1" :y="((height-top)-(index*yAxisSpacer)-(yAxisSpacer/2)+5)">{{point}}</text>
              </template>
            </template>
          </g>
          <g stroke="blue">
            <template v-for="(point,index) in yDataPoints">
              <line :x1="left-5" :x2="width" :y1="((height-top)-(index*yAxisSpacer)-(yAxisSpacer/2))" :y2="((height-top)-(index*yAxisSpacer)-(yAxisSpacer/2))" :data-value="point"></line>
            </template>
          </g>
          <g stroke="blue">
            <template v-for="(point,index) in xDataPoints">
              <line :x1="point.x" :x2="point.x" :y1="point.line.y1" :y2="point.line.y2" :data-value="[point.y.high.value,point.y.low.value,point.y.close.value]"></line>
            </template>
          </g>
          <g stroke="green">
            <template v-for="(point,index) in xDataPoints">
              <polygon :points="point.closeMarker.points" :fill="point.closeMarker.color" class="triangle" />
              <line :x1="point.x-5" :x2="point.x+5" :y1="point.y.high.y" :y2="point.y.high.y" :data-value="point.y.high.value" :stroke="point.y.high.color" stroke-width="3"></line>
              <line :x1="point.x-5" :x2="point.x+5" :y1="point.y.low.y" :y2="point.y.low.y" :data-value="point.y.low.value" :stroke="point.y.low.color" stroke-width="3"></line>
            </template>
          </g>
        </svg>
      </div>
      <div class="inline-block align-middle height-100-percent" :style="(tempWidth>700)?'width:'+seriesNamingAreaWidth+'px;':'padding-right:10px;'"></div>
    </div>
    <div class="block" style="border:1px solid pink;" :style="'height:'+xAxisNamingAreaHeight+'px;'"></div>
  </div>
  `,
  mounted:function(){

    this.removeDot();
    this.initialize(this.stocks);
    this.handleResize3();
    window.addEventListener("resize", this.debounce(this.handleResize3,1));
  },
  beforeDestroy: function() {
    window.removeEventListener("resize", this.debounce(this.handleResize3,1));
  }
};

const VolumeHighLowCloseStockChart = {
  data:function(){
    return {
      openDataPoints:[],
      openData:[],
      highlowclose:[],
      xDataPointsOpen:[],
      yAxisSpacerOpen:0,
      gapOpen:0,
      precisionApplied3:false,
      vhlstocks:[
        {
          name:'Date 1',
          series:[
            {name:'Open',value:-440},
            {name:'High',value:55},
            {name:'Low',value:300},
            {name:'Close',value:250}
          ]
        },
        {
          name:'Date 2',
          series:[
            {name:'Open',value:-25},
            {name:'High',value:-57},
            {name:'Low',value:12},
            {name:'Close',value:38}
          ]
        },
        {
          name:'Date 3',
          series:[
            {name:'Open',value:-38},
            {name:'High',value:570},
            {name:'Low',value:-13},
            {name:'Close',value:-50}
          ]
        },
        {
          name:'Date 4',
          series:[
            {name:'Open',value:50},
            {name:'High',value:580},
            {name:'Low',value:11},
            {name:'Close',value:34}
          ]
        },
        {
          name:'Date 5',
          series:[
            {name:'Open',value:34},
            {name:'High',value:-36},
            {name:'Low',value:5},
            {name:'Close',value:18}
          ]
        }
      ]
    };
  },
  mixins:[HighLowCloseStockChart],
  methods:{
    removeDot(){
      for(let i=0;i<this.vhlstocks.length;i++){
        for(let j=0;j<this.vhlstocks[i].series.length;j++){
          if(!this.precisionApplied3){
            if (!Number.MAX_SAFE_INTEGER) {
              Number.MAX_SAFE_INTEGER = 9007199254740991;
            }
            if(!this.safeInteger(this.vhlstocks[i].series[j].value)){
              this.precisionApplied3 = true;
              i=-1;
              break;
            }
          }
          else{
            this.vhlstocks[i].series[j].value = this.vhlstocks[i].series[j].value * 1000;
            this.vhlstocks[i].series[j].value = this.round(this.vhlstocks[i].series[j].value,1000);
          }
        }
      }
    },
    handleResize4(){
      this.xAxisNamingAreaHeight = this.tempXAxisNamingAreaHeight;
      let container = document.getElementById('svg-charts');
      this.tempWidth = container.offsetWidth;
      (this.tempWidth<=700)? this.xAxisNamingAreaHeight = this.xAxisNamingAreaHeight - this.seriesNamingAreaHeight: this.xAxisNamingAreaHeight = this.xAxisNamingAreaHeight;
      this.height = container.offsetHeight - (((this.tempWidth<=700)? this.seriesNamingAreaHeight:0)+this.xAxisNamingAreaHeight+this.titleNamingAreaHeight);
      (this.tempWidth<=700)? this.width = container.offsetWidth - this.yAxisNamingAreaWidth - 10:this.width = container.offsetWidth - (this.yAxisNamingAreaWidth+this.seriesNamingAreaWidth);
      this.left = this.yAxisNamingAreaWidth+5;
      this.yDataPoints = [];
      this.xDataPoints = [];
      this.openDataPoints = [];
      this.xDataPointsOpen = [];
      this.getYDataPoints(9);
      this.yAxisSpacer = (this.height-(2*this.top))/this.yDataPoints.length;
      this.xDistance = this.width-55;
      this.xOriginLine = this.determineXAxis();
      this.getXDataPoints();
      this.getYDataPointsOpen(8);
      this.yAxisSpacerOpen = (this.height-(2*this.top))/this.openDataPoints.length;
      this.getXDataPointsOpen();
    },
    spliceOpenDataPoints(){
      this.vhlstocks.forEach((category,i)=>{
        this.highlowclose[i] = Object.assign({},{name:'',series:[]});
        category.series.forEach((series,j)=>{
          if(j==0){
            this.openData.push(series);
          }
          else{
            let copy = JSON.parse(JSON.stringify(series));
            this.highlowclose[i].series.push(series);
          }
        })
      })
    },
    checkOpenPoint(height,xUnit,h,point,curH){
      let yCoord = 0;
      if(point==h){
        yCoord = curH;
      }
      else{
        for(let i=1;i<=this.gapOpen;i++){
          if((point-i)==h){
            yCoord = curH+(i*xUnit);
            break;
          }
        }
      }
      return yCoord;
    },
    getOpenYCoordinate(h){
      let height = this.height, index = 0,
          entered = false, yCoord = 0, xUnit = this.yAxisSpacerOpen/this.gapOpen
      ;
      for(let point of this.openDataPoints){
        if(point>=0&&h>=0){
          if(point>=h && !entered){
            entered = true;
            let curH = ((height-this.top)-(index*this.yAxisSpacerOpen)-(this.yAxisSpacerOpen/2));
            yCoord = this.checkOpenPoint(height,xUnit,h,point,curH);
            break;
          }
        }
        if(point<=0&&h<=0){
          if(point>=h && !entered){
            entered = true;
            let curH = ((height-this.top)-(index*this.yAxisSpacerOpen)-(this.yAxisSpacerOpen/2));
            yCoord = this.checkOpenPoint(height,xUnit,h,point,curH);
            break;
          }
        }
        index++;
      };
      return yCoord;
    },
    checkAndResetGapOpen(gap,min,max){
      let gapString = '',newgap = 0;
      (gap==0)? newgap=1: newgap=gap;
      gapString=""+newgap;
      if(gapString.length>1){
        let divisor = '1', divisorInt = 0;
        for(let i=0;i<gapString.length-1;i++){
          divisor+='0';
        }
        divisorInt = parseInt(divisor);
        let baseValue = Math.floor(gap/divisorInt)*divisorInt, rem=gap-baseValue;
        if(rem<=(divisorInt/2)) newgap = baseValue+(divisorInt/2);
        else newgap = baseValue+divisorInt;
      }
      else{
        if(gap>1){
          if(gap<=5) newgap = 5;
          else newgap = 10;
        }
      }
      this.gapOpen = newgap;
      return newgap;
    },
    getYPositivePointsOpen(gap,max){
      do{
        this.addGapToYPositivePointOpen(gap);
      }
      while((this.openDataPoints[this.openDataPoints.length-1]+gap)<=max);
      if(this.openDataPoints[this.openDataPoints.length-1]<max) this.addGapToYPositivePointOpen(gap);
    },
    addGapToYPositivePointOpen(gap){
      this.openDataPoints.push(this.openDataPoints[this.openDataPoints.length-1]+gap);
    },
    getYNegativePointsOpen(gap,min){
      do{
        this.addGapToYNegativePointOpen(gap);
      }
      while((this.openDataPoints[this.openDataPoints.length-1]-gap)>=min);
      if(this.openDataPoints[this.openDataPoints.length-1]>min) this.addGapToYNegativePointOpen(gap);
    },
    addGapToYNegativePointOpen(gap){
      this.openDataPoints.push(this.openDataPoints[this.openDataPoints.length-1]-gap);
    },
    getYDataPointsOpen(sizeInt){
      let minAndMax = this.findMinAndMaxOpen(),
          min = minAndMax.min,
          max = minAndMax.max,
          diff = 0,
          gap = 0
      ;
      if(min<0){
        if(max>0){
          diff = max-min;
        }
        else{
          diff = -1*min;
        }
      }
      else{
        diff = max;
      }
      gap = Math.floor(diff/parseFloat(sizeInt));
      gap = this.checkAndResetGapOpen(gap,min,max);
      this.openDataPoints.push(0);
      if(min<0){
        this.getYNegativePointsOpen(gap,min);
        this.openDataPoints.reverse();
        if(max>0){
          this.getYPositivePointsOpen(gap,max);
        }
      }
      else{
        this.getYPositivePointsOpen(gap,max);
      }
    },
    findMinAndMaxOpen(){
      let max = this.openData[0].value;
      let min = this.openData[0].value;
      this.openData.forEach((item,i)=>{
        if(i!=0){
          if(min>item.value) min = item.value;
          if(max<item.value) max = item.value;
        }
      });
      return {max,min};
    },
    determineXAxisOpen(){
      let xH = 0, h = this.height, index = 0;
      for(let point of this.openDataPoints){
        if(point==0){
          xH = ((h-this.top)-(index*this.yAxisSpacerOpen)-(this.yAxisSpacerOpen/2));
          break;
        }
        index++;
      }
      return xH;
    },
    getXDataPointsOpen(){
      let categoriesCount = this.openData.length,space = 2*categoriesCount, columnGap = 0, xAxis = this.determineXAxisOpen();
      if(categoriesCount<=this.maxCategories){
        (this.spaceGap/2>50)? columnGap = 40: columnGap = this.spaceGap/2;
        this.openData.forEach((series,i)=>{
          let coord = this.getOpenYCoordinate(series.value);
          this.xDataPointsOpen.push({
            x:this.xDataPoints[i].x-(columnGap/2),
            w:columnGap,
            y:(series.value>0)?coord:xAxis,
            h:(series.value>0)?xAxis-coord:((series.value==0)?0.1:coord-xAxis),
            value:series.value,
            stroke:this.colors[0].color
          });
        });
      }
    }
  },
  template:
  `
  <div class="block height-100-percent overflow-hidden text-center">
    <div class="block" style="border:1px solid pink;" :style="'height:'+titleNamingAreaHeight+'px;'"></div>
    <template v-if="tempWidth<=700">
      <div class="block" style="border:1px solid pink;" :style="'height:'+seriesNamingAreaHeight+'px;'"></div>
    </template>
    <div class="block row no-white-space" style="font-size:0px;" :style="'height:'+height+'px;'">
      <div class="inline-block align-middle height-100-percent" :style="'width:'+yAxisNamingAreaWidth+'px;'"></div>
      <div class="inline-block align-middle height-100-percent" :style="'width:'+width+'px;'">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="height-100-percent width-100-percent" aria-labelledby="title" role="img">
          <title id="title">Column Chart</title>
          <g stroke="blue">
            <line :x1="xDistance" :x2="xDistance" :y1="top" :y2="height-top"></line>
          </g>
          <g stroke="blue">
            <line :x1="left" :x2="left" :y1="top" :y2="height-top"></line>
          </g>
          <g stroke="blue">
            <template v-for="(point,index) in openDataPoints">
              <line :x1="left-5" :x2="xDistance" :y1="((height-top)-(index*yAxisSpacerOpen)-(yAxisSpacerOpen/2))" :y2="((height-top)-(index*yAxisSpacerOpen)-(yAxisSpacer/2))" :data-value="point"></line>
            </template>
          </g>
          <g style="font-size: 13px;">
            <template v-if="precisionApplied3">
              <template v-for="(point,index) in openDataPoints">
                <text x="1" :y="((height-top)-(index*yAxisSpacerOpen)-(yAxisSpacerOpen/2)+5)">{{point/1000000}}</text>
              </template>
            </template>
            <template v-else>
              <template v-for="(point,index) in openDataPoints">
                <text x="1" :y="((height-top)-(index*yAxisSpacerOpen)-(yAxisSpacerOpen/2)+5)">{{point}}</text>
              </template>
            </template>
          </g>
          <g fill-opacity="0.5">
            <template v-for="(point,index) in xDataPointsOpen">
              <rect :x="point.x" :y="point.y" :width="point.w" :height="point.h" :data-value="point.value" :style="'fill:'+point.stroke+';'" :stroke="point.stroke" />
            </template>
          </g>
          <g style="font-size: 13px;">
            <template v-if="precisionApplied3">
              <template v-for="(point,index) in yDataPoints">
                <text :x="xDistance+10" :y="((height-top)-(index*yAxisSpacer)-(yAxisSpacer/2)+5)">{{point/1000000}}</text>
              </template>
            </template>
            <template>
              <template v-for="(point,index) in yDataPoints">
                <text :x="xDistance+10" :y="((height-top)-(index*yAxisSpacer)-(yAxisSpacer/2)+5)">{{point}}</text>
              </template>
            </template>
          </g>
          <g stroke="blue">
            <template v-for="(point,index) in yDataPoints">
              <line :x1="xDistance-5" :x2="xDistance+5" :y1="((height-top)-(index*yAxisSpacer)-(yAxisSpacer/2))" :y2="((height-top)-(index*yAxisSpacer)-(yAxisSpacer/2))" :data-value="point"></line>
            </template>
          </g>
          <g stroke="blue">
            <template v-for="(point,index) in xDataPoints">
              <line :x1="point.x" :x2="point.x" :y1="point.line.y1" :y2="point.line.y2" :data-value="[point.y.high.value,point.y.low.value,point.y.close.value]"></line>
            </template>
          </g>
          <g stroke="green">
            <template v-for="(point,index) in xDataPoints">
              <polygon :points="point.closeMarker.points" :fill="point.closeMarker.color" class="triangle" />
              <line :x1="point.x-5" :x2="point.x+5" :y1="point.y.high.y" :y2="point.y.high.y" :data-value="point.y.high.value" :stroke="point.y.high.color" stroke-width="3"></line>
              <line :x1="point.x-5" :x2="point.x+5" :y1="point.y.low.y" :y2="point.y.low.y" :data-value="point.y.low.value" :stroke="point.y.low.color" stroke-width="3"></line>
            </template>
          </g>
        </svg>
      </div>
      <div class="inline-block align-middle height-100-percent" :style="(tempWidth>700)?'width:'+seriesNamingAreaWidth+'px;':'padding-right:10px;'"></div>
    </div>
    <div class="block" style="border:1px solid pink;" :style="'height:'+xAxisNamingAreaHeight+'px;'"></div>
  </div>
  `,
  mounted:function(){
    this.removeDot();
    this.spliceOpenDataPoints();
    this.initialize(this.highlowclose);
    this.handleResize4();
    window.addEventListener("resize", this.debounce(this.handleResize4,1));
  },
  beforeDestroy: function() {
    window.removeEventListener("resize", this.debounce(this.handleResize4,1));
  }
};

const OpenHighLowCloseStockChart = {
  data:function(){
    return {
      precisionApplied2:false,
      ohlcstocks:[
        {
          name:'Date 1',
          series:[
            {name:'Series 2',value:2.4},
            {name:'Series 3',value:2},
            {name:'Series 4',value:8},
            {name:'Series 5',value:7}
          ]
        },
        {
          name:'Date 2',
          series:[
            {name:'Series 2',value:4.4},
            {name:'Series 3',value:2},
            {name:'Series 4',value:5},
            {name:'Series 5',value:2}
          ]
        },
        {
          name:'Date 3',
          series:[
            {name:'Series 2',value:1.8},
            {name:'Series 3',value:3},
            {name:'Series 4',value:5},
            {name:'Series 5',value:1}
          ]
        },
        {
          name:'Date 4',
          series:[
            {name:'Series 2',value:2.8},
            {name:'Series 3',value:5},
            {name:'Series 4',value:4},
            {name:'Series 5',value:3}
          ]
        }
      ]
    };
  },
  methods:{
    removeDot(){
      for(let i=0;i<this.ohlcstocks.length;i++){
        for(let j=0;j<this.ohlcstocks[i].series.length;j++){
          if(!this.precisionApplied2){
            if (!Number.MAX_SAFE_INTEGER) {
              Number.MAX_SAFE_INTEGER = 9007199254740991;
            }
            if(!this.safeInteger(this.ohlcstocks[i].series[j].value)){
              this.precisionApplied2 = true;
              i=-1;
              break;
            }
          }
          else{
            this.ohlcstocks[i].series[j].value = this.ohlcstocks[i].series[j].value * 1000;
            this.ohlcstocks[i].series[j].value = this.round(this.ohlcstocks[i].series[j].value,1000);
          }
        }
      }
    },
    handleResize5(){
      this.xAxisNamingAreaHeight = this.tempXAxisNamingAreaHeight;
      let container = document.getElementById('svg-charts');
      this.tempWidth = container.offsetWidth;
      (this.tempWidth<=700)? this.xAxisNamingAreaHeight = this.xAxisNamingAreaHeight - this.seriesNamingAreaHeight: this.xAxisNamingAreaHeight = this.xAxisNamingAreaHeight;
      this.height = container.offsetHeight - (((this.tempWidth<=700)? this.seriesNamingAreaHeight:0)+this.xAxisNamingAreaHeight+this.titleNamingAreaHeight);
      (this.tempWidth<=700)? this.width = container.offsetWidth - this.yAxisNamingAreaWidth - 10:this.width = container.offsetWidth - (this.yAxisNamingAreaWidth+this.seriesNamingAreaWidth);
      this.left = this.yAxisNamingAreaWidth+5;
      this.yDataPoints = [];
      this.xDataPoints = [];
      this.getYDataPoints(9);
      this.yAxisSpacer = (this.height-(2*this.top))/this.yDataPoints.length;
      this.xDistance = this.width;
      this.xOriginLine = this.determineXAxis();
      this.getXDataPoints();
    },
    determineOpenAndCloseFilling(){
      let columnGap = 0;
      (this.spaceGap/2>50)? columnGap = 40: columnGap = this.spaceGap/2;
      this.xDataPoints.forEach((item,i)=>{
        if(item.y.open.y<item.y.close.y) {
          max = item.y.close.y;
          item.openClose = Object.assign({},{
            fill:true,
            x:item.x-(columnGap/2),
            w:columnGap,
            y:item.y.open.y,
            h:((item.y.close.y-item.y.open.y)>0)?(item.y.close.y-item.y.open.y):0.1,
            color:this.colors[0].color
          });
          if((item.y.open.y>item.y.low.y)&&(item.y.open.y>item.y.high.y)){
            if(item.y.low.y<item.y.high.y){
              item.y.high.y = item.y.open.y;
            }
            else{
              item.y.low.y = item.y.open.y;
            }
          }
          if((item.y.close.y<item.y.low.y)&&(item.y.close.y<item.y.high.y)){
            if(item.y.low.y<item.y.high.y){
              item.y.high.y = item.y.close.y;
            }
            else{
              item.y.low.y = item.y.close.y;
            }
          }
        }
        else{
          item.openClose = Object.assign({},{
            fill:false,
            x:item.x-(columnGap/2),
            w:columnGap,
            y:item.y.close.y,
            h:((item.y.open.y-item.y.close.y)>0)?(item.y.open.y-item.y.close.y):0.1
          });
          if((item.y.open.y<item.y.low.y)&&(item.y.open.y<item.y.high.y)){
            if(item.y.low.y<item.y.high.y){
              item.y.low.y = item.y.open.y;
            }
            else{
              item.y.high.y = item.y.open.y;
            }
          }
          if((item.y.close.y>item.y.low.y)&&(item.y.close.y>item.y.high.y)){
            if(item.y.low.y<item.y.high.y){
              item.y.high.y = item.y.close.y;
            }
            else{
              item.y.low.y = item.y.close.y;
            }
          }
        }
      });
    },
    getXDataPoints(){
      let categoriesCount = this.ohlcstocks.length, seriesCount = this.ohlcstocks[0].series.length,
          columns = categoriesCount, xAxis = this.determineXAxis(), columnGap = 1
      ;
      if(categoriesCount<=this.maxCategories&&seriesCount<=this.maxSeries){
        this.spaceGap = (this.xDistance-this.left)/(2*parseFloat(columns));
        this.categories.forEach((category,i)=>{
          category.series.forEach((series,j)=>{
            let coord = this.getYCoordinate(series.value);
            if(j!=0){
              if(j==1)
                this.xDataPoints[i].y = Object.assign({},{
                  open:this.xDataPoints[i].y.open,
                  high:{y:(series.value==0)?xAxis:coord,value:series.value}
                });
              else if(j==2)
                this.xDataPoints[i].y = Object.assign({},{
                  open:this.xDataPoints[i].y.open,
                  high:this.xDataPoints[i].y.high,
                  low:{y:(series.value==0)?xAxis:coord,value:series.value}
                });
              else
                this.xDataPoints[i].y = Object.assign({},{
                  open:this.xDataPoints[i].y.open,
                  high:this.xDataPoints[i].y.high,
                  low:this.xDataPoints[i].y.low,
                  close:{y:(series.value==0)?xAxis:coord,value:series.value}
                });
            }
            else{
              if(i==0){
                this.xDataPoints.push({
                  x:this.spaceGap+this.left,
                  y:{},
                  openClose:{}
                });
              }
              else{
                this.xDataPoints.push({
                  x:(2*this.spaceGap)+this.xDataPoints[this.xDataPoints.length-1].x+columnGap,
                  y:{},
                  openClose:{}
                });
              }
              this.xDataPoints[i].y = Object.assign({},{open:{y:(series.value==0)?xAxis:coord,value:series.value}});
            }
          });
        });
        this.determineOpenAndCloseFilling();
      }
    }
  },
  mixins:[ColumnChartMixin],
  template:
  `
  <div class="block height-100-percent overflow-hidden text-center">
    <div class="block" style="border:1px solid pink;" :style="'height:'+titleNamingAreaHeight+'px;'"></div>
    <template v-if="tempWidth<=700">
      <div class="block" style="border:1px solid pink;" :style="'height:'+seriesNamingAreaHeight+'px;'"></div>
    </template>
    <div class="block row no-white-space" style="font-size:0px;" :style="'height:'+height+'px;'">
      <div class="inline-block align-middle height-100-percent" :style="'width:'+yAxisNamingAreaWidth+'px;'"></div>
      <div class="inline-block align-middle height-100-percent" :style="'width:'+width+'px;'">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="height-100-percent width-100-percent" aria-labelledby="title" role="img">
          <title id="title">Column Chart</title>
          <g stroke="blue">
            <line :x1="left" :x2="left" :y1="top" :y2="height-top"></line>
          </g>
          <g style="font-size: 13px;">
            <template v-if="precisionApplied2">
              <template v-for="(point,index) in yDataPoints">
                <text x="1" :y="((height-top)-(index*yAxisSpacer)-(yAxisSpacer/2)+5)">{{point/1000}}</text>
              </template>
            </template>
            <template v-else>
              <template v-for="(point,index) in yDataPoints">
                <text x="1" :y="((height-top)-(index*yAxisSpacer)-(yAxisSpacer/2)+5)">{{point}}</text>
              </template>
            </template>
          </g>
          <g stroke="blue">
            <template v-for="(point,index) in yDataPoints">
              <line :x1="left-5" :x2="width" :y1="((height-top)-(index*yAxisSpacer)-(yAxisSpacer/2))" :y2="((height-top)-(index*yAxisSpacer)-(yAxisSpacer/2))" :data-value="point"></line>
            </template>
          </g>
          <g stroke="blue">
            <template v-for="(point,index) in xDataPoints">
              <line :x1="point.x" :x2="point.x" :y1="point.y.low.y" :y2="point.y.high.y" :data-value="[point.y.high.value,point.y.low.value]"></line>
            </template>
          </g>
          <g fill-opacity="1">
            <template v-for="(point,index) in xDataPoints">
              <rect :x="point.openClose.x" :y="point.openClose.y" :style="(point.openClose.fill)?'fill:'+point.openClose.color+';':'fill:yellow;' " :width="point.openClose.w" :height="point.openClose.h" :data-value="[point.y.open.value,point.y.close.value]" />
            </template>
          </g>
        </svg>
      </div>
      <div class="inline-block align-middle height-100-percent" :style="(tempWidth>700)?'width:'+seriesNamingAreaWidth+'px;':'padding-right:10px;'"></div>
    </div>
    <div class="block" style="border:1px solid pink;" :style="'height:'+xAxisNamingAreaHeight+'px;'"></div>
  </div>
  `,
  mounted:function(){
    this.removeDot();
    this.initialize(this.ohlcstocks);
    this.handleResize5();
    window.addEventListener("resize", this.debounce(this.handleResize5,1));
  },
  beforeDestroy: function() {
    window.removeEventListener("resize", this.debounce(this.handleResize5,1));
  }
};

const VolumeOpenHighLowCloseStockChart = {
  data:function(){
    return {
      openDataPoints:[],
      openData:[],
      highlowclose:[],
      xDataPointsOpen:[],
      yAxisSpacerOpen:0,
      gapOpen:0,
      precisionApplied1:false,
      vstocks:[
        {
          name:'Date 1',
          series:[
            {name:'Series 1',value:-4.3},
            {name:'Series 2',value:2.4},
            {name:'Series 3',value:2},
            {name:'Series 4',value:8},
            {name:'Series 5',value:7}
          ]
        },
        {
          name:'Date 2',
          series:[
            {name:'Series 1',value:-2.5},
            {name:'Series 2',value:4.4},
            {name:'Series 3',value:2},
            {name:'Series 4',value:5},
            {name:'Series 5',value:2}
          ]
        },
        {
          name:'Date 3',
          series:[
            {name:'Series 1',value:3.5},
            {name:'Series 2',value:1.8},
            {name:'Series 3',value:3},
            {name:'Series 4',value:5},
            {name:'Series 5',value:1}
          ]
        },
        {
          name:'Date 4',
          series:[
            {name:'Series 1',value:-4.5},
            {name:'Series 2',value:2.8},
            {name:'Series 3',value:5},
            {name:'Series 4',value:4},
            {name:'Series 5',value:3}
          ]
        }
      ]
    };
  },
  mixins:[OpenHighLowCloseStockChart],
  methods:{
    removeDot(){
      for(let i=0;i<this.vstocks.length;i++){
        for(let j=0;j<this.vstocks[i].series.length;j++){
          if(!this.precisionApplied1){
            if (!Number.MAX_SAFE_INTEGER) {
              Number.MAX_SAFE_INTEGER = 9007199254740991;
            }
            if(!this.safeInteger(this.vstocks[i].series[j].value)){
              this.precisionApplied1 = true;
              i=-1;
              break;
            }
          }
          else{
            this.vstocks[i].series[j].value = this.vstocks[i].series[j].value * 1000;
            this.vstocks[i].series[j].value = this.round(this.vstocks[i].series[j].value,1000);
          }
        }
      }
    },
    handleResize6(){
      this.xAxisNamingAreaHeight = this.tempXAxisNamingAreaHeight;
      let container = document.getElementById('svg-charts');
      this.tempWidth = container.offsetWidth;
      (this.tempWidth<=700)? this.xAxisNamingAreaHeight = this.xAxisNamingAreaHeight - this.seriesNamingAreaHeight: this.xAxisNamingAreaHeight = this.xAxisNamingAreaHeight;
      this.height = container.offsetHeight - (((this.tempWidth<=700)? this.seriesNamingAreaHeight:0)+this.xAxisNamingAreaHeight+this.titleNamingAreaHeight);
      (this.tempWidth<=700)? this.width = container.offsetWidth - this.yAxisNamingAreaWidth - 10:this.width = container.offsetWidth - (this.yAxisNamingAreaWidth+this.seriesNamingAreaWidth);
      this.left = this.yAxisNamingAreaWidth+5;
      this.yDataPoints = [];
      this.xDataPoints = [];
      this.openDataPoints = [];
      this.xDataPointsOpen = [];
      this.getYDataPoints(8);
      this.yAxisSpacer = (this.height-(2*this.top))/this.yDataPoints.length;
      this.xDistance = this.width-55;
      this.xOriginLine = this.determineXAxis();
      this.getXDataPoints();
      this.getYDataPointsOpen(9);
      this.yAxisSpacerOpen = (this.height-(2*this.top))/this.openDataPoints.length;
      this.getXDataPointsOpen();
    },
    spliceOpenDataPoints(){
      this.vstocks.forEach((category,i)=>{
        this.highlowclose[i] = Object.assign({},{name:'',series:[]});
        category.series.forEach((series,j)=>{
          if(j==0){
            this.openData.push(series);
          }
          else{
            let copy = JSON.parse(JSON.stringify(series));
            this.highlowclose[i].series.push(series);
          }
        })
      })
    },
    checkOpenPoint(height,xUnit,h,point,curH){
      let yCoord = 0;
      if(point==h){
        yCoord = curH;
      }
      else{
        for(let i=1;i<=this.gapOpen;i++){
          if((point-i)==h){
            yCoord = curH+(i*xUnit);
            break;
          }
        }
      }
      return yCoord;
    },
    getOpenYCoordinate(h){
      let height = this.height, index = 0,
          entered = false, yCoord = 0, xUnit = this.yAxisSpacerOpen/this.gapOpen
      ;
      for(let point of this.openDataPoints){
        if(point>=0&&h>=0){
          if(point>=h && !entered){
            entered = true;
            let curH = ((height-this.top)-(index*this.yAxisSpacerOpen)-(this.yAxisSpacerOpen/2));
            yCoord = this.checkOpenPoint(height,xUnit,h,point,curH);
            break;
          }
        }
        if(point<=0&&h<=0){
          if(point>=h && !entered){
            entered = true;
            let curH = ((height-this.top)-(index*this.yAxisSpacerOpen)-(this.yAxisSpacerOpen/2));
            yCoord = this.checkOpenPoint(height,xUnit,h,point,curH);
            break;
          }
        }
        index++;
      };
      return yCoord;
    },
    checkAndResetGapOpen(gap,min,max){
      let gapString = '',newgap = 0;
      (gap==0)? newgap=1: newgap=gap;
      gapString=""+newgap;
      if(gapString.length>1){
        let divisor = '1', divisorInt = 0;
        for(let i=0;i<gapString.length-1;i++){
          divisor+='0';
        }
        divisorInt = parseInt(divisor);
        let baseValue = Math.floor(gap/divisorInt)*divisorInt, rem=gap-baseValue;
        if(rem<=(divisorInt/2)) newgap = baseValue+(divisorInt/2);
        else newgap = baseValue+divisorInt;
      }
      else{
        if(gap>1){
          if(gap<=5) newgap = 5;
          else newgap = 10;
        }
      }
      this.gapOpen = newgap;
      return newgap;
    },
    getYPositivePointsOpen(gap,max){
      do{
        this.addGapToYPositivePointOpen(gap);
      }
      while((this.openDataPoints[this.openDataPoints.length-1]+gap)<=max);
      if(this.openDataPoints[this.openDataPoints.length-1]<max) this.addGapToYPositivePointOpen(gap);
    },
    addGapToYPositivePointOpen(gap){
      this.openDataPoints.push(this.openDataPoints[this.openDataPoints.length-1]+gap);
    },
    getYNegativePointsOpen(gap,min){
      do{
        this.addGapToYNegativePointOpen(gap);
      }
      while((this.openDataPoints[this.openDataPoints.length-1]-gap)>=min);
      if(this.openDataPoints[this.openDataPoints.length-1]>min) this.addGapToYNegativePointOpen(gap);
    },
    addGapToYNegativePointOpen(gap){
      this.openDataPoints.push(this.openDataPoints[this.openDataPoints.length-1]-gap);
    },
    getYDataPointsOpen(sizeInt){
      let minAndMax = this.findMinAndMaxOpen(),
          min = minAndMax.min,
          max = minAndMax.max,
          diff = 0,
          gap = 0
      ;
      if(min<0){
        if(max>0){
          diff = max-min;
        }
        else{
          diff = -1*min;
        }
      }
      else{
        diff = max;
      }
      gap = Math.floor(diff/parseFloat(sizeInt));
      gap = this.checkAndResetGapOpen(gap,min,max);
      this.openDataPoints.push(0);
      if(min<0){
        this.getYNegativePointsOpen(gap,min);
        this.openDataPoints.reverse();
        if(max>0){
          this.getYPositivePointsOpen(gap,max);
        }
      }
      else{
        this.getYPositivePointsOpen(gap,max);
      }
    },
    findMinAndMaxOpen(){
      let max = this.openData[0].value;
      let min = this.openData[0].value;
      this.openData.forEach((item,i)=>{
        if(i!=0){
          if(min>item.value) min = item.value;
          if(max<item.value) max = item.value;
        }
      });
      return {max,min};
    },
    determineXAxisOpen(){
      let xH = 0, h = this.height, index = 0;
      for(let point of this.openDataPoints){
        if(point==0){
          xH = ((h-this.top)-(index*this.yAxisSpacerOpen)-(this.yAxisSpacerOpen/2));
          break;
        }
        index++;
      }
      return xH;
    },
    getXDataPointsOpen(){
      let categoriesCount = this.openData.length, xAxis = this.determineXAxisOpen();
      if(categoriesCount<=this.maxCategories){
        this.openData.forEach((series,i)=>{
          let coord = this.getOpenYCoordinate(series.value);
          this.xDataPointsOpen.push({
            x:this.xDataPoints[i].openClose.x,
            w:this.xDataPoints[i].openClose.w,
            y:(series.value>0)?coord:xAxis,
            h:(series.value>0)?xAxis-coord:((series.value==0)?0.1:coord-xAxis),
            value:series.value,
            stroke:this.colors[0].color
          });
        });
      }
    }
  },
  template:
  `
  <div class="block height-100-percent overflow-hidden text-center">
    <div class="block" style="border:1px solid pink;" :style="'height:'+titleNamingAreaHeight+'px;'"></div>
    <template v-if="tempWidth<=700">
      <div class="block" style="border:1px solid pink;" :style="'height:'+seriesNamingAreaHeight+'px;'"></div>
    </template>
    <div class="block row no-white-space" style="font-size:0px;" :style="'height:'+height+'px;'">
      <div class="inline-block align-middle height-100-percent" :style="'width:'+yAxisNamingAreaWidth+'px;'"></div>
      <div class="inline-block align-middle height-100-percent" :style="'width:'+width+'px;'">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="height-100-percent width-100-percent" aria-labelledby="title" role="img">
          <title id="title">Column Chart</title>
          <g stroke="blue">
            <line :x1="left" :x2="left" :y1="top" :y2="height-top"></line>
          </g>
          <g stroke="blue">
            <line :x1="xDistance" :x2="xDistance" :y1="top" :y2="height-top"></line>
          </g>
          <g style="font-size: 13px;">
            <template v-if="precisionApplied1">
              <template v-for="(point,index) in yDataPoints">
                <text :x="xDistance+10" :y="((height-top)-(index*yAxisSpacer)-(yAxisSpacer/2)+5)">{{point/1000}}</text>
              </template>
            </template>
            <template v-else>
              <template v-for="(point,index) in yDataPoints">
                <text :x="xDistance+10" :y="((height-top)-(index*yAxisSpacer)-(yAxisSpacer/2)+5)">{{point}}</text>
              </template>
            </template>
          </g>
          <g stroke="blue">
            <template v-for="(point,index) in openDataPoints">
              <line :x1="left-5" :x2="xDistance" :y1="((height-top)-(index*yAxisSpacerOpen)-(yAxisSpacerOpen/2))" :y2="((height-top)-(index*yAxisSpacerOpen)-(yAxisSpacerOpen/2))" :data-value="point"></line>
            </template>
          </g>
          <g style="font-size: 13px;">
            <template v-if="precisionApplied1">
              <template v-for="(point,index) in openDataPoints">
                <text x="1" :y="((height-top)-(index*yAxisSpacerOpen)-(yAxisSpacerOpen/2)+5)">{{point/1000}}</text>
              </template>
            </template>
            <template v-else>
              <template v-for="(point,index) in openDataPoints">
                <text x="1" :y="((height-top)-(index*yAxisSpacerOpen)-(yAxisSpacerOpen/2)+5)">{{point}}</text>
              </template>
            </template>
          </g>
          <g fill-opacity="0.5">
            <template v-for="(point,index) in xDataPointsOpen">
              <rect :x="point.x" :y="point.y" :width="point.w" :height="point.h" :data-value="point.value" :style="'fill:'+point.stroke+';'" :stroke="point.stroke" />
            </template>
          </g>
          <g stroke="blue">
            <template v-for="(point,index) in yDataPoints">
              <line :x1="xDistance-5" :x2="xDistance+5" :y1="((height-top)-(index*yAxisSpacer)-(yAxisSpacerOpen/2))" :y2="((height-top)-(index*yAxisSpacer)-(yAxisSpacerOpen/2))" :data-value="point"></line>
            </template>
          </g>
          <g stroke="blue">
            <template v-for="(point,index) in xDataPoints">
              <line :x1="point.x" :x2="point.x" :y1="point.y.low.y" :y2="point.y.high.y" :data-value="[point.y.high.value,point.y.low.value]"></line>
            </template>
          </g>
          <g fill-opacity="1">
            <template v-for="(point,index) in xDataPoints">
              <rect :x="point.openClose.x" :y="point.openClose.y" :style="(point.openClose.fill)?'fill:'+point.openClose.color+';':'fill:yellow;' " :width="point.openClose.w" :height="point.openClose.h" :data-value="[point.y.open.value,point.y.close.value]" />
            </template>
          </g>
        </svg>
      </div>
      <div class="inline-block align-middle height-100-percent" :style="(tempWidth>700)?'width:'+seriesNamingAreaWidth+'px;':'padding-right:10px;'"></div>
    </div>
    <div class="block" style="border:1px solid pink;" :style="'height:'+xAxisNamingAreaHeight+'px;'"></div>
  </div>
  `,
  mounted:function(){
    this.removeDot();
    this.spliceOpenDataPoints();
    this.initialize(this.highlowclose);
    this.handleResize6();
    window.addEventListener("resize", this.debounce(this.handleResize6,1));
  },
  beforeDestroy: function() {
    window.removeEventListener("resize", this.debounce(this.handleResize6,1));
  }
};


new Vue({
  el: "#svg-charts",
  components:{
    'svg-charts-1':HighLowCloseStockChart,
    'svg-charts-2':VolumeHighLowCloseStockChart,
    'svg-charts-3':OpenHighLowCloseStockChart,
    'svg-charts-4':VolumeOpenHighLowCloseStockChart
  }
});
