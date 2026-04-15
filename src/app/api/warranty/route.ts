import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const SERIAL_RE = /^CT10-\d{4}-\d{6}$/

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      serial_number, purchase_date, where_purchased,
      full_name, email, phone_number, address, city, state, zip,
      feedback,
    } = body

    // Validate required fields
    if (!serial_number || !purchase_date || !full_name || !email || !city || !zip || !state) {
      return NextResponse.json({ error: 'Please fill in all required fields.' }, { status: 400 })
    }
    if (!SERIAL_RE.test(serial_number)) {
      return NextResponse.json({ error: 'Invalid serial number format (CT10-XXXX-XXXXXX).' }, { status: 400 })
    }

    const to = process.env.MAIL_WARRANTY_ADDRESS
      || process.env.MAIL_GENERAL_ADDRESS
      || process.env.MAIL_ALL
    if (!to) {
      return NextResponse.json({ error: 'Mail not configured.' }, { status: 500 })
    }

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST || 'localhost',
      port: parseInt(process.env.MAIL_PORT || '587'),
      secure: process.env.MAIL_ENCRYPTION === 'ssl',
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    })

    const from     = process.env.MAIL_FROM_ADDRESS || 'no-reply@jvl.ca'
    const fromName = process.env.MAIL_FROM_NAME    || 'JVL Website'

    await transporter.sendMail({
      from: `"${fromName}" <${from}>`,
      to,
      replyTo: `"${full_name}" <${email}>`,
      subject: `[JVL Warranty] ${serial_number} — ${full_name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #101213; border-bottom: 2px solid #FB671F; padding-bottom: 12px;">
            New Warranty Registration
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr><td style="padding: 8px 0; color: #666; width: 160px;"><strong>Serial Number:</strong></td><td>${serial_number}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;"><strong>Purchase Date:</strong></td><td>${purchase_date}</td></tr>
            ${where_purchased ? `<tr><td style="padding: 8px 0; color: #666;"><strong>Where Purchased:</strong></td><td>${where_purchased}</td></tr>` : ''}
            <tr><td style="padding: 8px 0; color: #666;"><strong>Full Name:</strong></td><td>${full_name}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;"><strong>Email:</strong></td><td><a href="mailto:${email}">${email}</a></td></tr>
            ${phone_number ? `<tr><td style="padding: 8px 0; color: #666;"><strong>Phone:</strong></td><td>${phone_number}</td></tr>` : ''}
            ${address ? `<tr><td style="padding: 8px 0; color: #666;"><strong>Address:</strong></td><td>${address}</td></tr>` : ''}
            <tr><td style="padding: 8px 0; color: #666;"><strong>City / State / ZIP:</strong></td><td>${city}, ${state} ${zip}</td></tr>
          </table>
          ${feedback ? `<div><strong style="color: #666;">Feedback:</strong><div style="margin-top: 8px; padding: 16px; background: #f5f5f5; border-radius: 4px; white-space: pre-wrap;">${feedback}</div></div>` : ''}
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[warranty] send error:', err)
    return NextResponse.json({ error: 'Failed to submit. Please try again.' }, { status: 500 })
  }
}
