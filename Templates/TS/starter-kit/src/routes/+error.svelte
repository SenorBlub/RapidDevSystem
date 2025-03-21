<script lang="ts">
    export let error: Error;
    export let status: number;
  </script>
  
  <h1>Error {status}</h1>
  <p>{error.message}</p>
  