import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Header from './Header';
import LoadingPage from '../page/LoadingPage';


const JobForm = () => {
    const HOST = import.meta.env.VITE_HOST;

    const [formData, setFormData] = useState({
        companyName: '',
        role: '',
        jobType: '',
        overview: '',
        jobDescription: '',
        requirement: '',
        applyLink: '',
        email: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const option = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        }
        try {
            setLoading(true);
            await fetch(`http://${HOST}:5000/job_post`, option)
                .then((res) => res.json())
                .then((data) => {
                    if (data.Message == "Job Posted") {
                        setLoading(false);
                        toast.success("Post Uploaded");
                        setFormData({
                            companyName: '',
                            role: '',
                            overview: '',
                            jobDescription: '',
                            requirement: '',
                            applyLink: '',
                            email: ''
                        });
                    }
                    else {
                        setLoading(false);
                        toast.error("server error")
                    }
                })
        } catch (err) {
            setLoading(false);
            console.error(err);
            toast.error("Unable to upload")
        }
    };

    return (
        <>
            <Header />
            <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-md mt-10 ">
                <h2 className="text-2xl font-semibold mb-6 text-center">Post a Job</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block font-medium mb-1">Company Name</label>
                        <input
                            type="text"
                            name="companyName"
                            value={formData.companyName}
                            onChange={(handleChange)}
                            autoComplete='off'
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Role</label>
                        <input
                            type="text"
                            name="role"
                            value={formData.role}
                            onChange={(handleChange)}
                            autoComplete='off'
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Job Type</label>
                        <div className='flex gap-5'>
                            <div className='flex text-center gap-1'>
                                <input type="radio" id="full_time" name='jobType' value="full time" onChange={handleChange} />
                                <label htmlFor="full_time">Full Time</label>
                            </div>
                            <div className='flex text-center gap-1'>
                                <input type="radio" id="internship" name='jobType' value="internship" onChange={handleChange} />
                                <label htmlFor="internship">Internship</label>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Overview</label>
                        <textarea
                            name="overview"
                            value={formData.overview}
                            onChange={handleChange}
                            rows="3"
                            autoComplete='off'
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Job Description</label>
                        <textarea
                            name="jobDescription"
                            value={formData.jobDescription}
                            onChange={handleChange}
                            rows="4"
                            autoComplete='off'
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"

                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Requirements</label>
                        <textarea
                            name="requirement"
                            value={formData.requirement}
                            onChange={handleChange}
                            rows="3"
                            autoComplete='off'
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"

                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Apply Link</label>
                        <input
                            type="text"
                            name="applyLink"
                            value={formData.applyLink}
                            onChange={handleChange}
                            autoComplete='off'
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">HR Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 active:bg-blue-800 cursor-pointer transition duration-300"
                    >
                        Submit Job
                    </button>
                </form>
                {
                    loading ? <LoadingPage /> : null
                }
                <ToastContainer position='bottom-left' />
            </div>
        </>
    );
};

export default JobForm;
