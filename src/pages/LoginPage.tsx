import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import API_BASE_URL from '../util/ApiConfig';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch(`${API_BASE_URL}/auth/login`, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({ "email": email, "password": password }),
        headers: { 'Content-Type': 'application/json' }
      }).then(
        response => response.json()
      ).then(
        data => {
            login(data.token);
            navigate('/');
        }
      );
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className='min-h-full content-center'>
      <div className="h-auto max-w-md mx-auto p-6 bg-slate-700 shadow rounded">
        <h1 className="text-2xl font-bold mb-4 text-white">Get Started</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-2 border rounded" required />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-2 border rounded" required />
          <button type="submit" className="w-full bg-slate-500 text-white p-2 rounded">Login</button>
        </form>
      </div>
    </div>
    
  );
}
