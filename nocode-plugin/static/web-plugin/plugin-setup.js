const pages = {
  editPlugin: 1,
  first: 0,
  listPlugins: 2,
};
const layout = { currentPage: pages.buildPlugin };
const data = {
  currentPlugin: undefined,
  currentCatalogId: undefined,
};
const folders = [];

// UI - start
let pagesElements;
let saveButton;
let createNewButton;
let catalogs;
let pluginsDiv;
let pluginHeader;
let createCatalogButton;
let pluginContainer;
let pluginIconLabel;
let pluginiconfileinput;
let pluginheaderimage;
let uploadimagesfileinput;
let itemsDiv;
let addnewplugin;
let menuitemcode;
let menuitemedit;
let menuitemopen;
// UI - end

function initUI() {
  saveButton = document.getElementById("saveButton");
  createNewButton = document.getElementById("createNewButton");
  catalogs = document.getElementById("catalogs");
  pluginsDiv = document.getElementById("plugins");
  pluginHeader = document.getElementById("pluginHeader");
  createCatalogButton = document.getElementById("createCatalogButton");
  pluginIconLabel = document.getElementById("pluginIconLabel");
  pluginiconfileinput = document.getElementById("plugin-icon-file-input");
  pluginheaderimage = document.getElementById("plugin-header-image");
  uploadimagesfileinput = document.getElementById("upload-images-file-input");
  itemsDiv = document.getElementById("items");
  addnewplugin = document.getElementById("add-new-plugin");
  menuitemcode = document.getElementById("menu-item-code");
  menuitemedit = document.getElementById("menu-item-edit");
  menuitemopen = document.getElementById("menu-item-open");
  const list = document.getElementsByClassName("plugin-list-item");

  for (rr of list) {
    rr.onclick = () => {
      renderMenu(true);
    };
  }

  menuitemopen.onclick = () => {
    changeLayout(pages.editPlugin);
    renderMenu(false);
  };

  menuitemcode.onclick = () => {
    downloadCode();
    renderMenu(false);
  };

  menuitemedit.onclick = () => {
    changeLayout(pages.editPlugin);
    renderMenu(false);
  };

  pluginiconfileinput.onchange = () => {
    pluginIconLabel.innerHTML = "";
    pluginheaderimage.classList.add("plugin-header-label--with-image");
  };

  uploadimagesfileinput.onchange = () => {
    renderItems(itemsDiv);
  };

  saveButton.onclick = () => {
    changeLayout(pages.listPlugins);
  };

  addnewplugin.onclick = () => {
    changeLayout(pages.editPlugin);
  };

  createNewButton.onclick = () => {
    data.currentPlugin = registerPlugin();

    changeLayout(pages.editPlugin);
  };

  createCatalogButton.onclick = () => {
    const newCatalog = {
      name: "New catalog",
      items: [],
      iconUrl: "./icon/assert.svg",
    };
    catalogs.appendChild(renderCatalog(newCatalog));
  };

  pagesElements = [];
  for (const property in pages) {
    const value = pages[property];
    pagesElements[value] = document.getElementById(`layout_${value}`);
  }
}

//TODO: merge with initUI()
function initUI_1() {
  pasteIframeCodeButton = document.getElementById("pasteIframeCode");
  pasteIframeCodeButton.onclick = () => {
    miro.board.ui
      .openModal("iframe-modal.html", { width: 520, height: 280 })
      .then((result) => {
        if (result && result.shouldAdd) {
          renderIframe(itemsDiv);
        }
      });
  };
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
  initUI_1();
}

miro.onReady(bootstrap);
