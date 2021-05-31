<script>
  import { AppBar, Button, Icon } from 'svelte-materialify';
  import { mdiGithub, mdiHome } from '@mdi/js';
</script>

<AppBar>
  <span slot="title">Path Visualizer | keshprad</span>

  <div style="flex-grow:1" />

  <a href="https://keshprad.ml">
    <Button icon fab size="small">
      <Icon path={mdiHome} />
    </Button>
  </a>
  <a href="https://github.com/keshprad/path-visualizer" target="_blank">
    <Button icon fab size="small">
      <Icon path={mdiGithub} />
    </Button>
  </a>
</AppBar>
