/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
"use client";

import { PayPalButtons } from "@paypal/react-paypal-js";
import { type OnApproveData, type CreateOrderData } from "@paypal/paypal-js";
import { useRouter } from "next/navigation";
import { useBookingStore } from "~/store";
import { clearLocalStorage } from "~/utils";
import { api } from "~/trpc/react";
import axios, { AxiosError } from "axios";
import { useToast } from "~/components/ui/use-toast";

export const PayPalButton = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { selection, bookingId, trigger, setTrigger } = useBookingStore();

  const emailSender = api.email.buyerMail.useMutation();
  const sellerEmail = api.email.sellerMail.useMutation();

  const createOrder = async (_data: CreateOrderData) => {
    try {
      const response = await axios.post("/api/order", {
        paypal: bookingId,
        amount: selection.amount,
      });
      return response.data.id;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error.message);
        toast({
          variant: "destructive",
          description: error.message ?? "Error",
        });
      } else {
        toast({
          variant: "destructive",
          description: "Something went wrong",
        });
      }
    }
  };

  const approveOrder = async (data: OnApproveData): Promise<void> => {
    try {
      await axios.post("/api/order/capture", {
        orderId: data.orderID,
        paypalId:bookingId,
        bookingData: selection,
      });

      const emailObject = {
        firstName: selection.firstName,
        lastName: selection.lastName,
        email: selection.email,
        phone: selection.phone,
        men: selection.men,
        ladies: selection.ladies,
        kids: selection.kids,
        amount: selection.amount,
        duration: selection.duration,
        startDate: selection.startDate ?? "none",
        endDate: selection.endDate ?? "none",
        orderId: data.orderID,
        paymentId: data.payerID ?? "none",
        additional: selection.additional ?? "none",
        info: selection.info ?? "none",
        guesthouse: selection.guesthouse ?? "none",
        arrivalTime: selection.arrivalTime ?? "none",
        pickup: selection.location == 1 ? "Jetty" : "Guesthouse",
      };

      emailSender.mutate(emailObject);
      sellerEmail.mutate(emailObject);
      clearLocalStorage();
      setTrigger(true);
      router.push("/success");
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error.message);
        toast({
          variant: "destructive",
          description: error.message ?? "Error",
        });
      } else {
        toast({
          variant: "destructive",
          description: "Something went wrong",
        });
      }
    }
  };

  const cancelOrder = (_data: Record<string, unknown>): void => {
    return;
  };
  return (
    <PayPalButtons
      disabled={trigger || selection.amount == 0 || bookingId == "none"}
      createOrder={(data, _action) => createOrder(data)}
      onApprove={(data, _actions) => approveOrder(data)}
      onCancel={(data, _action) => cancelOrder(data)}
    />
  );
};
