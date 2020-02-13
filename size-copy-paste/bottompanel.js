miro.onReady(async () => {
  // subscribe on user selected widgets
  //miro.addListener(miro.enums.event.SELECTION_UPDATED, getWidget)
  console.log(234);
  getWidget()
  
  await miro.addListener('SELECTION_UPDATED', (e) => {  { getWidget() } }
})

async function getWidget() {
  // Get selected widgets
  let widgets = await miro.board.selection.get()
      console.log(widgets);
  
  var widgetWidth = document.getElementById('widget-width')
  var widgetHeight = document.getElementById('widget-height')
  console.log(widgetWidth, widgetHeight)
  
  widgetWidth.value = widgets[0].bounds.width
  widgetHeight.value = widgets[0].bounds.height
  console.log(widgetWidth.value, widgetHeight.value)

async function updateWidget(width, height) {
  
  /*let widgets = await miro.board.selection.get()
  miro.board.widgets.update({id,width:width, height: height})
  */
}

