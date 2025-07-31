<script>
	import ScoopedButton from '../components/ScoopedButton.svelte';
	import ScoopedContainer from '../components/ScoopedContainer.svelte';
</script>

<h1>Wedding Website</h1>
<ScoopedButton text="RSVP" onClick={() => alert('RSVP')} />
<ScoopedContainer>
	<h2>Hello!</h2>
		<ScoopedButton text="Top" onClick={() => alert('Top!')} />
		<ScoopedButton text="Bottom" onClick={() => alert('Bottom!')} />
</ScoopedContainer>

<style>
</style>
