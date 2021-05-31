<script>
    import GraphNode from './GraphNode.svelte';

    export let rows, cols

    const createGraph = (rows, cols) => Array(rows).fill().map(() => Array(cols));
    let graph = createGraph(rows, cols);
</script>

<div class="graph">
    {#each graph as row}
        <div class="row">
            {#each row as node}
                 <GraphNode />
            {/each}
        </div>
    {/each}
</div>

<style>
    div.graph {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    div.row {
        display: flex;
    }
</style>