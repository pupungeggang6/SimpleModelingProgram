function onButtonNewClick() {
    state = ''
    space3D = {
        light : [0, 0, -1],
        cameraPosition : [0, 0, 0],
        cameraRotation : [0, 0, 0],
        cuboid : []
    }
    updateHierarchy()
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
    a.download = `${DOM.fileName.value}`
    a.click()
    a.remove()
    window.URL.revokeObjectURL(url)
}

function onButtonExportClick() {
    let saveText = convertToObj()
    const blob = new Blob([saveText], {type: 'model/obj'})
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${DOM.fileName.value}.obj`
    a.click()
    a.remove()
    window.URL.revokeObjectURL(url)
}

function addCube() {
    space3D.cuboid.push({'Name' : 'Cuboid', 'Geometry' : [0, 0, 0, 0, 0, 0, 1, 1, 1]})
    updateHierarchy()
}

function onButtonCameraClick() {
    varEditor.editMode = 'Camera'
    varEditor.selectedCuboid = -1
    updateProperties()
}

function onButtonDeleteClick() {
    space3D.cuboid.splice(varEditor.selectedCuboid, 1)
    varEditor.editMode = ''
    varEditor.selectedCuboid = -1
    updateHierarchy()
    updateProperties()
}

function onButtonDoneClick() {
    varEditor.editMode = ''
    varEditor.selectedCuboid = -1
    updateProperties()
}

function uploadDataFile(input) {
    let file = input.files[0]
    let reader = new FileReader()
    reader.readAsText(file)

    reader.addEventListener('load', () => {
        space3D = JSON.parse(reader.result)
        updateHierarchy()
    }, false)
}

function updateHierarchy() {
    let tempHTML = ''

    for (let i = 0; i < space3D.cuboid.length; i++) {
        tempHTML += `
            <input type="text" class="ItemCuboidList" onclick="onHierarchyClick(${i})" onchange="onCuboidNameChange(this, ${i})" value="${space3D.cuboid[i]['Name']}"/><br>
        `
    }

    DOM.itemCuboid.innerHTML = tempHTML
}

function updateProperties() {
    if (varEditor.editMode === '') {
        DOM.sizeX.disabled = false
        DOM.sizeY.disabled = false
        DOM.sizeZ.disabled = false
        DOM.buttonDone.style.display = 'none'
        DOM.buttonDelete.style.display = 'none'
    } else if (varEditor.editMode ===  'Cuboid') {
        DOM.sizeX.disabled = false
        DOM.sizeY.disabled = false
        DOM.sizeZ.disabled = false
        DOM.buttonDone.style.display = ''
        DOM.buttonDelete.style.display = ''
        DOM.positionX.value = space3D.cuboid[varEditor.selectedCuboid]['Geometry'][0]
        DOM.positionY.value = space3D.cuboid[varEditor.selectedCuboid]['Geometry'][1]
        DOM.positionZ.value = space3D.cuboid[varEditor.selectedCuboid]['Geometry'][2]
        DOM.rotationX.value = space3D.cuboid[varEditor.selectedCuboid]['Geometry'][3]
        DOM.rotationY.value = space3D.cuboid[varEditor.selectedCuboid]['Geometry'][4]
        DOM.rotationZ.value = space3D.cuboid[varEditor.selectedCuboid]['Geometry'][5]
        DOM.sizeX.value = space3D.cuboid[varEditor.selectedCuboid]['Geometry'][6]
        DOM.sizeY.value = space3D.cuboid[varEditor.selectedCuboid]['Geometry'][7]
        DOM.sizeZ.value = space3D.cuboid[varEditor.selectedCuboid]['Geometry'][8]
    } else if (varEditor.editMode === 'Camera') {
        DOM.sizeX.disabled = true
        DOM.sizeY.disabled = true
        DOM.sizeZ.disabled = true
        DOM.buttonDone.style.display = ''
        DOM.buttonDelete.style.display = 'none'
        DOM.positionX.value = space3D.cameraPosition[0]
        DOM.positionY.value = space3D.cameraPosition[1]
        DOM.positionZ.value = space3D.cameraPosition[2]
        DOM.rotationX.value = space3D.cameraRotation[0]
        DOM.rotationY.value = space3D.cameraRotation[1]
        DOM.rotationZ.value = space3D.cameraRotation[2]
    }
}

function onHierarchyClick(index) {
    varEditor.editMode = 'Cuboid'
    varEditor.selectedCuboid = index
    updateProperties()
}

function onCuboidNameChange(self, index) {
    console.log(index)
    space3D.cuboid[index]['Name'] = self.value
}

function changeGeometryValue() {
    if (varEditor.editMode ===  'Cuboid') {
        space3D.cuboid[varEditor.selectedCuboid]['Geometry'][0] = DOM.positionX.value
        space3D.cuboid[varEditor.selectedCuboid]['Geometry'][1] = DOM.positionY.value
        space3D.cuboid[varEditor.selectedCuboid]['Geometry'][2] = DOM.positionZ.value
        space3D.cuboid[varEditor.selectedCuboid]['Geometry'][3] = DOM.rotationX.value
        space3D.cuboid[varEditor.selectedCuboid]['Geometry'][4] = DOM.rotationY.value
        space3D.cuboid[varEditor.selectedCuboid]['Geometry'][5] = DOM.rotationZ.value
        space3D.cuboid[varEditor.selectedCuboid]['Geometry'][6] = DOM.sizeX.value
        space3D.cuboid[varEditor.selectedCuboid]['Geometry'][7] = DOM.sizeY.value
        space3D.cuboid[varEditor.selectedCuboid]['Geometry'][8] = DOM.sizeZ.value
    } else if (varEditor.editMode === 'Camera') {
        space3D.cameraPosition[0] = DOM.positionX.value
        space3D.cameraPosition[1] = DOM.positionY.value
        space3D.cameraPosition[2] = DOM.positionZ.value
        space3D.cameraRotation[0] = DOM.rotationX.value
        space3D.cameraRotation[1] = DOM.rotationY.value
        space3D.cameraRotation[2] = DOM.rotationZ.value
    }
}

function convertToObj() {
    let IDV = 1
    let IDN = 1
    let textV = ''
    let textN = ''
    let textF = ''

    for (let i = 0; i < space3D.cuboid.length; i++) {
        let cubeVertice = [
            [-0.5, -0.5, -0.5], [-0.5, -0.5, 0.5], [0.5, -0.5, 0.5], [0.5, -0.5, -0.5],
            [-0.5, 0.5, -0.5], [-0.5, 0.5, 0.5], [0.5, 0.5, 0.5], [0.5, 0.5, -0.5]
        ]
        
        let position = space3D.cuboid[i]['Geometry'].slice(0, 3)
        let rotation = space3D.cuboid[i]['Geometry'].slice(3, 6)
        let size = space3D.cuboid[i]['Geometry'].slice(6, 9)

        for (let i = 0; i < cubeVertice.length; i++) {
            cubeVertice[i] = vectorTransform(matrixScale(size[0], size[1], size[2]), cubeVertice[i])
            cubeVertice[i] = vectorTransform(matrixRotate(rotation[0], rotation[1], rotation[2]), cubeVertice[i])
            cubeVertice[i] = vectorTransform(matrixTranslate(position[0], position[1], position[2]), cubeVertice[i])
        }

        for (let i = 0; i < 8; i++) {
            textV += `v ${cubeVertice[i][0].toFixed(3)} ${cubeVertice[i][1].toFixed(3)} ${cubeVertice[i][2].toFixed(3)}\n`
        }

        for (let i = 0; i < indexFace.length; i++) {
            let normal = [normalVector[i][0], normalVector[i][1], normalVector[i][2]]
            normal = vectorTransform(matrixRotate(rotation[0], rotation[1], rotation[2]), normal)
            textN += `vn ${normal[0].toFixed(3)} ${normal[1].toFixed(3)} ${normal[2].toFixed(3)}\n`
            textF += `f ${IDV + indexFace[i][0]}//${IDN + i} ${IDV + indexFace[i][1]}//${IDN + i} ${IDV + indexFace[i][2]}//${IDN + i}\n`
        }

        IDV += 8
        IDN += 12
    }

    return textV + textN + textF
}