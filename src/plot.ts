import * as Plot from '@observablehq/plot'
import * as d3 from 'd3'

interface SizeMetric {
    path: string;
    size: number;
}

export async function setupPlot(element: HTMLDivElement) {
    console.log("Loading data from Complexity")

    const metrics = await d3.json('./metrics.json') as [SizeMetric]
    metrics.sort((a, b) => d3.descending(a.size, b.size))

    console.log(metrics);

    const plot = Plot.plot({
        marks: [
            Plot.rectY(metrics, Plot.binX({y: "count"}, {x: "size", thresholds: 20})),
        ]
    })

    element.append(plot)
}