<script>
	/** @type {import('./$types').PageData} */

	export let data;

	let message = '';
	async function submitForm(event) {
		event.preventDefault();

		if (confirm('Are you sure you want to Cancel this ticket?')) {
			try {
				const formData = new FormData(event.target);
				console.log(formData);
				const response = await fetch(event.target.action, {
					method: 'POST',
					body: formData
				});

				if (!response.ok) {
					throw new Error('Failed to cancel the ticket');
				}
				message = 'Ticket cancel successfully.';
				alert(message);

				location.reload();
			} catch (error) {
				alert(error.message);
			}
		}
	}
</script>

<div style="margin-top: 5rem;">
	<!-- Title -->
	<h1 class="my-4 text-center text-3xl font-bold uppercase text-blue-900">Booking History</h1>

	<!-- Train List -->
	<section class="mt-8">
		<div class="relative overflow-x-auto">
			<table class="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
				<thead
					class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400"
				>
					<tr>
						<th scope="col" class="px-6 py-3"> Booking ID </th>
						<th scope="col" class="px-6 py-3"> Train number </th>
						<th scope="col" class="px-6 py-3"> Seat Number </th>
						<th scope="col" class="px-6 py-3"> Passenger Name</th>
						<th scope="col" class="px-6 py-3"> Phone Number </th>
						<th scope="col" class="px-6 py-3"> Date </th>
						<th scope="col" class="px-6 py-3"> Status</th>
						<th scope="col" class="px-6 py-3"> </th>
					</tr>
				</thead>
				<tbody>
					{#each data.bookings as booking}
						<tr class="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
							<th
								scope="row"
								class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
							>
								{booking.id}
							</th>
							<td class="px-6 py-4">
								<span class="font-medium">
									{booking.trainNumber}
								</span>
							</td>

							<td class="px-6 py-4">
								<span class="font-medium">
									{booking.seatNumber}
								</span>
							</td>
							<td class="px-6 py-4">
								<span class="font-medium">
									{booking.passengerName}
								</span>
							</td>
							<td class="px-6 py-4">
								<span class="font-medium">
									{booking.mobileNumber}
								</span>
							</td>
							<td class="px-6 py-4">
								<span class="font-medium">
									{booking.bookingDate}
								</span>
							</td>
							<td class="px-6 py-4">
								<span class="font-medium">
									{booking.status}
								</span>
							</td><td class="px-6 py-4">
								{#if booking.status === 'Cancelled'}
								<p></p>
								{:else}
									<form action="?/cancel" method="POST" on:submit={submitForm}>
										<input type="hidden" name="id" value={booking.id} />
										<button type="submit" class="text-red-500 hover:underline"> Cancel </button>
									</form>
								{/if}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</section>
</div>
