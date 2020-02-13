miro.onReady(() => {
    miro.initialize({
        extensionPoints: {
            toolbar: async () => {
                const authorized = await miro.isAuthorized()
                if (authorized) {
                    return {
                        title: 'Size Copy Paste',
                        toolbarSvgIcon: '<path d="M12 2.617L2.617 12 12 21.383 21.383 12 12 2.617zm.707-2.121l10.797 10.797a1 1 0 0 1 0 1.414L12.707 23.504a1 1 0 0 1-1.414 0L.496 12.707a1 1 0 0 1 0-1.414L11.293.496a1 1 0 0 1 1.414 0z"></path>',
                        librarySvgIcon: '<path d="M12 2.617L2.617 12 12 21.383 21.383 12 12 2.617zm.707-2.121l10.797 10.797a1 1 0 0 1 0 1.414L12.707 23.504a1 1 0 0 1-1.414 0L.496 12.707a1 1 0 0 1 0-1.414L11.293.496a1 1 0 0 1 1.414 0z"></path>',
                        onClick: onClick
                    }
                }
            }
        }
    })

})

async function onClick() {
    /*let objects = await miro.board.selection.get()
    if (objects.length > 1) {
        var texts = []
        for (var i = 0; i < objects.length; ++i) {
            texts.push(objects[i].text)
        } */

       /* function longest_string(str_ara) {
            var max = str_ara[0].length;
            str_ara.map(v => max = Math.max(max, v.length));
            result = str_ara.filter(v => v.length == max);
            return result;
        } */

        //numberLines = objects.length
       /* height = objects.length * 20
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
        })*/
        //miro.board.widgets.update(newList.id, {height: height})
   /* } else {

        let widget = await  miro.board.selection.get()
        xCoord = widget[0].x
        yCoord = widget[0].y

        var newText = widget[0]['text']
        stickiesList = newText.split("</li>")
        element = stickiesList.pop()

        var newObjects = []*/

       /* for (var i = 0; i < stickiesList.length; i++) {
            newObjects.push({
                type: 'sticker',
                text: stickiesList[i].replace(/<[^>]+>/g, ''),
                x: xCoord,
                y: yCoord + 100,
                style: {textAlign: 'c', textAlignVertical: 'm', fontSize: 64}
            })
            xCoord = xCoord + 200
        }*/

     /*   miro.board.widgets.create(newObjects)

    }*/
}
