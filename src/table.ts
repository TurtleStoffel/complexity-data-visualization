import * as d3 from 'd3'
import { SizeMetric } from './data'

export async function setupTable(element: HTMLTableElement, metrics: [SizeMetric]) {
    // Sort a copy of the metrics array to prevent mutation of the original
    const sortedMetrics = [...metrics].sort((a, b) => d3.ascending(a.path, b.path))

    console.log(sortedMetrics);

    const table = d3
        .create("table")
        .attr("class", "table-fixed w-full")
    
    const tableHeaders = ["name", "extension", "size"]

    // Table Header
    table.append("thead")
        .append("tr")
        .selectAll("th")
        .data(tableHeaders)
        .join("th")
        .text(d => d)
    
    // Table Body
    table.append("tbody")
        .selectAll("tr")
        .data(sortedMetrics)
        .join("tr")
        .selectAll("td")
        .data(d => [d.filename, d.extension, d.size])
        .join("td")
        .text(d => d)
        .attr("class", "truncate")

    element.append(table.node()!!)
}