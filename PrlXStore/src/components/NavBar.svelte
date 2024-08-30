<script>
	import { filterStore } from '../stores/filterStore.js'; // Import the store

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

<nav class="bg-black">
	<div class="w-full flex items-center justify-between px-4">
		<!-- Flex container for logo and text -->
		<a
			href="/"
			class="flex items-center text-white text-lg font-semibold transition-transform transform hover:scale-110"
			on:click|preventDefault={clearStore}
		>
			<img src="/image.png" class="w-12 h-12 m-2" alt="logo" />
			<span class="ml-2">PrlXStore</span>
		</a>
		<ul class="flex space-x-4">
			<li><a href="#features" class="text-gray-400 hover:text-white">Features</a></li>
			<li><a href="#contact" class="text-gray-400 hover:text-white">Contact</a></li>
			<li><a href="#features" class="text-gray-400 hover:text-white">Features</a></li>
			<li><a href="#contact" class="text-gray-400 hover:text-white">Contact</a></li>
		</ul>
	</div>
</nav>

<style>
	/* Add any additional component-specific styles here */
</style>
