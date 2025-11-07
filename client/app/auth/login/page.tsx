'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppDispatch } from '@/lib/store/hooks';
import { loginAsync } from '@/lib/store/slices/authSlice';
import { toast } from 'sonner';
import { Mail } from 'lucide-react'

export default function LoginPage(): React.JSX.Element {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Use real API call
      await dispatch(loginAsync({ email, password })).unwrap();
      toast.success('Login successful!');
      router.push('/');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-white to-primary/5 p-6">
      <Card className="w-full max-w-md shadow-lg border-t-4 border-primary">
        <CardHeader className="space-y-3 text-center">
          <div className="flex justify-center mb-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white font-bold text-2xl shadow-md">
              A
            </div>
          </div>
          <CardTitle className="text-3xl font-semibold text-gray-800">Welcome Back</CardTitle>
          <CardDescription className="text-gray-500">
            Sign in to your <span className="font-medium text-primary">AVE Catering</span> account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </label>
              <div className='relative'>
                <Mail className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
              <Input
                id="email"
                type="email"
                placeholder="you@business.com"
                value={email}
                onChange={handleEmailChange}
                required
                className='pl-9 focus:ring-2 focus:ring-primary/50 transition-all'
              />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <Link
                  href="/auth/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Don&apos;t have an account? </span>
            <Link href="/auth/register" className="text-primary hover:underline font-medium">
              Register Here
            </Link>
          </div>

          <div className="mt-4 text-center">
            <Link href="/">
              <Button variant="ghost" size="sm">
                Back to Home
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
