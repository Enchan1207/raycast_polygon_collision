import { Point, Polygon, Vector } from 'polygon'

/** ある点がポリゴン内にあるかどうかを返す */
export const isPointInsidePolygon = (point: Point, polygon: Polygon): boolean =>
    isPointInsideVectors(point, toVectors(polygon))

/** ある点がベクトル群で構成される閉曲面にあるかどうかを返す */
export const isPointInsideVectors = (point: Point, vectors: Vector[]): boolean =>
    vectors.map((vector) => isIntersect(point, vector)).reduce((prev, next) => prev !== next)

/** ポリゴンの各点を結んだベクタを返す */
export const toVectors = (polygon: Polygon): Vector[] =>
    range(polygon.points.length)
        .map((index) => polygon.points.slice(index, index + 2))
        .map(([from, to]) => ({ from, to: to ?? polygon.points[0] }))

/** ある点から右に伸びる水平線が与えられたベクトルと交差するかを返す */
const isIntersect = (point: Point, vector: Vector): boolean => {
    // 点のy座標がベクトルの始点以上終点未満、または終点以上で始点を上回らないこと
    const isVerticallyInside =
        (point.y >= vector.from.y && point.y < vector.to.y) ||
        (point.y >= vector.to.y && point.y < vector.from.y)
    if (!isVerticallyInside) {
        return false
    }

    // ベクトル上の垂直方向における点の位置を計算 ベクトルの始点と同じ高さにあれば0, 終点と同じ高さにあれば1となる
    const verticalRatio = (point.y - vector.from.y) / (vector.to.y - vector.from.y)

    // それにxの範囲をかけ、始点のx座標を加算することで、点と同じy座標をとるベクトル上のx座標を計算
    const xOnVector = vector.from.x + verticalRatio * (vector.to.x - vector.from.x)
    if (point.x >= xOnVector) {
        return false
    }

    return true
}

const range = (length: number, start?: number, step?: number): number[] =>
    Array.from(
        { length: Math.ceil(length / (step ?? 1)) },
        (_, k) => k * (step ?? 1) + (start ?? 0)
    )
