<script lang="ts">
    import HeaderOverlay from "../layouts/overlays/headerOverlay.svelte";
    import SidebarOverlay from "../layouts/overlays/sidebarOverlay.svelte";
    import FooterOverlay from "../layouts/overlays/footerOverlay.svelte";
  </script>
  
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <header class="bg-blue-600 p-4">
      <slot name="header">
        <!-- Fallback placeholder using HeaderOverlay -->
        <HeaderOverlay>
          <h1 class="text-3xl font-bold text-white">Landing Page Header</h1>
          <p class="mt-2 text-white">Your catchy tagline goes here.</p>
        </HeaderOverlay>
      </slot>
    </header>
  
    <!-- Main area with optional sidebar -->
    <div class="flex flex-1">
  
      <!-- Main content -->
      <main class="flex-1 bg-white p-8">
        <slot>
          <!-- Fallback main content placeholder -->
          <section class="mb-8">
            <h2 class="text-2xl font-bold mb-4">Welcome!</h2>
            <p>
              This is your main landing page content. Replace this placeholder text with your unique value proposition and other details.
            </p>
          </section>
          <section>
            <button class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
              Get Started
            </button>
          </section>
        </slot>
      </main>
    </div>
  
    <!-- Footer -->
    <footer class="bg-gray-800 text-white p-4 text-center">
      <slot name="footer">
        <!-- Fallback placeholder using FooterOverlay -->
        <FooterOverlay>
          <p class="text-sm">&copy; 2025 My Landing Page. All rights reserved.</p>
        </FooterOverlay>
      </slot>
    </footer>
  </div>
  
  <style>
    /* Additional styling can be added here */
  </style>
  