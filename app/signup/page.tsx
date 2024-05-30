'use client'
import { useState, FormEvent } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db } from "../firebase";
import { set, ref } from "firebase/database";

import './page.css';
import logo from '../assets/logo-lilac.png';

export default function SignUp() {
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
                    set(ref(db, user.uid), {
                        email: "",
                        firstName: "",
                        lastName: "",
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
                    <div>
                        <img src={logo.src} alt="logo" />
                        <p>BearWithMe</p>
                    </div>
                    <h2>Sign Up</h2>
                    <form>
                        <div className='name-container'>
                            <div>
                                <label>First Name</label>
                                <input type='text' placeholder='First Name'/>
                            </div>
                            <div>
                                <label>Last Name</label>
                                <input type='text' placeholder='Last Name'/> 
                            </div>
                        </div>
                        <label>Address</label>
                        <input type='text' placeholder='Address'/>
                        <label>Contact Number</label>
                        <input type='text' placeholder='Contact Number'/>
                        <label>Email</label>
                        <input type='text' placeholder='Email'/>
                        <label>Password</label>
                        <input type='text' placeholder='Password'/>
                        <label>Confirm Password</label>
                        <input type='text' placeholder='Confirm Password'/>
                        {error && <label>{error}</label>}
                        <div>
                            <button>Create Account</button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
};