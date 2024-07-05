"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import { Textarea } from "~/components/ui/textarea";
import { useBookingStore } from "~/store";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  firstName: z.string({ required_error: "Field is required." }),
  lastName: z.string({ required_error: "Field is required." }),
  email: z
    .string({ required_error: "Field is required." })
    .email({ message: "Invalid email address" }),
  phone: z.string({ required_error: "Field is required." }),
  additional: z.optional(z.string({ required_error: "Field is required." })),
  info: z.optional(z.string({ required_error: "Field is required." })),
});

export const BookingForm = () => {

  const router  = useRouter()
  const {setSelection,setBookingId,setTrigger} = useBookingStore()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const createOrder = api.booking.createPayPalBooking.useMutation({
    onSuccess: (data: string) => {
      setTrigger(false);
      setBookingId(data);
      form.reset();
      router.push('/booking/payment')
    },
  });

  const formSubmitted = (data: z.infer<typeof formSchema>) => {
    setSelection({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      additional: data.additional ?? "none",
      info: data.info ?? "none",
    });
    createOrder.mutate({ email: data.email });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(formSubmitted)}
        className={`order-2 md:order-1 grid grid-cols-2 gap-3 text-mid-blue `}
      >
        <h1 className="col-span-2 font-ibm text-2xl md:text-4xl text-yellow">
          Personal information
        </h1>
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem className="col-span-2 md:col-span-1">
              <FormLabel>First name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter the first name"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem className="col-span-2 md:col-span-1">
              <FormLabel>Last name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter the last name"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="col-span-2 md:col-span-1">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter the email"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="col-span-2 md:col-span-1">
              <FormLabel>Phone no.</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter the phone no."
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="info"
          render={({ field }) => (
            <FormItem className="col-span-2 ">
              <FormLabel>How did you get to know us?</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="how did you get to know us?"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="additional"
          render={({ field }) => (
            <FormItem className="col-span-2 ">
              <FormLabel>Additional information</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write additional information"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="col-span-2 flex justify-center">
          <Button
            type="submit"
            className="bg-yellow hover:bg-yellow-hover"
            disabled={createOrder.isPending}
          >
            {createOrder.isPending ? "Processing..." : "Continue"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
