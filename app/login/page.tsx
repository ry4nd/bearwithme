"use client";
import { useState, useEffect, FormEvent } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "./page.css";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [userLogged, setUserLogged] = useState(false);

  // Check if user is currently logged in; if so, redirect to /teddycare if they're trying to access the login page
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserLogged(true);
        router.push("/teddycare");
      } else {
        setUserLogged(false);
      }
    });
  });

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("User logged in:", userCredential.user.uid);
        router.push("/teddycare");
      })
      .catch((error) => {
        console.log(error.code);
        if (error.code === "auth/invalid-email") {
          setError("Invalid email");
        } else if (error.code === "auth/invalid-credential") {
          setError("User not found/Password is incorrect");
        }
      });
  };

  return (
    <main className="flex items-center justify-center h-screen">
      <div className="bg-dark-blue flex flex-col items-center gap-4 rounded-3xl p-8">
        <p className="text-3xl text-white">Login</p>
        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-2 w-full text-white"
        >
          <p>Email</p>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            className="p-2 rounded-lg outline-none focus:ring-1 focus:ring-blue text-black"
          />
          <p>Password</p>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            className="p-2 rounded-lg outline-none focus:ring-1 focus:ring-blue text-black"
          />
          {error && <label className="error">{error}</label>}
          <button
            type="submit"
            className="py-2 text-dark-blue bg-purple rounded-lg hover:bg-purple-light transition duration-200"
          >
            Login
          </button>
        </form>
        <div className="flex gap-2 text-slate-300">
          <p>Don&apos;t have an account? </p>
          <Link href="/signup">
            <p className="font-bold hover:text-purple-light transition duration-200">
              Sign up here
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
}
