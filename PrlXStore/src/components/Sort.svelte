<script>
	import { onMount } from 'svelte';
	import Choice from './Choice.svelte';

	// Define a variable to hold the sorting options
	let sortBy = ['price', 'rating', 'name'];
	let sortOrder = 'asc'; // Default value, adjust as needed

	let category = ''; // Define the category variable

	// Function to toggle sort order and update URL
	function toggleSortOrder() {
		sortOrder = sortOrder === 'asc' ? 'desc' : 'asc'; // Toggle sort order
		updateURL();
	}

	// Function to update the URL with the current sort parameters and redirect
	function updateURL() {
		const url = new URL(window.location);
		const params = new URLSearchParams(url.search);

		// Handle sortBy parameters
		if (params.has('sortBy')) {
			let currentSortBy = params.get('sortBy');
			// Check if currentSortBy starts with '-'. If so, remove '-' to toggle back to asc.
			if (currentSortBy.startsWith('-')) {
				currentSortBy = currentSortBy.substring(1); // Remove the '-' prefix
				sortOrder = 'asc'; // Set to ascending
			} else if (sortOrder === 'desc') {
				currentSortBy = `-${currentSortBy}`; // Add '-' prefix for descending
			}

			// Update the sortBy parameter with the new value
			params.set('sortBy', currentSortBy);
		}

		// Update the URL and redirect
		url.search = params.toString();
		// alert('Updated URL:', url.toString()); // Log the updated URL
		window.location.href = url.toString(); // Perform a redirect to the new URL
	}
</script>

<ul class="menu m-4 space-y-4">
	<h1 class="text-2xl font-bold mb-4 transition-opacity duration-400 hover:opacity-50 mt-4">
		Sort By
	</h1>

	<!-- Render Choice components dynamically based on sorting options -->
	{#each sortBy as option}
		<Choice sortBy={option} href={`?sortBy=${option}&category=${category}`} />
	{/each}
</ul>

<div class="form-control w-full max-w-xs py-0 px-2 mt-2">
	<div class="flex items-center space-x-2">
		<p class={`text-sm ${sortOrder === 'asc' ? 'text-green-400' : 'text-red-400'}`}>
			{sortOrder === 'asc' ? 'Ascending' : 'Descending'}
		</p>
		<button class="flex items-center justify-center p-2 text-gray-400" on:click={toggleSortOrder}>
			{#if sortOrder === 'asc'}
				^
			{:else}
				v
			{/if}
		</button>
	</div>
</div>

<style>
	.menu {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.transition-opacity {
		transition: opacity 0.4s ease;
	}

	.hover\:opacity-50:hover {
		opacity: 0.5;
	}
</style>
