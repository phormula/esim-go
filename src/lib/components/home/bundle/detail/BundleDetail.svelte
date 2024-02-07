<script lang="ts">
  import { Modal, ModalBody, ModalFooter } from '@sveltestrap/sveltestrap';
  import { get } from '$lib/fetch';
  import type { Bundle, BundleCountry } from '$lib/interfaces';
  import Spinner from '$lib/components/Spinner.svelte';
  import RoamingCountries from './RoamingCountries.svelte';
  import Icon from './Icon.svelte';
  import { convertBundleSize } from '$lib';

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
  <ModalBody class="bd pe-md-4 p-0">
    {#if ready}
      <div class="row g-0">
        <div class="col-md-4">
          <div class="card bg-dark text-white">
            <img src={bundleDetail.imageUrl} class="card-img img-fluid" alt={bundleDetail.name} />
            <div class="card-img-overlay d-flex align-items-end flex-column">
              <div class="flex-grow-1">
                <h5 class="card-title text-white">{bundle.countries[0].name}</h5>
                {bundle.description}
              </div>
              <div>
                <div class="d-flex flex-wrap gap-4">
                  <Icon
                    icon="bi-database-fill"
                    content={convertBundleSize(bundleDetail.dataAmount)}
                  />
                  <Icon icon="bi-clock-fill" content="{bundleDetail.duration} days" />
                  <Icon icon="bi-globe" content="{bundleDetail.roamingEnabled.length} Countries" />
                  <Icon
                    icon="bi-speedometer2"
                    content="{bundleDetail.speed ? bundleDetail.speed : 'Unknown'} "
                  />
                  <Icon
                    icon="bi-skip-end-circle"
                    content="Autostart {bundleDetail.autostart ? 'Enabled' : 'Disabled'} "
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-8 py-4 px-4 pe-md-0 detail">
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
  @include media-breakpoint-down(md) {
    .img-fluid {
      height: 78vw !important;
    }
    .detail {
      height: 78vw !important;
    }
  }
  .card-img-overlay {
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000 100%);
  }
</style>
