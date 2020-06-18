const icon24 = '<path fill="currentColor" fill-rule="nonzero" d="M20.156 7.762c-1.351-3.746-4.672-5.297-8.838-4.61-3.9.642-7.284 3.15-7.9 5.736-1.14 4.784-.015 7.031 2.627 8.09.61.244 1.28.412 2.002.518.277.041.549.072.844.097.138.012.576.045.659.053.109.01.198.02.291.035 1.609.263 2.664 1.334 3.146 2.715 7.24-2.435 9.4-6.453 7.17-12.634zm-18.684.662C3.18 1.256 18.297-3.284 22.038 7.084c2.806 7.78-.526 13.011-9.998 15.695-.266.076-.78.173-.759-.287.062-1.296-.47-2.626-1.762-2.837-1.009-.165-10.75.124-8.047-11.23zm9.427 4.113a6.853 6.853 0 0 0 1.787.172c.223.348.442.733.79 1.366.53.967.793 1.412 1.206 2a1 1 0 1 0 1.636-1.15c-.358-.51-.593-.908-1.09-1.812-.197-.36-.358-.649-.503-.899 1.16-.573 1.916-1.605 2.005-2.909.189-2.748-2.65-4.308-6.611-3.267-.443.117-.834.44-.886 1.408-.065 1.192-.12 2.028-.25 3.825-.129 1.808-.185 2.653-.25 3.86a1 1 0 0 0 1.997.108c.05-.913.093-1.617.17-2.702zm.144-2.026c.077-1.106.124-1.82.171-2.675 2.398-.483 3.595.257 3.521 1.332-.08 1.174-1.506 1.965-3.692 1.343z"/>'

miro.onReady(() => {
    miro.initialize({
        extensionPoints: {
            toolbar: async () => {
                const authorized = await miro.isAuthorized()
                if (authorized) {
                    return {
                        title: 'List onverter',
                        toolbarSvgIcon: '<path fill="currentColor" fill-rule="nonzero" d="M12 2.617L2.617 12 12 21.383 21.383 12 12 2.617zm.707-2.121l10.797 10.797a1 1 0 0 1 0 1.414L12.707 23.504a1 1 0 0 1-1.414 0L.496 12.707a1 1 0 0 1 0-1.414L11.293.496a1 1 0 0 1 1.414 0z"></path>',
                        librarySvgIcon: '<path d="M12 2.617L2.617 12 12 21.383 21.383 12 12 2.617zm.707-2.121l10.797 10.797a1 1 0 0 1 0 1.414L12.707 23.504a1 1 0 0 1-1.414 0L.496 12.707a1 1 0 0 1 0-1.414L11.293.496a1 1 0 0 1 1.414 0z"></path>',
                        onClick: onClick
                    }
                }
            },
         
            getWidgetMenuItems: async() => {
                const authorized = await miro.isAuthorized()
                if (authorized) {
                return {
                	tooltip: 'Hi',
			svgIcon: icon24,
			onClick: onClick
                }}

			}
        }
    })

})

async function onClick() {
    let objects = await miro.board.selection.get()
    if (objects.length > 1) {
        var texts = []
        for (var i = 0; i < objects.length; ++i) {
            texts.push(objects[i].text)
        }

        function longest_string(str_ara) {
            var max = str_ara[0].length;
            str_ara.map(v => max = Math.max(max, v.length));
            result = str_ara.filter(v => v.length == max);
            return result;
        }

        //numberLines = objects.length
        height = objects.length * 20
        width = longest_string(texts)[0].length * 20
        textList = texts.join("<br/>")
        let newList = await miro.board.widgets.create({
            type: 'text',
            text: textList,
            x: objects[0]['x'],
            y: objects[0]['y'] + 100,
            style: {fontSize: objects[0].style.fontSize},
            height: height,
            width: width
        })
        //miro.board.widgets.update(newList.id, {height: height})
    } else {

        let widget = await  miro.board.selection.get()
        xCoord = widget[0].x
        yCoord = widget[0].y

        var newText = widget[0]['text']
        stickiesList = newText.split("</li>")
        element = stickiesList.pop()

        var newObjects = []

        for (var i = 0; i < stickiesList.length; i++) {
            newObjects.push({
                type: 'sticker',
                text: stickiesList[i].replace(/<[^>]+>/g, ''),
                x: xCoord,
                y: yCoord + 100,
                style: {textAlign: 'c', textAlignVertical: 'm', fontSize: 64}
            })
            xCoord = xCoord + 200
        }

        miro.board.widgets.create(newObjects)

    }
}
