const icon24 = '<path fill="currentColor" fill-rule="nonzero" d="M20.156 7.762c-1.351-3.746-4.672-5.297-8.838-4.61-3.9.642-7.284 3.15-7.9 5.736-1.14 4.784-.015 7.031 2.627 8.09.61.244 1.28.412 2.002.518.277.041.549.072.844.097.138.012.576.045.659.053.109.01.198.02.291.035 1.609.263 2.664 1.334 3.146 2.715 7.24-2.435 9.4-6.453 7.17-12.634zm-18.684.662C3.18 1.256 18.297-3.284 22.038 7.084c2.806 7.78-.526 13.011-9.998 15.695-.266.076-.78.173-.759-.287.062-1.296-.47-2.626-1.762-2.837-1.009-.165-10.75.124-8.047-11.23zm9.427 4.113a6.853 6.853 0 0 0 1.787.172c.223.348.442.733.79 1.366.53.967.793 1.412 1.206 2a1 1 0 1 0 1.636-1.15c-.358-.51-.593-.908-1.09-1.812-.197-.36-.358-.649-.503-.899 1.16-.573 1.916-1.605 2.005-2.909.189-2.748-2.65-4.308-6.611-3.267-.443.117-.834.44-.886 1.408-.065 1.192-.12 2.028-.25 3.825-.129 1.808-.185 2.653-.25 3.86a1 1 0 0 0 1.997.108c.05-.913.093-1.617.17-2.702zm.144-2.026c.077-1.106.124-1.82.171-2.675 2.398-.483 3.595.257 3.521 1.332-.08 1.174-1.506 1.965-3.692 1.343z"/>'
const iconNumList = '<path fill-rule="evenodd" clip-rule="evenodd" d="M3 2H6C6.55228 2 7 2.44772 7 3V9C7 9.55228 6.55228 10 6 10C5.44772 10 5 9.55228 5 9V4H3C2.44772 4 2 3.55228 2 3C2 2.44772 2.44772 2 3 2ZM20 5H11C10.4477 5 10 5.44772 10 6C10 6.55228 10.4477 7 11 7H20C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5ZM20 16H11C10.4477 16 10 16.4477 10 17C10 17.5523 10.4477 18 11 18H20C20.5523 18 21 17.5523 21 17C21 16.4477 20.5523 16 20 16ZM2 17V20C2 20.5523 2.44772 21 3 21H7C7.55228 21 8 20.5523 8 20C8 19.4477 7.55228 19 7 19H4V18H7C7.55228 18 8 17.5523 8 17V14C8 13.4477 7.55228 13 7 13H3C2.44772 13 2 13.4477 2 14C2 14.5523 2.44772 15 3 15H6V16H3C2.44772 16 2 16.4477 2 17Z" fill="#050038"/>'
const iconBulList = '<path fill-rule="evenodd" clip-rule="evenodd" d="M3 5C3 5.82843 3.67157 6.5 4.5 6.5C5.32843 6.5 6 5.82843 6 5C6 4.17157 5.32843 3.5 4.5 3.5C3.67157 3.5 3 4.17157 3 5ZM20 4H9C8.44772 4 8 4.44772 8 5C8 5.55228 8.44772 6 9 6H20C20.5523 6 21 5.55228 21 5C21 4.44772 20.5523 4 20 4ZM20 11H9C8.44772 11 8 11.4477 8 12C8 12.5523 8.44772 13 9 13H20C20.5523 13 21 12.5523 21 12C21 11.4477 20.5523 11 20 11ZM9 18H20C20.5523 18 21 18.4477 21 19C21 19.5523 20.5523 20 20 20H9C8.44772 20 8 19.5523 8 19C8 18.4477 8.44772 18 9 18ZM4.5 13.5C3.67157 13.5 3 12.8284 3 12C3 11.1716 3.67157 10.5 4.5 10.5C5.32843 10.5 6 11.1716 6 12C6 12.8284 5.32843 13.5 4.5 13.5ZM3 19C3 19.8284 3.67157 20.5 4.5 20.5C5.32843 20.5 6 19.8284 6 19C6 18.1716 5.32843 17.5 4.5 17.5C3.67157 17.5 3 18.1716 3 19Z" fill="#050038"/>'
const iconStickyBulk = '<path d="M19.0074 4H4V19C4 19.5523 3.55228 20 3 20C2.44772 20 2 19.5523 2 19V2H19.0074C19.5596 2 20.0074 2.44772 20.0074 3C20.0074 3.55228 19.5596 4 19.0074 4Z" fill="#050038"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5 5.99995C5 5.44766 5.44772 4.99995 6 4.99995H21C21.5523 4.99995 22 5.44766 22 5.99995V14.1715C22 14.702 21.7893 15.2107 21.4142 15.5857L15.5858 21.4142C15.2107 21.7892 14.702 21.9999 14.1716 21.9999H6C5.44772 21.9999 5 21.5522 5 20.9999V5.99995ZM7 6.99995V19.9999H13V14.9999C13 13.8954 13.8954 12.9999 15 12.9999H20V6.99995H7Z" fill="#050038"/>'

