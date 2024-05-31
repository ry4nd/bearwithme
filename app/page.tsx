'use client';
// frontend
import './page.css';
import Navbar from './components/navbar';
import Contact from './assets/contact.png';
import Shop from './assets/shop.png';
import Storytelling from './assets/storytelling.png';
import Features from './assets/features.png';

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
          <div style={{backgroundColor: 'var(--foreground)'}}>
            <img src={Storytelling.src} alt="storytelling-section" />
            <img src={Features.src} alt="features" />
          </div>
        </section>
        <section id='shop'>
          <div style={{backgroundColor: 'var(--foreground)'}}>
            <img src={Shop.src} alt="shop-section" />
          </div>
        </section>
        <section id='contact'>
          <div style={{backgroundColor: 'var(--foreground)'}}>
            <img src={Contact.src} alt="contact-section" />
          </div>
        </section>
        <section id='about'>
        </section>
      </main>
    </div>
  );
}
