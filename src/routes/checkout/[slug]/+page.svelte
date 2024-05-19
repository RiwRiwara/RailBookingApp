<script>
	import { ArrowRightAltSolid } from 'flowbite-svelte-icons';
	/** @type {import('./$types').PageData} */
	export let data;

	let message = '';
	async function submitForm(event) {
		event.preventDefault();

		if (confirm('Are you sure you want to book this ticket?')) {
			try {
				const formData = new FormData(event.target);
				const response = await fetch(event.target.action, {
					method: 'POST',
					body: formData
				});

				if (!response.ok) {
					throw new Error('Failed to book the ticket');
				}
				message = 'Ticket booked successfully.';
				alert(message);
				// reload the page
				location.reload();
			} catch (error) {
				message = 'An error occurred while booking the ticket.';
				alert(message);
			}
		}
	}
</script>

<div style="margin-top: 5rem;"></div>

<div class="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
	<div
		class="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
		aria-hidden="true"
	>
		<div
			class="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
			style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
		></div>
	</div>
	<div class="mx-auto max-w-2xl text-center">
		<h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
			Checkout Train ID #{data.train.trainNumber}
		</h2>
	</div>

	<div class="my-6 flex flex-row items-center justify-center gap-10">
		<div class="rounded bg-green-600 px-8 py-2 text-lg font-bold text-white">
			{data.train.origin}
		</div>
		<div class="flex flex-col gap-1 text-center">
			<div>
				<p class="text-sm font-semibold text-gray-900">{data.train.distance} Km</p>
			</div>
			<div class="flex flex-row gap-1">
				<ArrowRightAltSolid class="h-6 w-6 animate-pulse text-blue-600 duration-100" />
				<ArrowRightAltSolid class="h-6 w-6 animate-pulse text-blue-600 duration-150" />
				<ArrowRightAltSolid class="h-6 w-6 animate-pulse text-blue-600 duration-200" />
			</div>
		</div>
		<div class="animate-pulse rounded bg-blue-600 px-8 py-2 text-lg font-bold text-white">
			{data.train.destination}
		</div>
	</div>

	<form
		action="?/booking"
		method="POST"
		class="mx-auto mt-4 max-w-xl sm:mt-4"
		on:submit={submitForm}
	>

		<div class="my-6 flex flex-col items-center justify-center gap-4">
			<div class="w-full rounded-md bg-gray-200 px-4 py-2">
				<p class="text-lg font-semibold text-gray-900">Ticket price: {data.train.price} Baht</p>
			</div>
			<div class="w-full rounded-md bg-gray-200 px-4 py-2">
				<p class="text-lg font-semibold text-gray-900">
					Available Seat: {data.train.availableSeats} / {data.train.numberSeats}
				</p>
			</div>
		</div>
		
		<input type="hidden" name="id" value={data.train.id} />
		<input type="hidden" name="trainNumber" value={data.train.trainNumber} />
		<div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
			<div class="sm:col-span-2">
				<label for="seatNumber" class="block text-sm font-semibold leading-6 text-gray-900"
					>Seat number</label
				>
				<div class="mt-2.5">
					<input
						type="text"
						value={data.train.seatNumberRandom}
						readonly
						name="seatNumber"
						id="seatNumber"
						class="block w-full rounded-md border-0 bg-gray-100 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
					/>
				</div>
			</div>
			<div class="sm:col-span-2">
				<label for="passengerName" class="block text-sm font-semibold leading-6 text-gray-900"
					>Passenger Name</label
				>
				<div class="mt-2.5">
					<input
						type="text"
						required
						placeholder="Passenger Name"
						name="passengerName"
						id="passengerName"
						autocomplete="given-name"
						class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
					/>
				</div>
			</div>

			<div class="sm:col-span-2">
				<label for="mobileNumber" class="block text-sm font-semibold leading-6 text-gray-900"
					>Phone number</label
				>

				<input
					type="text"
					required
					name="mobileNumber"
					id="mobileNumber"
					autocomplete="tel"
					placeholder="Phone number"
					class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
				/>
			</div>
		</div>
		<div class="mt-10">
			<button
				type="submit"
				class="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
			>
				Booking now</button
			>
		</div>
	</form>
</div>
