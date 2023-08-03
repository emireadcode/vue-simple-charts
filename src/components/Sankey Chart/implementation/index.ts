import type { PaddingType } from "@/components/3d-charts/type";
import type { FoundAndPosType, NodeType, SankeyDataType, SankeyTreeParentType, SankeyTreeType, ToBeStoredObjectType } from "./type/";
import { from, filter, max, map, take, mergeMap, reduce, } from 'rxjs';
import { type Ref } from "vue";

function hasNoParents(item: SankeyTreeParentType) {
  if (item == null) {
    return false;
  }

  if (typeof item !== 'object') {
    return false;
  }

  const proto = Object.getPrototypeOf(item);
  if (proto !== null && proto !== Object.prototype) {
    return false;
  }

  for (var prop in item) {
    if (Object.prototype.hasOwnProperty.call(item, prop)) {
      return false;
    }
  }

  return true;
}

function randomlySetASingleRoot(sankeytree: SankeyTreeType) {
  let node: NodeType = {};
  node = {
    0: []
  };
  Object.values(sankeytree).forEach((item, i) => {
    if(i === 0) {
      node[0].push(item.name);
      return;
    }
  });
  return node;
}

function aggregateAllRootNodesIntoLevelZero(sankeytree: SankeyTreeType) {
  let node: NodeType = {};
  node = {
    0: []
  };
  from(Object.values(sankeytree))
    .pipe(
      filter((item, i) => hasNoParents(item.parentandchildweightinparent))
    )
    .subscribe(
      root => node[0].push(root.name)
    )
  ;
  return node;
}

function getAllParentsFoundStatusAndPos(itemname: string, node: NodeType, sankeytree: SankeyTreeType) {
  let 
    foundandpos: FoundAndPosType = [],
    parents = sankeytree[removeWhiteSpaceAndToLowerCase(itemname)].parentandchildweightinparent
  ;
  Object.values(parents).forEach((parent, j) => {
    if(removeWhiteSpaceAndToLowerCase(itemname) !== removeWhiteSpaceAndToLowerCase(parent.name)) {
      foundandpos.push(isParentOrItemFoundInNodeAndWhere(node, parent.name));
    }
  });
  return foundandpos;
}

function getHighestIndexOfTruthfulFounds(foundandpos: FoundAndPosType) {
  let maxindex = 0;
  from(foundandpos)
    .pipe(
      filter(item => item.found === true),
      max((a, b) => a.pos - b.pos)
    )
    .subscribe(
      max => maxindex = max.pos
    )
  ;
  return maxindex;
}

function addParentsAboveItemFoundPos(sankeytree: SankeyTreeType, node: NodeType, parentandchildweightinparent: SankeyTreeParentType, itemfoundpos: number) {
  let newnode: NodeType = {};
  if((itemfoundpos-1) >= 0) {
    newnode = JSON.parse(JSON.stringify(node)) as NodeType;
    Object.values(parentandchildweightinparent).forEach(parent => {
      newnode[itemfoundpos-1].push(determineHowItemShouldBeStored(parent.name, sankeytree));
    });
  }
  else {
    newnode = {
      0: []
    };
    Object.values(parentandchildweightinparent).forEach(parent => {
      newnode[0].push(determineHowItemShouldBeStored(parent.name, sankeytree));
    });
    Object.entries(node).forEach((n, i) => {
      newnode = {
        ...newnode,
        [parseInt(n[0])+1]: n[1]
      };
    })
  }
  return newnode;
}

function isParentOrItemFoundInNodeAndWhere(node: NodeType, parentoritemname: string) {
  let parentoritemfound = false, pos = -1;
  from(Object.entries(node))
    .forEach(next => {
      from(next[1])
        .pipe(
          map(child => (typeof child === 'string')? removeWhiteSpaceAndToLowerCase(child) : Object.keys(child)[0]),
          filter(child => child === removeWhiteSpaceAndToLowerCase(parentoritemname)),
          take(1)
        )
        .subscribe(() => {
          pos = parseInt(next[0]);
          parentoritemfound = true;
        })
      ;
      if(parentoritemfound) {
        return;
      }
    })
  ;
  return {found: parentoritemfound, pos};
}

