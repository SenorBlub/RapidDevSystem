<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    export let type: 'button' | 'submit' | 'reset' = 'submit';
    export let variant: 'primary' | 'secondary' = 'primary';
  
    const dispatch = createEventDispatcher();
  
    function handleClick(event: MouseEvent) {
      // Forward the click event
      dispatch('click', event);
    }
  </script>
  
  <button
    type={type}
    class="p-2 rounded transition cursor-pointer
      {variant === 'primary' ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}
      {variant === 'secondary' ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' : ''}"
    on:click={handleClick}
  >
    <slot>Click me</slot>
  </button>
  