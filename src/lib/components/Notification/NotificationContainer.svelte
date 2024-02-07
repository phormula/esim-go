<script lang="ts">
  import { fade } from 'svelte/transition';
  import { notifications } from '$lib/store';
  import Notification from '$lib/components/Notification/Notification.svelte';

  export let location = 'top-right';
</script>

{#if $notifications.length}
  <div id="toast-container" class="toast-{location}" transition:fade>
    {#each $notifications as notification, i}
      <Notification
        index={i}
        message={notification.message}
        type={notification.type}
        duration={notification.duration}
      />
    {/each}
  </div>
{/if}
