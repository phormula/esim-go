<script lang="ts">
  import { get } from '$lib/fetch';
  import Spinner from '$lib/components/Spinner.svelte';
  import type { Bundle, Country } from '$lib/interfaces';
  import { countries } from '$lib';
  import Select from 'svelte-select';
  import BundleView from './Bundle.svelte';

  export let region: string;
  let ready = false;
  let bundles: Bundle[];
  let destinationCountry: Country | undefined;
  let countryList: Country[] = countries.filter((country) => country.region === region);

  async function getBundles(countries: string[] = []) {
    ready = false;
    const response = await get('/catalogue', {
      page: 1,
      limit: 15,
      sort: 'description:asc',
      group: 'Standard eSIM Bundles',
      region,
      countries: countries.join(',')
    });
    bundles = response.bundles;
    ready = true;
  }

  $: {
    countryList = countries.filter((country) => country.region === region);
    countryList.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      } else if (a.name > b.name) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  $: if (region) {
    destinationCountry = undefined;
    getBundles();
  }

  async function listBundleByCountry() {
    await getBundles([String(destinationCountry?.iso)]);
  }
</script>

<Select
  class="country"
  inputStyles="height: border-box;"
  bind:value={destinationCountry}
  placeholder="Please Select Destination Country"
  itemId="iso"
  label="name"
  items={countryList}
  id="destinationCountry"
  on:select={listBundleByCountry}
/>
{#if ready}
  {#each bundles as bundle}
    <BundleView {bundle} />
  {:else}
    <div class="col-md-3"><span>No Bundle found</span></div>
  {/each}
{:else}
  <div class="col-md-12">
    <span class="load d-flex justify-content-center">
      <span class="me-3"> Loading Bundles</span>
      <Spinner classes="spinner" />
    </span>
  </div>
{/if}
