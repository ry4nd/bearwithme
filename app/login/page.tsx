'use client'
import { useState, useEffect, FormEvent } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import './page.css';

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 
    const [error, setError] = useState('');
    const [userLogged, setUserLogged] = useState(false);

    // Check if user is currently logged in; if so, redirect to /teddycare if they're trying to access the login page
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserLogged(true);
                router.push('/teddycare');
            } 
            else {
                setUserLogged(false);
            }
            });
    });

    const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log('User logged in:', userCredential.user.uid);
                router.push('/teddycare');
            })
            .catch((error) => {
                console.log(error.code);
                if (error.code === 'auth/invalid-email') {
                    setError('Invalid email');
                } else if (error.code === 'auth/invalid-credential') {
                    setError('User not found/Password is incorrect')
                }
            });
    };  

    return (
        <main className='grid'>
            <section id='login'>
                <div className='login-background'>
                    <h3>Login</h3>
                    <form onSubmit={handleLogin}>
                        <label style={{fontWeight:'bold'}}>Email</label>
                        <input 
                            type='text' 
                            placeholder='Email'
                            value={email}
                            onChange = {(event) => setEmail(event.target.value)}
                            required
                        />
                        <label style={{fontWeight:'bold'}}>Password</label>
                        <input 
                            type='password' 
                            placeholder='Password'
                            value={password}
                            onChange = {(event) => setPassword(event.target.value)}
                            required
                        />
                        {error && <label className='error'>{error}</label>}
                        <button type="submit">Login</button>
                    </form>
                    <div>
                        <label>Don&apos;t have an account? </label>
                        <Link href='/signup'>
                            <label className='signup-link'>Sign up here</label>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
};