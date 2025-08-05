<script lang="ts">
	import ScoopedButton from '../../../components/ScoopedButton.svelte';
	import ScoopedContainer from '../../../components/ScoopedContainer.svelte';
	import { guestState, loadGuests } from './registryState.svelte';

	$effect(() => {
		if (!guestState.isLoading && guestState.guestList.length === 0 && guestState.error === null) {
			loadGuests();
		}
	});

    let selectedGuestState = $state('');
    let guestPlusOneState = $state('');
    let attendingState = $state(false);
</script>

<section>
	<h1>Registry</h1>
	{#if guestState.isLoading}
		Loading Guests...
	{/if}
    <div>
        <label for="guests">
            Guest Name
            <datalist id="guests">
                {#each guestState.guestList as guest}
                    <option>{guest}</option>
                {/each}
            </datalist>
            <input
            type="text"
            autocomplete="on"
            list="guests"
            bind:value={selectedGuestState}
          />
        </label>

        <label for="plus-one">
            Guest's +1
            <datalist id="plus-one">
                {#each guestState.guestList as guest}
                    <option>{guest}</option>
                {/each}
            </datalist>
            <input
            type="text"
            autocomplete="on"
            list="plus-one"
            bind:value={guestPlusOneState}
          />
        </label>

    </div>

    <label>
        Attending
        <input type="checkbox" bind:checked={attendingState} />
    </label>

    <ScoopedButton text="submit" onClick={() => {
        console.log(selectedGuestState);
        console.log(guestPlusOneState);
        console.log(attendingState);
    }} />
</section>

<style lang="scss">
</style>
