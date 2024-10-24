import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-svh bg-secondary xs:p-1 md:p-4">
      <div className="max-w-screen-lg mx-auto space-y-10">
        <Navbar />
        {children}
        <Footer />
      </div>
    </div>
  );
}

export default MainLayout;
