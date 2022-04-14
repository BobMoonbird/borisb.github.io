/**
 * @typedef {{ xTopLeft: number, yTopLeft: number, width: number, height: number }} Area
 * @typedef {{ width: number, height: number, x: number, y: number, sync: () => void, }} BoardObject
 * @typedef {{ items: BoardObject[] }} PackOutput
 * @typedef {{items: BoardObject[], area: Area}} PackInput
 */

// @todo: allow config
const MARGIN_IN_PIXELS = 5;

/**
 * @param {PackInput} args
 * @return {Promise<PackOutput>}
 */
async function pack({ items, area }) {
  const minX = area.xTopLeft + MARGIN_IN_PIXELS;
  const maxX = area.width + area.xTopLeft - MARGIN_IN_PIXELS;
  const horizontalMidpoint = area.width / 2 + area.xTopLeft;
  let currentY = area.yTopLeft + MARGIN_IN_PIXELS;
  let currentX = horizontalMidpoint;

  // for alternate tiling
  let furthestLeft = horizontalMidpoint;
  let furthestRight = horizontalMidpoint;
  // tracks direction we tile
  let isTilingRight = true;

  // used to center the first item
  //@todo do better than this
  let firstItem = true

  for (let item of items) {
    if (firstItem) {
      firstItem = false
      currentX = furthestLeft = furthestRight = horizontalMidpoint - item.width / 2;
    }

    if (isTilingRight) {
      let endOfWidth = currentX + item.width + MARGIN_IN_PIXELS;

      // move to a new row
      // @todo should use maximum y in the row
      // also to note: we can potentially overflow the Y area
      if (endOfWidth > maxX) {
        currentY = currentY + MARGIN_IN_PIXELS + item.height;
        currentX = furthestLeft = horizontalMidpoint - item.width / 2;
        endOfWidth = furthestRight = currentX + item.width + MARGIN_IN_PIXELS;
      }

      console.log({ isTilingRight, currentX, currentY })
      item.x = currentX;
      item.y = currentY;

      isTilingRight = !isTilingRight
      furthestRight = endOfWidth
      currentX = furthestLeft
    } else {
      let beginningOfWidth = currentX - item.width - MARGIN_IN_PIXELS;

      if (beginningOfWidth <= minX) {
        currentY = currentY + MARGIN_IN_PIXELS + item.height;
        currentX = furthestLeft = horizontalMidpoint - item.width / 2;
        furthestRight = currentX + item.width + MARGIN_IN_PIXELS;
        beginningOfWidth = currentX - item.width - MARGIN_IN_PIXELS;
      } else {
        currentX = beginningOfWidth
      }

      console.log({ isTilingRight, currentX, currentY })
      item.x = currentX;
      item.y = currentY;

      isTilingRight = !isTilingRight
      furthestLeft = currentX
      currentX = furthestRight
    }

    item.sync()

    await new Promise(resolve => setTimeout(resolve, 200))
  }

  return { items }
}

miro.board.get({ type: "sticky_note" }).then(items => {
  pack({
    items,
    area: {
      xTopLeft: 0,
      yTopLeft: 0,
      width: 1000,
      height: 1000
    }
  })
})

const bulkCreate = async (items, objectType) => {
  createdObjects = []
  for (i = 0; i < items.length; i++) {
    if (objectType === 'sticky_note') {
      createdObjects.push(miro.board.createStickyNote({ content: items.content, x: items.x, y: items.y, width: items.width, height: items.height }))
    } else if (objectType === 'text') {
      createdObjects.push(miro.board.createText({ content: items.content, x: items.x, y: items.y, width: items.width, height: items.height }))
    } else if (objectType === 'shape') {
      createdObjects.push(miro.board.createShape({ content: items.content, x: items.x, y: items.y, width: items.width, height: items.height }))
    } else {
      return "Error: Object Type not supported"
    }

  }
  return createdObjects
}
