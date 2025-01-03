import * as d3 from 'd3'
import { SizeMetric } from './data'

export async function setupTable(metrics: [SizeMetric]) {
    // Sort a copy of the metrics array to prevent mutation of the original
    const sortedMetrics = [...metrics].sort((a, b) => d3.ascending(a.path, b.path))

    console.log(sortedMetrics);

    
    renderTableBody(sortedMetrics)
}

function renderTableBody(sortedMetrics: SizeMetric[]) {
    const tableHeaders = ["filename", "extension", "size"]

    // Table Header
    d3.select("table#table>thead>tr")
        .selectAll("th")
        .data(tableHeaders)
        .join("th")
        .text(d => d)
        .on("click", (_, d) => {
            if (d === "size") {
                sortedMetrics.sort((a, b) => d3.descending(a.size, b.size))
                renderTableBody(sortedMetrics)
            }
        })

    d3.select("table#table>tbody")
        .selectAll("tr")
        .data(sortedMetrics)
        .join("tr")
        .selectAll("td")
        .data(d => [d.filename, d.extension, d.size])
        .join("td")
        .text(d => d)
        .attr("class", "truncate")
}