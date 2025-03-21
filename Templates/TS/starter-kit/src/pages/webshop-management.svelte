<script lang="ts">
    import PageLayout from '../layouts/pageLayout.svelte';
    import HeaderOverlay from '../layouts/overlays/headerOverlay.svelte';
    import Form from '../components/form.svelte';
    import Input from '../components/input.svelte';
    import Button from '../components/button.svelte';
    import Card from '../components/card.svelte';
    import Loader from '../components/spinner.svelte';
    import { createTable, createRecord, getAllRecords, deleteRecord } from '../functions/auto-crud.ts';
  
    let name = '';
    let price: number = 0;
    let description = '';
    let image = '';
    let loading = true;
    let products: any[] = [];
  
    // Create the products table
    createTable('products', {
      name: 'text',
      price: 'float8',
      description: 'text',
      image: 'text'
    });
  
    const loadProducts = async () => {
      loading = true;
      products = await getAllRecords('products');
      loading = false;
    };
  
    const handleSubmit = async () => {
      await createRecord('products', { name, price, description, image });
      name = '';
      price = 0;
      description = '';
      image = '';
      loadProducts();
    };
  
    const removeProduct = async (id: number) => {
      await deleteRecord('products', id);
      loadProducts();
    };
  
    loadProducts();
  </script>
  
  <PageLayout>
    <div slot="header">
      <HeaderOverlay>
        <h1 class="text-3xl font-bold">Webshop Management</h1>
      </HeaderOverlay>
    </div>
  
    <div class="p-4">
      <h2 class="text-xl font-semibold mb-2">Add New Product</h2>
      <Form onSubmit={handleSubmit}>
        <Input id="name" type="text" bind:value={name} placeholder="Product name">
          <span slot="label">Name</span>
        </Input>
        <Input id="price" type="number" bind:value={price} placeholder="Product price">
          <span slot="label">Price</span>
        </Input>
        <Input id="description" type="text" bind:value={description} placeholder="Description">
          <span slot="label">Description</span>
        </Input>
        <Input id="image" type="text" bind:value={image} placeholder="Image URL">
          <span slot="label">Image URL</span>
        </Input>
        <Button type="submit" variant="primary">Add Product</Button>
      </Form>
  
      <h2 class="text-xl font-semibold mt-6 mb-2">Existing Products</h2>
      {#if loading}
        <Loader size="50px" />
      {:else if products.length === 0}
        <p>No products found.</p>
      {:else}
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          {#each products as product}
            <Card>
              <div slot="header">
                <h3 class="text-xl font-bold">{product.name}</h3>
              </div>
              <p>{product.description}</p>
              <p class="mt-2 text-lg font-semibold">${product.price}</p>
              <div slot="footer">
                <Button on:click={() => removeProduct(product.id)} variant="secondary">Delete</Button>
              </div>
            </Card>
          {/each}
        </div>
      {/if}
    </div>
  </PageLayout>
  