function getParentOrItemFoundPosInNode(node: NodeType, parentoritemname: string) {
  return isParentOrItemFoundInNodeAndWhere(node, parentoritemname).pos;
}

function isAtLeastOneParentFoundInNode(node: NodeType, parentandchildweightinparent: SankeyTreeParentType) {
  let parentfound: boolean[] = [];
  from(Object.values(parentandchildweightinparent))
    .forEach(parent => {
      parentfound.push(isParentOrItemFoundInNodeAndWhere(node, parent.name).found);
    })
  ;
  return parentfound.includes(true)? true : false;
}

function isItemFoundInNode(node: NodeType, itemname: string) {
  return isParentOrItemFoundInNodeAndWhere(node, itemname).found;
}

function isParentOrItemFoundInNode(node: NodeType, item: SankeyTreeType[string]) {
  let 
    parentfound = isAtLeastOneParentFoundInNode(node, item.parentandchildweightinparent), 
    itemfound = isItemFoundInNode(node, item.name)
  ;
  return {parentfound, itemfound}
}

function isParentInNodeAtGivenLevel(highestposofparentsinnode: number, parentname: string, node: NodeType) {
  let parentinnodeatindex = false;
  from(node[highestposofparentsinnode])
    .pipe(
      map(parentoritemname => (typeof parentoritemname === 'string')? removeWhiteSpaceAndToLowerCase(parentoritemname) : Object.keys(parentoritemname)[0]),
      filter(parentoritemname => parentname === parentoritemname),
      take(1)
    )
    .subscribe(
      () => parentinnodeatindex = true
    )
  ;
  return parentinnodeatindex;
}

function isItemAndParentLoopToEachOther(itemname: string, highestposofparentsinnode: number, node: NodeType, sankeytree: SankeyTreeType) {
  let 
    itemandparentlooptoeachother = false,
    parents = sankeytree[removeWhiteSpaceAndToLowerCase(itemname)].parentandchildweightinparent,
    itemstoredby = determineHowItemShouldBeStored(itemname, sankeytree)
  ;
  if(typeof itemstoredby !== 'string') {
    from(Object.values(parents))
      .pipe(
        map(parent => determineHowItemShouldBeStored(parent.name, sankeytree)),
        filter(
          parent => (
            (typeof parent !== 'string') 
            && 
            (parent as ToBeStoredObjectType)[Object.keys((parent as ToBeStoredObjectType))[0]].loop.includes(itemname)
            &&
            isParentInNodeAtGivenLevel(
              highestposofparentsinnode, 
              Object.keys((parent as ToBeStoredObjectType))[0], 
              node
            )
          )
        ),
      )
      .subscribe(
        () => itemandparentlooptoeachother = true
      )
    ;
  }
  return itemandparentlooptoeachother;
}

function isItemMoveable(node: NodeType, item: SankeyTreeType[string], highestposofparentsinnode: number, itemfoundpos: number) {
  let canbemoved = true, entered = false;
  for(let i=(itemfoundpos+1); i<=(highestposofparentsinnode+1); i++) {
    entered = true;
    if(i in node) {
      from(Object.values(item.parentandchildweightinparent))
        .forEach(parent => {
          from(node[i])
            .pipe(
              map(
                child => (typeof child === 'string')? removeWhiteSpaceAndToLowerCase(child) : Object.keys(child)[0]
              ),
              filter(child => child === removeWhiteSpaceAndToLowerCase(parent.name)),
              take(1)
            )
            .subscribe(
              () => canbemoved = false
            )
          ;
          if(!canbemoved) {
            return;
          }
        })
      ;
      if(!canbemoved) {
        break;
      }
    }
    else {
      break;
    }
  }
  return entered? canbemoved : !canbemoved;
}

function findAndDeleteItemFromNode(itemname: string, node: NodeType) {
  let newnode = JSON.parse(JSON.stringify(node)) as NodeType, done = false;
  Object.values(newnode).forEach(n => {
    Object.values(n).forEach((s, i) => {
      if(typeof s === 'string') {
        if(s === itemname) {
          n.splice(i, 1);
          done = true;
          return;
        }
      }
      else {
        if(Object.keys(s)[0] === removeWhiteSpaceAndToLowerCase(itemname)) {
          n.splice(i, 1);
          done = true;
          return;
        }
      }
    });
    if(done) {
      return;
    }
  });
  return newnode;
}

