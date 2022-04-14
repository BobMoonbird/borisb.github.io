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

const getAreaSize = async (finalArray, medianDimansions) => {
    const maxArrayLength = Math.max(...finalArray.map(array => array.length))

    const maxDimension = Math.max(medianDimansions.width, medianDimansions.height)
    const margin = maxDimension * 0.1
    return [finalArray.length * (medianDimansions.width + margin), maxArrayLength * (medianDimansions.height + margin)]

}