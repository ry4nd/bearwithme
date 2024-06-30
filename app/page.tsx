"use client";
// frontend
import "./page.css";
import "./hometailwind.css";
import Navbar from "./components/navbar";
import Image from "next/image";

import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

import { useEffect, useState } from "react";

// authentication
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

interface FeatureCardProps {
  src: string;
  alt: string;
  title: string;
  description: string;
}

const FeatureCard = ({ src, alt, title, description }: FeatureCardProps) => (
  <div className="flex flex-col gap-3 bg-slate-200 p-8 opacity-90 flex-1 rounded-xl items-center justify-center hover:bg-slate-100 transition">
    <Image src={src} alt={alt} width={400} height={400} className="w-1/2" />
    <p className="text-xl leading-tight">{title}</p>
    <p className="text-sm leading-snug text-slate-800">{description}</p>
  </div>
);

export default function Home() {
  const [userLogged, setUserLogged] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserLogged(true);
      } else {
        setUserLogged(false);
      }
    });
  });

  return (
    <div>
      <Navbar isAuthenticated={userLogged} inTeddyCare={false} />
      <main>
        <section
          id="storytelling"
          className="flex justify-center items-center flex-col bg-white py-[60px]"
        >
          <div className="flex flex-col text-center bg-white items-center py-[50px] gap-10 w-full">
            <Image
              className="w-1/2 sm:w-1/6"
              src="/bear-white.png"
              alt="teddy"
              width={400}
              height={400}
            />
            <div className="flex flex-col gap-3 justify-center items-center px-10">
              <p className="text-4xl tracking-tight">
                Hello, I am <span className="font-bold">TeddyCare</span>!
              </p>
              <p className="text-xl text-slate-800 w-3/4 leading-snug">
                A smart cuddly toy that bridges the gap between parents and
                children, fostering heartfelt connections from anywhere to
                your home!
              </p>
            </div>
          </div>
        </section>
        <section className="flex justify-center items-center flex-col bg-purple py-[60px]">
          <div className="flex flex-col text-center bg-purple items-center py-[50px] gap-10 w-full">
            <div className="flex flex-row gap-10 sm:gap-20 justify-center items-center">
              <Image
                className="w-1/6 sm:w-1/12"
                src="/bracelet.png"
                alt="racelet"
                width={400}
                height={400}
              />
              <p className="uppercase text-sm font-bold">← Internet →</p>
              <Image
                className="w-1/6 sm:w-1/12"
                src="/bear-white.png"
                alt="teddy"
                width={400}
                height={400}
              />
            </div>
            <div className="flex flex-col gap-3 justify-center items-center">
              <p className="text-2xl tracking-tight">
                Busy working, or staying away from home for a while?
              </p>
              <p className="text-md text-slate-700 w-1/2 leading-snug">
                Communicate with your child using a heartbeat bracelet that
                collects your heartbeat and sends it to TeddyCare, your
                child&apos;s cuddly companion! Ensure that your child feels at
                ease and at home, even when you are far away.
              </p>
            </div>
          </div>
        </section>
        <section className="flex justify-center items-center flex-col bg-blue py-[60px]">
          <div className="flex flex-col text-center bg-blue items-center py-[50px] gap-10 w-full">
            <p className="text-4xl tracking-tight px-10">
              Your Trusted Parenting Companion
            </p>
            <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-5/6 ">
              <FeatureCard
                src="/features/1-iot.png"
                alt="IoT technology"
                title="Equipped with IoT technology"
                description="Remotely control your TeddyCare companion anytime, anywhere, through the BearWithMe companion web application."
              />
              <FeatureCard
                src="/features/2-heartbeat.png"
                alt="Heartbeat simulation"
                title="Transmit, simulate your heartbeat"
                description="A parent's heartbeat is one of the most familiar sounds to
                your baby. Keep them comforted by recording from your
                bracelet to TeddyCare."
              />
              <FeatureCard
                src="/features/3-lullaby.png"
                alt="lullaby"
                title="Play soothing lullabies"
                description="TeddyCare has lullabies that you can play when you're
                missing your child. Let them know that you're always by
                their side!"
              />
              <FeatureCard
                src="/features/4-notif.png"
                alt="notification"
                title="Notify loud sounds nearby"
                description="Receive alerts on your app when loud sounds, such as crying
                and accidental falls, are detected near TeddyCare!"
              />
            </div>
          </div>
        </section>
        <section
          id="shop"
          className="flex justify-center items-center flex-col bg-white py-[70px]"
        >
          <div className="flex flex-col text-center bg-white items-center py-[50px] gap-10 w-full">
            <div className="flex flex-col gap-2">
              <p className="text-4xl tracking-tight px-10">
                Meet your child&apos;s new TeddyCare!
              </p>
              <p className="text-slate-600 px-10">
                All products come with a free account on the web app,
                BearWithMe, for remote interactions!
              </p>
            </div>
            <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-5/6 ">
              <div className="flex flex-col gap-6 bg-slate-200 p-8 opacity-90 flex-1 rounded-xl items-center justify-center hover:bg-slate-100 transition">
                <div className="flex flex-col items-center justify-center gap-2">
                  <p className="uppercase text-sm leading-loose font-bold text-slate-700">
                    BEAR
                  </p>
                  <Image
                    src="/bear-white.png"
                    alt="bear"
                    width={400}
                    height={400}
                    className="w-1/2"
                  />
                </div>
                <div className="flex flex-col items-center justify-center gap-2">
                  <p className="text-xl leading-tight">TeddyCare</p>
                  <p className="text-sm leading-snug text-slate-800">
                    Snuggle up with the TeddyCare! Replay heartbeats, play
                    lullabies, and get notified.
                  </p>
                </div>
                <div className="flex flex-col gap-3 items-center justify-center">
                  <div className="flex flex-row gap-2 items-center justify-center">
                    <span className="text-sm font-semibold mr-2">Colors</span>
                    <div className="w-5 h-5 rounded-full bg-white outline outline-1 outline-slate-500">
                      {" "}
                    </div>
                    <div className="w-5 h-5 rounded-full bg-pink outline outline-1 outline-white">
                      {" "}
                    </div>
                    <div className="w-5 h-5 rounded-full bg-pastel-pink outline outline-1 outline-white">
                      {" "}
                    </div>
                  </div>
                  <div className="flex flex-row gap-2 items-center justify-center">
                    <span className="text-sm font-semibold mr-2">
                      Backpacks
                    </span>
                    <div className="w-5 h-5 rounded-full bg-brown outline outline-1 outline-white">
                      {" "}
                    </div>
                    <div className="w-5 h-5 rounded-full bg-bag-purple outline outline-1 outline-white">
                      {" "}
                    </div>
                    <div className="w-5 h-5 rounded-full bg-bag-blue outline outline-1 outline-white">
                      {" "}
                    </div>
                  </div>
                </div>
                <div className="flex flex-row gap-3 items-center justify-between">
                  <p className="text-xl">₱1,299</p>
                  <p className="text-sm tracking-tight underline underline-offset-4 hover:text-slate-500 transition">
                    SHOP NOW
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-6 bg-slate-200 p-8 opacity-90 flex-1 rounded-xl items-center justify-center hover:bg-slate-100 transition">
                <div className="flex flex-col items-center justify-center gap-2">
                  <p className="uppercase text-sm leading-loose font-bold text-slate-700">
                    BUNDLE
                  </p>
                  <Image
                    src="/bear-bracelet.png"
                    alt="bear bracelet bundle"
                    width={400}
                    height={400}
                    className="w-1/2"
                  />
                </div>
                <div className="flex flex-col items-center justify-center gap-2">
                  <p className="text-xl leading-tight">TeddyCare Bundle</p>
                  <p className="text-sm leading-snug text-slate-800">
                    Alongside the features of TeddyCare, have the option to
                    record your own heartbeat, anytime, anywhere.
                  </p>
                </div>
                <div className="flex flex-col gap-3 items-center justify-center">
                  <div className="flex flex-row gap-2 items-center justify-center">
                    <span className="text-sm font-semibold mr-2">Colors</span>
                    <div className="w-5 h-5 rounded-full bg-white outline outline-1 outline-slate-500">
                      {" "}
                    </div>
                    <div className="w-5 h-5 rounded-full bg-pink outline outline-1 outline-white">
                      {" "}
                    </div>
                    <div className="w-5 h-5 rounded-full bg-pastel-pink outline outline-1 outline-white">
                      {" "}
                    </div>
                  </div>
                  <div className="flex flex-row gap-2 items-center justify-center">
                    <span className="text-sm font-semibold mr-2">
                      Backpacks
                    </span>
                    <div className="w-5 h-5 rounded-full bg-brown outline outline-1 outline-white">
                      {" "}
                    </div>
                    <div className="w-5 h-5 rounded-full bg-bag-purple outline outline-1 outline-white">
                      {" "}
                    </div>
                    <div className="w-5 h-5 rounded-full bg-bag-blue outline outline-1 outline-white">
                      {" "}
                    </div>
                  </div>
                </div>
                <div className="flex flex-row gap-3 items-center justify-between">
                  <p className="text-xl">₱1,449</p>
                  <p className="text-sm tracking-tight underline underline-offset-4 hover:text-slate-500 transition">
                    SHOP NOW
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-6 bg-slate-200 p-8 opacity-90 flex-1 rounded-xl items-center justify-center hover:bg-slate-100 transition">
                <div className="flex flex-col items-center justify-center gap-2">
                  <p className="uppercase text-sm leading-loose font-bold text-slate-700">
                    BRACELET
                  </p>
                  <Image
                    src="/bracelet.png"
                    alt="bracelet"
                    width={400}
                    height={400}
                    className="w-1/2"
                  />
                </div>
                <div className="flex flex-col items-center justify-center gap-2">
                  <p className="text-xl leading-tight">TeddyCare</p>
                  <p className="text-sm leading-snug text-slate-800">
                    Remotely record your heartbeat!
                  </p>
                </div>
                <div className="flex flex-row gap-3 items-center justify-between">
                  <p className="text-xl">₱249</p>
                  <p className="text-sm tracking-tight underline underline-offset-4 hover:text-slate-500 transition">
                    SHOP NOW
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          id="contact"
          className="flex justify-center items-center flex-col bg-white pb-[70px]"
        >
          <div className="flex flex-col text-center bg-dark-blue items-center py-[80px] px-10 gap-10 rounded-3xl w-11/12 sm:w-7/12 ">
            <div className="flex flex-col gap-2">
              <p className="text-4xl tracking-tight text-white">
                Our team is fully committed to you and your baby&apos;s care
              </p>
              <p className="text-slate-300">
                Our lines are always open for technical questions regarding
                TeddyCare and BearWithMe.
              </p>
            </div>
            <div className="flex flex-row gap-10 w-9/12 flex-wrap">
              <form className="flex flex-col gap-4 flex-1">
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  className="p-4 border-2 border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  name="message"
                  placeholder="Message"
                  className="p-4 h-32 border-2 border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="p-4 text-slate-700 bg-purple rounded-lg hover:bg-purple-light transition duration-200"
                >
                  Send
                </button>
              </form>
              <div className="flex flex-col gap-4 flex-1 items-start">
                <p className="text-2xl text-slate-300">Contact us!</p>
                <div className="flex flex-col gap-2 flex-1">
                  <div className="flex flex-col gap-1 flex-1 items-start">
                    <p className="text-3xl text-white">WeCareBears</p>
                    <p className="text-slate-300">wecarebears0xE@gmail.com</p>
                  </div>
                  <div className="flex flex-row text-sm text-left text-slate-300 gap-1">
                    <FacebookIcon />
                    <XIcon />
                    <InstagramIcon />
                    <LinkedInIcon />
                    <svg
                      fill="#cbd5e1"
                      width="20px"
                      height="20px"
                      viewBox="0 0 32 32"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M16.656 1.029c1.637-0.025 3.262-0.012 4.886-0.025 0.054 2.031 0.878 3.859 2.189 5.213l-0.002-0.002c1.411 1.271 3.247 2.095 5.271 2.235l0.028 0.002v5.036c-1.912-0.048-3.71-0.489-5.331-1.247l0.082 0.034c-0.784-0.377-1.447-0.764-2.077-1.196l0.052 0.034c-0.012 3.649 0.012 7.298-0.025 10.934-0.103 1.853-0.719 3.543-1.707 4.954l0.020-0.031c-1.652 2.366-4.328 3.919-7.371 4.011l-0.014 0c-0.123 0.006-0.268 0.009-0.414 0.009-1.73 0-3.347-0.482-4.725-1.319l0.040 0.023c-2.508-1.509-4.238-4.091-4.558-7.094l-0.004-0.041c-0.025-0.625-0.037-1.25-0.012-1.862 0.49-4.779 4.494-8.476 9.361-8.476 0.547 0 1.083 0.047 1.604 0.136l-0.056-0.008c0.025 1.849-0.050 3.699-0.050 5.548-0.423-0.153-0.911-0.242-1.42-0.242-1.868 0-3.457 1.194-4.045 2.861l-0.009 0.030c-0.133 0.427-0.21 0.918-0.21 1.426 0 0.206 0.013 0.41 0.037 0.61l-0.002-0.024c0.332 2.046 2.086 3.59 4.201 3.59 0.061 0 0.121-0.001 0.181-0.004l-0.009 0c1.463-0.044 2.733-0.831 3.451-1.994l0.010-0.018c0.267-0.372 0.45-0.822 0.511-1.311l0.001-0.014c0.125-2.237 0.075-4.461 0.087-6.698 0.012-5.036-0.012-10.060 0.025-15.083z"></path>
                    </svg>
                  </div>
                </div>
                <ul className="flex-1 text-sm text-left text-slate-300 gap-1">
                  <li>Decena, Ryan Carlo</li>
                  <li>Garais, Zandrew Peter</li>
                  <li>Jafri, Ali Mahmood</li>
                  <li>Inukai, Masayuki</li>
                  <li>Manguan, Ayen Unice</li>
                  <li>Maximo, Calvin James</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
