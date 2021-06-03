<script>
  export let x,
    y,
    neighbors,
    weight,
    isSource = false,
    isTarget = false,
    isWall = false,
    isVisited = false,
    isPath = false;
</script>

<div
  class="node"
  class:isSource
  class:isTarget
  class:isWall
  class:isVisited
  class:isPath
/>

<style>
  div.node {
    height: 23px;
    width: 23px;
    margin: 1px;
    background-color: #727272;
  }

  div.isVisited {
    background-color: #8e68cc;
  }
  div.isPath {
    background-color: #56b3ff;
  }
  div.isSource {
    background-color: #2ce607;
  }
  div.isTarget {
    background-color: rgb(255, 0, 0);
  }
  div.isWall {
    background-color: #000000;
  }
</style>