function moveItemFromCurrentPosToNewPos(itemfoundpos: number, highestposofparentsinnode: number, node: NodeType, sankeytree: SankeyTreeType, item: SankeyTreeType[string]) {
  let 
    tobemoveditem = determineHowItemShouldBeStored(item.name, sankeytree),
    newnode = findAndDeleteItemFromNode(item.name, node)
  ;
  if((highestposofparentsinnode+1) in newnode) {
    newnode[highestposofparentsinnode+1].push(tobemoveditem);
  }
  else {
    newnode = {
      ...newnode,
      [highestposofparentsinnode+1]: [tobemoveditem]
    };
  }
  return newnode;
}

function removeWhiteSpaceAndToLowerCase(text: string) {
  return (text as string).toLowerCase().replace(/\s*/g, "");
}

function determineHowItemShouldBeStored(itemorparentname: string, sankeytree: SankeyTreeType) {
  let 
    tobestored: ToBeStoredObjectType = {
      [removeWhiteSpaceAndToLowerCase(itemorparentname)]: {
        loop: [],
        self: false
      }
    }, 
    storebyobject = false,
    itemparents = sankeytree[removeWhiteSpaceAndToLowerCase(itemorparentname)].parentandchildweightinparent
  ;
  from(Object.values(sankeytree))
    .forEach((treeloop) => {
      if(treeloop.name !== itemorparentname) {
        from(Object.values(itemparents))
          .forEach(itemparentloop => {
            if(itemparentloop.name === itemorparentname) {
              tobestored[removeWhiteSpaceAndToLowerCase(itemorparentname)].self = true;
              storebyobject = true;
            }
            else {
              if(itemparentloop.name === treeloop.name) {
                from(Object.values(treeloop.parentandchildweightinparent))
                  .pipe(
                    filter(parent => parent.name === itemorparentname)
                  )
                  .subscribe(
                    () => {
                      tobestored[removeWhiteSpaceAndToLowerCase(itemorparentname)].loop.push(treeloop.name);
                      storebyobject = true;
                    }
                  )
                ;
              }
            }
          })
        ;
      }
    })
  ;
  return (storebyobject)? tobestored : itemorparentname;
}

function isDeepStrictlyEqual(curnode: NodeType, prevnode: NodeType) {
  let bothequal = true;
  if(Object.keys(curnode).length !== Object.keys(prevnode).length) {
    bothequal = false;
  }
  else {
    if(JSON.stringify(curnode) === JSON.stringify(prevnode)) {
      bothequal = true;
    }
    else {
      bothequal = false;
    }
  }
  return bothequal;
}

function aggregateNodesIntoRespectiveLevels(sankeytree: SankeyTreeType) {
  let node: NodeType = aggregateAllRootNodesIntoLevelZero(sankeytree), done = false;
  if(node[0].length === 0) {
    node = randomlySetASingleRoot(sankeytree);
  }
  let prevnode = JSON.parse(JSON.stringify(node));
  do {
    Object.values(sankeytree).forEach(item => {
      if(!hasNoParents(item.parentandchildweightinparent)) {
        let 
          itemfoundpos = getParentOrItemFoundPosInNode(node, item.name),
          {parentfound, itemfound} = isParentOrItemFoundInNode(node, item)
        ;
        if(parentfound) {
          let 
            highestposofparentsinnode = getHighestIndexOfTruthfulFounds(
              getAllParentsFoundStatusAndPos(
                item.name,
                node, 
                sankeytree
              )
            )
          ;
          if(itemfound) {
            if(!isItemAndParentLoopToEachOther(item.name, highestposofparentsinnode, node, sankeytree)) {
              if(isItemMoveable(node, item, highestposofparentsinnode, itemfoundpos)) {
                node = moveItemFromCurrentPosToNewPos(itemfoundpos, highestposofparentsinnode, node, sankeytree, item);
              }
            }
          }
          else {
            let tobestoreditem = determineHowItemShouldBeStored(item.name, sankeytree);
            if((highestposofparentsinnode+1) in node) {
              node[highestposofparentsinnode+1].push(tobestoreditem);
            }
            else {
              node = {
                ...node,
                [highestposofparentsinnode+1]: [tobestoreditem]
              };
            }
          }
        }
        else {
          if(itemfound) {
            node = addParentsAboveItemFoundPos(
              sankeytree,
              node, 
              item.parentandchildweightinparent, 
              itemfoundpos
            );
          }
        }
      }
    });
    let curnode = JSON.parse(JSON.stringify(node));
    if(isDeepStrictlyEqual(curnode, prevnode)) {
      done = true;
    }
    else {
      prevnode = JSON.parse(JSON.stringify(node));
    }
  }
  while(done === false);
  return node;
}

