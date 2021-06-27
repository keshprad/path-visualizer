<script>
  import { AppBar, Button, Divider, Icon, Select } from 'svelte-materialify';
  import { mdiGithub, mdiHome } from '@mdi/js';
  import LegendDropdown from './LegendDropdown.svelte';
  import { algorithm, gridType } from '../stores';

  const gridTypes = [
    { name: 'Recursive Division Maze', value: 'recursive-division-maze' },
    { name: 'Simple Random Grid', value: 'simple-random' },
    { name: 'Blank Grid', value: 'blank' },
  ];
  const algorithms = [
    { name: 'A* search', value: 'a-star' },
    { name: "Dijkstra's", value: 'dijkstra' },
  ];
  let currAlgorithm;

  let socials = [
    { href: 'https://keshprad.ml', target: '', icon: mdiHome },
    {
      href: 'https://github.com/keshprad/path-visualizer',
      target: '_blank',
      icon: mdiGithub,
    },
  ];

  // Update currAlgorithm is algorithm store is changed
  $: currAlgorithm = $algorithm;
  // However, only update algorithm store if Run button pressed
  function runAlgorithm() {
    $algorithm = currAlgorithm;
  }
</script>

<AppBar>
  <span slot="title">Path Visualizer | keshprad</span>

  <div style="flex-grow:1" />

  <div class="mr-2">
    <Select outlined dense items={gridTypes} bind:value={$gridType}
      >Grid Type</Select
    >
  </div>
  <div class="mr-2">
    <Select outlined dense items={algorithms} bind:value={currAlgorithm}
      >Algorithm</Select
    >
  </div>
  <div class="mr-2">
    {#if currAlgorithm != null && currAlgorithm != ''}
      <Button class="primary-color" on:click={runAlgorithm}>Run</Button>
    {/if}
  </div>
  <Divider vertical />
  <LegendDropdown />
  <Divider vertical />
  {#each socials as { href, target, icon }}
    <a {href} {target} class="primary-text">
      <Button icon fab size="small">
        <Icon path={icon} />
      </Button>
    </a>
  {/each}
</AppBar>
