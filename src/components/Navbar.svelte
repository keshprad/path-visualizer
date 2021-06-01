<script>
  import { AppBar, Button, Divider, Icon, Select } from 'svelte-materialify';
  import { mdiGithub, mdiHome } from '@mdi/js';
  import LegendDropdown from './LegendDropdown.svelte';

  const algorithms = [{ name: "Dijkstra's", value: 'dijkstra' }];
  let currAlgorithm = '';

  let socials = [
    { href: 'https://keshprad.ml', target: '', icon: mdiHome },
    {
      href: 'https://github.com/keshprad/path-visualizer',
      target: '_blank',
      icon: mdiGithub,
    },
  ];
</script>

<AppBar>
  <span slot="title">Path Visualizer | keshprad</span>

  <div style="flex-grow:1" />

  <div class="ma-2">
    <Select outlined dense items={algorithms} bind:value={currAlgorithm}
      >Algorithm</Select
    >
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
