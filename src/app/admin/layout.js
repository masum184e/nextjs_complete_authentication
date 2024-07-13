"use client"
import { FaUsers } from "react-icons/fa6";
import { MdDashboard } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";

import Link from "next/link"
import axios from "axios";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useContext } from "react";
import { ImplementContext } from "@/context/Provider";


const Dashboard = ({ children }) => {
    const { setLoader } = useContext(ImplementContext)
    const router = useRouter();
    const pathname = usePathname();

    if (pathname === "/admin/login") return children;

    const handleSignOut = async () => {
        try {
            setLoader(true);
            const response = await axios.get("/api/logout");
            if (response.data.success) {
                toast.success("Logout success");
                router.push("/login");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoader(false)
        }
    };
    return (
        <>
            <div className="flex gap-4 h-[92vh] pt-4">
                <div className="border-r rounded bg-black w-2/12">
                    <ul className="max-w-md text-lg list-none list-inside" >
                        <li className={`flex items-center gap-2 hover:text-black hover:bg-white px-3 py-1 ${pathname === "/admin" ? "bg-white text-black" : "text-white"}`}>
                            <FaUsers />
                            <Link href="/admin">Dashboard</Link>
                        </li>
                        <li className={`flex items-center gap-2 hover:text-black hover:bg-white px-3 py-1 ${pathname === "/admin/users" ? "bg-white text-black" : "text-white"}`}>
                            <MdDashboard />
                            <Link href="/admin/users">Users</Link>
                        </li>
                        <li onClick={handleSignOut} className={`flex items-center gap-2 hover:text-black hover:bg-white px-3 py-1 text-white`}>
                            <IoLogOut />
                            <button >Log Out</button>
                        </li>
                    </ul>
                </div>
                <div className="flex gap-4 w-10/12">
                    {children}
                </div>
            </div>
        </>
    )
}

export default Dashboard;