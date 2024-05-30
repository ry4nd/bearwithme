import Link from 'next/link';
import Image from 'next/image';
import logo from '../assets/logo-lilac.png';
import './navbar.css';

type NavbarProps = {
    isAuthenticated: boolean;
};

export default function Navbar({isAuthenticated}: NavbarProps) {
    return (
        <nav>
            <Link href='/' className='logo-container'>
                <Image src={logo} alt='logo' width={27} height={32} />
                <p>BearWithMe</p  >
            </Link>
            {!isAuthenticated && 
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
                </div>
            }
            {isAuthenticated && 
                <div className='logout-container'>
                    <p>Logout</p>
                </div>
            }
        </nav>
    );
}