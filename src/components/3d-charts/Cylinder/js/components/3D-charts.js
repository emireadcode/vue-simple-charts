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


const ThreeDColumnChart = {
  data:function(){
    return {
      ymin:0,
      ymax:0,
      xmin:0,
      xmax:0,
      columnPlot:[],
      depth:100.0,
      thetha:0,
      ythetha:0,
      category:[
        {
          name:'Category 1',
          series:[
            {
              name:'Series 1',
              value:7110
            },
            {
              name:'Series 2',
              value:8240
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
              value:-3
            },
            {
              name:'Series 4',
              value:0
            }
          ]
        }
      ],
      yCoordinate:[],
      xCoordinate:[],
      index:0,
      shiftAngle:0
    };
  },
  mixins:[ColumnChartMixin],
  methods:{
    handleResize10(){
      this.thetha = 20*Math.PI/180;
      this.ythetha = 10*Math.PI/180;
      this.xAxisNamingAreaHeight = this.tempXAxisNamingAreaHeight;
      let container = document.getElementById('svg-charts');
      this.tempWidth = container.offsetWidth;
      (this.tempWidth<=700)? this.xAxisNamingAreaHeight = this.xAxisNamingAreaHeight - this.seriesNamingAreaHeight: this.xAxisNamingAreaHeight = this.xAxisNamingAreaHeight;
      this.height = container.offsetHeight - (((this.tempWidth<=700)? this.seriesNamingAreaHeight:0)+this.xAxisNamingAreaHeight+this.titleNamingAreaHeight);
      (this.tempWidth<=700)? this.width = container.offsetWidth - 10:this.width = container.offsetWidth - this.seriesNamingAreaWidth;
      this.left = this.yAxisNamingAreaWidth;
      this.yDataPoints = [];
      this.xDistance = this.width - this.left;
      this.top = 65;
      this.yCoordinate = [];
      this.xCoordinate = [];
      this.xDataPoints = [];
      this.columnPlot = [];
      this.index = 0;
      this.shiftAngle = 0;
      this.getYDataPointsCoordinate();
      let xOriginLine = this.yDetermineXAxis();
      this.xOriginLine = xOriginLine.xOriginLine;
      this.index = xOriginLine.index;
      this.getXDataPointsCoordinate();
      this.findShiftAngle();
      this.getXDataPoints();
    },
    measureText(str, fontSize = 10) {
      const widths = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.2796875,0.2765625,0.3546875,0.5546875,0.5546875,0.8890625,0.665625,0.190625,0.3328125,0.3328125,0.3890625,0.5828125,0.2765625,0.3328125,0.2765625,0.3015625,0.5546875,0.5546875,0.5546875,0.5546875,0.5546875,0.5546875,0.5546875,0.5546875,0.5546875,0.5546875,0.2765625,0.2765625,0.584375,0.5828125,0.584375,0.5546875,1.0140625,0.665625,0.665625,0.721875,0.721875,0.665625,0.609375,0.7765625,0.721875,0.2765625,0.5,0.665625,0.5546875,0.8328125,0.721875,0.7765625,0.665625,0.7765625,0.721875,0.665625,0.609375,0.721875,0.665625,0.94375,0.665625,0.665625,0.609375,0.2765625,0.3546875,0.2765625,0.4765625,0.5546875,0.3328125,0.5546875,0.5546875,0.5,0.5546875,0.5546875,0.2765625,0.5546875,0.5546875,0.221875,0.240625,0.5,0.221875,0.8328125,0.5546875,0.5546875,0.5546875,0.5546875,0.3328125,0.5,0.2765625,0.5546875,0.5,0.721875,0.5,0.5,0.5,0.3546875,0.259375,0.353125,0.5890625]
      const avg = 0.5279276315789471
      return str
        .split('')
        .map(c => c.charCodeAt(0) < widths.length ? widths[c.charCodeAt(0)] : avg)
        .reduce((cur, acc) => acc + cur) * fontSize
    },
    yDetermineXAxis(){
      let xH = 0, index = 0;
      for(let point of this.yDataPoints){
        if(point==0){
          xH = ((this.height-this.top)-(index*this.yAxisSpacer));
          break;
        }
        index++;
      }
      return {xOriginLine:xH,index:index};
    },
    getYPlotPoints(val){
      let coordy = (this.height-this.top), i=0;

      for(let point of this.yDataPoints){
        if(i!=0){
          if((point>=val)&&(val>this.yDataPoints[i-1])){
            coordy = ((this.height-this.top)-(i-1)*this.yAxisSpacer)-(val-this.yDataPoints[i-1])*this.yUnit;
            break;
          }
        }
        i++;
      }
      if(val<0) coordy=coordy-this.xOriginLine;
      else coordy = this.xOriginLine-coordy;
      return (coordy<0)?-1*coordy:coordy;
    },
    getYDataPointsCoordinate(){
      let minAndMax = this.yFindMinAndMax();
      this.ygetYDataPoints(9);
      this.yAxisSpacer = (this.height-2*this.top)/parseFloat(this.yDataPoints.length-1);
      this.yUnit = this.yAxisSpacer/parseFloat((this.yDataPoints[1]-this.yDataPoints[0]));

      this.yDataPoints.forEach((item,i)=>{
        let val = (this.height-this.top)-(i*this.yAxisSpacer);
        if(val<0) val = -1*val;
        this.yCoordinate.push(val*Math.tan(this.ythetha));
      });
    },
    getXDataPointsCoordinate(){
      let categorySize = this.category.length;
      this.xAxisSpacer = ((this.xDistance+(this.depth*Math.sin(this.thetha))-(this.depth*Math.cos(this.thetha)))-(this.left+this.yCoordinate[this.index]-5))/parseFloat(categorySize);
      for(let i=0; i<categorySize; i++){
        this.xCoordinate.push(this.xAxisSpacer*i);
      }
    },
    getXDataPoints(){
      let categoriesCount = this.category.length, seriesCount = this.category[0].series.length,
          catSpaceGap = 0, seriesSpaceGap = 0,
          wByCategoryAxis = 0, wBySeriesAxis = 0, index = this.xCoordinate.length-1, multiplier = 0
      ;
      if(this.tempWidth>600){
        catSpaceGap = this.xAxisSpacer/8.0;
        seriesSpaceGap = this.depth/parseFloat(8.0*seriesCount);
        wByCategoryAxis = this.xAxisSpacer/4.0;
        wBySeriesAxis = this.depth/parseFloat(4.0*seriesCount);
        multiplier = 3.0;
      }
      else {
        if(this.tempWidth>500){
          catSpaceGap = this.xAxisSpacer/16.0;
          seriesSpaceGap = this.depth/parseFloat(16.0*seriesCount);
          wByCategoryAxis = this.xAxisSpacer/8.0;
          wBySeriesAxis = this.depth/parseFloat(8.0*seriesCount);
          multiplier = 7.0;
        }
        else{
          catSpaceGap = this.xAxisSpacer/20.0;
          seriesSpaceGap = this.depth/parseFloat(20.0*seriesCount);
          wByCategoryAxis = this.xAxisSpacer/10.0;
          wBySeriesAxis = this.depth/parseFloat(10.0*seriesCount);
          multiplier = 9.0;
        }
      }

      if(categoriesCount<=this.maxCategories&&seriesCount<=this.maxSeries){
        this.category.forEach((category,i)=>{
          Vue.set(this.xDataPoints,i,{series:[]});
          category.series.forEach((series,j)=>{
            let coord = this.getYPlotPoints(series.value);
            if(j==0){
              let x2 = ((this.xDistance-this.xCoordinate[index])+(this.depth*Math.sin(this.thetha))-(this.depth*Math.cos(this.thetha))-multiplier*catSpaceGap),
                  x1 = x2-wByCategoryAxis
              ;

              this.xDataPoints[i].series.push({
                front:{
                  x2:(x2+multiplier*seriesSpaceGap*Math.cos(this.thetha)),
                  x1:(x1+multiplier*seriesSpaceGap*Math.cos(this.thetha)),
                  y2:(this.xOriginLine+(this.depth*Math.sin(this.thetha))-(this.xCoordinate[index]*Math.sin(this.shiftAngle))-(multiplier*catSpaceGap)*Math.tan(this.shiftAngle)-multiplier*seriesSpaceGap*Math.sin(this.thetha)),
                  y1:(this.xOriginLine+(this.depth*Math.sin(this.thetha))-(this.xCoordinate[index]*Math.sin(this.shiftAngle))-(wByCategoryAxis+multiplier*catSpaceGap)*Math.tan(this.shiftAngle)-multiplier*seriesSpaceGap*Math.sin(this.thetha))
                },
                back:{
                  x2:(x2+(multiplier*seriesSpaceGap+wBySeriesAxis)*Math.cos(this.thetha)),
                  x1:(x1+(multiplier*seriesSpaceGap+wBySeriesAxis)*Math.cos(this.thetha)),
                  y1:(this.xOriginLine+(this.depth*Math.sin(this.thetha))-(this.xCoordinate[index]*Math.sin(this.shiftAngle))-(wByCategoryAxis+multiplier*catSpaceGap)*Math.tan(this.shiftAngle)-(multiplier*seriesSpaceGap+wBySeriesAxis)*Math.sin(this.thetha)),
                  y2:(this.xOriginLine+(this.depth*Math.sin(this.thetha))-(this.xCoordinate[index]*Math.sin(this.shiftAngle))-(multiplier*catSpaceGap)*Math.tan(this.shiftAngle)-(multiplier*seriesSpaceGap+wBySeriesAxis)*Math.sin(this.thetha))
                },
                left:{
                  x2:(x1+(multiplier*seriesSpaceGap+wBySeriesAxis)*Math.cos(this.thetha)),
                  x1:(x1+multiplier*seriesSpaceGap*Math.cos(this.thetha)),
                  y2:(this.xOriginLine+(this.depth*Math.sin(this.thetha))-(this.xCoordinate[index]*Math.sin(this.shiftAngle))-(wByCategoryAxis+multiplier*catSpaceGap)*Math.tan(this.shiftAngle)-(multiplier*seriesSpaceGap+wBySeriesAxis)*Math.sin(this.thetha)),
                  y1:(this.xOriginLine+(this.depth*Math.sin(this.thetha))-(this.xCoordinate[index]*Math.sin(this.shiftAngle))-(wByCategoryAxis+multiplier*catSpaceGap)*Math.tan(this.shiftAngle)-multiplier*seriesSpaceGap*Math.sin(this.thetha))
                },
                right:{
                  x2:(x2+(multiplier*seriesSpaceGap+wBySeriesAxis)*Math.cos(this.thetha)),
                  x1:(x2+multiplier*seriesSpaceGap*Math.cos(this.thetha)),
                  y2:(this.xOriginLine+(this.depth*Math.sin(this.thetha))-(this.xCoordinate[index]*Math.sin(this.shiftAngle))-(multiplier*catSpaceGap)*Math.tan(this.shiftAngle)-(multiplier*seriesSpaceGap+wBySeriesAxis)*Math.sin(this.thetha)),
                  y1:(this.xOriginLine+(this.depth*Math.sin(this.thetha))-(this.xCoordinate[index]*Math.sin(this.shiftAngle))-(multiplier*catSpaceGap)*Math.tan(this.shiftAngle)-multiplier*seriesSpaceGap*Math.sin(this.thetha))
                }
              });
            }
            else{
              this.xDataPoints[i].series.push({
                front:{
                  x2:(this.xDataPoints[i].series[j-1].back.x2+2*multiplier*seriesSpaceGap*Math.cos(this.thetha)),
                  x1:(this.xDataPoints[i].series[j-1].back.x1+2*multiplier*seriesSpaceGap*Math.cos(this.thetha)),
                  y1:(this.xDataPoints[i].series[j-1].back.y1-2*multiplier*seriesSpaceGap*Math.sin(this.thetha)),
                  y2:(this.xDataPoints[i].series[j-1].back.y2-2*multiplier*seriesSpaceGap*Math.sin(this.thetha))
                },
                back:{
                  x2:(this.xDataPoints[i].series[j-1].back.x2+(2*multiplier*seriesSpaceGap+wBySeriesAxis)*Math.cos(this.thetha)),
                  x1:(this.xDataPoints[i].series[j-1].back.x1+(2*multiplier*seriesSpaceGap+wBySeriesAxis)*Math.cos(this.thetha)),
                  y1:(this.xDataPoints[i].series[j-1].back.y1-(2*multiplier*seriesSpaceGap+wBySeriesAxis)*Math.sin(this.thetha)),
                  y2:(this.xDataPoints[i].series[j-1].back.y2-(2*multiplier*seriesSpaceGap+wBySeriesAxis)*Math.sin(this.thetha))
                },
                left:{
                  x2:(this.xDataPoints[i].series[j-1].back.x1+(2*multiplier*seriesSpaceGap+wBySeriesAxis)*Math.cos(this.thetha)),
                  x1:(this.xDataPoints[i].series[j-1].back.x1+2*multiplier*seriesSpaceGap*Math.cos(this.thetha)),
                  y1:(this.xDataPoints[i].series[j-1].back.y1-2*multiplier*seriesSpaceGap*Math.sin(this.thetha)),
                  y2:(this.xDataPoints[i].series[j-1].back.y1-(2*multiplier*seriesSpaceGap+wBySeriesAxis)*Math.sin(this.thetha))
                },
                right:{
                  x2:(this.xDataPoints[i].series[j-1].back.x2+(2*multiplier*seriesSpaceGap+wBySeriesAxis)*Math.cos(this.thetha)),
                  x1:(this.xDataPoints[i].series[j-1].back.x2+2*multiplier*seriesSpaceGap*Math.cos(this.thetha)),
                  y2:(this.xDataPoints[i].series[j-1].back.y2-(2*multiplier*seriesSpaceGap+wBySeriesAxis)*Math.sin(this.thetha)),
                  y1:(this.xDataPoints[i].series[j-1].back.y2-2*multiplier*seriesSpaceGap*Math.sin(this.thetha))
                }
              });
            }
          });
          index--;
        });
        this.getColumnPlotPoints();
      }
    },
    getColumnPlotPoints(){
      let categoriesCount = this.category.length, seriesCount = this.category[0].series.length,
          catSpaceGap = this.xAxisSpacer/8.0, seriesSpaceGap = this.depth/parseFloat(8*seriesCount),
          wByCategoryAxis = this.xAxisSpacer/4, wBySeriesAxis = this.depth/parseFloat(4*seriesCount), index = this.xCoordinate.length-1
      ;
      this.category.forEach((category,i)=>{
        Vue.set(this.columnPlot,i,{series:[]});
        for(let j=(seriesCount-1);j>=0;j--){
          let coord = this.getYPlotPoints(category.series[j].value);
          if(category.series[j].value>0){
            this.columnPlot[i].series.push({
              front:(this.xDataPoints[i].series[j].front.x1)+','+(this.xDataPoints[i].series[j].front.y1)+' '+
                    (this.xDataPoints[i].series[j].front.x1)+','+(this.xDataPoints[i].series[j].front.y1-coord)+' '+
                    (this.xDataPoints[i].series[j].front.x2)+','+(this.xDataPoints[i].series[j].front.y2-coord)+' '+
                    (this.xDataPoints[i].series[j].front.x2)+','+(this.xDataPoints[i].series[j].front.y2),
              right:(this.xDataPoints[i].series[j].right.x1)+','+(this.xDataPoints[i].series[j].right.y1)+' '+
                    (this.xDataPoints[i].series[j].right.x1)+','+(this.xDataPoints[i].series[j].right.y1-coord)+' '+
                    (this.xDataPoints[i].series[j].right.x2)+','+(this.xDataPoints[i].series[j].right.y2-coord)+' '+
                    (this.xDataPoints[i].series[j].right.x2)+','+(this.xDataPoints[i].series[j].right.y2),
              top:(this.xDataPoints[i].series[j].front.x1)+','+(this.xDataPoints[i].series[j].front.y1-coord)+' '+
                  (this.xDataPoints[i].series[j].front.x2)+','+(this.xDataPoints[i].series[j].front.y2-coord)+' '+
                  (this.xDataPoints[i].series[j].right.x1)+','+(this.xDataPoints[i].series[j].right.y1-coord)+' '+
                  (this.xDataPoints[i].series[j].right.x2)+','+(this.xDataPoints[i].series[j].right.y2-coord)+' '+
                  (this.xDataPoints[i].series[j].back.x2)+','+(this.xDataPoints[i].series[j].back.y2-coord)+' '+
                  (this.xDataPoints[i].series[j].back.x1)+','+(this.xDataPoints[i].series[j].back.y1-coord)+' '+
                  (this.xDataPoints[i].series[j].left.x2)+','+(this.xDataPoints[i].series[j].left.y2-coord)+' '+
                  (this.xDataPoints[i].series[j].left.x1)+','+(this.xDataPoints[i].series[j].left.y1-coord),
              stroke:this.colors[j].color
            });
          }
          else{
            if(category.series[j].value==0){
              this.columnPlot[i].series.push({
                top:this.xDataPoints[i].series[j].front.x1+','+this.xDataPoints[i].series[j].front.y1+' '+
                    this.xDataPoints[i].series[j].front.x2+','+this.xDataPoints[i].series[j].front.y2+' '+
                    this.xDataPoints[i].series[j].right.x1+','+this.xDataPoints[i].series[j].right.y1+' '+
                    this.xDataPoints[i].series[j].right.x2+','+this.xDataPoints[i].series[j].right.y2+' '+
                    this.xDataPoints[i].series[j].back.x2+','+this.xDataPoints[i].series[j].back.y2+' '+
                    this.xDataPoints[i].series[j].back.x1+','+this.xDataPoints[i].series[j].back.y1+' '+
                    this.xDataPoints[i].series[j].left.x2+','+this.xDataPoints[i].series[j].left.y2+' '+
                    this.xDataPoints[i].series[j].left.x1+','+this.xDataPoints[i].series[j].left.y1,
                front:'',
                right:'',
                stroke:this.colors[j].color
              });
            }
            else{
              this.columnPlot[i].series.push({
                front:this.xDataPoints[i].series[j].front.x1+','+this.xDataPoints[i].series[j].front.y1+' '+
                      (this.xDataPoints[i].series[j].front.x1)+','+(coord+this.xDataPoints[i].series[j].front.y1)+' '+
                      (this.xDataPoints[i].series[j].front.x2)+','+(coord+this.xDataPoints[i].series[j].front.y2)+' '+
                      this.xDataPoints[i].series[j].front.x2+','+this.xDataPoints[i].series[j].front.y2,
                right:this.xDataPoints[i].series[j].right.x1+','+this.xDataPoints[i].series[j].right.y1+' '+
                      (this.xDataPoints[i].series[j].right.x1)+','+(coord+this.xDataPoints[i].series[j].right.y1)+' '+
                      (this.xDataPoints[i].series[j].right.x2)+','+(coord+this.xDataPoints[i].series[j].right.y2)+' '+
                      this.xDataPoints[i].series[j].right.x2+','+this.xDataPoints[i].series[j].right.y2,
                top:this.xDataPoints[i].series[j].front.x1+','+this.xDataPoints[i].series[j].front.y1+' '+
                    this.xDataPoints[i].series[j].front.x2+','+this.xDataPoints[i].series[j].front.y2+' '+
                    this.xDataPoints[i].series[j].right.x1+','+this.xDataPoints[i].series[j].right.y1+' '+
                    this.xDataPoints[i].series[j].right.x2+','+this.xDataPoints[i].series[j].right.y2+' '+
                    this.xDataPoints[i].series[j].back.x2+','+this.xDataPoints[i].series[j].back.y2+' '+
                    this.xDataPoints[i].series[j].back.x1+','+this.xDataPoints[i].series[j].back.y1+' '+
                    this.xDataPoints[i].series[j].left.x2+','+this.xDataPoints[i].series[j].left.y2+' '+
                    this.xDataPoints[i].series[j].left.x1+','+this.xDataPoints[i].series[j].left.y1,
                stroke:this.colors[j].color
              });
            }
          }
        }
      });
    },
    findShiftAngle(){
      this.shiftAngle = Math.asinh(this.depth*Math.sin(this.thetha)/((this.xDistance+(this.depth*Math.sin(this.thetha))-(this.depth*Math.cos(this.thetha)))-(this.left+this.yCoordinate[this.index]-5)));
    },
    yFindMinAndMax(){
      let max = this.category[0].series[0].value;
      let min = this.category[0].series[0].value;
      this.category.forEach((item,i)=>{
        item.series.forEach((category,j)=>{
          if(!(i==0&&j==0)){
            if(min>category.value) min = category.value;
            if(max<category.value) max = category.value;
          }
        });
      });
      this.ymin = min;
      this.ymax = max;
      return {max,min};
    },
    ygetYDataPoints(sizeInt){
      let min = this.ymin,
          max = this.ymax,
          diff = 0,
          gap = 0
      ;
      if(min<0){
        if(max>0){
          diff = max-min;
          gap=Math.floor(diff/parseFloat(sizeInt));
          gap = this.checkAndResetGap(gap);
          this.yDataPoints.push(0);
          this.getYNegativePoints(gap,min);
          this.yDataPoints.reverse();
          this.getYPositivePoints(gap,max);
        }
        else{
          diff = -1*min;
          gap=Math.floor(diff/parseFloat(sizeInt));
          gap = this.checkAndResetGap(gap);
          this.yDataPoints.push(0);
          this.getYNegativePoints(gap,min);
          this.yDataPoints.reverse();
        }
      }
      else{
        diff = max;
        gap=Math.floor(diff/parseFloat(sizeInt));
        gap = this.checkAndResetGap(gap);
        this.yDataPoints.push(0);
        this.getYPositivePoints(gap,max);
      }
    }
  },
  template:
  `
  <div class="block height-100-percent overflow-hidden text-center">
    <div class="block" :style="'height:'+titleNamingAreaHeight+'px;'"></div>
    <template v-if="tempWidth<=700">
      <div class="block" :style="'height:'+seriesNamingAreaHeight+'px;'"></div>
    </template>
    <div class="block row no-white-space text-left" style="font-size:0px;" :style="'height:'+(height+xAxisNamingAreaHeight-1)+'px;'">
      <div class="inline-block align-middle height-100-percent text-left" :style="'width:'+width+'px;'">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="height-100-percent width-100-percent" aria-labelledby="title" role="img">
          <title id="title">Column Chart</title>
          <g stroke="blue">
            <line :x1="((left-5)+yCoordinate[yCoordinate.length-1])" :x2="((left-5)+yCoordinate[0])" :y1="top" :y2="height-top"></line>
          </g>
          <g stroke="blue" style="font-size:10px;">
            <template v-for="(point,i) in yDataPoints">
              <text :x="(left-(measureText(point+'',13)/2)-10)" :y="((height-top)-i*yAxisSpacer)+4">{{point}}</text>
            </template>
          </g>
          <g stroke="blue">
            <template v-for="(point,i) in yCoordinate">
              <line :x1="((left-5)+(point-5))" :x2="((left-5)+point+5)" :y1="((height-top)-(i*yAxisSpacer))" :y2="((height-top)-(i*yAxisSpacer))"></line>
              <line :x1="(left+point-5)" :x2="((left+point-5)+(depth*Math.cos(thetha)))" :y1="((height-top)-(i*yAxisSpacer))" :y2="((height-top)-(i*yAxisSpacer))-(depth*Math.sin(thetha))"></line>
              <line :x1="(left+point-5)+(depth*Math.cos(thetha))" :x2="(xDistance)+(depth*Math.sin(thetha))" :y1="((height-top)-(i*yAxisSpacer))-(depth*Math.sin(thetha))" :y2="((height-top)-(i*yAxisSpacer))"></line>
            </template>
          </g>
          <g stroke="red">
            <template v-for="(point,i) in xCoordinate">
              <line :x1="((xDistance-point)+(depth*Math.sin(thetha))-(depth*Math.cos(thetha)))" :x2="((xDistance-point)+(depth*Math.sin(thetha)))" :y1="(xOriginLine+(depth*Math.sin(thetha))-(point*Math.sin(shiftAngle)))" :y2="(xOriginLine-(point*Math.sin(shiftAngle)))"></line>
            </template>
          </g>
          <g>
            <template v-for="(points,i) in columnPlot">
              <template v-for="(point,j) in points.series">
                <g style="stroke-width:1;" stroke="black" :fill="point.stroke" :stroke-opacity="0.7">
                  <polyline :points="point.front" />
                  <polyline :points="point.right" />
                  <polyline :points="point.top" />
                </g>
              </template>
            </template>
          </g>
          <g stroke="blue">
            <line :x1="(left+yCoordinate[index]-5)" :x2="(xDistance+(depth*Math.sin(thetha))-(depth*Math.cos(thetha)))" :y1="xOriginLine" :y2="(xOriginLine+(depth*Math.sin(thetha)))"></line>
            <line :x1="(xDistance)+(depth*Math.sin(thetha))-(depth*Math.cos(thetha))" :x2="((xDistance)+(depth*Math.sin(thetha)))" :y1="(xOriginLine+(depth*Math.sin(thetha)))" :y2="xOriginLine"></line>
            <template v-if="index!=0">
              <line :x1="(left+yCoordinate[0]-5)" :x2="(xDistance)+(depth*Math.sin(thetha))-(depth*Math.cos(thetha))" :y1="(height-top)" :y2="(height-top)+(depth*Math.sin(thetha))"></line>
              <line :x1="(xDistance)+(depth*Math.sin(thetha))-(depth*Math.cos(thetha))" :x2="((xDistance)+(depth*Math.sin(thetha)))" :y1="((height-top)+(depth*Math.sin(thetha)))" :y2="(height-top)"></line>
            </template>
          </g>
        </svg>
      </div>
    </div>
  </div>
  `,
  mounted:function(){
    this.handleResize10();
    window.addEventListener("resize", this.debounce(this.handleResize10,1));
  },
  beforeDestroy: function() {
    window.removeEventListener("resize", this.debounce(this.handleResize10,1));
  }
};

