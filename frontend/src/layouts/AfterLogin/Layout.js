import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

const AfterLoginLayout = ({ children }) => {
  return (
    <>
      {/* Sidebar */}
      <Sidebar />

      {/* Page Content */}
      <main className="relative h-full max-h-screen transition-all duration-200 ease-in-out xl:ml-68 rounded-xl">
        {/* Header */}
        <Header />

        <div className="w-full px-6 py-6 mx-auto">
          {children}

          {/* Footer */}
          <Footer />
        </div>
      </main>
    </>
  );
};

export default AfterLoginLayout;
