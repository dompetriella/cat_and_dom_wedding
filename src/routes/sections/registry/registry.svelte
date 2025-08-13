<script lang="ts">
	import ScoopedButton from '../../../components/ScoopedButton.svelte';
	import { rsvpState, loadGuests, updateRegistryStatus } from './registryState.svelte';

	$effect(() => {
		if (
			!rsvpState.isGuestLoading &&
			rsvpState.guestList.length === 0 &&
			rsvpState.guestError === null
		) {
			loadGuests();
		}
	});

	let selectedGuestState = $state('');
	let guestPlusOneState = $state('');
	let attendingState = $state(false);
	let plusOneAttendingState = $state(false);
</script>

<section>
	<h1>Registry</h1>
	{#if rsvpState.isGuestLoading}
		Loading Guests...
	{/if}
	<div>
		<label for="guests">
			Guest Name
			<datalist id="guests">
				{#each rsvpState.guestList as guest}
					<option>{guest}</option>
				{/each}
			</datalist>
			<input type="text" autocomplete="on" list="guests" bind:value={selectedGuestState} />
		</label>
		<label>
			Attending
			<input type="checkbox" bind:checked={attendingState} />
		</label>
	</div>

	<div>
		<label for="plus-one">
			Guest's +1
			<datalist id="plus-one">
				{#each rsvpState.guestList as guest}
					<option>{guest}</option>
				{/each}
			</datalist>
			<input type="text" autocomplete="on" list="plus-one" bind:value={guestPlusOneState} />
		</label>

		<label>
			Attending
			<input type="checkbox" bind:checked={plusOneAttendingState} />
		</label>
	</div>

	<ScoopedButton
		text="submit"
		onClick={() => {
			console.log(selectedGuestState);
			console.log(guestPlusOneState);
			console.log(attendingState);
			console.log(plusOneAttendingState)
			updateRegistryStatus(
				selectedGuestState,
				attendingState,
				guestPlusOneState,
				plusOneAttendingState
			);
		}}
	/>
</section>

<style lang="scss">
</style>
