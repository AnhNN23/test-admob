// lib/tokenService.ts
export async function exchangeCodeForToken(code: string) {
    const params = new URLSearchParams({
      code,
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      client_secret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
      redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI!,
      grant_type: 'authorization_code',
    });
  
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });
  
    if (!response.ok) {
      throw new Error('Failed to exchange token');
    }
  
    return response.json(); // Trả về { access_token, refresh_token, ... }
  }
  