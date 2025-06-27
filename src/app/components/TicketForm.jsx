"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

const TicketForm = ({ ticket }) => {
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: {
      "title": ticket.title,
      "description": ticket.description,
      "priority": Number(ticket.priority),
      "progress": ticket.progress,
      "status": ticket.status,
      "category": ticket.category,
    }
  })
  const EDITMODE = ticket._id === "new" ? false : true;

  const router = useRouter();


  const onSubmit = async (data) => {
    if (EDITMODE) {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/Ticket/${ticket._id}`, {
        method: "PUT",
        body: JSON.stringify({ data }),
        "content-type": "application/json",
      });
      if (!res.ok) {
        throw new Error("Failed to update Ticket.");
      }
      router.push("/");
      router.refresh();
    } else {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/Ticket`, {
        method: "POST",
        body: JSON.stringify({ data }),
        "content-type": "application/json",
      });
      if (!res.ok) {
        throw new Error("Failed to create Ticket.");
      }
      router.push("/");
      router.refresh();
    }
  };



  return (
    <form
      className="flex flex-col gap-3 p-8 w-full md:max-w-[50%] mx-auto"
      method="post"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3>{EDITMODE ? "Update Your Ticket" : "Create Your Ticket"}</h3>
      <label>Title</label>
      <input
        {...register('title', {
          required: "Title is required"
        })}
        type="text"

      />
      {errors.title && <p>{errors.title.message}</p>}
      <label>Description</label>
      <textarea
        {...register('description', {
          required: "Description is required"
        })}
        type="text"
        rows="5"
      />
      <label>Category</label>
      <select
        {...register('category')}
      >
        <option value="Hardware Problem">Hardware Problem</option>
        <option value="Sofware Problem">Sofware Problem</option>
        <option value="Project">Project</option>
      </select>
      <label>Priority</label>
      <div>
        <Controller
          name="priority"
          control={control}
          defaultValue={ticket.priority}
          render={({ field }) => (
            <div>
              {[1, 2, 3, 4, 5].map((n) => (
                <label key={n}>
                  <input type="radio" value={n} checked={field.value === n} onChange={() => field.onChange(n)} />
                  {n}
                </label>
              ))}
            </div>
          )}

        />



      </div>
      <label>Progress</label>
      <input
        type="range"
        {...register('progress')}
        min={0} max={100}
      />
      <label>Status</label>
      <select name="status" {...register('status')}>
        <option value="not started">Not Started</option>
        <option value="started">Started</option>
        <option value="done">Done</option>
      </select>
      <input
        type="submit"
        className="btn max-w-xs"
        value={EDITMODE ? "Update Ticket" : "Create Ticket"}
      />
    </form>

  );
};

export default TicketForm;
