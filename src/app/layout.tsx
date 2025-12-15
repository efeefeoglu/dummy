import Link from 'next/link';
import { ReactNode } from 'react';
import './globals.css';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Innovate
        </Link>
        <div className="space-x-4">
          <Link href="/" className="hover:text-gray-300">Home</Link>
          <Link href="/brands" className="hover:text-gray-300">Brands</Link>
          <Link href="/products" className="hover:text-gray-300">Products</Link>
          <Link href="/solutions" className="hover:text-gray-300">Solutions</Link>
          <Link href="/contact" className="hover:text-gray-300">Contact</Link>
          <Link href="/dashboard" className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded">Dashboard</Link>
        </div>
      </div>
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white p-6 mt-12">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Innovate. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
