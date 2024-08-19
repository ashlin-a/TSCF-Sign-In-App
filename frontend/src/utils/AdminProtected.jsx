import axios from 'axios';
import { Outlet, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const AdminProtected = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.post('http://localhost:3000/admin/me', null, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(response => {
                if (response.data.username) {
                    setIsAuthenticated(true);
                    console.log(response.data)
                } else {
                    setIsAuthenticated(false);
                }
                setLoading(false);
            })
            .catch(error => {
                setIsAuthenticated(false);
                setLoading(false);
            });
        } else {
            setIsAuthenticated(false);
            setLoading(false);
        }
    }, []);

    if (loading) {
        return <div className='text-3xl text-content-1'>Loading...</div>;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/signin" />;
};

export default AdminProtected;
