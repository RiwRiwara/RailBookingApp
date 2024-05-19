/** @type {import('./$types').PageLoad} */
export async function load() {
	const trains = await getTrains();
	return {
		trains
	};
}

async function getTrains() {
	const response = await fetch('http://localhost:3000/trains');
	const trains = await response.json();
	return trains;
}



