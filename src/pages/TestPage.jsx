import React from 'react';

const TestPage = () => {
    return (
        <div className="w-full h-screen overflow-hidden bg-black">
            <iframe
                src="/test.html"
                title="Test Page"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </div>
    );
};

export default TestPage;
