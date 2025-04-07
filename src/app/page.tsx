"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 bg-[url('/bgImage-sm.webp')] sm:bg-[url('/bgImage.webp')] bg-cover bg-no-repeat sm:bg-center">
      {/* Header Section */} 
      <header className="shadow-sm mx-2 mt-2">
        <nav>
          <div className="grid grid-cols-2">
            <div className="text-3xl m-3 font-semibold text-white text-harmony">
              <Link href="/">HARMONY</Link>
            </div>
            <div className="flex justify-end m-3">
              <button className="bg-[#FFB4C4] text-black py-1 px-4 text-xl rounded-2xl hover:bg-[#fba8bb]">
                <Link href="/signin">Log in</Link>
              </button>
            </div>
          </div>
        </nav>
      </header>

      <main className="flex-1 flex flex-col justify-center items-center text-center px-6">
        <h1 className="text-5xl sm:text-7xl text-harmony">HARMONY</h1>

        {/* Description */}
        <p className="max-w-screen-md mb-10 mt-4 text-white text-xl sm:text-2xl font-julius">
          WELCOME TO <br /> STRESS RELIEF AI
        </p>

        {/* Try Now Button */}
        <Link href="/signin" className="cursor-pointer">
          <button className="bg-gray-700 text-white py-2 px-4 rounded-3xl hover:bg-gray-600 m-1 inline-flex items-center cursor-pointer">
            <span className="mr-2 text-harmony text-xl sm:text-2xl font-indie">Try Now</span>
            <svg
              width="11"
              style={{ transform: "translate(1px, -1px)" }}
              viewBox="0 0 11 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="cursor-pointer text-harmony"
            >
              <path
                d="M1.70985 4.5H7.7804M7.7804 4.5V10.5705M7.7804 4.5L0.780396 11.5"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </Link>

        {/* Mirrored Image Below */}
        <div className="fixed right-[-10rem] sm:right-[-19rem] z-0 pointer-events-none top-0 md:top-1/2 md:translate-y-[-50%] hidden sm:block">
          <img
            src="/AIPersona.webp"
            alt="Mirrored Image"
            className="
              h-[50vh]         
              sm:h-[70vh]      
              md:h-[80vh]      
              scale-x-[-1]
              opacity-80
              rotate-[10deg]
              object-contain
            "
          />
        </div>
      </main>

      {/* Footer (Sticks to Bottom) */}
      <footer className="bg-gray-800 rounded-lg shadow-sm dark:bg-gray-800 w-full">
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2025 <Link href="/" className="hover:underline">Harmony™</Link>. All Rights Reserved.
          </span>
          <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <li><Link href="https://www.linkedin.com/in/bhaumik-jangid/" target="_blank" className="hover:underline me-4 md:me-6">Bhaumik (12320769)</Link></li>
            <li><Link href="https://www.linkedin.com/in/ganeshkr0201/" target="_blank" className="hover:underline me-4 md:me-6">Ganesh (12317780)</Link></li>
            <li><Link href="https://www.linkedin.com/in/rahulkala013/" target="_blank" className="hover:underline">Rahul (12307744)</Link></li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
