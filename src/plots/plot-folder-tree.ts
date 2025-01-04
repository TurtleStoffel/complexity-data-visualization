import * as Plot from '@observablehq/plot'
import { FileMetrics } from "../data";

export function setupPlotFolderTree(element: HTMLDivElement, metrics: [FileMetrics]) {
    const paths = metrics.map(metric => metric.path)

    const plot = Plot.plot({
        axis: null,
        marks: [
            Plot.tree(paths)
        ]
    })

    element.append(plot)
}