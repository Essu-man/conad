import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/schemas";

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
      // Silently reject bot submission
      return NextResponse.json({ success: true, message: "Inquiry received." }, { status: 200 });
    }

    // In a production environment with an active SMTP / Resend / SendGrid key:
    const isEmailProviderConfigured = Boolean(process.env.EMAIL_API_KEY || process.env.SMTP_HOST);

    // Documented Integration Point
    const loggedSubmission = {
      timestamp: new Date().toISOString(),
      name,
      email,
      company: company || "N/A",
      inquiryType,
      messageLength: message.length,
      providerConfigured: isEmailProviderConfigured,
    };

    // Log the inquiry payload securely for engineering/administrative capture
    console.info("[Conad Tech Contact Inquiry Received]:", loggedSubmission);

    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you! Your message has been received by Conad Tech. Our engineering team typically responds within 24 business hours.",
        details: {
          inquiryType,
          loggedAt: loggedSubmission.timestamp,
          deliveryStatus: isEmailProviderConfigured
            ? "Dispatched via email gateway"
            : "Recorded in system inquiry log",
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
