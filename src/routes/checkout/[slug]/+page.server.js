/** @type {import('../$types').PageLoad} */
export async  function load({ params }) {
	var slug = params.slug;
	// Fetch the train with the given slug
	return await fetch(`http://localhost:3000/trains?trainNumber=${slug}`)
		.then(response => response.json())
		.then(train => {
			train[0].seatNumber = Math.floor(Math.random() * 100) + 1;
			return {
				train : train[0]
			}
		});

}
