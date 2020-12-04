let plugins = [];

const PLUGIN = {
  iframe: "iframe",
  iconSet: "icon-set",
};

/* plugin definition:
{
    id: number
    name: string
    iconUrl: string
    iframeCode: string
}
*/

function registerPlugin() {
  const id = new Date().getMilliseconds();
  const plugin = {
    id,
    name: "A new assert",
    iconUrl: "./icon/assert.svg",
    currentCatalog: 0,
    catalogs: [
      {
        name: "New catalog",
        items: [],
        iconUrl: "./icon/assert.svg",
      },
    ],
  };
  plugins.push(plugin);
  return plugin;
}

function getPluginById(id) {
  return plugins.find((item) => item.id === id);
}

function saveIFramePlugin(iframeCode) {
  const plugin = getPluginById(PLUGIN.iframe);
  plugin.iframeCode = iframeCode;
  savePlugin(PLUGIN.iframe, iframeCode);
}
