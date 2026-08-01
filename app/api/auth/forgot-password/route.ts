import { NextResponse } from "next/server";
import crypto from "crypto";
// crypto for hashing na kub
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { Resend } from "resend";

// Provide a fallback string during build time to avoid the "Missing API key" error.
const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy_key");

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    await connectMongoDB();

    const user = await User.findOne({ email });

    if (!user) {
      // Return 200 even if user not found to prevent email enumeration
      return NextResponse.json({ message: "If that email is in our database, we have sent a reset link." }, { status: 200 });
    }

    // Generate token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Token expires in 1 hour
    const passwordResetExpires = new Date(Date.now() + 3600000);

    user.resetPasswordToken = passwordResetToken;
    user.resetPasswordExpires = passwordResetExpires;
    await user.save();

    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password/${resetToken}`;

    const { data, error } = await resend.emails.send({
      from: "Koda <onboarding@resend.dev>", // Or use a verified domain if they have one
      to: [user.email],
      subject: "Password Reset Request",
      html: `
        <h1>You requested a password reset</h1>
        <p>Please click on the following link to reset your password:</p>
        <a href="${resetUrl}" target="_blank">Reset Password</a>
        <p>If you didn't request this, please ignore this email.</p>
      `,
    });

    if (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();
      return NextResponse.json({ message: "There was an error sending the email." }, { status: 500 });
    }

    return NextResponse.json({ message: "If that email is in our database, we have sent a reset link." }, { status: 200 });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json({ message: "An error occurred." }, { status: 500 });
  }
}
