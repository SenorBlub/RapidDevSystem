<!-- File: Sidebar.svelte -->
<script lang="ts">
    // Component-specific logic (if needed)
  </script>
  
  <div class="bg-gray-100 text-gray-800 p-4">
    <h2 class="font-semibold text-lg mb-2">Sidebar</h2>
    <div class="flex flex-col gap-2">
      <slot>
        <!-- Fallback sidebar content -->
        <a href="#" class="hover:text-orange-600">Default Link 1</a>
        <a href="#" class="hover:text-orange-600">Default Link 2</a>
        <a href="#" class="hover:text-orange-600">Default Link 3</a>
      </slot>
    </div>
  </div>
  