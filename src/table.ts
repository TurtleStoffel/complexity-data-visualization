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
        .attr("direction", "ascending")
        .on("click", function (_, d) {
            const direction = d3.select(this).attr("direction")
            if (d === "size") {
                sortedMetrics.sort((a, b) => { 
                    if (direction === "ascending") {
                        return d3.ascending(a.size, b.size)
                    }
                    else {
                        return d3.descending(a.size, b.size)
                    }
                })

                renderTableBody(sortedMetrics)
            }
            d3.select(this).attr("direction", direction === "ascending" ? "descending" : "ascending")
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