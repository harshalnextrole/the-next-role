import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const PRODUCTS: Record<string, { name: string; price: number; description: string }> = {
  single_rewrite: {
    name: "Single Rewrite Unlock",
    price: 200, // $2.00 in cents
    description: "Unlock one AI-powered bullet point rewrite",
  },
  chat_pack: {
    name: "Chat Message Pack (10)",
    price: 500, // $5.00
    description: "10 additional chat messages with your AI coach",
  },
  full_access: {
    name: "Full Analysis Access",
    price: 1900, // $19.00
    description: "All rewrites + unlimited chat for this analysis",
  },
  expert_review: {
    name: "Expert Resume Review by Harshal",
    price: 7900, // $79.00
    description: "Personal Loom video review + rewritten resume within 48 hours",
  },
};

export async function POST(req: NextRequest) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;

  try {
    const { productId, successUrl, cancelUrl } = await req.json();
    const product = PRODUCTS[productId];

    if (!product) {
      return NextResponse.json({ error: "Invalid product" }, { status: 400 });
    }

    // Demo mode: If Stripe isn't configured, grant access automatically
    if (!stripeKey || stripeKey === 'your-stripe-secret-key-here') {
      const demoSuccessUrl = successUrl || `${req.nextUrl.origin}/resume-analyzer?purchased=${productId}`;
      return NextResponse.json({ url: demoSuccessUrl });
    }

    const stripe = new Stripe(stripeKey);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: product.name,
              description: product.description,
            },
            unit_amount: product.price,
          },
          quantity: 1,
        },
      ],
      success_url: successUrl || `${req.nextUrl.origin}/resume-analyzer?purchased=${productId}`,
      cancel_url: cancelUrl || `${req.nextUrl.origin}/resume-analyzer`,
    });

    return NextResponse.json({ url: session.url });
  } catch (e) {
    console.error("Checkout error:", e);
    return NextResponse.json(
      { error: "Failed to create checkout" },
      { status: 500 }
    );
  }
}
