import React , { useState } from 'react'
import api, { userAPI } from '../services/api'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

export default function Register() {

    const [formData, setFormData]= useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [pauseTillReg, setPauseTillReg] = useState(false);


    // when any input for the form is changed, save it as new element to ordinary data
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    // when for submit button is clicked
    const handleSubmit = async (e) => {

        setPauseTillReg(true);
        e.preventDefault();
        setError('');
        // valiation of input data
        if(formData.password.trim()==="" || formData.confirmPassword.trim()===""){
            setError('Please enter your password and confirm it');
            setPauseTillReg(false);
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setPauseTillReg(false);
            return;
        }
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            setPauseTillReg(false);
            return;
        }
        if (formData.name.trim()==="" ) {
            setError('Please enter your name');
            setPauseTillReg(false);
            return;
        }
        if (formData.email.trim()==="" ) {
            setError('Please enter your mail');
            setPauseTillReg(false);
            return;
        }
        // Check if user already exists
        const existingUser = await userAPI.checkMailExist(formData.email);
        if (existingUser && existingUser.data.length > 0) {
            setError('User with this email already exists');
            setPauseTillReg(false);
            return;
        }
        // Create new user
        const newUser = {
            name: formData.name.trim(),
            email: formData.email,
            password: formData.password
        };
        const response = await userAPI.create(newUser);
        // Redirect to login
        alert('Registration successful! Please login with your new account.');
        navigate('/login');
    
        setPauseTillReg(false);
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Full Name"
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
            <div>
              <input
                type="password"
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={pauseTillReg}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400"
            >
              {pauseTillReg ? 'Creating Account...' : 'Create Account'}
            </button>
          </div>

          <div className="text-center">
            <Link to="/login" className="text-blue-600 hover:text-blue-500">
              Already have an account? Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>    
  )
}
