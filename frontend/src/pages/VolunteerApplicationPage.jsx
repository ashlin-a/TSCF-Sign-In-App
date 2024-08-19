import { FormInputBox } from '../components/FormInputBox';
import { FormRadioButton } from '../components/FormRadiobutton';
import { FormCheckBox } from '../components/FormCheckBox';
import { FormTextAreaBox } from '../components/FormTextAreaBox';
import axios from 'axios';
import { Button } from '../components/Button';
import Navbar from '../components/Navbar';
import { useState } from 'react';
import { InfoBox } from '../components/InfoBox';

export const VolunteerApplicationPage = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [prefCommunication, setPrefCommunication] = useState('');
    const [ageLessThan18, setAgeLessThan18] = useState(false);
    const [areasOfInterest, setAreasOfInterest] = useState('');
    const [rankAreasOfInterest, setRankAreasOfInterest] = useState('');
    const [volunteerExperienceSource, setVolunteerExperienceSource] =
        useState('');
    const [reason, setReason] = useState('');
    const [interestRelatedExperiences, setInterestRelatedExperiences] =
        useState('');
    const [daysAvailable, setDaysAvailable] = useState([]);
    const [timesAvailable, setTimesAvailable] = useState([]);
    const [emergencyContactName, setEmergencyContactName] = useState('');
    const [emergencyContactPhone, setEmergencyContactPhone] = useState('');
    const [emergencyContactType, setEmergencyContactType] = useState('');
    const [firstReferenceName, setFirstReferenceName] = useState('');
    const [firstReferencePhone, setFirstReferencePhone] = useState('');
    const [firstReferenceType, setFirstReferenceType] = useState('');
    const [secondReferenceName, setSecondReferenceName] = useState('');
    const [secondReferencePhone, setSecondReferencePhone] = useState('');
    const [secondReferenceType, setSecondReferenceType] = useState('');
    const [infoType, setInfoType] = useState('warning');
    const [info, setInfo] = useState(false);

    return (
        <div>
            <Navbar />
            <div className="p-20">
                <form
                    method="post"
                    onSubmit={(e) => {
                        try {
                            e.preventDefault();
                            const response = axios.post(
                                'http://localhost:3000/user/volunteer-application',
                                {
                                    name,
                                    address,
                                    phone,
                                    email,
                                    prefCommunication,
                                    ageLessThan18,
                                    areasOfInterest,
                                    rankAreasOfInterest,
                                    volunteerExperienceSource,
                                    reason,
                                    interestRelatedExperiences,
                                    daysAvailable,
                                    timesAvailable,
                                    emergencyContact: {
                                        name: emergencyContactName,
                                        phone: emergencyContactPhone,
                                        type: emergencyContactType,
                                    },
                                    references: [
                                        {
                                            name: firstReferenceName,
                                            phone: firstReferencePhone,
                                            type: firstReferenceType,
                                        },
                                        {
                                            name: secondReferenceName,
                                            phone: secondReferencePhone,
                                            type: secondReferenceType,
                                        },
                                    ],
                                },
                                {
                                    headers: {
                                        Authorization:
                                            'Bearer ' +
                                            localStorage.getItem('token'),
                                        'Content-Type': 'application/json',
                                    },
                                },
                            );
                            setInfo(response.data.message);
                            setInfoType('success');
                        } catch (error) {
                            setInfo(
                                error.response?.data?.message ||
                                    'An error occurred. Please try again.',
                            );
                            setInfoType('warning');
                        }
                    }}
                >
                    <FormInputBox
                        text={'Name'}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    />
                    <FormInputBox
                        text={'Address'}
                        onChange={(e) => {
                            setAddress(e.target.value);
                        }}
                    />
                    <FormInputBox
                        text={'Phone'}
                        onChange={(e) => {
                            setPhone(e.target.value);
                        }}
                    />
                    <FormInputBox
                        text={'Email'}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                    <FormRadioButton
                        options={[
                            { key: 'prefCommunication', value: 'Phone' },
                            { key: 'prefCommunication', value: 'Email' },
                        ]}
                        onChange={(e) => {
                            setPrefCommunication(e.target.value);
                        }}
                    />
                    <FormCheckBox
                        options={[
                            {
                                key: 'age',
                                value: 'Please check the box if you are less than 18 year old',
                            },
                        ]}
                        onChange={(e) => {
                            setAgeLessThan18(e.target.value);
                        }}
                    />
                    <FormTextAreaBox
                        text={'Areas of Interest'}
                        rows={'5'}
                        onChange={(e) => {
                            setAreasOfInterest(e.target.value);
                        }}
                    />
                    <FormTextAreaBox
                        text={'Rank Areas of Interest'}
                        rows={'5'}
                        onChange={(e) => {
                            setRankAreasOfInterest(e.target.value);
                        }}
                    />
                    <FormTextAreaBox
                        text={
                            'Where did you hear about our volunteer experiences?'
                        }
                        rows={'5'}
                        onChange={(e) => {
                            setVolunteerExperienceSource(e.target.value);
                        }}
                    />
                    <FormTextAreaBox
                        text={
                            'Why are you interested in Volunteering with The Second Chance Foundation?'
                        }
                        rows={'5'}
                        onChange={(e) => {
                            setReason(e.target.value);
                        }}
                    />
                    <FormTextAreaBox
                        text={
                            'Please outline any Experiences/Qualifications/Hobbies related to your areas of interest.'
                        }
                        rows={'5'}
                        onChange={(e) => {
                            setInterestRelatedExperiences(e.target.value);
                        }}
                    />
                    <FormCheckBox
                        text={'Days Available'}
                        options={[
                            { key: 'sunday', value: 'Sunday' },
                            { key: 'monday', value: 'Monday' },
                            { key: 'tuesday', value: 'Tuesday' },
                            { key: 'wednesday', value: 'Wednesday' },
                            { key: 'thursday', value: 'Thursday' },
                            { key: 'friday', value: 'Friday' },
                            { key: 'saturday', value: 'Saturday' },
                        ]}
                        onChange={(e) => {
                            const { value, checked } = e.target;
                            if (checked) {
                                setDaysAvailable([...daysAvailable, value]);
                            } else {
                                setDaysAvailable(
                                    daysAvailable.filter(
                                        (item) => item !== value,
                                    ),
                                );
                            }
                        }}
                    />
                    <FormCheckBox
                        text={'Times Available'}
                        options={[
                            { key: 'morning', value: 'Morning' },
                            { key: 'afternoon', value: 'Afternoon' },
                            { key: 'evening', value: 'Evening' },
                        ]}
                        onChange={(e) => {
                            const { value, checked } = e.target;
                            if (checked) {
                                setTimesAvailable([...timesAvailable, value]);
                            } else {
                                setTimesAvailable(
                                    timesAvailable.filter(
                                        (item) => item !== value,
                                    ),
                                );
                            }
                        }}
                    />
                    <h1 className="mt-5 text-2xl font-semibold">
                        Emergency Contact
                    </h1>
                    <FormInputBox
                        text={'Name'}
                        onChange={(e) => {
                            setEmergencyContactName(e.target.value);
                        }}
                    />
                    <FormInputBox
                        text={'Phone'}
                        onChange={(e) => {
                            setEmergencyContactPhone(e.target.value);
                        }}
                    />
                    <FormRadioButton
                        text={'Phone Number Type'}
                        options={[
                            { key: 'repPhoneType', value: 'Home' },
                            { key: 'repPhoneType', value: 'Mobile' },
                        ]}
                        onChange={(e) => {
                            setEmergencyContactType(e.target.value);
                        }}
                    />
                    <h1 className="mt-5 text-2xl font-semibold">References</h1>
                    <FormInputBox
                        text={'Name'}
                        onChange={(e) => {
                            setFirstReferenceName(e.target.value);
                        }}
                    />
                    <FormInputBox
                        text={'Phone'}
                        onChange={(e) => {
                            setFirstReferencePhone(e.target.value);
                        }}
                    />
                    <FormRadioButton
                        text={'Phone Number Type'}
                        options={[
                            { key: 'ref1PhoneType', value: 'Home' },
                            { key: 'ref1PhoneType', value: 'Mobile' },
                        ]}
                        onChange={(e) => {
                            setFirstReferenceType(e.target.value);
                        }}
                    />
                    <FormInputBox
                        text={'Name'}
                        onChange={(e) => {
                            setSecondReferenceName(e.target.value);
                        }}
                    />
                    <FormInputBox
                        text={'Phone'}
                        onChange={(e) => {
                            setSecondReferencePhone(e.target.value);
                        }}
                    />
                    <FormRadioButton
                        text={'Phone Number Type'}
                        options={[
                            { key: 'ref2PhoneType', value: 'Home' },
                            { key: 'ref2PhoneType', value: 'Mobile' },
                        ]}
                        onChange={(e) => {
                            setSecondReferenceType(e.target.value);
                        }}
                    />
                    <Button label={'Submit'} type={'submit'} />
                </form>
            </div>
            {info && <InfoBox text={info} type={infoType} />}
        </div>
    );
};
