<script>
  export let row, col, isStart, isTarget;
</script>

<div class="node" class:isStart class:isTarget />

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
</style>
