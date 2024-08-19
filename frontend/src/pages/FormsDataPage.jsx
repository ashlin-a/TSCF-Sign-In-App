import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FormsTable from '../components/FormsTable';
import { useParams } from 'react-router-dom';

export const FormsDataPage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { typeOfForm } = useParams();

    const fetchData = async () => {
        try {
            const response = await axios.get(
                `http://localhost:3000/admin/${typeOfForm}`,
                {
                    headers: {
                        Authorization:
                            'Bearer ' + localStorage.getItem('token'),
                        'Content-Type': 'application/json',
                    },
                },
            );
            setData(response.data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return <div className="text-center text-lg">Loading...</div>;
    }

    if (error) {
        return (
            <div className="text-center text-red-500">
                Error: {error.message}
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="mb-4 text-2xl font-bold">{typeOfForm.split('-')[0][0].toUpperCase()+ typeOfForm.split('-')[0].slice(1)+' '+typeOfForm.split('-')[1]}</h1>
            <FormsTable
                tableData={data}
                typeOfForm={typeOfForm.split('-')[0]}
                refreshData={fetchData}
            />
        </div>
    );
};
