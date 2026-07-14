"use client";

import { useState } from "react";
import Sidebar from "../../app/components/contexts/Sidebar";
import Header from "../../app/components/contexts/Header";
import CashingSchedulePageComp from "../components/cashing-schedule/CashingSchedulePageComp"

const CashingSchedulePage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen w-full flex bg-gray-50">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className="flex-1 flex flex-col min-w-0">
            <Header onMenuClick={() => setSidebarOpen(true)} />
            <CashingSchedulePageComp />
        </div>
        </div>
    );

}

export default CashingSchedulePage