import Link from "next/link";
import Image from 'next/image'

import { GrGraphQl } from "react-icons/gr";
import { SiExpress } from "react-icons/si";
import { IoLogoFirebase } from "react-icons/io5";
import { SiAdguard } from "react-icons/si";
import { TbBrandOauth } from "react-icons/tb";
import { FaAnglesRight } from "react-icons/fa6";

export default function Home() {
  return (
    <>
      <div className="flex">
        <div className="flex-1 pt-20">
          <h3 className="text-[#29444d] text-xl font-semibold mb-4">
            Why Next.JS _____
          </h3>
          <h1 className="text-6xl font-bold">
            <span style={{
              background: 'linear-gradient(to right, #ee0097, #9ca3af, #ffa611, #21bcfd, #000000)',
              WebkitTextFillColor: 'transparent',
              WebkitBackgroundClip: 'text',
            }} >
              Fast, Efficient
            </span>
            <br />
            <span style={{
              background: 'linear-gradient(to right, #000000, #21bcfd, #ffa611, #9ca3af, #ee0097)',
              WebkitTextFillColor: 'transparent',
              WebkitBackgroundClip: 'text',
            }} >
              Fullstack Framework
            </span>
          </h1>
          <p className="my-4">
            Next.js is a React framework that gives you building blocks to create web applications. By framework, we mean Next.js handles the tooling and configuration needed for React, and provides additional structure, features, and optimizations for your application.
          </p>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://nextjs.org/docs"
            className="rounded-full font-semibold bg-[#000000] text-white px-4 p-1 inline-flex items-center gap-2"
          >
            <span> Get Started</span>
            <FaAnglesRight className="animate-pulse" />
          </Link>
        </div>
        <div className="flex-1">
          <Image
            src="/images/banner.png"
            alt="BANNER"
            height={1000}
            width={1000}
          />
        </div>
      </div>
      <div className="flex justify-between mt-16 pt-2">
        <Link href="" className="border-[#000] border-2 w-50 h-50 flex flex-col rounded p-5 text-[#ee0097]">
          <GrGraphQl className="mx-auto text-4xl" />
          <h4>GraphQL Authentication</h4>
        </Link>
        <Link href="" className="border-[#000] border-2 w-50 h-50 flex flex-col rounded p-5">
          <SiExpress className="mx-auto text-4xl bg-gray-400 rounded-full p-1" />
          <h4 className="text-gray-400">ExpressJS Authentication</h4>
        </Link>
        <Link href="" className="border-[#000] border-2 w-50 h-50 flex flex-col rounded p-5 text-[#ffa611]">
          <IoLogoFirebase className="mx-auto text-4xl" />
          <h4>Firebase Authentication</h4>
        </Link>
        <Link href="" className="border-[#000] border-2 w-50 h-50 flex flex-col rounded p-5 text-[#21bcfd]">
          <SiAdguard className="mx-auto text-4xl" />
          <h4>Next Auth Authentication</h4>
        </Link>
        <Link href="" className="border-[#000] border-2 w-50 h-50 flex flex-col rounded p-5">
          <TbBrandOauth className="mx-auto text-4xl" />
          <h4>OAuth Authentication</h4>
        </Link>
      </div>
    </>
  );
}
