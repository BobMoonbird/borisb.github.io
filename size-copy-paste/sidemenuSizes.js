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


const setSizesButton = document.getElementById('setSizes')
setSizesButton.addEventListener('click', async event => {
    event.preventDefault()
    await miro.board.ui.openBottomPanel('bottompanel-2.html', {width: 320, height: 56});
})

const copySizesButton = document.getElementById('copySizes');
copySizesButton.addEventListener('click', async event => {

    event.preventDefault();

    miro.board.ui.closeBottomPanel();

    const widgets = await miro.board.selection.get()

    if (!widgets || !widgets.length) {
        return;
    }

    const {width, height} = widgets[0].bounds;
    updateCurrentSizes({width, height})
})


