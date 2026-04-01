import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(3),
  message: z.string().min(10),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const values = contactSchema.parse(body);

    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT ?? 587);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const to = process.env.CONTACT_RECEIVER_EMAIL ?? "mohameddahy111@gmail.com";

    if (!host || !user || !pass) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing SMTP environment variables.",
        },
        { status: 503 },
      );
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user,
        pass,
      },
    });

    await transporter.sendMail({
      from: `Portfolio Contact <${user}>`,
      to,
      replyTo: values.email,
      subject: `[Portfolio] ${values.subject}`,
      text: `Name: ${values.name}\nEmail: ${values.email}\n\n${values.message}`,
      html: `
        <h2>New Portfolio Message</h2>
        <p><strong>Name:</strong> ${values.name}</p>
        <p><strong>Email:</strong> ${values.email}</p>
        <p><strong>Subject:</strong> ${values.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${values.message.replace(/\n/g, "<br />")}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, issues: error.issues },
        { status: 400 },
      );
    }

    return NextResponse.json({ success: false }, { status: 500 });
  }
}
