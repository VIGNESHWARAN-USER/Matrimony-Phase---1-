import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import logo11 from "../Images/logo11.png";
import wallpaper from "../Images/image.jpg";
import img1 from "../Images/WhatsApp Image 2024-06-14 at 14.42.42_7ef71a78.jpg";
import testnomial1 from "../Images/user.png";

const Main = () => {
    const testimonialsRef = useRef(null);

    useEffect(() => {
        // Handling the details card
        const seeMoreBtn = document.getElementById('see-more');
        const detailsCard = document.getElementById('details-card');
        const closeDetailsBtn = document.getElementById('close-details');

        const showDetails = (event) => {
            event.preventDefault();
            if (detailsCard) {
                detailsCard.style.display = 'block';
            }
        };

        const hideDetails = () => {
            if (detailsCard) {
                detailsCard.style.display = 'none';
            }
        };

        if (seeMoreBtn) {
            seeMoreBtn.addEventListener('click', showDetails);
        }
        if (closeDetailsBtn) {
            closeDetailsBtn.addEventListener('click', hideDetails);
        }

        return () => {
            if (seeMoreBtn) {
                seeMoreBtn.removeEventListener('click', showDetails);
            }
            if (closeDetailsBtn) {
                closeDetailsBtn.removeEventListener('click', hideDetails);
            }
        };
    }, []);

    useEffect(() => {
        // Handling the mobile menu toggle and nav background color change
        const menuButton = document.querySelector('.mobile-menu-button');
        const mobileMenu = document.querySelector('.mobile-menu');

        const handleScroll = () => {
            const nav = document.querySelector('nav');
            if (nav) {
                if (window.scrollY > 50) {
                    nav.style.backgroundColor = 'rgb(245, 193, 124)'; // Apply the new background color
                } else {
                    nav.style.backgroundColor = 'transparent'; // Reset to transparent
                }
            }
        };

        const toggleMobileMenu = () => {
            if (mobileMenu) {
                mobileMenu.classList.toggle('hidden');
            }
        };

        if (menuButton) {
            menuButton.addEventListener('click', toggleMobileMenu);
        }
        window.addEventListener('scroll', handleScroll);

        return () => {
            if (menuButton) {
                menuButton.removeEventListener('click', toggleMobileMenu);
            }
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollLeft = () => {
        if (testimonialsRef.current) {
            testimonialsRef.current.scrollBy({
                left: -400,
                behavior: 'smooth'
            });
        }
    };

    const scrollRight = () => {
        if (testimonialsRef.current) {
            testimonialsRef.current.scrollBy({
                left: 400,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="bg-custom-yellow overflow-x-hidden">
            <nav className="bg-transparent fixed w-full z-10 top-0 transition-all duration-300 py-2">
                <div className="container mx-auto flex justify-between items-center px-4">
                    <Link to="/" className="flex items-center">
                        <img src={logo11} className="w-24 h-auto" alt="Logo" />
                    </Link>
                    <div className="hidden md:flex space-x-6">
                        {['Payment', 'Search', 'Login', 'Profile'].map((link) => (
                            <Link
                                key={link}
                                to={`/${link.toLowerCase()}`}
                                className="nav-link px-4 py-2 rounded-md hover:bg-amber-500 hover:text-white transition duration-300 ease-in-out"
                            >
                                {link}
                            </Link>
                        ))}
                    </div>
                    <button className="md:hidden mobile-menu-button flex items-center p-2">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div>
                <div className="mobile-menu hidden absolute top-full right-0 mt-2 bg-white shadow-lg rounded-lg w-48">
                    {['Search', 'Profile', 'Payment', 'Login'].map((link) => (
                        <Link
                            key={link}
                            to={`/${link.toLowerCase()}`}
                            className="block px-4 py-2 text-sm hover:bg-gray-200 transition duration-300"
                        >
                            {link}
                        </Link>
                    ))}
                </div>
            </nav>

            <img src={wallpaper} className="w-full h-screen object-cover" alt="Cinque Terre" />
            <div className="description absolute top-1/2 left-3/4 transform -translate-x-1/2 -translate-y-1/2 text-left font-light px-4 md:px-0">
                <h2 className="text-5xl text-gray-800 md:font-bold">Hello And <span className="text-amber-500">World</span></h2>
                <h2 className="text-4xl text-gray-800">Plan Your <span className="text-amber-500">Dream Partner</span> With Us</h2>
            </div>    
        </div>
    );
};

export default Main;