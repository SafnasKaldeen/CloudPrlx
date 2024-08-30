<script>
	import NavBar from '../components/NavBar.svelte';
	import Aside from '../components/Aside.svelte';
	import '../app.css'; // Ensure Tailwind CSS and any other styles are included
</script>

<!-- Main container for the entire layout -->
<div class="flex flex-col h-screen">
	<!-- Navbar at the top of the layout -->
	<NavBar />

	<!-- Main content container with sidebar and main content area -->
	<div class="flex flex-1 overflow-hidden">
		<!-- Aside component (side navigation) -->
		<Aside />

		<!-- Main Content Area -->
		<main class="flex-1 bg-black overflow-y-auto">
			<div class="max-w-7xl mx-auto p-4">
				<slot />
				<!-- Slot for child content to be rendered here -->
			</div>
		</main>
	</div>
</div>
