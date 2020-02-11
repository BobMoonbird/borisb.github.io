rtb.onReady(() => {
	 rtb.initialize({
		extensionPoints: {
			toolbar:{
				title:'Test Converter',
				toolbarSvgIcon:'<path d="M12 2.617L2.617 12 12 21.383 21.383 12 12 2.617zm.707-2.121l10.797 10.797a1 1 0 0 1 0 1.414L12.707 23.504a1 1 0 0 1-1.414 0L.496 12.707a1 1 0 0 1 0-1.414L11.293.496a1 1 0 0 1 1.414 0z"></path>',
				librarySvgIcon:'<path d="M12 2.617L2.617 12 12 21.383 21.383 12 12 2.617zm.707-2.121l10.797 10.797a1 1 0 0 1 0 1.414L12.707 23.504a1 1 0 0 1-1.414 0L.496 12.707a1 1 0 0 1 0-1.414L11.293.496a1 1 0 0 1 1.414 0z"></path>',
				onClick: async function() {
						let objects = await rtb.board.selection.get()
						if (objects.length > 1) {
							var texts = []
							for (var i = 0; i<objects.length; ++i) {
								texts.push(objects[i].text)
							}

							//numberLines = objects.length
							height = 32+objects.length*objects[0].style.fontSize
							width = objects[0].bounds.width*2
							textList = texts.join("<br/>")
							let newList = await rtb.board.widgets.create({type: 'shape', text: textList, x: objects[0]['x'], y:objects[0]['y']+100, style: {fontSize: objects[0].style.fontSize}, height: height, width: width})
							//rtb.board.widgets.update(newList.id, {height: height})	
						}
						else {
							
							rtb.board.openLeftSidebar('sidebar.html')

						}	
				}
			}
		}
		})

	})
