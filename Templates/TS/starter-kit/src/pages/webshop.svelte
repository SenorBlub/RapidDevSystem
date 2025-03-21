<script lang="ts">
    import PageLayout from '../layouts/pageLayout.svelte';
    import HeaderOverlay from '../layouts/overlays/headerOverlay.svelte';
    import Card from '../components/card.svelte';
    import Loader from '../components/spinner.svelte';
    import { createTable, getAllRecords } from '../functions/auto-crud.ts';
  
    let products: any[] = [];
    let loading = true;
  
    // Create the table if it doesn't exist
    createTable('products', {
      name: 'text',
      price: 'float8',
      description: 'text',
      image: 'text'
    });
  
    // Fetch products
    getAllRecords('products').then(res => {
      products = res;
      loading = false;
    });
  </script>
  
  <PageLayout>
    <div slot="header">
      <HeaderOverlay>
        <h1 class="text-3xl font-bold">Webshop</h1>
      </HeaderOverlay>
    </div>
  
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {#if loading}
        <Loader size="50px" />
      {:else if products.length === 0}
        <p>No products available.</p>
      {:else}
        {#each products as product}
          <Card>
            <div slot="header">
              <h3 class="text-xl font-semibold">{product.name}</h3>
            </div>
            <p>{product.description}</p>
            <p class="text-lg font-bold mt-2">${product.price}</p>
            <div slot="footer">
              <button class="bg-blue-500 text-white px-4 py-1 rounded mt-2">Buy Now</button>
            </div>
          </Card>
        {/each}
      {/if}
    </div>
  </PageLayout>
  