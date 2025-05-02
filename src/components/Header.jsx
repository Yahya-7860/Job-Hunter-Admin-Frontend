import React, { useState } from 'react';
import { FiAlignLeft } from "react-icons/fi";
import { FiAlignRight } from "react-icons/fi";
import NewAdminModal from '../modal/NewAdmin';
import { useNavigate } from 'react-router-dom';


const Header = () => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const onLogout = () => {
        localStorage.removeItem("token");
        navigate('/login');
    }
    const handleAllJobs = () => {
        navigate('/job-cards');
    }

    return (
        <>
            {/* Header */}
            <header className="fixed top-0 w-full bg-gradient-to-r from-blue-800 to-blue-600 text-white shadow-2xl py-3 px-4 flex items-center justify-between">
                {/* Left: Logo */}
                <div className="flex items-center space-x-2 " >
                    <img src="/images/logo.jpg" alt="Logo" className="rounded-2xl h-8 w-8 sm:h-10 sm:w-10" />
                    <span className="font-bold text-lg sm:text-xl tracking-wide">JobHunter</span>
                </div>

                {/* Center: Title (Hidden on small screens) */}
                <h1 className="hidden sm:block absolute left-1/2 transform -translate-x-1/2 text-xl sm:text-2xl font-semibold">
                    Admin Panel
                </h1>

                {/* Right: Buttons or Hamburger */}
                <div className="hidden sm:flex space-x-3">
                    <button
                        onClick={handleAllJobs}
                        className="bg-yellow-700 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg shadow transition"
                    >
                        All Jobs
                    </button>
                    <button
                        onClick={() => setIsOpen((pre) => !pre)}
                        className="bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow transition"
                    >
                        Add Admin
                    </button>
                    <button
                        onClick={onLogout}
                        className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-lg shadow transition"
                    >
                        Logout
                    </button>
                </div>

                {/* Hamburger for small screens */}
                <div className="sm:hidden">
                    <button onClick={() => setSidebarOpen(true)}>
                        <FiAlignRight className="h-6 w-6" />
                    </button>
                </div>
            </header>

            {/* Sidebar Drawer (Mobile) */}
            <div
                className={` fixed top-0 right-0 h-full w-2/3 max-w-xs bg-gradient-to-tl from-blue-300 to-blue-100 shadow-2xl z-50 transform transition-transform ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="flex items-center justify-between p-4 border-b">
                    <span className="text-lg font-semibold">Menu</span>
                    <button onClick={() => setSidebarOpen(false)}>
                        <FiAlignLeft className="h-6 w-6 text-gray-600" />
                    </button>
                </div>

                <div className="p-4 flex flex-col space-y-4">
                    <button
                        onClick={handleAllJobs}
                        className="bg-yellow-600 hover:bg-yellow-500 text-white px-4 py-2 rounded-md"
                    >
                        All Jobs
                    </button>
                    <button
                        onClick={() => {
                            setIsOpen(true);
                            setSidebarOpen(false);
                        }}
                        className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                        Add Admin
                    </button>
                    <button
                        onClick={() => {
                            onLogout();
                            setSidebarOpen(false);
                        }}
                        className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-md"
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* Overlay when sidebar is open */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 backdrop-blur-sm"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
            {isOpen && <NewAdminModal onClose={() => setIsOpen((pre) => !pre)} />}
        </>
    );
};

export default Header;
