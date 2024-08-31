<script>
	export let discount;

	// Function to copy the discount code to the clipboard
	function copyToClipboard() {
		navigator.clipboard.writeText(discount.discount_code);
		const copyButton = document.querySelector(`.${getCopyButtonClass()}`);
		copyButton.textContent = 'Copied!';
		setTimeout(() => {
			copyButton.textContent = 'Copy';
		}, 5000);
	}

	// Function to format the expiry date
	function formatDate(date) {
		const options = { year: 'numeric', month: 'long', day: 'numeric' };
		return new Date(date).toLocaleDateString('en-US', options);
	}

	// Function to determine the text color based on discount percentage
	function discountPercentageClass() {
		return discount.discount_percentage >= 10 ? 'text-green-400' : 'text-yellow-400';
	}

	// Function to get the dynamic class for the copy button
	function getCopyButtonClass() {
		return 'copy-button-' + discount.discount_code.replace(/\s+/g, '-').toLowerCase();
	}
</script>

<div
	class="container bg-gradient-to-r from-pink-500 to-blue-500 text-white p-8 rounded-lg shadow-lg max-w-md lg:w-1/2 sm:w-full mr-8"
>
	<div class="text-3xl font-bold mb-4">Special Offer!</div>
	<div class="text-lg mb-4">
		Get <span class="font-semibold {discountPercentageClass()}">
			{discount.discount_percentage}% OFF
		</span>
		your next purchase!
	</div>

	<div class="bg-white text-gray-800 rounded-lg px-4 py-2 flex items-center justify-between">
		<span class="text-2xl font-bold">{discount.discount_code}</span>
		<button
			on:click={copyToClipboard}
			class="{getCopyButtonClass()} bg-blue-800 text-white px-3 py-1 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
			>Copy</button
		>
	</div>
	<div class="text-sm mt-4">
		<p>Valid until <span class="font-semibold">{formatDate(discount.expiry_date)}</span></p>
	</div>
</div>
