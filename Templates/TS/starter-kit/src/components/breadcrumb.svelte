<script lang="ts">
  </script>
  
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb flex space-x-2 items-center">
      <slot>
        <li class="breadcrumb-item">
          <a href="/" class="text-orange-400 hover:underline">Home</a>
        </li>
        <li class="breadcrumb-separator text-gray-500">/</li>
        <li class="breadcrumb-item">
          <a href="/section" class="text-orange-400 hover:underline">Section</a>
        </li>
        <li class="breadcrumb-separator text-gray-500">/</li>
        <li class="breadcrumb-item text-gray-500">Current</li>
      </slot>
    </ol>
  </nav>
  
  <style>
    .breadcrumb-item {
      display: inline;
    }
    .breadcrumb-separator {
      margin: 0 0.25rem;
    }
  </style>
  