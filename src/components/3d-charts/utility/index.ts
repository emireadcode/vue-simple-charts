import type { DataTable_3D_Charts_Type, LineType } from "../type";
import { map, reduce, from, mergeMap, min, max, findIndex, } from 'rxjs';
import { type Ref} from "vue";

function findMin(column: DataTable_3D_Charts_Type) {
  let minN = column[0].series[0].value;
  from(column)
    .pipe(mergeMap(item => item.series))
    .pipe(min((a, b) => a.value - b.value))
    .subscribe(
      (category) => {
        minN = category.value;
      }
    )
  ;
  return minN;
}

function findMax(column: DataTable_3D_Charts_Type) {
  let maxN = column[0].series[0].value;
  from(column)
    .pipe(mergeMap(item => item.series))
    .pipe(max((a, b) => a.value - b.value))
    .subscribe(
      (category) => {
        maxN = category.value;
      }
    )
  ;
  return maxN;
}

function findMaxAndMin(column: DataTable_3D_Charts_Type) {
  return {
    max: findMax(column), 
    min: findMin(column)
  };
}

function getHighestForFirstCalculation(minormax: number | {max: number; min: number;}, axistype: 'NEGATIVE' | 'POSITIVE' | 'BOTH') {
  return (
    axistype !== 'BOTH'?
    (
      (axistype==='NEGATIVE'? (-1*(minormax as number)) : (minormax as number))
    )
    : 
    (
      ((minormax as {max: number; min: number;}).max >= -1*(minormax as {max: number; min: number;}).min)?
      (minormax as {max: number; min: number;}).max : -1*(minormax as {max: number; min: number;}).min
    )
  );
}

function getNegativeOrPositiveAxisNumber(first: number, minormax: number | {max: number; min: number;}, axistype: 'NEGATIVE' | 'POSITIVE' | 'BOTH') {
  let axis: number[] = [];
  if(axistype !== 'BOTH') {
    let 
      highest = getHighestForFirstCalculation(minormax, axistype), 
      newfirst = first, 
      multiplier = axistype==='NEGATIVE'? -1 : 1
    ;
    do {
      axis.push(multiplier*newfirst);
      newfirst+=first;
    }
    while((newfirst-first) <= highest);
  }
  else {
    let paxis = getNegativeOrPositiveAxisNumber(first, (minormax as {max: number; min: number;}).max, 'POSITIVE');
    let naxis = getNegativeOrPositiveAxisNumber(first, (minormax as {max: number; min: number;}).min, 'NEGATIVE');
    axis = [...paxis, 0, ...naxis];
  }
  return axistype==='POSITIVE'? axis.reverse() : axis;
}

function getZeroDotSomethingAxisNumber(minormax: number | {max: number; min: number;}, axistype: 'POSITIVE' | 'NEGATIVE' | 'BOTH') {
  let distortedhighest = getHighestForFirstCalculation(minormax, axistype), multiplier = 1;
  do {
    distortedhighest*=10;
    if(parseInt(distortedhighest+'')===0) {
      multiplier*=10;
    }
  }
  while(parseInt(distortedhighest+'')===0);
  return getNegativeOrPositiveAxisNumber(
    getZeroDotSomethingFirstAxisNumber(
      multiplier, 
      distortedhighest, 
      minormax,
      axistype
    ), 
    minormax, 
    axistype
  );
}

function getZeroDotSomethingFirstAxisNumber(multiplier: number, distortedhighest: number, minormax: number | {max: number; min: number;}, axistype: 'POSITIVE' | 'NEGATIVE' | 'BOTH') {
  let 
    highest = multiplier*getHighestForFirstCalculation(minormax, axistype), 
    last = (highest > parseInt(distortedhighest+''))? (
      (
        parseInt(
        (
          (
            highest - parseInt(distortedhighest+'')
          )*10
        )+''
        ) <= 5
      )? 
      parseInt(parseInt(distortedhighest+'')+''+5) : parseInt((parseInt(distortedhighest+'') + 1)+''+0)
    ) : (
      parseInt(parseInt(distortedhighest+'')+''+0)
    )
  ;
  if(last <= 100 && last > 50) {
    return 10/(multiplier*10);
  }
  else if(last <= 50 && last > 20) {
    return 5/(multiplier*10);
  }
  else if(last <= 20 && last > 10) {
    return 2/(multiplier*10);
  }
  else {
    return 1/(multiplier*10);
  }
}

