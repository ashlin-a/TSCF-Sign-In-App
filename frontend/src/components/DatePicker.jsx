import { useState, createElement } from 'react';
import Datepicker from 'tailwind-datepicker-react';
import { IoIosArrowForward } from 'react-icons/io';
import { IoIosArrowBack } from 'react-icons/io';

const options = {
    title: '',
    autoHide: true,
    todayBtn: true,
    clearBtn: true,
    clearBtnText: 'Clear',
    maxDate: new Date('2030-01-01'),
    minDate: new Date('1950-01-01'),
    theme: {
        background: '',
        todayBtn: '',
        clearBtn: '',
        icons: '',
        text: '',
        disabledText: 'bg-transparent text-gray-300',
        input: '',
        inputIcon: '',
        selected: '',
    },
    icons: {
        prev: () => createElement('span', null, <IoIosArrowBack />),
        next: () => createElement('span', null, <IoIosArrowForward />),
    },
    datepickerClassNames: 'top-18 ',
    defaultDate: '',
    language: 'en',
    disabledDates: [],
    weekDays: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
    inputNameProp: 'date',
    inputIdProp: 'date',
    inputPlaceholderProp: '',
    inputDateFormatProp: {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    },
};

export const DatePicker = ({ onChange, text }) => {
    const [show, setShow] = useState(false);
    const handleClose = (state) => {
        setShow(state);
    };

    return ( 
        <div className="relative">
            <p className="font-semibold my-2">{text}</p>
            <Datepicker
                options={options}
                onChange={onChange}
                show={show}
                setShow={handleClose}
            />
        </div>
    );
};
