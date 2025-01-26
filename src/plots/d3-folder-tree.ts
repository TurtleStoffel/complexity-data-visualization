import * as d3 from "d3";

import { FileMetrics } from "../data";

export function setupD3FolderTree(metrics: [FileMetrics]) {
    const paths = metrics
        .filter((metric) => metric.path.split("/").length < 3)
        .map((metric) => metric.path);

    const root = d3.stratify().path((d) => d as string)(paths);
    console.log(root);

    const tree = d3.tree().size([400, 200]);
    tree(root);

    // X and Y are flipped to render the tree horizontally
    d3.select("svg g.folder-tree-nodes")
        .selectAll("circle.node")
        .data(root.descendants())
        .join("circle")
        .classed("node", true)
        .attr("cx", (d) => d.y as number)
        .attr("cy", (d) => d.x as number)
        .attr("r", 4);

    d3.select("svg g.folder-tree-text")
        .selectAll("text")
        .data(root.descendants())
        .join("text")
        .attr("x", (d) => d.y as number)
        .attr("y", (d) => d.x as number)
        .attr("fill", "currentColor")
        .text((d) => d.id as string);

    d3.select("svg g.folder-tree-links")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.6)
        .selectAll("line.link")
        .data(root.links())
        .join("line")
        .classed("link", true)
        .attr("stroke-width", 2)
        .attr("x1", (d) => d.source.y as number)
        .attr("y1", (d) => d.source.x as number)
        .attr("x2", (d) => d.target.y as number)
        .attr("y2", (d) => d.target.x as number);
}
