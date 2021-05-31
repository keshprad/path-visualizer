<script>
  import { AppBar, Button, Select } from 'svelte-materialify';
  import { Icon } from 'svelte-materialify/src';
  import { mdiGithub, mdiHome } from '@mdi/js';

  const algorithms = [{ name: "Dijkstra's", value: 'dijkstra' }];
  let currAlgorithm = '';
</script>

<AppBar>
  <span slot="title">Path Visualizer | keshprad</span>

  <div style="flex-grow:1" />

  <Select outlined dense items={algorithms} bind:value={currAlgorithm}
    >Algorithm</Select
  >
  <a href="https://keshprad.ml" class="primary-text">
    <Button icon fab size="small">
      <Icon path={mdiHome} />
    </Button>
  </a>
  <a
    href="https://github.com/keshprad/path-visualizer"
    target="_blank"
    class="primary-text"
  >
    <Button icon fab size="small">
      <Icon path={mdiGithub} />
    </Button>
  </a>
</AppBar>
