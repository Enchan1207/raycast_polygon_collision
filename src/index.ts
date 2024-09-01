import * as fs from 'fs'
import { PolygonFileSchema, readPoiygonFile as readPolygonFile } from 'polygon'
import { isPointInsideVectors, toVectors } from 'raycast'
import * as yargs from 'yargs'

const args = yargs
    .option('input', {
        alias: 'i',
        description: 'Input file path',
        demandOption: true
    })
    .help()
    .parseSync()

const content = JSON.parse(fs.readFileSync(args.input as string).toString())

const polygonFile = PolygonFileSchema.parse(content)

const polygon = readPolygonFile(polygonFile)

const vectors = toVectors(polygon)

const result = isPointInsideVectors({ x: 0, y: 0 }, vectors)
console.log(result)
