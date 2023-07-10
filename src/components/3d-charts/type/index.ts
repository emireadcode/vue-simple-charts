export type DataTableType = {
  name: string;
  series: {
    name: string;
    value: number;
  }[];
}[];

export type LineType = {x1: number; x2: number; y1: number; y2: number;};

export type MaxMinType = {max: number; min: number;};

export type AxisStatusType = 'POSITIVE' | 'NEGATIVE' | 'BOTH';

export type PaddingType = {top: number; bottom: number; left: number; right: number;};

export type DepthControllerTypeFor3D = {width: number; height: number;};

export type PlaneType = 'BOTTOM' | 'FRONT' | 'SIDE' | 'ORIGIN';