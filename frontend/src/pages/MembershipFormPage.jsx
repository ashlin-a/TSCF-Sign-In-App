import { useEffect, useState } from 'react';
import { FormCheckBox } from '../components/FormCheckBox';
import { FormInputBox } from '../components/FormInputBox';
import { FormRadioButton } from '../components/FormRadiobutton';
import { FormSelect } from '../components/FormSelect';
import { SubHeading } from '../components/SubHeading';
import { Button } from '../components/Button';
import axios from 'axios';
import { DatePicker } from '../components/DatePicker';
import { Heading } from '../components/Heading';
import Navbar from '../components/Navbar';
import { InfoBox } from '../components/InfoBox';
import { FormPhoneBox } from '../components/FormPhoneBox';

export const MembershipFormPage = () => {
    const [membershipType, setMembershipType] = useState('');
    const [formType, setFormType] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [phone, setPhone] = useState('');
    const [fax, setFax] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [execDirector, setExecDirector] = useState('');
    const [contactPerson, setContactPerson] = useState('');
    const [position, setPosition] = useState('');
    const [orgAddressAndCity, setOrgAddressAndCity] = useState('');
    const [orgPostalCode, setOrgPostalCode] = useState('');
    const [orgPhone, setOrgPhone] = useState('');
    const [orgEmail, setOrgEmail] = useState('');
    const [representativeName, setRepresentativeName] = useState('');
    const [representativeDate, setRepresentativeDate] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [paymentDone, setPaymentDone] = useState(false);
    const [declaration, setDeclaration] = useState(false);
    const [place, setPlace] = useState('');
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [infoType, setInfoType] = useState('warning');
    const [info, setInfo] = useState(false);

    useEffect(() => {
        const fetchUsername = async () => {
            try {
                const response = await axios.post(
                    'http://localhost:3000/user/me',
                    {},
                    {
                        headers: {
                            Authorization:
                                'Bearer ' + localStorage.getItem('token'),
                            'Content-Type': 'application/json',
                        },
                    },
                );
                setEmail(response.data.username);
            } catch (error) {
                console.log(error);
                setInfo(error.response?.data?.message || 'An error occurred');
                setInfoType('warning');
            }
        };

        fetchUsername();
    }, []);

    const payment = { method: paymentMethod };
    return (
        <div>
            <Navbar />
            <div className="px-10 py-5 md:px-20 md:py-10">
                <form
                    method="post"
                    onSubmit={async (e) => {
                        e.preventDefault();
                        try {
                            const response = await axios.post(
                                'http://localhost:3000/user/membership-form',
                                {
                                    name,
                                    address,
                                    city,
                                    postalCode,
                                    phone,
                                    fax,
                                    email,
                                    website,
                                    org: {
                                        execDirector,
                                        contactPerson,
                                        position,
                                        addressAndCity: orgAddressAndCity,
                                        postalCode: orgPostalCode,
                                        phone: orgPhone,
                                        email: orgEmail,
                                    },
                                    representative: {
                                        name: representativeName,
                                        date: representativeDate,
                                    },
                                    payment: { method: paymentMethod },
                                    declaration,
                                    place,
                                    date,
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
                        } catch (error) {
                            setInfo(
                                error.response?.data?.message ||
                                    'An error occurred. Please try again.',
                            );
                            setInfoType('warning');
                        }
                    }}
                >
                    <div className="items-baseline md:grid md:grid-cols-2 md:gap-x-5 lg:grid-cols-3 lg:gap-x-10">
                        <div className="lg:col-span-2">
                            <FormSelect
                                text={
                                    'Please check off the appropriate membership category'
                                }
                                required={true}
                                options={[
                                    { key: 'client', value: 'Client - $0' },
                                    {
                                        key: 'volunteer',
                                        value: 'Volunteers - $5',
                                    },
                                    {
                                        key: 'individual',
                                        value: 'Individual - $10',
                                    },
                                    {
                                        key: 'organization',
                                        value: 'Organization - $50',
                                    },
                                    {
                                        key: 'business',
                                        value: 'Business - $100',
                                    },
                                ]}
                                onChange={(e) => {
                                    setMembershipType(e.target.value);
                                }}
                            />
                        </div>
                        <div>
                            <FormRadioButton
                                className={'mb-2'}
                                text={'Member Status:'}
                                options={[
                                    { key: 'status', value: 'New' },
                                    { key: 'status', value: 'Renewal' },
                                ]}
                                required={true}
                                onChange={(e) => {
                                    setFormType(e.target.value);
                                }}
                            />
                        </div>
                        <div className="md:col-span-2 lg:col-span-3">
                            <FormInputBox
                                text={'Name'}
                                required={true}
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                            />
                        </div>

                        <FormInputBox
                            text={'Address'}
                            onChange={(e) => {
                                setAddress(e.target.value);
                            }}
                        />
                        <FormInputBox
                            text={'City'}
                            onChange={(e) => {
                                setCity(e.target.value);
                            }}
                        />
                        <FormInputBox
                            text={'Postal Code'}
                            onChange={(e) => {
                                setPostalCode(e.target.value);
                            }}
                        />
                        <FormPhoneBox
                            text={'Telephone'}
                            onChange={(e) => {
                                setPhone(e.target.value);
                            }}
                            required={true}
                        />
                        <FormInputBox
                            text={'Fax'}
                            onChange={(e) => {
                                setFax(e.target.value);
                            }}
                        />
                        <FormInputBox
                            text={'E-Mail'}
                            value={email}
                            readOnly={true}
                        />
                        <div className="md:col-span-2 lg:col-span-2">
                            <FormInputBox
                                text={'Website '}
                                type={'url'}
                                onChange={(e) => {
                                    setWebsite(e.target.value);
                                }}
                            />
                        </div>
                        <div className="pb-5 md:col-span-2 lg:col-span-3">
                            <Heading
                                label={
                                    'For groups, organization or businesses only:'
                                }
                            />
                        </div>
                        <FormInputBox
                            text={'Executive Director '}
                            onChange={(e) => {
                                setExecDirector(e.target.value);
                            }}
                        />
                        <FormInputBox
                            text={'Contact Person '}
                            onChange={(e) => {
                                setContactPerson(e.target.value);
                            }}
                        />
                        <FormInputBox
                            text={'Position'}
                            onChange={(e) => {
                                setPosition(e.target.value);
                            }}
                        />
                        <FormInputBox
                            text={'Address and City'}
                            onChange={(e) => {
                                setOrgAddressAndCity(e.target.value);
                            }}
                        />
                        {/* Create a small text box for if different than above */}
                        <FormInputBox
                            text={'Postal Code'}
                            onChange={(e) => {
                                setOrgPostalCode(e.target.value);
                            }}
                        />
                        <FormPhoneBox
                            text={'Telephone'}
                            onChange={(e) => {
                                setOrgPhone(e.target.value);
                            }}
                        />
                        <FormInputBox
                            text={'Email'}
                            onChange={(e) => {
                                setOrgEmail(e.target.value);
                            }}
                        />
                        <div className="pb-5 md:col-span-2 lg:col-span-3">
                            <Heading label={'Representative'} />
                        </div>
                        <FormInputBox
                            text={'Authorized Representative Name'}
                            onChange={(e) => {
                                setRepresentativeName(e.target.value);
                            }}
                        />
                        <DatePicker
                            text={'Select Date'}
                            onChange={(selectedDate) => {
                                setRepresentativeDate(selectedDate);
                            }}
                        />
                        <div className="pb-5 md:col-span-2 lg:col-span-3">
                            <Heading label={'Payment Info'} />
                        </div>
                        <FormInputBox
                            text={'Payment Method'}
                            onChange={(e) => {
                                setPaymentMethod(e.target.value);
                            }}
                        />
                        <div className="mt-4 md:col-span-2 lg:col-span-3">
                            <Heading label={'Membership Declaration'} />
                            <ol className="my-4 list-decimal space-y-2 pl-7">
                                <li>
                                    That I am eighteen years of age or more.
                                </li>
                                <li>I reside in Greater Toronto Area (GTA).</li>
                                <li>
                                    I am enclosing the annual membership fee as
                                    determined by the Board of Directors.
                                </li>
                                <li>
                                    I undertake to act in the best interest of
                                    TSCF.
                                </li>
                                <li>
                                    I undertake to abide by the By-Laws of TSCF
                                    and any decision of the Board of Directors.
                                </li>
                                <li>
                                    I agree to endorse and actively demonstrate
                                    TSCF mission, vision and principles as
                                    outlined in the By-Laws.
                                </li>
                            </ol>
                            <p className="mt-4 text-sm text-content-2">
                                If I am found to be in violation of any of the
                                above declarations, I understand that my
                                membership may be terminated without any notice.
                            </p>
                            <FormCheckBox
                                options={[
                                    {
                                        key: 'declaration',
                                        value: 'I hereby declare all above mentioned statements.',
                                    },
                                ]}
                                className={'mb-2'}
                                onChange={(e) => {
                                    setDeclaration(e.target.checked);
                                }}
                                required={true}
                            />
                        </div>
                        <FormInputBox
                            text={'Place'}
                            onChange={(e) => {
                                setPlace(e.target.value);
                            }}
                        />

                        <DatePicker
                            text={'Select Date'}
                            onChange={(selectedDate) => {
                                setDate(selectedDate);
                            }}
                        />
                    </div>
                    <Button type={'submit'} label={'submit'} />
                </form>
                {info && <InfoBox text={info} type={infoType} />}
            </div>
        </div>
    );
};
