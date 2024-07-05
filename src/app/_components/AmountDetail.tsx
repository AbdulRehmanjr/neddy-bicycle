"use client";

import { useBookingStore } from "~/store";

export const AmountDetail = () => {
  const { selection } = useBookingStore();

  return (
    <div className="order-1 md:order-2 flex flex-col gap-4 text-yellow">
      <h1 className="font-ibm text-2xl md:text-4xl">Rental overview</h1>
      <div className="flex flex-col gap-2 text-gray-500">
        <p className="flex gap-2">
          <span>Start date:</span>
          <span>{selection.startDate}</span>
        </p>
        <p className="flex gap-2">
          <span>End date:</span>
          <span>{selection.endDate}</span>
        </p>
        <p className="flex gap-2">
          <span>Duration:</span>
          <span>{selection.duration} days</span>
        </p>
        <p className="flex gap-2">
          <span>Pickup location:</span>
          <span>{selection.location == 1 ? "Jetty" : "Guesthouse"}</span>
        </p>
        <p className="flex gap-2">
          <span>Gentlemen bikes:</span>
          <span>{selection.men}</span>
        </p>
        <p className="flex gap-2">
          <span>Ladies bikes:</span>
          <span>{selection.ladies}</span>
        </p>
        <p className="flex gap-2">
          <span>Kids bikes:</span>
          <span>{selection.kids}</span>
        </p>
        <p className="flex gap-2 border-y-2 py-3 font-extrabold">
          <span>Price:</span>
          <span>{selection.amount} €</span>
        </p>
      </div>
    </div>
  );
};
