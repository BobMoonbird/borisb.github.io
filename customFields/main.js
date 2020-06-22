//creating a card with customs field 
//miro.board.widgets.create({type: "CARD", card: {customFields:[{value:"this is a custom field", mainColor: "#6f7782", fontColor:"#ffffff", fieldType: "string"}]}})

const iconStickyBulk = '<path d="M19.0074 4H4V19C4 19.5523 3.55228 20 3 20C2.44772 20 2 19.5523 2 19V2H19.0074C19.5596 2 20.0074 2.44772 20.0074 3C20.0074 3.55228 19.5596 4 19.0074 4Z" fill="#050038"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5 5.99995C5 5.44766 5.44772 4.99995 6 4.99995H21C21.5523 4.99995 22 5.44766 22 5.99995V14.1715C22 14.702 21.7893 15.2107 21.4142 15.5857L15.5858 21.4142C15.2107 21.7892 14.702 21.9999 14.1716 21.9999H6C5.44772 21.9999 5 21.5522 5 20.9999V5.99995ZM7 6.99995V19.9999H13V14.9999C13 13.8954 13.8954 12.9999 15 12.9999H20V6.99995H7Z" fill="#050038"/>'

miro.onReady(() => {
    miro.initialize({
        extensionPoints: {
         
            getWidgetMenuItems: async() => {
                const authorized = await miro.isAuthorized()
                if (authorized) {
                    
                    let objects = await miro.board.selection.get()
                    if (objects.length === 1 && objects[0].type === "CARD") {
                        return {
                            tooltip: 'create a custom fields',
                            svgIcon: iconStickyBulk,
                            onClick: onClick
                        }
                    }

                    
                }

			}
        }
    })

})

async function onClick() {
    let objects = await miro.board.selection.get()
    //miro.board.widgets.update({id: objects[0].id, description: "<strong>Custom Fields:</strong><br><ul><li>this is a custom field</li></ul>",card: {customFields:[{value:"this is a custom field", mainColor: "#6f7782", fontColor:"#ffffff", fieldType: "string"}]}})
    miro.board.ui.openModal({iframeURL: './modal.html', options: {maxWidth: 500, maxHeight: 500}})
}

//miro.board.ui.openModal(iframeURL: string, options?: {maxWidth?: number; maxHeight?: number}): Promise<any>
