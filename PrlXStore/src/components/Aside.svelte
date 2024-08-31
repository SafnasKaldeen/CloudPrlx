<script>
	import Category from './Category.svelte';
	import PriceRange from './PriceRange.svelte';
	import Sort from './Sort.svelte';

	let isMobileDrawerOpen = false;

	function toggleMobileDrawer() {
		isMobileDrawerOpen = !isMobileDrawerOpen;
		const mobileDrawerSide = document.querySelector('.mobile-drawer-side');

		if (isMobileDrawerOpen) {
			mobileDrawerSide.classList.remove('hidden');
			requestAnimationFrame(() => {
				mobileDrawerSide.style.transform = 'translateX(0)';
				mobileDrawerSide.style.opacity = '1';
			});
		} else {
			mobileDrawerSide.style.transform = 'translateX(-100%)';
			mobileDrawerSide.style.opacity = '0';
			setTimeout(() => mobileDrawerSide.classList.add('hidden'), 300);
		}
	}

	function closeMobileDrawer() {
		isMobileDrawerOpen = false;
		const mobileDrawerSide = document.querySelector('.mobile-drawer-side');
		mobileDrawerSide.style.transform = 'translateX(-100%)';
		mobileDrawerSide.style.opacity = '0';
		setTimeout(() => mobileDrawerSide.classList.add('hidden'), 300);
	}
</script>

<div class="drawer relative">
	<!-- Content area -->
	<div class="drawer-content flex flex-col">
		<!-- Toggle button for mobile, visible only on mobile -->
		<label
			class="lg:hidden fixed top-1/2 right-4 z-50 p-2 bg-black rounded-full cursor-pointer"
			aria-label="open sidebar"
			on:click={toggleMobileDrawer}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6 text-white"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
			</svg>
		</label>
	</div>

	<!-- Mobile Drawer side, toggleable on mobile -->
	<div
		class="z-30 mobile-drawer-side fixed top-0 left-0 h-screen overflow-y-auto bg-black bg-opacity-80 w-64 transform -translate-x-full opacity-0 lg:hidden"
	>
		<!-- Overlay that appears when drawer is open on mobile -->
		<label class="drawer-overlay lg:hidden" aria-label="close sidebar" on:click={closeMobileDrawer}
		></label>

		<div class="p-4 text-white">
			<!-- Content of the drawer -->
			<!-- Content of the drawer -->
			<Category />
			<Sort />
			<PriceRange />
		</div>
	</div>

	<!-- Desktop Drawer side, always visible on large screens -->
	<div
		class="desktop-drawer-side hidden lg:block lg:relative lg:w-64 lg:h-screen lg:overflow-y-auto bg-opacity-100"
	>
		<div class="p-4 text-white">
			<!-- Content of the drawer -->
			<Category />
			<Sort />
			<PriceRange />
		</div>
	</div>
</div>

<style>
	.mobile-drawer-side {
		transition:
			transform 0.3s ease-out,
			opacity 0.3s ease-out;
	}

	/* No specific styles for the desktop drawer; it's always visible on large screens */
</style>
