const images = [
  {
    src: "start-stop-continue.png"
  },
  {
    src: "mad-sad-glad.png"
  },
  {
    src: "sailboat.png"
  },
  {
    src: "4ls.png"
  },
  {
    src: "quick-retro.png"
  },
];

function getImage(img) {
  return `<div class="item">
						<img class="item-image" src="icon/${img.src}" data-image-url="https://alekseydemshin.github.io/img/${img.src}">
			</div>`;
}

function addImages(container) {
  container.innerHTML += images.map((i) => getImage(i)).join("");
}

function addEmbeds(container) {
  container.innerHTML += `<div class="item">
    <img class="item-iframe"
      src="icon/ifr1.png" 
      data-embed-html='<iframe src="https://wheeldecide.com/e.php?c1=Start%2C+Stop%2C+Continue&c2=Glad%2C+Sad%2C+Mad&c3=Sailboat&c4=The+4+L%E2%80%99s&c5=Quick+Retrospective&col=pastel&t=Retrospective+Types&time=5" width="500" height="500" scrolling="no" frameborder="0"></iframe>'
    >
    </div>`;

    container.innerHTML += `<div class="item">
    <img class="item-iframe"
      src="icon/ifr2.png" 
      data-embed-html='<iframe src="https://codesandbox.io/embed/xjk3xqnprw?fontsize=14&hidenavigation=1&theme=dark"

      style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     
          title="Animated 3D Dice Roll "
     
          allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     
          sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
     
        ></iframe>'
    >
    </div>`;

    container.innerHTML += `<div class="item">
    <img class="item-iframe"
      src="icon/vid1.png" 
      data-embed-html='<iframe src="https://www.youtube.com/watch?v=ML_m3n1gBFM" style="border:0px #ffffff none;" name="myiFrame" scrolling="no" frameborder="1" marginheight="0px" marginwidth="0px" height="400px" width="600px" allowfullscreen></iframe>'
    >
    </div>`;

    container.innerHTML += `<div class="item">
    <img class="item-iframe"
      src="icon/vid2.png" 
      data-embed-html='<iframe src="https://www.youtube.com/watch?v=MiaZhJyYUj0" style="border:0px #ffffff none;" name="myiFrame" scrolling="no" frameborder="1" marginheight="0px" marginwidth="0px" height="400px" width="600px" allowfullscreen></iframe>'
    >
    </div>`;

    container.innerHTML += `<div class="item">
    <img class="item-iframe"
      src="icon/vid3.png" 
      data-embed-html='<iframe src="https://www.youtube.com/watch?v=-hnD43Gs_ys" style="border:0px #ffffff none;" name="myiFrame" scrolling="no" frameborder="1" marginheight="0px" marginwidth="0px" height="400px" width="600px" allowfullscreen></iframe>'
    >
    </div>`;

    container.innerHTML += `<div class="item">
    <img class="item-iframe"
      src="icon/mus1.png" 
      data-embed-html='<iframe src="https://open.spotify.com/track/0F0MA0ns8oXwGw66B2BSXm?si=KTEm6_4yTGizcSTnGYRd7Q" style="border:0px #ffffff none;" name="myiFrame" scrolling="no" frameborder="1" marginheight="0px" marginwidth="0px" height="400px" width="600px" allowfullscreen></iframe>'
    >
    </div>`;

    container.innerHTML += `<div class="item">
    <img class="item-iframe"
      src="icon/mus2.png"
      data-embed-html='<iframe src="https://open.spotify.com/embed/track/4bqhQHdesbYzFJZIkubGkx" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>'
    >
    </div>`;
}

function createImage(canvasX, canvasY, url) {
  return miro.board.widgets.create({
    type: "image",
    url: url,
    x: canvasX,
    y: canvasY,
  });
}

function createEmbed(screenX, screenY, html) {
  return miro.board.widgets.create({
    type: "embed",
    html: html,
    x: screenX,
    y: screenY,
  });
}

function bootstrap() {
  const container = document.getElementById("items");
  addImages(container);
  addEmbeds(container)

  let currentImageUrl;
  const imageOptions = {
    draggableItemSelector: ".item-image",
    getDraggableItemPreview: (targetElement) => {
      currentImageUrl = targetElement.getAttribute("data-image-url");
      return {
        width: 100,
        height: 100,
        url: currentImageUrl,
      };
    },
    onDrop: (canvasX, canvasY) => {
      createImage(canvasX, canvasY, currentImageUrl);
    },
  };
  miro.board.ui.initDraggableItemsContainer(container, imageOptions);

  let currentEmbedHtml
  const embedOptions = {
    draggableItemSelector: '.item-iframe',
    getDraggableItemPreview: (targetElement) => {
      currentEmbedHtml = targetElement.getAttribute('data-embed-html')
      return {
        url: `data:image/svg+xml,%3Csvg width='140' height='140' xmlns='http://www.w3.org/2000/svg'%3E%3Cg%3E%3Crect stroke='null' x='0' y='0' fill='%2300000' height='140' width='140'/%3E%3C/g%3E%3C/svg%3E`,
      }
    },
    onDrop: (canvasX, canvasY) => {
      //embed widget creation requre display XY rather than canvas XY
      miro.board.viewport.get().then(function (viewport) {
        miro.board.viewport.getScale().then(function (scale) {
          createEmbed((canvasX - viewport.x) * scale, (canvasY - viewport.y) * scale, currentEmbedHtml)
        });
      });
    },
  }
  miro.board.ui.initDraggableItemsContainer(container, embedOptions)
}

miro.onReady(bootstrap);
