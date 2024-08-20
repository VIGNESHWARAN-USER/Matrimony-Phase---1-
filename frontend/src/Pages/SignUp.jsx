import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  const [err, seterr] = useState('')
  const handleSub = (e) => {
    e.preventDefault();

    let valid = true;
    

    if (formData.name === '') {
      seterr('Name is required');
      valid = false;
    }

    if (!validateEmail(formData.email)) {
      seterr('Invalid email format');
      valid = false;
    }

    if (formData.password.length < 6) {
      seterr('Password must be at least 6 characters');
      valid = false;
    }

    seterr(err);

    if (valid) {
      
        axios.post('http://matrimony-os38.onrender.com/signup', formData)
          .then(response => {
            console.log(response.data);
              navigate('../login');
          })
          .catch(error => {
            console.error(error);
            if (error.response && error.response.data) {
              seterr(error.response.data);
            } else {
              seterr('An error occurred. Please try again.' );
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
          <button 
            type="submit" 
            className="w-full py-4 bg-amber-500 text-white font-bold rounded-md hover:bg-transparent hover:text-black border border-transparent hover:border-gray-400 transition duration-300"
          >
            Get Started
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