import * as Plot from '@observablehq/plot'
import * as d3 from 'd3'

export async function setupPlot(element: HTMLDivElement) {
    console.log("Loading data from Complexity")

    const metrics = await d3.json('./metrics.json') as [object]

    console.log(metrics);

    const plot = Plot.plot({
        marks: [
            Plot.rectY(metrics, Plot.binX({y: "count"}, {x: "size"})),
        ]
    })

    element.append(plot)
}