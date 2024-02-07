<script lang="ts">
  import { onMount } from 'svelte';
  export let src: string;
  export let alt: string;

  let loaded = false;
  let failed = false;
  let loading = false;
  let width = '30px';

  onMount(() => {
    const img = new Image();
    img.src = src;
    loading = true;

    img.onload = () => {
      loading = false;
      loaded = true;
    };
    img.onerror = () => {
      loading = false;
      failed = true;
    };
  });
</script>

{#if loaded}
  <img {src} class="rounded-circle border me-1 mb-1" {alt} {width} />
{:else if loading}
  <img
    src="https://c.tenor.com/On7kvXhzml4AAAAi/loading-gif.gif"
    class="rounded-circle border me-1 mb-1"
    {width}
    alt="Loading..."
  />
{/if}
