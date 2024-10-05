'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import from next/navigation
import { registerUser } from '../hooks/api'; // Import register API function

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter(); // Correct import from next/navigation

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await registerUser(name, email, password);
      router.push('/login'); // Redirect to login page after successful registration
    } catch (err) {
      console.log(err);
      setError('Failed to register');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Create an account</h2>
        <form onSubmit={handleRegister} className="space-y-6">
          <input
            type="text"
            placeholder="Name"
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-md" disabled={loading}>
            {loading ? 'Registering...' : 'Sign Up'}
          </button>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        <p className="mt-4">
          Already have an account? <a href="/login" className="text-blue-500">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
