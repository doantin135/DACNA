import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import validation from './LoginValidation';
import axios from 'axios';

function Login() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrors(validation(values));

        try {
            const res = await axios.post('http://localhost:1234/login', values);
            if (res.data === "Success") {
                navigate('/dashboard');
            } else {
                alert("No record existed");
            }
        } catch (err) {
            if (err.response) {
                console.log(err.response.data); // server responded with non-2xx status code
            } else if (err.request) {
                console.log(err.request); // no response was received
            } else {
                console.log(err.message); // something happened in setting up the request that triggered an error
            }
        }
    };

    return (
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <h2>Log in</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input type='email' placeholder='Enter email' name='email'
                            className='form-control rounded-0' onChange={handleInput}></input>
                        {errors.email && <span className='text-danger'> {errors.email}</span>}
                    </div>

                    <div className='mb-3'>
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input type='password' placeholder='Enter password' name='password'
                            className='form-control rounded-0' onChange={handleInput}></input>
                        {errors.password && <span className='text-danger'> {errors.password}</span>}
                    </div>

                    <button type='submit' className='btn btn-success w-100 rounded-0'>Log in</button>
                    <p>Welcome</p>
                    <Link to="/signup" className='btn btn-default border w-100 bg-light rounded-0 '>Create Account</Link>
                </form>
            </div>
        </div>
    )
}

export default Login;
