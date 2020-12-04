function getImage(img) {
  return `<div class="draggable-item image-box">
                          <img src="${img.src}" data-image-url="https://realtimeboard.com/api/awesome-plugins/plugins/rtb_sticker_pack/${img.src}">
              </div>`;
}

function addShapes(container) {
  container.innerHTML += `<div class="shape draggable-item green" data-id="1">Calculator</div>`;
}

function addImages(container) {
  container.innerHTML += data
    .filter((d) => d.type === "image")
    .map((i) => getImage(i))
    .join("");
}

function createImage(canvasX, canvasY, url) {
  return miro.board.widgets.create({
    type: "image",
    url: url,
    x: canvasX,
    y: canvasY,
  });
}

function createShape(canvasX, canvasY, color, text) {
  return miro.board.widgets.create({
    type: "EMBED",
    html: text,
    x: canvasX,
    y: canvasY,
    style: {
      textColor: "#fff",
      backgroundColor: "#" + color,
      borderColor: "transparent",
    },
  });
}

const iframes = [""];

function bootstrap() {
  const container = document.getElementById("container");
  addShapes(container);
  addImages(container);

  let currentImageUrl;
  const imageOptions = {
    draggableItemSelector: "img",
    onClick: async (targetElement) => {
      const url = targetElement.getAttribute("data-image-url");
      const widget = (await createImage(0, 0, url))[0];
      miro.board.viewport.zoomToObject(widget);
    },
    getDraggableItemPreview: (targetElement) => {
      //drag-started
      currentImageUrl = targetElement.getAttribute("data-image-url");
      return {
        width: 100,
        height: 100,
        url: currentImageUrl,
      };
    },
    onDrop: (canvasX, canvasY) => {
      console.log("onDrop 1");
      createImage(canvasX, canvasY, currentImageUrl);
    },
  };
  miro.board.ui.initDraggableItemsContainer(container, imageOptions);

  let currentShapeColor;
  let currentShapeText;
  const shapeOptions = {
    draggableItemSelector: ".shape",
    onClick: async (targetElement) => {
      const color = targetElement.getAttribute("data-id");
      const text = targetElement.innerText;
      const widget = (await createShape(0, 0, color, text))[0];
      miro.board.viewport.zoomToObject(widget);
    },
    getDraggableItemPreview: (targetElement) => {
      currentShapeColor = targetElement.getAttribute("data-color");
      currentShapeText = targetElement.innerText;
      return {
        url: `data:image/svg+xml,%3Csvg width='140' height='140' xmlns='http://www.w3.org/2000/svg'%3E%3Cg%3E%3Crect stroke='null' x='0' y='0' fill='%23${currentShapeColor}' height='140' width='140'/%3E%3C/g%3E%3C/svg%3E`,
      };
    },
    onDrop: (canvasX, canvasY) => {
      console.log("onDrop 2");
      createShape(canvasX, canvasY, currentShapeColor, currentShapeText);
    },
  };
  miro.board.ui.initDraggableItemsContainer(container, shapeOptions);
}

miro.onReady(bootstrap);
