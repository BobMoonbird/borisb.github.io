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

const sizedTypes = ['SHAPE', 'STICKER', 'IMAGE'];

let globalWidgets = [];

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
                            tooltip: 'adjust to size',
                            svgIcon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
                                '<path fill-rule="evenodd" clip-rule="evenodd" d="M10 3H4C3.44772 3 3 3.44772 3 4V10C3 10.5523 3.44772 11 4 11H10C10.5523 11 11 10.5523 11 10V4C11 3.44772 10.5523 3 10 3ZM5 9V5H9V9H5Z" fill="#050038"/>\n' +
                                '<path fill-rule="evenodd" clip-rule="evenodd" d="M14 3H20C20.5523 3 21 3.44772 21 4V10C21 10.5523 20.5523 11 20 11H14C13.4477 11 13 10.5523 13 10V4C13 3.44772 13.4477 3 14 3ZM15 9V5H19V9H15Z" fill="#050038"/>\n' +
                                '<path fill-rule="evenodd" clip-rule="evenodd" d="M4 13H10C10.5523 13 11 13.4477 11 14V20C11 20.5523 10.5523 21 10 21H4C3.44772 21 3 20.5523 3 20V14C3 13.4477 3.44772 13 4 13ZM9 19H5V15H9V19Z" fill="#050038"/>\n' +
                                '<path fill-rule="evenodd" clip-rule="evenodd" d="M14 13H20C20.5523 13 21 13.4477 21 14V20C21 20.5523 20.5523 21 20 21H14C13.4477 21 13 20.5523 13 20V14C13 13.4477 13.4477 13 14 13ZM19 19H15V15H19V19Z" fill="#050038"/>\n' +
                                '</svg>',
                            onClick: async () => {
                                miro.board.ui.closeBottomPanel();


                                globalWidgets = await miro.board.selection.get()

                                if (!globalWidgets || !globalWidgets.length) {
                                    return;
                                }
                            }
                        })
                    }

                    if (widgets.length === 1 && widgets[0].type === 'SHAPE') {
                        props.push({
                            tooltip: 'set size',
                            svgIcon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
                                '<path d="M3 6V18C3 18.5523 2.55228 19 2 19C1.44772 19 1 18.5523 1 18V6C1 5.44772 1.44772 5 2 5C2.55228 5 3 5.44772 3 6Z" fill="#050038"/>\n' +
                                '<path d="M23 6V18C23 18.5523 22.5523 19 22 19C21.4477 19 21 18.5523 21 18V6C21 5.44772 21.4477 5 22 5C22.5523 5 23 5.44772 23 6Z" fill="#050038"/>\n' +
                                '<path d="M20.4142 12L16.7071 15.7071C16.3166 16.0976 15.6834 16.0976 15.2929 15.7071C15.0976 15.5118 15 15.2559 15 15C15 14.7441 15.0976 14.4882 15.2929 14.2929L16.5858 13H7.41421L8.70652 14.2923C8.90178 14.4876 9 14.7441 9 15C9 15.2559 8.90237 15.5118 8.70711 15.7071C8.31658 16.0976 7.68342 16.0976 7.29289 15.7071L3.58579 12L7.2925 8.29328C7.68303 7.90276 8.31658 7.90237 8.70711 8.29289C8.90237 8.48816 9 8.74408 9 9C9 9.25592 8.90237 9.51184 8.70711 9.70711L7.41421 11H16.5858L15.2929 9.70711C15.0976 9.51184 15 9.25592 15 9C15 8.74408 15.0976 8.48816 15.2929 8.29289C15.6834 7.90237 16.3166 7.90237 16.7071 8.29289L20.4142 12Z" fill="#050038"/>\n' +
                                '</svg>',
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

    miro.addListener('CANVAS_CLICKED', (event) => {
        const {data: {x, y}} = event;

        if(globalWidgets.length === 0){
            return
        }

        const clickedIndex = globalWidgets.findIndex(widget => {
            return (x > widget.bounds.left && x < widget.bounds.right && y < widget.bounds.bottom && y> widget.bounds.top)
        })


        if(clickedIndex < 0){
            return;
        }

        const {width, height} = globalWidgets[clickedIndex].bounds;
        const {scale} = globalWidgets[clickedIndex];

        globalWidgets.forEach(widget => {
            if (widget.type === 'SHAPE') {
                miro.board.widgets.update({id: widget.id, width, height})
                return
            }

            miro.board.widgets.update({id: widget.id, scale})

        })

        globalWidgets = [];

    })

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
