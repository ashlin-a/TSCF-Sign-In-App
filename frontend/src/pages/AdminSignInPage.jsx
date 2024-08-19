import { useState } from 'react';
import { Button } from '../components/Button';
import { Heading } from '../components/Heading';
import { InputBox } from '../components/InputBox';
import { SubHeading } from '../components/SubHeading';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { InfoBox } from '../components/InfoBox';
import { HiOutlineEye } from 'react-icons/hi';
import { HiOutlineEyeOff } from 'react-icons/hi';

export const AdminSignInPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [info, setInfo] = useState(null);
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(<HiOutlineEyeOff className="size-5 text-content-2"/>);

    const handleToggle = () => {
        if (type === 'password') {
            setIcon(<HiOutlineEye className="size-5 text-content-2"/>);
            setType('text');
        } else {
            setIcon(<HiOutlineEyeOff className="size-5 text-content-2"/>);
            setType('password');
        }
    };

    const navigate = useNavigate();

    return (
        <div className="lg:grid h-screen grid-cols-7 bg-[url(./assets/sign-in_bg.jpg)] pt-20 lg:pt-0 bg-cover bg-fixed">
            <div className="hidden lg:block lg:col-span-3">
                <div className="flex h-screen flex-col items-center justify-center pb-32">
                    <h1 className="px-20 text-5xl font-black text-bkg">
                        The Second Chance Foundation
                    </h1>
                    <p className="mt-10 px-20 text-2xl font-medium text-bkg/80">
                        Supporting Marginalized, Racialized, and Formerly
                        Incarcerated Women
                    </p>
                </div>
            </div>
            <div className="lg:col-span-4 rounded-xl lg:rounded-none lg:rounded-l-3xl bg-bkg p-10 lg:p-20 xl:p-30 2xl:p-40">
                <Heading label={'Admin Sign In'} />
                <SubHeading text={'We are glad to have you back'} />
                <form
                    onSubmit={async (e) => {
                        e.preventDefault();
                        try {
                            const response = await axios.post(
                                'http://localhost:3000/admin/sign-in',
                                { username, password },
                            );
                            localStorage.setItem('token', response.data.token);
                            navigate('/admin/dashboard');
                        } catch (error) {
                            setInfo(error.response.data.message);
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
                    <div className="flex items-center relative">
                        <InputBox
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setInfo(null);
                            }}
                            placeholder={'Password'}
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

                    <Button label={'Login'} type={'submit'} />
                </form>
                <Link
                    to={'/forgot-password/admin'}
                    className="mb-4 flex w-full justify-end text-sm text-primary"
                >
                    Forgot password?
                </Link>
                <div className='flex justify-center gap-3'>
                <p className='inline text-content-1'>Are you a user?</p><Link to={'/signin'} className='text-primary'>User Sign In</Link>
                </div>
                {info && <InfoBox text={info} type={'warning'} />}
            </div>
        </div>
    );
};
