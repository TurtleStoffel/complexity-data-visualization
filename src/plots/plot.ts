import * as Plot from '@observablehq/plot'
import * as d3 from 'd3'
import { SizeMetric } from '../data'

export async function setupPlot(element: HTMLDivElement, metrics: [SizeMetric]) {
    // Sort a copy of the metrics array to prevent mutation of the original
    const sortedMetrics = [...metrics]
        .filter(d => d.size < 2500)
        .sort((a, b) => d3.descending(a.size, b.size))

    console.log(sortedMetrics);

    const plot = Plot.plot({
        marks: [
            Plot.rectY(sortedMetrics, Plot.binX({y: "count"}, {x: "size", thresholds: 20})),
        ]
    })

    element.append(plot)
}