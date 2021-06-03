<script>
  import { Snackbar } from 'svelte-materialify';

  export let active,
    timeout = null;
</script>

<Snackbar class="flex-column" bind:active top center {timeout}>
  <h6>
    <slot name="context"><em>Snackbar was provided no context!</em></slot>
  </h6>
  {#if $$slots.actions}
    <div class="mt-1 primary-text">
      <slot name="actions" />
    </div>
  {/if}
</Snackbar>
