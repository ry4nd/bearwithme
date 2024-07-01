"use client";
import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { db } from "../firebase";
import { set, ref } from "firebase/database";

import "./page.css";
import logo from "../assets/logo-lilac.png";

export default function SignUp() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  // Redirect if accessing while already authenticated
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/teddycare");
      }
    });
  });

  const handleSignUp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
    } else if (password.length < 8) {
      setError("Password must be at least 8 characters");
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("User created:", user.uid);
          set(ref(db, "users/" + user.uid), {
            firstName: firstName,
            lastName: lastName,
            address: address,
            contactNumber: contactNumber,
            email: email,
          });
          signOut(auth)
            .then(() => {
              console.log("User signed out");
            })
            .catch((error) => {
              console.log("An error occurred while signing out:", error);
            });
          router.push("/login");
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            setError("Email already in use");
          } else if (error.code === "auth/invalid-email") {
            setError("Invalid email");
          } else {
            setError("An error occurred");
          }
        });
    }
  };

  return (
    <main className="flex items-center justify-center h-screen">
      <div className="bg-dark-blue flex flex-col items-center gap-4 rounded-3xl p-8">
        <p className="text-3xl text-white">Sign Up</p>
        <form
          onSubmit={handleSignUp}
          className="flex flex-col gap-2 w-full text-white"
        >
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex flex-col gap-2">
              <p>First Name</p>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                required
                className="p-2 rounded-lg outline-none focus:ring-1 focus:ring-blue text-black"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p>Last Name</p>
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                required
                className="p-2 rounded-lg outline-none focus:ring-1 focus:ring-blue text-black"
              />
            </div>
          </div>
          <p>Address</p>
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            required
            className="p-2 rounded-lg outline-none focus:ring-1 focus:ring-blue text-black"
          />
          <p>Contact Number</p>
          <input
            type="text"
            placeholder="Contact Number"
            value={contactNumber}
            onChange={(event) => setContactNumber(event.target.value)}
            required
            className="p-2 rounded-lg outline-none focus:ring-1 focus:ring-blue text-black"
          />
          <p>Email</p>
          <input
            type="email"
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
          <p>Confirm Password</p>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
            className="p-2 rounded-lg outline-none focus:ring-1 focus:ring-blue text-black"
          />
          {error && <p>{error}</p>}
          <button
            type="submit"
            className="py-2 text-dark-blue bg-blue rounded-lg hover:bg-blue-light transition duration-200"
          >
            Create Account
          </button>
        </form>
      </div>
    </main>
  );
}
