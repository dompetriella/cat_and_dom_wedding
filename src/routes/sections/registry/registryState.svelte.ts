const tierCutoff = 2;

export const rsvpState = $state({
	guestList: [] as string[],
	isGuestLoading: false,
	guestError: null as string | null,
	isRegistryLoading: false,
	registryError: null as string | null
});

export const updateRegistryStatus = async (guestName: string, isAttending: boolean) => {
	rsvpState.isRegistryLoading = true;
	rsvpState.registryError = null;

	try {
		const response = await fetch(`/api/registry/${guestName}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify( {isAttending: isAttending ? "YES" : "NO" })
		});

		if (!response.ok) {
			const errorData = await response.json();
			const message = errorData.error || `Status ${response.status}`;
			console.error(`❌ Failed to update ${guestName}:`, message);
			rsvpState.registryError = message;
			return;
		}

		console.log(`✅ Updated registry for ${guestName}: ${isAttending ? 'YES' : 'NO'}`);
	} catch (e: any) {
		console.error(`❌ Network or unexpected error while updating ${guestName}:`, e.message);
		rsvpState.registryError = e.message;
	} finally {
		rsvpState.isRegistryLoading = false;
	}
};

export const loadGuests = async () => {
	rsvpState.isGuestLoading = true;
	rsvpState.guestError = null;

	try {
		const response = await fetch('/api/guests');

		if (!response.ok) {
			throw new Error(`Request failed with status: ${response.status}`);
		}

		const data = await response.json();

		const guests = data.rows.flatMap((row: string[]) => {
			const tier = Number(row[2]);
			if (!isNaN(tier) && row[0] !== undefined) {
				if (tier <= tierCutoff) {
					return [row[0]];
				}
			}
			return [];
		});

		console.log(guests);
		rsvpState.guestList = guests;
	} catch (e: any) {
		rsvpState.guestError = e.message;
		console.error('❌ FAILED:', e);
	} finally {
		rsvpState.isGuestLoading = false;
	}
};