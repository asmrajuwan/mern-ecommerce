import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Spinner = ({path="login"}) => {
    const [count, setCount] = useState(3);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prevValue) => --prevValue);
        }, 1000);

        count === 0 && 
            navigate(`/${path}`,{
            state: location.pathname
        });
        return () => clearInterval(interval);
    }, [count, navigate,location,path]);

    return (
        <>
            <div className="flex flex-col items-center justify-center h-screen">
    <span className="loading loading-spinner loading-lg"></span>
    <span className="mt-2">Redirecting to login page in {count} seconds</span>
</div>
        </>
    );
};

export default Spinner;
