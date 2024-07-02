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
                <div className="border-r rounded bg-gray-100 w-2/12">
                    <ul className="max-w-md text-lg space-y-1 text-gray-500 list-none list-inside" >
                        <li className={`flex items-center gap-2 hover:text-white hover:bg-gray-700 px-3 py-1 ${pathname==="/admin"?"bg-gray-700 text-white":""}`}>
                            <FaUsers />
                            <Link href="/admin">Dashboard</Link>
                        </li>
                        <li className={`flex items-center gap-2 hover:text-white hover:bg-gray-700 px-3 py-1 ${pathname==="/admin/users"?"bg-gray-700 text-white":""}`}>
                            <MdDashboard />
                            <Link href="/admin/users">Users</Link>
                        </li>
                        <li onClick={handleSignOut} className={`flex items-center gap-2 hover:text-white hover:bg-gray-700 px-3 py-1`}>
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