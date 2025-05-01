import React, { useState } from 'react';
import { IoClose } from "react-icons/io5";
import { ToastContainer, toast } from 'react-toastify';


const NewAdminModal = ({ onClose }) => {
    const [cred, setCred] = useState({
        username: '',
        password: ''
    });


    const handleSubmit = async (e) => {
        e.preventDefault();
        const option = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cred)
        }
        try {
            await fetch("http://localhost:5000/add_admin", option)
                .then((res) => res.json())
                .then((data) => {
                    toast.success("Admin Created");
                    setCred((pre) => ({ ...pre, username: '', password: '' }));
                })
        } catch (error) {
            console.error(error);
            toast.error(`Unable to create admin ${cred.username}`);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-3xl bg-opacity-40">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
                >
                    <IoClose className="w-5 h-5" />
                </button>

                <h2 className="text-xl font-semibold text-center text-blue-700 mb-5">
                    Register New Admin
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Username</label>
                        <input
                            type="text"
                            value={cred.username}
                            onChange={(e) => setCred((pre) => ({ ...pre, username: e.target.value }))}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <input
                            type="password"
                            value={cred.password}
                            onChange={(e) => setCred((pre) => ({ ...pre, password: e.target.value }))}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-500 transition shadow"
                    >
                        Create
                    </button>
                </form>
            </div>
            <ToastContainer position='bottom-left' />
        </div>
    );
};

export default NewAdminModal;
