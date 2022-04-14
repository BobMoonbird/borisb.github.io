import type * as types from "@mirohq/websdk-types";

type BBox = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type CellBounds = {
  cx1: number;
  cy1: number;
  cx2: number;
  cy2: number;
};

const getCell = (value: number, cellSize: number) => {
  let cell = Math.ceil(value / cellSize)
  if (value < 0) {
    cell -= 1
  }
  return cell
}

// Spatial hash data structure.
// See also: http://www.playchilla.com/as3-spatial-hash
class SpatialHash<T extends BBox> {
  cellSize: number;

  _hash: Record<string, T[]> = {};

  constructor({ cellSize }: { cellSize: number }) {
    this.cellSize = cellSize;
  }

  private _getCell(value: number): number {
    let cell = Math.ceil(value / this.cellSize);
    if (value < 0) {
      cell -= 1
    }
    return cell;
  }

  private _getCellBounds(area: BBox): CellBounds {
    const cx1 = getCell(area.x - area.width / 2, this.cellSize);
    const cy1 = getCell(area.y - area.height / 2, this.cellSize);

    // TODO do we need to round cx2 and cy2 up?
    const cx2 = getCell(area.x + area.width / 2, this.cellSize);
    const cy2 = getCell(area.y + area.height / 2, this.cellSize);

    return { cx1, cy1, cx2, cy2 };
  }

  add(item: T): void {
    const { cx1, cy1, cx2, cy2 } = this._getCellBounds(item);
    for (let cy = cy1; cy <= cy2; ++cy) {
      for (let cx = cx1; cx <= cx2; ++cx) {
        this._addToBucket(item, cx, cy);
      }
    }
  }

  /*
  find(area: BBox): T[] {
    const found = new Set<T>();

    const { cx1, cy1, cx2, cy2 } = this._getCellBounds(area);
    for (let cy = cy1; cy <= cy2; ++cy) {
      for (let cx = cx1; cx <= cx2; ++cx) {
        const key = this._getKey(cx, cy);
        const bucket = this._hash[key];
        if (!bucket || !bucket.length) {
          continue;
        }
        bucket.forEach((item) => found.add(item));
      }
    }

    return Array.from(found);
  }
  */

  findEmpty(area: BBox):  T[] {
    const found = new Set<T>();

    const {x, y, width, height} = area;

    const cx1 = x
    const cy1 = y
    const cx2 = x + width
    const cy2 = y + height

    for (let cy = cy1; cy <= cy2; ++cy) {
      for (let cx = cx1; cx <= cx2; ++cx) {
        const key = this._getKey(cx, cy);
        const bucket = this._hash[key];
        if (!bucket || !bucket.length) {
          continue;
        }
        bucket.forEach((item) => found.add(item));
      }
    }

    return Array.from(found);
    
  }

  private _addToBucket(item: T, cx: number, cy: number): void {
    const key = this._getKey(cx, cy);
    let bucket = this._hash[key];
    if (bucket == null) {
      bucket = [];
      this._hash[key] = bucket;
    }
    bucket.push(item);
  }

  private _getKey(cx: number, cy: number): string {
    return `${cx}:${cy}`;
  }
}

function detectEmptyAreas<T extends BBox>(params: {
  spatial: SpatialHash<T>;
  viewport: types.Rect;
  size: { width: number; height: number };
  cellSize: number;
  limit: number;
}): BBox[] {
  const {
    spatial,
    viewport,
    cellSize,
    size: { width, height },
  } = params;
  const areas = [];

  // x = -32
  // cell size: 5
  // answer: -7

  // ceil(-32 / 5) = CEIL(-6...) = -6 so add 1

  const cx1 = getCell(viewport.x, cellSize);
  const cy1 = getCell(viewport.y,  cellSize);

  const cx2 = getCell(viewport.x + viewport.width,  cellSize);
  const cy2 = getCell(viewport.y + viewport.height,  cellSize);

console.log({cx1, cy1, cx2, cy2})

  for (let x = cx1; x < cx2; x++) {
    for (let y = cy1; y < cy2; y++) {
      const items = spatial.findEmpty({
        x,
        y,
        width: width / cellSize,
        height:height / cellSize,
      });

      // Skip filled areas
      // TODO: look for partially filled areas
      // to avoid skipping too many cells
      if (items.length) {
        continue;
      }

      areas.push({ x: x * cellSize + width / 2, y: y * cellSize + height / 2, width, height });
    }
  }

  return areas;
}

/*
function detectEmptyAreas<T extends BBox>(params: {
  spatial: SpatialHash<T>;
  viewport: types.Rect;
  size: { width: number; height: number };
  cellSize: number;
  limit: number;
}): BBox[] {
  const {
    spatial,
    viewport,
    cellSize,
    size: { width, height },
  } = params;
  const areas = [];

  // x = -32
  // cell size: 5
  // answer: -7

  // ceil(-32 / 5) = CEIL(6...) = 7

  const cx1 = viewport.x;
  const cy1 = viewport.y;

  const cx2 = viewport.x + viewport.width;
  const cy2 = viewport.y + viewport.height;

  const xStep = cellSize;
  const yStep = cellSize;

  for (let x = cx1; x < cx2; x += xStep) {
    for (let y = cy1; y < cy2; y += yStep) {
      const items = spatial.find({
        x,
        y,
        width,
        height,
      });

      // Skip filled areas
      // TODO: look for partially filled areas
      // to avoid skipping too many cells
      if (items.length) {
        continue;
      }

      areas.push({ x: x + width / 2, y: y + height / 2, width, height });
    }
  }

  return areas;
}
*/

function pickBestArea(areas: BBox[]): BBox | undefined {
  return undefined;
}

async function findEmptyArea(params: {
  width: number;
  height: number;
}): Promise<BBox | undefined> {
  const cellSize = 256;

  // Clear all rectangles
  await Promise.all(
    (
      await miro.board.get({ type: "shape" })
    )
      .filter((s) => s.shape !== "star")
      .map((s) => {
        return miro.board.remove(s);
      })
  );

  // Fetch all board items.
  const items = await miro.board.get({ type: "sticky_note" });

  // Build spatial hash.
  const spatial = new SpatialHash({
    cellSize,
  });

  items.forEach((item) => {
    if (!("width" in item)) {
      return;
    }
    spatial.add(item);
  });

  const viewport = await miro.board.viewport.get();
  console.log({ viewport, spatial, items });

  // Detect empty areas using a spatial hash.
  const areas = detectEmptyAreas({
    spatial,
    viewport,
    size: params,
    cellSize,
    limit: 10,
  });
  console.log({ areas });

  await Promise.all(
    areas.map((area) => {
      return miro.board.createShape({ ...area, content: "area" });
    })
  );

  // Pick the best area.
  return pickBestArea(areas);
}

async function main() {
  const empty = await findEmptyArea({ width: 255, height: 255 });
  console.log({ empty });
}

/*
async function addSticky() {
  const shape = await miro.board.createShape({
    content: 'This is a very yellow star shape.',
    shape: 'star',
    style: {
      fillColor: '#FEFF45',
    },
    x: 0,
    y: 0,
    width: 280,
    height: 280,
  });

  shape.rotation = 45
  shape.sync()


  // grab viewport size

  await miro.board.viewport.zoomTo(shape);
}

const items = miro.board.get();

console.log({items});

addSticky();
*/

miro.board.ui.on("icon:click", main);
