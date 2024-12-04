import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
    const [username, setUsername] = useState(null);
    const [error, setError] = useState(null);
    

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setError("No token found");
            return;
        }

        try {
            const decodedToken = jwtDecode(token);
            // console.log("Decoded Token:", decodedToken);
            if (decodedToken && decodedToken.username) {
                setUsername(decodedToken.username);
            } else {
                setError("Username not found in token");
            }
        } catch (error) {
            setError("Invalid token");
        }
    }, []);

    return { username, error };
};

export default useAuth;
