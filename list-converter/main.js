const { board } = window.miro;

async function init() {
  miro.board.ui.on('icon:click', async () => {

    const stickiesToList = async (objects) => {
      let texts = []
          for (let i = 0; i < objects.length; ++i) {
              texts.push('<li>'+objects[i].content+'</li>')
          }
  
         /* function longest_string(str_ara) {	
              var max = str_ara[0].length;	
              str_ara.map(v => max = Math.max(max, v.length));	
              result = str_ara.filter(v => v.length == max);	
              return result;	
          }//
  
          let width = longest_string(texts)[0].length * 5 */
  
          /*let textList = texts.join('')*/
          let newList = await miro.board.createText({ //UPDATED 
              content: '<ul>'+texts.join('')+'</ul>',
              x: objects[0]['x'],
              y: objects[0]['y'] + 100,
              style: {
                fontSize: objects[0].scale,
              },
              width: objects[0].content.length*10
          })
  }
  
  const listToStickies = async (objects) => {
  
         let xCoord = objects[0].x	
         let yCoord = objects[0].y
  
          let newText = objects[0]['content']
          var stickiesList = newText.split("</li>")
          stickiesList.pop()
  
        //  let newObjects = []
  
          for (let i = 0; i < stickiesList.length; i++) {
            miro.board.createStickyNote({
                content: stickiesList[i].replace(/<[^>]+>/g, ''),
                x: xCoord,
                y: yCoord + 100,
                style: {textAlign: 'center', textAlignVertical: 'middle'}
            })
        
            xCoord += 200
        }
  
         // miro.board.createStickyNote(newObjects) //UPDATED
  
  }
  
 // async function onClick() {
      let objects = await miro.board.getSelection() //UPDATED
      if (objects.length > 1) {
  
          stickiesToList(objects)
  
      } else {
  
          listToStickies(objects)
  
      }
  //}

  });
}

init();
