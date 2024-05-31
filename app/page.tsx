'use client';
// frontend
import './page.css';
import Navbar from './components/navbar';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import { useEffect, useState } from 'react';

// authentication
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function Home() {
  const [userLogged, setUserLogged] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setUserLogged(true);
        } 
        else {
            setUserLogged(false);
        }
        });
  });
  
  return (
    <div>
      <Navbar isAuthenticated={userLogged} inTeddyCare={false} />
      <main>
        <section id='storytelling'>
          <h1>Storytelling</h1>
        </section>

        <section id='shop'>
          <h1>Shop</h1>
        </section>

        <section id='contact' className='grid'>
          <div className="contact-container">
            <h3>Contact Us</h3>
            <div>
              <div className='email-container'>
                <input type="text" placeholder='Subject'/>
                <textarea name="message" id="message" placeholder='Message'></textarea>
                <button className='send-button'>
                  <p>Send</p>
                </button>
              </div>
              <div className='contact-details-container'>
                <p>Email: wecarebears0xE@gmail.com</p>
                <div className="socmed-logo-container">
                  <FacebookIcon className='icon'/>
                  <InstagramIcon className='icon'/>
                  <XIcon className='icon'/>
                  <LinkedInIcon className='icon'/>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id='about'>
          <h1>About</h1>
        </section>
      </main>
    </div>
  );
}
