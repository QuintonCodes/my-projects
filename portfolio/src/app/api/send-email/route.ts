import ContactEmail from "@/components/contact-email";
import { contactSchema } from "@/lib/types";
import { render } from "@react-email/components";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => {
      throw new Error("Invalid JSON payload.");
    });

    const parsedData = contactSchema.safeParse(body);
    if (!parsedData.success) {
      return NextResponse.json(
        { error: "Invalid request data.", details: parsedData.error.format() },
        { status: 400 }
      );
    }

    const contactData = parsedData.data;
    const emailHtml = await render(ContactEmail(contactData));

    const info = await transporter.sendMail({
      from: `"Quinton" <${process.env.SMTP_EMAIL}>`, // Sender
      to: "kagisojiyane28@gmail.com", // Recipient
      subject: `Form Submission from ${contactData.firstname}`,
      html: emailHtml,
    });

    if (!info.messageId) {
      return NextResponse.json(
        { error: "Failed to send email. Please try again later." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Email sent successfully!",
      success: true,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error.";

    return NextResponse.json(
      { error: errorMessage },
      { status: errorMessage.includes("Invalid JSON") ? 400 : 500 }
    );
  }
}
