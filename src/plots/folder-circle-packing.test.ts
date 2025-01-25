import { expect, test } from 'vitest'
import { getFolders, prepareFolderCirclePackingData } from './folder-circle-packing'

import { FileMetrics } from "../data";

test('getFolder should strip filename from path', () => {
    const path = 'src/plots/filename.ts'
    expect(getFolders(path)).toEqual(expect.arrayContaining([
        'src/plots',
        'src',
        'root',
    ]))
})

test('getFolder returns root when only passing a filename', () => {
    const path = 'filename.ts'
    expect(getFolders(path)).toEqual(['root'])
})

test('prepareFolderCirclePackingData add folders', () => {
    const metrics: [FileMetrics] = [
        {path: 'src/plots/filename.ts', filename: 'filename.ts', extension: 'ts', size: 1, numberOfImports: 1},
    ]

    const data = prepareFolderCirclePackingData(metrics)

    expect(data).toEqual(
        expect.arrayContaining([
            expect.objectContaining({
                id: 'src/plots',
                parentId: 'src',
            }),
            expect.objectContaining({
                id: 'src',
                parentId: 'root',
            }),
            expect.objectContaining({
                id: 'root',
                parentId: null,
            }),
        ])
    )
})
