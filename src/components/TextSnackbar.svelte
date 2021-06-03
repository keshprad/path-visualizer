<script>
  import { Snackbar, Button } from 'svelte-materialify';

  export let active, timeout;
</script>

<Snackbar class="flex-column primary-text" bind:active top center {timeout}>
  <h4>No path was found!</h4>
</Snackbar>
