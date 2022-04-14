// a helper function to calculate a median
function median(values) {
  if (values.length === 0) throw new Error("No inputs");

  values.sort(function (a, b) {
    return a - b;
  });

  var half = Math.floor(values.length / 2);

  if (values.length % 2)
    return values[half];

  return (values[half - 1] + values[half]) / 2.0;
}


// a function that returns median width and height for a given widget type
// need to path an arroy of widgets, eg selection or all board widgets
const getReferenceDimensions = async (selectionX, referenceType) => {
  let referenceWidth = []
  let referenceHeight = []

  for (let i = 0; i < selectionX.length; i++) {
    if (selectionX[i].type == referenceType) {
      referenceWidth.push(selectionX[i].width)
      referenceHeight.push(selectionX[i].height)
    }
  }

  return { width: median(referenceWidth), height: median(referenceHeight) }


}

// get tree from raw data
// expected input: list of nodes with node.id, node.value and node.parentId fields
const selectedTree = async (nodes) => {
  let firstelement = nodes.find(node => {
    return nodes.every(node => node.parentId === '')
  })

  const findChildren = (parentNode) => {
    const nodeChildrenIds = nodes
      .filter(node => node.parentId === parentNode.id)
      .map(node => node.id)
    const nodeChildren = nodes
      .filter(node => nodeChildrenIds
        .includes(node.id))

    return nodeChildren
  }

  const buildNodeTree = (node) => {
    const nodeChildren = findChildren(node)
    const nodeTree = {
      id: node.id, text: node.value, children: nodeChildren.map(buildNodeTree)
    }

    return nodeTree
  }

  return buildNodeTree(firstelement)
}

//convert tree to array in order to caluclate number of groups and number of widgets per group
// think about it as rows of nodes
// expect tree from selectedTree as input
const treeToArray = async (trees) => {
  const finalArray = []
  do {
    finalArray.push(trees)
    trees = trees.map(tree => tree.children)
      .flat()
  }
  while (trees.length)
  return finalArray
}

//calculate dimensions for required area of widgets
const getAreaSize = async (finalArray, medianDimansions) => {
  const maxArrayLength = Math.max(...finalArray.map(array => array.length))

  const maxDimension = Math.max(medianDimansions.width, medianDimansions.height)
  const margin = maxDimension * 0.1
  return [finalArray.length * (medianDimansions.width + margin), maxArrayLength * (medianDimansions.height + margin)]

}