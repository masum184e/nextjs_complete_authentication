import { NextResponse } from "next/server";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import UserModel from "@/models/userSchema";
import databaseConnection from "@/config/databaseConnection";

databaseConnection(process.env.DATABASE_URL, process.env.DATABASE_NAME);

export const POST = async (request) => {
    try {
        const { email, password } = await request.json();

        const existingUser = await UserModel.findOne({ email });
        if (!existingUser || existingUser.role !== "admin") {
            return NextResponse.json({
                success: false,
                message: "Invalid user"
            });
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return NextResponse.json({
                success: false,
                message: "Invalid password"
            });
        }

        const token = jwt.sign({ adminId: existingUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.TOKEN_EXPIRES });
        const response = NextResponse.json({
            success: true,
            message: "Login successful"
        });
        
        const expires = new Date(Date.now() + (parseInt(process.env.COOKIE_EXPIRES)) * 24 * 60 * 60 * 1000);
        response.cookies.set(process.env.COOKIE_KEY, token, {
            expires,
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