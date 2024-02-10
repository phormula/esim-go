<script lang="ts">
  import { get } from '$lib/fetch';
  import Spinner from '$lib/components/Spinner.svelte';
  import type { Bundle, Country } from '$lib/interfaces';
  import { countries } from '$lib';
  import Select from 'svelte-select';
  import BundleCard from '$lib/components/home/bundle/BundleCard.svelte';
  import Search from '$lib/components/Search.svelte';

  export let region: string;
  let ready = false;
  let searchTerm: string;
  let debouncedSearch: number;
  let bundles: Bundle[];
  let destinationCountry: Country | undefined;
  let countryList: Country[] = countries.filter((country) => country.region === region);
  let page = 1;
  let perPage = 16;
  let totalPages: number;
  let loadingNew = false;

  async function fetchBundles(countries: string[]) {
    const response = await get('/catalogue', {
      region,
      countries: countries.join(','),
      ...(searchTerm ? { description: searchTerm } : {}),
      page,
      perPage
    });
    totalPages = response.pageCount;
    return response.bundles;
  }
  async function getBundles(countries: string[] = []) {
    ready = false;
    bundles = await fetchBundles(countries);
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
    page = 1;
    const countries = destinationCountry ? [destinationCountry.iso] : [];
    clearTimeout(debouncedSearch);
    if (searchTerm) {
      debouncedSearch = setTimeout(async () => {
        await getBundles(countries);
      }, 500);
    } else {
      await getBundles(countries);
    }
  }

  async function loadMoreBundles() {
    const countries = destinationCountry ? [destinationCountry.iso] : [];
    page = page + 1;
    loadingNew = true;
    const newBundles = await fetchBundles(countries);
    bundles = [...bundles, ...newBundles];
    loadingNew = false;
  }
</script>

<div class="col-md-12">
  <div class="row">
    <div class="col-md-6 mt-2">
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
    </div>
    <div class="col-md-6 mt-2">
      <Search on:search={() => listBundleByCountry()} classes="mb-2" bind:value={searchTerm} />
    </div>
  </div>
</div>

{#if ready}
  {#each bundles as bundle}
    <BundleCard {bundle} />
  {:else}
    <div class="col-md-3"><span>No Bundle found</span></div>
  {/each}
  {#if loadingNew}
    <div class="w-100 d-flex justify-content-center">
      <Spinner classes="spinner-grow spinner-grow-sm" />
    </div>
  {/if}
  {#if bundles.length && page < totalPages}
    <button class="btn btn-dark w-100" on:click={loadMoreBundles} disabled={loadingNew}>
      Load more
    </button>
  {/if}
{:else}
  <div class="col-md-12">
    <span class="load d-flex justify-content-center">
      <span class="me-3"> Loading Bundles</span>
      <Spinner classes="spinner" />
    </span>
  </div>
{/if}
