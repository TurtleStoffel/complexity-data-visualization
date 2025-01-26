import * as d3 from "d3";
import { FileMetrics } from "../data";

const FILENAME = "filename";
const EXTENSION = "extension";
const SIZE = "size";
const IMPORTS = "numberOfImports";

export async function setupTable(metrics: [FileMetrics]) {
    // Sort a copy of the metrics array to prevent mutation of the original
    const sortedMetrics = [...metrics].sort((a, b) =>
        d3.ascending(a.path, b.path),
    );

    console.log(sortedMetrics);

    renderTableBody(sortedMetrics);
}

function renderTableBody(sortedMetrics: FileMetrics[]) {
    const tableHeaders = [FILENAME, EXTENSION, SIZE, IMPORTS];

    // Table Header
    d3.select("table#table>thead>tr")
        .selectAll("th")
        .data(tableHeaders)
        .join("th")
        .text((d) => d)
        .attr("direction", "ascending")
        .on("click", function (_, d) {
            handleTableSorting.call(this, d, sortedMetrics);
        });

    d3.select("table#table>tbody")
        .selectAll("tr")
        .data(sortedMetrics)
        .join("tr")
        .selectAll("td")
        .data((d) => [d.filename, d.extension, d.size, d.numberOfImports])
        .join("td")
        .text((d) => d)
        .attr("class", "truncate");
}

function handleTableSorting(
    this: d3.BaseType | HTMLTableCellElement,
    header: string,
    sortedMetrics: FileMetrics[],
) {
    const direction = d3.select(this).attr("direction");
    if (header === FILENAME) {
        sortedMetrics.sort((a, b) => {
            if (direction === "ascending") {
                return d3.ascending(a.filename, b.filename);
            } else {
                return d3.descending(a.filename, b.filename);
            }
        });

        renderTableBody(sortedMetrics);
    } else if (header === SIZE) {
        sortedMetrics.sort((a, b) => {
            if (direction === "ascending") {
                return d3.ascending(a.size, b.size);
            } else {
                return d3.descending(a.size, b.size);
            }
        });

        renderTableBody(sortedMetrics);
    } else if (header === IMPORTS) {
        sortedMetrics.sort((a, b) => {
            if (direction === "ascending") {
                return d3.ascending(a.numberOfImports, b.numberOfImports);
            } else {
                return d3.descending(a.numberOfImports, b.numberOfImports);
            }
        });

        renderTableBody(sortedMetrics);
    }
    d3.select(this).attr(
        "direction",
        direction === "ascending" ? "descending" : "ascending",
    );
}
