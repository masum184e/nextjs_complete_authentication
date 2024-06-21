import { NextResponse } from "next/server";

import databaseConnection from "@/config/databaseConnection";

databaseConnection(process.env.DATABASE_URL, process.env.DATABASE_NAME);

export const POST = async (request) => {
    try {
        const response = NextResponse.json({
            success: true,
            message: "Logout successful"
        });

        response.cookies.set(process.env.COOKIE_KEY, '', {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            expires: new Date(0)
        });

        return response;
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Server error: " + error.message
        });
    }
};
