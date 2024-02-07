<script lang="ts">
  import type { BundleCountry } from '$lib/interfaces';
  import { Tooltip } from '@sveltestrap/sveltestrap';
  import RoamingImg from './RoamingImg.svelte';

  export let countries: BundleCountry[];
  let display: 'grid' | 'tile' = 'tile';

  function getCountryFlag(country: BundleCountry) {
    return `https://portal.esim-go.com/assets/packages/flag/res/1x1/${country.country.iso.toLowerCase()}.svg`;
  }

  function handleDisplay() {
    if (display === 'grid') {
      display = 'tile';
    } else if (display === 'tile') {
      display = 'grid';
    }
  }
</script>

<div class="d-flex bd-highlight align-items-center mb-2">
  <h6 class="flex-grow-1">Roaming Countries</h6>
  <button class="btn btn-dark me-2" on:click={handleDisplay}>
    {#if display === 'grid'}
      <i class="bi bi-grid-fill"></i>
    {:else if display === 'tile'}
      <i class="bi bi-grip-horizontal"></i>
    {/if}
  </button>
</div>
{#each countries as country, i}
  {#if display === 'grid'}
    <div
      class="d-flex justify-content-between align-items-center border rounded-pill px-3 py-1 my-2"
    >
      <RoamingImg src={getCountryFlag(country)} alt={country.country.name} />
      <div id="networks-{i}">
        {country.networks ? country.networks.length : ''} Networks
        <i class="fa fa-info-circle"></i>
      </div>
      <Tooltip target="networks-{i}" placement="left">
        {#each country.networks as network}
          <p>{network.name}</p>
        {/each}
      </Tooltip>
    </div>
  {:else if display === 'tile'}
    <RoamingImg src={getCountryFlag(country)} alt={country.country.name} />
  {/if}
{/each}
