<script lang="ts">
  import { Modal, ModalBody, ModalFooter, ModalHeader } from '@sveltestrap/sveltestrap';
  import CreditCard from 'svelte-credit-cards';
  import Spinner from '$lib/components/Spinner.svelte';
  import { regions } from '$lib';
  import Region from './Region.svelte';
  import Bundle from './FilterBundle.svelte';

  let number = '';
  let name = '';
  let cvc = '';
  let expiry = '';
  let openCC = false;

  let open = false;
  let status: string;
  let iccid: string;
  let destinationCountry: string;
  let bundle: string;
  let selected: number;
  let selectedRegion: string;
  let bundleResults: any;

  function handleSubmit() {
    status = 'Checking ICCID';
    console.log(iccid, destinationCountry, bundle);
    setTimeout(() => {
      status = 'Loading Bundle';
      toggleCC();
    }, 1000);
    toggle();
  }

  function toggle() {
    open = !open;
  }

  function toggleCC() {
    toggle();
    openCC = !openCC;
  }

  function onSubmit() {
    open = true;
    status = 'Applying Bundle';
    setTimeout(() => {
      iccid = '';
      destinationCountry = '';
      bundle = '';

      open = false;
      toggleCC();
    }, 5000);
  }

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
    <!-- <form on:submit|preventDefault={handleSubmit}>
      <div class="row g-2">
        <div class="col-md-6">
          <div class="input-group">
            <div class="input-group-text mb-3"><i class="fa-solid fa-user"></i></div>
            <div class="form-floating mb-3">
              <input
                type="text"
                name="iccid"
                class="form-control"
                id="iccid"
                placeholder="ICCID"
                required
                bind:value={iccid}
              />
              <label for="iccid">eSim ICCID</label>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="input-group">
            <Select
              class="country"
              inputStyles="height: border-box;"
              bind:value={destinationCountry}
              placeholder="Please Select Destination Country"
              itemId="code"
              label="name"
              items={countries}
              id="destinationCountry"
              required
            />
          </div>
        </div>
        <div class="col-md-6">
          <div class="input-group">
            <div class="input-group-text mb-3"><i class="fa fa-key"></i></div>
            <div class="form-floating mb-3">
              <input
                type="number"
                name="bundle"
                class="form-control"
                id="bundle"
                placeholder="Bundle"
                required
                bind:value={bundle}
              />
              <label for="bundle">Bundle</label>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-7"></div>
        <div class="col">
          <button class="btn btn-success p-3 rounded-5 w-50" type="submit"> Buy </button>
        </div>
      </div>
    </form> -->
  </div>
</div>

<Modal isOpen={open} centered {toggle} backdrop="static" modalClassName={open ? 'show' : ''}>
  <ModalBody class="bd">
    <span class="load d-flex justify-content-center">
      <span class="me-3"> {status}</span>
      <Spinner classes="spinner" />
    </span>
  </ModalBody>
</Modal>

<Modal isOpen={openCC} centered toggle={toggleCC} backdrop="static" size="lg">
  <ModalHeader toggle={toggleCC}>Credit / Debit Card</ModalHeader>
  <form on:submit|preventDefault={onSubmit}>
    <ModalBody class="bd">
      <div class="row">
        <div class="col-md-6">
          <div class="mb-3">
            <label for="ccnumber">Number</label>
            <input
              class="form-control"
              bind:value={number}
              name="ccnumber"
              id="ccnumber"
              required
            />
          </div>
          <div class="mb-3">
            <label for="ccname">Name</label>
            <input class="form-control" bind:value={name} name="ccname" id="ccname" required />
          </div>
          <div class="mb-3">
            <label for="cvc">CVC</label>
            <input
              class="form-control"
              bind:value={cvc}
              name="cvc"
              id="cvc"
              maxlength="3"
              required
            />
          </div>
          <div class="mb-3">
            <label for="ccexpiry">Expiry Date</label>
            <input
              class="form-control"
              bind:value={expiry}
              name="ccexpiry"
              id="ccexpiry"
              maxlength="4"
              required
            />
          </div>
        </div>
        <div class="col-md-6">
          <CreditCard {number} {name} {cvc} {expiry} preview />
        </div>
      </div>
    </ModalBody>
    <ModalFooter>
      <button type="submit" class="btn btn-success">Add</button>
      <a href="/#" class="btn btn-link" on:click|preventDefault={toggle}>Cancel</a>
    </ModalFooter>
  </form>
</Modal>

<style>
  :global(.bd) {
    min-height: 100px;
  }
  :global(.country) {
    height: calc(3.5rem + calc(var(--bs-border-width) * 2));
    min-height: calc(3.5rem + calc(var(--bs-border-width) * 2));
    line-height: 1.25;
  }
</style>