function getAtleastOneDotSomethingFirstAxisNumber(multiplier: number, distortedhighest: number) {
  if((10*distortedhighest) === 1) {
    return (1/10)*multiplier;
  }
  else if((10*distortedhighest) > 1 && (10*distortedhighest) <= 2) {
    return (2/10)*multiplier;
  }
  else if((10*distortedhighest) > 2 && (10*distortedhighest) <= 5) {
    return (5/10)*multiplier;
  }
  else {
    return multiplier;
  }
}

function getAtleastOneDotSomethingAxisNumber(minormax: number | {max: number; min: number;}, axistype: 'POSITIVE' | 'NEGATIVE' | 'BOTH') {
  let distortedhighest = getHighestForFirstCalculation(minormax, axistype), multiplier = 1;
  do {
    distortedhighest/=10;
    if(parseInt(distortedhighest+'')>0) {
      multiplier*=10;
    }
  }
  while(parseInt(distortedhighest+'')>0);
  return getNegativeOrPositiveAxisNumber(
    getAtleastOneDotSomethingFirstAxisNumber(
      multiplier, 
      distortedhighest
    ), 
    minormax, 
    axistype
  );
}

function getAxisNumber(minormax: number | {max: number; min: number;}, axistype: 'NEGATIVE' | 'POSITIVE' | 'BOTH') {
  let highest = parseInt(getHighestForFirstCalculation(minormax, axistype)+'');
  if(highest === 0) {
    return getZeroDotSomethingAxisNumber(minormax, axistype);
  }
  else {
    return getAtleastOneDotSomethingAxisNumber(minormax, axistype);
  }
}

function calculateLongestAxisNumberLength(axis: number[], fontsize: number) {
  let longestlength = measureText(axis[0]+'', fontsize);
  from(axis)
    .pipe(
      map((str: number) => measureText(str+'', fontsize)),
      max()
    )
    .subscribe(
      longest => longestlength = longest
    )
  ;
  return longestlength;
}

function calculateAxisNumber(column: DataTable_3D_Charts_Type) {
  const {max, min} = findMaxAndMin(column);
  if(max<0 && min<0) {
    return [0, ...getAxisNumber(min, 'NEGATIVE')];
  }
  else if(max===0 && min===0) {
    return [0];
  }
  else if(max===0 && min<0) {
    return [0, ...getAxisNumber(min, 'NEGATIVE')];
  }
  else if(max>0 && min===0) {
    return [...getAxisNumber(max, 'POSITIVE'), 0];
  }
  else if(max>0 && min<0){
    return getAxisNumber({max, min}, 'BOTH');
  }
  else {
    //max>0 && min>0
    return [...getAxisNumber(max, 'POSITIVE'), 0];
  }
}

export function measureText(str: string, fontsize: number = 10) {
  const widths = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.2796875,0.2765625,0.3546875,0.5546875,0.5546875,0.8890625,0.665625,0.190625,0.3328125,0.3328125,0.3890625,0.5828125,0.2765625,0.3328125,0.2765625,0.3015625,0.5546875,0.5546875,0.5546875,0.5546875,0.5546875,0.5546875,0.5546875,0.5546875,0.5546875,0.5546875,0.2765625,0.2765625,0.584375,0.5828125,0.584375,0.5546875,1.0140625,0.665625,0.665625,0.721875,0.721875,0.665625,0.609375,0.7765625,0.721875,0.2765625,0.5,0.665625,0.5546875,0.8328125,0.721875,0.7765625,0.665625,0.7765625,0.721875,0.665625,0.609375,0.721875,0.665625,0.94375,0.665625,0.665625,0.609375,0.2765625,0.3546875,0.2765625,0.4765625,0.5546875,0.3328125,0.5546875,0.5546875,0.5,0.5546875,0.5546875,0.2765625,0.5546875,0.5546875,0.221875,0.240625,0.5,0.221875,0.8328125,0.5546875,0.5546875,0.5546875,0.5546875,0.3328125,0.5,0.2765625,0.5546875,0.5,0.721875,0.5,0.5,0.5,0.3546875,0.259375,0.353125,0.5890625];
  const avg = 0.5279276315789471;
  const seed = 0;
  let size = fontsize;
  from(str.split(''))
    .pipe(
      map(c => c.charCodeAt(0) < widths.length ? widths[c.charCodeAt(0)] : avg),
      reduce((acc, one) => acc + one, seed)
    )
    .subscribe(
      (times: number) => size*=times
    )
  ;
  return size;
}

