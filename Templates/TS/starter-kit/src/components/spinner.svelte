<script lang="ts">
    export let size: string = "40px";
    export let color: string = "#3b82f6"; 
  </script>
  
  <div
    class="spinner inline-block"
    style="width: {size}; height: {size}; border: 4px solid {color}; border-top-color: transparent;"
  ></div>
  
  <style>
    .spinner {
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
  
    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  </style>
  