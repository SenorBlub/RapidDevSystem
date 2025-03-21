<script lang="ts">
	import type { SvelteComponent } from 'svelte';

	// This `data` prop is supplied by +page.ts
	export let data: {
		Page: typeof SvelteComponent;
	};
</script>

<!-- Render the dynamic page component we returned from load() -->
<svelte:component this={data.Page} />
