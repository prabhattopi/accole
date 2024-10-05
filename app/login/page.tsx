'use client'; // Ensure client-side rendering

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser } from '../hooks/api';
import Link from 'next/link'; // Import Next.js Link for navigation

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await loginUser(email, password);
      localStorage.setItem('token', data.token); // Store token
      router.push('/dashboard'); // Redirect to dashboard
    } catch (err) {
      console.log(err);
      setError('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Login to your account</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <input
            type="email"
            placeholder="Email address"
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Sign In'}
          </button>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}

        {/* Add the link to the Register page */}
        <p className="mt-4">
          Don&lsquo;t have an account?{' '}
          <Link href="/register" className="text-blue-500">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
