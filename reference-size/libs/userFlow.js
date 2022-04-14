/*

Some thoughts on how all the moving parts should be connected in the end.
Legend:
- __variableName__: input should be provided by developer when using function
- scenaio: what is case developer wants to solve for
- task list: what high-level computational steps we need to make to arrive to great final result
- function: what is ideal most simple interface for developer

---------------------------------------------------
Scenario 1: user has a list of items to put on board
"here're a list of items with no hierarchy, please put them nicely on this board" (stickies, cards, images):

task list:
- __inputData__ => item count
- __referenceWidgetType__ => median item size
- item count + median item size + margins => needed space (width, height)
- needed space + freeSpace.ts => where to put relatively
- where to put relatively + pack.js => where to put exactly

function: putListNicely(__inputData__, __referenceWidgetType__, __nearToWhichWidget__(optional))

---------------------------------------------------
Scenario 2: user has complex structured data
"here is a list of items with relations to one another, please put them nicely on this board"

task list:
- __inputData__ => tree => rows of nodes => item size of array
- __referenceWidgetType__ => median size + margins + item size of array => needed space 
- needed space + __nearToWhichWidget__ + freeSpace.ts => to put items relatively
- __parentChildRelation__ (topDown / leftToRigh) + __connectorsNeeded__ (yes / no) + rows of nodes + pakc.js => where to put exactly

function: putStructureNicely(__inputData__, __referenceWidgetType__, __parentChildRelation__, __connectorsNeeded__, __nearToWhichWidget__(optional))

---------------------------------------------------
how params for createWidgetType must be calculated:
{
    content for each widget: __dataInput__
    x: calculcated by freeSpace.ts (where relatively) + pack.js (where exactly) + __nearToWhichWidget__
    y: calculcated by freeSpace.ts (where relatively) + pack.js (where exactly) + __nearToWhichWidget__
    width: calculated by median.js + __referenceWidgetType__
    height: calculated by median.js + __referenceWidgetType__
}
*/