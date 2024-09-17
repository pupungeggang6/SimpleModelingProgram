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

function matrixVectorMultiply(mat, vec) {
    return [
        mat[0] * vec[0] + mat[1] * vec[1] + mat[2] * vec[2] + mat[3] * vec[3],
        mat[4] * vec[0] + mat[5] * vec[1] + mat[6] * vec[2] + mat[7] * vec[3],
        mat[8] * vec[0] + mat[9] * vec[1] + mat[10] * vec[2] + mat[11] * vec[3],
        mat[12] * vec[0] + mat[13] * vec[1] + mat[14] * vec[2] + mat[15] * vec[3]
    ]
}

function vectorTransform(mat, vec) {
    let result = []

    for (let i = 0; i < vec.length; i += 3) {
        let vecHomo = [vec[i], vec[i + 1], vec[i + 2], 1]
        vecHomo = matrixVectorMultiply(mat, vecHomo)
        result = result.concat([vecHomo[0] / vecHomo[3], vecHomo[1] / vecHomo[3], vecHomo[2] / vecHomo[3]])
    }

    return result
}