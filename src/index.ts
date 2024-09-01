import * as fs from 'fs'
import { Point, PolygonFileSchema, readPoiygonFile as readPolygonFile } from 'polygon'
import { isPointInsideVectors, toVectors } from 'raycast'
import * as yargs from 'yargs'

const args = yargs
    .option('input', {
        alias: 'i',
        description: 'Input file path',
        demandOption: true
    })
    .option('x', {
        description: 'target point x',
        type: 'number',
        demandOption: true
    })
    .option('y', {
        description: 'target point y',
        type: 'number',
        demandOption: true
    })
    .help()
    .parseSync()

const content = JSON.parse(fs.readFileSync(args.input as string).toString())

const polygonFile = PolygonFileSchema.parse(content)

const polygon = readPolygonFile(polygonFile)

const vectors = toVectors(polygon)

const toNumber = (n: unknown) => (isNaN(Number(n)) ? undefined : Number(n))

const targetPoint: Point = { x: toNumber(args.x) ?? 0, y: toNumber(args.y) ?? 0 }

const isInside = isPointInsideVectors(targetPoint, vectors)

console.log(
    `Polygon ${!isInside ? 'does not ' : ''}contains point (${targetPoint.x},${targetPoint.y}).`
)
process.exit(isInside ? 0 : 1)
