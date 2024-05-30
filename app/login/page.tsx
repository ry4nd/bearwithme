'use client'
import { useState, FormEvent } from 'react';
import { auth } from '../firebase';
import { getAuth, connectAuthEmulator, signInWithEmailAndPassword } from 'firebase/auth';
import { db } from "../firebase";
import { set, ref } from "firebase/database";
import { useLocation } from 'wouter';
import { useRouter } from 'next/router';

import './page.css';
import logo from '../assets/logo-lilac.png';


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 
    const [error, setError] = useState('');
    // const [location, setLocation] = useLocation();
    // const router = useRouter();

    const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log('User logged in:', userCredential.user.uid);
            // router.push('/');
        }
        catch(error : any){
            console.log(error.code);
            if (error.code === 'auth/invalid-credential') {
                setError('User not found');
            }
            else if (error.code === 'auth/wrong-password') {
                setError('Wrong password');
            }
            else {
                setError('An error occurred');
            }
        }
    };
        
    return (
        <main className='grid'>
            <section id='login'>
                <div className='login-background'>
                    <div>
                        <img src={logo.src} alt="logo" />
                        <p>BearWithMe</p>
                    </div>
                    <h2>Login</h2>
                    <form>
                        <label>Email</label>
                        <input type='text' placeholder='Email'/>
                        <label>Password</label>
                        <input type='text' placeholder='Password'/>
                        {error && <label>{error}</label>}
                        <div>
                            <button>Login</button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
};