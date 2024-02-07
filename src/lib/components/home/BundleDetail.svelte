<script lang="ts">
  import { Modal, ModalBody, ModalFooter, ModalHeader } from '@sveltestrap/sveltestrap';
  import { get } from '$lib/fetch';
  import type { Bundle, BundleCountry } from '$lib/interfaces';
  import Spinner from '$lib/components/Spinner.svelte';
  import RoamingCountries from './RoamingCountries.svelte';

  export let bundle: Bundle;
  export let open = false;
  let bundleDetail: Bundle;
  let ready = false;

  function toggle() {
    open = !open;
  }

  async function getBundle() {
    ready = false;
    bundleDetail = await get(`/catalogue/bundle/${bundle.name}`, { name: bundle.name });
    ready = true;
  }

  function convertCountry(country: any) {
    return country as BundleCountry;
  }

  $: if (open) getBundle();
</script>

<Modal isOpen={open} centered {toggle} size="lg" scrollable>
  <ModalHeader {toggle}>{bundle.description}</ModalHeader>
  <ModalBody class="bd pe-4 p-0">
    {#if ready}
      <div class="row g-0">
        <div class="col-md-4">
          <img
            src={bundleDetail.imageUrl}
            class="img-fluid rounded-start"
            alt={bundleDetail.name}
          />
        </div>
        <div class="col-md-8 py-4 ps-4 detail">
          <div class="card-body">
            <h5 class="card-title">Bundle Details</h5>
            <p>{bundleDetail.description}</p>

            <h5 class="card-title">Base Country</h5>
            <span class="badge rounded-pill bg-white text-dark w-100 border mb-4">
              {convertCountry(bundleDetail.countries[0]).country.name}
            </span>
            <RoamingCountries countries={bundleDetail.roamingEnabled} />
          </div>
        </div>
      </div>
    {:else}
      <span class="load d-flex justify-content-center mt-4">
        <span class="me-3"> Loading Bundle Detail</span>
        <Spinner classes="spinner" />
      </span>
    {/if}
  </ModalBody>
  <ModalFooter>
    <button type="submit" class="btn btn-success">Buy</button>
    <a href="/#" class="btn btn-link" on:click|preventDefault={toggle}>Cancel</a>
  </ModalFooter>
</Modal>

<style lang="scss">
  .img-fluid {
    width: 100%;
    height: 38vw;
    object-fit: cover;
  }
  .detail {
    height: 38vw;
    overflow-y: scroll;
  }
</style>
