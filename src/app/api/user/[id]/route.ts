// pages/api/user/route.ts

import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import * as z from "zod";

// Define a schema for input validation
const userUpdateSchema = z.object({
    email: z.string().email('Invalid email').optional(),
    name: z.string().min(1, 'Name is required').max(100).optional(),
});

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        const body = await req.json();
        const { email, name } = userUpdateSchema.parse(body);

        // Get the user ID from the parameters and convert it to a number
        const userId = parseInt(params.id, 10); // Convert string to number

        if (isNaN(userId)) {
            return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
        }

        // Update the user in the database
        const updatedUser = await db.user.update({
            where: { id: userId },
            data: {
                email,
                name,
            },
        });

        return NextResponse.json({ user: updatedUser, message: "User updated successfully" }, { status: 200 });
    } catch (error) {
        console.error(error); // Log the error for debugging
        return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
    }
}