const ThreeDClusteredColumnChart = {
  data:function(){
    return {
      ymin:0,
      ymax:0,
      xmin:0,
      xmax:0,
      clusteredColumnPlot:[],
      depth:30.0,
      thetha:0,
      ythetha:0,
      category:[
        {
          name:'Category 1',
          series:[
            {
              name:'Series 1',
              value:7110
            },
            {
              name:'Series 2',
              value:8240
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
              value:-3
            },
            {
              name:'Series 4',
              value:0
            }
          ]
        }
      ],
      yCoordinate:[],
      xCoordinate:[],
      index:0,
      shiftAngle:0
    };
  },
  mixins:[ColumnChartMixin],
  methods:{
    handleResize10(){
      this.thetha = Math.PI/4.0;
      this.ythetha = Math.PI/48;
      this.xAxisNamingAreaHeight = this.tempXAxisNamingAreaHeight;
      let container = document.getElementById('svg-charts');
      this.tempWidth = container.offsetWidth;
      (this.tempWidth<=700)? this.xAxisNamingAreaHeight = this.xAxisNamingAreaHeight - this.seriesNamingAreaHeight: this.xAxisNamingAreaHeight = this.xAxisNamingAreaHeight;
      this.height = container.offsetHeight - (((this.tempWidth<=700)? this.seriesNamingAreaHeight:0)+this.xAxisNamingAreaHeight+this.titleNamingAreaHeight);
      (this.tempWidth<=700)? this.width = container.offsetWidth - 10:this.width = container.offsetWidth - this.seriesNamingAreaWidth;
      this.left = this.yAxisNamingAreaWidth;
      this.yDataPoints = [];
      this.xDistance = this.width - this.left;
      this.top = 65;
      this.yCoordinate = [];
      this.xCoordinate = [];
      this.xDataPoints = [];
      this.clusteredColumnPlot = [];
      this.index = 0;
      this.shiftAngle = 0;
      this.getYDataPointsCoordinate();
      let xOriginLine = this.yDetermineXAxis();
      this.xOriginLine = xOriginLine.xOriginLine;
      this.index = xOriginLine.index;
      this.getXDataPointsCoordinate();
      this.findShiftAngle();
      this.getXDataPoints();
    },
    measureText(str, fontSize = 10) {
      const widths = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.2796875,0.2765625,0.3546875,0.5546875,0.5546875,0.8890625,0.665625,0.190625,0.3328125,0.3328125,0.3890625,0.5828125,0.2765625,0.3328125,0.2765625,0.3015625,0.5546875,0.5546875,0.5546875,0.5546875,0.5546875,0.5546875,0.5546875,0.5546875,0.5546875,0.5546875,0.2765625,0.2765625,0.584375,0.5828125,0.584375,0.5546875,1.0140625,0.665625,0.665625,0.721875,0.721875,0.665625,0.609375,0.7765625,0.721875,0.2765625,0.5,0.665625,0.5546875,0.8328125,0.721875,0.7765625,0.665625,0.7765625,0.721875,0.665625,0.609375,0.721875,0.665625,0.94375,0.665625,0.665625,0.609375,0.2765625,0.3546875,0.2765625,0.4765625,0.5546875,0.3328125,0.5546875,0.5546875,0.5,0.5546875,0.5546875,0.2765625,0.5546875,0.5546875,0.221875,0.240625,0.5,0.221875,0.8328125,0.5546875,0.5546875,0.5546875,0.5546875,0.3328125,0.5,0.2765625,0.5546875,0.5,0.721875,0.5,0.5,0.5,0.3546875,0.259375,0.353125,0.5890625]
      const avg = 0.5279276315789471
      return str
        .split('')
        .map(c => c.charCodeAt(0) < widths.length ? widths[c.charCodeAt(0)] : avg)
        .reduce((cur, acc) => acc + cur) * fontSize
    },
    yDetermineXAxis(){
      let xH = 0, index = 0;
      for(let point of this.yDataPoints){
        if(point==0){
          xH = ((this.height-this.top)-(index*this.yAxisSpacer));
          break;
        }
        index++;
      }
      return {xOriginLine:xH,index:index};
    },
    getYPlotPoints(val){
      let coordy = (this.height-this.top), i=0;

      for(let point of this.yDataPoints){
        if(i!=0){
          if((point>=val)&&(val>this.yDataPoints[i-1])){
            coordy = ((this.height-this.top)-(i-1)*this.yAxisSpacer)-(val-this.yDataPoints[i-1])*this.yUnit;
            break;
          }
        }
        i++;
      }
      if(val<0) coordy=coordy-this.xOriginLine;
      else coordy = this.xOriginLine-coordy;
      return (coordy<0)?-1*coordy:coordy;
    },
    getYDataPointsCoordinate(){
      let minAndMax = this.yFindMinAndMax();
      this.ygetYDataPoints(9);
      this.yAxisSpacer = (this.height-2*this.top)/parseFloat(this.yDataPoints.length-1);
      this.yUnit = this.yAxisSpacer/parseFloat((this.yDataPoints[1]-this.yDataPoints[0]));

      this.yDataPoints.forEach((item,i)=>{
        let val = (this.height-this.top)-(i*this.yAxisSpacer);
        if(val<0) val = -1*val;
        this.yCoordinate.push(val*Math.tan(this.ythetha));
      });
    },
    getXDataPointsCoordinate(){
      let categorySize = this.category.length;
      this.xAxisSpacer = ((this.xDistance+(this.depth*Math.sin(this.thetha))-(this.depth*Math.cos(this.thetha)))-(this.left+this.yCoordinate[this.index]-5))/parseFloat(categorySize);
      for(let i=0; i<categorySize; i++){
        this.xCoordinate.push(this.xAxisSpacer*i);
      }
    },
    getXDataPoints(){
      let categoriesCount = this.category.length, seriesCount = this.category[0].series.length,
          catSeriesSpaceGap = 0, seriesSpaceGap = 0, wBySeriesAxis = 0, index = this.xCoordinate.length-1
      ;
      catSeriesSpaceGap = this.xAxisSpacer/(seriesCount+2);
      this.depth = catSeriesSpaceGap;
      seriesSpaceGap = catSeriesSpaceGap/4.0;
      wBySeriesAxis = catSeriesSpaceGap/2.0;

      if(categoriesCount<=this.maxCategories&&seriesCount<=this.maxSeries){
        this.category.forEach((category,i)=>{
          Vue.set(this.xDataPoints,i,{series:[]});
          category.series.forEach((series,j)=>{
            let coord = this.getYPlotPoints(series.value);
            if(j==0){
              let x2 = ((this.xDistance-this.xCoordinate[index])+(this.depth*Math.sin(this.thetha))-(this.depth*Math.cos(this.thetha))-catSeriesSpaceGap),
                  x1 = x2-catSeriesSpaceGap
              ;
              this.xDataPoints[i].series.push({
                front:{
                  x2:x2+seriesSpaceGap*Math.cos(this.thetha),
                  x1:x1+seriesSpaceGap*Math.cos(this.thetha),
                  y2:(this.xOriginLine+(this.depth*Math.sin(this.thetha))-(this.xCoordinate[index]*Math.sin(this.shiftAngle))-catSeriesSpaceGap*Math.tan(this.shiftAngle)-seriesSpaceGap*Math.sin(this.thetha)),
                  y1:(this.xOriginLine+(this.depth*Math.sin(this.thetha))-(this.xCoordinate[index]*Math.sin(this.shiftAngle))-((j+1)*catSeriesSpaceGap+catSeriesSpaceGap)*Math.tan(this.shiftAngle)-seriesSpaceGap*Math.sin(this.thetha))
                },
                back:{
                  x2:(x2+(seriesSpaceGap+wBySeriesAxis)*Math.cos(this.thetha)),
                  x1:(x1+(seriesSpaceGap+wBySeriesAxis)*Math.cos(this.thetha)),
                  y1:(this.xOriginLine+(this.depth*Math.sin(this.thetha))-(this.xCoordinate[index]*Math.sin(this.shiftAngle))-((j+1)*catSeriesSpaceGap+catSeriesSpaceGap)*Math.tan(this.shiftAngle)-(seriesSpaceGap+wBySeriesAxis)*Math.sin(this.thetha)),
                  y2:(this.xOriginLine+(this.depth*Math.sin(this.thetha))-(this.xCoordinate[index]*Math.sin(this.shiftAngle))-catSeriesSpaceGap*Math.tan(this.shiftAngle)-(seriesSpaceGap+wBySeriesAxis)*Math.sin(this.thetha))
                },
                left:{
                  x2:(x1+(seriesSpaceGap+wBySeriesAxis)*Math.cos(this.thetha)),
                  x1:(x1+seriesSpaceGap*Math.cos(this.thetha)),
                  y2:(this.xOriginLine+(this.depth*Math.sin(this.thetha))-(this.xCoordinate[index]*Math.sin(this.shiftAngle))-((j+1)*catSeriesSpaceGap+catSeriesSpaceGap)*Math.tan(this.shiftAngle)-(seriesSpaceGap+wBySeriesAxis)*Math.sin(this.thetha)),
                  y1:(this.xOriginLine+(this.depth*Math.sin(this.thetha))-(this.xCoordinate[index]*Math.sin(this.shiftAngle))-((j+1)*catSeriesSpaceGap+catSeriesSpaceGap)*Math.tan(this.shiftAngle)-seriesSpaceGap*Math.sin(this.thetha))
                },
                right:{
                  x2:(x2+(seriesSpaceGap+wBySeriesAxis)*Math.cos(this.thetha)),
                  x1:(x2+seriesSpaceGap*Math.cos(this.thetha)),
                  y2:(this.xOriginLine+(this.depth*Math.sin(this.thetha))-(this.xCoordinate[index]*Math.sin(this.shiftAngle))-catSeriesSpaceGap*Math.tan(this.shiftAngle)-(seriesSpaceGap+wBySeriesAxis)*Math.sin(this.thetha)),
                  y1:(this.xOriginLine+(this.depth*Math.sin(this.thetha))-(this.xCoordinate[index]*Math.sin(this.shiftAngle))-catSeriesSpaceGap*Math.tan(this.shiftAngle)-seriesSpaceGap*Math.sin(this.thetha))
                }
              });
            }
            else{
              this.xDataPoints[i].series.push({
                front:{
                  x2:this.xDataPoints[i].series[j-1].front.x1,
                  x1:this.xDataPoints[i].series[j-1].front.x1-catSeriesSpaceGap,
                  y1:(this.xDataPoints[i].series[j-1].front.y1-catSeriesSpaceGap*Math.tan(this.shiftAngle)),
                  y2:(this.xDataPoints[i].series[j-1].front.y2-catSeriesSpaceGap*Math.tan(this.shiftAngle))
                },
                back:{
                  x2:this.xDataPoints[i].series[j-1].back.x1,
                  x1:this.xDataPoints[i].series[j-1].back.x1-catSeriesSpaceGap,
                  y1:(this.xDataPoints[i].series[j-1].back.y1-catSeriesSpaceGap*Math.tan(this.shiftAngle)),
                  y2:(this.xDataPoints[i].series[j-1].back.y2-catSeriesSpaceGap*Math.tan(this.shiftAngle))
                },
                right:{
                  x2:this.xDataPoints[i].series[j-1].back.x1,
                  x1:this.xDataPoints[i].series[j-1].front.x1,
                  y1:this.xDataPoints[i].series[j-1].front.y1,
                  y2:this.xDataPoints[i].series[j-1].back.y1
                },
                left:{
                  x2:this.xDataPoints[i].series[j-1].back.x1-catSeriesSpaceGap,
                  x1:this.xDataPoints[i].series[j-1].front.x1-catSeriesSpaceGap,
                  y1:this.xDataPoints[i].series[j-1].front.y1,
                  y2:this.xDataPoints[i].series[j-1].back.y1
                }
              });
            }
          });
          index--;
        });
        this.getClusteredColumnPlotPoints();
      }
    },
    getClusteredColumnPlotPoints(){
      let seriesCount = this.category[0].series.length;
      this.category.forEach((category,i)=>{
        Vue.set(this.clusteredColumnPlot,i,{series:[]});
        let k = 0;
        for(let j=(seriesCount-1);j>=0;j--){
          let coord = this.getYPlotPoints(category.series[j].value);
          if(category.series[j].value>0){
            this.clusteredColumnPlot[i].series.push({
              front:(this.xDataPoints[i].series[k].front.x1)+','+(this.xDataPoints[i].series[k].front.y1)+' '+
                    (this.xDataPoints[i].series[k].front.x1)+','+(this.xDataPoints[i].series[k].front.y1-coord)+' '+
                    (this.xDataPoints[i].series[k].front.x2)+','+(this.xDataPoints[i].series[k].front.y2-coord)+' '+
                    (this.xDataPoints[i].series[k].front.x2)+','+(this.xDataPoints[i].series[k].front.y2),
              right:(this.xDataPoints[i].series[k].right.x1)+','+(this.xDataPoints[i].series[k].right.y1)+' '+
                    (this.xDataPoints[i].series[k].right.x1)+','+(this.xDataPoints[i].series[k].right.y1-coord)+' '+
                    (this.xDataPoints[i].series[k].right.x2)+','+(this.xDataPoints[i].series[k].right.y2-coord)+' '+
                    (this.xDataPoints[i].series[k].right.x2)+','+(this.xDataPoints[i].series[k].right.y2),
              top:(this.xDataPoints[i].series[k].front.x1)+','+(this.xDataPoints[i].series[k].front.y1-coord)+' '+
                  (this.xDataPoints[i].series[k].front.x2)+','+(this.xDataPoints[i].series[k].front.y2-coord)+' '+
                  (this.xDataPoints[i].series[k].right.x1)+','+(this.xDataPoints[i].series[k].right.y1-coord)+' '+
                  (this.xDataPoints[i].series[k].right.x2)+','+(this.xDataPoints[i].series[k].right.y2-coord)+' '+
                  (this.xDataPoints[i].series[k].back.x2)+','+(this.xDataPoints[i].series[k].back.y2-coord)+' '+
                  (this.xDataPoints[i].series[k].back.x1)+','+(this.xDataPoints[i].series[k].back.y1-coord)+' '+
                  (this.xDataPoints[i].series[k].left.x2)+','+(this.xDataPoints[i].series[k].left.y2-coord)+' '+
                  (this.xDataPoints[i].series[k].left.x1)+','+(this.xDataPoints[i].series[k].left.y1-coord),
              stroke:this.colors[j].color
            });
          }
          else{
            if(category.series[j].value==0){
              this.clusteredColumnPlot[i].series.push({
                top:this.xDataPoints[i].series[k].front.x1+','+this.xDataPoints[i].series[k].front.y1+' '+
                    this.xDataPoints[i].series[k].front.x2+','+this.xDataPoints[i].series[k].front.y2+' '+
                    this.xDataPoints[i].series[k].right.x1+','+this.xDataPoints[i].series[k].right.y1+' '+
                    this.xDataPoints[i].series[k].right.x2+','+this.xDataPoints[i].series[k].right.y2+' '+
                    this.xDataPoints[i].series[k].back.x2+','+this.xDataPoints[i].series[k].back.y2+' '+
                    this.xDataPoints[i].series[k].back.x1+','+this.xDataPoints[i].series[k].back.y1+' '+
                    this.xDataPoints[i].series[k].left.x2+','+this.xDataPoints[i].series[k].left.y2+' '+
                    this.xDataPoints[i].series[k].left.x1+','+this.xDataPoints[i].series[k].left.y1,
                front:'',
                right:'',
                stroke:this.colors[j].color
              });
            }
            else{
              this.clusteredColumnPlot[i].series.push({
                front:this.xDataPoints[i].series[k].front.x1+','+this.xDataPoints[i].series[k].front.y1+' '+
                      (this.xDataPoints[i].series[k].front.x1)+','+(coord+this.xDataPoints[i].series[k].front.y1)+' '+
                      (this.xDataPoints[i].series[k].front.x2)+','+(coord+this.xDataPoints[i].series[k].front.y2)+' '+
                      this.xDataPoints[i].series[k].front.x2+','+this.xDataPoints[i].series[k].front.y2,
                right:this.xDataPoints[i].series[k].right.x1+','+this.xDataPoints[i].series[k].right.y1+' '+
                      (this.xDataPoints[i].series[k].right.x1)+','+(coord+this.xDataPoints[i].series[k].right.y1)+' '+
                      (this.xDataPoints[i].series[k].right.x2)+','+(coord+this.xDataPoints[i].series[k].right.y2)+' '+
                      this.xDataPoints[i].series[k].right.x2+','+this.xDataPoints[i].series[k].right.y2,
                top:this.xDataPoints[i].series[k].front.x1+','+this.xDataPoints[i].series[k].front.y1+' '+
                    this.xDataPoints[i].series[k].front.x2+','+this.xDataPoints[i].series[k].front.y2+' '+
                    this.xDataPoints[i].series[k].right.x1+','+this.xDataPoints[i].series[k].right.y1+' '+
                    this.xDataPoints[i].series[k].right.x2+','+this.xDataPoints[i].series[k].right.y2+' '+
                    this.xDataPoints[i].series[k].back.x2+','+this.xDataPoints[i].series[k].back.y2+' '+
                    this.xDataPoints[i].series[k].back.x1+','+this.xDataPoints[i].series[k].back.y1+' '+
                    this.xDataPoints[i].series[k].left.x2+','+this.xDataPoints[i].series[k].left.y2+' '+
                    this.xDataPoints[i].series[k].left.x1+','+this.xDataPoints[i].series[k].left.y1,
                stroke:this.colors[j].color
              });
            }
          }
          k++;
        }
      });
    },
    findShiftAngle(){
      this.shiftAngle = Math.asinh(this.depth*Math.sin(this.thetha)/((this.xDistance+(this.depth*Math.sin(this.thetha))-(this.depth*Math.cos(this.thetha)))-(this.left+this.yCoordinate[this.index]-5)));
    },
    yFindMinAndMax(){
      let max = this.category[0].series[0].value;
      let min = this.category[0].series[0].value;
      this.category.forEach((item,i)=>{
        item.series.forEach((category,j)=>{
          if(!(i==0&&j==0)){
            if(min>category.value) min = category.value;
            if(max<category.value) max = category.value;
          }
        });
      });
      this.ymin = min;
      this.ymax = max;
      return {max,min};
    },
    ygetYDataPoints(sizeInt){
      let min = this.ymin,
          max = this.ymax,
          diff = 0,
          gap = 0
      ;
      if(min<0){
        if(max>0){
          diff = max-min;
          gap=Math.floor(diff/parseFloat(sizeInt));
          gap = this.checkAndResetGap(gap);
          this.yDataPoints.push(0);
          this.getYNegativePoints(gap,min);
          this.yDataPoints.reverse();
          this.getYPositivePoints(gap,max);
        }
        else{
          diff = -1*min;
          gap=Math.floor(diff/parseFloat(sizeInt));
          gap = this.checkAndResetGap(gap);
          this.yDataPoints.push(0);
          this.getYNegativePoints(gap,min);
          this.yDataPoints.reverse();
        }
      }
      else{
        diff = max;
        gap=Math.floor(diff/parseFloat(sizeInt));
        gap = this.checkAndResetGap(gap);
        this.yDataPoints.push(0);
        this.getYPositivePoints(gap,max);
      }
    }
  },
  template:
  `
  <div class="block height-100-percent overflow-hidden text-center">
    <div class="block" :style="'height:'+titleNamingAreaHeight+'px;'"></div>
    <template v-if="tempWidth<=700">
      <div class="block" :style="'height:'+seriesNamingAreaHeight+'px;'"></div>
    </template>
    <div class="block row no-white-space text-left" style="font-size:0px;" :style="'height:'+(height+xAxisNamingAreaHeight-1)+'px;'">
      <div class="inline-block align-middle height-100-percent text-left" :style="'width:'+width+'px;'">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="height-100-percent width-100-percent" aria-labelledby="title" role="img">
          <title id="title">Column Chart</title>
          <g stroke="blue">
            <line :x1="((left-5)+yCoordinate[yCoordinate.length-1])" :x2="((left-5)+yCoordinate[0])" :y1="top" :y2="height-top"></line>
          </g>
          <g stroke="blue" style="font-size:10px;">
            <template v-for="(point,i) in yDataPoints">
              <text :x="(left-(measureText(point+'',13)/2)-10)" :y="((height-top)-i*yAxisSpacer)+4">{{point}}</text>
            </template>
          </g>
          <g stroke="blue">
            <template v-for="(point,i) in yCoordinate">
              <line :x1="((left-5)+(point-5))" :x2="((left-5)+point+5)" :y1="((height-top)-(i*yAxisSpacer))" :y2="((height-top)-(i*yAxisSpacer))"></line>
              <line :x1="(left+point-5)" :x2="((left+point-5)+(depth*Math.cos(thetha)))" :y1="((height-top)-(i*yAxisSpacer))" :y2="((height-top)-(i*yAxisSpacer))-(depth*Math.sin(thetha))"></line>
              <line :x1="(left+point-5)+(depth*Math.cos(thetha))" :x2="(xDistance)+(depth*Math.sin(thetha))" :y1="((height-top)-(i*yAxisSpacer))-(depth*Math.sin(thetha))" :y2="((height-top)-(i*yAxisSpacer))"></line>
            </template>
          </g>
          <g stroke="red">
            <template v-for="(point,i) in xCoordinate">
              <line :x1="((xDistance-point)+(depth*Math.sin(thetha))-(depth*Math.cos(thetha)))" :x2="((xDistance-point)+(depth*Math.sin(thetha)))" :y1="(xOriginLine+(depth*Math.sin(thetha))-(point*Math.sin(shiftAngle)))" :y2="(xOriginLine-(point*Math.sin(shiftAngle)))"></line>
            </template>
          </g>
          <g>
            <template v-for="(points,i) in clusteredColumnPlot">
              <template v-for="(point,j) in points.series.reverse()">
                <g style="stroke-width:1;" stroke="black" :fill="point.stroke" :stroke-opacity="0.7">
                  <polyline :points="point.front" />
                  <polyline :points="point.right" />
                  <polyline :points="point.top" />
                </g>
              </template>
            </template>
          </g>
          <g stroke="blue">
            <line :x1="(left+yCoordinate[index]-5)" :x2="(xDistance+(depth*Math.sin(thetha))-(depth*Math.cos(thetha)))" :y1="xOriginLine" :y2="(xOriginLine+(depth*Math.sin(thetha)))"></line>
            <line :x1="(xDistance)+(depth*Math.sin(thetha))-(depth*Math.cos(thetha))" :x2="((xDistance)+(depth*Math.sin(thetha)))" :y1="(xOriginLine+(depth*Math.sin(thetha)))" :y2="xOriginLine"></line>
            <template v-if="index!=0">
              <line :x1="(left+yCoordinate[0]-5)" :x2="(xDistance)+(depth*Math.sin(thetha))-(depth*Math.cos(thetha))" :y1="(height-top)" :y2="(height-top)+(depth*Math.sin(thetha))"></line>
              <line :x1="(xDistance)+(depth*Math.sin(thetha))-(depth*Math.cos(thetha))" :x2="((xDistance)+(depth*Math.sin(thetha)))" :y1="((height-top)+(depth*Math.sin(thetha)))" :y2="(height-top)"></line>
            </template>
          </g>
        </svg>
      </div>
    </div>
  </div>
  `,
  created:function(){
    let categoriesCount = this.category.length, seriesCount = this.category[0].series.length,
        catSeriesSpaceGap = 0, seriesSpaceGap = 0, wBySeriesAxis = 0, index = this.xCoordinate.length-1
    ;
    this.handleResize10();
    catSeriesSpaceGap = this.xAxisSpacer/(seriesCount+2);
    this.depth = catSeriesSpaceGap;
  },
  mounted:function(){
    this.handleResize10();
    window.addEventListener("resize", this.debounce(this.handleResize10,1));
  },
  beforeDestroy: function() {
    window.removeEventListener("resize", this.debounce(this.handleResize10,1));
  }
};

