import * as Plot from '@observablehq/plot'

export function setupPlot(element: HTMLDivElement) {
    const plot = Plot.plot({
        marks: [
            Plot.lineY([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
        ]
    })

    element.append(plot)
}