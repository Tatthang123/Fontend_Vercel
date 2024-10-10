import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet></Outlet>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
