import * as Plot from "@observablehq/plot"

export function setupPlot(element: HTMLDivElement) {
    const plot = Plot.rectY({length: 10000}, Plot.binX({y: "count"}, {x: Math.random})).plot();
    element.append(plot);
}
