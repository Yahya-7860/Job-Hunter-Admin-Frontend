import React from 'react';
import { SyncLoader } from 'react-spinners';

const LoadingPage = () => {
    return (
        <div className="fixed inset-0 z-40 w-screen h-screen backdrop-blur-xs flex justify-center items-center">
            <SyncLoader
                color="blue"
                loading={true}
                size={10}
            />
        </div>
    );
};

export default LoadingPage;