function addFromsWithoutParents(datatable: SankeyDataType, existinglink: SankeyTreeType) {
  let sankey = existinglink;
  Object.values(datatable).forEach((link, i) => {
    let fromKey = removeWhiteSpaceAndToLowerCase(link.from);
    if(!(fromKey in sankey)) {
      sankey = {
        ...sankey,
        [fromKey]: {
          name: link.from,
          inputweight: link.value,
          outputweight: 0,
          parentandchildweightinparent: {}
        }
      };
    }
  });
  return sankey;
}

export function createSankeyTree(datatable: SankeyDataType) {
  let sankey: SankeyTreeType = {};
  Object.values(datatable).forEach((link, i) => {
    let 
      toKey = removeWhiteSpaceAndToLowerCase(link.to),
      fromKey = removeWhiteSpaceAndToLowerCase(link.from)
    ;
    if(toKey in sankey) {
      sankey[toKey].parentandchildweightinparent = {
        ...sankey[toKey].parentandchildweightinparent,
        [fromKey]: {
          name: link.from,
          weight: link.value
        }
      };
      sankey[toKey].inputweight+=link.value;
    }
    else {
      sankey = {
        ...sankey,
        [toKey]: {
          name: link.to,
          inputweight: link.value,
          outputweight: 0,
          parentandchildweightinparent: {
            [fromKey]: {
              name: link.from,
              weight: link.value
            }
          }
        }
      };
    }
  });
  sankey = addFromsWithoutParents(datatable, sankey);
  return sankey;
}

function getZeroFilledArray(node: NodeType) {
  let zerofilledarray: number[] = [];
  Object.values(node).forEach(() => {
    zerofilledarray.push(0);
  });
  return zerofilledarray;
}

function getTotalWeightsPerLevel(sankeytree: SankeyTreeType, node: NodeType) {
  let totalperlevel: number[] = getZeroFilledArray(node);
  Object.entries(node)
    .forEach(([nodekey, nodevalue]) => {
      Object.values(nodevalue)
        .forEach(nodevaluevalue => {
          let 
            key = (
              (typeof nodevaluevalue !== 'string')? 
                Object.keys(nodevaluevalue)[0]
                :
                removeWhiteSpaceAndToLowerCase(nodevaluevalue)
            ),
            i = isParentOrItemFoundInNodeAndWhere(node, key).pos
          ;
          Object.values(sankeytree[key].parentandchildweightinparent)
            .forEach(parent => {
              let j = isParentOrItemFoundInNodeAndWhere(node, parent.name).pos;
              if(i <= j) {
                for(let k=i; k<=j; k++) {
                  totalperlevel[k]+=parent.weight;
                }
              }
            })
          ;
          totalperlevel[parseInt(nodekey)]+=(
            (sankeytree[key].outputweight>=sankeytree[key].inputweight)? 
              sankeytree[key].outputweight 
              :
              sankeytree[key].inputweight
          );
        })
      ;
    })
  ;
  return totalperlevel;
}