const ThreeDCylinderChart = {
  data:function(){
    return {
      ymin:0,
      ymax:0,
      xmin:0,
      xmax:0,
      depth:100.0,
      thetha:0,
      ythetha:0,
      cylinderPlot:[],
      category:[
        {
          name:'Category 1',
          series:[
            {
              name:'Series 1',
              value:7110
            },
            {
              name:'Series 2',
              value:8240
            },
            {
              name:'Series 3',
              value:2111
            },
            {
              name:'Series 4',
              value:3120
            },
            {
              name:'Series 4',
              value:3120
            },
            {
              name:'Series 4',
              value:3120
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
            },
            {
              name:'Series 4',
              value:3120
            },
            {
              name:'Series 4',
              value:3120
            },
            {
              name:'Series 4',
              value:3120
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
            },
            {
              name:'Series 4',
              value:3120
            },
            {
              name:'Series 4',
              value:3120
            },
            {
              name:'Series 4',
              value:3120
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
            },
            {
              name:'Series 4',
              value:3120
            },
            {
              name:'Series 4',
              value:3120
            },
            {
              name:'Series 4',
              value:3120
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
              name:'Series 4',
              value:3120
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
            },
            {
              name:'Series 4',
              value:3120
            },
            {
              name:'Series 4',
              value:3120
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
              name:'Series 4',
              value:3120
            },
            {
              name:'Series 4',
              value:3120
            },
            {
              name:'Series 4',
              value:3120
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
            },
            {
              name:'Series 4',
              value:3120
            },
            {
              name:'Series 4',
              value:3120
            },
            {
              name:'Series 4',
              value:3120
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
              value:-3
            },
            {
              name:'Series 4',
              value:0
            },
            {
              name:'Series 4',
              value:3120
            },
            {
              name:'Series 4',
              value:3120
            },
            {
              name:'Series 4',
              value:3120
            }
          ]
        }
      ],
      yCoordinate:[],
      xCoordinate:[],
      index:0,
      shiftAngle:0
    };
  },
  mixins:[ColumnChartMixin],
  methods:{
    handleResize10(){
      this.thetha = Math.PI/4.0;
      this.ythetha = Math.PI/48;
      this.xAxisNamingAreaHeight = this.tempXAxisNamingAreaHeight;
      let container = document.getElementById('svg-charts');
      this.tempWidth = container.offsetWidth;
      (this.tempWidth<=700)? this.xAxisNamingAreaHeight = this.xAxisNamingAreaHeight - this.seriesNamingAreaHeight: this.xAxisNamingAreaHeight = this.xAxisNamingAreaHeight;
      this.height = container.offsetHeight - (((this.tempWidth<=700)? this.seriesNamingAreaHeight:0)+this.xAxisNamingAreaHeight+this.titleNamingAreaHeight);
      (this.tempWidth<=700)? this.width = container.offsetWidth - 10:this.width = container.offsetWidth - this.seriesNamingAreaWidth;
      this.left = this.yAxisNamingAreaWidth;
      this.yDataPoints = [];
      this.xDistance = this.width - this.left;
      this.top = 65;
      this.yCoordinate = [];
      this.xCoordinate = [];
      this.xDataPoints = [];
      this.cylinderPlot = [];
      this.index = 0;
      this.shiftAngle = 0;
      this.getYDataPointsCoordinate();
      let xOriginLine = this.yDetermineXAxis();
      this.xOriginLine = xOriginLine.xOriginLine;
      this.index = xOriginLine.index;
      this.getXDataPointsCoordinate();
      this.findShiftAngle();
      this.getXDataPoints();
    },
    measureText(str, fontSize = 10) {
      const widths = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.2796875,0.2765625,0.3546875,0.5546875,0.5546875,0.8890625,0.665625,0.190625,0.3328125,0.3328125,0.3890625,0.5828125,0.2765625,0.3328125,0.2765625,0.3015625,0.5546875,0.5546875,0.5546875,0.5546875,0.5546875,0.5546875,0.5546875,0.5546875,0.5546875,0.5546875,0.2765625,0.2765625,0.584375,0.5828125,0.584375,0.5546875,1.0140625,0.665625,0.665625,0.721875,0.721875,0.665625,0.609375,0.7765625,0.721875,0.2765625,0.5,0.665625,0.5546875,0.8328125,0.721875,0.7765625,0.665625,0.7765625,0.721875,0.665625,0.609375,0.721875,0.665625,0.94375,0.665625,0.665625,0.609375,0.2765625,0.3546875,0.2765625,0.4765625,0.5546875,0.3328125,0.5546875,0.5546875,0.5,0.5546875,0.5546875,0.2765625,0.5546875,0.5546875,0.221875,0.240625,0.5,0.221875,0.8328125,0.5546875,0.5546875,0.5546875,0.5546875,0.3328125,0.5,0.2765625,0.5546875,0.5,0.721875,0.5,0.5,0.5,0.3546875,0.259375,0.353125,0.5890625]
      const avg = 0.5279276315789471
      return str
        .split('')
        .map(c => c.charCodeAt(0) < widths.length ? widths[c.charCodeAt(0)] : avg)
        .reduce((cur, acc) => acc + cur) * fontSize
    },
    yDetermineXAxis(){
      let xH = 0, index = 0;
      for(let point of this.yDataPoints){
        if(point==0){
          xH = ((this.height-this.top)-(index*this.yAxisSpacer));
          break;
        }
        index++;
      }
      return {xOriginLine:xH,index:index};
    },
    getYPlotPoints(val){
      let coordy = (this.height-this.top), i=0;

      for(let point of this.yDataPoints){
        if(i!=0){
          if((point>=val)&&(val>this.yDataPoints[i-1])){
            coordy = ((this.height-this.top)-(i-1)*this.yAxisSpacer)-(val-this.yDataPoints[i-1])*this.yUnit;
            break;
          }
        }
        i++;
      }
      if(val<0) coordy=coordy-this.xOriginLine;
      else coordy = this.xOriginLine-coordy;
      return (coordy<0)?-1*coordy:coordy;
    },
    getYDataPointsCoordinate(){
      let minAndMax = this.yFindMinAndMax();
      this.ygetYDataPoints(9);
      this.yAxisSpacer = (this.height-2*this.top)/parseFloat(this.yDataPoints.length-1);
      this.yUnit = this.yAxisSpacer/parseFloat((this.yDataPoints[1]-this.yDataPoints[0]));

      this.yDataPoints.forEach((item,i)=>{
        let val = (this.height-this.top)-(i*this.yAxisSpacer);
        if(val<0) val = -1*val;
        this.yCoordinate.push(val*Math.tan(this.ythetha));
      });
    },
    getXDataPointsCoordinate(){
      let categorySize = this.category.length;
      this.xAxisSpacer = ((this.xDistance+(this.depth*Math.sin(this.thetha))-(this.depth*Math.cos(this.thetha)))-(this.left+this.yCoordinate[this.index]-5))/parseFloat(categorySize);
      for(let i=0; i<categorySize; i++){
        this.xCoordinate.push(this.xAxisSpacer*i);
      }
    },
    getXDataPoints(){
      let categoriesCount = this.category.length, seriesCount = this.category[0].series.length,
          catSpaceGap = 0, seriesSpaceGap = 0,
          wByCategoryAxis = 0, wBySeriesAxis = 0, index = this.xCoordinate.length-1, multiplier = 0
      ;
      if(this.tempWidth>600){
        catSpaceGap = this.xAxisSpacer/8.0;
        seriesSpaceGap = this.depth/parseFloat(8.0*seriesCount);
        wByCategoryAxis = this.xAxisSpacer/4.0;
        wBySeriesAxis = this.depth/parseFloat(4.0*seriesCount);
        multiplier = 3.0;
      }
      else {
        if(this.tempWidth>500){
          catSpaceGap = this.xAxisSpacer/16.0;
          seriesSpaceGap = this.depth/parseFloat(16.0*seriesCount);
          wByCategoryAxis = this.xAxisSpacer/8.0;
          wBySeriesAxis = this.depth/parseFloat(8.0*seriesCount);
          multiplier = 7.0;
        }
        else{
          catSpaceGap = this.xAxisSpacer/20.0;
          seriesSpaceGap = this.depth/parseFloat(20.0*seriesCount);
          wByCategoryAxis = this.xAxisSpacer/10.0;
          wBySeriesAxis = this.depth/parseFloat(10.0*seriesCount);
          multiplier = 9.0;
        }
      }

      if(categoriesCount<=this.maxCategories&&seriesCount<=this.maxSeries){
        this.category.forEach((category,i)=>{
          Vue.set(this.xDataPoints,i,{series:[]});
          category.series.forEach((series,j)=>{
            let coord = this.getYPlotPoints(series.value);
            if(j==0){
              let x2 = ((this.xDistance-this.xCoordinate[index])+(this.depth*Math.sin(this.thetha))-(this.depth*Math.cos(this.thetha))-multiplier*catSpaceGap),
                  x1 = x2-wByCategoryAxis
              ;

              this.xDataPoints[i].series.push({
                front:{
                  x2:(x2+multiplier*seriesSpaceGap*Math.cos(this.thetha)),
                  x1:(x1+multiplier*seriesSpaceGap*Math.cos(this.thetha)),
                  y2:(this.xOriginLine+(this.depth*Math.sin(this.thetha))-(this.xCoordinate[index]*Math.sin(this.shiftAngle))-(multiplier*catSpaceGap)*Math.tan(this.shiftAngle)-multiplier*seriesSpaceGap*Math.sin(this.thetha)),
                  y1:(this.xOriginLine+(this.depth*Math.sin(this.thetha))-(this.xCoordinate[index]*Math.sin(this.shiftAngle))-(wByCategoryAxis+multiplier*catSpaceGap)*Math.tan(this.shiftAngle)-multiplier*seriesSpaceGap*Math.sin(this.thetha))
                },
                back:{
                  x2:(x2+(multiplier*seriesSpaceGap+wBySeriesAxis)*Math.cos(this.thetha)),
                  x1:(x1+(multiplier*seriesSpaceGap+wBySeriesAxis)*Math.cos(this.thetha)),
                  y1:(this.xOriginLine+(this.depth*Math.sin(this.thetha))-(this.xCoordinate[index]*Math.sin(this.shiftAngle))-(wByCategoryAxis+multiplier*catSpaceGap)*Math.tan(this.shiftAngle)-(multiplier*seriesSpaceGap+wBySeriesAxis)*Math.sin(this.thetha)),
                  y2:(this.xOriginLine+(this.depth*Math.sin(this.thetha))-(this.xCoordinate[index]*Math.sin(this.shiftAngle))-(multiplier*catSpaceGap)*Math.tan(this.shiftAngle)-(multiplier*seriesSpaceGap+wBySeriesAxis)*Math.sin(this.thetha))
                },
                left:{
                  x2:(x1+(multiplier*seriesSpaceGap+wBySeriesAxis)*Math.cos(this.thetha)),
                  x1:(x1+multiplier*seriesSpaceGap*Math.cos(this.thetha)),
                  y2:(this.xOriginLine+(this.depth*Math.sin(this.thetha))-(this.xCoordinate[index]*Math.sin(this.shiftAngle))-(wByCategoryAxis+multiplier*catSpaceGap)*Math.tan(this.shiftAngle)-(multiplier*seriesSpaceGap+wBySeriesAxis)*Math.sin(this.thetha)),
                  y1:(this.xOriginLine+(this.depth*Math.sin(this.thetha))-(this.xCoordinate[index]*Math.sin(this.shiftAngle))-(wByCategoryAxis+multiplier*catSpaceGap)*Math.tan(this.shiftAngle)-multiplier*seriesSpaceGap*Math.sin(this.thetha))
                },
                right:{
                  x2:(x2+(multiplier*seriesSpaceGap+wBySeriesAxis)*Math.cos(this.thetha)),
                  x1:(x2+multiplier*seriesSpaceGap*Math.cos(this.thetha)),
                  y2:(this.xOriginLine+(this.depth*Math.sin(this.thetha))-(this.xCoordinate[index]*Math.sin(this.shiftAngle))-(multiplier*catSpaceGap)*Math.tan(this.shiftAngle)-(multiplier*seriesSpaceGap+wBySeriesAxis)*Math.sin(this.thetha)),
                  y1:(this.xOriginLine+(this.depth*Math.sin(this.thetha))-(this.xCoordinate[index]*Math.sin(this.shiftAngle))-(multiplier*catSpaceGap)*Math.tan(this.shiftAngle)-multiplier*seriesSpaceGap*Math.sin(this.thetha))
                }
              });
            }
            else{
              this.xDataPoints[i].series.push({
                front:{
                  x2:(this.xDataPoints[i].series[j-1].back.x2+2*multiplier*seriesSpaceGap*Math.cos(this.thetha)),
                  x1:(this.xDataPoints[i].series[j-1].back.x1+2*multiplier*seriesSpaceGap*Math.cos(this.thetha)),
                  y1:(this.xDataPoints[i].series[j-1].back.y1-2*multiplier*seriesSpaceGap*Math.sin(this.thetha)),
                  y2:(this.xDataPoints[i].series[j-1].back.y2-2*multiplier*seriesSpaceGap*Math.sin(this.thetha))
                },
                back:{
                  x2:(this.xDataPoints[i].series[j-1].back.x2+(2*multiplier*seriesSpaceGap+wBySeriesAxis)*Math.cos(this.thetha)),
                  x1:(this.xDataPoints[i].series[j-1].back.x1+(2*multiplier*seriesSpaceGap+wBySeriesAxis)*Math.cos(this.thetha)),
                  y1:(this.xDataPoints[i].series[j-1].back.y1-(2*multiplier*seriesSpaceGap+wBySeriesAxis)*Math.sin(this.thetha)),
                  y2:(this.xDataPoints[i].series[j-1].back.y2-(2*multiplier*seriesSpaceGap+wBySeriesAxis)*Math.sin(this.thetha))
                },
                left:{
                  x2:(this.xDataPoints[i].series[j-1].back.x1+(2*multiplier*seriesSpaceGap+wBySeriesAxis)*Math.cos(this.thetha)),
                  x1:(this.xDataPoints[i].series[j-1].back.x1+2*multiplier*seriesSpaceGap*Math.cos(this.thetha)),
                  y1:(this.xDataPoints[i].series[j-1].back.y1-2*multiplier*seriesSpaceGap*Math.sin(this.thetha)),
                  y2:(this.xDataPoints[i].series[j-1].back.y1-(2*multiplier*seriesSpaceGap+wBySeriesAxis)*Math.sin(this.thetha))
                },
                right:{
                  x2:(this.xDataPoints[i].series[j-1].back.x2+(2*multiplier*seriesSpaceGap+wBySeriesAxis)*Math.cos(this.thetha)),
                  x1:(this.xDataPoints[i].series[j-1].back.x2+2*multiplier*seriesSpaceGap*Math.cos(this.thetha)),
                  y2:(this.xDataPoints[i].series[j-1].back.y2-(2*multiplier*seriesSpaceGap+wBySeriesAxis)*Math.sin(this.thetha)),
                  y1:(this.xDataPoints[i].series[j-1].back.y2-2*multiplier*seriesSpaceGap*Math.sin(this.thetha))
                }
              });
            }
          });
          index--;
        });
        this.getCylinderPlotPoints();
      }
    },
    getCylinderPlotPoints(){
      let categoriesCount = this.category.length, seriesCount = this.category[0].series.length,
          catSpaceGap = this.xAxisSpacer/8.0, seriesSpaceGap = this.depth/parseFloat(8*seriesCount),
          wByCategoryAxis = this.xAxisSpacer/4, wBySeriesAxis = this.depth/parseFloat(4*seriesCount), index = this.xCoordinate.length-1
      ;
      this.category.forEach((category,i)=>{
        Vue.set(this.cylinderPlot,i,{series:[]});
        for(let j=(seriesCount-1);j>=0;j--){
          let coord = this.getYPlotPoints(category.series[j].value);
          if(category.series[j].value>0){
            let bottomx2 = (this.xDataPoints[i].series[j].front.x2 + this.xDataPoints[i].series[j].back.x2)/2.0, bottomy2 = (this.xDataPoints[i].series[j].front.y2+this.xDataPoints[i].series[j].back.y2)/2.0,
                bottomx1 = (this.xDataPoints[i].series[j].front.x1 + this.xDataPoints[i].series[j].back.x1)/2.0, bottomy1 = (this.xDataPoints[i].series[j].front.y1+this.xDataPoints[i].series[j].back.y1)/2.0,
                topx2 = bottomx2, topx1 = bottomx1, topy2 = bottomy2-coord, topy1 = bottomy1-coord,
                bottombackQBCX = (this.xDataPoints[i].series[j].back.x1 + this.xDataPoints[i].series[j].back.x2)/2.0, bottombackQBCY = (this.xDataPoints[i].series[j].back.y1 + this.xDataPoints[i].series[j].back.y2)/2.0,
                qbcHeight = (bottomy1-bottombackQBCY)*Math.sin(this.thetha), bottombackQBCPoint = bottombackQBCY - qbcHeight, bottomfrontQBCY = (this.xDataPoints[i].series[j].front.y1 + this.xDataPoints[i].series[j].front.y2)/2.0,
                bottomfrontQBCX = bottombackQBCX, bottomfrontQBCPoint = bottomfrontQBCY + qbcHeight, topbackQBCX = bottombackQBCX, topbackQBCY = bottombackQBCY - coord,
                topbackQBCPoint = topbackQBCY - qbcHeight, topfrontQBCX = topbackQBCX, topfrontQBCY = bottomfrontQBCY - coord, topfrontQBCPoint = topfrontQBCY + qbcHeight
            ;
            this.cylinderPlot[i].series.push({
              bottombackCurve:'M '+bottomx2+' '+bottomy2+' q '+(bottombackQBCX-bottomx2)+' '+(-1*(bottomy2-bottombackQBCPoint))+' '+(bottomx1-bottomx2)+' '+(bottomy1-bottomy2),
              bottomfrontCurve:'M '+bottomx2+' '+bottomy2+' q '+(bottomfrontQBCX-bottomx2)+' '+(bottomfrontQBCPoint-bottomy2)+' '+(bottomx1-bottomx2)+' '+(bottomy1-bottomy2),
              topbackCurve:'M '+topx2+' '+topy2+' q '+(topbackQBCX-topx2)+' '+(-1*(topy2-topbackQBCPoint))+' '+(topx1-topx2)+' '+(topy1-topy2),
              topfrontCurve:'M '+topx2+' '+topy2+' q '+(topfrontQBCX-topx2)+' '+(topfrontQBCPoint-topy2)+' '+(topx1-topx2)+' '+(topy1-topy2),
              face:'M '+bottomx2+' '+bottomy2+' l '+(bottomx2-topx2)+' '+(-1*(bottomy1-topy1))+' q '+(topfrontQBCX-topx2)+' '+(topfrontQBCPoint-topy2)+' '+(topx1-topx2)+' '+(topy1-topy2)+' l '+(topx1-bottomx1)+' '+(bottomy1-topy1)+' q '+(bottomfrontQBCX-bottomx1)+' '+(bottomfrontQBCPoint-bottomy1)+' '+(bottomx2-bottomx1)+' '+(bottomy2-bottomy1),
              stroke:this.colors[j].color
            });
          }
          else{
            if(category.series[j].value==0){
              let topx2 = (this.xDataPoints[i].series[j].front.x2 + this.xDataPoints[i].series[j].back.x2)/2.0, topy2 = (this.xDataPoints[i].series[j].front.y2+this.xDataPoints[i].series[j].back.y2)/2.0,
                  topx1 = (this.xDataPoints[i].series[j].front.x1 + this.xDataPoints[i].series[j].back.x1)/2.0, topy1 = (this.xDataPoints[i].series[j].front.y1+this.xDataPoints[i].series[j].back.y1)/2.0,
                  topbackQBCX = (this.xDataPoints[i].series[j].back.x1 + this.xDataPoints[i].series[j].back.x2)/2.0, topbackQBCY = (this.xDataPoints[i].series[j].back.y1 + this.xDataPoints[i].series[j].back.y2)/2.0,
                  qbcHeight = (topy1-topbackQBCY)*Math.sin(this.thetha), topbackQBCPoint = topbackQBCY - qbcHeight, topfrontQBCY = (this.xDataPoints[i].series[j].front.y1 + this.xDataPoints[i].series[j].front.y2)/2.0,
                  topfrontQBCX = topbackQBCX, topfrontQBCPoint = topfrontQBCY + qbcHeight
              ;
              this.cylinderPlot[i].series.push({
                bottombackCurve:'',
                bottomfrontCurve:'',
                topbackCurve:'M '+topx2+' '+topy2+' q '+(topbackQBCX-topx2)+' '+(-1*(topy2-topbackQBCPoint))+' '+(topx1-topx2)+' '+(topy1-topy2),
                topfrontCurve:'M '+topx2+' '+topy2+' q '+(topfrontQBCX-topx2)+' '+(topfrontQBCPoint-topy2)+' '+(topx1-topx2)+' '+(topy1-topy2),
                face:'',
                stroke:this.colors[j].color
              });
            }
            else{
              let topx2 = (this.xDataPoints[i].series[j].front.x2 + this.xDataPoints[i].series[j].back.x2)/2.0, topy2 = (this.xDataPoints[i].series[j].front.y2+this.xDataPoints[i].series[j].back.y2)/2.0,
                  topx1 = (this.xDataPoints[i].series[j].front.x1 + this.xDataPoints[i].series[j].back.x1)/2.0, topy1 = (this.xDataPoints[i].series[j].front.y1+this.xDataPoints[i].series[j].back.y1)/2.0,
                  bottomx2 = topx2, bottomx1 = topx1, bottomy2 = topy2+coord, bottomy1 = topy1+coord,
                  topbackQBCX = (this.xDataPoints[i].series[j].back.x1 + this.xDataPoints[i].series[j].back.x2)/2.0, topbackQBCY = (this.xDataPoints[i].series[j].back.y1 + this.xDataPoints[i].series[j].back.y2)/2.0,
                  qbcHeight = (topy1-topbackQBCY)*Math.sin(this.thetha), topbackQBCPoint = topbackQBCY - qbcHeight, topfrontQBCY = (this.xDataPoints[i].series[j].front.y1 + this.xDataPoints[i].series[j].front.y2)/2.0,
                  topfrontQBCX = topbackQBCX, topfrontQBCPoint = topfrontQBCY + qbcHeight, bottombackQBCX = topbackQBCX, bottombackQBCY = topbackQBCY + coord,
                  bottombackQBCPoint = bottombackQBCY - qbcHeight, bottomfrontQBCX = bottombackQBCX, bottomfrontQBCY = topfrontQBCY + coord, bottomfrontQBCPoint = bottomfrontQBCY + qbcHeight
              ;
              this.cylinderPlot[i].series.push({
                bottombackCurve:'M '+bottomx2+' '+bottomy2+' q '+(bottombackQBCX-bottomx2)+' '+(-1*(bottomy2-bottombackQBCPoint))+' '+(bottomx1-bottomx2)+' '+(bottomy1-bottomy2),
                bottomfrontCurve:'M '+bottomx2+' '+bottomy2+' q '+(bottomfrontQBCX-bottomx2)+' '+(bottomfrontQBCPoint-bottomy2)+' '+(bottomx1-bottomx2)+' '+(bottomy1-bottomy2),
                topbackCurve:'M '+topx2+' '+topy2+' q '+(topbackQBCX-topx2)+' '+(-1*(topy2-topbackQBCPoint))+' '+(topx1-topx2)+' '+(topy1-topy2),
                topfrontCurve:'M '+topx2+' '+topy2+' q '+(topfrontQBCX-topx2)+' '+(topfrontQBCPoint-topy2)+' '+(topx1-topx2)+' '+(topy1-topy2),
                face:'M '+bottomx2+' '+bottomy2+' l '+(bottomx2-topx2)+' '+(-1*(bottomy1-topy1))+' q '+(topfrontQBCX-topx2)+' '+(topfrontQBCPoint-topy2)+' '+(topx1-topx2)+' '+(topy1-topy2)+' l '+(topx1-bottomx1)+' '+(bottomy1-topy1)+' q '+(bottomfrontQBCX-bottomx1)+' '+(bottomfrontQBCPoint-bottomy1)+' '+(bottomx2-bottomx1)+' '+(bottomy2-bottomy1),
                stroke:this.colors[j].color
              });
            }
          }
        }
      });
    },
    findShiftAngle(){
      this.shiftAngle = Math.asinh(this.depth*Math.sin(this.thetha)/((this.xDistance+(this.depth*Math.sin(this.thetha))-(this.depth*Math.cos(this.thetha)))-(this.left+this.yCoordinate[this.index]-5)));
    },
    yFindMinAndMax(){
      let max = this.category[0].series[0].value;
      let min = this.category[0].series[0].value;
      this.category.forEach((item,i)=>{
        item.series.forEach((category,j)=>{
          if(!(i==0&&j==0)){
            if(min>category.value) min = category.value;
            if(max<category.value) max = category.value;
          }
        });
      });
      this.ymin = min;
      this.ymax = max;
      return {max,min};
    },
    ygetYDataPoints(sizeInt){
      let min = this.ymin,
          max = this.ymax,
          diff = 0,
          gap = 0
      ;
      if(min<0){
        if(max>0){
          diff = max-min;
          gap=Math.floor(diff/parseFloat(sizeInt));
          gap = this.checkAndResetGap(gap);
          this.yDataPoints.push(0);
          this.getYNegativePoints(gap,min);
          this.yDataPoints.reverse();
          this.getYPositivePoints(gap,max);
        }
        else{
          diff = -1*min;
          gap=Math.floor(diff/parseFloat(sizeInt));
          gap = this.checkAndResetGap(gap);
          this.yDataPoints.push(0);
          this.getYNegativePoints(gap,min);
          this.yDataPoints.reverse();
        }
      }
      else{
        diff = max;
        gap=Math.floor(diff/parseFloat(sizeInt));
        gap = this.checkAndResetGap(gap);
        this.yDataPoints.push(0);
        this.getYPositivePoints(gap,max);
      }
    }
  },
  template:
  `
  <div class="block height-100-percent overflow-hidden text-center">
    <div class="block" :style="'height:'+titleNamingAreaHeight+'px;'"></div>
    <template v-if="tempWidth<=700">
      <div class="block" :style="'height:'+seriesNamingAreaHeight+'px;'"></div>
    </template>
    <div class="block row no-white-space text-left" style="font-size:0px;" :style="'height:'+(height+xAxisNamingAreaHeight-1)+'px;'">
      <div class="inline-block align-middle height-100-percent text-left" :style="'width:'+width+'px;'">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="height-100-percent width-100-percent" aria-labelledby="title" role="img">
          <title id="title">Column Chart</title>
          <g stroke="blue">
            <line :x1="((left-5)+yCoordinate[yCoordinate.length-1])" :x2="((left-5)+yCoordinate[0])" :y1="top" :y2="height-top"></line>
          </g>
          <g stroke="blue" style="font-size:10px;">
            <template v-for="(point,i) in yDataPoints">
              <text :x="(left-(measureText(point+'',13)/2)-10)" :y="((height-top)-i*yAxisSpacer)+4">{{point}}</text>
            </template>
          </g>
          <g stroke="blue">
            <template v-for="(point,i) in yCoordinate">
              <line :x1="((left-5)+(point-5))" :x2="((left-5)+point+5)" :y1="((height-top)-(i*yAxisSpacer))" :y2="((height-top)-(i*yAxisSpacer))"></line>
              <line :x1="(left+point-5)" :x2="((left+point-5)+(depth*Math.cos(thetha)))" :y1="((height-top)-(i*yAxisSpacer))" :y2="((height-top)-(i*yAxisSpacer))-(depth*Math.sin(thetha))"></line>
              <line :x1="(left+point-5)+(depth*Math.cos(thetha))" :x2="(xDistance)+(depth*Math.sin(thetha))" :y1="((height-top)-(i*yAxisSpacer))-(depth*Math.sin(thetha))" :y2="((height-top)-(i*yAxisSpacer))"></line>
            </template>
          </g>
          <g stroke="red">
            <template v-for="(point,i) in xCoordinate">
              <line :x1="((xDistance-point)+(depth*Math.sin(thetha))-(depth*Math.cos(thetha)))" :x2="((xDistance-point)+(depth*Math.sin(thetha)))" :y1="(xOriginLine+(depth*Math.sin(thetha))-(point*Math.sin(shiftAngle)))" :y2="(xOriginLine-(point*Math.sin(shiftAngle)))"></line>
            </template>
          </g>
          <g>
            <template v-for="(points,i) in cylinderPlot">
              <template v-for="(point,j) in points.series">
                <g>
                  <path :d="point.bottombackCurve+' '+point.bottomfrontCurve" style="stroke-width:2;" :stroke="point.stroke" :fill="point.stroke" />
                  <path :d="point.topbackCurve+' '+point.topfrontCurve" style="stroke-width:2;" :stroke="point.stroke" :fill="point.stroke" :fill-opacity="0.85" :stroke-opacity="0.5" />
                  <path :d="point.face" style="stroke-width:1;" :stroke="point.stroke" :fill="point.stroke" />
                </g>
              </template>
            </template>
          </g>
          <g stroke="blue">
            <line :x1="(left+yCoordinate[index]-5)" :x2="(xDistance+(depth*Math.sin(thetha))-(depth*Math.cos(thetha)))" :y1="xOriginLine" :y2="(xOriginLine+(depth*Math.sin(thetha)))"></line>
            <line :x1="(xDistance)+(depth*Math.sin(thetha))-(depth*Math.cos(thetha))" :x2="((xDistance)+(depth*Math.sin(thetha)))" :y1="(xOriginLine+(depth*Math.sin(thetha)))" :y2="xOriginLine"></line>
            <template v-if="index!=0">
              <line :x1="(left+yCoordinate[0]-5)" :x2="(xDistance)+(depth*Math.sin(thetha))-(depth*Math.cos(thetha))" :y1="(height-top)" :y2="(height-top)+(depth*Math.sin(thetha))"></line>
              <line :x1="(xDistance)+(depth*Math.sin(thetha))-(depth*Math.cos(thetha))" :x2="((xDistance)+(depth*Math.sin(thetha)))" :y1="((height-top)+(depth*Math.sin(thetha)))" :y2="(height-top)"></line>
            </template>
          </g>
        </svg>
      </div>
    </div>
  </div>
  `,
  mounted:function(){
    this.handleResize10();
    window.addEventListener("resize", this.debounce(this.handleResize10,1));
  },
  beforeDestroy: function() {
    window.removeEventListener("resize", this.debounce(this.handleResize10,1));
  }
};

