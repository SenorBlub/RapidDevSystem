<script lang="ts">
    export let onSubmit: (event: Event) => void = () => {};
  </script>
  
  <form class="form space-y-4" on:submit|preventDefault={onSubmit}>
    <slot>
      <!-- Default slot content if none provided -->
      <div>
        <label for="input1" class="block text-sm font-medium text-gray-700">
          Input Label
        </label>
        <input
          id="input1"
          type="text"
          class="mt-1 block w-full border-gray-300 rounded-md"
          placeholder="Enter text here"
        />
      </div>
      <button type="submit" class="mt-2 p-2 bg-orange-400 text-white rounded">
        Submit
      </button>
    </slot>
  </form>
  
  <style>
    .form {
      max-width: 400px;
    }
  </style>
  