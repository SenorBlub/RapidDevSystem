<script context="module">
    // Module-level code (if needed)
  </script>
  
  <script lang="ts">
    // Component-specific logic (if needed)
  </script>
  
  <!-- Layout Markup: A responsive component shell with named slots -->
  <div class="flex flex-col min-h-screen">
  
    <!-- Header section -->
    <header class="p-6 shadow-lg">
      <slot name="header">
        <div 
        class="bg-gradient-to-r from-orange-600 via-orange-400 to-yellow-400 text-white py-6 px-4 text-center shadow-lg"
      >
        <h1 class="text-3xl md:text-5xl font-bold">Welcome to My Page</h1>
        <p class="text-sm md:text-lg mt-2">
          This is the header section, which expands gracefully on larger screens.
        </p>
      </div>
      </slot>
    </header>
  
    <!-- Main content wrapper: uses flex to place sidebar and main content side by side on md+ screens -->
    <div class="flex flex-col md:flex-row flex-1">
      <!-- Sidebar section -->
      <aside class="w-full md:w-1/4 p-6 border-b md:border-b-0 md:border-r">
        <slot name="sidebar">
            <div
      class="bg-gray-100 p-6 rounded-lg shadow-md"
    >
      <h2 class="text-xl font-semibold text-gray-800 mb-2">Sidebar Content</h2>
      <p class="text-gray-600">
        This is the sidebar slot content. On larger devices, it can appear beside
        the main content area.
      </p>
    </div>
        </slot>
      </aside>
  
      <!-- Main content (default slot) -->
      <main class="w-full md:w-3/4 p-6">
        <slot>
            <div class="text-gray-800">
                <h1 class="text-gray-800">
                  Welcome to My Page
                </h1>
                <p class="text-gray-600">
                  This is the main content area of the page. On mobile devices, it stacks
                  above (or below) the sidebar, and on larger screens, it will sit beside
                  the sidebar for a more spacious layout.
                </p>
              </div>
        </slot> <!-- Default slot for main content -->
      </main>
    </div>
  
    <!-- Footer section -->
    <footer class="p-4 text-center mt-auto shadow-inner">
      <slot name="footer">
        <div
      class="bg-gray-800 text-white p-4 text-center shadow-inner"
    >
      <h2 class="text-lg font-semibold mb-1">Footer Section</h2>
      <p class="text-sm">
        This is the footer slot content, scaled to fit any device size.
      </p>
    </div>
      </slot>
    </footer>
  </div>
  
  <style>
    /* You can add scoped styles here if you need something beyond Tailwind */
  </style>
  