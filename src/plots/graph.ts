import * as d3 from "d3";

interface CustomNode extends d3.SimulationNodeDatum {
    id: string;
}

export function setupGraph(element: HTMLDivElement) {
    const width = 640;
    const height = 400;

    const nodes: CustomNode[] = [
        {
            id: "test-1",
        },
        {
            id: "test-2",
        },
    ];
    const links: d3.SimulationLinkDatum<CustomNode>[] = [
        {
            source: "test-1",
            target: "test-2",
        },
    ];

    const simulation = d3
        .forceSimulation(nodes)
        .force(
            "link",
            d3.forceLink(links).id((d) => (d as CustomNode).id),
        )
        .force("charge", d3.forceManyBody())
        .force("x", d3.forceX())
        .force("y", d3.forceY());

    const svg = d3
        .create("svg")
        .attr("width", "100%")
        //.attr("height", height)
        .attr("viewBox", [-width / 2, -height / 2, width, height])
        .attr("id", "graph");

    // Add a line for each link, and a circle for each node.
    const link = svg
        .append("g")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.6)
        .selectAll("line")
        .data(links)
        .join("line")
        .attr("stroke-width", 2);

    const node = svg
        .append("g")
        .attr("stroke", "#fff")
        .attr("stroke-width", 1.5)
        .selectAll("circle")
        .data(nodes)
        .join("circle")
        .attr("r", 5);

    simulation.on("tick", () => {
        link.attr("x1", (d) => (d.source as CustomNode).x!!)
            .attr("y1", (d) => (d.source as CustomNode).y!!)
            .attr("x2", (d) => (d.target as CustomNode).x!!)
            .attr("y2", (d) => (d.target as CustomNode).y!!);

        node.attr("cx", (d) => d.x!!).attr("cy", (d) => d.y!!);
    });

    element.append(svg.node()!!);
}
