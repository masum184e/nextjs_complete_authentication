import { NextResponse } from "next/server";

import UserModel from "@/models/userSchema";
import databaseConnection from "@/config/databaseConnection";

import { getAdminIdFromToken } from "@/helpers/getAdminIdFromToken";

databaseConnection(process.env.DATABASE_URL, process.env.DATABASE_NAME);

export const GET = async (request) => {
    try {
        const userId = getAdminIdFromToken(request);
        
        if (!userId) {
            return NextResponse.json({
                success: false,
                message: "Unauthorized: Invalid token or token expired"
            });
        }

        const user = await UserModel.findById(userId).select("-password");
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "Unauthorized: User not found"
            });
        }

        if (user.role === "admin") {
            return NextResponse.json({
                success: true,
                data: user
            });
        } else {
            return NextResponse.json({
                success: false,
                message: "Unauthorized: Access denied",
            });
        }
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Server error: " + error.message
        });
    }
};
