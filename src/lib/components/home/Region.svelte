<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let region: string;
  export let active: boolean;

  const dispatch = createEventDispatcher();
</script>

<button
  class="btn shadow-sm w-100 py-5"
  class:btn-primary={active}
  class:btn-white={!active}
  on:click={() => dispatch('select')}
>
  {region}
</button>
