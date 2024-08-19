import axios from 'axios';
import { Link } from 'react-router-dom';
import { DownloadButton } from '../components/DownloadButton';

export default function DownloadPage() {
    return (
        <div className="flex h-screen flex-col items-center justify-center">
            <div className="w-auto">
                <DownloadButton filename={'registrations'} text={'Registrations'} />
                <DownloadButton filename={'memberships'} text={'Memberships'} />
                <DownloadButton filename={'volunteers'} text={'Volunteers'} />
                <DownloadButton filename={'foodbank'} text={'Food Bank'} />
            </div>
        </div>
    );
}