const ThreeDClusteredCylinderChart = {
  data:function(){
    return {
      ymin:0,
      ymax:0,
      xmin:0,
      xmax:0,
      clusteredCylinderPlot:[],
      depth:30.0,
      thetha:0,
      ythetha:0,
      category:[
        {
          name:'Category 1',
          series:[
            {
              name:'Series 1',
              value:7110
            },
            {
              name:'Series 2',
              value:8240
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
              value:-3
            },
            {
              name:'Series 4',
              value:0
            }
          ]
        }
      ],
      yCoordinate:[],
      xCoordinate:[],
      index:0,
      shiftAngle:0
    };
  },
  mixins:[ColumnChartMixin],
  methods:{
    handleResize10(){
      this.thetha = Math.PI/4.0;
      this.ythetha = Math.PI/48;
      this.xAxisNamingAreaHeight = this.tempXAxisNamingAreaHeight;
      let container = document.getElementById('svg-charts');
      this.tempWidth = container.offsetWidth;
      (this.tempWidth<=700)? this.xAxisNamingAreaHeight = this.xAxisNamingAreaHeight - this.seriesNamingAreaHeight: this.xAxisNamingAreaHeight = this.xAxisNamingAreaHeight;
      this.height = container.offsetHeight - (((this.tempWidth<=700)? this.seriesNamingAreaHeight:0)+this.xAxisNamingAreaHeight+this.titleNamingAreaHeight);
      (this.tempWidth<=700)? this.width = container.offsetWidth - 10:this.width = container.offsetWidth - this.seriesNamingAreaWidth;
      this.left = this.yAxisNamingAreaWidth;
      this.yDataPoints = [];
      this.xDistance = this.width - this.left;
      this.top = 65;
      this.yCoordinate = [];
      this.xCoordinate = [];
      this.xDataPoints = [];
      this.clusteredCylinderPlot = [];
      this.index = 0;
      this.shiftAngle = 0;
      this.getYDataPointsCoordinate();
      let xOriginLine = this.yDetermineXAxis();
      this.xOriginLine = xOriginLine.xOriginLine;
      this.index = xOriginLine.index;
      this.getXDataPointsCoordinate();
      this.findShiftAngle();
      this.getXDataPoints();
    },
    measureText(str, fontSize = 10) {
      const widths = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.2796875,0.2765625,0.3546875,0.5546875,0.5546875,0.8890625,0.665625,0.190625,0.3328125,0.3328125,0.3890625,0.5828125,0.2765625,0.3328125,0.2765625,0.3015625,0.5546875,0.5546875,0.5546875,0.5546875,0.5546875,0.5546875,0.5546875,0.5546875,0.5546875,0.5546875,0.2765625,0.2765625,0.584375,0.5828125,0.584375,0.5546875,1.0140625,0.665625,0.665625,0.721875,0.721875,0.665625,0.609375,0.7765625,0.721875,0.2765625,0.5,0.665625,0.5546875,0.8328125,0.721875,0.7765625,0.665625,0.7765625,0.721875,0.665625,0.609375,0.721875,0.665625,0.94375,0.665625,0.665625,0.609375,0.2765625,0.3546875,0.2765625,0.4765625,0.5546875,0.3328125,0.5546875,0.5546875,0.5,0.5546875,0.5546875,0.2765625,0.5546875,0.5546875,0.221875,0.240625,0.5,0.221875,0.8328125,0.5546875,0.5546875,0.5546875,0.5546875,0.3328125,0.5,0.2765625,0.5546875,0.5,0.721875,0.5,0.5,0.5,0.3546875,0.259375,0.353125,0.5890625]
      const avg = 0.5279276315789471
      return str
        .split('')
        .map(c => c.charCodeAt(0) < widths.length ? widths[c.charCodeAt(0)] : avg)
        .reduce((cur, acc) => acc + cur) * fontSize
    },
    yDetermineXAxis(){
      let xH = 0, index = 0;
      for(let point of this.yDataPoints){
        if(point==0){
          xH = ((this.height-this.top)-(index*this.yAxisSpacer));
          break;
        }
        index++;
      }
      return {xOriginLine:xH,index:index};
    },
    getYPlotPoints(val){
      let coordy = (this.height-this.top), i=0;

      for(let point of this.yDataPoints){
        if(i!=0){
          if((point>=val)&&(val>this.yDataPoints[i-1])){
            coordy = ((this.height-this.top)-(i-1)*this.yAxisSpacer)-(val-this.yDataPoints[i-1])*this.yUnit;
            break;
          }
        }
        i++;
      }
      if(val<0) coordy=coordy-this.xOriginLine;
      else coordy = this.xOriginLine-coordy;
      return (coordy<0)?-1*coordy:coordy;
    },
    getYDataPointsCoordinate(){
      let minAndMax = this.yFindMinAndMax();
      this.ygetYDataPoints(9);
      this.yAxisSpacer = (this.height-2*this.top)/parseFloat(this.yDataPoints.length-1);
      this.yUnit = this.yAxisSpacer/parseFloat((this.yDataPoints[1]-this.yDataPoints[0]));

      this.yDataPoints.forEach((item,i)=>{
        let val = (this.height-this.top)-(i*this.yAxisSpacer);
        if(val<0) val = -1*val;
        this.yCoordinate.push(val*Math.tan(this.ythetha));
      });
    },
    getXDataPointsCoordinate(){
      let categorySize = this.category.length;
      this.xAxisSpacer = ((this.xDistance+(this.depth*Math.sin(this.thetha))-(this.depth*Math.cos(this.thetha)))-(this.left+this.yCoordinate[this.index]-5))/parseFloat(categorySize);
      for(let i=0; i<categorySize; i++){
        this.xCoordinate.push(this.xAxisSpacer*i);
      }
    },
    getXDataPoints(){
      let categoriesCount = this.category.length, seriesCount = this.category[0].series.length,
          catSeriesSpaceGap = 0, seriesSpaceGap = 0, wBySeriesAxis = 0, index = this.xCoordinate.length-1
      ;
      catSeriesSpaceGap = this.xAxisSpacer/(seriesCount+2);
      this.depth = catSeriesSpaceGap;
      seriesSpaceGap = catSeriesSpaceGap/4.0;
      wBySeriesAxis = catSeriesSpaceGap/2.0;

      if(categoriesCount<=this.maxCategories&&seriesCount<=this.maxSeries){
        this.category.forEach((category,i)=>{
          Vue.set(this.xDataPoints,i,{series:[]});
          category.series.forEach((series,j)=>{
            let coord = this.getYPlotPoints(series.value);
            if(j==0){
              let x2 = ((this.xDistance-this.xCoordinate[index])+(this.depth*Math.sin(this.thetha))-(this.depth*Math.cos(this.thetha))-catSeriesSpaceGap),
                  x1 = x2-catSeriesSpaceGap
              ;
              this.xDataPoints[i].series.push({
                front:{
                  x2:x2+seriesSpaceGap*Math.cos(this.thetha),
                  x1:x1+seriesSpaceGap*Math.cos(this.thetha),
                  y2:(this.xOriginLine+(this.depth*Math.sin(this.thetha))-(this.xCoordinate[index]*Math.sin(this.shiftAngle))-catSeriesSpaceGap*Math.tan(this.shiftAngle)-seriesSpaceGap*Math.sin(this.thetha)),
                  y1:(this.xOriginLine+(this.depth*Math.sin(this.thetha))-(this.xCoordinate[index]*Math.sin(this.shiftAngle))-((j+1)*catSeriesSpaceGap+catSeriesSpaceGap)*Math.tan(this.shiftAngle)-seriesSpaceGap*Math.sin(this.thetha))
                },
                back:{
                  x2:(x2+(seriesSpaceGap+wBySeriesAxis)*Math.cos(this.thetha)),
                  x1:(x1+(seriesSpaceGap+wBySeriesAxis)*Math.cos(this.thetha)),
                  y1:(this.xOriginLine+(this.depth*Math.sin(this.thetha))-(this.xCoordinate[index]*Math.sin(this.shiftAngle))-((j+1)*catSeriesSpaceGap+catSeriesSpaceGap)*Math.tan(this.shiftAngle)-(seriesSpaceGap+wBySeriesAxis)*Math.sin(this.thetha)),
                  y2:(this.xOriginLine+(this.depth*Math.sin(this.thetha))-(this.xCoordinate[index]*Math.sin(this.shiftAngle))-catSeriesSpaceGap*Math.tan(this.shiftAngle)-(seriesSpaceGap+wBySeriesAxis)*Math.sin(this.thetha))
                },
                left:{
                  x2:(x1+(seriesSpaceGap+wBySeriesAxis)*Math.cos(this.thetha)),
                  x1:(x1+seriesSpaceGap*Math.cos(this.thetha)),
                  y2:(this.xOriginLine+(this.depth*Math.sin(this.thetha))-(this.xCoordinate[index]*Math.sin(this.shiftAngle))-((j+1)*catSeriesSpaceGap+catSeriesSpaceGap)*Math.tan(this.shiftAngle)-(seriesSpaceGap+wBySeriesAxis)*Math.sin(this.thetha)),
                  y1:(this.xOriginLine+(this.depth*Math.sin(this.thetha))-(this.xCoordinate[index]*Math.sin(this.shiftAngle))-((j+1)*catSeriesSpaceGap+catSeriesSpaceGap)*Math.tan(this.shiftAngle)-seriesSpaceGap*Math.sin(this.thetha))
                },
                right:{
                  x2:(x2+(seriesSpaceGap+wBySeriesAxis)*Math.cos(this.thetha)),
                  x1:(x2+seriesSpaceGap*Math.cos(this.thetha)),
                  y2:(this.xOriginLine+(this.depth*Math.sin(this.thetha))-(this.xCoordinate[index]*Math.sin(this.shiftAngle))-catSeriesSpaceGap*Math.tan(this.shiftAngle)-(seriesSpaceGap+wBySeriesAxis)*Math.sin(this.thetha)),
                  y1:(this.xOriginLine+(this.depth*Math.sin(this.thetha))-(this.xCoordinate[index]*Math.sin(this.shiftAngle))-catSeriesSpaceGap*Math.tan(this.shiftAngle)-seriesSpaceGap*Math.sin(this.thetha))
                }
              });
            }
            else{
              this.xDataPoints[i].series.push({
                front:{
                  x2:this.xDataPoints[i].series[j-1].front.x1,
                  x1:this.xDataPoints[i].series[j-1].front.x1-catSeriesSpaceGap,
                  y1:(this.xDataPoints[i].series[j-1].front.y1-catSeriesSpaceGap*Math.tan(this.shiftAngle)),
                  y2:(this.xDataPoints[i].series[j-1].front.y2-catSeriesSpaceGap*Math.tan(this.shiftAngle))
                },
                back:{
                  x2:this.xDataPoints[i].series[j-1].back.x1,
                  x1:this.xDataPoints[i].series[j-1].back.x1-catSeriesSpaceGap,
                  y1:(this.xDataPoints[i].series[j-1].back.y1-catSeriesSpaceGap*Math.tan(this.shiftAngle)),
                  y2:(this.xDataPoints[i].series[j-1].back.y2-catSeriesSpaceGap*Math.tan(this.shiftAngle))
                },
                right:{
                  x2:this.xDataPoints[i].series[j-1].back.x1,
                  x1:this.xDataPoints[i].series[j-1].front.x1,
                  y1:this.xDataPoints[i].series[j-1].front.y1,
                  y2:this.xDataPoints[i].series[j-1].back.y1
                },
                left:{
                  x2:this.xDataPoints[i].series[j-1].back.x1-catSeriesSpaceGap,
                  x1:this.xDataPoints[i].series[j-1].front.x1-catSeriesSpaceGap,
                  y1:this.xDataPoints[i].series[j-1].front.y1,
                  y2:this.xDataPoints[i].series[j-1].back.y1
                }
              });
            }
          });
          index--;
        });
        this.getClusteredCylinderPlotPoints();
      }
    },
    getClusteredCylinderPlotPoints(){
      let seriesCount = this.category[0].series.length;

      this.category.forEach((category,i)=>{
        Vue.set(this.clusteredCylinderPlot,i,{series:[]});
        let k = 0;
        for(let j=(seriesCount-1);j>=0;j--){
          let coord = this.getYPlotPoints(category.series[j].value);
          if(category.series[j].value>0){
            let bottomx2 = (this.xDataPoints[i].series[k].front.x2 + this.xDataPoints[i].series[k].back.x2)/2.0, bottomy2 = (this.xDataPoints[i].series[k].front.y2+this.xDataPoints[i].series[k].back.y2)/2.0,
                bottomx1 = (this.xDataPoints[i].series[k].front.x1 + this.xDataPoints[i].series[k].back.x1)/2.0, bottomy1 = (this.xDataPoints[i].series[k].front.y1+this.xDataPoints[i].series[k].back.y1)/2.0,
                topx2 = bottomx2, topx1 = bottomx1, topy2 = bottomy2-coord, topy1 = bottomy1-coord,
                bottombackQBCX = (this.xDataPoints[i].series[k].back.x1 + this.xDataPoints[i].series[k].back.x2)/2.0, bottombackQBCY = (this.xDataPoints[i].series[k].back.y1 + this.xDataPoints[i].series[k].back.y2)/2.0,
                qbcHeight = (bottomy1-bottombackQBCY)*Math.sin(this.thetha), bottombackQBCPoint = bottombackQBCY - qbcHeight, bottomfrontQBCY = (this.xDataPoints[i].series[k].front.y1 + this.xDataPoints[i].series[k].front.y2)/2.0,
                bottomfrontQBCX = bottombackQBCX, bottomfrontQBCPoint = bottomfrontQBCY + qbcHeight, topbackQBCX = bottombackQBCX, topbackQBCY = bottombackQBCY - coord,
                topbackQBCPoint = topbackQBCY - qbcHeight, topfrontQBCX = topbackQBCX, topfrontQBCY = bottomfrontQBCY - coord, topfrontQBCPoint = topfrontQBCY + qbcHeight
            ;
            this.clusteredCylinderPlot[i].series.push({
              bottombackCurve:'M '+bottomx2+' '+bottomy2+' q '+(bottombackQBCX-bottomx2)+' '+(-1*(bottomy2-bottombackQBCPoint))+' '+(bottomx1-bottomx2)+' '+(bottomy1-bottomy2),
              bottomfrontCurve:'M '+bottomx2+' '+bottomy2+' q '+(bottomfrontQBCX-bottomx2)+' '+(bottomfrontQBCPoint-bottomy2)+' '+(bottomx1-bottomx2)+' '+(bottomy1-bottomy2),
              topbackCurve:'M '+topx2+' '+topy2+' q '+(topbackQBCX-topx2)+' '+(-1*(topy2-topbackQBCPoint))+' '+(topx1-topx2)+' '+(topy1-topy2),
              topfrontCurve:'M '+topx2+' '+topy2+' q '+(topfrontQBCX-topx2)+' '+(topfrontQBCPoint-topy2)+' '+(topx1-topx2)+' '+(topy1-topy2),
              face:'M '+bottomx2+' '+bottomy2+' l '+(bottomx2-topx2)+' '+(-1*(bottomy1-topy1))+' q '+(topfrontQBCX-topx2)+' '+(topfrontQBCPoint-topy2)+' '+(topx1-topx2)+' '+(topy1-topy2)+' l '+(topx1-bottomx1)+' '+(bottomy1-topy1)+' q '+(bottomfrontQBCX-bottomx1)+' '+(bottomfrontQBCPoint-bottomy1)+' '+(bottomx2-bottomx1)+' '+(bottomy2-bottomy1),
              stroke:this.colors[j].color
            });
          }
          else{
            if(category.series[j].value==0){
              let topx2 = (this.xDataPoints[i].series[k].front.x2 + this.xDataPoints[i].series[k].back.x2)/2.0, topy2 = (this.xDataPoints[i].series[k].front.y2+this.xDataPoints[i].series[k].back.y2)/2.0,
                  topx1 = (this.xDataPoints[i].series[k].front.x1 + this.xDataPoints[i].series[k].back.x1)/2.0, topy1 = (this.xDataPoints[i].series[k].front.y1+this.xDataPoints[i].series[k].back.y1)/2.0,
                  topbackQBCX = (this.xDataPoints[i].series[k].back.x1 + this.xDataPoints[i].series[k].back.x2)/2.0, topbackQBCY = (this.xDataPoints[i].series[k].back.y1 + this.xDataPoints[i].series[k].back.y2)/2.0,
                  qbcHeight = (topy1-topbackQBCY)*Math.sin(this.thetha), topbackQBCPoint = topbackQBCY - qbcHeight, topfrontQBCY = (this.xDataPoints[i].series[k].front.y1 + this.xDataPoints[i].series[k].front.y2)/2.0,
                  topfrontQBCX = topbackQBCX, topfrontQBCPoint = topfrontQBCY + qbcHeight
              ;
              this.clusteredCylinderPlot[i].series.push({
                bottombackCurve:'',
                bottomfrontCurve:'',
                topbackCurve:'M '+topx2+' '+topy2+' q '+(topbackQBCX-topx2)+' '+(-1*(topy2-topbackQBCPoint))+' '+(topx1-topx2)+' '+(topy1-topy2),
                topfrontCurve:'M '+topx2+' '+topy2+' q '+(topfrontQBCX-topx2)+' '+(topfrontQBCPoint-topy2)+' '+(topx1-topx2)+' '+(topy1-topy2),
                face:'',
                stroke:this.colors[j].color
              });
            }
            else{
              let topx2 = (this.xDataPoints[i].series[k].front.x2 + this.xDataPoints[i].series[k].back.x2)/2.0, topy2 = (this.xDataPoints[i].series[k].front.y2+this.xDataPoints[i].series[k].back.y2)/2.0,
                  topx1 = (this.xDataPoints[i].series[k].front.x1 + this.xDataPoints[i].series[k].back.x1)/2.0, topy1 = (this.xDataPoints[i].series[k].front.y1+this.xDataPoints[i].series[k].back.y1)/2.0,
                  bottomx2 = topx2, bottomx1 = topx1, bottomy2 = topy2+coord, bottomy1 = topy1+coord,
                  topbackQBCX = (this.xDataPoints[i].series[k].back.x1 + this.xDataPoints[i].series[k].back.x2)/2.0, topbackQBCY = (this.xDataPoints[i].series[k].back.y1 + this.xDataPoints[i].series[k].back.y2)/2.0,
                  qbcHeight = (topy1-topbackQBCY)*Math.sin(this.thetha), topbackQBCPoint = topbackQBCY - qbcHeight, topfrontQBCY = (this.xDataPoints[i].series[k].front.y1 + this.xDataPoints[i].series[k].front.y2)/2.0,
                  topfrontQBCX = topbackQBCX, topfrontQBCPoint = topfrontQBCY + qbcHeight, bottombackQBCX = topbackQBCX, bottombackQBCY = topbackQBCY + coord,
                  bottombackQBCPoint = bottombackQBCY - qbcHeight, bottomfrontQBCX = bottombackQBCX, bottomfrontQBCY = topfrontQBCY + coord, bottomfrontQBCPoint = bottomfrontQBCY + qbcHeight
              ;
              this.clusteredCylinderPlot[i].series.push({
                bottombackCurve:'M '+bottomx2+' '+bottomy2+' q '+(bottombackQBCX-bottomx2)+' '+(-1*(bottomy2-bottombackQBCPoint))+' '+(bottomx1-bottomx2)+' '+(bottomy1-bottomy2),
                bottomfrontCurve:'M '+bottomx2+' '+bottomy2+' q '+(bottomfrontQBCX-bottomx2)+' '+(bottomfrontQBCPoint-bottomy2)+' '+(bottomx1-bottomx2)+' '+(bottomy1-bottomy2),
                topbackCurve:'M '+topx2+' '+topy2+' q '+(topbackQBCX-topx2)+' '+(-1*(topy2-topbackQBCPoint))+' '+(topx1-topx2)+' '+(topy1-topy2),
                topfrontCurve:'M '+topx2+' '+topy2+' q '+(topfrontQBCX-topx2)+' '+(topfrontQBCPoint-topy2)+' '+(topx1-topx2)+' '+(topy1-topy2),
                face:'M '+bottomx2+' '+bottomy2+' l '+(bottomx2-topx2)+' '+(-1*(bottomy1-topy1))+' q '+(topfrontQBCX-topx2)+' '+(topfrontQBCPoint-topy2)+' '+(topx1-topx2)+' '+(topy1-topy2)+' l '+(topx1-bottomx1)+' '+(bottomy1-topy1)+' q '+(bottomfrontQBCX-bottomx1)+' '+(bottomfrontQBCPoint-bottomy1)+' '+(bottomx2-bottomx1)+' '+(bottomy2-bottomy1),
                stroke:this.colors[j].color
              });
            }
          }
          k++;
        }
      });
    },
    findShiftAngle(){
      this.shiftAngle = Math.asinh(this.depth*Math.sin(this.thetha)/((this.xDistance+(this.depth*Math.sin(this.thetha))-(this.depth*Math.cos(this.thetha)))-(this.left+this.yCoordinate[this.index]-5)));
    },
    yFindMinAndMax(){
      let max = this.category[0].series[0].value;
      let min = this.category[0].series[0].value;
      this.category.forEach((item,i)=>{
        item.series.forEach((category,j)=>{
          if(!(i==0&&j==0)){
            if(min>category.value) min = category.value;
            if(max<category.value) max = category.value;
          }
        });
      });
      this.ymin = min;
      this.ymax = max;
      return {max,min};
    },
    ygetYDataPoints(sizeInt){
      let min = this.ymin,
          max = this.ymax,
          diff = 0,
          gap = 0
      ;
      if(min<0){
        if(max>0){
          diff = max-min;
          gap=Math.floor(diff/parseFloat(sizeInt));
          gap = this.checkAndResetGap(gap);
          this.yDataPoints.push(0);
          this.getYNegativePoints(gap,min);
          this.yDataPoints.reverse();
          this.getYPositivePoints(gap,max);
        }
        else{
          diff = -1*min;
          gap=Math.floor(diff/parseFloat(sizeInt));
          gap = this.checkAndResetGap(gap);
          this.yDataPoints.push(0);
          this.getYNegativePoints(gap,min);
          this.yDataPoints.reverse();
        }
      }
      else{
        diff = max;
        gap=Math.floor(diff/parseFloat(sizeInt));
        gap = this.checkAndResetGap(gap);
        this.yDataPoints.push(0);
        this.getYPositivePoints(gap,max);
      }
    }
  },
  template:
  `
  <div class="block height-100-percent overflow-hidden text-center">
    <div class="block" :style="'height:'+titleNamingAreaHeight+'px;'"></div>
    <template v-if="tempWidth<=700">
      <div class="block" :style="'height:'+seriesNamingAreaHeight+'px;'"></div>
    </template>
    <div class="block row no-white-space text-left" style="font-size:0px;" :style="'height:'+(height+xAxisNamingAreaHeight-1)+'px;'">
      <div class="inline-block align-middle height-100-percent text-left" :style="'width:'+width+'px;'">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="height-100-percent width-100-percent" aria-labelledby="title" role="img">
          <title id="title">Column Chart</title>
          <g stroke="blue">
            <line :x1="((left-5)+yCoordinate[yCoordinate.length-1])" :x2="((left-5)+yCoordinate[0])" :y1="top" :y2="height-top"></line>
          </g>
          <g stroke="blue" style="font-size:10px;">
            <template v-for="(point,i) in yDataPoints">
              <text :x="(left-(measureText(point+'',13)/2)-10)" :y="((height-top)-i*yAxisSpacer)+4">{{point}}</text>
            </template>
          </g>
          <g stroke="blue">
            <template v-for="(point,i) in yCoordinate">
              <line :x1="((left-5)+(point-5))" :x2="((left-5)+point+5)" :y1="((height-top)-(i*yAxisSpacer))" :y2="((height-top)-(i*yAxisSpacer))"></line>
              <line :x1="(left+point-5)" :x2="((left+point-5)+(depth*Math.cos(thetha)))" :y1="((height-top)-(i*yAxisSpacer))" :y2="((height-top)-(i*yAxisSpacer))-(depth*Math.sin(thetha))"></line>
              <line :x1="(left+point-5)+(depth*Math.cos(thetha))" :x2="(xDistance)+(depth*Math.sin(thetha))" :y1="((height-top)-(i*yAxisSpacer))-(depth*Math.sin(thetha))" :y2="((height-top)-(i*yAxisSpacer))"></line>
            </template>
          </g>
          <g stroke="red">
            <template v-for="(point,i) in xCoordinate">
              <line :x1="((xDistance-point)+(depth*Math.sin(thetha))-(depth*Math.cos(thetha)))" :x2="((xDistance-point)+(depth*Math.sin(thetha)))" :y1="(xOriginLine+(depth*Math.sin(thetha))-(point*Math.sin(shiftAngle)))" :y2="(xOriginLine-(point*Math.sin(shiftAngle)))"></line>
            </template>
          </g>
          <g>
            <template v-for="(points,i) in clusteredCylinderPlot">
              <template v-for="(point,j) in points.series.reverse()">
                <g>
                  <path :d="point.bottombackCurve+' '+point.bottomfrontCurve" style="stroke-width:2;" :stroke="point.stroke" :fill="point.stroke" />
                  <path :d="point.topbackCurve+' '+point.topfrontCurve" style="stroke-width:2;" :stroke="point.stroke" :fill="point.stroke" :fill-opacity="0.85" :stroke-opacity="0.5" />
                  <path :d="point.face" style="stroke-width:1;" :stroke="point.stroke" :fill="point.stroke" />
                </g>
              </template>
            </template>
          </g>
          <g stroke="blue">
            <line :x1="(left+yCoordinate[index]-5)" :x2="(xDistance+(depth*Math.sin(thetha))-(depth*Math.cos(thetha)))" :y1="xOriginLine" :y2="(xOriginLine+(depth*Math.sin(thetha)))"></line>
            <line :x1="(xDistance)+(depth*Math.sin(thetha))-(depth*Math.cos(thetha))" :x2="((xDistance)+(depth*Math.sin(thetha)))" :y1="(xOriginLine+(depth*Math.sin(thetha)))" :y2="xOriginLine"></line>
            <template v-if="index!=0">
              <line :x1="(left+yCoordinate[0]-5)" :x2="(xDistance)+(depth*Math.sin(thetha))-(depth*Math.cos(thetha))" :y1="(height-top)" :y2="(height-top)+(depth*Math.sin(thetha))"></line>
              <line :x1="(xDistance)+(depth*Math.sin(thetha))-(depth*Math.cos(thetha))" :x2="((xDistance)+(depth*Math.sin(thetha)))" :y1="((height-top)+(depth*Math.sin(thetha)))" :y2="(height-top)"></line>
            </template>
          </g>
        </svg>
      </div>
    </div>
  </div>
  `,
  created:function(){
    let categoriesCount = this.category.length, seriesCount = this.category[0].series.length,
        catSeriesSpaceGap = 0, seriesSpaceGap = 0, wBySeriesAxis = 0, index = this.xCoordinate.length-1
    ;
    this.handleResize10();
    catSeriesSpaceGap = this.xAxisSpacer/(seriesCount+2);
    this.depth = catSeriesSpaceGap;
  },
  mounted:function(){
    this.handleResize10();
    window.addEventListener("resize", this.debounce(this.handleResize10,1));
  },
  beforeDestroy: function() {
    window.removeEventListener("resize", this.debounce(this.handleResize10,1));
  }
};


