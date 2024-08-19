import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

export default function DashboardCard({
    title,
    text,
    to,
    buttonTxt,
    className,
    imgSource,
    imgStyles,
    excelButton,
}) {
    return (
        <div
            className={twMerge(
                'overflow-hidden rounded-3xl bg-bkg shadow-lg dark:shadow-primary dark:shadow-md',
                className,
            )}
        >
            <img
                className={twMerge('h-56 w-full object-cover', imgStyles)}
                src={imgSource}
            />

            <div className="px-10 pb-10">
                <h1 className="my-4 text-center text-2xl font-bold text-content-1">
                    {title}
                </h1>
                <p className="text-center text-content-1">{text}</p>
                <div className="mt-8 grid items-center grid-flow-row grid-cols-2 gap-x-4">
                    <Link
                        to={to}
                        className="w-full font-semibold transition-all rounded-lg bg-primary p-3 px-5 text-center text-white"
                    >
                        {buttonTxt}
                    </Link>
                    {excelButton}
                </div>
            </div>
        </div>
    );
}
