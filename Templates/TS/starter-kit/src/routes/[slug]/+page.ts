import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import type { SvelteComponent } from 'svelte';

export const load: PageLoad = async ({ params }) => {
	console.log('Load function triggered with params:', params);

	// Dynamically import all .svelte files from src/pages
	const pages = import.meta.glob('../../pages/*.svelte');
	const availablePages = Object.keys(pages);
	console.log('Available pages:', availablePages);

	const slug = params.slug;
	const pagePath = `../../pages/${slug}.svelte`;
	console.log('Looking for page at:', pagePath);

	if (!(pagePath in pages)) {
		throw error(404, `Page "${slug}" not found. Available pages: ${availablePages.join(', ')}`);
	}

	const module = (await pages[pagePath]()) as { default: typeof SvelteComponent };
	console.log('Module loaded successfully for:', slug);

	// Return the dynamically-imported component
	return {
		Page: module.default
	};
};
