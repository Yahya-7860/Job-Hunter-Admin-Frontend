import React, { useState } from 'react';
import LoadingPage from '../page/LoadingPage';

const SubsCard = ({ setSubs, email, id }) => {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        const option = {
            method: "DELETE",
        }
        const option2 = {
            method: "GET",
        }
        try {
            setLoading(true);
            await fetch(`http://localhost:5000/mail/delete_email?id=${id}`, option)
                .then((res) => res.json())
                .then(async (data) => {
                    if (data.Message == "deleted") {
                        await fetch("http://localhost:5000/mail/get_email", option2)
                            .then((res) => res.json())
                            .then((data) => {
                                setLoading(false);
                                setSubs(data.AllMails);
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
                    <span className="font-medium">Email : </span>
                    <span>{email}</span>
                </div>
            </div>
            <button
                onClick={handleDelete}
                className="text-xs sm:text-sm bg-red-500 hover:bg-red-600 text-white px-3 sm:px-4 py-1 rounded-md transition"
            >
                Delete
            </button>
            {
                loading ? <LoadingPage /> : null
            }
        </div>
    );
};

export default SubsCard;
