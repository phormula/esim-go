<script lang="ts">
  export let title: string;
</script>

<div class="d-flex justify-content-center align-items-center">
  <div class="flex-fill"><hr /></div>
  <h3 class="mx-4 my-2">{title}</h3>
  <div class="flex-fill"><hr /></div>
</div>

<style>
  hr {
    border-width: 3px;
  }
</style>
