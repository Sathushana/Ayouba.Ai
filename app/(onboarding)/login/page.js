// app/(onboarding)/login/page.js
"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (email && password) {
            console.log('Logging in user:', email);
            
            setTimeout(() => {
                
                console.log('Login successful. Redirecting to dashboard.');
                router.push('/app'); 
            }, 1000);
        } else {
            setError('Please enter both email and password.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-sm bg-white p-8 rounded-xl shadow-lg space-y-6 text-center">
                <h2 className="text-3xl font-bold text-[#C263F2]">Welcome Back!</h2>
                <p className="text-gray-500">Sign in to continue your journey.</p>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                        <p className="text-sm text-red-500 bg-red-100 p-2 rounded-lg">{error}</p>
                    )}
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-[#C263F2] focus:ring-0 text-black"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-[#C263F2] focus:ring-0 text-black"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        style={{ backgroundColor: '#C263F2' }}
                        className="w-full py-3 rounded-xl font-semibold text-white hover:opacity-90 transition"
                    >
                        Sign In
                    </button>
                </form>

                <p className="text-sm text-gray-600">
                    New to Lifeshift?{' '}
                    <Link href="/register" className="text-[#C263F2] font-semibold hover:underline">
                        Create an account
                    </Link>
                </p>
            </div>
        </div>
    );
}