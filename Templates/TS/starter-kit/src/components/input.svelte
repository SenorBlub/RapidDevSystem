<script lang="ts">
    export let type: string = 'text';
    export let placeholder: string = '';
    export let value: string = '';
    export let id: string = '';
  </script>
  
  <div class="input-wrapper mb-4">
    <label for={id} class="block text-sm font-medium text-gray-700">
      <slot name="label">Input Label</slot>
    </label>
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      bind:value={value}
      class="mt-1 block w-full border-gray-300 rounded-md p-2"
    />
  </div>
  
  <style>
    .input-wrapper {
      margin-bottom: 1rem;
    }
  </style>
  