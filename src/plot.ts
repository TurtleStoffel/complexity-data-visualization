import * as Plot from '@observablehq/plot'

const dummyData = [
    {'filename': 'file1', 'size': 100},
    {'filename': 'file2', 'size': 200},
    {'filename': 'file3', 'size': 300},
    {'filename': 'file4', 'size': 400},
    {'filename': 'file5', 'size': 500},
    {'filename': 'file6', 'size': 600},
    {'filename': 'file7', 'size': 700},
    {'filename': 'file8', 'size': 800},
    {'filename': 'file9', 'size': 900},
    {'filename': 'file10', 'size': 1000},
]

export function setupPlot(element: HTMLDivElement) {
    const plot = Plot.plot({
        marks: [
            Plot.rectY(dummyData, Plot.binX({y: "count"}, {x: "size", thresholds: 9})),
        ]
    })

    element.append(plot)
}