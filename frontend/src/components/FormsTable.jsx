import React, { useState } from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';
import { InfoBox } from '../components/InfoBox';

export default function FormsTable({ tableData, typeOfForm, refreshData }) {
    const [infoType, setInfoType] = useState('warning');
    const [info, setInfo] = useState(false);
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border border-content-2/30 bg-bkg">
                <thead>
                    <tr className="bg-primary text-sm uppercase leading-normal text-white">
                        <th className="px-6 py-3 text-left">Created On</th>
                        <th className="px-6 py-3 text-left">Full Name</th>
                        <th className="px-6 py-3 text-left">Email</th>
                        <th className="px-6 py-3 text-left">
                            {tableData[0].address ? 'Address' : 'Housing'}
                        </th>
                        <th className="px-6 py-3 text-left">Action</th>
                    </tr>
                </thead>
                <tbody className="text-sm text-content-1">
                    {tableData.map((item) => (
                        <tr
                            key={item._id}
                            className="border-b border-content-2/30 hover:bg-content-2/10"
                        >
                            <td className="px-6 py-3">
                                {new Date(item.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-3">{item.name || 'N/A'}</td>
                            <td className="px-6 py-3">{item.email || 'N/A'}</td>
                            <td className="px-6 py-3">
                                {item.address || item.housing || 'N/A'}
                            </td>
                            <td
                                className="px-6 py-3"
                                onClick={async () => {
                                    try {
                                        console.log('Clicked');
                                        const response = await axios.delete(
                                            `http://localhost:3000/admin/${typeOfForm}/${item._id}`,
                                            {
                                                headers: {
                                                    Authorization:
                                                        'Bearer ' +
                                                        localStorage.getItem(
                                                            'token',
                                                        ),
                                                    'Content-Type':
                                                        'application/json',
                                                },
                                            },
                                        );
                                        setInfo(response.data.message);
                                        setInfoType('success');
                                        refreshData();
                                    } catch (error) {
                                        setInfo(error.response.data.message);
                                        setInfoType('warning');
                                    }
                                }}
                            > <div className='flex h-full items-center gap-x-2 cursor-pointer'>
                                <FaTrash className="text-warning text-lg cursor-pointer" />
<p className='text-warning cursor-pointer'>Remove</p>
                            </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {info && <InfoBox text={info} type={infoType} />}
        </div>
    );
}
