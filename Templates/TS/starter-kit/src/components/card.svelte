<script lang="ts">
  </script>
  
  <div class="card border rounded shadow p-4 bg-white">
    <header class="card-header mb-2">
      <slot name="header">
        <h2 class="text-xl font-bold">Card Title</h2>
      </slot>
    </header>
    <div class="card-body mb-2">
      <slot>
        <p>This is the card content. Customize this section with your own content.</p>
      </slot>
    </div>
    <footer class="card-footer text-right">
      <slot name="footer">
        <small>Card Footer</small>
      </slot>
    </footer>
  </div>
  
  <style>
    .card { margin: 1rem 0; }
    .card-header { border-bottom: 1px solid #e5e7eb; }
    .card-footer { border-top: 1px solid #e5e7eb; }
  </style>
  