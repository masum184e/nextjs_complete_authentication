import Link from "next/link";

import { FaAnglesRight } from "react-icons/fa6";
import { GrGraphQl } from "react-icons/gr";
import { SiExpress } from "react-icons/si";
import { IoLogoFirebase } from "react-icons/io5";
import { SiAdguard } from "react-icons/si";
import { TbBrandOauth } from "react-icons/tb";

export default function Home() {
  return (
    <>
      <div className="flex justify-between">
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
