import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import logo11 from "../Images/logo11.png";
import user from "../Images/user.png";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="relative flex justify-between items-center px-4 py-2 shadow-md" style={{ backgroundColor: '#fcbf49' }}>
            <div className="flex items-center w-full">
                <Link to="/" className="text-2xl font-bold flex items-center">
                    <img src={logo11} className="w-20 h-auto mr-2" alt="Logo" />
                </Link>
                <button
                    className="md:hidden ml-auto text-white focus:outline-none"
                    onClick={toggleMenu}
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>

            <div className="hidden md:flex md:items-center md:space-x-10 mr-10">
                <Link
                    to="/matrimony"
                    className="text-gray-800 m-2 font-bold px-3 py-2 hover:bg-white hover:text-black hover:rounded-md hover:shadow-md transition-all"
                >
                    Home
                </Link>
                <Link
                    to="/search"
                    className="text-gray-800 m-2 font-bold px-3 py-2 hover:bg-white hover:text-black hover:rounded-md hover:shadow-md transition-all"
                >
                    Search
                </Link>
                <Link
                    to="/payment"
                    className="text-gray-800 font-bold px-3 py-2 m-2 rounded-md hover:bg-white hover:text-black hover:shadow-md transition-all"
                >
                    Upgrade
                </Link>
                <Link
                    to="/profile"
                    className="text-gray-800 m-2 font-bold px-3 py-2 hover:bg-white hover:text-black hover:rounded-md hover:shadow-md transition-all"
                >
                    Profile
                </Link>
            </div>

            {/* Mobile menu */}
            <div className={`absolute top-20 left-0 w-full bg-white shadow-lg ${isOpen ? 'block' : 'hidden'}`}>
                <div className="flex flex-col items-center space-y-4 p-5">
                    <Link to="/matrimony" className="text-gray-800 font-bold">Home</Link>
                    <Link to="/search" className="text-gray-800 font-bold">Search</Link>
                    <Link 
                        to="/payment" 
                        className="text-white font-bold px-4 py-2 rounded-md transition"
                        style={{ backgroundColor: '#fcbf49' }}
                    >
                        Upgrade
                    </Link>
                    <Link to="/profile" className="text-gray-800 font-bold">Profile</Link>
                </div>
            </div>
        </nav>
    );
};

const Header = () => {
    return (
        <header className="bg-yellow-200 text-center py-6 border-b border-yellow-300">
            <div>
                <h3 className="text-2xl text-yellow-900 font-bold">Find Your Match</h3>
                <p className="text-yellow-600 mt-2">Search for profiles that match your preferences</p>
            </div>
        </header>
    );
};

const ProfileCard = ({ profile, onClick,userStatus }) => {
    return (
        <div
            className="flex flex-col md:flex-row items-center bg-white border border-gray-300 rounded-lg p-4 md:p-10 mb-12 cursor-pointer transition-shadow duration-300 shadow-md hover:shadow-lg max-w-full w-[90%] md:w-[800px]"
            onClick={onClick}
        >
            <div className="flex justify-center md:justify-start mb-4 md:mb-0">
                {(userStatus === 'active' && profile.image)? (<img  src={'data:image/jpeg;base64,'+profile.image || user} alt="Profile" className="w-32 h-32 rounded-full object-cover" />):(<img  src={user} alt="Profile" className="w-32 h-32 rounded-full object-cover" />)}
            </div>
            <div className="text-center md:text-left md:ml-6">
                <h5 className="text-xl font-bold text-yellow-900">{profile.name}</h5>
                <p className="text-yellow-600">{profile.status}</p>
                <p className="text-yellow-600">{profile.details}</p>
                <p className="text-yellow-600">{profile.location}</p>
                <p className="text-yellow-600 mb-4">{profile.description}</p>
                <button className="bg-yellow-600 text-white px-4 py-2 rounded transition duration-300 hover:bg-yellow-800">
                    View Profile
                </button>
            </div>
        </div>
    );
};

