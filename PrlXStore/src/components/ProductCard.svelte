<script>
	export let product = {
		id: '',
		name: '',
		price: '',
		rating: 0,
		ratings_count: 0,
		category: '', // Added category property
		Image: '' // Added Image property
	};

	// Hardcoded image URL
	const imageUrl = 'https://cdn.mos.cms.futurecdn.net/RqfEYG23yRgCFK3csRRzNj.jpg';

	// Function to determine the rating color
	function getRatingColor(rating) {
		if (rating >= 4) return 'bg-green-500'; // High rating
		if (rating >= 3) return 'bg-yellow-500'; // Medium rating
		return 'bg-red-500'; // Low rating
	}
</script>

<div
	class="card bg-zinc-900 w-full max-w-xs hover:glass transition-all duration-300 transform hover:scale-105 flex flex-col no-underline text-white hover:cursor-pointer"
	on:click={() => {
		window.location.href = `/product/${product.id}`;
	}}
>
	<div class="relative w-full h-48 rounded-t-lg overflow-hidden">
		<img
			src={product.Image || imageUrl}
			alt={product.name || 'Image unavailable'}
			class="w-full h-full object-cover"
		/>
	</div>
	<div class="flex flex-col mt-4 p-3">
		<div class="flex items-center justify-between mb-2">
			<h3 class="card-title text-xl font-bold break-words whitespace-break-spaces">
				{product.name}
			</h3>
			<span
				class={`px-2 py-1 text-xs font-semibold whitespace-nowrap ml-2 text-white rounded ${getRatingColor(product.rating)}`}
			>
				{product.rating} ★
			</span>
		</div>
		<hr class="my-2 border-gray-600" />
		<!-- Divider -->
		<div class="flex items-center justify-between mb-2">
			<h3 class="text-sm text-gray-400 font-bold">Ratings count:</h3>
			<p class="text-sm font-bold">{product.ratings_count}</p>
		</div>
		<hr class="my-2 border-gray-600" />

		<!-- Display category -->
		<div class="flex items-center justify-between mb-2">
			<h3 class="text-sm text-gray-400 font-bold">Category:</h3>
			<p class="text-sm font-bold">{product.category}</p>
		</div>
		<hr class="my-2 border-gray-600" />

		<!-- Price display -->
		<div class="flex items-center justify-between mt-4">
			<p class="text-lg font-semibold text-gray-400">Price:</p>
			<p class="text-lg font-bold">${product.price}</p>
		</div>
	</div>
</div>

<style>
	/* Ensure the anchor tag does not affect the card layout */
	a {
		display: block; /* Make anchor a block-level element */
		text-decoration: none; /* Remove underline */
	}

	/* Optional custom styles for ProductCard if needed */
	.card {
		border-radius: 0.5rem; /* Adjust border radius if needed */
	}
	.hover\:glass {
		backdrop-filter: blur(10px); /* Apply glass effect */
	}
	/* Price styling */
	.price {
		font-size: 1.25rem; /* Increase font size for the price */
		font-weight: bold; /* Make the price bold */
		color: #d1fae5; /* Light green color for price */
	}
</style>
