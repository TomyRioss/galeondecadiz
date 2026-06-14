import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendDonationThankYouEmail, sendDonationNotificationEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { full_name, email, phone, amount, message, accepted_terms } = body;

    if (!full_name || !email || !amount || !accepted_terms) {
      return NextResponse.json({ error: "Campos requeridos faltantes" }, { status: 400 });
    }

    const donation = await (prisma as any).donation.create({
      data: {
        fullName: full_name,
        email,
        phone: phone ?? null,
        amount: parseFloat(amount),
        message: message ?? null,
        status: "intention",
      },
    });

    const emailParams = {
      donorName: full_name,
      donorEmail: email,
      phone: phone ?? null,
      amount: parseFloat(amount),
      message: message ?? null,
      donationId: donation.id,
    };

    Promise.allSettled([
      sendDonationThankYouEmail(emailParams),
      sendDonationNotificationEmail(emailParams),
    ]).then((results) => {
      results.forEach((r) => {
        if (r.status === "rejected") console.error("[donations] email error:", r.reason);
      });
    });

    return NextResponse.json({ ok: true, id: donation.id });
  } catch (err) {
    console.error("[donations] error:", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
