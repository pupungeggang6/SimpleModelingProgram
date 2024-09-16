window.onload = main
window.onerror = errorHandle
window.oncontextmenu = rightClick

function main() {
    canvas = document.getElementById('Screen')
    gl = canvas.getContext('webgl')

    canvas.addEventListener('mousedown', mouseDown, false)
    canvas.addEventListener('mousemove', mouseMove, false)
    canvas.addEventListener('mouseup', mouseUp, false)

    DOMInit()
    glInit()

    programFrameCurrent = Date.now()
    programFramePrevious = Date.now() - 16
    programInstance = requestAnimationFrame(loop)
}

function DOMInit() {
    DOM.fileLoad = document.getElementById('FileLoad')
    DOM.fileLoad.style.visibility = 'hidden'
}

function glInit() {
    varGL.shader.sourceVertex = `
        attribute vec4 a_position;
        uniform mat4 u_camera;

        void main() {
            gl_Position = u_camera * a_position;
        }
    `

    varGL.shader.sourceFragment = `
        precision mediump float;
        uniform vec4 u_color;

        void main() {
            gl_FragColor = u_color;
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