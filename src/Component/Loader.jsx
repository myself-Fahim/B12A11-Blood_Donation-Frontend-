import React from 'react';

const Loader = () => {
    return (
        <div>
            <div className='min-h-screen flex items-center justify-center'>
                <span className="loading loading-ring loading-xl"></span>
            </div>
        </div>
    );
};

export default Loader;