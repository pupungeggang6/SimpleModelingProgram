function matrixIdentity() {
    return [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ]
}

function matrixTranslate(x, y, z) {
    return [
        1, 0, 0, x,
        0, 1, 0, y,
        0, 0, 1, z,
        0, 0, 0, 1
    ]
}

function matrixScale(x, y, z) {
    return [
        x, 0, 0, 0,
        0, y, 0, 0,
        0, 0, z, 0,
        0, 0, 0, 1
    ]
}

function matrixRotate(x, y, z) {
    let xs = Math.sin(x * Math.PI / 180)
    let xc = Math.cos(x * Math.PI / 180)
    let ys = Math.sin(y * Math.PI / 180)
    let yc = Math.cos(y * Math.PI / 180)
    let zs = Math.sin(z * Math.PI / 180)
    let zc = Math.cos(z * Math.PI / 180)

    let matrixRotateX = [
        1, 0, 0, 0,
        0, xc, -xs, 0,
        0, xs, xc, 0,
        0, 0, 0, 1
    ]

    let matrixRotateY = [
        yc, 0, ys, 0,
        0, 1, 0, 0,
        -ys, 0, yc, 0,
        0, 0, 0, 1
    ]

    let matrixRotateZ = [
        zc, -zs, 0, 0,
        zs, zc, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ]

    return matrixMultiply(matrixRotateZ, matrixMultiply(matrixRotateY, matrixMultiply(matrixRotateX, matrixIdentity())))
}

function matrixMultiply(mat1, mat2) {
    let result = []

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            result.push(mat1[i * 4 + 0] * mat2[j + 0] + mat1[i * 4 + 1] * mat2[j + 4] + mat1[i * 4 + 2] * mat2[j + 8] + mat1[i * 4 + 3] * mat2[j + 12])
        }
    }

    return result
}