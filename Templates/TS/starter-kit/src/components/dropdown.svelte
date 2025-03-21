<script lang="ts">
    import { createEventDispatcher, onMount } from 'svelte';
  
    let open = false;
    const dispatch = createEventDispatcher();
    let dropdownElement: HTMLElement;
  
    function toggle() {
      open = !open;
    }
  
    function handleDocumentClick(event: MouseEvent) {
      // Only close the dropdown if the click is outside the dropdown element
      if (dropdownElement && !dropdownElement.contains(event.target as Node)) {
        open = false;
      }
    }
  
    onMount(() => {
      document.addEventListener('click', handleDocumentClick);
      return () => {
        document.removeEventListener('click', handleDocumentClick);
      };
    });
  </script>
  
  <div class="relative inline-block" bind:this={dropdownElement}>
    {#if $$slots.trigger}
      <!-- When a trigger slot is provided, wrap it in a div acting as a button -->
      <div 
        role="button"
        tabindex="0"
        on:click|stopPropagation={toggle}
        on:keydown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggle();
          }
        }}
        class="cursor-pointer inline-block"
        aria-haspopup="true"
        aria-expanded={open}
      >
        <slot name="trigger"/>
      </div>
    {:else}
      <!-- Fallback trigger as a button -->
      <button 
        type="button"
        on:click|stopPropagation={toggle}
        class="cursor-pointer inline-block focus:outline-none"
        aria-haspopup="true"
        aria-expanded={open}
      >
        Dropdown
      </button>
    {/if}
    
    {#if open}
      <!-- Dropdown menu container with role and tabindex -->
      <div 
        class="absolute mt-2 bg-white border rounded shadow-md z-50"
        role="menu"
        tabindex="0"
        on:click|stopPropagation
        on:keydown|stopPropagation={(e) => { /* no-op to satisfy accessibility */ }}
      >
        <slot>
          <!-- Fallback dropdown menu content -->
          <ul class="py-2">
            <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer" role="menuitem">Option 1</li>
            <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer" role="menuitem">Option 2</li>
            <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer" role="menuitem">Option 3</li>
          </ul>
        </slot>
      </div>
    {/if}
  </div>
  
  <style>
    /* Additional styles if needed */
  </style>
  