const selectedTree = async (selectionv1, selectionv2, referenceType) => {
    const referenceTypeWidgets = selectionv1.filter(widget => widget.type === referenceType)
    const connectorWidgets = selectionv1.filter(widget => widget.type === 'LINE')

    let firstelement = referenceTypeWidgets.find(widget => {
        return connectorWidgets.every(connectorWidget => connectorWidget.endWidgetId != widget.id)
    })


    const findChildren = (widget) => {
        const widgetChildrenIds = connectorWidgets
            .filter(connectorWidget => connectorWidget.startWidgetId === widget.id)
            .map(connectorWidget => connectorWidget.endWidgetId)
        const widgetChildren = referenceTypeWidgets
            .filter(widget => widgetChildrenIds
                .includes(widget.id))

        return widgetChildren
    }

    const buildWidgetTree = (widget) => {
        const widgetChildren = findChildren(widget)
        const widgetTree = {
            id: widget.id, text: widget.text, children: widgetChildren.map(buildWidgetTree)
        }

        return widgetTree
    }

    return buildWidgetTree(firstelement)
}