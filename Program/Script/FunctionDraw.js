function drawSceneInit() {
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.enable(gl.DEPTH_TEST)
    gl.lineWidth(4)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    gl.useProgram(varGL.program)
}

function draw() {
    drawAxis()
    drawSpace()
}

function drawAxis() {
    gl.uniformMatrix4fv(varGL.location.camera, false, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -0.5, 0, 0, 0, 0, 1])
    
    let axisX = [0, 0, 0, 0.1, 0, 0]
    let axisY = [0, 0, 0, 0, 0.1, 0]
    let axisZ = [0, 0, 0, 0, 0, 0.1]

    axisX = vectorTransform(matrixRotate(space3D.cameraRotation[0], space3D.cameraRotation[1], space3D.cameraRotation[2]), axisX)
    axisY = vectorTransform(matrixRotate(space3D.cameraRotation[0], space3D.cameraRotation[1], space3D.cameraRotation[2]), axisY)
    axisZ = vectorTransform(matrixRotate(space3D.cameraRotation[0], space3D.cameraRotation[1], space3D.cameraRotation[2]), axisZ)

    axisX = vectorTransform(matrixTranslate(-0.9, -0.9, 0), axisX)
    axisY = vectorTransform(matrixTranslate(-0.9, -0.9, 0), axisY)
    axisZ = vectorTransform(matrixTranslate(-0.9, -0.9, 0), axisZ)
    
    gl.bindBuffer(gl.ARRAY_BUFFER, varGL.buffer.vertex)
    gl.vertexAttribPointer(varGL.location.position, 3, gl.FLOAT, false, 0, 0)

    gl.uniform4f(varGL.location.color, 1.0, 0.0, 0.0, 1.0)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(axisX), gl.STATIC_DRAW)
    gl.drawArrays(gl.LINES, 0, 2)
    gl.uniform4f(varGL.location.color, 0.0, 1.0, 0.0, 1.0)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(axisY), gl.STATIC_DRAW)
    gl.drawArrays(gl.LINES, 0, 2)
    gl.uniform4f(varGL.location.color, 0.0, 0.0, 1.0, 1.0)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(axisZ), gl.STATIC_DRAW)
    gl.drawArrays(gl.LINES, 0, 2)
}

function drawSpace() {
    let matrixCamera = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1, -1.1, 0, 0, 0, 1]
    matrixCamera = matrixMultiply(matrixRotate(space3D.cameraRotation[0], space3D.cameraRotation[1], space3D.cameraRotation[2]), matrixCamera)
    matrixCamera = matrixMultiply(matrixTranslate(space3D.cameraPosition[0], space3D.cameraPosition[1], space3D.cameraPosition[2]), matrixCamera)
    gl.uniformMatrix4fv(varGL.location.camera, false, matrixCamera)
    gl.uniform4f(varGL.location.color, 0.0, 1.0, 0.0, 1.0)

    gl.bindBuffer(gl.ARRAY_BUFFER, varGL.buffer.vertex)
    gl.vertexAttribPointer(varGL.location.position, 3, gl.FLOAT, false, 0, 0)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0, 0, 0, 0, 1, 0, 1, 0, 0]), gl.STATIC_DRAW)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
}

function drawCuboid(rotation, size, position) {

}