<script>
	import { onMount } from 'svelte';
	import ProductCard from '../components/ProductCard.svelte';

	let products = [];
	let currentPage = 1;
	const itemsPerPage = 10;
	let totalPages = 0;
	let totalItems = 0;
	let show_products = true;
	let error = '';
	let loading = true;
	let Crumbs = {};

	// Additional query parameters (e.g., filters, sorting)
	let queryParams = {};

	// Track which breadcrumb items are visible
	let visibleBreadcrumbs = new Set();

	onMount(() => {
		// Extract query parameters from the URL
		const urlParams = new URLSearchParams(window.location.search);
		if (urlParams.has('sortBy')) {
			queryParams._sort = urlParams.get('sortBy');
		}
		if (urlParams.has('category')) {
			queryParams.category = urlParams.get('category');
		}

		// Initialize visibleBreadcrumbs
		for (const [key, value] of Object.entries(queryParams)) {
			visibleBreadcrumbs.add(key);
		}

		fetchProducts(currentPage);
	});

	async function fetchProducts(page = 1) {
		loading = true;
		try {
			// Construct query string from queryParams
			const params = {
				_page: page,
				_per_page: itemsPerPage,
				...queryParams
			};

			// Remove undefined or empty parameters
			for (const key in params) {
				if (params[key] === undefined || params[key] === '') {
					delete params[key];
				}
			}

			console.log('Query Params:', params);

			Crumbs = params;

			const queryString = new URLSearchParams(params).toString();
			// console.log('Query String:', queryString);
			const response = await fetch(`http://localhost:3000/products?${queryString}`);
			if (!response.ok) {
				throw new Error('Failed to fetch products');
			}
			const data = await response.json();
			if (data && data.data && Array.isArray(data.data)) {
				products = data.data;
				totalPages = data.pages || 1; // Total number of pages from the API
				totalItems = data.items || 0; // Total number of items from the API
				show_products = true;
			} else {
				throw new Error('Unexpected data structure');
			}
		} catch (err) {
			error = err.message;
			show_products = false;
		} finally {
			loading = false;
		}
	}

	function handlePageChange(newPage) {
		if (newPage < 1 || newPage > totalPages) return;
		currentPage = newPage;

		updateURL();
		fetchProducts(newPage);
	}

	function updateURL() {
		const newUrl = new URL(window.location.href);

		// Update URL with current page and query parameters
		newUrl.searchParams.set('page', currentPage);
		for (const [key, value] of Object.entries(queryParams)) {
			if (value) {
				newUrl.searchParams.set(key, value);
			} else {
				newUrl.searchParams.delete(key);
			}
		}
		window.history.pushState({}, '', newUrl);
	}

	function handleRemoveFilter(key) {
		if (key === '_sort') {
			delete queryParams['sortBy'];
		}
		delete queryParams[key]; // Remove the filter from queryParams
		currentPage = 1; // Reset to first page

		// Update visibility
		visibleBreadcrumbs.delete(key);
		// Update URL
		const newUrl = new URL(window.location.href);
		if (key === '_sort') {
			newUrl.searchParams.delete('sortBy');
		}
		newUrl.searchParams.delete(key); // Remove the filter from URL
		window.history.pushState({}, '', newUrl);

		fetchProducts(currentPage);
	}

	// Reactive declaration to ensure breadcrumb visibility is updated
	$: visibleBreadcrumbs;
	$: queryParams;
	$: Crumbs;
</script>

<h2 class="text-4xl font-bold text-center mb-8 text-white">Featured Products</h2>

<!-- Breadcrumb Section -->
<nav aria-label="breadcrumb">
	<ul class="breadcrumb">
		{#if Object.keys(queryParams).length > 0}
			{#each Object.entries(Crumbs) as [key, value]}
				{#if visibleBreadcrumbs.has(key)}
					<li class="breadcrumb-item" on:click={() => handleRemoveFilter(key)}>
						<span class="font-semibold">{key}: </span>
						<span>{value}</span>
					</li>
				{/if}
			{/each}

			<li class="breadcrumb-item">
				<span class="font-semibold">Page: </span>
				<span>{currentPage}</span>
			</li>
		{/if}
	</ul>
</nav>

<!-- Products Section -->
{#if loading}
	<div class="flex flex-col items-center justify-center min-h-screen">
		<div class="flex items-center justify-center space-x-4">
			<div
				class="w-12 h-12 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"
			></div>
			<p class="text-blue-300 text-lg font-semibold">Loading...</p>
		</div>
	</div>
{:else if show_products}
	<section id="features">
		<div>
			<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
				{#each products as product}
					<div class="flex">
						<ProductCard {product} class="w-full h-full" />
					</div>
				{/each}
			</div>
			<div class="join flex justify-center mt-8">
				<button
					on:click={() => handlePageChange(currentPage - 1)}
					class="join-item btn"
					disabled={currentPage <= 1}
				>
					«
				</button>
				<button class="join-item btn">
					Page {currentPage}
				</button>
				<button
					on:click={() => handlePageChange(currentPage + 1)}
					class="join-item btn"
					disabled={currentPage >= totalPages}
				>
					»
				</button>
			</div>
		</div>
	</section>
{:else if error}
	<p class="text-red-500 text-center">{error}</p>
{/if}

<style>
	/* Join button styles */
	.join {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.join-item {
		cursor: pointer;
		margin: 0 4px;
		padding: 8px 16px;
		background-color: #f5f5f5;
		color: #333;
		border: 1px solid #ddd;
		border-radius: 4px;
		font-size: 14px;
		font-weight: bold;
	}
	.btn {
		background-color: #007bff;
		color: #fff;
	}
	.btn:hover {
		background-color: #0056b3;
	}
	.btn:disabled {
		cursor: not-allowed;
		background-color: #e9ecef;
		color: #6c757d;
	}

	/* Breadcrumb styles */
	.breadcrumb {
		display: flex;
		flex-wrap: wrap;
		list-style: none;
		padding: 0.5rem 1rem;
		margin: 1rem 0;
		background-color: black; /* Light background for contrast */
		border-radius: 0.25rem;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
	}

	.breadcrumb-item {
		margin-right: 0.75rem;
		padding: 0.25rem 0.5rem;
		background-color: black; /* Light blue-gray background */
		border-radius: 0.25rem;
		transition:
			background-color 0.3s ease,
			transform 0.2s ease; /* Smooth transitions */
		cursor: pointer; /* Pointer cursor to indicate clickability */
		display: flex;
		align-items: center;
	}

	.breadcrumb-item:hover {
		background-color: #007bff; /* Change background color on hover */
		color: #fff; /* Change text color on hover */
		transform: translateY(-2px); /* Slight lift effect */
	}

	.breadcrumb-item span:first-child {
		font-weight: bold; /* Make the key bold */
		color: #333; /* Dark text for key */
		margin-right: 0.25rem;
	}

	.breadcrumb-item span:last-child {
		color: #007bff; /* Blue color for value */
	}

	.breadcrumb-item:hover span:last-child {
		color: #fff; /* Change text color on hover */
	}

	/* Separator styles if needed */
	.breadcrumb-item::after {
		content: '/'; /* Add separator */
		margin-left: 0.75rem;
		color: #6c757d; /* Light gray color for separator */
	}

	.breadcrumb-item:last-child::after {
		content: ''; /* Remove separator after the last item */
	}
</style>
