import * as Plot from '@observablehq/plot'
import * as d3 from 'd3'
import { loadData } from './data'

export async function setupPlot(element: HTMLDivElement) {
    const metrics = await loadData()

    metrics.sort((a, b) => d3.descending(a.size, b.size))

    console.log(metrics);

    const plot = Plot.plot({
        marks: [
            Plot.rectY(metrics, Plot.binX({y: "count"}, {x: "size", thresholds: 20})),
        ]
    })

    element.append(plot)
}