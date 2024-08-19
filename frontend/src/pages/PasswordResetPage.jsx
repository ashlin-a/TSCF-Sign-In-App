import { useState } from 'react';
import { Button } from '../components/Button';
import { Heading } from '../components/Heading';
import { InputBox } from '../components/InputBox';
import { SubHeading } from '../components/SubHeading';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { InfoBox} from '../components/InfoBox';
import { HiOutlineEye } from 'react-icons/hi';
import { HiOutlineEyeOff } from 'react-icons/hi';

export const PasswordResetPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [infoType, setInfoType] = useState('warning');
    const [info, setInfo] = useState(false);
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(<HiOutlineEyeOff className="size-5 text-content-2"/>);

    const {typeOfAccount} = useParams()
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    const navigate = useNavigate();

    const handleToggle = () => {
        if (type === 'password') {
            setIcon(<HiOutlineEye className="size-5 text-content-2"/>);
            setType('text');
        } else {
            setIcon(<HiOutlineEyeOff className="size-5 text-content-2"/>);
            setType('password');
        }
    };

    const isValidEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    return (
        <div className="lg:grid h-screen grid-cols-7 bg-[url(./assets/sign-in_bg.jpg)] pt-20 lg:pt-0 bg-cover bg-fixed">
            
            <div className="lg:col-span-4 rounded-xl lg:rounded-none lg:rounded-r-3xl bg-bkg p-10 lg:p-20 xl:p-30 2xl:p-40">
                <Heading label={'Password Reset'} />
                <SubHeading
                    text={'Enter your email, request an otp and enter the new password.'}
                />
                <form
                    onSubmit={async (e) => {
                        try {
                            e.preventDefault(); 
                        const response = await axios.post(
                            `http://localhost:3000/${typeOfAccount}/forgot-password`,
                            { username, password, otp },
                        );
                        setInfo(response.data.message);
                        setInfoType('success')
                        await delay(2000);
                            navigate('/signin');
                        
                        } catch (error) {
                            setInfo(error.response.data.message);
                            setInfoType('warning')
                        }
                        
                    }}
                >
                    <InputBox
                        onChange={(e) => {
                            setUsername(e.target.value);
                            setInfo(null);
                        }}
                        placeholder={'Email'}
                        type={'email'}
                        autoFocus={true}
                        required={true} spellCheck={false}
                        valMessage={'Please check E-mail address'}
                    />
                    
                    
                    <InputBox
                        onChange={(e) => {
                            setOtp(e.target.value);
                            setInfo(null);
                        }}
                        placeholder={'OTP'}
                        type={'OTP'} spellCheck={false}
                        required={true}
                    />
                    <div className="flex items-center relative">
                        <InputBox
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setInfo(null);
                            }}
                            placeholder={'New Password'}
                            type={type} spellCheck={false}
                            required={true}
                        />
                        <span
                            className="cursor-pointer absolute right-4"
                            onClick={handleToggle}
                        >
                            {icon}
                        </span>
                    </div>
                    <div className="md:grid grid-cols-2 gap-8">
                    <Button label={"Get OTP"} onClick={
                        async (e)=>{
                            e.preventDefault();
                            if (!username) {
                                setInfo("Please enter an email!");
                                setInfoType('warning')
                            } else if(!(isValidEmail(username))) {
                                setInfo("Please enter a valid email!");
                                setInfoType('warning')                            
                            } else{
                                try {
                                    const response = await axios.post(`http://localhost:3000/${typeOfAccount}/send-otp`, {username});
                                    if(response.status === 200){
                                    setInfo(response.data.message);
                                    setInfoType('success')
                                } 
                                } catch (error) {
                                    setInfo(error.response.data.message);
                                    setInfoType('warning')
                                }
                            }
                        }
                    }/>
                    <Button label={'Update'} type={'submit'} />
                    </div>
                </form>

                
                <div className='flex justify-center gap-3'>
                <p className='inline text-content-1'>Already have an account? </p><Link to={'/signin'} className='text-primary'>Sign In</Link>
                </div>
                {info && 
                    <InfoBox text={info} type={infoType}/>
                }
            </div>
            <div className="hidden lg:block lg:col-span-3">
                <div className="flex h-screen flex-col items-center justify-center text-right pb-32">
                    <h1 className="px-20 text-5xl font-black text-bkg">
                        The Second Chance Foundation
                    </h1>
                    <p className="mt-10 px-20 text-2xl font-medium text-bkg/80">
                        Supporting Marginalized, Racialized, and Formerly
                        Incarcerated Women
                    </p>
                </div>
            </div>
        </div>
    );
};
