<script>
	import '../app.css';
	import {
		Navbar,
		NavBrand,
		NavLi,
		NavUl,
		NavHamburger,
		ImagePlaceholder,
		Skeleton,
		TextPlaceholder
	} from 'flowbite-svelte';
</script>

<div class="relative px-8">
	<Navbar class="fixed start-0 top-0 z-20 w-full border-b px-2 py-2.5 sm:px-4">
		<NavBrand href="/">
			<img
				src="/images/logo.avif"
				class="me-3 h-6 sm:h-9"
				alt="App Logo"
			/>
			<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
				>Rail Booking</span
			>
		</NavBrand>
		<NavHamburger />
		<NavUl>
			<NavLi href="/" active={true}>Home</NavLi>
			<NavLi href="/checkout">Checkout</NavLi>
			<NavLi href="/history">History</NavLi>
		</NavUl>
	</Navbar>

	<slot class="overflow-scroll " >

	</slot>

</div>

<style></style>
