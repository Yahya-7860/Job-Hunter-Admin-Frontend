import React, { useEffect, useState } from 'react'
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { SyncLoader } from "react-spinners";
import SubsCard from '../components/SubsCard';


const SubscribersPage = () => {
    const HOST = import.meta.env.VITE_HOST;

    const navigate = useNavigate();
    const [subs, setSubs] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleBack = () => {
        navigate('/');
    }
    const option = {
        method: "GET"
    }
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await fetch(`http://${HOST}:5000/mail/get_email`, option)
                .then((res) => res.json())
                .then((data) => {
                    setSubs(data.AllMails);
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
                    [...subs].reverse().map((one, i) => (
                        <SubsCard key={i} id={one._id} setSubs={setSubs} email={one.email} />
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

export default SubscribersPage;
