const currentSizes = {
    width: null,
    height: null,
    isActive: false,
    yCoord: null,
    xCoord: null,
};

function updateCurrentSizes({width, height, yCoord}) {
    currentSizes.width = width;
    currentSizes.height = height;
    currentSizes.yCoord = yCoord;
    currentSizes.isActive = true;
}

const sizedTypes = ['SHAPE', 'STICKER', 'IMAGE']

function isResizible(widgets) {

    const isSame = widgets.reduce((type, widget, index) => {
        if (index === 0) {
            return true
        }
        return type * (widget.type === widgets[index - 1].type)
    }, true);


    if (!isSame) {
        return false
    }

    const isCanResize = widgets.every(widget => sizedTypes.includes(widget.type));

    if (!isCanResize) {
        return false
    }

    return true
}

miro.onReady(async () => {
    miro.initialize({
            extensionPoints: {
                getWidgetMenuItems: async (widgets) => {

                    const authorized = await miro.isAuthorized();
                    if (!authorized) {
                        return
                    }

                    const props = [];
                    if (isResizible(widgets) && widgets.length > 1) {
                        props.push({
                            tooltip: 'Copy',
                            svgIcon: '<path fill="blue" d="M12 2.617L2.617 12 12 21.383 21.383 12 12 2.617zm.707-2.121l10.797 10.797a1 1 0 0 1 0 1.414L12.707 23.504a1 1 0 0 1-1.414 0L.496 12.707a1 1 0 0 1 0-1.414L11.293.496a1 1 0 0 1 1.414 0z"></path>',
                            onClick: async () => {
                                miro.board.ui.closeBottomPanel();

                                let widgets = await miro.board.selection.get()

                                if (!widgets || !widgets.length) {
                                    return;
                                }

                                widgets.sort((prev, next) => prev.x - next.x);
                                const {width, height} = widgets[0].bounds;
                                const {scale} = widgets[0]
                                widgets.forEach(widget => {
                                    console.log('widget',widget);
                                    if (widget.type === 'SHAPE') {
                                        miro.board.widgets.update({id: widget.id, width, height})
                                        return
                                    }

                                    miro.board.widgets.update({id: widget.id, scale})

                                })

                            }
                        })
                    }

                    if (widgets.length === 1 && widgets[0].type === 'SHAPE') {
                        props.push({
                            tooltip: 'Paste',
                            svgIcon: '<path d="M12 2.617L2.617 12 12 21.383 21.383 12 12 2.617zm.707-2.121l10.797 10.797a1 1 0 0 1 0 1.414L12.707 23.504a1 1 0 0 1-1.414 0L.496 12.707a1 1 0 0 1 0-1.414L11.293.496a1 1 0 0 1 1.414 0z"></path>',
                            onClick: async () => {
                                await miro.board.ui.openBottomPanel('bottompanel-2.html', {width: 320, height: 56});
                                await miro.addListener('SELECTION_UPDATED', (e) => {
                                    if (e.data.length == 0) {
                                        miro.board.ui.closeBottomPanel()
                                    }

                                })

                            },
                        })
                    }


                    return props
                }
            }
        }
    )

    /*   miro.addListener('SELECTION_UPDATED', async (e) => {
           if (e.data.length == 0) {
               miro.board.ui.closeBottomPanel()
           }

           if (e.data.length > 0 && currentSizes.isActive) {
               const updatedWidgets = await miro.board.selection.get();
               updatedWidgets.forEach(widget => {

               })
               currentSizes.isActive = false
           }
       })*/

})
