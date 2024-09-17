let canvas
let gl

let programInstance
let programFrameCurrent
let programFramePrevious
let delta

let state = ''

let DOM = {
    buttonNew : null,
    buttonSave : null,
    buttonLoad : null,
    buttonExport : null,
    fileSave : null,
    fileLoad : null,
    itemCuboid : null,
    position : null,
    positionX : null,
    positionY : null,
    positionZ : null,
    rotation : null,
    rotationX : null,
    rotationY : null,
    rotationZ : null,
    size : null,
    sizeX : null,
    sizeY : null,
    sizeZ : null,
    buttonDone : null,
    buttonDelete : null,
}

let varMouse = [0, 0]

let varGL = {
    program : null,
    location : {
        position : null,
        camera : null,
        color : null
    },
    shader : {
        vertex : null,
        fragment : null,
        sourceVertex : '',
        sourceFragment : '',
    },
    buffer : {
        vertex : null,
    }
}

let space3D = {
    cameraPosition : [0, 0, 1],
    cameraRotation : [0, 0, 0],
    cuboid : []
}

let varEditor = {
    selectedCuboid : -1,
    editMode : '',
}

let matrixView = null