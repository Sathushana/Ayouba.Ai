'use client'
import { geistSans, geistMono } from '../fonts'  // go up one level to project root

export default function LayoutWrapper({ children }) {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      {children}
    </div>
  )
}
