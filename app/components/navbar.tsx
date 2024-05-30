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
                <h6>BearWithMe</h6  >
            </Link>
            {!isAuthenticated && 
                <div className='section-container'>
                    <Link href='#shop'>
                        <h6>Shop</h6>
                    </Link>
                    <Link href='#contact'>
                        <h6>Contact</h6>
                    </Link>
                    <Link href='#about'>
                        <h6>About</h6>
                    </Link>
                </div>
            }
            {isAuthenticated && 
                <div className='logout-container'>
                    <h6>Logout</h6>
                </div>
            }
        </nav>
    );
}