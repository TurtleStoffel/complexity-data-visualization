import * as d3 from 'd3'

export interface Export {
    repositoryName: string;
    fileMetrics: [FileMetrics];
}

export interface FileMetrics {
    path: string;
    filename: string;
    extension: string;
    size: number;
}

export async function loadData() {
    console.log("Loading data from Complexity")

    return await d3.json('./metrics.json') as Export
}