function getIndividualNodeWeightsPerLevel(sankeytree: SankeyTreeType, node: NodeType) {
  let nodeweights: number[][] = [];
  from(Object.entries(node))
    .forEach(level => {
      from(level[1])
        .forEach(itemorparent => {
          let key = (typeof itemorparent === 'string')? removeWhiteSpaceAndToLowerCase(itemorparent) : Object.keys(itemorparent)[0];
          if(nodeweights[parseInt(level[0])]) {
            nodeweights[parseInt(level[0])].push(
              (
                (sankeytree[key].outputweight >= sankeytree[key].inputweight)? sankeytree[key].outputweight : sankeytree[key].inputweight
              )
            );
          }
          else {
            nodeweights[parseInt(level[0])] = [
              (
                (sankeytree[key].outputweight >= sankeytree[key].inputweight)? sankeytree[key].outputweight : sankeytree[key].inputweight
              )
            ]
          }
        })
      ;
    })
  ;
  return nodeweights;
}

function getTotalWeightsAndIndividualNodeWeightsPerLevel(sankeytree: SankeyTreeType, node: NodeType) {
  return {
    totalperlevel: getTotalWeightsPerLevel(sankeytree, node), 
    nodeweights: getIndividualNodeWeightsPerLevel(sankeytree, node)
  };
}

function calculateTotalOutputWeightOfNodesInEachLevel(sankeytree: SankeyTreeType, node: NodeType) {
  let 
    newsankeytree = JSON.parse(JSON.stringify(sankeytree)) as SankeyTreeType
  ;
  from(Object.values(node))
    .forEach(level => {
      from(level)
        .forEach(itemorparent => {
          let 
            key = (typeof itemorparent === 'string')? removeWhiteSpaceAndToLowerCase(itemorparent) : Object.keys(itemorparent)[0],
            seed = 0
          ;
          from(Object.values(newsankeytree))
            .pipe(
              mergeMap(parents => Object.values(parents.parentandchildweightinparent))
            )
            .pipe(
              map(parent => {
                return {name: removeWhiteSpaceAndToLowerCase(parent.name), weight: parent.weight};
              }),
              filter(parent => parent.name === key),
              reduce((acc, one) => acc + one.weight, seed)
            )
            .subscribe(
              outputweight => newsankeytree[key].outputweight = outputweight
            )
          ;
        })
      ;
    })
  ;
  return newsankeytree;
}

function getChartAreaDimension(chartarea: Ref<HTMLDivElement | undefined>) {
  return {
    width: chartarea.value?.clientWidth,
    height: chartarea.value?.clientHeight
  };
}

function getMaxTotalWeight(totalperlevel: number[]) {
  let maxnum = 0;
  from(totalperlevel)
    .pipe(
      max()
    )
    .subscribe(m => maxnum = m)
  ;
  return maxnum;
}

function findLevelWithMaxNode(node: NodeType) {
  let maxnodeindex = 0, maxlength = Object.values(node)[0].length, i = 0;
  from(Object.values(node))
    .forEach(level => {
      if(i > 0) {
        if(maxlength <= level.length) {
          maxlength = level.length;
          maxnodeindex = i;
        }
      }
      i++;
    })
  ;
  return maxnodeindex;
}

function getWeightToHeightUnit(gap: number, height: number, padding: PaddingType, maxnodeindex: number, totalperlevel: number[], nodeweights: number[][]) {
  return {
    weight: nodeweights[maxnodeindex][0], 
    height: (
      nodeweights[maxnodeindex][0] / totalperlevel[maxnodeindex]
    ) * (
      (1 - gap) * (
        (
          totalperlevel[maxnodeindex] / getMaxTotalWeight(totalperlevel)
        ) * (
          height - (padding.top + padding.bottom)
        )
      )
    )
  };
}

function getNodeHeightsWeightToHeightUnitAndTotalPerLevel(gap: number, height: number, padding: PaddingType, sankeytree: SankeyTreeType, node: NodeType) {
  let 
    maxnodeindex = findLevelWithMaxNode(node),
    {totalperlevel, nodeweights} = getTotalWeightsAndIndividualNodeWeightsPerLevel(
      sankeytree,
      node
    ),
    unit = getWeightToHeightUnit(gap, height, padding, maxnodeindex, totalperlevel, nodeweights)
  ;
  return {
    unit,
    nodeheights: convertNodeWeightsToHeights(nodeweights, unit),
    totalperlevel
  };
}

