<script>
	import { Button, Dropdown, DropdownItem, Checkbox, Search } from 'flowbite-svelte';
	import { ChevronDownOutline, UserRemoveSolid } from 'flowbite-svelte-icons';
	/** @type {import('./$types').PageData} */

	export let data;

	let searchOriginTerm = '';
	let searchDestTerm = '';
	const origin = [
		{ name: 'Ayutthaya' },
		{ name: 'Bangkok' },
		{ name: 'Chiang Mai' },
		{ name: 'Chiang Rai' },
		{ name: 'Hat Yai' },
		{ name: 'Kanchanaburi' }
	];
	const destination = [
		{ name: 'Ayutthaya' },
		{ name: 'Bangkok' },
		{ name: 'Chiang Mai' },
		{ name: 'Chiang Rai' },
		{ name: 'Hat Yai' },
		{ name: 'Kanchanaburi' }
	];

	$: filteredOriginItems = origin.filter(
		(origin) => origin.name.toLowerCase().indexOf(searchOriginTerm?.toLowerCase()) !== -1
	);
	$: filteredDestItems = destination.filter(
		(destination) => destination.name.toLowerCase().indexOf(searchDestTerm?.toLowerCase()) !== -1
	);

	$: filteredTrains = data.trains.filter(
		(/** @type {{ origin: string; destination: string; }} */ train) =>
			train.origin.toLowerCase().includes(searchOriginTerm.toLowerCase()) &&
			train.destination.toLowerCase().includes(searchDestTerm.toLowerCase())
	);
</script>

<div style="margin-top: 5rem;">
	<!-- Title -->
	<h1 class="my-4 text-center text-3xl font-bold uppercase text-blue-900">
		Welcome to Train Booking System
	</h1>

	<!-- Search Section -->
	<div class="my-4 flex w-full items-center justify-center align-middle">
		<section class="flex w-fit flex-row gap-4 rounded-md p-4 shadow-md">
			<!-- Origin -->
			<div>
				<Button class=" border border-blue-900 text-blue-900">
					{#if filteredOriginItems.length === 0}
						Origin
					{:else if filteredOriginItems.length === 1}
						{filteredOriginItems[0].name}
					{:else}
						Origin
					{/if}

					<ChevronDownOutline class="ms-2 h-6 w-6 text-blue-900 dark:text-blue-900" /></Button
				>
				<Dropdown class="h-44 overflow-y-auto px-3 pb-3 text-sm">
					<div slot="header" class="p-3">
						<Search size="md" bind:value={searchOriginTerm} />
					</div>
					{#each filteredOriginItems as origin (origin.name)}
						<li class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
							<!-- <Checkbox bind:checked={origin.checked}>{origin.name}</Checkbox> -->
							<DropdownItem
								on:click={() => {
									searchOriginTerm = origin.name;
								}}
							>
								{origin.name}
							</DropdownItem>
						</li>
					{/each}
				</Dropdown>
			</div>

			<!-- Destination -->
			<div>
				<Button class="border border-blue-900 text-blue-900">
					{#if filteredDestItems.length === 0}
						Destination
					{:else if filteredDestItems.length === 1}
						{filteredDestItems[0].name}
					{:else}
						Destination
					{/if}
					<ChevronDownOutline class="ms-2 h-6 w-6 text-blue-900 dark:text-blue-900" /></Button
				>
				<Dropdown class="h-44 overflow-y-auto px-3 pb-3 text-sm">
					<div slot="header" class="p-3">
						<Search size="md" bind:value={searchDestTerm} />
					</div>
					{#each filteredDestItems as destination (destination.name)}
						<li class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
							<DropdownItem
								on:click={() => {
									searchDestTerm = destination.name;
								}}
							>
								{destination.name}
							</DropdownItem>
						</li>
					{/each}
				</Dropdown>
			</div>

			<!-- Search button -->
			<div>
				<Button
					on:click={() => {
						console.log(searchOriginTerm, searchDestTerm);
					}}
					class="h-full bg-blue-900 text-white"
				>
					Search
				</Button>
			</div>
		</section>
	</div>

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
						<th scope="col" class="px-6 py-3"> </th>
					</tr>
				</thead>
				<tbody>
					{#each filteredTrains as train}
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
								<span class="font-medium"> {train.distance} KM</span>
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
									{train.availableSeats} / {train.numberSeats}  Seats
								</span>
							</td>
							<td class="px-6 py-4">
								<a data-sveltekit-reload href="/checkout/{train.trainNumber}" class="text-blue-500 hover:underline">
									Book now!
								</a>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</section>
</div>
