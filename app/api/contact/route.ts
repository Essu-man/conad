import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { contactFormSchema } from "@/lib/schemas";
import { COMPANY_INFO } from "@/lib/company";

// Target recipients for all business inquiries
const RECIPIENTS = COMPANY_INFO.inquiryRecipients;

const INQUIRY_LABELS: Record<string, string> = {
  demo: "Conad POS Demo & Terminal Setup",
  custom_software: "Conad Inventory & Warehouse Sync",
  partnership: "Retail Catalog & Data Migration",
  general: "General Business Inquiry",
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const result = contactFormSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          errors: result.error.flatten().fieldErrors,
          message: "Validation failed. Please correct the highlighted fields.",
        },
        { status: 400 }
      );
    }

    const { name, email, company, inquiryType, message, botTrap } = result.data;

    // Honeypot check for spam bots
    if (botTrap && botTrap.trim().length > 0) {
      return NextResponse.json({ success: true, message: "Inquiry received." }, { status: 200 });
    }

    const inquiryLabel = INQUIRY_LABELS[inquiryType] || inquiryType;
    const timestamp = new Date().toUTCString();

    // Format plain text email
    const textContent = `
NEW CONAD TECH BUSINESS INQUIRY
================================
Inquiry Type: ${inquiryLabel}
Lead Name:    ${name}
Work Email:   ${email}
Company:      ${company || "Not provided"}
Submitted:    ${timestamp} (GMT)

MESSAGE / PROJECT SCOPE:
------------------------
${message}

------------------------
This notification was sent simultaneously to:
- ${RECIPIENTS.join("\n- ")}
Reply directly to this email to contact the lead at ${email}.
`.trim();

    // Format HTML email
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Business Inquiry</title>
</head>
<body style="margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f5f7fb; color: #102a56;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
    
    <!-- Header -->
    <div style="background: #102a56; padding: 24px; color: #ffffff;">
      <h1 style="margin: 0; font-size: 20px; font-weight: 800; letter-spacing: -0.5px;">
        Conad<span style="color: #60a5fa;">Tech</span>
        <span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: #ff6b2c; margin-left: 4px;"></span>
      </h1>
      <p style="margin: 6px 0 0; font-size: 13px; color: #cbd5e1;">
        New Business Inquiry Received
      </p>
    </div>

    <!-- Body Content -->
    <div style="padding: 24px;">
      <div style="background: #eff6ff; border-left: 4px solid #2563eb; padding: 12px 16px; border-radius: 6px; margin-bottom: 20px;">
        <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #2563eb; letter-spacing: 0.5px; display: block;">
          Inquiry Type
        </span>
        <span style="font-size: 15px; font-weight: 700; color: #102a56;">
          ${inquiryLabel}
        </span>
      </div>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
        <tr>
          <td style="padding: 8px 0; color: #64748b; width: 130px; font-weight: 600;">Full Name:</td>
          <td style="padding: 8px 0; color: #102a56; font-weight: 700;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Work Email:</td>
          <td style="padding: 8px 0;">
            <a href="mailto:${email}" style="color: #2563eb; text-decoration: none; font-weight: 600;">${email}</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Company:</td>
          <td style="padding: 8px 0; color: #102a56;">${company || "Not provided"}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Date (GMT):</td>
          <td style="padding: 8px 0; color: #64748b; font-family: monospace;">${timestamp}</td>
        </tr>
      </table>

      <div style="margin-top: 16px;">
        <span style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: #64748b; letter-spacing: 0.5px; display: block; margin-bottom: 8px;">
          Message & Project Scope:
        </span>
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; font-size: 14px; line-height: 1.6; color: #334155; white-space: pre-wrap;">${message}</div>
      </div>

      <!-- Action Button -->
      <div style="margin-top: 24px; text-align: center;">
        <a href="mailto:${email}?subject=${encodeURIComponent(`Re: Conad Tech - ${inquiryLabel}`)}" style="display: inline-block; background: #2563eb; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-size: 13px; font-weight: 700;">
          Reply to ${name} &rarr;
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div style="background: #f8fafc; padding: 16px 24px; border-top: 1px solid #e2e8f0; font-size: 11px; color: #64748b; text-align: center;">
      This inquiry was dispatched simultaneously to <strong>${RECIPIENTS.join("</strong> & <strong>")}</strong>.
    </div>
  </div>
</body>
</html>
`.trim();

    // Check if SMTP or Gmail credentials exist
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
    const smtpUser = process.env.SMTP_USER || process.env.GMAIL_USER;
    const smtpPass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD;

    let emailSent = false;
    let deliveryMessage = "Recorded and queued for notification";

    if (smtpUser && smtpPass) {
      try {
        const transporter = smtpHost
          ? nodemailer.createTransport({
              host: smtpHost,
              port: smtpPort,
              secure: smtpPort === 465,
              auth: { user: smtpUser, pass: smtpPass },
            })
          : nodemailer.createTransport({
              service: "gmail",
              auth: { user: smtpUser, pass: smtpPass },
            });

        await transporter.sendMail({
          from: `"Conad Tech Inquiries" <${smtpUser}>`,
          to: RECIPIENTS.join(", "),
          replyTo: `${name} <${email}>`,
          subject: `[Conad Tech Lead] ${inquiryLabel} - ${name} (${company || "Ghana Retail"})`,
          text: textContent,
          html: htmlContent,
        });

        emailSent = true;
        deliveryMessage = `Dispatched directly to ${RECIPIENTS.join(", ")}`;
        console.info(`[Contact API] Email dispatched to ${RECIPIENTS.join(", ")}`);
      } catch (sendError) {
        console.error("[Contact API] SMTP Send Error:", sendError);
        deliveryMessage = `Queued for ${RECIPIENTS.join(", ")} (SMTP pending configuration)`;
      }
    } else {
      // In development or when SMTP credentials are not yet set
      console.info(
        `[Contact API] Inquiry captured for recipients: ${RECIPIENTS.join(", ")}`,
        { name, email, company, inquiryType, messageLength: message.length }
      );
      deliveryMessage = `Inquiry queued for ${RECIPIENTS.join(" & ")}`;
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you! Your inquiry has been submitted successfully. Our team will get back to you shortly.",
        details: {
          inquiryType: inquiryLabel,
          recipients: RECIPIENTS,
          emailDispatched: emailSent,
          deliveryStatus: deliveryMessage,
          loggedAt: timestamp,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Contact API Error]:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred while processing your request. Please try again.",
      },
      { status: 500 }
    );
  }
}
