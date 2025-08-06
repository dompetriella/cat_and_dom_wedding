import { json } from '@sveltejs/kit';
import { google } from 'googleapis';
import {
    GOOGLE_SHEET_ID,
    GOOGLE_SERVICE_ACCOUNT_EMAIL,
    GOOGLE_PRIVATE_KEY
} from '$env/static/private';
import { Global } from '$lib/server/global.server';

const auth = new google.auth.GoogleAuth({
    credentials: {
        client_email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
});

const sheets = google.sheets({ version: 'v4', auth });

export async function GET() {
	try {
		const range = `Sheet${Global.sheetNumber}!${Global.guestListColumn}:${Global.tierColumn}`;
		const response = await sheets.spreadsheets.values.get({
			spreadsheetId: GOOGLE_SHEET_ID,
			range
		});


		const rows = response.data.values;

		return json({ rows });
	} catch (error) {
		console.error('The API returned an error:', error);
		return json({ error: 'Failed to fetch data' }, { status: 500 });
	}
}