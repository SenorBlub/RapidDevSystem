<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { fade, scale } from 'svelte/transition';
  
    // Exposed prop that can be bound from a parent component
    export let isOpen: boolean = false;
  
    const dispatch = createEventDispatcher();
  
    // When we want to close (or toggle) the modal, fire the "update:isOpen" event:
    function closeModal() {
      dispatch('update:isOpen', false);
    }
  </script>
  
  {#if isOpen}
    <div class="fixed inset-0 flex items-center justify-center z-50">
      <div
        class="absolute inset-0 bg-black opacity-50"
        role="button"
        tabindex="0"
        on:click={closeModal}
        on:keydown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            closeModal();
          }
        }}
        transition:fade
      ></div>
      <div
        class="relative bg-white opacity-100 rounded-lg shadow-xl p-6 max-w-lg w-full z-60"
        role="dialog"
        aria-modal="true"
        tabindex="0"
        on:click|stopPropagation
        on:keydown={(e) => {
          if (e.key === 'Escape') {
            closeModal();
          }
        }}
        transition:scale={{ duration: 200 }}
      >
        <header class="mb-4 pb-2">
          <slot name="header">
            <h2 class="text-2xl font-bold">Modal Title</h2>
          </slot>
        </header>
  
        <div class="mb-4">
          <slot>
            <p>This is the default modal content. Customize as needed.</p>
          </slot>
        </div>
  
        <footer class="text-right pt-2">
          <slot name="footer">
            <Button class="px-4 py-2 rounded transition-colors focus:outline-none"
            on:click={closeModal}>
            close
            </Button>
          </slot>
        </footer>
      </div>
    </div>
  {/if}
  
  <style>
    /* Optional: ensure our custom z-index is applied */
    .z-60 {
      z-index: 60;
    }
  </style>
  