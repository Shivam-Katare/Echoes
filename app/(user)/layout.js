import React from 'react';

const Layout = React.memo(({ children }) => {
  return (
    <div className="h-screen">
      {/* <Navbar /> */}
      <div className="w-full h-screen bg-black">
        {children}
      </div>
    </div>
  );
});

Layout.displayName = 'Layout';

export default Layout;