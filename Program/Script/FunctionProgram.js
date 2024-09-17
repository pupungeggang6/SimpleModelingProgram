function onButtonNewClick() {
    state = ''
    space3D = {
        light : [0, 0, -1],
        cameraPosition : [0, 0, 0],
        cameraRotation : [0, 0, 0],
        cuboid : []
    }
}

function onButtonLoadClick() {
    DOM.fileLoad.click()
}

function onButtonSaveClick() {
    let saveText = JSON.stringify(space3D)
    const blob = new Blob([saveText], {type: 'text/plain'})
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `test`
    a.click()
    a.remove()
    window.URL.revokeObjectURL(url)
}

function uploadDataFile(input) {
    let file = input.files[0]
    let reader = new FileReader()
    reader.readAsText(file)

    reader.addEventListener('load', () => {
        space3D = JSON.parse(reader.result)
    }, false)
}

function refreshHierarchy() {
    let tempHTML = ''

    for (let i = 0; i < space3D.cuboid.length; i++) {
        tempHTML += `<input type="text" onclick="onHierarchyClick(${i})" onchange="onCuboidNameChange(${this})"/><br>`
    }

    DOM.itemCuboid.innerHTML = tempHTML
}

function onHierarchyClick(index) {
    state = 'CuboidSelected'
    varEditor.selectedCuboid = index
    console.log(index)
}

function onCuboidNameChange() {
    space3D.cuboid[varEditor.selectedCuboid]['Name'] = this.value
}