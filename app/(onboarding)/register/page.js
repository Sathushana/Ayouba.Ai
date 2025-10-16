// app/(onboarding)/register/page.js
"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        
        
        if (name && email && password) {
            console.log('Registering user:', email);
            
            setTimeout(() => {
                
                
                console.log('Registration successful. Redirecting to dashboard.');
                router.push('/app'); 
            }, 1000);
        } else {
            setError('Please fill in all fields.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-sm bg-white p-8 rounded-xl shadow-lg space-y-6 text-center">
                <h2 className="text-3xl font-bold text-[#C263F2]">Create Your Lifeshift Profile</h2>
                <p className="text-gray-500">Just one step left to start your personalized plan!</p>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                     {error && (
                        <p className="text-sm text-red-500 bg-red-100 p-2 rounded-lg">{error}</p>
                    )}
                    <div>
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-[#C263F2] focus:ring-0 text-black"
                            required
                        />
                    </div>
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
                        Start My Lifeshift!
                    </button>
                </form>

                <p className="text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link href="/login" className="text-[#C263F2] font-semibold hover:underline">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}