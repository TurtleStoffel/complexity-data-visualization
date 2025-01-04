import * as d3 from 'd3'

import { SizeMetric } from "../data";

export function setupD3FolderTree(metrics: [SizeMetric]) {
    const paths = metrics
        .filter(metric => metric.path.split('/').length < 3)
        .map(metric => metric.path)

    const root = d3.stratify().path((d) => d as string)(paths)
    console.log(root)

    const tree = d3.tree().size([400, 200]);
    tree(root);
    
    d3.select('svg g.nodes')
        .selectAll('circle.node')
        .data(root.descendants())
        .join('circle')
        .classed('node', true)
        .attr('cx', d => d.x as number)
        .attr('cy', d => d.y as number)
        .attr('r', 4);
    
    d3.select('svg g.text')
        .selectAll('text')
        .data(root.descendants())
        .join('text')
        .attr('x', d => d.x as number)
        .attr('y', d => d.y as number)
        .attr('fill', 'currentColor')
        .text(d => d.id as string);
    
    d3.select('svg g.links')
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.6)
        .selectAll('line.link')
        .data(root.links())
        .join('line')
        .classed('link', true)
        .attr("stroke-width", 2)
        .attr('x1', d => d.source.x as number)
        .attr('y1', d => d.source.y as number)
        .attr('x2', d => d.target.x as number)
        .attr('y2', d => d.target.y as number);
}