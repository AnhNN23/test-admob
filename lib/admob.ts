// // lib/admob.ts
// import { google } from 'googleapis';
// import { readFile } from 'fs/promises';
// import path from 'path';
// import { oAuth2Client } from './google';

// export async function getAdmobService() {
//   const TOKEN_PATH = path.join(process.cwd(), 'token.json');

//   const tokenData = await readFile(TOKEN_PATH, 'utf-8');
//   const tokens = JSON.parse(tokenData);
//   oAuth2Client.setCredentials(tokens);

//   return google.admob({ version: 'v1', auth: oAuth2Client });
// }