function getChartAreaDimension() {
  let chartarea = document.getElementById("chartarea");
  return { 
    width: 900, 
    height: 600 
  };
}

function get3DBoxDimension(space: number = 10, depth: {width: number; height: number;}, fontsize: number, padding: {top: number; bottom: number; left: number; right: number;},  seriessize: number, longestaxisnumberlength: number) {
  const { width, height} = getChartAreaDimension();
  return { 
    width: width - (padding.right + padding.left) - measureText(('Series ' + seriessize), fontsize) - longestaxisnumberlength - depth.width - (2*space), 
    height: height - (padding.top + padding.bottom) - depth.height
  };
}

function drawTraceLines(plottype: 'SIDE' | 'FRONT', height: number, space: number = 10, depth: {width: number; height: number;}, padding: {top: number; bottom: number; left: number; right: number;}, longestaxisnumberlength: number, axis: number[], width?: number | undefined) {
  const tracelines: LineType[] = [], axisunit = height / (axis.length - 1);
  from(axis)
    .pipe(
      map(
        (x, i) => (plottype === 'FRONT')? {
          x1: padding.left + longestaxisnumberlength + space + depth.width,
          x2: padding.left + longestaxisnumberlength + space + depth.width + (width as number),
          y1: padding.top + (i*axisunit),
          y2: padding.top + (i*axisunit)
        } as typeof tracelines[number] : {
          x1: padding.left + longestaxisnumberlength + space,
          x2: padding.left + longestaxisnumberlength + space + depth.width,
          y1: padding.top + depth.height + (i*axisunit),
          y2: padding.top + (i*axisunit)
        } as typeof tracelines[number]
      )
    )
    .subscribe(
      x => tracelines.push(x)
    )
  ;
  return tracelines;
}

function drawSidePlane(height: number, space: number = 10, depth: {width: number; height: number;}, padding: {top: number; bottom: number; left: number; right: number;}, longestaxisnumberlength: number, axis: number[]) {
  return {
    hastraceline: true,
    tracelines: drawTraceLines('SIDE', height, space, depth, padding, longestaxisnumberlength, axis),
    plane: [
      {
        x1: (padding.left + longestaxisnumberlength + space + depth.width),
        x2: (padding.left + longestaxisnumberlength + space + depth.width),
        y1: padding.top,
        y2: (padding.top + height)
      },
      {
        x1: (padding.left + longestaxisnumberlength + space),
        x2: (padding.left + longestaxisnumberlength + space),
        y1: (padding.top + depth.height),
        y2: (padding.top + depth.height + height)
      },
      {
        x1: (padding.left + longestaxisnumberlength + space),
        x2: (padding.left + longestaxisnumberlength + space + depth.width),
        y1: (padding.top + depth.height),
        y2: padding.top
      },
      {
        x1: (padding.left + longestaxisnumberlength + space),
        x2: (padding.left + longestaxisnumberlength + space + depth.width),
        y1: (padding.top + depth.height + height),
        y2: (padding.top + height)
      }
    ]
  };
}

function drawFrontPlane(width: number, height: number, space: number = 10, depth: {width: number; height: number;}, padding: {top: number; bottom: number; left: number; right: number;}, longestaxisnumberlength: number, axis: number[]) {
  return {
    hastraceline: true,
    tracelines: drawTraceLines('FRONT', height, space, depth, padding, longestaxisnumberlength, axis, width as number),
    plane: [
      {
        x1: (padding.left + longestaxisnumberlength + space + depth.width),
        x2: (padding.left + longestaxisnumberlength + space + depth.width),
        y1: padding.top,
        y2: padding.top + height
      },
      {
        x1: (padding.left + longestaxisnumberlength + space + depth.width + width),
        x2: (padding.left + longestaxisnumberlength + space + depth.width + width),
        y1: padding.top,
        y2: padding.top + height

      },
      {
        x1: (padding.left + longestaxisnumberlength + space + depth.width),
        x2: (padding.left + longestaxisnumberlength + space + depth.width + width),
        y1: padding.top,
        y2: padding.top

      },
      {
        x1: (padding.left + longestaxisnumberlength + space + depth.width),
        x2: (padding.left + longestaxisnumberlength + space + depth.width + width),
        y1: padding.top + height,
        y2: padding.top + height

      }
    ]
  };
}

