import { NextResponse } from "next/server";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import UserModel from "@/models/userSchema";
import databaseConnection from "@/config/databaseConnection";

databaseConnection(process.env.DATABASE_URL, process.env.DATABASE_NAME);

export const POST = async (request) => {
    try {
        const { fullName, email, password } = await request.json();

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return NextResponse.json({
                success: false,
                message: "User already exists"
            });
        }

        const bcryptSalt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_GEN_SALT_NUMBER));
        const hashPassword = await bcrypt.hash(password, bcryptSalt);

        const userData = new UserModel({
            fullName,
            email,
            password: hashPassword,
            createdAt: new Date(),
            role: "user"
        })
        const savedUser = await userData.save();

        if (savedUser) {
            const token = jwt.sign({ userId: savedUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.TOKEN_EXPIRES });

            const response = NextResponse.json({
                success: true,
                message: "Registration successful",
            });

            const expires = new Date(Date.now() + (parseInt(process.env.COOKIE_EXPIRES)) * 24 * 60 * 60 * 1000);
            response.cookies.set(process.env.COOKIE_KEY, token, {
                expires,
                httpOnly: true,
                secure: true,
                sameSite: 'none'
            });

            return response;

        } else {
            return NextResponse.json({
                success: false,
                message: "Something went wrong during registration"
            });
        }
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Server error: " + error.message
        });
    }
}