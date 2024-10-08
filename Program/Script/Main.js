window.onload = main
window.onerror = errorHandle
window.oncontextmenu = rightClick

function main() {
    canvas = document.getElementById('Screen')
    gl = canvas.getContext('webgl2')

    canvas.addEventListener('mousedown', mouseDown, false)
    canvas.addEventListener('mousemove', mouseMove, false)
    canvas.addEventListener('mouseup', mouseUp, false)

    DOMInit()
    glInit()

    updateHierarchy()

    programFrameCurrent = Date.now()
    programFramePrevious = Date.now() - 16
    programInstance = requestAnimationFrame(loop)
}

function DOMInit() {
    DOM.fileLoad = document.getElementById('FileLoad')
    DOM.fileLoad.style.visibility = 'hidden'
    DOM.itemCuboid = document.getElementById('ItemCuboid')
    DOM.position = document.getElementById('Position')
    DOM.positionX = document.getElementById('PositionX')
    DOM.positionY = document.getElementById('PositionY')
    DOM.positionZ = document.getElementById('PositionZ')
    DOM.rotation = document.getElementById('Rotation')
    DOM.rotationX = document.getElementById('RotationX')
    DOM.rotationY = document.getElementById('RotationY')
    DOM.rotationZ = document.getElementById('RotationZ')
    DOM.size = document.getElementById('Size')
    DOM.sizeX = document.getElementById('SizeX')
    DOM.sizeY = document.getElementById('SizeY')
    DOM.sizeZ = document.getElementById('SizeZ')
    DOM.buttonDone = document.getElementById('ButtonDone')
    DOM.buttonDelete = document.getElementById('ButtonDelete')
    DOM.fileName = document.getElementById('FileName')
    DOM.buttonDone.style.display = 'none'
    DOM.buttonDelete.style.display = 'none'
}

function glInit() {
    varGL.shader.sourceVertex = `#version 300 es
        in vec4 a_position;
        uniform mat4 u_camera;

        void main() {
            gl_Position = u_camera * a_position;
        }
    `

    varGL.shader.sourceFragment = `#version 300 es
        precision highp float;
        uniform vec4 u_color;
        out vec4 outColor;

        void main() {
            outColor = u_color;
        }
    `

    varGL.shader.vertex = gl.createShader(gl.VERTEX_SHADER)
    gl.shaderSource(varGL.shader.vertex, varGL.shader.sourceVertex)
    gl.compileShader(varGL.shader.vertex)
    varGL.shader.fragment = gl.createShader(gl.FRAGMENT_SHADER)
    gl.shaderSource(varGL.shader.fragment, varGL.shader.sourceFragment)
    gl.compileShader(varGL.shader.fragment)
    varGL.program = gl.createProgram()
    gl.attachShader(varGL.program, varGL.shader.vertex)
    gl.attachShader(varGL.program, varGL.shader.fragment)
    gl.linkProgram(varGL.program)

    varGL.location.position = gl.getAttribLocation(varGL.program, 'a_position')
    varGL.location.camera = gl.getUniformLocation(varGL.program, 'u_camera')
    varGL.location.color = gl.getUniformLocation(varGL.program, 'u_color')
    gl.enableVertexAttribArray(varGL.location.position)

    varGL.buffer.vertex = gl.createBuffer()
}

function loop() {
    programFramePrevious = programFrameCurrent
    programFrameCurrent = Date.now()
    delta = programFrameCurrent - programFramePrevious
    loopScene()
    programInstance = requestAnimationFrame(loop)
}

function mouseDown(event) {
    let targetRect = canvas.getBoundingClientRect()
    let x = event.clientX - targetRect.left
    let y = event.clientY - targetRect.top
    let button = event.button

    mouseDownScene(x, y, button)
}

function mouseMove(event) {
    let targetRect = canvas.getBoundingClientRect()
    let x = event.clientX - targetRect.left
    let y = event.clientY - targetRect.top

    varMouse[0] = x
    varMouse[1] = y
}

function mouseUp(event) {
    let targetRect = canvas.getBoundingClientRect()
    let x = event.clientX - targetRect.left
    let y = event.clientY - targetRect.top
    let button = event.button

    mouseUpScene(x, y, button)
}

function errorHandle(err, url, line, col, obj) {
    if (obj != null) {
        cancelAnimationFrame(programInstance)
    }
}

function rightClick() {
    return false
}