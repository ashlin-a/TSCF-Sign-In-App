import axios from 'axios';
import { FaFileDownload } from "react-icons/fa";

export const DownloadButton = ({ filename, text }) => {
    const downloadExcel = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/admin/download/${filename}`, {
                responseType: 'blob', 
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                    'Content-Type': 'application/json',
                },
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));

            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${filename}.xlsx`); // Specify the file name

            document.body.appendChild(link);

            link.click();

            link.parentNode.removeChild(link);
        } catch (error) {
            console.error('Error downloading the file', error);
        }
    };

    return (
        <button onClick={downloadExcel} 
      className="w-full rounded-lg transition-all flex justify-center items-center bg-green-600 p-3 text-base font-bold text-white hover:bg-green-600/90 focus:outline-none focus:ring-4 focus:ring-green-600/50"
        >
            <FaFileDownload className='mr-2'/> {text}
        </button>
    );
};

