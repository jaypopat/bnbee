import React from 'react';
import Navbar from '@/components/Navbar';
import AuthProvider from '@/context/AuthProvider/AuthProvider.tsx';
import Footer from '@/components/Footer';

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <div className="relative min-h-svh bg-secondary xs:p-1 md:p-4">
        <div className="max-w-screen-lg mx-auto space-y-10">
          <Navbar />
          {children}
          <Footer />
        </div>
      </div>
    </AuthProvider>
  );
}

export default MainLayout;
