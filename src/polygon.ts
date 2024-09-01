import { z } from 'zod'

export type Point = { x: number; y: number }
export type Vector = { from: Point; to: Point }
export type Polygon = {
    points: Point[]
}

export const PolygonFileSchema = z.object({
    points: z.array(z.array(z.number()).length(2))
})
export type PolygonFile = z.infer<typeof PolygonFileSchema>

export const readPoiygonFile = (content: PolygonFile): Polygon => ({
    points: content.points.map((point) => ({ x: point[0], y: point[1] }))
})