const ThreeDConeChart = {
  data:function(){
    return {
      ymin:0,
      ymax:0,
      xmin:0,
      xmax:0,
      depth:100.0,
      thetha:0,
      ythetha:0,
      conePlot:[],
      category:[
        {
          name:'Category 1',
          series:[
            {
              name:'Series 1',
              value:7110
            },
            {
              name:'Series 2',
              value:8240
            },
            {
              name:'Series 3',
              value:2111
            },
            {
              name:'Series 4',
              value:3120
            },
            {
              name:'Series 4',
              value:3120
            },
            {
              name:'Series 4',
              value:3120
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
            },
            {
              name:'Series 4',
              value:3120
            },
            {
              name:'Series 4',
              value:3120
            },
            {
              name:'Series 4',
              value:3120
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
            },
            {
              name:'Series 4',
              value:3120
            },
            {
              name:'Series 4',
              value:3120
            },
            {
              name:'Series 4',
              value:3120
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
            },
            {
              name:'Series 4',
              value:3120
            },
            {
              name:'Series 4',
              value:3120
            },
            {
              name:'Series 4',
              value:3120
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
              name:'Series 4',
              value:3120
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
            },
            {
              name:'Series 4',
              value:3120
            },
            {
              name:'Series 4',
              value:3120
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
              name:'Series 4',
              value:3120
            },
            {
              name:'Series 4',
              value:3120
            },
            {
              name:'Series 4',
              value:3120
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
            },
            {
              name:'Series 4',
              value:3120
            },
            {
              name:'Series 4',
              value:3120
            },
            {
              name:'Series 4',
              value:3120
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
              value:-3
            },
            {
              name:'Series 4',
              value:0
            },
            {
              name:'Series 4',
              value:3120
            },
            {
              name:'Series 4',
              value:3120
            },
            {
              name:'Series 4',
              value:3120
            }
          ]
        }
      ],
      yCoordinate:[],
      xCoordinate:[],
      index:0,
      shiftAngle:0
    };
  },
  mixins:[ColumnChartMixin],
  methods:{
    handleResize10(){
      this.thetha = Math.PI/4.0;
      this.ythetha = Math.PI/48;
      this.xAxisNamingAreaHeight = this.tempXAxisNamingAreaHeight;
      let container = document.getElementById('svg-charts');
      this.tempWidth = container.offsetWidth;
      (this.tempWidth<=700)? this.xAxisNamingAreaHeight = this.xAxisNamingAreaHeight - this.seriesNamingAreaHeight: this.xAxisNamingAreaHeight = this.xAxisNamingAreaHeight;
      this.height = container.offsetHeight - (((this.tempWidth<=700)? this.seriesNamingAreaHeight:0)+this.xAxisNamingAreaHeight+this.titleNamingAreaHeight);
      (this.tempWidth<=700)? this.width = container.offsetWidth - 10:this.width = container.offsetWidth - this.seriesNamingAreaWidth;
      this.left = this.yAxisNamingAreaWidth;
      this.yDataPoints = [];
      this.xDistance = this.width - this.left;
      this.top = 65;
      this.yCoordinate = [];
      this.xCoordinate = [];
      this.xDataPoints = [];
      this.conePlot = [];
      this.index = 0;
      this.shiftAngle = 0;
      this.getYDataPointsCoordinate();
      let xOriginLine = this.yDetermineXAxis();
      this.xOriginLine = xOriginLine.xOriginLine;
      this.index = xOriginLine.index;
      this.getXDataPointsCoordinate();
      this.findShiftAngle();
      this.getXDataPoints();
    },
    measureText(str, fontSize = 10) {
      const widths = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.2796875,0.2765625,0.3546875,0.5546875,0.5546875,0.8890625,0.665625,0.190625,0.3328125,0.3328125,0.3890625,0.5828125,0.2765625,0.3328125,0.2765625,0.3015625,0.5546875,0.5546875,0.5546875,0.5546875,0.5546875,0.5546875,0.5546875,0.5546875,0.5546875,0.5546875,0.2765625,0.2765625,0.584375,0.5828125,0.584375,0.5546875,1.0140625,0.665625,0.665625,0.721875,0.721875,0.665625,0.609375,0.7765625,0.721875,0.2765625,0.5,0.665625,0.5546875,0.8328125,0.721875,0.7765625,0.665625,0.7765625,0.721875,0.665625,0.609375,0.721875,0.665625,0.94375,0.665625,0.665625,0.609375,0.2765625,0.3546875,0.2765625,0.4765625,0.5546875,0.3328125,0.5546875,0.5546875,0.5,0.5546875,0.5546875,0.2765625,0.5546875,0.5546875,0.221875,0.240625,0.5,0.221875,0.8328125,0.5546875,0.5546875,0.5546875,0.5546875,0.3328125,0.5,0.2765625,0.5546875,0.5,0.721875,0.5,0.5,0.5,0.3546875,0.259375,0.353125,0.5890625]
      const avg = 0.5279276315789471
      return str
        .split('')
        .map(c => c.charCodeAt(0) < widths.length ? widths[c.charCodeAt(0)] : avg)
        .reduce((cur, acc) => acc + cur) * fontSize
    },
    yDetermineXAxis(){
      let xH = 0, index = 0;
      for(let point of this.yDataPoints){
        if(point==0){
          xH = ((this.height-this.top)-(index*this.yAxisSpacer));
          break;
        }
        index++;
      }
      return {xOriginLine:xH,index:index};
    },
    getYPlotPoints(val){
      let coordy = (this.height-this.top), i=0;

      for(let point of this.yDataPoints){
        if(i!=0){
          if((point>=val)&&(val>this.yDataPoints[i-1])){
            coordy = ((this.height-this.top)-(i-1)*this.yAxisSpacer)-(val-this.yDataPoints[i-1])*this.yUnit;
            break;
          }
        }
        i++;
      }
      if(val<0) coordy=coordy-this.xOriginLine;
      else coordy = this.xOriginLine-coordy;
      return (coordy<0)?-1*coordy:coordy;
    },
    getYDataPointsCoordinate(){
      let minAndMax = this.yFindMinAndMax();
      this.ygetYDataPoints(9);
      this.yAxisSpacer = (this.height-2*this.top)/parseFloat(this.yDataPoints.length-1);
      this.yUnit = this.yAxisSpacer/parseFloat((this.yDataPoints[1]-this.yDataPoints[0]));

      this.yDataPoints.forEach((item,i)=>{
        let val = (this.height-this.top)-(i*this.yAxisSpacer);
        if(val<0) val = -1*val;
        this.yCoordinate.push(val*Math.tan(this.ythetha));
      });
    },
    getXDataPointsCoordinate(){
      let categorySize = this.category.length;
      this.xAxisSpacer = ((this.xDistance+(this.depth*Math.sin(this.thetha))-(this.depth*Math.cos(this.thetha)))-(this.left+this.yCoordinate[this.index]-5))/parseFloat(categorySize);
      for(let i=0; i<categorySize; i++){
        this.xCoordinate.push(this.xAxisSpacer*i);
      }
    },
    getXDataPoints(){
      let categoriesCount = this.category.length, seriesCount = this.category[0].series.length,
          catSpaceGap = 0, seriesSpaceGap = 0,
          wByCategoryAxis = 0, wBySeriesAxis = 0, index = this.xCoordinate.length-1, multiplier = 0
      ;
      if(this.tempWidth>600){
        catSpaceGap = this.xAxisSpacer/8.0;
        seriesSpaceGap = this.depth/parseFloat(8.0*seriesCount);
        wByCategoryAxis = this.xAxisSpacer/4.0;
        wBySeriesAxis = this.depth/parseFloat(4.0*seriesCount);
        multiplier = 3.0;
      }
      else {
        if(this.tempWidth>500){
          catSpaceGap = this.xAxisSpacer/16.0;
          seriesSpaceGap = this.depth/parseFloat(16.0*seriesCount);
          wByCategoryAxis = this.xAxisSpacer/8.0;
          wBySeriesAxis = this.depth/parseFloat(8.0*seriesCount);
          multiplier = 7.0;
        }
        else{
          catSpaceGap = this.xAxisSpacer/20.0;
          seriesSpaceGap = this.depth/parseFloat(20.0*seriesCount);
          wByCategoryAxis = this.xAxisSpacer/10.0;
          wBySeriesAxis = this.depth/parseFloat(10.0*seriesCount);
          multiplier = 9.0;
        }
      }

      if(categoriesCount<=this.maxCategories&&seriesCount<=this.maxSeries){
        this.category.forEach((category,i)=>{
          Vue.set(this.xDataPoints,i,{series:[]});
          category.series.forEach((series,j)=>{
            let coord = this.getYPlotPoints(series.value);
            if(j==0){
              let x2 = ((this.xDistance-this.xCoordinate[index])+(this.depth*Math.sin(this.thetha))-(this.depth*Math.cos(this.thetha))-multiplier*catSpaceGap),
                  x1 = x2-wByCategoryAxis
              ;

              this.xDataPoints[i].series.push({
                front:{
                  x2:(x2+multiplier*seriesSpaceGap*Math.cos(this.thetha)),
                  x1:(x1+multiplier*seriesSpaceGap*Math.cos(this.thetha)),
                  y2:(this.xOriginLine+(this.depth*Math.sin(this.thetha))-(this.xCoordinate[index]*Math.sin(this.shiftAngle))-(multiplier*catSpaceGap)*Math.tan(this.shiftAngle)-multiplier*seriesSpaceGap*Math.sin(this.thetha)),
                  y1:(this.xOriginLine+(this.depth*Math.sin(this.thetha))-(this.xCoordinate[index]*Math.sin(this.shiftAngle))-(wByCategoryAxis+multiplier*catSpaceGap)*Math.tan(this.shiftAngle)-multiplier*seriesSpaceGap*Math.sin(this.thetha))
                },
                back:{
                  x2:(x2+(multiplier*seriesSpaceGap+wBySeriesAxis)*Math.cos(this.thetha)),
                  x1:(x1+(multiplier*seriesSpaceGap+wBySeriesAxis)*Math.cos(this.thetha)),
                  y1:(this.xOriginLine+(this.depth*Math.sin(this.thetha))-(this.xCoordinate[index]*Math.sin(this.shiftAngle))-(wByCategoryAxis+multiplier*catSpaceGap)*Math.tan(this.shiftAngle)-(multiplier*seriesSpaceGap+wBySeriesAxis)*Math.sin(this.thetha)),
                  y2:(this.xOriginLine+(this.depth*Math.sin(this.thetha))-(this.xCoordinate[index]*Math.sin(this.shiftAngle))-(multiplier*catSpaceGap)*Math.tan(this.shiftAngle)-(multiplier*seriesSpaceGap+wBySeriesAxis)*Math.sin(this.thetha))
                },
                left:{
                  x2:(x1+(multiplier*seriesSpaceGap+wBySeriesAxis)*Math.cos(this.thetha)),
                  x1:(x1+multiplier*seriesSpaceGap*Math.cos(this.thetha)),
                  y2:(this.xOriginLine+(this.depth*Math.sin(this.thetha))-(this.xCoordinate[index]*Math.sin(this.shiftAngle))-(wByCategoryAxis+multiplier*catSpaceGap)*Math.tan(this.shiftAngle)-(multiplier*seriesSpaceGap+wBySeriesAxis)*Math.sin(this.thetha)),
                  y1:(this.xOriginLine+(this.depth*Math.sin(this.thetha))-(this.xCoordinate[index]*Math.sin(this.shiftAngle))-(wByCategoryAxis+multiplier*catSpaceGap)*Math.tan(this.shiftAngle)-multiplier*seriesSpaceGap*Math.sin(this.thetha))
                },
                right:{
                  x2:(x2+(multiplier*seriesSpaceGap+wBySeriesAxis)*Math.cos(this.thetha)),
                  x1:(x2+multiplier*seriesSpaceGap*Math.cos(this.thetha)),
                  y2:(this.xOriginLine+(this.depth*Math.sin(this.thetha))-(this.xCoordinate[index]*Math.sin(this.shiftAngle))-(multiplier*catSpaceGap)*Math.tan(this.shiftAngle)-(multiplier*seriesSpaceGap+wBySeriesAxis)*Math.sin(this.thetha)),
                  y1:(this.xOriginLine+(this.depth*Math.sin(this.thetha))-(this.xCoordinate[index]*Math.sin(this.shiftAngle))-(multiplier*catSpaceGap)*Math.tan(this.shiftAngle)-multiplier*seriesSpaceGap*Math.sin(this.thetha))
                }
              });
            }
            else{
              this.xDataPoints[i].series.push({
                front:{
                  x2:(this.xDataPoints[i].series[j-1].back.x2+2*multiplier*seriesSpaceGap*Math.cos(this.thetha)),
                  x1:(this.xDataPoints[i].series[j-1].back.x1+2*multiplier*seriesSpaceGap*Math.cos(this.thetha)),
                  y1:(this.xDataPoints[i].series[j-1].back.y1-2*multiplier*seriesSpaceGap*Math.sin(this.thetha)),
                  y2:(this.xDataPoints[i].series[j-1].back.y2-2*multiplier*seriesSpaceGap*Math.sin(this.thetha))
                },
                back:{
                  x2:(this.xDataPoints[i].series[j-1].back.x2+(2*multiplier*seriesSpaceGap+wBySeriesAxis)*Math.cos(this.thetha)),
                  x1:(this.xDataPoints[i].series[j-1].back.x1+(2*multiplier*seriesSpaceGap+wBySeriesAxis)*Math.cos(this.thetha)),
                  y1:(this.xDataPoints[i].series[j-1].back.y1-(2*multiplier*seriesSpaceGap+wBySeriesAxis)*Math.sin(this.thetha)),
                  y2:(this.xDataPoints[i].series[j-1].back.y2-(2*multiplier*seriesSpaceGap+wBySeriesAxis)*Math.sin(this.thetha))
                },
                left:{
                  x2:(this.xDataPoints[i].series[j-1].back.x1+(2*multiplier*seriesSpaceGap+wBySeriesAxis)*Math.cos(this.thetha)),
                  x1:(this.xDataPoints[i].series[j-1].back.x1+2*multiplier*seriesSpaceGap*Math.cos(this.thetha)),
                  y1:(this.xDataPoints[i].series[j-1].back.y1-2*multiplier*seriesSpaceGap*Math.sin(this.thetha)),
                  y2:(this.xDataPoints[i].series[j-1].back.y1-(2*multiplier*seriesSpaceGap+wBySeriesAxis)*Math.sin(this.thetha))
                },
                right:{
                  x2:(this.xDataPoints[i].series[j-1].back.x2+(2*multiplier*seriesSpaceGap+wBySeriesAxis)*Math.cos(this.thetha)),
                  x1:(this.xDataPoints[i].series[j-1].back.x2+2*multiplier*seriesSpaceGap*Math.cos(this.thetha)),
                  y2:(this.xDataPoints[i].series[j-1].back.y2-(2*multiplier*seriesSpaceGap+wBySeriesAxis)*Math.sin(this.thetha)),
                  y1:(this.xDataPoints[i].series[j-1].back.y2-2*multiplier*seriesSpaceGap*Math.sin(this.thetha))
                }
              });
            }
          });
          index--;
        });
        this.getConePlotPoints();
      }
    },
    getConePlotPoints(){
      let categoriesCount = this.category.length, seriesCount = this.category[0].series.length,
          catSpaceGap = this.xAxisSpacer/8.0, seriesSpaceGap = this.depth/parseFloat(8*seriesCount),
          wByCategoryAxis = this.xAxisSpacer/4, wBySeriesAxis = this.depth/parseFloat(4*seriesCount), index = this.xCoordinate.length-1
      ;
      this.category.forEach((category,i)=>{
        Vue.set(this.conePlot,i,{series:[]});
        for(let j=(seriesCount-1);j>=0;j--){
          let coord = this.getYPlotPoints(category.series[j].value);
          if(category.series[j].value>0){
            let bottomx2 = (this.xDataPoints[i].series[j].front.x2 + this.xDataPoints[i].series[j].back.x2)/2.0, bottomy2 = (this.xDataPoints[i].series[j].front.y2+this.xDataPoints[i].series[j].back.y2)/2.0,
                bottomx1 = (this.xDataPoints[i].series[j].front.x1 + this.xDataPoints[i].series[j].back.x1)/2.0, bottomy1 = (this.xDataPoints[i].series[j].front.y1+this.xDataPoints[i].series[j].back.y1)/2.0,
                topx2 = bottomx2, topx1 = bottomx1, topy2 = bottomy2-coord, topy1 = bottomy1-coord, topapexX = (topx2+topx1)/2.0, topapexY = (topy1+topy2)/2.0,
                bottombackQBCX = (this.xDataPoints[i].series[j].back.x1 + this.xDataPoints[i].series[j].back.x2)/2.0, bottombackQBCY = (this.xDataPoints[i].series[j].back.y1 + this.xDataPoints[i].series[j].back.y2)/2.0,
                qbcHeight = (bottomy1-bottombackQBCY)*Math.sin(this.thetha), bottombackQBCPoint = bottombackQBCY - qbcHeight, bottomfrontQBCY = (this.xDataPoints[i].series[j].front.y1 + this.xDataPoints[i].series[j].front.y2)/2.0,
                bottomfrontQBCX = bottombackQBCX, bottomfrontQBCPoint = bottomfrontQBCY + qbcHeight
            ;
            this.conePlot[i].series.push({
              bottombackCurve:'M '+bottomx2+' '+bottomy2+' q '+(bottombackQBCX-bottomx2)+' '+(-1*(bottomy2-bottombackQBCPoint))+' '+(bottomx1-bottomx2)+' '+(bottomy1-bottomy2),
              bottomfrontCurve:'M '+bottomx2+' '+bottomy2+' q '+(bottomfrontQBCX-bottomx2)+' '+(bottomfrontQBCPoint-bottomy2)+' '+(bottomx1-bottomx2)+' '+(bottomy1-bottomy2),
              face:'M '+bottomx2+' '+bottomy2+' l '+(topapexX-bottomx2)+' '+(-1*(bottomy2-topapexY))+' l 0 '+(bottomy1-topapexY)+' M '+bottomx1+' '+bottomy1+' l '+(topapexX-bottomx1)+' '+(-1*(bottomy1-topapexY))+' l 0 '+(bottomy2-topapexY),
              stroke:this.colors[j].color
            });
          }
          else{
            if(category.series[j].value==0){
              let topx2 = (this.xDataPoints[i].series[j].front.x2 + this.xDataPoints[i].series[j].back.x2)/2.0, topy2 = (this.xDataPoints[i].series[j].front.y2+this.xDataPoints[i].series[j].back.y2)/2.0,
                  topx1 = (this.xDataPoints[i].series[j].front.x1 + this.xDataPoints[i].series[j].back.x1)/2.0, topy1 = (this.xDataPoints[i].series[j].front.y1+this.xDataPoints[i].series[j].back.y1)/2.0,
                  topbackQBCX = (this.xDataPoints[i].series[j].back.x1 + this.xDataPoints[i].series[j].back.x2)/2.0, topbackQBCY = (this.xDataPoints[i].series[j].back.y1 + this.xDataPoints[i].series[j].back.y2)/2.0,
                  qbcHeight = (topy1-topbackQBCY)*Math.sin(this.thetha), topbackQBCPoint = topbackQBCY - qbcHeight, topfrontQBCY = (this.xDataPoints[i].series[j].front.y1 + this.xDataPoints[i].series[j].front.y2)/2.0,
                  topfrontQBCX = topbackQBCX, topfrontQBCPoint = topfrontQBCY + qbcHeight
              ;
              this.conePlot[i].series.push({
                bottombackCurve:'M '+topx2+' '+topy2+' q '+(topbackQBCX-topx2)+' '+(-1*(topy2-topbackQBCPoint))+' '+(topx1-topx2)+' '+(topy1-topy2),
                bottomfrontCurve:'M '+topx2+' '+topy2+' q '+(topfrontQBCX-topx2)+' '+(topfrontQBCPoint-topy2)+' '+(topx1-topx2)+' '+(topy1-topy2),
                face:'',
                stroke:this.colors[j].color
              });
            }
            else{
              let bottomx2 = (this.xDataPoints[i].series[j].front.x2 + this.xDataPoints[i].series[j].back.x2)/2.0, bottomy2 = (this.xDataPoints[i].series[j].front.y2+this.xDataPoints[i].series[j].back.y2)/2.0,
                  bottomx1 = (this.xDataPoints[i].series[j].front.x1 + this.xDataPoints[i].series[j].back.x1)/2.0, bottomy1 = (this.xDataPoints[i].series[j].front.y1+this.xDataPoints[i].series[j].back.y1)/2.0,
                  topx2 = bottomx2, topx1 = bottomx1, topy2 = bottomy2+coord, topy1 = bottomy1+coord, topapexX = (topx2+topx1)/2.0, topapexY = (topy1+topy2)/2.0,
                  bottombackQBCX = (this.xDataPoints[i].series[j].back.x1 + this.xDataPoints[i].series[j].back.x2)/2.0, bottombackQBCY = (this.xDataPoints[i].series[j].back.y1 + this.xDataPoints[i].series[j].back.y2)/2.0,
                  qbcHeight = (bottomy1-bottombackQBCY)*Math.sin(this.thetha), bottombackQBCPoint = bottombackQBCY - qbcHeight, bottomfrontQBCY = (this.xDataPoints[i].series[j].front.y1 + this.xDataPoints[i].series[j].front.y2)/2.0,
                  bottomfrontQBCX = bottombackQBCX, bottomfrontQBCPoint = bottomfrontQBCY + qbcHeight
              ;
              this.conePlot[i].series.push({
                bottombackCurve:'M '+bottomx2+' '+bottomy2+' q '+(bottombackQBCX-bottomx2)+' '+(-1*(bottomy2-bottombackQBCPoint))+' '+(bottomx1-bottomx2)+' '+(bottomy1-bottomy2),
                bottomfrontCurve:'M '+bottomx2+' '+bottomy2+' q '+(bottomfrontQBCX-bottomx2)+' '+(bottomfrontQBCPoint-bottomy2)+' '+(bottomx1-bottomx2)+' '+(bottomy1-bottomy2),
                face:'M '+bottomx2+' '+bottomy2+' l '+(topapexX-bottomx2)+' '+(-1*(bottomy2-topapexY))+' l 0 '+(bottomy1-topapexY)+' M '+bottomx1+' '+bottomy1+' l '+(topapexX-bottomx1)+' '+(-1*(bottomy1-topapexY))+' l 0 '+(bottomy2-topapexY),
                stroke:this.colors[j].color
              });
            }
          }
        }
      });
    },
    findShiftAngle(){
      this.shiftAngle = Math.asinh(this.depth*Math.sin(this.thetha)/((this.xDistance+(this.depth*Math.sin(this.thetha))-(this.depth*Math.cos(this.thetha)))-(this.left+this.yCoordinate[this.index]-5)));
    },
    yFindMinAndMax(){
      let max = this.category[0].series[0].value;
      let min = this.category[0].series[0].value;
      this.category.forEach((item,i)=>{
        item.series.forEach((category,j)=>{
          if(!(i==0&&j==0)){
            if(min>category.value) min = category.value;
            if(max<category.value) max = category.value;
          }
        });
      });
      this.ymin = min;
      this.ymax = max;
      return {max,min};
    },
    ygetYDataPoints(sizeInt){
      let min = this.ymin,
          max = this.ymax,
          diff = 0,
          gap = 0
      ;
      if(min<0){
        if(max>0){
          diff = max-min;
          gap=Math.floor(diff/parseFloat(sizeInt));
          gap = this.checkAndResetGap(gap);
          this.yDataPoints.push(0);
          this.getYNegativePoints(gap,min);
          this.yDataPoints.reverse();
          this.getYPositivePoints(gap,max);
        }
        else{
          diff = -1*min;
          gap=Math.floor(diff/parseFloat(sizeInt));
          gap = this.checkAndResetGap(gap);
          this.yDataPoints.push(0);
          this.getYNegativePoints(gap,min);
          this.yDataPoints.reverse();
        }
      }
      else{
        diff = max;
        gap=Math.floor(diff/parseFloat(sizeInt));
        gap = this.checkAndResetGap(gap);
        this.yDataPoints.push(0);
        this.getYPositivePoints(gap,max);
      }
    }
  },
  template:
  `
  <div class="block height-100-percent overflow-hidden text-center">
    <div class="block" :style="'height:'+titleNamingAreaHeight+'px;'"></div>
    <template v-if="tempWidth<=700">
      <div class="block" :style="'height:'+seriesNamingAreaHeight+'px;'"></div>
    </template>
    <div class="block row no-white-space text-left" style="font-size:0px;" :style="'height:'+(height+xAxisNamingAreaHeight-1)+'px;'">
      <div class="inline-block align-middle height-100-percent text-left" :style="'width:'+width+'px;'">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="height-100-percent width-100-percent" aria-labelledby="title" role="img">
          <title id="title">Column Chart</title>
          <g stroke="blue">
            <line :x1="((left-5)+yCoordinate[yCoordinate.length-1])" :x2="((left-5)+yCoordinate[0])" :y1="top" :y2="height-top"></line>
          </g>
          <g stroke="blue" style="font-size:10px;">
            <template v-for="(point,i) in yDataPoints">
              <text :x="(left-(measureText(point+'',13)/2)-10)" :y="((height-top)-i*yAxisSpacer)+4">{{point}}</text>
            </template>
          </g>
          <g stroke="blue">
            <template v-for="(point,i) in yCoordinate">
              <line :x1="((left-5)+(point-5))" :x2="((left-5)+point+5)" :y1="((height-top)-(i*yAxisSpacer))" :y2="((height-top)-(i*yAxisSpacer))"></line>
              <line :x1="(left+point-5)" :x2="((left+point-5)+(depth*Math.cos(thetha)))" :y1="((height-top)-(i*yAxisSpacer))" :y2="((height-top)-(i*yAxisSpacer))-(depth*Math.sin(thetha))"></line>
              <line :x1="(left+point-5)+(depth*Math.cos(thetha))" :x2="(xDistance)+(depth*Math.sin(thetha))" :y1="((height-top)-(i*yAxisSpacer))-(depth*Math.sin(thetha))" :y2="((height-top)-(i*yAxisSpacer))"></line>
            </template>
          </g>
          <g stroke="red">
            <template v-for="(point,i) in xCoordinate">
              <line :x1="((xDistance-point)+(depth*Math.sin(thetha))-(depth*Math.cos(thetha)))" :x2="((xDistance-point)+(depth*Math.sin(thetha)))" :y1="(xOriginLine+(depth*Math.sin(thetha))-(point*Math.sin(shiftAngle)))" :y2="(xOriginLine-(point*Math.sin(shiftAngle)))"></line>
            </template>
          </g>
          <g>
            <template v-for="(points,i) in conePlot">
              <template v-for="(point,j) in points.series">
                <g>
                  <path :d="point.bottombackCurve+' '+point.bottomfrontCurve" style="stroke-width:2;" :stroke="point.stroke" :fill="point.stroke" />
                  <path :d="point.face" style="stroke-width:1;" :stroke="point.stroke" :fill="point.stroke" />
                </g>
              </template>
            </template>
          </g>
          <g stroke="blue">
            <line :x1="(left+yCoordinate[index]-5)" :x2="(xDistance+(depth*Math.sin(thetha))-(depth*Math.cos(thetha)))" :y1="xOriginLine" :y2="(xOriginLine+(depth*Math.sin(thetha)))"></line>
            <line :x1="(xDistance)+(depth*Math.sin(thetha))-(depth*Math.cos(thetha))" :x2="((xDistance)+(depth*Math.sin(thetha)))" :y1="(xOriginLine+(depth*Math.sin(thetha)))" :y2="xOriginLine"></line>
            <template v-if="index!=0">
              <line :x1="(left+yCoordinate[0]-5)" :x2="(xDistance)+(depth*Math.sin(thetha))-(depth*Math.cos(thetha))" :y1="(height-top)" :y2="(height-top)+(depth*Math.sin(thetha))"></line>
              <line :x1="(xDistance)+(depth*Math.sin(thetha))-(depth*Math.cos(thetha))" :x2="((xDistance)+(depth*Math.sin(thetha)))" :y1="((height-top)+(depth*Math.sin(thetha)))" :y2="(height-top)"></line>
            </template>
          </g>
        </svg>
      </div>
    </div>
  </div>
  `,
  mounted:function(){
    this.handleResize10();
    window.addEventListener("resize", this.debounce(this.handleResize10,1));
  },
  beforeDestroy: function() {
    window.removeEventListener("resize", this.debounce(this.handleResize10,1));
  }
};

