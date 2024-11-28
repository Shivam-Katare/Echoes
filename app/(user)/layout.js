import React from 'react';
import { Nunito, Playfair_Display, Poppins, Merienda } from 'next/font/google';

export const nunito = Nunito({ subsets: ['latin'], weight: '400' });
export const playfair = Playfair_Display({ subsets: ['latin'], weight: '700' });
export const poppins = Poppins({ subsets: ['latin'], weight: '400' });
export const merienda = Merienda({ subsets: ['vietnamese'], weight: '500' });

const Layout = React.memo(({ children }) => {
  return (
    <div className="">
      {/* <Navbar /> */}
      <div className="w-full">
        {children}
      </div>
    </div>
  );
});

Layout.displayName = 'Layout';

export default Layout;