"use client"
import { FaUsers } from "react-icons/fa6";
import { MdDashboard } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";

import Link from "next/link"
import axios from "axios";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

const Dashboard = ({ children }) => {
    const router = useRouter();
    const pathname = usePathname();

    if (pathname === "/admin/login") return children;

    const handleSignOut = async () => {
        try {
            const response = await axios.get("/api/logout");
            if (response.data.success) {
                console.log("Logout success", response.data);
                router.push("/login");
            } else {
                console.error("Error during sign out:", response.data.message);
            }
        } catch (error) {
            console.error("Error during sign out:", error);
        }
    };
    return (
        <>
            <div className="flex gap-4">
                <div className="border-r rounded bg-gray-100 p-2 w-2/12">
                    <ul>
                        <li className="text-xl text-gray-700 hover:text-black pr-2 mb-2 hover:font-medium flex items-center gap-2">
                            <FaUsers />
                            <Link href="/admin">Dashboard</Link>
                        </li>
                        <li className="text-xl text-gray-700 hover:text-black pr-2 mb-2 hover:font-medium flex items-center gap-2">
                            <MdDashboard />
                            <Link href="/admin/users">Users</Link>
                        </li>
                        <li onClick={handleSignOut} className="text-xl text-gray-700 hover:text-black pr-2 mb-2 hover:font-medium flex items-center gap-2">
                            <IoLogOut />
                            <button >Log Out</button>
                        </li>
                    </ul>
                </div>
                <div className="flex gap-4 w-8/12">
                    {children}
                </div>
            </div>
        </>
    )
}

export default Dashboard;