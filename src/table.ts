import * as d3 from 'd3'
import { loadData } from './data'

export async function setupTable(element: HTMLTableElement) {
    const metrics = await loadData()
    metrics.sort((a, b) => d3.ascending(a.path, b.path))

    console.log(metrics);

    const table = d3.create("table")

    // Table Header
    table.append("thead")
        .append("tr")
        .selectAll("th")
        .data(["name", "extension", "size"])
        .enter()
        .append("th")
        .text(d => d)
    
    // Table Body
    table.append("tbody")
        .selectAll("tr")
        .data(metrics)
        .enter()
        .append("tr")
        .selectAll("td")
        .data(d => [d.filename, d.extension, d.size])
        .enter()
        .append("td")
        .text(d => d)

    element.append(table.node()!!)
}