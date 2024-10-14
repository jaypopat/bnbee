import React from 'react';
import Navbar from '@/components/Navbar';

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-secondary pt-12 md:px-20 lg:px-40 px-10 space-y-10">
      <Navbar />
      {children}
      {/* Footer */}
    </div>
  );
}

export default MainLayout;