const ThreeDClusteredConeChart = {
  data:function(){
    return {
      ymin:0,
      ymax:0,
      xmin:0,
      xmax:0,
      depth:0.0,
      thetha:0,
      ythetha:0,
      clusteredConePlot:[],
      category:[
        {
          name:'Category 1',
          series:[
            {
              name:'Series 1',
              value:7110
            },
            {
              name:'Series 2',
              value:8240
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
              value:-3
            },
            {
              name:'Series 4',
              value:0
            }
          ]
        }
      ],
      yCoordinate:[],
      xCoordinate:[],
      index:0,
      shiftAngle:0
    };
  },
  mixins:[ColumnChartMixin],
  methods:{
    handleResize10(){
      this.thetha = Math.PI/4.0;
      this.ythetha = Math.PI/48;
      this.xAxisNamingAreaHeight = this.tempXAxisNamingAreaHeight;
      let container = document.getElementById('svg-charts');
      this.tempWidth = container.offsetWidth;
      (this.tempWidth<=700)? this.xAxisNamingAreaHeight = this.xAxisNamingAreaHeight - this.seriesNamingAreaHeight: this.xAxisNamingAreaHeight = this.xAxisNamingAreaHeight;
      this.height = container.offsetHeight - (((this.tempWidth<=700)? this.seriesNamingAreaHeight:0)+this.xAxisNamingAreaHeight+this.titleNamingAreaHeight);
      (this.tempWidth<=700)? this.width = container.offsetWidth - 10:this.width = container.offsetWidth - this.seriesNamingAreaWidth;
      this.left = this.yAxisNamingAreaWidth;
      this.yDataPoints = [];
      this.xDistance = this.width - this.left;
      this.top = 65;
      this.yCoordinate = [];
      this.xCoordinate = [];
      this.xDataPoints = [];
      this.clusteredConePlot = [];
      this.index = 0;
      this.shiftAngle = 0;
      this.getYDataPointsCoordinate();
      let xOriginLine = this.yDetermineXAxis();
      this.xOriginLine = xOriginLine.xOriginLine;
      this.index = xOriginLine.index;
      this.getXDataPointsCoordinate();
      this.findShiftAngle();
      this.getXDataPoints();
    },
    measureText(str, fontSize = 10) {
      const widths = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.2796875,0.2765625,0.3546875,0.5546875,0.5546875,0.8890625,0.665625,0.190625,0.3328125,0.3328125,0.3890625,0.5828125,0.2765625,0.3328125,0.2765625,0.3015625,0.5546875,0.5546875,0.5546875,0.5546875,0.5546875,0.5546875,0.5546875,0.5546875,0.5546875,0.5546875,0.2765625,0.2765625,0.584375,0.5828125,0.584375,0.5546875,1.0140625,0.665625,0.665625,0.721875,0.721875,0.665625,0.609375,0.7765625,0.721875,0.2765625,0.5,0.665625,0.5546875,0.8328125,0.721875,0.7765625,0.665625,0.7765625,0.721875,0.665625,0.609375,0.721875,0.665625,0.94375,0.665625,0.665625,0.609375,0.2765625,0.3546875,0.2765625,0.4765625,0.5546875,0.3328125,0.5546875,0.5546875,0.5,0.5546875,0.5546875,0.2765625,0.5546875,0.5546875,0.221875,0.240625,0.5,0.221875,0.8328125,0.5546875,0.5546875,0.5546875,0.5546875,0.3328125,0.5,0.2765625,0.5546875,0.5,0.721875,0.5,0.5,0.5,0.3546875,0.259375,0.353125,0.5890625]
      const avg = 0.5279276315789471
      return str
        .split('')
        .map(c => c.charCodeAt(0) < widths.length ? widths[c.charCodeAt(0)] : avg)
        .reduce((cur, acc) => acc + cur) * fontSize
    },
    yDetermineXAxis(){
      let xH = 0, index = 0;
      for(let point of this.yDataPoints){
        if(point==0){
          xH = ((this.height-this.top)-(index*this.yAxisSpacer));
          break;
        }
        index++;
      }
      return {xOriginLine:xH,index:index};
    },
    getYPlotPoints(val){
      let coordy = (this.height-this.top), i=0;

      for(let point of this.yDataPoints){
        if(i!=0){
          if((point>=val)&&(val>this.yDataPoints[i-1])){
            coordy = ((this.height-this.top)-(i-1)*this.yAxisSpacer)-(val-this.yDataPoints[i-1])*this.yUnit;
            break;
          }
        }
        i++;
      }
      if(val<0) coordy=coordy-this.xOriginLine;
      else coordy = this.xOriginLine-coordy;
      return (coordy<0)?-1*coordy:coordy;
    },
    getYDataPointsCoordinate(){
      let minAndMax = this.yFindMinAndMax();
      this.ygetYDataPoints(9);
      this.yAxisSpacer = (this.height-2*this.top)/parseFloat(this.yDataPoints.length-1);
      this.yUnit = this.yAxisSpacer/parseFloat((this.yDataPoints[1]-this.yDataPoints[0]));

      this.yDataPoints.forEach((item,i)=>{
        let val = (this.height-this.top)-(i*this.yAxisSpacer);
        if(val<0) val = -1*val;
        this.yCoordinate.push(val*Math.tan(this.ythetha));
      });
    },
    getXDataPointsCoordinate(){
      let categorySize = this.category.length;
      this.xAxisSpacer = ((this.xDistance+(this.depth*Math.sin(this.thetha))-(this.depth*Math.cos(this.thetha)))-(this.left+this.yCoordinate[this.index]-5))/parseFloat(categorySize);
      for(let i=0; i<categorySize; i++){
        this.xCoordinate.push(this.xAxisSpacer*i);
      }
    },
    getXDataPoints(){
      let categoriesCount = this.category.length, seriesCount = this.category[0].series.length,
          catSeriesSpaceGap = 0, seriesSpaceGap = 0, wBySeriesAxis = 0, index = this.xCoordinate.length-1
      ;
      catSeriesSpaceGap = this.xAxisSpacer/(seriesCount+2);
      this.depth = catSeriesSpaceGap;
      seriesSpaceGap = catSeriesSpaceGap/4.0;
      wBySeriesAxis = catSeriesSpaceGap/2.0;

      if(categoriesCount<=this.maxCategories&&seriesCount<=this.maxSeries){
        this.category.forEach((category,i)=>{
          Vue.set(this.xDataPoints,i,{series:[]});
          category.series.forEach((series,j)=>{
            let coord = this.getYPlotPoints(series.value);
            if(j==0){
              let x2 = ((this.xDistance-this.xCoordinate[index])+(this.depth*Math.sin(this.thetha))-(this.depth*Math.cos(this.thetha))-catSeriesSpaceGap),
                  x1 = x2-catSeriesSpaceGap
              ;
              this.xDataPoints[i].series.push({
                front:{
                  x2:x2+seriesSpaceGap*Math.cos(this.thetha),
                  x1:x1+seriesSpaceGap*Math.cos(this.thetha),
                  y2:(this.xOriginLine+(this.depth*Math.sin(this.thetha))-(this.xCoordinate[index]*Math.sin(this.shiftAngle))-catSeriesSpaceGap*Math.tan(this.shiftAngle)-seriesSpaceGap*Math.sin(this.thetha)),
                  y1:(this.xOriginLine+(this.depth*Math.sin(this.thetha))-(this.xCoordinate[index]*Math.sin(this.shiftAngle))-((j+1)*catSeriesSpaceGap+catSeriesSpaceGap)*Math.tan(this.shiftAngle)-seriesSpaceGap*Math.sin(this.thetha))
                },
                back:{
                  x2:(x2+(seriesSpaceGap+wBySeriesAxis)*Math.cos(this.thetha)),
                  x1:(x1+(seriesSpaceGap+wBySeriesAxis)*Math.cos(this.thetha)),
                  y1:(this.xOriginLine+(this.depth*Math.sin(this.thetha))-(this.xCoordinate[index]*Math.sin(this.shiftAngle))-((j+1)*catSeriesSpaceGap+catSeriesSpaceGap)*Math.tan(this.shiftAngle)-(seriesSpaceGap+wBySeriesAxis)*Math.sin(this.thetha)),
                  y2:(this.xOriginLine+(this.depth*Math.sin(this.thetha))-(this.xCoordinate[index]*Math.sin(this.shiftAngle))-catSeriesSpaceGap*Math.tan(this.shiftAngle)-(seriesSpaceGap+wBySeriesAxis)*Math.sin(this.thetha))
                },
                left:{
                  x2:(x1+(seriesSpaceGap+wBySeriesAxis)*Math.cos(this.thetha)),
                  x1:(x1+seriesSpaceGap*Math.cos(this.thetha)),
                  y2:(this.xOriginLine+(this.depth*Math.sin(this.thetha))-(this.xCoordinate[index]*Math.sin(this.shiftAngle))-((j+1)*catSeriesSpaceGap+catSeriesSpaceGap)*Math.tan(this.shiftAngle)-(seriesSpaceGap+wBySeriesAxis)*Math.sin(this.thetha)),
                  y1:(this.xOriginLine+(this.depth*Math.sin(this.thetha))-(this.xCoordinate[index]*Math.sin(this.shiftAngle))-((j+1)*catSeriesSpaceGap+catSeriesSpaceGap)*Math.tan(this.shiftAngle)-seriesSpaceGap*Math.sin(this.thetha))
                },
                right:{
                  x2:(x2+(seriesSpaceGap+wBySeriesAxis)*Math.cos(this.thetha)),
                  x1:(x2+seriesSpaceGap*Math.cos(this.thetha)),
                  y2:(this.xOriginLine+(this.depth*Math.sin(this.thetha))-(this.xCoordinate[index]*Math.sin(this.shiftAngle))-catSeriesSpaceGap*Math.tan(this.shiftAngle)-(seriesSpaceGap+wBySeriesAxis)*Math.sin(this.thetha)),
                  y1:(this.xOriginLine+(this.depth*Math.sin(this.thetha))-(this.xCoordinate[index]*Math.sin(this.shiftAngle))-catSeriesSpaceGap*Math.tan(this.shiftAngle)-seriesSpaceGap*Math.sin(this.thetha))
                }
              });
            }
            else{
              this.xDataPoints[i].series.push({
                front:{
                  x2:this.xDataPoints[i].series[j-1].front.x1,
                  x1:this.xDataPoints[i].series[j-1].front.x1-catSeriesSpaceGap,
                  y1:(this.xDataPoints[i].series[j-1].front.y1-catSeriesSpaceGap*Math.tan(this.shiftAngle)),
                  y2:(this.xDataPoints[i].series[j-1].front.y2-catSeriesSpaceGap*Math.tan(this.shiftAngle))
                },
                back:{
                  x2:this.xDataPoints[i].series[j-1].back.x1,
                  x1:this.xDataPoints[i].series[j-1].back.x1-catSeriesSpaceGap,
                  y1:(this.xDataPoints[i].series[j-1].back.y1-catSeriesSpaceGap*Math.tan(this.shiftAngle)),
                  y2:(this.xDataPoints[i].series[j-1].back.y2-catSeriesSpaceGap*Math.tan(this.shiftAngle))
                },
                right:{
                  x2:this.xDataPoints[i].series[j-1].back.x1,
                  x1:this.xDataPoints[i].series[j-1].front.x1,
                  y1:this.xDataPoints[i].series[j-1].front.y1,
                  y2:this.xDataPoints[i].series[j-1].back.y1
                },
                left:{
                  x2:this.xDataPoints[i].series[j-1].back.x1-catSeriesSpaceGap,
                  x1:this.xDataPoints[i].series[j-1].front.x1-catSeriesSpaceGap,
                  y1:this.xDataPoints[i].series[j-1].front.y1,
                  y2:this.xDataPoints[i].series[j-1].back.y1
                }
              });
            }
          });
          index--;
        });
        this.getClusteredConePlotPoints();
      }
    },
    getClusteredConePlotPoints(){
      let categoriesCount = this.category.length, seriesCount = this.category[0].series.length,
          catSpaceGap = this.xAxisSpacer/8.0, seriesSpaceGap = this.depth/parseFloat(8*seriesCount),
          wByCategoryAxis = this.xAxisSpacer/4, wBySeriesAxis = this.depth/parseFloat(4*seriesCount), index = this.xCoordinate.length-1
      ;
      this.category.forEach((category,i)=>{
        Vue.set(this.clusteredConePlot,i,{series:[]});
        let k = 0;
        for(let j=(seriesCount-1);j>=0;j--){
          let coord = this.getYPlotPoints(category.series[j].value);
          if(category.series[j].value>0){
            let bottomx2 = (this.xDataPoints[i].series[k].front.x2 + this.xDataPoints[i].series[k].back.x2)/2.0, bottomy2 = (this.xDataPoints[i].series[k].front.y2+this.xDataPoints[i].series[k].back.y2)/2.0,
                bottomx1 = (this.xDataPoints[i].series[k].front.x1 + this.xDataPoints[i].series[k].back.x1)/2.0, bottomy1 = (this.xDataPoints[i].series[k].front.y1+this.xDataPoints[i].series[k].back.y1)/2.0,
                topx2 = bottomx2, topx1 = bottomx1, topy2 = bottomy2-coord, topy1 = bottomy1-coord, topapexX = (topx2+topx1)/2.0, topapexY = (topy1+topy2)/2.0,
                bottombackQBCX = (this.xDataPoints[i].series[k].back.x1 + this.xDataPoints[i].series[k].back.x2)/2.0, bottombackQBCY = (this.xDataPoints[i].series[k].back.y1 + this.xDataPoints[i].series[k].back.y2)/2.0,
                qbcHeight = (bottomy1-bottombackQBCY)*Math.sin(this.thetha), bottombackQBCPoint = bottombackQBCY - qbcHeight, bottomfrontQBCY = (this.xDataPoints[i].series[k].front.y1 + this.xDataPoints[i].series[k].front.y2)/2.0,
                bottomfrontQBCX = bottombackQBCX, bottomfrontQBCPoint = bottomfrontQBCY + qbcHeight
            ;
            this.clusteredConePlot[i].series.push({
              bottombackCurve:'M '+bottomx2+' '+bottomy2+' q '+(bottombackQBCX-bottomx2)+' '+(-1*(bottomy2-bottombackQBCPoint))+' '+(bottomx1-bottomx2)+' '+(bottomy1-bottomy2),
              bottomfrontCurve:'M '+bottomx2+' '+bottomy2+' q '+(bottomfrontQBCX-bottomx2)+' '+(bottomfrontQBCPoint-bottomy2)+' '+(bottomx1-bottomx2)+' '+(bottomy1-bottomy2),
              face:'M '+bottomx2+' '+bottomy2+' l '+(topapexX-bottomx2)+' '+(-1*(bottomy2-topapexY))+' l 0 '+(bottomy1-topapexY)+' M '+bottomx1+' '+bottomy1+' l '+(topapexX-bottomx1)+' '+(-1*(bottomy1-topapexY))+' l 0 '+(bottomy2-topapexY),
              stroke:this.colors[j].color
            });
          }
          else{
            if(category.series[j].value==0){
              let topx2 = (this.xDataPoints[i].series[k].front.x2 + this.xDataPoints[i].series[k].back.x2)/2.0, topy2 = (this.xDataPoints[i].series[k].front.y2+this.xDataPoints[i].series[k].back.y2)/2.0,
                  topx1 = (this.xDataPoints[i].series[k].front.x1 + this.xDataPoints[i].series[k].back.x1)/2.0, topy1 = (this.xDataPoints[i].series[k].front.y1+this.xDataPoints[i].series[k].back.y1)/2.0,
                  topbackQBCX = (this.xDataPoints[i].series[k].back.x1 + this.xDataPoints[i].series[k].back.x2)/2.0, topbackQBCY = (this.xDataPoints[i].series[k].back.y1 + this.xDataPoints[i].series[k].back.y2)/2.0,
                  qbcHeight = (topy1-topbackQBCY)*Math.sin(this.thetha), topbackQBCPoint = topbackQBCY - qbcHeight, topfrontQBCY = (this.xDataPoints[i].series[k].front.y1 + this.xDataPoints[i].series[k].front.y2)/2.0,
                  topfrontQBCX = topbackQBCX, topfrontQBCPoint = topfrontQBCY + qbcHeight
              ;
              this.clusteredConePlot[i].series.push({
                bottombackCurve:'M '+topx2+' '+topy2+' q '+(topbackQBCX-topx2)+' '+(-1*(topy2-topbackQBCPoint))+' '+(topx1-topx2)+' '+(topy1-topy2),
                bottomfrontCurve:'M '+topx2+' '+topy2+' q '+(topfrontQBCX-topx2)+' '+(topfrontQBCPoint-topy2)+' '+(topx1-topx2)+' '+(topy1-topy2),
                face:'',
                stroke:this.colors[j].color
              });
            }
            else{
              let bottomx2 = (this.xDataPoints[i].series[k].front.x2 + this.xDataPoints[i].series[k].back.x2)/2.0, bottomy2 = (this.xDataPoints[i].series[k].front.y2+this.xDataPoints[i].series[k].back.y2)/2.0,
                  bottomx1 = (this.xDataPoints[i].series[k].front.x1 + this.xDataPoints[i].series[k].back.x1)/2.0, bottomy1 = (this.xDataPoints[i].series[k].front.y1+this.xDataPoints[i].series[k].back.y1)/2.0,
                  topx2 = bottomx2, topx1 = bottomx1, topy2 = bottomy2+coord, topy1 = bottomy1+coord, topapexX = (topx2+topx1)/2.0, topapexY = (topy1+topy2)/2.0,
                  bottombackQBCX = (this.xDataPoints[i].series[k].back.x1 + this.xDataPoints[i].series[k].back.x2)/2.0, bottombackQBCY = (this.xDataPoints[i].series[k].back.y1 + this.xDataPoints[i].series[k].back.y2)/2.0,
                  qbcHeight = (bottomy1-bottombackQBCY)*Math.sin(this.thetha), bottombackQBCPoint = bottombackQBCY - qbcHeight, bottomfrontQBCY = (this.xDataPoints[i].series[k].front.y1 + this.xDataPoints[i].series[k].front.y2)/2.0,
                  bottomfrontQBCX = bottombackQBCX, bottomfrontQBCPoint = bottomfrontQBCY + qbcHeight
              ;
              this.clusteredConePlot[i].series.push({
                bottombackCurve:'M '+bottomx2+' '+bottomy2+' q '+(bottombackQBCX-bottomx2)+' '+(-1*(bottomy2-bottombackQBCPoint))+' '+(bottomx1-bottomx2)+' '+(bottomy1-bottomy2),
                bottomfrontCurve:'M '+bottomx2+' '+bottomy2+' q '+(bottomfrontQBCX-bottomx2)+' '+(bottomfrontQBCPoint-bottomy2)+' '+(bottomx1-bottomx2)+' '+(bottomy1-bottomy2),
                face:'M '+bottomx2+' '+bottomy2+' l '+(topapexX-bottomx2)+' '+(-1*(bottomy2-topapexY))+' l 0 '+(bottomy1-topapexY)+' M '+bottomx1+' '+bottomy1+' l '+(topapexX-bottomx1)+' '+(-1*(bottomy1-topapexY))+' l 0 '+(bottomy2-topapexY),
                stroke:this.colors[j].color
              });
            }
          }
          k++;
        }
      });
    },
    findShiftAngle(){
      this.shiftAngle = Math.asinh(this.depth*Math.sin(this.thetha)/((this.xDistance+(this.depth*Math.sin(this.thetha))-(this.depth*Math.cos(this.thetha)))-(this.left+this.yCoordinate[this.index]-5)));
    },
    yFindMinAndMax(){
      let max = this.category[0].series[0].value;
      let min = this.category[0].series[0].value;
      this.category.forEach((item,i)=>{
        item.series.forEach((category,j)=>{
          if(!(i==0&&j==0)){
            if(min>category.value) min = category.value;
            if(max<category.value) max = category.value;
          }
        });
      });
      this.ymin = min;
      this.ymax = max;
      return {max,min};
    },
    ygetYDataPoints(sizeInt){
      let min = this.ymin,
          max = this.ymax,
          diff = 0,
          gap = 0
      ;
      if(min<0){
        if(max>0){
          diff = max-min;
          gap=Math.floor(diff/parseFloat(sizeInt));
          gap = this.checkAndResetGap(gap,min,max);
          this.yDataPoints.push(0);
          this.getYNegativePoints(gap,min);
          this.yDataPoints.reverse();
          this.getYPositivePoints(gap,max);
        }
        else{
          diff = -1*min;
          gap=Math.floor(diff/parseFloat(sizeInt));
          gap = this.checkAndResetGap(gap,min,max);
          this.yDataPoints.push(0);
          this.getYNegativePoints(gap,min);
          this.yDataPoints.reverse();
        }
      }
      else{
        diff = max;
        gap=Math.floor(diff/parseFloat(sizeInt));
        gap = this.checkAndResetGap(gap,min,max);
        this.yDataPoints.push(0);
        this.getYPositivePoints(gap,max);
      }
    }
  },
  template:
  `
  <div class="block height-100-percent overflow-hidden text-center">
    <div class="block" :style="'height:'+titleNamingAreaHeight+'px;'"></div>
    <template v-if="tempWidth<=700">
      <div class="block" :style="'height:'+seriesNamingAreaHeight+'px;'"></div>
    </template>
    <div class="block row no-white-space text-left" style="font-size:0px;" :style="'height:'+(height+xAxisNamingAreaHeight-1)+'px;'">
      <div class="inline-block align-middle height-100-percent text-left" :style="'width:'+width+'px;'">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="height-100-percent width-100-percent" aria-labelledby="title" role="img">
          <title id="title">Column Chart</title>
          <g stroke="blue">
            <line :x1="((left-5)+yCoordinate[yCoordinate.length-1])" :x2="((left-5)+yCoordinate[0])" :y1="top" :y2="height-top"></line>
          </g>
          <g stroke="blue" style="font-size:10px;">
            <template v-for="(point,i) in yDataPoints">
              <text :x="(left-(measureText(point+'',13)/2)-10)" :y="((height-top)-i*yAxisSpacer)+4">{{point}}</text>
            </template>
          </g>
          <g stroke="blue">
            <template v-for="(point,i) in yCoordinate">
              <line :x1="((left-5)+(point-5))" :x2="((left-5)+point+5)" :y1="((height-top)-(i*yAxisSpacer))" :y2="((height-top)-(i*yAxisSpacer))"></line>
              <line :x1="(left+point-5)" :x2="((left+point-5)+(depth*Math.cos(thetha)))" :y1="((height-top)-(i*yAxisSpacer))" :y2="((height-top)-(i*yAxisSpacer))-(depth*Math.sin(thetha))"></line>
              <line :x1="(left+point-5)+(depth*Math.cos(thetha))" :x2="(xDistance)+(depth*Math.sin(thetha))" :y1="((height-top)-(i*yAxisSpacer))-(depth*Math.sin(thetha))" :y2="((height-top)-(i*yAxisSpacer))"></line>
            </template>
          </g>
          <g stroke="red">
            <template v-for="(point,i) in xCoordinate">
              <line :x1="((xDistance-point)+(depth*Math.sin(thetha))-(depth*Math.cos(thetha)))" :x2="((xDistance-point)+(depth*Math.sin(thetha)))" :y1="(xOriginLine+(depth*Math.sin(thetha))-(point*Math.sin(shiftAngle)))" :y2="(xOriginLine-(point*Math.sin(shiftAngle)))"></line>
            </template>
          </g>
          <g>
            <template v-for="(points,i) in clusteredConePlot">
              <template v-for="(point,j) in points.series.reverse()">
                <g>
                  <path :d="point.bottombackCurve+' '+point.bottomfrontCurve" style="stroke-width:2;" :stroke="point.stroke" :fill="point.stroke" />
                  <path :d="point.face" style="stroke-width:1;" :stroke="point.stroke" :fill="point.stroke" />
                </g>
              </template>
            </template>
          </g>
          <g stroke="blue">
            <line :x1="(left+yCoordinate[index]-5)" :x2="(xDistance+(depth*Math.sin(thetha))-(depth*Math.cos(thetha)))" :y1="xOriginLine" :y2="(xOriginLine+(depth*Math.sin(thetha)))"></line>
            <line :x1="(xDistance)+(depth*Math.sin(thetha))-(depth*Math.cos(thetha))" :x2="((xDistance)+(depth*Math.sin(thetha)))" :y1="(xOriginLine+(depth*Math.sin(thetha)))" :y2="xOriginLine"></line>
            <template v-if="index!=0">
              <line :x1="(left+yCoordinate[0]-5)" :x2="(xDistance)+(depth*Math.sin(thetha))-(depth*Math.cos(thetha))" :y1="(height-top)" :y2="(height-top)+(depth*Math.sin(thetha))"></line>
              <line :x1="(xDistance)+(depth*Math.sin(thetha))-(depth*Math.cos(thetha))" :x2="((xDistance)+(depth*Math.sin(thetha)))" :y1="((height-top)+(depth*Math.sin(thetha)))" :y2="(height-top)"></line>
            </template>
          </g>
        </svg>
      </div>
    </div>
  </div>
  `,
  created:function(){
    let categoriesCount = this.category.length, seriesCount = this.category[0].series.length,
        catSeriesSpaceGap = 0, seriesSpaceGap = 0, wBySeriesAxis = 0, index = this.xCoordinate.length-1
    ;
    this.handleResize10();
    catSeriesSpaceGap = this.xAxisSpacer/(seriesCount+2);
    this.depth = catSeriesSpaceGap;
  },
  mounted:function(){
    this.handleResize10();
    window.addEventListener("resize", this.debounce(this.handleResize10,1));
  },
  beforeDestroy: function() {
    window.removeEventListener("resize", this.debounce(this.handleResize10,1));
  }
};

