<script lang="ts">
    export let text: string = "Tooltip text";
  </script>
  
  <div class="relative inline-block group">
    <slot>
      Hover over me
    </slot>
    <div class="transition-opacity transform duration-200 ease-out opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 
                absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-700 text-white text-sm rounded py-2 px-3 pointer-events-none
                w-fit min-w-[150px] max-w-xs break-words">
      <slot name="tooltip">
        {text}
      </slot>
    </div>
  </div>
  
  <style>
    /* No additional styles needed */
  </style>
  