function drawBottomPlane(width: number, height: number, space: number = 10, depth: {width: number; height: number;}, padding: {top: number; bottom: number; left: number; right: number;}, longestaxisnumberlength: number) {
  return {
    hastraceline: false,
    plane: 
      (padding.left + longestaxisnumberlength + space)+','+(padding.top + depth.height + height)
      +' '+
      (padding.left + longestaxisnumberlength + space + depth.width)+','+(padding.top + height)
      +' '+
      (padding.left + longestaxisnumberlength + space + depth.width + width)+','+(padding.top + height)
      +' '+
      (padding.left + longestaxisnumberlength + space + width)+','+(padding.top + depth.height + height)
      +' '+
      (padding.left + longestaxisnumberlength + space)+','+(padding.top + depth.height + height)
  };
}

function drawOriginPlane(width: number, height: number, space: number = 10, depth: {width: number; height: number;}, padding: {top: number; bottom: number; left: number; right: number;}, longestaxisnumberlength: number, axis: number[]) {
  let plane: LineType[] = [], axisunit = height / (axis.length - 1);
  from(axis)
    .pipe(
      findIndex(x => x===0)
    )
    .subscribe(i => plane = 
      [
        {
          x1: (padding.left + longestaxisnumberlength + space + depth.width + width),
          x2: (padding.left + longestaxisnumberlength + space + width),
          y1: (padding.top + (i*axisunit)),
          y2: (padding.top + (i*axisunit) + depth.height)
        },
        {
          x1: (padding.left + longestaxisnumberlength + space),
          x2: (padding.left + longestaxisnumberlength + space + width),
          y1: (padding.top + (i*axisunit) + depth.height),
          y2: (padding.top + (i*axisunit) + depth.height)
        }
      ]
    )
  ;
  return {
    hastraceline: false,
    plane
  };
}

function drawPlane(planetype: 'BOTTOM' | 'FRONT' | 'SIDE' | 'ORIGIN', width: number, height: number, space: number = 10, depth: {width: number; height: number;}, padding: {top: number; bottom: number; left: number; right: number;}, longestaxisnumberlength: number, axis?: number[] | undefined) {
  if(planetype === 'SIDE') {
    return drawSidePlane(height, space, depth, padding, longestaxisnumberlength, axis as number[]);
  }
  else if(planetype === 'FRONT') {
    return drawFrontPlane(width, height, space, depth, padding, longestaxisnumberlength, axis as number[]);
  }
  else if(planetype === 'BOTTOM') {
    return drawBottomPlane(width, height, space, depth, padding, longestaxisnumberlength);
  }
  else {
    return drawOriginPlane(width, height, space, depth, padding, longestaxisnumberlength, axis as number[]);
  }
}

function draw3DBox(width: number, height: number, longestaxisnumberlength: number, space: number = 10, depth: {width: number; height: number;}, fontsize: number, padding: {top: number; bottom: number; left: number; right: number;}, axis: number[], column: DataTable_3D_Charts_Type) {
  const {max, min} = findMaxAndMin(column), plane: {hastraceline: boolean; plane: LineType[] | string; tracelines?: LineType[] | undefined;}[] = [];
  //draw side plane
  plane.push(drawPlane('SIDE', width, height, space, depth, padding, longestaxisnumberlength, axis));
  //draw front plane
  plane.push(drawPlane('FRONT', width, height, space, depth, padding, longestaxisnumberlength, axis));
  if(
    (max<0 && min<0)
    ||
    (max===0 && min===0)
    ||
    (max===0 && min<0)
    ||
    (max>0 && min<0)
  ) {
    //draw bottom plane
    plane.push(drawPlane('BOTTOM', width, height, space, depth, padding, longestaxisnumberlength));
  }
  //else {
    //(max>0 && min>0) || (max>0 && min===0)
    //do not draw bottom plane since origin plane is going to be the bottom plane
  //}
  return plane;
}

