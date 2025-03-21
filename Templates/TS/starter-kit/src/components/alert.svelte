<script lang="ts">
    import { onMount } from 'svelte';
  
    export let type: 'info' | 'warning' | 'error' | 'success' = 'info';
    // Auto dismiss settings:
    export let autoDismiss: boolean = true;
    export let dismissDelay: number = 3000; // in ms
  
    let visible = true;
  
    function closeAlert() {
      visible = false;
    }
  
    onMount(() => {
      if (autoDismiss) {
        const timeout = setTimeout(() => {
          closeAlert();
        }, dismissDelay);
        return () => clearTimeout(timeout);
      }
    });
  </script>
  
  {#if visible}
    <div class="alert p-4 rounded border relative" 
         class:info={type === 'info'} 
         class:warning={type === 'warning'} 
         class:error={type === 'error'} 
         class:success={type === 'success'}>
      <slot>
        <p>This is a default alert message. Please pay attention!</p>
      </slot>
      <!-- Close button -->
      <button class="absolute top-0 right-0 mt-2 mr-2 text-xl leading-none" on:click={closeAlert}>
        &times;
      </button>
    </div>
  {/if}
  
  <style>
    .alert { margin: 1rem 0; }
    .info { background-color: #e0f7fa; border: 1px solid #4dd0e1; color: #006064; }
    .warning { background-color: #fff3e0; border: 1px solid #ffb74d; color: #e65100; }
    .error { background-color: #ffebee; border: 1px solid #ef9a9a; color: #b71c1c; }
    .success { background-color: #e8f5e9; border: 1px solid #81c784; color: #1b5e20; }
    button {
      background: transparent;
      border: none;
      cursor: pointer;
    }
  </style>
  