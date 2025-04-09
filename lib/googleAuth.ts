// lib/googleAuth.ts
const API_SCOPE = [
    'https://www.googleapis.com/auth/admob.readonly',
    'https://www.googleapis.com/auth/admob.report',
  ];
  
  export function getGoogleAuthUrl() {
    const params = new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI!,
      response_type: 'code',
      access_type: 'offline',
      scope: API_SCOPE.join(' '),
      prompt: 'consent', 
    });
  
    return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  }
  