function getValueIndex(axis: number[], value: number) {
  return axis.findIndex(
    (x, i) => value === x || (
      (i+1) < axis.length && (value < x && value > axis[i+1])
    )
  );
}

function getOriginIndex(axis: number[]) {
  return axis.findIndex(val => val===0);
}

function getWidthAndGap(linewidth: number, divisor: number) {
  return{
    valuewidth: (0.52 * linewidth)/divisor, 
    valuegap: (0.48 * linewidth)/(divisor + 1)
  };
}

function getExtraUnit(value: number, valueindex: number, yaxisunit: number, axis: number[]) {
  let extraunit = 0;
  if(value !== axis[valueindex]) {
    extraunit = ((axis[valueindex] - value)/(axis[valueindex] - axis[valueindex+1])) * yaxisunit;
  }
  return extraunit
}

function getBaseHeightAndWidthAtOrigin(width: number, originindex: number, seriesindex: number, rowindex: number, yaxisunit: number, longestaxisnumberlength: number, space: number, depth: {width: number; height: number;}, padding: {top: number; bottom: number; left: number; right: number;}, serieslength: number, rowlength: number) {
  let  
    thetha = Math.atan(depth.height/depth.width),
    rightdepth = Math.sqrt((Math.pow(depth.height, 2) + Math.pow(depth.width, 2))),
    {valuewidth: rightwidth, valuegap: rightgap} = getWidthAndGap(rightdepth, serieslength),
    {valuewidth: frontwidth, valuegap: frontgap} = getWidthAndGap(width, rowlength),
    i = 1,
    h = [],
    w = []
  ;
  for(let j=0; j<=i; j++) {
    h.push(
      (padding.top + (originindex*yaxisunit) + (
        ((seriesindex + i)*rightgap) + ((seriesindex + j)*rightwidth)
      )*Math.sin(thetha))
    );
    w.push(
      (padding.left + longestaxisnumberlength + space) + (
        (frontgap*(rowindex+i)) + (frontwidth*rowindex)
      ) + (
        (
          rightdepth - (rightgap*(seriesindex+i)) - (rightwidth*(seriesindex+j))
        )*Math.cos(thetha)
      )
    );
  }
  w[2] = w[0] + frontwidth;
  w[3] = w[1] + frontwidth;

  return {w, h};
}

function drawColumn(rowindex: number, seriesindex: number, value: number, width: number, yaxisunit: number, longestaxisnumberlength: number, space: number = 10, depth: {width: number; height: number;}, padding: {top: number; bottom: number; left: number; right: number;}, axis: number[], serieslength: number, rowlength: number) {
  let  
    originindex = getOriginIndex(axis),
    valueindex = getValueIndex(axis, value), 
    extra = getExtraUnit(value, valueindex, yaxisunit, axis),
    {w, h} = getBaseHeightAndWidthAtOrigin(width, originindex, seriesindex, rowindex, yaxisunit, longestaxisnumberlength, space, depth, padding, serieslength, rowlength)
  ;
  console.log(value+' '+extra+' '+h[0]+' '+h[1]);
  if(value !== axis[originindex]) {
    if(valueindex < originindex) {
      //positive
      return {
        front: w[1]+','+h[1]+' '+w[3]+','+h[1]+' '+w[3]+','+((h[1] - (yaxisunit*originindex)) + (yaxisunit*valueindex) + extra)+' '+w[1]+','+((h[1] - (yaxisunit*originindex)) + (yaxisunit*valueindex) + extra)+' '+w[1]+','+h[1],
        right: w[3]+','+h[1]+' '+w[2]+','+h[0]+' '+w[2]+','+((h[0] - (yaxisunit*originindex)) + (yaxisunit*valueindex) + extra)+' '+w[3]+','+((h[1] - (yaxisunit*originindex)) + (yaxisunit*valueindex) + extra),
        top: w[1]+','+((h[1] - (yaxisunit*originindex)) + (yaxisunit*valueindex) + extra)+' '+w[0]+','+((h[0] - (yaxisunit*originindex)) + (yaxisunit*valueindex) + extra)+' '+w[2]+','+((h[0] - (yaxisunit*originindex)) + (yaxisunit*valueindex) + extra)+' '+w[3]+','+((h[1] - (yaxisunit*originindex)) + (yaxisunit*valueindex) + extra)
      }
    }
    else {
      //negative axis
      return {
        front: w[1]+','+h[1]+' '+w[3]+','+h[1]+' '+w[3]+','+((h[1] - (yaxisunit*originindex)) + (yaxisunit*valueindex) + extra)+' '+w[1]+','+((h[1] - (yaxisunit*originindex)) + (yaxisunit*valueindex) + extra)+' '+w[1]+','+h[1],
        right: w[3]+','+h[1]+' '+w[2]+','+h[0]+' '+w[2]+','+((h[0] - (yaxisunit*originindex)) + (yaxisunit*valueindex) + extra)+' '+w[3]+','+((h[1] - (yaxisunit*originindex)) + (yaxisunit*valueindex) + extra),
        top: w[1]+','+h[1]+' '+w[3]+','+h[1]+' '+w[2]+','+h[0]+' '+w[0]+','+h[0]+' '+w[1]+','+h[1]
      };
    }
  }
  else {
    //value === 0
    return {
      front: '',
      right: '',
      top: ''
    };
  }
}

