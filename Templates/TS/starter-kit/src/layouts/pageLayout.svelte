<script context="module">
  // Module-level logic goes here, if needed
</script>

<script lang="ts">
      import HeaderOverlay from "./overlays/headerOverlay.svelte";
    import SidebarOverlay from "./overlays/sidebarOverlay.svelte"
    import FooterOverlay from "./overlays/footerOverlay.svelte"
</script>

<div class="flex flex-col min-h-screen w-full overflow-x-hidden">
  
  <!-- HEADER -->
  <header class="w-full flex flex-row items-center p-4">
    <slot name="header">
      <div class="bg-gradient-to-r from-orange-600 via-orange-400 to-yellow-400 text-white py-6 px-4 text-center shadow-lg">
        <HeaderOverlay>
        </HeaderOverlay>
      </div>
    </slot>
  </header>

  <!-- BODY SECTION -->
  <div class="flex flex-col md:flex-row flex-1 w-full min-w-0">
    
    <!-- SIDEBAR -->
    <aside class="p-4 w-full md:w-64 md:flex-shrink-0">
      <slot name="sidebar">
        <SidebarOverlay>
        </SidebarOverlay>
      </slot>
    </aside>

    <!-- MAIN CONTENT -->
    <main class="flex-1 p-4 min-w-0 overflow-x-auto">
      <slot>
        <!-- Fallback main content -->
        <div class="p-4">
          <h2 class="text-2xl font-bold">Default Main Content</h2>
          <p class="text-sm">
            This is the default main content fallback. Replace this with your custom content.
          </p>
        </div>
      </slot>
    </main>
  </div>

  <!-- FOOTER -->
  <footer class="w-full p-4">
    <slot name="footer">
      <FooterOverlay>
      </FooterOverlay>
    </slot>
  </footer>
</div>

<style>
  /* You can add any scoped CSS here if needed */
</style>
