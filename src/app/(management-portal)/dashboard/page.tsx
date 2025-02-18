"use client";
import { useState } from "react";
import { Home, LineChart, Settings, Users, Menu, X } from "lucide-react";

const Dashboard = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-20 w-64 bg-gray-900 text-white p-5 transition-transform ${isOpen ? "translate-x-0" : "-translate-x-64"} md:translate-x-0 md:relative`}>
                <h1 className="text-xl font-bold">Dashboard</h1>
                <nav className="mt-5 space-y-3">
                    <a href="#" className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-800">
                        <Home className="w-5 h-5" /> <span>Home</span>
                    </a>
                    <a href="#" className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-800">
                        <Users className="w-5 h-5" /> <span>Users</span>
                    </a>
                    <a href="#" className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-800">
                        <LineChart className="w-5 h-5" /> <span>Reports</span>
                    </a>
                    <a href="#" className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-800">
                        <Settings className="w-5 h-5" /> <span>Settings</span>
                    </a>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Top Bar */}
                <header className="flex justify-between items-center bg-white shadow-md p-5 md:p-6">
                    <button className="md:hidden" onClick={toggleSidebar}>
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                    <h2 className="text-xl font-semibold">Dashboard Overview</h2>
                    <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                </header>

                {/* Dashboard Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 p-5">
                    <div className="bg-white shadow-lg p-5 rounded-lg">
                        <h3 className="text-lg font-bold">Total Users</h3>
                        <p className="text-3xl font-bold">1,250</p>
                    </div>
                    <div className="bg-white shadow-lg p-5 rounded-lg">
                        <h3 className="text-lg font-bold">Revenue</h3>
                        <p className="text-3xl font-bold">$52,450</p>
                    </div>
                    <div className="bg-white shadow-lg p-5 rounded-lg">
                        <h3 className="text-lg font-bold">New Orders</h3>
                        <p className="text-3xl font-bold">320</p>
                    </div>
                    <div className="bg-white shadow-lg p-5 rounded-lg">
                        <h3 className="text-lg font-bold">Support Tickets</h3>
                        <p className="text-3xl font-bold">75</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
