
/** @type {import('./$types').PageLoad} */
export async function load() {
	const bookings = await getbookings();
	return {
		bookings
	};
}

async function getbookings() {
	const response = await fetch('http://localhost:3000/bookings');
	const bookings = await response.json();
	return bookings;
}




/** @type {import('./$types').Actions} */
export const actions = {
	cancel: async ({ request }) => {
		const data = await request.formData()
		var bookings_id = data.get('id');
		await updateBookingStatus(bookings_id);
	}
};


async function updateAvailableSeats(id) {
    var trainData = await fetch(`http://localhost:3000/trains?trainNumber=${id}`).then(response => response.json()).then(data => {
		data[0].availableSeats = data[0].availableSeats + 1;
		return data[0];
	});

	console.log("trainData");
	console.log(trainData);

	await fetch(`http://localhost:3000/trains/${trainData.id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(trainData)
	}).then(response => response.json()).then(data => {
		console.log(data);
	}).catch((error) => {
		console.error('Error:', error);
	});
   
}
async function updateBookingStatus(id) {
    var booking = await fetch(`http://localhost:3000/bookings/${id}`).then(response => response.json()).then(data => {
		data.status = "Cancelled";
		return data;
	});

	await fetch(`http://localhost:3000/bookings/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(booking)
	}).then(response => response.json()).then(data => {
		console.log(data);
	}).catch((error) => {
		console.error('Error:', error);
	});

	await updateAvailableSeats(booking.trainNumber);
   
}

