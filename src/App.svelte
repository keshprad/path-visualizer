<script>
  import { MaterialApp } from 'svelte-materialify';
  import Footer from './components/Footer.svelte';
  import Graph from './components/Graph.svelte';
  import Navbar from './components/Navbar.svelte';

  let theme = 'dark';
  let navHeight, footerHeight, windowWidth, windowHeight;
  $: contentHeight = windowHeight - navHeight - footerHeight;
  let nodeSize = 25;
</script>

<svelte:window bind:innerHeight={windowHeight} bind:innerWidth={windowWidth} />

<MaterialApp {theme}>
  <div class="navbar" bind:clientHeight={navHeight}>
    <Navbar />
  </div>
  <div
    class="content d-flex align-center"
    style="min-height: {contentHeight}px;"
  >
    {#if contentHeight && windowWidth}
      <Graph
        rows={Math.floor(contentHeight / nodeSize)}
        cols={Math.floor(windowWidth / nodeSize)}
      />
    {/if}
  </div>
  <div class="footer" bind:clientHeight={footerHeight}>
    <Footer />
  </div>
</MaterialApp>
