<script lang="ts">
  import { notifications } from '$lib/store';

  export let duration: number;
  export let index: number;
  export let type: string;
  export let message: string;
  let percentage = 100;

  const notificationTitle = {
    error: 'Error',
    success: 'Success'
  };

  function closeNotification() {
    notifications.update((current) => current.filter((_, i) => i !== index));
  }

  function updateProgress(callback: () => void, duration: number) {
    let elapsedTime = 0;
    let interval = 10; // Update interval in milliseconds

    const update = () => {
      percentage = (1 - elapsedTime / duration) * 100;
      if (elapsedTime < duration) {
        elapsedTime += interval;
        setTimeout(update, interval);
      } else {
        callback();
      }
    };

    update();
  }

  updateProgress(closeNotification, duration);
</script>

<div class="toast show toast-{type}" aria-live="assertive">
  <div class="toast-progress" style="width: {percentage}%;" />
  <button type="button" class="toast-close-button" on:click={() => closeNotification()}>×</button>
  <div class="toast-title text-capitalize">{type}</div>
  <div class="toast-message">{message}</div>
</div>
