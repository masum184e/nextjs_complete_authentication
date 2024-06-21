"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const pathname = usePathname();
  if(pathname === "/login" || pathname === "/registration" )return;
  return (
    <>
      <nav>
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link href="/" className="flex items-center gap-2">
            <Image
              className="w-10"
              src="/images/logo.png"
              alt="NEXTJS"
              width={100}
              height={100}
            />
            <h1 className="font-bold text-4xl text-[#050708]">Next.JS</h1>
          </Link>
          <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <div className="flex gap-2">
              <Link
                href="/registration"
                className="text-white bg-[#050708] font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2"
              >
                Sign Up
              </Link>
              <Link
                href="/login"
                className="text-white bg-[#050708] font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2"
              >
                Login
              </Link>
            </div>
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              class="border-2 border-[#000] inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-[#000] rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#000]  "
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <span class="sr-only">Open main menu</span>
              <svg
                class="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <ul class="flex flex-col md:flex-row bg-[#050708] rounded-full px-6 py-2  mt-4 font-medium md:space-x-8 rtl:space-x-reverse  md:mt-0">
              <li>
                <a
                  href="#"
                  class={`text-[#fff] ${pathname === "/" ? "font-bold" : ""}`}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class={`text-[#fff] ${
                    pathname === "/firebase" ? "font-bold" : ""
                  }`}
                >
                  Firebase
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class={`text-[#fff] ${
                    pathname === "/next-auth" ? "font-bold" : ""
                  }`}
                >
                  NextAuth
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class={`text-[#fff] ${
                    pathname === "/o-auth" ? "font-bold" : ""
                  }`}
                >
                  oAuth
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
