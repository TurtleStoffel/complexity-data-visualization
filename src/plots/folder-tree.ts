import * as Plot from '@observablehq/plot'
import { SizeMetric } from "../data";

export function setupFolderTree(element: HTMLDivElement, metrics: [SizeMetric]) {
    const paths = metrics.map(metric => metric.path)

    const plot = Plot.plot({
        axis: null,
        marks: [
            Plot.tree(paths)
        ]
    })

    element.append(plot)
}