"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { useLocale } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SimpleAnimation from "../animations/SimpleAnimation";

const Checkout = ({ amount }: { amount: number }) => {
  const stripe = useStripe();
  const elements = useElements();
  // const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const locale = useLocale();
  const refPayForm = useRef<HTMLFormElement>(null);

  const paySchema = z.object({
    name: z.string().min(2, { message: "Please enter a valid name" }),
    email: z.string().email({ message: "Please enter a valid email" }),
  });

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: convertToSubcurrency(amount),
      }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [amount]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
    },
    resolver: zodResolver(paySchema),
  });

  const handlePayment = async () => {
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      // setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `https://stop-all-ansia.vercel.app//${locale}/payment-success`,
        // return_url: `http://localhost:3000/${locale}/payment-success`,
      },
    });

    if (error) {
      // This point is only reached if there's an immediate error when
      // confirming the payment. Show the error to your customer (for example, payment details incomplete)
      // setErrorMessage(error.message);
    } else {
      // The payment UI automatically closes with a success animation.
      // Your customer is redirected to your `return_url`.
    }

    setLoading(false);
  };

  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="flex items-center justify-center w-full md:w-[600px]">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-start">
      <form
        ref={refPayForm}
        onSubmit={handleSubmit(handlePayment)}
        className="p-2 rounded-md w-full md:w-[600px]"
      >
        <SimpleAnimation>
          <h3 className="text-xl lg:text-2xl font-light pb-4">Your details</h3>
        </SimpleAnimation>
        <div className="max-w-[400px] pb-4 flex flex-col gap-2">
          <label htmlFor="name" className="font-medium">
            Full name *
          </label>
          <input
            className="border border-secondary focus:ring-1 focus:ring-secondary py-2 px-6 rounded-md text-black w-full"
            placeholder="Full name"
            type="text"
            id="name"
            {...register("name")}
          />
          {errors.name?.message && (
            <p aria-describedby="name" className="text-red pt-1">
              {errors.name?.message}
            </p>
          )}
        </div>
        <div className="max-w-[400px] pb-4 flex flex-col gap-2">
          <label htmlFor="email" className="font-medium">
            Email *
          </label>
          <input
            className="border border-secondary focus:ring-1 focus:ring-secondary py-2 px-6 rounded-md text-black w-full"
            placeholder="Email"
            type="email"
            id="email"
            {...register("email")}
          />
          {errors.email?.message && (
            <p aria-describedby="email" className="text-red pt-1">
              {errors.email?.message}
            </p>
          )}
        </div>
        {clientSecret && <PaymentElement />}
        <button
          type="submit"
          disabled={!stripe || loading}
          className="text-white w-full p-5 bg-black mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse"
        >
          {!loading ? `Pay $${amount}` : "Processing..."}
        </button>
      </form>
    </div>
  );
};

export default Checkout;
