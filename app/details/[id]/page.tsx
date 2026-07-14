"use client";

import { useState } from "react";
import Sidebar from "../../components/contexts/Sidebar";
import Header from "../../components/contexts/Header";
import DetailsPageComp from "../../components/contexts/Detailspage"
const DetailsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen w-full flex bg-gray-50">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <DetailsPageComp />
      </div>
    </div>
  );
}
export default DetailsPage