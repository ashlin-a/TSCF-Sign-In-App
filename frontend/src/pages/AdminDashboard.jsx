import AdminNavbar from '../components/AdminNavbar';
import DashboardCard from '../components/DashboardCard';
import { DownloadButton } from '../components/DownloadButton';
import GradientBlobs from '../components/GradientBlobs';

export const AdminDashboard = () => {
    return (
        <div className='bg-bkg'>
            <AdminNavbar/>
        <div className=" relative grid lg:grid-cols-2 gap-8 pt-10 px-10 sm:20 md:px-40">
            <GradientBlobs />
            <DashboardCard
                imgSource={'../src/assets/Registration_pexels-cytonn-955389.jpg'}
                title={'Registrations'}
                buttonTxt={'Manage'} to={'/admin/registration-forms'}
                text={'See how many people have registered and export excel containing information about all the registrations.'}
                excelButton={<DownloadButton filename={'registrations'} text={'Excel'} />}
            />
            <DashboardCard
                imgSource={'../src/assets/Members_pexels-fauxels-3184396.jpg'}
                imgStyles={'object-top'}
                title={'Memberships'}
                buttonTxt={'Manage'} to={'/admin/membership-forms'}
                text={
                    'See how many people have applied for membership, approve them and export excel containing information about all the memberships.'
                } excelButton={<DownloadButton filename={'memberships'} text={'Excel'} />}
            />
            <DashboardCard
                imgSource={'../src/assets/Volunteer_pexels-liza-summer-6348129.jpg'}
                imgStyles={''}
                title={'Volunteers'}
                buttonTxt={'Manage'} to={'/admin/volunteer-forms'}
                text={
                    'See how many people are willing to volunteer and export excel containing information about all the forms.'
                } excelButton={<DownloadButton filename={'volunteers'} text={'Excel'} />}
            />
            <DashboardCard
                imgSource={'../src/assets/FoodBank_pexels-rdne-6646883.jpg'}
                imgStyles={''}
                title={'Food Bank'}
                buttonTxt={'Manage'} to={'/admin/foodbank-forms'} 
                text={
                    'See how many people have registered to be a part of food bank and export excel containing information about all the forms.'
                } excelButton={<DownloadButton filename={'foodbank'} text={'Excel'} />}
            />
             
        </div>
        </div>
    );
};
