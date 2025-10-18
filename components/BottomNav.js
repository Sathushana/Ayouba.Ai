"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
    { name: 'Home', href: '/app', icon: '🏠' },
    { name: 'Goals', href: '/app/goals/activity', icon: '🎯' }, 
    { name: 'Rewards', href: '/app/rewards', icon: '🏆' },
    { name: 'Profile', href: '/app/profile', icon: '👤' },
];

const PRIMARY_COLOR = '#C263F2'; 

export default function BottomNav() {
    const pathname = usePathname();

    
    const isActive = (href) => {
        if (href === '/app') {
            return pathname === '/app';
        }
        return pathname.startsWith(href) && href !== '/app';
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-xl md:hidden">
            <nav className="flex justify-around items-center h-16 max-w-lg mx-auto">
                {navItems.map((item) => {
                    const active = isActive(item.href);
                    return (
                        <Link key={item.name} href={item.href} className="flex flex-col items-center justify-center p-1 w-full transition duration-200 active:scale-95">
                            <span 
                                className={`text-2xl transition-colors ${active ? 'text-4xl' : 'text-3xl'}`}
                                style={{ color: active ? PRIMARY_COLOR : 'grey' }}
                            >
                                {item.icon}
                            </span>
                            <span 
                                className={`text-xs font-semibold mt-0.5 transition-colors`}
                                style={{ color: active ? PRIMARY_COLOR : 'grey' }}
                            >
                                {item.name}
                            </span>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}