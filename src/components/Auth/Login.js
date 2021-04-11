import React, { useState } from 'react'
import Cat from '../../assets/images/chesher.svg'
import { Link } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { login } from '../../store/actions/auth'
import sha256 from 'crypto-js/sha256';

import './Auth.scss'

const Login = ({ history }) => {

    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const submitForm = (e) => {
        e.preventDefault()

        var password = sha256(password).toString();

        dispatch(login({ email, password }, history))
    }

    return (
        <div id='auth-container'>
            <div id='auth-card'>
                <div className='card-shadow'>
                    <div id='image-section'>
                        <img src={Cat} alt='Login' />
                    </div>

                    <div id='form-section'>
                        <h2>LOGIN</h2>

                        <form onSubmit={submitForm}>
                            <div className='input-field mb-1'>
                                <input
                                    onChange={e => setEmail(e.target.value)}
                                    value={email}
                                    required='required'
                                    type='text'
                                    placeholder='Email' />
                            </div>

                            <div className='input-field mb-2'>
                                <input
                                    onChange={e => setPassword(e.target.value)}
                                    value={password}
                                    required='required'
                                    type='password'
                                    placeholder='Password' />
                            </div>

                            <button>LOGIN</button>
                        </form>

                        <p> <Link to='/register'>Register</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login