const ThreeDPyramidChart = {
  data:function(){
    return {
      ymin:0,
      ymax:0,
      xmin:0,
      xmax:0,
      depth:100.0,
      thetha:0,
      ythetha:0,
      pyramidPlot:[],
      category:[
        {
          name:'Category 1',
          series:[
            {
              name:'Series 1',
              value:7110
            },
            {
              name:'Series 2',
              value:8240
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
              value:-3
            },
            {
              name:'Series 4',
              value:0
            }
          ]
        }
      ],
      yCoordinate:[],
      xCoordinate:[],
      index:0,
      shiftAngle:0
    };
  },
  mixins:[ColumnChartMixin],
  methods:{
    handleResize10(){
      this.thetha = Math.PI/4.0;
      this.ythetha = Math.PI/48;
      this.xAxisNamingAreaHeight = this.tempXAxisNamingAreaHeight;
      let container = document.getElementById('svg-charts');
      this.tempWidth = container.offsetWidth;
      (this.tempWidth<=700)? this.xAxisNamingAreaHeight = this.xAxisNamingAreaHeight - this.seriesNamingAreaHeight: this.xAxisNamingAreaHeight = this.xAxisNamingAreaHeight;
      this.height = container.offsetHeight - (((this.tempWidth<=700)? this.seriesNamingAreaHeight:0)+this.xAxisNamingAreaHeight+this.titleNamingAreaHeight);
      (this.tempWidth<=700)? this.width = container.offsetWidth - 10:this.width = container.offsetWidth - this.seriesNamingAreaWidth;
      this.left = this.yAxisNamingAreaWidth;
      this.yDataPoints = [];
      this.xDistance = this.width - this.left;
      this.top = 65;
      this.yCoordinate = [];
      this.xCoordinate = [];
      this.xDataPoints = [];
      this.pyramidPlot = [];
      this.index = 0;
      this.shiftAngle = 0;
      this.getYDataPointsCoordinate();
      let xOriginLine = this.yDetermineXAxis();
      this.xOriginLine = xOriginLine.xOriginLine;
      this.index = xOriginLine.index;
      this.getXDataPointsCoordinate();
      this.findShiftAngle();
      this.getXDataPoints();
    },
    measureText(str, fontSize = 10) {
      const widths = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.2796875,0.2765625,0.3546875,0.5546875,0.5546875,0.8890625,0.665625,0.190625,0.3328125,0.3328125,0.3890625,0.5828125,0.2765625,0.3328125,0.2765625,0.3015625,0.5546875,0.5546875,0.5546875,0.5546875,0.5546875,0.5546875,0.5546875,0.5546875,0.5546875,0.5546875,0.2765625,0.2765625,0.584375,0.5828125,0.584375,0.5546875,1.0140625,0.665625,0.665625,0.721875,0.721875,0.665625,0.609375,0.7765625,0.721875,0.2765625,0.5,0.665625,0.5546875,0.8328125,0.721875,0.7765625,0.665625,0.7765625,0.721875,0.665625,0.609375,0.721875,0.665625,0.94375,0.665625,0.665625,0.609375,0.2765625,0.3546875,0.2765625,0.4765625,0.5546875,0.3328125,0.5546875,0.5546875,0.5,0.5546875,0.5546875,0.2765625,0.5546875,0.5546875,0.221875,0.240625,0.5,0.221875,0.8328125,0.5546875,0.5546875,0.5546875,0.5546875,0.3328125,0.5,0.2765625,0.5546875,0.5,0.721875,0.5,0.5,0.5,0.3546875,0.259375,0.353125,0.5890625]
      const avg = 0.5279276315789471
      return str
        .split('')
        .map(c => c.charCodeAt(0) < widths.length ? widths[c.charCodeAt(0)] : avg)
        .reduce((cur, acc) => acc + cur) * fontSize
    },
    yDetermineXAxis(){
      let xH = 0, index = 0;
      for(let point of this.yDataPoints){
        if(point==0){
          xH = ((this.height-this.top)-(index*this.yAxisSpacer));
          break;
        }
        index++;
      }
      return {xOriginLine:xH,index:index};
    },
    getYPlotPoints(val){
      let coordy = (this.height-this.top), i=0;

      for(let point of this.yDataPoints){
        if(i!=0){
          if((point>=val)&&(val>this.yDataPoints[i-1])){
            coordy = ((this.height-this.top)-(i-1)*this.yAxisSpacer)-(val-this.yDataPoints[i-1])*this.yUnit;
            break;
          }
        }
        i++;
      }
      if(val<0) coordy=coordy-this.xOriginLine;
      else coordy = this.xOriginLine-coordy;
      return (coordy<0)?-1*coordy:coordy;
    },
    getYDataPointsCoordinate(){
      let minAndMax = this.yFindMinAndMax();
      this.ygetYDataPoints(9);
      this.yAxisSpacer = (this.height-2*this.top)/parseFloat(this.yDataPoints.length-1);
      this.yUnit = this.yAxisSpacer/parseFloat((this.yDataPoints[1]-this.yDataPoints[0]));

      this.yDataPoints.forEach((item,i)=>{
        let val = (this.height-this.top)-(i*this.yAxisSpacer);
        if(val<0) val = -1*val;
        this.yCoordinate.push(val*Math.tan(this.ythetha));
      });
    },
    getXDataPointsCoordinate(){
      let categorySize = this.category.length;
      this.xAxisSpacer = ((this.xDistance+(this.depth*Math.sin(this.thetha))-(this.depth*Math.cos(this.thetha)))-(this.left+this.yCoordinate[this.index]-5))/parseFloat(categorySize);
      for(let i=0; i<categorySize; i++){
        this.xCoordinate.push(this.xAxisSpacer*i);
      }
    },
    getXDataPoints(){
      let categoriesCount = this.category.length, seriesCount = this.category[0].series.length,
          catSpaceGap = 0, seriesSpaceGap = 0,
          wByCategoryAxis = 0, wBySeriesAxis = 0, index = this.xCoordinate.length-1, multiplier = 0
      ;
      if(this.tempWidth>600){
        catSpaceGap = this.xAxisSpacer/8.0;
        seriesSpaceGap = this.depth/parseFloat(8.0*seriesCount);
        wByCategoryAxis = this.xAxisSpacer/4.0;
        wBySeriesAxis = this.depth/parseFloat(4.0*seriesCount);
        multiplier = 3.0;
      }
      else {
        if(this.tempWidth>500){
          catSpaceGap = this.xAxisSpacer/16.0;
          seriesSpaceGap = this.depth/parseFloat(16.0*seriesCount);
          wByCategoryAxis = this.xAxisSpacer/8.0;
          wBySeriesAxis = this.depth/parseFloat(8.0*seriesCount);
          multiplier = 7.0;
        }
        else{
          catSpaceGap = this.xAxisSpacer/20.0;
          seriesSpaceGap = this.depth/parseFloat(20.0*seriesCount);
          wByCategoryAxis = this.xAxisSpacer/10.0;
          wBySeriesAxis = this.depth/parseFloat(10.0*seriesCount);
          multiplier = 9.0;
        }
      }

      if(categoriesCount<=this.maxCategories&&seriesCount<=this.maxSeries){
        this.category.forEach((category,i)=>{
          Vue.set(this.xDataPoints,i,{series:[]});
          category.series.forEach((series,j)=>{
            let coord = this.getYPlotPoints(series.value);
            if(j==0){
              let x2 = ((this.xDistance-this.xCoordinate[index])+(this.depth*Math.sin(this.thetha))-(this.depth*Math.cos(this.thetha))-multiplier*catSpaceGap),
                  x1 = x2-wByCategoryAxis
              ;

              this.xDataPoints[i].series.push({
                front:{
                  x2:(x2+multiplier*seriesSpaceGap*Math.cos(this.thetha)),
                  x1:(x1+multiplier*seriesSpaceGap*Math.cos(this.thetha)),
                  y2:(this.xOriginLine+(this.depth*Math.sin(this.thetha))-(this.xCoordinate[index]*Math.sin(this.shiftAngle))-(multiplier*catSpaceGap)*Math.tan(this.shiftAngle)-multiplier*seriesSpaceGap*Math.sin(this.thetha)),
                  y1:(this.xOriginLine+(this.depth*Math.sin(this.thetha))-(this.xCoordinate[index]*Math.sin(this.shiftAngle))-(wByCategoryAxis+multiplier*catSpaceGap)*Math.tan(this.shiftAngle)-multiplier*seriesSpaceGap*Math.sin(this.thetha))
                },
                back:{
                  x2:(x2+(multiplier*seriesSpaceGap+wBySeriesAxis)*Math.cos(this.thetha)),
                  x1:(x1+(multiplier*seriesSpaceGap+wBySeriesAxis)*Math.cos(this.thetha)),
                  y1:(this.xOriginLine+(this.depth*Math.sin(this.thetha))-(this.xCoordinate[index]*Math.sin(this.shiftAngle))-(wByCategoryAxis+multiplier*catSpaceGap)*Math.tan(this.shiftAngle)-(multiplier*seriesSpaceGap+wBySeriesAxis)*Math.sin(this.thetha)),
                  y2:(this.xOriginLine+(this.depth*Math.sin(this.thetha))-(this.xCoordinate[index]*Math.sin(this.shiftAngle))-(multiplier*catSpaceGap)*Math.tan(this.shiftAngle)-(multiplier*seriesSpaceGap+wBySeriesAxis)*Math.sin(this.thetha))
                },
                left:{
                  x2:(x1+(multiplier*seriesSpaceGap+wBySeriesAxis)*Math.cos(this.thetha)),
                  x1:(x1+multiplier*seriesSpaceGap*Math.cos(this.thetha)),
                  y2:(this.xOriginLine+(this.depth*Math.sin(this.thetha))-(this.xCoordinate[index]*Math.sin(this.shiftAngle))-(wByCategoryAxis+multiplier*catSpaceGap)*Math.tan(this.shiftAngle)-(multiplier*seriesSpaceGap+wBySeriesAxis)*Math.sin(this.thetha)),
                  y1:(this.xOriginLine+(this.depth*Math.sin(this.thetha))-(this.xCoordinate[index]*Math.sin(this.shiftAngle))-(wByCategoryAxis+multiplier*catSpaceGap)*Math.tan(this.shiftAngle)-multiplier*seriesSpaceGap*Math.sin(this.thetha))
                },
                right:{
                  x2:(x2+(multiplier*seriesSpaceGap+wBySeriesAxis)*Math.cos(this.thetha)),
                  x1:(x2+multiplier*seriesSpaceGap*Math.cos(this.thetha)),
                  y2:(this.xOriginLine+(this.depth*Math.sin(this.thetha))-(this.xCoordinate[index]*Math.sin(this.shiftAngle))-(multiplier*catSpaceGap)*Math.tan(this.shiftAngle)-(multiplier*seriesSpaceGap+wBySeriesAxis)*Math.sin(this.thetha)),
                  y1:(this.xOriginLine+(this.depth*Math.sin(this.thetha))-(this.xCoordinate[index]*Math.sin(this.shiftAngle))-(multiplier*catSpaceGap)*Math.tan(this.shiftAngle)-multiplier*seriesSpaceGap*Math.sin(this.thetha))
                }
              });
            }
            else{
              this.xDataPoints[i].series.push({
                front:{
                  x2:(this.xDataPoints[i].series[j-1].back.x2+2*multiplier*seriesSpaceGap*Math.cos(this.thetha)),
                  x1:(this.xDataPoints[i].series[j-1].back.x1+2*multiplier*seriesSpaceGap*Math.cos(this.thetha)),
                  y1:(this.xDataPoints[i].series[j-1].back.y1-2*multiplier*seriesSpaceGap*Math.sin(this.thetha)),
                  y2:(this.xDataPoints[i].series[j-1].back.y2-2*multiplier*seriesSpaceGap*Math.sin(this.thetha))
                },
                back:{
                  x2:(this.xDataPoints[i].series[j-1].back.x2+(2*multiplier*seriesSpaceGap+wBySeriesAxis)*Math.cos(this.thetha)),
                  x1:(this.xDataPoints[i].series[j-1].back.x1+(2*multiplier*seriesSpaceGap+wBySeriesAxis)*Math.cos(this.thetha)),
                  y1:(this.xDataPoints[i].series[j-1].back.y1-(2*multiplier*seriesSpaceGap+wBySeriesAxis)*Math.sin(this.thetha)),
                  y2:(this.xDataPoints[i].series[j-1].back.y2-(2*multiplier*seriesSpaceGap+wBySeriesAxis)*Math.sin(this.thetha))
                },
                left:{
                  x2:(this.xDataPoints[i].series[j-1].back.x1+(2*multiplier*seriesSpaceGap+wBySeriesAxis)*Math.cos(this.thetha)),
                  x1:(this.xDataPoints[i].series[j-1].back.x1+2*multiplier*seriesSpaceGap*Math.cos(this.thetha)),
                  y1:(this.xDataPoints[i].series[j-1].back.y1-2*multiplier*seriesSpaceGap*Math.sin(this.thetha)),
                  y2:(this.xDataPoints[i].series[j-1].back.y1-(2*multiplier*seriesSpaceGap+wBySeriesAxis)*Math.sin(this.thetha))
                },
                right:{
                  x2:(this.xDataPoints[i].series[j-1].back.x2+(2*multiplier*seriesSpaceGap+wBySeriesAxis)*Math.cos(this.thetha)),
                  x1:(this.xDataPoints[i].series[j-1].back.x2+2*multiplier*seriesSpaceGap*Math.cos(this.thetha)),
                  y2:(this.xDataPoints[i].series[j-1].back.y2-(2*multiplier*seriesSpaceGap+wBySeriesAxis)*Math.sin(this.thetha)),
                  y1:(this.xDataPoints[i].series[j-1].back.y2-2*multiplier*seriesSpaceGap*Math.sin(this.thetha))
                }
              });
            }
          });
          index--;
        });
        this.getPyramidPlotPoints();
      }
    },
    getPyramidPlotPoints(){
      let categoriesCount = this.category.length, seriesCount = this.category[0].series.length;
      this.category.forEach((category,i)=>{
        Vue.set(this.pyramidPlot,i,{series:[]});
        for(let j=(seriesCount-1);j>=0;j--){
          let coord = this.getYPlotPoints(category.series[j].value);
          if(category.series[j].value>0){
            let topx2 = (this.xDataPoints[i].series[j].front.x2 + this.xDataPoints[i].series[j].back.x2)/2.0,
                topx1 = (this.xDataPoints[i].series[j].front.x1 + this.xDataPoints[i].series[j].back.x1)/2.0,
                topy2 = ((this.xDataPoints[i].series[j].front.y2+this.xDataPoints[i].series[j].back.y2)/2.0)-coord,
                topy1 = ((this.xDataPoints[i].series[j].front.y1+this.xDataPoints[i].series[j].back.y1)/2.0)-coord,
                topapexX = (topx2+topx1)/2.0, topapexY = (topy1+topy2)/2.0
            ;
            this.pyramidPlot[i].series.push({
              front:this.xDataPoints[i].series[j].front.x1+','+this.xDataPoints[i].series[j].front.y1+' '+
                    topapexX+','+topapexY+' '+this.xDataPoints[i].series[j].front.x2+','+this.xDataPoints[i].series[j].front.y2,
              back:this.xDataPoints[i].series[j].back.x1+','+this.xDataPoints[i].series[j].back.y1+' '+
                    topapexX+','+topapexY+' '+this.xDataPoints[i].series[j].back.x2+','+this.xDataPoints[i].series[j].back.y2,
              right:this.xDataPoints[i].series[j].right.x1+','+this.xDataPoints[i].series[j].right.y1+' '+
                    topapexX+','+topapexY+' '+this.xDataPoints[i].series[j].right.x2+','+this.xDataPoints[i].series[j].right.y2,
              top:this.xDataPoints[i].series[j].front.x1+','+this.xDataPoints[i].series[j].front.y1+' '+
                  this.xDataPoints[i].series[j].front.x2+','+this.xDataPoints[i].series[j].front.y2+' '+
                  this.xDataPoints[i].series[j].right.x1+','+this.xDataPoints[i].series[j].right.y1+' '+
                  this.xDataPoints[i].series[j].right.x2+','+this.xDataPoints[i].series[j].right.y2+' '+
                  this.xDataPoints[i].series[j].back.x2+','+this.xDataPoints[i].series[j].back.y2+' '+
                  this.xDataPoints[i].series[j].back.x1+','+this.xDataPoints[i].series[j].back.y1+' '+
                  this.xDataPoints[i].series[j].left.x2+','+this.xDataPoints[i].series[j].left.y2+' '+
                  this.xDataPoints[i].series[j].left.x1+','+this.xDataPoints[i].series[j].left.y1,
              stroke:this.colors[j].color
            });
          }
          else{
            if(category.series[j].value==0){
              this.pyramidPlot[i].series.push({
                top:this.xDataPoints[i].series[j].front.x1+','+this.xDataPoints[i].series[j].front.y1+' '+
                    this.xDataPoints[i].series[j].front.x2+','+this.xDataPoints[i].series[j].front.y2+' '+
                    this.xDataPoints[i].series[j].right.x1+','+this.xDataPoints[i].series[j].right.y1+' '+
                    this.xDataPoints[i].series[j].right.x2+','+this.xDataPoints[i].series[j].right.y2+' '+
                    this.xDataPoints[i].series[j].back.x2+','+this.xDataPoints[i].series[j].back.y2+' '+
                    this.xDataPoints[i].series[j].back.x1+','+this.xDataPoints[i].series[j].back.y1+' '+
                    this.xDataPoints[i].series[j].left.x2+','+this.xDataPoints[i].series[j].left.y2+' '+
                    this.xDataPoints[i].series[j].left.x1+','+this.xDataPoints[i].series[j].left.y1,
                back:'',
                front:'',
                right:'',
                stroke:this.colors[j].color
              });
            }
            else{
              let topx2 = (this.xDataPoints[i].series[j].front.x2 + this.xDataPoints[i].series[j].back.x2)/2.0,
                  topx1 = (this.xDataPoints[i].series[j].front.x1 + this.xDataPoints[i].series[j].back.x1)/2.0,
                  topy2 = ((this.xDataPoints[i].series[j].front.y2+this.xDataPoints[i].series[j].back.y2)/2.0)+coord,
                  topy1 = ((this.xDataPoints[i].series[j].front.y1+this.xDataPoints[i].series[j].back.y1)/2.0)+coord,
                  topapexX = (topx2+topx1)/2.0, topapexY = (topy1+topy2)/2.0
              ;
              this.pyramidPlot[i].series.push({
                top:this.xDataPoints[i].series[j].front.x1+','+this.xDataPoints[i].series[j].front.y1+' '+
                    this.xDataPoints[i].series[j].front.x2+','+this.xDataPoints[i].series[j].front.y2+' '+
                    this.xDataPoints[i].series[j].right.x1+','+this.xDataPoints[i].series[j].right.y1+' '+
                    this.xDataPoints[i].series[j].right.x2+','+this.xDataPoints[i].series[j].right.y2+' '+
                    this.xDataPoints[i].series[j].back.x2+','+this.xDataPoints[i].series[j].back.y2+' '+
                    this.xDataPoints[i].series[j].back.x1+','+this.xDataPoints[i].series[j].back.y1+' '+
                    this.xDataPoints[i].series[j].left.x2+','+this.xDataPoints[i].series[j].left.y2+' '+
                    this.xDataPoints[i].series[j].left.x1+','+this.xDataPoints[i].series[j].left.y1,
                back:'',
                front:this.xDataPoints[i].series[j].front.x1+','+this.xDataPoints[i].series[j].front.y1+' '+
                      topapexX+','+topapexY+' '+this.xDataPoints[i].series[j].front.x2+','+this.xDataPoints[i].series[j].front.y2,
                right:this.xDataPoints[i].series[j].right.x1+','+this.xDataPoints[i].series[j].right.y1+' '+
                      topapexX+','+topapexY+' '+this.xDataPoints[i].series[j].right.x2+','+this.xDataPoints[i].series[j].right.y2,
                stroke:this.colors[j].color
              });
            }
          }
        }
      });
    },
    findShiftAngle(){
      this.shiftAngle = Math.asinh(this.depth*Math.sin(this.thetha)/((this.xDistance+(this.depth*Math.sin(this.thetha))-(this.depth*Math.cos(this.thetha)))-(this.left+this.yCoordinate[this.index]-5)));
    },
    yFindMinAndMax(){
      let max = this.category[0].series[0].value;
      let min = this.category[0].series[0].value;
      this.category.forEach((item,i)=>{
        item.series.forEach((category,j)=>{
          if(!(i==0&&j==0)){
            if(min>category.value) min = category.value;
            if(max<category.value) max = category.value;
          }
        });
      });
      this.ymin = min;
      this.ymax = max;
      return {max,min};
    },
    ygetYDataPoints(sizeInt){
      let min = this.ymin,
          max = this.ymax,
          diff = 0,
          gap = 0
      ;
      if(min<0){
        if(max>0){
          diff = max-min;
          gap=Math.floor(diff/parseFloat(sizeInt));
          gap = this.checkAndResetGap(gap);
          this.yDataPoints.push(0);
          this.getYNegativePoints(gap,min);
          this.yDataPoints.reverse();
          this.getYPositivePoints(gap,max);
        }
        else{
          diff = -1*min;
          gap=Math.floor(diff/parseFloat(sizeInt));
          gap = this.checkAndResetGap(gap);
          this.yDataPoints.push(0);
          this.getYNegativePoints(gap,min);
          this.yDataPoints.reverse();
        }
      }
      else{
        diff = max;
        gap=Math.floor(diff/parseFloat(sizeInt));
        gap = this.checkAndResetGap(gap);
        this.yDataPoints.push(0);
        this.getYPositivePoints(gap,max);
      }
    }
  },
  template:
  `
  <div class="block height-100-percent overflow-hidden text-center">
    <div class="block" :style="'height:'+titleNamingAreaHeight+'px;'"></div>
    <template v-if="tempWidth<=700">
      <div class="block" :style="'height:'+seriesNamingAreaHeight+'px;'"></div>
    </template>
    <div class="block row no-white-space text-left" style="font-size:0px;" :style="'height:'+(height+xAxisNamingAreaHeight-1)+'px;'">
      <div class="inline-block align-middle height-100-percent text-left" :style="'width:'+width+'px;'">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="height-100-percent width-100-percent" aria-labelledby="title" role="img">
          <title id="title">Column Chart</title>
          <g stroke="blue">
            <line :x1="((left-5)+yCoordinate[yCoordinate.length-1])" :x2="((left-5)+yCoordinate[0])" :y1="top" :y2="height-top"></line>
          </g>
          <g stroke="blue" style="font-size:10px;">
            <template v-for="(point,i) in yDataPoints">
              <text :x="(left-(measureText(point+'',13)/2)-10)" :y="((height-top)-i*yAxisSpacer)+4">{{point}}</text>
            </template>
          </g>
          <g stroke="blue">
            <template v-for="(point,i) in yCoordinate">
              <line :x1="((left-5)+(point-5))" :x2="((left-5)+point+5)" :y1="((height-top)-(i*yAxisSpacer))" :y2="((height-top)-(i*yAxisSpacer))"></line>
              <line :x1="(left+point-5)" :x2="((left+point-5)+(depth*Math.cos(thetha)))" :y1="((height-top)-(i*yAxisSpacer))" :y2="((height-top)-(i*yAxisSpacer))-(depth*Math.sin(thetha))"></line>
              <line :x1="(left+point-5)+(depth*Math.cos(thetha))" :x2="(xDistance)+(depth*Math.sin(thetha))" :y1="((height-top)-(i*yAxisSpacer))-(depth*Math.sin(thetha))" :y2="((height-top)-(i*yAxisSpacer))"></line>
            </template>
          </g>
          <g stroke="red">
            <template v-for="(point,i) in xCoordinate">
              <line :x1="((xDistance-point)+(depth*Math.sin(thetha))-(depth*Math.cos(thetha)))" :x2="((xDistance-point)+(depth*Math.sin(thetha)))" :y1="(xOriginLine+(depth*Math.sin(thetha))-(point*Math.sin(shiftAngle)))" :y2="(xOriginLine-(point*Math.sin(shiftAngle)))"></line>
            </template>
          </g>
          <g>
            <template v-for="(points,i) in pyramidPlot">
              <template v-for="(point,j) in points.series">
                <g style="stroke-width:1;" stroke="black" :fill="point.stroke" :stroke-opacity="0.7">
                  <polyline :points="point.top" />
                  <polyline :points="point.back" />
                  <polyline :points="point.right" />
                  <polyline :points="point.front" />
                </g>
              </template>
            </template>
          </g>
          <g stroke="blue">
            <line :x1="(left+yCoordinate[index]-5)" :x2="(xDistance+(depth*Math.sin(thetha))-(depth*Math.cos(thetha)))" :y1="xOriginLine" :y2="(xOriginLine+(depth*Math.sin(thetha)))"></line>
            <line :x1="(xDistance)+(depth*Math.sin(thetha))-(depth*Math.cos(thetha))" :x2="((xDistance)+(depth*Math.sin(thetha)))" :y1="(xOriginLine+(depth*Math.sin(thetha)))" :y2="xOriginLine"></line>
            <template v-if="index!=0">
              <line :x1="(left+yCoordinate[0]-5)" :x2="(xDistance)+(depth*Math.sin(thetha))-(depth*Math.cos(thetha))" :y1="(height-top)" :y2="(height-top)+(depth*Math.sin(thetha))"></line>
              <line :x1="(xDistance)+(depth*Math.sin(thetha))-(depth*Math.cos(thetha))" :x2="((xDistance)+(depth*Math.sin(thetha)))" :y1="((height-top)+(depth*Math.sin(thetha)))" :y2="(height-top)"></line>
            </template>
          </g>
        </svg>
      </div>
    </div>
  </div>
  `,
  mounted:function(){
    this.handleResize10();
    window.addEventListener("resize", this.debounce(this.handleResize10,1));
  },
  beforeDestroy: function() {
    window.removeEventListener("resize", this.debounce(this.handleResize10,1));
  }
};

