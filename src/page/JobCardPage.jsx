import React, { useEffect, useState } from 'react'
import JobCard from '../components/JobCard'
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { SyncLoader } from "react-spinners";


const JobCardPage = () => {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const HOST = import.meta.env.VITE_HOST;

    const handleBack = () => {
        navigate('/');
    }
    const option = {
        method: "GET"
    }
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await fetch(`http://${HOST}:5000/get_posts`, option)
                .then((res) => res.json())
                .then((data) => {
                    // console.log(data);
                    setJobs(data.posts);
                    setLoading(false);
                })
        }
        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-300 to-blue-500 py-5 px-4">
            <div>
                <FaArrowAltCircleLeft className='text-3xl' onClick={handleBack} />
            </div>
            <h1 className='flex justify-center text-3xl font-bold mb-6 text-white'>All Jobs</h1>
            <div className="space-y-4">
                {
                    [...jobs].reverse().map((one, i) => (
                        <JobCard key={i} company={one.companyName} role={one.role} id={one._id} setJobs={setJobs} CurDate={one.createdAt} />
                    ))
                }
            </div>
            <div className='flex justify-center items-center' >
                <SyncLoader
                    color="white"
                    loading={loading}
                    size={10}
                />
            </div>
        </div>
    )
}

export default JobCardPage
