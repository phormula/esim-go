<script>
  import Header from '$lib/components/header/Header.svelte';
  import '$lib/assets/main.scss';
  import { navigating } from '$app/stores';
  import PreloadingIndicator from '$lib/components/PreloadingIndicator.svelte';
  import Footer from '$lib/components/Footer.svelte';
</script>

<div class="app">
  {#if $navigating}
    <PreloadingIndicator />
  {/if}
  <Header />

  <div class="slot">
    <slot />
  </div>

  <Footer />
</div>

<style>
  .app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  /* .slot {
    margin-top: 64px;
  } */
</style>
