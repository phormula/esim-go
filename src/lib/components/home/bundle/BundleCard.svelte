<script lang="ts">
  import { convertBundleSize } from '$lib';
  import type { Bundle } from '$lib/interfaces';
  import BundleDetail from './detail/BundleDetail.svelte';

  export let bundle: Bundle;
  let open = false;
</script>

<div
  class="col-md-3"
  on:click={() => (open = true)}
  on:keyup={() => (open = true)}
  on:keydown={() => (open = true)}
  role="button"
  aria-pressed="false"
  tabindex="-1"
>
  <div class="card bg-dark text-white">
    <img src={bundle.imageUrl} class="card-img" alt={bundle.name} />
    <div class="card-img-overlay">
      <h5 class="card-title text-white">{bundle.countries[0].name}</h5>
      <p class="card-text">
        {bundle.description}
      </p>
      <div class="box-bg p-2 rounded-3">{convertBundleSize(bundle.dataAmount)}</div>
    </div>
  </div>
</div>

<BundleDetail bind:open {bundle} />

<style lang="scss">
  .col-md-3 {
    .card {
      cursor: pointer;
      &:hover {
        box-shadow: $box-shadow !important;
        border: 5px solid;
      }
    }
  }
  @include media-breakpoint-up(md) {
    .card-img {
      height: 10vw !important;
    }
  }
  .card-img {
    width: 100%;
    height: 38vw;
    object-fit: cover;
  }
  .card-img-overlay {
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000 100%);
  }
  .box-bg {
    position: absolute;
    bottom: 0;
    left: 80%;
  }
</style>
