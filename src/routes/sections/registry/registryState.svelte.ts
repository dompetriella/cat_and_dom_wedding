
const tierCutoff = 2;

export const guestState = $state({
    guestList: [] as string[],
    isLoading: false,
    error: null as string | null,
});

export const loadGuests = async () => {
    guestState.isLoading = true;
    guestState.error = null;

    try {
        const response = await fetch('/api/');

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
        guestState.guestList = guests;
    } catch (e: any) {
        guestState.error = e.message;
        console.error('❌ FAILED:', e);
    } finally {
        guestState.isLoading = false;
    }
};