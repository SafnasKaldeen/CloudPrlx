<script>
	/** @type {import('./$types').PageData} */
	export let data;
	const product = data.props.product[0];
	// console.log(product);

	import NavBar from '../../../components/NavBar.svelte';
	import Aside from '../../../components/Aside.svelte';
	import '../../../app.css'; // Ensure Tailwind CSS and any other styles are included
	import CouponCard from '../../../components/CouponCard.svelte';

	function getRatingColor(rating) {
		if (rating >= 4) return 'bg-green-500'; // High rating
		if (rating >= 3) return 'bg-yellow-500'; // Medium rating
		return 'bg-red-500'; // Low rating
	}

	function StockStatus(stock) {
		if (stock === 'In Stock') {
			return 'text-sm text-green-500 font-medium';
		} else if (stock === 'Limited Stock') {
			return 'text-sm text-yellow-500 font-medium';
		} else {
			return 'text-sm text-red-500 font-medium';
		}
	}
</script>

<!-- Main container for the entire layout -->
<div class="relative flex flex-col h-screen">
	<!-- Background image with blur effect -->
	<div
		class="absolute inset-0 bg-cover bg-center bg-no-repeat"
		style="background-image: url('{product.Image}'); filter: blur(4px);"
	></div>

	<!-- Overlay with gradient and opacity effect -->
	<div class="absolute inset-0 bg-overlay"></div>

	<!-- Navbar at the top of the layout -->
	<div class="z-10">
		<NavBar />
	</div>

	<!-- Main content container with sidebar and main content area -->
	<div class="relative z-10 flex flex-1 overflow-hidden">
		<!-- Aside component (side navigation) -->
		<Aside />

		<!-- Main Content Area -->
		<main class="flex-1 overflow-y-auto">
			<div class="max-w-7xl mx-auto px-4 py-8">
				<h1 class="text-7xl text-white mx-3 mb-8 font-bold z-10">
					{product.name}
				</h1>
				<!-- Content Container -->
				<!-- Product Details Below -->
				<div class="flex flex-col lg:flex-row bg-white rounded-lg shadow-lg p-2 mb-8">
					<!-- Product Image -->
					<img
						src={product.Image}
						alt={product.name}
						class="w-full lg:w-1/2 h-96 object-cover rounded-lg mb-4 lg:mb-0 lg:mr-6"
					/>

					<!-- Product Details -->
					<div class="flex flex-col flex-1">
						<div class="text-2xl font-semibold my-5 text-gray-800">${product.price}</div>
						<!-- Price and Stock Status -->
						<div class="flex items-center space-x-4 mb-4">
							<span
								class={`px-2 py-1 text-xs font-semibold whitespace-nowrap text-white rounded ${getRatingColor(
									product.rating
								)}`}>{product.rating} ★</span
							>
							<!-- Stock Status -->
							<span class={StockStatus(product.stock_availability)}>
								{product.stock_availability}
							</span>
						</div>

						<!-- Net Weight -->
						<div class="mb-4">
							<h3 class="text-lg font-semibold text-gray-700">Net Weight:</h3>
							<p class="text-sm text-gray-600 font-semibold">{product.weight}</p>
						</div>

						<!-- Material -->
						<div class="mb-4">
							<h3 class="text-lg font-semibold text-gray-700">Material:</h3>
							<p class="text-sm text-gray-600 font-semibold">{product.material}</p>
						</div>

						<!-- Color Options -->
						<div class="mb-4">
							<h3 class="text-lg font-semibold text-gray-700">Available Colors:</h3>
							<div class="flex flex-wrap gap-2 mt-2">
								{#each product.color_options as color}
									<div
										class="w-8 h-8 rounded-full border-black border-2"
										style="background-color: {color};"
										aria-label={color}
										title={color}
									></div>
								{/each}
							</div>
						</div>

						<!-- Warranty -->
						<div class="mb-4">
							<h3 class="text-lg font-semibold text-gray-700">Warranty:</h3>
							<p class="text-sm text-gray-600 font-semibold">{product.warranty}</p>
						</div>
					</div>
				</div>

				<!-- Description -->
				<h2 class="text-3xl font-semibold text-white mb-8">{product.description}</h2>

				<!-- Reviews Section -->
				<div class="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
					<h2 class="text-2xl font-bold mb-4">Customer Reviews</h2>
					<div class="space-y-4">
						{#each product.reviews as review}
							<div class="border border-gray-200 rounded-lg p-4 flex flex-col space-y-2">
								<div class="flex items-center space-x-3">
									<!-- User Name -->
									<span class="text-lg font-semibold">{review.user}</span>
									<!-- Rating -->
									<div class="flex items-center space-x-1 text-yellow-500">
										{#each Array(Math.round(review.rating)) as _}
											<svg
												class="w-5 h-5 fill-current"
												viewBox="0 0 24 24"
												xmlns="http://www.w3.org/2000/svg"
												><path
													d="M12 17.27L18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21z"
												/></svg
											>
										{/each}
										{#each Array(5 - Math.round(review.rating)) as _}
											<svg
												class="w-5 h-5 text-gray-300"
												viewBox="0 0 24 24"
												xmlns="http://www.w3.org/2000/svg"
												><path
													d="M12 17.27L18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21z"
												/></svg
											>
										{/each}
									</div>
								</div>
								<!-- Comment -->
								<p class="text-gray-700">{review.comment}</p>
							</div>
						{/each}
					</div>
				</div>

				<!-- Coupons Section -->
				<div class="relative bg-transparent shadow-lg rounded-lg overflow-hidden">
					<div class="flex flex-col lg:flex-row lg:space-x-8">
						<div class="w-full p-6 content-center align-middle justify-center">
							{#if product.discounts.length > 0}
								<h2 class="text-3xl font-semibold text-white mt-8 mb-8">Available Coupons</h2>
								<div class="flex flex-wrap gap-4">
									{#each product.discounts as discount}
										<CouponCard {discount} />
									{/each}
								</div>
							{/if}
						</div>
					</div>
				</div>
			</div>
		</main>
	</div>
</div>

<style>
	/* Ensure the background image covers the container */
	.bg-cover {
		background-size: cover;
	}

	.bg-center {
		background-position: center;
	}

	.bg-no-repeat {
		background-repeat: no-repeat;
	}

	/* Overlay effect */
	.bg-overlay {
		background: linear-gradient(to left, rgba(255, 255, 255, 0) 20%, black 100%),
			linear-gradient(to bottom, rgba(255, 255, 255, 0) 20%, black 100%);
		height: 100%;
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1; /* Ensure this is above the background image but below the content */
	}

	/* Ensure full height and width for background image */
	.h-screen {
		height: 100vh;
	}
	.w-screen {
		width: 100vw;
	}

	.relative {
		position: relative;
	}

	.absolute {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
	}
</style>
