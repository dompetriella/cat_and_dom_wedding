
const tierCutoff = 2;

export const state = $state({
    guestList: [] as string[],
    isLoading: false,
    error: null as string | null,
});

export const loadGuests = async () => {
    state.isLoading = true;
    state.error = null;

    console.log('hello')

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
        state.guestList = guests;
    } catch (e: any) {
        state.error = e.message;
        console.error('❌ FAILED:', e);
    } finally {
        state.isLoading = false;
    }
};