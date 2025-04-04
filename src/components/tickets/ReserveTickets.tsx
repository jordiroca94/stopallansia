"use client";
import React, { useEffect, useRef, useState } from "react";
import Container from "../ui/Container";
import Grid from "../ui/Grid";
import SimpleAnimation from "../animations/SimpleAnimation";
import TextAnimation from "../animations/TextAnimation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import Checkout from "./Checkout";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("Stripe public key is not defined");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
const ReserveTickets = () => {
  const [amount, setAmount] = useState<number | null>(null);
  const [description, setDescription] = useState("");

  const refReserveForm = useRef<HTMLFormElement>(null);

  const reserveSchema = z.object({
    option: z.string().nonempty("Please select an option"),
  });

  const {
    register,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      option: "",
    },
    resolver: zodResolver(reserveSchema),
  });

  const watchedOption = watch("option");

  useEffect(() => {
    if (watchedOption) {
      handleReserve({ option: watchedOption });
    }
  }, [watchedOption]);

  const handleReserve = async (value: { option: string }) => {
    let pass = { type: "", price: 0, description: "" };
    switch (value.option) {
      case "full-pass":
        pass = {
          type: "full-pass",
          description:
            "Full Pass | Complete access from Fri 4th, Sun 6th, 12 PM",
          price: 80,
        };
        break;
      case "friday-pass":
        pass = {
          type: "friday-pass",
          description:
            "Friday Pass | Complete access from Fri 4th, Sat 5th, 12 PM",
          price: 50,
        };
        break;
      case "saturday-pass":
        pass = {
          type: "saturday-pass",
          description:
            "Saturday Pass | Complete access from Sat 5th, Sun 6th, 12 PM",
          price: 50,
        };
        break;
      default:
        break;
    }
    setAmount(pass.price);
    setDescription(pass.description);
  };

  return (
    <Container className="pb-10">
      <Grid className="py-6 lg:py-12">
        <SimpleAnimation className="col-span-full border-b pb-5 border-gray">
          <h1 className="text-3xl lg:text-5xl font-semibold font-secondary">
            Choose your plan
          </h1>
        </SimpleAnimation>
        <div className="col-span-full flex flex-col gap-2">
          <SimpleAnimation>
            <h3 className="text-xl lg:text-2xl font-light pb-2">
              Select the type of pass you want to buy.
            </h3>
            <p className="pb-4">
              You can bring your tent for free or reserve a spot in our glamping
              tent
            </p>
          </SimpleAnimation>
          <form ref={refReserveForm}>
            <TextAnimation className="flex flex-col gap-1 relative pb-10">
              <label className="flex gap-3 items-center">
                <input type="radio" {...register("option")} value="full-pass" />
                <span>
                  Full Pass | Complete access from Fri 4th, Sun 6th, 12 PM [from
                  80 €]
                </span>
              </label>
              <label className="flex gap-3 items-center">
                <input
                  type="radio"
                  {...register("option")}
                  value="friday-pass"
                />
                <span>
                  Friday Pass | Complete access from Fri 4th, Sat 5th, 12 PM
                  [from 50 €]
                </span>
              </label>
              <label className="flex gap-3 items-center">
                <input
                  type="radio"
                  {...register("option")}
                  value="saturday-pass"
                />
                <span>
                  Saturday Pass | Complete access from Sat 5th, Sun 6th, 12 PM
                  [from 50 €]
                </span>
              </label>
              {errors.option && (
                <p className="text-red absolute bottom-2">
                  {errors.option.message}
                </p>
              )}
            </TextAnimation>
          </form>
          {amount !== null && (
            <Elements
              stripe={stripePromise}
              options={{
                mode: "payment",
                amount: convertToSubcurrency(amount),
                currency: "eur",
              }}
            >
              <Checkout amount={amount} description={description} />
            </Elements>
          )}
        </div>
      </Grid>
    </Container>
  );
};

export default ReserveTickets;
