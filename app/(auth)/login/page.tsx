'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import { useSignIn } from '@clerk/nextjs';
import { AuthForm } from '@/components/auth-form';
import { SubmitButton } from '@/components/submit-button';
import { toast } from '@/components/toast';
import { SocialAuthButtons } from '@/components/social-auth-buttons';

export default function Page() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [isSuccessful, setIsSuccessful] = useState(false);

  const { isLoaded, signIn, setActive } = useSignIn();

  useEffect(() => {
    if (isSuccessful) {
      const timeout = setTimeout(() => router.push('/'), 300);
      return () => clearTimeout(timeout);
    }
  }, [isSuccessful, router]);

  const handleSubmit = async (formData: FormData) => {
    if (!isLoaded) return;
    const emailVal = formData.get('email') as string;
    const passwordVal = formData.get('password') as string;
    setEmail(emailVal);
    try {
      const result = await signIn.create({
        identifier: emailVal,
        password: passwordVal,
      });
      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        setIsSuccessful(true);
        toast({ type: 'success', description: 'Signed in successfully' });
        router.refresh();
      } else {
        toast({
          type: 'error',
          description: 'Additional verification required',
        });
      }
    } catch (e: any) {
      toast({
        type: 'error',
        description: e?.errors?.[0]?.message || 'Invalid credentials',
      });
    }
  };

  // Google OAuth redirect flow
  const handleGoogle = useCallback(async () => {
    if (!isLoaded) return;
    try {
      await signIn.authenticateWithRedirect({
        strategy: 'oauth_google',
        redirectUrl: '/sso-callback',
        redirectUrlComplete: '/',
      });
    } catch (e: any) {
      toast({
        type: 'error',
        description: e?.errors?.[0]?.message || 'Google sign-in failed',
      });
    }
  }, [isLoaded, signIn]);

  return (
    <div className="flex h-dvh w-screen items-start justify-center bg-background pt-12 md:items-center md:pt-0">
      <div className="flex w-full max-w-md flex-col gap-12 overflow-hidden rounded-2xl">
        <div className="flex flex-col items-center justify-center gap-2 px-4 text-center sm:px-16">
          <h3 className="font-semibold text-xl dark:text-zinc-50">Sign In</h3>
          <p className="text-gray-500 text-sm dark:text-zinc-400">
            Use your email and password to sign in
          </p>
        </div>
        <AuthForm action={handleSubmit} defaultEmail={email}>
          <SubmitButton isSuccessful={isSuccessful}>
            {isLoaded ? 'Sign in' : 'Loading'}
          </SubmitButton>
          <SocialAuthDivider />
          <SocialAuthButtons mode="sign-in" />
          <p className="mt-4 text-center text-gray-600 text-sm dark:text-zinc-400">
            {"Don't have an account? "}
            <Link
              className="font-semibold text-gray-800 hover:underline dark:text-zinc-200"
              href="/register"
            >
              Sign up
            </Link>
            {' for free.'}
          </p>
        </AuthForm>
      </div>
    </div>
  );
}

function SocialAuthDivider() {
  return (
    <div className="relative my-4">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <span className="w-full border-t border-border" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-background px-2 text-muted-foreground">or</span>
      </div>
    </div>
  );
}
