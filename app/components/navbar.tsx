import Link from 'next/link';
import Image from 'next/image';
import logo from '../assets/logo-lilac.png';
import './navbar.css';

type NavbarProps = {
    isAuthenticated: boolean;
    inTeddyCare: boolean;
}

export default function Navbar({isAuthenticated, inTeddyCare}: NavbarProps) {
    return (
        <nav>
            <Link href='/' className='logo-container'>
                <Image src={logo} alt='logo' width={27} height={32} />
                <p>BearWithMe</p  >
            </Link>
            {(isAuthenticated && inTeddyCare) &&
                <div className='logout-container'>
                    <p>Logout</p>
                </div>
            }
            {(isAuthenticated && !inTeddyCare) &&
                <div className='section-container'>
                    <Link href='/teddycare'>
                        <p>TeddyCare</p>
                    </Link>
                    <Link href='#shop'>
                        <p>Shop</p>
                    </Link>
                    <Link href='#contact'>
                        <p>Contact</p>
                    </Link>
                    <Link href='#about'>
                        <p>About</p>
                    </Link>
                </div>
            }
            {(!isAuthenticated && !inTeddyCare) &&
                <div className='section-container'>
                    <Link href='#shop'>
                        <p>Shop</p>
                    </Link>
                    <Link href='#contact'>
                        <p>Contact</p>
                    </Link>
                    <Link href='#about'>
                        <p>About</p>
                    </Link>
                    <Link href='/login'>
                        <p>Login</p>
                    </Link>
                </div>
            }
        </nav>
    );
}