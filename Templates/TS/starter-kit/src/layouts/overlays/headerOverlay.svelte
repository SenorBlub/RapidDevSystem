<script module>
  </script>
  
  <script lang="ts">
  </script>
  
  <div class="flex flex-row w-full p-4 items-center h-full max-h-16">
    <a href="/main" class="flex items-center">
      <div id="logo-wrapper" class="flex flex-row gap-4 pr-0 w-auto h-full items-center">
        <slot name="logo">
          <img class="max-h-16 h-full w-auto py-2 object-contain" alt="logo" src="/favicon.png" />
        </slot>
        <slot name="company">
          <h1>SvelteQuickDevKit</h1>
        </slot>
        <div class="w-px border-l-2 border-slate-500 h-full mr-4 text-transparent py-1">1</div>
      </div>
    </a>
  
    <div id="navigation-wrapper" class="flex flex-row gap-4 items-center h-full">
      <slot>
        <!-- Fallback navigation content -->
        <nav class="flex gap-4">
          <a href="/home" class="text-gray-800 hover:text-gray-600">Home</a>
          <a href="/about" class="text-gray-800 hover:text-gray-600">About</a>
          <a href="/services" class="text-gray-800 hover:text-gray-600">Services</a>
          <a href="/contact" class="text-gray-800 hover:text-gray-600">Contact</a>
        </nav>
      </slot>
    </div>
  </div>
  
  <style>
    /* Additional styles if needed */
  </style>
  