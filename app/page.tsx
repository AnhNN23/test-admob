'use client';

import { useEffect } from 'react';
import { exchangeCodeForToken } from '@/lib/tokenService';
import { getGoogleAuthUrl } from '@/lib/googleAuth';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function Home() {
  // useEffect(() => {
  //   const url = new URL(window.location.href);
  //   const code = url.searchParams.get('code');

  //   const handleOAuth = async () => {
  //     if (!code) return;

  //     try {
  //       const tokens = await exchangeCodeForToken(code);
  //       Cookies.set('access_token', tokens.access_token);

  //       // Xoá `code` trên URL sau khi lấy token thành công
  //       url.searchParams.delete('code');
  //       window.history.replaceState({}, '', url.toString());

  //       // Middleware sẽ tự xử lý redirect sau reload
  //       window.location.reload();
  //     } catch (error) {
  //       console.error('❌ Token exchange error:', error);
  //     }
  //   };

  //   handleOAuth();
  // }, []);

  // const handleLogin = () => {
  //   window.location.href = getGoogleAuthUrl();
  // };

  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
      {/* Left column - Google Login */}
      <div className="flex flex-col items-center justify-center p-8">
        <div className="mx-auto w-full max-w-sm space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Welcome back</h1>
            <p className="text-gray-500">Sign in to your account with Google</p>
          </div>
          {/* <Button onClick={handleLogin} className="w-full" variant="outline">
            <GoogleIcon className="mr-2 h-4 w-4" />
            Sign in with Google
          </Button> */}
        </div>
      </div>

      {/* Right column - Illustration */}
      <div className="hidden bg-gray-100 md:block">
        <Image
          src="/placeholder.svg?height=800&width=600"
          alt="Login illustration"
          width={600}
          height={800}
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="21.17" x2="12" y1="8" y2="8" />
      <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
      <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
    </svg>
  );
}
