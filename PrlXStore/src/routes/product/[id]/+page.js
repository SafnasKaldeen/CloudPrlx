/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	const { id } = params;
	console.log('params.id', id);

	try {
		const response = await fetch(`http://localhost:3000/products?id=${id}`);
		if (!response.ok) {
			throw new Error('Failed to fetch product');
		}
		const product = await response.json();
		return {
			props: {
				product
			}
		};
	} catch (error) {
		console.error('Error fetching product:', error);
		return {
			props: {
				product: null,
				error: error.message
			}
		};
	}
}
