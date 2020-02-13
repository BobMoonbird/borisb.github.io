miro.onReady(() => {
  // subscribe on user selected widgets
  miro.addListener(miro.enums.event.SELECTION_UPDATED, getWidget)
  getWidget()
})

async function getWidget() {
  // Get selected widgets
  let widgets = await miro.board.selection.get()
  
  var widgetWidth = document.getElementById('widget-width')
  var widgetHeight = document.getElementById('widget-height')

  widgetWidth.value = widgets[0].bounds.width
  widgetHeight.value = widgets[0].bounds.height

  // Get first widget from selected widgets
  let text = widgets[0].text
}

async function updateWidget(width, height) {
  
  let widgets = await miro.board.selection.get()
  miro.board.widgets.update({id,width:width, height: height})
  
}

