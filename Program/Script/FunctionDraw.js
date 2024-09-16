function drawSceneInit() {
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.enable(gl.DEPTH_TEST)
    gl.lineWidth(2)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    gl.useProgram(varGL.program)
}

function draw() {
    gl.uniformMatrix4fv(varGL.location.camera, false, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1, -1.1, 0, 0, 0, 1])
    gl.uniform4f(varGL.location.color, 0.0, 1.0, 0.0, 1.0)

    gl.bindBuffer(gl.ARRAY_BUFFER, varGL.buffer.vertex)
    gl.vertexAttribPointer(varGL.location.position, 3, gl.FLOAT, false, 0, 0)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0, 0, 0, 0, 1, 0, 1, 0, 0]), gl.STATIC_DRAW)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
}