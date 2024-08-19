import { useState } from 'react';
import { Button } from '../components/Button';
import { Heading } from '../components/Heading';
import { InputBox } from '../components/InputBox';
import { SubHeading } from '../components/SubHeading';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { InfoBox} from '../components/InfoBox';
import { HiOutlineEye } from 'react-icons/hi';
import { HiOutlineEyeOff } from 'react-icons/hi';
 
export const AdminSignUpPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [infoType, setInfoType] = useState('warning');
    const [info, setInfo] = useState(false);
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(<HiOutlineEyeOff className="size-5 text-content-2"/>);
    
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
                <Heading label={'Sign Up'} />
                <SubHeading
                    text={'We welcome you to the second chance foundation'}
                />
                <form
                    onSubmit={async (e) => {
                        try {
                            e.preventDefault(); 
                        const response = await axios.post(
                            'http://localhost:3000/admin/sign-up',
                            { username, password, otp },{
                                headers: {
                                    Authorization:
                                        'Bearer ' +
                                        localStorage.getItem('token'),
                                    'Content-Type': 'application/json',
                                }
                            }
                        );
                        
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
                        required={true}
                        valMessage={'Please check E-mail address'}
                    />
                    
                    
                    <div className="flex items-center relative">
                        <InputBox
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setInfo(null);
                            }}
                            placeholder={'New Password'}
                            type={type}
                            required={true}
                        />
                        <span
                            className="cursor-pointer absolute right-4"
                            onClick={handleToggle}
                        >
                            {icon}
                        </span>
                    </div>
                    <InputBox
                        onChange={(e) => {
                            setOtp(e.target.value);
                            setInfo(null);
                        }}
                        placeholder={'OTP'}
                        type={'OTP'}
                        required={true}
                    /> 
                    <div className="md:grid grid-cols-2 gap-8">
                    <Button className={'bg-secondary hover:bg-secondary/90 focus:ring-secondary/50'} label={"Get OTP"} onClick={
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
                                    const response = await axios.post('http://localhost:3000/admin/send-otp', {username},{
                                        headers: {
                                            Authorization:
                                                'Bearer ' +
                                                localStorage.getItem('token'),
                                            'Content-Type': 'application/json',
                                        }
                                    });
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
                    <Button label={'Sign Up'} type={'submit'} />
                    </div>
                </form>

                {info && 
                    <InfoBox text={info} type={infoType}/>
                }
                <div className='flex justify-center gap-3'>
                <p className='inline text-content-1'>Already have an account? </p><Link to={'/signin'} className='text-primary'>Sign In</Link>
                </div>
            </div>
            <div className="hidden lg:block lg:col-span-3">
                <div className="flex h-screen flex-col items-center justify-center text-right pb-32">
                    <h1 className="px-20 text-5xl font-black text-white">
                        The Second Chance Foundation
                    </h1>
                    <p className="mt-10 px-20 text-2xl font-medium text-white/80">
                        Supporting Marginalized, Racialized, and Formerly
                        Incarcerated Women
                    </p>
                </div>
            </div>
        </div>
    );
};
