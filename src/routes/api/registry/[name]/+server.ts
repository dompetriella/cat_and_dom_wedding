import { json, type RequestHandler } from '@sveltejs/kit';
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

export const PUT: RequestHandler = async ({ params, request }) => {
	const guestName: string | undefined = params?.name;

	const body = (await request.json()) as { isAttending: string };
	const isAttending: string = body.isAttending;

	let rows: string[] | Error;

	if (!guestName) {
		return json({ error: 'Guest name is empty' }, { status: 400 });
	}

	if (!body) {
		return json({ error: 'Attendence not found' }, { status: 400 });
	}

	try {
		const range = `Sheet${Global.sheetNumber}!${Global.guestListColumn}:${Global.guestListColumn}`;
		const response = await sheets.spreadsheets.values.get({
			spreadsheetId: GOOGLE_SHEET_ID,
			range
		});

		const values = response.data.values ?? [];
		rows = values.map((row) => row[0] ?? '');
	} catch (error) {
		console.error('The API returned an error:', error);
		rows = error as Error;
	}

	if (rows instanceof Error) {
		return json({ error: 'Trouble reaching Google Sheets' }, { status: 500 });
	}

	const guestRowIndex = rows.indexOf(guestName);

	if (guestRowIndex == -1) {
		return json({ error: "Couldn't find guest in retrieved data" }, { status: 400 });
	}

	const cellToUpdate = Global.attendingColumn + (guestRowIndex + 1);

	try {
		await sheets.spreadsheets.values.update({
			spreadsheetId: GOOGLE_SHEET_ID,
			range: `Sheet${Global.sheetNumber}!${cellToUpdate}`,
			valueInputOption: 'RAW',
			requestBody: {
				values: [[ isAttending ]]
			}
		});

		return json({
			success: true,
			updatedCell: cellToUpdate,
			newValue: isAttending
		});
	} catch {
		return json({ error: `Update of guest ${guestName} failed` }, { status: 400 });
	}
};
