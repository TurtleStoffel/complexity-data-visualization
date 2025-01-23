import * as d3 from 'd3'

import { FileMetrics } from "../data";

export function setupFolderCirclePacking(metrics: [FileMetrics]) {
    const paths = metrics
        .filter(metric => metric.path.split('/').length < 3)
        .map(metric => metric.path)

    const color = d3.scaleLinear()
        .domain([0, 3])
        .range(['hsl(152,80%,80%)', 'hsl(228,30%,40%)'])
        .interpolate(d3.interpolateHcl)

    const root = d3.stratify().path((d) => d as string)(paths)
    root.sum(d => 1)
    root.sort((a, b) => b.value - a.value)
    console.log(root)

    const circlePacking = d3.pack().size([400, 400]).padding(4);
    circlePacking(root);

    d3.select('svg g.folder-circle-nodes')
        .selectAll('circle.node')
        .data(root.descendants())
        .join('circle')
        .attr('fill', d => d.children ? color(d.depth) : 'lightsteelblue')
        .attr('cx', d => d.y as number)
        .attr('cy', d => d.x as number)
        .attr('r', d => d.r as number);

    d3.select('svg g.folder-circle-text')
        .selectAll('text')
        .data(root.descendants())
        .join('text')
        .attr('x', d => d.y as number)
        .attr('y', d => d.x as number)
        .text(d => d.id as string)
}