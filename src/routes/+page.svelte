<script>
	import ScoopedButton from '../components/ScoopedButton.svelte';
	import ScoopedContainer from '../components/ScoopedContainer.svelte';
</script>

<h1>Welcome to SvelteKit</h1>
<ScoopedButton text="RSVP" onClick={() => alert('pressed!')} />
<ScoopedContainer>
    <h2>Hello!</h2>
</ScoopedContainer>