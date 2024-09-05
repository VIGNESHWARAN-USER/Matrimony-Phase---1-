import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    gender: ''
  });
  const [loading, setLoading] = useState(false); // Loading state
  const [err, setErr] = useState('');

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSub = (e) => {
    e.preventDefault();

    let valid = true;
    setErr('');

    if (formData.name === '') {
      setErr('Name is required');
      valid = false;
    }

    if (!validateEmail(formData.email)) {
      setErr('Invalid email format');
      valid = false;
    }

    if (formData.password.length < 6) {
      setErr('Password must be at least 6 characters');
      valid = false;
    }

    if (valid) {
      setLoading(true); // Start loading

      axios.post('https://matrimony-os38.onrender.com/signup', formData)
        .then(response => {
          console.log(response.data);
          setLoading(false); // Stop loading
          navigate('../login');
        })
        .catch(error => {
          console.error(error);
          setLoading(false); // Stop loading
          if (error.response && error.response.data) {
            setErr(error.response.data);
          } else {
            setErr('An error occurred. Please try again.');
          }
        });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-amber-300 via-amber-100 to-amber-300 bg-blend-overlay">
      <div className="bg-white rounded-lg w-11/12 max-w-md p-8 shadow-lg opacity-90">
        <h2 className="text-2xl text-amber-500 mb-6 text-center font-bold">Sign Up</h2>
        <form onSubmit={handleSub} className="space-y-4">
          <div className="input-group">
            <input 
              type="text" 
              id="name" 
              name="name" 
              placeholder="Your Name" 
              value={formData.name}
              onChange={handleChange}
              className="w-full p-4 border-none bg-gray-100 outline-none rounded-md"
              required 
            />
          </div>
          <div className="input-group">
            <input 
              type="text" 
              id="email" 
              name="email" 
              placeholder="Your Email Id" 
              value={formData.email}
              onChange={handleChange}
              className="w-full p-4 border-none bg-gray-100 outline-none rounded-md"
              required 
            />
          </div>
          <div className="input-group">
            <input 
              type="password" 
              id="password" 
              name="password" 
              placeholder="Create Password" 
              value={formData.password}
              onChange={handleChange}
              className="w-full p-4 border-none bg-gray-100 outline-none rounded-md"
              required 
            />
            <div className="text-red-500 text-sm">{err}</div>
          </div>
          <div className="input-group">
            <select
              id="gender" 
              name="gender" 
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-4 border-none bg-gray-100 outline-none rounded-md"
              required 
            >
              <option value="" disabled>Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>      
          </div>
          <button 
            type="submit" 
            className={`w-full py-4 bg-amber-500 text-white font-bold rounded-md hover:bg-transparent hover:text-black border border-transparent hover:border-gray-400 transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading} // Disable button while loading
          >
            {loading ? 'Signing Up...' : 'Get Started'}
          </button>
          <p className="text-center text-black mt-4">
            Already have an account? <Link to="../login" className="text-amber-500">Log in.</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
