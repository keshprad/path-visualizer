<script>
  import { setContext } from 'svelte';
  import { MaterialApp } from 'svelte-materialify/src';
  import Footer from './components/Footer.svelte';
  import Grid from './components/Grid/Grid.svelte';
  import Navbar from './components/Navbar.svelte';
  import { algorithm, gridType } from './stores';

  // Set app theme
  let theme = 'dark';
  // Use to calculate height of content & num rows/cols
  let navHeight, footerHeight, windowWidth, windowHeight;
  $: contentHeight = windowHeight - navHeight - footerHeight;
  let nodeSize = 25;

  // Pass a reactive store as context
  setContext('runAlgorithmStore', algorithm);
  setContext('gridTypeStore', gridType);
</script>

<svelte:window bind:innerHeight={windowHeight} bind:innerWidth={windowWidth} />

<MaterialApp {theme}>
  <div class="navbar" bind:clientHeight={navHeight}>
    <Navbar />
  </div>
  <div
    class="content d-flex align-center"
    style="min-height: {contentHeight}px; height: 0px;"
  >
    {#if contentHeight && windowWidth}
      <Grid
        rows={Math.floor(contentHeight / nodeSize)}
        cols={Math.floor(windowWidth / nodeSize)}
      />
    {/if}
  </div>
  <div class="footer" bind:clientHeight={footerHeight}>
    <Footer />
  </div>
</MaterialApp>
