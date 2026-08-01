import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";

export async function POST(req: Request) {
  try {
    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      return NextResponse.json(
        { message: "Please fill all fields." },
        { status: 400 }
      );
    }

    await connectMongoDB();

  
    const userExists = await User.findOne({ email });
    if (userExists) {
      return NextResponse.json(
        { message: "User with this email already exists." },
        { status: 409 }
      );
    }

    const usernameExists = await User.findOne({ name: username });
    if (usernameExists) {
      return NextResponse.json(
        { message: "Username is already taken." },
        { status: 409 }
      );
    }

  
    const hashedPassword = await bcrypt.hash(password, 10);

 
    await User.create({
      name: username,
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      { message: "User registered successfully." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error registering user:", error);
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}