function convertNodeWeightsToHeights(nodeweights: number[][], unit: {weight: number; height: number}) {
  let nodeheights = JSON.parse(JSON.stringify(nodeweights)) as number[][];
  Object.entries(nodeheights)
    .forEach(level => {
      level[1].forEach((weight, i) => {
        nodeheights[parseInt(level[0])][i] = (nodeheights[parseInt(level[0])][i] * unit.height) / unit.weight;
      });
    })
  ;
  return nodeheights;
}

function checkItemOrParentHasCircularNode(key: string, node: NodeType, sankeytree: SankeyTreeType) {
  let 
    circularnodeexists = false, 
    i = isParentOrItemFoundInNodeAndWhere(node, key).pos
  ;
  Object.values(sankeytree[key].parentandchildweightinparent)
    .forEach(parent => {
      let j = isParentOrItemFoundInNodeAndWhere(node, parent.name).pos;
      if(i <= j) {
        circularnodeexists = true;
        return;
      }
    })
  ;
  return circularnodeexists;
}

function checkNodeLevelHaveCircularNode(index: number, node: NodeType, sankeytree: SankeyTreeType) {
  let circularnodeexists = false;
  node[index].forEach(item => {
    let 
      key = (typeof item !== 'string')? Object.keys(item)[0] : removeWhiteSpaceAndToLowerCase(item)
    ;
    circularnodeexists = checkItemOrParentHasCircularNode(key, node, sankeytree);
    if(circularnodeexists) {
      return;
    }
  });
  return circularnodeexists;
}

function checkLevelZeroAndEndLevelHaveCircularNode(node: NodeType, sankeytree: SankeyTreeType) {
  return {
    levelzerohavecircularnode: checkNodeLevelHaveCircularNode(0, node, sankeytree), 
    endlevelhavecircularnode: checkNodeLevelHaveCircularNode((Object.keys(node).length - 1), node, sankeytree)
  };
}

function calculateHorizonalSpace(nodebarwidth: number, width: number, padding: PaddingType, sankeytree: SankeyTreeType, node: NodeType) {
  let 
    quotient = (
      width - (padding.left + padding.right) - nodebarwidth * Object.keys(node).length
    ),
    { levelzerohavecircularnode, endlevelhavecircularnode } = checkLevelZeroAndEndLevelHaveCircularNode(node, sankeytree),
    horizontalspace = {beforelevelzero: 0, inbetweennodes: 0}
  ;
  if(levelzerohavecircularnode && endlevelhavecircularnode) {
    let temp = quotient / Object.keys(node).length;
    horizontalspace = {
      beforelevelzero: temp / 8,
      inbetweennodes: temp + ((5 * temp) / 4 * (Object.keys(node).length - 1))
    };
  }
  else {
    if(!levelzerohavecircularnode && !endlevelhavecircularnode) {
      let temp = quotient / (Object.keys(node).length - 1);
      horizontalspace = {
        beforelevelzero: 0,
        inbetweennodes: temp
      };
    }
    else {
      let temp = quotient / Object.keys(node).length;
      horizontalspace = {
        beforelevelzero: 0,
        inbetweennodes: temp + ((7 * temp) / 8 * (Object.keys(node).length - 1))
      };
      if(levelzerohavecircularnode) {
        horizontalspace.beforelevelzero = temp / 8;
      }
    }
  }
  return horizontalspace;
}

function getItemOrParentCircularNodeCount(key: string, node: NodeType, sankeytree: SankeyTreeType) {
  let 
    circularnodecount = 0, 
    i = isParentOrItemFoundInNodeAndWhere(node, key).pos
  ;
  Object.values(sankeytree[key].parentandchildweightinparent)
    .forEach(parent => {
      let j = isParentOrItemFoundInNodeAndWhere(node, parent.name).pos;
      if(i <= j) {
        circularnodecount++;
      }
    })
  ;
  return circularnodecount;
}

