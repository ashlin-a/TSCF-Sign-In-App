import { useEffect, useState } from 'react';
import { HiExclamationCircle } from 'react-icons/hi';
import { twMerge } from 'tailwind-merge';

export function InfoBox({ text, type }) {
    const [boxStyles, setBoxStyles] = useState('border-info bg-info/20');
    const [iconStyles, setIconStyles] = useState('text-info');
    const [textStyles, setTextStyles] = useState('text-info');

    useEffect(() => {
        if (type === 'warning') {
            setBoxStyles('border-warning bg-warning/20');
            setIconStyles('text-warning');
            setTextStyles('text-warning');
        } else if (type === 'success') {
            setBoxStyles('border-success bg-success/20');
            setIconStyles('text-success');
            setTextStyles('text-success');
        } else {
            setBoxStyles('border-info bg-info/20');
            setIconStyles('text-info');
            setTextStyles('text-info');
        }
    }, [type]);
    return (
        <div
            className={twMerge(
                'flex items-center transition-all rounded-sm border-l-4 p-3',
                boxStyles,
            )}
        >
            <HiExclamationCircle className={twMerge('text-xl', iconStyles)} />
            <p className={twMerge('ml-2 text-base', textStyles)}>{text}</p>
        </div>
    );
}
