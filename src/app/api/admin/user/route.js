import { NextResponse } from "next/server";

import UserModel from "@/models/userSchema";
import databaseConnection from "@/config/databaseConnection";
import { getAdminIdFromToken } from "@/helpers/getAdminIdFromToken";

databaseConnection(process.env.DATABASE_URL, process.env.DATABASE_NAME);

export const GET = async (request) => {
    try {
        const amdinId = getAdminIdFromToken(request);

        if (!amdinId) {
            return NextResponse.json({
                success: false,
                message: "Unauthorized: Invalid token or token expired"
            });
        }

        const users = await UserModel.find({}).select("-password");
        return NextResponse.json({
            success: true,
            message: "Users Data Fetched Successfully: ",
            data: users
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Server error: " + error.message
        });
    }
}