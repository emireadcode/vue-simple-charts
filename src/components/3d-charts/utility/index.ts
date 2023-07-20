import type { PlaneType, DataTableType, LineType, MaxMinType, AxisStatusType, PaddingType, DepthControllerTypeFor3D } from "../type";
import { map, reduce, from, mergeMap, min, max, findIndex, } from 'rxjs';
import { type Ref} from "vue";

function findMin(column: DataTableType) {
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

function findMax(column: DataTableType) {
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

function findMaxAndMin(column: DataTableType) {
  return {
    max: findMax(column), 
    min: findMin(column)
  };
}

function getHighestForFirstCalculation(minormax: number | MaxMinType, axistype: AxisStatusType) {
  return (
    axistype !== 'BOTH'?
    (
      (axistype==='NEGATIVE'? (-1*(minormax as number)) : (minormax as number))
    )
    : 
    (
      ((minormax as MaxMinType).max >= -1*(minormax as MaxMinType).min)?
      (minormax as MaxMinType).max : -1*(minormax as MaxMinType).min
    )
  );
}

function getNegativeOrPositiveAxisNumber(first: number, minormax: number | MaxMinType, axistype: AxisStatusType) {
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
    let paxis = getNegativeOrPositiveAxisNumber(first, (minormax as MaxMinType).max, 'POSITIVE');
    let naxis = getNegativeOrPositiveAxisNumber(first, (minormax as MaxMinType).min, 'NEGATIVE');
    axis = [...paxis, 0, ...naxis];
  }
  return axistype==='POSITIVE'? axis.reverse() : axis;
}

function getZeroDotSomethingAxisNumber(minormax: number | MaxMinType, axistype: AxisStatusType) {
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

function getZeroDotSomethingFirstAxisNumber(multiplier: number, distortedhighest: number, minormax: number | MaxMinType, axistype: AxisStatusType) {
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

function getAtleastOneDotSomethingAxisNumber(minormax: number | MaxMinType, axistype: AxisStatusType) {
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

function getAxisNumber(minormax: number | MaxMinType, axistype: AxisStatusType) {
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

function calculateAxisNumber(column: DataTableType) {
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

function get3DBoxDimension(space: number = 10, depth: DepthControllerTypeFor3D, fontsize: number, padding: PaddingType,  seriessize: number, longestaxisnumberlength: number) {
  const { width, height} = getChartAreaDimension();
  return { 
    width: width - (padding.right + padding.left) - measureText(('Series ' + seriessize), fontsize) - longestaxisnumberlength - depth.width - (2*space), 
    height: height - (padding.top + padding.bottom) - depth.height
  };
}

function drawTraceLines(plottype: 'SIDE' | 'FRONT', height: number, space: number = 10, depth: DepthControllerTypeFor3D, padding: PaddingType, longestaxisnumberlength: number, axis: number[], width?: number | undefined) {
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

function drawSidePlane(height: number, space: number = 10, depth: DepthControllerTypeFor3D, padding: PaddingType, longestaxisnumberlength: number, axis: number[]) {
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

function drawFrontPlane(width: number, height: number, space: number = 10, depth: DepthControllerTypeFor3D, padding: PaddingType, longestaxisnumberlength: number, axis: number[]) {
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

function drawBottomPlane(width: number, height: number, space: number = 10, depth: DepthControllerTypeFor3D, padding: PaddingType, longestaxisnumberlength: number) {
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

function drawOriginPlane(width: number, height: number, space: number = 10, depth: DepthControllerTypeFor3D, padding: PaddingType, longestaxisnumberlength: number, axis: number[]) {
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

function drawPlane(planetype: PlaneType, width: number, height: number, space: number = 10, depth: DepthControllerTypeFor3D, padding: PaddingType, longestaxisnumberlength: number, axis?: number[] | undefined) {
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

function draw3DBox(width: number, height: number, longestaxisnumberlength: number, space: number = 10, depth: DepthControllerTypeFor3D, fontsize: number, padding: PaddingType, axis: number[], column: DataTableType) {
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

/*
  w[0]           w[2]      h[0]
    ---------------
   /             /
  /             /
  --------------
  w[1]         w[3]        h[1]
*/

function getBaseHeightAndWidthAtOrigin(width: number, originindex: number, seriesindex: number, rowindex: number, yaxisunit: number, longestaxisnumberlength: number, space: number, depth: DepthControllerTypeFor3D, padding: PaddingType, serieslength: number, rowlength: number) {
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
    /*
      -----------------------------------------------------------------------------------------------------------------------------
     |       _________________________
     |      /|                       |
     |     / |                       |
     |    /  |                       | 1 data point
     |   /   |-----------------------| rightgap + rightwidth + rightgap = rightdepth = (2*rightgap) + rightwidth
     |   |  /| h[0] _________       /|
     |   | / |     /________/  h[1]/ | 2 data points
     |   |/__|____________________/__| rightgap + rightwidth + rightgap + rightwidth + rightgap = (3*rightgap) + (2*rightwidth)
     |   |   /                      /
     |   |  /                      /
     |   | /                      / h[0] when seriesindex = 0, j = 0, i = 1
     |   |/______________________/  h[0] = top + (originindex*yaxisunit) + height from Origin line to H[0]
     |                              where height from Origin line to H[0] = (rightgap*(0+1) + (0+0)*rightwidth)*sin(thetha)
     |
     |
     |                              h[1] when seriesindex = 0, j = 1, i = 1
     |                              h[1] = top + (originindex*yaxisunit) + height from Origin line to H[1]
     |                              where height from Origin line to H[1] = (rightgap*(0+1) + (0+1)*rightwidth)*sin(thetha)
     |
     |
     |
     |
     --------------------------------------------------------------------------------------------------------------------------------
    */
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


/*
  ==========================================
                Positive axis
  ==========================================

          w[0]           w[2]      h[2]
            ---------------
           /             /
          /             /
          --------------
          w[1]         w[3]        h[3]





          w[0]           w[2]      h[0]
            ---------------
           /             /
          /             /
          --------------
          w[1]         w[3]        h[1]

  ==========================================
                Negative axis
  ==========================================

          w[0]           w[2]      h[0]
            ---------------
           /             /
          /             /
          --------------
          w[1]         w[3]        h[1]





          w[0]           w[2]      h[2]
            ---------------
           /             /
          /             /
          --------------
          w[1]         w[3]        h[3]

*/

function getBaseDimensionAndValueHeight(axis: number[], width: number, value: number, valueindex: number, originindex: number, seriesindex: number, rowindex: number, yaxisunit: number, longestaxisnumberlength: number, space: number, depth: DepthControllerTypeFor3D, padding: PaddingType, serieslength: number, rowlength: number) {
  let 
    extra = getExtraUnit(value, valueindex, yaxisunit, axis),
    {w, h} = getBaseHeightAndWidthAtOrigin(width, originindex, seriesindex, rowindex, yaxisunit, longestaxisnumberlength, space, depth, padding, serieslength, rowlength)
  ;
  h[2] = ((h[0] - (yaxisunit*originindex)) + (yaxisunit*valueindex) + extra);
  h[3] = ((h[1] - (yaxisunit*originindex)) + (yaxisunit*valueindex) + extra);
  return {w, h};
}

function drawColumn(rowindex: number, seriesindex: number, value: number, width: number, yaxisunit: number, longestaxisnumberlength: number, space: number = 10, depth: DepthControllerTypeFor3D, padding: PaddingType, axis: number[], serieslength: number, rowlength: number) {
  let 
    originindex = getOriginIndex(axis),
    valueindex = getValueIndex(axis, value), 
    {w, h} = getBaseDimensionAndValueHeight(axis, width, value, valueindex, originindex, seriesindex, rowindex, yaxisunit, longestaxisnumberlength, space, depth, padding, serieslength, rowlength)
  ;
  if(value !== axis[originindex]) {
    if(valueindex < originindex) {
      //positive axis
      return {
        face: (
          parseInt(
            (
              (
                (h[0]+h[1])/2.0
              )-(
                (h[3]+h[2])/2.0
              )
            )+''
          ) > 0?
          'M '+w[3]+' '+h[1]+' l 0 '+(
            -1*(
              h[1]-h[3]
            )
          )
          +' '+(-1*(w[3] - w[1]))+' 0 0 ' + (
            h[1]-h[3]
          )
          +' '+(w[3] - w[1]) + ' 0 '
          +'M '+w[3]+' '+h[1]+' l '+(w[2]-w[3])+' '+(-1*(h[1]-h[0]))+' 0 '+(-1*(h[0]-h[2]))+' '+(-1*(w[2]-w[3]))+' '+(h[3]-h[2])+ ' 0 '+(h[1]-h[3])
          +' M '+w[1]+' '+h[3]+' l '+(w[0]-w[1])+' '+(-1*(h[3]-h[2]))+' '+(w[2]-w[0]) + ' 0 '+(-1*(w[2]-w[3]))+' '+(h[3]-h[2])+ ' '+(-1*(w[3]-w[1]))+' 0 '
          :
          'M '+w[1]+' '+h[1]+' l '+(w[0]-w[1])+' '+(-1*(h[1]-h[0]))+' '+(w[2]-w[0]) + ' 0 '+(-1*(w[2]-w[3]))+' '+(h[1]-h[0])+ ' '+(-1*(w[3]-w[1]))+' 0 '
        )
      }
    }
    else {
      //negative axis
      return {
        face: (
          parseInt(
            (
              (
                (h[3]+h[2])/2.0
              )-(
                (h[0]+h[1])/2.0
              )
            )+''
          ) > 0?
          'M '+w[3]+' '+h[1]+' l 0 '+(
            (
              h[3]-h[1]
            )
          )
          +' '+(-1*(w[3] - w[1]))+' 0 0 ' + (
            -1*(
              h[3]-h[1]
            )
          )
          +' '+(w[3] - w[1]) + ' 0 '
          +'M '+w[1]+' '+h[1]+' l '+(w[0]-w[1])+' '+(-1*(h[1]-h[0]))+' '+(w[2]-w[0]) + ' 0 '+(-1*(w[2]-w[3]))+' '+(h[1]-h[0])+ ' '+(-1*(w[3]-w[1]))+' 0 '
          + ' M '+w[3]+' '+h[1]+' l '+(w[2]-w[3])+' '+(-1*(h[1]-h[0]))+' 0 '+(h[2]-h[0])+' '+(-1*(w[2]-w[3]))+' '+(h[3]-h[2])
          :
          'M '+w[1]+' '+h[1]+' l '+(w[0]-w[1])+' '+(-1*(h[1]-h[0]))+' '+(w[2]-w[0]) + ' 0 '+(-1*(w[2]-w[3]))+' '+(h[1]-h[0])+ ' '+(-1*(w[3]-w[1]))+' 0 '
        )
      };
    }
  }
  else {
    //value === 0
    return {
      face: 'M '+w[1]+' '+h[1]+' l '+(w[0]-w[1])+' '+(-1*(h[1]-h[0]))+' '+(w[2]-w[0]) + ' 0 '+(-1*(w[2]-w[3]))+' '+(h[1]-h[0])+ ' '+(-1*(w[3]-w[1]))+' 0 '
    };
  }
}

function drawCone(rowindex: number, seriesindex: number, value: number, width: number, yaxisunit: number, longestaxisnumberlength: number, space: number = 10, depth: DepthControllerTypeFor3D, padding: PaddingType, axis: number[], serieslength: number, rowlength: number) {
  let 
    originindex = getOriginIndex(axis),
    valueindex = getValueIndex(axis, value), 
    {w, h} = getBaseDimensionAndValueHeight(axis, width, value, valueindex, originindex, seriesindex, rowindex, yaxisunit, longestaxisnumberlength, space, depth, padding, serieslength, rowlength)
  ;
  if(value !== axis[originindex]) {
    if(valueindex < originindex) {
      //positive axis
      return {
        face: (
          parseInt(
            (
              (
                (h[0]+h[1])/2.0
              )-(
                (h[3]+h[2])/2.0
              )
            )+''
          ) > 0?
          'M '+((w[0]+w[1])/2.0)+' '+((h[0]+h[1])/2.0)+' l '+(
              ((w[2]+w[3])/2.0) - (
                (
                  ((w[2]+w[3])/2.0) + ((w[0]+w[1])/2.0)
                )/2.0
              )
            )+' '+(
              -1*(
                (
                  (h[0]+h[1])/2.0
                )-(
                  (h[3]+h[2])/2.0
                )
              )
            )+' '+(
              (((w[2]+w[3])/2.0) - (
                (
                  ((w[2]+w[3])/2.0)+((w[0]+w[1])/2.0)
                )/2.0
              ))
            )+' '+(
              (
                (h[0]+h[1])/2.0
              )-(
                (h[3]+h[2])/2.0
              )
            ) 
            + ' M '+((w[0]+w[1])/2.0)+' '+((h[0]+h[1])/2.0)+' q '+(w[3] - ((w[3] + w[1])/2.0))+' '+ (2*(h[1] - ((h[0]+h[1])/2.0))) + ' ' + (w[3]-w[1]) + ' 0'
            : 
            'M '+((w[0]+w[1])/2.0)+' '+((h[0]+h[1])/2.0)+' q '+(w[2] - ((w[2] + w[0])/2.0))+' '+ (-2*(h[1] - ((h[0]+h[1])/2.0))) + ' ' + (w[2]-w[0]) + ' 0'
            +' M '+((w[0]+w[1])/2.0)+' '+((h[0]+h[1])/2.0)+' q '+(w[3] - ((w[3] + w[1])/2.0))+' '+ (2*(h[1] - ((h[0]+h[1])/2.0))) + ' ' + (w[3]-w[1]) + ' 0'
          ) 
      }
    }
    else {
      //negative axis
      return {
        face: 'M '+((w[0]+w[1])/2.0)+' '+((h[0]+h[1])/2.0)
        +' q '+(w[3] - ((w[3] + w[1])/2.0))+' '+ (2*(h[1] - ((h[0]+h[1])/2.0))) + ' ' + (w[3]-w[1]) + ' 0'
        +' M '+((w[0]+w[1])/2.0)+' '+((h[0]+h[1])/2.0)
        +' q '+(w[2] - ((w[2] + w[0])/2.0))+' '+ (-2*(h[1] - ((h[0]+h[1])/2.0))) + ' ' + (w[2]-w[0]) + ' 0' 
        +(
          parseInt(
            (
              (
                (h[3]+h[2])/2.0
              )-(
                (h[0]+h[1])/2.0
              )
            )+''
          ) > 0?
          ' M '+((w[0]+w[1])/2.0)+' '+((h[0]+h[1])/2.0)+' l '+(
            ((w[2]+w[3])/2.0) - (
              (
                ((w[2]+w[3])/2.0) + ((w[0]+w[1])/2.0)
              )/2.0
            )
          )+' '+(
            -1*(
              (
                (h[0]+h[1])/2.0
              )-(
                (h[3]+h[2])/2.0
              )
            )
          )+' l '+(
            ((w[2]+w[3])/2.0) - (
              (
                ((w[2]+w[3])/2.0)+((w[0]+w[1])/2.0)
              )/2.0
            )
          )+' '+(
            (
              (h[0]+h[1])/2.0
            )-(
              (h[3]+h[2])/2.0
            )
          )
          :
          ''
        )
      };
    }
  }
  else {
    //value === 0
    return {
      face:  'M '+((w[0]+w[1])/2.0)+' '+((h[0]+h[1])/2.0)+' q '+(w[3] - ((w[3] + w[1])/2.0))+' '+ (2*(h[1] - ((h[0]+h[1])/2.0))) + ' ' + (w[3]-w[1]) + ' ' +0+' M '+((w[0]+w[1])/2.0)+' '+((h[0]+h[1])/2.0)+' q '+(w[2] - ((w[2] + w[0])/2.0))+' '+ (-2*(h[1] - ((h[0]+h[1])/2.0))) + ' ' + (w[2]-w[0]) + ' ' +0,
    };
  }
}

function drawCylinder(rowindex: number, seriesindex: number, value: number, width: number, yaxisunit: number, longestaxisnumberlength: number, space: number = 10, depth: DepthControllerTypeFor3D, padding: PaddingType, axis: number[], serieslength: number, rowlength: number) {
  let 
    originindex = getOriginIndex(axis),
    valueindex = getValueIndex(axis, value), 
    {w, h} = getBaseDimensionAndValueHeight(axis, width, value, valueindex, originindex, seriesindex, rowindex, yaxisunit, longestaxisnumberlength, space, depth, padding, serieslength, rowlength)
  ;
  if(value !== axis[originindex]) {
    if(valueindex < originindex) {
      //positive axis
      return {
        face: (
          parseInt(
            (
              (
                (h[0]+h[1])/2.0
              )-(
                (h[3]+h[2])/2.0
              )
            )+''
          ) > 0?
          'M '+((w[0]+w[1])/2.0)+' '+((h[2]+h[3])/2.0)
          +' q '+(w[3] - ((w[3] + w[1])/2.0))+' '+ (2*(h[3] - ((h[2]+h[3])/2.0))) + ' ' + (w[3]-w[1]) + ' 0'
          +' M '+((w[0]+w[1])/2.0)+' '+((h[2]+h[3])/2.0)
          +' q '+(w[2] - ((w[2] + w[0])/2.0))+' '+ (-2*(h[3] - ((h[2]+h[3])/2.0))) + ' ' + (w[2]-w[0]) + ' 0'
          +' M '+((w[0]+w[1])/2.0)+' '+((h[3]+h[2])/2.0)+' l 0 '+(
            (
              (
                (h[1]+h[0])/2.0
              )-(
                (h[3]+h[2])/2.0
              )
            )
          )
          +' q '+(w[3] - ((w[3] + w[1])/2.0))+' '+ (2*(h[1] - ((h[1]+h[0])/2.0))) + ' ' + (w[3]-w[1]) + ' 0 l 0 '+(
            -1*(
              (
                (h[1]+h[0])/2.0
              )-(
                (h[3]+h[2])/2.0
              )
            )
          )
          :
          'M '+((w[0]+w[1])/2.0)+' '+((h[0]+h[1])/2.0)+' q '+(w[3] - ((w[3] + w[1])/2.0))+' '+ (2*(h[1] - ((h[0]+h[1])/2.0))) + ' ' + (w[3]-w[1]) + ' ' +0+' M '+((w[0]+w[1])/2.0)+' '+((h[0]+h[1])/2.0)+' q '+(w[2] - ((w[2] + w[0])/2.0))+' '+ (-2*(h[1] - ((h[0]+h[1])/2.0))) + ' ' + (w[2]-w[0]) + ' 0'
        )
      }
    }
    else {
      //negative axis
      return {
        face: 'M '+((w[0]+w[1])/2.0)+' '+((h[0]+h[1])/2.0)
        +' q '+(w[3] - ((w[3] + w[1])/2.0))+' '+ (2*(h[1] - ((h[0]+h[1])/2.0))) + ' ' + (w[3]-w[1]) + ' 0 '
        +' M '+((w[0]+w[1])/2.0)+' '+((h[0]+h[1])/2.0)
        +' q '+(w[2] - ((w[2] + w[0])/2.0))+' '+ (-2*(h[1] - ((h[0]+h[1])/2.0))) + ' ' + (w[2]-w[0]) + ' 0 '
        +(
          parseInt(
            (
              (
                (h[3]+h[2])/2.0
              )-(
                (h[0]+h[1])/2.0
              )
            )+''
          ) > 0?
          ' M '+((w[0]+w[1])/2.0)+' '+((h[0]+h[1])/2.0)+' l 0 '+(
            (
              (
                (h[3]+h[2])/2.0
              )-(
                (h[0]+h[1])/2.0
              )
            )
          )
          +' q '+(w[3] - ((w[3] + w[1])/2.0))+' '+ (2*(h[3] - ((h[3]+h[2])/2.0))) + ' ' + (w[3]-w[1]) + ' 0 l 0 '+(
            -1*(
              (
                (h[3]+h[2])/2.0
              )-(
                (h[0]+h[1])/2.0
              )
            )
          )
          :
          ''
        )
      };
    }
  }
  else {
    //value === 0
    return {
      face: 'M '+((w[0]+w[1])/2.0)+' '+((h[0]+h[1])/2.0)+' q '+(w[3] - ((w[3] + w[1])/2.0))+' '+ (2*(h[1] - ((h[0]+h[1])/2.0))) + ' ' + (w[3]-w[1]) + ' ' +0+' M '+((w[0]+w[1])/2.0)+' '+((h[0]+h[1])/2.0)+' q '+(w[2] - ((w[2] + w[0])/2.0))+' '+ (-2*(h[1] - ((h[0]+h[1])/2.0))) + ' ' + (w[2]-w[0]) + ' 0',
    };
  }
}

function drawPyramid(rowindex: number, seriesindex: number, value: number, width: number, yaxisunit: number, longestaxisnumberlength: number, space: number = 10, depth: DepthControllerTypeFor3D, padding: PaddingType, axis: number[], serieslength: number, rowlength: number) {
  let 
    originindex = getOriginIndex(axis),
    valueindex = getValueIndex(axis, value), 
    {w, h} = getBaseDimensionAndValueHeight(axis, width, value, valueindex, originindex, seriesindex, rowindex, yaxisunit, longestaxisnumberlength, space, depth, padding, serieslength, rowlength)
  ;
  if(value !== axis[originindex]) {
    if(valueindex < originindex) {
      //positive axis
      return {
        face: 
          parseInt(
            (
              (
                (h[0]+h[1])/2.0
              )-(
                (h[3]+h[2])/2.0
              )
            )+''
          ) > 0?
          ' M '+w[1]+' '+h[1]+' l '+(
              w[0]-w[1]
            )+' '+(
              -1*(
                h[1]-(
                  (h[3]+h[2])/2.0
                )
              )
            )+' '+(
              w[3] - w[0]
            )+' '+(
              h[1]-(
                (h[3]+h[2])/2.0
              )
            ) + ' M '+w[0]+' '+(
              (h[3]+h[2])/2.0
            )+' l '+(w[2] - w[0])+' '+(
              h[0]-((h[3]+h[2])/2.0)
            )+' '+(-1*(w[2]-w[3]))+' '+(h[1]-h[0])
            : 
            'M '+w[1]+' '+h[1]+' l '+(w[0]-w[1])+' '+(-1*(h[1]-h[0]))+' '+(w[2]-w[0]) + ' 0 '+(-1*(w[2]-w[3]))+' '+(h[1]-h[0])+ ' '+(-1*(w[3]-w[1]))+' 0 '
      }
    }
    else {
      //negative axis
      return {
        face: 
        'M '+w[1]+' '+h[1]+' l '+(w[0]-w[1])+' '+(-1*(h[1]-h[0]))+' '+(w[2]-w[0]) + ' 0 '+(-1*(w[2]-w[3]))+' '+(h[1]-h[0])+ ' '+(-1*(w[3]-w[1]))+' 0 '
        +(
          parseInt(
            (
              (
                (h[3]+h[2])/2.0
              )-(
                (h[0]+h[1])/2.0
              )
            )+''
          ) > 0?
          ' M '+w[1]+' '+h[1]+' l '+(
              w[0]-w[1]
            )+' '+(
              -1*(
                h[1]-(
                  (h[3]+h[2])/2.0
                )
              )
            )+' '+(
              w[3] - w[0]
            )+' '+(
              h[1]-(
                (h[3]+h[2])/2.0
              )
            ) + ' M '+w[0]+' '+(
              (h[3]+h[2])/2.0
            )+' l '+(w[2] - w[0])+' '+(
              h[0]-((h[3]+h[2])/2.0)
            )+' '+(-1*(w[2]-w[3]))+' '+(h[1]-h[0])
            : 
            ''
          )
      };
    }
  }
  else {
    //value === 0
    return {
      face: 'M '+w[1]+' '+h[1]+' l '+(w[0]-w[1])+' '+(-1*(h[1]-h[0]))+' '+(w[2]-w[0]) + ' 0 '+(-1*(w[2]-w[3]))+' '+(h[1]-h[0])+ ' '+(-1*(w[3]-w[1]))+' 0 '
    };
  }
}

function generateRandomColor() {
  let colors = {
    aqua: "#00ffff",
    black: "#000000",
    blue: "#0000ff",
    brown: "#a52a2a",
    darkblue: "#00008b",
    darkcyan: "#008b8b",
    darkgrey: "#a9a9a9",
    darkgreen: "#006400",
    darkkhaki: "#bdb76b",
    darkolivegreen: "#556b2f",
    darkorange: "#ff8c00",
    darkred: "#8b0000",
    darksalmon: "#e9967a",
    darkviolet: "#9400d3",
    gold: "#ffd700",
    green: "#008000",
    indigo: "#4b0082",
    lime: "#00ff00",
    magenta: "#ff00ff",
    olive: "#808000",
    orange: "#ffa500",
    purple: "#800080",
    red: "#ff0000",
    yellow: "#ffff00"
  },
  result = '',
  count = 0;
  for (let prop in colors) {
    if (Math.random() < 1/++count)
      result = prop;
  }
  return result;
}

function plot3DBoxData(plottype: 'COLUMN' | 'CONE' | 'CYLINDER' | 'PYRAMID', width: number, height: number, longestaxisnumberlength: number, space: number = 10, depth: DepthControllerTypeFor3D, padding: PaddingType, axis: number[], column: DataTableType) {
  let 
    plots: {[key: string]: {series: /*{front: string; right: string; top: string;}*/{face: string;}[]; color: string[];};} = {}, 
    color: string[] = []
  ;
  column.forEach((row, i) => {
    row.series.forEach((category, j) => {
      if(i === 0) {
        let newcolor = '';
        do {
          newcolor = generateRandomColor();
        }
        while(
          color.includes(newcolor) 
          || (newcolor==='darkred' && color.includes('brown')) 
          || (newcolor==='brown' && color.includes('darkred')) 
          || (newcolor==='darkorange' && color.includes('orange')) 
          || (newcolor==='orange' && color.includes('darkorange'))
          || (newcolor==='gold' && color.includes('yellow')) 
          || (newcolor==='yellow' && color.includes('gold'))
          || (newcolor==='gold' && color.includes('orange')) 
          || (newcolor==='orange' && color.includes('gold'))
        );
        color.push(newcolor);
        console.log(color);
      }
      if(!((i+'') in plots)) {
        plots = {
          ...plots,
          [i+'']: {
            series: [],
            color
          }
        }
      }
      if(plottype==='COLUMN') {
        plots[i+''].series.push(drawColumn(
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
      }
      else if(plottype==='CONE') {
        plots[i+''].series.push(drawCone(
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
      }
      else if(plottype==='CYLINDER') {
        plots[i+''].series.push(drawCylinder(
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
      }
      else {
        plots[i+''].series.push(drawPyramid(
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
      }
    });
  });
  return plots;
}

function calculateAxisNumberCoordinates(axisnumber: number[], height: number, longestaxisnumberlength: number, depth: DepthControllerTypeFor3D, padding: PaddingType) {
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

export function draw3DBoxAndPlot3DBoxData(plottype: 'COLUMN' | 'CONE' | 'CYLINDER' | 'PYRAMID', space: number = 10, depth: DepthControllerTypeFor3D, fontsize: number, padding: PaddingType,  column: DataTableType) {
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
