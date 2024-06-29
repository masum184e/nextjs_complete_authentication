import { NextResponse } from "next/server";

import UserModel from "@/models/userSchema";
import databaseConnection from "@/config/databaseConnection";


import { getUserIdFromToken } from "@/helpers/getUserIdFromToken";

databaseConnection(process.env.DATABASE_URL, process.env.DATABASE_NAME);

export const GET = async (request) => {
    try {
        const userId = getUserIdFromToken(request);

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

        if (user.role === "user") {
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

export const PUT = async (request) => {
    try {
        const { currentPassword, newPassword } = await request.json();
        const userId = getUserIdFromToken(request);

        if (!userId) {
            return NextResponse.json({
                success: false,
                message: "Unauthorized: Invalid or expired token"
            }, { status: 401 });
        }

        const user = await UserModel.findById(userId);
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "Unauthorized: User not found"
            }, { status: 401 });
        }

        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({
                success: false,
                message: "Current password is incorrect"
            }, { status: 400 });
        }

        const bcryptSalt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_GEN_SALT_NUMBER));
        const hashPassword = await bcrypt.hash(newPassword, bcryptSalt);

        user.password = hashPassword;
        await user.save();

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.TOKEN_EXPIRES });

        const response = NextResponse.json({
            success: true,
            message: "Password updated successfully"
        });

        response.cookies.set(process.env.COOKIE_KEY, token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        });

        return response;
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Server error: " + error.message
        });
    }
};
