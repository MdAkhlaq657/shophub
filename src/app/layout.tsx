'use client';

import { Provider } from 'react-redux';
import { store } from '@/lib/store';
import { useAppSelector } from '@/lib/hooks';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Toaster } from 'react-hot-toast';
import './globals.css';
import { useEffect } from 'react';

function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const themeMode = useAppSelector((state) => state.theme.mode);

  useEffect(() => {
    if (themeMode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [themeMode]);

  return (
    <div className={themeMode === 'dark' ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>ShopHub - Advanced E-commerce Platform</title>
        <meta name="description" content="Discover amazing products at unbeatable prices" />
      </head>
      <body className="antialiased">
        <Provider store={store}>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#fff',
                },
              },
            }}
          />
          <ThemeWrapper>{children}</ThemeWrapper>
        </Provider>
      </body>
    </html>
  );
}