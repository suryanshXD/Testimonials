import prisma from "@/lib/db";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);

    if (evt.type === "user.created") {
      const { id, email_addresses, first_name, image_url } = evt.data;
      const newUser = await prisma.user.create({
        data: {
          clerkUserId: id,
          email: email_addresses[0].email_address,
          name: first_name,
          imageUrl: image_url,
        },
      });
      return new Response(JSON.stringify(newUser), {
        status: 201,
      });
    }
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