miro.onReady(() => {
    miro.initialize({
        extensionPoints: {
            /*toolbar: async () => {
                const authorized = await miro.isAuthorized()
                if (authorized) {
                    return {
                        title: 'List Converter',
                        toolbarSvgIcon: '<path fill="currentColor" fill-rule="nonzero" d="M12 2.617L2.617 12 12 21.383 21.383 12 12 2.617zm.707-2.121l10.797 10.797a1 1 0 0 1 0 1.414L12.707 23.504a1 1 0 0 1-1.414 0L.496 12.707a1 1 0 0 1 0-1.414L11.293.496a1 1 0 0 1 1.414 0z"></path>',
                        librarySvgIcon: '<path d="M12 2.617L2.617 12 12 21.383 21.383 12 12 2.617zm.707-2.121l10.797 10.797a1 1 0 0 1 0 1.414L12.707 23.504a1 1 0 0 1-1.414 0L.496 12.707a1 1 0 0 1 0-1.414L11.293.496a1 1 0 0 1 1.414 0z"></path>',
                        onClick: onClick
                    }
                }
            },*/
         
            getWidgetMenuItems: async() => {
                const authorized = await miro.isAuthorized()
                if (authorized) {
                    
                    let objects = await miro.board.selection.get()
                    const isStickie = (widget) => widget.type === "STICKER"

                    if (objects.every(isStickie)) {
                        return {
                            tooltip: 'Convert into bullet list',
                            svgIcon: iconBulList,
                            onClick: stickiesToList(objects)
                            
                        }
                    } else if (objects.length === 1 && objects[0].type === "TEXT") {
                        return {
                            tooltip: 'convert to stickies',
                            svgIcon: iconStickyBulk,
                            onClick: listToStickies(objects)
                        }
                    }

                    
                }

			}
        }
    })

})

const stickiesToList = async (objects) => {
    let texts = []
        for (let i = 0; i < objects.length; ++i) {
            texts.push('<li>'+objects[i].text+'</li>')
        }

        function longest_string(str_ara) {	
            var max = str_ara[0].length;	
            str_ara.map(v => max = Math.max(max, v.length));	
            result = str_ara.filter(v => v.length == max);	
            return result;	
        }

        width = longest_string(texts)[0].length * 5

        textList = texts.join('')
        let newList = await miro.board.widgets.create({
            type: 'TEXT',
            text: '<ul>'+textList+'</ul>',
            x: objects[0]['x'],
            y: objects[0]['y'] + 100,
            scale: (objects[0].bounds.width/12),
            width: width
        })
}

const listToStickies = async (objects) => {

        xCoord = objects[0].x	
        yCoord = objects[0].y

        let newText = objects[0]['text']
        stickiesList = newText.split("</li>")
        stickiesList.pop()

        let newObjects = []

        for (let i = 0; i < stickiesList.length; i++) {
            newObjects.push({
                type: 'STICKER',
                text: stickiesList[i].replace(/<[^>]+>/g, ''),
                x: xCoord,
                y: yCoord + 100,
                style: {textAlign: 'c', textAlignVertical: 'm', fontSize: 64}
            })
            xCoord += 200
            
        }

        miro.board.widgets.create(newObjects)

}

async function onClick() {
    let objects = await miro.board.selection.get()
    if (objects.length > 1) {

        stickiesToList(objects)

    } else {

        listToStickies(objects)

    }
}
