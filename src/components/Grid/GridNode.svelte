<script>
  export let x,
    y,
    neighbors,
    weight,
    isStart = false,
    isTarget = false,
    isWall = false;
</script>

<div class="node" class:isStart class:isTarget class:isWall />

<style>
  div.node {
    height: 23px;
    width: 23px;
    margin: 1px;
    background-color: #727272;
  }
  div.isStart {
    background-color: #2ce607;
  }
  div.isTarget {
    background-color: rgb(255, 0, 0);
  }
  div.isWall {
    background-color: #000000;
  }
</style>
