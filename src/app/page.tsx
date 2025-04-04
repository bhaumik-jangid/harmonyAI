"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      {/* Header Section */} 
      <header className="shadow-sm">
        <nav>
          <div className="grid grid-cols-2">
            <div className="text-2xl m-3 font-semibold text-white">
              <Link href="/">HARMONY</Link>
            </div>
            <div className="flex justify-end m-3">
              <button className="bg-gray-700 text-white py-2 px-4 rounded-3xl hover:bg-gray-600">
                <Link href="/signin">Log in</Link>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content (Flexible to push footer down) */}
      <main className="flex-1 flex flex-col justify-center items-center text-center px-6">
        <h1 className="text-5xl text-white">Introducing HARMONY</h1>
        <Link href="/signin" className="cursor-pointer">
          <button className="bg-gray-700 text-white py-2 px-4 rounded-3xl hover:bg-gray-600 mt-6 inline-flex items-center cursor-pointer">
            <span className="mr-2">Try Now</span>
            <svg
              width="11"
              style={{ transform: "translate(1px, -1px)" }}
              viewBox="0 0 11 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="cursor-pointer"
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

        {/* Description */}
        <p className="max-w-screen-md mt-14 text-center text-gray-400">
          Welcome to Stress Relief AI, your personal companion in managing stress and enhancing well-being.
          Our intelligent chatbot offers tailored support, mindfulness exercises, and resources to help you navigate life&apos;s
          challenges with ease and confidence. Experience a new way to cope with stress through engaging conversations that
          feel personal and supportive. With 24/7 availability, you can access guidance and tools whenever you need them,
          all in a safe and judgment-free environment. Let Stress Relief AI empower you to take charge of your mental health
          and find peace in your daily life.
        </p>
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
