import Link from "next/link";
import Image from "next/image";
import logo from "../assets/logo-lilac.png";
import "./navbar.css";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

type NavbarProps = {
  isAuthenticated: boolean;
  inTeddyCare: boolean;
};

export default function Navbar({ isAuthenticated, inTeddyCare }: NavbarProps) {
  const router = useRouter();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out");
        router.push("/");
      })
      .catch((error) => {
        console.log("An error occurred", error.code);
      });
  };

  return (
    <nav className="bg-dark-blue text-white p-4 sm:px-8 flex justify-between items-center">
      <Link href="/" className="flex items-center gap-2 sm:gap-4">
        <Image src={logo} alt="logo" width={27} height={32} />
        <p className="hover:text-blue">BearWithMe</p>
      </Link>
      {isAuthenticated && inTeddyCare && (
        <div>
          <p className="hover:text-blue" onClick={handleLogout}>
            Logout
          </p>
        </div>
      )}
      {isAuthenticated && !inTeddyCare && (
        <div className="flex items-center gap-2 sm:gap-4">
          <Link href="/teddycare">
            <p className="hover:text-blue">TeddyCare</p>
          </Link>
          <Link href="#shop">
            <p className="hover:text-blue">Shop</p>
          </Link>
          <Link href="#contact">
            <p className="hover:text-blue">Contact</p>
          </Link>
        </div>
      )}
      {!isAuthenticated && !inTeddyCare && (
        <div className="flex items-center gap-2 sm:gap-4">
          <Link href="#shop">
            <p className="hover:text-blue">Shop</p>
          </Link>
          <Link href="#contact">
            <p className="hover:text-blue">Contact</p>
          </Link>
          <Link href="/login">
            <p className="hover:text-blue">Login</p>
          </Link>
        </div>
      )}
    </nav>
  );
}
