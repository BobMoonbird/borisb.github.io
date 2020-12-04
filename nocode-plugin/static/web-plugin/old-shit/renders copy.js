function renderCatalog(data) {
  const catalog = document.createElement("div");
  const catalogImage = document.createElement("div");
  const catalogName = document.createElement("input");
  const items = document.createElement("div");

  catalog.appendChild(catalogImage);
  catalog.appendChild(catalogName);
  catalog.appendChild(items);

  data.items.forEach((i) => items.appendChild(renderItem(i)));

  catalogName.value = data.name || "";
  catalogName.class = "miro-input--primary miro-input--small";

  return catalog;
}

function renderItem(data) {
  const item = document.createElement("div");
  const itemImage = document.createElement("div");
  const itemCloseButton = document.createElement("div");
  return `<div></div>`;
}

function renderPlugin(data) {
  const plugin = document.createElement("div");
  const pluginImage = document.createElement("div");
  pluginImage.className = "plugin-image-container";
  pluginImage.innerHTML = `
        <label for="file-input">
            <img class="plugin-image" src="./icon/assert.svg"/>
        </label>

        <input id="file-input" class="hidden" type="file"/>
   `;
  const plugingName = document.createElement("input");
  plugin.appendChild(pluginImage);
  plugin.appendChild(plugingName);

  plugingName.onchange = (t) => {
    data.name = t.target.value;
  };

  plugingName.class = "miro-input--primary miro-input--small";
  plugingName.value = data.name;
  return plugin;
}
