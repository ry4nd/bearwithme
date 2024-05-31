'use client';
// frontend
import './page.css';
import Navbar from './components/navbar';

export default function Home() { 
  return (
    <div>
      <Navbar isAuthenticated={true} inTeddyCare={false} />
      <main>
        <section id='storytelling'>
          <h1>Storytelling</h1>
        </section>
        <section id='shop'>
          <h1>Shop</h1>
        </section>
        <section id='contact' className='grid'>
          <div className="contact-container">
            <h1>Contact</h1>
          </div>
        </section>
        <section id='about'>
          <h1>About</h1>
        </section>
      </main>
    </div>
  );
}
