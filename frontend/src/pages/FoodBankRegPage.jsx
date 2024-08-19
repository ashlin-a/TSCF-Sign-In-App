import { parseISO, format } from 'date-fns';
import { useEffect, useState } from 'react';
import { FormDateBox } from '../components/FormDateBox';
import { FormPhoneBox } from '../components/FormPhoneBox';
import { FormDateTimeBox } from '../components/FormDateTimeBox';
import { FormInputBox } from '../components/FormInputBox';
import { Heading } from '../components/Heading';
import { Button } from '../components/Button';
import { FormCheckBox } from '../components/FormCheckBox';
import { FormSelect } from '../components/FormSelect';
import axios from 'axios';
import { InfoBox } from '../components/InfoBox';
import Navbar from '../components/Navbar';

export const FoodBankRegPage = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [phone, setPhone] = useState('');
    const [incomeSource, setIncomeSource] = useState('');
    const [firstLanguage, setFirstLanguage] = useState('');
    const [countAdults, setCountAdults] = useState(0);
    const [countChildren, setCountChildren] = useState(0);
    const [background, setBackground] = useState('');
    const [restrictions, setRestrictions] = useState([]);
    const [personOfColor, setPersonOfColor] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [lessThan10Years, setLessThan10Years] = useState(false);
    const [entryInCanada, setEntryInCanada] = useState('');
    const [family, setFamily] = useState([
        { name: '', gender: '', relationship: '', birthdate: '' },
    ]);
    const [infoType, setInfoType] = useState('warning');
    const [info, setInfo] = useState(false);

    const handleFormChange = (e, index) => {
        let data = [...family];
        data[index][e.target.name] = e.target.value;
        setFamily(data);
    };

    return (
        <div className='bg-bkg h-full'>
            <Navbar />
        <div className="px-60 pt-5">
            <form
                autoComplete="off"
                onSubmit={async (e) => {
                    try {
                        e.preventDefault();
                        const foodBankData = {
                            name,
                            address,
                            city,
                            postalCode,
                            phone,
                            incomeSource,
                            firstLanguage,
                            countAdults: Number(countAdults),
                            countChildren: Number(countChildren),
                            background,
                            restrictions,
                            personOfColor,
                            disabled,
                            lessThan10Years,
                            entryInCanada,
                            family,
                        };
                        const response = await axios.post(
                            'http://localhost:3000/user/food-bank',
                            foodBankData,
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
                    required={true}
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                />
                <FormInputBox
                    text={'Address'}
                    onChange={(e) => {
                        setAddress(e.target.value);
                    }} required={'true'}
                />
                <FormInputBox
                    text={'City'}
                    onChange={(e) => {
                        setCity(e.target.value);
                    }} required={true}
                />
                <FormInputBox
                    text={'Postal Code'}
                    onChange={(e) => {
                        setPostalCode(e.target.value);
                    }} required={true}
                />
                

                <FormPhoneBox
                    text={'Telephone'}
                    type={'tel'}
                    onChange={(e) => {
                        setPhone(e.target.value);
                    }}
                    required={true}
                />
                <FormInputBox
                    text={'First Language'}
                    onChange={(e) => {
                        setFirstLanguage(e.target.value);
                    }}
                />
                <FormInputBox
                    text={'Income Source'}
                    onChange={(e) => {
                        setIncomeSource(e.target.value);
                    }}
                />

                <Heading label={'Family Members'} />
                {family.map((item, index) => {
                    return (
                        <div className="" key={index}>
                            <div className='grid grid-cols-2 gap-x-4'>
                            <FormInputBox
                                placeholder={'Name'}
                                name={'name'}
                                value={item.name}
                                onChange={(e) => {
                                    handleFormChange(e, index);
                                }}
                                required={true}
                            />
                            <FormInputBox
                                placeholder={'Gender'}
                                name={'gender'}
                                value={item.gender}
                                onChange={(e) => {
                                    handleFormChange(e, index);
                                }}
                            />
                            <FormInputBox
                                placeholder={'Relationship'}
                                name={'relationship'}
                                value={item.relationship}
                                required={true}
                                onChange={(e) => {
                                    handleFormChange(e, index);
                                }}
                            />
                            <FormDateBox
                                placeholder={'Birth Date'}
                                name={'birthdate'}
                                value={item.birthdate}
                                onChange={(e) => {
                                    handleFormChange(e, index);
                                }}
                            /> </div>
                                    <div className='flex w-full justify-end items-center'>
                            <button className='text-white bg-warning rounded-lg px-2 p-1'
                                onClick={(e) => {
                                    e.preventDefault();
                                    let data = [...family];
                                    data.splice(index, 1);
                                    setFamily(data);
                                }}
                            >
                                Remove
                            </button>
                            </div>
                        </div>
                    );
                })}
                <div className='flex justify-center items-center'>
                <button className='text-white rounded-lg px-2 p-1 bg-secondary'
                    onClick={(e) => {
                        e.preventDefault();
                        setFamily([
                            ...family,
                            {
                                name: '',
                                gender: '',
                                relationship: '',
                                birthdate: '',
                            },
                        ]);
                    }}
                >
                    Add Member
                </button>
                </div>
                <FormInputBox
                    text={'Count of Adults'}
                    onChange={(e) => {
                        setCountAdults(e.target.value);
                    }}
                    type={'number'}
                    inputStyles={'no-spinner'}
                />
                <FormInputBox
                    text={'Count of Children'}
                    onChange={(e) => {
                        setCountChildren(e.target.value);
                    }}
                    type={'number'}
                    inputStyles={'no-spinner'}
                    required={true}
                />
                <FormCheckBox
                    className={'my-2'}
                    text={'Restrictions'}
                    options={[
                        { key: 'D', value: 'Diabetic' },
                        { key: 'G', value: 'Gluten' },
                        { key: 'H', value: 'Halal' },
                        { key: 'L', value: 'Lactose Intolerance' },
                        { key: 'B', value: 'No Beef' },
                        { key: 'F', value: 'No Fish' },
                        { key: 'M', value: 'No Mushroom' },
                        { key: 'N', value: 'No Nuts' },
                        { key: 'P', value: 'No Pork' },
                        { key: 'S', value: 'No Seafood' },
                        { key: 'PA', value: 'Peanut Allergies' },
                        { key: 'V', value: 'Vegetarian' },
                    ]}
                    onChange={(e) => {
                        const { value, checked } = e.target;
                        if (checked) {
                            setRestrictions([...restrictions, value]);
                        } else {
                            setRestrictions(
                                restrictions.filter((item) => item !== value),
                            );
                        }
                    }}
                    allOptionStyles={
                        'grid gap-2 md:grid-flow-col md:grid-rows-3'
                    }
                />
                <FormInputBox
                    text={'Background'}
                    onChange={(e) => {
                        setBackground(e.target.value);
                    }}
                />
                <FormCheckBox
                    text={'Restrictions'}
                    options={[
                        { key: 'personOfColour', value: 'Person of Colour' },
                        { key: 'disabled', value: 'Disabled' },
                    ]}
                    onChange={(e) => {
                        const { value, checked } = e.target;
                        if (value === 'disabled') {
                            setDisabled(checked);
                        } else if (value === 'personOfColour') {
                            setPersonOfColor(checked);
                        }
                    }}
                />
                <FormSelect
                    text={'Have you been in Canada for less than 10 years?'}
                    options={[
                        { key: 'no', value: 'No' },
                        { key: 'yes', value: 'Yes' },
                    ]}
                    onChange={(e) => {
                        const { value } = e.target;
                        if (value === 'yes') {
                            setLessThan10Years(true);
                        } else if (value === 'no') {
                            setLessThan10Years(false);
                        }
                    }}
                />
                {lessThan10Years && (
                    <FormInputBox
                        text={'Select month and year of entry into Canada'}
                        type={'month'}
                        onChange={(e) => {
                            setEntryInCanada(e.target.value);
                        }}
                        required={true}
                    />
                )}

                <Button label={'Submit'} type={'submit'} />
            </form>
            {info && <InfoBox text={info} type={infoType} />}
        </div>
        </div>
    );
};