function drawCone() {

}

function drawCylinder() {

}

function drawPyramid() {

}

function plot3DBoxData(plottype: 'COLUMN' | 'CONE' | 'CYLINDER' | 'PYRAMID', width: number, height: number, longestaxisnumberlength: number, space: number = 10, depth: {width: number; height: number;}, padding: {top: number; bottom: number; left: number; right: number;}, axis: number[], column: DataTable_3D_Charts_Type) {
  let 
    plots: {front: string; right: string; top: string;}[] = []
  ;
  column.forEach((row, i) => {
    row.series.forEach((category, j) => {
      plots.push(drawColumn(
        i,
        j,
        category.value,
        width, 
        (height/(axis.length - 1)), 
        longestaxisnumberlength, 
        space, 
        depth, 
        padding, 
        axis,
        Object.entries(column[0].series).length,
        Object.entries(column).length
      ));
    });
  });
  return plots;
}

function calculateAxisNumberCoordinates(axisnumber: number[], height: number, longestaxisnumberlength: number, depth: {width: number; height: number;}, padding: {top: number; bottom: number; left: number; right: number;}) {
  let axisunit = height / (axisnumber.length - 1), axiscoordinates: {x: number; y: number;}[] = [];
  from(axisnumber)
    .pipe(
      map((num, i) => {
        return {
          x: padding.left + longestaxisnumberlength,
          y: (padding.top + depth.height + (i*axisunit))
        };
      })
    )
    .subscribe(
      coord => axiscoordinates.push(coord)
    )
  ;
  return axiscoordinates;
}

export function draw3DBoxAndPlot3DBoxData(plottype: 'COLUMN' | 'CONE' | 'CYLINDER' | 'PYRAMID', space: number = 10, depth: {width: number; height: number;}, fontsize: number, padding: {top: number; bottom: number; left: number; right: number;},  column: DataTable_3D_Charts_Type) {
  const 
    axisnumber = calculateAxisNumber(column),
    longestaxisnumberlength = calculateLongestAxisNumberLength(axisnumber, fontsize),
    {width, height} = get3DBoxDimension(
      space, 
      depth, 
      fontsize, 
      padding, 
      Object.entries(column[0].series).length,
      longestaxisnumberlength
    ),
    axisnumbercoordinates = calculateAxisNumberCoordinates(axisnumber, height, longestaxisnumberlength, depth, padding)
  ;
  return {
    originplane: drawPlane('ORIGIN', width, height, space, depth, padding, longestaxisnumberlength, axisnumber) as { hastraceline: boolean; plane: LineType[]; },
    axisnumber,
    axisnumbercoordinates,
    draw3DBox: draw3DBox(width, height, longestaxisnumberlength, space, depth, fontsize, padding, axisnumber, column),
    plot3DBoxData: plot3DBoxData(plottype, width, height, longestaxisnumberlength, space, depth, padding, axisnumber, column)
  };
}
