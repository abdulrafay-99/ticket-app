import TicketForm from "@/app/components/TicketForm";
import React from "react";

const getTicketById = async (id) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/Ticket/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to get tickets");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const TicketPage = async ({ params }) => {
  const EDITMODE = params.id === "new" ? false : true;

  let updateTicketData = {};
  if (EDITMODE) {
    updateTicketData = await getTicketById(params.id);
    updateTicketData = updateTicketData.foundTicket;
  } else {
    updateTicketData = {
      _id: "new",
    };
  }
  return <TicketForm ticket={updateTicketData} />;
};

export default TicketPage;
