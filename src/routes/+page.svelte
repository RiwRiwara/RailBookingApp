<script>
	import { onMount } from 'svelte';
	/**
	 * @type {any[]}
	 */
	let trains = [];

	onMount(async () => {
		const response = await fetch('http://localhost:3000/trains');
		trains = await response.json();
	});
</script>

<div style="margin-top: 5rem;">
	<!-- Title -->
	<h1 class="my-4 text-center text-3xl font-bold uppercase">Welcome to Train Booking System</h1>
	<!-- Search Section -->
	<section class="flex justify-center">
		<div class="w-full md:w-1/2">
			<div class="flex items-center justify-between">
				<div class="w-full">
					<input
						type="text"
						class="w-full rounded-md border border-gray-300 px-4 py-2"
						placeholder="Search for trains"
					/>
				</div>
				<div class="ml-2">
					<button class="rounded-md bg-blue-500 px-4 py-2 text-white"> Search </button>
				</div>
			</div>
		</div>
	</section>

	<!-- Train List -->
	<section class="mt-8">
		<div class="relative overflow-x-auto">
			<table class="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
				<thead
					class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400"
				>
					<tr>
						<th scope="col" class="px-6 py-3"> Train number </th>
						<th scope="col" class="px-6 py-3"> Origin </th>
						<th scope="col" class="px-6 py-3"> Destination </th>
						<th scope="col" class="px-6 py-3"> Distance </th>
						<th scope="col" class="px-6 py-3"> Departure Time </th>
						<th scope="col" class="px-6 py-3"> Arrival Time </th>
						<th scope="col" class="px-6 py-3"> Ticket Price </th>
						<th scope="col" class="px-6 py-3"> Seats </th>
					</tr>
				</thead>
				<tbody>
					{#each trains as train}
						<tr class="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
							<th
								scope="row"
								class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
							>
								{train.trainNumber}
							</th>
							<td class="px-6 py-4">
								<span class="font-medium">
									{train.origin}
								</span>
							</td>
							<td class="px-6 py-4">
								<span class="font-medium">
									{train.destination}
								</span>
							</td>
							<td class="px-6 py-4">
								<span class="font-medium">
									{train.distance} KM</span>
							</td>
							<td class="px-6 py-4">
								<span class="font-medium">
									{train.departureTime}
								</span>
							</td>
							<td class="px-6 py-4">
								<span class="font-medium">
									{train.arrivalTime}
								</span>
							</td>
							<td class="px-6 py-4">
								<span class="font-medium">
									{train.price} USD
								</span>
							</td>
							<td class="px-6 py-4">
								<span class="font-medium">
									{train.numberSeats} Seats
								</span>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</section>
</div>
