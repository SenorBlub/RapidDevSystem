<script lang="ts">
    import PageLayout from "../layouts/pageLayout.svelte";
    import HeaderOverlay from "../layouts/overlays/headerOverlay.svelte";
    import SidebarOverlay from "../layouts/overlays/sidebarOverlay.svelte"
    import FooterOverlay from "../layouts/overlays/footerOverlay.svelte"
  </script>
  
  <!-- Use the layout and populate its named/default slots -->
  <PageLayout>
    <!-- HEADER SLOT -->
    <div slot="header" class="bg-gray-200 text-gray-800 w-full">
        <HeaderOverlay>
        </HeaderOverlay>
    </div>
  
    <!-- SIDEBAR SLOT -->
  <div slot="sidebar" class="bg-gray-100 text-gray-800">
    <SidebarOverlay>
    </SidebarOverlay>
  </div>
  
    <!-- FOOTER SLOT -->
  <div slot="footer" class="bg-gray-300 text-gray-800">
    <FooterOverlay>
    </FooterOverlay>
  </div>
  
    <!-- DEFAULT SLOT (MAIN CONTENT) -->
    <div class="bg-white text-gray-800">
      <h2 class="font-bold text-xl">Main Content</h2>
      <p>
        This is the main page content. It has basic text styling, but no widths,
        heights, or other shape-related properties.
      </p>
    </div>
  </PageLayout>
  