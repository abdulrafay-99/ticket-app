import Ticket from "../../(models)/Ticket";
import { NextResponse } from "next/server";
import { connectDB } from "../../(models)/Ticket";

const ALLOWED_ORIGIN =
  process.env.NODE_ENV === 'production'
    ? 'https://ticket-app-nine-pi.vercel.app'
    : '*';

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Credentials': 'true',
    },
  });
}

export async function POST(req) {
  await connectDB();

  try {
    const body = await req.json();
    const ticketData = body.data;
    console.log(ticketData)
    await Ticket.create(ticketData);
    return NextResponse.json({ message: "Ticket Created" }, { status: 201, headers: { 'Access-Control-Allow-Origin': ALLOWED_ORIGIN } });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500, headers: { 'Access-Control-Allow-Origin': ALLOWED_ORIGIN } });
  }
}
