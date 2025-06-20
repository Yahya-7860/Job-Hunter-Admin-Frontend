import React, { useState } from 'react';
import LoadingPage from '../page/LoadingPage';

const JobCard = ({ setJobs, company, role, id, CurDate, jobType }) => {
    const readableCurDate = new Date(CurDate).toDateString();
    const [loading, setLoading] = useState(false);
    const HOST = import.meta.env.VITE_HOST;

    const handleDelete = async () => {
        const option = {
            method: "DELETE",
        }
        const option2 = {
            method: "GET",
        }
        try {
            setLoading(true);
            await fetch(`http://${HOST}:5000/post_delete?id=${id}`, option)
                .then((res) => res.json())
                .then(async (data) => {
                    if (data.Message == "Post Deleted") {
                        await fetch(`http://${HOST}:5000/get_all_posts`)
                            .then((res) => res.json())
                            .then((data) => {
                                setLoading(false);
                                setJobs(data.posts);
                            })
                    }
                    // console.log(data)
                })
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border border-black shadow-md rounded-md px-4 py-3 my-2 bg-white space-y-3 sm:space-y-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 text-sm sm:text-base">
                <div className="flex space-x-1">
                    <span className="font-medium">Company : </span>
                    <span>{company}</span>
                </div>
                <div className="flex space-x-1">
                    <span className="font-medium">Role : </span>
                    <span>{role}</span>
                </div>
                <div className="flex space-x-1">
                    <span className="font-medium">Job Type : </span>
                    <span>{jobType}</span>
                </div>
                <div className="flex space-x-1">
                    <span className="font-medium">Uploaded : </span>
                    <span>{readableCurDate}</span>
                </div>
            </div>
            <button
                onClick={handleDelete}
                className="text-xs sm:text-sm bg-red-500 hover:bg-red-600 active:bg-red-800 text-white px-3 sm:px-4 py-1 rounded-md transition cursor-pointer"
            >
                Delete
            </button>
            {
                loading ? <LoadingPage /> : null
            }
        </div>
    );
};

export default JobCard;
