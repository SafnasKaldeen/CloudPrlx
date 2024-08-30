import { writable } from 'svelte/store';

// Define cache expiration time (1 minute for testing; change to 24 hours in production)
const CACHE_EXPIRY = 12 * 60 * 60 * 1000; // 1 minute in milliseconds, change to 24 * 60 * 60 * 1000 for 24 hours

// Create a writable store for categories
export const categoriesStore = writable({
	data: [],
	timestamp: 0
});

// Load cache from local storage
export function loadCache() {
	const cached = localStorage.getItem('categoriesCache');
	if (cached) {
		const { data, timestamp } = JSON.parse(cached);
		if (Date.now() - timestamp < CACHE_EXPIRY) {
			return data;
		}
	}
	return null;
}

// Save cache to local storage
export function saveCache(data) {
	localStorage.setItem(
		'categoriesCache',
		JSON.stringify({
			data,
			timestamp: Date.now()
		})
	);
}

// Fetch and cache categories
export async function fetchCategories() {
	// Try to load cache first
	const cache = loadCache();
	if (cache) {
		// If cache is valid, update the store and return cached data
		categoriesStore.set({ data: cache, timestamp: Date.now() });
		return cache;
	}

	// If cache is not valid, fetch data from API
	const response = await fetch('http://localhost:3000/categories');
	if (response.ok) {
		const categories = await response.json();
		saveCache(categories); // Update cache with fresh data
		categoriesStore.set({ data: categories, timestamp: Date.now() }); // Update store with fresh data
		return categories;
	} else {
		throw new Error('Failed to fetch categories');
	}
}
