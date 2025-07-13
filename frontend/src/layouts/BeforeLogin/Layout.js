import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const BeforeLoginLayout = ({ children }) => {
  return (
    <>
      {/* Header */}
      <Header />

      {/* Page Content */}
      <main className="mt-0 transition-all duration-200 ease-in-out">
        {children}
      </main>
      {/* Footer */}
      <Footer />
    </>
  );
};

export default BeforeLoginLayout;
