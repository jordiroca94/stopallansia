"use client";

import React, { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
  LinkAuthenticationElement,
} from "@stripe/react-stripe-js";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { useLocale, useTranslations } from "next-intl";
import SimpleAnimation from "../animations/SimpleAnimation";
import Loader from "../ui/Loader";
import { TicketType } from "./Tickets";

const Checkout = ({ ticket }: { ticket: TicketType }) => {
  const t = useTranslations();

  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const locale = useLocale();

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description: ticket.name,
        amount: convertToSubcurrency(ticket.price),
        locale: locale,
        name: name,
      }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [ticket, locale, name]);

  const handlePayment = async () => {
    setLoading(true);

    if (!name.trim()) {
      setNameError(t("RESERVE_TICKETS_NAME_ERROR"));
      setLoading(false);
      return;
    }

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${process.env.NEXT_PUBLIC_API_URL}/${locale}/payment-success`,
      },
    });

    if (error) {
      setErrorMessage(error.message);
    }

    setLoading(false);
  };

  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="flex items-center justify-center w-ful">
        <Loader big />
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center">
      <div className="rounded-md w-full md:w-[600px] bg-white/50 shadow-lg p-4 text-black">
        <div className="mb-8 border-red border-2 rounded-md p-3">
          <strong>⚠️ {t("PAYEMNT_SUCCESS_DEVELOPMENT")}: </strong>
          {t("RESERVE_TICKETS_WARNING")}
        </div>
        <SimpleAnimation>
          <h3 className="text-xl lg:text-2xl font-light pb-4">
            {t("RESERVE_TICKETS_DETAILS")}
          </h3>
        </SimpleAnimation>
        {clientSecret && (
          <>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm mb-2">
                {t("RESERVE_TICKETS_NAME")}
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setNameError("");
                }}
                className="block w-full px-3 py-2.5 text-base border border-lightGray rounded-md shadow-sm placeholder-gray/90 placeholder:font-light focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition duration-150 ease-in-out text-black"
                placeholder={t("RESERVE_TICKETS_NAME_PLACEHOLDER")}
                required
              />
              {nameError && (
                <p className="text-red text-sm mt-1">{nameError}</p>
              )}
            </div>
            <LinkAuthenticationElement className="mb-4" />
            <PaymentElement />
            {errorMessage && (
              <div className="text-red text-sm mt-2">{errorMessage}</div>
            )}
          </>
        )}
        <div className="flex flex-col items-center ">
          <button
            onClick={handlePayment}
            disabled={!stripe || loading}
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-white px-8 py-4 text-lg font-bold text-black transition-all duration-300 hover:scale-105 hover:shadow-lg mt-6 w-60"
          >
            <span className="absolute h-0 w-0 rounded-full bg-black opacity-10 transition-all duration-300 group-hover:h-56 group-hover:w-56"></span>
            <span className="relative flex items-center">
              {!loading ? `${t("PAY")} $${ticket.price}` : <Loader />}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
