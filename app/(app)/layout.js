"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import BottomNav from '../../components/BottomNav';
import { Inter } from "next/font/google";


const inter = Inter({ subsets: ["latin"] });

export default function AppLayout({ children }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    
    const isAuthenticated = true; 

    useEffect(() => {
        
        if (!isAuthenticated) {
            router.push('/login');
        } else {
            setIsLoading(false);
        }
    }, [isAuthenticated, router]);

    if (isLoading) {
        
        return (
            <div className="min-h-screen flex items-center justify-center text-xl font-bold" style={{ color: '#C263F2' }}>
                Loading Lifeshift... 🚀
            </div>
        );
    }

    
    return (
        <html lang="en">
            <body className={inter.className}>
                
                <main className="min-h-screen bg-gray-50 pb-20 md:pb-4 md:p-12">
                    {children}
                </main>
                
                
                <BottomNav />
            </body>
        </html>
    );
}