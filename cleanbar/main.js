miro.onReady(() => {
    miro.initialize({
        extensionPoints: {
            bottomBar: async () => {
                const authorized = await miro.isAuthorized()
                if (authorized) {
                    return {
                        tooltip: 'Paste',
                        svgIcon: '<path d="M12 2.617L2.617 12 12 21.383 21.383 12 12 2.617zm.707-2.121l10.797 10.797a1 1 0 0 1 0 1.414L12.707 23.504a1 1 0 0 1-1.414 0L.496 12.707a1 1 0 0 1 0-1.414L11.293.496a1 1 0 0 1 1.414 0z"></path>',
                        onClick: () =>{
                        await miro.board.ui.__hideButtonsPanels('all')
                        miro.addListener(miro.enums.event.ESC_PRESSED, await miro.board.ui.__showButtonsPanels('all'))
                        },
                    }
                }
            }
        }
    })

})
