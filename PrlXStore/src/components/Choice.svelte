<script>
	import { filterStore } from '../stores/filterStore.js'; // Import the store
	import { get } from 'svelte/store'; // Import get to read the store value

	export let category = '';
	export let href = '';
	export let sortBy = '';

	// Compute the URL based on category or sortBy
	let Name = '';
	if (category) {
		Name = `${category}`;
	} else if (sortBy) {
		Name = `${sortBy}`;
	}

	// Function to get the current URL with updated query parameters
	function getUpdatedHref() {
		const url = new URL(window.location.href);
		const params = new URLSearchParams(url.search);

		// Update or add new parameters
		if (category) {
			if (category === 'All') {
				params.delete('category');
			} else {
				params.set('category', category);
			}
		}
		if (sortBy) {
			params.set('sortBy', sortBy);
		}

		return `${url.pathname}?${params.toString()}`;
	}

	function handleClick() {
		// Update the store with the new values and log the updated store
		filterStore.update((store) => {
			const updatedStore = {
				...store,
				category: category,
				sortBy: sortBy
			};
			// console.log('Updated Store:', updatedStore); // Log the updated store state
			return updatedStore;
		});

		// Redirect to the new URL
		window.location.href = getUpdatedHref();
	}
</script>

<li
	class="card card-side bg-transparent cursor-pointer transform hover:scale-105 transition-all duration-300 group"
	on:click={handleClick}
>
	<div
		class="w-8 h-8 bg-zinc-900 rounded flex items-center justify-center group-hover:bg-slate-200 p-1"
		aria-hidden="true"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="w-6 h-6 text-gray-600"
		>
			<path d="M4 6h16M4 12h16M4 18h16"></path>
		</svg>
	</div>
	<div class="card-body p-2">
		<h2 class="font-semibold">{Name}</h2>
	</div>
</li>

<style>
	.card {
		display: flex;
		align-items: center;
	}

	.card-body {
		flex: 1;
	}

	.group:hover .group-hover\:text-black {
		color: black;
	}

	.group:hover .group-hover\:bg-slate-200 {
		background-color: #e5e7eb;
	}

	/* Ensure transitions are smooth */
	.transition-all {
		transition: all 0.3s ease;
	}
</style>
