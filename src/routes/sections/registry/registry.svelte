<script lang="ts">
    import ScoopedButton from '../../../components/ScoopedButton.svelte';
    import { state, loadGuests } from './registryState.svelte'

    // The loadGuests function will run when you click the ScoopedButton
</script>

<section>
    <h1>Registry</h1>
    <ScoopedButton text="test api" onClick={loadGuests} />
    <div>
        <datalist id="suggestions">
            {#each state.guestList as guest}
                <option>{guest}</option>
            {/each}
        </datalist> 
        <input type="text" autocomplete="on" list="suggestions" />
    </div>
</section>

<style lang="scss">
</style>