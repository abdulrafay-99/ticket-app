import Ticket from "@/app/(models)/Ticket";
import { NextResponse } from "next/server";
import { connectDB } from "@/app/(models)/Ticket";

const ALLOWED_ORIGIN =
  process.env.NODE_ENV === 'production'
    ? 'https://ticket-app-nine-pi.vercel.app'
    : '*';

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS,DELETE,PUT',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Credentials': 'true',
    },
  });
}

export async function GET(req, { params }) {
  await connectDB();
  try {
    const { id } = params;
    const foundTicket = await Ticket.findOne({ _id: id });
    return NextResponse.json({ foundTicket }, { status: 200, headers: { 'Access-Control-Allow-Origin': ALLOWED_ORIGIN } });
  } catch (error) {
    console.log(error.message)
    return NextResponse.json({ message: "Error", error }, { status: 500, headers: { 'Access-Control-Allow-Origin': ALLOWED_ORIGIN } });
  }
}
export async function DELETE(req, { params }) {
  await connectDB();
  try {
    const { id } = params;
    await Ticket.findByIdAndDelete(id);
    return NextResponse.json({ message: "Ticket Deleted" }, { status: 200, headers: { 'Access-Control-Allow-Origin': ALLOWED_ORIGIN } });
  } catch (error) {
    return NextResponse.json({ message: "Error", error: error }, { status: 500, headers: { 'Access-Control-Allow-Origin': ALLOWED_ORIGIN } });
  }
}

export async function PUT(req, { params }) {
  await connectDB();
  try {
    const { id } = params;
    const body = await req.json();
    const ticketData = body.data;
    const updateTicketData = await Ticket.findByIdAndUpdate(id, {
      ...ticketData,
    });
    return NextResponse.json({ message: "Ticket Updated" }, { status: 200, headers: { 'Access-Control-Allow-Origin': ALLOWED_ORIGIN } });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500, headers: { 'Access-Control-Allow-Origin': ALLOWED_ORIGIN } });
  }
}
