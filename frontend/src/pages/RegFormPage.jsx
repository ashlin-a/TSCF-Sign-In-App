import axios from 'axios';
import { Button } from '../components/Button';
import { FormCheckBox } from '../components/FormCheckBox';
import { FormInputBox } from '../components/FormInputBox';
import { FormRadioButton } from '../components/FormRadiobutton';
import { Heading } from '../components/Heading';
import { SubHeading } from '../components/SubHeading';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { InfoBox } from '../components/InfoBox';
import { FormPhoneBox } from '../components/FormPhoneBox';

export const RegFormPage = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [prefCommunication, setPrefCommunication] = useState([]);
    const [housing, setHousing] = useState('');
    const [service, setService] = useState([]);
    const [infoType, setInfoType] = useState('warning');
    const [info, setInfo] = useState(false);

    useEffect(() => {
        const fetchUsername = async () => {
            try {
                const response = await axios.post('http://localhost:3000/user/me', {}, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token'),
                        'Content-Type': 'application/json',
                    },
                });
                setEmail(response.data.username);
            } catch (error) {
                console.log(error);
                setInfo(error.response?.data?.message || 'An error occurred');
                setInfoType('warning');
            }
        };

        fetchUsername();
    }, []);
    
    return (
        <>
            <Navbar />
            <div className="px-10 bg-bkg pt-10 md:px-20 min-h-screen lg:px-40 lg:pt-10 xl:px-60">
                <Heading label={'Registration Form'} />
                <SubHeading
                    text={
                        'This is the registration form. Please enter the details carefully.'
                    }
                />
                <form
                    onSubmit={async (e) => {
                        try {
                            e.preventDefault();
                        const response = await axios.post(
                            'http://localhost:3000/user/registration-form',
                            {
                                name,
                                phone,
                                email,
                                prefCommunication,
                                housing,
                                service,
                            },
                            {
                                headers: {
                                    Authorization:
                                        'Bearer ' +
                                        localStorage.getItem('token'),
                                    'Content-Type': 'application/json',
                                }
                            });
                        setInfo(response.data.message);
                        setInfoType('success')
                        

                        } catch (error) {
                            setInfo(error.response.data.message);
                            setInfoType('warning')
                        }
                        
                        
                    }}
                >
                    <div className="md:grid md:grid-cols-2 md:gap-x-10">
                        <div className="col-span-2">
                            <FormInputBox
                                text={'Full Name'}
                                type={'text'}
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                            />{' '}
                        </div>
                        <FormPhoneBox
                            text={'Phone Number'}
                            type={'text'} required={true}
                            onChange={(e) => {
                                setPhone(e.target.value);
                            }}
                        />
                        <FormInputBox
                            text={'Email'}
                            type={'email'}
                            value={email}
                            readOnly={true}
                        />

                        <FormCheckBox
                            allOptionStyles={
                                'grid gap-2 md:grid-flow-col md:grid-rows-3'
                            }
                            text={'Preferred method of communication'}
                            options={[
                                { key: 'call', value: 'Call' },
                                { key: 'email', value: 'Email' },
                            ]}
                            onChange={(e) => {
                                const { value, checked } = e.target;
                                if (checked) {
                                    setPrefCommunication([
                                        ...prefCommunication,
                                        value,
                                    ]);
                                } else {
                                    setPrefCommunication(
                                        prefCommunication.filter(
                                            (item) => item !== value,
                                        ),
                                    );
                                }
                            }}
                        />
                        {/* <FormSelect text={'Select Housing'} options={housingOptions} /> */}
                        <FormRadioButton
                            text={'Select Housing'}
                            options={[
                                { key: 'housing', value: 'TCHC' },
                                { key: 'housing', value: 'NTCHC' },
                            ]}
                            onChange={(e) => {
                                setHousing(e.target.value);
                            }}
                        />
                    </div>
                    <FormCheckBox
                        text={'Select Services'}
                        options={[
                            { key: 'copying', value: 'Copying' },
                            { key: 'printing', value: 'Printing' },
                            { key: 'faxing', value: 'Faxing' },
                            { key: 'taxes', value: 'Taxes' },
                            { key: 'computerUsage', value: 'Computer Usage' },
                            {
                                key: 'foodBankReg',
                                value: 'Food Bank Registration',
                            },
                            {
                                key: 'volunteer',
                                value: 'Volunteer Application',
                            },
                            {
                                key: 'programReg',
                                value: 'Program Registration',
                            },
                            { key: 'appointment', value: 'Appointment' },
                        ]}
                        allOptionStyles={
                            'grid gap-2 md:grid-flow-col md:grid-rows-3'
                        }
                        onChange={(e) => {
                            const { value, checked } = e.target;
                            if (checked) {
                                setService([...service, value]);
                            } else {
                                setService(
                                    service.filter((item) => item !== value),
                                );
                            }
                        }}
                    />
                    <div className="mt-6 grid-cols-2 md:gap-8 md:grid">
                        
                        <Button
                            type={'reset'}
                            label={'Reset'}
                            className={
                                'bg-secondary hover:bg-secondary/90 md:my-4 my-2 focus:ring-secondary/50'
                            }
                        />
                        <Button type={'sumbit'} label={'Save'} className={"md:my-4 my-2"} />
                    </div>
                </form>
                {info && 
                    <InfoBox text={info} type={infoType}/>
                }
            </div>
        </>
    );
};
