<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let region: string;
  export let active: boolean;

  const dispatch = createEventDispatcher();
</script>

<button
  class="btn shadow-sm w-100 py-5 border fw-bold"
  class:btn-primary={active}
  class:btn-white={!active}
  on:click={() => dispatch('select')}
>
  {region}
</button>

<style lang="scss">
  button {
    &:hover {
      box-shadow: $box-shadow !important;
      border: 5px solid;
    }
  }
</style>
