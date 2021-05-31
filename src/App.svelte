<script>
	import { MaterialApp } from 'svelte-materialify';
	import Footer from './components/Footer.svelte';
	import Navbar from './components/Navbar.svelte';

	let theme = 'dark';
</script>

<MaterialApp {theme} style="min-height: 100vh;">
	<Navbar />
	<div class="grid">
		<h1>Hello World!</h1>
		<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
	</div>
	<Footer />
</MaterialApp>

<style>
	/* div.grid {
		height: 100%;
	} */
	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}
</style>
