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
    fileLoad : null
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
    light : [0, 0, -1],
    cameraPosition : [0, 0, 0],
    cameraRotation : [0, 0, 0],
    cuboid : []
}