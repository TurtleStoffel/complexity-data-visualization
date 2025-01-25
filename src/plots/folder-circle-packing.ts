import * as d3 from 'd3'

import { FileMetrics } from "../data";

const depth = 5

export function getFolder(path: string) {
    if (path === 'root') return null

    const parts = path.split('/')

    if (parts.length === 1) return 'root'

    return parts.slice(0, parts.length - 1).join('/')
}

export function getFolders(path: string) {
    const parts = path.split('/')

    return parts.map((_, index) => {
        if (index === 0) return 'root'

        return parts.slice(0, index).join('/')
    })
}

export function prepareFolderCirclePackingData(metrics: [FileMetrics]) {
    const allFolders = new Set<string>()
    const depthLimitedMetrics = metrics
        .filter(metric => metric.path.split('/').length < depth)
        .map((metric) => {
            // Add all folders to the set of existing folders
            const folders = getFolders(metric.path)
            folders.forEach((folder: string) => allFolders.add(folder))

            return {
                numberOfImports: metric.numberOfImports,
                parentId: getFolder(metric.path),
                id: metric.path,
            }
        })
    
    allFolders.forEach(folder => {
        depthLimitedMetrics.push({
            numberOfImports: 0,
            id: folder,
            parentId: getFolder(folder),
        })
    })

    return depthLimitedMetrics
}

export function setupFolderCirclePacking(metrics: [FileMetrics]) {
    const depthLimitedMetrics = prepareFolderCirclePackingData(metrics)

    const color = d3.scaleLinear()
        .domain([0, depth])
        .range(['hsl(152,80%,80%)', 'hsl(228,30%,40%)'])
        .interpolate(d3.interpolateHcl)

    const root = d3.stratify()(depthLimitedMetrics)
    root.sum(d => d.numberOfImports)
    root.sort((a, b) => b.value - a.value)

    const circlePacking = d3.pack().size([400, 400]).padding(4);
    circlePacking(root);

    d3.select('svg g.folder-circle-nodes')
        .selectAll('circle.node')
        .data(root.descendants())
        .join('circle')
        .attr('fill', d => d.children ? color(d.depth) : 'lightsteelblue')
        .attr('cx', d => d.y as number)
        .attr('cy', d => d.x as number)
        .attr('r', d => d.r as number)
        // Show border when hovering
        .on("mouseover", function() { d3.select(this).attr("stroke", "#000"); })
        .on("mouseout", function() { d3.select(this).attr("stroke", null); });

    d3.select('svg g.folder-circle-text')
        .selectAll('text')
        .data(root.descendants())
        .join('text')
        // Hide text if not direct children of root
        .style("fill-opacity", d => d.parent === root ? 1 : 0)
        .style("display", d => d.parent === root ? "inline" : "none")
        .attr('x', d => d.y as number)
        .attr('y', d => d.x as number)
        .text(d => d.id as string)
}