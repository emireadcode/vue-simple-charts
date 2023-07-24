export type SankeyDataType = {
  from: string;
  to: string;
  value: number;
}[];

export type SankeyTreeType = {
  [key: string]: {
    name: string;
    inputweight: number;
    outputweight: number;
    parentandchildweightinparent: SankeyTreeParentType;
  }
};

export type NodeType = {
  [key: number]: (string | ToBeStoredObjectType)[];
};

export type FoundAndPosType = {
  found: boolean; 
  pos: number;
}[];

export type ToBeStoredObjectType = {
  [key: string]: {
    loop: string[]; 
    self: boolean;
  }
}

export type SankeyTreeParentType = {
  [key: string]: {
    name: string;
    weight: number;
  }
}
