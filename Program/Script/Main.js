window.onload = main
window.onerror = errorHandle
window.oncontextmenu = rightClick

function main() {
    canvas = document.getElementById('Screen')
    context = canvas.getContext('webgl2')

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