function getHighestCircularInputAndOutputWeightPerNode(node: NodeType, sankeytree: SankeyTreeType) {
  let 
    input: {[key: string]: number;} = {},
    output: {[key: string]: number;} = {}
  ;
  Object.values(node).forEach(level => {
    level.forEach(item => {
      let
        inputkey = (typeof item !== 'string')? Object.keys(item)[0] : removeWhiteSpaceAndToLowerCase(item), 
        i = isParentOrItemFoundInNodeAndWhere(node, inputkey).pos
      ;
      Object.values(sankeytree[inputkey].parentandchildweightinparent)
        .forEach(parent => {
          let 
            j = isParentOrItemFoundInNodeAndWhere(node, parent.name).pos,
            outputkey = removeWhiteSpaceAndToLowerCase(parent.name)
          ;
          if(i <= j) {
            if(!(inputkey in input)) {
              input = {
                ...input,
                [inputkey]: sankeytree[inputkey].parentandchildweightinparent[outputkey].weight
              }
            }
            else {
              input[inputkey]+=sankeytree[inputkey].parentandchildweightinparent[outputkey].weight;
            }
            if(!(outputkey in output)) {
              output = {
                ...output,
                [outputkey]: sankeytree[inputkey].parentandchildweightinparent[outputkey].weight
              };
            }
            else {
              output[outputkey]+=sankeytree[inputkey].parentandchildweightinparent[outputkey].weight;
            }
          }
        })
      ;
    });
  });
  return {
    input,
    output
  }
}

function getRealNodePlusCircularPathCount(index: number, node: NodeType, sankeytree: SankeyTreeType) {
  let nodecount = node[index].length;
  node[index].forEach(item => {
    let 
      key = (typeof item !== 'string')? Object.keys(item)[0] : removeWhiteSpaceAndToLowerCase(item)
    ;
    nodecount+=getItemOrParentCircularNodeCount(key, node, sankeytree);
  });
  return nodecount;
}

function drawSankeyNodesAndCorrespondingTexts(nodebarwidth: number, gap: number, width: number, height: number, padding: PaddingType, sankeytree: SankeyTreeType, node: NodeType) {
  let 
    { nodeheights, totalperlevel, unit } = getNodeHeightsWeightToHeightUnitAndTotalPerLevel(gap, height, padding, sankeytree, node),
    sankeynodes: {
      [key: number]: {nodestart: {left: number; top: number;}; textstart: {left: number; top: number;}; height: number; text: string}[]
    } = {},
    levelzeroverticalgaponly = (
      gap * (
        (height - (padding.top + padding.bottom)) - ((totalperlevel[0] * unit.height) / unit.weight)
      )
    ) / (getRealNodePlusCircularPathCount(0, node, sankeytree) - 1),
    { beforelevelzero, inbetweennodes } = calculateHorizonalSpace(nodebarwidth, width, padding, sankeytree, node)
  ;
  console.log(totalperlevel);
  console.log(getHighestCircularInputAndOutputWeightPerNode(node, sankeytree));
  /*Object.entries(newnode)
    .forEach(([levelkey, levelvalue]) => {
      let 
        i = parseInt(levelkey),
        left = padding.left + beforelevelzero + (i * (nodebarwidth + inbetweennodes))
      ;
      levelvalue.forEach((itemorparentname, j) => {
        if(i === 0) {
          if(i in sankeynodes) {
            
          }
          else {
            sankeynodes = {
              //[i]: {

              //}
            };
          }
        }
        else {

        }
      });
    })
  ;
  */
}

function drawSankeyPaths() {

}

export function drawSankeyChart(nodebarwidth: number = 20, gap: number, padding: PaddingType, datatable: SankeyDataType, chartarea: Ref<HTMLDivElement | undefined>) {
  let 
    sankeytree = createSankeyTree(datatable), 
    node = aggregateNodesIntoRespectiveLevels(sankeytree),
    {width, height} = getChartAreaDimension(chartarea)
  ;
  sankeytree = calculateTotalOutputWeightOfNodesInEachLevel(sankeytree, node);

  console.log("=======================================");
  console.log(node);
  console.log("=======================================");
  console.log(sankeytree);
  console.log("=======================================");

  drawSankeyNodesAndCorrespondingTexts(nodebarwidth, gap, (width as number), (height as number), padding, sankeytree, node);

  /*return {
    nodes: drawSankeyNodes(),
    paths: drawSankeyPaths(),
    nodestext: drawSankeyNodesText()
  };*/
}