import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const DEPARTMENTS: Record<string, { label: string; envVar: string }> = {
  flex:         { label: 'FLEX',         envVar: 'MAIL_FLEX_ADDRESS' },
  echo:         { label: 'ECHO',         envVar: 'MAIL_ECHO_ADDRESS' },
  online_games: { label: 'Online Games', envVar: 'MAIL_ONLINE_GAMES_ADDRESS' },
  general:      { label: 'General',      envVar: 'MAIL_GENERAL_ADDRESS' },
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, department, message } = await req.json()

    // Validate
    if (!name || !email || !department || !message) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
    }
    if (!DEPARTMENTS[department]) {
      return NextResponse.json({ error: 'Invalid department.' }, { status: 400 })
    }

    // Resolve recipient email
    const deptConfig = DEPARTMENTS[department]
    const to = process.env[deptConfig.envVar] || process.env.MAIL_ALL || process.env.MAIL_GENERAL_ADDRESS
    if (!to) {
      console.error('[contact] No recipient email configured for department:', department)
      return NextResponse.json({ error: 'Mail not configured.' }, { status: 500 })
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST || 'localhost',
      port: parseInt(process.env.MAIL_PORT || '587'),
      secure: process.env.MAIL_ENCRYPTION === 'ssl',
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    })

    const from = process.env.MAIL_FROM_ADDRESS || 'no-reply@jvl.ca'
    const fromName = process.env.MAIL_FROM_NAME || 'JVL Website'

    await transporter.sendMail({
      from: `"${fromName}" <${from}>`,
      to,
      replyTo: `"${name}" <${email}>`,
      subject: `[JVL Contact] ${deptConfig.label} — ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #101213; border-bottom: 2px solid #FB671F; padding-bottom: 12px;">
            New Contact Form Submission
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #666; width: 120px;"><strong>Name:</strong></td><td>${name}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;"><strong>Email:</strong></td><td><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding: 8px 0; color: #666;"><strong>Department:</strong></td><td>${deptConfig.label}</td></tr>
          </table>
          <div style="margin-top: 20px;">
            <strong style="color: #666;">Message:</strong>
            <div style="margin-top: 8px; padding: 16px; background: #f5f5f5; border-radius: 4px; white-space: pre-wrap;">${message}</div>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[contact] send error:', err)
    return NextResponse.json({ error: 'Failed to send message. Please try again.' }, { status: 500 })
  }
}
