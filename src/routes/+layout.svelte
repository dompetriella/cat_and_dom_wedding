<script>
	import '../app.css';
</script>

<svelte:head>
	<title>Cat and Dom Wedding</title>
</svelte:head>

<main>
	<slot />
</main>

<footer>
	Made with ❤️ from Dom
</footer>

<style>
	main {
		width: 100%;
		height: 100%;
	}

	footer {
		width: 100;
		padding-top: 2em;
		display: flex;
		justify-content: center;
	}

</style>
