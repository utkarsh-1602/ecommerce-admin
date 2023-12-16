import Stripe from "stripe";
import { headers } from "next/headers"
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

// Here we are creating the webhook endpoint that receives requests from Stripe, notifying you about events that happen as per the transactions. 

export async function POST(req: Request) {
    const body = await req.text();
    const signature = headers().get("Stripe-Signature") as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBOOK_SECRET!

        )
    }
    catch (error: any) {
        return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 })
    }

    const session = event.data.object as Stripe.Checkout.Session;
    const address = session?.customer_details?.address;

    const addressComponents = [
        address?.line1,
        address?.line2,
        address?.city,
        address?.postal_code,
        address?.state,
        address?.country,
    ]

    const addressString = addressComponents.filter((c) => c !== null).join(", ");

    if (event.type === "checkout.session.completed") {
        // After the Payment is Completed, we can Update the database to store the Recent Order Information
        const order = await prismadb.order.update({
            where: {
                id: session?.metadata?.orderId,
            },
            data: {
                isPaid: true,
                address: addressString,
                phone: session?.customer_details?.phone || "",
            },
            include: {
                orderItems: true,
            }
        });

        const productIds = order.orderItems.map((orderItem) => orderItem.productId)

        await prismadb.product.updateMany({
            where: {
                id: {
                    in: [...productIds]
                }
            },
            data: {
                isArchived: true
            }
        });
    }


    return new NextResponse(null, { status: 200 });
}