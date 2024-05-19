/** @type {import('../$types').PageLoad} */
export async function load({ params }) {
	var slug = params.slug;
	// Fetch the train with the given slug
	return await fetch(`http://localhost:3000/trains?trainNumber=${slug}`)
		.then(response => response.json())
		.then(train => {
			// randomize seat number int
			train[0].seatNumberRandom = Math.floor(Math.random() * 100) + 1;
			return {
				train: train[0]
			}
		});
}

/** @type {import('./$types').Actions} */
export const actions = {
	booking: async ({ request }) => {
		const data = await request.formData()
		var url = 'http://localhost:3000/bookings';
		var id = data.get('id');
		var postData = {
			trainNumber: data.get('trainNumber'),
			mobileNumber: data.get('mobileNumber'),
			seatNumber: data.get('seatNumber'),
			passengerName: data.get('passengerName'),
			bookingDate: new Date().toISOString(),
			status: "pending"
		};

		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(postData)
		};
		await updateAvailableSeats(id);
		
		await fetch(url, requestOptions).then(response => response.json()).then(data => {
			return {
				"message": "Booking Successfull"
			}
		}).catch((error) => {
			return {
				"message": "Booking Failed"
			}

		});

	}
};


async function updateAvailableSeats(id) {
    var trainData = await fetch(`http://localhost:3000/trains/${id}`).then(response => response.json()).then(data => {
		data.availableSeats = data.availableSeats - 1;
		return data;
	});

	await fetch(`http://localhost:3000/trains/${id}`, {
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