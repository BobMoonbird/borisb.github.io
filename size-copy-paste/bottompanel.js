miro.onReady(async () => {
  // subscribe on user selected widgets
  //miro.addListener(miro.enums.event.SELECTION_UPDATED, getWidget)

  getWidget()
  
  await miro.addListener('WIDGETS_TRANSFORMATION_UPDATED', (e) => {  { getWidget(); console.log(321) } })
  await miro.addListener('SELECTION_UPDATED', (e) => {  { getWidget(); console.log(123) } })
})

async function getWidget() {
  // Get selected widgets
  let widgets = await miro.board.selection.get()

  if (!widgets || !widgets.length){
    return;
  }
  
  var widgetWidth = document .getElementById('widget-width')
  var widgetHeight = document.getElementById('widget-height')

  
  widgetWidth.value = widgets[0].bounds.width
  widgetHeight.value = widgets[0].bounds.height

}

async function updateWidget() {
  
  let widget = await miro.board.selection.get()

  
  var newWidth = parseInt(document.getElementById("widget-width").value)
  var newHeight = parseInt(document.getElementById("widget-height").value)

  
  miro.board.widgets.update({id:widget[0].id, width:newWidth, height:newHeight})
 
}
