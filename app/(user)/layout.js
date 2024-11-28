import React from 'react';
import { Nunito, Playfair_Display, Poppins } from 'next/font/google';

export const nunito = Nunito({ subsets: ['latin'], weight: '400' });
export const playfair = Playfair_Display({ subsets: ['latin'], weight: '700' });
export const poppins = Poppins({ subsets: ['latin'], weight: '400' });

const Layout = React.memo(({ children }) => {
  return (
    <div className="h-screen">
      {/* <Navbar /> */}
      <div className="w-full  gradient-hero-4 min-h-screen">
        {children}
      </div>
    </div>
  );
});

Layout.displayName = 'Layout';

export default Layout;