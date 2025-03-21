<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { tweened } from 'svelte/motion';
    import { cubicOut } from 'svelte/easing';
  
    export let type: 'info' | 'success' | 'warning' | 'error' = 'info';
    export let isVisible: boolean = false;
  
    // Auto-dismiss settings
    const dismissDelay = 3000; // time in ms before auto-dismiss starts
    const fadeDuration = 2000; // fade out duration in ms
  
    // Tweened opacity value (starts at fully opaque)
    const opacity = tweened(1, { duration: fadeDuration, easing: cubicOut });
  
    let dismissStartTimer: ReturnType<typeof setTimeout>;
    let dismissRemovalTimer: ReturnType<typeof setTimeout>;
    let isHovered = false;
  
    function startDismissTimer() {
      clearTimeout(dismissStartTimer);
      clearTimeout(dismissRemovalTimer);
      dismissStartTimer = setTimeout(() => {
        if (!isHovered) {
          // Start fading out: animate opacity from 1 to 0.
          opacity.set(0);
          // After the fade duration, remove the notification.
          dismissRemovalTimer = setTimeout(() => {
            isVisible = false;
            // Reset opacity for next time.
            opacity.set(1);
          }, fadeDuration);
        }
      }, dismissDelay);
    }
  
    function cancelDismissTimer() {
      clearTimeout(dismissStartTimer);
      clearTimeout(dismissRemovalTimer);
      // Cancel the fade-out: reset opacity back to 1.
      opacity.set(1);
    }
  
    onMount(() => {
      if (isVisible) startDismissTimer();
    });
  
    onDestroy(() => {
      cancelDismissTimer();
    });
  </script>
  
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  {#if isVisible}
    <div 
      role="alert"
      class="notification p-4 rounded shadow fixed top-4 right-4 min-w-[200px]"
      class:info={type === 'info'} 
      class:success={type === 'success'} 
      class:warning={type === 'warning'} 
      class:error={type === 'error'}
      on:mouseenter={() => {
        isHovered = true;
        cancelDismissTimer();
      }}
      on:mouseleave={() => {
        isHovered = false;
        startDismissTimer();
      }}
      style="opacity: {$opacity};"
    >
      <slot>
        <p>This is a default {type} notification. Customize this message as needed.</p>
      </slot>
    </div>
  {/if}
  
  <style>
    .notification { transition: opacity 0.2s ease-in-out; }
    .info { background-color: #e0f7fa; color: #006064; }
    .success { background-color: #e8f5e9; color: #1b5e20; }
    .warning { background-color: #fff3e0; color: #e65100; }
    .error { background-color: #ffebee; color: #b71c1c; }
  </style>
  