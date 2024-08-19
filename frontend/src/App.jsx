import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SignInPage } from './pages/SignInPage';
import { RegFormPage } from './pages/RegFormPage';
import { SignUpPage } from './pages/SignUpPage';
import Protected from './utils/Protected';
import { MembershipFormPage } from './pages/MembershipFormPage';
import { VolunteerApplicationPage } from './pages/VolunteerApplicationPage';
import DownloadPage from './pages/DownloadPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { FormsDataPage } from './pages/FormsDataPage';
import { PasswordResetPage } from './pages/PasswordResetPage';
import { FoodBankRegPage } from './pages/FoodBankRegPage';
import AdminProtected from './utils/AdminProtected';
import { AdminSignInPage } from './pages/AdminSignInPage';
import { AdminSignUpPage } from './pages/AdminSignUpPage';
import { useEffect, useState } from 'react';
import { MdWbSunny } from "react-icons/md";
import { BsFillMoonStarsFill } from "react-icons/bs";

function App() {
    const [darkMode, setDarkMode] = useState(() => {
        const selectedTheme = localStorage.getItem("theme");
        return selectedTheme === 'dark';
    });

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark');
            document.body.classList.remove('light');
        } else {
            document.body.classList.add('light');
            document.body.classList.remove('dark');
        }
        localStorage.setItem("theme", darkMode ? "dark" : "light");
    }, [darkMode]);

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Protected />}>
                        <Route index element={<SignInPage />} />
                        <Route path="/registration-form" element={<RegFormPage />} />
                        <Route path="/membership-form" element={<MembershipFormPage />} />
                        <Route path="/volunteer-form" element={<VolunteerApplicationPage />} />
                        <Route path='/food-bank' element={<FoodBankRegPage/>}/>
                    </Route>
                    <Route path="/admin" element={<AdminProtected />}>
                        <Route index element={<AdminSignInPage />} />
                        <Route path='/admin/dashboard' element={<AdminDashboard/>}/>
                        <Route path='/admin/:typeOfForm' element={<FormsDataPage/>}/>

                    </Route>
                    <Route path="/download" element={<DownloadPage />} />
                        
                    <Route path="/signin" element={<SignInPage />} />
                    <Route path="/admin/signin" element={<AdminSignInPage />} />
                    <Route path="/admin/signup" element={<AdminSignUpPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/forgot-password/:typeOfAccount" element={<PasswordResetPage />} />
                    <Route path="*" element={<h1>Page not found</h1>} /> 
                </Routes>
            </BrowserRouter>
            <button className='fixed w-10 h-10 z-10 flex items-center justify-center bottom-10 right-10 rounded-full bg-content-1 text-bkg' onClick={()=>{
                setDarkMode(!darkMode);
            }}>{darkMode? <MdWbSunny className='text-xl'/> : <BsFillMoonStarsFill />}</button>
        </>
    );
}

export default App;
