<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let value: string;
  export let classes = '';
</script>

<div class="input-group">
  <input
    class="form-control {classes}"
    type="search"
    placeholder="Search Bundles e.g. 1gb"
    id="product-search-input"
    bind:value
    on:input={() => dispatch('search')}
  />
</div>

<style>
  input {
    height: 40px;
  }
</style>