const ThreeDClusteredPyramidChart = {
  data:function(){
    return {
      ymin:0,
      ymax:0,
      xmin:0,
      xmax:0,
      depth:100.0,
      thetha:0,
      ythetha:0,
      clusteredPyramidPlot:[],
      category:[
        {
          name:'Category 1',
          series:[
            {
              name:'Series 1',
              value:7110
            },
            {
              name:'Series 2',
              value:8240
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
              value:-3
            },
            {
              name:'Series 4',
              value:0
            }
          ]
        }
      ],
      yCoordinate:[],
      xCoordinate:[],
      index:0,
      shiftAngle:0
    };
  },
  mixins:[ColumnChartMixin],
  methods:{
    handleResize10(){
      this.thetha = Math.PI/4.0;
      this.ythetha = Math.PI/48;
      this.xAxisNamingAreaHeight = this.tempXAxisNamingAreaHeight;
      let container = document.getElementById('svg-charts');
      this.tempWidth = container.offsetWidth;
      (this.tempWidth<=700)? this.xAxisNamingAreaHeight = this.xAxisNamingAreaHeight - this.seriesNamingAreaHeight: this.xAxisNamingAreaHeight = this.xAxisNamingAreaHeight;
      this.height = container.offsetHeight - (((this.tempWidth<=700)? this.seriesNamingAreaHeight:0)+this.xAxisNamingAreaHeight+this.titleNamingAreaHeight);
      (this.tempWidth<=700)? this.width = container.offsetWidth - 10:this.width = container.offsetWidth - this.seriesNamingAreaWidth;
      this.left = this.yAxisNamingAreaWidth;
      this.yDataPoints = [];
      this.xDistance = this.width - this.left;
      this.top = 65;
      this.yCoordinate = [];
      this.xCoordinate = [];
      this.xDataPoints = [];
      this.clusteredPyramidPlot = [];
      this.index = 0;
      this.shiftAngle = 0;
      this.getYDataPointsCoordinate();
      let xOriginLine = this.yDetermineXAxis();
      this.xOriginLine = xOriginLine.xOriginLine;
      this.index = xOriginLine.index;
      this.getXDataPointsCoordinate();
      this.findShiftAngle();
      this.getXDataPoints();
    },
    measureText(str, fontSize = 10) {
      const widths = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.2796875,0.2765625,0.3546875,0.5546875,0.5546875,0.8890625,0.665625,0.190625,0.3328125,0.3328125,0.3890625,0.5828125,0.2765625,0.3328125,0.2765625,0.3015625,0.5546875,0.5546875,0.5546875,0.5546875,0.5546875,0.5546875,0.5546875,0.5546875,0.5546875,0.5546875,0.2765625,0.2765625,0.584375,0.5828125,0.584375,0.5546875,1.0140625,0.665625,0.665625,0.721875,0.721875,0.665625,0.609375,0.7765625,0.721875,0.2765625,0.5,0.665625,0.5546875,0.8328125,0.721875,0.7765625,0.665625,0.7765625,0.721875,0.665625,0.609375,0.721875,0.665625,0.94375,0.665625,0.665625,0.609375,0.2765625,0.3546875,0.2765625,0.4765625,0.5546875,0.3328125,0.5546875,0.5546875,0.5,0.5546875,0.5546875,0.2765625,0.5546875,0.5546875,0.221875,0.240625,0.5,0.221875,0.8328125,0.5546875,0.5546875,0.5546875,0.5546875,0.3328125,0.5,0.2765625,0.5546875,0.5,0.721875,0.5,0.5,0.5,0.3546875,0.259375,0.353125,0.5890625]
      const avg = 0.5279276315789471
      return str
        .split('')
        .map(c => c.charCodeAt(0) < widths.length ? widths[c.charCodeAt(0)] : avg)
        .reduce((cur, acc) => acc + cur) * fontSize
    },
    yDetermineXAxis(){
      let xH = 0, index = 0;
      for(let point of this.yDataPoints){
        if(point==0){
          xH = ((this.height-this.top)-(index*this.yAxisSpacer));
          break;
        }
        index++;
      }
      return {xOriginLine:xH,index:index};
    },
    getYPlotPoints(val){
      let coordy = (this.height-this.top), i=0;

      for(let point of this.yDataPoints){
        if(i!=0){
          if((point>=val)&&(val>this.yDataPoints[i-1])){
            coordy = ((this.height-this.top)-(i-1)*this.yAxisSpacer)-(val-this.yDataPoints[i-1])*this.yUnit;
            break;
          }
        }
        i++;
      }
      if(val<0) coordy=coordy-this.xOriginLine;
      else coordy = this.xOriginLine-coordy;
      return (coordy<0)?-1*coordy:coordy;
    },
    getYDataPointsCoordinate(){
      let minAndMax = this.yFindMinAndMax();
      this.ygetYDataPoints(9);
      this.yAxisSpacer = (this.height-2*this.top)/parseFloat(this.yDataPoints.length-1);
      this.yUnit = this.yAxisSpacer/parseFloat((this.yDataPoints[1]-this.yDataPoints[0]));

      this.yDataPoints.forEach((item,i)=>{
        let val = (this.height-this.top)-(i*this.yAxisSpacer);
        if(val<0) val = -1*val;
        this.yCoordinate.push(val*Math.tan(this.ythetha));
      });
    },
    getXDataPointsCoordinate(){
      let categorySize = this.category.length;
      this.xAxisSpacer = ((this.xDistance+(this.depth*Math.sin(this.thetha))-(this.depth*Math.cos(this.thetha)))-(this.left+this.yCoordinate[this.index]-5))/parseFloat(categorySize);
      for(let i=0; i<categorySize; i++){
        this.xCoordinate.push(this.xAxisSpacer*i);
      }
    },
    getXDataPoints(){
      let categoriesCount = this.category.length, seriesCount = this.category[0].series.length,
          catSeriesSpaceGap = 0, seriesSpaceGap = 0, wBySeriesAxis = 0, index = this.xCoordinate.length-1
      ;
      catSeriesSpaceGap = this.xAxisSpacer/(seriesCount+2);
      this.depth = catSeriesSpaceGap;
      seriesSpaceGap = catSeriesSpaceGap/4.0;
      wBySeriesAxis = catSeriesSpaceGap/2.0;

      if(categoriesCount<=this.maxCategories&&seriesCount<=this.maxSeries){
        this.category.forEach((category,i)=>{
          Vue.set(this.xDataPoints,i,{series:[]});
          category.series.forEach((series,j)=>{
            let coord = this.getYPlotPoints(series.value);
            if(j==0){
              let x2 = ((this.xDistance-this.xCoordinate[index])+(this.depth*Math.sin(this.thetha))-(this.depth*Math.cos(this.thetha))-catSeriesSpaceGap),
                  x1 = x2-catSeriesSpaceGap
              ;
              this.xDataPoints[i].series.push({
                front:{
                  x2:x2+seriesSpaceGap*Math.cos(this.thetha),
                  x1:x1+seriesSpaceGap*Math.cos(this.thetha),
                  y2:(this.xOriginLine+(this.depth*Math.sin(this.thetha))-(this.xCoordinate[index]*Math.sin(this.shiftAngle))-catSeriesSpaceGap*Math.tan(this.shiftAngle)-seriesSpaceGap*Math.sin(this.thetha)),
                  y1:(this.xOriginLine+(this.depth*Math.sin(this.thetha))-(this.xCoordinate[index]*Math.sin(this.shiftAngle))-((j+1)*catSeriesSpaceGap+catSeriesSpaceGap)*Math.tan(this.shiftAngle)-seriesSpaceGap*Math.sin(this.thetha))
                },
                back:{
                  x2:(x2+(seriesSpaceGap+wBySeriesAxis)*Math.cos(this.thetha)),
                  x1:(x1+(seriesSpaceGap+wBySeriesAxis)*Math.cos(this.thetha)),
                  y1:(this.xOriginLine+(this.depth*Math.sin(this.thetha))-(this.xCoordinate[index]*Math.sin(this.shiftAngle))-((j+1)*catSeriesSpaceGap+catSeriesSpaceGap)*Math.tan(this.shiftAngle)-(seriesSpaceGap+wBySeriesAxis)*Math.sin(this.thetha)),
                  y2:(this.xOriginLine+(this.depth*Math.sin(this.thetha))-(this.xCoordinate[index]*Math.sin(this.shiftAngle))-catSeriesSpaceGap*Math.tan(this.shiftAngle)-(seriesSpaceGap+wBySeriesAxis)*Math.sin(this.thetha))
                },
                left:{
                  x2:(x1+(seriesSpaceGap+wBySeriesAxis)*Math.cos(this.thetha)),
                  x1:(x1+seriesSpaceGap*Math.cos(this.thetha)),
                  y2:(this.xOriginLine+(this.depth*Math.sin(this.thetha))-(this.xCoordinate[index]*Math.sin(this.shiftAngle))-((j+1)*catSeriesSpaceGap+catSeriesSpaceGap)*Math.tan(this.shiftAngle)-(seriesSpaceGap+wBySeriesAxis)*Math.sin(this.thetha)),
                  y1:(this.xOriginLine+(this.depth*Math.sin(this.thetha))-(this.xCoordinate[index]*Math.sin(this.shiftAngle))-((j+1)*catSeriesSpaceGap+catSeriesSpaceGap)*Math.tan(this.shiftAngle)-seriesSpaceGap*Math.sin(this.thetha))
                },
                right:{
                  x2:(x2+(seriesSpaceGap+wBySeriesAxis)*Math.cos(this.thetha)),
                  x1:(x2+seriesSpaceGap*Math.cos(this.thetha)),
                  y2:(this.xOriginLine+(this.depth*Math.sin(this.thetha))-(this.xCoordinate[index]*Math.sin(this.shiftAngle))-catSeriesSpaceGap*Math.tan(this.shiftAngle)-(seriesSpaceGap+wBySeriesAxis)*Math.sin(this.thetha)),
                  y1:(this.xOriginLine+(this.depth*Math.sin(this.thetha))-(this.xCoordinate[index]*Math.sin(this.shiftAngle))-catSeriesSpaceGap*Math.tan(this.shiftAngle)-seriesSpaceGap*Math.sin(this.thetha))
                }
              });
            }
            else{
              this.xDataPoints[i].series.push({
                front:{
                  x2:this.xDataPoints[i].series[j-1].front.x1,
                  x1:this.xDataPoints[i].series[j-1].front.x1-catSeriesSpaceGap,
                  y1:(this.xDataPoints[i].series[j-1].front.y1-catSeriesSpaceGap*Math.tan(this.shiftAngle)),
                  y2:(this.xDataPoints[i].series[j-1].front.y2-catSeriesSpaceGap*Math.tan(this.shiftAngle))
                },
                back:{
                  x2:this.xDataPoints[i].series[j-1].back.x1,
                  x1:this.xDataPoints[i].series[j-1].back.x1-catSeriesSpaceGap,
                  y1:(this.xDataPoints[i].series[j-1].back.y1-catSeriesSpaceGap*Math.tan(this.shiftAngle)),
                  y2:(this.xDataPoints[i].series[j-1].back.y2-catSeriesSpaceGap*Math.tan(this.shiftAngle))
                },
                right:{
                  x2:this.xDataPoints[i].series[j-1].back.x1,
                  x1:this.xDataPoints[i].series[j-1].front.x1,
                  y1:this.xDataPoints[i].series[j-1].front.y1,
                  y2:this.xDataPoints[i].series[j-1].back.y1
                },
                left:{
                  x2:this.xDataPoints[i].series[j-1].back.x1-catSeriesSpaceGap,
                  x1:this.xDataPoints[i].series[j-1].front.x1-catSeriesSpaceGap,
                  y1:this.xDataPoints[i].series[j-1].front.y1,
                  y2:this.xDataPoints[i].series[j-1].back.y1
                }
              });
            }
          });
          index--;
        });
        this.getClusteredPyramidPlotPoints();
      }
    },
    getClusteredPyramidPlotPoints(){
      let categoriesCount = this.category.length, seriesCount = this.category[0].series.length;
      this.category.forEach((category,i)=>{
        Vue.set(this.clusteredPyramidPlot,i,{series:[]});
        let k=0;
        for(let j=(seriesCount-1);j>=0;j--){
          let coord = this.getYPlotPoints(category.series[j].value);
          if(category.series[j].value>0){
            let topx2 = (this.xDataPoints[i].series[k].front.x2 + this.xDataPoints[i].series[k].back.x2)/2.0,
                topx1 = (this.xDataPoints[i].series[k].front.x1 + this.xDataPoints[i].series[k].back.x1)/2.0,
                topy2 = ((this.xDataPoints[i].series[k].front.y2+this.xDataPoints[i].series[k].back.y2)/2.0)-coord,
                topy1 = ((this.xDataPoints[i].series[k].front.y1+this.xDataPoints[i].series[k].back.y1)/2.0)-coord,
                topapexX = (topx2+topx1)/2.0, topapexY = (topy1+topy2)/2.0
            ;
            this.clusteredPyramidPlot[i].series.push({
              front:this.xDataPoints[i].series[k].front.x1+','+this.xDataPoints[i].series[k].front.y1+' '+
                    topapexX+','+topapexY+' '+this.xDataPoints[i].series[k].front.x2+','+this.xDataPoints[i].series[k].front.y2,
              back:this.xDataPoints[i].series[k].back.x1+','+this.xDataPoints[i].series[k].back.y1+' '+
                    topapexX+','+topapexY+' '+this.xDataPoints[i].series[k].back.x2+','+this.xDataPoints[i].series[k].back.y2,
              right:this.xDataPoints[i].series[k].right.x1+','+this.xDataPoints[i].series[k].right.y1+' '+
                    topapexX+','+topapexY+' '+this.xDataPoints[i].series[k].right.x2+','+this.xDataPoints[i].series[k].right.y2,
              top:this.xDataPoints[i].series[k].front.x1+','+this.xDataPoints[i].series[k].front.y1+' '+
                  this.xDataPoints[i].series[k].front.x2+','+this.xDataPoints[i].series[k].front.y2+' '+
                  this.xDataPoints[i].series[k].right.x1+','+this.xDataPoints[i].series[k].right.y1+' '+
                  this.xDataPoints[i].series[k].right.x2+','+this.xDataPoints[i].series[k].right.y2+' '+
                  this.xDataPoints[i].series[k].back.x2+','+this.xDataPoints[i].series[k].back.y2+' '+
                  this.xDataPoints[i].series[k].back.x1+','+this.xDataPoints[i].series[k].back.y1+' '+
                  this.xDataPoints[i].series[k].left.x2+','+this.xDataPoints[i].series[k].left.y2+' '+
                  this.xDataPoints[i].series[k].left.x1+','+this.xDataPoints[i].series[k].left.y1,
              stroke:this.colors[j].color
            });
          }
          else{
            if(category.series[j].value==0){
              this.clusteredPyramidPlot[i].series.push({
                top:this.xDataPoints[i].series[k].front.x1+','+this.xDataPoints[i].series[k].front.y1+' '+
                    this.xDataPoints[i].series[k].front.x2+','+this.xDataPoints[i].series[k].front.y2+' '+
                    this.xDataPoints[i].series[k].right.x1+','+this.xDataPoints[i].series[k].right.y1+' '+
                    this.xDataPoints[i].series[k].right.x2+','+this.xDataPoints[i].series[k].right.y2+' '+
                    this.xDataPoints[i].series[k].back.x2+','+this.xDataPoints[i].series[k].back.y2+' '+
                    this.xDataPoints[i].series[k].back.x1+','+this.xDataPoints[i].series[k].back.y1+' '+
                    this.xDataPoints[i].series[k].left.x2+','+this.xDataPoints[i].series[k].left.y2+' '+
                    this.xDataPoints[i].series[k].left.x1+','+this.xDataPoints[i].series[k].left.y1,
                back:'',
                front:'',
                right:'',
                stroke:this.colors[j].color
              });
            }
            else{
              let topx2 = (this.xDataPoints[i].series[k].front.x2 + this.xDataPoints[i].series[k].back.x2)/2.0,
                  topx1 = (this.xDataPoints[i].series[k].front.x1 + this.xDataPoints[i].series[k].back.x1)/2.0,
                  topy2 = ((this.xDataPoints[i].series[k].front.y2+this.xDataPoints[i].series[k].back.y2)/2.0)+coord,
                  topy1 = ((this.xDataPoints[i].series[k].front.y1+this.xDataPoints[i].series[k].back.y1)/2.0)+coord,
                  topapexX = (topx2+topx1)/2.0, topapexY = (topy1+topy2)/2.0
              ;
              this.clusteredPyramidPlot[i].series.push({
                top:this.xDataPoints[i].series[k].front.x1+','+this.xDataPoints[i].series[k].front.y1+' '+
                    this.xDataPoints[i].series[k].front.x2+','+this.xDataPoints[i].series[k].front.y2+' '+
                    this.xDataPoints[i].series[k].right.x1+','+this.xDataPoints[i].series[k].right.y1+' '+
                    this.xDataPoints[i].series[k].right.x2+','+this.xDataPoints[i].series[k].right.y2+' '+
                    this.xDataPoints[i].series[k].back.x2+','+this.xDataPoints[i].series[k].back.y2+' '+
                    this.xDataPoints[i].series[k].back.x1+','+this.xDataPoints[i].series[k].back.y1+' '+
                    this.xDataPoints[i].series[k].left.x2+','+this.xDataPoints[i].series[k].left.y2+' '+
                    this.xDataPoints[i].series[k].left.x1+','+this.xDataPoints[i].series[k].left.y1,
                back:'',
                front:this.xDataPoints[i].series[k].front.x1+','+this.xDataPoints[i].series[k].front.y1+' '+
                      topapexX+','+topapexY+' '+this.xDataPoints[i].series[k].front.x2+','+this.xDataPoints[i].series[k].front.y2,
                right:this.xDataPoints[i].series[k].right.x1+','+this.xDataPoints[i].series[k].right.y1+' '+
                      topapexX+','+topapexY+' '+this.xDataPoints[i].series[k].right.x2+','+this.xDataPoints[i].series[k].right.y2,
                stroke:this.colors[j].color
              });
            }
          }
          k++;
        }
      });
    },
    findShiftAngle(){
      this.shiftAngle = Math.asinh(this.depth*Math.sin(this.thetha)/((this.xDistance+(this.depth*Math.sin(this.thetha))-(this.depth*Math.cos(this.thetha)))-(this.left+this.yCoordinate[this.index]-5)));
    },
    yFindMinAndMax(){
      let max = this.category[0].series[0].value;
      let min = this.category[0].series[0].value;
      this.category.forEach((item,i)=>{
        item.series.forEach((category,j)=>{
          if(!(i==0&&j==0)){
            if(min>category.value) min = category.value;
            if(max<category.value) max = category.value;
          }
        });
      });
      this.ymin = min;
      this.ymax = max;
      return {max,min};
    },
    ygetYDataPoints(sizeInt){
      let min = this.ymin,
          max = this.ymax,
          diff = 0,
          gap = 0
      ;
      if(min<0){
        if(max>0){
          diff = max-min;
          gap=Math.floor(diff/parseFloat(sizeInt));
          gap = this.checkAndResetGap(gap);
          this.yDataPoints.push(0);
          this.getYNegativePoints(gap,min);
          this.yDataPoints.reverse();
          this.getYPositivePoints(gap,max);
        }
        else{
          diff = -1*min;
          gap=Math.floor(diff/parseFloat(sizeInt));
          gap = this.checkAndResetGap(gap);
          this.yDataPoints.push(0);
          this.getYNegativePoints(gap,min);
          this.yDataPoints.reverse();
        }
      }
      else{
        diff = max;
        gap=Math.floor(diff/parseFloat(sizeInt));
        gap = this.checkAndResetGap(gap);
        this.yDataPoints.push(0);
        this.getYPositivePoints(gap,max);
      }
    }
  },
  template:
  `
  <div class="block height-100-percent overflow-hidden text-center">
    <div class="block" :style="'height:'+titleNamingAreaHeight+'px;'"></div>
    <template v-if="tempWidth<=700">
      <div class="block" :style="'height:'+seriesNamingAreaHeight+'px;'"></div>
    </template>
    <div class="block row no-white-space text-left" style="font-size:0px;" :style="'height:'+(height+xAxisNamingAreaHeight-1)+'px;'">
      <div class="inline-block align-middle height-100-percent text-left" :style="'width:'+width+'px;'">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="height-100-percent width-100-percent" aria-labelledby="title" role="img">
          <title id="title">Column Chart</title>
          <g stroke="blue">
            <line :x1="((left-5)+yCoordinate[yCoordinate.length-1])" :x2="((left-5)+yCoordinate[0])" :y1="top" :y2="height-top"></line>
          </g>
          <g stroke="blue" style="font-size:10px;">
            <template v-for="(point,i) in yDataPoints">
              <text :x="(left-(measureText(point+'',13)/2)-10)" :y="((height-top)-i*yAxisSpacer)+4">{{point}}</text>
            </template>
          </g>
          <g stroke="blue">
            <template v-for="(point,i) in yCoordinate">
              <line :x1="((left-5)+(point-5))" :x2="((left-5)+point+5)" :y1="((height-top)-(i*yAxisSpacer))" :y2="((height-top)-(i*yAxisSpacer))"></line>
              <line :x1="(left+point-5)" :x2="((left+point-5)+(depth*Math.cos(thetha)))" :y1="((height-top)-(i*yAxisSpacer))" :y2="((height-top)-(i*yAxisSpacer))-(depth*Math.sin(thetha))"></line>
              <line :x1="(left+point-5)+(depth*Math.cos(thetha))" :x2="(xDistance)+(depth*Math.sin(thetha))" :y1="((height-top)-(i*yAxisSpacer))-(depth*Math.sin(thetha))" :y2="((height-top)-(i*yAxisSpacer))"></line>
            </template>
          </g>
          <g stroke="red">
            <template v-for="(point,i) in xCoordinate">
              <line :x1="((xDistance-point)+(depth*Math.sin(thetha))-(depth*Math.cos(thetha)))" :x2="((xDistance-point)+(depth*Math.sin(thetha)))" :y1="(xOriginLine+(depth*Math.sin(thetha))-(point*Math.sin(shiftAngle)))" :y2="(xOriginLine-(point*Math.sin(shiftAngle)))"></line>
            </template>
          </g>
          <g>
            <template v-for="(points,i) in clusteredPyramidPlot">
              <template v-for="(point,j) in points.series.reverse()">
                <g style="stroke-width:1;" stroke="black" :fill="point.stroke" :stroke-opacity="0.7">
                  <polyline :points="point.top" />
                  <polyline :points="point.back" />
                  <polyline :points="point.right" />
                  <polyline :points="point.front" />
                </g>
              </template>
            </template>
          </g>
          <g stroke="blue">
            <line :x1="(left+yCoordinate[index]-5)" :x2="(xDistance+(depth*Math.sin(thetha))-(depth*Math.cos(thetha)))" :y1="xOriginLine" :y2="(xOriginLine+(depth*Math.sin(thetha)))"></line>
            <line :x1="(xDistance)+(depth*Math.sin(thetha))-(depth*Math.cos(thetha))" :x2="((xDistance)+(depth*Math.sin(thetha)))" :y1="(xOriginLine+(depth*Math.sin(thetha)))" :y2="xOriginLine"></line>
            <template v-if="index!=0">
              <line :x1="(left+yCoordinate[0]-5)" :x2="(xDistance)+(depth*Math.sin(thetha))-(depth*Math.cos(thetha))" :y1="(height-top)" :y2="(height-top)+(depth*Math.sin(thetha))"></line>
              <line :x1="(xDistance)+(depth*Math.sin(thetha))-(depth*Math.cos(thetha))" :x2="((xDistance)+(depth*Math.sin(thetha)))" :y1="((height-top)+(depth*Math.sin(thetha)))" :y2="(height-top)"></line>
            </template>
          </g>
        </svg>
      </div>
    </div>
  </div>
  `,
  created:function(){
    let categoriesCount = this.category.length, seriesCount = this.category[0].series.length,
        catSeriesSpaceGap = 0, seriesSpaceGap = 0, wBySeriesAxis = 0, index = this.xCoordinate.length-1
    ;
    this.handleResize10();
    catSeriesSpaceGap = this.xAxisSpacer/(seriesCount+2);
    this.depth = catSeriesSpaceGap;
  },
  mounted:function(){
    this.handleResize10();
    window.addEventListener("resize", this.debounce(this.handleResize10,1));
  },
  beforeDestroy: function() {
    window.removeEventListener("resize", this.debounce(this.handleResize10,1));
  }
};

new Vue({
  el: "#svg-charts",
  components:{
    'three-d-column-chart':ThreeDColumnChart,
    'three-d-cylinder-chart':ThreeDCylinderChart,
    'three-d-cone-chart':ThreeDConeChart,
    'three-d-pyramid-chart':ThreeDPyramidChart,
    'three-d-clustered-column-chart':ThreeDClusteredColumnChart,
    'three-d-clustered-cylinder-chart':ThreeDClusteredCylinderChart,
    'three-d-clustered-pyramid-chart':ThreeDClusteredPyramidChart,
    'three-d-clustered-cone-chart':ThreeDClusteredConeChart
  }
});
