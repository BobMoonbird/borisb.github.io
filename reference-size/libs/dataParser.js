//3rd party dev code
const connectorWidgets = selectionv1.filter(widget => widget.type === 'LINE')

function getId(node) {
    return node.id
}
function getParentIds(node) {

    return node.parentId
}
function getValue(node) {
    return node.value
}

//lib code
const selectedTree = async (nodes, parsers) => {
    let firstelement = nodes.find(node => {
        return nodes.every(node => node.parentId === '')
    })


    const findChildren = (parentNode) => {
        const nodeChildrenIds = nodes
            .filter(node => node.parentId === parentNode.id)
            .map(node => node.id)
        const nodeChildren = nodes
            .filter(node => nodeChildrenIds
                .includes(node.id))

        return nodeChildren
    }

    const buildNodeTree = (node) => {
        const nodeChildren = findChildren(node)
        const nodeTree = {
            id: node.id, text: node.value, children: nodeChildren.map(buildNodeTree)
        }

        return nodeTree
    }

    return buildNodeTree(firstelement)
}

