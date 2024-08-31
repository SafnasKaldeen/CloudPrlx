<script>
	import { Icon } from 'svelte-icons-pack';

	// Import icons
	import { FaCircleUser } from 'svelte-icons-pack/fa';
	import { AiOutlineShoppingCart } from 'svelte-icons-pack/ai';
	import { BiSearchAlt } from 'svelte-icons-pack/bi';

	// Import the store
	import { filterStore } from '../stores/filterStore.js';

	// Function to clear the store values and navigate to the home page
	function clearStore() {
		filterStore.set({
			category: '',
			sortBy: ''
		});

		// Navigate to home after clearing the store
		window.location.href = '/';
	}
</script>

<nav class="text-white">
	<div class="w-full flex items-center justify-between px-4 py-2">
		<a
			href="/"
			class="flex items-center text-white text-lg font-semibold transition-transform transform hover:scale-110"
			on:click|preventDefault={clearStore}
		>
			<img src="/image.png" class="w-12 h-12 m-2" alt="logo" />
			<span class="ml-2"><h2>PrlXStore</h2></span>
		</a>

		<ul class="flex space-x-4 items-center">
			<li>
				<a href="/" class="text-gray-400 hover:text-white">
					<Icon src={BiSearchAlt} size="28" />
				</a>
			</li>
			<li>
				<a href="/" class="text-gray-400 hover:text-white">
					<Icon src={AiOutlineShoppingCart} size="28" />
				</a>
			</li>
			<li>
				<a href="/" class="text-gray-400 hover:text-white">
					<Icon src={FaCircleUser} size="28" />
				</a>
			</li>
		</ul>
	</div>
</nav>

<style>
	/* Add any additional component-specific styles here */
</style>
