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

type Props = {
  amount: number;
  description: string;
};

const Checkout = ({ amount, description }: Props) => {
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
        description: description,
        amount: convertToSubcurrency(amount),
        locale: locale,
        name: name,
      }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [amount, description, locale, name]);

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
      <div className="flex items-center justify-center w-full md:w-[600px]">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full flex justify-start">
      <div className="p-2 rounded-md w-full md:w-[600px]">
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
              <label
                htmlFor="name"
                className="block text-sm text-[#30313d] mb-2"
              >
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
                className="block w-full px-3 py-2.5 text-base border border-lightGray rounded-md shadow-sm placeholder-gray/90 placeholder:font-light focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition duration-150 ease-in-out"
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
        <button
          onClick={handlePayment}
          disabled={!stripe || loading}
          className="text-white w-full p-5 bg-black mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse"
        >
          {!loading ? `${t("PAY")} $${amount}` : <Loader />}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
