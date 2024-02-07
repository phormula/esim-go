<script lang="ts">
  import { regions } from '$lib';
  import Region from './Region.svelte';
  import Bundle from './bundle/BundleList.svelte';

  let selected: number;
  let selectedRegion: string;
  let bundleResults: any;

  function handleRegionSelect(index: number) {
    selectedRegion = '';
    selected = index;
    selectedRegion = regions[selected];
    if (bundleResults) bundleResults.scrollIntoView({ behavior: 'smooth' });
  }
</script>

<div class="card rounded-5 p-md-5">
  <div class="card-body">
    <h5 class="card-title">Buy E-Bundle</h5>
    <p class="card-text">We provide convenient e-Sim bundles worldwide at local afordable prices</p>
    <p class="card-text">Select Region</p>

    <div class="row g-4 mb-5">
      {#each regions as region, i}
        <div class="col-md-3">
          <Region {region} active={selected === i} on:select={() => handleRegionSelect(i)} />
        </div>
      {/each}
    </div>
    <hr />
    <div class="row g-4 mb-5" bind:this={bundleResults}>
      {#if selectedRegion}
        <Bundle region={selectedRegion} />
      {/if}
    </div>
  </div>
</div>