const Modal = ({ profile, isOpen, onClose }) => {
    if (!isOpen || !profile) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto relative">
                <button 
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                    onClick={onClose}
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
                <div className="flex flex-col items-center">
                    <img 
                        src={profile.image ? `data:image/jpeg;base64,${profile.image}` : user} 
                        alt="Profile" 
                        className="w-32 h-32 rounded-full object-cover mb-4"
                    />
                    <h3 className="text-2xl font-bold mb-2">{profile.name}</h3>
                    <p className="text-gray-500 mb-4">{profile.gender}, {profile.marital_status}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-gray-700"><strong>User ID:</strong> {profile.User_id}</p>
                        <p className="text-gray-700"><strong>Email:</strong> {profile.email}</p>
                        <p className="text-gray-700"><strong>Mother Tongue:</strong> {profile.mother_tongue}</p>
                        <p className="text-gray-700"><strong>Date of Birth:</strong> {profile.dob}</p>
                        <p className="text-gray-700"><strong>Highest Degree:</strong> {profile.highest_degree}</p>
                        <p className="text-gray-700"><strong>Occupation:</strong> {profile.employed_in}</p>
                        <p className="text-gray-700"><strong>Annual Income:</strong> {profile.annual_income}</p>
                    </div>
                    <div>
                        <p className="text-gray-700"><strong>Express Yourself:</strong> {profile.express_yourself}</p>
                        <p className="text-gray-700"><strong>Family Type:</strong> {profile.family_type}</p>
                        <p className="text-gray-700"><strong>Father's Occupation:</strong> {profile.father_occupation}</p>
                        <p className="text-gray-700"><strong>Mother's Occupation:</strong> {profile.mother_occupation}</p>
                        <p className="text-gray-700"><strong>Brothers:</strong> {profile.brother}</p>
                        <p className="text-gray-700"><strong>Sisters:</strong> {profile.sister}</p>
                        <p className="text-gray-700"><strong>Family Living Location:</strong> {profile.family_living_location}</p>
                    </div>
                </div>
                <div className="mt-4">
                    <p className="text-gray-700"><strong>Contact Address:</strong> {profile.contact_address}</p>
                    <p className="text-gray-700"><strong>About Family:</strong> {profile.about_family}</p>
                    <p className="text-gray-700"><strong>Status:</strong> {profile.status}</p>
                </div>
            </div>
        </div>
    );
};

const MatrimonySearch = () => {
    const [query, setQuery] = useState('');
    const [details, setDetails] = useState([]);
    const [filteredProfiles, setFilteredProfiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [userStatus, setUserStatus] = useState('inactive');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProfile, setSelectedProfile] = useState(null);
    const navigate = useNavigate();
    const [user, setuser] = useState({})
    useEffect(() => {
        const response = JSON.parse(localStorage.getItem('user'));
        setuser(response);
        axios.get('https://matrimony-os38.onrender.com/getDetails')
            .then(response => {
                setDetails(response.data);
                setFilteredProfiles(response.data);
                localStorage.setItem('profiles', JSON.stringify(response.data));
            })
            .catch(error => {
                console.error('Error fetching details:', error);
                setError('Error fetching details');
            });

        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setUserStatus(user.status);
        }
    }, []);

    const handleSearch = () => {
        setLoading(true);
        setError('');
        try {
            const searchResults = details.filter(profile =>
                profile.name.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredProfiles(searchResults);
        } catch (err) {
            setError('Error retrieving profiles');
        } finally {
            setLoading(false);
        }
    };

    const handleProfileClick = (profile) => {
        if (userStatus === 'active') {
            setSelectedProfile(profile);
            setIsModalOpen(true);
        } else {
            navigate('/payment');
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProfile(null);
    };

    return (
        <div style={{ backgroundColor: '#FFF4E3' }}>
            <Navbar />
            <Header />
            <div className="container mx-auto p-8">
                <div className="flex justify-center mb-4">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search for profiles..."
                        className="border p-2 w-1/2 rounded-l-lg"
                    />
                    <button
                        onClick={handleSearch}
                        className="bg-yellow-500 text-white px-4 py-2 rounded-r-lg hover:bg-yellow-700 transition"
                    >
                        Search
                    </button>
                </div>
                {loading && <p className="text-center text-yellow-600">Loading...</p>}
                {error && <p className="text-center text-red-600">{error}</p>}
                <div className="flex flex-wrap justify-center">
                    {filteredProfiles.length > 0 ? (
                        filteredProfiles.map((profile) => (
                            <ProfileCard
                                key={profile.id}
                                profile={profile}
                                userStatus={userStatus}
                                onClick={() => handleProfileClick(profile)}
                            />
                        ))
                    ) : (
                        <p className="text-center text-yellow-600">No profiles found.</p>
                    )}
                </div>
                <Modal 
                    profile={selectedProfile} 
                    isOpen={isModalOpen} 
                    onClose={closeModal} 
                />
            </div>
        </div>
    );
};

export default MatrimonySearch;
