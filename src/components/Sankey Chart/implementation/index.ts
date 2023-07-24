import type { FoundAndPosType, NodeType, SankeyDataType, SankeyTreeParentType, SankeyTreeType, ToBeStoredObjectType } from "./type/";
import { from, filter, max, map, take, mergeMap, reduce } from 'rxjs';
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
        .subscribe(found => {
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

function isItemIncludeParent(itemloop: string[], parentname: string) {
  let itemincludeparent = false;
  from(itemloop)
    .pipe(
      map(item => removeWhiteSpaceAndToLowerCase(item)),
      filter(item => item === parentname),
      take(1)
    )
    .subscribe(
      item => itemincludeparent = true
    )
  return itemincludeparent;
}

function isParentInNodeAt(highestposofparentsinnode: number, parentname: string, node: NodeType) {
  let parentinnodeatindex = false;
  from(node[highestposofparentsinnode])
    .pipe(
      map(parentoritemname => (typeof parentoritemname === 'string')? removeWhiteSpaceAndToLowerCase(parentoritemname) : Object.keys(parentoritemname)[0]),
      filter(parentoritemname => parentname === parentoritemname),
      take(1)
    )
    .subscribe(
      parentoritemname => parentinnodeatindex = true
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
            isItemIncludeParent(
              (itemstoredby as ToBeStoredObjectType)[
                Object.keys((itemstoredby as ToBeStoredObjectType))[0]
              ].loop,
              Object.keys((parent as ToBeStoredObjectType))[0]
            )
            &&
            isParentInNodeAt(
              highestposofparentsinnode, 
              Object.keys((parent as ToBeStoredObjectType))[0], 
              node
            )
          )
        ),
      )
      .subscribe(
        parent => itemandparentlooptoeachother = true
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
              moveable => canbemoved = false
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
  return text.toLowerCase().replace(/\s*/g, "");
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
                    parent => {
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
            foundandpos = getAllParentsFoundStatusAndPos(
              item.name,
              node, 
              sankeytree
            ),
            highestposofparentsinnode = getHighestIndexOfTruthfulFounds(
              foundandpos
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
  datatable.forEach((link, i) => {
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
  datatable.forEach((link, i) => {
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

function drawSankeyNodes() {

}

function drawSankeyPaths() {

}

function drawSankeyNodesText() {

}

function getTotalValuePerLevel(sankeytree: SankeyTreeType, node: NodeType) {
  let totalperlevel: number[] = [];
  from(Object.values(node))
    .forEach(level => {
      let seed = 0;
      from(level)
        .pipe(
          map(itemorparent => (typeof itemorparent === 'string')? removeWhiteSpaceAndToLowerCase(itemorparent) : Object.keys(itemorparent)[0]),
          reduce((acc, key) => acc + ((sankeytree[key].outputweight>=sankeytree[key].inputweight)? sankeytree[key].outputweight : sankeytree[key].inputweight), seed)
        )
        .subscribe(sum => totalperlevel.push(sum))
      ;
    })
  ;
  return totalperlevel;
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

export function drawSankeyChart(datatable: SankeyDataType, chartarea: Ref<HTMLDivElement | undefined>) {
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
  console.log(getTotalValuePerLevel(sankeytree, node));

  /*return {
    nodes: drawSankeyNodes(),
    paths: drawSankeyPaths(),
    nodestext: drawSankeyNodesText()
  };*/
}