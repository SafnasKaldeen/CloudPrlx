// src/stores/filterStore.js
import { writable } from 'svelte/store';

export const filterStore = writable({
	category: '',
	sortBy: ''
});
