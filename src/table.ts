import * as d3 from 'd3'

export async function setupTable(element: HTMLTableElement) {
    console.log("Loading data from Complexity")

    const metrics = await d3.json('./metrics.json') as [object]

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
        .data(d => Object.values(d))
        .enter()
        .append("td")
        .text(d => d)

    element.append(table.node()!!)
}