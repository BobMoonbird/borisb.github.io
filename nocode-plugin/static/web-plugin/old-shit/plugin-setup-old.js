const pages = {
  buildPlugin: 0,
  chooseOption: 1,
  iFrame: 2,
  source: 3,
};
const layout = { currentPage: pages.buildPlugin };
const data = {
  currentPluginId: undefined,
};

// UI - start
let pagesElements;
let buildPluginButton;
let ifamePluginButton;
let iframeCodeInput;
let saveIFrameButton;
let saveSourceButton;
let formImages;
// UI - end

function initUI() {
  buildPluginButton = document.getElementById("buildPluginButton");
  ifamePluginButton = document.getElementById("ifamePluginButton");
  iframeCodeInput = document.getElementById("iframeCodeInput");
  saveIFrameButton = document.getElementById("saveIFrameButton");
  sourcePluginButton = document.getElementById("sourcePluginButton");
  saveSourceButton = document.getElementById("saveSourceButton");
  formImages = document.getElementById("formImages");

  buildPluginButton.onclick = () => {
    registerPlugin(PLUGIN.iframe, "");
    changeLayout(pages.chooseOption);
  };

  ifamePluginButton.onclick = () => {
    changeLayout(pages.iFrame);
  };

  saveIFrameButton.onclick = () => {
    saveIFramePlugin(document.getElementById("iframeCodeInput").value);
  };

  sourcePluginButton.onclick = () => {
    changeLayout(pages.source);
  };

  saveSourceButton.onclick = () => {
    const result = "";
    for (const pair of new FormData(formImages)) {
      result += `{src: 'img/${pair[0]}', width: ${1024}, height: ${860}},`;
    }
    debugger;
    savePlugin(PLUGIN.iconSet, result);
    savePluginImages(PLUGIN.iconSet, formImages);
  };

  pagesElements = [];
  for (const property in pages) {
    const value = pages[property];
    pagesElements[value] = document.getElementById(`layout_${value}`);
  }
}

function changeLayout(index) {
  layout.currentPage = index;

  const hideLayout = (h) => {
    pagesElements[h].style.display = "none";
  };

  const showLayout = (h) => {
    pagesElements[h].style.display = "block";
  };

  pagesElements.forEach((item, i) => {
    if (index === i) {
      showLayout(i);
    } else {
      hideLayout(i);
    }
  });
}

function bootstrap() {
  initUI();
}

miro.onReady(bootstrap);
