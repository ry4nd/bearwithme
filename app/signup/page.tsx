'use client'
import { useState, FormEvent } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db } from "../firebase";
import { set, ref } from "firebase/database";

import './page.css';
import logo from '../assets/logo-lilac.png';

export default function SignUp() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignUp = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
        } else if (password.length < 8) {
            setError('Password must be at least 8 characters');
        }  else {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log('User created:', user.uid);
                    set(ref(db, 'users/' + user.uid), {
                        firstName: firstName,
                        lastName: lastName,
                        address: address,
                        contactNumber: contactNumber,
                        email: email,
                    });
                })
                .catch((error) => {
                    if (error.code === 'auth/email-already-in-use') {
                        setError('Email already in use');
                    } else if (error.code === 'auth/invalid-email') {
                        setError('Invalid email');
                    } else {
                        setError('An error occurred');
                    }
                });
        };
    };

    return (
        <main className='grid'>
            <section id='signup'>
                <div className='signup-background'>
                    <h3>Sign Up</h3>
                    <form onSubmit={handleSignUp}>
                        <div className='name-container'>
                            <div>
                                <label>First Name</label>
                                <input 
                                    type='text' 
                                    placeholder='First Name'
                                    value={firstName}
                                    onChange={(event) => setFirstName(event.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label>Last Name</label>
                                <input 
                                    type='text' 
                                    placeholder='Last Name' 
                                    value={lastName}
                                    onChange={(event) => setLastName(event.target.value)}
                                    required
                                /> 
                            </div>
                        </div>
                        <label>Address</label>
                        <input 
                            type='text' 
                            placeholder='Address' 
                            value={address}
                            onChange={(event) => setAddress(event.target.value)}
                            required
                        />
                        <label>Contact Number</label>
                        <input 
                            type='text' 
                            placeholder='Contact Number'
                            value={contactNumber}
                            onChange={(event) => setContactNumber(event.target.value)} 
                            required
                        />
                        <label>Email</label>
                        <input 
                            type='email' 
                            placeholder='Email'
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                        />
                        <label>Password</label>
                        <input 
                            type='password' 
                            placeholder='Password'
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            required
                        />
                        <label>Confirm Password</label>
                        <input 
                            type='password' 
                            placeholder='Confirm Password' 
                            value={confirmPassword}
                            onChange={(event) => setConfirmPassword(event.target.value)}
                            required
                        />
                        {error && <label>{error}</label>}
                        <button type="submit">Create Account</button>
                    </form>
                </div>
            </section>
        </main>
    );
};