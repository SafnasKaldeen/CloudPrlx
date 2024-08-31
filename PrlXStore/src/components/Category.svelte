<script>
	import { onMount } from 'svelte';
	import Choice from './Choice.svelte';
	import { categoriesStore, fetchCategories } from '../stores/categoryStore';

	// Access categories from the store
	let categories = [];
	let error = '';

	onMount(async () => {
		try {
			categories = await fetchCategories();
			// console.log('cached categories:', categories);
		} catch (err) {
			error = err.message;
		}
	});

	$: $categoriesStore, (categories = $categoriesStore.data);
</script>

{#if error}
	<p class="text-red-500">{error}</p>
{:else}
	<ul class="menu m-4 space-y-4">
		<h1 class="text-2xl font-bold mb-4 transition-opacity duration-400 hover:opacity-50">
			Category
		</h1>

		<!-- Render Choice components dynamically based on fetched categories -->
		<Choice category="All" href="/" />
		{#each categories as category}
			<Choice category={category.name} href={`?category=${category.name}`} />
		{/each}
	</ul>
{/if}

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
