let iscrumBoxIconcon = `<svg width="48" height="48" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="36" height="36" rx="4" fill="#D9008F"/><path d="M18 29V18L28 12V23L18 29Z" stroke="white" stroke-width="2" stroke-linejoin="round"/><path d="M18 29V18L8 12V23L18 29Z" stroke="white" stroke-width="2" stroke-linejoin="round"/><path d="M28 12L18 18L8 12L18 6L28 12Z" stroke="white" stroke-width="2" stroke-linejoin="round"/></svg>`;
let pluginBuilderIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" fill="white"/><rect x="2" y="2" width="20" height="20" rx="4" fill="#4262FF"/><path d="M3 21L21 3" stroke="white" stroke-width="2"/><path d="M8.5 5.5L6 8L8.5 10.5" stroke="white" stroke-width="2" stroke-linecap="round"/><path d="M15.5 13.5L18 16L15.5 18.5" stroke="white" stroke-width="2" stroke-linecap="round"/></svg>`;

miro.onReady(() => {
  miro.initialize({
    extensionPoints: {
      bottomBar: {
        title: "plugin builder",
        svgIcon: pluginBuilderIcon,
        onClick: async () => {
          miro.board.ui.openLeftSidebar("plugin-setup.html", {
            title: "Plugin setup",
          });
        },
      },
      toolbar: {
        title: "Scrum box",
        toolbarSvgIcon: iscrumBoxIconcon,
        librarySvgIcon: iscrumBoxIconcon,
        onClick: async () => {
          miro.board.ui.openLeftSidebar("scrum-box.html", {
            title: "Scrum box",
          });
        },
      },
    },
  });
});
