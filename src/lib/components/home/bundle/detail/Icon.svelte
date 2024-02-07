<script lang="ts">
  export let content: string;
  export let icon: string;
</script>

<div class="d-flex align-items-center justify-content-center flex-column">
  <i class="bi {icon} fs-1"></i>
  <span>{content}</span>
</div>
