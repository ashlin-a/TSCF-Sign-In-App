import { Link, useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa6';
import { useEffect, useState } from 'react';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navlinks = [
        { name: 'Registration', to: '/registration-form' },
        { name: 'Membership', to: '/membership-form' },
        { name: 'Volunteer', to: '/volunteer-form' },
        { name: 'Food Bank', to: '/food-bank' },
    ];
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    return (
        <nav className="flex justify-between bg-bkg justify-items-center p-2 px-5">
            <div className="flex items-center gap-x-4 text-xl">
                <img src="./src/assets/cropped-logo-1.png" className="h-10" />
                <h3 className="text-center text-lg font-semibold text-content-1 md:text-2xl">
                    The Second Chance Foundation
                </h3>
            </div>

            <div className="flex items-center gap-5">
                <ul className="hidden items-center gap-x-7 lg:flex">
                    {navlinks.map((item) => (
                        <li className="list-none" key={item.to}>
                            <Link
                                className="border-primary text-content-1 transition-all duration-75 ease-in-out hover:text-primary hover:border-b-2"
                                to={item.to}
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
                {isLoggedIn ? (
                    <button
                        onClick={() => {
                            localStorage.removeItem('token');
                            setIsLoggedIn(false);
                            navigate('/signin');
                        }}
                        className="rounded-full bg-primary p-1 px-4 text-white"
                    >
                        Logout
                    </button>
                ) : (
                    <button
                        onClick={() => {
                            navigate('/signin');
                        }}
                        className="rounded-full bg-primary p-1 px-4 text-white"
                    >
                        Login
                    </button>
                )}
                <FaBars
                    className="block lg:hidden"
                    onClick={() => {
                        setIsMenuOpen(!isMenuOpen);
                    }}
                />
            </div>

            <div
            className={`absolute z-30 left-0 top-12 flex w-full transform flex-col items-center justify-center gap-5 bg-bkg transition-transform lg:hidden ${isMenuOpen ? 'absolue' : 'hidden'}`}
            >
                <ul className="flex w-full flex-col items-center gap-3 p-4">
                    {navlinks.map((item) => (
                        <li
                            className="flex w-full list-none justify-center"
                            key={item.to}
                        >
                            <Link
                                className="w-full text-center text-content-1 decoration-primary transition-all duration-75 ease-in-out hover:underline"
                                to={item.to}
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}
