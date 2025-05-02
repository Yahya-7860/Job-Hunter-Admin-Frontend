import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';


const Login = () => {
    const [cred, setCred] = useState({
        username: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const option = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cred)
        }
        try {
            await fetch("http://localhost:5000/admin-login/auth", option)
                .then((res) => res.json())
                .then((data) => {
                    if (data.Message == "Found") {
                        localStorage.setItem('token', data.token);
                        navigate('/');
                    } else {
                        toast.error(data.Message);
                    }
                    // console.log(data);
                })
        } catch (error) {
            console.error(error);
            toast.error("Someting went wrong");
        }

    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 px-4">
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-sm">
                <h2 className="text-2xl font-semibold text-center text-blue-700 mb-6">Admin Login</h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={cred.username}
                            onChange={(e) => setCred((prev) => ({ ...prev, username: e.target.value }))}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={cred.password}
                            onChange={(e) => setCred((prev) => ({ ...prev, password: e.target.value }))}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-500 transition shadow"
                    >
                        Login
                    </button>
                </form>
            </div>
            <ToastContainer position='bottom-left' />
        </div>
    );
};

export default Login;
